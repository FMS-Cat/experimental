import '../../../tests/matchers/toBeCloseToArray';
import { mat3Multiply } from '../mat3Multiply';
import type { RawMatrix3 } from '../RawMatrix3';

const rawMatrixRotateAroundX45: RawMatrix3 = [
  1.0, 0.0, 0.0,
  0.0, 0.707, 0.707,
  0.0, -0.707, 0.707,
];

const rawMatrixInvLookAtFrom345: RawMatrix3 = [
  0.857, -0.291, 0.424,
  0.000, 0.825, 0.566,
  -0.514, -0.485, 0.707,
];

const rawMatrixPerspectiveFov40Near1Far500: RawMatrix3 = [
  2.7474774194546225, 0, 0,
  0, 2.7474774194546225, 0,
  0, 0, -1.0040080160320641,
];

describe( 'mat3Multiply', () => {
  it( 'returns a multiplication result of two matrices', () => {
    const subject = mat3Multiply(
      rawMatrixInvLookAtFrom345,
      rawMatrixRotateAroundX45,
    );

    expect( subject ).toBeCloseToArray( [
      0.857, -0.291, 0.424,
      -0.364, 0.240, 0.900,
      -0.364, -0.926, 0.100,
    ] );
  } );

  it( 'returns a multiplication result of three matrices', () => {
    const subject = mat3Multiply(
      rawMatrixPerspectiveFov40Near1Far500,
      rawMatrixInvLookAtFrom345,
      rawMatrixRotateAroundX45,
    );

    expect( subject ).toBeCloseToArray( [
      2.356, -0.800, -0.426,
      -1.000, 0.660, -0.904,
      -1.000, -2.544, -0.100,
    ] );
  } );
} );
