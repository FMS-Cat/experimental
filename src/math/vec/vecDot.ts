/**
 * Return a dot product of given two vectors.
 */
export function vecDot( vecA: number[], vecB: number[] ): number {
  return vecA.reduce( ( sum, v, i ) => sum + v * vecB[ i ], 0.0 );
}
