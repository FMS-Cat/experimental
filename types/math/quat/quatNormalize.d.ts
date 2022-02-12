import type { RawQuaternion } from './RawQuaternion';
/**
 * Normalize given quaternion.
 *
 * It's almost identical as {@link vecNormalize},
 * but it will return an identity quaternion instead
 * when it recieves a quaternion which length is zero.
 */
export declare function quatNormalize(vec: RawQuaternion): RawQuaternion;
