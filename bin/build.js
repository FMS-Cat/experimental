const path = require( 'path' );
const esbuild = require( 'esbuild' );
const packageJson = require( '../package.json' );

// == env ==========================================================================================
const SERVE = process.env.SERVE === '1';

// == banner =======================================================================================
const copyright = '(c) 2019-2022 0b5vr';
const licenseName = 'MIT License';
const licenseUri = 'https://github.com/0b5vr/experimental-npm/blob/release/LICENSE';

const bannerTextDev = `/*!
* ${ packageJson.name } v${ packageJson.version }
* ${ packageJson.description }
*
* Copyright ${ copyright }
* ${ packageJson.name } is distributed under ${ licenseName }
* ${ licenseUri }
*/`;

const bannerTextProd = `// ${ copyright } - ${ licenseUri }`;

// == build ========================================================================================
function createBuildOptions( format, dev, next ) {
  const filename = `0b5vr-experimental.${ next ? 'next' : format }${ dev ? '' : '.min' }.js`;

  /** @type {esbuild.BuildOptions} */
  const buildOptions = {
    entryPoints: [ path.resolve( __dirname, '../src/index.ts' ) ],
    bundle: true,
    outfile: path.resolve( __dirname, '../dist', filename ),
    format,
    target: next ? 'esnext' : 'es6',
    globalName: 'OBSVR_EXPERIMENTAL',
    sourcemap: true,
    minify: !dev,
    banner: {
      js: dev ? bannerTextDev : bannerTextProd,
    },
  };

  return buildOptions;
}

esbuild.build( createBuildOptions( 'iife', true ) );
esbuild.build( createBuildOptions( 'iife', false ) );
esbuild.build( createBuildOptions( 'cjs', true ) );
esbuild.build( createBuildOptions( 'cjs', false ) );
esbuild.build( createBuildOptions( 'esm', true ) );
esbuild.build( createBuildOptions( 'esm', false ) );
esbuild.build( createBuildOptions( 'esm', true, true ) );
esbuild.build( createBuildOptions( 'esm', false, true ) );

// == serve ========================================================================================
if ( SERVE ) {
  esbuild.serve( {
    servedir: path.resolve( __dirname, '..' ),
    port: 3800,
  }, createBuildOptions( 'esm', true ) );
}
