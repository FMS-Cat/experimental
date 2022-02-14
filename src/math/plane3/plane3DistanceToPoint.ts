import { vecDot } from '../vec/vecDot';
import type { RawPlane3 } from './RawPlane3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a signed distance from given plane to the given point.
 * Make sure the `normal` is normalized.
 */
export function plane3DistanceToPoint(
  [ normal, distance ]: RawPlane3,
  point: RawVector3,
): number {
  return vecDot( normal, point ) + distance;
}
