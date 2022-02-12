/**
 * Compute a one dimensional edt from the source data.
 * Returning distance will be squared.
 * Intended to be used internally in {@link edt2d}.
 *
 * @param data Data of the source
 * @param offset Offset of the source from beginning
 * @param stride Stride of the source
 * @param length Length of the source
 */
export declare function edt1d(data: Float32Array, offset: number, stride: number, length: number): void;
/**
 * Compute a two dimensional edt from the source data.
 * Returning distance will be squared.
 *
 * @param data Data of the source.
 * @param width Width of the source.
 * @param height Height of the source.
 */
export declare function edt2d(data: Float32Array, width: number, height: number): void;
