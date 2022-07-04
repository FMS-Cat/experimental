import { Matrix4 } from '../mat4/Matrix4';
import { Vector } from '../vec/Vector';
import type { Matrix3 } from '../mat3/Matrix3';
import type { RawVector4 } from './RawVector4';
/**
 * A Vector3.
 */
export declare class Vector4 extends Vector<Vector4> {
    elements: RawVector4;
    constructor(v?: RawVector4);
    /**
     * An x component of this.
     */
    get x(): number;
    set x(x: number);
    /**
     * A y component of this.
     */
    get y(): number;
    set y(y: number);
    /**
     * A z component of this.
     */
    get z(): number;
    set z(z: number);
    /**
     * A w component of this.
     */
    get w(): number;
    set w(z: number);
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
    /**
     * Vector4( 0.0, 0.0, 0.0, 0.0 )
     */
    static get zero(): Vector4;
    /**
     * Vector4( 1.0, 1.0, 1.0, 1.0 )
     */
    static get one(): Vector4;
}
