import { RawDagEdge } from './RawDagEdge';
/**
 * Return first parent source the specified destination has.
 * If it can't find a parent, it will return `null` instead.
 *
 * @param edges An array of dag edge
 * @param destination The target destination
 *
 * See also: {@link dagEdgesParents}
 */
export declare function dagEdgesParent<T>(edges: RawDagEdge<T>[], destination: T): T | null;
