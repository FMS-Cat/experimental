import '../../../tests/matchers/toBeCloseToArray';
import { RawMatrix3 } from '../../mat3/RawMatrix3';
import { eulerFromMat3 } from '../eulerFromMat3';

const mat3X45Y45Z45: RawMatrix3 = [
  0.500,  0.500, -0.707,
  -0.146,  0.854,  0.500,
  0.854, -0.146,  0.500,
];

const mat3X30YN50Z40: RawMatrix3 = [
  0.492,  0.413,  0.766,
  -0.850,  0.417,  0.321,
  -0.187, -0.809,  0.557,
];

const mat3XN150YN15Z170: RawMatrix3 = [
  -0.951,  0.168,  0.259,
  0.023,  0.875, -0.483,
  -0.308, -0.453, -0.837,
];

const mat3X30Y90Z70: RawMatrix3 = [
  0.000,  0.000, -1.000,
  -0.643,  0.766,  0.000,
  0.766,  0.643,  0.000,
];

const mat3X120YN90Z20: RawMatrix3 = [
  0.000,  0.000,  1.000,
  -0.643, -0.766,  0.000,
  0.766, -0.643,  0.000,
];

describe( 'eulerFromMat3', () => {
  it( 'returns an euler angles out of a matrix3 (XYZ)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'XYZ' );
    expect( subject ).toBeCloseToArray( [ 0.785, 0.785, 0.785 ] );
  } );

  it( 'returns an euler angles out of a matrix3 (XZY)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'XZY' );
    expect( subject ).toBeCloseToArray( [ 0.170, 0.955, 0.524 ] );
  } );

  it( 'returns an euler angles out of a matrix3 (YXZ)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'YXZ' );
    expect( subject ).toBeCloseToArray( [ 0.524, 0.955, 0.170 ] );
  } );

  it( 'returns an euler angles out of a matrix3 (YZX)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'YZX' );
    expect( subject ).toBeCloseToArray( [ 0.530, 1.041, 0.147 ] );
  } );

  it( 'returns an euler angles out of a matrix3 (ZXY)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'ZXY' );
    expect( subject ).toBeCloseToArray( [ 0.147, 1.041, 0.530 ] );
  } );

  it( 'returns an euler angles out of a matrix3 (ZYX)', () => {
    const subject = eulerFromMat3( mat3X45Y45Z45, 'ZYX' );
    expect( subject ).toBeCloseToArray( [ 0.284, 1.023, 0.285 ] );
  } );

  it( 'performs a "y is negative" case', () => {
    const subject = eulerFromMat3( mat3X30YN50Z40, 'XYZ' );
    expect( subject ).toBeCloseToArray( [ 0.524, -0.873, 0.698 ] );
  } );

  it( 'performs a "two big revolutions" case (X and Z are big)', () => {
    const subject = eulerFromMat3( mat3XN150YN15Z170, 'XYZ' );
    expect( subject ).toBeCloseToArray( [ 0.524, -2.880, -0.174 ] );
  } );

  it( 'performs an edge case properly (y is 90deg)', () => {
    const subject = eulerFromMat3( mat3X30Y90Z70, 'XYZ' );
    expect( subject ).toBeCloseToArray( [ -0.698, 1.571, 0.0 ] );
  } );

  it( 'performs an edge case properly (y is -90deg)', () => {
    const subject = eulerFromMat3( mat3X120YN90Z20, 'XYZ' );
    expect( subject ).toBeCloseToArray( [ 2.443, -1.571, 0.0 ] );
  } );
} );
