import { vec3Cross } from '.';
import { vecDot, vecNeg, vecNormalize, vecScale, vecSub } from '..';
import type { RawVector3 } from './RawVector3';

/**
 * Return a tangent which is orthogonal to normal.
 * If binormal is specified, it is also returned and it's orthogonal to both normal and tangent.
 */
export function vec3OrthoNormalize(
  normal: RawVector3,
  tangent: RawVector3 = [ 0.0, 1.0, 0.0 ],
  binormal?: RawVector3,
): {
    normal: RawVector3,
    tangent: RawVector3,
    binormal: RawVector3,
  } {
  const n = vecNormalize( normal );

  const dotNT = vecDot( n, tangent );
  const t = vecNormalize( vecSub( tangent, vecScale( n, dotNT ) ) );

  let b = vec3Cross( n, t );
  if ( binormal && vecDot( b, binormal ) < 0.0 ) {
    b = vecNeg( b );
  }

  return {
    normal: n,
    tangent: t,
    binormal: b,
  };
}
