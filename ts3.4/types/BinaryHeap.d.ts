export declare class BinaryHeap<T> {
    readonly array: T[];
    readonly elementIndexMap: Map<T, number>;
    comparator: (a: T, b: T) => number;
    static defaultComparator(a: any, b: any): number;
    readonly length: number;
    readonly isEmpty: boolean;
    readonly root: T;
    constructor(init?: T[], comparator?: (a: T, b: T) => number);
    push(...elements: T[]): void;
    pop(): T | null;
    delete(i: number): boolean;
    replace(i: number, rep: T): number | null;
    private __up;
    private __down;
}
