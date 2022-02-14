import '../../../tests/matchers/toBeCloseToArray';
import { mat3CreateNormalMatrix } from '../../mat3/mat3CreateNormalMatrix';
import { mat4Multiply } from '../../mat4/mat4Multiply';
import { mat4RotateY } from '../../mat4/mat4RotateY';
import { mat4Translate } from '../../mat4/mat4Translate';
import { plane3ApplyMatrix4 } from '../plane3ApplyMatrix4';
import type { RawPlane3 } from '../RawPlane3';

describe( 'plane3ApplyMatrix4', () => {
  it( 'transforms given plane using given matrix', () => {
    const plane: RawPlane3 = [ [ 0.707, 0.707, 0.0 ], 0.0 ];
    const matrix = mat4Multiply(
      mat4RotateY( Math.PI / 2.0 ),
      mat4Translate( [ 0.0, 0.0, 5.0 ] ),
    );
    const normalMatrix = mat3CreateNormalMatrix( matrix );

    const subject = plane3ApplyMatrix4( plane, matrix, normalMatrix );

    expect( subject[ 0 ] ).toBeCloseToArray( [ 0.0, 0.707, 0.707 ] );
    expect( subject[ 1 ] ).toBeCloseTo( 3.535 );
  } );
} );
