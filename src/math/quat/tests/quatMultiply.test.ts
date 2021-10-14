import '../../../tests/matchers/toBeCloseToArray';
import type { RawQuaternion } from '../RawQuaternion';
import { quatMultiply } from '../quatMultiply';

describe( 'quatMultiply', () => {
  it( 'returns a multiplication result of two quaternions', () => {
    const quatA: RawQuaternion = [ 0.183, 0.365, 0.548, 0.730 ];
    const quatB: RawQuaternion = [ 0.379, 0.455, 0.531, 0.606 ];
    const subject = quatMultiply( quatA, quatB );

    expect( subject ).toBeCloseToArray( [ 0.332, 0.664, 0.665, -0.084 ] );
  } );

  it( 'returns a multiplication result of three quaternions', () => {
    const quatA: RawQuaternion = [ 0.183, 0.365, 0.548, 0.730 ];
    const quatB: RawQuaternion = [ 0.379, 0.455, 0.531, 0.606 ];
    const quatC: RawQuaternion = [ 0.426, 0.474, 0.521, 0.568 ];
    const subject = quatMultiply( quatA, quatB, quatC );

    expect( subject ).toBeCloseToArray( [ 0.184, 0.447, 0.208, -0.850 ] );
  } );
} );
