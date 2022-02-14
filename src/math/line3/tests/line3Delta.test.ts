import '../../../tests/matchers/toBeCloseToArray';
import { line3Delta } from '../line3Delta';
import type { RawLine3 } from '../RawLine3';

describe( 'line3Delta', () => {
  it( 'returns a vector that represents the delta of given line', () => {
    const line: RawLine3 = [ [ 1.0, 2.0, 3.0 ], [ 4.0, 5.0, 6.0 ] ];
    const subject = line3Delta( line );
    expect( subject ).toBeCloseToArray( [ 3.0, 3.0, 3.0 ] );
  } );
} );
