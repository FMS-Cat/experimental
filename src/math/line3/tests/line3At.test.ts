import '../../../tests/matchers/toBeCloseToArray';
import { line3At } from '../line3At';
import type { RawLine3 } from '../RawLine3';

describe( 'line3At', () => {
  it( 'returns a vector that represents a certain point of given line', () => {
    const line: RawLine3 = [ [ 1.0, 2.0, 3.0 ], [ 4.0, 5.0, 6.0 ] ];
    const subject = line3At( line, 0.5 );
    expect( subject ).toBeCloseToArray( [ 2.5, 3.5, 4.5 ] );
  } );
} );
