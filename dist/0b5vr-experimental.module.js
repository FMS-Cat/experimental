/*!
* @0b5vr/experimental v0.7.0
* Experimental edition of 0b5vr
*
* Copyright (c) 2019-2020 0b5vr
* @0b5vr/experimental is distributed under MIT License
* https://github.com/0b5vr/experimental-npm/blob/master/LICENSE
*/
// yoinked from https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
function binarySearch(array, elementOrCompare) {
    if (typeof elementOrCompare !== 'function') {
        return binarySearch(array, (element) => (element < elementOrCompare));
    }
    const compare = elementOrCompare;
    let start = 0;
    let end = array.length;
    while (start < end) {
        const center = (start + end) >> 1;
        const centerElement = array[center];
        const compareResult = compare(centerElement);
        if (compareResult) {
            start = center + 1;
        }
        else {
            end = center;
        }
    }
    return start;
}

function arraySetDelete(array, value) {
    const index = array.indexOf(value);
    if (index === -1) {
        return false;
    }
    array.splice(index, 1);
    return true;
}
function arraySetHas(array, value) {
    return array.indexOf(value) !== -1;
}
function arraySetAdd(array, value) {
    const index = array.indexOf(value);
    if (index !== -1) {
        return false;
    }
    array.push(value);
    return true;
}
function arraySetUnion(a, b) {
    const out = [...a];
    b.forEach((v) => {
        if (!arraySetHas(out, v)) {
            out.push(v);
        }
    });
    return out;
}
function arraySetDiff(from, diff) {
    const out = [...from];
    diff.forEach((v) => {
        arraySetDelete(out, v);
    });
    return out;
}

/**
 * `[ -1, -1, 1, -1, -1, 1, 1, 1 ]`
 */
const TRIANGLE_STRIP_QUAD = [-1, -1, 1, -1, -1, 1, 1, 1];
/**
 * `[ -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0 ]`
 */
const TRIANGLE_STRIP_QUAD_3D = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
/**
 * `[ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ]`
 */
const TRIANGLE_STRIP_QUAD_NORMAL = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
/**
 * `[ 0, 0, 1, 0, 0, 1, 1, 1 ]`
 */
const TRIANGLE_STRIP_QUAD_UV = [0, 0, 1, 0, 0, 1, 1, 1];

/**
 * Shuffle given `array` using given `dice` RNG. **Destructive**.
 */
function shuffleArray(array, dice) {
    const f = dice ? dice : () => Math.random();
    for (let i = 0; i < array.length - 1; i++) {
        const ir = i + Math.floor(f() * (array.length - i));
        const temp = array[ir];
        array[ir] = array[i];
        array[i] = temp;
    }
    return array;
}
/**
 * I like wireframe
 *
 * `triIndexToLineIndex( [ 0, 1, 2, 5, 6, 7 ] )` -> `[ 0, 1, 1, 2, 2, 0, 5, 6, 6, 7, 7, 5 ]`
 */
function triIndexToLineIndex(array) {
    const ret = [];
    for (let i = 0; i < array.length / 3; i++) {
        const head = i * 3;
        ret.push(array[head], array[head + 1], array[head + 1], array[head + 2], array[head + 2], array[head]);
    }
    return ret;
}
/**
 * `matrix2d( 3, 2 )` -> `[ 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 1, 2 ]`
 */
function matrix2d(w, h) {
    const arr = [];
    for (let iy = 0; iy < h; iy++) {
        for (let ix = 0; ix < w; ix++) {
            arr.push(ix, iy);
        }
    }
    return arr;
}
/**
 * See also: {@link matrix2d}
 */
function matrix3d(w, h, d) {
    const arr = [];
    for (let iz = 0; iz < d; iz++) {
        for (let iy = 0; iy < h; iy++) {
            for (let ix = 0; ix < w; ix++) {
                arr.push(ix, iy, iz);
            }
        }
    }
    return arr;
}

/**
 * Critically Damped Spring
 *
 * Shoutouts to Keijiro Takahashi
 */
class CDS {
    constructor() {
        this.factor = 100.0;
        this.ratio = 1.0;
        this.velocity = 0.0;
        this.value = 0.0;
        this.target = 0.0;
    }
    update(deltaTime) {
        this.velocity += (-this.factor * (this.value - this.target)
            - 2.0 * this.velocity * Math.sqrt(this.factor) * this.ratio) * deltaTime;
        this.value += this.velocity * deltaTime;
        return this.value;
    }
}

/**
 * Class that deals with time.
 * In this base class, you need to set time manually from `Automaton.update()`.
 * Best for sync with external clock stuff.
 */
class Clock {
    constructor() {
        /**
         * Its current time.
         */
        this.__time = 0.0;
        /**
         * Its deltaTime of last update.
         */
        this.__deltaTime = 0.0;
        /**
         * Whether its currently playing or not.
         */
        this.__isPlaying = false;
    }
    /**
     * Its current time.
     */
    get time() { return this.__time; }
    /**
     * Its deltaTime of last update.
     */
    get deltaTime() { return this.__deltaTime; }
    /**
     * Whether its currently playing or not.
     */
    get isPlaying() { return this.__isPlaying; }
    /**
     * Update the clock.
     * @param time Time. You need to set manually when you are using manual Clock
     */
    update(time) {
        const prevTime = this.__time;
        this.__time = time || 0.0;
        this.__deltaTime = this.__time - prevTime;
    }
    /**
     * Start the clock.
     */
    play() {
        this.__isPlaying = true;
    }
    /**
     * Stop the clock.
     */
    pause() {
        this.__isPlaying = false;
    }
    /**
     * Set the time manually.
     * @param time Time
     */
    setTime(time) {
        this.__time = time;
    }
}

/**
 * Class that deals with time.
 * This is "frame" type clock, the frame increases every {@link ClockFrame#update} call.
 * @param fps Frames per second
 */
class ClockFrame extends Clock {
    constructor(fps = 60) {
        super();
        /**
         * Its current frame.
         */
        this.__frame = 0;
        this.__fps = fps;
    }
    /**
     * Its current frame.
     */
    get frame() { return this.__frame; }
    /**
     * Its fps.
     */
    get fps() { return this.__fps; }
    /**
     * Update the clock. It will increase the frame by 1.
     */
    update() {
        if (this.__isPlaying) {
            this.__time = this.__frame / this.__fps;
            this.__deltaTime = 1.0 / this.__fps;
            this.__frame++;
        }
        else {
            this.__deltaTime = 0.0;
        }
    }
    /**
     * Set the time manually.
     * The set time will be converted into internal frame count, so the time will not be exactly same as set one.
     * @param time Time
     */
    setTime(time) {
        this.__frame = Math.floor(this.__fps * time);
        this.__time = this.__frame / this.__fps;
    }
}

/**
 * Class that deals with time.
 * This is "realtime" type clock, the time goes on as real world.
 */
class ClockRealtime extends Clock {
    constructor() {
        super(...arguments);
        /**
         * "You set the time manually to `__rtTime` when it's `__rtDate`."
         */
        this.__rtTime = 0.0;
        /**
         * "You set the time manually to `__rtTime` when it's `__rtDate`."
         */
        this.__rtDate = performance.now();
    }
    /**
     * The clock is realtime. yeah.
     */
    get isRealtime() { return true; }
    /**
     * Update the clock. Time is calculated based on time in real world.
     */
    update() {
        const now = performance.now();
        if (this.__isPlaying) {
            const prevTime = this.__time;
            const deltaDate = (now - this.__rtDate);
            this.__time = this.__rtTime + deltaDate / 1000.0;
            this.__deltaTime = this.time - prevTime;
        }
        else {
            this.__rtTime = this.time;
            this.__rtDate = now;
            this.__deltaTime = 0.0;
        }
    }
    /**
     * Set the time manually.
     * @param time Time
     */
    setTime(time) {
        this.__time = time;
        this.__rtTime = this.time;
        this.__rtDate = performance.now();
    }
}

// yoinked from https://github.com/mapbox/tiny-sdf (BSD 2-Clause)
// implements http://people.cs.uchicago.edu/~pff/papers/dt.pdf
/**
 * Compute a one dimensional edt from the source data.
 * Returning distance will be squared.
 * Intended to be used internally in {@link edt2d}.
 *
 * @param data Data of the source
 * @param offset Offset of the source from beginning
 * @param stride Stride of the source
 * @param length Length of the source
 */
function edt1d(data, offset, stride, length) {
    // index of rightmost parabola in lower envelope
    let k = 0;
    // locations of parabolas in lower envelope
    const v = new Float32Array(length);
    v[0] = 0.0;
    // locations of boundaries between parabolas
    const z = new Float32Array(length + 1);
    z[0] = -Infinity;
    z[1] = Infinity;
    // create a straight array of input data
    const f = new Float32Array(length);
    for (let q = 0; q < length; q++) {
        f[q] = data[offset + q * stride];
    }
    // compute lower envelope
    for (let q = 1; q < length; q++) {
        let s = 0.0;
        while (0 <= k) {
            s = (f[q] + q * q - f[v[k]] - v[k] * v[k]) / (2.0 * q - 2.0 * v[k]);
            if (s <= z[k]) {
                k--;
            }
            else {
                break;
            }
        }
        k++;
        v[k] = q;
        z[k] = s;
        z[k + 1] = Infinity;
    }
    k = 0;
    // fill in values of distance transform
    for (let q = 0; q < length; q++) {
        while (z[k + 1] < q) {
            k++;
        }
        const qSubVK = q - v[k];
        data[offset + q * stride] = f[v[k]] + qSubVK * qSubVK;
    }
}
/**
 * Compute a two dimensional edt from the source data.
 * Returning distance will be squared.
 *
 * @param data Data of the source.
 * @param width Width of the source.
 * @param height Height of the source.
 */
function edt2d(data, width, height) {
    for (let x = 0; x < width; x++) {
        edt1d(data, x, width, height);
    }
    for (let y = 0; y < height; y++) {
        edt1d(data, y * width, 1, width);
    }
}

/**
 * `lerp`, or `mix`
 */
function lerp(a, b, x) {
    return a + (b - a) * x;
}
/**
 * `clamp`
 */
function clamp(x, l, h) {
    return Math.min(Math.max(x, l), h);
}
/**
 * `clamp( x, 0.0, 1.0 )`
 */
function saturate(x) {
    return clamp(x, 0.0, 1.0);
}
/**
 * Transform a value from input range to output range.
 */
function range(x, x0, x1, y0, y1) {
    return ((x - x0) * (y1 - y0) / (x1 - x0) + y0);
}
/**
 * `smoothstep` but not smooth
 */
function linearstep(a, b, x) {
    return saturate((x - a) / (b - a));
}
/**
 * world famous `smoothstep` function
 */
function smoothstep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * (3.0 - 2.0 * t);
}
/**
 * `smoothstep` but more smooth
 */
function smootherstep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}
/**
 * `smoothstep` but WAY more smooth
 */
function smootheststep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * t * t * (t * (t * (-20.0 * t + 70.0) - 84.0) + 35.0);
}

/**
 * Do exp smoothing
 */
class ExpSmooth {
    constructor() {
        this.factor = 10.0;
        this.target = 0.0;
        this.value = 0.0;
    }
    update(deltaTime) {
        this.value = lerp(this.target, this.value, Math.exp(-this.factor * deltaTime));
        return this.value;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Pool {
    constructor(array) {
        this.index = 0;
        this.array = array;
    }
    get current() {
        return this.array[this.index];
    }
    next() {
        this.index = (this.index + 1) % this.array.length;
        return this.current;
    }
}

class GPUTimer {
    constructor(gl) {
        this.gl = gl;
        const queries = new Array(1024).fill(1).map(() => gl.createQuery());
        this.queries = new Pool(queries);
        this.stack = [];
        this.ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
        this.__loopTasks = new Set();
        // loop
        const update = () => {
            this.update();
            requestAnimationFrame(update);
        };
        update();
    }
    static isSupported(gl) {
        return new Set(gl.getSupportedExtensions()).has('EXT_disjoint_timer_query_webgl2');
    }
    update() {
        Array.from(this.__loopTasks).forEach((task) => task());
    }
    measure(func) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gl } = this;
            if (this.stack.length !== 0) {
                gl.endQuery(this.ext.TIME_ELAPSED_EXT);
                const promiseFinishingPrev = this.check(this.queries.current);
                this.stack = this.stack.map((promiseAccum) => __awaiter(this, void 0, void 0, function* () {
                    return (yield promiseAccum) + (yield promiseFinishingPrev);
                }));
            }
            this.stack.push(Promise.resolve(0.0));
            gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.queries.next());
            func();
            gl.endQuery(this.ext.TIME_ELAPSED_EXT);
            const promiseAccum = this.stack.pop();
            const promiseThis = this.check(this.queries.current);
            if (this.stack.length !== 0) {
                this.stack = this.stack.map((promiseAccum) => __awaiter(this, void 0, void 0, function* () {
                    return (yield promiseAccum) + (yield promiseThis);
                }));
                gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.queries.next());
            }
            return (yield promiseAccum) + (yield promiseThis);
        });
    }
    check(query) {
        const { gl } = this;
        return new Promise((resolve) => {
            const task = () => {
                const isAvailable = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE);
                if (isAvailable) {
                    this.__loopTasks.delete(task);
                    resolve(gl.getQueryParameter(query, gl.QUERY_RESULT) * 0.001 * 0.001);
                }
            };
            this.__loopTasks.add(task);
        });
    }
}

/**
 * Useful for tap tempo
 * See also: {@link HistoryMeanCalculator}
 */
class HistoryMeanCalculator {
    constructor(length) {
        this.__recalcForEach = 0;
        this.__countUntilRecalc = 0;
        this.__history = [];
        this.__index = 0;
        this.__count = 0;
        this.__cache = 0;
        this.__length = length;
        this.__recalcForEach = length;
        for (let i = 0; i < length; i++) {
            this.__history[i] = 0;
        }
    }
    get mean() {
        const count = Math.min(this.__count, this.__length);
        return count === 0 ? 0.0 : this.__cache / count;
    }
    get recalcForEach() {
        return this.__recalcForEach;
    }
    set recalcForEach(value) {
        const delta = value - this.__recalcForEach;
        this.__recalcForEach = value;
        this.__countUntilRecalc = Math.max(0, this.__countUntilRecalc + delta);
    }
    reset() {
        this.__index = 0;
        this.__count = 0;
        this.__cache = 0;
        this.__countUntilRecalc = 0;
        for (let i = 0; i < this.__length; i++) {
            this.__history[i] = 0;
        }
    }
    push(value) {
        const prev = this.__history[this.__index];
        this.__history[this.__index] = value;
        this.__count++;
        this.__index = (this.__index + 1) % this.__length;
        if (this.__countUntilRecalc === 0) {
            this.recalc();
        }
        else {
            this.__countUntilRecalc--;
            this.__cache -= prev;
            this.__cache += value;
        }
    }
    recalc() {
        this.__countUntilRecalc = this.__recalcForEach;
        const sum = this.__history
            .slice(0, Math.min(this.__count, this.__length))
            .reduce((sum, v) => sum + v, 0);
        this.__cache = sum;
    }
}

/**
 * Useful for fps calc
 * See also: {@link HistoryMeanCalculator}
 */
class HistoryPercentileCalculator {
    constructor(length) {
        this.__history = [];
        this.__sorted = [];
        this.__index = 0;
        this.__length = length;
    }
    get median() {
        return this.percentile(50.0);
    }
    percentile(percentile) {
        if (this.__history.length === 0) {
            return 0.0;
        }
        return this.__sorted[Math.round(percentile * 0.01 * (this.__history.length - 1))];
    }
    reset() {
        this.__index = 0;
        this.__history = [];
        this.__sorted = [];
    }
    push(value) {
        const prev = this.__history[this.__index];
        this.__history[this.__index] = value;
        this.__index = (this.__index + 1) % this.__length;
        // remove the prev from sorted array
        if (this.__sorted.length === this.__length) {
            const prevIndex = binarySearch(this.__sorted, prev);
            this.__sorted.splice(prevIndex, 1);
        }
        const index = binarySearch(this.__sorted, value);
        this.__sorted.splice(index, 0, value);
    }
}

/**
 * @deprecated It's actually just a special case of {@link HistoryPercentileCalculator}
 */
class HistoryMedianCalculator extends HistoryPercentileCalculator {
    constructor(length) {
        super(length);
        console.warn('HistoryMedianCalculator: Deprecated. Use HistoryPercentileCalculator instead');
    }
}

/**
 * Convert a quaternion into a matrix4.
 *
 * Yoinked from Three.js.
 *
 * See: https://threejs.org/docs/#api/en/math/Matrix4.makeRotationFromQuaternion
 */
function mat4FromQuaternion(quat) {
    const x = quat[0];
    const y = quat[1];
    const z = quat[2];
    const w = quat[3];
    return [
        1.0 - 2.0 * y * y - 2.0 * z * z, 2.0 * x * y + 2.0 * z * w, 2.0 * x * z - 2.0 * y * w, 0.0,
        2.0 * x * y - 2.0 * z * w, 1.0 - 2.0 * x * x - 2.0 * z * z, 2.0 * y * z + 2.0 * x * w, 0.0,
        2.0 * x * z + 2.0 * y * w, 2.0 * y * z - 2.0 * x * w, 1.0 - 2.0 * x * x - 2.0 * y * y, 0.0,
        0.0, 0.0, 0.0, 1.0,
    ];
}

/**
 * Compose a matrix out of position, scale, and rotation.
 * Yoinked from Three.js.
 */
function mat4Compose(position, rotation, scale) {
    const matRot = mat4FromQuaternion(rotation);
    const sx = scale[0], sy = scale[1], sz = scale[2];
    return [
        matRot[0] * sx,
        matRot[1] * sx,
        matRot[2] * sx,
        0.0,
        matRot[4] * sy,
        matRot[5] * sy,
        matRot[6] * sy,
        0.0,
        matRot[8] * sz,
        matRot[9] * sz,
        matRot[10] * sz,
        0.0,
        position[0],
        position[1],
        position[2],
        1.0
    ];
}

/**
 * Return a determinant of given mat4.
 */
function mat4Determinant(m) {
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Generate a Quaternion out of a rotation matrix.
 * Yoinked from Three.js.
 */
function quatFromMatrix4(m) {
    const m11 = m[0], m12 = m[4], m13 = m[8], m21 = m[1], m22 = m[5], m23 = m[9], m31 = m[2], m32 = m[6], m33 = m[10], trace = m11 + m22 + m33;
    if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1.0);
        return [
            (m32 - m23) * s,
            (m13 - m31) * s,
            (m21 - m12) * s,
            0.25 / s
        ];
    }
    else if (m11 > m22 && m11 > m33) {
        const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
        return [
            0.25 * s,
            (m12 + m21) / s,
            (m13 + m31) / s,
            (m32 - m23) / s
        ];
    }
    else if (m22 > m33) {
        const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
        return [
            (m12 + m21) / s,
            0.25 * s,
            (m23 + m32) / s,
            (m13 - m31) / s
        ];
    }
    else {
        const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
        return [
            (m13 + m31) / s,
            (m23 + m32) / s,
            0.25 * s,
            (m21 - m12) / s
        ];
    }
}

/**
 * Return an euclidean length of given vector.
 */
function vecLength(vec) {
    return Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0.0));
}

/**
 * Decompose a matrix into a position, a scale, and a rotation.
 * Yoinked from Three.js.
 */
function mat4Decompose(m) {
    let sx = vecLength([m[0], m[1], m[2]]);
    const sy = vecLength([m[4], m[5], m[6]]);
    const sz = vecLength([m[8], m[9], m[10]]);
    // if determinant is negative, we need to invert one scale
    const det = mat4Determinant(m);
    if (det < 0) {
        sx = -sx;
    }
    const invSx = 1.0 / sx;
    const invSy = 1.0 / sy;
    const invSz = 1.0 / sz;
    const rotationMatrix = m.concat();
    rotationMatrix[0] *= invSx;
    rotationMatrix[1] *= invSx;
    rotationMatrix[2] *= invSx;
    rotationMatrix[4] *= invSy;
    rotationMatrix[5] *= invSy;
    rotationMatrix[6] *= invSy;
    rotationMatrix[8] *= invSz;
    rotationMatrix[9] *= invSz;
    rotationMatrix[10] *= invSz;
    return {
        position: [m[12], m[13], m[14]],
        scale: [sx, sy, sz],
        rotation: quatFromMatrix4(rotationMatrix),
    };
}

/**
 * Scale the given vector by a scalar.
 */
function vecScale(vec, scalar) {
    return vec.map((v) => v * scalar);
}

/**
 *  an inverse of given mat4.
 */
function mat4Inverse(m) {
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (det === 0.0) {
        return vecScale(m, 0.0);
    }
    return vecScale([
        a11 * b11 - a12 * b10 + a13 * b09,
        a02 * b10 - a01 * b11 - a03 * b09,
        a31 * b05 - a32 * b04 + a33 * b03,
        a22 * b04 - a21 * b05 - a23 * b03,
        a12 * b08 - a10 * b11 - a13 * b07,
        a00 * b11 - a02 * b08 + a03 * b07,
        a32 * b02 - a30 * b05 - a33 * b01,
        a20 * b05 - a22 * b02 + a23 * b01,
        a10 * b10 - a11 * b08 + a13 * b06,
        a01 * b08 - a00 * b10 - a03 * b06,
        a30 * b04 - a31 * b02 + a33 * b00,
        a21 * b02 - a20 * b04 - a23 * b00,
        a11 * b07 - a10 * b09 - a12 * b06,
        a00 * b09 - a01 * b07 + a02 * b06,
        a31 * b01 - a30 * b03 - a32 * b00,
        a20 * b03 - a21 * b01 + a22 * b00,
    ], 1.0 / det);
}

/**
 * Return a cross product of two vec3s.
 */
function vec3Cross(vecA, vecB) {
    return [
        vecA[1] * vecB[2] - vecA[2] * vecB[1],
        vecA[2] * vecB[0] - vecA[0] * vecB[2],
        vecA[0] * vecB[1] - vecA[1] * vecB[0],
    ];
}

/**
 * Return a sum of vectors.
 */
function vecAdd(...vecs) {
    if (vecs.length < 2) {
        return vecs[0];
    }
    const a = vecs.shift();
    const b = vecAdd(...vecs);
    return a.map((v, i) => v + b[i]);
}

/**
 * Normalize given vector.
 * If the length of given vector is 0.0, it will return a zero vector instead.
 */
function vecNormalize(vec) {
    const len = vecLength(vec);
    const invLen = len === 0.0 ? 0.0 : 1.0 / len;
    return vecScale(vec, invLen);
}

/**
 * Subtract a vector from a vector.
 */
function vecSub(vecA, vecB) {
    return vecA.map((v, i) => v - vecB[i]);
}

/**
 * Generate a "LookAt" matrix.
 *
 * See also: {@link mat4LookAtInverse}
 */
function mat4LookAt(position, target = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0], roll = 0.0) {
    const dir = vecNormalize(vecSub(position, target));
    let sid = vecNormalize(vec3Cross(up, dir));
    if (roll !== 0.0) {
        sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
    }
    const top = vec3Cross(dir, sid);
    return [
        sid[0], sid[1], sid[2], 0.0,
        top[0], top[1], top[2], 0.0,
        dir[0], dir[1], dir[2], 0.0,
        position[0], position[1], position[2], 1.0
    ];
}

/**
 * Return a dot product of given two vectors.
 */
function vecDot(vecA, vecB) {
    return vecA.reduce((sum, v, i) => sum + v * vecB[i], 0.0);
}

/**
 * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
 *
 * See also: {@link mat4LookAt}
 */
function mat4LookAtInverse(position, target = [0.0, 0.0, 0.0], up = [0.0, 1.0, 0.0], roll = 0.0) {
    const dir = vecNormalize(vecSub(position, target));
    let sid = vecNormalize(vec3Cross(up, dir));
    if (roll !== 0.0) {
        sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
    }
    const top = vec3Cross(dir, sid);
    return [
        sid[0], top[0], dir[0], 0.0,
        sid[1], top[1], dir[1], 0.0,
        sid[2], top[2], dir[2], 0.0,
        -vecDot(sid, position),
        -vecDot(top, position),
        -vecDot(dir, position),
        1.0,
    ];
}

/**
 * Return a multiplication result of matrices.
 */
function mat4Multiply(...mats) {
    if (mats.length < 2) {
        return mats[0];
    }
    const a = mats.shift();
    const b = mat4Multiply(...mats);
    const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3], b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7], b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11], b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
    return [
        a00 * b00 + a10 * b01 + a20 * b02 + a30 * b03,
        a01 * b00 + a11 * b01 + a21 * b02 + a31 * b03,
        a02 * b00 + a12 * b01 + a22 * b02 + a32 * b03,
        a03 * b00 + a13 * b01 + a23 * b02 + a33 * b03,
        a00 * b10 + a10 * b11 + a20 * b12 + a30 * b13,
        a01 * b10 + a11 * b11 + a21 * b12 + a31 * b13,
        a02 * b10 + a12 * b11 + a22 * b12 + a32 * b13,
        a03 * b10 + a13 * b11 + a23 * b12 + a33 * b13,
        a00 * b20 + a10 * b21 + a20 * b22 + a30 * b23,
        a01 * b20 + a11 * b21 + a21 * b22 + a31 * b23,
        a02 * b20 + a12 * b21 + a22 * b22 + a32 * b23,
        a03 * b20 + a13 * b21 + a23 * b22 + a33 * b23,
        a00 * b30 + a10 * b31 + a20 * b32 + a30 * b33,
        a01 * b30 + a11 * b31 + a21 * b32 + a31 * b33,
        a02 * b30 + a12 * b31 + a22 * b32 + a32 * b33,
        a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33,
    ];
}

