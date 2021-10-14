import './matchers/toBeCloseToQuaternion';
import { quatFromMatrix4 } from '../quatFromMatrix4';
import type { RawMatrix4 } from '../../mat4/RawMatrix4';

describe( 'quatFromMatrix4', () => {
  it( 'returns a quaternion made out of a matrix', () => {
    const quat: RawMatrix4 = [
      0.071, 0.945, -0.320, 0.000,
      -0.659, 0.286, 0.696, 0.000,
      0.749, 0.161, 0.643, 0.000,
      0.000, 0.000, 0.000, 1.000,
    ];
    const subject = quatFromMatrix4( quat );

    expect( subject ).toBeCloseToQuaternion( [ 0.189, 0.378, 0.567, 0.707 ] );
  } );
} );
