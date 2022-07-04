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
export declare function line3ClosestPointToPoint(line: RawLine3, point: RawVector3, segment?: boolean): RawVector3;
