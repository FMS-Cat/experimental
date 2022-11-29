import { ClockRealtime, getYugopText } from '@0b5vr/experimental';

export default ( { divContainer } ) => {
  let unmounted = false;

  const clock = new ClockRealtime();
  clock.play();

  const update = () => {
    if ( unmounted ) { return; }

    clock.update();

    divContainer.textContent = getYugopText( '@0b5vr/experimental', clock.time );

    requestAnimationFrame( update );
  };
  requestAnimationFrame( update );

  return () => {
    unmounted = true;
  };
};
