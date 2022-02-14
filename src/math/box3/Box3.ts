import { Vector3 } from '../vec3/Vector3';
import { box3ContainsPoint } from './box3ContainsPoint';
import type { RawBox3 } from './RawBox3';

/**
 * A 3D box.
 */
export class Box3 {
  public min: Vector3;
  public max: Vector3;

  public constructor( min: Vector3 = Vector3.zero, max: Vector3 = Vector3.zero ) {
    this.min = min;
    this.max = max;
  }

  /**
   * Itself but {@link RawBox3} form.
   */
  public get raw(): RawBox3 {
    return [ this.min.elements, this.max.elements ];
  }

  /**
   * Test if given point is contained in the box or not.
   *
   * @param point A point
   */
  public containsPoint( point: Vector3 ): boolean {
    return box3ContainsPoint( this.raw, point.elements );
  }

  /**
   * Convert {@link RawBox3} to class form.
   * @param box A {@link RawBox3}
   */
  public static fromRaw( box: RawBox3 ): Box3 {
    return new Box3( new Vector3( box[ 0 ] ), new Vector3( box[ 1 ] ) );
  }
}
