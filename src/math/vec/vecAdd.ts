/**
 * Return a sum of vectors.
 */
export function vecAdd<T extends number[]>( ...vecs: T[] ): T {
  if ( vecs.length < 2 ) {
    return vecs[ 0 ];
  }

  const a = vecs.shift()!;
  const b = vecAdd( ...vecs );

  return a.map( ( v, i ) => v + b[ i ] ) as T;
}
