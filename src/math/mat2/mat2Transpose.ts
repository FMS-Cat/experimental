import type { RawMatrix2 } from './RawMatrix2';

/**
 * Transpose a mat2.
 */
export function mat2Transpose(
  source: RawMatrix2,
): RawMatrix2 {
  return [
    source[ 0 ], source[ 2 ],
    source[ 1 ], source[ 3 ],
  ];
}
