import { arrayRange } from '../arrayRange';

describe( 'arrayRange', () => {
  it( 'returns a range array from 1 to 8', async () => {
    const subject = arrayRange( 1, 8 );
    expect( subject ).toEqual( [ 1, 2, 3, 4, 5, 6, 7 ] );
  } );

  it( 'returns a range array from 2 to -5', async () => {
    const subject = arrayRange( 2, -5 );
    expect( subject ).toEqual( [ 2, 1, 0, -1, -2, -3, -4 ] );
  } );

  it( 'returns a range array from 2 to 11, step 2', async () => {
    const subject = arrayRange( 2, 11, 2 );
    expect( subject ).toEqual( [ 2, 4, 6, 8, 10 ] );
  } );

  it( 'returns a range array from 5 to -15, step -5', async () => {
    const subject = arrayRange( 5, -15, -5 );
    expect( subject ).toEqual( [ 5, 0, -5, -10 ] );
  } );
} );
