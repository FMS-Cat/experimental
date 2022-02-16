import '../../../tests/matchers/toBeCloseToArray';
import { ray3FromLine3 } from '../ray3FromLine3';
import type { RawLine3 } from '../../line3/RawLine3';

describe( 'ray3FromLine3', () => {
  it( 'creates a ray out of a line', () => {
    const line: RawLine3 = [ [ -1.0, -1.0, -1.0 ], [ 1.0, 1.0, 1.0 ] ];

    const subject = ray3FromLine3( line );

    expect( subject[ 0 ] ).toBeCloseToArray( [ -1.0, -1.0, -1.0 ] );
    expect( subject[ 1 ] ).toBeCloseToArray( [ 0.577, 0.577, 0.577 ] );
  } );
} );
