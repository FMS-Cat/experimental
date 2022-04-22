import { STNICCCFrame } from './STNICCCFrame';
import { colorFromAtariST } from '../color/colorFromAtariST';
import { colorToHex } from '../color/colorToHex';

export function stnicccToSVG( frames: STNICCCFrame[], options: {
  fps?: number;
} = {} ): string {
  const delta = 1.0 / ( options?.fps ?? 30.0 );

  let svg = '<svg width="256" height="200" viewBox="0 0 256 200" xmlns="http://www.w3.org/2000/svg">';

  let style = `g{visibility:hidden;animation-duration:${ ( delta * frames.length ).toFixed( 3 ) }s;animation-iteration-count:infinite;animation-name:frame}@keyframes frame{0%{visibility:visible}${ 200.0 / frames.length }%{visibility:hidden}}`;

  frames.map( ( frame, iFrame ) => {
    const { indexedMode, palette, polygons } = frame;

    style += `#f${ iFrame }{animation-delay:${ ( delta * iFrame ).toFixed( 3 ) }s}`;

    const paletteInHex = palette.map( ( stColor ) => {
      const color = colorFromAtariST( stColor );
      return colorToHex( color );
    } );

    let childrenStr = '<rect width="256" height="200" fill="#000" />';

    let currentColorIndex = -1;
    let d = '';

    if ( indexedMode ) {
      const { vertices } = frame;

      polygons.map( ( { colorIndex, indices } ) => {
        if ( currentColorIndex !== colorIndex ) {
          if ( currentColorIndex !== -1 ) {
            const colorHex = paletteInHex[ currentColorIndex ];
            childrenStr += `<path d="${ d }" fill="${ colorHex }" />`;
          }

          currentColorIndex = colorIndex;
          d = '';
        }

        for ( let i = 0; i < indices.length; i ++ ) {
          const index = indices[ i ];
          const x = vertices[ 2 * index ];
          const y = vertices[ 2 * index + 1 ];

          d += i === 0
            ? `M${ x },${ y }`
            : `L${ x },${ y }`;
        }
      } );
    } else {
      polygons.map( ( { colorIndex, vertices } ) => {
        if ( currentColorIndex !== colorIndex ) {
          if ( currentColorIndex !== -1 ) {
            const colorHex = paletteInHex[ currentColorIndex ];
            childrenStr += `<path d="${ d }" fill="${ colorHex }" />`;
          }

          currentColorIndex = colorIndex;
          d = '';
        }

        for ( let i = 0; i < vertices.length; i += 2 ) {
          const x = vertices[ i ];
          const y = vertices[ i + 1 ];

          d += i === 0
            ? `M${ x },${ y }`
            : `L${ x },${ y }`;
        }
      } );
    }

    const colorHex = paletteInHex[ currentColorIndex ];
    childrenStr += `<path d="${ d }" fill="${ colorHex }" />`;

    svg += `<g id="f${ iFrame }">${ childrenStr }</g>`;
  } );

  svg += `<style>${style}</style></svg>`;

  return svg;
}
