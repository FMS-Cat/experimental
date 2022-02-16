import '../../../tests/matchers/toBeCloseToArray';
import { line3ApplyMatrix4 } from '../line3ApplyMatrix4';
import { mat4Multiply } from '../../mat4/mat4Multiply';
import { mat4RotateY } from '../../mat4/mat4RotateY';
import { mat4Translate } from '../../mat4/mat4Translate';
import type { RawLine3 } from '../RawLine3';

describe( 'line3ApplyMatrix4', () => {
  it( 'transforms given line using given matrix', () => {
    const line: RawLine3 = [ [ 1.0, 1.0, 1.0 ], [ 2.0, 2.0, 2.0 ] ];
    const matrix = mat4Multiply(
      mat4RotateY( Math.PI / 4.0 ),
      mat4Translate( [ 0.0, 0.0, 5.0 ] ),
    );

    const subject = line3ApplyMatrix4( line, matrix );

    expect( subject[ 0 ] ).toBeCloseToArray( [ -3.536, 1.0, 4.950 ] );
    expect( subject[ 1 ] ).toBeCloseToArray( [ -3.536, 2.0, 6.364 ] );
  } );
} );
