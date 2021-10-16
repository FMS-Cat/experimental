import '../../../tests/matchers/toBeCloseToArray';
import { mat3FromMat4Transpose } from '../mat3FromMat4Transpose';

describe( 'mat3FromMat4Transpose', () => {
  it( 'returns a transposed matrix3 out of a matrix4', () => {
    const subject = mat3FromMat4Transpose( [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ] );

    expect( subject ).toBeCloseToArray( [
      1, 5, 9,
      2, 6, 10,
      3, 7, 11,
    ] );
  } );
} );
