import '../../tests/matchers/toBeCloseToArray';
import { colorToHex } from '../colorToHex';
import type { RawRGB } from '../RawRGB';

describe( 'colorToHex', () => {
  it( 'converts the input color into hex representation', () => {
    const color: RawRGB = [ 0.0, 0.588, 0.980 ];
    const subject = colorToHex( color );

    expect( subject ).toBe( '#0096fa' );
  } );
  it( 'converts the saturated color properly', () => {
    const color: RawRGB = [ 400.0, 0.5, -1.0 ];
    const subject = colorToHex( color );

    expect( subject ).toBe( '#ff8000' );
  } );
} );
