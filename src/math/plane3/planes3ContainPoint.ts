import { plane3DistanceToPoint } from './plane3DistanceToPoint';
import type { RawPlane3 } from './RawPlane3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Test if given point is contained in given planes or not.
 *
 * @param planes A list of planes
 * @param point A point
 */
export function planes3ContainPoint( planes: RawPlane3[], point: RawVector3 ): boolean {
  return planes.every( ( plane ) => plane3DistanceToPoint( plane, point ) >= 0.0 );
}
