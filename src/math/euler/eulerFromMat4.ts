import { eulerFromMat3 } from './eulerFromMat3';
import { mat3FromMat4 } from '../mat3/mat3FromMat4';
import type { EulerOrder } from './EulerOrder';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a euler angles out of a matrix4.
 * Make sure the input matrix is normalized.
 *
 * @param m An input rotation matrix
 * @param order An order of output euler angles. Assume as `XYZ` if not specified
 */
export function eulerFromMat4( m: RawMatrix4, order?: EulerOrder ): RawVector3 {
  return eulerFromMat3( mat3FromMat4( m ), order );
}
