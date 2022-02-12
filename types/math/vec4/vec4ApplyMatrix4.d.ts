import type { RawMatrix4 } from '../mat4';
import type { RawVector4 } from './RawVector4';
/**
 * Multiply a vec4 by a mat4.
 */
export declare function vec4ApplyMatrix4(v: RawVector4, m: RawMatrix4): RawVector4;
