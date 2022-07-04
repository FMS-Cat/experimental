import { Matrix4 } from '../mat4/Matrix4';
import { Quaternion } from '../quat/Quaternion';
import { Vector } from '../vec/Vector';
import { RawVector3 } from './RawVector3';
/**
 * A Vector3.
 */
export declare class Vector3 extends Vector<Vector3> {
    elements: RawVector3;
    constructor(v?: RawVector3);
    x: number;
    y: number;
    z: number;
    toString(): string;
    /**
     * Return a cross of this and another Vector3.
     * @param vector Another vector
     */
    cross(vector: Vector3): Vector3;
    /**
     * Rotate this vector using a Quaternion.
     * @param quaternion A quaternion
     */
    applyQuaternion(quaternion: Quaternion): Vector3;
    /**
     * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
     */
    applyMatrix4(matrix: Matrix4): Vector3;
    protected __new(v: RawVector3): Vector3;
    static readonly zero: Vector3;
    static readonly px: Vector3;
    static readonly nx: Vector3;
    static readonly py: Vector3;
    static readonly ny: Vector3;
    static readonly pz: Vector3;
    static readonly nz: Vector3;
    static readonly one: Vector3;
    /**
     * Return a tangent which is orthogonal to normal.
     * If binormal is specified, it is also returned and it's orthogonal to both normal and tangent.
     */
    static orthoNormalize(normal: Vector3, tangent: Vector3, binormal: Vector3): {
        normal: Vector3;
        tangent: Vector3;
        binormal: Vector3;
    };
}
