import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawMatrix4 } from './RawMatrix4';

/**
 * Create a matrix4 from matrix3.
 */
export function mat4FromMat3(
  source: RawMatrix3,
): RawMatrix4 {
  return [
    source[ 0 ], source[ 1 ], source[ 2 ], 0.0,
    source[ 3 ], source[ 4 ], source[ 5 ], 0.0,
    source[ 6 ], source[ 7 ], source[ 8 ], 0.0,
    0.0, 0.0, 0.0, 1.0,
  ];
}
