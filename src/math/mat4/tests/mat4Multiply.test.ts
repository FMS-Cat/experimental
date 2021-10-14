import '../../../tests/matchers/toBeCloseToArray';
import { mat4Multiply } from '../mat4Multiply';
import type { RawMatrix4 } from '../RawMatrix4';

const rawMatrixRotateAroundX45: RawMatrix4 = [
  1.0, 0.0, 0.0, 0.0,
  0.0, 0.707, 0.707, 0.0,
  0.0, -0.707, 0.707, 0.0,
  0.0, 0.0, 0.0, 1.0,
];

const rawMatrixInvLookAtFrom345: RawMatrix4 = [
  0.857, -0.291, 0.424, 0.000,
  0.000, 0.825, 0.566, 0.000,
  -0.514, -0.485, 0.707, 0.000,
  0.000, 0.000, -7.071, 1.000,
];

const rawMatrixPerspectiveFov40Near1Far500: RawMatrix4 = [
  2.7474774194546225, 0, 0, 0,
  0, 2.7474774194546225, 0, 0,
  0, 0, -1.0040080160320641, -1,
  0, 0, -2.004008016032064, 0
];

describe( 'mat4Multiply', () => {
  it( 'returns a multiplication result of two matrices', () => {
    const subject = mat4Multiply(
      rawMatrixInvLookAtFrom345,
      rawMatrixRotateAroundX45,
    );

    expect( subject ).toBeCloseToArray( [
      0.857, -0.291, 0.424, 0.000,
      -0.364, 0.240, 0.900, 0.000,
      -0.364, -0.926, 0.100, 0.000,
      0.000, 0.000, -7.071, 1.000,
    ] );
  } );

  it( 'returns a multiplication result of three matrices', () => {
    const subject = mat4Multiply(
      rawMatrixPerspectiveFov40Near1Far500,
      rawMatrixInvLookAtFrom345,
      rawMatrixRotateAroundX45,
    );

    expect( subject ).toBeCloseToArray( [
      2.356, -0.800, -0.426, -0.424,
      -1.000, 0.660, -0.904, -0.900,
      -1.000, -2.544, -0.100, -0.100,
      0.000, 0.000, 5.095, 7.071,
    ] );
  } );
} );
