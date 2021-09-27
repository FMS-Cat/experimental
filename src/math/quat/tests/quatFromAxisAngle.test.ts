import '../../../tests/matchers/toBeCloseToArray';
import type { RawVector3 } from '../../vec3/RawVector3';
import { quatFromAxisAngle } from '../quatFromAxisAngle';
import { vecNormalize } from '../../vec/vecNormalize';

describe( 'quatFromAxisAngle', () => {
  it( 'returns a quaternion made out of axis and angle', () => {
    const axis = vecNormalize( [ 1.0, 2.0, 3.0 ] ) as RawVector3;
    const angle = Math.PI / 2.0;
    const subject = quatFromAxisAngle( axis, angle );

    expect( subject ).toBeCloseToArray( [ 0.189, 0.378, 0.567, 0.707 ] );
  } );
} );
