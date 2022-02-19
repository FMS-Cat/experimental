import { dagEdgesDescendants } from '../dagEdgesDescendants';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesDescendants', () => {
  it( 'returns all children of the specified source from the given edges', () => {
    const edges: RawDagEdge<string>[] = [
      [ 'a', 'b' ],
      [ 'b', 'c' ],
      [ 'a', 'd' ],
      [ 'a', 'e' ],
      [ 'b', 'e' ],
      [ 'c', 'e' ],
      [ 'b', 'f' ],
      [ 'e', 'f' ],
    ];

    const subject = dagEdgesDescendants( edges, 'a' );

    expect( subject ).not.toContain( 'a' );
    expect( subject ).toContain( 'b' );
    expect( subject ).toContain( 'c' );
    expect( subject ).toContain( 'd' );
    expect( subject ).toContain( 'e' );
    expect( subject ).toContain( 'f' );
  } );
} );
