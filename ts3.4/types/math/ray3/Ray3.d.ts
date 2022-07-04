import { Line3 } from '../line3/Line3';
import { Sphere3 } from '../sphere3/Sphere3';
import { Vector3 } from '../vec3/Vector3';
import { RawRay3 } from './RawRay3';
/**
 * A 3D ray.
 */
export declare class Ray3 {
    /**
     * The origin of the ray.
     */
    origin: Vector3;
    /**
     * The direction of the ray.
     * Make sure the direction is normalized.
     */
    direction: Vector3;
    constructor(start?: Vector3, end?: Vector3);
    readonly raw: RawRay3;
    /**
     * Return distances from given ray to sphere.
     *
     * The returning distance can be negative.
     *
     * The first returning value will be the distance of the incident point.
     * If the ray does not intersect with sphere, it will return `null`.
     *
     * @param sphere A target sphere
     */
    distanceToSphere(sphere: Sphere3): [number, number] | null;
    /**
     * Convert {@link RawRay3} to class form.
     * @param ray A {@link RawRay3}
     */
    static fromRaw(ray: RawRay3): Ray3;
    /**
     * Create a ray out of a line.
     *
     * @param line A {@link Line3}
     */
    static fromLine3(line: Line3): Ray3;
}
