import { trimLineComments } from '../trimLineComments';

describe( 'trimLineComments', () => {
  it( 'trims line comments from given text', () => {
    const text = `line 1
line 2 // this is a comment
// comment
line 3 // comment
line 4`;

    const expected = `line 1
line 2 

line 3 
line 4`;
    const subject = trimLineComments( text );

    expect( subject ).toBe( expected );
  } );
} );
