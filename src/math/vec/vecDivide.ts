/**
 * Divide a vector by a vector.
 */
export function vecDivide( vecA: number[], vecB: number[] ): number[] {
  return vecA.map( ( v, i ) => v / vecB[ i ] );
}