import { clamp } from '../utils';
import { sanitizeAngle } from '../sanitizeAngle';
import { vecManhattanLength } from '../vec/vecManhattanLength';
import type { EulerOrder } from './EulerOrder';
import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a euler angles out of a matrix3.
 * Make sure the input matrix is normalized.
 *
 * @param m An input rotation matrix
 * @param order An order of output euler angles. Assume as `XYZ` if not specified
 */
export function eulerFromMat3( m: RawMatrix3, order?: EulerOrder ): RawVector3 {
  const [ i, j, k, sign ] =
    !order || order === 'XYZ' ? [ 0, 1, 2, 1 ] :
    order === 'XZY' ? [ 0, 2, 1, -1 ] :
    order === 'YXZ' ? [ 1, 0, 2, -1 ] :
    order === 'YZX' ? [ 1, 2, 0, 1 ] :
    order === 'ZXY' ? [ 2, 0, 1, 1 ] :
    [ 2, 1, 0, -1 ];

  const result: RawVector3 = [ 0.0, 0.0, 0.0 ];

  const c = m[ k + i * 3 ];
  result[ j ] = -sign * Math.asin( clamp( c, -1.0, 1.0 ) );

  if ( Math.abs( c ) < 0.999999 ) {
    result[ i ] = sign * Math.atan2( m[ k + j * 3 ], m[ k * 4 ] );
    result[ k ] = sign * Math.atan2( m[ j + i * 3 ], m[ i * 4 ] );
  } else {
    // "y is 90deg" cases
    result[ i ] = sign * Math.atan2( -m[ j + k * 3 ], m[ j * 4 ] );
  }

  if ( vecManhattanLength( result ) > 1.5 * Math.PI ) {
    // "two big revolutions" cases
    result[ i ] = sanitizeAngle( result[ i ] + Math.PI );
    result[ j ] = sanitizeAngle( Math.PI - result[ j ] );
    result[ k ] = sanitizeAngle( result[ k ] + Math.PI );
  }

  return result;
}
