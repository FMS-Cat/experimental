/**
 * Critically Damped Spring
 *
 * Shoutouts to Keijiro Takahashi
 */
export declare class CDS {
    factor: number;
    ratio: number;
    velocity: number;
    value: number;
    target: number;
    update(deltaTime: number): number;
}
