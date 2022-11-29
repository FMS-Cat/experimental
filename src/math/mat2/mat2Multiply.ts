import type { RawMatrix2 } from './RawMatrix2';

/**
 * Return a multiplication result of matrices.
 */
export function mat2Multiply( ...mats: RawMatrix2[] ): RawMatrix2 {
  if ( mats.length < 2 ) {
    return mats[ 0 ];
  }

  const a = mats.shift()!;
  const b = mat2Multiply( ...mats );
  const
    a00 = a[ 0 ], a01 = a[ 1 ],
    a10 = a[ 2 ], a11 = a[ 3 ],
    b00 = b[ 0 ], b01 = b[ 1 ],
    b10 = b[ 2 ], b11 = b[ 3 ];

  return [
    a00 * b00 + a10 * b01,
    a01 * b00 + a11 * b01,

    a00 * b10 + a10 * b11,
    a01 * b10 + a11 * b11,
  ];
}
