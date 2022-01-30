import { vecLength } from '../vec/vecLength';
import { vecScale } from '../vec/vecScale';
import type { RawQuaternion } from './RawQuaternion';

/**
 * Normalize given quaternion.
 *
 * It's almost identical as {@link vecNormalize},
 * but it will return an identity quaternion instead
 * when it recieves a quaternion which length is zero.
 */
export function quatNormalize( vec: RawQuaternion ): RawQuaternion {
  const len = vecLength( vec );
  if ( len === 0.0 ) {
    return [ 0.0, 0.0, 0.0, 1.0 ];
  }
  return vecScale( vec, 1.0 / len );
}
