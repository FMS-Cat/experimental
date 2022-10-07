import { RawRGB } from './RawRGB';
import { lerp } from '../math/utils';

/**
 * Convert a color from HSV to RGB.
 * Each component of the HSV must be given in [0 - 1] range.
 *
 * Ref: https://en.wikipedia.org/wiki/HSV_color_space
 */
export function colorHSV2RGB( [ h, s, v ]: [ number, number, number ] ): RawRGB {
  const ht = h % 1.0 * 6.0;

  return [ 0.0, 4.0, 2.0 ].map( ( p ) => {
    const colH = Math.min( Math.max( (
      Math.abs( ( ht + p ) % 6.0 - 3.0 ) - 1.0
    ), 0.0 ), 1.0 );
    const colS = lerp( 1.0, colH, s );
    return v * colS;
  } ) as RawRGB;
}
