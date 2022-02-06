import '../../../tests/matchers/toBeCloseToArray';
import { mat4FromMat3 } from '../mat4FromMat3';
import type { RawMatrix3 } from '../../mat3/RawMatrix3';

describe( 'mat4FromMat3', () => {
  it( 'returns a matrix4 out of a matrix3', () => {
    const mat3: RawMatrix3 = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ];
    const subject = mat4FromMat3( mat3 );

    expect( subject ).toBeCloseToArray( [
      1, 2, 3, 0,
      4, 5, 6, 0,
      7, 8, 9, 0,
      0, 0, 0, 1,
    ] );
  } );
} );
