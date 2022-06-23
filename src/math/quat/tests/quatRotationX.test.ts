import '../../../tests/matchers/toBeCloseToArray';
import { quatRotationX } from '../quatRotationX';

describe( 'quatRotationX', () => {
  it( 'returns a quaternion rotates around x axis', () => {
    const subject = quatRotationX( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [ 0.5, 0.0, 0.0, 0.866 ] );
  } );
} );
