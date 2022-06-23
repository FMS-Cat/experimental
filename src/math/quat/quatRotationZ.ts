import type { RawQuaternion } from './RawQuaternion';

/**
 * Generate a quaternion rotates around z axis.
 * @param theta An angle around z axis, in degree
 */
export function quatRotationZ( theta: number ): RawQuaternion {
  return [ 0.0, 0.0, Math.sin( theta / 2.0 ), Math.cos( theta / 2.0 ) ];
}
