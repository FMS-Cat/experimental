import { Observer, notifyObservers } from '../notifyObservers';

describe( 'notifyObservers', () => {
  it( 'does work without arguments', () => {
    const targetArray: string[] = [];

    const observers = new Set<Observer>();

    observers.add( () => targetArray.push( 'a' ) );
    observers.add( () => targetArray.push( 'b' ) );

    notifyObservers( observers );

    expect( targetArray ).toContain( 'a' );
    expect( targetArray ).toContain( 'b' );
  } );

  it( 'does work with an argument', () => {
    const targetArray: string[] = [];

    const observers = new Set<Observer<string>>();

    observers.add( ( prefix ) => targetArray.push( prefix + 'a' ) );
    observers.add( ( prefix ) => targetArray.push( prefix + 'b' ) );

    notifyObservers( observers, 'haha' );

    expect( targetArray ).toContain( 'hahaa' );
    expect( targetArray ).toContain( 'hahab' );
  } );
} );
