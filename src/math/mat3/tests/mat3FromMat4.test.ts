import '../../../tests/matchers/toBeCloseToArray';
import { mat3FromMat4 } from '../mat3FromMat4';

describe( 'mat3FromMat4', () => {
  it( 'returns a matrix3 out of a matrix4', () => {
    const subject = mat3FromMat4( [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ] );

    expect( subject ).toBeCloseToArray( [
      1, 2, 3,
      5, 6, 7,
      9, 10, 11,
    ] );
  } );
} );
