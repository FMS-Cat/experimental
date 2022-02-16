import { vec3ApplyMatrix4 } from '../vec3/vec3ApplyMatrix4';
import type { RawLine3 } from './RawLine3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';

/**
 * Apply given matrix4 to given line.
 *
 * @param line A line
 * @param matrix A matrix4 which will be applied to the line
 */
export function line3ApplyMatrix4(
  [ start, end ]: RawLine3,
  matrix: RawMatrix4,
): RawLine3 {
  return [
    vec3ApplyMatrix4( start, matrix ),
    vec3ApplyMatrix4( end, matrix ),
  ];
}
