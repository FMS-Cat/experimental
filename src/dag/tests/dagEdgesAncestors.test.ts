import { dagEdgesAncestors } from '../dagEdgesAncestors';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesAncestors', () => {
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

    const subject = dagEdgesAncestors( edges, 'f' );

    expect( subject ).toContain( 'a' );
    expect( subject ).toContain( 'b' );
    expect( subject ).toContain( 'c' );
    expect( subject ).not.toContain( 'd' );
    expect( subject ).toContain( 'e' );
    expect( subject ).not.toContain( 'f' );
  } );
} );
