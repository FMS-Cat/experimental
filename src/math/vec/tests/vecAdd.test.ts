import '../../../tests/matchers/toBeCloseToArray';
import { vecAdd } from '../vecAdd';

describe( 'vecAdd', () => {
  it( 'returns a sum of two vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const subject = vecAdd( vecA, vecB );

    expect( subject ).toBeCloseToArray( [ 5.0, 7.0, 9.0 ] );
  } );

  it( 'returns a sum of three vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const vecC = [ 7.0, 8.0, 9.0 ];
    const subject = vecAdd( vecA, vecB, vecC );

    expect( subject ).toBeCloseToArray( [ 12.0, 15.0, 18.0 ] );
  } );
} );
