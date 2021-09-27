import '../../../tests/matchers/toBeCloseToArray';
import type { RawMatrix4 } from '../../mat4';
import type { RawVector4 } from '../RawVector4';
import { vec4ApplyMatrix4 } from '../vec4ApplyMatrix4';

describe( 'vec4ApplyMatrix4', () => {
  it( 'returns a vector applied a matrix', () => {
    const vec: RawVector4 = [ 1.0, 2.0, 3.0, 4.0 ];
    const mat: RawMatrix4 = [
      1.0, 2.0, 3.0, 4.0,
      5.0, 6.0, 7.0, 8.0,
      9.0, 10.0, 11.0, 12.0,
      13.0, 14.0, 15.0, 16.0
    ];
    const subject = vec4ApplyMatrix4( vec, mat );

    expect( subject ).toBeCloseToArray( [ 90.0, 100.0, 110.0, 120.0 ] );
  } );
} );
