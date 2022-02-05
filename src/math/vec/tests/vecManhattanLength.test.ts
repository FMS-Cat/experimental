import { vecManhattanLength } from '../vecManhattanLength';

describe( 'vecManhattanLength', () => {
  it( 'returns a manhattan length of the vec', () => {
    const vec = [ 1.0, -2.0, 3.0 ];
    const subject = vecManhattanLength( vec );

    expect( subject ).toBeCloseTo( 6.0 );
  } );
} );
