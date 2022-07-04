import { RawDagEdge } from './RawDagEdge';
/**
 * Return all parent sources the specified destination has.
 * @param edges An array of dag edge
 * @param destination The target destination
 *
 * See also: {@link dagEdgesChildren}
 */
export declare function dagEdgesParents<T>(edges: RawDagEdge<T>[], destination: T): T[];
