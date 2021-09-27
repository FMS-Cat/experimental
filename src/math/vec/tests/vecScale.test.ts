import '../../../tests/matchers/toBeCloseToArray';
import { vecScale } from '../vecScale';

describe( 'vecScale', () => {
  it( 'returns a scaled result of the vec', () => {
    const vec = [ 1.0, 2.0, 3.0 ];
    const scalar = 2.0;
    const subject = vecScale( vec, scalar );

    expect( subject ).toBeCloseToArray( [ 2.0, 4.0, 6.0 ] );
  } );
} );
