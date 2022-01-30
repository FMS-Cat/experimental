/**
 * Subtract a vector from a vector.
 */
export function vecSub<T extends number[]>( vecA: T, vecB: T ): T {
  return vecA.map( ( v, i ) => v - vecB[ i ] ) as T;
}
