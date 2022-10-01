export function arrayRange( start: number, end: number, step?: number ): number[] {
  let current = start;
  const ret: number[] = [];

  if ( start < end ) {
    step = step ?? 1;
    while ( current < end ) {
      ret.push( current );
      current += step;
    }
  } else {
    step = step ?? -1;
    while ( current > end ) {
      ret.push( current );
      current += step;
    }
  }

  return ret;
}

