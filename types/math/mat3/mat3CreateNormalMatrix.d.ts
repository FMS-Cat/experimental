import type { RawMatrix3 } from './RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
/**
 * Create a normal matrix out of a matrix4.
 *
 * @param matrix A matrix4
 */
export declare function mat3CreateNormalMatrix(m: RawMatrix4): RawMatrix3;
