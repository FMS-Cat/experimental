/**
 * Subtract a vector from a vector.
 */
export function vecSub( vecA: number[], vecB: number[] ): number[] {
  return vecA.map( ( v, i ) => v - vecB[ i ] );
}
