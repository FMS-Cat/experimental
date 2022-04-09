import { vec3ApplyMatrix3 } from '../vec3/vec3ApplyMatrix3';
import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawVector3 } from '../vec3/RawVector3';
import type { RawVector4 } from './RawVector4';

/**
 * Apply a vec4 a mat3 (with an implicit 1 on m44).
 */
export function vec4ApplyMatrix3( v: RawVector4, m: RawMatrix3 ): RawVector4 {
  const v3: RawVector3 = [ v[ 0 ], v[ 1 ], v[ 2 ] ];
  const xyz = vec3ApplyMatrix3( v3, m );
  const w = v[ 3 ];
  return [ xyz[ 0 ], xyz[ 1 ], xyz[ 2 ], w ];
}
