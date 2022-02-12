import { getYugopText } from '../getYugopText';

describe( 'getYugopText', () => {
  it( 'shows one random char when the given phase is zero', () => {
    const subject = getYugopText( 'abcdef', 0.0 );
    expect( subject.length ).toBe( 1 );
  } );

  it( 'shows a first char of given text and five rest chars when the given phase is 0.5', () => {
    const subject = getYugopText( 'abcdef', 0.5 );
    expect( subject.length ).toBe( 6 );
    expect( subject[ 0 ] ).toBe( 'a' );
  } );

  it( 'shows a string same as the given text when the given phase is one', () => {
    const subject = getYugopText( 'abcdef', 1.0 );
    expect( subject ).toBe( 'abcdef' );
  } );

  it( 'does not show any random string when the randomRatio is zero', () => {
    const subject = getYugopText( 'abcdef', 0.5, 0.0 );
    expect( subject ).toBe( 'abc' );
  } );

  it( 'shows a random string at the very end of the string when the given phase is very close to one', () => {
    const subject = getYugopText( '焼肉定食', 0.9999999 );
    expect( subject.length ).toBe( 4 );
    expect( subject[ 3 ] ).not.toBe( '食' );
  } );
} );
