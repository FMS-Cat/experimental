import '../../../tests/matchers/toBeCloseToArray';
import { mat3FromQuaternion } from '../mat3FromQuaternion';
import type { RawQuaternion } from '../../quat/RawQuaternion';

describe( 'mat3FromQuaternion', () => {
  it( 'returns a matrix3 made out of a quaternion', () => {
    const quat: RawQuaternion = [ 0.189, 0.378, 0.567, 0.707 ];
    const subject = mat3FromQuaternion( quat );

    expect( subject ).toBeCloseToArray( [
      0.071, 0.945, -0.320,
      -0.659, 0.286, 0.696,
      0.749, 0.161, 0.643,
    ] );
  } );
} );
