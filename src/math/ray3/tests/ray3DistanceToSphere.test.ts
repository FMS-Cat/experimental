import { ray3DistanceToSphere } from '../ray3DistanceToSphere';
import { ray3FromLine3 } from '../ray3FromLine3';
import type { RawLine3 } from '../../line3/RawLine3';
import type { RawRay3 } from '../RawRay3';
import type { RawSphere3 } from '../../sphere3/RawSphere3';

describe( 'ray3DistanceToSphere', () => {
  it( 'returns distances of the ray to the sphere', () => {
    const sphere: RawSphere3 = [ [ 0.5, 0.0, 0.5 ], 1.0 ];
    const line: RawLine3 = [ [ -0.5, 0.0, -1.5 ], [ 1.5, 0.0, 2.0 ] ];
    const ray: RawRay3 = ray3FromLine3( line );

    const subject = ray3DistanceToSphere( ray, sphere );

    expect( subject ).not.toBeNull();
    expect( subject?.[ 0 ] ).toBeCloseTo( 1.240 );
    expect( subject?.[ 1 ] ).toBeCloseTo( 3.225 );
  } );

  it( 'returns null if the ray does not intersect with the sphere', () => {
    const sphere: RawSphere3 = [ [ 0.5, 0.0, 0.5 ], 1.0 ];
    const line: RawLine3 = [ [ -0.5, 0.0, -1.5 ], [ 0.5, 0.0, -1.5 ] ];
    const ray: RawRay3 = ray3FromLine3( line );

    const subject = ray3DistanceToSphere( ray, sphere );

    expect( subject ).toBeNull();
  } );
} );
