import type { RawMatrix3 } from './RawMatrix3';

/**
 * Return a multiplication result of matrices.
 */
export function mat3Multiply( ...mats: RawMatrix3[] ): RawMatrix3 {
  if ( mats.length < 2 ) {
    return mats[ 0 ];
  }

  const a = mats.shift()!;
  const b = mat3Multiply( ...mats );
  const
    a00 = a[ 0 ], a01 = a[ 1 ], a02 = a[ 2 ],
    a10 = a[ 3 ], a11 = a[ 4 ], a12 = a[ 5 ],
    a20 = a[ 6 ], a21 = a[ 7 ], a22 = a[ 8 ],
    b00 = b[ 0 ], b01 = b[ 1 ], b02 = b[ 2 ],
    b10 = b[ 3 ], b11 = b[ 4 ], b12 = b[ 5 ],
    b20 = b[ 6 ], b21 = b[ 7 ], b22 = b[ 8 ];

  return [
    a00 * b00 + a10 * b01 + a20 * b02,
    a01 * b00 + a11 * b01 + a21 * b02,
    a02 * b00 + a12 * b01 + a22 * b02,

    a00 * b10 + a10 * b11 + a20 * b12,
    a01 * b10 + a11 * b11 + a21 * b12,
    a02 * b10 + a12 * b11 + a22 * b12,

    a00 * b20 + a10 * b21 + a20 * b22,
    a01 * b20 + a11 * b21 + a21 * b22,
    a02 * b20 + a12 * b21 + a22 * b22,
  ];
}
