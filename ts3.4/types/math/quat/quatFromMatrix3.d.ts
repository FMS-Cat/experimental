import { RawMatrix3 } from '../mat3/RawMatrix3';
import { RawQuaternion } from './RawQuaternion';
/**
 * Generate a Quaternion out of a rotation matrix.
 * Yoinked from Three.js.
 */
export declare function quatFromMatrix3(m: RawMatrix3): RawQuaternion;
