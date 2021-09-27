import type { RawMatrix4 } from '.';
import type { RawQuaternion } from '../quat/RawQuaternion';

/**
 * Convert a quaternion into a matrix4.
 *
 * Yoinked from Three.js.
 *
 * See: https://threejs.org/docs/#api/en/math/Matrix4.makeRotationFromQuaternion
 */
export function mat4FromQuaternion( quat: RawQuaternion ): RawMatrix4 {
  const x = quat[ 0 ];
  const y = quat[ 1 ];
  const z = quat[ 2 ];
  const w = quat[ 3 ];

  return [
    1.0 - 2.0 * y * y - 2.0 * z * z, 2.0 * x * y + 2.0 * z * w, 2.0 * x * z - 2.0 * y * w, 0.0,
    2.0 * x * y - 2.0 * z * w, 1.0 - 2.0 * x * x - 2.0 * z * z, 2.0 * y * z + 2.0 * x * w, 0.0,
    2.0 * x * z + 2.0 * y * w, 2.0 * y * z - 2.0 * x * w, 1.0 - 2.0 * x * x - 2.0 * y * y, 0.0,
    0.0, 0.0, 0.0, 1.0,
  ];
}
