/*!
* @0b5vr/experimental v0.7.0
* Experimental edition of 0b5vr
*
* Copyright (c) 2019-2020 0b5vr
* @0b5vr/experimental is distributed under MIT License
* https://github.com/0b5vr/experimental-npm/blob/master/LICENSE
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.OBSVR_EXPERIMENTAL = {}));
}(this, (function (exports) { 'use strict';

    // yoinked from https://stackoverflow.com/questions/1344500/efficient-way-to-insert-a-number-into-a-sorted-array-of-numbers
    function binarySearch(array, elementOrCompare) {
        if (typeof elementOrCompare !== 'function') {
            return binarySearch(array, function (element) { return (element < elementOrCompare); });
        }
        var compare = elementOrCompare;
        var start = 0;
        var end = array.length;
        while (start < end) {
            var center = (start + end) >> 1;
            var centerElement = array[center];
            var compareResult = compare(centerElement);
            if (compareResult) {
                start = center + 1;
            }
            else {
                end = center;
            }
        }
        return start;
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
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function arraySetDelete(array, value) {
        var index = array.indexOf(value);
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
        var index = array.indexOf(value);
        if (index !== -1) {
            return false;
        }
        array.push(value);
        return true;
    }
    function arraySetUnion(a, b) {
        var out = __spreadArray([], __read(a));
        b.forEach(function (v) {
            if (!arraySetHas(out, v)) {
                out.push(v);
            }
        });
        return out;
    }
    function arraySetDiff(from, diff) {
        var out = __spreadArray([], __read(from));
        diff.forEach(function (v) {
            arraySetDelete(out, v);
        });
        return out;
    }

    /**
     * `[ -1, -1, 1, -1, -1, 1, 1, 1 ]`
     */
    var TRIANGLE_STRIP_QUAD = [-1, -1, 1, -1, -1, 1, 1, 1];
    /**
     * `[ -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0 ]`
     */
    var TRIANGLE_STRIP_QUAD_3D = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
    /**
     * `[ 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1 ]`
     */
    var TRIANGLE_STRIP_QUAD_NORMAL = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
    /**
     * `[ 0, 0, 1, 0, 0, 1, 1, 1 ]`
     */
    var TRIANGLE_STRIP_QUAD_UV = [0, 0, 1, 0, 0, 1, 1, 1];

    /**
     * Shuffle given `array` using given `dice` RNG. **Destructive**.
     */
    function shuffleArray(array, dice) {
        var f = dice ? dice : function () { return Math.random(); };
        for (var i = 0; i < array.length - 1; i++) {
            var ir = i + Math.floor(f() * (array.length - i));
            var temp = array[ir];
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
        var ret = [];
        for (var i = 0; i < array.length / 3; i++) {
            var head = i * 3;
            ret.push(array[head], array[head + 1], array[head + 1], array[head + 2], array[head + 2], array[head]);
        }
        return ret;
    }
    /**
     * `matrix2d( 3, 2 )` -> `[ 0, 0, 0, 1, 0, 2, 1, 0, 1, 1, 1, 2 ]`
     */
    function matrix2d(w, h) {
        var arr = [];
        for (var iy = 0; iy < h; iy++) {
            for (var ix = 0; ix < w; ix++) {
                arr.push(ix, iy);
            }
        }
        return arr;
    }
    /**
     * See also: {@link matrix2d}
     */
    function matrix3d(w, h, d) {
        var arr = [];
        for (var iz = 0; iz < d; iz++) {
            for (var iy = 0; iy < h; iy++) {
                for (var ix = 0; ix < w; ix++) {
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
    var CDS = /** @class */ (function () {
        function CDS() {
            this.factor = 100.0;
            this.ratio = 1.0;
            this.velocity = 0.0;
            this.value = 0.0;
            this.target = 0.0;
        }
        CDS.prototype.update = function (deltaTime) {
            this.velocity += (-this.factor * (this.value - this.target)
                - 2.0 * this.velocity * Math.sqrt(this.factor) * this.ratio) * deltaTime;
            this.value += this.velocity * deltaTime;
            return this.value;
        };
        return CDS;
    }());

    /**
     * Class that deals with time.
     * In this base class, you need to set time manually from `Automaton.update()`.
     * Best for sync with external clock stuff.
     */
    var Clock = /** @class */ (function () {
        function Clock() {
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
        Object.defineProperty(Clock.prototype, "time", {
            /**
             * Its current time.
             */
            get: function () { return this.__time; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Clock.prototype, "deltaTime", {
            /**
             * Its deltaTime of last update.
             */
            get: function () { return this.__deltaTime; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Clock.prototype, "isPlaying", {
            /**
             * Whether its currently playing or not.
             */
            get: function () { return this.__isPlaying; },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the clock.
         * @param time Time. You need to set manually when you are using manual Clock
         */
        Clock.prototype.update = function (time) {
            var prevTime = this.__time;
            this.__time = time || 0.0;
            this.__deltaTime = this.__time - prevTime;
        };
        /**
         * Start the clock.
         */
        Clock.prototype.play = function () {
            this.__isPlaying = true;
        };
        /**
         * Stop the clock.
         */
        Clock.prototype.pause = function () {
            this.__isPlaying = false;
        };
        /**
         * Set the time manually.
         * @param time Time
         */
        Clock.prototype.setTime = function (time) {
            this.__time = time;
        };
        return Clock;
    }());

    /**
     * Class that deals with time.
     * This is "frame" type clock, the frame increases every {@link ClockFrame#update} call.
     * @param fps Frames per second
     */
    var ClockFrame = /** @class */ (function (_super) {
        __extends(ClockFrame, _super);
        function ClockFrame(fps) {
            if (fps === void 0) { fps = 60; }
            var _this = _super.call(this) || this;
            /**
             * Its current frame.
             */
            _this.__frame = 0;
            _this.__fps = fps;
            return _this;
        }
        Object.defineProperty(ClockFrame.prototype, "frame", {
            /**
             * Its current frame.
             */
            get: function () { return this.__frame; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ClockFrame.prototype, "fps", {
            /**
             * Its fps.
             */
            get: function () { return this.__fps; },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the clock. It will increase the frame by 1.
         */
        ClockFrame.prototype.update = function () {
            if (this.__isPlaying) {
                this.__time = this.__frame / this.__fps;
                this.__deltaTime = 1.0 / this.__fps;
                this.__frame++;
            }
            else {
                this.__deltaTime = 0.0;
            }
        };
        /**
         * Set the time manually.
         * The set time will be converted into internal frame count, so the time will not be exactly same as set one.
         * @param time Time
         */
        ClockFrame.prototype.setTime = function (time) {
            this.__frame = Math.floor(this.__fps * time);
            this.__time = this.__frame / this.__fps;
        };
        return ClockFrame;
    }(Clock));

    /**
     * Class that deals with time.
     * This is "realtime" type clock, the time goes on as real world.
     */
    var ClockRealtime = /** @class */ (function (_super) {
        __extends(ClockRealtime, _super);
        function ClockRealtime() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * "You set the time manually to `__rtTime` when it's `__rtDate`."
             */
            _this.__rtTime = 0.0;
            /**
             * "You set the time manually to `__rtTime` when it's `__rtDate`."
             */
            _this.__rtDate = performance.now();
            return _this;
        }
        Object.defineProperty(ClockRealtime.prototype, "isRealtime", {
            /**
             * The clock is realtime. yeah.
             */
            get: function () { return true; },
            enumerable: false,
            configurable: true
        });
        /**
         * Update the clock. Time is calculated based on time in real world.
         */
        ClockRealtime.prototype.update = function () {
            var now = performance.now();
            if (this.__isPlaying) {
                var prevTime = this.__time;
                var deltaDate = (now - this.__rtDate);
                this.__time = this.__rtTime + deltaDate / 1000.0;
                this.__deltaTime = this.time - prevTime;
            }
            else {
                this.__rtTime = this.time;
                this.__rtDate = now;
                this.__deltaTime = 0.0;
            }
        };
        /**
         * Set the time manually.
         * @param time Time
         */
        ClockRealtime.prototype.setTime = function (time) {
            this.__time = time;
            this.__rtTime = this.time;
            this.__rtDate = performance.now();
        };
        return ClockRealtime;
    }(Clock));

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
        var k = 0;
        // locations of parabolas in lower envelope
        var v = new Float32Array(length);
        v[0] = 0.0;
        // locations of boundaries between parabolas
        var z = new Float32Array(length + 1);
        z[0] = -Infinity;
        z[1] = Infinity;
        // create a straight array of input data
        var f = new Float32Array(length);
        for (var q = 0; q < length; q++) {
            f[q] = data[offset + q * stride];
        }
        // compute lower envelope
        for (var q = 1; q < length; q++) {
            var s = 0.0;
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
        for (var q = 0; q < length; q++) {
            while (z[k + 1] < q) {
                k++;
            }
            var qSubVK = q - v[k];
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
        for (var x = 0; x < width; x++) {
            edt1d(data, x, width, height);
        }
        for (var y = 0; y < height; y++) {
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
        var t = linearstep(a, b, x);
        return t * t * (3.0 - 2.0 * t);
    }
    /**
     * `smoothstep` but more smooth
     */
    function smootherstep(a, b, x) {
        var t = linearstep(a, b, x);
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
    }
    /**
     * `smoothstep` but WAY more smooth
     */
    function smootheststep(a, b, x) {
        var t = linearstep(a, b, x);
        return t * t * t * t * (t * (t * (-20.0 * t + 70.0) - 84.0) + 35.0);
    }

    /**
     * Do exp smoothing
     */
    var ExpSmooth = /** @class */ (function () {
        function ExpSmooth() {
            this.factor = 10.0;
            this.target = 0.0;
            this.value = 0.0;
        }
        ExpSmooth.prototype.update = function (deltaTime) {
            this.value = lerp(this.target, this.value, Math.exp(-this.factor * deltaTime));
            return this.value;
        };
        return ExpSmooth;
    }());

    var Pool = /** @class */ (function () {
        function Pool(array) {
            this.index = 0;
            this.array = array;
        }
        Object.defineProperty(Pool.prototype, "current", {
            get: function () {
                return this.array[this.index];
            },
            enumerable: false,
            configurable: true
        });
        Pool.prototype.next = function () {
            this.index = (this.index + 1) % this.array.length;
            return this.current;
        };
        return Pool;
    }());

    var GPUTimer = /** @class */ (function () {
        function GPUTimer(gl) {
            var _this = this;
            this.gl = gl;
            var queries = new Array(1024).fill(1).map(function () { return gl.createQuery(); });
            this.queries = new Pool(queries);
            this.stack = [];
            this.ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
            this.__loopTasks = new Set();
            // loop
            var update = function () {
                _this.update();
                requestAnimationFrame(update);
            };
            update();
        }
        GPUTimer.isSupported = function (gl) {
            return new Set(gl.getSupportedExtensions()).has('EXT_disjoint_timer_query_webgl2');
        };
        GPUTimer.prototype.update = function () {
            Array.from(this.__loopTasks).forEach(function (task) { return task(); });
        };
        GPUTimer.prototype.measure = function (func) {
            return __awaiter(this, void 0, void 0, function () {
                var gl, promiseFinishingPrev_1, promiseAccum, promiseThis, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            gl = this.gl;
                            if (this.stack.length !== 0) {
                                gl.endQuery(this.ext.TIME_ELAPSED_EXT);
                                promiseFinishingPrev_1 = this.check(this.queries.current);
                                this.stack = this.stack.map(function (promiseAccum) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, promiseAccum];
                                            case 1:
                                                _a = (_b.sent());
                                                return [4 /*yield*/, promiseFinishingPrev_1];
                                            case 2: return [2 /*return*/, _a + (_b.sent())];
                                        }
                                    });
                                }); });
                            }
                            this.stack.push(Promise.resolve(0.0));
                            gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.queries.next());
                            func();
                            gl.endQuery(this.ext.TIME_ELAPSED_EXT);
                            promiseAccum = this.stack.pop();
                            promiseThis = this.check(this.queries.current);
                            if (this.stack.length !== 0) {
                                this.stack = this.stack.map(function (promiseAccum) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, promiseAccum];
                                            case 1:
                                                _a = (_b.sent());
                                                return [4 /*yield*/, promiseThis];
                                            case 2: return [2 /*return*/, _a + (_b.sent())];
                                        }
                                    });
                                }); });
                                gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.queries.next());
                            }
                            return [4 /*yield*/, promiseAccum];
                        case 1:
                            _a = (_b.sent());
                            return [4 /*yield*/, promiseThis];
                        case 2: return [2 /*return*/, _a + (_b.sent())];
                    }
                });
            });
        };
        GPUTimer.prototype.check = function (query) {
            var _this = this;
            var gl = this.gl;
            return new Promise(function (resolve) {
                var task = function () {
                    var isAvailable = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE);
                    if (isAvailable) {
                        _this.__loopTasks.delete(task);
                        resolve(gl.getQueryParameter(query, gl.QUERY_RESULT) * 0.001 * 0.001);
                    }
                };
                _this.__loopTasks.add(task);
            });
        };
        return GPUTimer;
    }());

    /**
     * Useful for tap tempo
     * See also: {@link HistoryMeanCalculator}
     */
    var HistoryMeanCalculator = /** @class */ (function () {
        function HistoryMeanCalculator(length) {
            this.__recalcForEach = 0;
            this.__countUntilRecalc = 0;
            this.__history = [];
            this.__index = 0;
            this.__count = 0;
            this.__cache = 0;
            this.__length = length;
            this.__recalcForEach = length;
            for (var i = 0; i < length; i++) {
                this.__history[i] = 0;
            }
        }
        Object.defineProperty(HistoryMeanCalculator.prototype, "mean", {
            get: function () {
                var count = Math.min(this.__count, this.__length);
                return count === 0 ? 0.0 : this.__cache / count;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(HistoryMeanCalculator.prototype, "recalcForEach", {
            get: function () {
                return this.__recalcForEach;
            },
            set: function (value) {
                var delta = value - this.__recalcForEach;
                this.__recalcForEach = value;
                this.__countUntilRecalc = Math.max(0, this.__countUntilRecalc + delta);
            },
            enumerable: false,
            configurable: true
        });
        HistoryMeanCalculator.prototype.reset = function () {
            this.__index = 0;
            this.__count = 0;
            this.__cache = 0;
            this.__countUntilRecalc = 0;
            for (var i = 0; i < this.__length; i++) {
                this.__history[i] = 0;
            }
        };
        HistoryMeanCalculator.prototype.push = function (value) {
            var prev = this.__history[this.__index];
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
        };
        HistoryMeanCalculator.prototype.recalc = function () {
            this.__countUntilRecalc = this.__recalcForEach;
            var sum = this.__history
                .slice(0, Math.min(this.__count, this.__length))
                .reduce(function (sum, v) { return sum + v; }, 0);
            this.__cache = sum;
        };
        return HistoryMeanCalculator;
    }());

    /**
     * Useful for fps calc
     * See also: {@link HistoryMeanCalculator}
     */
    var HistoryPercentileCalculator = /** @class */ (function () {
        function HistoryPercentileCalculator(length) {
            this.__history = [];
            this.__sorted = [];
            this.__index = 0;
            this.__length = length;
        }
        Object.defineProperty(HistoryPercentileCalculator.prototype, "median", {
            get: function () {
                return this.percentile(50.0);
            },
            enumerable: false,
            configurable: true
        });
        HistoryPercentileCalculator.prototype.percentile = function (percentile) {
            if (this.__history.length === 0) {
                return 0.0;
            }
            return this.__sorted[Math.round(percentile * 0.01 * (this.__history.length - 1))];
        };
        HistoryPercentileCalculator.prototype.reset = function () {
            this.__index = 0;
            this.__history = [];
            this.__sorted = [];
        };
        HistoryPercentileCalculator.prototype.push = function (value) {
            var prev = this.__history[this.__index];
            this.__history[this.__index] = value;
            this.__index = (this.__index + 1) % this.__length;
            // remove the prev from sorted array
            if (this.__sorted.length === this.__length) {
                var prevIndex = binarySearch(this.__sorted, prev);
                this.__sorted.splice(prevIndex, 1);
            }
            var index = binarySearch(this.__sorted, value);
            this.__sorted.splice(index, 0, value);
        };
        return HistoryPercentileCalculator;
    }());

    /**
     * @deprecated It's actually just a special case of {@link HistoryPercentileCalculator}
     */
    var HistoryMedianCalculator = /** @class */ (function (_super) {
        __extends(HistoryMedianCalculator, _super);
        function HistoryMedianCalculator(length) {
            var _this = _super.call(this, length) || this;
            console.warn('HistoryMedianCalculator: Deprecated. Use HistoryPercentileCalculator instead');
            return _this;
        }
        return HistoryMedianCalculator;
    }(HistoryPercentileCalculator));

    /**
     * Convert a quaternion into a matrix4.
     *
     * Yoinked from Three.js.
     *
     * See: https://threejs.org/docs/#api/en/math/Matrix4.makeRotationFromQuaternion
     */
    function mat4FromQuaternion(quat) {
        var x = quat[0];
        var y = quat[1];
        var z = quat[2];
        var w = quat[3];
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
        var matRot = mat4FromQuaternion(rotation);
        var sx = scale[0], sy = scale[1], sz = scale[2];
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
        var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }

    /**
     * Generate a Quaternion out of a rotation matrix.
     * Yoinked from Three.js.
     */
    function quatFromMatrix4(m) {
        var m11 = m[0], m12 = m[4], m13 = m[8], m21 = m[1], m22 = m[5], m23 = m[9], m31 = m[2], m32 = m[6], m33 = m[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            var s = 0.5 / Math.sqrt(trace + 1.0);
            return [
                (m32 - m23) * s,
                (m13 - m31) * s,
                (m21 - m12) * s,
                0.25 / s
            ];
        }
        else if (m11 > m22 && m11 > m33) {
            var s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            return [
                0.25 * s,
                (m12 + m21) / s,
                (m13 + m31) / s,
                (m32 - m23) / s
            ];
        }
        else if (m22 > m33) {
            var s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            return [
                (m12 + m21) / s,
                0.25 * s,
                (m23 + m32) / s,
                (m13 - m31) / s
            ];
        }
        else {
            var s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
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
        return Math.sqrt(vec.reduce(function (sum, v) { return sum + v * v; }, 0.0));
    }

    /**
     * Decompose a matrix into a position, a scale, and a rotation.
     * Yoinked from Three.js.
     */
    function mat4Decompose(m) {
        var sx = vecLength([m[0], m[1], m[2]]);
        var sy = vecLength([m[4], m[5], m[6]]);
        var sz = vecLength([m[8], m[9], m[10]]);
        // if determinant is negative, we need to invert one scale
        var det = mat4Determinant(m);
        if (det < 0) {
            sx = -sx;
        }
        var invSx = 1.0 / sx;
        var invSy = 1.0 / sy;
        var invSz = 1.0 / sz;
        var rotationMatrix = m.concat();
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
        return vec.map(function (v) { return v * scalar; });
    }

    /**
     *  an inverse of given mat4.
     */
    function mat4Inverse(m) {
        var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
        var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
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
    function vecAdd() {
        var vecs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            vecs[_i] = arguments[_i];
        }
        if (vecs.length < 2) {
            return vecs[0];
        }
        var a = vecs.shift();
        var b = vecAdd.apply(void 0, __spreadArray([], __read(vecs)));
        return a.map(function (v, i) { return v + b[i]; });
    }

    /**
     * Normalize given vector.
     * If the length of given vector is 0.0, it will return a zero vector instead.
     */
    function vecNormalize(vec) {
        var len = vecLength(vec);
        var invLen = len === 0.0 ? 0.0 : 1.0 / len;
        return vecScale(vec, invLen);
    }

    /**
     * Subtract a vector from a vector.
     */
    function vecSub(vecA, vecB) {
        return vecA.map(function (v, i) { return v - vecB[i]; });
    }

    /**
     * Generate a "LookAt" matrix.
     *
     * See also: {@link mat4LookAtInverse}
     */
    function mat4LookAt(position, target, up, roll) {
        if (target === void 0) { target = [0.0, 0.0, 0.0]; }
        if (up === void 0) { up = [0.0, 1.0, 0.0]; }
        if (roll === void 0) { roll = 0.0; }
        var dir = vecNormalize(vecSub(position, target));
        var sid = vecNormalize(vec3Cross(up, dir));
        if (roll !== 0.0) {
            sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
        }
        var top = vec3Cross(dir, sid);
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
        return vecA.reduce(function (sum, v, i) { return sum + v * vecB[i]; }, 0.0);
    }

    /**
     * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
     *
     * See also: {@link mat4LookAt}
     */
    function mat4LookAtInverse(position, target, up, roll) {
        if (target === void 0) { target = [0.0, 0.0, 0.0]; }
        if (up === void 0) { up = [0.0, 1.0, 0.0]; }
        if (roll === void 0) { roll = 0.0; }
        var dir = vecNormalize(vecSub(position, target));
        var sid = vecNormalize(vec3Cross(up, dir));
        if (roll !== 0.0) {
            sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
        }
        var top = vec3Cross(dir, sid);
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
    function mat4Multiply() {
        var mats = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mats[_i] = arguments[_i];
        }
        if (mats.length < 2) {
            return mats[0];
        }
        var a = mats.shift();
        var b = mat4Multiply.apply(void 0, __spreadArray([], __read(mats)));
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3], b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7], b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11], b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
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
    function mat4Perspective(fov, near, far) {
        if (fov === void 0) { fov = 45.0; }
        if (near === void 0) { near = 0.01; }
        if (far === void 0) { far = 100.0; }
        var p = 1.0 / Math.tan(fov * Math.PI / 360.0);
        var d = (far - near);
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
        var c = Math.cos(theta);
        var s = Math.sin(theta);
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
        var c = Math.cos(theta);
        var s = Math.sin(theta);
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
        var c = Math.cos(theta);
        var s = Math.sin(theta);
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
        var halfAngle = angle / 2.0;
        var sinHalfAngle = Math.sin(halfAngle);
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
    function quatMultiply() {
        var quats = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            quats[_i] = arguments[_i];
        }
        if (quats.length < 2) {
            return quats[0];
        }
        var a = quats.shift();
        var b = quatMultiply.apply(void 0, __spreadArray([], __read(quats)));
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
        var len = vecLength(vec);
        if (len === 0.0) {
            return [0.0, 0.0, 0.0, 1.0];
        }
        return vecScale(vec, 1.0 / len);
    }

    /**
     * Divide a vector by a vector.
     */
    function vecDivide(vecA, vecB) {
        return vecA.map(function (v, i) { return v / vecB[i]; });
    }

    /**
     * Multiply a vector by a vector.
     */
    function vecMultiply(vecA, vecB) {
        return vecA.map(function (v, i) { return v * vecB[i]; });
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
        var vec4 = vec4ApplyMatrix4(__spreadArray(__spreadArray([], __read(v)), [1]), m);
        var w = vec4.pop();
        return vecScale(vec4, 1.0 / w);
    }

    /**
     * Apply a vec3 (with an implicit 1 in the 4th dimension) a quaternion.
     */
    function vec3ApplyQuaternion(vec, quat) {
        var p = __spreadArray(__spreadArray([], __read(vec)), [0.0]);
        var r = quatInverse(quat);
        var res = quatMultiply(quat, p, r);
        res.pop();
        return res;
    }

    /**
     * A Vector.
     */
    var Vector = /** @class */ (function () {
        function Vector() {
        }
        Object.defineProperty(Vector.prototype, "length", {
            /**
             * The length of this.
             * a.k.a. `magnitude`
             */
            get: function () {
                return Math.sqrt(this.elements.reduce(function (sum, v) { return sum + v * v; }, 0.0));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector.prototype, "normalized", {
            /**
             * A normalized Vector3 of this.
             */
            get: function () {
                return this.scale(1.0 / this.length);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Clone this.
         */
        Vector.prototype.clone = function () {
            return this.__new(this.elements.concat());
        };
        /**
         * Add a Vector into this.
         * @param vector Another Vector
         */
        Vector.prototype.add = function (vector) {
            return this.__new(this.elements.map(function (v, i) { return v + vector.elements[i]; }));
        };
        /**
         * Substract this from another Vector.
         * @param v Another vector
         */
        Vector.prototype.sub = function (vector) {
            return this.__new(this.elements.map(function (v, i) { return v - vector.elements[i]; }));
        };
        /**
         * Multiply a Vector with this.
         * @param vector Another Vector
         */
        Vector.prototype.multiply = function (vector) {
            return this.__new(this.elements.map(function (v, i) { return v * vector.elements[i]; }));
        };
        /**
         * Divide this from another Vector.
         * @param vector Another Vector
         */
        Vector.prototype.divide = function (vector) {
            return this.__new(this.elements.map(function (v, i) { return v / vector.elements[i]; }));
        };
        /**
         * Scale this by scalar.
         * a.k.a. `multiplyScalar`
         * @param scalar A scalar
         */
        Vector.prototype.scale = function (scalar) {
            return this.__new(this.elements.map(function (v) { return v * scalar; }));
        };
        /**
         * Dot two Vectors.
         * @param vector Another vector
         */
        Vector.prototype.dot = function (vector) {
            return this.elements.reduce(function (sum, v, i) { return sum + v * vector.elements[i]; }, 0.0);
        };
        return Vector;
    }());

    /**
     * A Vector3.
     */
    var Vector3 = /** @class */ (function (_super) {
        __extends(Vector3, _super);
        function Vector3(v) {
            if (v === void 0) { v = [0.0, 0.0, 0.0]; }
            var _this = _super.call(this) || this;
            _this.elements = v;
            return _this;
        }
        Object.defineProperty(Vector3.prototype, "x", {
            /**
             * An x component of this.
             */
            get: function () {
                return this.elements[0];
            },
            set: function (x) {
                this.elements[0] = x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            /**
             * An y component of this.
             */
            get: function () {
                return this.elements[1];
            },
            set: function (y) {
                this.elements[1] = y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            /**
             * An z component of this.
             */
            get: function () {
                return this.elements[2];
            },
            set: function (z) {
                this.elements[2] = z;
            },
            enumerable: false,
            configurable: true
        });
        Vector3.prototype.toString = function () {
            return "Vector3( " + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ", " + this.z.toFixed(3) + " )";
        };
        /**
         * Return a cross of this and another Vector3.
         * @param vector Another vector
         */
        Vector3.prototype.cross = function (vector) {
            return new Vector3([
                this.y * vector.z - this.z * vector.y,
                this.z * vector.x - this.x * vector.z,
                this.x * vector.y - this.y * vector.x
            ]);
        };
        /**
         * Rotate this vector using a Quaternion.
         * @param quaternion A quaternion
         */
        Vector3.prototype.applyQuaternion = function (quaternion) {
            var p = new Quaternion([this.x, this.y, this.z, 0.0]);
            var r = quaternion.inversed;
            var res = quaternion.multiply(p).multiply(r);
            return new Vector3([res.x, res.y, res.z]);
        };
        /**
         * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
         */
        Vector3.prototype.applyMatrix4 = function (matrix) {
            var m = matrix.elements;
            var w = m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15];
            var invW = 1.0 / w;
            return new Vector3([
                (m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12]) * invW,
                (m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13]) * invW,
                (m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14]) * invW
            ]);
        };
        Vector3.prototype.__new = function (v) {
            return new Vector3(v);
        };
        Object.defineProperty(Vector3, "zero", {
            /**
             * Vector3( 0.0, 0.0, 0.0 )
             */
            get: function () {
                return new Vector3([0.0, 0.0, 0.0]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector3, "one", {
            /**
             * Vector3( 1.0, 1.0, 1.0 )
             */
            get: function () {
                return new Vector3([1.0, 1.0, 1.0]);
            },
            enumerable: false,
            configurable: true
        });
        return Vector3;
    }(Vector));

    var rawIdentityQuaternion = [0.0, 0.0, 0.0, 1.0];
    /**
     * A Quaternion.
     */
    var Quaternion = /** @class */ (function () {
        function Quaternion(elements) {
            if (elements === void 0) { elements = rawIdentityQuaternion; }
            this.elements = elements;
        }
        Object.defineProperty(Quaternion.prototype, "x", {
            /**
             * An x component of this.
             */
            get: function () {
                return this.elements[0];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "y", {
            /**
             * An y component of this.
             */
            get: function () {
                return this.elements[1];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "z", {
            /**
             * An z component of this.
             */
            get: function () {
                return this.elements[2];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "w", {
            /**
             * An w component of this.
             */
            get: function () {
                return this.elements[3];
            },
            enumerable: false,
            configurable: true
        });
        Quaternion.prototype.toString = function () {
            return "Quaternion( " + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ", " + this.z.toFixed(3) + ", " + this.w.toFixed(3) + " )";
        };
        /**
         * Clone this.
         */
        Quaternion.prototype.clone = function () {
            return new Quaternion(this.elements.concat());
        };
        Object.defineProperty(Quaternion.prototype, "matrix", {
            /**
             * Itself but converted into a Matrix4.
             */
            get: function () {
                var x = new Vector3([1.0, 0.0, 0.0]).applyQuaternion(this);
                var y = new Vector3([0.0, 1.0, 0.0]).applyQuaternion(this);
                var z = new Vector3([0.0, 0.0, 1.0]).applyQuaternion(this);
                return new Matrix4([
                    x.x, y.x, z.x, 0.0,
                    x.y, y.y, z.y, 0.0,
                    x.z, y.z, z.z, 0.0,
                    0.0, 0.0, 0.0, 1.0
                ]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "inversed", {
            /**
             * An inverse of this.
             */
            get: function () {
                return new Quaternion([
                    -this.x,
                    -this.y,
                    -this.z,
                    this.w
                ]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "length", {
            /**
             * The length of this.
             */
            get: function () {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "normalized", {
            /**
             * A normalized this.
             */
            get: function () {
                var l = this.length;
                if (l === 0) {
                    return Quaternion.identity;
                }
                var lInv = 1.0 / this.length;
                return new Quaternion([
                    this.x * lInv,
                    this.y * lInv,
                    this.z * lInv,
                    this.w * lInv,
                ]);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Multiply two Quaternions.
         * @param q Another Quaternion
         */
        Quaternion.prototype.multiply = function (q) {
            return new Quaternion([
                this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
                this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
                this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w,
                this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z
            ]);
        };
        Object.defineProperty(Quaternion, "identity", {
            /**
             * An identity Quaternion.
             */
            get: function () {
                return new Quaternion(rawIdentityQuaternion);
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Generate a Quaternion out of angle and axis.
         */
        Quaternion.fromAxisAngle = function (axis, angle) {
            var halfAngle = angle / 2.0;
            var sinHalfAngle = Math.sin(halfAngle);
            return new Quaternion([
                axis.x * sinHalfAngle,
                axis.y * sinHalfAngle,
                axis.z * sinHalfAngle,
                Math.cos(halfAngle)
            ]);
        };
        /**
         * Generate a Quaternion out of a rotation matrix.
         * Yoinked from Three.js.
         */
        Quaternion.fromMatrix = function (matrix) {
            var m = matrix.elements, m11 = m[0], m12 = m[4], m13 = m[8], m21 = m[1], m22 = m[5], m23 = m[9], m31 = m[2], m32 = m[6], m33 = m[10], trace = m11 + m22 + m33;
            if (trace > 0) {
                var s = 0.5 / Math.sqrt(trace + 1.0);
                return new Quaternion([
                    (m32 - m23) * s,
                    (m13 - m31) * s,
                    (m21 - m12) * s,
                    0.25 / s
                ]);
            }
            else if (m11 > m22 && m11 > m33) {
                var s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                return new Quaternion([
                    0.25 * s,
                    (m12 + m21) / s,
                    (m13 + m31) / s,
                    (m32 - m23) / s
                ]);
            }
            else if (m22 > m33) {
                var s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                return new Quaternion([
                    (m12 + m21) / s,
                    0.25 * s,
                    (m23 + m32) / s,
                    (m13 - m31) / s
                ]);
            }
            else {
                var s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                return new Quaternion([
                    (m13 + m31) / s,
                    (m23 + m32) / s,
                    0.25 * s,
                    (m21 - m12) / s
                ]);
            }
        };
        return Quaternion;
    }());

    var rawIdentityMatrix4 = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    /**
     * A Matrix4.
     */
    var Matrix4 = /** @class */ (function () {
        function Matrix4(v) {
            if (v === void 0) { v = rawIdentityMatrix4; }
            this.elements = v;
        }
        Object.defineProperty(Matrix4.prototype, "transpose", {
            /**
             * Itself but transposed.
             */
            get: function () {
                var m = this.elements;
                return new Matrix4([
                    m[0], m[4], m[8], m[12],
                    m[1], m[5], m[9], m[13],
                    m[2], m[6], m[10], m[14],
                    m[3], m[7], m[11], m[15]
                ]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "determinant", {
            /**
             * Its determinant.
             */
            get: function () {
                var m = this.elements;
                var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
                return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Matrix4.prototype, "inverse", {
            /**
             * Itself but inverted.
             */
            get: function () {
                var m = this.elements;
                var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
                var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
                if (det === 0.0) {
                    return null;
                }
                var invDet = 1.0 / det;
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
                ].map(function (v) { return v * invDet; }));
            },
            enumerable: false,
            configurable: true
        });
        Matrix4.prototype.toString = function () {
            var m = this.elements.map(function (v) { return v.toFixed(3); });
            return "Matrix4( " + m[0] + ", " + m[4] + ", " + m[8] + ", " + m[12] + "; " + m[1] + ", " + m[5] + ", " + m[9] + ", " + m[13] + "; " + m[2] + ", " + m[6] + ", " + m[10] + ", " + m[14] + "; " + m[3] + ", " + m[7] + ", " + m[11] + ", " + m[15] + " )";
        };
        /**
         * Clone this.
         */
        Matrix4.prototype.clone = function () {
            return new Matrix4(this.elements.concat());
        };
        /**
         * Multiply this Matrix4 by one or more Matrix4s.
         */
        Matrix4.prototype.multiply = function () {
            var matrices = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matrices[_i] = arguments[_i];
            }
            if (matrices.length === 0) {
                return this.clone();
            }
            var arr = matrices.concat();
            var bMat = arr.shift();
            if (0 < arr.length) {
                bMat = bMat.multiply.apply(bMat, __spreadArray([], __read(arr)));
            }
            var a = this.elements;
            var b = bMat.elements;
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
        };
        /**
         * Multiply this Matrix4 by a scalar
         */
        Matrix4.prototype.scaleScalar = function (scalar) {
            return new Matrix4(this.elements.map(function (v) { return v * scalar; }));
        };
        Object.defineProperty(Matrix4, "identity", {
            /**
             * An identity Matrix4.
             */
            get: function () {
                return new Matrix4(rawIdentityMatrix4);
            },
            enumerable: false,
            configurable: true
        });
        Matrix4.multiply = function () {
            var matrices = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matrices[_i] = arguments[_i];
            }
            if (matrices.length === 0) {
                return Matrix4.identity;
            }
            else {
                var bMats = matrices.concat();
                var aMat = bMats.shift();
                return aMat.multiply.apply(aMat, __spreadArray([], __read(bMats)));
            }
        };
        /**
         * Generate a translation matrix.
         * @param vector Translation
         */
        Matrix4.translate = function (vector) {
            return new Matrix4([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                vector.x, vector.y, vector.z, 1
            ]);
        };
        /**
         * Generate a 3d scaling matrix.
         * @param vector Scale
         */
        Matrix4.scale = function (vector) {
            return new Matrix4([
                vector.x, 0, 0, 0,
                0, vector.y, 0, 0,
                0, 0, vector.z, 0,
                0, 0, 0, 1
            ]);
        };
        /**
         * Generate a 3d scaling matrix by a scalar.
         * @param vector Scale
         */
        Matrix4.scaleScalar = function (scalar) {
            return new Matrix4([
                scalar, 0, 0, 0,
                0, scalar, 0, 0,
                0, 0, scalar, 0,
                0, 0, 0, 1
            ]);
        };
        /**
         * Generate a 3d rotation matrix, rotates around x axis.
         * @param vector Scale
         */
        Matrix4.rotateX = function (theta) {
            return new Matrix4([
                1, 0, 0, 0,
                0, Math.cos(theta), -Math.sin(theta), 0,
                0, Math.sin(theta), Math.cos(theta), 0,
                0, 0, 0, 1
            ]);
        };
        /**
         * Generate a 3d rotation matrix, rotates around y axis.
         * @param vector Scale
         */
        Matrix4.rotateY = function (theta) {
            return new Matrix4([
                Math.cos(theta), 0, Math.sin(theta), 0,
                0, 1, 0, 0,
                -Math.sin(theta), 0, Math.cos(theta), 0,
                0, 0, 0, 1
            ]);
        };
        /**
         * Generate a 3d rotation matrix, rotates around z axis.
         * @param vector Scale
         */
        Matrix4.rotateZ = function (theta) {
            return new Matrix4([
                Math.cos(theta), -Math.sin(theta), 0, 0,
                Math.sin(theta), Math.cos(theta), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        };
        /**
         * Generate a "LookAt" matrix.
         *
         * See also: {@link lookAtInverse}
         */
        Matrix4.lookAt = function (position, target, up, roll) {
            if (target === void 0) { target = new Vector3([0.0, 0.0, 0.0]); }
            if (up === void 0) { up = new Vector3([0.0, 1.0, 0.0]); }
            if (roll === void 0) { roll = 0.0; }
            var dir = position.sub(target).normalized;
            var sid = up.cross(dir).normalized;
            var top = dir.cross(sid);
            sid = sid.scale(Math.cos(roll)).add(top.scale(Math.sin(roll)));
            top = dir.cross(sid);
            return new Matrix4([
                sid.x, sid.y, sid.z, 0.0,
                top.x, top.y, top.z, 0.0,
                dir.x, dir.y, dir.z, 0.0,
                position.x, position.y, position.z, 1.0
            ]);
        };
        /**
         * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
         *
         * See also: {@link lookAt}
         */
        Matrix4.lookAtInverse = function (position, target, up, roll) {
            if (target === void 0) { target = new Vector3([0.0, 0.0, 0.0]); }
            if (up === void 0) { up = new Vector3([0.0, 1.0, 0.0]); }
            if (roll === void 0) { roll = 0.0; }
            var dir = position.sub(target).normalized;
            var sid = up.cross(dir).normalized;
            var top = dir.cross(sid);
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
        };
        /**
         * Generate a "Perspective" projection matrix.
         * It won't include aspect!
         */
        Matrix4.perspective = function (fov, near, far) {
            if (fov === void 0) { fov = 45.0; }
            if (near === void 0) { near = 0.01; }
            if (far === void 0) { far = 100.0; }
            var p = 1.0 / Math.tan(fov * Math.PI / 360.0);
            var d = (far - near);
            return new Matrix4([
                p, 0.0, 0.0, 0.0,
                0.0, p, 0.0, 0.0,
                0.0, 0.0, -(far + near) / d, -1.0,
                0.0, 0.0, -2 * far * near / d, 0.0
            ]);
        };
        /**
         * Decompose this matrix into a position, a scale, and a rotation.
         * Yoinked from Three.js.
         */
        Matrix4.prototype.decompose = function () {
            var m = this.elements;
            var sx = new Vector3([m[0], m[1], m[2]]).length;
            var sy = new Vector3([m[4], m[5], m[6]]).length;
            var sz = new Vector3([m[8], m[9], m[10]]).length;
            // if determine is negative, we need to invert one scale
            var det = this.determinant;
            if (det < 0) {
                sx = -sx;
            }
            var invSx = 1.0 / sx;
            var invSy = 1.0 / sy;
            var invSz = 1.0 / sz;
            var rotationMatrix = this.clone();
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
        };
        /**
         * Compose a matrix out of position, scale, and rotation.
         * Yoinked from Three.js.
         */
        Matrix4.compose = function (position, rotation, scale) {
            var x = rotation.x, y = rotation.y, z = rotation.z, w = rotation.w;
            var x2 = x + x, y2 = y + y, z2 = z + z;
            var xx = x * x2, xy = x * y2, xz = x * z2;
            var yy = y * y2, yz = y * z2, zz = z * z2;
            var wx = w * x2, wy = w * y2, wz = w * z2;
            var sx = scale.x, sy = scale.y, sz = scale.z;
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
        };
        return Matrix4;
    }());

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
    var Vector4 = /** @class */ (function (_super) {
        __extends(Vector4, _super);
        function Vector4(v) {
            if (v === void 0) { v = [0.0, 0.0, 0.0, 0.0]; }
            var _this = _super.call(this) || this;
            _this.elements = v;
            return _this;
        }
        Object.defineProperty(Vector4.prototype, "x", {
            /**
             * An x component of this.
             */
            get: function () {
                return this.elements[0];
            },
            set: function (x) {
                this.elements[0] = x;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "y", {
            /**
             * A y component of this.
             */
            get: function () {
                return this.elements[1];
            },
            set: function (y) {
                this.elements[1] = y;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "z", {
            /**
             * A z component of this.
             */
            get: function () {
                return this.elements[2];
            },
            set: function (z) {
                this.elements[2] = z;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector4.prototype, "w", {
            /**
             * A w component of this.
             */
            get: function () {
                return this.elements[3];
            },
            set: function (z) {
                this.elements[3] = z;
            },
            enumerable: false,
            configurable: true
        });
        Vector4.prototype.toString = function () {
            return "Vector4( " + this.x.toFixed(3) + ", " + this.y.toFixed(3) + ", " + this.z.toFixed(3) + ", " + this.w.toFixed(3) + " )";
        };
        /**
         * Multiply this vector (with an implicit 1 in the 4th dimension) by m.
         */
        Vector4.prototype.applyMatrix4 = function (matrix) {
            var m = matrix.elements;
            return new Vector4([
                m[0] * this.x + m[4] * this.y + m[8] * this.z + m[12] * this.w,
                m[1] * this.x + m[5] * this.y + m[9] * this.z + m[13] * this.w,
                m[2] * this.x + m[6] * this.y + m[10] * this.z + m[14] * this.w,
                m[3] * this.x + m[7] * this.y + m[11] * this.z + m[15] * this.w
            ]);
        };
        Vector4.prototype.__new = function (v) {
            return new Vector4(v);
        };
        Object.defineProperty(Vector4, "zero", {
            /**
             * Vector4( 0.0, 0.0, 0.0, 0.0 )
             */
            get: function () {
                return new Vector4([0.0, 0.0, 0.0, 0.0]);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Vector4, "one", {
            /**
             * Vector4( 1.0, 1.0, 1.0, 1.0 )
             */
            get: function () {
                return new Vector4([1.0, 1.0, 1.0, 1.0]);
            },
            enumerable: false,
            configurable: true
        });
        return Vector4;
    }(Vector));

    /**
     * Useful for swap buffer
     */
    var Swap = /** @class */ (function () {
        function Swap(a, b) {
            this.i = a;
            this.o = b;
        }
        Swap.prototype.swap = function () {
            var i = this.i;
            this.i = this.o;
            this.o = i;
        };
        return Swap;
    }());

    var TapTempo = /** @class */ (function () {
        function TapTempo() {
            this.__bpm = 0.0;
            this.__lastTap = 0.0;
            this.__lastBeat = 0.0;
            this.__lastTime = 0.0;
            this.__calc = new HistoryMeanCalculator(16);
        }
        Object.defineProperty(TapTempo.prototype, "beatDuration", {
            get: function () {
                return 60.0 / this.__bpm;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TapTempo.prototype, "bpm", {
            get: function () {
                return this.__bpm;
            },
            set: function (bpm) {
                this.__lastBeat = this.beat;
                this.__lastTime = performance.now();
                this.__bpm = bpm;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(TapTempo.prototype, "beat", {
            get: function () {
                return this.__lastBeat + (performance.now() - this.__lastTime) * 0.001 / this.beatDuration;
            },
            enumerable: false,
            configurable: true
        });
        TapTempo.prototype.reset = function () {
            this.__calc.reset();
        };
        TapTempo.prototype.nudge = function (amount) {
            this.__lastBeat = this.beat + amount;
            this.__lastTime = performance.now();
        };
        TapTempo.prototype.tap = function () {
            var now = performance.now();
            var delta = (now - this.__lastTap) * 0.001;
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
        };
        return TapTempo;
    }());

    var Xorshift = /** @class */ (function () {
        function Xorshift(seed) {
            this.seed = seed || 1;
        }
        Xorshift.prototype.gen = function (seed) {
            if (seed) {
                this.seed = seed;
            }
            this.seed = this.seed ^ (this.seed << 13);
            this.seed = this.seed ^ (this.seed >>> 17);
            this.seed = this.seed ^ (this.seed << 5);
            return this.seed / Math.pow(2, 32) + 0.5;
        };
        Xorshift.prototype.set = function (seed) {
            this.seed = seed || this.seed || 1;
        };
        return Xorshift;
    }());

    exports.CDS = CDS;
    exports.Clock = Clock;
    exports.ClockFrame = ClockFrame;
    exports.ClockRealtime = ClockRealtime;
    exports.ExpSmooth = ExpSmooth;
    exports.GPUTimer = GPUTimer;
    exports.HistoryMeanCalculator = HistoryMeanCalculator;
    exports.HistoryMedianCalculator = HistoryMedianCalculator;
    exports.HistoryPercentileCalculator = HistoryPercentileCalculator;
    exports.Matrix4 = Matrix4;
    exports.Pool = Pool;
    exports.Quaternion = Quaternion;
    exports.Swap = Swap;
    exports.TRIANGLE_STRIP_QUAD = TRIANGLE_STRIP_QUAD;
    exports.TRIANGLE_STRIP_QUAD_3D = TRIANGLE_STRIP_QUAD_3D;
    exports.TRIANGLE_STRIP_QUAD_NORMAL = TRIANGLE_STRIP_QUAD_NORMAL;
    exports.TRIANGLE_STRIP_QUAD_UV = TRIANGLE_STRIP_QUAD_UV;
    exports.TapTempo = TapTempo;
    exports.Vector = Vector;
    exports.Vector3 = Vector3;
    exports.Vector4 = Vector4;
    exports.Xorshift = Xorshift;
    exports.arraySetAdd = arraySetAdd;
    exports.arraySetDelete = arraySetDelete;
    exports.arraySetDiff = arraySetDiff;
    exports.arraySetHas = arraySetHas;
    exports.arraySetUnion = arraySetUnion;
    exports.binarySearch = binarySearch;
    exports.clamp = clamp;
    exports.edt1d = edt1d;
    exports.edt2d = edt2d;
    exports.lerp = lerp;
    exports.linearstep = linearstep;
    exports.mat4Compose = mat4Compose;
    exports.mat4Decompose = mat4Decompose;
    exports.mat4Determinant = mat4Determinant;
    exports.mat4FromQuaternion = mat4FromQuaternion;
    exports.mat4Inverse = mat4Inverse;
    exports.mat4LookAt = mat4LookAt;
    exports.mat4LookAtInverse = mat4LookAtInverse;
    exports.mat4Multiply = mat4Multiply;
    exports.mat4Perspective = mat4Perspective;
    exports.mat4RotateX = mat4RotateX;
    exports.mat4RotateY = mat4RotateY;
    exports.mat4RotateZ = mat4RotateZ;
    exports.mat4Scale = mat4Scale;
    exports.mat4ScaleScalar = mat4ScaleScalar;
    exports.mat4Translate = mat4Translate;
    exports.mat4Transpose = mat4Transpose;
    exports.matrix2d = matrix2d;
    exports.matrix3d = matrix3d;
    exports.mod = mod;
    exports.quatFromAxisAngle = quatFromAxisAngle;
    exports.quatFromMatrix4 = quatFromMatrix4;
    exports.quatInverse = quatInverse;
    exports.quatMultiply = quatMultiply;
    exports.quatNormalize = quatNormalize;
    exports.range = range;
    exports.rawIdentityMatrix4 = rawIdentityMatrix4;
    exports.rawIdentityQuaternion = rawIdentityQuaternion;
    exports.saturate = saturate;
    exports.shuffleArray = shuffleArray;
    exports.smootherstep = smootherstep;
    exports.smootheststep = smootheststep;
    exports.smoothstep = smoothstep;
    exports.triIndexToLineIndex = triIndexToLineIndex;
    exports.vec3ApplyMatrix4 = vec3ApplyMatrix4;
    exports.vec3ApplyQuaternion = vec3ApplyQuaternion;
    exports.vec3Cross = vec3Cross;
    exports.vec4ApplyMatrix4 = vec4ApplyMatrix4;
    exports.vecAdd = vecAdd;
    exports.vecDivide = vecDivide;
    exports.vecDot = vecDot;
    exports.vecLength = vecLength;
    exports.vecMultiply = vecMultiply;
    exports.vecNormalize = vecNormalize;
    exports.vecScale = vecScale;
    exports.vecSub = vecSub;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMGI1dnItZXhwZXJpbWVudGFsLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWxnb3JpdGhtL2JpbmFyeVNlYXJjaC50cyIsIi4uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCIuLi9zcmMvYXJyYXkvYXJyYXlTZXQudHMiLCIuLi9zcmMvYXJyYXkvY29uc3RhbnRzLnRzIiwiLi4vc3JjL2FycmF5L3V0aWxzLnRzIiwiLi4vc3JjL0NEUy9DRFMudHMiLCIuLi9zcmMvQ2xvY2svQ2xvY2sudHMiLCIuLi9zcmMvQ2xvY2svQ2xvY2tGcmFtZS50cyIsIi4uL3NyYy9DbG9jay9DbG9ja1JlYWx0aW1lLnRzIiwiLi4vc3JjL2VkdC9lZHQudHMiLCIuLi9zcmMvbWF0aC91dGlscy50cyIsIi4uL3NyYy9FeHBTbW9vdGgvRXhwU21vb3RoLnRzIiwiLi4vc3JjL1Bvb2wvUG9vbC50cyIsIi4uL3NyYy9HUFVUaW1lci9HUFVUaW1lci50cyIsIi4uL3NyYy9IaXN0b3J5TWVhbkNhbGN1bGF0b3IvSGlzdG9yeU1lYW5DYWxjdWxhdG9yLnRzIiwiLi4vc3JjL0hpc3RvcnlNZWFuQ2FsY3VsYXRvci9IaXN0b3J5UGVyY2VudGlsZUNhbGN1bGF0b3IudHMiLCIuLi9zcmMvSGlzdG9yeU1lYW5DYWxjdWxhdG9yL0hpc3RvcnlNZWRpYW5DYWxjdWxhdG9yLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0RnJvbVF1YXRlcm5pb24udHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRDb21wb3NlLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0RGV0ZXJtaW5hbnQudHMiLCIuLi9zcmMvbWF0aC9xdWF0L3F1YXRGcm9tTWF0cml4NC50cyIsIi4uL3NyYy9tYXRoL3ZlYy92ZWNMZW5ndGgudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDREZWNvbXBvc2UudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjU2NhbGUudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRJbnZlcnNlLnRzIiwiLi4vc3JjL21hdGgvdmVjMy92ZWMzQ3Jvc3MudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjQWRkLnRzIiwiLi4vc3JjL21hdGgvdmVjL3ZlY05vcm1hbGl6ZS50cyIsIi4uL3NyYy9tYXRoL3ZlYy92ZWNTdWIudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRMb29rQXQudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjRG90LnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0TG9va0F0SW52ZXJzZS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NE11bHRpcGx5LnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0UGVyc3BlY3RpdmUudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRSb3RhdGVYLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0Um90YXRlWS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFJvdGF0ZVoudHMiLCIuLi9zcmMvbWF0aC9tYXQ0L21hdDRTY2FsZS50cyIsIi4uL3NyYy9tYXRoL21hdDQvbWF0NFNjYWxlU2NhbGFyLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0VHJhbnNsYXRlLnRzIiwiLi4vc3JjL21hdGgvbWF0NC9tYXQ0VHJhbnNwb3NlLnRzIiwiLi4vc3JjL21hdGgvcXVhdC9xdWF0RnJvbUF4aXNBbmdsZS50cyIsIi4uL3NyYy9tYXRoL3F1YXQvcXVhdEludmVyc2UudHMiLCIuLi9zcmMvbWF0aC9xdWF0L3F1YXRNdWx0aXBseS50cyIsIi4uL3NyYy9tYXRoL3F1YXQvcXVhdE5vcm1hbGl6ZS50cyIsIi4uL3NyYy9tYXRoL3ZlYy92ZWNEaXZpZGUudHMiLCIuLi9zcmMvbWF0aC92ZWMvdmVjTXVsdGlwbHkudHMiLCIuLi9zcmMvbWF0aC92ZWM0L3ZlYzRBcHBseU1hdHJpeDQudHMiLCIuLi9zcmMvbWF0aC92ZWMzL3ZlYzNBcHBseU1hdHJpeDQudHMiLCIuLi9zcmMvbWF0aC92ZWMzL3ZlYzNBcHBseVF1YXRlcm5pb24udHMiLCIuLi9zcmMvbWF0aC9WZWN0b3IudHMiLCIuLi9zcmMvbWF0aC9WZWN0b3IzLnRzIiwiLi4vc3JjL21hdGgvUXVhdGVybmlvbi50cyIsIi4uL3NyYy9tYXRoL01hdHJpeDQudHMiLCIuLi9zcmMvbWF0aC9tb2QudHMiLCIuLi9zcmMvbWF0aC9WZWN0b3I0LnRzIiwiLi4vc3JjL1N3YXAvU3dhcC50cyIsIi4uL3NyYy9UYXBUZW1wby9UYXBUZW1wby50cyIsIi4uL3NyYy9Yb3JzaGlmdC9Yb3JzaGlmdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyB5b2lua2VkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTM0NDUwMC9lZmZpY2llbnQtd2F5LXRvLWluc2VydC1hLW51bWJlci1pbnRvLWEtc29ydGVkLWFycmF5LW9mLW51bWJlcnNcblxuLyoqXG4gKiBMb29rIGZvciBhbiBpbmRleCBmcm9tIGEgc29ydGVkIGxpc3QgdXNpbmcgYmluYXJ5IHNlYXJjaC5cbiAqXG4gKiBJZiB5b3UgZG9uJ3QgcHJvdmlkZSBhIGNvbXBhcmUgZnVuY3Rpb24sIGl0IHdpbGwgbG9vayBmb3IgKip0aGUgZmlyc3Qgc2FtZSB2YWx1ZSoqIGl0IGNhbiBmaW5kLlxuICogSWYgaXQgY2Fubm90IGZpbmQgYW4gZXhhY3RseSBtYXRjaGluZyB2YWx1ZSwgaXQgY2FuIHJldHVybiBOIHdoZXJlIHRoZSBsZW5ndGggb2YgZ2l2ZW4gYXJyYXkgaXMgTi5cbiAqXG4gKiBAcGFyYW0gYXJyYXkgQSBzb3J0ZWQgYXJyYXlcbiAqIEBwYXJhbSBjb21wYXJlIE1ha2UgdGhpcyBmdW5jdGlvbiByZXR1cm4gYGZhbHNlYCBpZiB5b3Ugd2FudCB0byBwb2ludCByaWdodCBzaWRlIG9mIGdpdmVuIGVsZW1lbnQsIGB0cnVlYCBpZiB5b3Ugd2FudCB0byBwb2ludCBsZWZ0IHNpZGUgb2YgZ2l2ZW4gZWxlbWVudC5cbiAqIEByZXR1cm5zIEFuIGluZGV4IGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlTZWFyY2g8VD4oIGFycmF5OiBBcnJheUxpa2U8VD4sIGVsZW1lbnQ6IFQgKTogbnVtYmVyO1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaDxUPiggYXJyYXk6IEFycmF5TGlrZTxUPiwgY29tcGFyZTogKCBlbGVtZW50OiBUICkgPT4gYm9vbGVhbiApOiBudW1iZXI7XG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5U2VhcmNoPFQ+KFxuICBhcnJheTogQXJyYXlMaWtlPFQ+LFxuICBlbGVtZW50T3JDb21wYXJlOiBUIHwgKCAoIGVsZW1lbnQ6IFQgKSA9PiBib29sZWFuICksXG4pOiBudW1iZXIge1xuICBpZiAoIHR5cGVvZiBlbGVtZW50T3JDb21wYXJlICE9PSAnZnVuY3Rpb24nICkge1xuICAgIHJldHVybiBiaW5hcnlTZWFyY2goIGFycmF5LCAoIGVsZW1lbnQgKSA9PiAoIGVsZW1lbnQgPCBlbGVtZW50T3JDb21wYXJlICkgKTtcbiAgfVxuICBjb25zdCBjb21wYXJlID0gZWxlbWVudE9yQ29tcGFyZSBhcyAoIGVsZW1lbnQ6IFQgKSA9PiBib29sZWFuO1xuXG4gIGxldCBzdGFydCA9IDA7XG4gIGxldCBlbmQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCBzdGFydCA8IGVuZCApIHtcbiAgICBjb25zdCBjZW50ZXIgPSAoIHN0YXJ0ICsgZW5kICkgPj4gMTtcbiAgICBjb25zdCBjZW50ZXJFbGVtZW50ID0gYXJyYXlbIGNlbnRlciBdO1xuXG4gICAgY29uc3QgY29tcGFyZVJlc3VsdCA9IGNvbXBhcmUoIGNlbnRlckVsZW1lbnQgKTtcblxuICAgIGlmICggY29tcGFyZVJlc3VsdCApIHtcbiAgICAgIHN0YXJ0ID0gY2VudGVyICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5kID0gY2VudGVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGFydDtcbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJleHBvcnQgZnVuY3Rpb24gYXJyYXlTZXREZWxldGU8VD4oIGFycmF5OiBBcnJheTxUPiwgdmFsdWU6IFQgKTogYm9vbGVhbiB7XG4gIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZiggdmFsdWUgKTtcbiAgaWYgKCBpbmRleCA9PT0gLTEgKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGFycmF5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVNldEhhczxUPiggYXJyYXk6IEFycmF5PFQ+LCB2YWx1ZTogVCApOiBib29sZWFuIHtcbiAgcmV0dXJuIGFycmF5LmluZGV4T2YoIHZhbHVlICkgIT09IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlTZXRBZGQ8VD4oIGFycmF5OiBBcnJheTxUPiwgdmFsdWU6IFQgKTogYm9vbGVhbiB7XG4gIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZiggdmFsdWUgKTtcbiAgaWYgKCBpbmRleCAhPT0gLTEgKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGFycmF5LnB1c2goIHZhbHVlICk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyYXlTZXRVbmlvbjxUPiggYTogQXJyYXk8VD4sIGI6IEFycmF5PFQ+ICk6IEFycmF5PFQ+IHtcbiAgY29uc3Qgb3V0ID0gWyAuLi5hIF07XG4gIGIuZm9yRWFjaCggKCB2ICkgPT4ge1xuICAgIGlmICggIWFycmF5U2V0SGFzKCBvdXQsIHYgKSApIHtcbiAgICAgIG91dC5wdXNoKCB2ICk7XG4gICAgfVxuICB9ICk7XG4gIHJldHVybiBvdXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcnJheVNldERpZmY8VD4oIGZyb206IEFycmF5PFQ+LCBkaWZmOiBBcnJheTxUPiApOiBBcnJheTxUPiB7XG4gIGNvbnN0IG91dCA9IFsgLi4uZnJvbSBdO1xuICBkaWZmLmZvckVhY2goICggdiApID0+IHtcbiAgICBhcnJheVNldERlbGV0ZSggb3V0LCB2ICk7XG4gIH0gKTtcbiAgcmV0dXJuIG91dDtcbn1cbiIsIi8qKlxuICogYFsgLTEsIC0xLCAxLCAtMSwgLTEsIDEsIDEsIDEgXWBcbiAqL1xuZXhwb3J0IGNvbnN0IFRSSUFOR0xFX1NUUklQX1FVQUQgPSBbIC0xLCAtMSwgMSwgLTEsIC0xLCAxLCAxLCAxIF07XG5cbi8qKlxuICogYFsgLTEsIC0xLCAwLCAxLCAtMSwgMCwgLTEsIDEsIDAsIDEsIDEsIDAgXWBcbiAqL1xuZXhwb3J0IGNvbnN0IFRSSUFOR0xFX1NUUklQX1FVQURfM0QgPSBbIC0xLCAtMSwgMCwgMSwgLTEsIDAsIC0xLCAxLCAwLCAxLCAxLCAwIF07XG5cbi8qKlxuICogYFsgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSwgMCwgMCwgMSBdYFxuICovXG5leHBvcnQgY29uc3QgVFJJQU5HTEVfU1RSSVBfUVVBRF9OT1JNQUwgPSBbIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEsIDAsIDAsIDEgXTtcblxuLyoqXG4gKiBgWyAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxIF1gXG4gKi9cbmV4cG9ydCBjb25zdCBUUklBTkdMRV9TVFJJUF9RVUFEX1VWID0gWyAwLCAwLCAxLCAwLCAwLCAxLCAxLCAxIF07XG4iLCIvKipcbiAqIFNodWZmbGUgZ2l2ZW4gYGFycmF5YCB1c2luZyBnaXZlbiBgZGljZWAgUk5HLiAqKkRlc3RydWN0aXZlKiouXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaHVmZmxlQXJyYXk8VD4oIGFycmF5OiBUW10sIGRpY2U/OiAoKSA9PiBudW1iZXIgKTogVFtdIHtcbiAgY29uc3QgZiA9IGRpY2UgPyBkaWNlIDogKCkgPT4gTWF0aC5yYW5kb20oKTtcbiAgZm9yICggbGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSArKyApIHtcbiAgICBjb25zdCBpciA9IGkgKyBNYXRoLmZsb29yKCBmKCkgKiAoIGFycmF5Lmxlbmd0aCAtIGkgKSApO1xuICAgIGNvbnN0IHRlbXAgPSBhcnJheVsgaXIgXTtcbiAgICBhcnJheVsgaXIgXSA9IGFycmF5WyBpIF07XG4gICAgYXJyYXlbIGkgXSA9IHRlbXA7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEkgbGlrZSB3aXJlZnJhbWVcbiAqXG4gKiBgdHJpSW5kZXhUb0xpbmVJbmRleCggWyAwLCAxLCAyLCA1LCA2LCA3IF0gKWAgLT4gYFsgMCwgMSwgMSwgMiwgMiwgMCwgNSwgNiwgNiwgNywgNywgNSBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJpSW5kZXhUb0xpbmVJbmRleDxUPiggYXJyYXk6IFRbXSApOiBUW10ge1xuICBjb25zdCByZXQ6IFRbXSA9IFtdO1xuICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLyAzOyBpICsrICkge1xuICAgIGNvbnN0IGhlYWQgPSBpICogMztcbiAgICByZXQucHVzaChcbiAgICAgIGFycmF5WyBoZWFkICAgICBdLCBhcnJheVsgaGVhZCArIDEgXSxcbiAgICAgIGFycmF5WyBoZWFkICsgMSBdLCBhcnJheVsgaGVhZCArIDIgXSxcbiAgICAgIGFycmF5WyBoZWFkICsgMiBdLCBhcnJheVsgaGVhZCAgICAgXVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBgbWF0cml4MmQoIDMsIDIgKWAgLT4gYFsgMCwgMCwgMCwgMSwgMCwgMiwgMSwgMCwgMSwgMSwgMSwgMiBdYFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4MmQoIHc6IG51bWJlciwgaDogbnVtYmVyICk6IG51bWJlcltdIHtcbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKCBsZXQgaXkgPSAwOyBpeSA8IGg7IGl5ICsrICkge1xuICAgIGZvciAoIGxldCBpeCA9IDA7IGl4IDwgdzsgaXggKysgKSB7XG4gICAgICBhcnIucHVzaCggaXgsIGl5ICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qKlxuICogU2VlIGFsc286IHtAbGluayBtYXRyaXgyZH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeDNkKCB3OiBudW1iZXIsIGg6IG51bWJlciwgZDogbnVtYmVyICk6IG51bWJlcltdIHtcbiAgY29uc3QgYXJyOiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKCBsZXQgaXogPSAwOyBpeiA8IGQ7IGl6ICsrICkge1xuICAgIGZvciAoIGxldCBpeSA9IDA7IGl5IDwgaDsgaXkgKysgKSB7XG4gICAgICBmb3IgKCBsZXQgaXggPSAwOyBpeCA8IHc7IGl4ICsrICkge1xuICAgICAgICBhcnIucHVzaCggaXgsIGl5LCBpeiApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufVxuIiwiLyoqXG4gKiBDcml0aWNhbGx5IERhbXBlZCBTcHJpbmdcbiAqXG4gKiBTaG91dG91dHMgdG8gS2VpamlybyBUYWthaGFzaGlcbiAqL1xuZXhwb3J0IGNsYXNzIENEUyB7XG4gIHB1YmxpYyBmYWN0b3IgPSAxMDAuMDtcbiAgcHVibGljIHJhdGlvID0gMS4wO1xuICBwdWJsaWMgdmVsb2NpdHkgPSAwLjA7XG4gIHB1YmxpYyB2YWx1ZSA9IDAuMDtcbiAgcHVibGljIHRhcmdldCA9IDAuMDtcblxuICBwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU6IG51bWJlciApOiBudW1iZXIge1xuICAgIHRoaXMudmVsb2NpdHkgKz0gKFxuICAgICAgLXRoaXMuZmFjdG9yICogKCB0aGlzLnZhbHVlIC0gdGhpcy50YXJnZXQgKVxuICAgICAgLSAyLjAgKiB0aGlzLnZlbG9jaXR5ICogTWF0aC5zcXJ0KCB0aGlzLmZhY3RvciApICogdGhpcy5yYXRpb1xuICAgICkgKiBkZWx0YVRpbWU7XG4gICAgdGhpcy52YWx1ZSArPSB0aGlzLnZlbG9jaXR5ICogZGVsdGFUaW1lO1xuICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICB9XG59XG4iLCIvKipcbiAqIENsYXNzIHRoYXQgZGVhbHMgd2l0aCB0aW1lLlxuICogSW4gdGhpcyBiYXNlIGNsYXNzLCB5b3UgbmVlZCB0byBzZXQgdGltZSBtYW51YWxseSBmcm9tIGBBdXRvbWF0b24udXBkYXRlKClgLlxuICogQmVzdCBmb3Igc3luYyB3aXRoIGV4dGVybmFsIGNsb2NrIHN0dWZmLlxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2sge1xuICAvKipcbiAgICogSXRzIGN1cnJlbnQgdGltZS5cbiAgICovXG4gIHByb3RlY3RlZCBfX3RpbWUgPSAwLjA7XG5cbiAgLyoqXG4gICAqIEl0cyBkZWx0YVRpbWUgb2YgbGFzdCB1cGRhdGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX19kZWx0YVRpbWUgPSAwLjA7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgaXRzIGN1cnJlbnRseSBwbGF5aW5nIG9yIG5vdC5cbiAgICovXG4gIHByb3RlY3RlZCBfX2lzUGxheWluZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCB0aW1lLlxuICAgKi9cbiAgcHVibGljIGdldCB0aW1lKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9fdGltZTsgfVxuXG4gIC8qKlxuICAgKiBJdHMgZGVsdGFUaW1lIG9mIGxhc3QgdXBkYXRlLlxuICAgKi9cbiAgcHVibGljIGdldCBkZWx0YVRpbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19kZWx0YVRpbWU7IH1cblxuICAvKipcbiAgICogV2hldGhlciBpdHMgY3VycmVudGx5IHBsYXlpbmcgb3Igbm90LlxuICAgKi9cbiAgcHVibGljIGdldCBpc1BsYXlpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9faXNQbGF5aW5nOyB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY2xvY2suXG4gICAqIEBwYXJhbSB0aW1lIFRpbWUuIFlvdSBuZWVkIHRvIHNldCBtYW51YWxseSB3aGVuIHlvdSBhcmUgdXNpbmcgbWFudWFsIENsb2NrXG4gICAqL1xuICBwdWJsaWMgdXBkYXRlKCB0aW1lPzogbnVtYmVyICk6IHZvaWQge1xuICAgIGNvbnN0IHByZXZUaW1lID0gdGhpcy5fX3RpbWU7XG4gICAgdGhpcy5fX3RpbWUgPSB0aW1lIHx8IDAuMDtcbiAgICB0aGlzLl9fZGVsdGFUaW1lID0gdGhpcy5fX3RpbWUgLSBwcmV2VGltZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgY2xvY2suXG4gICAqL1xuICBwdWJsaWMgcGxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl9faXNQbGF5aW5nID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIHRoZSBjbG9jay5cbiAgICovXG4gIHB1YmxpYyBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9faXNQbGF5aW5nID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aW1lIG1hbnVhbGx5LlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX190aW1lID0gdGltZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ2xvY2sgfSBmcm9tICcuL0Nsb2NrJztcblxuLyoqXG4gKiBDbGFzcyB0aGF0IGRlYWxzIHdpdGggdGltZS5cbiAqIFRoaXMgaXMgXCJmcmFtZVwiIHR5cGUgY2xvY2ssIHRoZSBmcmFtZSBpbmNyZWFzZXMgZXZlcnkge0BsaW5rIENsb2NrRnJhbWUjdXBkYXRlfSBjYWxsLlxuICogQHBhcmFtIGZwcyBGcmFtZXMgcGVyIHNlY29uZFxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2tGcmFtZSBleHRlbmRzIENsb2NrIHtcbiAgLyoqXG4gICAqIEl0cyBjdXJyZW50IGZyYW1lLlxuICAgKi9cbiAgcHJpdmF0ZSBfX2ZyYW1lID0gMDtcblxuICAvKipcbiAgICogSXRzIGZwcy5cbiAgICovXG4gIHByaXZhdGUgX19mcHM6IG51bWJlcjtcblxuICBwdWJsaWMgY29uc3RydWN0b3IoIGZwcyA9IDYwICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fX2ZwcyA9IGZwcztcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHMgY3VycmVudCBmcmFtZS5cbiAgICovXG4gIHB1YmxpYyBnZXQgZnJhbWUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19mcmFtZTsgfVxuXG4gIC8qKlxuICAgKiBJdHMgZnBzLlxuICAgKi9cbiAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX19mcHM7IH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjbG9jay4gSXQgd2lsbCBpbmNyZWFzZSB0aGUgZnJhbWUgYnkgMS5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKCB0aGlzLl9faXNQbGF5aW5nICkge1xuICAgICAgdGhpcy5fX3RpbWUgPSB0aGlzLl9fZnJhbWUgLyB0aGlzLl9fZnBzO1xuICAgICAgdGhpcy5fX2RlbHRhVGltZSA9IDEuMCAvIHRoaXMuX19mcHM7XG4gICAgICB0aGlzLl9fZnJhbWUgKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19kZWx0YVRpbWUgPSAwLjA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdGltZSBtYW51YWxseS5cbiAgICogVGhlIHNldCB0aW1lIHdpbGwgYmUgY29udmVydGVkIGludG8gaW50ZXJuYWwgZnJhbWUgY291bnQsIHNvIHRoZSB0aW1lIHdpbGwgbm90IGJlIGV4YWN0bHkgc2FtZSBhcyBzZXQgb25lLlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX19mcmFtZSA9IE1hdGguZmxvb3IoIHRoaXMuX19mcHMgKiB0aW1lICk7XG4gICAgdGhpcy5fX3RpbWUgPSB0aGlzLl9fZnJhbWUgLyB0aGlzLl9fZnBzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDbG9jayB9IGZyb20gJy4vQ2xvY2snO1xuXG4vKipcbiAqIENsYXNzIHRoYXQgZGVhbHMgd2l0aCB0aW1lLlxuICogVGhpcyBpcyBcInJlYWx0aW1lXCIgdHlwZSBjbG9jaywgdGhlIHRpbWUgZ29lcyBvbiBhcyByZWFsIHdvcmxkLlxuICovXG5leHBvcnQgY2xhc3MgQ2xvY2tSZWFsdGltZSBleHRlbmRzIENsb2NrIHtcbiAgLyoqXG4gICAqIFwiWW91IHNldCB0aGUgdGltZSBtYW51YWxseSB0byBgX19ydFRpbWVgIHdoZW4gaXQncyBgX19ydERhdGVgLlwiXG4gICAqL1xuICBwcml2YXRlIF9fcnRUaW1lID0gMC4wO1xuXG4gIC8qKlxuICAgKiBcIllvdSBzZXQgdGhlIHRpbWUgbWFudWFsbHkgdG8gYF9fcnRUaW1lYCB3aGVuIGl0J3MgYF9fcnREYXRlYC5cIlxuICAgKi9cbiAgcHJpdmF0ZSBfX3J0RGF0ZTogbnVtYmVyID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBjbG9jayBpcyByZWFsdGltZS4geWVhaC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaXNSZWFsdGltZSgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjbG9jay4gVGltZSBpcyBjYWxjdWxhdGVkIGJhc2VkIG9uIHRpbWUgaW4gcmVhbCB3b3JsZC5cbiAgICovXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgICBpZiAoIHRoaXMuX19pc1BsYXlpbmcgKSB7XG4gICAgICBjb25zdCBwcmV2VGltZSA9IHRoaXMuX190aW1lO1xuICAgICAgY29uc3QgZGVsdGFEYXRlID0gKCBub3cgLSB0aGlzLl9fcnREYXRlICk7XG4gICAgICB0aGlzLl9fdGltZSA9IHRoaXMuX19ydFRpbWUgKyBkZWx0YURhdGUgLyAxMDAwLjA7XG4gICAgICB0aGlzLl9fZGVsdGFUaW1lID0gdGhpcy50aW1lIC0gcHJldlRpbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19ydFRpbWUgPSB0aGlzLnRpbWU7XG4gICAgICB0aGlzLl9fcnREYXRlID0gbm93O1xuICAgICAgdGhpcy5fX2RlbHRhVGltZSA9IDAuMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSB0aW1lIG1hbnVhbGx5LlxuICAgKiBAcGFyYW0gdGltZSBUaW1lXG4gICAqL1xuICBwdWJsaWMgc2V0VGltZSggdGltZTogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX190aW1lID0gdGltZTtcbiAgICB0aGlzLl9fcnRUaW1lID0gdGhpcy50aW1lO1xuICAgIHRoaXMuX19ydERhdGUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgfVxufVxuIiwiLy8geW9pbmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvdGlueS1zZGYgKEJTRCAyLUNsYXVzZSlcbi8vIGltcGxlbWVudHMgaHR0cDovL3Blb3BsZS5jcy51Y2hpY2Fnby5lZHUvfnBmZi9wYXBlcnMvZHQucGRmXG5cbi8qKlxuICogQ29tcHV0ZSBhIG9uZSBkaW1lbnNpb25hbCBlZHQgZnJvbSB0aGUgc291cmNlIGRhdGEuXG4gKiBSZXR1cm5pbmcgZGlzdGFuY2Ugd2lsbCBiZSBzcXVhcmVkLlxuICogSW50ZW5kZWQgdG8gYmUgdXNlZCBpbnRlcm5hbGx5IGluIHtAbGluayBlZHQyZH0uXG4gKlxuICogQHBhcmFtIGRhdGEgRGF0YSBvZiB0aGUgc291cmNlXG4gKiBAcGFyYW0gb2Zmc2V0IE9mZnNldCBvZiB0aGUgc291cmNlIGZyb20gYmVnaW5uaW5nXG4gKiBAcGFyYW0gc3RyaWRlIFN0cmlkZSBvZiB0aGUgc291cmNlXG4gKiBAcGFyYW0gbGVuZ3RoIExlbmd0aCBvZiB0aGUgc291cmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZHQxZChcbiAgZGF0YTogRmxvYXQzMkFycmF5LFxuICBvZmZzZXQ6IG51bWJlcixcbiAgc3RyaWRlOiBudW1iZXIsXG4gIGxlbmd0aDogbnVtYmVyXG4pOiB2b2lkIHtcbiAgLy8gaW5kZXggb2YgcmlnaHRtb3N0IHBhcmFib2xhIGluIGxvd2VyIGVudmVsb3BlXG4gIGxldCBrID0gMDtcblxuICAvLyBsb2NhdGlvbnMgb2YgcGFyYWJvbGFzIGluIGxvd2VyIGVudmVsb3BlXG4gIGNvbnN0IHYgPSBuZXcgRmxvYXQzMkFycmF5KCBsZW5ndGggKTtcbiAgdlsgMCBdID0gMC4wO1xuXG4gIC8vIGxvY2F0aW9ucyBvZiBib3VuZGFyaWVzIGJldHdlZW4gcGFyYWJvbGFzXG4gIGNvbnN0IHogPSBuZXcgRmxvYXQzMkFycmF5KCBsZW5ndGggKyAxICk7XG4gIHpbIDAgXSA9IC1JbmZpbml0eTtcbiAgelsgMSBdID0gSW5maW5pdHk7XG5cbiAgLy8gY3JlYXRlIGEgc3RyYWlnaHQgYXJyYXkgb2YgaW5wdXQgZGF0YVxuICBjb25zdCBmID0gbmV3IEZsb2F0MzJBcnJheSggbGVuZ3RoICk7XG4gIGZvciAoIGxldCBxID0gMDsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICBmWyBxIF0gPSBkYXRhWyBvZmZzZXQgKyBxICogc3RyaWRlIF07XG4gIH1cblxuICAvLyBjb21wdXRlIGxvd2VyIGVudmVsb3BlXG4gIGZvciAoIGxldCBxID0gMTsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICBsZXQgcyA9IDAuMDtcblxuICAgIHdoaWxlICggMCA8PSBrICkge1xuICAgICAgcyA9ICggZlsgcSBdICsgcSAqIHEgLSBmWyB2WyBrIF0gXSAtIHZbIGsgXSAqIHZbIGsgXSApIC8gKCAyLjAgKiBxIC0gMi4wICogdlsgayBdICk7XG4gICAgICBpZiAoIHMgPD0gelsgayBdICkge1xuICAgICAgICBrIC0tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgayArKztcbiAgICB2WyBrIF0gPSBxO1xuICAgIHpbIGsgXSA9IHM7XG4gICAgelsgayArIDEgXSA9IEluZmluaXR5O1xuICB9XG5cbiAgayA9IDA7XG5cbiAgLy8gZmlsbCBpbiB2YWx1ZXMgb2YgZGlzdGFuY2UgdHJhbnNmb3JtXG4gIGZvciAoIGxldCBxID0gMDsgcSA8IGxlbmd0aDsgcSArKyApIHtcbiAgICB3aGlsZSAoIHpbIGsgKyAxIF0gPCBxICkgeyBrICsrOyB9XG4gICAgY29uc3QgcVN1YlZLID0gcSAtIHZbIGsgXTtcbiAgICBkYXRhWyBvZmZzZXQgKyBxICogc3RyaWRlIF0gPSBmWyB2WyBrIF0gXSArIHFTdWJWSyAqIHFTdWJWSztcbiAgfVxufVxuXG4vKipcbiAqIENvbXB1dGUgYSB0d28gZGltZW5zaW9uYWwgZWR0IGZyb20gdGhlIHNvdXJjZSBkYXRhLlxuICogUmV0dXJuaW5nIGRpc3RhbmNlIHdpbGwgYmUgc3F1YXJlZC5cbiAqXG4gKiBAcGFyYW0gZGF0YSBEYXRhIG9mIHRoZSBzb3VyY2UuXG4gKiBAcGFyYW0gd2lkdGggV2lkdGggb2YgdGhlIHNvdXJjZS5cbiAqIEBwYXJhbSBoZWlnaHQgSGVpZ2h0IG9mIHRoZSBzb3VyY2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlZHQyZChcbiAgZGF0YTogRmxvYXQzMkFycmF5LFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlclxuKTogdm9pZCB7XG4gIGZvciAoIGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICsrICkge1xuICAgIGVkdDFkKCBkYXRhLCB4LCB3aWR0aCwgaGVpZ2h0ICk7XG4gIH1cblxuICBmb3IgKCBsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKysgKSB7XG4gICAgZWR0MWQoIGRhdGEsIHkgKiB3aWR0aCwgMSwgd2lkdGggKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBgbGVycGAsIG9yIGBtaXhgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsZXJwKCBhOiBudW1iZXIsIGI6IG51bWJlciwgeDogbnVtYmVyICk6IG51bWJlciB7XG4gIHJldHVybiBhICsgKCBiIC0gYSApICogeDtcbn1cblxuLyoqXG4gKiBgY2xhbXBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcCggeDogbnVtYmVyLCBsOiBudW1iZXIsIGg6IG51bWJlciApOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5taW4oIE1hdGgubWF4KCB4LCBsICksIGggKTtcbn1cblxuLyoqXG4gKiBgY2xhbXAoIHgsIDAuMCwgMS4wIClgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYXR1cmF0ZSggeDogbnVtYmVyICk6IG51bWJlciB7XG4gIHJldHVybiBjbGFtcCggeCwgMC4wLCAxLjAgKTtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSB2YWx1ZSBmcm9tIGlucHV0IHJhbmdlIHRvIG91dHB1dCByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKCB4OiBudW1iZXIsIHgwOiBudW1iZXIsIHgxOiBudW1iZXIsIHkwOiBudW1iZXIsIHkxOiBudW1iZXIgKTogbnVtYmVyIHtcbiAgcmV0dXJuICggKCB4IC0geDAgKSAqICggeTEgLSB5MCApIC8gKCB4MSAtIHgwICkgKyB5MCApO1xufVxuXG4vKipcbiAqIGBzbW9vdGhzdGVwYCBidXQgbm90IHNtb290aFxuICovXG5leHBvcnQgZnVuY3Rpb24gbGluZWFyc3RlcCggYTogbnVtYmVyLCBiOiBudW1iZXIsIHg6IG51bWJlciApOiBudW1iZXIge1xuICByZXR1cm4gc2F0dXJhdGUoICggeCAtIGEgKSAvICggYiAtIGEgKSApO1xufVxuXG4vKipcbiAqIHdvcmxkIGZhbW91cyBgc21vb3Roc3RlcGAgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIGE6IG51bWJlciwgYjogbnVtYmVyLCB4OiBudW1iZXIgKTogbnVtYmVyIHtcbiAgY29uc3QgdCA9IGxpbmVhcnN0ZXAoIGEsIGIsIHggKTtcbiAgcmV0dXJuIHQgKiB0ICogKCAzLjAgLSAyLjAgKiB0ICk7XG59XG5cbi8qKlxuICogYHNtb290aHN0ZXBgIGJ1dCBtb3JlIHNtb290aFxuICovXG5leHBvcnQgZnVuY3Rpb24gc21vb3RoZXJzdGVwKCBhOiBudW1iZXIsIGI6IG51bWJlciwgeDogbnVtYmVyICk6IG51bWJlciB7XG4gIGNvbnN0IHQgPSBsaW5lYXJzdGVwKCBhLCBiLCB4ICk7XG4gIHJldHVybiB0ICogdCAqIHQgKiAoIHQgKiAoIHQgKiA2LjAgLSAxNS4wICkgKyAxMC4wICk7XG59XG5cbi8qKlxuICogYHNtb290aHN0ZXBgIGJ1dCBXQVkgbW9yZSBzbW9vdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNtb290aGVzdHN0ZXAoIGE6IG51bWJlciwgYjogbnVtYmVyLCB4OiBudW1iZXIgKTogbnVtYmVyIHtcbiAgY29uc3QgdCA9IGxpbmVhcnN0ZXAoIGEsIGIsIHggKTtcbiAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiAoIHQgKiAoIHQgKiAoIC0yMC4wICogdCArIDcwLjAgKSAtIDg0LjAgKSArIDM1LjAgKTtcbn1cbiIsImltcG9ydCB7IGxlcnAgfSBmcm9tICcuLi9tYXRoL3V0aWxzJztcblxuLyoqXG4gKiBEbyBleHAgc21vb3RoaW5nXG4gKi9cbmV4cG9ydCBjbGFzcyBFeHBTbW9vdGgge1xuICBwdWJsaWMgZmFjdG9yID0gMTAuMDtcbiAgcHVibGljIHRhcmdldCA9IDAuMDtcbiAgcHVibGljIHZhbHVlID0gMC4wO1xuXG4gIHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZTogbnVtYmVyICk6IG51bWJlciB7XG4gICAgdGhpcy52YWx1ZSA9IGxlcnAoIHRoaXMudGFyZ2V0LCB0aGlzLnZhbHVlLCBNYXRoLmV4cCggLXRoaXMuZmFjdG9yICogZGVsdGFUaW1lICkgKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFBvb2w8VD4ge1xuICBwdWJsaWMgYXJyYXk6IFRbXTtcblxuICBwdWJsaWMgaW5kZXggPSAwO1xuXG4gIHB1YmxpYyBnZXQgY3VycmVudCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5hcnJheVsgdGhpcy5pbmRleCBdO1xuICB9XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBhcnJheTogVFtdICkge1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IFQge1xuICAgIHRoaXMuaW5kZXggPSAoIHRoaXMuaW5kZXggKyAxICkgJSB0aGlzLmFycmF5Lmxlbmd0aDtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQb29sIH0gZnJvbSAnLi4vUG9vbC9Qb29sJztcblxuZXhwb3J0IGNsYXNzIEdQVVRpbWVyIHtcbiAgcHVibGljIHF1ZXJpZXM6IFBvb2w8V2ViR0xRdWVyeT47XG4gIHB1YmxpYyBzdGFjazogUHJvbWlzZTxudW1iZXI+W107XG4gIHB1YmxpYyBleHQ6IGFueTtcbiAgcHVibGljIHJlYWRvbmx5IGdsOiBXZWJHTDJSZW5kZXJpbmdDb250ZXh0O1xuXG4gIHByaXZhdGUgX19sb29wVGFza3M6IFNldDwoKSA9PiB2b2lkPjtcblxuICBwdWJsaWMgc3RhdGljIGlzU3VwcG9ydGVkKCBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0IHwgV2ViR0wyUmVuZGVyaW5nQ29udGV4dCApOiBib29sZWFuIHtcbiAgICByZXR1cm4gbmV3IFNldCggZ2wuZ2V0U3VwcG9ydGVkRXh0ZW5zaW9ucygpICkuaGFzKCAnRVhUX2Rpc2pvaW50X3RpbWVyX3F1ZXJ5X3dlYmdsMicgKTtcbiAgfVxuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggZ2w6IFdlYkdMMlJlbmRlcmluZ0NvbnRleHQgKSB7XG4gICAgdGhpcy5nbCA9IGdsO1xuXG4gICAgY29uc3QgcXVlcmllcyA9IG5ldyBBcnJheSggMTAyNCApLmZpbGwoIDEgKS5tYXAoICgpID0+IGdsLmNyZWF0ZVF1ZXJ5KCkhICk7XG4gICAgdGhpcy5xdWVyaWVzID0gbmV3IFBvb2woIHF1ZXJpZXMgKTtcblxuICAgIHRoaXMuc3RhY2sgPSBbXTtcblxuICAgIHRoaXMuZXh0ID0gZ2wuZ2V0RXh0ZW5zaW9uKCAnRVhUX2Rpc2pvaW50X3RpbWVyX3F1ZXJ5X3dlYmdsMicgKTtcblxuICAgIHRoaXMuX19sb29wVGFza3MgPSBuZXcgU2V0KCk7XG5cbiAgICAvLyBsb29wXG4gICAgY29uc3QgdXBkYXRlID0gKCk6IHZvaWQgPT4ge1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggdXBkYXRlICk7XG4gICAgfTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgQXJyYXkuZnJvbSggdGhpcy5fX2xvb3BUYXNrcyApLmZvckVhY2goICggdGFzayApID0+IHRhc2soKSApO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIG1lYXN1cmUoIGZ1bmM6ICgpID0+IHZvaWQgKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCB7IGdsIH0gPSB0aGlzO1xuXG4gICAgaWYgKCB0aGlzLnN0YWNrLmxlbmd0aCAhPT0gMCApIHtcbiAgICAgIGdsLmVuZFF1ZXJ5KCB0aGlzLmV4dC5USU1FX0VMQVBTRURfRVhUICk7XG4gICAgICBjb25zdCBwcm9taXNlRmluaXNoaW5nUHJldiA9IHRoaXMuY2hlY2soIHRoaXMucXVlcmllcy5jdXJyZW50ICk7XG5cbiAgICAgIHRoaXMuc3RhY2sgPSB0aGlzLnN0YWNrLm1hcCggYXN5bmMgKCBwcm9taXNlQWNjdW0gKSA9PiB7XG4gICAgICAgIHJldHVybiAoIGF3YWl0IHByb21pc2VBY2N1bSApICsgKCBhd2FpdCBwcm9taXNlRmluaXNoaW5nUHJldiApO1xuICAgICAgfSApO1xuICAgIH1cblxuICAgIHRoaXMuc3RhY2sucHVzaCggUHJvbWlzZS5yZXNvbHZlKCAwLjAgKSApO1xuXG4gICAgZ2wuYmVnaW5RdWVyeSggdGhpcy5leHQuVElNRV9FTEFQU0VEX0VYVCwgdGhpcy5xdWVyaWVzLm5leHQoKSApO1xuXG4gICAgZnVuYygpO1xuXG4gICAgZ2wuZW5kUXVlcnkoIHRoaXMuZXh0LlRJTUVfRUxBUFNFRF9FWFQgKTtcblxuICAgIGNvbnN0IHByb21pc2VBY2N1bSA9IHRoaXMuc3RhY2sucG9wKCkhO1xuICAgIGNvbnN0IHByb21pc2VUaGlzID0gdGhpcy5jaGVjayggdGhpcy5xdWVyaWVzLmN1cnJlbnQgKTtcblxuICAgIGlmICggdGhpcy5zdGFjay5sZW5ndGggIT09IDAgKSB7XG4gICAgICB0aGlzLnN0YWNrID0gdGhpcy5zdGFjay5tYXAoIGFzeW5jICggcHJvbWlzZUFjY3VtICkgPT4ge1xuICAgICAgICByZXR1cm4gKCBhd2FpdCBwcm9taXNlQWNjdW0gKSArICggYXdhaXQgcHJvbWlzZVRoaXMgKTtcbiAgICAgIH0gKTtcblxuICAgICAgZ2wuYmVnaW5RdWVyeSggdGhpcy5leHQuVElNRV9FTEFQU0VEX0VYVCwgdGhpcy5xdWVyaWVzLm5leHQoKSApO1xuICAgIH1cblxuICAgIHJldHVybiAoIGF3YWl0IHByb21pc2VBY2N1bSApICsgKCBhd2FpdCBwcm9taXNlVGhpcyApO1xuICB9XG5cbiAgcHVibGljIGNoZWNrKCBxdWVyeTogV2ViR0xRdWVyeSApOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGNvbnN0IHsgZ2wgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSApID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGlzQXZhaWxhYmxlID0gZ2wuZ2V0UXVlcnlQYXJhbWV0ZXIoIHF1ZXJ5LCBnbC5RVUVSWV9SRVNVTFRfQVZBSUxBQkxFICk7XG5cbiAgICAgICAgaWYgKCBpc0F2YWlsYWJsZSApIHtcbiAgICAgICAgICB0aGlzLl9fbG9vcFRhc2tzLmRlbGV0ZSggdGFzayApO1xuICAgICAgICAgIHJlc29sdmUoIGdsLmdldFF1ZXJ5UGFyYW1ldGVyKCBxdWVyeSwgZ2wuUVVFUllfUkVTVUxUICkgKiAwLjAwMSAqIDAuMDAxICk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX19sb29wVGFza3MuYWRkKCB0YXNrICk7XG4gICAgfSApO1xuICB9XG59XG4iLCIvKipcbiAqIFVzZWZ1bCBmb3IgdGFwIHRlbXBvXG4gKiBTZWUgYWxzbzoge0BsaW5rIEhpc3RvcnlNZWFuQ2FsY3VsYXRvcn1cbiAqL1xuZXhwb3J0IGNsYXNzIEhpc3RvcnlNZWFuQ2FsY3VsYXRvciB7XG4gIHByaXZhdGUgX19yZWNhbGNGb3JFYWNoID0gMDtcbiAgcHJpdmF0ZSBfX2NvdW50VW50aWxSZWNhbGMgPSAwO1xuICBwcml2YXRlIF9faGlzdG9yeTogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfX2luZGV4ID0gMDtcbiAgcHJpdmF0ZSBfX2xlbmd0aDogbnVtYmVyO1xuICBwcml2YXRlIF9fY291bnQgPSAwO1xuICBwcml2YXRlIF9fY2FjaGUgPSAwO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbGVuZ3RoOiBudW1iZXIgKSB7XG4gICAgdGhpcy5fX2xlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLl9fcmVjYWxjRm9yRWFjaCA9IGxlbmd0aDtcbiAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKysgKSB7XG4gICAgICB0aGlzLl9faGlzdG9yeVsgaSBdID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IG1lYW4oKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudCA9IE1hdGgubWluKCB0aGlzLl9fY291bnQsIHRoaXMuX19sZW5ndGggKTtcbiAgICByZXR1cm4gY291bnQgPT09IDAgPyAwLjAgOiB0aGlzLl9fY2FjaGUgLyBjb3VudDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcmVjYWxjRm9yRWFjaCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fcmVjYWxjRm9yRWFjaDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgcmVjYWxjRm9yRWFjaCggdmFsdWU6IG51bWJlciApIHtcbiAgICBjb25zdCBkZWx0YSA9IHZhbHVlIC0gdGhpcy5fX3JlY2FsY0ZvckVhY2g7XG4gICAgdGhpcy5fX3JlY2FsY0ZvckVhY2ggPSB2YWx1ZTtcbiAgICB0aGlzLl9fY291bnRVbnRpbFJlY2FsYyA9IE1hdGgubWF4KCAwLCB0aGlzLl9fY291bnRVbnRpbFJlY2FsYyArIGRlbHRhICk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fX2luZGV4ID0gMDtcbiAgICB0aGlzLl9fY291bnQgPSAwO1xuICAgIHRoaXMuX19jYWNoZSA9IDA7XG4gICAgdGhpcy5fX2NvdW50VW50aWxSZWNhbGMgPSAwO1xuICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuX19sZW5ndGg7IGkgKysgKSB7XG4gICAgICB0aGlzLl9faGlzdG9yeVsgaSBdID0gMDtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcHVzaCggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5fX2hpc3RvcnlbIHRoaXMuX19pbmRleCBdO1xuICAgIHRoaXMuX19oaXN0b3J5WyB0aGlzLl9faW5kZXggXSA9IHZhbHVlO1xuICAgIHRoaXMuX19jb3VudCArKztcbiAgICB0aGlzLl9faW5kZXggPSAoIHRoaXMuX19pbmRleCArIDEgKSAlIHRoaXMuX19sZW5ndGg7XG5cbiAgICBpZiAoIHRoaXMuX19jb3VudFVudGlsUmVjYWxjID09PSAwICkge1xuICAgICAgdGhpcy5yZWNhbGMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fX2NvdW50VW50aWxSZWNhbGMgLS07XG4gICAgICB0aGlzLl9fY2FjaGUgLT0gcHJldjtcbiAgICAgIHRoaXMuX19jYWNoZSArPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVjYWxjKCk6IHZvaWQge1xuICAgIHRoaXMuX19jb3VudFVudGlsUmVjYWxjID0gdGhpcy5fX3JlY2FsY0ZvckVhY2g7XG4gICAgY29uc3Qgc3VtID0gdGhpcy5fX2hpc3RvcnlcbiAgICAgIC5zbGljZSggMCwgTWF0aC5taW4oIHRoaXMuX19jb3VudCwgdGhpcy5fX2xlbmd0aCApIClcbiAgICAgIC5yZWR1Y2UoICggc3VtLCB2ICkgPT4gc3VtICsgdiwgMCApO1xuICAgIHRoaXMuX19jYWNoZSA9IHN1bTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgYmluYXJ5U2VhcmNoIH0gZnJvbSAnLi4vYWxnb3JpdGhtL2JpbmFyeVNlYXJjaCc7XG5cbi8qKlxuICogVXNlZnVsIGZvciBmcHMgY2FsY1xuICogU2VlIGFsc286IHtAbGluayBIaXN0b3J5TWVhbkNhbGN1bGF0b3J9XG4gKi9cbmV4cG9ydCBjbGFzcyBIaXN0b3J5UGVyY2VudGlsZUNhbGN1bGF0b3Ige1xuICBwcml2YXRlIF9faGlzdG9yeTogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfX3NvcnRlZDogbnVtYmVyW10gPSBbXTtcbiAgcHJpdmF0ZSBfX2luZGV4ID0gMDtcbiAgcHJpdmF0ZSByZWFkb25seSBfX2xlbmd0aDogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggbGVuZ3RoOiBudW1iZXIgKSB7XG4gICAgdGhpcy5fX2xlbmd0aCA9IGxlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgbWVkaWFuKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGVyY2VudGlsZSggNTAuMCApO1xuICB9XG5cbiAgcHVibGljIHBlcmNlbnRpbGUoIHBlcmNlbnRpbGU6IG51bWJlciApOiBudW1iZXIge1xuICAgIGlmICggdGhpcy5fX2hpc3RvcnkubGVuZ3RoID09PSAwICkgeyByZXR1cm4gMC4wOyB9XG4gICAgcmV0dXJuIHRoaXMuX19zb3J0ZWRbIE1hdGgucm91bmQoIHBlcmNlbnRpbGUgKiAwLjAxICogKCB0aGlzLl9faGlzdG9yeS5sZW5ndGggLSAxICkgKSBdO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX19pbmRleCA9IDA7XG4gICAgdGhpcy5fX2hpc3RvcnkgPSBbXTtcbiAgICB0aGlzLl9fc29ydGVkID0gW107XG4gIH1cblxuICBwdWJsaWMgcHVzaCggdmFsdWU6IG51bWJlciApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5fX2hpc3RvcnlbIHRoaXMuX19pbmRleCBdO1xuICAgIHRoaXMuX19oaXN0b3J5WyB0aGlzLl9faW5kZXggXSA9IHZhbHVlO1xuICAgIHRoaXMuX19pbmRleCA9ICggdGhpcy5fX2luZGV4ICsgMSApICUgdGhpcy5fX2xlbmd0aDtcblxuICAgIC8vIHJlbW92ZSB0aGUgcHJldiBmcm9tIHNvcnRlZCBhcnJheVxuICAgIGlmICggdGhpcy5fX3NvcnRlZC5sZW5ndGggPT09IHRoaXMuX19sZW5ndGggKSB7XG4gICAgICBjb25zdCBwcmV2SW5kZXggPSBiaW5hcnlTZWFyY2goIHRoaXMuX19zb3J0ZWQsIHByZXYgKTtcbiAgICAgIHRoaXMuX19zb3J0ZWQuc3BsaWNlKCBwcmV2SW5kZXgsIDEgKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbmRleCA9IGJpbmFyeVNlYXJjaCggdGhpcy5fX3NvcnRlZCwgdmFsdWUgKTtcbiAgICB0aGlzLl9fc29ydGVkLnNwbGljZSggaW5kZXgsIDAsIHZhbHVlICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEhpc3RvcnlQZXJjZW50aWxlQ2FsY3VsYXRvciB9IGZyb20gJy4vSGlzdG9yeVBlcmNlbnRpbGVDYWxjdWxhdG9yJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBJdCdzIGFjdHVhbGx5IGp1c3QgYSBzcGVjaWFsIGNhc2Ugb2Yge0BsaW5rIEhpc3RvcnlQZXJjZW50aWxlQ2FsY3VsYXRvcn1cbiAqL1xuZXhwb3J0IGNsYXNzIEhpc3RvcnlNZWRpYW5DYWxjdWxhdG9yIGV4dGVuZHMgSGlzdG9yeVBlcmNlbnRpbGVDYWxjdWxhdG9yIHtcbiAgcHVibGljIGNvbnN0cnVjdG9yKCBsZW5ndGg6IG51bWJlciApIHtcbiAgICBzdXBlciggbGVuZ3RoICk7XG4gICAgY29uc29sZS53YXJuKCAnSGlzdG9yeU1lZGlhbkNhbGN1bGF0b3I6IERlcHJlY2F0ZWQuIFVzZSBIaXN0b3J5UGVyY2VudGlsZUNhbGN1bGF0b3IgaW5zdGVhZCcgKTtcbiAgfVxufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLic7XG5pbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuLi9xdWF0L1Jhd1F1YXRlcm5pb24nO1xuXG4vKipcbiAqIENvbnZlcnQgYSBxdWF0ZXJuaW9uIGludG8gYSBtYXRyaXg0LlxuICpcbiAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAqXG4gKiBTZWU6IGh0dHBzOi8vdGhyZWVqcy5vcmcvZG9jcy8jYXBpL2VuL21hdGgvTWF0cml4NC5tYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEZyb21RdWF0ZXJuaW9uKCBxdWF0OiBSYXdRdWF0ZXJuaW9uICk6IFJhd01hdHJpeDQge1xuICBjb25zdCB4ID0gcXVhdFsgMCBdO1xuICBjb25zdCB5ID0gcXVhdFsgMSBdO1xuICBjb25zdCB6ID0gcXVhdFsgMiBdO1xuICBjb25zdCB3ID0gcXVhdFsgMyBdO1xuXG4gIHJldHVybiBbXG4gICAgMS4wIC0gMi4wICogeSAqIHkgLSAyLjAgKiB6ICogeiwgMi4wICogeCAqIHkgKyAyLjAgKiB6ICogdywgMi4wICogeCAqIHogLSAyLjAgKiB5ICogdywgMC4wLFxuICAgIDIuMCAqIHggKiB5IC0gMi4wICogeiAqIHcsIDEuMCAtIDIuMCAqIHggKiB4IC0gMi4wICogeiAqIHosIDIuMCAqIHkgKiB6ICsgMi4wICogeCAqIHcsIDAuMCxcbiAgICAyLjAgKiB4ICogeiArIDIuMCAqIHkgKiB3LCAyLjAgKiB5ICogeiAtIDIuMCAqIHggKiB3LCAxLjAgLSAyLjAgKiB4ICogeCAtIDIuMCAqIHkgKiB5LCAwLjAsXG4gICAgMC4wLCAwLjAsIDAuMCwgMS4wLFxuICBdO1xufVxuIiwiaW1wb3J0IHsgbWF0NEZyb21RdWF0ZXJuaW9uIH0gZnJvbSAnLi9tYXQ0RnJvbVF1YXRlcm5pb24nO1xuaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4uL3F1YXQvUmF3UXVhdGVybmlvbic7XG5pbXBvcnQgdHlwZSB7IFJhd1ZlY3RvcjMgfSBmcm9tICcuLi92ZWMzL1Jhd1ZlY3RvcjMnO1xuXG4vKipcbiAqIENvbXBvc2UgYSBtYXRyaXggb3V0IG9mIHBvc2l0aW9uLCBzY2FsZSwgYW5kIHJvdGF0aW9uLlxuICogWW9pbmtlZCBmcm9tIFRocmVlLmpzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NENvbXBvc2UoXG4gIHBvc2l0aW9uOiBSYXdWZWN0b3IzLFxuICByb3RhdGlvbjogUmF3UXVhdGVybmlvbixcbiAgc2NhbGU6IFJhd1ZlY3RvcjMsXG4pOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgbWF0Um90ID0gbWF0NEZyb21RdWF0ZXJuaW9uKCByb3RhdGlvbiApO1xuXG4gIGNvbnN0IHN4ID0gc2NhbGVbIDAgXSwgc3kgPSBzY2FsZVsgMSBdLCBzeiA9IHNjYWxlWyAyIF07XG5cbiAgcmV0dXJuIFtcbiAgICBtYXRSb3RbIDAgXSAqIHN4LFxuICAgIG1hdFJvdFsgMSBdICogc3gsXG4gICAgbWF0Um90WyAyIF0gKiBzeCxcbiAgICAwLjAsXG5cbiAgICBtYXRSb3RbIDQgXSAqIHN5LFxuICAgIG1hdFJvdFsgNSBdICogc3ksXG4gICAgbWF0Um90WyA2IF0gKiBzeSxcbiAgICAwLjAsXG5cbiAgICBtYXRSb3RbIDggXSAqIHN6LFxuICAgIG1hdFJvdFsgOSBdICogc3osXG4gICAgbWF0Um90WyAxMCBdICogc3osXG4gICAgMC4wLFxuXG4gICAgcG9zaXRpb25bIDAgXSxcbiAgICBwb3NpdGlvblsgMSBdLFxuICAgIHBvc2l0aW9uWyAyIF0sXG4gICAgMS4wXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIFJldHVybiBhIGRldGVybWluYW50IG9mIGdpdmVuIG1hdDQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0RGV0ZXJtaW5hbnQoIG06IFJhd01hdHJpeDQgKTogbnVtYmVyIHtcbiAgY29uc3RcbiAgICBhMDAgPSBtWyAgMCBdLCBhMDEgPSBtWyAgMSBdLCBhMDIgPSBtWyAgMiBdLCBhMDMgPSBtWyAgMyBdLFxuICAgIGExMCA9IG1bICA0IF0sIGExMSA9IG1bICA1IF0sIGExMiA9IG1bICA2IF0sIGExMyA9IG1bICA3IF0sXG4gICAgYTIwID0gbVsgIDggXSwgYTIxID0gbVsgIDkgXSwgYTIyID0gbVsgMTAgXSwgYTIzID0gbVsgMTEgXSxcbiAgICBhMzAgPSBtWyAxMiBdLCBhMzEgPSBtWyAxMyBdLCBhMzIgPSBtWyAxNCBdLCBhMzMgPSBtWyAxNSBdLFxuICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCwgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExLCAgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyLFxuICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCwgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxLCAgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyO1xuXG4gIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuLi9tYXQ0L1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi9SYXdRdWF0ZXJuaW9uJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIFF1YXRlcm5pb24gb3V0IG9mIGEgcm90YXRpb24gbWF0cml4LlxuICogWW9pbmtlZCBmcm9tIFRocmVlLmpzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEZyb21NYXRyaXg0KCBtOiBSYXdNYXRyaXg0ICk6IFJhd1F1YXRlcm5pb24ge1xuICBjb25zdCBtMTEgPSBtWyAwIF0sIG0xMiA9IG1bIDQgXSwgbTEzID0gbVsgOCBdLFxuICAgIG0yMSA9IG1bIDEgXSwgbTIyID0gbVsgNSBdLCBtMjMgPSBtWyA5IF0sXG4gICAgbTMxID0gbVsgMiBdLCBtMzIgPSBtWyA2IF0sIG0zMyA9IG1bIDEwIF0sXG4gICAgdHJhY2UgPSBtMTEgKyBtMjIgKyBtMzM7XG5cbiAgaWYgKCB0cmFjZSA+IDAgKSB7XG4gICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCggdHJhY2UgKyAxLjAgKTtcbiAgICByZXR1cm4gW1xuICAgICAgKCBtMzIgLSBtMjMgKSAqIHMsXG4gICAgICAoIG0xMyAtIG0zMSApICogcyxcbiAgICAgICggbTIxIC0gbTEyICkgKiBzLFxuICAgICAgMC4yNSAvIHNcbiAgICBdO1xuICB9IGVsc2UgaWYgKCBtMTEgPiBtMjIgJiYgbTExID4gbTMzICkge1xuICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0xMSAtIG0yMiAtIG0zMyApO1xuICAgIHJldHVybiBbXG4gICAgICAwLjI1ICogcyxcbiAgICAgICggbTEyICsgbTIxICkgLyBzLFxuICAgICAgKCBtMTMgKyBtMzEgKSAvIHMsXG4gICAgICAoIG0zMiAtIG0yMyApIC8gc1xuICAgIF07XG4gIH0gZWxzZSBpZiAoIG0yMiA+IG0zMyApIHtcbiAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMjIgLSBtMTEgLSBtMzMgKTtcbiAgICByZXR1cm4gW1xuICAgICAgKCBtMTIgKyBtMjEgKSAvIHMsXG4gICAgICAwLjI1ICogcyxcbiAgICAgICggbTIzICsgbTMyICkgLyBzLFxuICAgICAgKCBtMTMgLSBtMzEgKSAvIHNcbiAgICBdO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0zMyAtIG0xMSAtIG0yMiApO1xuICAgIHJldHVybiBbXG4gICAgICAoIG0xMyArIG0zMSApIC8gcyxcbiAgICAgICggbTIzICsgbTMyICkgLyBzLFxuICAgICAgMC4yNSAqIHMsXG4gICAgICAoIG0yMSAtIG0xMiApIC8gc1xuICAgIF07XG4gIH1cbn1cbiIsIi8qKlxuICogUmV0dXJuIGFuIGV1Y2xpZGVhbiBsZW5ndGggb2YgZ2l2ZW4gdmVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjTGVuZ3RoKCB2ZWM6IG51bWJlcltdICk6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLnNxcnQoIHZlYy5yZWR1Y2UoICggc3VtLCB2ICkgPT4gc3VtICsgdiAqIHYsIDAuMCApICk7XG59XG4iLCJpbXBvcnQgeyBtYXQ0RGV0ZXJtaW5hbnQgfSBmcm9tICcuL21hdDREZXRlcm1pbmFudCc7XG5pbXBvcnQgeyBxdWF0RnJvbU1hdHJpeDQgfSBmcm9tICcuLi9xdWF0L3F1YXRGcm9tTWF0cml4NCc7XG5pbXBvcnQgeyB2ZWNMZW5ndGggfSBmcm9tICcuLi92ZWMvdmVjTGVuZ3RoJztcbmltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5pbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuLi9xdWF0L1Jhd1F1YXRlcm5pb24nO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBEZWNvbXBvc2UgYSBtYXRyaXggaW50byBhIHBvc2l0aW9uLCBhIHNjYWxlLCBhbmQgYSByb3RhdGlvbi5cbiAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDREZWNvbXBvc2UoIG06IFJhd01hdHJpeDQgKToge1xuICBwb3NpdGlvbjogUmF3VmVjdG9yMztcbiAgc2NhbGU6IFJhd1ZlY3RvcjM7XG4gIHJvdGF0aW9uOiBSYXdRdWF0ZXJuaW9uO1xufSB7XG4gIGxldCBzeCA9IHZlY0xlbmd0aCggWyBtWyAwIF0sIG1bIDEgXSwgbVsgMiBdIF0gKTtcbiAgY29uc3Qgc3kgPSB2ZWNMZW5ndGgoIFsgbVsgNCBdLCBtWyA1IF0sIG1bIDYgXSBdICk7XG4gIGNvbnN0IHN6ID0gdmVjTGVuZ3RoKCBbIG1bIDggXSwgbVsgOSBdLCBtWyAxMCBdIF0gKTtcblxuICAvLyBpZiBkZXRlcm1pbmFudCBpcyBuZWdhdGl2ZSwgd2UgbmVlZCB0byBpbnZlcnQgb25lIHNjYWxlXG4gIGNvbnN0IGRldCA9IG1hdDREZXRlcm1pbmFudCggbSApO1xuICBpZiAoIGRldCA8IDAgKSB7IHN4ID0gLXN4OyB9XG5cbiAgY29uc3QgaW52U3ggPSAxLjAgLyBzeDtcbiAgY29uc3QgaW52U3kgPSAxLjAgLyBzeTtcbiAgY29uc3QgaW52U3ogPSAxLjAgLyBzejtcblxuICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IG0uY29uY2F0KCkgYXMgUmF3TWF0cml4NDtcblxuICByb3RhdGlvbk1hdHJpeFsgMCBdICo9IGludlN4O1xuICByb3RhdGlvbk1hdHJpeFsgMSBdICo9IGludlN4O1xuICByb3RhdGlvbk1hdHJpeFsgMiBdICo9IGludlN4O1xuXG4gIHJvdGF0aW9uTWF0cml4WyA0IF0gKj0gaW52U3k7XG4gIHJvdGF0aW9uTWF0cml4WyA1IF0gKj0gaW52U3k7XG4gIHJvdGF0aW9uTWF0cml4WyA2IF0gKj0gaW52U3k7XG5cbiAgcm90YXRpb25NYXRyaXhbIDggXSAqPSBpbnZTejtcbiAgcm90YXRpb25NYXRyaXhbIDkgXSAqPSBpbnZTejtcbiAgcm90YXRpb25NYXRyaXhbIDEwIF0gKj0gaW52U3o7XG5cbiAgcmV0dXJuIHtcbiAgICBwb3NpdGlvbjogWyBtWyAxMiBdLCBtWyAxMyBdLCBtWyAxNCBdIF0sXG4gICAgc2NhbGU6IFsgc3gsIHN5LCBzeiBdLFxuICAgIHJvdGF0aW9uOiBxdWF0RnJvbU1hdHJpeDQoIHJvdGF0aW9uTWF0cml4ICksXG4gIH07XG59XG4iLCIvKipcbiAqIFNjYWxlIHRoZSBnaXZlbiB2ZWN0b3IgYnkgYSBzY2FsYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWNTY2FsZSggdmVjOiBudW1iZXJbXSwgc2NhbGFyOiBudW1iZXIgKTogbnVtYmVyW10ge1xuICByZXR1cm4gdmVjLm1hcCggKCB2ICkgPT4gdiAqIHNjYWxhciApO1xufVxuIiwiaW1wb3J0IHsgdmVjU2NhbGUgfSBmcm9tICcuLi92ZWMvdmVjU2NhbGUnO1xuaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiAgYW4gaW52ZXJzZSBvZiBnaXZlbiBtYXQ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NEludmVyc2UoIG06IFJhd01hdHJpeDQgKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0XG4gICAgYTAwID0gbVsgIDAgXSwgYTAxID0gbVsgIDEgXSwgYTAyID0gbVsgIDIgXSwgYTAzID0gbVsgIDMgXSxcbiAgICBhMTAgPSBtWyAgNCBdLCBhMTEgPSBtWyAgNSBdLCBhMTIgPSBtWyAgNiBdLCBhMTMgPSBtWyAgNyBdLFxuICAgIGEyMCA9IG1bICA4IF0sIGEyMSA9IG1bICA5IF0sIGEyMiA9IG1bIDEwIF0sIGEyMyA9IG1bIDExIF0sXG4gICAgYTMwID0gbVsgMTIgXSwgYTMxID0gbVsgMTMgXSwgYTMyID0gbVsgMTQgXSwgYTMzID0gbVsgMTUgXSxcbiAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwLCAgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExLFxuICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSwgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwLCAgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxLFxuICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSwgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICBjb25zdCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgaWYgKCBkZXQgPT09IDAuMCApIHsgcmV0dXJuIHZlY1NjYWxlKCBtLCAwLjAgKSBhcyBSYXdNYXRyaXg0OyB9XG5cbiAgcmV0dXJuIHZlY1NjYWxlKCBbXG4gICAgYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5LFxuICAgIGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSxcbiAgICBhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMsXG4gICAgYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzLFxuICAgIGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNyxcbiAgICBhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcsXG4gICAgYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxLFxuICAgIGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSxcbiAgICBhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYsXG4gICAgYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2LFxuICAgIGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCxcbiAgICBhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDAsXG4gICAgYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2LFxuICAgIGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNixcbiAgICBhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDAsXG4gICAgYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwLFxuICBdLCAxLjAgLyBkZXQgKSBhcyBSYXdNYXRyaXg0O1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBSZXR1cm4gYSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlYzNDcm9zcyggdmVjQTogUmF3VmVjdG9yMywgdmVjQjogUmF3VmVjdG9yMyApOiBSYXdWZWN0b3IzIHtcbiAgcmV0dXJuIFtcbiAgICB2ZWNBWyAxIF0gKiB2ZWNCWyAyIF0gLSB2ZWNBWyAyIF0gKiB2ZWNCWyAxIF0sXG4gICAgdmVjQVsgMiBdICogdmVjQlsgMCBdIC0gdmVjQVsgMCBdICogdmVjQlsgMiBdLFxuICAgIHZlY0FbIDAgXSAqIHZlY0JbIDEgXSAtIHZlY0FbIDEgXSAqIHZlY0JbIDAgXSxcbiAgXTtcbn1cbiIsIi8qKlxuICogUmV0dXJuIGEgc3VtIG9mIHZlY3RvcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWNBZGQoIC4uLnZlY3M6IG51bWJlcltdW10gKTogbnVtYmVyW10ge1xuICBpZiAoIHZlY3MubGVuZ3RoIDwgMiApIHtcbiAgICByZXR1cm4gdmVjc1sgMCBdO1xuICB9XG5cbiAgY29uc3QgYSA9IHZlY3Muc2hpZnQoKSE7XG4gIGNvbnN0IGIgPSB2ZWNBZGQoIC4uLnZlY3MgKTtcblxuICByZXR1cm4gYS5tYXAoICggdiwgaSApID0+IHYgKyBiWyBpIF0gKTtcbn1cbiIsImltcG9ydCB7IHZlY0xlbmd0aCB9IGZyb20gJy4vdmVjTGVuZ3RoJztcbmltcG9ydCB7IHZlY1NjYWxlIH0gZnJvbSAnLi92ZWNTY2FsZSc7XG5cbi8qKlxuICogTm9ybWFsaXplIGdpdmVuIHZlY3Rvci5cbiAqIElmIHRoZSBsZW5ndGggb2YgZ2l2ZW4gdmVjdG9yIGlzIDAuMCwgaXQgd2lsbCByZXR1cm4gYSB6ZXJvIHZlY3RvciBpbnN0ZWFkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjTm9ybWFsaXplKCB2ZWM6IG51bWJlcltdICk6IG51bWJlcltdIHtcbiAgY29uc3QgbGVuID0gdmVjTGVuZ3RoKCB2ZWMgKTtcbiAgY29uc3QgaW52TGVuID0gbGVuID09PSAwLjAgPyAwLjAgOiAxLjAgLyBsZW47XG4gIHJldHVybiB2ZWNTY2FsZSggdmVjLCBpbnZMZW4gKTtcbn1cbiIsIi8qKlxuICogU3VidHJhY3QgYSB2ZWN0b3IgZnJvbSBhIHZlY3Rvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlY1N1YiggdmVjQTogbnVtYmVyW10sIHZlY0I6IG51bWJlcltdICk6IG51bWJlcltdIHtcbiAgcmV0dXJuIHZlY0EubWFwKCAoIHYsIGkgKSA9PiB2IC0gdmVjQlsgaSBdICk7XG59XG4iLCJpbXBvcnQgeyB2ZWMzQ3Jvc3MgfSBmcm9tICcuLi92ZWMzL3ZlYzNDcm9zcyc7XG5pbXBvcnQgeyB2ZWNBZGQgfSBmcm9tICcuLi92ZWMvdmVjQWRkJztcbmltcG9ydCB7IHZlY05vcm1hbGl6ZSB9IGZyb20gJy4uL3ZlYy92ZWNOb3JtYWxpemUnO1xuaW1wb3J0IHsgdmVjU2NhbGUgfSBmcm9tICcuLi92ZWMvdmVjU2NhbGUnO1xuaW1wb3J0IHsgdmVjU3ViIH0gZnJvbSAnLi4vdmVjL3ZlY1N1Yic7XG5pbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIFwiTG9va0F0XCIgbWF0cml4LlxuICpcbiAqIFNlZSBhbHNvOiB7QGxpbmsgbWF0NExvb2tBdEludmVyc2V9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0TG9va0F0KFxuICBwb3NpdGlvbjogUmF3VmVjdG9yMyxcbiAgdGFyZ2V0OiBSYXdWZWN0b3IzID0gWyAwLjAsIDAuMCwgMC4wIF0sXG4gIHVwOiBSYXdWZWN0b3IzID0gWyAwLjAsIDEuMCwgMC4wIF0sXG4gIHJvbGwgPSAwLjAsXG4pOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgZGlyID0gdmVjTm9ybWFsaXplKCB2ZWNTdWIoIHBvc2l0aW9uLCB0YXJnZXQgKSApIGFzIFJhd1ZlY3RvcjM7XG5cbiAgbGV0IHNpZCA9IHZlY05vcm1hbGl6ZSggdmVjM0Nyb3NzKCB1cCwgZGlyICkgKSBhcyBSYXdWZWN0b3IzO1xuXG4gIGlmICggcm9sbCAhPT0gMC4wICkge1xuICAgIHNpZCA9IHZlY0FkZChcbiAgICAgIHZlY1NjYWxlKCBzaWQsIE1hdGguY29zKCByb2xsICkgKSxcbiAgICAgIHZlY1NjYWxlKCB2ZWMzQ3Jvc3MoIGRpciwgc2lkICksIE1hdGguc2luKCByb2xsICkgKSxcbiAgICApIGFzIFJhd1ZlY3RvcjM7XG4gIH1cblxuICBjb25zdCB0b3AgPSB2ZWMzQ3Jvc3MoIGRpciwgc2lkICk7XG5cbiAgcmV0dXJuIFtcbiAgICBzaWRbIDAgXSwgc2lkWyAxIF0sIHNpZFsgMiBdLCAwLjAsXG4gICAgdG9wWyAwIF0sIHRvcFsgMSBdLCB0b3BbIDIgXSwgMC4wLFxuICAgIGRpclsgMCBdLCBkaXJbIDEgXSwgZGlyWyAyIF0sIDAuMCxcbiAgICBwb3NpdGlvblsgMCBdLCBwb3NpdGlvblsgMSBdLCBwb3NpdGlvblsgMiBdLCAxLjBcbiAgXTtcbn1cbiIsIi8qKlxuICogUmV0dXJuIGEgZG90IHByb2R1Y3Qgb2YgZ2l2ZW4gdHdvIHZlY3RvcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWNEb3QoIHZlY0E6IG51bWJlcltdLCB2ZWNCOiBudW1iZXJbXSApOiBudW1iZXIge1xuICByZXR1cm4gdmVjQS5yZWR1Y2UoICggc3VtLCB2LCBpICkgPT4gc3VtICsgdiAqIHZlY0JbIGkgXSwgMC4wICk7XG59XG4iLCJpbXBvcnQgeyB2ZWMzQ3Jvc3MgfSBmcm9tICcuLi92ZWMzL3ZlYzNDcm9zcyc7XG5pbXBvcnQgeyB2ZWNBZGQgfSBmcm9tICcuLi92ZWMvdmVjQWRkJztcbmltcG9ydCB7IHZlY0RvdCB9IGZyb20gJy4uL3ZlYy92ZWNEb3QnO1xuaW1wb3J0IHsgdmVjTm9ybWFsaXplIH0gZnJvbSAnLi4vdmVjL3ZlY05vcm1hbGl6ZSc7XG5pbXBvcnQgeyB2ZWNTY2FsZSB9IGZyb20gJy4uL3ZlYy92ZWNTY2FsZSc7XG5pbXBvcnQgeyB2ZWNTdWIgfSBmcm9tICcuLi92ZWMvdmVjU3ViJztcbmltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5pbXBvcnQgdHlwZSB7IFJhd1ZlY3RvcjMgfSBmcm9tICcuLi92ZWMzL1Jhd1ZlY3RvcjMnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGFuIGludmVyc2Ugb2YgXCJMb29rQXRcIiBtYXRyaXguIEdvb2QgZm9yIGNyZWF0aW5nIGEgdmlldyBtYXRyaXguXG4gKlxuICogU2VlIGFsc286IHtAbGluayBtYXQ0TG9va0F0fVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NExvb2tBdEludmVyc2UoXG4gIHBvc2l0aW9uOiBSYXdWZWN0b3IzLFxuICB0YXJnZXQ6IFJhd1ZlY3RvcjMgPSBbIDAuMCwgMC4wLCAwLjAgXSxcbiAgdXA6IFJhd1ZlY3RvcjMgPSBbIDAuMCwgMS4wLCAwLjAgXSxcbiAgcm9sbCA9IDAuMCxcbik6IFJhd01hdHJpeDQge1xuICBjb25zdCBkaXIgPSB2ZWNOb3JtYWxpemUoIHZlY1N1YiggcG9zaXRpb24sIHRhcmdldCApICkgYXMgUmF3VmVjdG9yMztcblxuICBsZXQgc2lkID0gdmVjTm9ybWFsaXplKCB2ZWMzQ3Jvc3MoIHVwLCBkaXIgKSApIGFzIFJhd1ZlY3RvcjM7XG5cbiAgaWYgKCByb2xsICE9PSAwLjAgKSB7XG4gICAgc2lkID0gdmVjQWRkKFxuICAgICAgdmVjU2NhbGUoIHNpZCwgTWF0aC5jb3MoIHJvbGwgKSApLFxuICAgICAgdmVjU2NhbGUoIHZlYzNDcm9zcyggZGlyLCBzaWQgKSwgTWF0aC5zaW4oIHJvbGwgKSApLFxuICAgICkgYXMgUmF3VmVjdG9yMztcbiAgfVxuXG4gIGNvbnN0IHRvcCA9IHZlYzNDcm9zcyggZGlyLCBzaWQgKTtcblxuICByZXR1cm4gW1xuICAgIHNpZFsgMCBdLCB0b3BbIDAgXSwgZGlyWyAwIF0sIDAuMCxcbiAgICBzaWRbIDEgXSwgdG9wWyAxIF0sIGRpclsgMSBdLCAwLjAsXG4gICAgc2lkWyAyIF0sIHRvcFsgMiBdLCBkaXJbIDIgXSwgMC4wLFxuICAgIC12ZWNEb3QoIHNpZCwgcG9zaXRpb24gKSxcbiAgICAtdmVjRG90KCB0b3AsIHBvc2l0aW9uICksXG4gICAgLXZlY0RvdCggZGlyLCBwb3NpdGlvbiApLFxuICAgIDEuMCxcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5cbi8qKlxuICogUmV0dXJuIGEgbXVsdGlwbGljYXRpb24gcmVzdWx0IG9mIG1hdHJpY2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NE11bHRpcGx5KCAuLi5tYXRzOiBSYXdNYXRyaXg0W10gKTogUmF3TWF0cml4NCB7XG4gIGlmICggbWF0cy5sZW5ndGggPCAyICkge1xuICAgIHJldHVybiBtYXRzWyAwIF07XG4gIH1cblxuICBjb25zdCBhID0gbWF0cy5zaGlmdCgpITtcbiAgY29uc3QgYiA9IG1hdDRNdWx0aXBseSggLi4ubWF0cyApO1xuICBjb25zdFxuICAgIGEwMCA9IGFbICAwIF0sIGEwMSA9IGFbICAxIF0sIGEwMiA9IGFbICAyIF0sIGEwMyA9IGFbICAzIF0sXG4gICAgYTEwID0gYVsgIDQgXSwgYTExID0gYVsgIDUgXSwgYTEyID0gYVsgIDYgXSwgYTEzID0gYVsgIDcgXSxcbiAgICBhMjAgPSBhWyAgOCBdLCBhMjEgPSBhWyAgOSBdLCBhMjIgPSBhWyAxMCBdLCBhMjMgPSBhWyAxMSBdLFxuICAgIGEzMCA9IGFbIDEyIF0sIGEzMSA9IGFbIDEzIF0sIGEzMiA9IGFbIDE0IF0sIGEzMyA9IGFbIDE1IF0sXG4gICAgYjAwID0gYlsgIDAgXSwgYjAxID0gYlsgIDEgXSwgYjAyID0gYlsgIDIgXSwgYjAzID0gYlsgIDMgXSxcbiAgICBiMTAgPSBiWyAgNCBdLCBiMTEgPSBiWyAgNSBdLCBiMTIgPSBiWyAgNiBdLCBiMTMgPSBiWyAgNyBdLFxuICAgIGIyMCA9IGJbICA4IF0sIGIyMSA9IGJbICA5IF0sIGIyMiA9IGJbIDEwIF0sIGIyMyA9IGJbIDExIF0sXG4gICAgYjMwID0gYlsgMTIgXSwgYjMxID0gYlsgMTMgXSwgYjMyID0gYlsgMTQgXSwgYjMzID0gYlsgMTUgXTtcblxuICByZXR1cm4gW1xuICAgIGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMiArIGEzMCAqIGIwMyxcbiAgICBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDIgKyBhMzEgKiBiMDMsXG4gICAgYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyICsgYTMyICogYjAzLFxuICAgIGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMiArIGEzMyAqIGIwMyxcblxuICAgIGEwMCAqIGIxMCArIGExMCAqIGIxMSArIGEyMCAqIGIxMiArIGEzMCAqIGIxMyxcbiAgICBhMDEgKiBiMTAgKyBhMTEgKiBiMTEgKyBhMjEgKiBiMTIgKyBhMzEgKiBiMTMsXG4gICAgYTAyICogYjEwICsgYTEyICogYjExICsgYTIyICogYjEyICsgYTMyICogYjEzLFxuICAgIGEwMyAqIGIxMCArIGExMyAqIGIxMSArIGEyMyAqIGIxMiArIGEzMyAqIGIxMyxcblxuICAgIGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMiArIGEzMCAqIGIyMyxcbiAgICBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjIgKyBhMzEgKiBiMjMsXG4gICAgYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyICsgYTMyICogYjIzLFxuICAgIGEwMyAqIGIyMCArIGExMyAqIGIyMSArIGEyMyAqIGIyMiArIGEzMyAqIGIyMyxcblxuICAgIGEwMCAqIGIzMCArIGExMCAqIGIzMSArIGEyMCAqIGIzMiArIGEzMCAqIGIzMyxcbiAgICBhMDEgKiBiMzAgKyBhMTEgKiBiMzEgKyBhMjEgKiBiMzIgKyBhMzEgKiBiMzMsXG4gICAgYTAyICogYjMwICsgYTEyICogYjMxICsgYTIyICogYjMyICsgYTMyICogYjMzLFxuICAgIGEwMyAqIGIzMCArIGExMyAqIGIzMSArIGEyMyAqIGIzMiArIGEzMyAqIGIzMyxcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBcIlBlcnNwZWN0aXZlXCIgcHJvamVjdGlvbiBtYXRyaXguXG4gKiBJdCB3b24ndCBpbmNsdWRlIGFzcGVjdCFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRQZXJzcGVjdGl2ZShcbiAgZm92ID0gNDUuMCxcbiAgbmVhciA9IDAuMDEsXG4gIGZhciA9IDEwMC4wLFxuKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0IHAgPSAxLjAgLyBNYXRoLnRhbiggZm92ICogTWF0aC5QSSAvIDM2MC4wICk7XG4gIGNvbnN0IGQgPSAoIGZhciAtIG5lYXIgKTtcbiAgcmV0dXJuIFtcbiAgICBwLCAwLjAsIDAuMCwgMC4wLFxuICAgIDAuMCwgcCwgMC4wLCAwLjAsXG4gICAgMC4wLCAwLjAsIC0oIGZhciArIG5lYXIgKSAvIGQsIC0xLjAsXG4gICAgMC4wLCAwLjAsIC0yICogZmFyICogbmVhciAvIGQsIDAuMFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIDNkIHJvdGF0aW9uIG1hdHJpeCwgcm90YXRlcyBhcm91bmQgeCBheGlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0NFJvdGF0ZVgoIHRoZXRhOiBudW1iZXIgKTogUmF3TWF0cml4NCB7XG4gIGNvbnN0IGMgPSBNYXRoLmNvcyggdGhldGEgKTtcbiAgY29uc3QgcyA9IE1hdGguc2luKCB0aGV0YSApO1xuXG4gIHJldHVybiBbXG4gICAgMSwgMCwgMCwgMCxcbiAgICAwLCBjLCAtcywgMCxcbiAgICAwLCBzLCBjLCAwLFxuICAgIDAsIDAsIDAsIDEsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgM2Qgcm90YXRpb24gbWF0cml4LCByb3RhdGVzIGFyb3VuZCB5IGF4aXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0Um90YXRlWSggdGhldGE6IG51bWJlciApOiBSYXdNYXRyaXg0IHtcbiAgY29uc3QgYyA9IE1hdGguY29zKCB0aGV0YSApO1xuICBjb25zdCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XG5cbiAgcmV0dXJuIFtcbiAgICBjLCAwLCBzLCAwLFxuICAgIDAsIDEsIDAsIDAsXG4gICAgLXMsIDAsIGMsIDAsXG4gICAgMCwgMCwgMCwgMSxcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3TWF0cml4NCB9IGZyb20gJy4vUmF3TWF0cml4NCc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSAzZCByb3RhdGlvbiBtYXRyaXgsIHJvdGF0ZXMgYXJvdW5kIHogYXhpcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRSb3RhdGVaKCB0aGV0YTogbnVtYmVyICk6IFJhd01hdHJpeDQge1xuICBjb25zdCBjID0gTWF0aC5jb3MoIHRoZXRhICk7XG4gIGNvbnN0IHMgPSBNYXRoLnNpbiggdGhldGEgKTtcblxuICByZXR1cm4gW1xuICAgIGMsIC1zLCAwLCAwLFxuICAgIHMsIGMsIDAsIDAsXG4gICAgMCwgMCwgMSwgMCxcbiAgICAwLCAwLCAwLCAxLFxuICBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdNYXRyaXg0IH0gZnJvbSAnLi9SYXdNYXRyaXg0JztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yMyB9IGZyb20gJy4uL3ZlYzMvUmF3VmVjdG9yMyc7XG5cbi8qKlxuICogR2VuZXJhdGUgYSAzZCBzY2FsaW5nIG1hdHJpeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRTY2FsZSggdmVjOiBSYXdWZWN0b3IzICk6IFJhd01hdHJpeDQge1xuICByZXR1cm4gW1xuICAgIHZlY1sgMCBdLCAwLCAwLCAwLFxuICAgIDAsIHZlY1sgMSBdLCAwLCAwLFxuICAgIDAsIDAsIHZlY1sgMiBdLCAwLFxuICAgIDAsIDAsIDAsIDEsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgM2Qgc2NhbGluZyBtYXRyaXggYnkgYSBzY2FsYXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0U2NhbGVTY2FsYXIoIHNjYWxhcjogbnVtYmVyICk6IFJhd01hdHJpeDQge1xuICByZXR1cm4gW1xuICAgIHNjYWxhciwgMCwgMCwgMCxcbiAgICAwLCBzY2FsYXIsIDAsIDAsXG4gICAgMCwgMCwgc2NhbGFyLCAwLFxuICAgIDAsIDAsIDAsIDEsXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi4vdmVjMy9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHRyYW5zbGF0aW9uIG1hdHJpeC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdDRUcmFuc2xhdGUoIHZlYzogUmF3VmVjdG9yMyApOiBSYXdNYXRyaXg0IHtcbiAgcmV0dXJuIFtcbiAgICAxLCAwLCAwLCAwLFxuICAgIDAsIDEsIDAsIDAsXG4gICAgMCwgMCwgMSwgMCxcbiAgICB2ZWNbIDAgXSwgdmVjWyAxIF0sIHZlY1sgMiBdLCAxXG4gIF07XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuL1Jhd01hdHJpeDQnO1xuXG4vKipcbiAqIFRyYW5zcG9zZSBhIG1hdDQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXQ0VHJhbnNwb3NlKCBtOiBSYXdNYXRyaXg0ICk6IFJhd01hdHJpeDQge1xuICByZXR1cm4gW1xuICAgIG1bIDAgXSwgbVsgNCBdLCBtWyA4IF0sIG1bIDEyIF0sXG4gICAgbVsgMSBdLCBtWyA1IF0sIG1bIDkgXSwgbVsgMTMgXSxcbiAgICBtWyAyIF0sIG1bIDYgXSwgbVsgMTAgXSwgbVsgMTQgXSxcbiAgICBtWyAzIF0sIG1bIDcgXSwgbVsgMTEgXSwgbVsgMTUgXSxcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4vUmF3UXVhdGVybmlvbic7XG5pbXBvcnQgdHlwZSB7IFJhd1ZlY3RvcjMgfSBmcm9tICcuLi92ZWMzL1Jhd1ZlY3RvcjMnO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgUXVhdGVybmlvbiBvdXQgb2YgYXhpcyBhbmQgYW5nbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0RnJvbUF4aXNBbmdsZSggYXhpczogUmF3VmVjdG9yMywgYW5nbGU6IG51bWJlciApOiBSYXdRdWF0ZXJuaW9uIHtcbiAgY29uc3QgaGFsZkFuZ2xlID0gYW5nbGUgLyAyLjA7XG4gIGNvbnN0IHNpbkhhbGZBbmdsZSA9IE1hdGguc2luKCBoYWxmQW5nbGUgKTtcbiAgcmV0dXJuIFtcbiAgICBheGlzWyAwIF0gKiBzaW5IYWxmQW5nbGUsXG4gICAgYXhpc1sgMSBdICogc2luSGFsZkFuZ2xlLFxuICAgIGF4aXNbIDIgXSAqIHNpbkhhbGZBbmdsZSxcbiAgICBNYXRoLmNvcyggaGFsZkFuZ2xlIClcbiAgXTtcbn1cbiIsImltcG9ydCB0eXBlIHsgUmF3UXVhdGVybmlvbiB9IGZyb20gJy4vUmF3UXVhdGVybmlvbic7XG5cbi8qKlxuICogUmV0dXJuIGFuIGludmVyc2Ugb2YgYSBxdWF0ZXJuaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcXVhdEludmVyc2UoIHF1YXQ6IFJhd1F1YXRlcm5pb24gKTogUmF3UXVhdGVybmlvbiB7XG4gIHJldHVybiBbIC1xdWF0WyAwIF0sIC1xdWF0WyAxIF0sIC1xdWF0WyAyIF0sIHF1YXRbIDMgXSBdO1xufVxuIiwiaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi9SYXdRdWF0ZXJuaW9uJztcblxuLyoqXG4gKiBSZXR1cm4gYSBtdWx0aXBsaWNhdGlvbiByZXN1bHQgb2YgcXVhdGVybmlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBxdWF0TXVsdGlwbHkoIC4uLnF1YXRzOiBSYXdRdWF0ZXJuaW9uW10gKTogUmF3UXVhdGVybmlvbiB7XG4gIGlmICggcXVhdHMubGVuZ3RoIDwgMiApIHtcbiAgICByZXR1cm4gcXVhdHNbIDAgXTtcbiAgfVxuXG4gIGNvbnN0IGEgPSBxdWF0cy5zaGlmdCgpITtcbiAgY29uc3QgYiA9IHF1YXRNdWx0aXBseSggLi4ucXVhdHMgKTtcblxuICByZXR1cm4gW1xuICAgIGFbIDMgXSAqIGJbIDAgXSArIGFbIDAgXSAqIGJbIDMgXSArIGFbIDEgXSAqIGJbIDIgXSAtIGFbIDIgXSAqIGJbIDEgXSxcbiAgICBhWyAzIF0gKiBiWyAxIF0gLSBhWyAwIF0gKiBiWyAyIF0gKyBhWyAxIF0gKiBiWyAzIF0gKyBhWyAyIF0gKiBiWyAwIF0sXG4gICAgYVsgMyBdICogYlsgMiBdICsgYVsgMCBdICogYlsgMSBdIC0gYVsgMSBdICogYlsgMCBdICsgYVsgMiBdICogYlsgMyBdLFxuICAgIGFbIDMgXSAqIGJbIDMgXSAtIGFbIDAgXSAqIGJbIDAgXSAtIGFbIDEgXSAqIGJbIDEgXSAtIGFbIDIgXSAqIGJbIDIgXSxcbiAgXTtcbn1cbiIsImltcG9ydCB7IHZlY0xlbmd0aCB9IGZyb20gJy4uL3ZlYy92ZWNMZW5ndGgnO1xuaW1wb3J0IHsgdmVjU2NhbGUgfSBmcm9tICcuLi92ZWMvdmVjU2NhbGUnO1xuaW1wb3J0IHR5cGUgeyBSYXdRdWF0ZXJuaW9uIH0gZnJvbSAnLi9SYXdRdWF0ZXJuaW9uJztcblxuLyoqXG4gKiBOb3JtYWxpemUgZ2l2ZW4gcXVhdGVybmlvbi5cbiAqXG4gKiBJdCdzIGFsbW9zdCBpZGVudGljYWwgYXMge0BsaW5rIHZlY05vcm1hbGl6ZX0sXG4gKiBidXQgaXQgd2lsbCByZXR1cm4gYW4gaWRlbnRpdHkgcXVhdGVybmlvbiBpbnN0ZWFkXG4gKiB3aGVuIGl0IHJlY2lldmVzIGEgcXVhdGVybmlvbiB3aGljaCBsZW5ndGggaXMgemVyby5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1YXROb3JtYWxpemUoIHZlYzogUmF3UXVhdGVybmlvbiApOiBSYXdRdWF0ZXJuaW9uIHtcbiAgY29uc3QgbGVuID0gdmVjTGVuZ3RoKCB2ZWMgKTtcbiAgaWYgKCBsZW4gPT09IDAuMCApIHtcbiAgICByZXR1cm4gWyAwLjAsIDAuMCwgMC4wLCAxLjAgXTtcbiAgfVxuICByZXR1cm4gdmVjU2NhbGUoIHZlYywgMS4wIC8gbGVuICkgYXMgUmF3UXVhdGVybmlvbjtcbn1cbiIsIi8qKlxuICogRGl2aWRlIGEgdmVjdG9yIGJ5IGEgdmVjdG9yLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjRGl2aWRlKCB2ZWNBOiBudW1iZXJbXSwgdmVjQjogbnVtYmVyW10gKTogbnVtYmVyW10ge1xuICByZXR1cm4gdmVjQS5tYXAoICggdiwgaSApID0+IHYgLyB2ZWNCWyBpIF0gKTtcbn1cbiIsIi8qKlxuICogTXVsdGlwbHkgYSB2ZWN0b3IgYnkgYSB2ZWN0b3IuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2ZWNNdWx0aXBseSggdmVjQTogbnVtYmVyW10sIHZlY0I6IG51bWJlcltdICk6IG51bWJlcltdIHtcbiAgcmV0dXJuIHZlY0EubWFwKCAoIHYsIGkgKSA9PiB2ICogdmVjQlsgaSBdICk7XG59XG4iLCJpbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuLi9tYXQ0JztcbmltcG9ydCB0eXBlIHsgUmF3VmVjdG9yNCB9IGZyb20gJy4vUmF3VmVjdG9yNCc7XG5cbi8qKlxuICogTXVsdGlwbHkgYSB2ZWM0IGJ5IGEgbWF0NC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZlYzRBcHBseU1hdHJpeDQoIHY6IFJhd1ZlY3RvcjQsIG06IFJhd01hdHJpeDQgKTogUmF3VmVjdG9yNCB7XG4gIHJldHVybiBbXG4gICAgbVsgMCBdICogdlsgMCBdICsgbVsgNCBdICogdlsgMSBdICsgbVsgOCBdICogdlsgMiBdICsgbVsgMTIgXSAqIHZbIDMgXSxcbiAgICBtWyAxIF0gKiB2WyAwIF0gKyBtWyA1IF0gKiB2WyAxIF0gKyBtWyA5IF0gKiB2WyAyIF0gKyBtWyAxMyBdICogdlsgMyBdLFxuICAgIG1bIDIgXSAqIHZbIDAgXSArIG1bIDYgXSAqIHZbIDEgXSArIG1bIDEwIF0gKiB2WyAyIF0gKyBtWyAxNCBdICogdlsgMyBdLFxuICAgIG1bIDMgXSAqIHZbIDAgXSArIG1bIDcgXSAqIHZbIDEgXSArIG1bIDExIF0gKiB2WyAyIF0gKyBtWyAxNSBdICogdlsgMyBdLFxuICBdO1xufVxuIiwiaW1wb3J0IHsgdmVjNEFwcGx5TWF0cml4NCB9IGZyb20gJy4uL3ZlYzQvdmVjNEFwcGx5TWF0cml4NCc7XG5pbXBvcnQgeyB2ZWNTY2FsZSB9IGZyb20gJy4uL3ZlYy92ZWNTY2FsZSc7XG5pbXBvcnQgdHlwZSB7IFJhd01hdHJpeDQgfSBmcm9tICcuLi9tYXQ0L1Jhd01hdHJpeDQnO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBBcHBseSBhIHZlYzMgKHdpdGggYW4gaW1wbGljaXQgMSBpbiB0aGUgNHRoIGRpbWVuc2lvbikgYSBtYXQ0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjM0FwcGx5TWF0cml4NCggdjogUmF3VmVjdG9yMywgbTogUmF3TWF0cml4NCApOiBSYXdWZWN0b3IzIHtcbiAgY29uc3QgdmVjNCA9IHZlYzRBcHBseU1hdHJpeDQoIFsgLi4udiwgMSBdLCBtICk7XG4gIGNvbnN0IHcgPSB2ZWM0LnBvcCgpITtcbiAgcmV0dXJuIHZlY1NjYWxlKCB2ZWM0LCAxLjAgLyB3ICkgYXMgUmF3VmVjdG9yMztcbn1cbiIsImltcG9ydCB7IHF1YXRJbnZlcnNlIH0gZnJvbSAnLi4vcXVhdC9xdWF0SW52ZXJzZSc7XG5pbXBvcnQgeyBxdWF0TXVsdGlwbHkgfSBmcm9tICcuLi9xdWF0L3F1YXRNdWx0aXBseSc7XG5pbXBvcnQgdHlwZSB7IFJhd1F1YXRlcm5pb24gfSBmcm9tICcuLi9xdWF0L1Jhd1F1YXRlcm5pb24nO1xuaW1wb3J0IHR5cGUgeyBSYXdWZWN0b3IzIH0gZnJvbSAnLi9SYXdWZWN0b3IzJztcblxuLyoqXG4gKiBBcHBseSBhIHZlYzMgKHdpdGggYW4gaW1wbGljaXQgMSBpbiB0aGUgNHRoIGRpbWVuc2lvbikgYSBxdWF0ZXJuaW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmVjM0FwcGx5UXVhdGVybmlvbiggdmVjOiBSYXdWZWN0b3IzLCBxdWF0OiBSYXdRdWF0ZXJuaW9uICk6IFJhd1ZlY3RvcjMge1xuICBjb25zdCBwOiBSYXdRdWF0ZXJuaW9uID0gWyAuLi52ZWMsIDAuMCBdO1xuICBjb25zdCByID0gcXVhdEludmVyc2UoIHF1YXQgKTtcbiAgY29uc3QgcmVzID0gcXVhdE11bHRpcGx5KCBxdWF0LCBwLCByICk7XG4gIHJlcy5wb3AoKTtcbiAgcmV0dXJuIHJlcyBhcyB1bmtub3duIGFzIFJhd1ZlY3RvcjM7XG59XG4iLCIvKipcbiAqIEEgVmVjdG9yLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVmVjdG9yPFQgZXh0ZW5kcyBWZWN0b3I8VD4+IHtcbiAgcHVibGljIGFic3RyYWN0IGVsZW1lbnRzOiBudW1iZXJbXTtcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGlzLlxuICAgKiBhLmsuYS4gYG1hZ25pdHVkZWBcbiAgICovXG4gIHB1YmxpYyBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIE1hdGguc3FydCggdGhpcy5lbGVtZW50cy5yZWR1Y2UoICggc3VtLCB2ICkgPT4gc3VtICsgdiAqIHYsIDAuMCApICk7XG4gIH1cblxuICAvKipcbiAgICogQSBub3JtYWxpemVkIFZlY3RvcjMgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZCgpOiBUIHtcbiAgICByZXR1cm4gdGhpcy5zY2FsZSggMS4wIC8gdGhpcy5sZW5ndGggKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLmNvbmNhdCgpICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgVmVjdG9yIGludG8gdGhpcy5cbiAgICogQHBhcmFtIHZlY3RvciBBbm90aGVyIFZlY3RvclxuICAgKi9cbiAgcHVibGljIGFkZCggdmVjdG9yOiBUICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2LCBpICkgPT4gdiArIHZlY3Rvci5lbGVtZW50c1sgaSBdICkgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzdHJhY3QgdGhpcyBmcm9tIGFub3RoZXIgVmVjdG9yLlxuICAgKiBAcGFyYW0gdiBBbm90aGVyIHZlY3RvclxuICAgKi9cbiAgcHVibGljIHN1YiggdmVjdG9yOiBUICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2LCBpICkgPT4gdiAtIHZlY3Rvci5lbGVtZW50c1sgaSBdICkgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSBhIFZlY3RvciB3aXRoIHRoaXMuXG4gICAqIEBwYXJhbSB2ZWN0b3IgQW5vdGhlciBWZWN0b3JcbiAgICovXG4gIHB1YmxpYyBtdWx0aXBseSggdmVjdG9yOiBUICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2LCBpICkgPT4gdiAqIHZlY3Rvci5lbGVtZW50c1sgaSBdICkgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXZpZGUgdGhpcyBmcm9tIGFub3RoZXIgVmVjdG9yLlxuICAgKiBAcGFyYW0gdmVjdG9yIEFub3RoZXIgVmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZGl2aWRlKCB2ZWN0b3I6IFQgKTogVCB7XG4gICAgcmV0dXJuIHRoaXMuX19uZXcoIHRoaXMuZWxlbWVudHMubWFwKCAoIHYsIGkgKSA9PiB2IC8gdmVjdG9yLmVsZW1lbnRzWyBpIF0gKSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoaXMgYnkgc2NhbGFyLlxuICAgKiBhLmsuYS4gYG11bHRpcGx5U2NhbGFyYFxuICAgKiBAcGFyYW0gc2NhbGFyIEEgc2NhbGFyXG4gICAqL1xuICBwdWJsaWMgc2NhbGUoIHNjYWxhcjogbnVtYmVyICk6IFQge1xuICAgIHJldHVybiB0aGlzLl9fbmV3KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2ICkgPT4gdiAqIHNjYWxhciApICk7XG4gIH1cblxuICAvKipcbiAgICogRG90IHR3byBWZWN0b3JzLlxuICAgKiBAcGFyYW0gdmVjdG9yIEFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgZG90KCB2ZWN0b3I6IFQgKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5yZWR1Y2UoICggc3VtLCB2LCBpICkgPT4gc3VtICsgdiAqIHZlY3Rvci5lbGVtZW50c1sgaSBdLCAwLjAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBfX25ldyggdjogbnVtYmVyW10gKTogVDtcbn1cbiIsImltcG9ydCB7IE1hdHJpeDQgfSBmcm9tICcuL01hdHJpeDQnO1xuaW1wb3J0IHsgUXVhdGVybmlvbiB9IGZyb20gJy4vUXVhdGVybmlvbic7XG5pbXBvcnQgeyBWZWN0b3IgfSBmcm9tICcuL1ZlY3Rvcic7XG5cbmV4cG9ydCB0eXBlIHJhd1ZlY3RvcjMgPSBbIG51bWJlciwgbnVtYmVyLCBudW1iZXIgXTtcblxuLyoqXG4gKiBBIFZlY3RvcjMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWZWN0b3IzIGV4dGVuZHMgVmVjdG9yPFZlY3RvcjM+IHtcbiAgcHVibGljIGVsZW1lbnRzOiByYXdWZWN0b3IzO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdjogcmF3VmVjdG9yMyA9IFsgMC4wLCAwLjAsIDAuMCBdICkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IHY7XG4gIH1cblxuICAvKipcbiAgICogQW4geCBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAwIF07XG4gIH1cblxuICBwdWJsaWMgc2V0IHgoIHg6IG51bWJlciApIHtcbiAgICB0aGlzLmVsZW1lbnRzWyAwIF0gPSB4O1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIHkgY29tcG9uZW50IG9mIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1sgMSBdO1xuICB9XG5cbiAgcHVibGljIHNldCB5KCB5OiBudW1iZXIgKSB7XG4gICAgdGhpcy5lbGVtZW50c1sgMSBdID0geTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiB6IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB6KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDIgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeiggejogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDIgXSA9IHo7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFZlY3RvcjMoICR7IHRoaXMueC50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy55LnRvRml4ZWQoIDMgKSB9LCAkeyB0aGlzLnoudG9GaXhlZCggMyApIH0gKWA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGEgY3Jvc3Mgb2YgdGhpcyBhbmQgYW5vdGhlciBWZWN0b3IzLlxuICAgKiBAcGFyYW0gdmVjdG9yIEFub3RoZXIgdmVjdG9yXG4gICAqL1xuICBwdWJsaWMgY3Jvc3MoIHZlY3RvcjogVmVjdG9yMyApOiBWZWN0b3IzIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoIFtcbiAgICAgIHRoaXMueSAqIHZlY3Rvci56IC0gdGhpcy56ICogdmVjdG9yLnksXG4gICAgICB0aGlzLnogKiB2ZWN0b3IueCAtIHRoaXMueCAqIHZlY3Rvci56LFxuICAgICAgdGhpcy54ICogdmVjdG9yLnkgLSB0aGlzLnkgKiB2ZWN0b3IueFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGUgdGhpcyB2ZWN0b3IgdXNpbmcgYSBRdWF0ZXJuaW9uLlxuICAgKiBAcGFyYW0gcXVhdGVybmlvbiBBIHF1YXRlcm5pb25cbiAgICovXG4gIHB1YmxpYyBhcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb246IFF1YXRlcm5pb24gKTogVmVjdG9yMyB7XG4gICAgY29uc3QgcCA9IG5ldyBRdWF0ZXJuaW9uKCBbIHRoaXMueCwgdGhpcy55LCB0aGlzLnosIDAuMCBdICk7XG4gICAgY29uc3QgciA9IHF1YXRlcm5pb24uaW52ZXJzZWQ7XG4gICAgY29uc3QgcmVzID0gcXVhdGVybmlvbi5tdWx0aXBseSggcCApLm11bHRpcGx5KCByICk7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKCBbIHJlcy54LCByZXMueSwgcmVzLnogXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IHRoaXMgdmVjdG9yICh3aXRoIGFuIGltcGxpY2l0IDEgaW4gdGhlIDR0aCBkaW1lbnNpb24pIGJ5IG0uXG4gICAqL1xuICBwdWJsaWMgYXBwbHlNYXRyaXg0KCBtYXRyaXg6IE1hdHJpeDQgKTogVmVjdG9yMyB7XG4gICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cztcblxuICAgIGNvbnN0IHcgPSBtWyAzIF0gKiB0aGlzLnggKyBtWyA3IF0gKiB0aGlzLnkgKyBtWyAxMSBdICogdGhpcy56ICsgbVsgMTUgXTtcbiAgICBjb25zdCBpbnZXID0gMS4wIC8gdztcblxuICAgIHJldHVybiBuZXcgVmVjdG9yMyggW1xuICAgICAgKCBtWyAwIF0gKiB0aGlzLnggKyBtWyA0IF0gKiB0aGlzLnkgKyBtWyA4IF0gKiB0aGlzLnogKyBtWyAxMiBdICkgKiBpbnZXLFxuICAgICAgKCBtWyAxIF0gKiB0aGlzLnggKyBtWyA1IF0gKiB0aGlzLnkgKyBtWyA5IF0gKiB0aGlzLnogKyBtWyAxMyBdICkgKiBpbnZXLFxuICAgICAgKCBtWyAyIF0gKiB0aGlzLnggKyBtWyA2IF0gKiB0aGlzLnkgKyBtWyAxMCBdICogdGhpcy56ICsgbVsgMTQgXSApICogaW52V1xuICAgIF0gKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfX25ldyggdjogcmF3VmVjdG9yMyApOiBWZWN0b3IzIHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjMoIHYgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZWN0b3IzKCAwLjAsIDAuMCwgMC4wIClcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IHplcm8oKTogVmVjdG9yMyB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IzKCBbIDAuMCwgMC4wLCAwLjAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIFZlY3RvcjMoIDEuMCwgMS4wLCAxLjAgKVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQgb25lKCk6IFZlY3RvcjMge1xuICAgIHJldHVybiBuZXcgVmVjdG9yMyggWyAxLjAsIDEuMCwgMS4wIF0gKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWF0cml4NCB9IGZyb20gJy4vTWF0cml4NCc7XG5pbXBvcnQgeyBWZWN0b3IzIH0gZnJvbSAnLi9WZWN0b3IzJztcblxuZXhwb3J0IHR5cGUgcmF3UXVhdGVybmlvbiA9IFsgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyIF07XG5cbmV4cG9ydCBjb25zdCByYXdJZGVudGl0eVF1YXRlcm5pb246IHJhd1F1YXRlcm5pb24gPSBbIDAuMCwgMC4wLCAwLjAsIDEuMCBdO1xuXG4vKipcbiAqIEEgUXVhdGVybmlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFF1YXRlcm5pb24ge1xuICBwdWJsaWMgZWxlbWVudHM6IHJhd1F1YXRlcm5pb247IC8vIFsgeCwgeSwgejsgdyBdXG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBlbGVtZW50czogcmF3UXVhdGVybmlvbiA9IHJhd0lkZW50aXR5UXVhdGVybmlvbiApIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHM7XG4gIH1cblxuICAvKipcbiAgICogQW4geCBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAwIF07XG4gIH1cblxuICAvKipcbiAgICogQW4geSBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAxIF07XG4gIH1cblxuICAvKipcbiAgICogQW4geiBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgeigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAyIF07XG4gIH1cblxuICAvKipcbiAgICogQW4gdyBjb21wb25lbnQgb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgdygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzWyAzIF07XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFF1YXRlcm5pb24oICR7IHRoaXMueC50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy55LnRvRml4ZWQoIDMgKSB9LCAkeyB0aGlzLnoudG9GaXhlZCggMyApIH0sICR7IHRoaXMudy50b0ZpeGVkKCAzICkgfSApYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9uZSB0aGlzLlxuICAgKi9cbiAgcHVibGljIGNsb25lKCk6IFF1YXRlcm5pb24ge1xuICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggdGhpcy5lbGVtZW50cy5jb25jYXQoKSBhcyByYXdRdWF0ZXJuaW9uICk7XG4gIH1cblxuICAvKipcbiAgICogSXRzZWxmIGJ1dCBjb252ZXJ0ZWQgaW50byBhIE1hdHJpeDQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IG1hdHJpeCgpOiBNYXRyaXg0IHtcbiAgICBjb25zdCB4ID0gbmV3IFZlY3RvcjMoIFsgMS4wLCAwLjAsIDAuMCBdICkuYXBwbHlRdWF0ZXJuaW9uKCB0aGlzICk7XG4gICAgY29uc3QgeSA9IG5ldyBWZWN0b3IzKCBbIDAuMCwgMS4wLCAwLjAgXSApLmFwcGx5UXVhdGVybmlvbiggdGhpcyApO1xuICAgIGNvbnN0IHogPSBuZXcgVmVjdG9yMyggWyAwLjAsIDAuMCwgMS4wIF0gKS5hcHBseVF1YXRlcm5pb24oIHRoaXMgKTtcblxuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgeC54LCB5LngsIHoueCwgMC4wLFxuICAgICAgeC55LCB5LnksIHoueSwgMC4wLFxuICAgICAgeC56LCB5LnosIHoueiwgMC4wLFxuICAgICAgMC4wLCAwLjAsIDAuMCwgMS4wXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuIGludmVyc2Ugb2YgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZWQoKTogUXVhdGVybmlvbiB7XG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICAtdGhpcy54LFxuICAgICAgLXRoaXMueSxcbiAgICAgIC10aGlzLnosXG4gICAgICB0aGlzLndcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkgKyB0aGlzLnogKiB0aGlzLnogKyB0aGlzLncgKiB0aGlzLncgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG5vcm1hbGl6ZWQgdGhpcy5cbiAgICovXG4gIHB1YmxpYyBnZXQgbm9ybWFsaXplZCgpOiBRdWF0ZXJuaW9uIHtcbiAgICBjb25zdCBsID0gdGhpcy5sZW5ndGg7XG5cbiAgICBpZiAoIGwgPT09IDAgKSB7XG4gICAgICByZXR1cm4gUXVhdGVybmlvbi5pZGVudGl0eTtcbiAgICB9XG5cbiAgICBjb25zdCBsSW52ID0gMS4wIC8gdGhpcy5sZW5ndGg7XG5cbiAgICByZXR1cm4gbmV3IFF1YXRlcm5pb24oIFtcbiAgICAgIHRoaXMueCAqIGxJbnYsXG4gICAgICB0aGlzLnkgKiBsSW52LFxuICAgICAgdGhpcy56ICogbEludixcbiAgICAgIHRoaXMudyAqIGxJbnYsXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIE11bHRpcGx5IHR3byBRdWF0ZXJuaW9ucy5cbiAgICogQHBhcmFtIHEgQW5vdGhlciBRdWF0ZXJuaW9uXG4gICAqL1xuICBwdWJsaWMgbXVsdGlwbHkoIHE6IFF1YXRlcm5pb24gKTogUXVhdGVybmlvbiB7XG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICB0aGlzLncgKiBxLnggKyB0aGlzLnggKiBxLncgKyB0aGlzLnkgKiBxLnogLSB0aGlzLnogKiBxLnksXG4gICAgICB0aGlzLncgKiBxLnkgLSB0aGlzLnggKiBxLnogKyB0aGlzLnkgKiBxLncgKyB0aGlzLnogKiBxLngsXG4gICAgICB0aGlzLncgKiBxLnogKyB0aGlzLnggKiBxLnkgLSB0aGlzLnkgKiBxLnggKyB0aGlzLnogKiBxLncsXG4gICAgICB0aGlzLncgKiBxLncgLSB0aGlzLnggKiBxLnggLSB0aGlzLnkgKiBxLnkgLSB0aGlzLnogKiBxLnpcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogQW4gaWRlbnRpdHkgUXVhdGVybmlvbi5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IGlkZW50aXR5KCk6IFF1YXRlcm5pb24ge1xuICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggcmF3SWRlbnRpdHlRdWF0ZXJuaW9uICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBRdWF0ZXJuaW9uIG91dCBvZiBhbmdsZSBhbmQgYXhpcy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZnJvbUF4aXNBbmdsZSggYXhpczogVmVjdG9yMywgYW5nbGU6IG51bWJlciApOiBRdWF0ZXJuaW9uIHtcbiAgICBjb25zdCBoYWxmQW5nbGUgPSBhbmdsZSAvIDIuMDtcbiAgICBjb25zdCBzaW5IYWxmQW5nbGUgPSBNYXRoLnNpbiggaGFsZkFuZ2xlICk7XG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICBheGlzLnggKiBzaW5IYWxmQW5nbGUsXG4gICAgICBheGlzLnkgKiBzaW5IYWxmQW5nbGUsXG4gICAgICBheGlzLnogKiBzaW5IYWxmQW5nbGUsXG4gICAgICBNYXRoLmNvcyggaGFsZkFuZ2xlIClcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBRdWF0ZXJuaW9uIG91dCBvZiBhIHJvdGF0aW9uIG1hdHJpeC5cbiAgICogWW9pbmtlZCBmcm9tIFRocmVlLmpzLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBmcm9tTWF0cml4KCBtYXRyaXg6IE1hdHJpeDQgKTogUXVhdGVybmlvbiB7XG4gICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cyxcbiAgICAgIG0xMSA9IG1bIDAgXSwgbTEyID0gbVsgNCBdLCBtMTMgPSBtWyA4IF0sXG4gICAgICBtMjEgPSBtWyAxIF0sIG0yMiA9IG1bIDUgXSwgbTIzID0gbVsgOSBdLFxuICAgICAgbTMxID0gbVsgMiBdLCBtMzIgPSBtWyA2IF0sIG0zMyA9IG1bIDEwIF0sXG4gICAgICB0cmFjZSA9IG0xMSArIG0yMiArIG0zMztcblxuICAgIGlmICggdHJhY2UgPiAwICkge1xuICAgICAgY29uc3QgcyA9IDAuNSAvIE1hdGguc3FydCggdHJhY2UgKyAxLjAgKTtcbiAgICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgICAoIG0zMiAtIG0yMyApICogcyxcbiAgICAgICAgKCBtMTMgLSBtMzEgKSAqIHMsXG4gICAgICAgICggbTIxIC0gbTEyICkgKiBzLFxuICAgICAgICAwLjI1IC8gc1xuICAgICAgXSApO1xuICAgIH0gZWxzZSBpZiAoIG0xMSA+IG0yMiAmJiBtMTEgPiBtMzMgKSB7XG4gICAgICBjb25zdCBzID0gMi4wICogTWF0aC5zcXJ0KCAxLjAgKyBtMTEgLSBtMjIgLSBtMzMgKTtcbiAgICAgIHJldHVybiBuZXcgUXVhdGVybmlvbiggW1xuICAgICAgICAwLjI1ICogcyxcbiAgICAgICAgKCBtMTIgKyBtMjEgKSAvIHMsXG4gICAgICAgICggbTEzICsgbTMxICkgLyBzLFxuICAgICAgICAoIG0zMiAtIG0yMyApIC8gc1xuICAgICAgXSApO1xuICAgIH0gZWxzZSBpZiAoIG0yMiA+IG0zMyApIHtcbiAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0yMiAtIG0xMSAtIG0zMyApO1xuICAgICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICAgICggbTEyICsgbTIxICkgLyBzLFxuICAgICAgICAwLjI1ICogcyxcbiAgICAgICAgKCBtMjMgKyBtMzIgKSAvIHMsXG4gICAgICAgICggbTEzIC0gbTMxICkgLyBzXG4gICAgICBdICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHMgPSAyLjAgKiBNYXRoLnNxcnQoIDEuMCArIG0zMyAtIG0xMSAtIG0yMiApO1xuICAgICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKCBbXG4gICAgICAgICggbTEzICsgbTMxICkgLyBzLFxuICAgICAgICAoIG0yMyArIG0zMiApIC8gcyxcbiAgICAgICAgMC4yNSAqIHMsXG4gICAgICAgICggbTIxIC0gbTEyICkgLyBzXG4gICAgICBdICk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBRdWF0ZXJuaW9uIH0gZnJvbSAnLi9RdWF0ZXJuaW9uJztcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL1ZlY3RvcjMnO1xuXG5leHBvcnQgdHlwZSByYXdNYXRyaXg0ID0gW1xuICBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsXG4gIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcixcbiAgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLFxuICBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJcbl07XG5cbmV4cG9ydCBjb25zdCByYXdJZGVudGl0eU1hdHJpeDQ6IHJhd01hdHJpeDQgPSBbXG4gIDEuMCwgMC4wLCAwLjAsIDAuMCxcbiAgMC4wLCAxLjAsIDAuMCwgMC4wLFxuICAwLjAsIDAuMCwgMS4wLCAwLjAsXG4gIDAuMCwgMC4wLCAwLjAsIDEuMFxuXTtcblxuLyoqXG4gKiBBIE1hdHJpeDQuXG4gKi9cbmV4cG9ydCBjbGFzcyBNYXRyaXg0IHtcbiAgcHVibGljIGVsZW1lbnRzOiByYXdNYXRyaXg0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdjogcmF3TWF0cml4NCA9IHJhd0lkZW50aXR5TWF0cml4NCApIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdHNlbGYgYnV0IHRyYW5zcG9zZWQuXG4gICAqL1xuICBwdWJsaWMgZ2V0IHRyYW5zcG9zZSgpOiBNYXRyaXg0IHtcbiAgICBjb25zdCBtID0gdGhpcy5lbGVtZW50cztcblxuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgbVsgMCBdLCBtWyA0IF0sIG1bIDggXSwgbVsgMTIgXSxcbiAgICAgIG1bIDEgXSwgbVsgNSBdLCBtWyA5IF0sIG1bIDEzIF0sXG4gICAgICBtWyAyIF0sIG1bIDYgXSwgbVsgMTAgXSwgbVsgMTQgXSxcbiAgICAgIG1bIDMgXSwgbVsgNyBdLCBtWyAxMSBdLCBtWyAxNSBdXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0cyBkZXRlcm1pbmFudC5cbiAgICovXG4gIHB1YmxpYyBnZXQgZGV0ZXJtaW5hbnQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBtID0gdGhpcy5lbGVtZW50cztcbiAgICBjb25zdFxuICAgICAgYTAwID0gbVsgIDAgXSwgYTAxID0gbVsgIDEgXSwgYTAyID0gbVsgIDIgXSwgYTAzID0gbVsgIDMgXSxcbiAgICAgIGExMCA9IG1bICA0IF0sIGExMSA9IG1bICA1IF0sIGExMiA9IG1bICA2IF0sIGExMyA9IG1bICA3IF0sXG4gICAgICBhMjAgPSBtWyAgOCBdLCBhMjEgPSBtWyAgOSBdLCBhMjIgPSBtWyAxMCBdLCBhMjMgPSBtWyAxMSBdLFxuICAgICAgYTMwID0gbVsgMTIgXSwgYTMxID0gbVsgMTMgXSwgYTMyID0gbVsgMTQgXSwgYTMzID0gbVsgMTUgXSxcbiAgICAgIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMCwgIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMCxcbiAgICAgIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMCwgIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMSxcbiAgICAgIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMSwgIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMixcbiAgICAgIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMCwgIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMCxcbiAgICAgIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMCwgIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMSxcbiAgICAgIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMSwgIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcblxuICAgIHJldHVybiBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG4gIH1cblxuICAvKipcbiAgICogSXRzZWxmIGJ1dCBpbnZlcnRlZC5cbiAgICovXG4gIHB1YmxpYyBnZXQgaW52ZXJzZSgpOiBNYXRyaXg0IHwgbnVsbCB7XG4gICAgY29uc3QgbSA9IHRoaXMuZWxlbWVudHM7XG4gICAgY29uc3RcbiAgICAgIGEwMCA9IG1bICAwIF0sIGEwMSA9IG1bICAxIF0sIGEwMiA9IG1bICAyIF0sIGEwMyA9IG1bICAzIF0sXG4gICAgICBhMTAgPSBtWyAgNCBdLCBhMTEgPSBtWyAgNSBdLCBhMTIgPSBtWyAgNiBdLCBhMTMgPSBtWyAgNyBdLFxuICAgICAgYTIwID0gbVsgIDggXSwgYTIxID0gbVsgIDkgXSwgYTIyID0gbVsgMTAgXSwgYTIzID0gbVsgMTEgXSxcbiAgICAgIGEzMCA9IG1bIDEyIF0sIGEzMSA9IG1bIDEzIF0sIGEzMiA9IG1bIDE0IF0sIGEzMyA9IG1bIDE1IF0sXG4gICAgICBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTAsICBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTAsXG4gICAgICBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTAsICBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTEsXG4gICAgICBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTEsICBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTIsXG4gICAgICBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzAsICBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzAsXG4gICAgICBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzAsICBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzEsXG4gICAgICBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzEsICBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG5cbiAgICBjb25zdCBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIGRldCA9PT0gMC4wICkgeyByZXR1cm4gbnVsbDsgfVxuXG4gICAgY29uc3QgaW52RGV0ID0gMS4wIC8gZGV0O1xuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDksXG4gICAgICBhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDksXG4gICAgICBhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMsXG4gICAgICBhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMsXG4gICAgICBhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcsXG4gICAgICBhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcsXG4gICAgICBhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEsXG4gICAgICBhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEsXG4gICAgICBhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYsXG4gICAgICBhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYsXG4gICAgICBhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDAsXG4gICAgICBhMjEgKiBiMDIgLSBhMjAgKiBiMDQgLSBhMjMgKiBiMDAsXG4gICAgICBhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYsXG4gICAgICBhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYsXG4gICAgICBhMzEgKiBiMDEgLSBhMzAgKiBiMDMgLSBhMzIgKiBiMDAsXG4gICAgICBhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDBcbiAgICBdLm1hcCggKCB2ICkgPT4gdiAqIGludkRldCApIGFzIHJhd01hdHJpeDQgKTtcbiAgfVxuXG4gIHB1YmxpYyB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGNvbnN0IG0gPSB0aGlzLmVsZW1lbnRzLm1hcCggKCB2ICkgPT4gdi50b0ZpeGVkKCAzICkgKTtcbiAgICByZXR1cm4gYE1hdHJpeDQoICR7IG1bIDAgXSB9LCAkeyBtWyA0IF0gfSwgJHsgbVsgOCBdIH0sICR7IG1bIDEyIF0gfTsgJHsgbVsgMSBdIH0sICR7IG1bIDUgXSB9LCAkeyBtWyA5IF0gfSwgJHsgbVsgMTMgXSB9OyAkeyBtWyAyIF0gfSwgJHsgbVsgNiBdIH0sICR7IG1bIDEwIF0gfSwgJHsgbVsgMTQgXSB9OyAkeyBtWyAzIF0gfSwgJHsgbVsgNyBdIH0sICR7IG1bIDExIF0gfSwgJHsgbVsgMTUgXSB9IClgO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb25lIHRoaXMuXG4gICAqL1xuICBwdWJsaWMgY2xvbmUoKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCB0aGlzLmVsZW1lbnRzLmNvbmNhdCgpIGFzIHJhd01hdHJpeDQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSB0aGlzIE1hdHJpeDQgYnkgb25lIG9yIG1vcmUgTWF0cml4NHMuXG4gICAqL1xuICBwdWJsaWMgbXVsdGlwbHkoIC4uLm1hdHJpY2VzOiBNYXRyaXg0W10gKTogTWF0cml4NCB7XG4gICAgaWYgKCBtYXRyaWNlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5jbG9uZSgpO1xuICAgIH1cblxuICAgIGNvbnN0IGFyciA9IG1hdHJpY2VzLmNvbmNhdCgpO1xuICAgIGxldCBiTWF0ID0gYXJyLnNoaWZ0KCkhO1xuICAgIGlmICggMCA8IGFyci5sZW5ndGggKSB7XG4gICAgICBiTWF0ID0gYk1hdC5tdWx0aXBseSggLi4uYXJyICk7XG4gICAgfVxuXG4gICAgY29uc3QgYSA9IHRoaXMuZWxlbWVudHM7XG4gICAgY29uc3QgYiA9IGJNYXQuZWxlbWVudHM7XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIGFbIDAgXSAqIGJbIDAgXSArIGFbIDQgXSAqIGJbIDEgXSArIGFbIDggXSAqIGJbIDIgXSArIGFbIDEyIF0gKiBiWyAzIF0sXG4gICAgICBhWyAxIF0gKiBiWyAwIF0gKyBhWyA1IF0gKiBiWyAxIF0gKyBhWyA5IF0gKiBiWyAyIF0gKyBhWyAxMyBdICogYlsgMyBdLFxuICAgICAgYVsgMiBdICogYlsgMCBdICsgYVsgNiBdICogYlsgMSBdICsgYVsgMTAgXSAqIGJbIDIgXSArIGFbIDE0IF0gKiBiWyAzIF0sXG4gICAgICBhWyAzIF0gKiBiWyAwIF0gKyBhWyA3IF0gKiBiWyAxIF0gKyBhWyAxMSBdICogYlsgMiBdICsgYVsgMTUgXSAqIGJbIDMgXSxcblxuICAgICAgYVsgMCBdICogYlsgNCBdICsgYVsgNCBdICogYlsgNSBdICsgYVsgOCBdICogYlsgNiBdICsgYVsgMTIgXSAqIGJbIDcgXSxcbiAgICAgIGFbIDEgXSAqIGJbIDQgXSArIGFbIDUgXSAqIGJbIDUgXSArIGFbIDkgXSAqIGJbIDYgXSArIGFbIDEzIF0gKiBiWyA3IF0sXG4gICAgICBhWyAyIF0gKiBiWyA0IF0gKyBhWyA2IF0gKiBiWyA1IF0gKyBhWyAxMCBdICogYlsgNiBdICsgYVsgMTQgXSAqIGJbIDcgXSxcbiAgICAgIGFbIDMgXSAqIGJbIDQgXSArIGFbIDcgXSAqIGJbIDUgXSArIGFbIDExIF0gKiBiWyA2IF0gKyBhWyAxNSBdICogYlsgNyBdLFxuXG4gICAgICBhWyAwIF0gKiBiWyA4IF0gKyBhWyA0IF0gKiBiWyA5IF0gKyBhWyA4IF0gKiBiWyAxMCBdICsgYVsgMTIgXSAqIGJbIDExIF0sXG4gICAgICBhWyAxIF0gKiBiWyA4IF0gKyBhWyA1IF0gKiBiWyA5IF0gKyBhWyA5IF0gKiBiWyAxMCBdICsgYVsgMTMgXSAqIGJbIDExIF0sXG4gICAgICBhWyAyIF0gKiBiWyA4IF0gKyBhWyA2IF0gKiBiWyA5IF0gKyBhWyAxMCBdICogYlsgMTAgXSArIGFbIDE0IF0gKiBiWyAxMSBdLFxuICAgICAgYVsgMyBdICogYlsgOCBdICsgYVsgNyBdICogYlsgOSBdICsgYVsgMTEgXSAqIGJbIDEwIF0gKyBhWyAxNSBdICogYlsgMTEgXSxcblxuICAgICAgYVsgMCBdICogYlsgMTIgXSArIGFbIDQgXSAqIGJbIDEzIF0gKyBhWyA4IF0gKiBiWyAxNCBdICsgYVsgMTIgXSAqIGJbIDE1IF0sXG4gICAgICBhWyAxIF0gKiBiWyAxMiBdICsgYVsgNSBdICogYlsgMTMgXSArIGFbIDkgXSAqIGJbIDE0IF0gKyBhWyAxMyBdICogYlsgMTUgXSxcbiAgICAgIGFbIDIgXSAqIGJbIDEyIF0gKyBhWyA2IF0gKiBiWyAxMyBdICsgYVsgMTAgXSAqIGJbIDE0IF0gKyBhWyAxNCBdICogYlsgMTUgXSxcbiAgICAgIGFbIDMgXSAqIGJbIDEyIF0gKyBhWyA3IF0gKiBiWyAxMyBdICsgYVsgMTEgXSAqIGJbIDE0IF0gKyBhWyAxNSBdICogYlsgMTUgXVxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSB0aGlzIE1hdHJpeDQgYnkgYSBzY2FsYXJcbiAgICovXG4gIHB1YmxpYyBzY2FsZVNjYWxhciggc2NhbGFyOiBudW1iZXIgKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCB0aGlzLmVsZW1lbnRzLm1hcCggKCB2ICkgPT4gdiAqIHNjYWxhciApIGFzIHJhd01hdHJpeDQgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBpZGVudGl0eSBNYXRyaXg0LlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQgaWRlbnRpdHkoKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCByYXdJZGVudGl0eU1hdHJpeDQgKTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgbXVsdGlwbHkoIC4uLm1hdHJpY2VzOiBNYXRyaXg0W10gKTogTWF0cml4NCB7XG4gICAgaWYgKCBtYXRyaWNlcy5sZW5ndGggPT09IDAgKSB7XG4gICAgICByZXR1cm4gTWF0cml4NC5pZGVudGl0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYk1hdHMgPSBtYXRyaWNlcy5jb25jYXQoKTtcbiAgICAgIGNvbnN0IGFNYXQgPSBiTWF0cy5zaGlmdCgpITtcbiAgICAgIHJldHVybiBhTWF0Lm11bHRpcGx5KCAuLi5iTWF0cyApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHRyYW5zbGF0aW9uIG1hdHJpeC5cbiAgICogQHBhcmFtIHZlY3RvciBUcmFuc2xhdGlvblxuICAgKi9cbiAgcHVibGljIHN0YXRpYyB0cmFuc2xhdGUoIHZlY3RvcjogVmVjdG9yMyApOiBNYXRyaXg0IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIDEsIDAsIDAsIDAsXG4gICAgICAwLCAxLCAwLCAwLFxuICAgICAgMCwgMCwgMSwgMCxcbiAgICAgIHZlY3Rvci54LCB2ZWN0b3IueSwgdmVjdG9yLnosIDFcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSAzZCBzY2FsaW5nIG1hdHJpeC5cbiAgICogQHBhcmFtIHZlY3RvciBTY2FsZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBzY2FsZSggdmVjdG9yOiBWZWN0b3IzICk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgdmVjdG9yLngsIDAsIDAsIDAsXG4gICAgICAwLCB2ZWN0b3IueSwgMCwgMCxcbiAgICAgIDAsIDAsIHZlY3Rvci56LCAwLFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIDNkIHNjYWxpbmcgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICAgKiBAcGFyYW0gdmVjdG9yIFNjYWxlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHNjYWxlU2NhbGFyKCBzY2FsYXI6IG51bWJlciApOiBNYXRyaXg0IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHNjYWxhciwgMCwgMCwgMCxcbiAgICAgIDAsIHNjYWxhciwgMCwgMCxcbiAgICAgIDAsIDAsIHNjYWxhciwgMCxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSAzZCByb3RhdGlvbiBtYXRyaXgsIHJvdGF0ZXMgYXJvdW5kIHggYXhpcy5cbiAgICogQHBhcmFtIHZlY3RvciBTY2FsZVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyByb3RhdGVYKCB0aGV0YTogbnVtYmVyICk6IE1hdHJpeDQge1xuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgMSwgMCwgMCwgMCxcbiAgICAgIDAsIE1hdGguY29zKCB0aGV0YSApLCAtTWF0aC5zaW4oIHRoZXRhICksIDAsXG4gICAgICAwLCBNYXRoLnNpbiggdGhldGEgKSwgTWF0aC5jb3MoIHRoZXRhICksIDAsXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgM2Qgcm90YXRpb24gbWF0cml4LCByb3RhdGVzIGFyb3VuZCB5IGF4aXMuXG4gICAqIEBwYXJhbSB2ZWN0b3IgU2NhbGVcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcm90YXRlWSggdGhldGE6IG51bWJlciApOiBNYXRyaXg0IHtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIE1hdGguY29zKCB0aGV0YSApLCAwLCBNYXRoLnNpbiggdGhldGEgKSwgMCxcbiAgICAgIDAsIDEsIDAsIDAsXG4gICAgICAtTWF0aC5zaW4oIHRoZXRhICksIDAsIE1hdGguY29zKCB0aGV0YSApLCAwLFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIDNkIHJvdGF0aW9uIG1hdHJpeCwgcm90YXRlcyBhcm91bmQgeiBheGlzLlxuICAgKiBAcGFyYW0gdmVjdG9yIFNjYWxlXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHJvdGF0ZVooIHRoZXRhOiBudW1iZXIgKTogTWF0cml4NCB7XG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICBNYXRoLmNvcyggdGhldGEgKSwgLU1hdGguc2luKCB0aGV0YSApLCAwLCAwLFxuICAgICAgTWF0aC5zaW4oIHRoZXRhICksIE1hdGguY29zKCB0aGV0YSApLCAwLCAwLFxuICAgICAgMCwgMCwgMSwgMCxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdICk7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgYSBcIkxvb2tBdFwiIG1hdHJpeC5cbiAgICpcbiAgICogU2VlIGFsc286IHtAbGluayBsb29rQXRJbnZlcnNlfVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBsb29rQXQoXG4gICAgcG9zaXRpb246IFZlY3RvcjMsXG4gICAgdGFyZ2V0ID0gbmV3IFZlY3RvcjMoIFsgMC4wLCAwLjAsIDAuMCBdICksXG4gICAgdXAgPSBuZXcgVmVjdG9yMyggWyAwLjAsIDEuMCwgMC4wIF0gKSxcbiAgICByb2xsID0gMC4wXG4gICk6IE1hdHJpeDQge1xuICAgIGNvbnN0IGRpciA9IHBvc2l0aW9uLnN1YiggdGFyZ2V0ICkubm9ybWFsaXplZDtcbiAgICBsZXQgc2lkID0gdXAuY3Jvc3MoIGRpciApLm5vcm1hbGl6ZWQ7XG4gICAgbGV0IHRvcCA9IGRpci5jcm9zcyggc2lkICk7XG4gICAgc2lkID0gc2lkLnNjYWxlKCBNYXRoLmNvcyggcm9sbCApICkuYWRkKCB0b3Auc2NhbGUoIE1hdGguc2luKCByb2xsICkgKSApO1xuICAgIHRvcCA9IGRpci5jcm9zcyggc2lkICk7XG5cbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHNpZC54LCBzaWQueSwgc2lkLnosIDAuMCxcbiAgICAgIHRvcC54LCB0b3AueSwgdG9wLnosIDAuMCxcbiAgICAgIGRpci54LCBkaXIueSwgZGlyLnosIDAuMCxcbiAgICAgIHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHBvc2l0aW9uLnosIDEuMFxuICAgIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhbiBpbnZlcnNlIG9mIFwiTG9va0F0XCIgbWF0cml4LiBHb29kIGZvciBjcmVhdGluZyBhIHZpZXcgbWF0cml4LlxuICAgKlxuICAgKiBTZWUgYWxzbzoge0BsaW5rIGxvb2tBdH1cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgbG9va0F0SW52ZXJzZShcbiAgICBwb3NpdGlvbjogVmVjdG9yMyxcbiAgICB0YXJnZXQgPSBuZXcgVmVjdG9yMyggWyAwLjAsIDAuMCwgMC4wIF0gKSxcbiAgICB1cCA9IG5ldyBWZWN0b3IzKCBbIDAuMCwgMS4wLCAwLjAgXSApLFxuICAgIHJvbGwgPSAwLjBcbiAgKTogTWF0cml4NCB7XG4gICAgY29uc3QgZGlyID0gcG9zaXRpb24uc3ViKCB0YXJnZXQgKS5ub3JtYWxpemVkO1xuICAgIGxldCBzaWQgPSB1cC5jcm9zcyggZGlyICkubm9ybWFsaXplZDtcbiAgICBsZXQgdG9wID0gZGlyLmNyb3NzKCBzaWQgKTtcbiAgICBzaWQgPSBzaWQuc2NhbGUoIE1hdGguY29zKCByb2xsICkgKS5hZGQoIHRvcC5zY2FsZSggTWF0aC5zaW4oIHJvbGwgKSApICk7XG4gICAgdG9wID0gZGlyLmNyb3NzKCBzaWQgKTtcblxuICAgIHJldHVybiBuZXcgTWF0cml4NCggW1xuICAgICAgc2lkLngsIHRvcC54LCBkaXIueCwgMC4wLFxuICAgICAgc2lkLnksIHRvcC55LCBkaXIueSwgMC4wLFxuICAgICAgc2lkLnosIHRvcC56LCBkaXIueiwgMC4wLFxuICAgICAgLXNpZC54ICogcG9zaXRpb24ueCAtIHNpZC55ICogcG9zaXRpb24ueSAtIHNpZC56ICogcG9zaXRpb24ueixcbiAgICAgIC10b3AueCAqIHBvc2l0aW9uLnggLSB0b3AueSAqIHBvc2l0aW9uLnkgLSB0b3AueiAqIHBvc2l0aW9uLnosXG4gICAgICAtZGlyLnggKiBwb3NpdGlvbi54IC0gZGlyLnkgKiBwb3NpdGlvbi55IC0gZGlyLnogKiBwb3NpdGlvbi56LFxuICAgICAgMS4wXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIGEgXCJQZXJzcGVjdGl2ZVwiIHByb2plY3Rpb24gbWF0cml4LlxuICAgKiBJdCB3b24ndCBpbmNsdWRlIGFzcGVjdCFcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgcGVyc3BlY3RpdmUoIGZvdiA9IDQ1LjAsIG5lYXIgPSAwLjAxLCBmYXIgPSAxMDAuMCApOiBNYXRyaXg0IHtcbiAgICBjb25zdCBwID0gMS4wIC8gTWF0aC50YW4oIGZvdiAqIE1hdGguUEkgLyAzNjAuMCApO1xuICAgIGNvbnN0IGQgPSAoIGZhciAtIG5lYXIgKTtcbiAgICByZXR1cm4gbmV3IE1hdHJpeDQoIFtcbiAgICAgIHAsIDAuMCwgMC4wLCAwLjAsXG4gICAgICAwLjAsIHAsIDAuMCwgMC4wLFxuICAgICAgMC4wLCAwLjAsIC0oIGZhciArIG5lYXIgKSAvIGQsIC0xLjAsXG4gICAgICAwLjAsIDAuMCwgLTIgKiBmYXIgKiBuZWFyIC8gZCwgMC4wXG4gICAgXSApO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29tcG9zZSB0aGlzIG1hdHJpeCBpbnRvIGEgcG9zaXRpb24sIGEgc2NhbGUsIGFuZCBhIHJvdGF0aW9uLlxuICAgKiBZb2lua2VkIGZyb20gVGhyZWUuanMuXG4gICAqL1xuICBwdWJsaWMgZGVjb21wb3NlKCk6IHsgcG9zaXRpb246IFZlY3RvcjM7IHNjYWxlOiBWZWN0b3IzOyByb3RhdGlvbjogUXVhdGVybmlvbiB9IHtcbiAgICBjb25zdCBtID0gdGhpcy5lbGVtZW50cztcblxuICAgIGxldCBzeCA9IG5ldyBWZWN0b3IzKCBbIG1bIDAgXSwgbVsgMSBdLCBtWyAyIF0gXSApLmxlbmd0aDtcbiAgICBjb25zdCBzeSA9IG5ldyBWZWN0b3IzKCBbIG1bIDQgXSwgbVsgNSBdLCBtWyA2IF0gXSApLmxlbmd0aDtcbiAgICBjb25zdCBzeiA9IG5ldyBWZWN0b3IzKCBbIG1bIDggXSwgbVsgOSBdLCBtWyAxMCBdIF0gKS5sZW5ndGg7XG5cbiAgICAvLyBpZiBkZXRlcm1pbmUgaXMgbmVnYXRpdmUsIHdlIG5lZWQgdG8gaW52ZXJ0IG9uZSBzY2FsZVxuICAgIGNvbnN0IGRldCA9IHRoaXMuZGV0ZXJtaW5hbnQ7XG4gICAgaWYgKCBkZXQgPCAwICkgeyBzeCA9IC1zeDsgfVxuXG4gICAgY29uc3QgaW52U3ggPSAxLjAgLyBzeDtcbiAgICBjb25zdCBpbnZTeSA9IDEuMCAvIHN5O1xuICAgIGNvbnN0IGludlN6ID0gMS4wIC8gc3o7XG5cbiAgICBjb25zdCByb3RhdGlvbk1hdHJpeCA9IHRoaXMuY2xvbmUoKTtcblxuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyAwIF0gKj0gaW52U3g7XG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDEgXSAqPSBpbnZTeDtcbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgMiBdICo9IGludlN4O1xuXG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDQgXSAqPSBpbnZTeTtcbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgNSBdICo9IGludlN5O1xuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyA2IF0gKj0gaW52U3k7XG5cbiAgICByb3RhdGlvbk1hdHJpeC5lbGVtZW50c1sgOCBdICo9IGludlN6O1xuICAgIHJvdGF0aW9uTWF0cml4LmVsZW1lbnRzWyA5IF0gKj0gaW52U3o7XG4gICAgcm90YXRpb25NYXRyaXguZWxlbWVudHNbIDEwIF0gKj0gaW52U3o7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246IG5ldyBWZWN0b3IzKCBbIG1bIDEyIF0sIG1bIDEzIF0sIG1bIDE0IF0gXSApLFxuICAgICAgc2NhbGU6IG5ldyBWZWN0b3IzKCBbIHN4LCBzeSwgc3ogXSApLFxuICAgICAgcm90YXRpb246IFF1YXRlcm5pb24uZnJvbU1hdHJpeCggcm90YXRpb25NYXRyaXggKVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9zZSBhIG1hdHJpeCBvdXQgb2YgcG9zaXRpb24sIHNjYWxlLCBhbmQgcm90YXRpb24uXG4gICAqIFlvaW5rZWQgZnJvbSBUaHJlZS5qcy5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgY29tcG9zZSggcG9zaXRpb246IFZlY3RvcjMsIHJvdGF0aW9uOiBRdWF0ZXJuaW9uLCBzY2FsZTogVmVjdG9yMyApOiBNYXRyaXg0IHtcbiAgICBjb25zdCB4ID0gcm90YXRpb24ueCwgeSA9IHJvdGF0aW9uLnksIHogPSByb3RhdGlvbi56LCB3ID0gcm90YXRpb24udztcbiAgICBjb25zdCB4MiA9IHggKyB4LFx0eTIgPSB5ICsgeSwgejIgPSB6ICsgejtcbiAgICBjb25zdCB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyO1xuICAgIGNvbnN0IHl5ID0geSAqIHkyLCB5eiA9IHkgKiB6MiwgenogPSB6ICogejI7XG4gICAgY29uc3Qgd3ggPSB3ICogeDIsIHd5ID0gdyAqIHkyLCB3eiA9IHcgKiB6MjtcbiAgICBjb25zdCBzeCA9IHNjYWxlLngsIHN5ID0gc2NhbGUueSwgc3ogPSBzY2FsZS56O1xuXG4gICAgcmV0dXJuIG5ldyBNYXRyaXg0KCBbXG4gICAgICAoIDEuMCAtICggeXkgKyB6eiApICkgKiBzeCxcbiAgICAgICggeHkgKyB3eiApICogc3gsXG4gICAgICAoIHh6IC0gd3kgKSAqIHN4LFxuICAgICAgMC4wLFxuXG4gICAgICAoIHh5IC0gd3ogKSAqIHN5LFxuICAgICAgKCAxLjAgLSAoIHh4ICsgenogKSApICogc3ksXG4gICAgICAoIHl6ICsgd3ggKSAqIHN5LFxuICAgICAgMC4wLFxuXG4gICAgICAoIHh6ICsgd3kgKSAqIHN6LFxuICAgICAgKCB5eiAtIHd4ICkgKiBzeixcbiAgICAgICggMS4wIC0gKCB4eCArIHl5ICkgKSAqIHN6LFxuICAgICAgMC4wLFxuXG4gICAgICBwb3NpdGlvbi54LFxuICAgICAgcG9zaXRpb24ueSxcbiAgICAgIHBvc2l0aW9uLnosXG4gICAgICAxLjBcbiAgICBdICk7XG4gIH1cbn1cbiIsIi8qKlxuICogR0xTTCBTdHlsZSBgbW9kYCBmdW5jdGlvbi5cbiAqIFwiY29tcHV0ZSB2YWx1ZSBvZiBvbmUgcGFyYW1ldGVyIG1vZHVsbyBhbm90aGVyXCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZCggdmFsdWU6IG51bWJlciwgZGl2aXNvcjogbnVtYmVyICk6IG51bWJlciB7XG4gIHJldHVybiB2YWx1ZSAtIE1hdGguZmxvb3IoIHZhbHVlIC8gZGl2aXNvciApICogZGl2aXNvcjtcbn1cbiIsImltcG9ydCB7IE1hdHJpeDQgfSBmcm9tICcuL01hdHJpeDQnO1xuaW1wb3J0IHsgVmVjdG9yIH0gZnJvbSAnLi9WZWN0b3InO1xuXG5leHBvcnQgdHlwZSByYXdWZWN0b3I0ID0gWyBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIgXTtcblxuLyoqXG4gKiBBIFZlY3RvcjMuXG4gKi9cbmV4cG9ydCBjbGFzcyBWZWN0b3I0IGV4dGVuZHMgVmVjdG9yPFZlY3RvcjQ+IHtcbiAgcHVibGljIGVsZW1lbnRzOiByYXdWZWN0b3I0O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvciggdjogcmF3VmVjdG9yNCA9IFsgMC4wLCAwLjAsIDAuMCwgMC4wIF0gKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVsZW1lbnRzID0gdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiB4IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDAgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeCggeDogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDAgXSA9IHg7XG4gIH1cblxuICAvKipcbiAgICogQSB5IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDEgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeSggeTogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDEgXSA9IHk7XG4gIH1cblxuICAvKipcbiAgICogQSB6IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB6KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDIgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgeiggejogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDIgXSA9IHo7XG4gIH1cblxuICAvKipcbiAgICogQSB3IGNvbXBvbmVudCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGdldCB3KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbIDMgXTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgdyggejogbnVtYmVyICkge1xuICAgIHRoaXMuZWxlbWVudHNbIDMgXSA9IHo7XG4gIH1cblxuICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYFZlY3RvcjQoICR7IHRoaXMueC50b0ZpeGVkKCAzICkgfSwgJHsgdGhpcy55LnRvRml4ZWQoIDMgKSB9LCAkeyB0aGlzLnoudG9GaXhlZCggMyApIH0sICR7IHRoaXMudy50b0ZpeGVkKCAzICkgfSApYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNdWx0aXBseSB0aGlzIHZlY3RvciAod2l0aCBhbiBpbXBsaWNpdCAxIGluIHRoZSA0dGggZGltZW5zaW9uKSBieSBtLlxuICAgKi9cbiAgcHVibGljIGFwcGx5TWF0cml4NCggbWF0cml4OiBNYXRyaXg0ICk6IFZlY3RvcjQge1xuICAgIGNvbnN0IG0gPSBtYXRyaXguZWxlbWVudHM7XG5cbiAgICByZXR1cm4gbmV3IFZlY3RvcjQoIFtcbiAgICAgIG1bIDAgXSAqIHRoaXMueCArIG1bIDQgXSAqIHRoaXMueSArIG1bIDggXSAqIHRoaXMueiArIG1bIDEyIF0gKiB0aGlzLncsXG4gICAgICBtWyAxIF0gKiB0aGlzLnggKyBtWyA1IF0gKiB0aGlzLnkgKyBtWyA5IF0gKiB0aGlzLnogKyBtWyAxMyBdICogdGhpcy53LFxuICAgICAgbVsgMiBdICogdGhpcy54ICsgbVsgNiBdICogdGhpcy55ICsgbVsgMTAgXSAqIHRoaXMueiArIG1bIDE0IF0gKiB0aGlzLncsXG4gICAgICBtWyAzIF0gKiB0aGlzLnggKyBtWyA3IF0gKiB0aGlzLnkgKyBtWyAxMSBdICogdGhpcy56ICsgbVsgMTUgXSAqIHRoaXMud1xuICAgIF0gKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfX25ldyggdjogcmF3VmVjdG9yNCApOiBWZWN0b3I0IHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjQoIHYgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZWN0b3I0KCAwLjAsIDAuMCwgMC4wLCAwLjAgKVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQgemVybygpOiBWZWN0b3I0IHtcbiAgICByZXR1cm4gbmV3IFZlY3RvcjQoIFsgMC4wLCAwLjAsIDAuMCwgMC4wIF0gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWZWN0b3I0KCAxLjAsIDEuMCwgMS4wLCAxLjAgKVxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXQgb25lKCk6IFZlY3RvcjQge1xuICAgIHJldHVybiBuZXcgVmVjdG9yNCggWyAxLjAsIDEuMCwgMS4wLCAxLjAgXSApO1xuICB9XG59XG4iLCIvKipcbiAqIFVzZWZ1bCBmb3Igc3dhcCBidWZmZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFN3YXA8VD4ge1xuICBwdWJsaWMgaTogVDtcbiAgcHVibGljIG86IFQ7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBhOiBULCBiOiBUICkge1xuICAgIHRoaXMuaSA9IGE7XG4gICAgdGhpcy5vID0gYjtcbiAgfVxuXG4gIHB1YmxpYyBzd2FwKCk6IHZvaWQge1xuICAgIGNvbnN0IGkgPSB0aGlzLmk7XG4gICAgdGhpcy5pID0gdGhpcy5vO1xuICAgIHRoaXMubyA9IGk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEhpc3RvcnlNZWFuQ2FsY3VsYXRvciB9IGZyb20gJy4uL0hpc3RvcnlNZWFuQ2FsY3VsYXRvci9IaXN0b3J5TWVhbkNhbGN1bGF0b3InO1xuXG5leHBvcnQgY2xhc3MgVGFwVGVtcG8ge1xuICBwcml2YXRlIF9fYnBtID0gMC4wO1xuICBwcml2YXRlIF9fbGFzdFRhcCA9IDAuMDtcbiAgcHJpdmF0ZSBfX2xhc3RCZWF0ID0gMC4wO1xuICBwcml2YXRlIF9fbGFzdFRpbWUgPSAwLjA7XG4gIHByaXZhdGUgX19jYWxjOiBIaXN0b3J5TWVhbkNhbGN1bGF0b3IgPSBuZXcgSGlzdG9yeU1lYW5DYWxjdWxhdG9yKCAxNiApO1xuXG4gIHB1YmxpYyBnZXQgYmVhdER1cmF0aW9uKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIDYwLjAgLyB0aGlzLl9fYnBtO1xuICB9XG5cbiAgcHVibGljIGdldCBicG0oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fX2JwbTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYnBtKCBicG06IG51bWJlciApIHtcbiAgICB0aGlzLl9fbGFzdEJlYXQgPSB0aGlzLmJlYXQ7XG4gICAgdGhpcy5fX2xhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgdGhpcy5fX2JwbSA9IGJwbTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYmVhdCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9fbGFzdEJlYXQgKyAoIHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5fX2xhc3RUaW1lICkgKiAwLjAwMSAvIHRoaXMuYmVhdER1cmF0aW9uO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX19jYWxjLnJlc2V0KCk7XG4gIH1cblxuICBwdWJsaWMgbnVkZ2UoIGFtb3VudDogbnVtYmVyICk6IHZvaWQge1xuICAgIHRoaXMuX19sYXN0QmVhdCA9IHRoaXMuYmVhdCArIGFtb3VudDtcbiAgICB0aGlzLl9fbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgfVxuXG4gIHB1YmxpYyB0YXAoKTogdm9pZCB7XG4gICAgY29uc3Qgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgZGVsdGEgPSAoIG5vdyAtIHRoaXMuX19sYXN0VGFwICkgKiAwLjAwMTtcblxuICAgIGlmICggMi4wIDwgZGVsdGEgKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX19jYWxjLnB1c2goIGRlbHRhICk7XG4gICAgICB0aGlzLl9fYnBtID0gNjAuMCAvICggdGhpcy5fX2NhbGMubWVhbiApO1xuICAgIH1cblxuICAgIHRoaXMuX19sYXN0VGFwID0gbm93O1xuICAgIHRoaXMuX19sYXN0VGltZSA9IG5vdztcbiAgICB0aGlzLl9fbGFzdEJlYXQgPSAwLjA7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBYb3JzaGlmdCB7XG4gIHB1YmxpYyBzZWVkOiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCBzZWVkPzogbnVtYmVyICkge1xuICAgIHRoaXMuc2VlZCA9IHNlZWQgfHwgMTtcbiAgfVxuXG4gIHB1YmxpYyBnZW4oIHNlZWQ/OiBudW1iZXIgKTogbnVtYmVyIHtcbiAgICBpZiAoIHNlZWQgKSB7XG4gICAgICB0aGlzLnNlZWQgPSBzZWVkO1xuICAgIH1cblxuICAgIHRoaXMuc2VlZCA9IHRoaXMuc2VlZCBeICggdGhpcy5zZWVkIDw8IDEzICk7XG4gICAgdGhpcy5zZWVkID0gdGhpcy5zZWVkIF4gKCB0aGlzLnNlZWQgPj4+IDE3ICk7XG4gICAgdGhpcy5zZWVkID0gdGhpcy5zZWVkIF4gKCB0aGlzLnNlZWQgPDwgNSApO1xuICAgIHJldHVybiB0aGlzLnNlZWQgLyBNYXRoLnBvdyggMiwgMzIgKSArIDAuNTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQoIHNlZWQ/OiBudW1iZXIgKTogdm9pZCB7XG4gICAgdGhpcy5zZWVkID0gc2VlZCB8fCB0aGlzLnNlZWQgfHwgMTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBYb3Jz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VSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtJQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7SUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDOUUsS0FBSyxDQUFDLENBQUM7SUFDUCxDQUFDO0FBQ0Q7SUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0lBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7SUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0lBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FB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QUFFLENBQUM7SUFDeEM7O0lDRkE7OzthQUdnQixXQUFXLENBQUUsQ0FBYTtRQUN4QyxJQUNFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQzFELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFH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LENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFDMUQsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsQ0FBQztRQUU3RCxPQUFPO1lBQ0wsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFFN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7WUFDN0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxH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LENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUMxRCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUU1RCxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2FBQzlFOzs7V0FBQTtRQUtELHNCQUFXLDRCQUFPOzs7O2lCQUFsQjtnQkFDRSxJQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUN4QixJQUNFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQzFELEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQzFELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQ3pELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFDekQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUN6RCxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBRTVELElBQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUVsRixJQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUc7b0JBQUUsT0FBTyxJQUFJLENBQUM7aUJBQUU7Z0JBRW5DLElBQU0sTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBRXpCLE9BQU8sSUFBSSxPQUFPLENBQUU7b0JBQ2xCLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztvQkFDakMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO29CQUNqQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7b0JBQ2pDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztpQkFDbEMsQ0FBQyxHQUFHLENBQUUsVUFBRSxDQUFDLElBQU0sT0FBQSxDQUFDLEdBQUcsTUFBTSxHQUFBLENBQWdCLENBQUUsQ0FBQzthQUM5Qzs7O1dBQUE7UUFFTSwwQkFBUSxHQUFmO1lBQ0UsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsVUFBRSxDQUFDLElBQU0sT0FBQSxDQUFDLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBRSxHQUFBLENBQUUsQ0FBQztZQUN2RCxPQUFPLGNBQWEsQ0FBQyxDQUFFLENBQUMsQ0FBRSxVQUFPLENBQUMsQ0FBRSxDQUFDLENBQUUsVUFBTyxDQUFDLENBQUUsQ0FBQyxDQUFFLFVBQU8sQ0FBQyxDQUFFLEVBQUUsQ0FBRSxVQUFPLENBQUMsQ0FBRSxDQUFDLENBQUUsVUFBTyxDQUFDLENBQUUsQ0FBQyxDQUFFLFVBQU8sQ0FBQyxDQUFFLENBQUMsQ0FBRSxVQUFPLENBQUMsQ0FBRSxFQUFFLENBQUUsVUFBTyxDQUFDLENBQUUsQ0FBQyxDQUFFLFVBQU8sQ0FBQyxDQUFFLENBQUMsQ0FBRSxVQUFPLENBQUMsQ0FBRSxFQUFFLENBQUUsVUFBTyxDQUFDLENBQUUsRUFBRSxDQUFFLFVBQU8sQ0FBQyxDQUFFLENBQUMsQ0FBRSxVQUFPLENBQUMsQ0FBRSxDQUFDLENBQUUsVUFBTyxDQUFDLENBQUUsRUFBRSxDQUFFLFVBQU8sQ0FBQyxDQUFFLEVBQUUsQ0FBRSxPQUFLLENBQUM7U0FDMU87Ozs7UUFLTSx1QkFBSyxHQUFaO1lBQ0UsT0FBTyxJQUFJLE9BQU8sQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBZ0IsQ0FBRSxDQUFDO1NBQzVEOzs7O1FBS00sMEJBQVEsR0FBZjtZQUFpQixrQkFBc0I7aUJBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtnQkFBdEIsNkJBQXNCOztZQUNyQyxJQUFLLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFHO2dCQUMzQixPQUFPLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNyQjtZQUVELElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxFQUFHLENBQUM7WUFDeEIsSUFBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRztnQkFDcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLE9BQWIsSUFBSSwyQkFBYyxHQUFHLEdBQUUsQ0FBQzthQUNoQztZQUVELElBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEIsSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV4QixPQUFPLElBQUksT0FBTyxDQUFFO2dCQUNsQixDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtnQkFDdEUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUU7Z0JBQ3RFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFO2dCQUN2RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtnQkFFdkUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUU7Z0JBQ3RFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFO2dCQUN0RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRTtnQkFDdkUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUU7Z0JBRXZFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFO2dCQUN4RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRTtnQkFDeEUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUU7Z0JBQ3pFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxFQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsRUFBRSxDQUFFO2dCQUV6RSxDQUFDLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFFLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsRUFB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LEVBQUUsQ0FBQyxDQUFFLENBQUMsQ0FBRSxFQUFFLENBQUMsQ0FBRSxFQUFFLENBQUUsQ0FBRSxDQUFFLENBQUMsTUFBTSxDQUFDOztZQUc3RCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzdCLElBQUssR0FBRyxHQUFHLENBQUMsRUFBRztnQkFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7YUFBRTtZQUU1QixJQUFNLEtBQUssR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQU0sS0FBSyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBTSxLQUFLLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUV2QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFcEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFFdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFFdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsSUFBSSxLQUFLLENBQUM7WUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBRSxFQUFFLENBQUUsSUFBSSxLQUFLLENBQUM7WUFFdkMsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxPQUFPLENBQUUsQ0FBRSxDQUFDLENBQUUsRUFBRSxDQUFFLEVBQUUsQ0FBQyxDQUFFLEVBQUUs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QVYsVUFBWSxJQUFhO1lBQ3ZCLElBQUssSUFBSSxFQUFHO2dCQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ2xCO1lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFLLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFFLENBQUM7WUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFFLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBRSxHQUFHLEdBQUcsQ0FBQztTQUM1QztRQUVNLHNCQUFHLEdBQVYsVUFBWSxJQUFhO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1NBQ3BDO1FBQ0gsZUFBQztJQUFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
