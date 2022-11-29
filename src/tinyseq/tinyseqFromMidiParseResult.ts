import { MidiParseResult } from '../midi';
import { arraySerial } from '../array';

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
export function tinyseqFromMidiParseResult(
  midi: MidiParseResult,
  { track, tickMultiplier }: {
    track?: number,
    tickMultiplier?: number,
  } = {},
): Uint8Array {
  const data: number[] = [];
  let lastNote = 60;
  let delta = 0;

  const trackEvents = midi[ 1 ][ track ?? 0.0 ];

  // [ delta, midi event, note, vel ][] -> [ onoff (0 or 128) + deltaNote, delta, ... ]
  // [ [ 4, 144, 60, 100 ], [ 4, 128, 60, 100 ] ] -> [ 128, 4, 0, 4, 128, 0 ]

  arraySerial( trackEvents.length + 1 ).map( ( i ) => {
    delta += ( trackEvents[ i ]?.[ 0 ] ?? 0 ) * ( tickMultiplier ?? 1.0 );

    if ( delta === 0 && i === 0 ) { return; } // ignore if it's the first event and delta is 0

    const evMsg = trackEvents[ i - 1 ]?.[ 1 ] ?? 128;
    const evNote = trackEvents[ i - 1 ]?.[ 2 ] ?? 60;

    if ( evMsg >= 160 ) { return; } // ignore if the msg is not a note event

    const noteDelta = ( evNote - lastNote + 128 ) & 127;
    lastNote = evNote;
    const onoff = evMsg < 144 ? 128 : 0; // 0 if on (144 - 159), 128 if off (128 - 143)

    // probably 240 is more efficient than 256 since the division in most of midi files are 480 or 960
    let deltaConsume = Math.floor( Math.min( delta, 240 ) );
    data.push( noteDelta + onoff, deltaConsume );
    delta -= deltaConsume;

    while ( delta >= 1 ) {
      deltaConsume = Math.floor( Math.min( delta, 240 ) );
      data.push( onoff, deltaConsume );
      delta -= deltaConsume;
    }
  } );

  return new Uint8Array( data );
}
