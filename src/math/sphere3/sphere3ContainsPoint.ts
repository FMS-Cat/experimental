import { vecLengthSq } from '../vec/vecLengthSq';
import { vecSub } from '../vec/vecSub';
import type { RawSphere3 } from './RawSphere3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Test if given point is contained in given sphere or not.
 * @param sphere A sphere
 * @param point A point
 */
export function sphere3ContainsPoint( sphere: RawSphere3, point: RawVector3 ): boolean {
  return vecLengthSq( vecSub( sphere[ 0 ], point ) ) <= sphere[ 1 ] * sphere[ 1 ];
}
