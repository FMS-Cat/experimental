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
export declare function eulerFromMat3(m: RawMatrix3, order?: EulerOrder): RawVector3;
