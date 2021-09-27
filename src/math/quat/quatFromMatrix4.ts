import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawQuaternion } from './RawQuaternion';

/**
 * Generate a Quaternion out of a rotation matrix.
 * Yoinked from Three.js.
 */
export function quatFromMatrix4( m: RawMatrix4 ): RawQuaternion {
  const m11 = m[ 0 ], m12 = m[ 4 ], m13 = m[ 8 ],
    m21 = m[ 1 ], m22 = m[ 5 ], m23 = m[ 9 ],
    m31 = m[ 2 ], m32 = m[ 6 ], m33 = m[ 10 ],
    trace = m11 + m22 + m33;

  if ( trace > 0 ) {
    const s = 0.5 / Math.sqrt( trace + 1.0 );
    return [
      ( m32 - m23 ) * s,
      ( m13 - m31 ) * s,
      ( m21 - m12 ) * s,
      0.25 / s
    ];
  } else if ( m11 > m22 && m11 > m33 ) {
    const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );
    return [
      0.25 * s,
      ( m12 + m21 ) / s,
      ( m13 + m31 ) / s,
      ( m32 - m23 ) / s
    ];
  } else if ( m22 > m33 ) {
    const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );
    return [
      ( m12 + m21 ) / s,
      0.25 * s,
      ( m23 + m32 ) / s,
      ( m13 - m31 ) / s
    ];
  } else {
    const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );
    return [
      ( m13 + m31 ) / s,
      ( m23 + m32 ) / s,
      0.25 * s,
      ( m21 - m12 ) / s
    ];
  }
}
