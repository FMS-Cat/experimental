import '../../../tests/matchers/toBeCloseToArray';
import { mat4RotationY } from '../mat4RotationY';

describe( 'mat4RotationY', () => {
  it( 'returns a matrix that rotates around y axis', () => {
    const subject = mat4RotationY( Math.PI / 3.0 );

    expect( subject ).toBeCloseToArray( [
      0.5, 0, 0.866, 0,
      0, 1, 0, 0,
      -0.866, 0, 0.5, 0,
      0, 0, 0, 1,
    ] );
  } );
} );
