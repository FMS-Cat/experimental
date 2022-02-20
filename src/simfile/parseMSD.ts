/**
 * Parse MSD file from a text.
 * Heavily referenced the StepMania code.
 *
 * See: https://github.com/openitg/openitg/blob/master/src/MsdFile.cpp
 */
export function parseMSD( text: string ): string[][] {
  // inex of current text we're reading
  let indexValueStart = -1;

  // value we're currently reading
  let currentValue: string[] | null = null;

  // return value
  const values: string[][] = [];

  let i = 0;
  const len = text.length;

  while ( i < len ) {
    // '//' starts a comment
    if ( i + 1 < len && text[ i ] === '/' && text[ i + 1 ] === '/' ) {
      // skip until the line break
      do {
        i ++;
      } while ( i < len && text[ i ] !== '\n' );

      continue;
    }

    // scary '#'
    if ( currentValue && text[ i ] === '#' ) {
      // is this missing ';' patterns?
      let isFirstChar = true;

      let j = i - 1;
      while ( text[ j ] !== '\n' ) {
        if ( text[ j ] === ' ' || text[ j ] === '\t' ) {
          j --;
        } else {
          isFirstChar = false;
          break;
        }
      }

      if ( !isFirstChar ) {
        // the text just continues, nevermind
        i ++;
        continue;
      }

      // the missing ';' patterns
      // remove the lines after the previous value
      while ( j >= 0 && ( text[ j ] === '\n' || text[ j ] === '\r' ) ) {
        j --;
      }

      currentValue.push( text.substring( indexValueStart, j + 1 ) );
      currentValue = null;
    }

    // '#', start a new value
    if ( !currentValue && text[ i ] === '#' ) {
      currentValue = [];
      values.push( currentValue );
    }

    // garbage
    if ( !currentValue ) {
      i ++;
      continue;
    }

    // ':' and ';' end the current param
    if ( indexValueStart !== -1 && ( text[ i ] === ':' || text[ i ] === ';' ) ) {
      currentValue.push( text.substring( indexValueStart, i ) );
    }

    // '#' and ':' begin a new param
    if ( text[ i ] === '#' || text[ i ] === ':' ) {
      i ++;
      indexValueStart = i;
      continue;
    }

    // ';' ends the current value
    if ( text[ i ] === ';' ) {
      currentValue = null;
    }

    i ++;
  }

  // add unterminated value
  if ( currentValue ) {
    currentValue.push( text.substring( indexValueStart, i ) );
  }

  return values;
}
