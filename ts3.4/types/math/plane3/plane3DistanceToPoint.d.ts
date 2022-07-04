import { RawPlane3 } from './RawPlane3';
import { RawVector3 } from '../vec3/RawVector3';
/**
 * Return a signed distance from given plane to the given point.
 * Make sure the `normal` is normalized.
 */
export declare function plane3DistanceToPoint([normal, distance]: RawPlane3, point: RawVector3): number;
