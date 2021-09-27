import type { RawMatrix4 } from './RawMatrix4';

/**
 * Generate a 3d rotation matrix, rotates around z axis.
 */
export function mat4RotateZ( theta: number ): RawMatrix4 {
  const c = Math.cos( theta );
  const s = Math.sin( theta );

  return [
    c, -s, 0, 0,
    s, c, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ];
}
