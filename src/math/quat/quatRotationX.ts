import type { RawQuaternion } from './RawQuaternion';

/**
 * Generate a quaternion rotates around x axis.
 * @param theta An angle around x axis, in degree
 */
export function quatRotationX( theta: number ): RawQuaternion {
  return [ Math.sin( theta / 2.0 ), 0.0, 0.0, Math.cos( theta / 2.0 ) ];
}
