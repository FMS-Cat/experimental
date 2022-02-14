import { vecAdd } from '../vec/vecAdd';
import { vecScale } from '../vec/vecScale';
import type { RawLine3 } from './RawLine3';
import type { RawVector3 } from '../vec3/RawVector3';

/**
 * Return a vector that represents a certain point of given line.
 * Same as start at t = 0, same as end at t = 1.
 *
 * @param line A line
 * @param t A parameter t
 */
export function line3At( line: RawLine3, t: number ): RawVector3 {
  return vecAdd(
    vecScale( line[ 0 ], 1.0 - t ),
    vecScale( line[ 1 ], t ),
  );
}
