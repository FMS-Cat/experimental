export class BinaryHeap<T> {
  public readonly array: T[];
  public readonly elementIndexMap: Map<T, number>;
  public comparator: ( a: T, b: T ) => number;

  public static defaultComparator( a: any, b: any ): number {
    const aStr = `${ a }`;
    const bStr = `${ b }`;

    if ( aStr > bStr ) {
      return 1;
    } else if ( aStr < bStr ) {
      return -1;
    } else {
      return 0;
    }
  }

  public get length(): number {
    return this.array.length;
  }

  public get isEmpty(): boolean {
    return this.array.length === 0;
  }

  public get root(): T {
    return this.array[ 0 ];
  }

  public constructor( init?: T[], comparator?: ( a: T, b: T ) => number ) {
    this.array = [];
    this.elementIndexMap = new Map();
    this.comparator = comparator ?? BinaryHeap.defaultComparator;

    if ( init != null ) {
      for ( const el of init ) {
        this.push( el );
      }
    }
  }

  public push( ...elements: T[] ): void {
    elements.map( ( el ) => {
      const i = this.length;
      this.array.push( el );
      this.elementIndexMap.set( el, i );
      this.__up( i, el );
    } );
  }

  public pop(): T | null {
    if ( this.isEmpty ) {
      return null;
    }

    const el = this.array[ 0 ];
    this.elementIndexMap.delete( el );

    if ( this.length === 1 ) {
      this.array.splice( 0 );
    } else {
      const rep = this.array.pop();
      this.__down( 0, rep! );
    }

    return el;
  }

  public delete( i: number ): boolean {
    this.elementIndexMap.delete( this.array[ i ] );

    const rep = this.array.pop();
    if ( rep != null ) {
      i = this.__up( i, rep );
      i = this.__down( i, rep );
    }

    return true;
  }

  public replace( i: number, rep: T ): number | null {
    if ( i != null ) {
      this.elementIndexMap.delete( this.array[ i ] );

      i = this.__up( i, rep );
      i = this.__down( i, rep );
    }

    return i ?? null;
  }

  private __up( i: number, el: T ): number {
    let ic = i;

    while ( ic !== 0 ) {
      const ip = ( ic - 1 ) >> 1;

      const p = this.array[ ip ];
      if ( this.comparator( el, p ) < 0 ) {
        this.array[ ic ] = p;
        this.elementIndexMap.set( p, ic );
        ic = ip;
      } else {
        break;
      }
    }

    this.array[ ic ] = el;
    this.elementIndexMap.set( el, ic );
    return ic;
  }

  private __down( i: number, el: T ): number {
    let ip = i;

    while ( ( ip << 1 ) + 1 < this.length ) {
      const ic1 = ( ip << 1 ) + 1;
      const ic2 = ( ip << 1 ) + 2;

      if ( ic2 < this.length ) {
        const c1 = this.array[ ic1 ];
        const c2 = this.array[ ic2 ];

        const pickLeft = this.comparator( c1, c2 ) < 0;
        const c = pickLeft ? c1 : c2;
        const ic = pickLeft ? ic1 : ic2;

        if ( this.comparator( c, el ) < 0 ) {
          this.array[ ip ] = c;
          this.elementIndexMap.set( c, ip );
          ip = ic;
        } else {
          break;
        }
      } else if ( this.comparator( this.array[ ic1 ], el ) < 0 ) {
        this.array[ ip ] = this.array[ ic1 ];
        this.elementIndexMap.set( this.array[ ip ], ip );
        ip = ic1;
      } else {
        break;
      }
    }

    this.array[ ip ] = el;
    this.elementIndexMap.set( el, ip );
    return ip;
  }
}
