export const SMTapNoteSubType = {
  Hold: 'hold',
  Roll: 'roll',
} as const;

export type SMTapNoteSubType = typeof SMTapNoteSubType[keyof typeof SMTapNoteSubType];
