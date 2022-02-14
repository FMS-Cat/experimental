import { RawSphere3 } from '../sphere3/RawSphere3';
import { plane3DistanceToPoint } from './plane3DistanceToPoint';
import type { RawPlane3 } from './RawPlane3';

/**
 * Test if given sphere intersects with planes or not.
 *
 * It does not do strict intersection test but still should work well with frustum cull use cases.
 * See the test case for more details.
 *
 * @param planes A list of planes
 * @param sphere A sphere3
 */
export function planes3IntersectSphere3( planes: RawPlane3[], sphere: RawSphere3 ): boolean {
  return planes.every( ( plane ) => (
    plane3DistanceToPoint( plane, sphere[ 0 ] ) >= -sphere[ 1 ]
  ) );
}
