/**
 * Retry given function for n times.
 *
 * See also: {@link retry}
 */
export async function asyncRetry<T>( func: () => Promise<T>, n: number ): Promise<T> {
  return await func().catch( ( error ) => {
    if ( n <= 1 ) {
      throw error;
    }

    return asyncRetry( func, n - 1 );
  } );
}
