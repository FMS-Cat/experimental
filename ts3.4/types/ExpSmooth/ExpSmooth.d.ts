/**
 * Do exp smoothing
 */
export declare class ExpSmooth {
    factor: number;
    target: number;
    value: number;
    update(deltaTime: number): number;
}
