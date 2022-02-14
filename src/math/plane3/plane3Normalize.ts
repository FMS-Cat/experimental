import { vecLength } from '../vec/vecLength';
import { vecScale } from '../vec/vecScale';
import type { RawPlane3 } from './RawPlane3';

/**
 * Normalize a given plane?
 * This normalizes the normal and also divide distance by its original normal length.
 *
 * I don't come up with any use cases other than {@link planesFromProjectionMatrix}.
 *
 * @param plane The plane you want to normalize
 */
export function plane3Normalize( [ normal, distance ]: RawPlane3 ): RawPlane3 {
  const invL = 1.0 / vecLength( normal );
  return [ vecScale( normal, invL ), distance * invL ];
}
