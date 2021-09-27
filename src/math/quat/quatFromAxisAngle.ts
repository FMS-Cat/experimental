import type { RawQuaternion } from './RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Generate a Quaternion out of axis and angle.
 */
export function quatFromAxisAngle( axis: RawVector3, angle: number ): RawQuaternion {
  const halfAngle = angle / 2.0;
  const sinHalfAngle = Math.sin( halfAngle );
  return [
    axis[ 0 ] * sinHalfAngle,
    axis[ 1 ] * sinHalfAngle,
    axis[ 2 ] * sinHalfAngle,
    Math.cos( halfAngle )
  ];
}
