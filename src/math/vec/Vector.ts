import { vecAbs } from './vecAbs';
import { vecAdd } from './vecAdd';
import { vecDivide } from './vecDivide';
import { vecDot } from './vecDot';
import { vecLength } from './vecLength';
import { vecLengthSq } from './vecLengthSq';
import { vecManhattanLength } from './vecManhattanLength';
import { vecMultiply } from './vecMultiply';
import { vecNeg } from './vecNeg';
import { vecNormalize } from './vecNormalize';
import { vecScale } from './vecScale';
import { vecSub } from './vecSub';

/**
 * A Vector.
 */
export abstract class Vector<T extends Vector<T>> {
  public abstract elements: number[];

  /**
   * The length of this.
   * a.k.a. `magnitude`
   */
  public get length(): number {
    return vecLength( this.elements );
  }

  /**
   * The squared length of this.
   */
  public get lengthSq(): number {
    return vecLengthSq( this.elements );
  }

  /**
   * The manhattan length of this.
   */
  public get manhattanLength(): number {
    return vecManhattanLength( this.elements );
  }

  /**
   * A normalized Vector3 of this.
   */
  public get normalized(): T {
    return this.__new( vecNormalize( this.elements ) );
  }

  /**
   * This but negated.
   */
  public get negated(): T {
    return this.__new( vecNeg( this.elements ) );
  }

  /**
   * This but each component is the absolute.
   */
  public get abs(): T {
    return this.__new( vecAbs( this.elements ) );
  }

  /**
   * Clone this.
   */
  public clone(): T {
    return this.__new( this.elements.concat() );
  }

  /**
   * Add one or more Vector into this.
   * @param vectors Other Vectors
   */
  public add( ...vectors: T[] ): T {
    return this.__new( vecAdd( this.elements, ...vectors.map( ( v ) => v.elements ) ) );
  }

  /**
   * Substract this from another Vector.
   * @param v Another vector
   */
  public sub( vector: T ): T {
    return this.__new( vecSub( this.elements, vector.elements ) );
  }

  /**
   * Multiply one or more Vector with this.
   * @param vectors Other Vectors
   */
  public multiply( ...vectors: T[] ): T {
    return this.__new( vecMultiply( this.elements, ...vectors.map( ( v ) => v.elements ) ) );
  }

  /**
   * Divide this from another Vector.
   * @param vector Another Vector
   */
  public divide( vector: T ): T {
    return this.__new( vecDivide( this.elements, vector.elements ) );
  }

  /**
   * Scale this by scalar.
   * a.k.a. `multiplyScalar`
   * @param scalar A scalar
   */
  public scale( scalar: number ): T {
    return this.__new( vecScale( this.elements, scalar ) );
  }

  /**
   * Dot two Vectors.
   * @param vector Another vector
   */
  public dot( vector: T ): number {
    return vecDot( this.elements, vector.elements );
  }

  protected abstract __new( v: number[] ): T;
}
