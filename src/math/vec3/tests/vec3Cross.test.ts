import '../../../tests/matchers/toBeCloseToArray';
import { vec3Cross } from '../vec3Cross';
import type { RawVector3 } from '../RawVector3';

describe( 'vec3Cross', () => {
  it( 'returns a cross product of two vecs', () => {
    const vecA: RawVector3 = [ 1.0, 2.0, 3.0 ];
    const vecB: RawVector3 = [ 4.0, 5.0, 6.0 ];
    const subject = vec3Cross( vecA, vecB );

    expect( subject ).toBeCloseToArray( [ -3.0, 6.0, -3.0 ] );
  } );
} );
