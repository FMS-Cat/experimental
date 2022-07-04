import { Box3 } from '../box3/Box3';
import { Matrix4 } from '../mat4/Matrix4';
import { Plane3 } from './Plane3';
import { Sphere3 } from '../sphere3/Sphere3';
import { Vector3 } from '../vec3/Vector3';
import { RawPlane3 } from './RawPlane3';
/**
 * A set of {@link Plane3}.
 */
export declare class Planes3 {
    planes: Plane3[];
    readonly raw: RawPlane3[];
    constructor(planes: Plane3[]);
    /**
     * Test if given point is contained in the planes or not.
     *
     * @param point A point
     */
    containPoint(point: Vector3): boolean;
    /**
     * Test if given box intersects with the planes or not.
     *
     * @param box A box3
     */
    intersectBox3(box: Box3): boolean;
    /**
     * Test if given sphere intersects with the planes or not.
     *
     * It does not do strict intersection test but still should work well with frustum cull use cases.
     * See the test case for more details.
     *
     * @param sphere A sphere3
     */
    intersectSphere3(sphere: Sphere3): boolean;
    /**
     * Convert {@link RawPlane3}[] to class form.
     *
     * @param planes A {@link RawPlane3}[]
     */
    static fromRaw(planes: RawPlane3[]): Planes3;
    /**
     * Generate a set of plane3 out of a {@link RawBox3}.
     *
     * @param box A box
     */
    static fromBox3(box: Box3): Planes3;
    /**
     * Create frustum planes out of given projection matrix.
     *
     * @param matrix A projection matrix
     */
    static fromProjectionMatrix(matrix: Matrix4): Planes3;
}
