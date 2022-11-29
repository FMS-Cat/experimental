import { colorToHex, oetfRec709 } from '@0b5vr/experimental';

export default ( { divContainer } ) => {
  const colorRaw = [ 1.0, 0.5, 0.0 ];
  const colorLinear = oetfRec709( colorRaw );

  divContainer.innerHTML = '';

  const divRaw = document.createElement( 'div' );
  divRaw.style.width = '32px';
  divRaw.style.height = '32px';
  divRaw.style.background = colorToHex( colorRaw );
  divContainer.appendChild( divRaw );

  const divLinear = document.createElement( 'div' );
  divLinear.style.width = '32px';
  divLinear.style.height = '32px';
  divLinear.style.background = colorToHex( colorLinear );
  divContainer.appendChild( divLinear );
};
