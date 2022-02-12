import { mat3FromMat4 } from '../mat3/mat3FromMat4';
import { quatFromMatrix3 } from './quatFromMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
import type { RawQuaternion } from './RawQuaternion';

/**
 * Generate a Quaternion out of a rotation matrix.
 */
export function quatFromMatrix4( m: RawMatrix4 ): RawQuaternion {
  return quatFromMatrix3( mat3FromMat4( m ) );
}
