export const SMTapNoteType = {
  Empty: 'empty',
  Tap: 'tap',
  HoldHead: 'hold_head',
  HoldTail: 'hold_tail',
  Mine: 'mine',
  Attack: 'attack',
} as const;

export type SMTapNoteType = typeof SMTapNoteType[keyof typeof SMTapNoteType];
