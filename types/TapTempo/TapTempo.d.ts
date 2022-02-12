export declare class TapTempo {
    private __bpm;
    private __lastTap;
    private __lastBeat;
    private __lastTime;
    private __calc;
    get beatDuration(): number;
    get bpm(): number;
    set bpm(bpm: number);
    get beat(): number;
    reset(): void;
    nudge(amount: number): void;
    tap(): void;
}
