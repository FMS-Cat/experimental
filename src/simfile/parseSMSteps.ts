import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMSteps } from './SMSteps';
import type { SMStepsType } from './SMStepsType';

export function parseSMSteps( params: string[] ): SMSteps {
  const noteParam = params[ 4 ].replace( '\r\n', '\n' ).split( '\n' );
  console.log( noteParam );

  const noteData: SMNoteData = [];

  return {
    stepsType: params[ 0 ].trim() as SMStepsType,
    description: params[ 1 ].trim(),
    difficulty: params[ 2 ].trim() as SMDifficulty,
    meter: parseInt( params[ 3 ].trim(), 10 ),
    noteData,
  };
}
