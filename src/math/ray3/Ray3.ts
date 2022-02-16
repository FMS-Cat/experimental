import { Line3 } from '../line3/Line3';
import { Sphere3 } from '../sphere3/Sphere3';
import { Vector3 } from '../vec3/Vector3';
import { ray3DistanceToSphere } from './ray3DistanceToSphere';
import { ray3FromLine3 } from './ray3FromLine3';
import type { RawRay3 } from './RawRay3';

/**
 * A 3D ray.
 */
export class Ray3 {
  /**
   * The origin of the ray.
   */
  public origin: Vector3;

  /**
   * The direction of the ray.
   * Make sure the direction is normalized.
   */
  public direction: Vector3;

  public constructor( start: Vector3 = Vector3.zero, end: Vector3 = Vector3.pz ) {
    this.origin = start;
    this.direction = end;
  }

  /**
   * Itself but {@link RawRay3} form.
   */
  public get raw(): RawRay3 {
    return [ this.origin.elements, this.direction.elements ];
  }

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
  public distanceToSphere( sphere: Sphere3 ): [ number, number ] | null {
    return ray3DistanceToSphere( this.raw, sphere.raw );
  }

  /**
   * Convert {@link RawRay3} to class form.
   * @param ray A {@link RawRay3}
   */
  public static fromRaw( ray: RawRay3 ): Ray3 {
    return new Ray3( new Vector3( ray[ 0 ] ), new Vector3( ray[ 1 ] ) );
  }

  /**
   * Create a ray out of a line.
   *
   * @param line A {@link Line3}
   */
  public static fromLine3( line: Line3 ): Ray3 {
    return Ray3.fromRaw( ray3FromLine3( line.raw ) );
  }
}
