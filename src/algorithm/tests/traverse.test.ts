import { traverse } from '../traverse';

describe( 'traverse', () => {
  it( 'can be used to find all children in a hierarchy', () => {
    type Node = {
      name: string;
      children?: Node[];
    }

    const a: Node = {
      name: 'a',
      children: [
        {
          name: 'b',
          children: [
            {
              name: 'c',
            },
            {
              name: 'd',
            }
          ],
        },
        {
          name: 'e',
          children: [
            {
              name: 'f',
            },
            {
              name: 'g',
            },
          ],
        },
      ],
    };

    const nodeNames: string[] = [];
    traverse( a, ( node ) => {
      nodeNames.push( node.name );
      return node.children ?? [];
    } );

    expect( nodeNames ).toEqual( [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ] );
  } );

  it( 'can be used to find a funky descendant in a hierarchy', () => {
    type Node = {
      name: string;
      isFunky?: true;
      children?: Node[];
    }

    const a: Node = {
      name: 'a',
      children: [
        {
          name: 'b',
          children: [
            {
              name: 'c',
              isFunky: true,
            },
            {
              name: 'd',
            }
          ],
        },
        {
          name: 'e',
          children: [
            {
              name: 'f',
            },
            {
              name: 'g',
            },
          ],
        },
      ],
    };

    let callCount = 0;
    let funkyOne: Node | undefined;
    traverse( a, ( node ) => {
      callCount ++;

      if ( node.isFunky ) {
        funkyOne = node;
        return false;
      }

      return node.children ?? [];
    } );

    expect( funkyOne ).toEqual( { name: 'c', isFunky: true } );
    expect( callCount ).toBe( 3 );
  } );
} );
