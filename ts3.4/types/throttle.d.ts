/**
 * Make the given function a throttled one.
 *
 * @example
 * ```ts
 * const func = throttle( 100, () => {
 *   // some expensive procedure
 * } );
 *
 * func();
 * func();
 * func();
 * ```
 */
export declare function throttle(func: () => void, rateMs: number): () => void;
