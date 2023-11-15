/**
 * Return a linear interpolation of two vectors.
 * The {@link t} won't be clamped.
 *
 * @param vecA - A vector
 * @param vecB - Another vector
 * @param t - A number interpolating two vectors. Usually in range [0, 1] but not clamped
 */
export function vecLerp<T extends number[]>( vecA: T, vecB: T, t: number ): T {
  return vecA.map( ( v, i ) => v + ( vecB[ i ] - v ) * t ) as T;
}
