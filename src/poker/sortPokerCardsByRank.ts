import { pokerRankStrengthMap } from './pokerRankStrengthMap';
import { pokerSuitIndexMap } from './pokerSuitIndexMap';
import type { PokerCard } from './PokerCard';
import type { PokerRank } from './PokerRank';
import type { PokerSuit } from './PokerSuit';

/**
 * Sort given array of cards in place by rank (and suit).
 */
export function sortPokerCardsByRank( cards: PokerCard[] ): PokerCard[] {
  return cards
    .sort( ( a, b ) => (
      pokerSuitIndexMap[ a[ 1 ] as PokerSuit ] - pokerSuitIndexMap[ b[ 1 ] as PokerSuit ]
    ) )
    .sort( ( a, b ) => (
      pokerRankStrengthMap[ a[ 0 ] as PokerRank ] - pokerRankStrengthMap[ b[ 0 ] as PokerRank ]
    ) );
}
