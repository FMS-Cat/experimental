import { vecDot, vecNeg, vecNormalize } from '..';
import type { RawQuaternion } from './RawQuaternion';

/**
 * Interpolate between two quaternions.
 * @param a "from" quaternion
 * @param b "to" quaternion
 * @param t How much do we want to rotate the a to b
 */
export function quatSlerp( a: RawQuaternion, b: RawQuaternion, t: number ): RawQuaternion {
  if ( t === 0.0 ) { return a.concat() as RawQuaternion; }
  if ( t === 1.0 ) { return b.concat() as RawQuaternion; }

  // Ref: https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
  // Ref: http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

  let cosHalfTheta = vecDot( a, b );

  if ( cosHalfTheta < 0.0 ) {
    b = vecNeg( b );
    cosHalfTheta = -cosHalfTheta;
  }

  // I think you two are same
  if ( cosHalfTheta >= 1.0 ) {
    return a.concat() as RawQuaternion;
  }

  const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

  // fallback to simple lerp
  if ( sqrSinHalfTheta <= Number.EPSILON ) {
    const s = 1.0 - t;

    return vecNormalize( [
      s * a[ 0 ] + t * b[ 0 ],
      s * a[ 1 ] + t * b[ 1 ],
      s * a[ 2 ] + t * b[ 2 ],
      s * a[ 3 ] + t * b[ 3 ],
    ] );
  }

  // welcome
  const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
  const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
  const ratioA = Math.sin( ( 1.0 - t ) * halfTheta ) / sinHalfTheta;
  const ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

  return [
    a[ 0 ] * ratioA + b[ 0 ] * ratioB,
    a[ 1 ] * ratioA + b[ 1 ] * ratioB,
    a[ 2 ] * ratioA + b[ 2 ] * ratioB,
    a[ 3 ] * ratioA + b[ 3 ] * ratioB,
  ];
}
