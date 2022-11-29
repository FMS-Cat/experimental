import { arraySerial } from '../array';

/**
 * Parse a polyphonic tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export function createTinyseqPolyReader(
  buffer: Uint8Array,
  options: {
    poly?: number,
    blockSize?: number,
    sampleRate?: number,
    stepsPerSecond?: number,
  } = {},
): () => Float32Array[] {
  const poly = options.poly ?? 8;
  const blockSize = options.blockSize ?? 128;
  const sampleRate = options.sampleRate ?? 48000;
  const stepsPerSecond = options.stepsPerSecond ?? 1.0;

  let samples = 0;
  let pos = 0;
  let note: number;
  const notes = arraySerial( poly ).fill( -1 );
  const notesTime = arraySerial( poly ).fill( -Infinity );
  const notesOffTime = arraySerial( poly ).fill( -Infinity );
  let nextStep = 0;

  return () => {
    const ret = arraySerial( poly ).map( () => new Float32Array( 4 * blockSize ) );

    arraySerial( blockSize ).map( ( iSample ) => {
      const t = samples / sampleRate;
      const s = t * stepsPerSecond;

      if ( s >= nextStep ) {
        const eventNote = buffer[ pos ];
        const eventDeltaStep = buffer[ pos + 1 ];

        note = ( ( pos === 0 ? 60 : note ) + eventNote ) & 127;

        // find same note
        let iPoly = notes.indexOf( note );

        // find earliest note off
        let tEarliest = Infinity;

        if ( iPoly === -1 ) {
          notesTime.map( ( tOn, jPoly ) => {
            const tOff = notesOffTime[ jPoly ];
            if ( tOn <= tOff ) {
              if ( tOff < tEarliest ) {
                iPoly = jPoly;
                tEarliest = tOff;
              }
            }
          } );
        }

        // find earliest note on
        if ( iPoly === -1 ) {
          notesTime.map( ( tOn, jPoly ) => {
            if ( tOn < tEarliest ) {
              iPoly = jPoly;
              tEarliest = tOn;
            }
          } );
        }

        notes[ iPoly ] = note;

        if ( eventNote & 128 ) {
          if ( notesOffTime[ iPoly ] < notesTime[ iPoly ] ) {
            notesOffTime[ iPoly ] = t;
          }
        } else {
          if ( notesOffTime[ iPoly ] >= notesTime[ iPoly ] ) {
            notesTime[ iPoly ] = t;
          }
        }

        nextStep += eventDeltaStep;

        pos = ( pos + 2 ) % buffer.length;
      }

      samples ++;

      arraySerial( poly ).map( ( iPoly ) => {
        const noteTime = notesTime[ iPoly ];
        const noteOffTime = notesOffTime[ iPoly ];

        ret[ iPoly ][ 4 * iSample + 0 ] = t - noteTime; // time
        ret[ iPoly ][ 4 * iSample + 1 ] = noteOffTime < noteTime ? 0.0 : t - noteOffTime; // offTime
        ret[ iPoly ][ 4 * iSample + 2 ] = notes[ iPoly ]; // note
        ret[ iPoly ][ 4 * iSample + 3 ] = 0.0; // reserved
      } );
    } );

    return ret;
  };
}
