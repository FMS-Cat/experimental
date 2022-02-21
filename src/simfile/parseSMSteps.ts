import { trimLineComments } from '../string/trimLineComments';
import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMSteps } from './SMSteps';
import type { SMStepsType } from './SMStepsType';

export function parseSMSteps( params: string[] ): SMSteps {
  const noteData: SMNoteData = [];

  const noteParam = trimLineComments( params[ 5 ].replace( '\r\n', '\n' ) );
  console.log( noteParam );
  const noteMeasures = noteParam.split( ',' );
  noteMeasures.map( ( measure ) => {
    const lines = measure.split( '\n' );
    console.log( lines );
  } );

  return {
    stepsType: params[ 0 ].trim() as SMStepsType,
    description: params[ 1 ].trim(),
    difficulty: params[ 2 ].trim() as SMDifficulty,
    meter: parseInt( params[ 3 ].trim(), 10 ),
    radarValues: params[ 4 ].trim().split( ',' ).map( ( v ) => parseFloat( v ) ) as [ number, number, number, number, number ],
    noteData,
  };
}
