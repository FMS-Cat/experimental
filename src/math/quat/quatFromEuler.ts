import type { EulerOrder } from '../euler/EulerOrder';
import type { RawQuaternion } from './RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Generate a Quaternion out of euler angles.
 */
export function quatFromEuler( euler: RawVector3, order?: EulerOrder ): RawQuaternion {
  const [ i, j, k, sign ] =
    !order || order === 'XYZ' ? [ 0, 1, 2, 1 ] :
    order === 'XZY' ? [ 0, 2, 1, -1 ] :
    order === 'YXZ' ? [ 1, 0, 2, -1 ] :
    order === 'YZX' ? [ 1, 2, 0, 1 ] :
    order === 'ZXY' ? [ 2, 0, 1, 1 ] :
    [ 2, 1, 0, -1 ];

  const ti = 0.5 * euler[ i ];
  const tj = 0.5 * sign * euler[ j ];
  const tk = 0.5 * euler[ k ];

  const ci = Math.cos( ti );
  const cj = Math.cos( tj );
  const ck = Math.cos( tk );
  const si = Math.sin( ti );
  const sj = Math.sin( tj );
  const sk = Math.sin( tk );

  const result: RawQuaternion = [
    0.0,
    0.0,
    0.0,
    ck * cj * ci + sk * sj * si,
  ];
  result[ i ] = ck * cj * si - sk * sj * ci;
  result[ j ] = sign * ( ck * sj * ci + sk * cj * si );
  result[ k ] = sk * cj * ci - ck * sj * si;

  return result;
}
