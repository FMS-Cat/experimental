import { RawVector3 } from './RawVector3';
/**
 * Return a tangent which is orthogonal to normal.
 * If binormal is specified, it is also returned and it's orthogonal to both normal and tangent.
 */
export declare function vec3OrthoNormalize(normal: RawVector3, tangent?: RawVector3, binormal?: RawVector3): {
    normal: RawVector3;
    tangent: RawVector3;
    binormal: RawVector3;
};
