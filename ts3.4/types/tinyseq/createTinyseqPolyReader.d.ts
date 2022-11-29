/**
 * Parse a polyphonic tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export declare function createTinyseqPolyReader(buffer: Uint8Array, options?: {
    poly?: number;
    blockSize?: number;
    sampleRate?: number;
    stepsPerSecond?: number;
}): () => Float32Array[];
