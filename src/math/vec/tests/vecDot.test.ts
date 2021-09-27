import { vecDot } from '../vecDot';

describe( 'vecDot', () => {
  it( 'returns a dot product of two vecs', () => {
    const vecA = [ 1.0, 2.0, 3.0 ];
    const vecB = [ 4.0, 5.0, 6.0 ];
    const subject = vecDot( vecA, vecB );

    expect( subject ).toBeCloseTo( 32.0 );
  } );
} );
