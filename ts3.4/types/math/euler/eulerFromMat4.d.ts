import { EulerOrder } from './EulerOrder';
import { RawMatrix4 } from '../mat4/RawMatrix4';
import { RawVector3 } from '../vec3/RawVector3';
/**
 * Return a euler angles out of a matrix4.
 * Make sure the input matrix is normalized.
 *
 * @param m An input rotation matrix
 * @param order An order of output euler angles. Assume as `XYZ` if not specified
 */
export declare function eulerFromMat4(m: RawMatrix4, order?: EulerOrder): RawVector3;
