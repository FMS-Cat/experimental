import '../../../tests/matchers/toBeCloseToArray';
import { vecMultiply } from '../vecMultiply';

describe( 'vecMultiply', () => {
  it( 'returns a multiplication result of two vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const subject = vecMultiply( vecA, vecB );

    expect( subject ).toBeCloseToArray( [ 4.0, 10.0, 18.0 ] );
  } );
} );
