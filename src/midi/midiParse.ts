import { MidiParseResult, MidiParseResultHeader, MidiParseResultTrack } from './MidiParseResult';
import { arraySerial } from '../array/arraySerial';

function readU8( array: Uint8Array, headBox: [ number ] ): number {
  return array[ headBox[ 0 ] ++ ];
}

/**
 * Big endian
 */
function readU16( array: Uint8Array, headBox: [ number ] ): number {
  return readU8( array, headBox ) * 256 + readU8( array, headBox );
}

/**
 * Big endian
 */
function readU32( array: Uint8Array, headBox: [ number ] ): number {
  return readU16( array, headBox ) * 65536 + readU16( array, headBox );
}

function readUVar( array: Uint8Array, headBox: [ number ] ): number {
  let v = 0;
  for ( ;; ) {
    const vv = readU8( array, headBox );
    v = v * 128 + ( vv & 127 );

    if ( vv < 128 ) {
      return v;
    }
  }
}

function parseHeader( array: Uint8Array, headBox: [ number ] ): MidiParseResultHeader {
  // skip type and length (4+4)
  // length has to be 6, there's no need to parse
  headBox[ 0 ] += 8;

  return [
    readU16( array, headBox ),
    readU16( array, headBox ),
    readU16( array, headBox ),
  ];
}

function parseTrack( array: Uint8Array, headBox: [ number ] ): MidiParseResultTrack {
  // skip type (4)
  headBox[ 0 ] += 4;

  const endOfTrack = headBox[ 0 ] + readU32( array, headBox ) + 4;

  const track: MidiParseResultTrack = [];
  let type = 0;

  while ( headBox[ 0 ] < endOfTrack ) {
    const delta = readUVar( array, headBox );
    const status = readU8( array, headBox );
    type = status < 128 ? type : status;
    const data0 = status < 128 ? status : readU8( array, headBox );

    if ( type < 0xc0 ) {
      // note on (9x), note off (8x), polyphonic key pressure (Ax), control change (Bx)

      track.push( [
        delta,
        type,
        data0, // note or cc number
        readU8( array, headBox ), // velocity, pressure, or data
      ] );
    } else if ( type === 0xff ) {
      // meta events

      const eventLength = readU8( array, headBox );

      track.push( [
        delta,
        type,
        data0,
        arraySerial( eventLength ).map( () => readU8( array, headBox ) ),
      ] );

      if ( data0 === 0x2f ) { // end of track
        break;
      }
    } else {
      throw new Error( `${ type }` );
    }
  }

  return track;
}

export function midiParse( buffer: ArrayBuffer ): MidiParseResult {
  const array = new Uint8Array( buffer );
  const headBox: [ number ] = [ 0 ];

  const header = parseHeader( array, headBox );
  const tracks: MidiParseResultTrack[] = [];

  while ( headBox[ 0 ] < array.length ) {
    tracks.push( parseTrack( array, headBox ) );
  }

  return [ header, tracks ];
}
