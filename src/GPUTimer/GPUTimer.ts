import { Pool } from '../Pool/Pool';

export class GPUTimer {
  public queries: Pool<WebGLQuery>;
  public stack: Promise<number>[];
  public ext: any;
  public readonly gl: WebGL2RenderingContext;

  private __loopTasks: Set<() => void>;

  public static isSupported( gl: WebGLRenderingContext | WebGL2RenderingContext ): boolean {
    return new Set( gl.getSupportedExtensions() ).has( 'EXT_disjoint_timer_query_webgl2' );
  }

  public constructor( gl: WebGL2RenderingContext ) {
    this.gl = gl;

    const queries = new Array( 1024 ).fill( 1 ).map( () => gl.createQuery()! );
    this.queries = new Pool( queries );

    this.stack = [];

    this.ext = gl.getExtension( 'EXT_disjoint_timer_query_webgl2' );

    this.__loopTasks = new Set();

    // loop
    const update = (): void => {
      this.update();
      requestAnimationFrame( update );
    };
    update();
  }

  public update(): void {
    Array.from( this.__loopTasks ).forEach( ( task ) => task() );
  }

  public async measure( func: () => void ): Promise<number> {
    const { gl } = this;

    if ( this.stack.length !== 0 ) {
      gl.endQuery( this.ext.TIME_ELAPSED_EXT );
      const promiseFinishingPrev = this.check( this.queries.current );

      this.stack = this.stack.map( async ( promiseAccum ) => {
        return ( await promiseAccum ) + ( await promiseFinishingPrev );
      } );
    }

    this.stack.push( Promise.resolve( 0.0 ) );

    gl.beginQuery( this.ext.TIME_ELAPSED_EXT, this.queries.next() );

    func();

    gl.endQuery( this.ext.TIME_ELAPSED_EXT );

    const promiseAccum = this.stack.pop()!;
    const promiseThis = this.check( this.queries.current );

    if ( this.stack.length !== 0 ) {
      this.stack = this.stack.map( async ( promiseAccum ) => {
        return ( await promiseAccum ) + ( await promiseThis );
      } );

      gl.beginQuery( this.ext.TIME_ELAPSED_EXT, this.queries.next() );
    }

    return ( await promiseAccum ) + ( await promiseThis );
  }

  public check( query: WebGLQuery ): Promise<number> {
    const { gl } = this;

    return new Promise( ( resolve ) => {
      const task = (): void => {
        const isAvailable = gl.getQueryParameter( query, gl.QUERY_RESULT_AVAILABLE );

        if ( isAvailable ) {
          this.__loopTasks.delete( task );
          resolve( gl.getQueryParameter( query, gl.QUERY_RESULT ) * 0.001 * 0.001 );
        }
      };

      this.__loopTasks.add( task );
    } );
  }
}
