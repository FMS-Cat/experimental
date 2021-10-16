import type { RawMatrix3 } from './RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';

/**
 * Who needs this?
 */
export function mat3FromMat4Transpose(
  source: RawMatrix4,
): RawMatrix3 {
  return [
    source[ 0 ], source[ 4 ], source[ 8 ],
    source[ 1 ], source[ 5 ], source[ 9 ],
    source[ 2 ], source[ 6 ], source[ 10 ],
  ];
}
