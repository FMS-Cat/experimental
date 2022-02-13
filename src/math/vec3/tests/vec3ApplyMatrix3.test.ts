import '../../../tests/matchers/toBeCloseToArray';
import { vec3ApplyMatrix3 } from '../vec3ApplyMatrix3';
import type { RawMatrix3 } from '../../mat3/RawMatrix3';
import type { RawVector3 } from '../RawVector3';

describe( 'vec3ApplyMatrix3', () => {
  it( 'returns a vector applied a matrix', () => {
    const vec: RawVector3 = [ 1.0, 2.0, 3.0 ];
    const mat: RawMatrix3 = [
      1.0, 2.0, 3.0,
      4.0, 5.0, 6.0,
      7.0, 8.0, 9.0,
    ];
    const subject = vec3ApplyMatrix3( vec, mat );

    expect( subject ).toBeCloseToArray( [ 30.0, 36.0, 42.0 ] );
  } );
} );
