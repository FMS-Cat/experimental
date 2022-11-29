import { RawMatrix2 } from './RawMatrix2';
/**
 * A Matrix2.
 */
export declare class Matrix2 {
    elements: RawMatrix2;
    constructor(v?: RawMatrix2);
    readonly transpose: Matrix2;
    readonly determinant: number;
    readonly inverse: Matrix2;
    toString(): string;
    /**
     * Clone this.
     */
    clone(): Matrix2;
    /**
     * Multiply this Matrix2 by one or more Matrix2s.
     */
    multiply(...matrices: Matrix2[]): Matrix2;
    /**
     * Multiply this Matrix3 by a scalar.
     */
    scaleScalar(scalar: number): Matrix2;
    static readonly identity: Matrix2;
    /**
     * Multiply two or more matrices.
     * @param matrices Matrices
     */
    static multiply(...matrices: Matrix2[]): Matrix2;
}
