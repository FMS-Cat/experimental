import { vec3OrthoNormalize } from '../vec3/vec3OrthoNormalize';
import type { RawQuaternion } from './RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a quaternion which looks at the direction of `look`.
 */
export function quatLookRotation( look: RawVector3, up?: RawVector3 ): RawQuaternion {
  const { normal, tangent, binormal } = vec3OrthoNormalize( look, up ?? [ 0.0, 1.0, 0.0 ] );

  const w = Math.sqrt( 1.0 + binormal[ 0 ] + tangent[ 1 ] + normal[ 2 ] ) * 0.5;
  const invW4 = 0.25 / w;

  return [
    ( tangent[ 2 ] - normal[ 1 ] ) * invW4,
    ( normal[ 0 ] - binormal[ 2 ] ) * invW4,
    ( binormal[ 1 ] - tangent[ 0 ] ) * invW4,
    w,
  ];
}
