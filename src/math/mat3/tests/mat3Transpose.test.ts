import '../../../tests/matchers/toBeCloseToArray';
import { mat3Transpose } from '../mat3Transpose';

describe( 'mat3Transpose', () => {
  it( 'returns a transposed matrix3', () => {
    const subject = mat3Transpose( [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ] );

    expect( subject ).toBeCloseToArray( [
      1, 4, 7,
      2, 5, 8,
      3, 6, 9,
    ] );
  } );
} );
