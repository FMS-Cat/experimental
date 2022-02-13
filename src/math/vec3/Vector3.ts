import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { Vector } from '../vec/Vector';
import { vec3ApplyMatrix4 } from './vec3ApplyMatrix4';
import { vec3ApplyQuaternion } from './vec3ApplyQuaternion';
import { vec3Cross } from './vec3Cross';
import { vec3OrthoNormalize } from './vec3OrthoNormalize';
import type { RawVector3 } from './RawVector3';

/**
 * A Vector3.
 */
export class Vector3 extends Vector<Vector3> {
  public elements: RawVector3;

  public constructor( v: RawVector3 = [ 0.0, 0.0, 0.0 ] ) {
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
   * An y component of this.
   */
  public get y(): number {
    return this.elements[ 1 ];
  }

  public set y( y: number ) {
    this.elements[ 1 ] = y;
  }

  /**
   * An z component of this.
   */
  public get z(): number {
    return this.elements[ 2 ];
  }

  public set z( z: number ) {
    this.elements[ 2 ] = z;
  }

  public toString(): string {
    return `Vector3( ${ this.x.toFixed( 3 ) }, ${ this.y.toFixed( 3 ) }, ${ this.z.toFixed( 3 ) } )`;
  }

  /**
   * Return a cross of this and another Vector3.
   * @param vector Another vector
   */
  public cross( vector: Vector3 ): Vector3 {
    return new Vector3( vec3Cross( this.elements, vector.elements ) );
  }

  /**
   * Rotate this vector using a Quaternion.
   * @param quaternion A quaternion
   */
  public applyQuaternion( quaternion: Quaternion ): Vector3 {
    return new Vector3( vec3ApplyQuaternion( this.elements, quaternion.elements ) );
  }

  /**
   * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
   */
  public applyMatrix4( matrix: Matrix4 ): Vector3 {
    return new Vector3( vec3ApplyMatrix4( this.elements, matrix.elements ) );
  }

  protected __new( v: RawVector3 ): Vector3 {
    return new Vector3( v );
  }

  /**
   * Vector3( 0.0, 0.0, 0.0 )
   */
  public static get zero(): Vector3 {
    return new Vector3( [ 0.0, 0.0, 0.0 ] );
  }

  /**
   * Vector3( 1.0, 0.0, 0.0 )
   */
  public static get px(): Vector3 {
    return new Vector3( [ 1.0, 0.0, 0.0 ] );
  }

  /**
   * Vector3( -1.0, 0.0, 0.0 )
   */
  public static get nx(): Vector3 {
    return new Vector3( [ -1.0, 0.0, 0.0 ] );
  }

  /**
   * Vector3( 0.0, 1.0, 0.0 )
   */
  public static get py(): Vector3 {
    return new Vector3( [ 0.0, 1.0, 0.0 ] );
  }

  /**
   * Vector3( 0.0, -1.0, 0.0 )
   */
  public static get ny(): Vector3 {
    return new Vector3( [ 0.0, -1.0, 0.0 ] );
  }

  /**
   * Vector3( 0.0, 0.0, 1.0 )
   */
  public static get pz(): Vector3 {
    return new Vector3( [ 0.0, 0.0, 1.0 ] );
  }

  /**
   * Vector3( 0.0, 0.0, -1.0 )
   */
  public static get nz(): Vector3 {
    return new Vector3( [ 0.0, 0.0, -1.0 ] );
  }

  /**
   * Vector3( 1.0, 1.0, 1.0 )
   */
  public static get one(): Vector3 {
    return new Vector3( [ 1.0, 1.0, 1.0 ] );
  }

  /**
   * Return a tangent which is orthogonal to normal.
   * If binormal is specified, it is also returned and it's orthogonal to both normal and tangent.
   */
  public static orthoNormalize( normal: Vector3, tangent: Vector3, binormal: Vector3 ): {
    normal: Vector3,
    tangent: Vector3,
    binormal: Vector3,
  } {
    const result = vec3OrthoNormalize( normal.elements, tangent.elements, binormal.elements );
    return {
      normal: new Vector3( result.normal ),
      tangent: new Vector3( result.tangent ),
      binormal: new Vector3( result.binormal ),
    };
  }
}
