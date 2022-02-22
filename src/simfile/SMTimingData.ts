export interface SMTimingData {
  bpmSegments: [ row: number, bpm: number ][];
  stopSegments: [ row: number, stopSeconds: number ][];

  /**
   * Offset of beat 0, in seconds.
   */
  offset: number;
}
