import type { RawRGB } from './RawRGB';

/**
 * EOTF of Rec.709 a.k.a. sRGB-to-Linear
 */
export function eotfRec709( value: RawRGB ): RawRGB {
  return value.map( ( v ) => (
    v < 0.081
      ? v / 4.5
      : Math.pow( ( v + 0.099 ) / 1.099, 1.0 / 0.45 )
  ) ) as RawRGB;
}
