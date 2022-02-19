/**
 * Generic traverse function.
 *
 * It performs Depth-First Search.
 *
 * The `traverser` function will be executed for each descendants.
 * You need to return their "children" in an array.
 * If you want to stop the traversal, return `false` instead.
 *
 * @example
 * ```js
 * // replicate Three.js traverse for no reason
 * const meshes = [];
 * traverse( object3DRoot, ( object ) => {
 *   if ( object.isMesh ) {
 *     meshes.push( object );
 *   }
 *   return object3DRoot.children;
 * } );
 * ```
 *
 * @param root The "root" node
 * @param traverser The traverse function. If the node has "children" return them in an array.
 */
export function traverse<TNode>(
  root: TNode,
  traverser: ( node: TNode ) => TNode[] | false,
): void {
  const nodesNeedProcess: TNode[] = [ root ];
  const nodesSeen = new Set<TNode>( nodesNeedProcess );

  while ( nodesNeedProcess.length > 0 ) {
    const currentNode = nodesNeedProcess.shift()!;

    const children = traverser( currentNode );

    if ( !children ) {
      break;
    }

    const nodesFound = children.filter( ( node ) => !nodesSeen.has( node ) );
    nodesNeedProcess.unshift( ...nodesFound );
    nodesFound.map( ( node ) => nodesSeen.add( node ) );
  }
}
