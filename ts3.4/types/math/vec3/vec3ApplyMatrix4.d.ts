import { RawMatrix4 } from '../mat4/RawMatrix4';
import { RawVector3 } from './RawVector3';
/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a mat4.
 */
export declare function vec3ApplyMatrix4(v: RawVector3, m: RawMatrix4): RawVector3;
