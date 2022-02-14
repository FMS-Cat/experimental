import '../../../tests/matchers/toBeCloseToArray';
import { plane3Normalize } from '../plane3Normalize';

describe( 'plane3Normalize', () => {
  it( 'returns a normalize plane from given plane', () => {
    const [ normal, distance ] = plane3Normalize( [ [ 5.0, 5.0, 5.0 ], 5.0 ] );
    expect( normal ).toBeCloseToArray( [ 0.577, 0.577, 0.577 ] );
    expect( distance ).toBeCloseTo( 0.577 );
  } );
} );
