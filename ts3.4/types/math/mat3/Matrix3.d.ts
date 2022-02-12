import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { RawMatrix3 } from './RawMatrix3';
/**
 * A Matrix3.
 */
export declare class Matrix3 {
    elements: RawMatrix3;
    constructor(v?: RawMatrix3);
    readonly transpose: Matrix3;
    readonly determinant: number;
    readonly inverse: Matrix3;
    readonly matrix4: Matrix4;
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Matrix3;
    /**
     * Multiply this Matrix3 by one or more Matrix3s.
     */
    multiply(...matrices: Matrix3[]): Matrix3;
    /**
     * Multiply this Matrix3 by a scalar.
     */
    scaleScalar(scalar: number): Matrix3;
    static readonly identity: Matrix3;
    /**
     * Multiply two or more matrices.
     * @param matrices Matrices
     */
    static multiply(...matrices: Matrix3[]): Matrix3;
    /**
     * Cast a {@link Matrix4} into a Matrix3.
     * @param matrix4 A matrix4
     */
    static fromMatrix4(matrix4: Matrix4): Matrix3;
    /**
     * Create a matrix out of a {@link Quaternion}.
     * @param quaternion A quaternion
     */
    static fromQuaternion(quaternion: Quaternion): Matrix3;
}
