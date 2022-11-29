import { arraySerial, createPokerDeck, evaluatePokerHand, shuffleArray } from '@0b5vr/experimental';

export default ( { divContainer } ) => {
  const deck = createPokerDeck();
  shuffleArray( deck );

  const myPocket = [ deck.pop(), deck.pop() ];

  let win = 0.0;

  arraySerial( 10000 ).map( () => {
    const deckt = shuffleArray( deck.concat() );

    const opPocket = [ deckt.pop(), deckt.pop() ];
    const community = [ deckt.pop(), deckt.pop(), deckt.pop(), deckt.pop(), deckt.pop() ];

    const myHand = evaluatePokerHand( myPocket.concat( community ) );
    const opHand = evaluatePokerHand( opPocket.concat( community ) );

    const result = myHand.strength.reduce( ( prev, cur, i ) => {
      if ( prev === 0 ) {
        return Math.sign( cur - opHand.strength[ i ] );
      } else {
        return prev;
      }
    }, 0 );

    win += result;
  } );

  const winRatio = 0.5 + 0.5 * win / 10000.0;

  divContainer.textContent = `hand: ${ myPocket.join( ', ' ) }\nwinRatio: ${ ( winRatio * 100.0 ).toFixed( 2 ) } %`;
};
