import '../../../tests/matchers/toBeCloseToArray';
import { vecNormalize } from '../vecNormalize';

describe( 'vecNormalize', () => {
  it( 'returns a normalized vec', () => {
    const vec = [ 1.0, 2.0, 3.0 ];
    const subject = vecNormalize( vec );

    expect( subject ).toBeCloseToArray( [ 0.267, 0.535, 0.802 ] );
  } );

  describe( 'when given vector is zero vector', () => {
    it( 'returns a zero vector', () => {
      const vec = [ 0.0, 0.0, 0.0 ];
      const subject = vecNormalize( vec );

      expect( subject ).toBeCloseToArray( [ 0.0, 0.0, 0.0 ] );
    } );
  } );
} );
