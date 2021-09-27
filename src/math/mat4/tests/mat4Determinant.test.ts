import '../../../tests/matchers/toBeCloseToArray';
import type { RawMatrix4 } from '../RawMatrix4';
import { mat4Determinant } from '../mat4Determinant';

describe( 'mat4Determinant', () => {
  it( 'returns a determinant of the matrix', () => {
    const rawMatrixLookAtFrom345: RawMatrix4 = [
      0.857, 0.000, -0.514, 0.000,
      -0.291, 0.825, -0.485, 0.000,
      0.424, 0.566, 0.707, 0.000,
      3.000, 4.000, 5.000, 1.000,
    ];

    const subject = mat4Determinant( rawMatrixLookAtFrom345 );

    expect( subject ).toBeCloseTo( 1.0 );
  } );
} );
