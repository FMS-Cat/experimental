import { pokerCardToUnicode } from '../pokerCardToUnicode';

describe( 'pokerCardToUnicode', () => {
  it( 'handles 2c', () => {
    const subject = pokerCardToUnicode( '2c' );

    expect( subject ).toBe( '🃒' );
  } );

  it( 'handles Th', () => {
    const subject = pokerCardToUnicode( 'Th' );

    expect( subject ).toBe( '🂺' );
  } );

  it( 'handles As', () => {
    const subject = pokerCardToUnicode( 'As' );

    expect( subject ).toBe( '🂡' );
  } );

  it( 'handles Kd', () => {
    const subject = pokerCardToUnicode( 'Kd' );

    expect( subject ).toBe( '🃎' );
  } );
} );
