export type MidiParseResultHeader = [
  format: number,
  tracks: number,
  division: number,
];

export type MidiParseResultTrackNoteEvent = [
  tick: number,
  type: number,
  note: number,
  velocity: number,
];

export type MidiParseResultTrackMetaEvent = [
  tick: number,
  type: number,
  subtype: number,
  data: number[],
];

export type MidiParseResultTrackEvent =
  | MidiParseResultTrackNoteEvent
  | MidiParseResultTrackMetaEvent;

export type MidiParseResultTrack = MidiParseResultTrackEvent[];

export type MidiParseResult = [
  header: MidiParseResultHeader,
  tracks: MidiParseResultTrack[],
];
