import { box3ContainsPoint } from '../box3ContainsPoint';
import type { RawBox3 } from '../RawBox3';

const box222: RawBox3 = [ [ -1.0, -1.0, -1.0 ], [ 1.0, 1.0, 1.0 ] ];

describe( 'planesContainPoint', () => {
  it( 'returns true if point is inside of the box', () => {
    const subject = box3ContainsPoint( box222, [ 0.0, 0.5, 0.5 ] );
    expect( subject ).toBe( true );
  } );

  it( 'returns false if point is outside of the box', () => {
    const subject = box3ContainsPoint( box222, [ -2.0, 0.0, 0.0 ] );
    expect( subject ).toBe( false );
  } );
} );
