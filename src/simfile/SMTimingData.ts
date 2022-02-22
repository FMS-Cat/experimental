export interface SMTimingData {
  /**
   * Key is beat row, value is bpm.
   */
  bpmSegments: { [ row: number ]: number };

  /**
   * Key is beat row, value is step seconds.
   */
  stopSegments: { [ row: number ]: number };

  /**
   * Offset of beat 0, in seconds.
   */
  offset: number;
}
