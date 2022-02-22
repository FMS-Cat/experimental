import { parseSMSteps } from '../parseSMSteps';
import type { SMNoteData } from '../SMNoteData';

describe( 'parseSMSteps', () => {
  it( 'parses given steps', () => {
    const params = [
      '     dance-single',
      '     Slumpage',
      '     Edit',
      '     18',
      '     0.684,0.000,0.062,0.484,0.277',
      `  // measure 1
1000
0100
0010
0001
,  // measure 2
2000
0400
0020
0004
3000
0300
0030
0003
,
0000
0000
0000
MMMM
` ];

    const subject = parseSMSteps( params );

    const expectedNoteData: SMNoteData = [
      {
        0: { type: 'tap' },
        192: { type: 'hold', subType: 'hold', duration: 96 },
        528: { type: 'mine' },
      },
      {
        48: { type: 'tap' },
        216: { type: 'hold', subType: 'roll', duration: 96 },
        528: { type: 'mine' },
      },
      {
        96: { type: 'tap' },
        240: { type: 'hold', subType: 'hold', duration: 96 },
        528: { type: 'mine' },
      },
      {
        144: { type: 'tap' },
        264: { type: 'hold', subType: 'roll', duration: 96 },
        528: { type: 'mine' },
      },
    ];

    expect( subject.stepsType ).toEqual( 'dance-single' );
    expect( subject.description ).toEqual( 'Slumpage' );
    expect( subject.meter ).toEqual( 18 );
    expect( subject.difficulty ).toEqual( 'Edit' );
    expect( subject.noteData ).toEqual( expectedNoteData );
  } );
} );
