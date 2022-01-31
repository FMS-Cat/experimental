import { vec3Cross } from './vec3Cross';
import { vecDot } from '../vec/vecDot';
import { vecNeg } from '../vec/vecNeg';
import { vecNormalize } from '../vec/vecNormalize';
import { vecScale } from '../vec/vecScale';
import { vecSub } from '../vec/vecSub';
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
  let t = vecNormalize( tangent );

  let dotNT = vecDot( n, t );

  if ( dotNT === 1.0 ) {
    if ( Math.abs( n[ 1 ] ) > Math.abs( n[ 2 ] ) ) {
      t = [ 0.0, 0.0, 1.0 ];
    } else {
      t = [ 0.0, 1.0, 0.0 ];
    }
    dotNT = vecDot( n, t );
  }

  t = vecNormalize( vecSub( t, vecScale( n, dotNT ) ) );

  let b = vec3Cross( t, n );
  if ( binormal && vecDot( b, binormal ) < 0.0 ) {
    b = vecNeg( b );
  }

  return {
    normal: n,
    tangent: t,
    binormal: b,
  };
}
