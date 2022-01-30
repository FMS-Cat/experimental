import '../../../tests/matchers/toBeCloseToArray';
import { vec3OrthoNormalize } from '../vec3OrthoNormalize';
import type { RawVector3 } from '../RawVector3';

describe( 'vec3OrthoNormalize', () => {
  it( 'returns a orthogonal tangent, without the input tangent', () => {
    const normal: RawVector3 = [ 0.0, 0.0, 5.0 ];
    const subject = vec3OrthoNormalize( normal );

    expect( subject.normal ).toBeCloseToArray( [ 0.0, 0.0, 1.0 ] );
    expect( subject.tangent ).toBeCloseToArray( [ 0.0, 1.0, 0.0 ] );
    expect( subject.binormal ).toBeCloseToArray( [ -1.0, 0.0, 0.0 ] );
  } );

  it( 'returns a orthogonal tangent', () => {
    const normal: RawVector3 = [ 0.0, 0.0, 5.0 ];
    const tangent: RawVector3 = [ 1.0, 1.0, 1.0 ];
    const subject = vec3OrthoNormalize( normal, tangent );

    expect( subject.normal ).toBeCloseToArray( [ 0.0, 0.0, 1.0 ] );
    expect( subject.tangent ).toBeCloseToArray( [ 0.707, 0.707, 0.0 ] );
    expect( subject.binormal ).toBeCloseToArray( [ -0.707, 0.707, 0.0 ] );
  } );

  it( 'returns a orthogonal tangent and binormal', () => {
    const normal: RawVector3 = [ 0.0, 0.0, 5.0 ];
    const tangent: RawVector3 = [ 1.0, 1.0, 1.0 ];
    const binormal: RawVector3 = [ 0.0, -1.0, 0.0 ];
    const subject = vec3OrthoNormalize( normal, tangent, binormal );

    expect( subject.normal ).toBeCloseToArray( [ 0.0, 0.0, 1.0 ] );
    expect( subject.tangent ).toBeCloseToArray( [ 0.707, 0.707, 0.0 ] );
    expect( subject.binormal ).toBeCloseToArray( [ 0.707, -0.707, 0.0 ] );
  } );
} );
