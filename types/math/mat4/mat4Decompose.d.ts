import type { RawMatrix4 } from './RawMatrix4';
import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';
/**
 * Decompose a matrix into a position, a scale, and a rotation.
 * Yoinked from Three.js.
 */
export declare function mat4Decompose(m: RawMatrix4): {
    position: RawVector3;
    scale: RawVector3;
    rotation: RawQuaternion;
};
