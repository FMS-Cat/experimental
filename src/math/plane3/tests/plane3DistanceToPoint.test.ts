import { plane3DistanceToPoint } from '../plane3DistanceToPoint';
import { vecNormalize } from '../../vec/vecNormalize';
import type { RawVector3 } from '../../vec3/RawVector3';

describe( 'plane3DistanceToPoint', () => {
  it( 'returns a distance from given plane to given point (a intuitive sample)', () => {
    const subject = plane3DistanceToPoint( [ [ 0.0, 1.0, 0.0 ], 1.0 ], [ 0.0, 0.0, 0.0 ] );
    expect( subject ).toBeCloseTo( 1.0 );
  } );

  it( 'returns a distance from given plane to given point (a hardcore sample)', () => {
    const normal: RawVector3 = vecNormalize( [ 1.0, 2.0, 3.0 ] );
    const subject = plane3DistanceToPoint( [ normal, 8.0 ], [ 0.0, 5.0, 0.0 ] );
    expect( subject ).toBeCloseTo( 10.673 );
  } );
} );
