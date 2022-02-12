import { eulerFromMat3 } from './eulerFromMat3';
import { mat3FromQuaternion } from '../mat3/mat3FromQuaternion';
import type { EulerOrder } from './EulerOrder';
import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a euler angles out of a quaternion.
 *
 * @param m An input quaternion
 * @param order An order of output euler angles. Assume as `XYZ` if not specified
 */
export function eulerFromQuaternion( m: RawQuaternion, order?: EulerOrder ): RawVector3 {
  return eulerFromMat3( mat3FromQuaternion( m ), order );
}
