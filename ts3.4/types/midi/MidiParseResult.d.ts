export declare type MidiParseResultHeader = [format, number, tracks, number, division, number];
export declare type MidiParseResultTrackNoteEvent = [tick, number, type, number, note, number, velocity, number];
export declare type MidiParseResultTrackMetaEvent = [tick, number, type, number, subtype, number, data, number[]];
export declare type MidiParseResultTrackEvent = MidiParseResultTrackNoteEvent | MidiParseResultTrackMetaEvent;
export declare type MidiParseResultTrack = MidiParseResultTrackEvent[];
export declare type MidiParseResult = [header, MidiParseResultHeader, tracks, MidiParseResultTrack[]];
