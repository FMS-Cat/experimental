import type { RawMatrix4 } from './RawMatrix4';

/**
 * Generate a 3d rotation matrix, rotates around y axis.
 */
export function mat4RotateY( theta: number ): RawMatrix4 {
  const c = Math.cos( theta );
  const s = Math.sin( theta );

  return [
    c, 0, s, 0,
    0, 1, 0, 0,
    -s, 0, c, 0,
    0, 0, 0, 1,
  ];
}
