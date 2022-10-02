import { Euler, Quaternion, Vector3 } from '@0b5vr/experimental';

export default ( ( { divContainer } ) => {
  const quat = Quaternion.fromAxisAngle( new Vector3( [ 1.0, 1.0, 1.0 ] ), 1.0 );

  divContainer.textContent = Euler.fromQuaternion( quat, 'XYZ' );
} );
