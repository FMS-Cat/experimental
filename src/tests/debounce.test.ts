import { debounce } from '../debounce';

jest.useFakeTimers();

describe( 'debounce', () => {
  it( 'debounces the given function', () => {
    let value = 0;
    let debouncedValue = 0;

    const debounced = debounce( () => {
      debouncedValue = value;
    }, 500 );

    const expected = [
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 9, 9, 9,
      9, 9, 9, 9, 9,
      9, 9, 9, 9, 9,
      9, 9, 9, 9, 9,
      3, 3, 3, 3, 3,
    ];

    const rawValues = [
      0, 0, 4, 5, 6,
      7, 8, 9, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 8, 7,
      6, 0, 0, 5, 4,
      3, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ];

    const result = rawValues.map( ( v ) => {
      if ( v !== 0 ) {
        value = v;
        debounced();
      }

      const ret = debouncedValue;
      jest.advanceTimersByTime( 100 );
      return ret;
    } );

    expect( result ).toEqual( expected );
  } );
} );
