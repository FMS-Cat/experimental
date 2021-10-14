import '../../../tests/matchers/toBeCloseToArray';
import { vec3ApplyQuaternion } from '../vec3ApplyQuaternion';
import type { RawQuaternion } from '../../quat/RawQuaternion';
import type { RawVector3 } from '../RawVector3';

describe( 'vec3ApplyQuaternion', () => {
  it( 'returns a vector applied a quaternion', () => {
    const vec: RawVector3 = [ 1.0, 2.0, 3.0 ];
    const quat: RawQuaternion = [ 0.730, 0.548, 0.365, 0.183 ];
    const subject = vec3ApplyQuaternion( vec, quat );

    expect( subject ).toBeCloseToArray( [ 3.666, 0.668, -0.332 ] );
  } );
} );
