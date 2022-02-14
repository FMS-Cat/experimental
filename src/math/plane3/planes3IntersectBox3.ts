import { plane3DistanceToPoint } from './plane3DistanceToPoint';
import type { RawBox3 } from '../box3/RawBox3';
import type { RawPlane3 } from './RawPlane3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Test if given box intersects with planes or not.
 *
 * @param planes A list of planes
 * @param box A box3
 */
export function planes3IntersectBox3( planes: RawPlane3[], box: RawBox3 ): boolean {
  return planes.every( ( plane ) => {
    const v = plane[ 0 ].map( ( nc, i ) => box[ nc > 0.0 ? 1 : 0 ][ i ] ) as RawVector3;
    return plane3DistanceToPoint( plane, v ) >= 0.0;
  } );
}
