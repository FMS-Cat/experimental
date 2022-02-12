/**
 * Return a product of vectors.
 */
export function vecMultiply<T extends number[]>( ...vecs: T[] ): T {
  if ( vecs.length < 2 ) {
    return vecs[ 0 ];
  }

  const a = vecs.shift()!;
  const b = vecMultiply( ...vecs );

  return a.map( ( v, i ) => v + b[ i ] ) as T;
}
