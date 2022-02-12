import type { RawQuaternion } from './RawQuaternion';
/**
 * Interpolate between two quaternions.
 * @param a "from" quaternion
 * @param b "to" quaternion
 * @param t How much do we want to rotate the a to b
 */
export declare function quatSlerp(a: RawQuaternion, b: RawQuaternion, t: number): RawQuaternion;
