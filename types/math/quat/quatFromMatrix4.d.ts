import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawQuaternion } from './RawQuaternion';
/**
 * Generate a Quaternion out of a rotation matrix.
 */
export declare function quatFromMatrix4(m: RawMatrix4): RawQuaternion;
