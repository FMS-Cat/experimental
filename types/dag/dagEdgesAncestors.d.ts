import type { RawDagEdge } from './RawDagEdge';
/**
 * Return all ancestor sources the specified destination has.
 * @param edges An array of dag edge
 * @param destination The target destination
 *
 * See also: {@link dagEdgesChildren}
 */
export declare function dagEdgesAncestors<T>(edges: RawDagEdge<T>[], destination: T): T[];
