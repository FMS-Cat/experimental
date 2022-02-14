import { line3At } from './line3At';
import { saturate } from '../utils';
import { vecDot } from '../vec/vecDot';
import { vecSub } from '../vec/vecSub';
import type { RawLine3 } from './RawLine3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a point that is on the given line which is closest to the given point.
 *
 * If `segment` is true, it will treat the line as a segment which has start and end.
 * Otherwise it will treat the line is infinite.
 *
 * @param line A line
 * @param point A point
 * @param segment Is the line a segment?
 */
export function line3ClosestPointToPoint(
  line: RawLine3,
  point: RawVector3,
  segment?: boolean,
): RawVector3 {
  const ap = vecSub( point, line[ 0 ] );
  const ab = vecSub( line[ 1 ], line[ 0 ] );

  let t = vecDot( ap, ab ) / vecDot( ab, ab );
  segment && ( t = saturate( t ) );

  return line3At( line, t );
}
