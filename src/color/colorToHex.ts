import { saturate } from '../math/utils';
import type { RawRGB } from './RawRGB';

/**
 * Converts the input color to hex representation (e.g. #7f7f7f)
 * @param color color in {@link RawRGB}
 */
export function colorToHex( color: RawRGB ): string {
  return '#' + color.map( ( v ) => (
    ( '0' + ( Math.round( saturate( v ) * 255.0 ) ).toString( 16 ) ).slice( -2 )
  ) ).join( '' );
}
