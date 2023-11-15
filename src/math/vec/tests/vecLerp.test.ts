
describe( 'vecLerp', () => {
  it( 'returns a linear interpolation of two vectors', () => {
    const result = vecLerp(
      [ 1.0, 2.0, 3.0 ],
      [ 4.0, 4.0, 4.0 ],
      0.5,
    );
    expect( result ).toEqual( [ 2.5, 3.0, 3.5 ] );
  } );

  it( 'returns a linear interpolation even when t is outside the [0, 1] range', () => {
    const result = vecLerp(
      [ 1.0, 2.0, 3.0 ],
      [ 4.0, 4.0, 4.0 ],
      1.5,
    );
    expect( result ).toEqual( [ 5.5, 5.0, 4.5 ] );
  } );
} );
import { vecLerp } from '../vecLerp';
