/**
 * Scale the given vector by a scalar.
 */
export function vecScale( vec: number[], scalar: number ): number[] {
  return vec.map( ( v ) => v * scalar );
}
