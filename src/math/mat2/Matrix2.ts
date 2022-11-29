import { mat2Determinant } from './mat2Determinant';
import { mat2Inverse } from './mat2Inverse';
import { mat2Multiply } from './mat2Multiply';
import { mat2Transpose } from './mat2Transpose';
import { vecScale } from '../vec/vecScale';
import type { RawMatrix2 } from './RawMatrix2';

const rawIdentityMatrix2: RawMatrix2 = [
  1.0, 0.0,
  0.0, 1.0,
];

/**
 * A Matrix2.
 */
export class Matrix2 {
  public elements: RawMatrix2;

  public constructor( v: RawMatrix2 = rawIdentityMatrix2 ) {
    this.elements = v;
  }

  /**
   * Itself but transposed.
   */
  public get transpose(): Matrix2 {
    return new Matrix2( mat2Transpose( this.elements ) );
  }

  /**
   * Its determinant.
   */
  public get determinant(): number {
    return mat2Determinant( this.elements );
  }

  /**
   * Itself but inverted.
   */
  public get inverse(): Matrix2 {
    return new Matrix2( mat2Inverse( this.elements ) );
  }

  public toString(): string {
    const m = this.elements.map( ( v ) => v.toFixed( 3 ) );
    return `Matrix2( ${ m[ 0 ] }, ${ m[ 2 ] }; ${ m[ 1 ] }, ${ m[ 3 ] } )`;
  }

  /**
   * Clone this.
   */
  public clone(): Matrix2 {
    return new Matrix2( this.elements.concat() as RawMatrix2 );
  }

  /**
   * Multiply this Matrix2 by one or more Matrix2s.
   */
  public multiply( ...matrices: Matrix2[] ): Matrix2 {
    return Matrix2.multiply( this, ...matrices );
  }

  /**
   * Multiply this Matrix3 by a scalar.
   */
  public scaleScalar( scalar: number ): Matrix2 {
    return new Matrix2( vecScale( this.elements, scalar ) );
  }

  /**
   * An identity Matrix4.
   */
  public static get identity(): Matrix2 {
    return new Matrix2( rawIdentityMatrix2 );
  }

  /**
   * Multiply two or more matrices.
   * @param matrices Matrices
   */
  public static multiply( ...matrices: Matrix2[] ): Matrix2 {
    if ( matrices.length === 0 ) {
      return Matrix2.identity;
    } else {
      return new Matrix2( mat2Multiply( ...matrices.map( ( m ) => m.elements ) ) );
    }
  }
}
