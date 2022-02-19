import { dagEdgesChildren } from '../dagEdgesChildren';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesChildren', () => {
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

    const subject = dagEdgesChildren( edges, 'a' );

    expect( subject ).not.toContain( 'a' );
    expect( subject ).toContain( 'b' );
    expect( subject ).not.toContain( 'c' );
    expect( subject ).toContain( 'd' );
    expect( subject ).toContain( 'e' );
    expect( subject ).not.toContain( 'f' );
  } );
} );
