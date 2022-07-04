import { Matrix4 } from '../mat4/Matrix4';
import { Vector3 } from '../vec3/Vector3';
import type { RawQuaternion } from './RawQuaternion';
/**
 * A Quaternion.
 */
export declare class Quaternion {
    elements: RawQuaternion;
    constructor(elements?: RawQuaternion);
    /**
     * An x component of this.
     */
    get x(): number;
    /**
     * An y component of this.
     */
    get y(): number;
    /**
     * An z component of this.
     */
    get z(): number;
    /**
     * An w component of this.
     */
    get w(): number;
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Quaternion;
    /**
     * Itself but converted into a Matrix4.
     */
    get matrix4(): Matrix4;
    /**
     * An inverse of this.
     */
    get inversed(): Quaternion;
    /**
     * The length of this.
     */
    get length(): number;
    /**
     * The squared length of this.
     */
    get lengthSq(): number;
    /**
     * A normalized this.
     */
    get normalized(): Quaternion;
    /**
     * Multiply one or more Quaternions with this.
     * @param quaternions Other Quaternions
     */
    multiply(...quaternions: Quaternion[]): Quaternion;
    /**
     * Interpolate between this and given quaternion.
     * @param b Another Quaternion
     * @param t How much do we want to rotate this to b
     */
    slerp(b: Quaternion, t: number): Quaternion;
    /**
     * An identity Quaternion.
     */
    static get identity(): Quaternion;
    /**
     * Multiply two or more matrices.
     * @param quaternion Quaternions
     */
    static multiply(...quaternions: Quaternion[]): Quaternion;
    /**
     * Interpolate between two quaternions.
     * @param a "from" quaternion
     * @param b "to" quaternion
     * @param t How much do we want to rotate the a to b
     */
    static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion;
    /**
     * Return a quaternion which rotates around x axis.
     * @param theta An angle around x axis, in degree
     */
    static rotationX(theta: number): Quaternion;
    /**
     * Return a quaternion which rotates around y axis.
     * @param theta An angle around y axis, in degree
     */
    static rotationY(theta: number): Quaternion;
    /**
     * Return a quaternion which rotates around z axis.
     * @param theta An angle around z axis, in degree
     */
    static rotationZ(theta: number): Quaternion;
    /**
     * Return a quaternion which looks at the direction of `look`.
     * @param look Position where the quaternion will look at
     * @param up The "up vector"
     */
    static lookRotation(look: Vector3, up: Vector3): Quaternion;
    /**
     * Generate a Quaternion out of angle and axis.
     */
    static fromAxisAngle(axis: Vector3, angle: number): Quaternion;
    /**
     * Generate a Quaternion out of a rotation matrix.
     */
    static fromMatrix4(matrix: Matrix4): Quaternion;
}
