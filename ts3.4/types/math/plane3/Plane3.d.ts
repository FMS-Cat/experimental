import { Matrix3 } from '../mat3/Matrix3';
import { Matrix4 } from '../mat4/Matrix4';
import { Vector3 } from '../vec3/Vector3';
import { RawPlane3 } from './RawPlane3';
/**
 * A 3D plane.
 */
export declare class Plane3 {
    normal: Vector3;
    distance: number;
    readonly raw: RawPlane3;
    readonly normalized: Plane3;
    constructor(normal?: Vector3, distance?: number);
    /**
     * Apply given matrix4 to the plane.
     *
     * @param matrix A matrix4 which will be applied to the plane
     * @param normalMatrix A normalMatrix made out of {@link matrix}. Optional
     */
    applyMatrix4(matrix: Matrix4, normalMatrix?: Matrix3): Plane3;
    /**
     * Return a signed distance from given plane to the given point.
     *
     * @param point A point
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Convert {@link RawPlane3} to class form.
     * @param plane A {@link RawPlane3}
     */
    static fromRaw(plane: RawPlane3): Plane3;
}
