import type { RawMatrix4 } from './RawMatrix4';

/**
 * Generate a "Perspective" projection matrix.
 *
 * @param fov Field of View Y, **IN DEGREES**
 * @param near Near clip plane
 * @param far Far clip plane
 * @param aspect Aspect ratio. **`1.0` BY DEFAULT**
 */
export function mat4Perspective(
  fov = 45.0,
  near = 0.01,
  far = 100.0,
  aspect = 1.0,
): RawMatrix4 {
  const p = 1.0 / Math.tan( fov * Math.PI / 360.0 );
  const d = ( far - near );
  return [
    p / aspect, 0.0, 0.0, 0.0,
    0.0, p, 0.0, 0.0,
    0.0, 0.0, -( far + near ) / d, -1.0,
    0.0, 0.0, -2 * far * near / d, 0.0
  ];
}
