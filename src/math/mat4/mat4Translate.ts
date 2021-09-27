import type { RawMatrix4 } from './RawMatrix4';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Generate a translation matrix.
 */
export function mat4Translate( vec: RawVector3 ): RawMatrix4 {
  return [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    vec[ 0 ], vec[ 1 ], vec[ 2 ], 1
  ];
}
