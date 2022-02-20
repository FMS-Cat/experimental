import { parseMSD } from '../parseMSD';

describe( 'parseMSD', () => {
  it( 'parses given msd text', () => {
    const msd = `#TITLE:Brain Power;
#SUBTITLE:;
#ARTIST:NOMA;`;
    const expected = [
      [ 'TITLE', 'Brain Power' ],
      [ 'SUBTITLE', '' ],
      [ 'ARTIST', 'NOMA' ],
    ];
    const subject = parseMSD( msd );

    expect( subject ).toEqual( expected );
  } );

  it( 'performs the "scary #" pattern properly', () => {
    const msd = `#TITLE:#FairyJoke #SDVX_Edit;
#SUBTITLE:[Tier 1.5] #Taro_dancing_in_lake
#ARTIST:uno(IOSYS)`;
    const expected = [
      [ 'TITLE', '#FairyJoke #SDVX_Edit' ],
      [ 'SUBTITLE', '[Tier 1.5] #Taro_dancing_in_lake' ],
      [ 'ARTIST', 'uno(IOSYS)' ],
    ];
    const subject = parseMSD( msd );

    expect( subject ).toEqual( expected );
  } );
} );
