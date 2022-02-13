import '../../../tests/matchers/toBeCloseToArray';
import { mat3CreateNormalMatrix } from '../mat3CreateNormalMatrix';
import type { RawMatrix3 } from '../RawMatrix3';
import type { RawMatrix4 } from '../../mat4/RawMatrix4';

const rawMatrixLookAtFrom345: RawMatrix4 = [
  0.8574929257125442, 0, -0.5144957554275265, 0,
  -0.2910427500435996, 0.824621125123532, -0.48507125007266594, 0,
  0.4242640687119285, 0.565685424949238, 0.7071067811865475, 0,
  3, 4, 5, 1
];

const rawMatrixLookAtFrom345Normal: RawMatrix3 = [
  0.857, 0.0, -0.514,
  -0.291, 0.825, -0.485,
  0.424, 0.566, 0.707,
];

describe( 'mat3CreateNormalMatrix', () => {
  it( 'returns a determinant of the matrix', () => {
    const subject = mat3CreateNormalMatrix( rawMatrixLookAtFrom345 );
    expect( subject ).toBeCloseToArray( rawMatrixLookAtFrom345Normal );
  } );
} );
