import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawVector3 } from './RawVector3';
import { vec4ApplyMatrix4 } from '../vec4/vec4ApplyMatrix4';
import { vecScale } from '../vec/vecScale';

/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a mat4.
 */
export function vec3ApplyMatrix4( v: RawVector3, m: RawMatrix4 ): RawVector3 {
  const vec4 = vec4ApplyMatrix4( [ ...v, 1 ], m );
  const w = vec4.pop()!;
  return vecScale( vec4, 1.0 / w ) as RawVector3;
}
