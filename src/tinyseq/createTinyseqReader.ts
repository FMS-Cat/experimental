const SPS = 48;
const BLOCK_SIZE = 128;
const SAMPLE_RATE = 48000;

/**
 * -  12: 12 delta step
 * -   0: ON  0 delta note (60)
 * -  12: 12 delta step
 * - 128: OFF 0 delta note (60)
 * -  12: 12 delta step
 * - 127: ON -1 delta note (59)
 * -  12: 12 delta step
 * - 128: OFF 0 delta note (59)
 * - (END)
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export function createTinyseqReader( buffer: Uint8Array ): () => Float32Array {
  let samples = 0;
  let pos = 0;
  let note = 60;
  let noteTime = -Infinity;
  let noteOffTime = -Infinity;
  let lastStep = 0;

  return () => {
    return new Float32Array( [ ...Array( BLOCK_SIZE ) ].map( () => {
      const t = samples / SAMPLE_RATE;
      const s = t * SPS - lastStep;

      const eventDeltaStep = buffer[ pos ];
      const eventNote = buffer[ pos + 1 ];

      if ( s >= eventDeltaStep ) {
        note = ( note + eventNote ) & 127;
        if ( eventNote & 128 ) {
          if ( noteOffTime < noteTime ) {
            noteOffTime = t;
          }
        } else {
          noteTime = t;
        }

        pos = ( pos + 2 ) % buffer.length;
        lastStep += eventDeltaStep;
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
