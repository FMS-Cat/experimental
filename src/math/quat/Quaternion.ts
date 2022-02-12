import { Matrix4 } from '../mat4/Matrix4';
import { Vector3 } from '../vec3/Vector3';
import { mat4FromQuaternion } from '../mat4/mat4FromQuaternion';
import { quatFromAxisAngle } from './quatFromAxisAngle';
import { quatFromMatrix4 } from './quatFromMatrix4';
import { quatInverse } from './quatInverse';
import { quatMultiply } from './quatMultiply';
import { quatNormalize } from './quatNormalize';
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
   * An identity Quaternion.
   */
  public static get identity(): Quaternion {
    return new Quaternion( rawIdentityQuaternion );
  }

  /**
   * Multiply two or more matrices.
   * @param matrices Matrices
   */
  public static multiply( ...quaternions: Quaternion[] ): Quaternion {
    if ( quaternions.length === 0 ) {
      return Quaternion.identity;
    } else {
      return new Quaternion( quatMultiply( ...quaternions.map( ( q ) => q.elements ) ) );
    }
  }

  /**
   * Generate a Quaternion out of angle and axis.
   */
  public static fromAxisAngle( axis: Vector3, angle: number ): Quaternion {
    return new Quaternion( quatFromAxisAngle( axis.elements, angle ) );
  }

  /**
   * Generate a Quaternion out of a rotation matrix.
   * Yoinked from Three.js.
   */
  public static fromMatrix( matrix: Matrix4 ): Quaternion {
    return new Quaternion( quatFromMatrix4( matrix.elements ) );
  }
}
