import { line3Delta } from '../line3/line3Delta';
import { vecNormalize } from '../vec/vecNormalize';
import type { RawLine3 } from '../line3/RawLine3';
import type { RawRay3 } from './RawRay3';

/**
 * Convert the given line to a ray.
 *
 * @param line A line
 */
export function ray3FromLine3( line: RawLine3 ): RawRay3 {
  return [
    line[ 0 ],
    vecNormalize( line3Delta( line ) ),
  ];
}
