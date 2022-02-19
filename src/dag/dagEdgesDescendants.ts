import { dagEdgesChildren } from './dagEdgesChildren';
import { traverse } from '../algorithm/traverse';
import type { RawDagEdge } from './RawDagEdge';

/**
 * Return all descendant destinations the specified source has.
 * @param edges An array of dag edge
 * @param source The target source
 *
 * See also: {@link dagEdgesChildren}
 */
export function dagEdgesDescendants<T>( edges: RawDagEdge<T>[], source: T ): T[] {
  const descendants = new Set<T>();

  traverse( source, ( node ) => {
    const children = dagEdgesChildren( edges, node );
    children.map( ( child ) => descendants.add( child ) );
    return children;
  } );

  return Array.from( descendants );
}
