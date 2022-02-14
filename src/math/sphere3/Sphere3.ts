import { Vector3 } from '../vec3/Vector3';
import { sphere3ContainsPoint } from './sphere3ContainsPoint';
import type { RawSphere3 } from './RawSphere3';

/**
 * A 3D sphere.
 */
export class Sphere3 {
  public origin: Vector3;
  public radius: number;

  public constructor( origin: Vector3 = Vector3.zero, radius: number = 0.0 ) {
    this.origin = origin;
    this.radius = radius;
  }

  /**
   * Itself but {@link RawSphere3} form.
   */
  public get raw(): RawSphere3 {
    return [ this.origin.elements, this.radius ];
  }

  /**
   * Test if given point is contained in the sphere or not.
   *
   * @param point A point
   */
  public containsPoint( point: Vector3 ): boolean {
    return sphere3ContainsPoint( this.raw, point.elements );
  }

  /**
   * Convert {@link RawSphere3} to class form.
   * @param sphere A {@link RawSphere3}
   */
  public static fromRaw( sphere: RawSphere3 ): Sphere3 {
    return new Sphere3( new Vector3( sphere[ 0 ] ), sphere[ 1 ] );
  }
}
