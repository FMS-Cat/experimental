/**
 * Return an euclidean length of given vector.
 */
export function vecLength( vec: number[] ): number {
  return Math.sqrt( vec.reduce( ( sum, v ) => sum + v * v, 0.0 ) );
}
