import { plane3Normalize } from './plane3Normalize';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawPlane3 } from './RawPlane3';

/**
 * Create frustum planes out of given projection matrix.
 *
 * @param m A projection matrix
 */
export function planes3FromProjectionMatrix( m: RawMatrix4 ): RawPlane3[] {
  const
    m11 = m[ 0 ], m12 = m[ 4 ], m13 = m[ 8 ], m14 = m[ 12 ],
    m21 = m[ 1 ], m22 = m[ 5 ], m23 = m[ 9 ], m24 = m[ 13 ],
    m31 = m[ 2 ], m32 = m[ 6 ], m33 = m[ 10 ], m34 = m[ 14 ],
    m41 = m[ 3 ], m42 = m[ 7 ], m43 = m[ 11 ], m44 = m[ 15 ];

  return [
    plane3Normalize( [ [ m41 - m11, m42 - m12, m43 - m13 ], m44 - m14 ] ), // xp
    plane3Normalize( [ [ m41 + m11, m42 + m12, m43 + m13 ], m44 + m14 ] ), // xn
    plane3Normalize( [ [ m41 - m21, m42 - m22, m43 - m23 ], m44 - m24 ] ), // yp
    plane3Normalize( [ [ m41 + m21, m42 + m22, m43 + m23 ], m44 + m24 ] ), // yn
    plane3Normalize( [ [ m41 - m31, m42 - m32, m43 - m33 ], m44 - m34 ] ), // zn
    plane3Normalize( [ [ m41 + m31, m42 + m32, m43 + m33 ], m44 + m34 ] ), // zp
  ];
}
