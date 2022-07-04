import { Vector3 } from '../vec3/Vector3';
import { RawBox3 } from './RawBox3';
/**
 * A 3D box.
 */
export declare class Box3 {
    min: Vector3;
    max: Vector3;
    constructor(min?: Vector3, max?: Vector3);
    readonly raw: RawBox3;
    /**
     * Test if given point is contained in the box or not.
     *
     * @param point A point
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Convert {@link RawBox3} to class form.
     * @param box A {@link RawBox3}
     */
    static fromRaw(box: RawBox3): Box3;
}
