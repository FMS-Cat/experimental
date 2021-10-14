/**
 * GLSL Style `mod` function.
 * "compute value of one parameter modulo another"
 */
export function mod( value: number, divisor: number ): number {
  return value - Math.floor( value / divisor ) * divisor;
}
