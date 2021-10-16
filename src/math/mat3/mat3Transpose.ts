import type { RawMatrix3 } from './RawMatrix3';

/**
 * Transpose a mat3.
 */
export function mat3Transpose(
  source: RawMatrix3,
): RawMatrix3 {
  return [
    source[ 0 ], source[ 3 ], source[ 6 ],
    source[ 1 ], source[ 4 ], source[ 7 ],
    source[ 2 ], source[ 5 ], source[ 8 ],
  ];
}
