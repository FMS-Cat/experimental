import { RawDagEdge } from './RawDagEdge';
/**
 * Resolve dag dependency relationship and give you a correct order.
 *
 * @param edges An array of dag edges
 * @param nodes An array of dag nodes
 */
export declare function dagEdgesResolve<T>(edges: RawDagEdge<T>[], nodes: T[]): T[];
