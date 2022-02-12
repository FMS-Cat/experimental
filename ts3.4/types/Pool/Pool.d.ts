export declare class Pool<T> {
    array: T[];
    index: number;
    readonly current: T;
    constructor(array: T[]);
    next(): T;
}
