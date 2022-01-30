/**
 * Scale the given vector by a scalar.
 */
export function vecScale<T extends number[]>( vec: T, scalar: number ): T {
  return vec.map( ( v ) => v * scalar ) as T;
}
