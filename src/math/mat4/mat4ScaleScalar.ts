import type { RawMatrix4 } from './RawMatrix4';

/**
 * Generate a 3d scaling matrix by a scalar.
 */
export function mat4ScaleScalar( scalar: number ): RawMatrix4 {
  return [
    scalar, 0, 0, 0,
    0, scalar, 0, 0,
    0, 0, scalar, 0,
    0, 0, 0, 1,
  ];
}
