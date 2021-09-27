/**
 * Multiply a vector by a vector.
 */
export function vecMultiply( vecA: number[], vecB: number[] ): number[] {
  return vecA.map( ( v, i ) => v * vecB[ i ] );
}
