import type { RawMatrix4 } from './RawMatrix4';

/**
 * Generate a 3d rotation matrix, rotates around x axis.
 */
export function mat4RotateX( theta: number ): RawMatrix4 {
  const c = Math.cos( theta );
  const s = Math.sin( theta );

  return [
    1, 0, 0, 0,
    0, c, -s, 0,
    0, s, c, 0,
    0, 0, 0, 1,
  ];
}
