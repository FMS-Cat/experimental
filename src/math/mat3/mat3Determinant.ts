import type { RawMatrix3 } from './RawMatrix3';

export function mat3Determinant( m: RawMatrix3 ): number {
  const
    n11 = m[ 0 ], n21 = m[ 1 ], n31 = m[ 2 ],
    n12 = m[ 3 ], n22 = m[ 4 ], n32 = m[ 5 ],
    n13 = m[ 6 ], n23 = m[ 7 ], n33 = m[ 8 ],
    t11 = n33 * n22 - n32 * n23,
    t12 = n32 * n13 - n33 * n12,
    t13 = n23 * n12 - n22 * n13;

  return n11 * t11 + n21 * t12 + n31 * t13;
}
