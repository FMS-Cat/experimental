import { RawRGB } from './RawRGB';
/**
 * Convert a color from HSV to RGB.
 * Each component of the HSV must be given in [0 - 1] range.
 *
 * Ref: https://en.wikipedia.org/wiki/HSV_color_space
 */
export declare function colorHSV2RGB([h, s, v]: [number, number, number]): RawRGB;
