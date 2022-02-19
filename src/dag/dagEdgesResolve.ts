import { RawDagEdge } from './RawDagEdge';
import { dagEdgesParent } from './dagEdgesParent';

/**
 * Resolve dag dependency relationship and give you a correct order.
 *
 * @param edges An array of dag edges
 * @param nodes An array of dag nodes
 */
export function dagEdgesResolve<T>( edges: RawDagEdge<T>[], nodes: T[] ): T[] {
  const order: T[] = [];

  const nodeSet = new Set( nodes );
  let tempEdges = edges.concat();

  while ( tempEdges.length > 0 ) {
    nodeSet.forEach( ( node ) => {
      // is this an entrypoint?
      const hasParents = dagEdgesParent( tempEdges, node ) != null;

      if ( !hasParents ) {
        nodeSet.delete( node );
        order.push( node );

        // delete the structure of tempEdges from entrypoint side
        tempEdges = tempEdges.filter( ( [ src ] ) => ( src !== node ) );
      }
    } );
  }

  return order.concat( Array.from( nodeSet ) );
  //                   ^^^^^^^^^^^^^^^^^^^^^ terminator nodes
}
