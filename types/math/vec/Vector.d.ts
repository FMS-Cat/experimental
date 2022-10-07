/**
 * A Vector.
 */
export declare abstract class Vector<T extends Vector<T>> {
    abstract elements: number[];
    /**
     * The length of this.
     * a.k.a. `magnitude`
     */
    get length(): number;
    /**
     * The squared length of this.
     */
    get lengthSq(): number;
    /**
     * The manhattan length of this.
     */
    get manhattanLength(): number;
    /**
     * A normalized Vector3 of this.
     */
    get normalized(): T;
    /**
     * This but negated.
     */
    get negated(): T;
    /**
     * This but each component is the absolute.
     */
    get abs(): T;
    /**
     * Clone this.
     */
    clone(): T;
    /**
     * Add one or more Vector into this.
     * @param vectors Other Vectors
     */
    add(...vectors: T[]): T;
    /**
     * Substract this from another Vector.
     * @param v Another vector
     */
    sub(vector: T): T;
    /**
     * Multiply one or more Vector with this.
     * @param vectors Other Vectors
     */
    multiply(...vectors: T[]): T;
    /**
     * Divide this from another Vector.
     * @param vector Another Vector
     */
    divide(vector: T): T;
    /**
     * Scale this by scalar.
     * a.k.a. `multiplyScalar`
     * @param scalar A scalar
     */
    scale(scalar: number): T;
    /**
     * Dot two Vectors.
     * @param vector Another vector
     */
    dot(vector: T): number;
    protected abstract __new(v: number[]): T;
}
