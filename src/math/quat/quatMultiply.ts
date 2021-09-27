import type { RawQuaternion } from './RawQuaternion';

/**
 * Return a multiplication result of quaternions.
 */
export function quatMultiply( ...quats: RawQuaternion[] ): RawQuaternion {
  if ( quats.length < 2 ) {
    return quats[ 0 ];
  }

  const a = quats.shift()!;
  const b = quatMultiply( ...quats );

  return [
    a[ 3 ] * b[ 0 ] + a[ 0 ] * b[ 3 ] + a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ],
    a[ 3 ] * b[ 1 ] - a[ 0 ] * b[ 2 ] + a[ 1 ] * b[ 3 ] + a[ 2 ] * b[ 0 ],
    a[ 3 ] * b[ 2 ] + a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] + a[ 2 ] * b[ 3 ],
    a[ 3 ] * b[ 3 ] - a[ 0 ] * b[ 0 ] - a[ 1 ] * b[ 1 ] - a[ 2 ] * b[ 2 ],
  ];
}
