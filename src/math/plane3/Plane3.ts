import { Matrix3 } from '../mat3/Matrix3';
import { Matrix4 } from '../mat4/Matrix4';
import { Vector3 } from '../vec3/Vector3';
import { plane3ApplyMatrix4 } from './plane3ApplyMatrix4';
import { plane3DistanceToPoint } from './plane3DistanceToPoint';
import { plane3Normalize } from './plane3Normalize';
import type { RawPlane3 } from './RawPlane3';

/**
 * A 3D plane.
 */
export class Plane3 {
  public normal: Vector3;
  public distance: number;

  /**
   * Itself but {@link RawPlane3} form.
   */
  public get raw(): RawPlane3 {
    return [ this.normal.elements, this.distance ];
  }

  /**
   * Normalized plane?
   * This normalizes the normal and also divide distance by its original normal length.
   */
  public get normalized(): Plane3 {
    return Plane3.fromRaw( plane3Normalize( this.raw ) );
  }

  public constructor( normal: Vector3 = Vector3.pz, distance = 0.0 ) {
    this.normal = normal;
    this.distance = distance;
  }

  /**
   * Apply given matrix4 to the plane.
   *
   * @param matrix A matrix4 which will be applied to the plane
   * @param normalMatrix A normalMatrix made out of {@link matrix}. Optional
   */
  public applyMatrix4( matrix: Matrix4, normalMatrix?: Matrix3 ): Plane3 {
    return Plane3.fromRaw(
      plane3ApplyMatrix4(
        this.raw,
        matrix.elements,
        normalMatrix?.elements ?? matrix.normalMatrix.elements,
      )
    );
  }

  /**
   * Return a signed distance from given plane to the given point.
   *
   * @param point A point
   */
  public distanceToPoint( point: Vector3 ): number {
    return plane3DistanceToPoint( this.raw, point.elements );
  }

  /**
   * Convert {@link RawPlane3} to class form.
   * @param plane A {@link RawPlane3}
   */
  public static fromRaw( plane: RawPlane3 ): Plane3 {
    return new Plane3( new Vector3( plane[ 0 ] ), plane[ 1 ] );
  }
}
