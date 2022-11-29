import type { RawMatrix2 } from './RawMatrix2';

export function mat2Determinant( m: RawMatrix2 ): number {
  return m[ 0 ] * m[ 3 ] - m[ 2 ] * m[ 1 ];
}
