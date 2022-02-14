import { line3ClosestPointToPoint } from './line3ClosestPointToPoint';
import { vecLength } from '../vec/vecLength';
import { vecSub } from '../vec/vecSub';
import type { RawLine3 } from './RawLine3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a distance from the given line to the given point.
 *
 * If `segment` is true, it will treat the line as a segment which has start and end.
 * Otherwise it will treat the line is infinite.
 *
 * @param line A line
 * @param point A point
 * @param segment Is the line a segment?
 */
export function line3DistanceToPoint(
  line: RawLine3,
  point: RawVector3,
  segment?: boolean,
): number {
  return vecLength( vecSub(
    line3ClosestPointToPoint( line, point, segment ),
    point,
  ) );
}
