import '../../../tests/matchers/toBeCloseToArray';
import { vecDivide } from '../vecDivide';

describe( 'vecDivide', () => {
  it( 'returns a division result of two vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const subject = vecDivide( vecA, vecB );

    expect( subject ).toBeCloseToArray( [ 0.25, 0.4, 0.5 ] );
  } );
} );
