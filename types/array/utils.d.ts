/**
 * Shuffle given `array` using given `dice` RNG. **Destructive**.
 */
export declare function shuffleArray<T>(array: T[], dice?: () => number): T[];
/**
 * I like wireframe
 *
 * `triIndexToLineIndex( [ 0, 1, 2, 5, 6, 7 ] )` -> `[ 0, 1, 1, 2, 2, 0, 5, 6, 6, 7, 7, 5 ]`
 */
export declare function triIndexToLineIndex<T>(array: T[]): T[];
/**
 * `matrix2d( 3, 2 )` -> `[ 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 1, 2 ]`
 */
export declare function matrix2d(w: number, h: number): number[];
/**
 * See also: {@link matrix2d}
 */
export declare function matrix3d(w: number, h: number, d: number): number[];
