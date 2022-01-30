/**
 * Divide a vector by a vector.
 */
export function vecDivide<T extends number[]>( vecA: T, vecB: T ): T {
  return vecA.map( ( v, i ) => v / vecB[ i ] ) as T;
}
