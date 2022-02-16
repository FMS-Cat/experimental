import { vecDot } from '../vec/vecDot';
import { vecSub } from '../vec/vecSub';
import type { RawRay3 } from './RawRay3';
import type { RawSphere3 } from '../sphere3/RawSphere3';

/**
 * Return distances from given ray to sphere.
 *
 * The returning distance can be negative.
 *
 * The first returning value will be the distance of the incident point.
 * If the ray does not intersect with sphere, it will return `null`.
 *
 * @param ray A ray
 * @param sphere A target sphere
 */
export function ray3DistanceToSphere(
  [ ro, rd ]: RawRay3,
  sphere: RawSphere3,
): [ number, number ] | null {
  const v = vecSub( ro, sphere[ 0 ] );
  const b = vecDot( v, rd );
  const c = vecDot( v, v ) - sphere[ 1 ];
  const d = b * b - c;

  if ( d < 0.0 ) { return null; }

  const sqrtD = Math.sqrt( d );

  return [ -b - sqrtD, -b + sqrtD ];
}
