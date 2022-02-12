import '../../../tests/matchers/toBeCloseToArray';
import { mat3Determinant } from '../mat3Determinant';
import type { RawMatrix3 } from '../RawMatrix3';

describe( 'mat3Determinant', () => {
  it( 'returns a determinant of the matrix', () => {
    const rawMatrixLookAtFrom345: RawMatrix3 = [
      0.857, 0.000, -0.514,
      -0.291, 0.825, -0.485,
      0.424, 0.566, 0.707,
    ];

    const subject = mat3Determinant( rawMatrixLookAtFrom345 );

    expect( subject ).toBeCloseTo( 1.0 );
  } );
} );
