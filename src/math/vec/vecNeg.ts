/**
 * Negate a vector.
 */
export function vecNeg<T extends number[]>( vec: T ): T {
  return vec.map( ( v ) => -v ) as T;
}
