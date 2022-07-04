import { RawDagEdge } from './RawDagEdge';
/**
 * Return all descendant destinations the specified source has.
 * @param edges An array of dag edge
 * @param source The target source
 *
 * See also: {@link dagEdgesChildren}
 */
export declare function dagEdgesDescendants<T>(edges: RawDagEdge<T>[], source: T): T[];
