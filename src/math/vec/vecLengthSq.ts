/**
 * Return an squared euclidean length of given vector.
 */
export function vecLengthSq<T extends number[]>( vec: T ): number {
  return vec.reduce( ( sum, v ) => sum + v * v, 0.0 );
}
