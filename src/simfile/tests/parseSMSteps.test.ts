import { parseSMSteps } from '../parseSMSteps';

describe( 'parseSMSteps', () => {
  it( 'parses given simfile', () => {
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
0200
0020
0002
3000
0300
0030
0003
` ];

    const subject = parseSMSteps( params );

    expect( subject.stepsType ).toEqual( 'dance-single' );
    expect( subject.description ).toEqual( 'Slumpage' );
    expect( subject.meter ).toEqual( 18 );
    expect( subject.difficulty ).toEqual( 'Edit' );
    // expect( subject.stepsType ).toEqual( 'NOMA' );
  } );
} );
