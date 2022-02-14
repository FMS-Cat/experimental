import { planes3ContainPoint } from '../planes3ContainPoint';
import type { RawPlane3 } from '../RawPlane3';

const planes222Box: RawPlane3[] = [
  [ [ 1.0, 0.0, 0.0 ], 1.0 ],
  [ [ -1.0, 0.0, 0.0 ], 1.0 ],
  [ [ 0.0, 1.0, 0.0 ], 1.0 ],
  [ [ 0.0, -1.0, 0.0 ], 1.0 ],
  [ [ 0.0, 0.0, 1.0 ], 1.0 ],
  [ [ 0.0, 0.0, -1.0 ], 1.0 ],
];

describe( 'planes3ContainPoint', () => {
  it( 'returns true if point is inside of planes', () => {
    const subject = planes3ContainPoint( planes222Box, [ 0.0, 0.5, 0.5 ] );
    expect( subject ).toBe( true );
  } );

  it( 'returns false if point is outside of planes', () => {
    const subject = planes3ContainPoint( planes222Box, [ -2.0, 0.0, 0.0 ] );
    expect( subject ).toBe( false );
  } );
} );
