/**
 * An utility type definition to use along with {@link notifyObservers}.
 */
export type Observer<TEvent = void> = ( event: TEvent ) => void;

/**
 * A bare function to notify observers.
 * The incredibly cheap implementation of the observer pattern.
 *
 * Use along with the utility type definition {@link Observer}.
 *
 * @example
 * ```ts
 * const observers = new Set<Observer<string>>();
 *
 * observers.add( ( text ) => console.log( text ) );
 * observers.add( ( text ) => alert( text ) );
 *
 * notifyObservers( observers, 'wenis' );
 * ```
 *
 * @param observers The iterator of observers
 * @param param The param you want to give to observers
 */
export function notifyObservers( observers: Iterable<Observer<void>> ): void;
export function notifyObservers<T>( observers: Iterable<Observer<T>>, param: T ): void;
export function notifyObservers( observers: Iterable<Observer<any>>, param?: any ): void {
  for ( const observer of observers ) {
    observer( param );
  }
}
