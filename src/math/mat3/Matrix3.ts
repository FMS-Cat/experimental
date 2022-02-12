import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { mat3Determinant } from './mat3Determinant';
import { mat3FromMat4 } from './mat3FromMat4';
import { mat3FromQuaternion } from './mat3FromQuaternion';
import { mat3Inverse } from './mat3Inverse';
import { mat3Multiply } from './mat3Multiply';
import { mat3Transpose } from './mat3Transpose';
import { vecScale } from '../vec/vecScale';
import type { RawMatrix3 } from './RawMatrix3';

const rawIdentityMatrix3: RawMatrix3 = [
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
];

/**
 * A Matrix3.
 */
export class Matrix3 {
  public elements: RawMatrix3;

  public constructor( v: RawMatrix3 = rawIdentityMatrix3 ) {
    this.elements = v;
  }

  /**
   * Itself but transposed.
   */
  public get transpose(): Matrix3 {
    return new Matrix3( mat3Transpose( this.elements ) );
  }

  /**
   * Its determinant.
   */
  public get determinant(): number {
    return mat3Determinant( this.elements );
  }

  /**
   * Itself but inverted.
   */
  public get inverse(): Matrix3 {
    return new Matrix3( mat3Inverse( this.elements ) );
  }

  /**
   * Itself but matrix4.
   */
  public get matrix4(): Matrix4 {
    return Matrix4.fromMatrix3( this );
  }

  public toString(): string {
    const m = this.elements.map( ( v ) => v.toFixed( 3 ) );
    return `Matrix3( ${ m[ 0 ] }, ${ m[ 3 ] }, ${ m[ 6 ] }; ${ m[ 1 ] }, ${ m[ 4 ] }, ${ m[ 7 ] }; ${ m[ 2 ] }, ${ m[ 5 ] }, ${ m[ 8 ] } )`;
  }

  /**
   * Clone this.
   */
  public clone(): Matrix3 {
    return new Matrix3( this.elements.concat() as RawMatrix3 );
  }

  /**
   * Multiply this Matrix3 by one or more Matrix3s.
   */
  public multiply( ...matrices: Matrix3[] ): Matrix3 {
    return Matrix3.multiply( this, ...matrices );
  }

  /**
   * Multiply this Matrix3 by a scalar.
   */
  public scaleScalar( scalar: number ): Matrix3 {
    return new Matrix3( vecScale( this.elements, scalar ) );
  }

  /**
   * An identity Matrix4.
   */
  public static get identity(): Matrix3 {
    return new Matrix3( rawIdentityMatrix3 );
  }

  /**
   * Multiply two or more matrices.
   * @param matrices Matrices
   */
  public static multiply( ...matrices: Matrix3[] ): Matrix3 {
    if ( matrices.length === 0 ) {
      return Matrix3.identity;
    } else {
      return new Matrix3( mat3Multiply( ...matrices.map( ( m ) => m.elements ) ) );
    }
  }

  /**
   * Cast a {@link Matrix4} into a Matrix3.
   * @param matrix4 A matrix4
   */
  public static fromMatrix4( matrix4: Matrix4 ): Matrix3 {
    return new Matrix3( mat3FromMat4( matrix4.elements ) );
  }

  /**
   * Create a matrix out of a {@link Quaternion}.
   * @param quaternion A quaternion
   */
  public static fromQuaternion( quaternion: Quaternion ): Matrix3 {
    return new Matrix3( mat3FromQuaternion( quaternion.elements ) );
  }
}
