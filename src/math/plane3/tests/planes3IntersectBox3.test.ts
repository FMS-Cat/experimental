import { planes3IntersectBox3 } from '../planes3IntersectBox3';
import type { RawBox3 } from '../../box3/RawBox3';
import type { RawPlane3 } from '../RawPlane3';

const planes222Box: RawPlane3[] = [
  [ [ 1.0, 0.0, 0.0 ], 1.0 ],
  [ [ -1.0, 0.0, 0.0 ], 1.0 ],
  [ [ 0.0, 1.0, 0.0 ], 1.0 ],
  [ [ 0.0, -1.0, 0.0 ], 1.0 ],
  [ [ 0.0, 0.0, 1.0 ], 1.0 ],
  [ [ 0.0, 0.0, -1.0 ], 1.0 ],
];

describe( 'planes3IntersectBox3', () => {
  it( 'returns true if the box intersects with the box', () => {
    const box: RawBox3 = [ [ 0.0, 0.0, 0.0 ], [ 5.0, 0.5, 0.5 ] ];
    const subject = planes3IntersectBox3( planes222Box, box );
    expect( subject ).toBe( true );
  } );

  it( 'returns false if the box does not intersect with the box', () => {
    const box: RawBox3 = [ [ -0.5, 1.5, -0.5 ], [ 0.5, 2.5, 0.5 ] ];
    const subject = planes3IntersectBox3( planes222Box, box );
    expect( subject ).toBe( false );
  } );
} );
