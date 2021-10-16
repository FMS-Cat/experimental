import { vecScale } from '../vec/vecScale';
import type { RawMatrix3 } from './RawMatrix3';

/**
 * Return an inverse of given mat3.
 *
 * Yoinked from Three.js
 */
export function mat3Inverse( m: RawMatrix3 ): RawMatrix3 {
  const
    n11 = m[ 0 ], n21 = m[ 1 ], n31 = m[ 2 ],
    n12 = m[ 3 ], n22 = m[ 4 ], n32 = m[ 5 ],
    n13 = m[ 6 ], n23 = m[ 7 ], n33 = m[ 8 ],
    t11 = n33 * n22 - n32 * n23,
    t12 = n32 * n13 - n33 * n12,
    t13 = n23 * n12 - n22 * n13,
    det = n11 * t11 + n21 * t12 + n31 * t13;

  if ( det === 0.0 ) { return vecScale( m, 0.0 ) as RawMatrix3; }

  return vecScale( [
    t11,
    n31 * n23 - n33 * n21,
    n32 * n21 - n31 * n22,
    t12,
    n33 * n11 - n31 * n13,
    n31 * n12 - n32 * n11,
    t13,
    n21 * n13 - n23 * n11,
    n22 * n11 - n21 * n12,
  ], 1.0 / det ) as RawMatrix3;
}
