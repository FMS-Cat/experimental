import { SMTimingData } from '../SMTimingData';

describe( 'SMTimingData', () => {
  let timingData: SMTimingData;

  beforeEach( () => {
    timingData = new SMTimingData();
  } );

  it( 'instantiates', () => {
    expect( timingData ).toBeInstanceOf( SMTimingData );
  } );

  describe( 'getBPMAtBeat', () => {
    it( 'gets a bpm', () => {
      const first = timingData.bpmSegments[ 0 ];
      timingData.setBPMAtBeat( 8, 180 );

      expect( timingData.getBPMAtBeat( 4 ) ).toBe( first[ 1 ] );
      expect( timingData.getBPMAtBeat( 10 ) ).toBe( 180 );
    } );
  } );

  describe( 'getBeatFromElapsedTime', () => {
    it( 'gets a beat from elapsed time', () => {
      timingData.setBPMAtBeat( 0, 120 );
      timingData.setBPMAtBeat( 8, 180 );
      timingData.setStopAtBeat( 4, 0.4 );
      timingData.setStopAtBeat( 12, 1.0 );
      timingData.offset = 0.009;

      expect( timingData.getBeatFromElapsedTime( 1.991 ) ).toBeCloseTo( 4.0 );
      expect( timingData.getBeatFromElapsedTime( 4.391 ) ).toBeCloseTo( 8.0 );
      expect( timingData.getBeatFromElapsedTime( 5.058 ) ).toBeCloseTo( 10.0 );
      expect( timingData.getBeatFromElapsedTime( 7.391 ) ).toBeCloseTo( 14.0 );
    } );
  } );

  describe( 'getElapsedTimeFromBeat', () => {
    it( 'gets an elapsed time from beat', () => {
      timingData.setBPMAtBeat( 0, 120 );
      timingData.setBPMAtBeat( 8, 180 );
      timingData.setStopAtBeat( 4, 0.4 );
      timingData.setStopAtBeat( 12, 1.0 );
      timingData.offset = 0.009;

      expect( timingData.getElapsedTimeFromBeat( 4 ) ).toBeCloseTo( 1.991 );
      expect( timingData.getElapsedTimeFromBeat( 8 ) ).toBeCloseTo( 4.391 );
      expect( timingData.getElapsedTimeFromBeat( 10 ) ).toBeCloseTo( 5.058 );
      expect( timingData.getElapsedTimeFromBeat( 14 ) ).toBeCloseTo( 7.391 );
    } );
  } );

  describe( 'setBPMAtBeat', () => {
    it( 'adds a bpm change', () => {
      const first = timingData.bpmSegments[ 0 ];
      timingData.setBPMAtBeat( 4, 180 );
      expect( timingData.bpmSegments ).toEqual( [
        first,
        [ 192, 180 ],
      ] );
    } );

    it( 'replaces an existing bpm change', () => {
      timingData.setBPMAtBeat( 0, 200 );
      expect( timingData.bpmSegments ).toEqual( [
        [ 0, 200 ],
      ] );
    } );

    it( 'don\'t add a bpm change if the bpm is same as previous segment', () => {
      const first = timingData.bpmSegments[ 0 ];
      timingData.setBPMAtBeat( 4, first[ 1 ] );
      expect( timingData.bpmSegments ).toEqual( [
        first,
      ] );
    } );

    it( 'removes an existing bpm change', () => {
      const first = timingData.bpmSegments[ 0 ];
      timingData.setBPMAtBeat( 4, 200 );
      timingData.setBPMAtBeat( 4, first[ 1 ] );
      expect( timingData.bpmSegments ).toEqual( [
        first,
      ] );
    } );
  } );

  describe( 'setStopAtBeat', () => {
    it( 'adds a stop', () => {
      timingData.setStopAtBeat( 4, 1 );
      expect( timingData.stopSegments ).toEqual( [
        [ 192, 1 ],
      ] );
    } );

    it( 'replaces an existing stop', () => {
      timingData.setStopAtBeat( 4, 2 );
      timingData.setStopAtBeat( 4, 3 );
      expect( timingData.stopSegments ).toEqual( [
        [ 192, 3 ],
      ] );
    } );

    it( 'don\'t add a stop if the stop second is zero', () => {
      timingData.setStopAtBeat( 4, 0 );
      expect( timingData.stopSegments ).toEqual( [] );
    } );

    it( 'removes an existing stop', () => {
      timingData.setStopAtBeat( 4, 2 );
      timingData.setStopAtBeat( 4, 0 );
      expect( timingData.stopSegments ).toEqual( [] );
    } );
  } );
} );
