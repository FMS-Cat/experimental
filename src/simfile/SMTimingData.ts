import { SM_ROWS_PER_BEAT } from './constants';
import { binarySearch } from '../algorithm/binarySearch';
import type { SMTimingDataRaw } from './SMTimingDataRaw';

export class SMTimingData {
  /**
   * Offset of beat 0, in seconds.
   */
  public offset: number;

  private __bpmSegments: [ row: number, bpm: number ][];
  public get bpmSegments(): [ row: number, bpm: number ][] {
    return this.__bpmSegments;
  }

  private __stopSegments: [ row: number, stopSeconds: number ][];
  public get stopSegments(): [ row: number, stopSeconds: number ][] {
    return this.__stopSegments;
  }

  /**
   * Itself but in a raw form.
   */
  public get raw(): SMTimingDataRaw {
    return {
      offset: this.offset,
      bpmSegments: JSON.parse( JSON.stringify( this.__bpmSegments ) ),
      stopSegments: JSON.parse( JSON.stringify( this.__stopSegments ) ),
    };
  }

  public constructor() {
    this.offset = 0.0;
    this.__bpmSegments = [ [ 0, 120 ] ];
    this.__stopSegments = [];
  }

  /**
   * Get a bpm at given beat.
   *
   * @param beat A beat where you want to look at
   */
  public getBPMAtBeat( beat: number ): number {
    const row = Math.round( beat * SM_ROWS_PER_BEAT );

    const bpmIndex = binarySearch( this.__bpmSegments, ( [ segRow ] ) => segRow < row );
    return this.__bpmSegments[ Math.max( 0, bpmIndex - 1 ) ][ 1 ];
  }

  /**
   * Get a beat at given elapsed time.
   *
   * @param elapsedTime An elapsed time where you want to look at
   */
  public getBeatFromElapsedTime( elapsedTime: number ): number {
    let segStartTime = -this.offset;

    let currentBPMSeg = this.__bpmSegments[ 0 ];
    let currentStopSegIndex = 0;

    for ( let iSeg = 1; ; iSeg ++ ) {
      const nextSeg = this.__bpmSegments[ iSeg ] ?? [ Infinity ];
      const beatDuration = ( nextSeg[ 0 ] - currentBPMSeg[ 0 ] ) / SM_ROWS_PER_BEAT;
      let segEndTime = segStartTime + 60.0 / currentBPMSeg[ 1 ] * beatDuration;

      const elapsedInSeg = elapsedTime - segStartTime;
      let beat = currentBPMSeg[ 0 ] / SM_ROWS_PER_BEAT + currentBPMSeg[ 1 ] / 60.0 * elapsedInSeg;

      let iStopSeg = currentStopSegIndex;
      for ( ; ; iStopSeg ++ ) {
        const [ stopSegRow, stopSeconds ] = this.__stopSegments[ iStopSeg ] ?? [ Infinity ];

        if ( stopSegRow >= nextSeg[ 0 ] ) {
          break;
        }

        const stopBeatSinceSeg = ( stopSegRow - currentBPMSeg[ 0 ] ) / SM_ROWS_PER_BEAT;
        const stopBeginTime = segStartTime + 60.0 / currentBPMSeg[ 1 ] * stopBeatSinceSeg;

        if ( elapsedTime <= stopBeginTime ) {
          break;
        }

        if ( elapsedTime <= stopBeginTime + stopSeconds ) {
          return stopSegRow / SM_ROWS_PER_BEAT;
        }

        segEndTime += stopSeconds;
        beat -= currentBPMSeg[ 1 ] / 60.0 * stopSeconds;
      }

      if ( elapsedTime > segEndTime ) {
        segStartTime = segEndTime;
      } else {
        return beat;
      }

      currentBPMSeg = nextSeg;
      currentStopSegIndex = iStopSeg;
    }
  }

  /**
   * Get a elapsed time at given beat.
   *
   * @param beat A beat where you want to look at
   */
  public getElapsedTimeFromBeat( beat: number ): number {
    const row = Math.round( beat * SM_ROWS_PER_BEAT );

    let time = 0.0;

    for ( const [ segRow, stop ] of this.__stopSegments ) {
      if ( segRow < row ) { // the exact row of a stop comes *before* the stop
        time += stop;
      } else {
        break;
      }
    }

    let currentBPMSeg = this.__bpmSegments[ 0 ];
    for ( let iSeg = 1; ; iSeg ++ ) {
      const nextSeg = this.__bpmSegments[ iSeg ];

      if ( nextSeg?.[ 0 ] < row ) {
        const beatDuration = ( nextSeg[ 0 ] - currentBPMSeg[ 0 ] ) / SM_ROWS_PER_BEAT;
        time += 60.0 / currentBPMSeg[ 1 ] * beatDuration;
        currentBPMSeg = nextSeg;
      } else {
        const beatDuration = beat - currentBPMSeg[ 0 ] / SM_ROWS_PER_BEAT;
        return time + 60.0 / currentBPMSeg[ 1 ] * beatDuration - this.offset;
      }
    }
  }

  /**
   * Set a bpm at beat.
   *
   * @param beat A start beat where the bpm change is placed at
   * @param bpm A bpm
   */
  public setBPMAtBeat( beat: number, bpm: number ): void {
    const row = Math.round( beat * SM_ROWS_PER_BEAT );

    const index = binarySearch( this.__bpmSegments, ( [ segRow ] ) => segRow < row );
    const prev = index > 0 ? this.__bpmSegments[ index - 1 ] : null;
    const isSameAsPrev = prev?.[ 1 ] === bpm;

    if ( this.__bpmSegments[ index ]?.[ 0 ] === row ) {
      if ( isSameAsPrev ) { // remove a row
        this.__bpmSegments.splice( index, 1 );
      } else { // replace the row
        this.__bpmSegments[ index ][ 1 ] = bpm;
      }
    } else if ( !isSameAsPrev ) { // insert a row
      this.__bpmSegments.splice( index, 0, [ row, bpm ] );
    }
  }

  /**
   * Set a stop at beat.
   *
   * @param beat A start beat where the stop is placed at
   * @param seconds A stop seconds
   */
  public setStopAtBeat( beat: number, seconds: number ): void {
    const row = Math.round( beat * SM_ROWS_PER_BEAT );

    const index = binarySearch( this.__stopSegments, ( [ segRow ] ) => segRow < row );
    const isZeroStop = seconds === 0.0;

    if ( this.__stopSegments[ index ]?.[ 0 ] === row ) {
      if ( isZeroStop ) { // remove a row
        this.__stopSegments.splice( index, 1 );
      } else { // replace the row
        this.__stopSegments[ index ][ 1 ] = seconds;
      }
    } else if ( !isZeroStop ) { // insert a row
      this.__stopSegments.splice( index, 0, [ row, seconds ] );
    }
  }

  /**
   * Create a new SMTimingData out of a raw value.
   *
   * @param raw A raw timing data
   */
  public static fromRaw( raw: SMTimingDataRaw ): SMTimingData {
    const timingData = new SMTimingData();

    timingData.offset = raw.offset;
    timingData.__bpmSegments = JSON.parse( JSON.stringify( raw.bpmSegments ) );
    timingData.__stopSegments = JSON.parse( JSON.stringify( raw.stopSegments ) );

    return timingData;
  }
}
