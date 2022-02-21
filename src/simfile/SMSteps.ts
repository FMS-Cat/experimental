import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMStepsType } from './SMStepsType';

export interface SMSteps {
  stepsType: SMStepsType;
  description: string;
  difficulty: SMDifficulty;
  meter: number;
  radarValues: [ number, number, number, number, number ];
  noteData: SMNoteData;
}
