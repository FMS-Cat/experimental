import type { RawPlane3 } from './RawPlane3';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * Test if given point is contained in given planes or not.
 *
 * @param planes A list of planes
 * @param point A point
 */
export declare function planes3ContainPoint(planes: RawPlane3[], point: RawVector3): boolean;
