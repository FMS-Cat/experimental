import { vecLengthSq } from '../vecLengthSq';

describe( 'vecLengthSq', () => {
  it( 'returns a squared length of the vec', () => {
    const vec = [ 1.0, 2.0, 3.0 ];
    const subject = vecLengthSq( vec );

    expect( subject ).toBeCloseTo( 14.0 );
  } );
} );