/**
 * Generate a "Perspective" projection matrix.
 * It won't include aspect!
 */
function mat4Perspective(fov = 45.0, near = 0.01, far = 100.0) {
    const p = 1.0 / Math.tan(fov * Math.PI / 360.0);
    const d = (far - near);
    return [
        p, 0.0, 0.0, 0.0,
        0.0, p, 0.0, 0.0,
        0.0, 0.0, -(far + near) / d, -1.0,
        0.0, 0.0, -2 * far * near / d, 0.0
    ];
}

/**
 * Generate a 3d rotation matrix, rotates around x axis.
 */
function mat4RotateX(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
        1, 0, 0, 0,
        0, c, -s, 0,
        0, s, c, 0,
        0, 0, 0, 1,
    ];
}

/**
 * Generate a 3d rotation matrix, rotates around y axis.
 */
function mat4RotateY(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1,
    ];
}

/**
 * Generate a 3d rotation matrix, rotates around z axis.
 */
function mat4RotateZ(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ];
}

/**
 * Generate a 3d scaling matrix.
 */
function mat4Scale(vec) {
    return [
        vec[0], 0, 0, 0,
        0, vec[1], 0, 0,
        0, 0, vec[2], 0,
        0, 0, 0, 1,
    ];
}

/**
 * Generate a 3d scaling matrix by a scalar.
 */
function mat4ScaleScalar(scalar) {
    return [
        scalar, 0, 0, 0,
        0, scalar, 0, 0,
        0, 0, scalar, 0,
        0, 0, 0, 1,
    ];
}

/**
 * Generate a translation matrix.
 */
function mat4Translate(vec) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        vec[0], vec[1], vec[2], 1
    ];
}

/**
 * Transpose a mat4.
 */
function mat4Transpose(m) {
    return [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15],
    ];
}

/**
 * Generate a Quaternion out of axis and angle.
 */
function quatFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2.0;
    const sinHalfAngle = Math.sin(halfAngle);
    return [
        axis[0] * sinHalfAngle,
        axis[1] * sinHalfAngle,
        axis[2] * sinHalfAngle,
        Math.cos(halfAngle)
    ];
}

/**
 * Return an inverse of a quaternion.
 */
function quatInverse(quat) {
    return [-quat[0], -quat[1], -quat[2], quat[3]];
}

/**
 * Return a multiplication result of quaternions.
 */
function quatMultiply(...quats) {
    if (quats.length < 2) {
        return quats[0];
    }
    const a = quats.shift();
    const b = quatMultiply(...quats);
    return [
        a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
        a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
        a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
        a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
    ];
}

/**
 * Normalize given quaternion.
 *
 * It's almost identical as {@link vecNormalize},
 * but it will return an identity quaternion instead
 * when it recieves a quaternion which length is zero.
 */
function quatNormalize(vec) {
    const len = vecLength(vec);
    if (len === 0.0) {
        return [0.0, 0.0, 0.0, 1.0];
    }
    return vecScale(vec, 1.0 / len);
}

/**
 * Divide a vector by a vector.
 */
function vecDivide(vecA, vecB) {
    return vecA.map((v, i) => v / vecB[i]);
}

/**
 * Multiply a vector by a vector.
 */
function vecMultiply(vecA, vecB) {
    return vecA.map((v, i) => v * vecB[i]);
}

/**
 * Multiply a vec4 by a mat4.
 */
function vec4ApplyMatrix4(v, m) {
    return [
        m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
        m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
        m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
        m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3],
    ];
}

/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a mat4.
 */
function vec3ApplyMatrix4(v, m) {
    const vec4 = vec4ApplyMatrix4([...v, 1], m);
    const w = vec4.pop();
    return vecScale(vec4, 1.0 / w);
}

/**
 * Apply a vec3 (with an implicit 1 in the 4th dimension) a quaternion.
 */
function vec3ApplyQuaternion(vec, quat) {
    const p = [...vec, 0.0];
    const r = quatInverse(quat);
    const res = quatMultiply(quat, p, r);
    res.pop();
    return res;
}

/**
 * A Vector.
 */
class Vector {
    /**
     * The length of this.
     * a.k.a. `magnitude`
     */
    get length() {
        return Math.sqrt(this.elements.reduce((sum, v) => sum + v * v, 0.0));
    }
    /**
     * A normalized Vector3 of this.
     */
    get normalized() {
        return this.scale(1.0 / this.length);
    }
    /**
     * Clone this.
     */
    clone() {
        return this.__new(this.elements.concat());
    }
    /**
     * Add a Vector into this.
     * @param vector Another Vector
     */
    add(vector) {
        return this.__new(this.elements.map((v, i) => v + vector.elements[i]));
    }
    /**
     * Substract this from another Vector.
     * @param v Another vector
     */
    sub(vector) {
        return this.__new(this.elements.map((v, i) => v - vector.elements[i]));
    }
    /**
     * Multiply a Vector with this.
     * @param vector Another Vector
     */
    multiply(vector) {
        return this.__new(this.elements.map((v, i) => v * vector.elements[i]));
    }
    /**
     * Divide this from another Vector.
     * @param vector Another Vector
     */
    divide(vector) {
        return this.__new(this.elements.map((v, i) => v / vector.elements[i]));
    }
    /**
     * Scale this by scalar.
     * a.k.a. `multiplyScalar`
     * @param scalar A scalar
     */
    scale(scalar) {
        return this.__new(this.elements.map((v) => v * scalar));
    }
    /**
     * Dot two Vectors.
     * @param vector Another vector
     */
    dot(vector) {
        return this.elements.reduce((sum, v, i) => sum + v * vector.elements[i], 0.0);
    }
}

/**
 * A Vector3.
 */
class Vector3 extends Vector {
    constructor(v = [0.0, 0.0, 0.0]) {
        super();
        this.elements = v;
    }
    /**
     * An x component of this.
     */
    get x() {
        return this.elements[0];
    }
    set x(x) {
        this.elements[0] = x;
    }
    /**
     * An y component of this.
     */
    get y() {
        return this.elements[1];
    }
    set y(y) {
        this.elements[1] = y;
    }
    /**
     * An z component of this.
     */
    get z() {
        return this.elements[2];
    }
    set z(z) {
        this.elements[2] = z;
    }
    toString() {
        return `Vector3( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)} )`;
    }
    /**
     * Return a cross of this and another Vector3.
     * @param vector Another vector
     */
    cross(vector) {
        return new Vector3([
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        ]);
    }
    /**
     * Rotate this vector using a Quaternion.
     * @param quaternion A quaternion
     */
    applyQuaternion(quaternion) {
        const p = new Quaternion([this.x, this.y, this.z, 0.0]);
        const r = quaternion.inversed;
        const res = quaternion.multiply(p).multiply(r);
        return new Vector3([res.x, res.y, res.z]);
    }
    /**
     * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
     */
    applyMatrix4(matrix) {
        const m = matrix.elements;
        const w = m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15];
        const invW = 1.0 / w;
        return new Vector3([
            (m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12]) * invW,
            (m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13]) * invW,
            (m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14]) * invW
        ]);
    }
    __new(v) {
        return new Vector3(v);
    }
    /**
     * Vector3( 0.0, 0.0, 0.0 )
     */
    static get zero() {
        return new Vector3([0.0, 0.0, 0.0]);
    }
    /**
     * Vector3( 1.0, 1.0, 1.0 )
     */
    static get one() {
        return new Vector3([1.0, 1.0, 1.0]);
    }
}

const rawIdentityQuaternion = [0.0, 0.0, 0.0, 1.0];
/**
 * A Quaternion.
 */
class Quaternion {
    constructor(elements = rawIdentityQuaternion) {
        this.elements = elements;
    }
    /**
     * An x component of this.
     */
    get x() {
        return this.elements[0];
    }
    /**
     * An y component of this.
     */
    get y() {
        return this.elements[1];
    }
    /**
     * An z component of this.
     */
    get z() {
        return this.elements[2];
    }
    /**
     * An w component of this.
     */
    get w() {
        return this.elements[3];
    }
    toString() {
        return `Quaternion( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)} )`;
    }
    /**
     * Clone this.
     */
    clone() {
        return new Quaternion(this.elements.concat());
    }
    /**
     * Itself but converted into a Matrix4.
     */
    get matrix() {
        const x = new Vector3([1.0, 0.0, 0.0]).applyQuaternion(this);
        const y = new Vector3([0.0, 1.0, 0.0]).applyQuaternion(this);
        const z = new Vector3([0.0, 0.0, 1.0]).applyQuaternion(this);
        return new Matrix4([
            x.x, y.x, z.x, 0.0,
            x.y, y.y, z.y, 0.0,
            x.z, y.z, z.z, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
    }
    /**
     * An inverse of this.
     */
    get inversed() {
        return new Quaternion([
            -this.x,
            -this.y,
            -this.z,
            this.w
        ]);
    }
    /**
     * The length of this.
     */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }
    /**
     * A normalized this.
     */
    get normalized() {
        const l = this.length;
        if (l === 0) {
            return Quaternion.identity;
        }
        const lInv = 1.0 / this.length;
        return new Quaternion([
            this.x * lInv,
            this.y * lInv,
            this.z * lInv,
            this.w * lInv,
        ]);
    }
    /**
     * Multiply two Quaternions.
     * @param q Another Quaternion
     */
    multiply(q) {
        return new Quaternion([
            this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
            this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
            this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w,
            this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
        ]);
    }
    /**
     * An identity Quaternion.
     */
    static get identity() {
        return new Quaternion(rawIdentityQuaternion);
    }
    /**
     * Generate a Quaternion out of angle and axis.
     */
    static fromAxisAngle(axis, angle) {
        const halfAngle = angle / 2.0;
        const sinHalfAngle = Math.sin(halfAngle);
        return new Quaternion([
            axis.x * sinHalfAngle,
            axis.y * sinHalfAngle,
            axis.z * sinHalfAngle,
            Math.cos(halfAngle)
        ]);
    }
    /**
     * Generate a Quaternion out of a rotation matrix.
     * Yoinked from Three.js.
     */
    static fromMatrix(matrix) {
        const m = matrix.elements, m11 = m[0], m12 = m[4], m13 = m[8], m21 = m[1], m22 = m[5], m23 = m[9], m31 = m[2], m32 = m[6], m33 = m[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            return new Quaternion([
                (m32 - m23) * s,
                (m13 - m31) * s,
                (m21 - m12) * s,
                0.25 / s
            ]);
        }
        else if (m11 > m22 && m11 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            return new Quaternion([
                0.25 * s,
                (m12 + m21) / s,
                (m13 + m31) / s,
                (m32 - m23) / s
            ]);
        }
        else if (m22 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            return new Quaternion([
                (m12 + m21) / s,
                0.25 * s,
                (m23 + m32) / s,
                (m13 - m31) / s
            ]);
        }
        else {
            const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            return new Quaternion([
                (m13 + m31) / s,
                (m23 + m32) / s,
                0.25 * s,
                (m21 - m12) / s
            ]);
        }
    }
}

const rawIdentityMatrix4 = [
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
];
/**
 * A Matrix4.
 */
class Matrix4 {
    constructor(v = rawIdentityMatrix4) {
        this.elements = v;
    }
    /**
     * Itself but transposed.
     */
    get transpose() {
        const m = this.elements;
        return new Matrix4([
            m[0], m[4], m[8], m[12],
            m[1], m[5], m[9], m[13],
            m[2], m[6], m[10], m[14],
            m[3], m[7], m[11], m[15]
        ]);
    }
    /**
     * Its determinant.
     */
    get determinant() {
        const m = this.elements;
        const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    /**
     * Itself but inverted.
     */
    get inverse() {
        const m = this.elements;
        const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
        const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (det === 0.0) {
            return null;
        }
        const invDet = 1.0 / det;
        return new Matrix4([
            a11 * b11 - a12 * b10 + a13 * b09,
            a02 * b10 - a01 * b11 - a03 * b09,
            a31 * b05 - a32 * b04 + a33 * b03,
            a22 * b04 - a21 * b05 - a23 * b03,
            a12 * b08 - a10 * b11 - a13 * b07,
            a00 * b11 - a02 * b08 + a03 * b07,
            a32 * b02 - a30 * b05 - a33 * b01,
            a20 * b05 - a22 * b02 + a23 * b01,
            a10 * b10 - a11 * b08 + a13 * b06,
            a01 * b08 - a00 * b10 - a03 * b06,
            a30 * b04 - a31 * b02 + a33 * b00,
            a21 * b02 - a20 * b04 - a23 * b00,
            a11 * b07 - a10 * b09 - a12 * b06,
            a00 * b09 - a01 * b07 + a02 * b06,
            a31 * b01 - a30 * b03 - a32 * b00,
            a20 * b03 - a21 * b01 + a22 * b00
        ].map((v) => v * invDet));
    }
    toString() {
        const m = this.elements.map((v) => v.toFixed(3));
        return `Matrix4( ${m[0]}, ${m[4]}, ${m[8]}, ${m[12]}; ${m[1]}, ${m[5]}, ${m[9]}, ${m[13]}; ${m[2]}, ${m[6]}, ${m[10]}, ${m[14]}; ${m[3]}, ${m[7]}, ${m[11]}, ${m[15]} )`;
    }
    /**
     * Clone this.
     */
    clone() {
        return new Matrix4(this.elements.concat());
    }
    /**
     * Multiply this Matrix4 by one or more Matrix4s.
     */
    multiply(...matrices) {
        if (matrices.length === 0) {
            return this.clone();
        }
        const arr = matrices.concat();
        let bMat = arr.shift();
        if (0 < arr.length) {
            bMat = bMat.multiply(...arr);
        }
        const a = this.elements;
        const b = bMat.elements;
        return new Matrix4([
            a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
            a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
            a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
            a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
            a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
            a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
            a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
            a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
            a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
            a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
            a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
            a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
            a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
            a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
            a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
            a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
        ]);
    }
    /**
     * Multiply this Matrix4 by a scalar
     */
    scaleScalar(scalar) {
        return new Matrix4(this.elements.map((v) => v * scalar));
    }
    /**
     * An identity Matrix4.
     */
    static get identity() {
        return new Matrix4(rawIdentityMatrix4);
    }
    static multiply(...matrices) {
        if (matrices.length === 0) {
            return Matrix4.identity;
        }
        else {
            const bMats = matrices.concat();
            const aMat = bMats.shift();
            return aMat.multiply(...bMats);
        }
    }
    /**
     * Generate a translation matrix.
     * @param vector Translation
     */
    static translate(vector) {
        return new Matrix4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            vector.x, vector.y, vector.z, 1
        ]);
    }
    /**
     * Generate a 3d scaling matrix.
     * @param vector Scale
     */
    static scale(vector) {
        return new Matrix4([
            vector.x, 0, 0, 0,
            0, vector.y, 0, 0,
            0, 0, vector.z, 0,
            0, 0, 0, 1
        ]);
    }
    /**
     * Generate a 3d scaling matrix by a scalar.
     * @param vector Scale
     */
    static scaleScalar(scalar) {
        return new Matrix4([
            scalar, 0, 0, 0,
            0, scalar, 0, 0,
            0, 0, scalar, 0,
            0, 0, 0, 1
        ]);
    }
    /**
     * Generate a 3d rotation matrix, rotates around x axis.
     * @param vector Scale
     */
    static rotateX(theta) {
        return new Matrix4([
            1, 0, 0, 0,
            0, Math.cos(theta), -Math.sin(theta), 0,
            0, Math.sin(theta), Math.cos(theta), 0,
            0, 0, 0, 1
        ]);
    }
    /**
     * Generate a 3d rotation matrix, rotates around y axis.
     * @param vector Scale
     */
    static rotateY(theta) {
        return new Matrix4([
            Math.cos(theta), 0, Math.sin(theta), 0,
            0, 1, 0, 0,
            -Math.sin(theta), 0, Math.cos(theta), 0,
            0, 0, 0, 1
        ]);
    }
    /**
     * Generate a 3d rotation matrix, rotates around z axis.
     * @param vector Scale
     */
    static rotateZ(theta) {
        return new Matrix4([
            Math.cos(theta), -Math.sin(theta), 0, 0,
            Math.sin(theta), Math.cos(theta), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }
    /**
     * Generate a "LookAt" matrix.
     *
     * See also: {@link lookAtInverse}
     */
    static lookAt(position, target = new Vector3([0.0, 0.0, 0.0]), up = new Vector3([0.0, 1.0, 0.0]), roll = 0.0) {
        const dir = position.sub(target).normalized;
        let sid = up.cross(dir).normalized;
        let top = dir.cross(sid);
        sid = sid.scale(Math.cos(roll)).add(top.scale(Math.sin(roll)));
        top = dir.cross(sid);
        return new Matrix4([
            sid.x, sid.y, sid.z, 0.0,
            top.x, top.y, top.z, 0.0,
            dir.x, dir.y, dir.z, 0.0,
            position.x, position.y, position.z, 1.0
        ]);
    }
    /**
     * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
     *
     * See also: {@link lookAt}
     */
    static lookAtInverse(position, target = new Vector3([0.0, 0.0, 0.0]), up = new Vector3([0.0, 1.0, 0.0]), roll = 0.0) {
        const dir = position.sub(target).normalized;
        let sid = up.cross(dir).normalized;
        let top = dir.cross(sid);
        sid = sid.scale(Math.cos(roll)).add(top.scale(Math.sin(roll)));
        top = dir.cross(sid);
        return new Matrix4([
            sid.x, top.x, dir.x, 0.0,
            sid.y, top.y, dir.y, 0.0,
            sid.z, top.z, dir.z, 0.0,
            -sid.x * position.x - sid.y * position.y - sid.z * position.z,
            -top.x * position.x - top.y * position.y - top.z * position.z,
            -dir.x * position.x - dir.y * position.y - dir.z * position.z,
            1.0
        ]);
    }
    /**
     * Generate a "Perspective" projection matrix.
     * It won't include aspect!
     */
    static perspective(fov = 45.0, near = 0.01, far = 100.0) {
        const p = 1.0 / Math.tan(fov * Math.PI / 360.0);
        const d = (far - near);
        return new Matrix4([
            p, 0.0, 0.0, 0.0,
            0.0, p, 0.0, 0.0,
            0.0, 0.0, -(far + near) / d, -1.0,
            0.0, 0.0, -2 * far * near / d, 0.0
        ]);
    }
    /**
     * Decompose this matrix into a position, a scale, and a rotation.
     * Yoinked from Three.js.
     */
    decompose() {
        const m = this.elements;
        let sx = new Vector3([m[0], m[1], m[2]]).length;
        const sy = new Vector3([m[4], m[5], m[6]]).length;
        const sz = new Vector3([m[8], m[9], m[10]]).length;
        // if determine is negative, we need to invert one scale
        const det = this.determinant;
        if (det < 0) {
            sx = -sx;
        }
        const invSx = 1.0 / sx;
        const invSy = 1.0 / sy;
        const invSz = 1.0 / sz;
        const rotationMatrix = this.clone();
        rotationMatrix.elements[0] *= invSx;
        rotationMatrix.elements[1] *= invSx;
        rotationMatrix.elements[2] *= invSx;
        rotationMatrix.elements[4] *= invSy;
        rotationMatrix.elements[5] *= invSy;
        rotationMatrix.elements[6] *= invSy;
        rotationMatrix.elements[8] *= invSz;
        rotationMatrix.elements[9] *= invSz;
        rotationMatrix.elements[10] *= invSz;
        return {
            position: new Vector3([m[12], m[13], m[14]]),
            scale: new Vector3([sx, sy, sz]),
            rotation: Quaternion.fromMatrix(rotationMatrix)
        };
    }
    /**
     * Compose a matrix out of position, scale, and rotation.
     * Yoinked from Three.js.
     */
    static compose(position, rotation, scale) {
        const x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w;
        const x2 = x + x, y2 = y + y, z2 = z + z;
        const xx = x * x2, xy = x * y2, xz = x * z2;
        const yy = y * y2, yz = y * z2, zz = z * z2;
        const wx = w * x2, wy = w * y2, wz = w * z2;
        const sx = scale.x, sy = scale.y, sz = scale.z;
        return new Matrix4([
            (1.0 - (yy + zz)) * sx,
            (xy + wz) * sx,
            (xz - wy) * sx,
            0.0,
            (xy - wz) * sy,
            (1.0 - (xx + zz)) * sy,
            (yz + wx) * sy,
            0.0,
            (xz + wy) * sz,
            (yz - wx) * sz,
            (1.0 - (xx + yy)) * sz,
            0.0,
            position.x,
            position.y,
            position.z,
            1.0
        ]);
    }
}

/**
 * GLSL Style `mod` function.
 * "compute value of one parameter modulo another"
 */
function mod(value, divisor) {
    return value - Math.floor(value / divisor) * divisor;
}

/**
 * A Vector3.
 */
class Vector4 extends Vector {
    constructor(v = [0.0, 0.0, 0.0, 0.0]) {
        super();
        this.elements = v;
    }
    /**
     * An x component of this.
     */
    get x() {
        return this.elements[0];
    }
    set x(x) {
        this.elements[0] = x;
    }
    /**
     * A y component of this.
     */
    get y() {
        return this.elements[1];
    }
    set y(y) {
        this.elements[1] = y;
    }
    /**
     * A z component of this.
     */
    get z() {
        return this.elements[2];
    }
    set z(z) {
        this.elements[2] = z;
    }
    /**
     * A w component of this.
     */
    get w() {
        return this.elements[3];
    }
    set w(z) {
        this.elements[3] = z;
    }
    toString() {
        return `Vector4( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)} )`;
    }
    /**
     * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
     */
    applyMatrix4(matrix) {
        const m = matrix.elements;
        return new Vector4([
            m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12] * this.w,
            m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13] * this.w,
            m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14] * this.w,
            m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15] * this.w
        ]);
    }
    __new(v) {
        return new Vector4(v);
    }
    /**
     * Vector4( 0.0, 0.0, 0.0, 0.0 )
     */
    static get zero() {
        return new Vector4([0.0, 0.0, 0.0, 0.0]);
    }
    /**
     * Vector4( 1.0, 1.0, 1.0, 1.0 )
     */
    static get one() {
        return new Vector4([1.0, 1.0, 1.0, 1.0]);
    }
}

/**
 * Useful for swap buffer
 */
class Swap {
    constructor(a, b) {
        this.i = a;
        this.o = b;
    }
    swap() {
        const i = this.i;
        this.i = this.o;
        this.o = i;
    }
}

class TapTempo {
    constructor() {
        this.__bpm = 0.0;
        this.__lastTap = 0.0;
        this.__lastBeat = 0.0;
        this.__lastTime = 0.0;
        this.__calc = new HistoryMeanCalculator(16);
    }
    get beatDuration() {
        return 60.0 / this.__bpm;
    }
    get bpm() {
        return this.__bpm;
    }
    set bpm(bpm) {
        this.__lastBeat = this.beat;
        this.__lastTime = performance.now();
        this.__bpm = bpm;
    }
    get beat() {
        return this.__lastBeat + (performance.now() - this.__lastTime) * 0.001 / this.beatDuration;
    }
    reset() {
        this.__calc.reset();
    }
    nudge(amount) {
        this.__lastBeat = this.beat + amount;
        this.__lastTime = performance.now();
    }
    tap() {
        const now = performance.now();
        const delta = (now - this.__lastTap) * 0.001;
        if (2.0 < delta) {
            this.reset();
        }
        else {
            this.__calc.push(delta);
            this.__bpm = 60.0 / (this.__calc.mean);
        }
        this.__lastTap = now;
        this.__lastTime = now;
        this.__lastBeat = 0.0;
    }
}

class Xorshift {
    constructor(seed) {
        this.seed = seed || 1;
    }
    gen(seed) {
        if (seed) {
            this.seed = seed;
        }
        this.seed = this.seed ^ (this.seed << 13);
        this.seed = this.seed ^ (this.seed >>> 17);
        this.seed = this.seed ^ (this.seed << 5);
        return this.seed / Math.pow(2, 32) + 0.5;
    }
    set(seed) {
        this.seed = seed || this.seed || 1;
    }
}

