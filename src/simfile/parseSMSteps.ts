import { SM_ROWS_PER_MEASURE } from './constants';
import { stepsTypeColumnsMap } from './stepsTypeColumnsMap';
import { trimLineComments } from '../string/trimLineComments';
import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMNoteHold } from './SMNote';
import type { SMSteps } from './SMSteps';
import type { SMStepsType } from './SMStepsType';

export function parseSMSteps( params: string[] ): SMSteps {
  const stepsType = params[ 0 ].trim() as SMStepsType;
  const description = params[ 1 ].trim();
  const difficulty = params[ 2 ].trim() as SMDifficulty;
  const meter = parseInt( params[ 3 ].trim(), 10 );
  const radarValues = params[ 4 ].trim().split( ',' ).map( ( v ) => parseFloat( v ) ) as [ number, number, number, number, number ];

  const numColumns = stepsTypeColumnsMap[ stepsType ];
  if ( numColumns == null ) {
    throw new Error( `Unknown stepsType "${ stepsType }"` );
  }

  const noteData: SMNoteData = [ ...Array( numColumns ) ].map( () => ( {} ) );

  const noteParam = trimLineComments( params[ 5 ].replace( '\r\n', '\n' ) );
  const noteMeasures = noteParam.split( ',' );

  const ongoingHoldIndexByColumn: { [ row: number ]: number } = {};

  noteMeasures.map( ( measure, iMeasure ) => {
    const rows = measure.trim().split( '\n' );
    const numMeasureRows = rows.length;
    const rowMeasureHead = iMeasure * SM_ROWS_PER_MEASURE;

    rows.map( ( row, iRow ) => {
      for ( let iColumn = 0; iColumn < numColumns; iColumn ++ ) {
        const rowIndex = rowMeasureHead + Math.round( iRow * SM_ROWS_PER_MEASURE / numMeasureRows );

        const ch = row[ iColumn ];

        if ( ch === '0' ) { // empty
          // do nothing
        } else if ( ch === '1' ) { // tap
          noteData[ iColumn ][ rowIndex ] = {
            type: 'tap',
          };
        } else if ( ch === 'M' ) { // mine
          noteData[ iColumn ][ rowIndex ] = {
            type: 'mine',
          };
        } else if ( ch === '2' || ch === '4' ) { // hold or roll
          ongoingHoldIndexByColumn[ iColumn ] = rowIndex;
          noteData[ iColumn ][ rowIndex ] = { // spicy substitution
            type: 'hold',
            subType: ch === '2' ? 'hold' : 'roll',
            duration: 0, // we will set this later
          };
        } else if ( ch === '3' ) {
          const ongoingIndex = ongoingHoldIndexByColumn[ iColumn ];
          const ongoing = noteData[ iColumn ][ ongoingIndex ];
          if ( ongoing ) {
            ( ongoing as SMNoteHold ).duration = rowIndex - ongoingIndex;
          } else {
            console.warn( 'Unmatched hold tail' );
          }
        } else {
          console.warn( `Unknown note "${ ch }"` );
        }
      }
    } );
  } );

  return {
    stepsType,
    description,
    difficulty,
    meter,
    radarValues,
    noteData,
  };
}
