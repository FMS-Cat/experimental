import '../../../tests/matchers/toBeCloseToArray';
import { mat4Perspective } from '../../mat4/mat4Perspective';
import { planes3FromProjectionMatrix } from '../planes3FromProjectionMatrix';

describe( 'planes3FromProjectionMatrix', () => {
  it( 'returns a set of plane out of given projection matrix', () => {
    const proj = mat4Perspective( 45.0, 0.01, 100.0 );
    const subject = planes3FromProjectionMatrix( proj );

    expect( subject[ 0 ][ 0 ] ).toBeCloseToArray( [ -0.924, 0.0, -0.383 ] );
    expect( subject[ 0 ][ 1 ] ).toBeCloseTo( 0.0 );
    expect( subject[ 1 ][ 0 ] ).toBeCloseToArray( [ 0.924, 0.0, -0.383 ] );
    expect( subject[ 1 ][ 1 ] ).toBeCloseTo( 0.0 );
    expect( subject[ 2 ][ 0 ] ).toBeCloseToArray( [ 0.0, -0.924, -0.383 ] );
    expect( subject[ 2 ][ 1 ] ).toBeCloseTo( 0.0 );
    expect( subject[ 3 ][ 0 ] ).toBeCloseToArray( [ 0.0, 0.924, -0.383 ] );
    expect( subject[ 3 ][ 1 ] ).toBeCloseTo( 0.0 );
    expect( subject[ 4 ][ 0 ] ).toBeCloseToArray( [ 0.0, 0.0, 1.0 ] );
    expect( subject[ 4 ][ 1 ] ).toBeCloseTo( 100.0 );
    expect( subject[ 5 ][ 0 ] ).toBeCloseToArray( [ 0.0, 0.0, -1.0 ] );
    expect( subject[ 5 ][ 1 ] ).toBeCloseTo( -0.01 );
  } );
} );
