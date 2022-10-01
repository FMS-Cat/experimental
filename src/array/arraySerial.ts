export const arraySerial = ( count: number ): number[] => (
  [ ...Array( count ) ].map( ( _, i ) => i )
);
