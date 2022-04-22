import type { SMBackgroundChange } from './SMBackgroundChange';
import type { SMSteps } from './SMSteps';
import type { SMTimingDataRaw } from './SMTimingDataRaw';

export interface SMSimfileRaw {
  title?: string;
  subtitle?: string;
  artist?: string;
  titleTranslit?: string;
  subtitleTranslit?: string;
  artistTranslit?: string;
  genre?: string;
  credit?: string;
  banner?: string;
  background?: string;
  lyricsPath?: string;
  cdTitle?: string;
  music?: string;
  sampleStart?: number;
  sampleLength?: number;
  selectable?: 'yes' | 'no' | 'roulette';
  displayBPM?: number | [ number, number ] | '*';
  notes?: SMSteps[];
  timingData?: SMTimingDataRaw;
  bgChanges?: SMBackgroundChange[];
  fgChanges?: SMBackgroundChange[];
}