import { retry } from '../retry';

describe( 'retry', () => {
  it( 'returns the content if there was no error', () => {
    const subject = retry( () => 'haha', 3 );
    expect( subject ).toBe( 'haha' );
  } );

  it( 'throws an error if it fails n times', () => {
    let tries = 0;

    const subject = (): void => retry( () => {
      tries ++;
      throw new Error( 'nice' );
    }, 69 );

    expect( subject ).toThrow( 'nice' );
    expect( tries ).toBe( 69 );
  } );

  it( 'retries until the function returns a value successfully', () => {
    let str = '';
    let tries = 0;

    const subject = retry( () => {
      tries ++;

      if ( str === 'すとらちゃんすとらちゃんすとらちゃんすとらちゃんすとらちゃん' ) {
        return str;
      } else {
        str += 'すとらちゃん';
        throw new Error( 'no enough すとらちゃん' );
      }
    }, 10 );

    expect( subject ).toBe( 'すとらちゃんすとらちゃんすとらちゃんすとらちゃんすとらちゃん' );
    expect( tries ).toBe( 6 );
  } );
} );
