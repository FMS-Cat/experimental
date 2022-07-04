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
export declare function traverse<TNode>(root: TNode, traverser: (node: TNode) => TNode[] | false): void;
