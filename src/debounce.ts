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
export function debounce(
  func: () => void,
  timeoutMs: number,
): () => void {
  let id: ReturnType<typeof setTimeout> | null | undefined;

  return () => {
    if ( id ) {
      clearTimeout( id );
    }

    id = setTimeout( () => {
      func();
      id = null;
    }, timeoutMs );
  };
}
