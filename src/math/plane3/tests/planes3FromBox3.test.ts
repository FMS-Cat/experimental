import '../../../tests/matchers/toBeCloseToArray';
import { RawBox3 } from '../../box3/RawBox3';
import { planes3FromBox3 } from '../planes3FromBox3';
import type { RawPlane3 } from '../RawPlane3';

const box222: RawBox3 = [ [ -1.0, -1.0, -1.0 ], [ 1.0, 1.0, 1.0 ] ];

const planes222Box: RawPlane3[] = [
  [ [ 1.0, 0.0, 0.0 ], 1.0 ],
  [ [ -1.0, 0.0, 0.0 ], 1.0 ],
  [ [ 0.0, 1.0, 0.0 ], 1.0 ],
  [ [ 0.0, -1.0, 0.0 ], 1.0 ],
  [ [ 0.0, 0.0, 1.0 ], 1.0 ],
  [ [ 0.0, 0.0, -1.0 ], 1.0 ],
];

describe( 'planes3FromBox3', () => {
  it( 'returns a set of planes out of given box', () => {
    const subject = planes3FromBox3( box222 );
    expect( subject[ 0 ][ 0 ] ).toBeCloseToArray( planes222Box[ 0 ][ 0 ] );
    expect( subject[ 0 ][ 1 ] ).toBeCloseTo( planes222Box[ 0 ][ 1 ] );
    expect( subject[ 1 ][ 0 ] ).toBeCloseToArray( planes222Box[ 1 ][ 0 ] );
    expect( subject[ 1 ][ 1 ] ).toBeCloseTo( planes222Box[ 1 ][ 1 ] );
    expect( subject[ 2 ][ 0 ] ).toBeCloseToArray( planes222Box[ 2 ][ 0 ] );
    expect( subject[ 2 ][ 1 ] ).toBeCloseTo( planes222Box[ 2 ][ 1 ] );
    expect( subject[ 3 ][ 0 ] ).toBeCloseToArray( planes222Box[ 3 ][ 0 ] );
    expect( subject[ 3 ][ 1 ] ).toBeCloseTo( planes222Box[ 3 ][ 1 ] );
    expect( subject[ 4 ][ 0 ] ).toBeCloseToArray( planes222Box[ 4 ][ 0 ] );
    expect( subject[ 4 ][ 1 ] ).toBeCloseTo( planes222Box[ 4 ][ 1 ] );
    expect( subject[ 5 ][ 0 ] ).toBeCloseToArray( planes222Box[ 5 ][ 0 ] );
    expect( subject[ 5 ][ 1 ] ).toBeCloseTo( planes222Box[ 5 ][ 1 ] );
  } );
} );
