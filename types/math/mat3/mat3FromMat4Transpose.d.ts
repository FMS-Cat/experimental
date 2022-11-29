import type { RawMatrix3 } from './RawMatrix3';
import type { RawMatrix4 } from '../mat4/RawMatrix4';
/**
 * Who needs this?
 *
 * Intended to be used by {@link mat3CreateNormalMatrix}.
 */
export declare function mat3FromMat4Transpose(source: RawMatrix4): RawMatrix3;
