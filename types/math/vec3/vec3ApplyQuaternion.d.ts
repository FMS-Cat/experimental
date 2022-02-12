import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from './RawVector3';
/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a quaternion.
 */
export declare function vec3ApplyQuaternion(vec: RawVector3, quat: RawQuaternion): RawVector3;
