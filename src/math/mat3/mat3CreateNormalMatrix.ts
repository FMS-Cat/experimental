import { mat3FromMat4Transpose } from './mat3FromMat4Transpose';
import { mat3Inverse } from './mat3Inverse';
import type { RawMatrix3 } from './RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';

/**
 * Create a normal matrix out of a matrix4.
 *
 * @param matrix A matrix4
 */
export function mat3CreateNormalMatrix( m: RawMatrix4 ): RawMatrix3 {
  return mat3Inverse( mat3FromMat4Transpose( m ) );
}
