import { mod } from './mod';

/**
 * Enclose arbitrary angle (in radian) into [-π, π)
 */
export function sanitizeAngle( angle: number ): number {
  return mod( angle + Math.PI, 2.0 * Math.PI ) - Math.PI;
}
