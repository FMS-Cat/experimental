import type { RawRay3 } from './RawRay3';
import type { RawSphere3 } from '../sphere3/RawSphere3';
/**
 * Return distances from given ray to sphere.
 *
 * The returning distance can be negative.
 *
 * The first returning value will be the distance of the incident point.
 * If the ray does not intersect with sphere, it will return `null`.
 *
 * @param ray A ray
 * @param sphere A target sphere
 */
export declare function ray3DistanceToSphere([ro, rd]: RawRay3, sphere: RawSphere3): [number, number] | null;
