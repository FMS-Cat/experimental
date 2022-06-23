import '../../../tests/matchers/toBeCloseToArray';
import { mat4RotationZ } from '../mat4RotationZ';

describe( 'mat4RotationZ', () => {
  it( 'returns a matrix that rotates around z axis', () => {
    const subject = mat4RotationZ( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [
      0.5, -0.866, 0, 0,
      0.866, 0.5, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ] );
  } );
} );
