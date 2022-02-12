import { PokerHand } from './PokerHand';

export const pokerHandStrengthMap: { [ hand in PokerHand ]: number } = {
  'HighCard': 0,
  'OnePair': 1,
  'TwoPair': 2,
  'ThreeOfAKind': 3,
  'Straight': 4,
  'Flush': 5,
  'FullHouse': 6,
  'FourOfAKind': 7,
  'StraightFlush': 8,
};
