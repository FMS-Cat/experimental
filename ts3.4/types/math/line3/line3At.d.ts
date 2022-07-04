import { RawLine3 } from './RawLine3';
import { RawVector3 } from '../vec3/RawVector3';
/**
 * Return a vector that represents a certain point of given line.
 * Same as start at t = 0, same as end at t = 1.
 *
 * @param line A line
 * @param t A parameter t
 */
export declare function line3At(line: RawLine3, t: number): RawVector3;
