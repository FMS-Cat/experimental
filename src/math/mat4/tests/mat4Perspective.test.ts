import '../../../tests/matchers/toBeCloseToArray';
import { mat4Perspective } from '../mat4Perspective';

describe( 'mat4Perspective', () => {
  it( 'returns a perspective matrix', () => {
    const subject = mat4Perspective( 40.0, 1.0, 500.0 );

    const expected = [
      2.7474774194546225, 0, 0, 0,
      0, 2.7474774194546225, 0, 0,
      0, 0, -1.0040080160320641, -1,
      0, 0, -2.004008016032064, 0
    ];

    expect( subject ).toBeCloseToArray( expected );
  } );
} );
