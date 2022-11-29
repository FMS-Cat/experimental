import { colorTurbo, colorToHex } from '@0b5vr/experimental';

export default ( { divContainer } ) => {
  divContainer.textContent = '';

  const canvas = document.createElement( 'canvas' );
  canvas.width = 512;
  canvas.height = 32;
  divContainer.appendChild( canvas );

  const context = canvas.getContext( '2d' );

  for ( let i = 0; i < 512; i ++ ) {
    context.fillStyle = colorToHex( colorTurbo( i / 511.0 ) );
    context.fillRect( i, 0, 1, 32 );
  }
};
