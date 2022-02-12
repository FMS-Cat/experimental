import { RawMatrix4 } from './RawMatrix4';
/**
 * Generate a "Perspective" projection matrix.
 * It won't include aspect!
 */
export declare function mat4Perspective(fov?: number, near?: number, far?: number): RawMatrix4;
