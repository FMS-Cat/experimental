import { Matrix4 } from '../mat4/Matrix4';
import { Ray3 } from '../ray3/Ray3';
import { Vector3 } from '../vec3/Vector3';
import type { RawLine3 } from './RawLine3';
/**
 * A 3D line.
 */
export declare class Line3 {
    start: Vector3;
    end: Vector3;
    constructor(start?: Vector3, end?: Vector3);
    /**
     * Itself but {@link RawLine3} form.
     */
    get raw(): RawLine3;
    /**
     * Itself but a ray.
     */
    get ray(): Ray3;
    /**
     * A vector that represents delta of the line.
     */
    delta(): Vector3;
    /**
     * Its length.
     */
    length(): number;
    /**
     * Return a vector that represents a certain point of the line.
     * Same as start at t = 0, same as end at t = 1.
     *
     * @param t A parameter t
     */
    at(t: number): Vector3;
    /**
     * Apply given matrix4 to the line.
     *
     * @param matrix A matrix4 which will be applied to the line
     */
    applyMatrix4(matrix: Matrix4): Line3;
    /**
     * Return a point that is on the line which is closest to the given point.
     *
     * If `segment` is true, it will treat the line as a segment which has start and end.
     * Otherwise it will treat the line is infinite.
     *
     * @param point A point
     * @param segment Is the line a segment?
     */
    closestPointToPoint(point: Vector3, segment: boolean): Vector3;
    /**
     * Return a distance from the line to the given point.
     *
     * If `segment` is true, it will treat the line as a segment which has start and end.
     * Otherwise it will treat the line is infinite.
     *
     * @param point A point
     * @param segment Is the line a segment?
     */
    distanceToPoint(point: Vector3, segment: boolean): number;
    /**
     * Convert {@link RawLine3} to class form.
     * @param line A {@link RawLine3}
     */
    static fromRaw(line: RawLine3): Line3;
}
