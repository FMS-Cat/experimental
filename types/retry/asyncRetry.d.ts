/**
 * Retry given function for n times.
 *
 * See also: {@link retry}
 */
export declare function asyncRetry<T>(func: () => Promise<T>, n: number): Promise<T>;
