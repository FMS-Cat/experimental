import { BinaryHeap } from '../BinaryHeap';

function validateIndexMap<T>( heap: BinaryHeap<T> ): boolean {
  return heap.array.every( ( el, i ) => heap.elementIndexMap.get( el ) === i );
}

describe( 'BinaryHeap', () => {
  it( 'instantiates', () => {
    const heap = new BinaryHeap<string>();
    expect( heap ).toBeInstanceOf( BinaryHeap );
  } );

  it( 'instantiates with elements', () => {
    const heap = new BinaryHeap<string>( [ 'd', 'c', 'f', 'e', 'h', 'b', 'g', 'a' ] );
    expect( heap ).toBeInstanceOf( BinaryHeap );
    expect( heap.array ).toEqual( [ 'a', 'b', 'c', 'd', 'h', 'f', 'g', 'e' ] );
    expect( validateIndexMap( heap ) ).toBe( true );
  } );

  it( 'instantiates with elements and a custom comparator', () => {
    const heap = new BinaryHeap<number>( [ 4, 3, 6, 5, 8, 2, 7, 1 ], ( a, b ) => a - b );
    expect( heap ).toBeInstanceOf( BinaryHeap );
    expect( heap.array ).toEqual( [ 1, 2, 3, 4, 8, 6, 7, 5 ] );
    expect( validateIndexMap( heap ) ).toBe( true );
  } );

  describe( 'isEmpty', () => {
    it( 'says empty if it is empty', () => {
      const heap = new BinaryHeap<string>();
      expect( heap.isEmpty ).toBe( true );
    } );

    it( 'does not say empty if it is not empty', () => {
      const heap = new BinaryHeap<string>( [ 'a' ] );
      expect( heap.isEmpty ).toBe( false );
    } );
  } );

  describe( 'push', () => {
    it( 'pushes elements to a heap', () => {
      const heap = new BinaryHeap<string>();
      heap.push( 'd', 'c', 'f', 'e', 'h', 'b', 'g', 'a' );
      expect( heap.array ).toEqual( [ 'a', 'b', 'c', 'd', 'h', 'f', 'g', 'e' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );
  } );

  describe( 'pop', () => {
    it( 'pops an element from a heap, retaining the heap structure (replacing value is bigger than left child of the root)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'c', 'e', 'd' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [ 'c', 'd', 'e' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'pops an element from a heap, retaining the heap structure (replacing value is bigger than right child of the root)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'e', 'c', 'f', 'g', 'd' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [ 'c', 'e', 'd', 'f', 'g' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'pops an element from a heap, retaining the heap structure (replacing value is bigger than both children of the root)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'e', 'c', 'f', 'g', 'k' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [ 'c', 'e', 'k', 'f', 'g' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'pops an element from a heap, retaining the heap structure (a very big value drowns into the bottom)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'b', 'c', 'e', 'd', 'g', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'q', 'p', 's', 'r', 'u', 't', 'w', 'v', 'y', 'x', 'z' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [ 'b', 'd', 'c', 'e', 'j', 'g', 'f', 'h', 'i', 't', 'k', 'l', 'm', 'n', 'o', 'q', 'p', 's', 'r', 'u', 'z', 'w', 'v', 'y', 'x' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'pops an element from a heap, retaining the heap structure (replacing value is smaller than a child)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'c', 'b' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [ 'b', 'c' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'pops the last element from a heap', () => {
      const heap = new BinaryHeap<string>( [ 'a' ] );
      const el = heap.pop();
      expect( el ).toBe( 'a' );
      expect( heap.array ).toEqual( [] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'returns null if it is empty', () => {
      const heap = new BinaryHeap<string>( [] );
      const el = heap.pop();
      expect( el ).toBe( null );
      expect( heap.array ).toEqual( [] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );
  } );

  describe( 'delete', () => {
    it( 'deletes an element of a heap, retaining the heap structure (replacing value is big)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'b', 'c', 'd', 'h', 'f', 'g', 'e' ] );
      const result = heap.delete( heap.elementIndexMap.get( 'b' )! );
      expect( result ).toBe( true );
      expect( heap.array ).toEqual( [ 'a', 'd', 'c', 'e', 'h', 'f', 'g' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'replaces an element of a heap, retaining the heap structure (replacing value is small)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'b', 'g', 'c', 'd', 'h', 'i', 'e' ] );
      const result = heap.delete( heap.elementIndexMap.get( 'i' )! );
      expect( result ).toBe( true );
      expect( heap.array ).toEqual( [ 'a', 'b', 'e', 'c', 'd', 'h', 'g' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );
  } );

  describe( 'replace', () => {
    it( 'replaces an element of a heap, retaining the heap structure (replacing value is small)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'b', 'c', 'd', 'h', 'f', 'g', 'e' ] );
      const i = heap.replace( heap.elementIndexMap.get( 'g' )!, '0' );
      expect( i ).toBe( 0 );
      expect( heap.array ).toEqual( [ '0', 'b', 'a', 'd', 'h', 'f', 'c', 'e' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );

    it( 'replaces an element of a heap, retaining the heap structure (replacing value is big)', () => {
      const heap = new BinaryHeap<string>( [ 'a', 'b', 'c', 'd', 'h', 'f', 'g', 'e' ] );
      const i = heap.replace( heap.elementIndexMap.get( 'b' )!, 'z' );
      expect( i ).toBe( 7 );
      expect( heap.array ).toEqual( [ 'a', 'd', 'c', 'e', 'h', 'f', 'g', 'z' ] );
      expect( validateIndexMap( heap ) ).toBe( true );
    } );
  } );
} );
