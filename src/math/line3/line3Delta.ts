import { vecSub } from '../vec/vecSub';
import type { RawLine3 } from './RawLine3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a vector that represents delta of given line.
 *
 * @param line A line
 */
export function line3Delta( line: RawLine3 ): RawVector3 {
  return vecSub( line[ 1 ], line[ 0 ] );
}
