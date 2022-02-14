import { RawSphere3 } from '../RawSphere3';
import { sphere3ContainsPoint } from '../sphere3ContainsPoint';

describe( 'sphere3ContainsPoint', () => {
  it( 'returns true if point is inside of the sphere', () => {
    const sphere: RawSphere3 = [ [ 1.0, 1.0, 1.0 ], 1.0 ];
    const subject = sphere3ContainsPoint( sphere, [ 0.5, 0.5, 0.5 ] );
    expect( subject ).toBe( true );
  } );

  it( 'returns false if point is outside of the sphere', () => {
    const sphere: RawSphere3 = [ [ 1.0, 1.0, 1.0 ], 1.0 ];
    const subject = sphere3ContainsPoint( sphere, [ 0.0, 0.0, 0.0 ] );
    expect( subject ).toBe( false );
  } );
} );
