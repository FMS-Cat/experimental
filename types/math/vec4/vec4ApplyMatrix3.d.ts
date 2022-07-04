import type { RawMatrix3 } from '../mat3/RawMatrix3';
import type { RawVector4 } from './RawVector4';
/**
 * Apply a vec4 a mat3 (with an implicit 1 on m44).
 */
export declare function vec4ApplyMatrix3(v: RawVector4, m: RawMatrix3): RawVector4;
