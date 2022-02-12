import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
import { mat4Compose } from './mat4/mat4Compose';
import { mat4Decompose } from './mat4/mat4Decompose';
import { mat4Determinant } from './mat4/mat4Determinant';
import { mat4FromQuaternion } from './mat4/mat4FromQuaternion';
import { mat4Inverse } from './mat4/mat4Inverse';
import { mat4LookAt } from './mat4/mat4LookAt';
import { mat4LookAtInverse } from './mat4/mat4LookAtInverse';
import { mat4Multiply } from './mat4/mat4Multiply';
import { mat4Perspective } from './mat4/mat4Perspective';
import { mat4RotateX } from './mat4/mat4RotateX';
import { mat4RotateY } from './mat4/mat4RotateY';
import { mat4RotateZ } from './mat4/mat4RotateZ';
import { mat4Scale } from './mat4/mat4Scale';
import { mat4ScaleScalar } from './mat4/mat4ScaleScalar';
import { mat4Translate } from './mat4/mat4Translate';
import { mat4Transpose } from './mat4/mat4Transpose';
import { vecScale } from './vec/vecScale';
import type { RawMatrix4 } from './mat4/RawMatrix4';

const rawIdentityMatrix4: RawMatrix4 = [
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0
];

/**
 * A Matrix4.
 */
export class Matrix4 {
  public elements: RawMatrix4;

  public constructor( v: RawMatrix4 = rawIdentityMatrix4 ) {
    this.elements = v;
  }

  /**
   * Itself but transposed.
   */
  public get transpose(): Matrix4 {
    return new Matrix4( mat4Transpose( this.elements ) );
  }

  /**
   * Its determinant.
   */
  public get determinant(): number {
    return mat4Determinant( this.elements );
  }

  /**
   * Itself but inverted.
   */
  public get inverse(): Matrix4 {
    return new Matrix4( mat4Inverse( this.elements ) );
  }

  public toString(): string {
    const m = this.elements.map( ( v ) => v.toFixed( 3 ) );
    return `Matrix4( ${ m[ 0 ] }, ${ m[ 4 ] }, ${ m[ 8 ] }, ${ m[ 12 ] }; ${ m[ 1 ] }, ${ m[ 5 ] }, ${ m[ 9 ] }, ${ m[ 13 ] }; ${ m[ 2 ] }, ${ m[ 6 ] }, ${ m[ 10 ] }, ${ m[ 14 ] }; ${ m[ 3 ] }, ${ m[ 7 ] }, ${ m[ 11 ] }, ${ m[ 15 ] } )`;
  }

  /**
   * Clone this.
   */
  public clone(): Matrix4 {
    return new Matrix4( this.elements.concat() as RawMatrix4 );
  }

  /**
   * Multiply this Matrix4 by one or more Matrix4s.
   */
  public multiply( ...matrices: Matrix4[] ): Matrix4 {
    return Matrix4.multiply( this, ...matrices );
  }

  /**
   * Multiply this Matrix4 by a scalar.
   */
  public scaleScalar( scalar: number ): Matrix4 {
    return new Matrix4( vecScale( this.elements, scalar ) );
  }

  /**
   * An identity Matrix4.
   */
  public static get identity(): Matrix4 {
    return new Matrix4( rawIdentityMatrix4 );
  }

  /**
   * Multiply two or more matrices.
   * @param matrices Matrices
   */
  public static multiply( ...matrices: Matrix4[] ): Matrix4 {
    if ( matrices.length === 0 ) {
      return Matrix4.identity;
    } else {
      return new Matrix4( mat4Multiply( ...matrices.map( ( m ) => m.elements ) ) );
    }
  }

  /**
   * Create a matrix out of a {@link Quaternion}.
   * @param quaternion A quaternion
   */
  public static fromQuaternion( quaternion: Quaternion ): Matrix4 {
    return new Matrix4( mat4FromQuaternion( quaternion.elements ) );
  }

  /**
   * Generate a translation matrix.
   * @param vector Translation
   */
  public static translate( vector: Vector3 ): Matrix4 {
    return new Matrix4( mat4Translate( vector.elements ) );
  }

  /**
   * Generate a 3d scaling matrix.
   * @param vector Scale
   */
  public static scale( vector: Vector3 ): Matrix4 {
    return new Matrix4( mat4Scale( vector.elements ) );
  }

  /**
   * Generate a 3d scaling matrix by a scalar.
   * @param vector Scale
   */
  public static scaleScalar( scalar: number ): Matrix4 {
    return new Matrix4( mat4ScaleScalar( scalar ) );
  }

  /**
   * Generate a 3d rotation matrix, rotates around x axis.
   * @param vector Scale
   */
  public static rotateX( theta: number ): Matrix4 {
    return new Matrix4( mat4RotateX( theta ) );
  }

  /**
   * Generate a 3d rotation matrix, rotates around y axis.
   * @param vector Scale
   */
  public static rotateY( theta: number ): Matrix4 {
    return new Matrix4( mat4RotateY( theta ) );
  }

  /**
   * Generate a 3d rotation matrix, rotates around z axis.
   * @param vector Scale
   */
  public static rotateZ( theta: number ): Matrix4 {
    return new Matrix4( mat4RotateZ( theta ) );
  }

  /**
   * Generate a "LookAt" matrix.
   *
   * See also: {@link lookAtInverse}
   */
  public static lookAt(
    position: Vector3,
    target = new Vector3( [ 0.0, 0.0, 0.0 ] ),
    up = new Vector3( [ 0.0, 1.0, 0.0 ] ),
    roll = 0.0
  ): Matrix4 {
    return new Matrix4( mat4LookAt(
      position.elements,
      target.elements,
      up.elements,
      roll,
    ) );
  }

  /**
   * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
   *
   * See also: {@link lookAt}
   */
  public static lookAtInverse(
    position: Vector3,
    target = new Vector3( [ 0.0, 0.0, 0.0 ] ),
    up = new Vector3( [ 0.0, 1.0, 0.0 ] ),
    roll = 0.0
  ): Matrix4 {
    return new Matrix4( mat4LookAtInverse(
      position.elements,
      target.elements,
      up.elements,
      roll,
    ) );
  }

  /**
   * Generate a "Perspective" projection matrix.
   * It won't include aspect!
   */
  public static perspective( fov = 45.0, near = 0.01, far = 100.0 ): Matrix4 {
    return new Matrix4( mat4Perspective( fov, near, far ) );
  }

  /**
   * Decompose this matrix into a position, a scale, and a rotation.
   * Yoinked from Three.js.
   */
  public decompose(): { position: Vector3; scale: Vector3; rotation: Quaternion } {
    const { position, scale, rotation } = mat4Decompose( this.elements );

    return {
      position: new Vector3( position ),
      scale: new Vector3( scale ),
      rotation: new Quaternion( rotation ),
    };
  }

  /**
   * Compose a matrix out of position, scale, and rotation.
   * Yoinked from Three.js.
   */
  public static compose( position: Vector3, rotation: Quaternion, scale: Vector3 ): Matrix4 {
    return new Matrix4( mat4Compose( position.elements, rotation.elements, scale.elements ) );
  }
}
