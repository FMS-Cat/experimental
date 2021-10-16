import '../../../tests/matchers/toBeCloseToArray';
import { mat3Inverse } from '../mat3Inverse';
import type { RawMatrix3 } from '../RawMatrix3';

const rawMatrixLookAtFrom345: RawMatrix3 = [
  0.857, 0.000, -0.514,
  -0.291, 0.825, -0.485,
  0.424, 0.566, 0.707,
];

const rawMatrixInvLookAtFrom345: RawMatrix3 = [
  0.857, -0.291, 0.424,
  0.000, 0.825, 0.566,
  -0.514, -0.485, 0.707,
];

const rawMatrixCannotInvert: RawMatrix3 = [
  1, 2, 3,
  4, 5, 6,
  7, 8, 9,
];

const rawMatrixZero: RawMatrix3 = [
  0, 0, 0,
  0, 0, 0,
  0, 0, 0,
];

describe( 'mat4Inverse', () => {
  it( 'returns an inverse of the matrix', () => {
    const subject = mat3Inverse( rawMatrixLookAtFrom345 );

    expect( subject ).toBeCloseToArray( rawMatrixInvLookAtFrom345 );
  } );

  describe( 'when given matrix cannot be inverted', () => {
    it( 'returns a zero matrix', () => {
      const subject = mat3Inverse( rawMatrixCannotInvert );

      expect( subject ).toBeCloseToArray( rawMatrixZero );
    } );
  } );
} );
