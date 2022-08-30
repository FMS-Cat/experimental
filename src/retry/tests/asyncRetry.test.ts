import { asyncRetry } from '../asyncRetry';

describe( 'asyncRetry', () => {
  it( 'returns the content if there was no error', async () => {
    const subject = asyncRetry( async () => 'haha', 3 );
    await expect( subject ).resolves.toBe( 'haha' );
  } );

  it( 'throws an error if it fails n times', async () => {
    let tries = 0;

    const subject = asyncRetry( async () => {
      tries ++;
      throw new Error( 'nice' );
    }, 69 );

    await expect( subject ).rejects.toThrow( 'nice' );
    expect( tries ).toBe( 69 );
  } );

  it( 'retries until the function returns a value successfully', async () => {
    let str = '';
    let tries = 0;

    const subject = asyncRetry( async () => {
      tries ++;

      if ( str === 'すとらちゃんすとらちゃんすとらちゃんすとらちゃんすとらちゃん' ) {
        return str;
      } else {
        str += 'すとらちゃん';
        throw new Error( 'no enough すとらちゃん' );
      }
    }, 10 );

    await expect( subject ).resolves.toBe( 'すとらちゃんすとらちゃんすとらちゃんすとらちゃんすとらちゃん' );
    expect( tries ).toBe( 6 );
  } );
} );
