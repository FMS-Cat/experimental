import '../../../tests/matchers/toBeCloseToArray';
import { vecAbs } from '../vecAbs';

describe( 'vecAbs', () => {
  it( 'returns an abs of given vec', () => {
    const vec = [ 1.0, -2.0, -3.0 ];
    const subject = vecAbs( vec );

    expect( subject ).toEqual( [ 1.0, 2.0, 3.0 ] );
  } );
} );
