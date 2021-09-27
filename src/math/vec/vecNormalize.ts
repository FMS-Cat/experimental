import { vecLength } from './vecLength';
import { vecScale } from './vecScale';

/**
 * Normalize given vector.
 * If the length of given vector is 0.0, it will return a zero vector instead.
 */
export function vecNormalize( vec: number[] ): number[] {
  const len = vecLength( vec );
  const invLen = len === 0.0 ? 0.0 : 1.0 / len;
  return vecScale( vec, invLen );
}
