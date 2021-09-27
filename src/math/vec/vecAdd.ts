/**
 * Return a sum of vectors.
 */
export function vecAdd( ...vecs: number[][] ): number[] {
  if ( vecs.length < 2 ) {
    return vecs[ 0 ];
  }

  const a = vecs.shift()!;
  const b = vecAdd( ...vecs );

  return a.map( ( v, i ) => v + b[ i ] );
}
