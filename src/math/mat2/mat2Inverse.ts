import { vecScale } from '../vec/vecScale';
import type { RawMatrix2 } from './RawMatrix2';

/**
 * Return an inverse of given matrix.
 */
export function mat2Inverse( m: RawMatrix2 ): RawMatrix2 {
  const
    n11 = m[ 0 ], n21 = m[ 1 ],
    n12 = m[ 2 ], n22 = m[ 3 ],
    det = n11 * n22 - n12 * n21;

  if ( det === 0.0 ) { return vecScale( m, 0.0 ); }

  return vecScale( [
    n22, -n21,
    -n12, n11,
  ], 1.0 / det );
}
