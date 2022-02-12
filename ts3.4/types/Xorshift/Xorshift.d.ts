export declare class Xorshift {
    seed: number;
    constructor(seed?: number);
    gen(seed?: number): number;
    set(seed?: number): void;
}
export default Xorshift;
