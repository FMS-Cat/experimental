import { pokerRanksByStrength } from './pokerRanksByStrength';
import { pokerSuitsByIndex } from './pokerSuitsByIndex';
import type { PokerCard } from './PokerCard';

/**
 * Create a 52-card deck.
 * You might want to use {@link shuffleArray} to shuffle the deck.
 */
export function createPokerDeck(): PokerCard[] {
  const array: PokerCard[] = [];

  pokerSuitsByIndex.map( ( suit ) => (
    pokerRanksByStrength.map( ( rank ) => (
      array.push( rank + suit as PokerCard )
    ) )
  ) );

  return array;
}
