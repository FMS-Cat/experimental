import type { RawQuaternion } from './RawQuaternion';

/**
 * Return an inverse of a quaternion.
 */
export function quatInverse( quat: RawQuaternion ): RawQuaternion {
  return [ -quat[ 0 ], -quat[ 1 ], -quat[ 2 ], quat[ 3 ] ];
}
