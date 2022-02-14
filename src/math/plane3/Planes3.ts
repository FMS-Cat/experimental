import { Box3 } from '../box3/Box3';
import { Matrix4 } from '../mat4/Matrix4';
import { Plane3 } from './Plane3';
import { Sphere3 } from '../sphere3/Sphere3';
import { Vector3 } from '../vec3/Vector3';
import { planes3ContainPoint } from './planes3ContainPoint';
import { planes3FromBox3 } from './planes3FromBox3';
import { planes3FromProjectionMatrix } from './planes3FromProjectionMatrix';
import { planes3IntersectBox3 } from './planes3IntersectBox3';
import { planes3IntersectSphere3 } from './planes3IntersectSphere3';
import type { RawPlane3 } from './RawPlane3';

/**
 * A set of {@link Plane3}.
 */
export class Planes3 {
  public planes: Plane3[];

  /**
   * Itself but {@link RawPlane3}[] form.
   */
  public get raw(): RawPlane3[] {
    return this.planes.map( ( plane ) => plane.raw );
  }

  public constructor( planes: Plane3[] ) {
    this.planes = planes;
  }

  /**
   * Test if given point is contained in the planes or not.
   *
   * @param point A point
   */
  public containPoint( point: Vector3 ): boolean {
    return planes3ContainPoint( this.raw, point.elements );
  }

  /**
   * Test if given box intersects with the planes or not.
   *
   * @param box A box3
   */
  public intersectBox3( box: Box3 ): boolean {
    return planes3IntersectBox3( this.raw, box.raw );
  }

  /**
   * Test if given sphere intersects with the planes or not.
   *
   * It does not do strict intersection test but still should work well with frustum cull use cases.
   * See the test case for more details.
   *
   * @param sphere A sphere3
   */
  public intersectSphere3( sphere: Sphere3 ): boolean {
    return planes3IntersectSphere3( this.raw, sphere.raw );
  }

  /**
   * Convert {@link RawPlane3}[] to class form.
   *
   * @param planes A {@link RawPlane3}[]
   */
  public static fromRaw( planes: RawPlane3[] ): Planes3 {
    return new Planes3( planes.map( ( plane ) => Plane3.fromRaw( plane ) ) );
  }

  /**
   * Generate a set of plane3 out of a {@link RawBox3}.
   *
   * @param box A box
   */
  public static fromBox3( box: Box3 ): Planes3 {
    return Planes3.fromRaw( planes3FromBox3( box.raw ) );
  }

  /**
   * Create frustum planes out of given projection matrix.
   *
   * @param matrix A projection matrix
   */
  public static fromProjectionMatrix( matrix: Matrix4 ): Planes3 {
    return Planes3.fromRaw( planes3FromProjectionMatrix( matrix.elements ) );
  }
}
