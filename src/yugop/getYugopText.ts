import { linearstep } from '../math/utils';

/**
 * https://twitter.com/yugop
 *
 * @param text The input text
 * @param phase The value between 0.0 and 1.0
 * @param randomRatio The nerd value
 */
export function getYugopText( text: string, phase: number, randomRatio = 0.5 ): string {
  if ( phase >= 1.0 ) { return text; }
  if ( phase < 0.0 ) { return ''; }

  /*
   * ------=====
   * .------====
   * ..------===
   * ...------==
   * ....------=
   * ^     ^   ^
   * |     |   |
   * |     |   phase is 1.0
   * |     phase is randomRatio
   * phase is 0.0
   */

  const displayTween = linearstep( 0.0, 1.0 - randomRatio, phase );
  const fixTween = linearstep( randomRatio, 1.0, phase );

  const displayLength = 1.0 + Math.floor( displayTween * ( text.length - 1 ) );
  const fixLength = phase < randomRatio ? 0 : 1.0 + Math.floor( fixTween * ( text.length - 1 ) );
  const randomLength = displayLength - fixLength;

  const randomStr = [ ...Array( randomLength ) ]
    .map( () => String.fromCharCode( 33 + Math.floor( 93 * Math.random() ) ) )
    .join( '' );

  return text.substring( 0, fixLength ) + randomStr;
}
