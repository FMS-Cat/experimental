import { throttle } from '../throttle';

jest.useFakeTimers();

describe( 'throttle', () => {
  it( 'throttles the given function', () => {
    let value = 0;
    let throttledValue = 0;

    const throttled = throttle( () => {
      throttledValue = value;
    }, 500 );

    const expected = [
      0, 0, 0, 0, 0,
      0, 2, 2, 2, 2,
      2, 7, 7, 7, 7,
      7, 9, 9, 9, 9,
      9, 9, 9, 9, 9,
    ];

    const rawValues = [
      0, 0, 0, 0, 0,
      2, 3, 4, 5, 6,
      7, 8, 9, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ];

    const result = rawValues.map( ( v ) => {
      if ( v !== 0 ) {
        value = v;
        throttled();
      }

      const ret = throttledValue;
      jest.advanceTimersByTime( 100 );
      return ret;
    } );

    expect( result ).toEqual( expected );
  } );
} );
