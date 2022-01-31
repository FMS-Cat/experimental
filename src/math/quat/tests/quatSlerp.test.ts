import '../../../tests/matchers/toBeCloseToArray';
import { quatSlerp } from '../quatSlerp';
import { vecNormalize } from '../..';
import type { RawQuaternion } from '../RawQuaternion';

describe( 'quatSlerp', () => {
  it( 'returns a interpolated quaternion of two given quaternions', () => {
    const quatA: RawQuaternion = [ 0.0, 0.0, 0.0, 1.0 ];
    const quatB: RawQuaternion = vecNormalize( [ 0.34, -0.03, 0.78, 0.52 ] );
    const subject = quatSlerp( quatA, quatB, 0.7 );

    expect( subject ).toBeCloseToArray( [ 0.262, -0.023, 0.601, 0.755 ] );
  } );

  it( 'performs an edge case properly ("cosHalfTheta is negative" case)', () => {
    const quatA: RawQuaternion = [ 0.0, 1.0, 0.0, 0.0 ];
    const quatB: RawQuaternion = [ 0.0, -0.7071, 0.0, 0.7071 ];
    const subject = quatSlerp( quatA, quatB, 0.5 );

    expect( subject ).toBeCloseToArray( [ 0.0, 0.924, 0.0, -0.382 ] );
  } );
} );
