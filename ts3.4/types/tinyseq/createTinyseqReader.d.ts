/**
 * Parse a tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export declare function createTinyseqReader(buffer: Uint8Array, options?: {
    blockSize?: number;
    sampleRate?: number;
    stepsPerSecond?: number;
}): () => Float32Array;
