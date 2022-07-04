export interface STNICCCFrameIndexed {
    needsClear: boolean;
    indexedMode: true;
    palette: number[];
    vertices: number[];
    polygons: {
        colorIndex: number;
        indices: number[];
    }[];
}
export interface STNICCCFrameNonIndexed {
    needsClear: boolean;
    indexedMode: false;
    palette: number[];
    polygons: {
        colorIndex: number;
        vertices: number[];
    }[];
}
export declare type STNICCCFrame = STNICCCFrameIndexed | STNICCCFrameNonIndexed;
