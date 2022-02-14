import '../../../tests/matchers/toBeCloseToArray';
import { line3DistanceToPoint } from '../line3DistanceToPoint';
import type { RawLine3 } from '../RawLine3';
import type { RawVector3 } from '../../vec3/RawVector3';

describe( 'line3DistanceToPoint', () => {
  it( 'returns a distance from a point to the given line (line is infinite)', () => {
    const line: RawLine3 = [ [ -1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0 ] ];
    const point: RawVector3 = [ -2.0, 0.0, 0.0 ];
    const subject = line3DistanceToPoint( line, point );
    expect( subject ).toBeCloseTo( 1.414 );
  } );

  it( 'returns a distance from a point to the given line (line is a segment)', () => {
    const line: RawLine3 = [ [ -1.0, 1.0, 1.0 ], [ 1.0, 1.0, 1.0 ] ];
    const point: RawVector3 = [ -2.0, 0.0, 0.0 ];
    const subject = line3DistanceToPoint( line, point, true );
    expect( subject ).toBeCloseTo( 1.732 );
  } );
} );
