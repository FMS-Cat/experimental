import '../../../tests/matchers/toBeCloseToArray';
import { mat2Determinant } from '../mat2Determinant';

describe( 'mat2Determinant', () => {
  it( 'returns a determinant of the matrix', () => {
    const subject = mat2Determinant( [
      1, 2,
      3, 4,
    ] );

    expect( subject ).toBeCloseTo( -2.0 );
  } );
} );
