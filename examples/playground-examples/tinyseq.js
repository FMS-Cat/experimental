import { arraySerial, createTinyseqReader, lerp, linearstep } from '@0b5vr/experimental';

const { pow } = Math;

export default ( ( { divContainer } ) => {
  const audio = new AudioContext();

  const read = createTinyseqReader( new Uint8Array( [
      0,  5, // note  on 60, delta step  5
    128,  1, // note off   , delta step  1
      2,  5, // note  on 62, delta step  5
    128,  1, // note off   , delta step  1
      1,  5, // note  on 63, delta step  5
    128,  1, // note off   , delta step  1
      2,  5, // note  on 65, delta step  5
    128,  1, // note off   , delta step  1
    125, 11, // note  on 62, delta step 11
    128,  1, // note off   , delta step  1
    124,  5, // note  on 58, delta step  5
    128,  1, // note off   , delta step  1
      2, 11, // note  on 60, delta step 11
    128, 43, // note off   , delta step 43
  ] ), {
    blockSize: 1024,
    sampleRate: audio.sampleRate,
    stepsPerSecond: 48.0,
  } );

  const processor = audio.createScriptProcessor( 1024, 0, 1 );

  const A = 0.003;
  const D = 0.2;
  const S = 0.3;
  const R = 0.04;

  processor.addEventListener( 'audioprocess', ( event ) => {
    const out = event.outputBuffer.getChannelData( 0 );
    const seq = read();

    arraySerial( 1024 ).map( ( i ) => {
      const time = seq[ 4 * i + 0 ];
      const offTime = seq[ 4 * i + 1 ];
      const note = seq[ 4 * i + 2 ];

      const freq = 440.0 * pow( 2.0, ( note - 69.0 ) / 12.0 );
      const env = (
        linearstep( 0.0, A, time ) // attack
        * lerp( S, 1.0, linearstep( A + D, A, time ) ) // decay
        * linearstep( R, 0.0, offTime ) // release
      );
      const wave = ( ( freq * time ) % 1.0 ) < 0.75 ? -1.0 : 1.0;

      out[ i ] += 0.1 * env * wave;
    } );
  } );

  const button = document.createElement( 'button' );
  button.textContent = 'play';
  divContainer.appendChild( button );

  button.addEventListener( 'click', () => {
    audio.resume();
    processor.connect( audio.destination );
  } );

  return () => {
    audio.close();
  };
} );
