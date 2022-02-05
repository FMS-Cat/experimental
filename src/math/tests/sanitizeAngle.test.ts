import { sanitizeAngle } from '../sanitizeAngle';

describe( 'sanitizeAngle', () => {
  it( 'should do nothing to 0deg', () => {
    expect( sanitizeAngle( 0.0 ) ).toBeCloseTo( 0.0 );
  } );

  it( 'should do nothing to -90deg', () => {
    expect( sanitizeAngle( -Math.PI / 2.0 ) ).toBeCloseTo( -Math.PI / 2.0 );
  } );

  it( 'should sanitize 210deg to -150deg', () => {
    expect( sanitizeAngle( 3.665 ) ).toBeCloseTo( -2.618 );
  } );

  it( 'should sanitize 540deg to 0deg', () => {
    expect( sanitizeAngle( 12.5664 ) ).toBeCloseTo( 0.0 );
  } );
} );
