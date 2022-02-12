import type { RawQuaternion } from './RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * Generate a Quaternion out of axis and angle.
 */
export declare function quatFromAxisAngle(axis: RawVector3, angle: number): RawQuaternion;
