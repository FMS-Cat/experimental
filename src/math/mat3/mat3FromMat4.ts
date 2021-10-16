import type { RawMatrix3 } from './RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';

/**
 * Create a matrix3 from matrix4.
 */
export function mat3FromMat4(
  source: RawMatrix4,
): RawMatrix3 {
  return [
    source[ 0 ], source[ 1 ], source[ 2 ],
    source[ 4 ], source[ 5 ], source[ 6 ],
    source[ 8 ], source[ 9 ], source[ 10 ],
  ];
}
