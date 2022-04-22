import { STNICCCFrame } from './STNICCCFrame';

/**
 * Ref: http://arsantica-online.com/st-niccc-competition/
 *
 * @param buffer The input ST-NICCC data
 */
export function parseSTNICCC( buffer: ArrayBuffer ): STNICCCFrame[] {
  const frames: STNICCCFrame[] = [];

  const array = new Uint8Array( buffer );

  const palette = new Uint16Array( 16 );

  let head = 0;

  // when poly-descriptor says 0xfe
  let shouldSkip = false;

  // when poly-descriptor says 0xfd
  let shouldEnd = false;

  // > Every frame stores the following data:
  for ( ;; ) {
    // > 1 byte Flags Bit 0: Frame needs to clear the screen.
    // > Bit 1: Frame contains palette data.
    // > Bit 2: Frame is stored in indexed mode.
    const flags = array[ head ++ ];
    const needsClear = ( flags & 1 ) === 1;
    const hasPalette = ( flags >> 1 & 1 ) === 1;
    const indexedMode = ( flags >> 2 & 1 ) === 1;

    // > If frame contains palette data
    if ( hasPalette ) {
      // > 1 word Bitmask
      const bitmask = array[ head ++ ] << 8 | array[ head ++ ];

      // > For every set bit in the Bitmask (0-15)
      for ( let i = 0; i < 16; i ++ ) {
        if ( bitmask >> ( 15 - i ) & 1 ) {
          // > 1 word Color The color has to be copied into the palette at the reverse index of the actual bit,
          // > because the bitmask is stored in reverse order.
          // > In other words: If bit 15 of mask is set -> update color 0 of palette,
          // > …
          // > if bit 0 of mask is set -> update color 15 of palette.

          palette[ i ] = array[ head ++ ] << 8 | array[ head ++ ];
        }
      }
    }

    // > If frame is stored in indexed mode
    if ( indexedMode ) {
      // > 1 byte Number of vertices (0-255)
      const nVertices = array[ head ++ ];

      // > For every Vertex
      // > {
      // > 1 byte X-position
      // > 1 byte Y-position
      // > }
      const vertices = array.subarray( head, head + 2 * nVertices );
      head += 2 * nVertices;

      const polygons: { colorIndex: number; indices: number[] }[] = [];

      // > While (…)
      for ( ;; ) {
        // > 1 byte Poly-descriptor Contains: hi-nibble - 4 bits color-index
        // > lo-nibble - 4 bits number of polygon vertices
        // >
        // > Some special cases are encoded in the descriptor byte:
        // > $ff = End of frame
        // > $fe = End of frame and the stream skips to the next 64KB block
        // > $fd = End of stream (we are done \o/)
        const descriptor = array[ head ++ ];

        if ( descriptor === 0xff ) { // end of frame
          break;

        } else if ( descriptor === 0xfe ) { // end of frame + skip to the next 64KB
          shouldSkip = true;
          break;

        } else if ( descriptor === 0xfd ) { // end of stream
          shouldEnd = true;
          break;

        }

        const colorIndex = descriptor >> 4 & 15;
        const nIndices = descriptor & 15;

        // > For every vertex of the polygon
        // > {
        // > 1 byte Vertex-id (0-255)
        // > }
        const indices = array.subarray( head, head + nIndices );
        head += nIndices;

        polygons.push( {
          colorIndex,
          indices: Array.from( indices ),
        } );
      }

      frames.push( {
        needsClear,
        indexedMode,
        palette: Array.from( palette ),
        vertices: Array.from( vertices ),
        polygons,
      } );

    // > Else if frame is stored in non-indexed mode
    } else {
      const polygons: { colorIndex: number; vertices: number[] }[] = [];

      // > While (…)
      for ( ;; ) {
        // > 1 byte Poly-descriptor (See indexed mode)
        const descriptor = array[ head ++ ];

        if ( descriptor === 0xff ) { // end of frame
          break;

        } else if ( descriptor === 0xfe ) { // end of frame + skip to the next 64KB
          shouldSkip = true;
          break;

        } else if ( descriptor === 0xfd ) { // end of stream
          shouldEnd = true;
          break;

        }

        const colorIndex = descriptor >> 4 & 15;
        const nVertices = descriptor & 15;

        // > For every vertex of the polygon
        // > {
        // > 1 byte Vertex-id (0-255)
        // > }
        const vertices = array.subarray( head, head + 2 * nVertices );
        head += 2 * nVertices;

        polygons.push( {
          colorIndex,
          vertices: Array.from( vertices ),
        } );
      }

      frames.push( {
        needsClear,
        indexedMode,
        palette: Array.from( palette ),
        polygons,
      } );
    }

    if ( shouldSkip ) {
      head = ( Math.floor( head / 0x10000 ) + 1 ) * 0x10000;
      shouldSkip = false;
    }

    if ( shouldEnd ) {
      break;
    }
  }

  return frames;
}
