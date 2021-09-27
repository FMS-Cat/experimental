import '../../../tests/matchers/toBeCloseToArray';
import type { RawMatrix4 } from '../../mat4/RawMatrix4';
import type { RawVector3 } from '../RawVector3';
import { vec3ApplyMatrix4 } from '../vec3ApplyMatrix4';

describe( 'vec3ApplyMatrix4', () => {
  it( 'returns a vector applied a matrix', () => {
    const vec: RawVector3 = [ 1.0, 2.0, 3.0 ];
    const mat: RawMatrix4 = [
      1.0, 2.0, 3.0, 4.0,
      5.0, 6.0, 7.0, 8.0,
      9.0, 10.0, 11.0, 12.0,
      13.0, 14.0, 15.0, 16.0
    ];
    const subject = vec3ApplyMatrix4( vec, mat );

    expect( subject ).toBeCloseToArray( [ 0.708, 0.806, 0.903 ] );
  } );
} );
