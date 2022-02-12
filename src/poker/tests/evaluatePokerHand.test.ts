import { evaluatePokerHand } from '../evaluatePokerHand';
import type { PokerCard } from '../PokerCard';

describe( 'evaluatePokerHand', () => {
  it( 'handles a high card', () => {
    const cards: PokerCard[] = [ '2h', '5c', '6c', '7s', 'Td', 'Ad', 'Kd' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'HighCard' );
    expect( subject.cards ).toEqual( [ '6c', '7s', 'Td', 'Kd', 'Ad' ] );
    expect( subject.strength ).toEqual( [ 0, 12, 11, 8, 5, 4 ] );
  } );

  it( 'handles a one pair', () => {
    const cards: PokerCard[] = [ '3c', '5d', '8c', '8s', 'Ac', 'Qd', '7h' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'OnePair' );
    expect( subject.cards ).toEqual( [ '7h', '8c', '8s', 'Qd', 'Ac' ] );
    expect( subject.strength ).toEqual( [ 1, 6, 12, 10, 5 ] );
  } );

  it( 'handles a two pair', () => {
    const cards: PokerCard[] = [ '4c', '8d', '7c', '4h', '8h', 'Jc', '2s' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'TwoPair' );
    expect( subject.cards ).toEqual( [ '4c', '4h', '8d', '8h', 'Jc' ] );
    expect( subject.strength ).toEqual( [ 2, 6, 2, 9 ] );
  } );

  it( 'handles a two pair when there are three pairs', () => {
    const cards: PokerCard[] = [ '9c', '9s', '3h', '3c', '7c', '7d', '2d' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'TwoPair' );
    expect( subject.cards ).toEqual( [ '3h', '7c', '7d', '9c', '9s' ] );
    expect( subject.strength ).toEqual( [ 2, 7, 5, 1 ] );
  } );

  it( 'handles a three of a kind', () => {
    const cards: PokerCard[] = [ 'Ah', 'Ad', 'Kc', '7s', '4s', 'Qc', 'As' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'ThreeOfAKind' );
    expect( subject.cards ).toEqual( [ 'Qc', 'Kc', 'Ad', 'Ah', 'As' ] );
    expect( subject.strength ).toEqual( [ 3, 12, 11, 10 ] );
  } );

  it( 'handles a straight', () => {
    const cards: PokerCard[] = [ 'Ah', '9c', 'Kc', 'Qh', 'Ts', '6h', 'Js' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'Straight' );
    expect( subject.cards ).toEqual( [ 'Ts', 'Js', 'Qh', 'Kc', 'Ah' ] );
    expect( subject.strength ).toEqual( [ 4, 12 ] );
  } );

  it( 'handles a steel wheel', () => {
    const cards: PokerCard[] = [ 'Ah', '5c', '4c', '3d', '2d', '8h', 'Qc' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'Straight' );
    expect( subject.cards ).toEqual( [ 'Ah', '2d', '3d', '4c', '5c' ] );
    expect( subject.strength ).toEqual( [ 4, 3 ] );
  } );

  it( 'handles a flush', () => {
    const cards: PokerCard[] = [ '3h', '4d', '6c', '7h', '9h', 'Th', 'Qh' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'Flush' );
    expect( subject.cards ).toEqual( [ '3h', '7h', '9h', 'Th', 'Qh' ] );
    expect( subject.strength ).toEqual( [ 5, 10, 8, 7, 5, 1 ] );
  } );

  it( 'handles a full house', () => {
    const cards: PokerCard[] = [ '9c', '9d', '5s', '5c', 'Jh', '5d', 'Td' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'FullHouse' );
    expect( subject.cards ).toEqual( [ '5c', '5d', '5s', '9c', '9d' ] );
    expect( subject.strength ).toEqual( [ 6, 3, 7 ] );
  } );

  it( 'handles a full house when there are two three of a kind', () => {
    const cards: PokerCard[] = [ '7d', '7s', 'Tc', 'Td', '7h', '9d', 'Th' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'FullHouse' );
    expect( subject.cards ).toEqual( [ '7h', '7s', 'Tc', 'Td', 'Th' ] );
    expect( subject.strength ).toEqual( [ 6, 8, 5 ] );
  } );

  it( 'handles a full house when there are three three of a kind', () => {
    const cards: PokerCard[] = [ '4c', '4d', '4h', '6c', '6d', '6h', '8c', '8d', '8h' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'FullHouse' );
    expect( subject.cards ).toEqual( [ '6d', '6h', '8c', '8d', '8h' ] );
    expect( subject.strength ).toEqual( [ 6, 6, 4 ] );
  } );

  it( 'handles a four of a kind', () => {
    const cards: PokerCard[] = [ '5s', '5c', 'Kd', '6d', '9c', '5d', '5h' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'FourOfAKind' );
    expect( subject.cards ).toEqual( [ '5c', '5d', '5h', '5s', 'Kd' ] );
    expect( subject.strength ).toEqual( [ 7, 3, 11 ] );
  } );

  it( 'handles a four of a kind when there are two four of a kind', () => {
    const cards: PokerCard[] = [ '2s', '2d', '5h', '5s', '2c', '5c', '2h', '5d', '3h' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'FourOfAKind' );
    expect( subject.cards ).toEqual( [ '3h', '5c', '5d', '5h', '5s' ] );
    expect( subject.strength ).toEqual( [ 7, 3, 1 ] );
  } );

  it( 'handles a straight flush', () => {
    const cards: PokerCard[] = [ 'Ts', 'Ks', 'Js', '9s', '5s', '2s', 'Qs' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'StraightFlush' );
    expect( subject.cards ).toEqual( [ '9s', 'Ts', 'Js', 'Qs', 'Ks' ] );
    expect( subject.strength ).toEqual( [ 8, 11 ] );
  } );

  it( 'handles a steel wheel flush', () => {
    const cards: PokerCard[] = [ 'Ah', '5h', '4h', '3h', '2h', '8h', 'Qc' ];
    const subject = evaluatePokerHand( cards );

    expect( subject.hand ).toBe( 'StraightFlush' );
    expect( subject.cards ).toEqual( [ 'Ah', '2h', '3h', '4h', '5h' ] );
    expect( subject.strength ).toEqual( [ 8, 3 ] );
  } );
} );
