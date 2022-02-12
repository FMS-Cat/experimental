import { HistoryPercentileCalculator } from './HistoryPercentileCalculator';
/**
 * @deprecated It's actually just a special case of {@link HistoryPercentileCalculator}
 */
export declare class HistoryMedianCalculator extends HistoryPercentileCalculator {
    constructor(length: number);
}
