import '../../../tests/matchers/toBeCloseToArray';
import { vecNeg } from '../vecNeg';

describe( 'vecNeg', () => {
  it( 'returns a negated vec', () => {
    const vec = [ 1.0, 2.0, 3.0 ];
    const subject = vecNeg( vec );

    expect( subject ).toBeCloseToArray( [ -1.0, -2.0, -3.0 ] );
  } );
} );
