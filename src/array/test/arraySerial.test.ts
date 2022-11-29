import { arraySerial } from '../arraySerial';

describe( 'arraySerial', () => {
  it( 'returns a serial array', async () => {
    const subject = arraySerial( 5 );
    expect( subject ).toEqual( [ 0, 1, 2, 3, 4 ] );
  } );
} );
