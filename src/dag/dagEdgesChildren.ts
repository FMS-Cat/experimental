import { RawDagEdge } from './RawDagEdge';

/**
 * Return all children destinations the specified source has.
 * @param edges An array of dag edge
 * @param source The target source
 *
 * See also: {@link dagEdgesDescendant}
 */
export function dagEdgesChildren<T>( edges: RawDagEdge<T>[], source: T ): T[] {
  return edges
    .filter( ( edge ) => edge[ 0 ] === source )
    .map( ( edge ) => edge[ 1 ] );
}
