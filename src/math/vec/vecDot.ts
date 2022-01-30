/**
 * Return a dot product of given two vectors.
 */
export function vecDot<T extends number[]>( vecA: T, vecB: T ): number {
  return vecA.reduce( ( sum, v, i ) => sum + v * vecB[ i ], 0.0 );
}
