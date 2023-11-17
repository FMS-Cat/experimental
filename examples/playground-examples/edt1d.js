import { edt1d } from '@0b5vr/experimental';

export default ( ( { divContainer } ) => {
  const data = new Float32Array( [ 0, 4, 4, 4, 4, 4, 4, 4, 0, 0 ] );
  edt1d( data, 0, 1, data.length );

  divContainer.textContent = `[ ${ data.join( ', ' ) } ]`;
} );
