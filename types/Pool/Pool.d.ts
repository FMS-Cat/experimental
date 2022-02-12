export declare class Pool<T> {
    array: T[];
    index: number;
    get current(): T;
    constructor(array: T[]);
    next(): T;
}
