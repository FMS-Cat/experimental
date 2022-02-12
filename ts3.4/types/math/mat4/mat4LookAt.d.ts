import { RawMatrix4 } from './RawMatrix4';
import { RawVector3 } from '../vec3/RawVector3';
/**
 * Generate a "LookAt" matrix.
 *
 * See also: {@link mat4LookAtInverse}
 */
export declare function mat4LookAt(position: RawVector3, target?: RawVector3, up?: RawVector3, roll?: number): RawMatrix4;
