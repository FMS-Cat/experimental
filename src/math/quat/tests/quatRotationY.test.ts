import '../../../tests/matchers/toBeCloseToArray';
import { quatRotationY } from '../quatRotationY';

describe( 'quatRotationY', () => {
  it( 'returns a quaternion rotates around y axis', () => {
    const subject = quatRotationY( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.5, 0.0, 0.866 ] );
  } );
} );
