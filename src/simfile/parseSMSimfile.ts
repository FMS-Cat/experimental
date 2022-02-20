import { SMSimfile } from './SMSimfile';
import { parseMSD } from './parseMsd';
import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMSteps } from './SMSteps';
import type { SMStepsType } from './SMStepsType';

export function parseSMSimfile( text: string ): SMSimfile {
  const msd = parseMSD( text );

  const sm: SMSimfile = {};

  const notesParams = msd.filter( ( param ) => param[ 0 ] === 'NOTES' );

  notesParams.map( ( notesParam ) => {
    const noteData: SMNoteData = [];

    const steps: SMSteps = {
      stepsType: notesParam[ 0 ] as SMStepsType,
      description: notesParam[ 1 ],
      difficulty: notesParam[ 2 ] as SMDifficulty,
      meter: parseInt( notesParam[ 3 ], 10 ),
      noteData,
    };

    if ( !sm.notes ) {
      sm.notes = [];
    }
    sm.notes.push( steps );
  } );

  for ( const [ paramName, value ] of Object.values( msd ) ) {
    if ( value && value !== '' ) {
      if ( paramName === 'TITLE' ) {
        sm.title = value;
      } else if ( paramName === 'SUBTITLE' ) {
        sm.subtitle = value;
      } else if ( paramName === 'ARTIST' ) {
        sm.artist = value;
      }
    }
  }

  return sm;
}
