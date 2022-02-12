import type { RawMatrix3 } from './RawMatrix3';
import type { RawQuaternion } from '../quat/RawQuaternion';
/**
 * Convert a quaternion into a matrix3.
 *
 * Yoinked from Three.js.
 *
 * See: https://threejs.org/docs/#api/en/math/Matrix4.makeRotationFromQuaternion
 */
export declare function mat3FromQuaternion(quat: RawQuaternion): RawMatrix3;
