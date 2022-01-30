/**
 * Return an euclidean length of given vector.
 */
export function vecLength<T extends number[]>( vec: T ): number {
  return Math.sqrt( vec.reduce( ( sum, v ) => sum + v * v, 0.0 ) );
}
