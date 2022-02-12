import { Matrix4 } from '../mat4/Matrix4';
import { Vector3 } from '../vec3/Vector3';
import { mat4FromQuaternion } from '../mat4/mat4FromQuaternion';
import { quatFromAxisAngle } from './quatFromAxisAngle';
import { quatFromMatrix4 } from './quatFromMatrix4';
import { quatInverse } from './quatInverse';
import { quatLookRotation } from './quatLookRotation';
import { quatMultiply } from './quatMultiply';
import { quatNormalize } from './quatNormalize';
import { quatSlerp } from './quatSlerp';
import { vecLength } from '../vec/vecLength';
import { vecLengthSq } from '../vec/vecLengthSq';
import type { RawQuaternion } from './RawQuaternion';

const rawIdentityQuaternion: RawQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];

/**
 * A Quaternion.
 */
export class Quaternion {
  public elements: RawQuaternion; // [ x, y, z; w ]

  public constructor( elements: RawQuaternion = rawIdentityQuaternion ) {
    this.elements = elements;
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

  /**
   * An w component of this.
   */
  public get w(): number {
    return this.elements[ 3 ];
  }

  public toString(): string {
    return `Quaternion( ${ this.x.toFixed( 3 ) }, ${ this.y.toFixed( 3 ) }, ${ this.z.toFixed( 3 ) }, ${ this.w.toFixed( 3 ) } )`;
  }

  /**
   * Clone this.
   */
  public clone(): Quaternion {
    return new Quaternion( this.elements.concat() as RawQuaternion );
  }

  /**
   * Itself but converted into a Matrix4.
   */
  public get matrix(): Matrix4 {
    return new Matrix4( mat4FromQuaternion( this.elements ) );
  }

  /**
   * An inverse of this.
   */
  public get inversed(): Quaternion {
    return new Quaternion( quatInverse( this.elements ) );
  }

  /**
   * The length of this.
   */
  public get length(): number {
    return vecLength( this.elements );
  }

  /**
   * The squared length of this.
   */
  public get lengthSq(): number {
    return vecLengthSq( this.elements );
  }

  /**
   * A normalized this.
   */
  public get normalized(): Quaternion {
    return new Quaternion( quatNormalize( this.elements ) );
  }

  /**
   * Multiply one or more Quaternions with this.
   * @param quaternions Other Quaternions
   */
  public multiply( ...quaternions: Quaternion[] ): Quaternion {
    return Quaternion.multiply( this, ...quaternions );
  }

  /**
   * Interpolate between this and given quaternion.
   * @param b Another Quaternion
   * @param t How much do we want to rotate this to b
   */
  public slerp( b: Quaternion, t: number ): Quaternion {
    return Quaternion.slerp( this, b, t );
  }

  /**
   * An identity Quaternion.
   */
  public static get identity(): Quaternion {
    return new Quaternion( rawIdentityQuaternion );
  }

  /**
   * Multiply two or more matrices.
   * @param quaternion Quaternions
   */
  public static multiply( ...quaternions: Quaternion[] ): Quaternion {
    if ( quaternions.length === 0 ) {
      return Quaternion.identity;
    } else {
      return new Quaternion( quatMultiply( ...quaternions.map( ( q ) => q.elements ) ) );
    }
  }

  /**
   * Interpolate between two quaternions.
   * @param a "from" quaternion
   * @param b "to" quaternion
   * @param t How much do we want to rotate the a to b
   */
  public static slerp( a: Quaternion, b: Quaternion, t: number ): Quaternion {
    return new Quaternion( quatSlerp( a.elements, b.elements, t ) );
  }

  /**
   * Return a quaternion which looks at the direction of `look`.
   * @param look Position where the quaternion will look at
   * @param up The "up vector"
   */
  public static lookRotation( look: Vector3, up: Vector3 ): Quaternion {
    return new Quaternion( quatLookRotation( look.elements, up.elements ) );
  }

  /**
   * Generate a Quaternion out of angle and axis.
   */
  public static fromAxisAngle( axis: Vector3, angle: number ): Quaternion {
    return new Quaternion( quatFromAxisAngle( axis.elements, angle ) );
  }

  /**
   * Generate a Quaternion out of a rotation matrix.
   */
  public static fromMatrix4( matrix: Matrix4 ): Quaternion {
    return new Quaternion( quatFromMatrix4( matrix.elements ) );
  }
}