export { CDS, Clock, ClockFrame, ClockRealtime, ExpSmooth, GPUTimer, HistoryMeanCalculator, HistoryMedianCalculator, HistoryPercentileCalculator, Matrix4, Pool, Quaternion, Swap, TRIANGLE_STRIP_QUAD, TRIANGLE_STRIP_QUAD_3D, TRIANGLE_STRIP_QUAD_NORMAL, TRIANGLE_STRIP_QUAD_UV, TapTempo, Vector, Vector3, Vector4, Xorshift, arraySetAdd, arraySetDelete, arraySetDiff, arraySetHas, arraySetUnion, binarySearch, clamp, edt1d, edt2d, lerp, linearstep, mat4Compose, mat4Decompose, mat4Determinant, mat4FromQuaternion, mat4Inverse, mat4LookAt, mat4LookAtInverse, mat4Multiply, mat4Perspective, mat4RotateX, mat4RotateY, mat4RotateZ, mat4Scale, mat4ScaleScalar, mat4Translate, mat4Transpose, matrix2d, matrix3d, mod, quatFromAxisAngle, quatFromMatrix4, quatInverse, quatMultiply, quatNormalize, range, rawIdentityMatrix4, rawIdentityQuaternion, saturate, shuffleArray, smootherstep, smootheststep, smoothstep, triIndexToLineIndex, vec3ApplyMatrix4, vec3ApplyQuaternion, vec3Cross, vec4ApplyMatrix4, vecAdd, vecDivide, vecDot, vecLength, vecMultiply, vecNormalize, vecScale, vecSub };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMGI1dnItZXhwZXJpbWVudGFsLm1vZHVsZS5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2FsZ29yaXRobS9iaW5hcnlTZWFyY2gudHMiLCIuLi9zcmMvYXJyYXkvYXJyYXlTZXQudHMiLCIuLi9zcmMvYXJyYXkvY29uc3RhbnRzLnRzIiwiLi4vc3JjL2FycmF5L3V0aWxzLnRzIiwiLi4vc3JjL0NEUy9DRFMudHMiLCIuLi9zcmMvQ2xvY2svQ2xvY2sudHMiLCIuLi9zcmMvQ2xvY2svQ2xvY2tGcmFtZS50cyIsIi4uL3NyYy9DbG9jay9DbG9ja1JlYWx0aW1lLnRzIiwiLi4vc3JjL2VkdC9lZHQudHMiLCIuLi9zcmMvbWF0aC91dGlscy50cyIsIi4uL3NyYy9FeHBTbW9vdGgvRXhwU21vb3RoLnRzIiwiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy9Qb29sL1Bvb2wudHMiLCIuLi9zcmMvR1BVVGltZXIvR1BVVGltZXIudHMiLCIuLi9zcmMvSGlzdG9yeU1lYW5DYWxjdWxhdG9yL0hpc3RvcnlNZWFuQ2FsY3VsYXRvci50cyIsIi4uL3NyYy9IaXN0b3J5TWVhbkNhbGN1bGF0b3IvSGlzdG9yeVBlcmNlbnRpbGVDYWxjdWxhdG9yLnRzIiwiLi4vc3JjL0hpc3RvcnlNZWFuQ2FsY3VsYXRvci9IaXN0b3J5TWVkaWFuQ2FsY3VsYXRvci50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NEZyb21RdWF0ZXJuaW9uLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0Q29tcG9zZS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NERldGVybWluYW50LnRzIiwiLi4vc3JjL21hdGgvcXVhdC9xdWF0RnJvbU1hdHJpeDQudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjTGVuZ3RoLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0RGVjb21wb3NlLnRzIiwiLi4vc3JjL21hdGgvdmVjL3ZlY1NjYWxlLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0SW52ZXJzZS50cyIsIi4uL3NyYy9tYXRoL3ZlYzMvdmVjM0Nyb3NzLnRzIiwiLi4vc3JjL21hdGgvdmVjL3ZlY0FkZC50cyIsIi4uL3NyYy9tYXRoL3ZlYy92ZWNOb3JtYWxpemUudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjU3ViLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0TG9va0F0LnRzIiwiLi4vc3JjL21hdGgvdmVjL3ZlY0RvdC50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NExvb2tBdEludmVyc2UudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRNdWx0aXBseS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFBlcnNwZWN0aXZlLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0Um90YXRlWC50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFJvdGF0ZVkudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRSb3RhdGVaLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0U2NhbGUudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRTY2FsZVNjYWxhci50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFRyYW5zbGF0ZS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFRyYW5zcG9zZS50cyIsIi4uL3NyYy9tYXRoL3F1YXQvcXVhdEZyb21BeGlzQW5nbGUudHMiLCIuLi9zcmMvbWF0aC9xdWF0L3F1YXRJbnZlcnNlLnRzIiwiLi4vc3JjL21hdGgvcXVhdC9xdWF0TXVsdGlwbHkudHMiLCIuLi9zcmMvbWF0aC9xdWF0L3F1YXROb3JtYWxpemUudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjRGl2aWRlLnRzIiwiLi4vc3JjL21hdGgvdmVjL3ZlY011bHRpcGx5LnRzIiwiLi4vc3JjL21hdGgvdmVjNC92ZWM0QXBwbHlNYXRyaXg0LnRzIiwiLi4vc3JjL21hdGgvdmVjMy92ZWMzQXBwbHlNYXRyaXg0LnRzIiwiLi4vc3JjL21hdGgvdmVjMy92ZWMzQXBwbHlRdWF0ZXJuaW9uLnRzIiwiLi4vc3JjL21hdGgvVmVjdG9yLnRzIiwiLi4vc3JjL21hdGgvVmVjdG9yMy50cyIsIi4uL3NyYy9tYXRoL1F1YXRlcm5pb24udHMiLCIuLi9zcmMvbWF0aC9NYXRyaXg0LnRzIiwiLi4vc3JjL21hdGgvbW9kLnRzIiwiLi4vc3JjL21hdGgvVmVjdG9yNC50cyIsIi4uL3NyYy9Td2FwL1N3YXAudHMiLCIuLi9zcmMvVGFwVGVtcG8vVGFwVGVtcG8udHMiLCIuLi9zcmMvWG9yc2hpZnQvWG9yc2hpZnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8geW9pbmtlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzNDQ1MDAvZWZmaWNpZW50LXdheS10by1pbnNlcnQtYS1udW1iZXItaW50by1hLXNvcnRlZC1hcnJheS1vZi1udW1iZXJzXG5cbi8qKlxuICogTG9vayBmb3IgYW4gaW5kZXggZnJvbSBhIHNvcnRlZCBsaXN0IHVzaW5nIGJpbmFyeSBzZWFyY2guXG4gKlxuICogSWYgeW91IGRvbid0IHByb3ZpZGUgYSBjb21wYXJlIGZ1bmN0aW9uLCBpdCB3aWxsIGxvb2sgZm9yICoqdGhlIGZpcnN0IHNhbWUgdmFsdWUqKiBpdCBjYW4gZmluZC5cbiAqIElmIGl0IGNhbm5vdCBmaW5kIGFuIGV4YWN0bHkgbWF0Y2hpbmcgdmFsdWUsIGl0IGNhbiByZXR1cm4gTiB3aGVyZSB0aGUgbGVuZ3RoIG9mIGdpdmVuIGFycmF5IGlzIE4uXG4gKlxuICogQHBhcmFtIGFycmF5IEEgc29ydGVkIGFycmF5XG4gKiBAcGFyYW0gY29tcGFyZSBNYWtlIHRoaXMgZnVuY3Rpb24gcmV0dXJuIGBmYWxzZWAgaWYgeW91IHdhbnQgdG8gcG9pbnQgcmlnaHQgc2lkZSBvZiBnaXZlbiBlbGVtZW50LCBgdHJ1ZWAgaWYgeW91IHdhbnQgdG8gcG9pbnQgbGVmdCBzaWRlIG9mIGdpdmVuIGVsZW1lbnQuXG4gKiBAcmV0dXJucyBBbiBpbmRleCBmb3VuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5U2VhcmNoPFQ+KCBhcnJheTogQXJyYXlMaWtlPFQ+LCBlbGVtZW50OiBUICk6IG51bWJlcjtcbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTZWFyY2g8VD4oIGFycmF5OiBBcnJheUxpa2U8VD4sIGNvbXBhcmU6ICggZWxlbWVudDogVCApID0+IGJvb2xlYW4gKTogbnVtYmVyO1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaDxUPihcbiAgYXJyYXk6IEFycmF5TGlrZTxUPixcbiAgZWxlbWVudE9yQ29tcGFyZTogVCB8ICggKCBlbGVtZW50OiBUICkgPT4gYm9vbGVhbiApLFxuKTogbnVtYmVyIHtcbiAgaWYgKCB0eXBlb2YgZWxlbWVudE9yQ29tcGFyZSAhPT0gJ2Z1bmN0aW9uJyApIHtcbiAgICByZXR1cm4gYmluYXJ5U2VhcmNoKCBhcnJheSwgKCBlbGVtZW50ICkgPT4gKCBlbGVtZW50IDwgZWxlbWVudE9yQ29tcGFyZSApICk7XG4gIH1cbiAgY29uc3QgY29tcGFyZSA9IGVsZW1lbnRPckNvbXBhcmUgYXMgKCBlbGVtZW50OiBUICkgPT4gYm9vbGVhbjtcblxuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICggc3RhcnQgPCBlbmQgKSB7XG4gICAgY29uc3QgY2VudGVyID0gKCBzdGFydCArIGVuZCApID4+IDE7XG4gICAgY29uc3QgY2VudGVyRWxlbWVudCA9IGFycmF5WyBjZW50ZXIgXTtcblxuICAgIGNvbnN0IGNvbXBhcmVSZXN1bHQgPSBjb21wYXJlKCBjZW50ZXJFbGVtZW50ICk7XG5cbiAgICBpZiAoIGNvbXBhcmVSZXN1bHQgKSB7XG4gICAgICBzdGFydCA9IGNlbnRlciArIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZCA9IGNlbnRlcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhcnQ7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYXJyYXlTZXREZWxldGU8VD4oIGFycmF5OiBBcnJheTxUPiwgdmFsdWU6IFQgKTogYm9vbGVhbiB7XG4gIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZiggdmFsdWUgKTtcbiAgaWYgKCBpbmRleCA9PT0gLTEgKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGFycmF5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVNldEhhczxUPiggYXJyYXk6IEFycmF5PFQ+LCB2YWx1ZTogVCApOiBib29sZWFuIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoIHZhbHVlICkgIT09IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlTZXRBZGQ8VD4oIGFycmF5OiBBcnJheTxUPiwgdmFsdWU6IFQgKTogYm9vbGVhbiB7XG4gIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZiggdmFsdWUgKTtcbiAgaWYgKCBpbmRleCAhPT0gLTEgKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGFycmF5LnB1c2goIHZhbHVlICk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlTZXRVbmlvbjxUPiggYTogQXJyYXk8VD4sIGI6IEFycmF5PFQ+ICk6IEFycmF5PFQ+IHtcbiAgY29uc3Qgb3V0ID0gWyAuLi5hIF07XG4gIGIuZm9yRWFjaCggKCB2ICkgPT4ge1xuICAgIGlmICggIWFycmF5U2V0SGFzKCBvdXQsIHYgKSApIHtcbiAgICAgIG91dC5wdXNoKCB2ICk7XG4gICAgfVxuICB9ICk7XG4gIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVNldERpZmY8VD4oIGZyb206IEFycmF5PFQ+LCBkaWZmOiBBcnJheTxUPiApOiBBcnJheTxUPiB7XG4gIGNvbnN0IG91dCA9IFsgLi4uZnJvbSBdO1xuICBkaWZmLmZvckVhY2goICggdiApID0+IHtcbiAgICBhcnJheVNldERlbGV0ZSggb3V0LCB2ICk7XG4gIH0gKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsIi8qKlxuICogYFsgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIDEgXWBcbiAqL1xuZXhwb3J0IGNvbnN0IFRSSUFOR0xFX1NUUklQX1FVQUQgPSBbIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAxIF07XG5cbi8qKlxuICogYFsgLTEsIC0xLCAwLCAxLCAtMSwgMCwgLTEsIDEsIDAsIDEsIDEsIDAgXWBcbiAqL1xuZXhwb3J0IGNvbnN0IFRSSUFOR0xFX1NUUklQX1FVQURfM0QgPSBbIC0xLCAtMSwgMCwgMSwgLTEsIDAsIC0xLCAxLCAwLCAxLCAxLCAwIF07XG5cbi8qKlxuICogYFsgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSBdYFxuICovXG5leHBvcnQgY29uc3QgVFJJQU5HTEVfU1RSSVBfUVVBRF9OT1JNQUwgPSBbIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEgXTtcblxuLyoqXG4gKiBgWyAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxIF1gXG4gKi9cbmV4cG9ydCBjb25zdCBUUklBTkdMRV9TVFJJUF9RVUFEX1VWID0gWyAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxIF07XG4iLCIvKipcbiAqIFNodWZmbGUgZ2l2ZW4gYGFycmF5YCB1c2luZyBnaXZlbiBgZGljZWAgUk5HLiAqKkRlc3RydWN0aXZlKiouXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlQXJyYXk8VD4oIGFycmF5OiBUW10sIGRpY2U/OiAoKSA9PiBudW1iZXIgKTogVFtdIHtcbiAgY29uc3QgZiA9IGRpY2UgPyBkaWNlIDogKCkgPT4gTWF0aC5yYW5kb20oKTtcbiAgZm9yICggbGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSArKyApIHtcbiAgICBjb25zdCBpciA9IGkgKyBNYXRoLmZsb29yKCBmKCkgKiAoIGFycmF5Lmxlbmd0aCAtIGkgKSApO1xuICAgIGNvbnN0IHRlbXAgPSBhcnJheVsgaXIgXTtcbiAgICBhcnJheVsgaXIgXSA9IGFycmF5WyBpIF07XG4gICAgYXJyYXlbIGkgXSA9IHRlbXA7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEkgbGlrZSB3aXJlZnJhbWVcbiAqXG4gKiBgdHJpSW5kZXhUb0xpbmVJbmRleCggWyAwLCAxLCAyLCA1LCA2LCA3IF0gKWAgLT4gYFsgMCwgMSwgMSwgMiwgMiwgMCwgNSwgNiwgNiwgNywgNywgNSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpSW5kZXhUb0xpbmVJbmRleDxUPiggYXJyYXk6IFRbXSApOiBUW10ge1xuICBjb25zdCByZXQ6IFRbXSA9IFtdO1xuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLyAzOyBpICsrICkge1xuICAgIGNvbnN0IGhlYWQgPSBpICogMztcbiAgICByZXQucHVzaChcbiAgICAgIGFycmF5WyBoZWFkICAgICBdLCBhcnJheVsgaGVhZCArIDEgXSxcbiAgICAgIGFycmF5WyBoZWFkICsgMSBdLCBhcnJheVsgaGVhZCArIDIgXSxcbiAgICAgIGFycmF5WyBoZWFkICsgMiBdLCBhcnJheVsgaGVhZCAgICAgXVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBgbWF0cml4MmQoIDMsIDIgKWAgLT4gYFsgMCwgMCwgMCwgMSwgMCwgMiwgMSwgMCwgMSwgMSwgMSwgMiBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4MmQoIHc6IG51bWJlciwgaDogbnVtYmVyICk6IG51bWJlcltdIHtcbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKCBsZXQgaXkgPSAwOyBpeSA8IGg7IGl5ICsrICkge1xuICAgIGZvciAoIGxldCBpeCA9IDA7IGl4IDwgdzsgaXggKysgKSB7XG4gICAgICBhcnIucHVzaCggaXgsIGl5ICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogU2VlIGFsc286IHtAbGluayBtYXRyaXgyZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeDNkKCB3OiBudW1iZXIsIGg6IG51bWJlciwgZDogbnVtYmVyICk6IG51bWJlcltdIHtcbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKCBsZXQgaXogPSAwOyBpeiA8IGQ7IGl6ICsrICkge1xuICAgIGZvciAoIGxldCBpeSA9IDA7IGl5IDwgaDsgaXkgKysgKSB7XG4gICAgICBmb3IgKCBsZXQgaXggPSAwOyBpeCA8IHc7IGl4ICsrICkge1xuICAgICAgICBhcnIucHVzaCggaXgsIGl5LCBpeiApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufVxuIiwiLyoqXG4gKiBDcml0aWNhbGx5IERhbXBlZCBTcHJpbmdcbiAqXG4gKiBTaG91dG91dHMgdG8gS2VpamlybyBUYWthaGFzaGlcbiAqL1xuZXhwb3J0IGNsYXNzIENEUyB7XG4gIHB1YmxpYyBmYWN0b3IgPSAxMDAuMDtcbiAgcHVibGljIHJhdGlvID0gMS4wO1xuICBwdWJsaWMgdmVsb2NpdHkgPSAwLjA7XG4gIHB1YmxpYyB2YWx1ZSA9IDAuMDtcbiAgcHVibGljIHRhcmdldCA9IDAuMDtcblxuICBwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU6IG51bWJlciApOiBudW1iZXIge1xuICAgIHRoaXMudmVsb2NpdHkgKz0gKFxuICAgICAgLXRoaXMuZmFjdG9yICogKCB0aGlzLnZhbHVlIC0gdGhpcy50YXJnZXQgKVxuICAgICAgLSAyLjAgKiB0aGlzLnZlbG9jaXR5ICogTWF0aC5zcXJ0KCB0aGlzLmZhY3RvciApICogdGhpcy5yYXRpb1xuICAgICkgKiBkZWx0YVRpbWU7XG4gICAgdGhpcy52YWx1ZSArPSB0aGlzLnZlbG9jaXR5ICogZGVsdGFUaW1lO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59XG4iLCIvKipcbiAqIENsYXNzIHRoYXQgZGVhbHMgd2l0aCB0aW1lLlxuICogSW4gdGhpcyBiYXNlIGNsYXNzLCB5b3UgbmVlZCB0byBzZXQgdGltZSBtYW51YWxseSBmcm9tIGBBdXRvbWF0b24udXBkYXRlKClgLlxuICogQmVzdCBmb3Igc3luYyB3aXRoIGV4dGVybmFsIGNsb2NrIHN0dWZmLlxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2sge1xuICAvKipcbiAgICogSXRzIGN1cnJlbnQgdGltZS5cbiAgICovXG4gIHByb3RlY3RlZCBfX3RpbWUgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEl0cyBkZWx0YVRpbWUgb2YgbGFzdCB1cGRhdGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX19kZWx0YVRpbWUgPSAwLjA7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXRzIGN1cnJlbnRseSBwbGF5aW5nIG9yIG5vdC5cbiAgICovXG4gIHByb3RlY3RlZCBfX2lzUGxheWluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCB0aW1lLlxuICAgKi9cbiAgcHVibGljIGdldCB0aW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9fdGltZTsgfVxuXG4gIC8qKlxuICAgKiBJdHMgZGVsdGFUaW1lIG9mIGxhc3QgdXBkYXRlLlxuICAgKi9cbiAgcHVibGljIGdldCBkZWx0YVRpbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19kZWx0YVRpbWU7IH1cblxuICAvKipcbiAgICogV2hldGhlciBpdHMgY3VycmVudGx5IHBsYXlpbmcgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldCBpc1BsYXlpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9faXNQbGF5aW5nOyB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2xvY2suXG4gICAqIEBwYXJhbSB0aW1lIFRpbWUuIFlvdSBuZWVkIHRvIHNldCBtYW51YWxseSB3aGVuIHlvdSBhcmUgdXNpbmcgbWFudWFsIENsb2NrXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCB0aW1lPzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZUaW1lID0gdGhpcy5fX3RpbWU7XG4gICAgdGhpcy5fX3RpbWUgPSB0aW1lIHx8IDAuMDtcbiAgICB0aGlzLl9fZGVsdGFUaW1lID0gdGhpcy5fX3RpbWUgLSBwcmV2VGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgY2xvY2suXG4gICAqL1xuICBwdWJsaWMgcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl9faXNQbGF5aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHRoZSBjbG9jay5cbiAgICovXG4gIHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9faXNQbGF5aW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aW1lIG1hbnVhbGx5LlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX190aW1lID0gdGltZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvY2sgfSBmcm9tICcuL0Nsb2NrJztcblxuLyoqXG4gKiBDbGFzcyB0aGF0IGRlYWxzIHdpdGggdGltZS5cbiAqIFRoaXMgaXMgXCJmcmFtZVwiIHR5cGUgY2xvY2ssIHRoZSBmcmFtZSBpbmNyZWFzZXMgZXZlcnkge0BsaW5rIENsb2NrRnJhbWUjdXBkYXRlfSBjYWxsLlxuICogQHBhcmFtIGZwcyBGcmFtZXMgcGVyIHNlY29uZFxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2tGcmFtZSBleHRlbmRzIENsb2NrIHtcbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGZyYW1lLlxuICAgKi9cbiAgcHJpdmF0ZSBfX2ZyYW1lID0gMDtcblxuICAvKipcbiAgICogSXRzIGZwcy5cbiAgICovXG4gIHByaXZhdGUgX19mcHM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGZwcyA9IDYwICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fX2ZwcyA9IGZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBmcmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19mcmFtZTsgfVxuXG4gIC8qKlxuICAgKiBJdHMgZnBzLlxuICAgKi9cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19mcHM7IH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjbG9jay4gSXQgd2lsbCBpbmNyZWFzZSB0aGUgZnJhbWUgYnkgMS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCB0aGlzLl9faXNQbGF5aW5nICkge1xuICAgICAgdGhpcy5fX3RpbWUgPSB0aGlzLl9fZnJhbWUgLyB0aGlzLl9fZnBzO1xuICAgICAgdGhpcy5fX2RlbHRhVGltZSA9IDEuMCAvIHRoaXMuX19mcHM7XG4gICAgICB0aGlzLl9fZnJhbWUgKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19kZWx0YVRpbWUgPSAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGltZSBtYW51YWxseS5cbiAgICogVGhlIHNldCB0aW1lIHdpbGwgYmUgY29udmVydGVkIGludG8gaW50ZXJuYWwgZnJhbWUgY291bnQsIHNvIHRoZSB0aW1lIHdpbGwgbm90IGJlIGV4YWN0bHkgc2FtZSBhcyBzZXQgb25lLlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX19mcmFtZSA9IE1hdGguZmxvb3IoIHRoaXMuX19mcHMgKiB0aW1lICk7XG4gICAgdGhpcy5fX3RpbWUgPSB0aGlzLl9fZnJhbWUgLyB0aGlzLl9fZnBzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9jayB9IGZyb20gJy4vQ2xvY2snO1xuXG4vKipcbiAqIENsYXNzIHRoYXQgZGVhbHMgd2l0aCB0aW1lLlxuICogVGhpcyBpcyBcInJlYWx0aW1lXCIgdHlwZSBjbG9jaywgdGhlIHRpbWUgZ29lcyBvbiBhcyByZWFsIHdvcmxkLlxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2tSZWFsdGltZSBleHRlbmRzIENsb2NrIHtcbiAgLyoqXG4gICAqIFwiWW91IHNldCB0aGUgdGltZSBtYW51YWxseSB0byBgX19ydFRpbWVgIHdoZW4gaXQncyBgX19ydERhdGVgLlwiXG4gICAqL1xuICBwcml2YXRlIF9fcnRUaW1lID0gMC4wO1xuXG4gIC8qKlxuICAgKiBcIllvdSBzZXQgdGhlIHRpbWUgbWFudWFsbHkgdG8gYF9fcnRUaW1lYCB3aGVuIGl0J3MgYF9fcnREYXRlYC5cIlxuICAgKi9cbiAgcHJpdmF0ZSBfX3J0RGF0ZTogbnVtYmVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBjbG9jayBpcyByZWFsdGltZS4geWVhaC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNSZWFsdGltZSgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjbG9jay4gVGltZSBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRpbWUgaW4gcmVhbCB3b3JsZC5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIHRoaXMuX19pc1BsYXlpbmcgKSB7XG4gICAgICBjb25zdCBwcmV2VGltZSA9IHRoaXMuX190aW1lO1xuICAgICAgY29uc3QgZGVsdGFEYXRlID0gKCBub3cgLSB0aGlzLl9fcnREYXRlICk7XG4gICAgICB0aGlzLl9fdGltZSA9IHRoaXMuX19ydFRpbWUgKyBkZWx0YURhdGUgLyAxMDAwLjA7XG4gICAgICB0aGlzLl9fZGVsdGFUaW1lID0gdGhpcy50aW1lIC0gcHJldlRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19ydFRpbWUgPSB0aGlzLnRpbWU7XG4gICAgICB0aGlzLl9fcnREYXRlID0gbm93O1xuICAgICAgdGhpcy5fX2RlbHRhVGltZSA9IDAuMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aW1lIG1hbnVhbGx5LlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX190aW1lID0gdGltZTtcbiAgICB0aGlzLl9fcnRUaW1lID0gdGhpcy50aW1lO1xuICAgIHRoaXMuX19ydERhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgfVxufVxuIiwiLy8geW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvdGlueS1zZGYgKEJTRCAyLUNsYXVzZSlcbi8vIGltcGxlbWVudHMgaHR0cDovL3Blb3BsZS5jcy51Y2hpY2Fnby5lZHUvfnBmZi9wYXBlcnMvZHQucGRmXG5cbi8qKlxuICogQ29tcHV0ZSBhIG9uZSBkaW1lbnNpb25hbCBlZHQgZnJvbSB0aGUgc291cmNlIGRhdGEuXG4gKiBSZXR1cm5pbmcgZGlzdGFuY2Ugd2lsbCBiZSBzcXVhcmVkLlxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbnRlcm5hbGx5IGluIHtAbGluayBlZHQyZH0uXG4gKlxuICogQHBhcmFtIGRhdGEgRGF0YSBvZiB0aGUgc291cmNlXG4gKiBAcGFyYW0gb2Zmc2V0IE9mZnNldCBvZiB0aGUgc291cmNlIGZyb20gYmVnaW5uaW5nXG4gKiBAcGFyYW0gc3RyaWRlIFN0cmlkZSBvZiB0aGUgc291cmNlXG4gKiBAcGFyYW0gbGVuZ3RoIExlbmd0aCBvZiB0aGUgc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZHQxZChcbiAgZGF0YTogRmxvYXQzMkFycmF5LFxuICBvZmZzZXQ6IG51bWJlcixcbiAgc3RyaWRlOiBudW1iZXIsXG4gIGxlbmd0aDogbnVtYmVyXG4pOiB2b2lkIHtcbiAgLy8gaW5kZXggb2YgcmlnaHRtb3N0IHBhcmFib2xhIGluIGxvd2VyIGVudmVsb3BlXG4gIGxldCBrID0gMDtcblxuICAvLyBsb2NhdGlvbnMgb2YgcGFyYWJvbGFzIGluIGxvd2VyIGVudmVsb3BlXG4gIGNvbnN0IHYgPSBuZXcgRmxvYXQzMkFycmF5KCBsZW5ndGggKTtcbiAgdlsgMCBdID0gMC4wO1xuXG4gIC8vIGxvY2F0aW9ucyBvZiBib3VuZGFyaWVzIGJldHdlZW4gcGFyYWJvbGFzXG4gIGNvbnN0IHogPSBuZXcgRmxvYXQzMkFycmF5KCBsZW5ndGggKyAxICk7XG4gIHpbIDAgXSA9IC1JbmZpbml0eTtcbiAgelsgMSBdID0gSW5maW5pdHk7XG5cbiAgLy8gY3JlYXRlIGEgc3RyYWlnaHQgYXJyYXkgb2YgaW5wdXQgZGF0YVxuICBjb25zdCBmID0gbmV3IEZsb2F0MzJBcnJheSggbGVuZ3RoICk7XG4gIGZvciAoIGxldCBxID0gMDsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICBmWyBxIF0gPSBkYXRhWyBvZmZzZXQgKyBxICogc3RyaWRlIF07XG4gIH1cblxuICAvLyBjb21wdXRlIGxvd2VyIGVudmVsb3BlXG4gIGZvciAoIGxldCBxID0gMTsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICBsZXQgcyA9IDAuMDtcblxuICAgIHdoaWxlICggMCA8PSBrICkge1xuICAgICAgcyA9ICggZlsgcSBdICsgcSAqIHEgLSBmWyB2WyBrIF0gXSAtIHZbIGsgXSAqIHZbIGsgXSApIC8gKCAyLjAgKiBxIC0gMi4wICogdlsgayBdICk7XG4gICAgICBpZiAoIHMgPD0gelsgayBdICkge1xuICAgICAgICBrIC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgayArKztcbiAgICB2WyBrIF0gPSBxO1xuICAgIHpbIGsgXSA9IHM7XG4gICAgelsgayArIDEgXSA9IEluZmluaXR5O1xuICB9XG5cbiAgayA9IDA7XG5cbiAgLy8gZmlsbCBpbiB2YWx1ZXMgb2YgZGlzdGFuY2UgdHJhbnNmb3JtXG4gIGZvciAoIGxldCBxID0gMDsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICB3aGlsZSAoIHpbIGsgKyAxIF0gPCBxICkgeyBrICsrOyB9XG4gICAgY29uc3QgcVN1YlZLID0gcSAtIHZbIGsgXTtcbiAgICBkYXRhWyBvZmZzZXQgKyBxICogc3RyaWRlIF0gPSBmWyB2WyBrIF0gXSArIHFTdWJWSyAqIHFTdWJWSztcbiAgfVxufVxuXG4vKipcbiAqIENvbXB1dGUgYSB0d28gZGltZW5zaW9uYWwgZWR0IGZyb20gdGhlIHNvdXJjZSBkYXRhLlxuICogUmV0dXJuaW5nIGRpc3RhbmNlIHdpbGwgYmUgc3F1YXJlZC5cbiAqXG4gKiBAcGFyYW0gZGF0YSBEYXRhIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSBoZWlnaHQgSGVpZ2h0IG9mIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZHQyZChcbiAgZGF0YTogRmxvYXQzMkFycmF5LFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlclxuKTogdm9pZCB7XG4gIGZvciAoIGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICsrICkge1xuICAgIGVkdDFkKCBkYXRhLCB4LCB3aWR0aCwgaGVpZ2h0ICk7XG4gIH1cblxuICBmb3IgKCBsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKysgKSB7XG4gICAgZWR0MWQoIGRhdGEsIHkgKiB3aWR0aCwgMSwgd2lkdGggKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBgbGVycGAsIG9yIGBtaXhgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKCBhOiBudW1iZXIsIGI6IG51bWJlciwgeDogbnVtYmVyICk6IG51bWJlciB7XG4gIHJldHVybiBhICsgKCBiIC0gYSApICogeDtcbn1cblxuLyoqXG4gKiBgY2xhbXBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCggeDogbnVtYmVyLCBsOiBudW1iZXIsIGg6IG51bWJlciApOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5taW4oIE1hdGgubWF4KCB4LCBsICksIGggKTtcbn1cblxuLyoqXG4gKiBgY2xhbXAoIHgsIDAuMCwgMS4wIClgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXR1cmF0ZSggeDogbnVtYmVyICk6IG51bWJlciB7XG4gIHJldHVybiBjbGFtcCggeCwgMC4wLCAxLjAgKTtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSB2YWx1ZSBmcm9tIGlucHV0IHJhbmdlIHRvIG91dHB1dCByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKCB4OiBudW1iZXIsIHgwOiBudW1iZXIsIHgxOiBudW1iZXIsIHkwOiBudW1iZXIsIHkxOiBudW1iZXIgKTogbnVtYmVyIHtcbiAgcmV0dXJuICggKCB4IC0geDAgKSAqICggeTEgLSB5MCApIC8gKCB4MSAtIHgwICkgKyB5MCApO1xufVxuXG4vKipcbiAqIGBzbW9vdGhzdGVwYCBidXQgbm90IHNtb290aFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGluZWFyc3RlcCggYTogbnVtYmVyLCBiOiBudW1iZXIsIHg6IG51bWJlciApOiBudW1iZXIge1xuICByZXR1cm4gc2F0dXJhdGUoICggeCAtIGEgKSAvICggYiAtIGEgKSApO1xufVxuXG4vKipcbiAqIHdvcmxkIGZhbW91cyBgc21vb3Roc3RlcGAgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIGE6IG51bWJlciwgYjogbnVtYmVyLCB4OiBudW1iZXIgKTogbnVtYmVyIHtcbiAgY29uc3QgdCA9IGxpbmVhcnN0ZXAoIGEsIGIsIHggKTtcbiAgcmV0dXJuIHQgKiB0ICogKCAzLjAgLSAyLjAgKiB0ICk7XG59XG5cbi8qKlxuICogYHNtb290aHN0ZXBgIGJ1dCBtb3JlIHNtb290aFxuICovXG5leHBvcnQgZnVuY3Rpb24gc21vb3RoZXJzdGVwKCBhOiBudW1iZXIsIGI6IG51bWJlciwgeDogbnVtYmVyICk6IG51bWJlciB7XG4gIGNvbnN0IHQgPSBsaW5lYXJzdGVwKCBhLCBiLCB4ICk7XG4gIHJldHVybiB0ICogdCAqIHQgKiAoIHQgKiAoIHQgKiA2LjAgLSAxNS4wICkgKyAxMC4wICk7XG59XG5cbi8qKlxuICogYHNtb290aHN0ZXBgIGJ1dCBXQVkgbW9yZSBzbW9vdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtb290aGVzdHN0ZXAoIGE6IG51bWJlciwgYjogbnVtYmVyLCB4OiBudW1iZXIgKTogbnVtYmVyIHtcbiAgY29uc3QgdCA9IGxpbmVhcnN0ZXAoIGEsIGIsIHggKTtcbiAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiAoIHQgKiAoIHQgKiAoIC0yMC4wICogdCArIDcwLjAgKSAtIDg0LjAgKSArIDM1LjAgKTtcbn1cbiIsImltcG9ydCB7IGxlcnAgfSBmcm9tICcuLi9tYXRoL3V0aWxzJztcblxuLyoqXG4gKiBEbyBleHAgc21vb3RoaW5nXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHBTbW9vdGgge1xuICBwdWJsaWMgZmFjdG9yID0gMTAuMDtcbiAgcHVibGljIHRhcmdldCA9IDAuMDtcbiAgcHVibGljIHZhbHVlID0gMC4wO1xuXG4gIHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZTogbnVtYmVyICk6IG51bWJlciB7XG4gICAgdGhpcy52YWx1ZSA9IGxlcnAoIHRoaXMudGFyZ2V0LCB0aGlzLnZhbHVlLCBNYXRoLmV4cCggLXRoaXMuZmFjdG9yICogZGVsdGFUaW1lICkgKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgc3RhdGUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIGdldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXIgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIGtpbmQgPT09IFwibVwiID8gZiA6IGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyKSA6IGYgPyBmLnZhbHVlIDogc3RhdGUuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHN0YXRlLCB2YWx1ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwibVwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBtZXRob2QgaXMgbm90IHdyaXRhYmxlXCIpO1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgc2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3Qgd3JpdGUgcHJpdmF0ZSBtZW1iZXIgdG8gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiAoa2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIsIHZhbHVlKSA6IGYgPyBmLnZhbHVlID0gdmFsdWUgOiBzdGF0ZS5zZXQocmVjZWl2ZXIsIHZhbHVlKSksIHZhbHVlO1xyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBQb29sPFQ+IHtcbiAgcHVibGljIGFycmF5OiBUW107XG5cbiAgcHVibGljIGluZGV4ID0gMDtcblxuICBwdWJsaWMgZ2V0IGN1cnJlbnQoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXlbIHRoaXMuaW5kZXggXTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYXJyYXk6IFRbXSApIHtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG4gIH1cblxuICBwdWJsaWMgbmV4dCgpOiBUIHtcbiAgICB0aGlzLmluZGV4ID0gKCB0aGlzLmluZGV4ICsgMSApICUgdGhpcy5hcnJheS5sZW5ndGg7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUG9vbCB9IGZyb20gJy4uL1Bvb2wvUG9vbCc7XG5cbmV4cG9ydCBjbGFzcyBHUFVUaW1lciB7XG4gIHB1YmxpYyBxdWVyaWVzOiBQb29sPFdlYkdMUXVlcnk+O1xuICBwdWJsaWMgc3RhY2s6IFByb21pc2U8bnVtYmVyPltdO1xuICBwdWJsaWMgZXh0OiBhbnk7XG4gIHB1YmxpYyByZWFkb25seSBnbDogV2ViR0wyUmVuZGVyaW5nQ29udGV4dDtcblxuICBwcml2YXRlIF9fbG9vcFRhc2tzOiBTZXQ8KCkgPT4gdm9pZD47XG5cbiAgcHVibGljIHN0YXRpYyBpc1N1cHBvcnRlZCggZ2w6IFdlYkdMUmVuZGVyaW5nQ29udGV4dCB8IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIG5ldyBTZXQoIGdsLmdldFN1cHBvcnRlZEV4dGVuc2lvbnMoKSApLmhhcyggJ0VYVF9kaXNqb2ludF90aW1lcl9xdWVyeV93ZWJnbDInICk7XG4gIH1cblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0ICkge1xuICAgIHRoaXMuZ2wgPSBnbDtcblxuICAgIGNvbnN0IHF1ZXJpZXMgPSBuZXcgQXJyYXkoIDEwMjQgKS5maWxsKCAxICkubWFwKCAoKSA9PiBnbC5jcmVhdGVRdWVyeSgpISApO1xuICAgIHRoaXMucXVlcmllcyA9IG5ldyBQb29sKCBxdWVyaWVzICk7XG5cbiAgICB0aGlzLnN0YWNrID0gW107XG5cbiAgICB0aGlzLmV4dCA9IGdsLmdldEV4dGVuc2lvbiggJ0VYVF9kaXNqb2ludF90aW1lcl9xdWVyeV93ZWJnbDInICk7XG5cbiAgICB0aGlzLl9fbG9vcFRhc2tzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gbG9vcFxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHVwZGF0ZSApO1xuICAgIH07XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIEFycmF5LmZyb20oIHRoaXMuX19sb29wVGFza3MgKS5mb3JFYWNoKCAoIHRhc2sgKSA9PiB0YXNrKCkgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtZWFzdXJlKCBmdW5jOiAoKSA9PiB2b2lkICk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgY29uc3QgeyBnbCB9ID0gdGhpcztcblxuICAgIGlmICggdGhpcy5zdGFjay5sZW5ndGggIT09IDAgKSB7XG4gICAgICBnbC5lbmRRdWVyeSggdGhpcy5leHQuVElNRV9FTEFQU0VEX0VYVCApO1xuICAgICAgY29uc3QgcHJvbWlzZUZpbmlzaGluZ1ByZXYgPSB0aGlzLmNoZWNrKCB0aGlzLnF1ZXJpZXMuY3VycmVudCApO1xuXG4gICAgICB0aGlzLnN0YWNrID0gdGhpcy5zdGFjay5tYXAoIGFzeW5jICggcHJvbWlzZUFjY3VtICkgPT4ge1xuICAgICAgICByZXR1cm4gKCBhd2FpdCBwcm9taXNlQWNjdW0gKSArICggYXdhaXQgcHJvbWlzZUZpbmlzaGluZ1ByZXYgKTtcbiAgICAgIH0gKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YWNrLnB1c2goIFByb21pc2UucmVzb2x2ZSggMC4wICkgKTtcblxuICAgIGdsLmJlZ2luUXVlcnkoIHRoaXMuZXh0LlRJTUVfRUxBUFNFRF9FWFQsIHRoaXMucXVlcmllcy5uZXh0KCkgKTtcblxuICAgIGZ1bmMoKTtcblxuICAgIGdsLmVuZFF1ZXJ5KCB0aGlzLmV4dC5USU1FX0VMQVBTRURfRVhUICk7XG5cbiAgICBjb25zdCBwcm9taXNlQWNjdW0gPSB0aGlzLnN0YWNrLnBvcCgpITtcbiAgICBjb25zdCBwcm9taXNlVGhpcyA9IHRoaXMuY2hlY2soIHRoaXMucXVlcmllcy5jdXJyZW50ICk7XG5cbiAgICBpZiAoIHRoaXMuc3RhY2subGVuZ3RoICE9PSAwICkge1xuICAgICAgdGhpcy5zdGFjayA9IHRoaXMuc3RhY2subWFwKCBhc3luYyAoIHByb21pc2VBY2N1bSApID0+IHtcbiAgICAgICAgcmV0dXJuICggYXdhaXQgcHJvbWlzZUFjY3VtICkgKyAoIGF3YWl0IHByb21pc2VUaGlzICk7XG4gICAgICB9ICk7XG5cbiAgICAgIGdsLmJlZ2luUXVlcnkoIHRoaXMuZXh0LlRJTUVfRUxBUFNFRF9FWFQsIHRoaXMucXVlcmllcy5uZXh0KCkgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCBhd2FpdCBwcm9taXNlQWNjdW0gKSArICggYXdhaXQgcHJvbWlzZVRoaXMgKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGVjayggcXVlcnk6IFdlYkdMUXVlcnkgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUgKSA9PiB7XG4gICAgICBjb25zdCB0YXNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBpc0F2YWlsYWJsZSA9IGdsLmdldFF1ZXJ5UGFyYW1ldGVyKCBxdWVyeSwgZ2wuUVVFUllfUkVTVUxUX0FWQUlMQUJMRSApO1xuXG4gICAgICAgIGlmICggaXNBdmFpbGFibGUgKSB7XG4gICAgICAgICAgdGhpcy5fX2xvb3BUYXNrcy5kZWxldGUoIHRhc2sgKTtcbiAgICAgICAgICByZXNvbHZlKCBnbC5nZXRRdWVyeVBhcmFtZXRlciggcXVlcnksIGdsLlFVRVJZX1JFU1VMVCApICogMC4wMDEgKiAwLjAwMSApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB0aGlzLl9fbG9vcFRhc2tzLmFkZCggdGFzayApO1xuICAgIH0gKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2VmdWwgZm9yIHRhcCB0ZW1wb1xuICogU2VlIGFsc286IHtAbGluayBIaXN0b3J5TWVhbkNhbGN1bGF0b3J9XG4gKi9cbmV4cG9ydCBjbGFzcyBIaXN0b3J5TWVhbkNhbGN1bGF0b3Ige1xuICBwcml2YXRlIF9fcmVjYWxjRm9yRWFjaCA9IDA7XG4gIHByaXZhdGUgX19jb3VudFVudGlsUmVjYWxjID0gMDtcbiAgcHJpdmF0ZSBfX2hpc3Rvcnk6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgX19pbmRleCA9IDA7XG4gIHByaXZhdGUgX19sZW5ndGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfX2NvdW50ID0gMDtcbiAgcHJpdmF0ZSBfX2NhY2hlID0gMDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGxlbmd0aDogbnVtYmVyICkge1xuICAgIHRoaXMuX19sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5fX3JlY2FsY0ZvckVhY2ggPSBsZW5ndGg7XG4gICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrICkge1xuICAgICAgdGhpcy5fX2hpc3RvcnlbIGkgXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBtZWFuKCk6IG51bWJlciB7XG4gICAgY29uc3QgY291bnQgPSBNYXRoLm1pbiggdGhpcy5fX2NvdW50LCB0aGlzLl9fbGVuZ3RoICk7XG4gICAgcmV0dXJuIGNvdW50ID09PSAwID8gMC4wIDogdGhpcy5fX2NhY2hlIC8gY291bnQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHJlY2FsY0ZvckVhY2goKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX3JlY2FsY0ZvckVhY2g7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJlY2FsY0ZvckVhY2goIHZhbHVlOiBudW1iZXIgKSB7XG4gICAgY29uc3QgZGVsdGEgPSB2YWx1ZSAtIHRoaXMuX19yZWNhbGNGb3JFYWNoO1xuICAgIHRoaXMuX19yZWNhbGNGb3JFYWNoID0gdmFsdWU7XG4gICAgdGhpcy5fX2NvdW50VW50aWxSZWNhbGMgPSBNYXRoLm1heCggMCwgdGhpcy5fX2NvdW50VW50aWxSZWNhbGMgKyBkZWx0YSApO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX19pbmRleCA9IDA7XG4gICAgdGhpcy5fX2NvdW50ID0gMDtcbiAgICB0aGlzLl9fY2FjaGUgPSAwO1xuICAgIHRoaXMuX19jb3VudFVudGlsUmVjYWxjID0gMDtcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLl9fbGVuZ3RoOyBpICsrICkge1xuICAgICAgdGhpcy5fX2hpc3RvcnlbIGkgXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHB1c2goIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19oaXN0b3J5WyB0aGlzLl9faW5kZXggXTtcbiAgICB0aGlzLl9faGlzdG9yeVsgdGhpcy5fX2luZGV4IF0gPSB2YWx1ZTtcbiAgICB0aGlzLl9fY291bnQgKys7XG4gICAgdGhpcy5fX2luZGV4ID0gKCB0aGlzLl9faW5kZXggKyAxICkgJSB0aGlzLl9fbGVuZ3RoO1xuXG4gICAgaWYgKCB0aGlzLl9fY291bnRVbnRpbFJlY2FsYyA9PT0gMCApIHtcbiAgICAgIHRoaXMucmVjYWxjKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jb3VudFVudGlsUmVjYWxjIC0tO1xuICAgICAgdGhpcy5fX2NhY2hlIC09IHByZXY7XG4gICAgICB0aGlzLl9fY2FjaGUgKz0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlY2FsYygpOiB2b2lkIHtcbiAgICB0aGlzLl9fY291bnRVbnRpbFJlY2FsYyA9IHRoaXMuX19yZWNhbGNGb3JFYWNoO1xuICAgIGNvbnN0IHN1bSA9IHRoaXMuX19oaXN0b3J5XG4gICAgICAuc2xpY2UoIDAsIE1hdGgubWluKCB0aGlzLl9fY291bnQsIHRoaXMuX19sZW5ndGggKSApXG4gICAgICAucmVkdWNlKCAoIHN1bSwgdiApID0+IHN1bSArIHYsIDAgKTtcbiAgICB0aGlzLl9fY2FjaGUgPSBzdW07XG4gIH1cbn1cbiIsImltcG9ydCB7IGJpbmFyeVNlYXJjaCB9IGZyb20gJy4uL2FsZ29yaXRobS9iaW5hcnlTZWFyY2gnO1xuXG4vKipcbiAqIFVzZWZ1bCBmb3IgZnBzIGNhbGNcbiAqIFNlZSBhbHNvOiB7QGxpbmsgSGlzdG9yeU1lYW5DYWxjdWxhdG9yfVxuICovXG5leHBvcnQgY2xhc3MgSGlzdG9yeVBlcmNlbnRpbGVDYWxjdWxhdG9yIHtcbiAgcHJpdmF0ZSBfX2hpc3Rvcnk6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgX19zb3J0ZWQ6IG51bWJlcltdID0gW107XG4gIHByaXZhdGUgX19pbmRleCA9IDA7XG4gIHByaXZhdGUgcmVhZG9ubHkgX19sZW5ndGg6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGxlbmd0aDogbnVtYmVyICkge1xuICAgIHRoaXMuX19sZW5ndGggPSBsZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lZGlhbigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBlcmNlbnRpbGUoIDUwLjAgKTtcbiAgfVxuXG4gIHB1YmxpYyBwZXJjZW50aWxlKCBwZXJjZW50aWxlOiBudW1iZXIgKTogbnVtYmVyIHtcbiAgICBpZiAoIHRoaXMuX19oaXN0b3J5Lmxlbmd0aCA9PT0gMCApIHsgcmV0dXJuIDAuMDsgfVxuICAgIHJldHVybiB0aGlzLl9fc29ydGVkWyBNYXRoLnJvdW5kKCBwZXJjZW50aWxlICogMC4wMSAqICggdGhpcy5fX2hpc3RvcnkubGVuZ3RoIC0gMSApICkgXTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9faW5kZXggPSAwO1xuICAgIHRoaXMuX19oaXN0b3J5ID0gW107XG4gICAgdGhpcy5fX3NvcnRlZCA9IFtdO1xuICB9XG5cbiAgcHVibGljIHB1c2goIHZhbHVlOiBudW1iZXIgKTogdm9pZCB7XG4gICAgY29uc3QgcHJldiA9IHRoaXMuX19oaXN0b3J5WyB0aGlzLl9faW5kZXggXTtcbiAgICB0aGlzLl9faGlzdG9yeVsgdGhpcy5fX2luZGV4IF0gPSB2YWx1ZTtcbiAgICB0aGlzLl9faW5kZXggPSAoIHRoaXMuX19pbmRleCArIDEgKSAlIHRoaXMuX19sZW5ndGg7XG5cbiAgICAvLyByZW1vdmUgdGhlIHByZXYgZnJvbSBzb3J0ZWQgYXJyYXlcbiAgICBpZiAoIHRoaXMuX19zb3J0ZWQubGVuZ3RoID09PSB0aGlzLl9fbGVuZ3RoICkge1xuICAgICAgY29uc3QgcHJldkluZGV4ID0gYmluYXJ5U2VhcmNoKCB0aGlzLl9fc29ydGVkLCBwcmV2ICk7XG4gICAgICB0aGlzLl9fc29ydGVkLnNwbGljZSggcHJldkluZGV4LCAxICk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBiaW5hcnlTZWFyY2goIHRoaXMuX19zb3J0ZWQsIHZhbHVlICk7XG4gICAgdGhpcy5fX3NvcnRlZC5zcGxpY2UoIGluZGV4LCAwLCB2YWx1ZSApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIaXN0b3J5UGVyY2VudGlsZUNhbGN1bGF0b3IgfSBmcm9tICcuL0hpc3RvcnlQZXJjZW50aWxlQ2FsY3VsYXRvcic7XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgSXQncyBhY3R1YWxseSBqdXN0IGEgc3BlY2lhbCBjYXNlIG9mIHtAbGluayBIaXN0b3J5UGVyY2VudGlsZUNhbGN1bGF0b3J9XG4gKi9cbmV4cG9ydCBjbGFzcyBIaXN0b3J5TWVkaWFuQ2FsY3VsYXRvciBleHRlbmRzIEhpc3RvcnlQZXJjZW50aWxlQ2FsY3VsYXRvciB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbGVuZ3RoOiBudW1iZXIgKSB7XG4gICAgc3VwZXIoIGxlbmd0aCApO1xuICAgIGNvbnNvbGUud2FybiggJ0hpc3RvcnlNZWRpYW5DYWxjdWxhdG9yOiBEZXByZWNhdGVkLiBVc2UgSGlzdG9yeVBlcmNlbnRpbGVDYWxjdWxhdG9yIGluc3RlYWQnICk7XG4gIH1cbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4nO1xuaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi4vcXVhdC9SYXdRdWF0ZXJuaW9uJztcblxuLyoqXG4gKiBDb252ZXJ0IGEgcXVhdGVybmlvbiBpbnRvIGEgbWF0cml4NC5cbiAqXG4gKiBZb2lua2VkIGZyb20gVGhyZWUuanMuXG4gKlxuICogU2VlOiBodHRwczovL3RocmVlanMub3JnL2RvY3MvI2FwaS9lbi9tYXRoL01hdHJpeDQubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRGcm9tUXVhdGVybmlvbiggcXVhdDogUmF3UXVhdGVybmlvbiApOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgeCA9IHF1YXRbIDAgXTtcbiAgY29uc3QgeSA9IHF1YXRbIDEgXTtcbiAgY29uc3QgeiA9IHF1YXRbIDIgXTtcbiAgY29uc3QgdyA9IHF1YXRbIDMgXTtcblxuICByZXR1cm4gW1xuICAgIDEuMCAtIDIuMCAqIHkgKiB5IC0gMi4wICogeiAqIHosIDIuMCAqIHggKiB5ICsgMi4wICogeiAqIHcsIDIuMCAqIHggKiB6IC0gMi4wICogeSAqIHcsIDAuMCxcbiAgICAyLjAgKiB4ICogeSAtIDIuMCAqIHogKiB3LCAxLjAgLSAyLjAgKiB4ICogeCAtIDIuMCAqIHogKiB6LCAyLjAgKiB5ICogeiArIDIuMCAqIHggKiB3LCAwLjAsXG4gICAgMi4wICogeCAqIHogKyAyLjAgKiB5ICogdywgMi4wICogeSAqIHogLSAyLjAgKiB4ICogdywgMS4wIC0gMi4wICogeCAqIHggLSAyLjAgKiB5ICogeSwgMC4wLFxuICAgIDAuMCwgMC4wLCAwLjAsIDEuMCxcbiAgXTtcbn1cbiIsImltcG9ydCB7IG1hdDRGcm9tUXVhdGVybmlvbiB9IGZyb20gJy4vbWF0NEZyb21RdWF0ZXJuaW9uJztcbmltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5pbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuLi9xdWF0L1Jhd1F1YXRlcm5pb24nO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBDb21wb3NlIGEgbWF0cml4IG91dCBvZiBwb3NpdGlvbiwgc2NhbGUsIGFuZCByb3RhdGlvbi5cbiAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRDb21wb3NlKFxuICBwb3NpdGlvbjogUmF3VmVjdG9yMyxcbiAgcm90YXRpb246IFJhd1F1YXRlcm5pb24sXG4gIHNjYWxlOiBSYXdWZWN0b3IzLFxuKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0IG1hdFJvdCA9IG1hdDRGcm9tUXVhdGVybmlvbiggcm90YXRpb24gKTtcblxuICBjb25zdCBzeCA9IHNjYWxlWyAwIF0sIHN5ID0gc2NhbGVbIDEgXSwgc3ogPSBzY2FsZVsgMiBdO1xuXG4gIHJldHVybiBbXG4gICAgbWF0Um90WyAwIF0gKiBzeCxcbiAgICBtYXRSb3RbIDEgXSAqIHN4LFxuICAgIG1hdFJvdFsgMiBdICogc3gsXG4gICAgMC4wLFxuXG4gICAgbWF0Um90WyA0IF0gKiBzeSxcbiAgICBtYXRSb3RbIDUgXSAqIHN5LFxuICAgIG1hdFJvdFsgNiBdICogc3ksXG4gICAgMC4wLFxuXG4gICAgbWF0Um90WyA4IF0gKiBzeixcbiAgICBtYXRSb3RbIDkgXSAqIHN6LFxuICAgIG1hdFJvdFsgMTAgXSAqIHN6LFxuICAgIDAuMCxcblxuICAgIHBvc2l0aW9uWyAwIF0sXG4gICAgcG9zaXRpb25bIDEgXSxcbiAgICBwb3NpdGlvblsgMiBdLFxuICAgIDEuMFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiBSZXR1cm4gYSBkZXRlcm1pbmFudCBvZiBnaXZlbiBtYXQ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NERldGVybWluYW50KCBtOiBSYXdNYXRyaXg0ICk6IG51bWJlciB7XG4gIGNvbnN0XG4gICAgYTAwID0gbVsgIDAgXSwgYTAxID0gbVsgIDEgXSwgYTAyID0gbVsgIDIgXSwgYTAzID0gbVsgIDMgXSxcbiAgICBhMTAgPSBtWyAgNCBdLCBhMTEgPSBtWyAgNSBdLCBhMTIgPSBtWyAgNiBdLCBhMTMgPSBtWyAgNyBdLFxuICAgIGEyMCA9IG1bICA4IF0sIGEyMSA9IG1bICA5IF0sIGEyMiA9IG1bIDEwIF0sIGEyMyA9IG1bIDExIF0sXG4gICAgYTMwID0gbVsgMTIgXSwgYTMxID0gbVsgMTMgXSwgYTMyID0gbVsgMTQgXSwgYTMzID0gbVsgMTUgXSxcbiAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLCAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSwgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLCAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSwgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi4vbWF0NC9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4vUmF3UXVhdGVybmlvbic7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBRdWF0ZXJuaW9uIG91dCBvZiBhIHJvdGF0aW9uIG1hdHJpeC5cbiAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRGcm9tTWF0cml4NCggbTogUmF3TWF0cml4NCApOiBSYXdRdWF0ZXJuaW9uIHtcbiAgY29uc3QgbTExID0gbVsgMCBdLCBtMTIgPSBtWyA0IF0sIG0xMyA9IG1bIDggXSxcbiAgICBtMjEgPSBtWyAxIF0sIG0yMiA9IG1bIDUgXSwgbTIzID0gbVsgOSBdLFxuICAgIG0zMSA9IG1bIDIgXSwgbTMyID0gbVsgNiBdLCBtMzMgPSBtWyAxMCBdLFxuICAgIHRyYWNlID0gbTExICsgbTIyICsgbTMzO1xuXG4gIGlmICggdHJhY2UgPiAwICkge1xuICAgIGNvbnN0IHMgPSAwLjUgLyBNYXRoLnNxcnQoIHRyYWNlICsgMS4wICk7XG4gICAgcmV0dXJuIFtcbiAgICAgICggbTMyIC0gbTIzICkgKiBzLFxuICAgICAgKCBtMTMgLSBtMzEgKSAqIHMsXG4gICAgICAoIG0yMSAtIG0xMiApICogcyxcbiAgICAgIDAuMjUgLyBzXG4gICAgXTtcbiAgfSBlbHNlIGlmICggbTExID4gbTIyICYmIG0xMSA+IG0zMyApIHtcbiAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMTEgLSBtMjIgLSBtMzMgKTtcbiAgICByZXR1cm4gW1xuICAgICAgMC4yNSAqIHMsXG4gICAgICAoIG0xMiArIG0yMSApIC8gcyxcbiAgICAgICggbTEzICsgbTMxICkgLyBzLFxuICAgICAgKCBtMzIgLSBtMjMgKSAvIHNcbiAgICBdO1xuICB9IGVsc2UgaWYgKCBtMjIgPiBtMzMgKSB7XG4gICAgY29uc3QgcyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTIyIC0gbTExIC0gbTMzICk7XG4gICAgcmV0dXJuIFtcbiAgICAgICggbTEyICsgbTIxICkgLyBzLFxuICAgICAgMC4yNSAqIHMsXG4gICAgICAoIG0yMyArIG0zMiApIC8gcyxcbiAgICAgICggbTEzIC0gbTMxICkgLyBzXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMzMgLSBtMTEgLSBtMjIgKTtcbiAgICByZXR1cm4gW1xuICAgICAgKCBtMTMgKyBtMzEgKSAvIHMsXG4gICAgICAoIG0yMyArIG0zMiApIC8gcyxcbiAgICAgIDAuMjUgKiBzLFxuICAgICAgKCBtMjEgLSBtMTIgKSAvIHNcbiAgICBdO1xuICB9XG59XG4iLCIvKipcbiAqIFJldHVybiBhbiBldWNsaWRlYW4gbGVuZ3RoIG9mIGdpdmVuIHZlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlY0xlbmd0aCggdmVjOiBudW1iZXJbXSApOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5zcXJ0KCB2ZWMucmVkdWNlKCAoIHN1bSwgdiApID0+IHN1bSArIHYgKiB2LCAwLjAgKSApO1xufVxuIiwiaW1wb3J0IHsgbWF0NERldGVybWluYW50IH0gZnJvbSAnLi9tYXQ0RGV0ZXJtaW5hbnQnO1xuaW1wb3J0IHsgcXVhdEZyb21NYXRyaXg0IH0gZnJvbSAnLi4vcXVhdC9xdWF0RnJvbU1hdHJpeDQnO1xuaW1wb3J0IHsgdmVjTGVuZ3RoIH0gZnJvbSAnLi4vdmVjL3ZlY0xlbmd0aCc7XG5pbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi4vcXVhdC9SYXdRdWF0ZXJuaW9uJztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4uL3ZlYzMvUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogRGVjb21wb3NlIGEgbWF0cml4IGludG8gYSBwb3NpdGlvbiwgYSBzY2FsZSwgYW5kIGEgcm90YXRpb24uXG4gKiBZb2lua2VkIGZyb20gVGhyZWUuanMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0RGVjb21wb3NlKCBtOiBSYXdNYXRyaXg0ICk6IHtcbiAgcG9zaXRpb246IFJhd1ZlY3RvcjM7XG4gIHNjYWxlOiBSYXdWZWN0b3IzO1xuICByb3RhdGlvbjogUmF3UXVhdGVybmlvbjtcbn0ge1xuICBsZXQgc3ggPSB2ZWNMZW5ndGgoIFsgbVsgMCBdLCBtWyAxIF0sIG1bIDIgXSBdICk7XG4gIGNvbnN0IHN5ID0gdmVjTGVuZ3RoKCBbIG1bIDQgXSwgbVsgNSBdLCBtWyA2IF0gXSApO1xuICBjb25zdCBzeiA9IHZlY0xlbmd0aCggWyBtWyA4IF0sIG1bIDkgXSwgbVsgMTAgXSBdICk7XG5cbiAgLy8gaWYgZGV0ZXJtaW5hbnQgaXMgbmVnYXRpdmUsIHdlIG5lZWQgdG8gaW52ZXJ0IG9uZSBzY2FsZVxuICBjb25zdCBkZXQgPSBtYXQ0RGV0ZXJtaW5hbnQoIG0gKTtcbiAgaWYgKCBkZXQgPCAwICkgeyBzeCA9IC1zeDsgfVxuXG4gIGNvbnN0IGludlN4ID0gMS4wIC8gc3g7XG4gIGNvbnN0IGludlN5ID0gMS4wIC8gc3k7XG4gIGNvbnN0IGludlN6ID0gMS4wIC8gc3o7XG5cbiAgY29uc3Qgcm90YXRpb25NYXRyaXggPSBtLmNvbmNhdCgpIGFzIFJhd01hdHJpeDQ7XG5cbiAgcm90YXRpb25NYXRyaXhbIDAgXSAqPSBpbnZTeDtcbiAgcm90YXRpb25NYXRyaXhbIDEgXSAqPSBpbnZTeDtcbiAgcm90YXRpb25NYXRyaXhbIDIgXSAqPSBpbnZTeDtcblxuICByb3RhdGlvbk1hdHJpeFsgNCBdICo9IGludlN5O1xuICByb3RhdGlvbk1hdHJpeFsgNSBdICo9IGludlN5O1xuICByb3RhdGlvbk1hdHJpeFsgNiBdICo9IGludlN5O1xuXG4gIHJvdGF0aW9uTWF0cml4WyA4IF0gKj0gaW52U3o7XG4gIHJvdGF0aW9uTWF0cml4WyA5IF0gKj0gaW52U3o7XG4gIHJvdGF0aW9uTWF0cml4WyAxMCBdICo9IGludlN6O1xuXG4gIHJldHVybiB7XG4gICAgcG9zaXRpb246IFsgbVsgMTIgXSwgbVsgMTMgXSwgbVsgMTQgXSBdLFxuICAgIHNjYWxlOiBbIHN4LCBzeSwgc3ogXSxcbiAgICByb3RhdGlvbjogcXVhdEZyb21NYXRyaXg0KCByb3RhdGlvbk1hdHJpeCApLFxuICB9O1xufVxuIiwiLyoqXG4gKiBTY2FsZSB0aGUgZ2l2ZW4gdmVjdG9yIGJ5IGEgc2NhbGFyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjU2NhbGUoIHZlYzogbnVtYmVyW10sIHNjYWxhcjogbnVtYmVyICk6IG51bWJlcltdIHtcbiAgcmV0dXJuIHZlYy5tYXAoICggdiApID0+IHYgKiBzY2FsYXIgKTtcbn1cbiIsImltcG9ydCB7IHZlY1NjYWxlIH0gZnJvbSAnLi4vdmVjL3ZlY1NjYWxlJztcbmltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5cbi8qKlxuICogIGFuIGludmVyc2Ugb2YgZ2l2ZW4gbWF0NC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRJbnZlcnNlKCBtOiBSYXdNYXRyaXg0ICk6IFJhd01hdHJpeDQge1xuICBjb25zdFxuICAgIGEwMCA9IG1bICAwIF0sIGEwMSA9IG1bICAxIF0sIGEwMiA9IG1bICAyIF0sIGEwMyA9IG1bICAzIF0sXG4gICAgYTEwID0gbVsgIDQgXSwgYTExID0gbVsgIDUgXSwgYTEyID0gbVsgIDYgXSwgYTEzID0gbVsgIDcgXSxcbiAgICBhMjAgPSBtWyAgOCBdLCBhMjEgPSBtWyAgOSBdLCBhMjIgPSBtWyAxMCBdLCBhMjMgPSBtWyAxMSBdLFxuICAgIGEzMCA9IG1bIDEyIF0sIGEzMSA9IG1bIDEzIF0sIGEzMiA9IG1bIDE0IF0sIGEzMyA9IG1bIDE1IF0sXG4gICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCwgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCwgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgY29uc3QgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gIGlmICggZGV0ID09PSAwLjAgKSB7IHJldHVybiB2ZWNTY2FsZSggbSwgMC4wICkgYXMgUmF3TWF0cml4NDsgfVxuXG4gIHJldHVybiB2ZWNTY2FsZSggW1xuICAgIGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSxcbiAgICBhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDksXG4gICAgYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzLFxuICAgIGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMyxcbiAgICBhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcsXG4gICAgYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3LFxuICAgIGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSxcbiAgICBhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEsXG4gICAgYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2LFxuICAgIGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNixcbiAgICBhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDAsXG4gICAgYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwLFxuICAgIGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNixcbiAgICBhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYsXG4gICAgYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwLFxuICAgIGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCxcbiAgXSwgMS4wIC8gZGV0ICkgYXMgUmF3TWF0cml4NDtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4vUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogUmV0dXJuIGEgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjM3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWMzQ3Jvc3MoIHZlY0E6IFJhd1ZlY3RvcjMsIHZlY0I6IFJhd1ZlY3RvcjMgKTogUmF3VmVjdG9yMyB7XG4gIHJldHVybiBbXG4gICAgdmVjQVsgMSBdICogdmVjQlsgMiBdIC0gdmVjQVsgMiBdICogdmVjQlsgMSBdLFxuICAgIHZlY0FbIDIgXSAqIHZlY0JbIDAgXSAtIHZlY0FbIDAgXSAqIHZlY0JbIDIgXSxcbiAgICB2ZWNBWyAwIF0gKiB2ZWNCWyAxIF0gLSB2ZWNBWyAxIF0gKiB2ZWNCWyAwIF0sXG4gIF07XG59XG4iLCIvKipcbiAqIFJldHVybiBhIHN1bSBvZiB2ZWN0b3JzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjQWRkKCAuLi52ZWNzOiBudW1iZXJbXVtdICk6IG51bWJlcltdIHtcbiAgaWYgKCB2ZWNzLmxlbmd0aCA8IDIgKSB7XG4gICAgcmV0dXJuIHZlY3NbIDAgXTtcbiAgfVxuXG4gIGNvbnN0IGEgPSB2ZWNzLnNoaWZ0KCkhO1xuICBjb25zdCBiID0gdmVjQWRkKCAuLi52ZWNzICk7XG5cbiAgcmV0dXJuIGEubWFwKCAoIHYsIGkgKSA9PiB2ICsgYlsgaSBdICk7XG59XG4iLCJpbXBvcnQgeyB2ZWNMZW5ndGggfSBmcm9tICcuL3ZlY0xlbmd0aCc7XG5pbXBvcnQgeyB2ZWNTY2FsZSB9IGZyb20gJy4vdmVjU2NhbGUnO1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBnaXZlbiB2ZWN0b3IuXG4gKiBJZiB0aGUgbGVuZ3RoIG9mIGdpdmVuIHZlY3RvciBpcyAwLjAsIGl0IHdpbGwgcmV0dXJuIGEgemVybyB2ZWN0b3IgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlY05vcm1hbGl6ZSggdmVjOiBudW1iZXJbXSApOiBudW1iZXJbXSB7XG4gIGNvbnN0IGxlbiA9IHZlY0xlbmd0aCggdmVjICk7XG4gIGNvbnN0IGludkxlbiA9IGxlbiA9PT0gMC4wID8gMC4wIDogMS4wIC8gbGVuO1xuICByZXR1cm4gdmVjU2NhbGUoIHZlYywgaW52TGVuICk7XG59XG4iLCIvKipcbiAqIFN1YnRyYWN0IGEgdmVjdG9yIGZyb20gYSB2ZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWNTdWIoIHZlY0E6IG51bWJlcltdLCB2ZWNCOiBudW1iZXJbXSApOiBudW1iZXJbXSB7XG4gIHJldHVybiB2ZWNBLm1hcCggKCB2LCBpICkgPT4gdiAtIHZlY0JbIGkgXSApO1xufVxuIiwiaW1wb3J0IHsgdmVjM0Nyb3NzIH0gZnJvbSAnLi4vdmVjMy92ZWMzQ3Jvc3MnO1xuaW1wb3J0IHsgdmVjQWRkIH0gZnJvbSAnLi4vdmVjL3ZlY0FkZCc7XG5pbXBvcnQgeyB2ZWNOb3JtYWxpemUgfSBmcm9tICcuLi92ZWMvdmVjTm9ybWFsaXplJztcbmltcG9ydCB7IHZlY1NjYWxlIH0gZnJvbSAnLi4vdmVjL3ZlY1NjYWxlJztcbmltcG9ydCB7IHZlY1N1YiB9IGZyb20gJy4uL3ZlYy92ZWNTdWInO1xuaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4uL3ZlYzMvUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBcIkxvb2tBdFwiIG1hdHJpeC5cbiAqXG4gKiBTZWUgYWxzbzoge0BsaW5rIG1hdDRMb29rQXRJbnZlcnNlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NExvb2tBdChcbiAgcG9zaXRpb246IFJhd1ZlY3RvcjMsXG4gIHRhcmdldDogUmF3VmVjdG9yMyA9IFsgMC4wLCAwLjAsIDAuMCBdLFxuICB1cDogUmF3VmVjdG9yMyA9IFsgMC4wLCAxLjAsIDAuMCBdLFxuICByb2xsID0gMC4wLFxuKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0IGRpciA9IHZlY05vcm1hbGl6ZSggdmVjU3ViKCBwb3NpdGlvbiwgdGFyZ2V0ICkgKSBhcyBSYXdWZWN0b3IzO1xuXG4gIGxldCBzaWQgPSB2ZWNOb3JtYWxpemUoIHZlYzNDcm9zcyggdXAsIGRpciApICkgYXMgUmF3VmVjdG9yMztcblxuICBpZiAoIHJvbGwgIT09IDAuMCApIHtcbiAgICBzaWQgPSB2ZWNBZGQoXG4gICAgICB2ZWNTY2FsZSggc2lkLCBNYXRoLmNvcyggcm9sbCApICksXG4gICAgICB2ZWNTY2FsZSggdmVjM0Nyb3NzKCBkaXIsIHNpZCApLCBNYXRoLnNpbiggcm9sbCApICksXG4gICAgKSBhcyBSYXdWZWN0b3IzO1xuICB9XG5cbiAgY29uc3QgdG9wID0gdmVjM0Nyb3NzKCBkaXIsIHNpZCApO1xuXG4gIHJldHVybiBbXG4gICAgc2lkWyAwIF0sIHNpZFsgMSBdLCBzaWRbIDIgXSwgMC4wLFxuICAgIHRvcFsgMCBdLCB0b3BbIDEgXSwgdG9wWyAyIF0sIDAuMCxcbiAgICBkaXJbIDAgXSwgZGlyWyAxIF0sIGRpclsgMiBdLCAwLjAsXG4gICAgcG9zaXRpb25bIDAgXSwgcG9zaXRpb25bIDEgXSwgcG9zaXRpb25bIDIgXSwgMS4wXG4gIF07XG59XG4iLCIvKipcbiAqIFJldHVybiBhIGRvdCBwcm9kdWN0IG9mIGdpdmVuIHR3byB2ZWN0b3JzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjRG90KCB2ZWNBOiBudW1iZXJbXSwgdmVjQjogbnVtYmVyW10gKTogbnVtYmVyIHtcbiAgcmV0dXJuIHZlY0EucmVkdWNlKCAoIHN1bSwgdiwgaSApID0+IHN1bSArIHYgKiB2ZWNCWyBpIF0sIDAuMCApO1xufVxuIiwiaW1wb3J0IHsgdmVjM0Nyb3NzIH0gZnJvbSAnLi4vdmVjMy92ZWMzQ3Jvc3MnO1xuaW1wb3J0IHsgdmVjQWRkIH0gZnJvbSAnLi4vdmVjL3ZlY0FkZCc7XG5pbXBvcnQgeyB2ZWNEb3QgfSBmcm9tICcuLi92ZWMvdmVjRG90JztcbmltcG9ydCB7IHZlY05vcm1hbGl6ZSB9IGZyb20gJy4uL3ZlYy92ZWNOb3JtYWxpemUnO1xuaW1wb3J0IHsgdmVjU2NhbGUgfSBmcm9tICcuLi92ZWMvdmVjU2NhbGUnO1xuaW1wb3J0IHsgdmVjU3ViIH0gZnJvbSAnLi4vdmVjL3ZlY1N1Yic7XG5pbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhbiBpbnZlcnNlIG9mIFwiTG9va0F0XCIgbWF0cml4LiBHb29kIGZvciBjcmVhdGluZyBhIHZpZXcgbWF0cml4LlxuICpcbiAqIFNlZSBhbHNvOiB7QGxpbmsgbWF0NExvb2tBdH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRMb29rQXRJbnZlcnNlKFxuICBwb3NpdGlvbjogUmF3VmVjdG9yMyxcbiAgdGFyZ2V0OiBSYXdWZWN0b3IzID0gWyAwLjAsIDAuMCwgMC4wIF0sXG4gIHVwOiBSYXdWZWN0b3IzID0gWyAwLjAsIDEuMCwgMC4wIF0sXG4gIHJvbGwgPSAwLjAsXG4pOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgZGlyID0gdmVjTm9ybWFsaXplKCB2ZWNTdWIoIHBvc2l0aW9uLCB0YXJnZXQgKSApIGFzIFJhd1ZlY3RvcjM7XG5cbiAgbGV0IHNpZCA9IHZlY05vcm1hbGl6ZSggdmVjM0Nyb3NzKCB1cCwgZGlyICkgKSBhcyBSYXdWZWN0b3IzO1xuXG4gIGlmICggcm9sbCAhPT0gMC4wICkge1xuICAgIHNpZCA9IHZlY0FkZChcbiAgICAgIHZlY1NjYWxlKCBzaWQsIE1hdGguY29zKCByb2xsICkgKSxcbiAgICAgIHZlY1NjYWxlKCB2ZWMzQ3Jvc3MoIGRpciwgc2lkICksIE1hdGguc2luKCByb2xsICkgKSxcbiAgICApIGFzIFJhd1ZlY3RvcjM7XG4gIH1cblxuICBjb25zdCB0b3AgPSB2ZWMzQ3Jvc3MoIGRpciwgc2lkICk7XG5cbiAgcmV0dXJuIFtcbiAgICBzaWRbIDAgXSwgdG9wWyAwIF0sIGRpclsgMCBdLCAwLjAsXG4gICAgc2lkWyAxIF0sIHRvcFsgMSBdLCBkaXJbIDEgXSwgMC4wLFxuICAgIHNpZFsgMiBdLCB0b3BbIDIgXSwgZGlyWyAyIF0sIDAuMCxcbiAgICAtdmVjRG90KCBzaWQsIHBvc2l0aW9uICksXG4gICAgLXZlY0RvdCggdG9wLCBwb3NpdGlvbiApLFxuICAgIC12ZWNEb3QoIGRpciwgcG9zaXRpb24gKSxcbiAgICAxLjAsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIFJldHVybiBhIG11bHRpcGxpY2F0aW9uIHJlc3VsdCBvZiBtYXRyaWNlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRNdWx0aXBseSggLi4ubWF0czogUmF3TWF0cml4NFtdICk6IFJhd01hdHJpeDQge1xuICBpZiAoIG1hdHMubGVuZ3RoIDwgMiApIHtcbiAgICByZXR1cm4gbWF0c1sgMCBdO1xuICB9XG5cbiAgY29uc3QgYSA9IG1hdHMuc2hpZnQoKSE7XG4gIGNvbnN0IGIgPSBtYXQ0TXVsdGlwbHkoIC4uLm1hdHMgKTtcbiAgY29uc3RcbiAgICBhMDAgPSBhWyAgMCBdLCBhMDEgPSBhWyAgMSBdLCBhMDIgPSBhWyAgMiBdLCBhMDMgPSBhWyAgMyBdLFxuICAgIGExMCA9IGFbICA0IF0sIGExMSA9IGFbICA1IF0sIGExMiA9IGFbICA2IF0sIGExMyA9IGFbICA3IF0sXG4gICAgYTIwID0gYVsgIDggXSwgYTIxID0gYVsgIDkgXSwgYTIyID0gYVsgMTAgXSwgYTIzID0gYVsgMTEgXSxcbiAgICBhMzAgPSBhWyAxMiBdLCBhMzEgPSBhWyAxMyBdLCBhMzIgPSBhWyAxNCBdLCBhMzMgPSBhWyAxNSBdLFxuICAgIGIwMCA9IGJbICAwIF0sIGIwMSA9IGJbICAxIF0sIGIwMiA9IGJbICAyIF0sIGIwMyA9IGJbICAzIF0sXG4gICAgYjEwID0gYlsgIDQgXSwgYjExID0gYlsgIDUgXSwgYjEyID0gYlsgIDYgXSwgYjEzID0gYlsgIDcgXSxcbiAgICBiMjAgPSBiWyAgOCBdLCBiMjEgPSBiWyAgOSBdLCBiMjIgPSBiWyAxMCBdLCBiMjMgPSBiWyAxMSBdLFxuICAgIGIzMCA9IGJbIDEyIF0sIGIzMSA9IGJbIDEzIF0sIGIzMiA9IGJbIDE0IF0sIGIzMyA9IGJbIDE1IF07XG5cbiAgcmV0dXJuIFtcbiAgICBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDIgKyBhMzAgKiBiMDMsXG4gICAgYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyICsgYTMxICogYjAzLFxuICAgIGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMiArIGEzMiAqIGIwMyxcbiAgICBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDIgKyBhMzMgKiBiMDMsXG5cbiAgICBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTIgKyBhMzAgKiBiMTMsXG4gICAgYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyICsgYTMxICogYjEzLFxuICAgIGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMiArIGEzMiAqIGIxMyxcbiAgICBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTIgKyBhMzMgKiBiMTMsXG5cbiAgICBhMDAgKiBiMjAgKyBhMTAgKiBiMjEgKyBhMjAgKiBiMjIgKyBhMzAgKiBiMjMsXG4gICAgYTAxICogYjIwICsgYTExICogYjIxICsgYTIxICogYjIyICsgYTMxICogYjIzLFxuICAgIGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMiArIGEzMiAqIGIyMyxcbiAgICBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjIgKyBhMzMgKiBiMjMsXG5cbiAgICBhMDAgKiBiMzAgKyBhMTAgKiBiMzEgKyBhMjAgKiBiMzIgKyBhMzAgKiBiMzMsXG4gICAgYTAxICogYjMwICsgYTExICogYjMxICsgYTIxICogYjMyICsgYTMxICogYjMzLFxuICAgIGEwMiAqIGIzMCArIGExMiAqIGIzMSArIGEyMiAqIGIzMiArIGEzMiAqIGIzMyxcbiAgICBhMDMgKiBiMzAgKyBhMTMgKiBiMzEgKyBhMjMgKiBiMzIgKyBhMzMgKiBiMzMsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgXCJQZXJzcGVjdGl2ZVwiIHByb2plY3Rpb24gbWF0cml4LlxuICogSXQgd29uJ3QgaW5jbHVkZSBhc3BlY3QhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0UGVyc3BlY3RpdmUoXG4gIGZvdiA9IDQ1LjAsXG4gIG5lYXIgPSAwLjAxLFxuICBmYXIgPSAxMDAuMCxcbik6IFJhd01hdHJpeDQge1xuICBjb25zdCBwID0gMS4wIC8gTWF0aC50YW4oIGZvdiAqIE1hdGguUEkgLyAzNjAuMCApO1xuICBjb25zdCBkID0gKCBmYXIgLSBuZWFyICk7XG4gIHJldHVybiBbXG4gICAgcCwgMC4wLCAwLjAsIDAuMCxcbiAgICAwLjAsIHAsIDAuMCwgMC4wLFxuICAgIDAuMCwgMC4wLCAtKCBmYXIgKyBuZWFyICkgLyBkLCAtMS4wLFxuICAgIDAuMCwgMC4wLCAtMiAqIGZhciAqIG5lYXIgLyBkLCAwLjBcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSAzZCByb3RhdGlvbiBtYXRyaXgsIHJvdGF0ZXMgYXJvdW5kIHggYXhpcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRSb3RhdGVYKCB0aGV0YTogbnVtYmVyICk6IFJhd01hdHJpeDQge1xuICBjb25zdCBjID0gTWF0aC5jb3MoIHRoZXRhICk7XG4gIGNvbnN0IHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuICByZXR1cm4gW1xuICAgIDEsIDAsIDAsIDAsXG4gICAgMCwgYywgLXMsIDAsXG4gICAgMCwgcywgYywgMCxcbiAgICAwLCAwLCAwLCAxLFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIDNkIHJvdGF0aW9uIG1hdHJpeCwgcm90YXRlcyBhcm91bmQgeSBheGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NFJvdGF0ZVkoIHRoZXRhOiBudW1iZXIgKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0IGMgPSBNYXRoLmNvcyggdGhldGEgKTtcbiAgY29uc3QgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG4gIHJldHVybiBbXG4gICAgYywgMCwgcywgMCxcbiAgICAwLCAxLCAwLCAwLFxuICAgIC1zLCAwLCBjLCAwLFxuICAgIDAsIDAsIDAsIDEsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgM2Qgcm90YXRpb24gbWF0cml4LCByb3RhdGVzIGFyb3VuZCB6IGF4aXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0Um90YXRlWiggdGhldGE6IG51bWJlciApOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgYyA9IE1hdGguY29zKCB0aGV0YSApO1xuICBjb25zdCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cbiAgcmV0dXJuIFtcbiAgICBjLCAtcywgMCwgMCxcbiAgICBzLCBjLCAwLCAwLFxuICAgIDAsIDAsIDEsIDAsXG4gICAgMCwgMCwgMCwgMSxcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5pbXBvcnQgdHlwZSB7IFJhd1ZlY3RvcjMgfSBmcm9tICcuLi92ZWMzL1Jhd1ZlY3RvcjMnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgM2Qgc2NhbGluZyBtYXRyaXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0U2NhbGUoIHZlYzogUmF3VmVjdG9yMyApOiBSYXdNYXRyaXg0IHtcbiAgcmV0dXJuIFtcbiAgICB2ZWNbIDAgXSwgMCwgMCwgMCxcbiAgICAwLCB2ZWNbIDEgXSwgMCwgMCxcbiAgICAwLCAwLCB2ZWNbIDIgXSwgMCxcbiAgICAwLCAwLCAwLCAxLFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIDNkIHNjYWxpbmcgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NFNjYWxlU2NhbGFyKCBzY2FsYXI6IG51bWJlciApOiBSYXdNYXRyaXg0IHtcbiAgcmV0dXJuIFtcbiAgICBzY2FsYXIsIDAsIDAsIDAsXG4gICAgMCwgc2NhbGFyLCAwLCAwLFxuICAgIDAsIDAsIHNjYWxhciwgMCxcbiAgICAwLCAwLCAwLCAxLFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4uL3ZlYzMvUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSB0cmFuc2xhdGlvbiBtYXRyaXguXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0VHJhbnNsYXRlKCB2ZWM6IFJhd1ZlY3RvcjMgKTogUmF3TWF0cml4NCB7XG4gIHJldHVybiBbXG4gICAgMSwgMCwgMCwgMCxcbiAgICAwLCAxLCAwLCAwLFxuICAgIDAsIDAsIDEsIDAsXG4gICAgdmVjWyAwIF0sIHZlY1sgMSBdLCB2ZWNbIDIgXSwgMVxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiBUcmFuc3Bvc2UgYSBtYXQ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NFRyYW5zcG9zZSggbTogUmF3TWF0cml4NCApOiBSYXdNYXRyaXg0IHtcbiAgcmV0dXJuIFtcbiAgICBtWyAwIF0sIG1bIDQgXSwgbVsgOCBdLCBtWyAxMiBdLFxuICAgIG1bIDEgXSwgbVsgNSBdLCBtWyA5IF0sIG1bIDEzIF0sXG4gICAgbVsgMiBdLCBtWyA2IF0sIG1bIDEwIF0sIG1bIDE0IF0sXG4gICAgbVsgMyBdLCBtWyA3IF0sIG1bIDExIF0sIG1bIDE1IF0sXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuL1Jhd1F1YXRlcm5pb24nO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIFF1YXRlcm5pb24gb3V0IG9mIGF4aXMgYW5kIGFuZ2xlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEZyb21BeGlzQW5nbGUoIGF4aXM6IFJhd1ZlY3RvcjMsIGFuZ2xlOiBudW1iZXIgKTogUmF3UXVhdGVybmlvbiB7XG4gIGNvbnN0IGhhbGZBbmdsZSA9IGFuZ2xlIC8gMi4wO1xuICBjb25zdCBzaW5IYWxmQW5nbGUgPSBNYXRoLnNpbiggaGFsZkFuZ2xlICk7XG4gIHJldHVybiBbXG4gICAgYXhpc1sgMCBdICogc2luSGFsZkFuZ2xlLFxuICAgIGF4aXNbIDEgXSAqIHNpbkhhbGZBbmdsZSxcbiAgICBheGlzWyAyIF0gKiBzaW5IYWxmQW5nbGUsXG4gICAgTWF0aC5jb3MoIGhhbGZBbmdsZSApXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuL1Jhd1F1YXRlcm5pb24nO1xuXG4vKipcbiAqIFJldHVybiBhbiBpbnZlcnNlIG9mIGEgcXVhdGVybmlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXRJbnZlcnNlKCBxdWF0OiBSYXdRdWF0ZXJuaW9uICk6IFJhd1F1YXRlcm5pb24ge1xuICByZXR1cm4gWyAtcXVhdFsgMCBdLCAtcXVhdFsgMSBdLCAtcXVhdFsgMiBdLCBxdWF0WyAzIF0gXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4vUmF3UXVhdGVybmlvbic7XG5cbi8qKlxuICogUmV0dXJuIGEgbXVsdGlwbGljYXRpb24gcmVzdWx0IG9mIHF1YXRlcm5pb25zLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdE11bHRpcGx5KCAuLi5xdWF0czogUmF3UXVhdGVybmlvbltdICk6IFJhd1F1YXRlcm5pb24ge1xuICBpZiAoIHF1YXRzLmxlbmd0aCA8IDIgKSB7XG4gICAgcmV0dXJuIHF1YXRzWyAwIF07XG4gIH1cblxuICBjb25zdCBhID0gcXVhdHMuc2hpZnQoKSE7XG4gIGNvbnN0IGIgPSBxdWF0TXVsdGlwbHkoIC4uLnF1YXRzICk7XG5cbiAgcmV0dXJuIFtcbiAgICBhWyAzIF0gKiBiWyAwIF0gKyBhWyAwIF0gKiBiWyAzIF0gKyBhWyAxIF0gKiBiWyAyIF0gLSBhWyAyIF0gKiBiWyAxIF0sXG4gICAgYVsgMyBdICogYlsgMSBdIC0gYVsgMCBdICogYlsgMiBdICsgYVsgMSBdICogYlsgMyBdICsgYVsgMiBdICogYlsgMCBdLFxuICAgIGFbIDMgXSAqIGJbIDIgXSArIGFbIDAgXSAqIGJbIDEgXSAtIGFbIDEgXSAqIGJbIDAgXSArIGFbIDIgXSAqIGJbIDMgXSxcbiAgICBhWyAzIF0gKiBiWyAzIF0gLSBhWyAwIF0gKiBiWyAwIF0gLSBhWyAxIF0gKiBiWyAxIF0gLSBhWyAyIF0gKiBiWyAyIF0sXG4gIF07XG59XG4iLCJpbXBvcnQgeyB2ZWNMZW5ndGggfSBmcm9tICcuLi92ZWMvdmVjTGVuZ3RoJztcbmltcG9ydCB7IHZlY1NjYWxlIH0gZnJvbSAnLi4vdmVjL3ZlY1NjYWxlJztcbmltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4vUmF3UXVhdGVybmlvbic7XG5cbi8qKlxuICogTm9ybWFsaXplIGdpdmVuIHF1YXRlcm5pb24uXG4gKlxuICogSXQncyBhbG1vc3QgaWRlbnRpY2FsIGFzIHtAbGluayB2ZWNOb3JtYWxpemV9LFxuICogYnV0IGl0IHdpbGwgcmV0dXJuIGFuIGlkZW50aXR5IHF1YXRlcm5pb24gaW5zdGVhZFxuICogd2hlbiBpdCByZWNpZXZlcyBhIHF1YXRlcm5pb24gd2hpY2ggbGVuZ3RoIGlzIHplcm8uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0Tm9ybWFsaXplKCB2ZWM6IFJhd1F1YXRlcm5pb24gKTogUmF3UXVhdGVybmlvbiB7XG4gIGNvbnN0IGxlbiA9IHZlY0xlbmd0aCggdmVjICk7XG4gIGlmICggbGVuID09PSAwLjAgKSB7XG4gICAgcmV0dXJuIFsgMC4wLCAwLjAsIDAuMCwgMS4wIF07XG4gIH1cbiAgcmV0dXJuIHZlY1NjYWxlKCB2ZWMsIDEuMCAvIGxlbiApIGFzIFJhd1F1YXRlcm5pb247XG59XG4iLCIvKipcbiAqIERpdmlkZSBhIHZlY3RvciBieSBhIHZlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlY0RpdmlkZSggdmVjQTogbnVtYmVyW10sIHZlY0I6IG51bWJlcltdICk6IG51bWJlcltdIHtcbiAgcmV0dXJuIHZlY0EubWFwKCAoIHYsIGkgKSA9PiB2IC8gdmVjQlsgaSBdICk7XG59XG4iLCIvKipcbiAqIE11bHRpcGx5IGEgdmVjdG9yIGJ5IGEgdmVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjTXVsdGlwbHkoIHZlY0E6IG51bWJlcltdLCB2ZWNCOiBudW1iZXJbXSApOiBudW1iZXJbXSB7XG4gIHJldHVybiB2ZWNBLm1hcCggKCB2LCBpICkgPT4gdiAqIHZlY0JbIGkgXSApO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi4vbWF0NCc7XG5pbXBvcnQgdHlwZSB7IFJhd1ZlY3RvcjQgfSBmcm9tICcuL1Jhd1ZlY3RvcjQnO1xuXG4vKipcbiAqIE11bHRpcGx5IGEgdmVjNCBieSBhIG1hdDQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWM0QXBwbHlNYXRyaXg0KCB2OiBSYXdWZWN0b3I0LCBtOiBSYXdNYXRyaXg0ICk6IFJhd1ZlY3RvcjQge1xuICByZXR1cm4gW1xuICAgIG1bIDAgXSAqIHZbIDAgXSArIG1bIDQgXSAqIHZbIDEgXSArIG1bIDggXSAqIHZbIDIgXSArIG1bIDEyIF0gKiB2WyAzIF0sXG4gICAgbVsgMSBdICogdlsgMCBdICsgbVsgNSBdICogdlsgMSBdICsgbVsgOSBdICogdlsgMiBdICsgbVsgMTMgXSAqIHZbIDMgXSxcbiAgICBtWyAyIF0gKiB2WyAwIF0gKyBtWyA2IF0gKiB2WyAxIF0gKyBtWyAxMCBdICogdlsgMiBdICsgbVsgMTQgXSAqIHZbIDMgXSxcbiAgICBtWyAzIF0gKiB2WyAwIF0gKyBtWyA3IF0gKiB2WyAxIF0gKyBtWyAxMSBdICogdlsgMiBdICsgbVsgMTUgXSAqIHZbIDMgXSxcbiAgXTtcbn1cbiIsImltcG9ydCB7IHZlYzRBcHBseU1hdHJpeDQgfSBmcm9tICcuLi92ZWM0L3ZlYzRBcHBseU1hdHJpeDQnO1xuaW1wb3J0IHsgdmVjU2NhbGUgfSBmcm9tICcuLi92ZWMvdmVjU2NhbGUnO1xuaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi4vbWF0NC9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4vUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogQXBwbHkgYSB2ZWMzICh3aXRoIGFuIGltcGxpY2l0IDEgaW4gdGhlIDR0aCBkaW1lbnNpb24pIGEgbWF0NC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlYzNBcHBseU1hdHJpeDQoIHY6IFJhd1ZlY3RvcjMsIG06IFJhd01hdHJpeDQgKTogUmF3VmVjdG9yMyB7XG4gIGNvbnN0IHZlYzQgPSB2ZWM0QXBwbHlNYXRyaXg0KCBbIC4uLnYsIDEgXSwgbSApO1xuICBjb25zdCB3ID0gdmVjNC5wb3AoKSE7XG4gIHJldHVybiB2ZWNTY2FsZSggdmVjNCwgMS4wIC8gdyApIGFzIFJhd1ZlY3RvcjM7XG59XG4iLCJpbXBvcnQgeyBxdWF0SW52ZXJzZSB9IGZyb20gJy4uL3F1YXQvcXVhdEludmVyc2UnO1xuaW1wb3J0IHsgcXVhdE11bHRpcGx5IH0gZnJvbSAnLi4vcXVhdC9xdWF0TXVsdGlwbHknO1xuaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi4vcXVhdC9SYXdRdWF0ZXJuaW9uJztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4vUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogQXBwbHkgYSB2ZWMzICh3aXRoIGFuIGltcGxpY2l0IDEgaW4gdGhlIDR0aCBkaW1lbnNpb24pIGEgcXVhdGVybmlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlYzNBcHBseVF1YXRlcm5pb24oIHZlYzogUmF3VmVjdG9yMywgcXVhdDogUmF3UXVhdGVybmlvbiApOiBSYXdWZWN0b3IzIHtcbiAgY29uc3QgcDogUmF3UXVhdGVybmlvbiA9IFsgLi4udmVjLCAwLjAgXTtcbiAgY29uc3QgciA9IHF1YXRJbnZlcnNlKCBxdWF0ICk7XG4gIGNvbnN0IHJlcyA9IHF1YXRNdWx0aXBseSggcXVhdCwgcCwgciApO1xuICByZXMucG9wKCk7XG4gIHJldHVybiByZXMgYXMgdW5rbm93biBhcyBSYXdWZWN0b3IzO1xufVxuIiwiLyoqXG4gKiBBIFZlY3Rvci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFZlY3RvcjxUIGV4dGVuZHMgVmVjdG9yPFQ+PiB7XG4gIHB1YmxpYyBhYnN0cmFjdCBlbGVtZW50czogbnVtYmVyW107XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgdGhpcy5cbiAgICogYS5rLmEuIGBtYWduaXR1ZGVgXG4gICAqL1xuICBwdWJsaWMgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQoIHRoaXMuZWxlbWVudHMucmVkdWNlKCAoIHN1bSwgdiApID0+IHN1bSArIHYgKiB2LCAwLjAgKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbm9ybWFsaXplZCBWZWN0b3IzIG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWQoKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGUoIDEuMCAvIHRoaXMubGVuZ3RoICk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX25ldyggdGhpcy5lbGVtZW50cy5jb25jYXQoKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIFZlY3RvciBpbnRvIHRoaXMuXG4gICAqIEBwYXJhbSB2ZWN0b3IgQW5vdGhlciBWZWN0b3JcbiAgICovXG4gIHB1YmxpYyBhZGQoIHZlY3RvcjogVCApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX25ldyggdGhpcy5lbGVtZW50cy5tYXAoICggdiwgaSApID0+IHYgKyB2ZWN0b3IuZWxlbWVudHNbIGkgXSApICk7XG4gIH1cblxuICAvKipcbiAgICogU3Vic3RyYWN0IHRoaXMgZnJvbSBhbm90aGVyIFZlY3Rvci5cbiAgICogQHBhcmFtIHYgQW5vdGhlciB2ZWN0b3JcbiAgICovXG4gIHB1YmxpYyBzdWIoIHZlY3RvcjogVCApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX25ldyggdGhpcy5lbGVtZW50cy5tYXAoICggdiwgaSApID0+IHYgLSB2ZWN0b3IuZWxlbWVudHNbIGkgXSApICk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgYSBWZWN0b3Igd2l0aCB0aGlzLlxuICAgKiBAcGFyYW0gdmVjdG9yIEFub3RoZXIgVmVjdG9yXG4gICAqL1xuICBwdWJsaWMgbXVsdGlwbHkoIHZlY3RvcjogVCApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX25ldyggdGhpcy5lbGVtZW50cy5tYXAoICggdiwgaSApID0+IHYgKiB2ZWN0b3IuZWxlbWVudHNbIGkgXSApICk7XG4gIH1cblxuICAvKipcbiAgICogRGl2aWRlIHRoaXMgZnJvbSBhbm90aGVyIFZlY3Rvci5cbiAgICogQHBhcmFtIHZlY3RvciBBbm90aGVyIFZlY3RvclxuICAgKi9cbiAgcHVibGljIGRpdmlkZSggdmVjdG9yOiBUICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2LCBpICkgPT4gdiAvIHZlY3Rvci5lbGVtZW50c1sgaSBdICkgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTY2FsZSB0aGlzIGJ5IHNjYWxhci5cbiAgICogYS5rLmEuIGBtdWx0aXBseVNjYWxhcmBcbiAgICogQHBhcmFtIHNjYWxhciBBIHNjYWxhclxuICAgKi9cbiAgcHVibGljIHNjYWxlKCBzY2FsYXI6IG51bWJlciApOiBUIHtcbiAgICByZXR1cm4gdGhpcy5fX25ldyggdGhpcy5lbGVtZW50cy5tYXAoICggdiApID0+IHYgKiBzY2FsYXIgKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIERvdCB0d28gVmVjdG9ycy5cbiAgICogQHBhcmFtIHZlY3RvciBBbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGRvdCggdmVjdG9yOiBUICk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMucmVkdWNlKCAoIHN1bSwgdiwgaSApID0+IHN1bSArIHYgKiB2ZWN0b3IuZWxlbWVudHNbIGkgXSwgMC4wICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgX19uZXcoIHY6IG51bWJlcltdICk6IFQ7XG59XG4iLCJpbXBvcnQgeyBNYXRyaXg0IH0gZnJvbSAnLi9NYXRyaXg0JztcbmltcG9ydCB7IFF1YXRlcm5pb24gfSBmcm9tICcuL1F1YXRlcm5pb24nO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9WZWN0b3InO1xuXG5leHBvcnQgdHlwZSByYXdWZWN0b3IzID0gWyBudW1iZXIsIG51bWJlciwgbnVtYmVyIF07XG5cbi8qKlxuICogQSBWZWN0b3IzLlxuICovXG5leHBvcnQgY2xhc3MgVmVjdG9yMyBleHRlbmRzIFZlY3RvcjxWZWN0b3IzPiB7XG4gIHB1YmxpYyBlbGVtZW50czogcmF3VmVjdG9yMztcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIHY6IHJhd1ZlY3RvcjMgPSBbIDAuMCwgMC4wLCAwLjAgXSApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZWxlbWVudHMgPSB2O1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHggY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMCBdO1xuICB9XG5cbiAgcHVibGljIHNldCB4KCB4OiBudW1iZXIgKSB7XG4gICAgdGhpcy5lbGVtZW50c1sgMCBdID0geDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiB5IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDEgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSggeTogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDEgXSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogQW4geiBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAyIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHooIHo6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAyIF0gPSB6O1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBWZWN0b3IzKCAkeyB0aGlzLngudG9GaXhlZCggMyApIH0sICR7IHRoaXMueS50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy56LnRvRml4ZWQoIDMgKSB9IClgO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIGNyb3NzIG9mIHRoaXMgYW5kIGFub3RoZXIgVmVjdG9yMy5cbiAgICogQHBhcmFtIHZlY3RvciBBbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIGNyb3NzKCB2ZWN0b3I6IFZlY3RvcjMgKTogVmVjdG9yMyB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKCBbXG4gICAgICB0aGlzLnkgKiB2ZWN0b3IueiAtIHRoaXMueiAqIHZlY3Rvci55LFxuICAgICAgdGhpcy56ICogdmVjdG9yLnggLSB0aGlzLnggKiB2ZWN0b3IueixcbiAgICAgIHRoaXMueCAqIHZlY3Rvci55IC0gdGhpcy55ICogdmVjdG9yLnhcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogUm90YXRlIHRoaXMgdmVjdG9yIHVzaW5nIGEgUXVhdGVybmlvbi5cbiAgICogQHBhcmFtIHF1YXRlcm5pb24gQSBxdWF0ZXJuaW9uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlRdWF0ZXJuaW9uKCBxdWF0ZXJuaW9uOiBRdWF0ZXJuaW9uICk6IFZlY3RvcjMge1xuICAgIGNvbnN0IHAgPSBuZXcgUXVhdGVybmlvbiggWyB0aGlzLngsIHRoaXMueSwgdGhpcy56LCAwLjAgXSApO1xuICAgIGNvbnN0IHIgPSBxdWF0ZXJuaW9uLmludmVyc2VkO1xuICAgIGNvbnN0IHJlcyA9IHF1YXRlcm5pb24ubXVsdGlwbHkoIHAgKS5tdWx0aXBseSggciApO1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyggWyByZXMueCwgcmVzLnksIHJlcy56IF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSB0aGlzIHZlY3RvciAod2l0aCBhbiBpbXBsaWNpdCAxIGluIHRoZSA0dGggZGltZW5zaW9uKSBieSBtLlxuICAgKi9cbiAgcHVibGljIGFwcGx5TWF0cml4NCggbWF0cml4OiBNYXRyaXg0ICk6IFZlY3RvcjMge1xuICAgIGNvbnN0IG0gPSBtYXRyaXguZWxlbWVudHM7XG5cbiAgICBjb25zdCB3ID0gbVsgMyBdICogdGhpcy54ICsgbVsgNyBdICogdGhpcy55ICsgbVsgMTEgXSAqIHRoaXMueiArIG1bIDE1IF07XG4gICAgY29uc3QgaW52VyA9IDEuMCAvIHc7XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoIFtcbiAgICAgICggbVsgMCBdICogdGhpcy54ICsgbVsgNCBdICogdGhpcy55ICsgbVsgOCBdICogdGhpcy56ICsgbVsgMTIgXSApICogaW52VyxcbiAgICAgICggbVsgMSBdICogdGhpcy54ICsgbVsgNSBdICogdGhpcy55ICsgbVsgOSBdICogdGhpcy56ICsgbVsgMTMgXSApICogaW52VyxcbiAgICAgICggbVsgMiBdICogdGhpcy54ICsgbVsgNiBdICogdGhpcy55ICsgbVsgMTAgXSAqIHRoaXMueiArIG1bIDE0IF0gKSAqIGludldcbiAgICBdICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX19uZXcoIHY6IHJhd1ZlY3RvcjMgKTogVmVjdG9yMyB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKCB2ICk7XG4gIH1cblxuICAvKipcbiAgICogVmVjdG9yMyggMC4wLCAwLjAsIDAuMCApXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCB6ZXJvKCk6IFZlY3RvcjMge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyggWyAwLjAsIDAuMCwgMC4wIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZWN0b3IzKCAxLjAsIDEuMCwgMS4wIClcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IG9uZSgpOiBWZWN0b3IzIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoIFsgMS4wLCAxLjAsIDEuMCBdICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE1hdHJpeDQgfSBmcm9tICcuL01hdHJpeDQnO1xuaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vVmVjdG9yMyc7XG5cbmV4cG9ydCB0eXBlIHJhd1F1YXRlcm5pb24gPSBbIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciBdO1xuXG5leHBvcnQgY29uc3QgcmF3SWRlbnRpdHlRdWF0ZXJuaW9uOiByYXdRdWF0ZXJuaW9uID0gWyAwLjAsIDAuMCwgMC4wLCAxLjAgXTtcblxuLyoqXG4gKiBBIFF1YXRlcm5pb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWF0ZXJuaW9uIHtcbiAgcHVibGljIGVsZW1lbnRzOiByYXdRdWF0ZXJuaW9uOyAvLyBbIHgsIHksIHo7IHcgXVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZWxlbWVudHM6IHJhd1F1YXRlcm5pb24gPSByYXdJZGVudGl0eVF1YXRlcm5pb24gKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IGVsZW1lbnRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHggY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMCBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHkgY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMSBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHogY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHooKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMiBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHcgY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHcoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMyBdO1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBRdWF0ZXJuaW9uKCAkeyB0aGlzLngudG9GaXhlZCggMyApIH0sICR7IHRoaXMueS50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy56LnRvRml4ZWQoIDMgKSB9LCAkeyB0aGlzLncudG9GaXhlZCggMyApIH0gKWA7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmUgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBRdWF0ZXJuaW9uIHtcbiAgICByZXR1cm4gbmV3IFF1YXRlcm5pb24oIHRoaXMuZWxlbWVudHMuY29uY2F0KCkgYXMgcmF3UXVhdGVybmlvbiApO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0c2VsZiBidXQgY29udmVydGVkIGludG8gYSBNYXRyaXg0LlxuICAgKi9cbiAgcHVibGljIGdldCBtYXRyaXgoKTogTWF0cml4NCB7XG4gICAgY29uc3QgeCA9IG5ldyBWZWN0b3IzKCBbIDEuMCwgMC4wLCAwLjAgXSApLmFwcGx5UXVhdGVybmlvbiggdGhpcyApO1xuICAgIGNvbnN0IHkgPSBuZXcgVmVjdG9yMyggWyAwLjAsIDEuMCwgMC4wIF0gKS5hcHBseVF1YXRlcm5pb24oIHRoaXMgKTtcbiAgICBjb25zdCB6ID0gbmV3IFZlY3RvcjMoIFsgMC4wLCAwLjAsIDEuMCBdICkuYXBwbHlRdWF0ZXJuaW9uKCB0aGlzICk7XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHgueCwgeS54LCB6LngsIDAuMCxcbiAgICAgIHgueSwgeS55LCB6LnksIDAuMCxcbiAgICAgIHgueiwgeS56LCB6LnosIDAuMCxcbiAgICAgIDAuMCwgMC4wLCAwLjAsIDEuMFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBpbnZlcnNlIG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2VkKCk6IFF1YXRlcm5pb24ge1xuICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgLXRoaXMueCxcbiAgICAgIC10aGlzLnksXG4gICAgICAtdGhpcy56LFxuICAgICAgdGhpcy53XG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBsZW5ndGggb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCggdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55ICsgdGhpcy56ICogdGhpcy56ICsgdGhpcy53ICogdGhpcy53ICk7XG4gIH1cblxuICAvKipcbiAgICogQSBub3JtYWxpemVkIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG5vcm1hbGl6ZWQoKTogUXVhdGVybmlvbiB7XG4gICAgY29uc3QgbCA9IHRoaXMubGVuZ3RoO1xuXG4gICAgaWYgKCBsID09PSAwICkge1xuICAgICAgcmV0dXJuIFF1YXRlcm5pb24uaWRlbnRpdHk7XG4gICAgfVxuXG4gICAgY29uc3QgbEludiA9IDEuMCAvIHRoaXMubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICB0aGlzLnggKiBsSW52LFxuICAgICAgdGhpcy55ICogbEludixcbiAgICAgIHRoaXMueiAqIGxJbnYsXG4gICAgICB0aGlzLncgKiBsSW52LFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSB0d28gUXVhdGVybmlvbnMuXG4gICAqIEBwYXJhbSBxIEFub3RoZXIgUXVhdGVybmlvblxuICAgKi9cbiAgcHVibGljIG11bHRpcGx5KCBxOiBRdWF0ZXJuaW9uICk6IFF1YXRlcm5pb24ge1xuICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgdGhpcy53ICogcS54ICsgdGhpcy54ICogcS53ICsgdGhpcy55ICogcS56IC0gdGhpcy56ICogcS55LFxuICAgICAgdGhpcy53ICogcS55IC0gdGhpcy54ICogcS56ICsgdGhpcy55ICogcS53ICsgdGhpcy56ICogcS54LFxuICAgICAgdGhpcy53ICogcS56ICsgdGhpcy54ICogcS55IC0gdGhpcy55ICogcS54ICsgdGhpcy56ICogcS53LFxuICAgICAgdGhpcy53ICogcS53IC0gdGhpcy54ICogcS54IC0gdGhpcy55ICogcS55IC0gdGhpcy56ICogcS56XG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIGlkZW50aXR5IFF1YXRlcm5pb24uXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldCBpZGVudGl0eSgpOiBRdWF0ZXJuaW9uIHtcbiAgICByZXR1cm4gbmV3IFF1YXRlcm5pb24oIHJhd0lkZW50aXR5UXVhdGVybmlvbiApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgUXVhdGVybmlvbiBvdXQgb2YgYW5nbGUgYW5kIGF4aXMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGZyb21BeGlzQW5nbGUoIGF4aXM6IFZlY3RvcjMsIGFuZ2xlOiBudW1iZXIgKTogUXVhdGVybmlvbiB7XG4gICAgY29uc3QgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLjA7XG4gICAgY29uc3Qgc2luSGFsZkFuZ2xlID0gTWF0aC5zaW4oIGhhbGZBbmdsZSApO1xuICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgYXhpcy54ICogc2luSGFsZkFuZ2xlLFxuICAgICAgYXhpcy55ICogc2luSGFsZkFuZ2xlLFxuICAgICAgYXhpcy56ICogc2luSGFsZkFuZ2xlLFxuICAgICAgTWF0aC5jb3MoIGhhbGZBbmdsZSApXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgUXVhdGVybmlvbiBvdXQgb2YgYSByb3RhdGlvbiBtYXRyaXguXG4gICAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZnJvbU1hdHJpeCggbWF0cml4OiBNYXRyaXg0ICk6IFF1YXRlcm5pb24ge1xuICAgIGNvbnN0IG0gPSBtYXRyaXguZWxlbWVudHMsXG4gICAgICBtMTEgPSBtWyAwIF0sIG0xMiA9IG1bIDQgXSwgbTEzID0gbVsgOCBdLFxuICAgICAgbTIxID0gbVsgMSBdLCBtMjIgPSBtWyA1IF0sIG0yMyA9IG1bIDkgXSxcbiAgICAgIG0zMSA9IG1bIDIgXSwgbTMyID0gbVsgNiBdLCBtMzMgPSBtWyAxMCBdLFxuICAgICAgdHJhY2UgPSBtMTEgKyBtMjIgKyBtMzM7XG5cbiAgICBpZiAoIHRyYWNlID4gMCApIHtcbiAgICAgIGNvbnN0IHMgPSAwLjUgLyBNYXRoLnNxcnQoIHRyYWNlICsgMS4wICk7XG4gICAgICByZXR1cm4gbmV3IFF1YXRlcm5pb24oIFtcbiAgICAgICAgKCBtMzIgLSBtMjMgKSAqIHMsXG4gICAgICAgICggbTEzIC0gbTMxICkgKiBzLFxuICAgICAgICAoIG0yMSAtIG0xMiApICogcyxcbiAgICAgICAgMC4yNSAvIHNcbiAgICAgIF0gKTtcbiAgICB9IGVsc2UgaWYgKCBtMTEgPiBtMjIgJiYgbTExID4gbTMzICkge1xuICAgICAgY29uc3QgcyA9IDIuMCAqIE1hdGguc3FydCggMS4wICsgbTExIC0gbTIyIC0gbTMzICk7XG4gICAgICByZXR1cm4gbmV3IFF1YXRlcm5pb24oIFtcbiAgICAgICAgMC4yNSAqIHMsXG4gICAgICAgICggbTEyICsgbTIxICkgLyBzLFxuICAgICAgICAoIG0xMyArIG0zMSApIC8gcyxcbiAgICAgICAgKCBtMzIgLSBtMjMgKSAvIHNcbiAgICAgIF0gKTtcbiAgICB9IGVsc2UgaWYgKCBtMjIgPiBtMzMgKSB7XG4gICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMjIgLSBtMTEgLSBtMzMgKTtcbiAgICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgICAoIG0xMiArIG0yMSApIC8gcyxcbiAgICAgICAgMC4yNSAqIHMsXG4gICAgICAgICggbTIzICsgbTMyICkgLyBzLFxuICAgICAgICAoIG0xMyAtIG0zMSApIC8gc1xuICAgICAgXSApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMzMgLSBtMTEgLSBtMjIgKTtcbiAgICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgICAoIG0xMyArIG0zMSApIC8gcyxcbiAgICAgICAgKCBtMjMgKyBtMzIgKSAvIHMsXG4gICAgICAgIDAuMjUgKiBzLFxuICAgICAgICAoIG0yMSAtIG0xMiApIC8gc1xuICAgICAgXSApO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUXVhdGVybmlvbiB9IGZyb20gJy4vUXVhdGVybmlvbic7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9WZWN0b3IzJztcblxuZXhwb3J0IHR5cGUgcmF3TWF0cml4NCA9IFtcbiAgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLFxuICBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsXG4gIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcixcbiAgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXG5dO1xuXG5leHBvcnQgY29uc3QgcmF3SWRlbnRpdHlNYXRyaXg0OiByYXdNYXRyaXg0ID0gW1xuICAxLjAsIDAuMCwgMC4wLCAwLjAsXG4gIDAuMCwgMS4wLCAwLjAsIDAuMCxcbiAgMC4wLCAwLjAsIDEuMCwgMC4wLFxuICAwLjAsIDAuMCwgMC4wLCAxLjBcbl07XG5cbi8qKlxuICogQSBNYXRyaXg0LlxuICovXG5leHBvcnQgY2xhc3MgTWF0cml4NCB7XG4gIHB1YmxpYyBlbGVtZW50czogcmF3TWF0cml4NDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIHY6IHJhd01hdHJpeDQgPSByYXdJZGVudGl0eU1hdHJpeDQgKSB7XG4gICAgdGhpcy5lbGVtZW50cyA9IHY7XG4gIH1cblxuICAvKipcbiAgICogSXRzZWxmIGJ1dCB0cmFuc3Bvc2VkLlxuICAgKi9cbiAgcHVibGljIGdldCB0cmFuc3Bvc2UoKTogTWF0cml4NCB7XG4gICAgY29uc3QgbSA9IHRoaXMuZWxlbWVudHM7XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIG1bIDAgXSwgbVsgNCBdLCBtWyA4IF0sIG1bIDEyIF0sXG4gICAgICBtWyAxIF0sIG1bIDUgXSwgbVsgOSBdLCBtWyAxMyBdLFxuICAgICAgbVsgMiBdLCBtWyA2IF0sIG1bIDEwIF0sIG1bIDE0IF0sXG4gICAgICBtWyAzIF0sIG1bIDcgXSwgbVsgMTEgXSwgbVsgMTUgXVxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgZGV0ZXJtaW5hbnQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGRldGVybWluYW50KCk6IG51bWJlciB7XG4gICAgY29uc3QgbSA9IHRoaXMuZWxlbWVudHM7XG4gICAgY29uc3RcbiAgICAgIGEwMCA9IG1bICAwIF0sIGEwMSA9IG1bICAxIF0sIGEwMiA9IG1bICAyIF0sIGEwMyA9IG1bICAzIF0sXG4gICAgICBhMTAgPSBtWyAgNCBdLCBhMTEgPSBtWyAgNSBdLCBhMTIgPSBtWyAgNiBdLCBhMTMgPSBtWyAgNyBdLFxuICAgICAgYTIwID0gbVsgIDggXSwgYTIxID0gbVsgIDkgXSwgYTIyID0gbVsgMTAgXSwgYTIzID0gbVsgMTEgXSxcbiAgICAgIGEzMCA9IG1bIDEyIF0sIGEzMSA9IG1bIDEzIF0sIGEzMiA9IG1bIDE0IF0sIGEzMyA9IG1bIDE1IF0sXG4gICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICByZXR1cm4gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0c2VsZiBidXQgaW52ZXJ0ZWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IGludmVyc2UoKTogTWF0cml4NCB8IG51bGwge1xuICAgIGNvbnN0IG0gPSB0aGlzLmVsZW1lbnRzO1xuICAgIGNvbnN0XG4gICAgICBhMDAgPSBtWyAgMCBdLCBhMDEgPSBtWyAgMSBdLCBhMDIgPSBtWyAgMiBdLCBhMDMgPSBtWyAgMyBdLFxuICAgICAgYTEwID0gbVsgIDQgXSwgYTExID0gbVsgIDUgXSwgYTEyID0gbVsgIDYgXSwgYTEzID0gbVsgIDcgXSxcbiAgICAgIGEyMCA9IG1bICA4IF0sIGEyMSA9IG1bICA5IF0sIGEyMiA9IG1bIDEwIF0sIGEyMyA9IG1bIDExIF0sXG4gICAgICBhMzAgPSBtWyAxMiBdLCBhMzEgPSBtWyAxMyBdLCBhMzIgPSBtWyAxNCBdLCBhMzMgPSBtWyAxNSBdLFxuICAgICAgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwLCAgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwLFxuICAgICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLCAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLCAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgICAgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwLCAgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwLFxuICAgICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLCAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLCAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gICAgY29uc3QgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCBkZXQgPT09IDAuMCApIHsgcmV0dXJuIG51bGw7IH1cblxuICAgIGNvbnN0IGludkRldCA9IDEuMCAvIGRldDtcblxuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5LFxuICAgICAgYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5LFxuICAgICAgYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzLFxuICAgICAgYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzLFxuICAgICAgYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3LFxuICAgICAgYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3LFxuICAgICAgYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxLFxuICAgICAgYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxLFxuICAgICAgYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2LFxuICAgICAgYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2LFxuICAgICAgYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwLFxuICAgICAgYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwLFxuICAgICAgYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2LFxuICAgICAgYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2LFxuICAgICAgYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwLFxuICAgICAgYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwXG4gICAgXS5tYXAoICggdiApID0+IHYgKiBpbnZEZXQgKSBhcyByYXdNYXRyaXg0ICk7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBjb25zdCBtID0gdGhpcy5lbGVtZW50cy5tYXAoICggdiApID0+IHYudG9GaXhlZCggMyApICk7XG4gICAgcmV0dXJuIGBNYXRyaXg0KCAkeyBtWyAwIF0gfSwgJHsgbVsgNCBdIH0sICR7IG1bIDggXSB9LCAkeyBtWyAxMiBdIH07ICR7IG1bIDEgXSB9LCAkeyBtWyA1IF0gfSwgJHsgbVsgOSBdIH0sICR7IG1bIDEzIF0gfTsgJHsgbVsgMiBdIH0sICR7IG1bIDYgXSB9LCAkeyBtWyAxMCBdIH0sICR7IG1bIDE0IF0gfTsgJHsgbVsgMyBdIH0sICR7IG1bIDcgXSB9LCAkeyBtWyAxMSBdIH0sICR7IG1bIDE1IF0gfSApYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggdGhpcy5lbGVtZW50cy5jb25jYXQoKSBhcyByYXdNYXRyaXg0ICk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgdGhpcyBNYXRyaXg0IGJ5IG9uZSBvciBtb3JlIE1hdHJpeDRzLlxuICAgKi9cbiAgcHVibGljIG11bHRpcGx5KCAuLi5tYXRyaWNlczogTWF0cml4NFtdICk6IE1hdHJpeDQge1xuICAgIGlmICggbWF0cmljZXMubGVuZ3RoID09PSAwICkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBhcnIgPSBtYXRyaWNlcy5jb25jYXQoKTtcbiAgICBsZXQgYk1hdCA9IGFyci5zaGlmdCgpITtcbiAgICBpZiAoIDAgPCBhcnIubGVuZ3RoICkge1xuICAgICAgYk1hdCA9IGJNYXQubXVsdGlwbHkoIC4uLmFyciApO1xuICAgIH1cblxuICAgIGNvbnN0IGEgPSB0aGlzLmVsZW1lbnRzO1xuICAgIGNvbnN0IGIgPSBiTWF0LmVsZW1lbnRzO1xuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBhWyAwIF0gKiBiWyAwIF0gKyBhWyA0IF0gKiBiWyAxIF0gKyBhWyA4IF0gKiBiWyAyIF0gKyBhWyAxMiBdICogYlsgMyBdLFxuICAgICAgYVsgMSBdICogYlsgMCBdICsgYVsgNSBdICogYlsgMSBdICsgYVsgOSBdICogYlsgMiBdICsgYVsgMTMgXSAqIGJbIDMgXSxcbiAgICAgIGFbIDIgXSAqIGJbIDAgXSArIGFbIDYgXSAqIGJbIDEgXSArIGFbIDEwIF0gKiBiWyAyIF0gKyBhWyAxNCBdICogYlsgMyBdLFxuICAgICAgYVsgMyBdICogYlsgMCBdICsgYVsgNyBdICogYlsgMSBdICsgYVsgMTEgXSAqIGJbIDIgXSArIGFbIDE1IF0gKiBiWyAzIF0sXG5cbiAgICAgIGFbIDAgXSAqIGJbIDQgXSArIGFbIDQgXSAqIGJbIDUgXSArIGFbIDggXSAqIGJbIDYgXSArIGFbIDEyIF0gKiBiWyA3IF0sXG4gICAgICBhWyAxIF0gKiBiWyA0IF0gKyBhWyA1IF0gKiBiWyA1IF0gKyBhWyA5IF0gKiBiWyA2IF0gKyBhWyAxMyBdICogYlsgNyBdLFxuICAgICAgYVsgMiBdICogYlsgNCBdICsgYVsgNiBdICogYlsgNSBdICsgYVsgMTAgXSAqIGJbIDYgXSArIGFbIDE0IF0gKiBiWyA3IF0sXG4gICAgICBhWyAzIF0gKiBiWyA0IF0gKyBhWyA3IF0gKiBiWyA1IF0gKyBhWyAxMSBdICogYlsgNiBdICsgYVsgMTUgXSAqIGJbIDcgXSxcblxuICAgICAgYVsgMCBdICogYlsgOCBdICsgYVsgNCBdICogYlsgOSBdICsgYVsgOCBdICogYlsgMTAgXSArIGFbIDEyIF0gKiBiWyAxMSBdLFxuICAgICAgYVsgMSBdICogYlsgOCBdICsgYVsgNSBdICogYlsgOSBdICsgYVsgOSBdICogYlsgMTAgXSArIGFbIDEzIF0gKiBiWyAxMSBdLFxuICAgICAgYVsgMiBdICogYlsgOCBdICsgYVsgNiBdICogYlsgOSBdICsgYVsgMTAgXSAqIGJbIDEwIF0gKyBhWyAxNCBdICogYlsgMTEgXSxcbiAgICAgIGFbIDMgXSAqIGJbIDggXSArIGFbIDcgXSAqIGJbIDkgXSArIGFbIDExIF0gKiBiWyAxMCBdICsgYVsgMTUgXSAqIGJbIDExIF0sXG5cbiAgICAgIGFbIDAgXSAqIGJbIDEyIF0gKyBhWyA0IF0gKiBiWyAxMyBdICsgYVsgOCBdICogYlsgMTQgXSArIGFbIDEyIF0gKiBiWyAxNSBdLFxuICAgICAgYVsgMSBdICogYlsgMTIgXSArIGFbIDUgXSAqIGJbIDEzIF0gKyBhWyA5IF0gKiBiWyAxNCBdICsgYVsgMTMgXSAqIGJbIDE1IF0sXG4gICAgICBhWyAyIF0gKiBiWyAxMiBdICsgYVsgNiBdICogYlsgMTMgXSArIGFbIDEwIF0gKiBiWyAxNCBdICsgYVsgMTQgXSAqIGJbIDE1IF0sXG4gICAgICBhWyAzIF0gKiBiWyAxMiBdICsgYVsgNyBdICogYlsgMTMgXSArIGFbIDExIF0gKiBiWyAxNCBdICsgYVsgMTUgXSAqIGJbIDE1IF1cbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgdGhpcyBNYXRyaXg0IGJ5IGEgc2NhbGFyXG4gICAqL1xuICBwdWJsaWMgc2NhbGVTY2FsYXIoIHNjYWxhcjogbnVtYmVyICk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggdGhpcy5lbGVtZW50cy5tYXAoICggdiApID0+IHYgKiBzY2FsYXIgKSBhcyByYXdNYXRyaXg0ICk7XG4gIH1cblxuICAvKipcbiAgICogQW4gaWRlbnRpdHkgTWF0cml4NC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGlkZW50aXR5KCk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggcmF3SWRlbnRpdHlNYXRyaXg0ICk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIG11bHRpcGx5KCAuLi5tYXRyaWNlczogTWF0cml4NFtdICk6IE1hdHJpeDQge1xuICAgIGlmICggbWF0cmljZXMubGVuZ3RoID09PSAwICkge1xuICAgICAgcmV0dXJuIE1hdHJpeDQuaWRlbnRpdHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGJNYXRzID0gbWF0cmljZXMuY29uY2F0KCk7XG4gICAgICBjb25zdCBhTWF0ID0gYk1hdHMuc2hpZnQoKSE7XG4gICAgICByZXR1cm4gYU1hdC5tdWx0aXBseSggLi4uYk1hdHMgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSB0cmFuc2xhdGlvbiBtYXRyaXguXG4gICAqIEBwYXJhbSB2ZWN0b3IgVHJhbnNsYXRpb25cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgdHJhbnNsYXRlKCB2ZWN0b3I6IFZlY3RvcjMgKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICAxLCAwLCAwLCAwLFxuICAgICAgMCwgMSwgMCwgMCxcbiAgICAgIDAsIDAsIDEsIDAsXG4gICAgICB2ZWN0b3IueCwgdmVjdG9yLnksIHZlY3Rvci56LCAxXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgM2Qgc2NhbGluZyBtYXRyaXguXG4gICAqIEBwYXJhbSB2ZWN0b3IgU2NhbGVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2NhbGUoIHZlY3RvcjogVmVjdG9yMyApOiBNYXRyaXg0IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHZlY3Rvci54LCAwLCAwLCAwLFxuICAgICAgMCwgdmVjdG9yLnksIDAsIDAsXG4gICAgICAwLCAwLCB2ZWN0b3IueiwgMCxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSAzZCBzY2FsaW5nIG1hdHJpeCBieSBhIHNjYWxhci5cbiAgICogQHBhcmFtIHZlY3RvciBTY2FsZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzY2FsZVNjYWxhciggc2NhbGFyOiBudW1iZXIgKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBzY2FsYXIsIDAsIDAsIDAsXG4gICAgICAwLCBzY2FsYXIsIDAsIDAsXG4gICAgICAwLCAwLCBzY2FsYXIsIDAsXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgM2Qgcm90YXRpb24gbWF0cml4LCByb3RhdGVzIGFyb3VuZCB4IGF4aXMuXG4gICAqIEBwYXJhbSB2ZWN0b3IgU2NhbGVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcm90YXRlWCggdGhldGE6IG51bWJlciApOiBNYXRyaXg0IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIDEsIDAsIDAsIDAsXG4gICAgICAwLCBNYXRoLmNvcyggdGhldGEgKSwgLU1hdGguc2luKCB0aGV0YSApLCAwLFxuICAgICAgMCwgTWF0aC5zaW4oIHRoZXRhICksIE1hdGguY29zKCB0aGV0YSApLCAwLFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIDNkIHJvdGF0aW9uIG1hdHJpeCwgcm90YXRlcyBhcm91bmQgeSBheGlzLlxuICAgKiBAcGFyYW0gdmVjdG9yIFNjYWxlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJvdGF0ZVkoIHRoZXRhOiBudW1iZXIgKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBNYXRoLmNvcyggdGhldGEgKSwgMCwgTWF0aC5zaW4oIHRoZXRhICksIDAsXG4gICAgICAwLCAxLCAwLCAwLFxuICAgICAgLU1hdGguc2luKCB0aGV0YSApLCAwLCBNYXRoLmNvcyggdGhldGEgKSwgMCxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSAzZCByb3RhdGlvbiBtYXRyaXgsIHJvdGF0ZXMgYXJvdW5kIHogYXhpcy5cbiAgICogQHBhcmFtIHZlY3RvciBTY2FsZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByb3RhdGVaKCB0aGV0YTogbnVtYmVyICk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgTWF0aC5jb3MoIHRoZXRhICksIC1NYXRoLnNpbiggdGhldGEgKSwgMCwgMCxcbiAgICAgIE1hdGguc2luKCB0aGV0YSApLCBNYXRoLmNvcyggdGhldGEgKSwgMCwgMCxcbiAgICAgIDAsIDAsIDEsIDAsXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgXCJMb29rQXRcIiBtYXRyaXguXG4gICAqXG4gICAqIFNlZSBhbHNvOiB7QGxpbmsgbG9va0F0SW52ZXJzZX1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbG9va0F0KFxuICAgIHBvc2l0aW9uOiBWZWN0b3IzLFxuICAgIHRhcmdldCA9IG5ldyBWZWN0b3IzKCBbIDAuMCwgMC4wLCAwLjAgXSApLFxuICAgIHVwID0gbmV3IFZlY3RvcjMoIFsgMC4wLCAxLjAsIDAuMCBdICksXG4gICAgcm9sbCA9IDAuMFxuICApOiBNYXRyaXg0IHtcbiAgICBjb25zdCBkaXIgPSBwb3NpdGlvbi5zdWIoIHRhcmdldCApLm5vcm1hbGl6ZWQ7XG4gICAgbGV0IHNpZCA9IHVwLmNyb3NzKCBkaXIgKS5ub3JtYWxpemVkO1xuICAgIGxldCB0b3AgPSBkaXIuY3Jvc3MoIHNpZCApO1xuICAgIHNpZCA9IHNpZC5zY2FsZSggTWF0aC5jb3MoIHJvbGwgKSApLmFkZCggdG9wLnNjYWxlKCBNYXRoLnNpbiggcm9sbCApICkgKTtcbiAgICB0b3AgPSBkaXIuY3Jvc3MoIHNpZCApO1xuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBzaWQueCwgc2lkLnksIHNpZC56LCAwLjAsXG4gICAgICB0b3AueCwgdG9wLnksIHRvcC56LCAwLjAsXG4gICAgICBkaXIueCwgZGlyLnksIGRpci56LCAwLjAsXG4gICAgICBwb3NpdGlvbi54LCBwb3NpdGlvbi55LCBwb3NpdGlvbi56LCAxLjBcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYW4gaW52ZXJzZSBvZiBcIkxvb2tBdFwiIG1hdHJpeC4gR29vZCBmb3IgY3JlYXRpbmcgYSB2aWV3IG1hdHJpeC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBsb29rQXR9XG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGxvb2tBdEludmVyc2UoXG4gICAgcG9zaXRpb246IFZlY3RvcjMsXG4gICAgdGFyZ2V0ID0gbmV3IFZlY3RvcjMoIFsgMC4wLCAwLjAsIDAuMCBdICksXG4gICAgdXAgPSBuZXcgVmVjdG9yMyggWyAwLjAsIDEuMCwgMC4wIF0gKSxcbiAgICByb2xsID0gMC4wXG4gICk6IE1hdHJpeDQge1xuICAgIGNvbnN0IGRpciA9IHBvc2l0aW9uLnN1YiggdGFyZ2V0ICkubm9ybWFsaXplZDtcbiAgICBsZXQgc2lkID0gdXAuY3Jvc3MoIGRpciApLm5vcm1hbGl6ZWQ7XG4gICAgbGV0IHRvcCA9IGRpci5jcm9zcyggc2lkICk7XG4gICAgc2lkID0gc2lkLnNjYWxlKCBNYXRoLmNvcyggcm9sbCApICkuYWRkKCB0b3Auc2NhbGUoIE1hdGguc2luKCByb2xsICkgKSApO1xuICAgIHRvcCA9IGRpci5jcm9zcyggc2lkICk7XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHNpZC54LCB0b3AueCwgZGlyLngsIDAuMCxcbiAgICAgIHNpZC55LCB0b3AueSwgZGlyLnksIDAuMCxcbiAgICAgIHNpZC56LCB0b3AueiwgZGlyLnosIDAuMCxcbiAgICAgIC1zaWQueCAqIHBvc2l0aW9uLnggLSBzaWQueSAqIHBvc2l0aW9uLnkgLSBzaWQueiAqIHBvc2l0aW9uLnosXG4gICAgICAtdG9wLnggKiBwb3NpdGlvbi54IC0gdG9wLnkgKiBwb3NpdGlvbi55IC0gdG9wLnogKiBwb3NpdGlvbi56LFxuICAgICAgLWRpci54ICogcG9zaXRpb24ueCAtIGRpci55ICogcG9zaXRpb24ueSAtIGRpci56ICogcG9zaXRpb24ueixcbiAgICAgIDEuMFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIFwiUGVyc3BlY3RpdmVcIiBwcm9qZWN0aW9uIG1hdHJpeC5cbiAgICogSXQgd29uJ3QgaW5jbHVkZSBhc3BlY3QhXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHBlcnNwZWN0aXZlKCBmb3YgPSA0NS4wLCBuZWFyID0gMC4wMSwgZmFyID0gMTAwLjAgKTogTWF0cml4NCB7XG4gICAgY29uc3QgcCA9IDEuMCAvIE1hdGgudGFuKCBmb3YgKiBNYXRoLlBJIC8gMzYwLjAgKTtcbiAgICBjb25zdCBkID0gKCBmYXIgLSBuZWFyICk7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBwLCAwLjAsIDAuMCwgMC4wLFxuICAgICAgMC4wLCBwLCAwLjAsIDAuMCxcbiAgICAgIDAuMCwgMC4wLCAtKCBmYXIgKyBuZWFyICkgLyBkLCAtMS4wLFxuICAgICAgMC4wLCAwLjAsIC0yICogZmFyICogbmVhciAvIGQsIDAuMFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXBvc2UgdGhpcyBtYXRyaXggaW50byBhIHBvc2l0aW9uLCBhIHNjYWxlLCBhbmQgYSByb3RhdGlvbi5cbiAgICogWW9pbmtlZCBmcm9tIFRocmVlLmpzLlxuICAgKi9cbiAgcHVibGljIGRlY29tcG9zZSgpOiB7IHBvc2l0aW9uOiBWZWN0b3IzOyBzY2FsZTogVmVjdG9yMzsgcm90YXRpb246IFF1YXRlcm5pb24gfSB7XG4gICAgY29uc3QgbSA9IHRoaXMuZWxlbWVudHM7XG5cbiAgICBsZXQgc3ggPSBuZXcgVmVjdG9yMyggWyBtWyAwIF0sIG1bIDEgXSwgbVsgMiBdIF0gKS5sZW5ndGg7XG4gICAgY29uc3Qgc3kgPSBuZXcgVmVjdG9yMyggWyBtWyA0IF0sIG1bIDUgXSwgbVsgNiBdIF0gKS5sZW5ndGg7XG4gICAgY29uc3Qgc3ogPSBuZXcgVmVjdG9yMyggWyBtWyA4IF0sIG1bIDkgXSwgbVsgMTAgXSBdICkubGVuZ3RoO1xuXG4gICAgLy8gaWYgZGV0ZXJtaW5lIGlzIG5lZ2F0aXZlLCB3ZSBuZWVkIHRvIGludmVydCBvbmUgc2NhbGVcbiAgICBjb25zdCBkZXQgPSB0aGlzLmRldGVybWluYW50O1xuICAgIGlmICggZGV0IDwgMCApIHsgc3ggPSAtc3g7IH1cblxuICAgIGNvbnN0IGludlN4ID0gMS4wIC8gc3g7XG4gICAgY29uc3QgaW52U3kgPSAxLjAgLyBzeTtcbiAgICBjb25zdCBpbnZTeiA9IDEuMCAvIHN6O1xuXG4gICAgY29uc3Qgcm90YXRpb25NYXRyaXggPSB0aGlzLmNsb25lKCk7XG5cbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgMCBdICo9IGludlN4O1xuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyAxIF0gKj0gaW52U3g7XG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDIgXSAqPSBpbnZTeDtcblxuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyA0IF0gKj0gaW52U3k7XG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDUgXSAqPSBpbnZTeTtcbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgNiBdICo9IGludlN5O1xuXG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDggXSAqPSBpbnZTejtcbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgOSBdICo9IGludlN6O1xuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyAxMCBdICo9IGludlN6O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uOiBuZXcgVmVjdG9yMyggWyBtWyAxMiBdLCBtWyAxMyBdLCBtWyAxNCBdIF0gKSxcbiAgICAgIHNjYWxlOiBuZXcgVmVjdG9yMyggWyBzeCwgc3ksIHN6IF0gKSxcbiAgICAgIHJvdGF0aW9uOiBRdWF0ZXJuaW9uLmZyb21NYXRyaXgoIHJvdGF0aW9uTWF0cml4IClcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvc2UgYSBtYXRyaXggb3V0IG9mIHBvc2l0aW9uLCBzY2FsZSwgYW5kIHJvdGF0aW9uLlxuICAgKiBZb2lua2VkIGZyb20gVGhyZWUuanMuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGNvbXBvc2UoIHBvc2l0aW9uOiBWZWN0b3IzLCByb3RhdGlvbjogUXVhdGVybmlvbiwgc2NhbGU6IFZlY3RvcjMgKTogTWF0cml4NCB7XG4gICAgY29uc3QgeCA9IHJvdGF0aW9uLngsIHkgPSByb3RhdGlvbi55LCB6ID0gcm90YXRpb24ueiwgdyA9IHJvdGF0aW9uLnc7XG4gICAgY29uc3QgeDIgPSB4ICsgeCxcdHkyID0geSArIHksIHoyID0geiArIHo7XG4gICAgY29uc3QgeHggPSB4ICogeDIsIHh5ID0geCAqIHkyLCB4eiA9IHggKiB6MjtcbiAgICBjb25zdCB5eSA9IHkgKiB5MiwgeXogPSB5ICogejIsIHp6ID0geiAqIHoyO1xuICAgIGNvbnN0IHd4ID0gdyAqIHgyLCB3eSA9IHcgKiB5Miwgd3ogPSB3ICogejI7XG4gICAgY29uc3Qgc3ggPSBzY2FsZS54LCBzeSA9IHNjYWxlLnksIHN6ID0gc2NhbGUuejtcblxuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgKCAxLjAgLSAoIHl5ICsgenogKSApICogc3gsXG4gICAgICAoIHh5ICsgd3ogKSAqIHN4LFxuICAgICAgKCB4eiAtIHd5ICkgKiBzeCxcbiAgICAgIDAuMCxcblxuICAgICAgKCB4eSAtIHd6ICkgKiBzeSxcbiAgICAgICggMS4wIC0gKCB4eCArIHp6ICkgKSAqIHN5LFxuICAgICAgKCB5eiArIHd4ICkgKiBzeSxcbiAgICAgIDAuMCxcblxuICAgICAgKCB4eiArIHd5ICkgKiBzeixcbiAgICAgICggeXogLSB3eCApICogc3osXG4gICAgICAoIDEuMCAtICggeHggKyB5eSApICkgKiBzeixcbiAgICAgIDAuMCxcblxuICAgICAgcG9zaXRpb24ueCxcbiAgICAgIHBvc2l0aW9uLnksXG4gICAgICBwb3NpdGlvbi56LFxuICAgICAgMS4wXG4gICAgXSApO1xuICB9XG59XG4iLCIvKipcbiAqIEdMU0wgU3R5bGUgYG1vZGAgZnVuY3Rpb24uXG4gKiBcImNvbXB1dGUgdmFsdWUgb2Ygb25lIHBhcmFtZXRlciBtb2R1bG8gYW5vdGhlclwiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb2QoIHZhbHVlOiBudW1iZXIsIGRpdmlzb3I6IG51bWJlciApOiBudW1iZXIge1xuICByZXR1cm4gdmFsdWUgLSBNYXRoLmZsb29yKCB2YWx1ZSAvIGRpdmlzb3IgKSAqIGRpdmlzb3I7XG59XG4iLCJpbXBvcnQgeyBNYXRyaXg0IH0gZnJvbSAnLi9NYXRyaXg0JztcbmltcG9ydCB7IFZlY3RvciB9IGZyb20gJy4vVmVjdG9yJztcblxuZXhwb3J0IHR5cGUgcmF3VmVjdG9yNCA9IFsgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyIF07XG5cbi8qKlxuICogQSBWZWN0b3IzLlxuICovXG5leHBvcnQgY2xhc3MgVmVjdG9yNCBleHRlbmRzIFZlY3RvcjxWZWN0b3I0PiB7XG4gIHB1YmxpYyBlbGVtZW50czogcmF3VmVjdG9yNDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIHY6IHJhd1ZlY3RvcjQgPSBbIDAuMCwgMC4wLCAwLjAsIDAuMCBdICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IHY7XG4gIH1cblxuICAvKipcbiAgICogQW4geCBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAwIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHgoIHg6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAwIF0gPSB4O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgeSBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAxIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHkoIHk6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAxIF0gPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgeiBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAyIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHooIHo6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAyIF0gPSB6O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgdyBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAzIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHcoIHo6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAzIF0gPSB6O1xuICB9XG5cbiAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBWZWN0b3I0KCAkeyB0aGlzLngudG9GaXhlZCggMyApIH0sICR7IHRoaXMueS50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy56LnRvRml4ZWQoIDMgKSB9LCAkeyB0aGlzLncudG9GaXhlZCggMyApIH0gKWA7XG4gIH1cblxuICAvKipcbiAgICogTXVsdGlwbHkgdGhpcyB2ZWN0b3IgKHdpdGggYW4gaW1wbGljaXQgMSBpbiB0aGUgNHRoIGRpbWVuc2lvbikgYnkgbS5cbiAgICovXG4gIHB1YmxpYyBhcHBseU1hdHJpeDQoIG1hdHJpeDogTWF0cml4NCApOiBWZWN0b3I0IHtcbiAgICBjb25zdCBtID0gbWF0cml4LmVsZW1lbnRzO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3I0KCBbXG4gICAgICBtWyAwIF0gKiB0aGlzLnggKyBtWyA0IF0gKiB0aGlzLnkgKyBtWyA4IF0gKiB0aGlzLnogKyBtWyAxMiBdICogdGhpcy53LFxuICAgICAgbVsgMSBdICogdGhpcy54ICsgbVsgNSBdICogdGhpcy55ICsgbVsgOSBdICogdGhpcy56ICsgbVsgMTMgXSAqIHRoaXMudyxcbiAgICAgIG1bIDIgXSAqIHRoaXMueCArIG1bIDYgXSAqIHRoaXMueSArIG1bIDEwIF0gKiB0aGlzLnogKyBtWyAxNCBdICogdGhpcy53LFxuICAgICAgbVsgMyBdICogdGhpcy54ICsgbVsgNyBdICogdGhpcy55ICsgbVsgMTEgXSAqIHRoaXMueiArIG1bIDE1IF0gKiB0aGlzLndcbiAgICBdICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX19uZXcoIHY6IHJhd1ZlY3RvcjQgKTogVmVjdG9yNCB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3I0KCB2ICk7XG4gIH1cblxuICAvKipcbiAgICogVmVjdG9yNCggMC4wLCAwLjAsIDAuMCwgMC4wIClcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IHplcm8oKTogVmVjdG9yNCB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3I0KCBbIDAuMCwgMC4wLCAwLjAsIDAuMCBdICk7XG4gIH1cblxuICAvKipcbiAgICogVmVjdG9yNCggMS4wLCAxLjAsIDEuMCwgMS4wIClcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IG9uZSgpOiBWZWN0b3I0IHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjQoIFsgMS4wLCAxLjAsIDEuMCwgMS4wIF0gKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBVc2VmdWwgZm9yIHN3YXAgYnVmZmVyXG4gKi9cbmV4cG9ydCBjbGFzcyBTd2FwPFQ+IHtcbiAgcHVibGljIGk6IFQ7XG4gIHB1YmxpYyBvOiBUO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggYTogVCwgYjogVCApIHtcbiAgICB0aGlzLmkgPSBhO1xuICAgIHRoaXMubyA9IGI7XG4gIH1cblxuICBwdWJsaWMgc3dhcCgpOiB2b2lkIHtcbiAgICBjb25zdCBpID0gdGhpcy5pO1xuICAgIHRoaXMuaSA9IHRoaXMubztcbiAgICB0aGlzLm8gPSBpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIaXN0b3J5TWVhbkNhbGN1bGF0b3IgfSBmcm9tICcuLi9IaXN0b3J5TWVhbkNhbGN1bGF0b3IvSGlzdG9yeU1lYW5DYWxjdWxhdG9yJztcblxuZXhwb3J0IGNsYXNzIFRhcFRlbXBvIHtcbiAgcHJpdmF0ZSBfX2JwbSA9IDAuMDtcbiAgcHJpdmF0ZSBfX2xhc3RUYXAgPSAwLjA7XG4gIHByaXZhdGUgX19sYXN0QmVhdCA9IDAuMDtcbiAgcHJpdmF0ZSBfX2xhc3RUaW1lID0gMC4wO1xuICBwcml2YXRlIF9fY2FsYzogSGlzdG9yeU1lYW5DYWxjdWxhdG9yID0gbmV3IEhpc3RvcnlNZWFuQ2FsY3VsYXRvciggMTYgKTtcblxuICBwdWJsaWMgZ2V0IGJlYXREdXJhdGlvbigpOiBudW1iZXIge1xuICAgIHJldHVybiA2MC4wIC8gdGhpcy5fX2JwbTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYnBtKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX19icG07XG4gIH1cblxuICBwdWJsaWMgc2V0IGJwbSggYnBtOiBudW1iZXIgKSB7XG4gICAgdGhpcy5fX2xhc3RCZWF0ID0gdGhpcy5iZWF0O1xuICAgIHRoaXMuX19sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHRoaXMuX19icG0gPSBicG07XG4gIH1cblxuICBwdWJsaWMgZ2V0IGJlYXQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2xhc3RCZWF0ICsgKCBwZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMuX19sYXN0VGltZSApICogMC4wMDEgLyB0aGlzLmJlYXREdXJhdGlvbjtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl9fY2FsYy5yZXNldCgpO1xuICB9XG5cbiAgcHVibGljIG51ZGdlKCBhbW91bnQ6IG51bWJlciApOiB2b2lkIHtcbiAgICB0aGlzLl9fbGFzdEJlYXQgPSB0aGlzLmJlYXQgKyBhbW91bnQ7XG4gICAgdGhpcy5fX2xhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gIH1cblxuICBwdWJsaWMgdGFwKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IGRlbHRhID0gKCBub3cgLSB0aGlzLl9fbGFzdFRhcCApICogMC4wMDE7XG5cbiAgICBpZiAoIDIuMCA8IGRlbHRhICkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9fY2FsYy5wdXNoKCBkZWx0YSApO1xuICAgICAgdGhpcy5fX2JwbSA9IDYwLjAgLyAoIHRoaXMuX19jYWxjLm1lYW4gKTtcbiAgICB9XG5cbiAgICB0aGlzLl9fbGFzdFRhcCA9IG5vdztcbiAgICB0aGlzLl9fbGFzdFRpbWUgPSBub3c7XG4gICAgdGhpcy5fX2xhc3RCZWF0ID0gMC4wO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgWG9yc2hpZnQge1xuICBwdWJsaWMgc2VlZDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvciggc2VlZD86IG51bWJlciApIHtcbiAgICB0aGlzLnNlZWQgPSBzZWVkIHx8IDE7XG4gIH1cblxuICBwdWJsaWMgZ2VuKCBzZWVkPzogbnVtYmVyICk6IG51bWJlciB7XG4gICAgaWYgKCBzZWVkICkge1xuICAgICAgdGhpcy5zZWVkID0gc2VlZDtcbiAgICB9XG5cbiAgICB0aGlzLnNlZWQgPSB0aGlzLnNlZWQgXiAoIHRoaXMuc2VlZCA8PCAxMyApO1xuICAgIHRoaXMuc2VlZCA9IHRoaXMuc2VlZCBeICggdGhpcy5zZWVkID4+PiAxNyApO1xuICAgIHRoaXMuc2VlZCA9IHRoaXMuc2VlZCBeICggdGhpcy5zZWVkIDw8IDUgKTtcbiAgICByZXR1cm4gdGhpcy5zZWVkIC8gTWF0aC5wb3coIDIsIDMyICkgKyAwLjU7XG4gIH1cblxuICBwdWJsaWMgc2V0KCBzZWVkPzogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuc2VlZCA9IHNlZWQgfHwgdGhpcy5zZWVkIHx8IDE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1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LEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUM1QyxHQUFHLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsRUFDeEMsR0FBRyxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQ3pDLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUUxQixJQUFLLEtBQUssR0FBRyxDQUFDLEVBQUc7UUFDZixNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBRSxLQUFLLEdBQUcsR0FBRyxDQUFFLENBQUM7UUFDekMsT0FBTztZQUNMLENBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSyxDQUFDO1lBQ2pCLENBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSyxDQUFDO1lBQ2pCLENBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSyxDQUFDO1lBQ2pCLElBQUksR0FBRyxDQUFDO1NBQ1QsQ0FBQztLQUNIO1NBQU0sSUFBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUc7UUFDbkMsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFFLENBQUM7UUFDbkQsT0FBTztZQUNMLElBQUksR0FBRyxDQUFDO1lBQ1IsQ0FBRSxHQUFHLEdBQUcsR0FBRyxJQUFLLENBQUM7WUFDakIsQ0FBRSxHQUFHLEdBQUcsR0FBRyxJQUFLLENBQUM7WUFDakIsQ0FBRSxHQUFHLEdBQUcsR0FBRyxJQUFLLENBQUM7U0FDbEIsQ0FBQztLQUNIO1NBQU0sSUFBSyxHQUFHLEdBQUcsR0FBRyxFQUFHO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLEdBQUcs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LEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1FBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1FBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1FBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1FBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0tBQ2xDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBZ0IsQ0FBQztBQUMvQjs7QUN2Q0E7OztTQUdn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QUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxDQUFDO0lBRTdELE9BQU87UUFDTCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUU3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUM3QyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztLQUM5QyxDQUFDO0FBQ0o7O0FDekNBOzs7O1NBSWdCLGVBQWUsQ0FDN0IsR0FBRyxHQUFHLElBQUksRUFDVixJQUFJLEdBQUcsSUFBSSxFQUNYLEdBQUcsR0FBRyxLQUFLO0lBRVgsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFFLENBQUM7SUFDbEQsTUFBTSxDQUFDLElBQUssR0FBRyxHQUFHLElBQUksQ0FBRSxDQUFDO0lBQ3pCLE9BQU87UUFDTCxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1FBQ2hCLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUc7UUFDaEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFHLEdBQUcsR0FBRyxJQUFJLENBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQ25DLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsR0FBRztLQUNuQyxDQUFDO0FBQ0o7O0FDakJBOzs7U0FHZ0IsV0FBVyxDQUFFLEtBQWE7SUFDeEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUM1QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBRTVCLE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDWCxDQUFDO0FBQ0o7O0FDYkE7OztTQUdnQixXQUFXLENBQUUsS0FBYTtJQUN4QyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBRSxDQUFDO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7SUFFNUIsT0FBTztRQUNMLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUNYLENBQUM7QUFDSjs7QUNiQTs7O1NBR2dCLFdBQVcsQ0FBRSxLQUFhO0lBQ3hDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFFLENBQUM7SUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUUsQ0FBQztJQUU1QixPQUFPO1FBQ0wsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1gsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDVixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0tBQ1gsQ0FBQztBQUNKOztBQ1pBOzs7U0FHZ0IsU0FBUyxDQUFFLEdBQWU7SUFDeEMsT0FBTztRQUNMLEdBQUcsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDakIsQ0FBQyxFQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNqQixDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDWCxDQUFDO0FBQ0o7O0FDWEE7OztTQUdnQixlQUFlLENBQUUsTUFBYztJQUM3QyxPQUFPO1FBQ0wsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNmLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztLQUNYLENBQUM7QUFDSjs7QUNUQTs7O1NBR2dCLGFBQWEsQ0FBRSxHQUFlO0lBQzVDLE9BQU87UUFDTCxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ1YsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNWLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDVixHQUFHLENBQUUsQ0FBQyxDQUFFLEVBQUUsR0FBRyxDQUFFLENBQUMsQ0FBRSxFQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDO0tBQ2hDLENBQUM7QUFDSjs7QUNYQTs7O1NBR2dCLGFBQWEsQ0FBRSxDQUFhO0lBQzFDLE9BQU87UUFDTCxDQUFDLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDLENBQUUsRUFBRSxDQUFFO1FBQy9CLENBQUMsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBRSxFQUFFLENBQUU7UUFDL0IsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtRQUNoQyxDQUFDLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxDQUFDLENBQUUsRUFBRSxDQUFFO0tBQ2pDLENBQUM7QUFDSjs7QUNUQTs7O1NBR2dCLGlCQUFpQixDQUFFLElBQWdCLEVBQUUsS0FBYTtJQUNoRSxNQUFNLFNBQVMsR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFDO0lBQzlCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFLENBQUM7SUFDM0MsT0FBTztRQUNMLElBQUksQ0FBRSxDQUFDLENBQUUsR0FBRyxZQUFZO1FBQ3hCLElBQUksQ0FBRSxDQUFDLENBQUUsR0FBRyxZQUFZO1FBQ3hCLElBQUksQ0FBRSxDQUFDLENBQUUsR0FBRyxZQUFZO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUUsU0FBUyxDQUFFO0tBQ3RCLENBQUM7QUFDSjs7QUNiQTs7O1NBR2dCLFdBQVcsQ0FBRSxJQUFtQjtJQUM5QyxPQUFPLENBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFFLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7QUFDM0Q7O0FDTEE7OztTQUdnQixZQUFZLENBQUUsR0FBRyxLQUFzQjtJQUNyRCxJQUFLLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFHO1FBQ3RCLE9BQU8sS0FBSyxDQUFFLENBQUMsQ0FBRSxDQUFDO0tBQ25CO0lBRUQsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRyxDQUFDO0lBQ3pCLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBRSxHQUFHLEtBQUssQ0FBRSxDQUFDO0lBRW5DLE9BQU87UUFDTCxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtRQUNyRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtRQUNyRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtRQUNyRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxD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RUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFDMUQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUU1RCxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQzlFOzs7O0lBS0QsSUFBVyxPQUFPO1FBQ2hCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDeEIsTUFDRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRTVELE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWxGLElBQUssR0FBRyxLQUFLLEdBQUcsRUFBRztZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFFbkMsTUFBTSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUV6QixPQUFPLElBQUksT0FBTyxDQUFFO1lBQ2xCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztZQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO1lBQ2pDLEdBQUcs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QyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtZQUV2RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtZQUN0RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtZQUN0RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtZQUN2RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtZQUV2RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUN4RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUN4RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUN6RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUV6RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUMxRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUMxRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtZQUMzRSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtTQUM1RSxDQUFFLENBQUM7S0FDTDs7OztJQUtNLFdBQVcsQ0FBRSxNQUFjO1FBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsQ0FBRSxDQUFDLEtBQU0sQ0FBQyxH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
