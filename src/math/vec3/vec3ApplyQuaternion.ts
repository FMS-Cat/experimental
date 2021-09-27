import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from './RawVector3';
import { quatInverse } from '../quat/quatInverse';
import { quatMultiply } from '../quat/quatMultiply';

/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a quaternion.
 */
export function vec3ApplyQuaternion( vec: RawVector3, quat: RawQuaternion ): RawVector3 {
  const p: RawQuaternion = [ ...vec, 0.0 ];
  const r = quatInverse( quat );
  const res = quatMultiply( quat, p, r );
  res.pop();
  return res as unknown as RawVector3;
}
