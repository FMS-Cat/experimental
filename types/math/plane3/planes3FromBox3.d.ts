import type { RawBox3 } from '../box3/RawBox3';
import type { RawPlane3 } from './RawPlane3';
/**
 * Generate a set of plane3 out of a {@link RawBox3}.
 *
 * @param box A box
 */
export declare function planes3FromBox3(box: RawBox3): RawPlane3[];
