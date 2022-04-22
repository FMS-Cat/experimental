import type { RawRGB } from './RawRGB';

/**
 * Converts the input color in Atari-ST color palette format to a {@link RawRGB}.
 *
 * @param stColor A color in Atari-ST format
 */
export function colorFromAtariST( stColor: number ): RawRGB {
  return [
    ( stColor >> 8 & 7 ) / 7.0,
    ( stColor >> 4 & 7 ) / 7.0,
    ( stColor & 7 ) / 7.0,
  ];
}
