import { Matrix4 } from '../mat4/Matrix4';
import { Vector } from '../vec/Vector';
import { vec4ApplyMatrix4 } from './vec4ApplyMatrix4';
import type { RawVector4 } from './RawVector4';

/**
 * A Vector3.
 */
export class Vector4 extends Vector<Vector4> {
  public elements: RawVector4;

  public constructor( v: RawVector4 = [ 0.0, 0.0, 0.0, 0.0 ] ) {
    super();
    this.elements = v;
  }

  /**
   * An x component of this.
   */
  public get x(): number {
    return this.elements[ 0 ];
  }

  public set x( x: number ) {
    this.elements[ 0 ] = x;
  }

  /**
   * A y component of this.
   */
  public get y(): number {
    return this.elements[ 1 ];
  }

  public set y( y: number ) {
    this.elements[ 1 ] = y;
  }

  /**
   * A z component of this.
   */
  public get z(): number {
    return this.elements[ 2 ];
  }

  public set z( z: number ) {
    this.elements[ 2 ] = z;
  }

  /**
   * A w component of this.
   */
  public get w(): number {
    return this.elements[ 3 ];
  }

  public set w( z: number ) {
    this.elements[ 3 ] = z;
  }

  public toString(): string {
    return `Vector4( ${ this.x.toFixed( 3 ) }, ${ this.y.toFixed( 3 ) }, ${ this.z.toFixed( 3 ) }, ${ this.w.toFixed( 3 ) } )`;
  }

  /**
   * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
   */
  public applyMatrix4( matrix: Matrix4 ): Vector4 {
    return new Vector4( vec4ApplyMatrix4( this.elements, matrix.elements ) );
  }

  protected __new( v: RawVector4 ): Vector4 {
    return new Vector4( v );
  }

  /**
   * Vector4( 0.0, 0.0, 0.0, 0.0 )
   */
  public static get zero(): Vector4 {
    return new Vector4( [ 0.0, 0.0, 0.0, 0.0 ] );
  }

  /**
   * Vector4( 1.0, 1.0, 1.0, 1.0 )
   */
  public static get one(): Vector4 {
    return new Vector4( [ 1.0, 1.0, 1.0, 1.0 ] );
  }
}
