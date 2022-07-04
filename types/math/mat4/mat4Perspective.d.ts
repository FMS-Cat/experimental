import type { RawMatrix4 } from './RawMatrix4';
/**
 * Generate a "Perspective" projection matrix.
 *
 * @param fov Field of View Y, **IN DEGREES**
 * @param near Near clip plane
 * @param far Far clip plane
 * @param aspect Aspect ratio. **`1.0` BY DEFAULT**
 */
export declare function mat4Perspective(fov?: number, near?: number, far?: number, aspect?: number): RawMatrix4;
