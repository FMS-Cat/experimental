import '../../../tests/matchers/toBeCloseToArray';
import { quatFromEuler } from '../quatFromEuler';

describe( 'eulerFromMat3', () => {
  it( 'returns a quaternion out of an euler angles (XYZ)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'XYZ' );
    expect( subject ).toBeCloseToArray( [ -0.087, 0.415, 0.516, 0.744 ] );
  } );

  it( 'returns a quaternion out of an euler angles (XZY)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'XZY' );
    expect( subject ).toBeCloseToArray( [ 0.393, 0.415, 0.516, 0.638 ] );
  } );

  it( 'returns a quaternion out of an euler angles (YXZ)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'YXZ' );
    expect( subject ).toBeCloseToArray( [ -0.087, 0.415, 0.643, 0.638 ] );
  } );

  it( 'returns a quaternion out of an euler angles (YZX)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'YZX' );
    expect( subject ).toBeCloseToArray( [ -0.087, 0.158, 0.643, 0.744 ] );
  } );

  it( 'returns a quaternion out of an euler angles (ZXY)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'ZXY' );
    expect( subject ).toBeCloseToArray( [ 0.393, 0.158, 0.516, 0.744 ] );
  } );

  it( 'returns a quaternion out of an euler angles (ZYX)', () => {
    const subject = quatFromEuler( [ 0.436, 0.785, 1.396 ], 'ZYX' );
    expect( subject ).toBeCloseToArray( [ 0.393, 0.158, 0.643, 0.638 ] );
  } );
} );
