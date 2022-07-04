import { Vector3 } from '../vec3/Vector3';
import { RawSphere3 } from './RawSphere3';
/**
 * A 3D sphere.
 */
export declare class Sphere3 {
    origin: Vector3;
    radius: number;
    constructor(origin?: Vector3, radius?: number);
    readonly raw: RawSphere3;
    /**
     * Test if given point is contained in the sphere or not.
     *
     * @param point A point
     */
    containsPoint(point: Vector3): boolean;
    /**
     * Convert {@link RawSphere3} to class form.
     * @param sphere A {@link RawSphere3}
     */
    static fromRaw(sphere: RawSphere3): Sphere3;
}
