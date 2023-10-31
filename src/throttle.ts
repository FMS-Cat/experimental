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
export function throttle(
  func: () => void,
  rateMs: number,
): () => void {
  let waiting = false;
  let lastTime = -Infinity;

  return () => {
    const now = Date.now();
    const untilNext = Math.max( 0, lastTime + rateMs - now );

    if ( !waiting ) {
      setTimeout( () => {
        lastTime = Date.now();
        func();
        waiting = false;
      }, untilNext );
      waiting = true;
    }
  };
}
