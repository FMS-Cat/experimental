import '../../../tests/matchers/toBeCloseToArray';
import { quatRotationZ } from '../quatRotationZ';

describe( 'quatRotationZ', () => {
  it( 'returns a quaternion rotates around z axis', () => {
    const subject = quatRotationZ( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.0, 0.5, 0.866 ] );
  } );
} );
