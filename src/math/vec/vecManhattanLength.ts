/**
 * Return a manhattan length of given vector.
 */
 export function vecManhattanLength<T extends number[]>( vec: T ): number {
  return vec.reduce( ( sum, v ) => sum + Math.abs( v ), 0.0 );
}
