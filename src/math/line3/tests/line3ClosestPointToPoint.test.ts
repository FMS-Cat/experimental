import '../../../tests/matchers/toBeCloseToArray';
import { line3ClosestPointToPoint } from '../line3ClosestPointToPoint';
import type { RawLine3 } from '../RawLine3';
import type { RawVector3 } from '../../vec3/RawVector3';

describe( 'line3ClosestPointToPoint', () => {
  it( 'returns a point that is closest to the given line (line is infinite)', () => {
    const line: RawLine3 = [ [ -1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0 ] ];
    const point: RawVector3 = [ -2.0, 0.0, 0.0 ];
    const subject = line3ClosestPointToPoint( line, point );
    expect( subject ).toBeCloseToArray( [ -2.0, 1.0, 1.0 ] );
  } );

  it( 'returns a point that is closest to the given line (line is a segment)', () => {
    const line: RawLine3 = [ [ -1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0 ] ];
    const point: RawVector3 = [ -2.0, 0.0, 0.0 ];
    const subject = line3ClosestPointToPoint( line, point, true );
    expect( subject ).toBeCloseToArray( [ -1.0, 1.0, 1.0 ] );
  } );
} );
