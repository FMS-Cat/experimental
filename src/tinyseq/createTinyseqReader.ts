import { arraySerial } from '../array';

/**
 * Parse a tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export function createTinyseqReader(
  buffer: Uint8Array,
  options: {
    blockSize?: number,
    sampleRate?: number,
    stepsPerSecond?: number,
  } = {},
): () => Float32Array {
  const blockSize = options.blockSize ?? 128;
  const sampleRate = options.sampleRate ?? 48000;
  const stepsPerSecond = options.stepsPerSecond ?? 960.0;

  let samples = 0;
  let pos = 0;
  let note: number;
  let noteTime = -Infinity;
  let noteOffTime = -Infinity;
  let nextStep = 0;

  return () => {
    return new Float32Array( arraySerial( blockSize ).map( () => {
      const t = samples / sampleRate;
      const s = t * stepsPerSecond;

      if ( s >= nextStep ) {
        const eventNote = buffer[ pos ];
        const eventDeltaStep = buffer[ pos + 1 ];

        note = ( ( pos === 0 ? 60 : note ) + eventNote ) & 127;
        if ( eventNote & 128 ) {
          if ( noteOffTime < noteTime ) {
            noteOffTime = t;
          }
        } else {
          if ( noteOffTime >= noteTime ) {
            noteTime = t;
          }
        }

        nextStep += eventDeltaStep;

        pos = ( pos + 2 ) % buffer.length;
      }

      samples ++;

      return [
        t - noteTime, // time
        noteOffTime < noteTime ? 0.0 : t - noteOffTime, // offTime
        note, // note
        0.0, // reserved
      ];
    } ).flat() );
  };
}
