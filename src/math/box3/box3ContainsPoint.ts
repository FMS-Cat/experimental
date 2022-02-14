import type { RawBox3 } from './RawBox3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Test if given point is contained in given box or not.
 * @param box A box
 * @param point A point
 */
export function box3ContainsPoint( box: RawBox3, point: RawVector3 ): boolean {
  return (
    box[ 0 ][ 0 ] <= point[ 0 ] &&
    box[ 1 ][ 0 ] >= point[ 0 ] &&
    box[ 0 ][ 1 ] <= point[ 1 ] &&
    box[ 1 ][ 1 ] >= point[ 1 ] &&
    box[ 0 ][ 2 ] <= point[ 2 ] &&
    box[ 1 ][ 2 ] >= point[ 2 ]
  );
}
