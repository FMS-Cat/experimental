import type { PokerCard } from './PokerCard';
import type { PokerHand } from './PokerHand';
export interface EvaluatePokerHandResult {
    hand: PokerHand;
    strength: number[];
    cards: [PokerCard, PokerCard, PokerCard, PokerCard, PokerCard];
}
export declare function evaluatePokerHand(cards: PokerCard[]): EvaluatePokerHandResult;
