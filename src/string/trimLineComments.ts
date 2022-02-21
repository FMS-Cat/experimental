export function trimLineComments( text: string, token = '//' ): string {
  const tokenLength = token.length;

  let ret = '';

  while ( text.length > 0 ) {
    const iSearch = text.search( token );
    if ( iSearch === -1 ) {
      ret += text;
      break;
    }

    ret += text.substring( 0, iSearch );

    let j = iSearch + tokenLength;
    const len = text.length;
    while ( j < len ) {
      if ( text[ j ] === '\n' ) {
        break;
      }

      j ++;
    }

    text = text.substring( j );
  }

  return ret;
}
