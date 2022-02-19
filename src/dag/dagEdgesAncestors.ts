import { dagEdgesParents } from './dagEdgesParents';
import { traverse } from '../algorithm/traverse';
import type { RawDagEdge } from './RawDagEdge';

/**
 * Return all ancestor sources the specified destination has.
 * @param edges An array of dag edge
 * @param destination The target destination
 *
 * See also: {@link dagEdgesChildren}
 */
export function dagEdgesAncestors<T>( edges: RawDagEdge<T>[], destination: T ): T[] {
  const ancestors = new Set<T>();

  traverse( destination, ( node ) => {
    const parents = dagEdgesParents( edges, node );
    parents.map( ( parent ) => ancestors.add( parent ) );
    return parents;
  } );

  return Array.from( ancestors );
}
