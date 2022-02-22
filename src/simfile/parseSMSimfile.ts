import { SM_ROWS_PER_BEAT, SM_ROWS_PER_MEASURE } from './constants';
import { parseMSD } from './parseMsd';
import { stepsTypeColumnsMap } from './stepsTypeColumnsMap';
import { trimLineComments } from '../string/trimLineComments';
import type { SMBackgroundChange } from './SMBackgroundChange';
import type { SMDifficulty } from './SMDifficulty';
import type { SMDisplayBPM } from './SMDisplayBPM';
import type { SMNoteData } from './SMNoteData';
import type { SMNoteHold } from './SMNote';
import type { SMSimfile } from './SMSimfile';
import type { SMSteps } from './SMSteps';
import type { SMStepsType } from './SMStepsType';
import type { SMTimingData } from './SMTimingData';

function parseDisplayBPM( [ _, value, value2 ]: string[] ): SMDisplayBPM {
  if ( value === '*' ) {
    return value;
  } else if ( value2 ) {
    return [ parseFloat( value ), parseFloat( value2 ) ];
  } else {
    return parseFloat( value );
  }
}

function parseTimingData(
  offsetStr?: string,
  bpmStr?: string,
  stopStr?: string,
): SMTimingData {
  const offset = parseFloat( offsetStr ?? '0' );

  const bpmSegments = bpmStr
    ?.split( ',' )
    .map( ( seg ) => seg.split( '=' ) )
    .filter( ( change ) => change.length !== 1 ) // handle trailing comma
    .map( ( seg ) => {
      const beat = parseFloat( seg[ 0 ] );
      const bpm = parseFloat( seg[ 1 ] );
      const rowIndex = Math.round( beat * SM_ROWS_PER_BEAT );
      return [ rowIndex, bpm ] as [ number, number ];
    } ) ?? [];

  const stopSegments = stopStr
    ?.split( ',' )
    .map( ( seg ) => seg.split( '=' ) )
    .filter( ( change ) => change.length !== 1 ) // handle trailing comma
    .map( ( seg ) => {
      const beat = parseFloat( seg[ 0 ] );
      const seconds = parseFloat( seg[ 1 ] );
      const rowIndex = Math.round( beat * SM_ROWS_PER_BEAT );
      return [ rowIndex, seconds ] as [ number, number ];
    } ) ?? [];

  return {
    offset,
    bpmSegments,
    stopSegments,
  };
}

function parseBGChanges( [ _, value ]: string[] ): SMBackgroundChange[] {
  return value
    .split( ',' )
    .map( ( change ) => change.trim().split( '=' ) )
    .filter( ( change ) => change.length !== 1 ) // handle trailing comma
    .map( ( change ) => {
      const startBeat = parseFloat( change[ 0 ] );
      const rate = parseFloat( change[ 2 ] );
      const def = {
        file1: change[ 1 ],
      };

      return {
        startBeat,
        rate,
        def,
      };
    } );
}

