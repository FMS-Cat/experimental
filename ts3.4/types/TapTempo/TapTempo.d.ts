export declare class TapTempo {
    private __bpm;
    private __lastTap;
    private __lastBeat;
    private __lastTime;
    private __calc;
    readonly beatDuration: number;
    bpm: number;
    readonly beat: number;
    reset(): void;
    nudge(amount: number): void;
    tap(): void;
}
