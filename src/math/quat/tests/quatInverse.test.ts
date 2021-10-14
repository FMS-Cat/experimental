import '../../../tests/matchers/toBeCloseToArray';
import { quatInverse } from '../quatInverse';
import type { RawQuaternion } from '../RawQuaternion';

describe( 'quatInverse', () => {
  it( 'returns an inverse of a quaternion', () => {
    const quat: RawQuaternion = [ 0.183, 0.365, 0.548, 0.730 ];
    const subject = quatInverse( quat );

    expect( subject ).toBeCloseToArray( [ -0.183, -0.365, -0.548, 0.730 ] );
  } );
} );
