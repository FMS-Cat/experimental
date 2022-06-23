import type { RawQuaternion } from './RawQuaternion';

/**
 * Generate a quaternion rotates around y axis.
 * @param theta An angle around y axis, in degree
 */
export function quatRotationY( theta: number ): RawQuaternion {
  return [ 0.0, Math.sin( theta / 2.0 ), 0.0, Math.cos( theta / 2.0 ) ];
}
