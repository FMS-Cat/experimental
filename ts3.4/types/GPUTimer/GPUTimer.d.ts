import { Pool } from '../Pool/Pool';
export declare class GPUTimer {
    queries: Pool<WebGLQuery>;
    stack: Promise<number>[];
    ext: any;
    readonly gl: WebGL2RenderingContext;
    private __loopTasks;
    static isSupported(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean;
    constructor(gl: WebGL2RenderingContext);
    update(): void;
    measure(func: () => void): Promise<number>;
    check(query: WebGLQuery): Promise<number>;
}
