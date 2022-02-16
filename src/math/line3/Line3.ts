import { Matrix4 } from '../mat4/Matrix4';
import { Ray3 } from '../ray3/Ray3';
import { Vector3 } from '../vec3/Vector3';
import { line3ApplyMatrix4 } from './line3ApplyMatrix4';
import { line3At } from './line3At';
import { line3ClosestPointToPoint } from './line3ClosestPointToPoint';
import { line3Delta } from './line3Delta';
import { line3DistanceToPoint } from './line3DistanceToPoint';
import type { RawLine3 } from './RawLine3';

/**
 * A 3D line.
 */
export class Line3 {
  public start: Vector3;
  public end: Vector3;

  public constructor( start: Vector3 = Vector3.zero, end: Vector3 = Vector3.zero ) {
    this.start = start;
    this.end = end;
  }

  /**
   * Itself but {@link RawLine3} form.
   */
  public get raw(): RawLine3 {
    return [ this.start.elements, this.end.elements ];
  }

  /**
   * Itself but a ray.
   */
  public get ray(): Ray3 {
    return Ray3.fromLine3( this );
  }

  /**
   * A vector that represents delta of the line.
   */
  public delta(): Vector3 {
    return new Vector3( line3Delta( this.raw ) );
  }

  /**
   * Its length.
   */
  public length(): number {
    return this.delta.length;
  }

  /**
   * Return a vector that represents a certain point of the line.
   * Same as start at t = 0, same as end at t = 1.
   *
   * @param t A parameter t
   */
  public at( t: number ): Vector3 {
    return new Vector3( line3At( this.raw, t ) );
  }

  /**
   * Apply given matrix4 to the line.
   *
   * @param matrix A matrix4 which will be applied to the line
   */
  public applyMatrix4( matrix: Matrix4 ): Line3 {
    return Line3.fromRaw(
      line3ApplyMatrix4(
        this.raw,
        matrix.elements,
      )
    );
  }

  /**
   * Return a point that is on the line which is closest to the given point.
   *
   * If `segment` is true, it will treat the line as a segment which has start and end.
   * Otherwise it will treat the line is infinite.
   *
   * @param point A point
   * @param segment Is the line a segment?
   */
  public closestPointToPoint( point: Vector3, segment: boolean ): Vector3 {
    return new Vector3( line3ClosestPointToPoint( this.raw, point.elements, segment ) );
  }

  /**
   * Return a distance from the line to the given point.
   *
   * If `segment` is true, it will treat the line as a segment which has start and end.
   * Otherwise it will treat the line is infinite.
   *
   * @param point A point
   * @param segment Is the line a segment?
   */
  public distanceToPoint( point: Vector3, segment: boolean ): number {
    return line3DistanceToPoint( this.raw, point.elements, segment );
  }

  /**
   * Convert {@link RawLine3} to class form.
   * @param line A {@link RawLine3}
   */
  public static fromRaw( line: RawLine3 ): Line3 {
    return new Line3( new Vector3( line[ 0 ] ), new Vector3( line[ 1 ] ) );
  }
}
