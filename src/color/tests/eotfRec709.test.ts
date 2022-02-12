import '../../tests/matchers/toBeCloseToArray';
import { eotfRec709 } from '../eotfRec709';
import type { RawRGB } from '../RawRGB';

describe( 'eotfRec709', () => {
  it( 'does the eotf job properly', () => {
    const electro: RawRGB = [ 0.0, 0.5, 1.0 ];
    const subject = eotfRec709( electro );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.2595894, 1.0 ], 7 );
  } );
} );
