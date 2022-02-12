import { Matrix3 } from '../mat3/Matrix3';
import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { EulerOrder } from './EulerOrder';
import { RawVector3 } from '../vec3/RawVector3';
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
    readonly x: number;
    readonly y: number;
    readonly z: number;
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Euler;
    readonly quaternion: Quaternion;
    readonly matrix4: Matrix4;
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
