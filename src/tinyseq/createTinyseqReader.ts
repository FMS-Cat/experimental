import { arraySerial } from '../array';

const SPS = 48;
const SAMPLE_RATE = 48000;

/**
 * Parse a tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export function createTinyseqReader( buffer: Uint8Array ): () => Float32Array {
  let samples = 0;
  let pos = 0;
  let note: number;
  let noteTime = -Infinity;
  let noteOffTime = -Infinity;
  let nextStep = 0;

  return ( size = 128 ) => {
    return new Float32Array( arraySerial( size ).map( () => {
      const t = samples / SAMPLE_RATE;
      const s = t * SPS;

      if ( s >= nextStep ) {
        const eventNote = buffer[ pos ];
        const eventDeltaStep = buffer[ pos + 1 ];

        note = ( ( pos === 0 ? 60 : note ) + eventNote ) & 127;
        if ( eventNote & 128 ) {
          if ( noteOffTime < noteTime ) {
            noteOffTime = t;
          }
        } else {
          noteTime = t;
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
