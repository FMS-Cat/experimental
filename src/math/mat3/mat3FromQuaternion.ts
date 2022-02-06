import type { RawMatrix3 } from './RawMatrix3';
import type { RawQuaternion } from '../quat/RawQuaternion';

/**
 * Convert a quaternion into a matrix3.
 *
 * Yoinked from Three.js.
 *
 * See: https://threejs.org/docs/#api/en/math/Matrix4.makeRotationFromQuaternion
 */
export function mat3FromQuaternion( quat: RawQuaternion ): RawMatrix3 {
  const x = quat[ 0 ];
  const y = quat[ 1 ];
  const z = quat[ 2 ];
  const w = quat[ 3 ];

  return [
    1.0 - 2.0 * y * y - 2.0 * z * z, 2.0 * x * y + 2.0 * z * w, 2.0 * x * z - 2.0 * y * w,
    2.0 * x * y - 2.0 * z * w, 1.0 - 2.0 * x * x - 2.0 * z * z, 2.0 * y * z + 2.0 * x * w,
    2.0 * x * z + 2.0 * y * w, 2.0 * y * z - 2.0 * x * w, 1.0 - 2.0 * x * x - 2.0 * y * y,
  ];
}
