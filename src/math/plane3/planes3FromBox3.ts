import type { RawBox3 } from '../box3/RawBox3';
import type { RawPlane3 } from './RawPlane3';

/**
 * Generate a set of plane3 out of a {@link RawBox3}.
 *
 * @param box A box
 */
export function planes3FromBox3( box: RawBox3 ): RawPlane3[] {
  return [
    [ [ 1.0, 0.0, 0.0 ], -box[ 0 ][ 0 ] ], // xn
    [ [ -1.0, 0.0, 0.0 ], box[ 1 ][ 0 ] ], // xp
    [ [ 0.0, 1.0, 0.0 ], -box[ 0 ][ 1 ] ], // yn
    [ [ 0.0, -1.0, 0.0 ], box[ 1 ][ 1 ] ], // yp
    [ [ 0.0, 0.0, 1.0 ], -box[ 0 ][ 2 ] ], // yn
    [ [ 0.0, 0.0, -1.0 ], box[ 1 ][ 2 ] ], // yp
  ];
}
