import { dagEdgesParents } from '../dagEdgesParents';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesParents', () => {
  it( 'returns all parents of the specified destination from the given edges', () => {
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

    const subject = dagEdgesParents( edges, 'f' );

    expect( subject ).not.toContain( 'a' );
    expect( subject ).toContain( 'b' );
    expect( subject ).not.toContain( 'c' );
    expect( subject ).not.toContain( 'd' );
    expect( subject ).toContain( 'e' );
    expect( subject ).not.toContain( 'f' );
  } );
} );
