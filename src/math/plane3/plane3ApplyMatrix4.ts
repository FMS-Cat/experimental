import { vec3ApplyMatrix3 } from '../vec3/vec3ApplyMatrix3';
import { vec3ApplyMatrix4 } from '../vec3/vec3ApplyMatrix4';
import { vecDot } from '../vec/vecDot';
import { vecNormalize } from '../vec/vecNormalize';
import { vecScale } from '../vec/vecScale';
import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawPlane3 } from './RawPlane3';

/**
 * Apply given matrix4 to given plane.
 *
 * @param plane A plane
 * @param matrix A matrix4 which will be applied to the plane
 * @param normalMatrix A normalMatrix made out of {@link matrix}
 */
export function plane3ApplyMatrix4(
  [ normal, distance ]: RawPlane3,
  matrix: RawMatrix4,
  normalMatrix: RawMatrix3,
): RawPlane3 {
  // normalなんだからnormalMatrix当てればヨシ！
  const newNormal = vecNormalize( vec3ApplyMatrix3( normal, normalMatrix ) );

  // とりあえず一点観測してあとでdot取り直しちゃおうぜ！
  const coplanar = vecScale( normal, -distance );
  const refPoint = vec3ApplyMatrix4( coplanar, matrix );
  const newDistance = -vecDot( refPoint, normal );

  return [ newNormal, newDistance ];
}
