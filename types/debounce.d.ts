/**
 * Make the given function a debounced one.
 *
 * @example
 * ```ts
 * const func = debounce( 100, () => {
 *   // some expensive procedure
 * } );
 *
 * func();
 * func();
 * func();
 * ```
 */
export declare function debounce(func: () => void, timeoutMs: number): () => void;
