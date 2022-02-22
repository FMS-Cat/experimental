export interface SMNoteTap {
  /**
   * The type of the note.
   */
  type: 'tap';
}

export interface SMNoteMine {
  /**
   * The type of the note.
   */
  type: 'mine';
}

export interface SMNoteHold {
  /**
   * The type of the note.
   */
  type: 'hold';

  /**
   * The sub type of the note.
   * Only effective if {@link type} is {@link SMTapNoteType.HoldHead}.
   */
  subType: 'hold' | 'roll';

  /**
   * Duration of hold, in notes row unit.
   * Only effective if {@link type} is {@link SMTapNoteType.HoldHead}.
   */
  duration: number;
}

export type SMNote = SMNoteTap | SMNoteHold | SMNoteMine;
