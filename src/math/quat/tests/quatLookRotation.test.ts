import '../../../tests/matchers/toBeCloseToArray';
import { RawVector3 } from '../..';
import { quatLookRotation } from '../quatLookRotation';

describe( 'quatLookRotation', () => {
  it( 'returns a quaternion look at the direction of `look`', () => {
    const look: RawVector3 = [ 0.0, 0.0, 1.0 ];
    const up: RawVector3 = [ 1.0, 1.0, 1.0 ];
    const subject = quatLookRotation( look, up );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.0, -0.383, 0.924 ] );
  } );
} );
