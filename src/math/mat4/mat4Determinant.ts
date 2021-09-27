import type { RawMatrix4 } from './RawMatrix4';

/**
 * Return a determinant of given mat4.
 */
export function mat4Determinant( m: RawMatrix4 ): number {
  const
    a00 = m[  0 ], a01 = m[  1 ], a02 = m[  2 ], a03 = m[  3 ],
    a10 = m[  4 ], a11 = m[  5 ], a12 = m[  6 ], a13 = m[  7 ],
    a20 = m[  8 ], a21 = m[  9 ], a22 = m[ 10 ], a23 = m[ 11 ],
    a30 = m[ 12 ], a31 = m[ 13 ], a32 = m[ 14 ], a33 = m[ 15 ],
    b00 = a00 * a11 - a01 * a10,  b01 = a00 * a12 - a02 * a10,
    b02 = a00 * a13 - a03 * a10,  b03 = a01 * a12 - a02 * a11,
    b04 = a01 * a13 - a03 * a11,  b05 = a02 * a13 - a03 * a12,
    b06 = a20 * a31 - a21 * a30,  b07 = a20 * a32 - a22 * a30,
    b08 = a20 * a33 - a23 * a30,  b09 = a21 * a32 - a22 * a31,
    b10 = a21 * a33 - a23 * a31,  b11 = a22 * a33 - a23 * a32;

  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}
