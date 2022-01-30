/**
 * Multiply a vector by a vector.
 */
export function vecMultiply<T extends number[]>( vecA: T, vecB: T ): T {
  return vecA.map( ( v, i ) => v * vecB[ i ] ) as T;
}
