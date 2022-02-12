/**
 * Iterable FizzBuzz
 */
export declare class FizzBuzz implements Iterable<number | string> {
    static WordsDefault: Map<number, string>;
    private __words;
    private __index;
    private __end;
    constructor(words?: Map<number, string>, index?: number, end?: number);
    [Symbol.iterator](): Iterator<string | number, any, undefined>;
    next(): IteratorResult<number | string>;
}
