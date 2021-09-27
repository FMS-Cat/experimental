import type { RawMatrix4 } from './RawMatrix4';

/**
 * Return a multiplication result of matrices.
 */
export function mat4Multiply( ...mats: RawMatrix4[] ): RawMatrix4 {
  if ( mats.length < 2 ) {
    return mats[ 0 ];
  }

  const a = mats.shift()!;
  const b = mat4Multiply( ...mats );
  const
    a00 = a[  0 ], a01 = a[  1 ], a02 = a[  2 ], a03 = a[  3 ],
    a10 = a[  4 ], a11 = a[  5 ], a12 = a[  6 ], a13 = a[  7 ],
    a20 = a[  8 ], a21 = a[  9 ], a22 = a[ 10 ], a23 = a[ 11 ],
    a30 = a[ 12 ], a31 = a[ 13 ], a32 = a[ 14 ], a33 = a[ 15 ],
    b00 = b[  0 ], b01 = b[  1 ], b02 = b[  2 ], b03 = b[  3 ],
    b10 = b[  4 ], b11 = b[  5 ], b12 = b[  6 ], b13 = b[  7 ],
    b20 = b[  8 ], b21 = b[  9 ], b22 = b[ 10 ], b23 = b[ 11 ],
    b30 = b[ 12 ], b31 = b[ 13 ], b32 = b[ 14 ], b33 = b[ 15 ];

  return [
    a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03,
    a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03,
    a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03,
    a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03,

    a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13,
    a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13,
    a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13,
    a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13,

    a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23,
    a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23,
    a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23,
    a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23,

    a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33,
    a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33,
    a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33,
    a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33,
  ];
}
