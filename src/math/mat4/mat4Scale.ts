import type { RawMatrix4 } from './RawMatrix4';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Generate a 3d scaling matrix.
 */
export function mat4Scale( vec: RawVector3 ): RawMatrix4 {
  return [
    vec[ 0 ], 0, 0, 0,
    0, vec[ 1 ], 0, 0,
    0, 0, vec[ 2 ], 0,
    0, 0, 0, 1,
  ];
}
