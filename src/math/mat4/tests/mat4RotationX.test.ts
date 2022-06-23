import '../../../tests/matchers/toBeCloseToArray';
import { mat4RotationX } from '../mat4RotationX';

describe( 'mat4RotationX', () => {
  it( 'returns a matrix that rotates around x axis', () => {
    const subject = mat4RotationX( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [
      1, 0, 0, 0,
      0, 0.5, -0.866, 0,
      0, 0.866, 0.5, 0,
      0, 0, 0, 1,
    ] );
  } );
} );
