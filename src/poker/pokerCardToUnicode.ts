import { PokerCard } from './PokerCard';
import { PokerRank } from './PokerRank';
import { PokerSuit } from './PokerSuit';

const rankMap: Record<PokerRank, number> = {
  'A': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'T': 10,
  'J': 11,
  'Q': 13,
  'K': 14,
};

const suitMap: Record<PokerSuit, number> = {
  's': 0,
  'h': 16,
  'd': 32,
  'c': 48,
};

export function pokerCardToUnicode( card: PokerCard ): string {
  const rank = card[ 0 ] as PokerRank;
  const suit = card[ 1 ] as PokerSuit;

  return String.fromCodePoint( 0x1f0a0 + rankMap[ rank ] + suitMap[ suit ] );
}
