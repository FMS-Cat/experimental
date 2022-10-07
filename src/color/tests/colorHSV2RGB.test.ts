import '../../tests/matchers/toBeCloseToArray';
import { colorHSV2RGB } from '../colorHSV2RGB';

describe( 'colorHSV2RGB', () => {
  it( 'converts the input HSV into RGB', () => {
    const subject = colorHSV2RGB( [ 152.0 / 360.0, 0.59, 0.86 ] );

    expect( subject ).toBeCloseToArray( [
      90.0 / 255.0,
      219.0 / 255.0,
      159.0 / 255.0,
    ] );
  } );
} );
