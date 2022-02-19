import { dagEdgesResolve } from '../dagEdgesResolve';
import { shuffleArray } from '../../array/utils';
import type { RawDagEdge } from '../RawDagEdge';

describe( 'dagEdgesResolve', () => {
  it( 'resolves the given dag', () => {
    const nodes = shuffleArray( [
      'time',
      'resolution',
      'p',
      'ro',
      'rd',
      'isect',
      'alpha',
      'color',
    ] );

    const edges: RawDagEdge<string>[] = shuffleArray( [
      [ 'time', 'ro' ],
      [ 'resolution', 'p' ],
      [ 'p', 'rd' ],
      [ 'time', 'rd' ],
      [ 'ro', 'isect' ],
      [ 'rd', 'isect' ],
      [ 'isect', 'color' ],
    ] );

    const subject = dagEdgesResolve( edges, nodes );

    expect( subject ).toEqual( expect.arrayContaining( nodes ) );

    expect( subject.indexOf( 'ro' ) ).toBeGreaterThan( subject.indexOf( 'time' ) );
    expect( subject.indexOf( 'p' ) ).toBeGreaterThan( subject.indexOf( 'resolution' ) );
    expect( subject.indexOf( 'color' ) ).toBeGreaterThan( subject.indexOf( 'resolution' ) );
    expect( subject.indexOf( 'color' ) ).toBeGreaterThan( subject.indexOf( 'time' ) );
  } );
} );
