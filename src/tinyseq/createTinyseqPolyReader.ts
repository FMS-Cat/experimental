import { arraySerial } from '../array';

const SPS = 48;
const SAMPLE_RATE = 48000;

/**
 * Parse a polyphonic tinyseq buffer.
 *
 * Returns [ time, offTime, note, reserved, time, offTime, note, reserved, ... ]
 */
export function createTinyseqPolyReader( buffer: Uint8Array, poly: number ): () => Float32Array[] {
  let samples = 0;
  let pos = 0;
  let note: number;
  const notes = arraySerial( poly ).fill( -1 );
  const notesTime = arraySerial( poly ).fill( -Infinity );
  const notesOffTime = arraySerial( poly ).fill( -Infinity );
  let nextStep = 0;

  return ( size = 128 ) => {
    const ret = arraySerial( poly ).map( () => new Float32Array( 4 * size ) );

    arraySerial( size ).map( ( iSample ) => {
      const t = samples / SAMPLE_RATE;
      const s = t * SPS;

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
          notesTime[ iPoly ] = t;
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
