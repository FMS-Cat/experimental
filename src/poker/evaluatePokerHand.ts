import { MapOfSet } from '../MapOfSet/MapOfSet';
import { pokerHandStrengthMap } from './pokerHandStrengthMap';
import { pokerRankStrengthMap } from './pokerRankStrengthMap';
import { pokerRanksByStrength } from './pokerRanksByStrength';
import { sortPokerCardsByRank } from './sortPokerCardsByRank';
import type { PokerCard } from './PokerCard';
import type { PokerHand } from './PokerHand';
import type { PokerRank } from './PokerRank';
import type { PokerSuit } from './PokerSuit';

export interface EvaluatePokerHandResult {
  hand: PokerHand;
  strength: number[];
  cards: [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ];
}

export function evaluatePokerHand( cards: PokerCard[] ): EvaluatePokerHandResult {
  // cards mutable edition
  const cards_ = cards.concat();

  const cardsByRank = new MapOfSet<PokerRank, PokerCard>();
  const cardsBySuit = new MapOfSet<PokerSuit, PokerCard>();

  cards_.map( ( card ) => {
    const rank = card[ 0 ] as PokerRank;
    const suit = card[ 1 ] as PokerSuit;
    cardsByRank.add( rank, card );
    cardsBySuit.add( suit, card );
  } );

  // pairs
  const fours: PokerRank[] = [];
  const threes: PokerRank[] = [];
  const twos: PokerRank[] = [];

  pokerRanksByStrength.map( ( rank ) => {
    const cards = cardsByRank.get( rank );
    if ( cards.size > 3 ) {
      fours.push( rank );
    } else if ( cards.size > 2 ) {
      threes.push( rank );
    } else if ( cards.size > 1 ) {
      twos.push( rank );
    }
  } );

  // straight
  let straightCards: PokerCard[] | undefined;
  {
    let current: PokerCard[] = [];

    // handle steel wheel
    const a = Array.from( cardsByRank.get( 'A' ) )[ 0 ];
    if ( a ) {
      current.push( a );
    }

    pokerRanksByStrength.map( ( rank ) => {
      const card = Array.from( cardsByRank.get( rank ) )[ 0 ];
      if ( card ) {
        current.push( card );

        if ( current.length > 4 ) {
          straightCards = current;
        }
      } else {
        current = [];
      }
    } );
  }

  // straight flush
  if ( straightCards ) {
    for ( const [ suit, cardsSet ] of cardsBySuit.map ) {
      if ( cardsSet.size > 0 ) {
        let straightFlushCards: PokerCard[] | undefined;
        let current: PokerCard[] = [];

        // handle steel wheel
        const target = 'A' + suit as PokerCard;
        const a = cardsSet.has( target );
        if ( a ) {
          current.push( target );
        }

        pokerRanksByStrength.map( ( rank ) => {
          const target = rank + suit as PokerCard;
          if ( cardsSet.has( target ) ) {
            current.push( target );

            if ( current.length > 4 ) {
              straightFlushCards = current;
            }
          } else {
            current = [];
          }
        } );

        if ( straightFlushCards ) {
          straightFlushCards.splice( 0, straightFlushCards.length - 5 );

          const hand = 'StraightFlush';
          const strength = [
            pokerHandStrengthMap[ hand ],
            pokerRankStrengthMap[ straightFlushCards[ 4 ][ 0 ] as PokerRank ],
          ];

          return {
            hand,
            cards: straightFlushCards as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
            strength,
          };
        }
      }
    }
  }

  // four of a kind
  if ( fours.length > 0 ) {
    fours.sort( ( a, b ) => pokerRankStrengthMap[ a ] - pokerRankStrengthMap[ b ] );
    fours.splice( 0, fours.length - 1 );

    // 5s, 5c, Kd, 6d, 9c, 5d, 5h

    const sameCards = Array.from( cardsByRank.get( fours[ 0 ] ) );
    sameCards.map( ( card ) => (
      cards_.splice( cards_.indexOf( card ), 1 )
    ) );
    // Kd, 6d, 9c

    sortPokerCardsByRank( cards_ ).splice( 0, cards_.length - 1 );
    // Kd

    const hand = 'FourOfAKind';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ fours[ 0 ] ],
      pokerRankStrengthMap[ cards_[ 0 ][ 0 ] as PokerRank ],
    ];

    cards_.push( ...sameCards );
    sortPokerCardsByRank( cards_ );
    // 5c, 5d, 5h, 5s, Kd

    return {
      hand,
      cards: cards_ as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // full house
  if ( threes.length > 0 && threes.length + twos.length > 1 ) {
    threes.sort( ( a, b ) => pokerRankStrengthMap[ a ] - pokerRankStrengthMap[ b ] );

    // tricky part: it is possible to have two or more threes at once
    // just transfer threes which is not highest
    // and wish we'll do this right in the rest of the code
    twos.push( ...threes.splice( 0, threes.length - 1 ) );

    twos.sort( ( a, b ) => pokerRankStrengthMap[ a ] - pokerRankStrengthMap[ b ] );
    twos.splice( 0, twos.length - 1 );

    // 7d, 7s, Tc, Td, 7h, 9d, Th

    const sameCards = Array.from( cardsByRank.get( threes[ 0 ] ) );
    sameCards.push( ...Array.from( cardsByRank.get( twos[ 0 ] ) ) );
    // sameCards: Tc, Td, Th, 7d, 7s, 7h

    sortPokerCardsByRank( sameCards ).splice( 0, sameCards.length - 5 );
    // sameCards: 7h, 7s, Tc, Td, Th

    const hand = 'FullHouse';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ threes[ 0 ] ],
      pokerRankStrengthMap[ twos[ 0 ] ],
    ];

    return {
      hand,
      cards: sameCards as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // flush
  for ( const [ _suit, cardsSet ] of cardsBySuit.map ) {
    if ( cardsSet.size > 4 ) {
      const cards = sortPokerCardsByRank( Array.from( cardsSet ) );
      cards.splice( 0, cards.length - 5 );

      const hand = 'Flush';
      const strength = [
        pokerHandStrengthMap[ hand ],
        ...cards
          .concat()
          .reverse()
          .map( ( card ) => (
            pokerRankStrengthMap[ card[ 0 ] as PokerRank ]
          ) ),
      ];

      return {
        hand,
        cards: cards as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
        strength,
      };
    }
  }

  // straight
  if ( straightCards ) {
    straightCards.splice( 0, straightCards.length - 5 );

    const hand = 'Straight';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ straightCards[ 4 ][ 0 ] as PokerRank ],
    ];

    return {
      hand,
      cards: straightCards as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // three of a kind
  if ( threes.length > 0 ) {
    threes.sort( ( a, b ) => pokerRankStrengthMap[ a ] - pokerRankStrengthMap[ b ] );
    threes.splice( 0, threes.length - 1 );

    // Ah, Ad, Kc, 7s, 4s, Qc, As

    const sameCards = Array.from( cardsByRank.get( threes[ 0 ] ) );
    sameCards.map( ( card ) => (
      cards_.splice( cards_.indexOf( card ), 1 )
    ) );
    // Kc, 7s, 4s, Qc

    sortPokerCardsByRank( cards_ ).splice( 0, cards_.length - 2 );
    // Qc, Kc

    const hand = 'ThreeOfAKind';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ threes[ 0 ] ],
      pokerRankStrengthMap[ cards_[ 1 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 0 ][ 0 ] as PokerRank ],
    ];

    cards_.push( ...sameCards );
    sortPokerCardsByRank( cards_ );
    // Qc, Kc, Ad, Ah, As

    return {
      hand,
      cards: cards_ as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // two pair
  if ( twos.length > 1 ) {
    twos.sort( ( a, b ) => pokerRankStrengthMap[ a ] - pokerRankStrengthMap[ b ] );
    twos.splice( 0, twos.length - 2 );

    // 4c, 8d, 7h, 4h, 8h, Jc, 2s

    const pairs = Array.from( cardsByRank.get( twos[ 0 ] ) );
    pairs.push( ...Array.from( cardsByRank.get( twos[ 1 ] ) ) );
    pairs.map( ( card ) => (
      cards_.splice( cards_.indexOf( card ), 1 )
    ) );
    // 7h, Jc, 2s

    sortPokerCardsByRank( cards_ ).splice( 0, cards_.length - 1 );
    // Jc

    const hand = 'TwoPair';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ twos[ 1 ] ],
      pokerRankStrengthMap[ twos[ 0 ] ],
      pokerRankStrengthMap[ cards_[ 0 ][ 0 ] as PokerRank ],
    ];

    cards_.push( ...pairs );
    sortPokerCardsByRank( cards_ );
    // 4c, 4h, 8d, 8h, Jc

    return {
      hand,
      cards: cards_ as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // one pair
  if ( twos.length > 0 ) {
    // 3c, 5d, 8c, 8s, Ac, Qd, 7h

    const pair = Array.from( cardsByRank.get( twos[ 0 ] ) );
    pair.map( ( card ) => (
      cards_.splice( cards_.indexOf( card ), 1 )
    ) );
    // 3c, 5d, Ac, Qd, 7h

    sortPokerCardsByRank( cards_ ).splice( 0, cards_.length - 3 );
    // 7h, Qd, Ac

    const hand = 'OnePair';
    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ twos[ 0 ] ],
      pokerRankStrengthMap[ cards_[ 2 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 1 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 0 ][ 0 ] as PokerRank ],
    ];

    cards_.push( ...pair );
    sortPokerCardsByRank( cards_ );
    // 7h, 8c, 8s, Qd, Ac

    return {
      hand,
      cards: cards_ as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }

  // high card
  {
    const hand = 'HighCard';

    // 2h, 5c, 6c, 7s, Td, Ad, Kd

    sortPokerCardsByRank( cards_ );
    // 2h, 5c, 6c, 7s, Td, Kd, Ad

    cards_.splice( 0, cards_.length - 5 );
    // 6c, 7s, Td, Kd, Ad

    const strength = [
      pokerHandStrengthMap[ hand ],
      pokerRankStrengthMap[ cards_[ 4 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 3 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 2 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 1 ][ 0 ] as PokerRank ],
      pokerRankStrengthMap[ cards_[ 0 ][ 0 ] as PokerRank ],
    ];

    return {
      hand,
      cards: cards_ as [ PokerCard, PokerCard, PokerCard, PokerCard, PokerCard ],
      strength,
    };
  }
}
