import { RawMatrix4 } from '../mat4/RawMatrix4';
import { RawPlane3 } from './RawPlane3';
/**
 * Create frustum planes out of given projection matrix.
 *
 * @param m A projection matrix
 */
export declare function planes3FromProjectionMatrix(m: RawMatrix4): RawPlane3[];
