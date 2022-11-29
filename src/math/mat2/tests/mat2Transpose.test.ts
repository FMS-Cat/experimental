import '../../../tests/matchers/toBeCloseToArray';
import { mat2Transpose } from '../mat2Transpose';

describe( 'mat2Transpose', () => {
  it( 'returns a transposed matrix2', () => {
    const subject = mat2Transpose( [
      1, 2,
      3, 4,
    ] );

    expect( subject ).toBeCloseToArray( [
      1, 3,
      2, 4,
    ] );
  } );
} );
