/**
 * Retry given function for n times.
 *
 * See also: {@link asyncRetry}
 */
export declare function retry<T>(func: () => T, n: number): T;
