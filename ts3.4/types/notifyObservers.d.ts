/**
 * A bare function to notify observers.
 * The incredibly cheap implementation of the observer pattern.
 *
 * @example
 * ```ts
 * ```
 *
 * @param observers The iterator of observers
 * @param param The param you want to give to observers
 */
export declare function notifyObservers(observers: Iterable<() => void>): void;
export declare function notifyObservers<T>(observers: Iterable<(arg: T) => void>, param: T): void;
