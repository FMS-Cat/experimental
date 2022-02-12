/**
 * Class that deals with time.
 * In this base class, you need to set time manually from `Automaton.update()`.
 * Best for sync with external clock stuff.
 */
export declare class Clock {
    /**
     * Its current time.
     */
    protected __time: number;
    /**
     * Its deltaTime of last update.
     */
    protected __deltaTime: number;
    /**
     * Whether its currently playing or not.
     */
    protected __isPlaying: boolean;
    readonly time: number;
    readonly deltaTime: number;
    readonly isPlaying: boolean;
    /**
     * Update the clock.
     * @param time Time. You need to set manually when you are using manual Clock
     */
    update(time?: number): void;
    /**
     * Start the clock.
     */
    play(): void;
    /**
     * Stop the clock.
     */
    pause(): void;
    /**
     * Set the time manually.
     * @param time Time
     */
    setTime(time: number): void;
}
