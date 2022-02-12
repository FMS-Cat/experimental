import type { EulerOrder } from '../euler/EulerOrder';
import type { RawQuaternion } from './RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * Generate a Quaternion out of euler angles.
 */
export declare function quatFromEuler(euler: RawVector3, order?: EulerOrder): RawQuaternion;
