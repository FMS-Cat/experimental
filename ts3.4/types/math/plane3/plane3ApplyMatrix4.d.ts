import { RawMatrix3 } from '../mat3/RawMatrix3';
import { RawMatrix4 } from '../mat4/RawMatrix4';
import { RawPlane3 } from './RawPlane3';
/**
 * Apply given matrix4 to given plane.
 *
 * @param plane A plane
 * @param matrix A matrix4 which will be applied to the plane
 * @param normalMatrix A normalMatrix made out of {@link matrix}
 */
export declare function plane3ApplyMatrix4([normal, distance]: RawPlane3, matrix: RawMatrix4, normalMatrix: RawMatrix3): RawPlane3;
