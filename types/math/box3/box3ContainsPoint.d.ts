import type { RawBox3 } from './RawBox3';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * Test if given point is contained in given box or not.
 * @param box A box
 * @param point A point
 */
export declare function box3ContainsPoint(box: RawBox3, point: RawVector3): boolean;
