import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawVector3 } from './RawVector3';

/**
 * Apply a vec3 a mat3.
 */
export function vec3ApplyMatrix3( v: RawVector3, m: RawMatrix3 ): RawVector3 {
  return [
    m[ 0 ] * v[ 0 ] + m[ 3 ] * v[ 1 ] + m[ 6 ] * v[ 2 ],
    m[ 1 ] * v[ 0 ] + m[ 4 ] * v[ 1 ] + m[ 7 ] * v[ 2 ],
    m[ 2 ] * v[ 0 ] + m[ 5 ] * v[ 1 ] + m[ 8 ] * v[ 2 ],
  ];
}
