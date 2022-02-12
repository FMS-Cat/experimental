import { Matrix3 } from '../mat3/Matrix3';
import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import type { EulerOrder } from './EulerOrder';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * An Euler rotations.
 */
export declare class Euler {
    elements: RawVector3;
    /**
     * An order of this euler.
     * 'XYZ' by default.
     *
     * Note that this is **extrinsic** rotations (which is same as Blender, Maya, and Unity).
     * Three.js uses intrinsic rotations so you have to reverse the order if you want to match the behavior with Three.js.
     */
    order: EulerOrder;
    constructor(elements?: RawVector3, order?: EulerOrder);
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
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Euler;
    /**
     * Itself but converted into a Quaternion.
     */
    get quaternion(): Quaternion;
    /**
     * Itself but converted into a Matrix4.
     */
    get matrix4(): Matrix4;
    /**
     * Generate an Euler out of a matrix3.
     */
    static fromMatrix3(matrix: Matrix3, order: EulerOrder): Euler;
    /**
     * Generate an Euler out of a matrix4.
     */
    static fromMatrix4(matrix: Matrix4, order: EulerOrder): Euler;
    /**
     * Generate an Euler out of a quaternion.
     */
    static fromQuaternion(quaternion: Quaternion, order: EulerOrder): Euler;
}
