import { Matrix3 } from '../mat3/Matrix3';
import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { eulerFromMat3 } from './eulerFromMat3';
import { eulerFromMat4 } from './eulerFromMat4';
import { eulerFromQuaternion } from './eulerFromQuaternion';
import { quatFromEuler } from '../quat/quatFromEuler';
import type { EulerOrder } from './EulerOrder';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * An Euler rotations.
 */
export class Euler {
  public elements: RawVector3; // [ x, y, z ]

  /**
   * An order of this euler.
   * 'XYZ' by default.
   *
   * Note that this is **extrinsic** rotations (which is same as Blender, Maya, and Unity).
   * Three.js uses intrinsic rotations so you have to reverse the order if you want to match the behavior with Three.js.
   */
  public order: EulerOrder;

  public constructor( elements: RawVector3 = [ 0.0, 0.0, 0.0 ], order: EulerOrder = 'XYZ' ) {
    this.elements = elements;
    this.order = order;
  }

  /**
   * An x component of this.
   */
  public get x(): number {
    return this.elements[ 0 ];
  }

  /**
   * An y component of this.
   */
  public get y(): number {
    return this.elements[ 1 ];
  }

  /**
   * An z component of this.
   */
  public get z(): number {
    return this.elements[ 2 ];
  }

  public toString(): string {
    return `Euler( ${ this.x.toFixed( 3 ) }, ${ this.y.toFixed( 3 ) }, ${ this.z.toFixed( 3 ) } (${ this.order }) )`;
  }

  /**
   * Clone this.
   */
  public clone(): Euler {
    return new Euler( this.elements.concat() as RawVector3, this.order );
  }

  /**
   * Itself but converted into a Quaternion.
   */
  public get quaternion(): Quaternion {
    return new Quaternion( quatFromEuler( this.elements, this.order ) );
  }

  /**
   * Itself but converted into a Matrix4.
   */
  public get matrix4(): Matrix4 {
    return this.quaternion.matrix4;
  }

  /**
   * Generate an Euler out of a matrix3.
   */
  public static fromMatrix3( matrix: Matrix3, order: EulerOrder ): Euler {
    return new Euler( eulerFromMat3( matrix.elements, order ), order );
  }

  /**
   * Generate an Euler out of a matrix4.
   */
  public static fromMatrix4( matrix: Matrix4, order: EulerOrder ): Euler {
    return new Euler( eulerFromMat4( matrix.elements, order ), order );
  }

  /**
   * Generate an Euler out of a quaternion.
   */
  public static fromQuaternion( quaternion: Quaternion, order: EulerOrder ): Euler {
    return new Euler( eulerFromQuaternion( quaternion.elements, order ), order );
  }
}
