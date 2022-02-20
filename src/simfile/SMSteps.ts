import type { SMDifficulty } from './SMDifficulty';
import type { SMNoteData } from './SMNoteData';
import type { SMStepsType } from './SMStepsType';

export interface SMSteps {
  stepsType: SMStepsType;
  description: string;
  difficulty: SMDifficulty;
  meter: number;
  noteData: SMNoteData;
}
