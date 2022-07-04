import { RawLine3 } from './RawLine3';
import { RawVector3 } from '../vec3/RawVector3';
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
export declare function line3DistanceToPoint(line: RawLine3, point: RawVector3, segment?: boolean): number;
