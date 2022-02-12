import type { RawRGB } from './RawRGB';

/**
 * OETF of Rec.709 a.k.a. Linear-to-sRGB
 */
export function oetfRec709( luminance: RawRGB ): RawRGB {
  return luminance.map( ( l ) => (
    l < 0.018
      ? 4.5 * l
      : 1.099 * Math.pow( l, 0.45 ) - 0.099
  ) ) as RawRGB;
}
