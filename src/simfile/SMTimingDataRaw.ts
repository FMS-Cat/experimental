export interface SMTimingDataRaw {
  /**
   * Offset of beat 0, in seconds.
   */
  offset: number;

  bpmSegments: [ row: number, bpm: number ][];

  stopSegments: [ row: number, stopSeconds: number ][];
}
