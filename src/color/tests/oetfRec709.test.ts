import '../../tests/matchers/toBeCloseToArray';
import { oetfRec709 } from '../oetfRec709';
import type { RawRGB } from '../RawRGB';

describe( 'oetfRec709', () => {
  it( 'does the oetf job properly', () => {
    const electro: RawRGB = [ 0.0, 0.5, 1.0 ];
    const subject = oetfRec709( electro );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.7055151, 1.0 ], 7 );
  } );
} );