function parseSteps( notesParam: string[] ): SMSteps {
  const stepsType = notesParam[ 1 ].trim() as SMStepsType;
  const description = notesParam[ 2 ].trim();
  const difficulty = notesParam[ 3 ].trim() as SMDifficulty;
  const meter = parseInt( notesParam[ 4 ].trim(), 10 );
  const radarValues = notesParam[ 5 ].trim().split( ',' ).map( ( v ) => parseFloat( v ) ) as [ number, number, number, number, number ];

  const numColumns = stepsTypeColumnsMap[ stepsType ];
  if ( numColumns == null ) {
    throw new Error( `Unknown stepsType "${ stepsType }"` );
  }

  const noteData: SMNoteData = [ ...Array( numColumns ) ].map( () => [] );

  const noteParam = trimLineComments( notesParam[ 6 ].replace( '\r\n', '\n' ) );
  const noteMeasures = noteParam.split( ',' );

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
          noteData[ iColumn ].push( [
            rowIndex,
            { type: 'tap' },
          ] );
        } else if ( ch === 'M' ) { // mine
          noteData[ iColumn ].push( [
            rowIndex,
            { type: 'mine' },
          ] );
        } else if ( ch === '2' || ch === '4' ) { // hold or roll
          noteData[ iColumn ].push( [
            rowIndex,
            {
              type: 'hold',
              subType: ch === '2' ? 'hold' : 'roll',
              duration: 0, // we will set this later
            },
          ] );
        } else if ( ch === '3' ) {
          const column = noteData[ iColumn ];
          const prevNote = column[ column.length - 1 ];
          if ( prevNote[ 1 ].type === 'hold' ) {
            ( prevNote[ 1 ] as SMNoteHold ).duration = rowIndex - prevNote[ 0 ];
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

export function parseSMSimfile( text: string ): SMSimfile {
  const msd = parseMSD( text );

  const sm: SMSimfile = {};

  const notesParams = msd.filter( ( param ) => param[ 0 ] === 'NOTES' );

  // metadata
  let offsetStr: string | undefined;
  let bpmStr: string | undefined;
  let stopStr: string | undefined;

  for ( const param of Object.values( msd ) ) {
    const [ paramName, value ] = param;
    if ( value && value !== '' ) {
      if ( paramName === 'TITLE' ) {
        sm.title = value;
      } else if ( paramName === 'SUBTITLE' ) {
        sm.subtitle = value;
      } else if ( paramName === 'ARTIST' ) {
        sm.artist = value;
      } else if ( paramName === 'TITLETRANSLIT' ) {
        sm.titleTranslit = value;
      } else if ( paramName === 'SUBTITLETRANSLIT' ) {
        sm.subtitleTranslit = value;
      } else if ( paramName === 'ARTISTTRANSLIT' ) {
        sm.artistTranslit = value;
      } else if ( paramName === 'GENRE' ) {
        sm.genre = value;
      } else if ( paramName === 'CREDIT' ) {
        sm.credit = value;
      } else if ( paramName === 'BANNER' ) {
        sm.banner = value;
      } else if ( paramName === 'BACKGROUND' ) {
        sm.background = value;
      } else if ( paramName === 'LYRICSPATH' ) {
        sm.lyricsPath = value;
      } else if ( paramName === 'CDTITLE' ) {
        sm.cdTitle = value;
      } else if ( paramName === 'MUSIC' ) {
        sm.music = value;
      } else if ( paramName === 'OFFSET' ) {
        offsetStr = value;
      } else if ( paramName === 'SAMPLESTART' ) {
        sm.sampleStart = parseFloat( value );
      } else if ( paramName === 'SAMPLELENGTH' ) {
        sm.sampleLength = parseFloat( value );
      } else if ( paramName === 'SELECTABLE' ) {
        if ( value === 'YES' ) {
          sm.selectable = 'yes';
        } else if ( value === 'ROULETTE' ) {
          sm.selectable = 'roulette';
        } else if ( value === 'NO' ) {
          sm.selectable = 'no';
        }
      } else if ( paramName === 'DISPLAYBPM' ) {
        sm.displayBPM = parseDisplayBPM( param );
      } else if ( paramName === 'BPMS' ) {
        bpmStr = value;
      } else if ( paramName === 'STOPS' ) {
        stopStr = value;
      } else if ( paramName === 'BGCHANGES' ) {
        sm.bgChanges = parseBGChanges( param );
      } else if ( paramName === 'FGCHANGES' ) {
        sm.fgChanges = parseBGChanges( param );
      }
    }
  }

  // timing data
  sm.timingData = parseTimingData( offsetStr, bpmStr, stopStr );

  // notes
  notesParams.map( ( notesParam ) => {
    const steps = parseSteps( notesParam );

    if ( !sm.notes ) {
      sm.notes = [];
    }
    sm.notes.push( steps );
  } );

  return sm;
}
