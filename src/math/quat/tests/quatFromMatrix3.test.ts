import './matchers/toBeCloseToQuaternion';
import { quatFromMatrix3 } from '../quatFromMatrix3';
import type { RawMatrix3 } from '../../mat3/RawMatrix3';

describe( 'quatFromMatrix3', () => {
  it( 'returns a quaternion made out of a matrix', () => {
    const quat: RawMatrix3 = [
      0.071, 0.945, -0.320,
      -0.659, 0.286, 0.696,
      0.749, 0.161, 0.643,
    ];
    const subject = quatFromMatrix3( quat );

    expect( subject ).toBeCloseToQuaternion( [ 0.189, 0.378, 0.567, 0.707 ] );
  } );
} );
