import { Matrix3 } from '../mat3/Matrix3';
import { Quaternion } from '../quat/Quaternion';
import { Vector3 } from '../vec3/Vector3';
import { RawMatrix4 } from './RawMatrix4';
/**
 * A Matrix4.
 */
export declare class Matrix4 {
    elements: RawMatrix4;
    constructor(v?: RawMatrix4);
    readonly transpose: Matrix4;
    readonly determinant: number;
    readonly inverse: Matrix4;
    readonly matrix3: Matrix3;
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Matrix4;
    /**
     * Multiply this Matrix4 by one or more Matrix4s.
     */
    multiply(...matrices: Matrix4[]): Matrix4;
    /**
     * Multiply this Matrix4 by a scalar.
     */
    scaleScalar(scalar: number): Matrix4;
    /**
     * Decompose this matrix into a position, a scale, and a rotation.
     */
    decompose(): {
        position: Vector3;
        scale: Vector3;
        rotation: Quaternion;
    };
    static readonly identity: Matrix4;
    /**
     * Multiply two or more matrices.
     * @param matrices Matrices
     */
    static multiply(...matrices: Matrix4[]): Matrix4;
    /**
     * Create a matrix out of a {@link Quaternion}.
     * @param quaternion A quaternion
     */
    static fromQuaternion(quaternion: Quaternion): Matrix4;
    /**
     * Cast a {@link Matrix3} into a Matrix4.
     * @param matrix3 A matrix3
     */
    static fromMatrix3(matrix3: Matrix3): Matrix4;
    /**
     * Generate a translation matrix.
     * @param vector Translation
     */
    static translate(vector: Vector3): Matrix4;
    /**
     * Generate a 3d scaling matrix.
     * @param vector Scale
     */
    static scale(vector: Vector3): Matrix4;
    /**
     * Generate a 3d scaling matrix by a scalar.
     * @param vector Scale
     */
    static scaleScalar(scalar: number): Matrix4;
    /**
     * Generate a 3d rotation matrix, rotates around x axis.
     * @param vector Scale
     */
    static rotateX(theta: number): Matrix4;
    /**
     * Generate a 3d rotation matrix, rotates around y axis.
     * @param vector Scale
     */
    static rotateY(theta: number): Matrix4;
    /**
     * Generate a 3d rotation matrix, rotates around z axis.
     * @param vector Scale
     */
    static rotateZ(theta: number): Matrix4;
    /**
     * Generate a "LookAt" matrix.
     *
     * See also: {@link lookAtInverse}
     */
    static lookAt(position: Vector3, target?: Vector3, up?: Vector3, roll?: number): Matrix4;
    /**
     * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
     *
     * See also: {@link lookAt}
     */
    static lookAtInverse(position: Vector3, target?: Vector3, up?: Vector3, roll?: number): Matrix4;
    /**
     * Generate a "Perspective" projection matrix.
     * It won't include aspect!
     */
    static perspective(fov?: number, near?: number, far?: number): Matrix4;
    /**
     * Compose a matrix out of position, scale, and rotation.
     * Yoinked from Three.js.
     */
    static compose(position: Vector3, rotation: Quaternion, scale: Vector3): Matrix4;
}
