import '../../../tests/matchers/toBeCloseToArray';
import { vecSub } from '../vecSub';

describe( 'vecSub', () => {
  it( 'returns subtracted result of two vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const subject = vecSub( vecA, vecB );

    expect( subject ).toBeCloseToArray( [ -3.0, -3.0, -3.0 ] );
  } );
} );
