const dts = require( 'dts-bundle' );
const path = require( 'path' );

dts.bundle( {
  name: '@0b5vr/experimental',
  main: path.resolve( __dirname, '../types/index.d.ts' ),
  out: path.resolve( __dirname, '../dist/0b5vr-experimental.d.ts' ),
} );
