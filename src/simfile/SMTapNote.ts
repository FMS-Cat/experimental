import type { SMTapNoteSubType } from './SMTapNoteSubType';
import type { SMTapNoteType } from './SMTapNoteType';

export interface SMTapNote {
  type: SMTapNoteType;
  subType?: SMTapNoteSubType;
}
