import '../../../tests/matchers/toBeCloseToArray';
import { mat2Inverse } from '../mat2Inverse';

describe( 'mat2Inverse', () => {
  it( 'returns an inverse of the matrix', () => {
    const subject = mat2Inverse( [
      1, 2,
      3, 4,
    ] );

    // https://www.wolframalpha.com/input?i=inverse%28%7B%7B1%2C3%7D%2C%7B2%2C4%7D%7D%29&dataset=
    expect( subject ).toBeCloseToArray( [
      -2.0, 1.0,
      1.5, -0.5,
    ] );
  } );
} );
