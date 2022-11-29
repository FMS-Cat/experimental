import { Matrix4, Quaternion, Vector3 } from '@0b5vr/experimental';

export default ( ( { divContainer } ) => {
  const t = Matrix4.translate( new Vector3( [ 1.0, 2.0, 3.0 ] ) );
  const r = Quaternion.fromAxisAngle( new Vector3( [ 0.0, 1.0, 0.0 ] ), 0.25 * Math.PI ).matrix4;
  const s = Matrix4.scaleScalar( 5.0 );

  const matrix = Matrix4.multiply( t, r, s );

  divContainer.textContent = matrix;
} );
