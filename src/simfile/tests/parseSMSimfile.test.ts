import { parseSMSimfile } from '../parseSMSimfile';

describe( 'parseSMSimfile', () => {
  it( 'parses given simfile', () => {
    const sm = `#TITLE:Brain Power;
#SUBTITLE:;
#ARTIST:NOMA;`;

    const subject = parseSMSimfile( sm );

    expect( subject.title ).toEqual( 'Brain Power' );
    expect( subject ).not.toHaveProperty( 'subtitle' );
    expect( subject.artist ).toEqual( 'NOMA' );
  } );
} );
