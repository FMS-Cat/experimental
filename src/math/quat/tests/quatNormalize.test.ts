import '../../../tests/matchers/toBeCloseToArray';
import type { RawQuaternion } from '../RawQuaternion';
import { quatNormalize } from '../quatNormalize';

describe( 'quatNormalize', () => {
  it( 'returns a normalized quaternion', () => {
    const quat: RawQuaternion = [ 1.0, 2.0, 3.0, 4.0 ];
    const subject = quatNormalize( quat );

    expect( subject ).toBeCloseToArray( [ 0.183, 0.365, 0.548, 0.730 ] );
  } );

  describe( 'when given vector is zero vector', () => {
    it( 'returns a zero vector', () => {
      const quat: RawQuaternion = [ 0.0, 0.0, 0.0, 0.0 ];
      const subject = quatNormalize( quat );

      expect( subject ).toBeCloseToArray( [ 0.0, 0.0, 0.0, 1.0 ] );
    } );
  } );
} );
