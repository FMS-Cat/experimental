import type { RawMatrix4 } from './RawMatrix4';
import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';
import { mat4FromQuaternion } from './mat4FromQuaternion';

/**
 * Compose a matrix out of position, scale, and rotation.
 * Yoinked from Three.js.
 */
export function mat4Compose(
  position: RawVector3,
  rotation: RawQuaternion,
  scale: RawVector3,
): RawMatrix4 {
  const matRot = mat4FromQuaternion( rotation );

  const sx = scale[ 0 ], sy = scale[ 1 ], sz = scale[ 2 ];

  return [
    matRot[ 0 ] * sx,
    matRot[ 1 ] * sx,
    matRot[ 2 ] * sx,
    0.0,

    matRot[ 4 ] * sy,
    matRot[ 5 ] * sy,
    matRot[ 6 ] * sy,
    0.0,

    matRot[ 8 ] * sz,
    matRot[ 9 ] * sz,
    matRot[ 10 ] * sz,
    0.0,

    position[ 0 ],
    position[ 1 ],
    position[ 2 ],
    1.0
  ];
}
