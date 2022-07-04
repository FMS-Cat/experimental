import { Matrix4 } from '../mat4/Matrix4';
import { Vector } from '../vec/Vector';
import { Matrix3 } from '../mat3/Matrix3';
import { RawVector4 } from './RawVector4';
/**
 * A Vector3.
 */
export declare class Vector4 extends Vector<Vector4> {
    elements: RawVector4;
    constructor(v?: RawVector4);
    x: number;
    y: number;
    z: number;
    w: number;
    toString(): string;
    /**
     * Apply this vector a mat3 (with an implicit 1 on m44).
     */
    applyMatrix3(matrix: Matrix3): Vector4;
    /**
     * Multiply this vector by a mat4.
     */
    applyMatrix4(matrix: Matrix4): Vector4;
    protected __new(v: RawVector4): Vector4;
    static readonly zero: Vector4;
    static readonly one: Vector4;
}
