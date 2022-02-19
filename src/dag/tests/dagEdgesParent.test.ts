import { dagEdgesParent } from '../dagEdgesParent';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesParent', () => {
  it( 'returns a parent of the specified destination from the given edges', () => {
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

    const subject = dagEdgesParent( edges, 'f' );

    expect( subject ).toBe( 'b' );
  } );
} );
