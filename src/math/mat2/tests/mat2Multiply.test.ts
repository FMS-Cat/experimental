import '../../../tests/matchers/toBeCloseToArray';
import { mat2Multiply } from '../mat2Multiply';
import type { RawMatrix2 } from '../RawMatrix2';

const rawMatrixA: RawMatrix2 = [
  1.0, 2.0,
  3.0, 4.0,
];

const rawMatrixB: RawMatrix2 = [
  5.0, 6.0,
  7.0, 8.0,
];

const rawMatrixC: RawMatrix2 = [
  9.0, 10.0,
  11.0, 12.0,
];

describe( 'mat2Multiply', () => {
  it( 'returns a multiplication result of two matrices', () => {
    const subject = mat2Multiply(
      rawMatrixA,
      rawMatrixB,
    );

    // https://www.wolframalpha.com/input?i=%7B%7B1%2C3%7D%2C+%7B2%2C4%7D%7D+*+%7B%7B5%2C7%7D%2C+%7B6%2C8%7D%7D
    expect( subject ).toBeCloseToArray( [
      23.0, 34.0,
      31.0, 46.0,
    ] );
  } );

  it( 'returns a multiplication result of three matrices', () => {
    const subject = mat2Multiply(
      rawMatrixA,
      rawMatrixB,
      rawMatrixC,
    );

    // https://www.wolframalpha.com/input?i=%7B%7B1%2C3%7D%2C+%7B2%2C4%7D%7D+*+%7B%7B5%2C7%7D%2C+%7B6%2C8%7D%7D+*+%7B%7B9%2C11%7D%2C+%7B10%2C12%7D%7D
    expect( subject ).toBeCloseToArray( [
      517.0, 766.0,
      625.0, 926.0,
    ] );
  } );
} );
