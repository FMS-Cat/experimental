import { MidiParseResult } from '../midi';
/**
 * Convert the parsed midi result to a tinyseq binary.
 *
 * See: {@link midiParse}
 *
 * @param midi The parsed midi result
 * @param track The index of the midi track you want to convert
 * @param tickMultiplier Multiply this value to tick
 * @returns A tinyseq binary
 */
export declare function tinyseqFromMidiParseResult(midi: MidiParseResult, { track, tickMultiplier }?: {
    track?: number;
    tickMultiplier?: number;
}): Uint8Array;
