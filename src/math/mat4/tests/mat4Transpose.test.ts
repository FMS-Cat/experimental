import '../../../tests/matchers/toBeCloseToArray';
import { mat4Transpose } from '../mat4Transpose';

describe( 'mat4Transpose', () => {
  it( 'returns a transpose of the matrix', () => {
    const subject = mat4Transpose( [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, 16
    ] );

    expect( subject ).toBeCloseToArray( [
      1, 5, 9, 13,
      2, 6, 10, 14,
      3, 7, 11, 15,
      4, 8, 12, 16,
    ] );
  } );
} );
