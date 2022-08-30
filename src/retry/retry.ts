/**
 * Retry given function for n times.
 *
 * See also: {@link asyncRetry}
 */
export function retry<T>( func: () => T, n: number ): T {
  try {
    return func();
  } catch ( error ) {
    if ( n <= 1 ) {
      throw error;
    }

    return retry( func, n - 1 );
  }
}
