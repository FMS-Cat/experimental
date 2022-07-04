import { STNICCCFrame } from './STNICCCFrame';
/**
 * Ref: http://arsantica-online.com/st-niccc-competition/
 *
 * @param buffer The input ST-NICCC data
 */
export declare function parseSTNICCC(buffer: ArrayBuffer): STNICCCFrame[];
