import { RawMatrix4 } from './RawMatrix4';
import { RawVector3 } from '../vec3/RawVector3';
/**
 * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
 *
 * See also: {@link mat4LookAt}
 */
export declare function mat4LookAtInverse(position: RawVector3, target?: RawVector3, up?: RawVector3, roll?: number): RawMatrix4;
