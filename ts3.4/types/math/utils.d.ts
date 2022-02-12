/**
 * `lerp`, or `mix`
 */
export declare function lerp(a: number, b: number, x: number): number;
/**
 * `clamp`
 */
export declare function clamp(x: number, l: number, h: number): number;
/**
 * `clamp( x, 0.0, 1.0 )`
 */
export declare function saturate(x: number): number;
/**
 * Transform a value from input range to output range.
 */
export declare function range(x: number, x0: number, x1: number, y0: number, y1: number): number;
/**
 * `smoothstep` but not smooth
 */
export declare function linearstep(a: number, b: number, x: number): number;
/**
 * world famous `smoothstep` function
 */
export declare function smoothstep(a: number, b: number, x: number): number;
/**
 * `smoothstep` but more smooth
 */
export declare function smootherstep(a: number, b: number, x: number): number;
/**
 * `smoothstep` but WAY more smooth
 */
export declare function smootheststep(a: number, b: number, x: number): number;
