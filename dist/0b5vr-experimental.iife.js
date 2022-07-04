/*!
* @0b5vr/experimental v0.9.0
* Experimental edition of 0b5vr
*
* Copyright (c) 2019-2022 0b5vr
* @0b5vr/experimental is distributed under MIT License
* https://github.com/0b5vr/experimental-npm/blob/release/LICENSE
*/
var OBSVR_EXPERIMENTAL = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Box3: () => Box3,
    CDS: () => CDS,
    Clock: () => Clock,
    ClockFrame: () => ClockFrame,
    ClockRealtime: () => ClockRealtime,
    Euler: () => Euler,
    ExpSmooth: () => ExpSmooth,
    GPUTimer: () => GPUTimer,
    HistoryMeanCalculator: () => HistoryMeanCalculator,
    HistoryMedianCalculator: () => HistoryMedianCalculator,
    HistoryPercentileCalculator: () => HistoryPercentileCalculator,
    Line3: () => Line3,
    MapOfSet: () => MapOfSet,
    Matrix3: () => Matrix3,
    Matrix4: () => Matrix4,
    Plane3: () => Plane3,
    Planes3: () => Planes3,
    Pool: () => Pool,
    Quaternion: () => Quaternion,
    Sphere3: () => Sphere3,
    Swap: () => Swap,
    TRIANGLE_STRIP_QUAD: () => TRIANGLE_STRIP_QUAD,
    TRIANGLE_STRIP_QUAD_3D: () => TRIANGLE_STRIP_QUAD_3D,
    TRIANGLE_STRIP_QUAD_NORMAL: () => TRIANGLE_STRIP_QUAD_NORMAL,
    TRIANGLE_STRIP_QUAD_UV: () => TRIANGLE_STRIP_QUAD_UV,
    TapTempo: () => TapTempo,
    Vector: () => Vector,
    Vector3: () => Vector3,
    Vector4: () => Vector4,
    Xorshift: () => Xorshift,
    arraySetAdd: () => arraySetAdd,
    arraySetDelete: () => arraySetDelete,
    arraySetDiff: () => arraySetDiff,
    arraySetHas: () => arraySetHas,
    arraySetUnion: () => arraySetUnion,
    binarySearch: () => binarySearch,
    box3ContainsPoint: () => box3ContainsPoint,
    clamp: () => clamp,
    colorFromAtariST: () => colorFromAtariST,
    colorToHex: () => colorToHex,
    colorTurbo: () => colorTurbo,
    createPokerDeck: () => createPokerDeck,
    dagEdgesAncestors: () => dagEdgesAncestors,
    dagEdgesChildren: () => dagEdgesChildren,
    dagEdgesDescendants: () => dagEdgesDescendants,
    dagEdgesParent: () => dagEdgesParent,
    dagEdgesParents: () => dagEdgesParents,
    dagEdgesResolve: () => dagEdgesResolve,
    edt1d: () => edt1d,
    edt2d: () => edt2d,
    eotfRec709: () => eotfRec709,
    eulerFromMat3: () => eulerFromMat3,
    eulerFromMat4: () => eulerFromMat4,
    eulerFromQuaternion: () => eulerFromQuaternion,
    evaluatePokerHand: () => evaluatePokerHand,
    getYugopText: () => getYugopText,
    lerp: () => lerp,
    line3ApplyMatrix4: () => line3ApplyMatrix4,
    line3At: () => line3At,
    line3ClosestPointToPoint: () => line3ClosestPointToPoint,
    line3Delta: () => line3Delta,
    line3DistanceToPoint: () => line3DistanceToPoint,
    linearstep: () => linearstep,
    mat3CreateNormalMatrix: () => mat3CreateNormalMatrix,
    mat3Determinant: () => mat3Determinant,
    mat3FromMat4: () => mat3FromMat4,
    mat3FromMat4Transpose: () => mat3FromMat4Transpose,
    mat3FromQuaternion: () => mat3FromQuaternion,
    mat3Inverse: () => mat3Inverse,
    mat3Multiply: () => mat3Multiply,
    mat3Transpose: () => mat3Transpose,
    mat4Compose: () => mat4Compose,
    mat4Decompose: () => mat4Decompose,
    mat4Determinant: () => mat4Determinant,
    mat4FromMat3: () => mat4FromMat3,
    mat4FromQuaternion: () => mat4FromQuaternion,
    mat4Inverse: () => mat4Inverse,
    mat4LookAt: () => mat4LookAt,
    mat4LookAtInverse: () => mat4LookAtInverse,
    mat4Multiply: () => mat4Multiply,
    mat4Perspective: () => mat4Perspective,
    mat4RotationX: () => mat4RotationX,
    mat4RotationY: () => mat4RotationY,
    mat4RotationZ: () => mat4RotationZ,
    mat4Scale: () => mat4Scale,
    mat4ScaleScalar: () => mat4ScaleScalar,
    mat4Translate: () => mat4Translate,
    mat4Transpose: () => mat4Transpose,
    matrix2d: () => matrix2d,
    matrix3d: () => matrix3d,
    mod: () => mod,
    oetfRec709: () => oetfRec709,
    parseSTNICCC: () => parseSTNICCC,
    plane3ApplyMatrix4: () => plane3ApplyMatrix4,
    plane3DistanceToPoint: () => plane3DistanceToPoint,
    plane3Normalize: () => plane3Normalize,
    planes3ContainPoint: () => planes3ContainPoint,
    planes3FromBox3: () => planes3FromBox3,
    planes3FromProjectionMatrix: () => planes3FromProjectionMatrix,
    planes3IntersectBox3: () => planes3IntersectBox3,
    planes3IntersectSphere3: () => planes3IntersectSphere3,
    pokerHandStrengthMap: () => pokerHandStrengthMap,
    pokerHandsByStrength: () => pokerHandsByStrength,
    pokerRankStrengthMap: () => pokerRankStrengthMap,
    pokerRanksByStrength: () => pokerRanksByStrength,
    pokerSuitIndexMap: () => pokerSuitIndexMap,
    pokerSuitsByIndex: () => pokerSuitsByIndex,
    quatFromAxisAngle: () => quatFromAxisAngle,
    quatFromEuler: () => quatFromEuler,
    quatFromMatrix3: () => quatFromMatrix3,
    quatFromMatrix4: () => quatFromMatrix4,
    quatInverse: () => quatInverse,
    quatMultiply: () => quatMultiply,
    quatNormalize: () => quatNormalize,
    quatRotationX: () => quatRotationX,
    quatRotationY: () => quatRotationY,
    quatRotationZ: () => quatRotationZ,
    range: () => range,
    sanitizeAngle: () => sanitizeAngle,
    saturate: () => saturate,
    shuffleArray: () => shuffleArray,
    smootherstep: () => smootherstep,
    smootheststep: () => smootheststep,
    smoothstep: () => smoothstep,
    sortPokerCardsByRank: () => sortPokerCardsByRank,
    sphere3ContainsPoint: () => sphere3ContainsPoint,
    stnicccToSVG: () => stnicccToSVG,
    traverse: () => traverse,
    triIndexToLineIndex: () => triIndexToLineIndex,
    vec3ApplyMatrix3: () => vec3ApplyMatrix3,
    vec3ApplyMatrix4: () => vec3ApplyMatrix4,
    vec3ApplyQuaternion: () => vec3ApplyQuaternion,
    vec3Cross: () => vec3Cross,
    vec3OrthoNormalize: () => vec3OrthoNormalize,
    vec4ApplyMatrix3: () => vec4ApplyMatrix3,
    vec4ApplyMatrix4: () => vec4ApplyMatrix4,
    vecAdd: () => vecAdd,
    vecDivide: () => vecDivide,
    vecDot: () => vecDot,
    vecLength: () => vecLength,
    vecLengthSq: () => vecLengthSq,
    vecManhattanLength: () => vecManhattanLength,
    vecMultiply: () => vecMultiply,
    vecNeg: () => vecNeg,
    vecNormalize: () => vecNormalize,
    vecScale: () => vecScale,
    vecSub: () => vecSub
  });

  // src/algorithm/binarySearch.ts
  function binarySearch(array, elementOrCompare) {
    if (typeof elementOrCompare !== "function") {
      return binarySearch(array, (element) => element < elementOrCompare);
    }
    const compare = elementOrCompare;
    let start = 0;
    let end = array.length;
    while (start < end) {
      const center = start + end >> 1;
      const centerElement = array[center];
      const compareResult = compare(centerElement);
      if (compareResult) {
        start = center + 1;
      } else {
        end = center;
      }
    }
    return start;
  }

  // src/algorithm/traverse.ts
  function traverse(root, traverser) {
    const nodesNeedProcess = [root];
    const nodesSeen = new Set(nodesNeedProcess);
    while (nodesNeedProcess.length > 0) {
      const currentNode = nodesNeedProcess.shift();
      const children = traverser(currentNode);
      if (!children) {
        break;
      }
      const nodesFound = children.filter((node) => !nodesSeen.has(node));
      nodesNeedProcess.unshift(...nodesFound);
      nodesFound.map((node) => nodesSeen.add(node));
    }
  }

  // src/array/arraySet.ts
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

  // src/array/constants.ts
  var TRIANGLE_STRIP_QUAD = [-1, -1, 1, -1, -1, 1, 1, 1];
  var TRIANGLE_STRIP_QUAD_3D = [-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0];
  var TRIANGLE_STRIP_QUAD_NORMAL = [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1];
  var TRIANGLE_STRIP_QUAD_UV = [0, 0, 1, 0, 0, 1, 1, 1];

  // src/array/utils.ts
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
  function triIndexToLineIndex(array) {
    const ret = [];
    for (let i = 0; i < array.length / 3; i++) {
      const head = i * 3;
      ret.push(array[head], array[head + 1], array[head + 1], array[head + 2], array[head + 2], array[head]);
    }
    return ret;
  }
  function matrix2d(w, h) {
    const arr = [];
    for (let iy = 0; iy < h; iy++) {
      for (let ix = 0; ix < w; ix++) {
        arr.push(ix, iy);
      }
    }
    return arr;
  }
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

  // src/CDS/CDS.ts
  var CDS = class {
    constructor() {
      this.factor = 100;
      this.ratio = 1;
      this.velocity = 0;
      this.value = 0;
      this.target = 0;
    }
    update(deltaTime) {
      this.velocity += (-this.factor * (this.value - this.target) - 2 * this.velocity * Math.sqrt(this.factor) * this.ratio) * deltaTime;
      this.value += this.velocity * deltaTime;
      return this.value;
    }
  };

  // src/Clock/Clock.ts
  var Clock = class {
    constructor() {
      this.__time = 0;
      this.__deltaTime = 0;
      this.__isPlaying = false;
    }
    get time() {
      return this.__time;
    }
    get deltaTime() {
      return this.__deltaTime;
    }
    get isPlaying() {
      return this.__isPlaying;
    }
    update(time) {
      const prevTime = this.__time;
      this.__time = time || 0;
      this.__deltaTime = this.__time - prevTime;
    }
    play() {
      this.__isPlaying = true;
    }
    pause() {
      this.__isPlaying = false;
    }
    setTime(time) {
      this.__time = time;
    }
  };

  // src/Clock/ClockFrame.ts
  var ClockFrame = class extends Clock {
    constructor(fps = 60) {
      super();
      this.__frame = 0;
      this.__fps = fps;
    }
    get frame() {
      return this.__frame;
    }
    get fps() {
      return this.__fps;
    }
    update() {
      if (this.__isPlaying) {
        this.__time = this.__frame / this.__fps;
        this.__deltaTime = 1 / this.__fps;
        this.__frame++;
      } else {
        this.__deltaTime = 0;
      }
    }
    setTime(time) {
      this.__frame = Math.floor(this.__fps * time);
      this.__time = this.__frame / this.__fps;
    }
  };

  // src/Clock/ClockRealtime.ts
  var ClockRealtime = class extends Clock {
    constructor() {
      super(...arguments);
      this.__rtTime = 0;
      this.__rtDate = performance.now();
    }
    get isRealtime() {
      return true;
    }
    update() {
      const now = performance.now();
      if (this.__isPlaying) {
        const prevTime = this.__time;
        const deltaDate = now - this.__rtDate;
        this.__time = this.__rtTime + deltaDate / 1e3;
        this.__deltaTime = this.time - prevTime;
      } else {
        this.__rtTime = this.time;
        this.__rtDate = now;
        this.__deltaTime = 0;
      }
    }
    setTime(time) {
      this.__time = time;
      this.__rtTime = this.time;
      this.__rtDate = performance.now();
    }
  };

  // src/color/colorFromAtariST.ts
  function colorFromAtariST(stColor) {
    return [
      (stColor >> 8 & 7) / 7,
      (stColor >> 4 & 7) / 7,
      (stColor & 7) / 7
    ];
  }

  // src/math/utils.ts
  function lerp(a, b, x) {
    return a + (b - a) * x;
  }
  function clamp(x, l, h) {
    return Math.min(Math.max(x, l), h);
  }
  function saturate(x) {
    return clamp(x, 0, 1);
  }
  function range(x, x0, x1, y0, y1) {
    return (x - x0) * (y1 - y0) / (x1 - x0) + y0;
  }
  function linearstep(a, b, x) {
    return saturate((x - a) / (b - a));
  }
  function smoothstep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * (3 - 2 * t);
  }
  function smootherstep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function smootheststep(a, b, x) {
    const t = linearstep(a, b, x);
    return t * t * t * t * (t * (t * (-20 * t + 70) - 84) + 35);
  }

  // src/color/colorToHex.ts
  function colorToHex(color) {
    return "#" + color.map((v) => ("0" + Math.round(saturate(v) * 255).toString(16)).slice(-2)).join("");
  }

  // src/math/vec/vecDot.ts
  function vecDot(vecA, vecB) {
    return vecA.reduce((sum, v, i) => sum + v * vecB[i], 0);
  }

  // src/color/colorTurbo.ts
  function colorTurbo(x) {
    const kr = [
      0.13572138,
      4.6153926,
      -42.66032258,
      132.13108234,
      -152.94239396,
      59.28637943
    ];
    const kg = [
      0.09140261,
      2.19418839,
      4.84296658,
      -14.18503333,
      4.27729857,
      2.82956604
    ];
    const kb = [
      0.1066733,
      12.64194608,
      -60.58204836,
      110.36276771,
      -89.90310912,
      27.34824973
    ];
    const xt = saturate(x);
    const xv = [
      1,
      xt,
      xt * xt,
      xt * xt * xt,
      xt * xt * xt * xt,
      xt * xt * xt * xt * xt
    ];
    const col = [
      saturate(vecDot(kr, xv)),
      saturate(vecDot(kg, xv)),
      saturate(vecDot(kb, xv))
    ];
    return col;
  }

  // src/color/eotfRec709.ts
  function eotfRec709(value) {
    return value.map((v) => v < 0.081 ? v / 4.5 : Math.pow((v + 0.099) / 1.099, 1 / 0.45));
  }

  // src/color/oetfRec709.ts
  function oetfRec709(luminance) {
    return luminance.map((l) => l < 0.018 ? 4.5 * l : 1.099 * Math.pow(l, 0.45) - 0.099);
  }

  // src/dag/dagEdgesParents.ts
  function dagEdgesParents(edges, destination) {
    return edges.filter((edge) => edge[1] === destination).map((edge) => edge[0]);
  }

  // src/dag/dagEdgesAncestors.ts
  function dagEdgesAncestors(edges, destination) {
    const ancestors = /* @__PURE__ */ new Set();
    traverse(destination, (node) => {
      const parents = dagEdgesParents(edges, node);
      parents.map((parent) => ancestors.add(parent));
      return parents;
    });
    return Array.from(ancestors);
  }

  // src/dag/dagEdgesChildren.ts
  function dagEdgesChildren(edges, source) {
    return edges.filter((edge) => edge[0] === source).map((edge) => edge[1]);
  }

  // src/dag/dagEdgesDescendants.ts
  function dagEdgesDescendants(edges, source) {
    const descendants = /* @__PURE__ */ new Set();
    traverse(source, (node) => {
      const children = dagEdgesChildren(edges, node);
      children.map((child) => descendants.add(child));
      return children;
    });
    return Array.from(descendants);
  }

  // src/dag/dagEdgesParent.ts
  function dagEdgesParent(edges, destination) {
    var _a, _b;
    return (_b = (_a = edges.find((edge) => edge[1] === destination)) == null ? void 0 : _a[0]) != null ? _b : null;
  }

  // src/dag/dagEdgesResolve.ts
  function dagEdgesResolve(edges, nodes) {
    const order = [];
    const nodeSet = new Set(nodes);
    let tempEdges = edges.concat();
    while (tempEdges.length > 0) {
      nodeSet.forEach((node) => {
        const hasParents = dagEdgesParent(tempEdges, node) != null;
        if (!hasParents) {
          nodeSet.delete(node);
          order.push(node);
          tempEdges = tempEdges.filter(([src]) => src !== node);
        }
      });
    }
    return order.concat(Array.from(nodeSet));
  }

  // src/edt/edt.ts
  function edt1d(data, offset, stride, length) {
    let k = 0;
    const v = new Float32Array(length);
    v[0] = 0;
    const z = new Float32Array(length + 1);
    z[0] = -Infinity;
    z[1] = Infinity;
    const f = new Float32Array(length);
    for (let q = 0; q < length; q++) {
      f[q] = data[offset + q * stride];
    }
    for (let q = 1; q < length; q++) {
      let s = 0;
      while (0 <= k) {
        s = (f[q] + q * q - f[v[k]] - v[k] * v[k]) / (2 * q - 2 * v[k]);
        if (s <= z[k]) {
          k--;
        } else {
          break;
        }
      }
      k++;
      v[k] = q;
      z[k] = s;
      z[k + 1] = Infinity;
    }
    k = 0;
    for (let q = 0; q < length; q++) {
      while (z[k + 1] < q) {
        k++;
      }
      const qSubVK = q - v[k];
      data[offset + q * stride] = f[v[k]] + qSubVK * qSubVK;
    }
  }
  function edt2d(data, width, height) {
    for (let x = 0; x < width; x++) {
      edt1d(data, x, width, height);
    }
    for (let y = 0; y < height; y++) {
      edt1d(data, y * width, 1, width);
    }
  }

  // src/ExpSmooth/ExpSmooth.ts
  var ExpSmooth = class {
    constructor() {
      this.factor = 10;
      this.target = 0;
      this.value = 0;
    }
    update(deltaTime) {
      this.value = lerp(this.target, this.value, Math.exp(-this.factor * deltaTime));
      return this.value;
    }
  };

  // src/Pool/Pool.ts
  var Pool = class {
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
  };

  // src/GPUTimer/GPUTimer.ts
  var GPUTimer = class {
    static isSupported(gl) {
      return new Set(gl.getSupportedExtensions()).has("EXT_disjoint_timer_query_webgl2");
    }
    constructor(gl) {
      this.gl = gl;
      const queries = new Array(1024).fill(1).map(() => gl.createQuery());
      this.queries = new Pool(queries);
      this.stack = [];
      this.ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
      this.__loopTasks = /* @__PURE__ */ new Set();
      const update = () => {
        this.update();
        requestAnimationFrame(update);
      };
      update();
    }
    update() {
      Array.from(this.__loopTasks).forEach((task) => task());
    }
    measure(func) {
      return __async(this, null, function* () {
        const { gl } = this;
        if (this.stack.length !== 0) {
          gl.endQuery(this.ext.TIME_ELAPSED_EXT);
          const promiseFinishingPrev = this.check(this.queries.current);
          this.stack = this.stack.map((promiseAccum2) => __async(this, null, function* () {
            return (yield promiseAccum2) + (yield promiseFinishingPrev);
          }));
        }
        this.stack.push(Promise.resolve(0));
        gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.queries.next());
        func();
        gl.endQuery(this.ext.TIME_ELAPSED_EXT);
        const promiseAccum = this.stack.pop();
        const promiseThis = this.check(this.queries.current);
        if (this.stack.length !== 0) {
          this.stack = this.stack.map((promiseAccum2) => __async(this, null, function* () {
            return (yield promiseAccum2) + (yield promiseThis);
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
            resolve(gl.getQueryParameter(query, gl.QUERY_RESULT) * 1e-3 * 1e-3);
          }
        };
        this.__loopTasks.add(task);
      });
    }
  };

  // src/HistoryMeanCalculator/HistoryMeanCalculator.ts
  var HistoryMeanCalculator = class {
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
      return count === 0 ? 0 : this.__cache / count;
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
      } else {
        this.__countUntilRecalc--;
        this.__cache -= prev;
        this.__cache += value;
      }
    }
    recalc() {
      this.__countUntilRecalc = this.__recalcForEach;
      const sum = this.__history.slice(0, Math.min(this.__count, this.__length)).reduce((sum2, v) => sum2 + v, 0);
      this.__cache = sum;
    }
  };

  // src/HistoryMeanCalculator/HistoryPercentileCalculator.ts
  var HistoryPercentileCalculator = class {
    constructor(length) {
      this.__history = [];
      this.__sorted = [];
      this.__index = 0;
      this.__length = length;
    }
    get median() {
      return this.percentile(50);
    }
    percentile(percentile) {
      if (this.__history.length === 0) {
        return 0;
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
      if (this.__sorted.length === this.__length) {
        const prevIndex = binarySearch(this.__sorted, prev);
        this.__sorted.splice(prevIndex, 1);
      }
      const index = binarySearch(this.__sorted, value);
      this.__sorted.splice(index, 0, value);
    }
  };

  // src/HistoryMeanCalculator/HistoryMedianCalculator.ts
  var HistoryMedianCalculator = class extends HistoryPercentileCalculator {
    constructor(length) {
      super(length);
      console.warn("HistoryMedianCalculator: Deprecated. Use HistoryPercentileCalculator instead");
    }
  };

  // src/MapOfSet/MapOfSet.ts
  var MapOfSet = class {
    constructor() {
      this.map = /* @__PURE__ */ new Map();
    }
    get(key) {
      var _a;
      return (_a = this.map.get(key)) != null ? _a : /* @__PURE__ */ new Set();
    }
    add(key, value) {
      let set = this.map.get(key);
      if (set == null) {
        set = /* @__PURE__ */ new Set();
        this.map.set(key, set);
      }
      set.add(value);
    }
  };

  // src/math/vec/vecAdd.ts
  function vecAdd(...vecs) {
    if (vecs.length < 2) {
      return vecs[0];
    }
    const a = vecs.shift();
    const b = vecAdd(...vecs);
    return a.map((v, i) => v + b[i]);
  }

  // src/math/vec/vecDivide.ts
  function vecDivide(vecA, vecB) {
    return vecA.map((v, i) => v / vecB[i]);
  }

  // src/math/vec/vecLength.ts
  function vecLength(vec) {
    return Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
  }

  // src/math/vec/vecLengthSq.ts
  function vecLengthSq(vec) {
    return vec.reduce((sum, v) => sum + v * v, 0);
  }

  // src/math/vec/vecManhattanLength.ts
  function vecManhattanLength(vec) {
    return vec.reduce((sum, v) => sum + Math.abs(v), 0);
  }

  // src/math/vec/vecMultiply.ts
  function vecMultiply(...vecs) {
    if (vecs.length < 2) {
      return vecs[0];
    }
    const a = vecs.shift();
    const b = vecMultiply(...vecs);
    return a.map((v, i) => v * b[i]);
  }

  // src/math/vec/vecNeg.ts
  function vecNeg(vec) {
    return vec.map((v) => -v);
  }

  // src/math/vec/vecScale.ts
  function vecScale(vec, scalar) {
    return vec.map((v) => v * scalar);
  }

  // src/math/vec/vecNormalize.ts
  function vecNormalize(vec) {
    const len = vecLength(vec);
    const invLen = len === 0 ? 0 : 1 / len;
    return vecScale(vec, invLen);
  }

  // src/math/vec/vecSub.ts
  function vecSub(vecA, vecB) {
    return vecA.map((v, i) => v - vecB[i]);
  }

  // src/math/vec/Vector.ts
  var Vector = class {
    get length() {
      return vecLength(this.elements);
    }
    get lengthSq() {
      return vecLengthSq(this.elements);
    }
    get manhattanLength() {
      return vecManhattanLength(this.elements);
    }
    get normalized() {
      return this.__new(vecNormalize(this.elements));
    }
    get negated() {
      return this.__new(vecNeg(this.elements));
    }
    clone() {
      return this.__new(this.elements.concat());
    }
    add(...vectors) {
      return this.__new(vecAdd(this.elements, ...vectors.map((v) => v.elements)));
    }
    sub(vector) {
      return this.__new(vecSub(this.elements, vector.elements));
    }
    multiply(...vectors) {
      return this.__new(vecMultiply(this.elements, ...vectors.map((v) => v.elements)));
    }
    divide(vector) {
      return this.__new(vecDivide(this.elements, vector.elements));
    }
    scale(scalar) {
      return this.__new(vecScale(this.elements, scalar));
    }
    dot(vector) {
      return vecDot(this.elements, vector.elements);
    }
  };

  // src/math/vec4/vec4ApplyMatrix4.ts
  function vec4ApplyMatrix4(v, m) {
    return [
      m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
      m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
      m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
      m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3]
    ];
  }

  // src/math/vec3/vec3ApplyMatrix4.ts
  function vec3ApplyMatrix4(v, m) {
    const vec4 = vec4ApplyMatrix4([...v, 1], m);
    const xyz = [vec4[0], vec4[1], vec4[2]];
    const w = vec4[3];
    return vecScale(xyz, 1 / w);
  }

  // src/math/quat/quatInverse.ts
  function quatInverse(quat) {
    return [-quat[0], -quat[1], -quat[2], quat[3]];
  }

  // src/math/quat/quatMultiply.ts
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
      a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2]
    ];
  }

  // src/math/vec3/vec3ApplyQuaternion.ts
  function vec3ApplyQuaternion(vec, quat) {
    const p = [...vec, 0];
    const r = quatInverse(quat);
    const res = quatMultiply(quat, p, r);
    res.pop();
    return res;
  }

  // src/math/vec3/vec3Cross.ts
  function vec3Cross(vecA, vecB) {
    return [
      vecA[1] * vecB[2] - vecA[2] * vecB[1],
      vecA[2] * vecB[0] - vecA[0] * vecB[2],
      vecA[0] * vecB[1] - vecA[1] * vecB[0]
    ];
  }

  // src/math/vec3/vec3OrthoNormalize.ts
  function vec3OrthoNormalize(normal, tangent = [0, 1, 0], binormal) {
    const n = vecNormalize(normal);
    let t = vecNormalize(tangent);
    let dotNT = vecDot(n, t);
    if (dotNT === 1) {
      if (Math.abs(n[1]) > Math.abs(n[2])) {
        t = [0, 0, 1];
      } else {
        t = [0, 1, 0];
      }
      dotNT = vecDot(n, t);
    }
    t = vecNormalize(vecSub(t, vecScale(n, dotNT)));
    let b = vec3Cross(t, n);
    if (binormal && vecDot(b, binormal) < 0) {
      b = vecNeg(b);
    }
    return {
      normal: n,
      tangent: t,
      binormal: b
    };
  }

  // src/math/vec3/Vector3.ts
  var Vector3 = class extends Vector {
    constructor(v = [0, 0, 0]) {
      super();
      this.elements = v;
    }
    get x() {
      return this.elements[0];
    }
    set x(x) {
      this.elements[0] = x;
    }
    get y() {
      return this.elements[1];
    }
    set y(y) {
      this.elements[1] = y;
    }
    get z() {
      return this.elements[2];
    }
    set z(z) {
      this.elements[2] = z;
    }
    toString() {
      return `Vector3( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)} )`;
    }
    cross(vector) {
      return new Vector3(vec3Cross(this.elements, vector.elements));
    }
    applyQuaternion(quaternion) {
      return new Vector3(vec3ApplyQuaternion(this.elements, quaternion.elements));
    }
    applyMatrix4(matrix) {
      return new Vector3(vec3ApplyMatrix4(this.elements, matrix.elements));
    }
    __new(v) {
      return new Vector3(v);
    }
    static get zero() {
      return new Vector3([0, 0, 0]);
    }
    static get px() {
      return new Vector3([1, 0, 0]);
    }
    static get nx() {
      return new Vector3([-1, 0, 0]);
    }
    static get py() {
      return new Vector3([0, 1, 0]);
    }
    static get ny() {
      return new Vector3([0, -1, 0]);
    }
    static get pz() {
      return new Vector3([0, 0, 1]);
    }
    static get nz() {
      return new Vector3([0, 0, -1]);
    }
    static get one() {
      return new Vector3([1, 1, 1]);
    }
    static orthoNormalize(normal, tangent, binormal) {
      const result = vec3OrthoNormalize(normal.elements, tangent.elements, binormal.elements);
      return {
        normal: new Vector3(result.normal),
        tangent: new Vector3(result.tangent),
        binormal: new Vector3(result.binormal)
      };
    }
  };

  // src/math/box3/box3ContainsPoint.ts
  function box3ContainsPoint(box, point) {
    return box[0][0] <= point[0] && box[1][0] >= point[0] && box[0][1] <= point[1] && box[1][1] >= point[1] && box[0][2] <= point[2] && box[1][2] >= point[2];
  }

  // src/math/box3/Box3.ts
  var Box3 = class {
    constructor(min = Vector3.zero, max = Vector3.zero) {
      this.min = min;
      this.max = max;
    }
    get raw() {
      return [this.min.elements, this.max.elements];
    }
    containsPoint(point) {
      return box3ContainsPoint(this.raw, point.elements);
    }
    static fromRaw(box) {
      return new Box3(new Vector3(box[0]), new Vector3(box[1]));
    }
  };

  // src/math/mat3/mat3FromMat4Transpose.ts
  function mat3FromMat4Transpose(source) {
    return [
      source[0],
      source[4],
      source[8],
      source[1],
      source[5],
      source[9],
      source[2],
      source[6],
      source[10]
    ];
  }

  // src/math/mat3/mat3Inverse.ts
  function mat3Inverse(m) {
    const n11 = m[0], n21 = m[1], n31 = m[2], n12 = m[3], n22 = m[4], n32 = m[5], n13 = m[6], n23 = m[7], n33 = m[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;
    if (det === 0) {
      return vecScale(m, 0);
    }
    return vecScale([
      t11,
      n31 * n23 - n33 * n21,
      n32 * n21 - n31 * n22,
      t12,
      n33 * n11 - n31 * n13,
      n31 * n12 - n32 * n11,
      t13,
      n21 * n13 - n23 * n11,
      n22 * n11 - n21 * n12
    ], 1 / det);
  }

  // src/math/mat3/mat3CreateNormalMatrix.ts
  function mat3CreateNormalMatrix(m) {
    return mat3Inverse(mat3FromMat4Transpose(m));
  }

  // src/math/mat3/mat3Determinant.ts
  function mat3Determinant(m) {
    const n11 = m[0], n21 = m[1], n31 = m[2], n12 = m[3], n22 = m[4], n32 = m[5], n13 = m[6], n23 = m[7], n33 = m[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13;
    return n11 * t11 + n21 * t12 + n31 * t13;
  }

  // src/math/mat3/mat3FromMat4.ts
  function mat3FromMat4(source) {
    return [
      source[0],
      source[1],
      source[2],
      source[4],
      source[5],
      source[6],
      source[8],
      source[9],
      source[10]
    ];
  }

  // src/math/mat3/mat3FromQuaternion.ts
  function mat3FromQuaternion(quat) {
    const x = quat[0];
    const y = quat[1];
    const z = quat[2];
    const w = quat[3];
    return [
      1 - 2 * y * y - 2 * z * z,
      2 * x * y + 2 * z * w,
      2 * x * z - 2 * y * w,
      2 * x * y - 2 * z * w,
      1 - 2 * x * x - 2 * z * z,
      2 * y * z + 2 * x * w,
      2 * x * z + 2 * y * w,
      2 * y * z - 2 * x * w,
      1 - 2 * x * x - 2 * y * y
    ];
  }

  // src/math/mat3/mat3Multiply.ts
  function mat3Multiply(...mats) {
    if (mats.length < 2) {
      return mats[0];
    }
    const a = mats.shift();
    const b = mat3Multiply(...mats);
    const a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], b00 = b[0], b01 = b[1], b02 = b[2], b10 = b[3], b11 = b[4], b12 = b[5], b20 = b[6], b21 = b[7], b22 = b[8];
    return [
      a00 * b00 + a10 * b01 + a20 * b02,
      a01 * b00 + a11 * b01 + a21 * b02,
      a02 * b00 + a12 * b01 + a22 * b02,
      a00 * b10 + a10 * b11 + a20 * b12,
      a01 * b10 + a11 * b11 + a21 * b12,
      a02 * b10 + a12 * b11 + a22 * b12,
      a00 * b20 + a10 * b21 + a20 * b22,
      a01 * b20 + a11 * b21 + a21 * b22,
      a02 * b20 + a12 * b21 + a22 * b22
    ];
  }

  // src/math/mat3/mat3Transpose.ts
  function mat3Transpose(source) {
    return [
      source[0],
      source[3],
      source[6],
      source[1],
      source[4],
      source[7],
      source[2],
      source[5],
      source[8]
    ];
  }

  // src/math/mat3/Matrix3.ts
  var rawIdentityMatrix3 = [
    1,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    1
  ];
  var Matrix3 = class {
    constructor(v = rawIdentityMatrix3) {
      this.elements = v;
    }
    get transpose() {
      return new Matrix3(mat3Transpose(this.elements));
    }
    get determinant() {
      return mat3Determinant(this.elements);
    }
    get inverse() {
      return new Matrix3(mat3Inverse(this.elements));
    }
    get matrix4() {
      return Matrix4.fromMatrix3(this);
    }
    toString() {
      const m = this.elements.map((v) => v.toFixed(3));
      return `Matrix3( ${m[0]}, ${m[3]}, ${m[6]}; ${m[1]}, ${m[4]}, ${m[7]}; ${m[2]}, ${m[5]}, ${m[8]} )`;
    }
    clone() {
      return new Matrix3(this.elements.concat());
    }
    multiply(...matrices) {
      return Matrix3.multiply(this, ...matrices);
    }
    scaleScalar(scalar) {
      return new Matrix3(vecScale(this.elements, scalar));
    }
    static get identity() {
      return new Matrix3(rawIdentityMatrix3);
    }
    static multiply(...matrices) {
      if (matrices.length === 0) {
        return Matrix3.identity;
      } else {
        return new Matrix3(mat3Multiply(...matrices.map((m) => m.elements)));
      }
    }
    static createNormalMatrix(matrix4) {
      return new Matrix3(mat3CreateNormalMatrix(matrix4.elements));
    }
    static fromMatrix4(matrix4) {
      return new Matrix3(mat3FromMat4(matrix4.elements));
    }
    static fromQuaternion(quaternion) {
      return new Matrix3(mat3FromQuaternion(quaternion.elements));
    }
  };

  // src/math/mat4/mat4FromQuaternion.ts
  function mat4FromQuaternion(quat) {
    const x = quat[0];
    const y = quat[1];
    const z = quat[2];
    const w = quat[3];
    return [
      1 - 2 * y * y - 2 * z * z,
      2 * x * y + 2 * z * w,
      2 * x * z - 2 * y * w,
      0,
      2 * x * y - 2 * z * w,
      1 - 2 * x * x - 2 * z * z,
      2 * y * z + 2 * x * w,
      0,
      2 * x * z + 2 * y * w,
      2 * y * z - 2 * x * w,
      1 - 2 * x * x - 2 * y * y,
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4Compose.ts
  function mat4Compose(position, rotation, scale) {
    const matRot = mat4FromQuaternion(rotation);
    const sx = scale[0], sy = scale[1], sz = scale[2];
    return [
      matRot[0] * sx,
      matRot[1] * sx,
      matRot[2] * sx,
      0,
      matRot[4] * sy,
      matRot[5] * sy,
      matRot[6] * sy,
      0,
      matRot[8] * sz,
      matRot[9] * sz,
      matRot[10] * sz,
      0,
      position[0],
      position[1],
      position[2],
      1
    ];
  }

  // src/math/mat4/mat4Determinant.ts
  function mat4Determinant(m) {
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
  }

  // src/math/quat/quatFromMatrix3.ts
  function quatFromMatrix3(m) {
    const m11 = m[0], m12 = m[3], m13 = m[6], m21 = m[1], m22 = m[4], m23 = m[7], m31 = m[2], m32 = m[5], m33 = m[8], trace = m11 + m22 + m33;
    if (trace > 0) {
      const s = 0.5 / Math.sqrt(trace + 1);
      return [
        (m32 - m23) * s,
        (m13 - m31) * s,
        (m21 - m12) * s,
        0.25 / s
      ];
    } else if (m11 > m22 && m11 > m33) {
      const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
      return [
        0.25 * s,
        (m12 + m21) / s,
        (m13 + m31) / s,
        (m32 - m23) / s
      ];
    } else if (m22 > m33) {
      const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
      return [
        (m12 + m21) / s,
        0.25 * s,
        (m23 + m32) / s,
        (m13 - m31) / s
      ];
    } else {
      const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
      return [
        (m13 + m31) / s,
        (m23 + m32) / s,
        0.25 * s,
        (m21 - m12) / s
      ];
    }
  }

  // src/math/quat/quatFromMatrix4.ts
  function quatFromMatrix4(m) {
    return quatFromMatrix3(mat3FromMat4(m));
  }

  // src/math/mat4/mat4Decompose.ts
  function mat4Decompose(m) {
    let sx = vecLength([m[0], m[1], m[2]]);
    const sy = vecLength([m[4], m[5], m[6]]);
    const sz = vecLength([m[8], m[9], m[10]]);
    const det = mat4Determinant(m);
    if (det < 0) {
      sx = -sx;
    }
    const invSx = 1 / sx;
    const invSy = 1 / sy;
    const invSz = 1 / sz;
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
      rotation: quatFromMatrix4(rotationMatrix)
    };
  }

  // src/math/mat4/mat4FromMat3.ts
  function mat4FromMat3(source) {
    return [
      source[0],
      source[1],
      source[2],
      0,
      source[3],
      source[4],
      source[5],
      0,
      source[6],
      source[7],
      source[8],
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4Inverse.ts
  function mat4Inverse(m) {
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3], a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7], a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11], a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
    const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (det === 0) {
      return vecScale(m, 0);
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
      a20 * b03 - a21 * b01 + a22 * b00
    ], 1 / det);
  }

  // src/math/mat4/mat4LookAt.ts
  function mat4LookAt(position, target = [0, 0, 0], up = [0, 1, 0], roll = 0) {
    const dir = vecNormalize(vecSub(position, target));
    let sid = vecNormalize(vec3Cross(up, dir));
    if (roll !== 0) {
      sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
    }
    const top = vec3Cross(dir, sid);
    return [
      sid[0],
      sid[1],
      sid[2],
      0,
      top[0],
      top[1],
      top[2],
      0,
      dir[0],
      dir[1],
      dir[2],
      0,
      position[0],
      position[1],
      position[2],
      1
    ];
  }

  // src/math/mat4/mat4LookAtInverse.ts
  function mat4LookAtInverse(position, target = [0, 0, 0], up = [0, 1, 0], roll = 0) {
    const dir = vecNormalize(vecSub(position, target));
    let sid = vecNormalize(vec3Cross(up, dir));
    if (roll !== 0) {
      sid = vecAdd(vecScale(sid, Math.cos(roll)), vecScale(vec3Cross(dir, sid), Math.sin(roll)));
    }
    const top = vec3Cross(dir, sid);
    return [
      sid[0],
      top[0],
      dir[0],
      0,
      sid[1],
      top[1],
      dir[1],
      0,
      sid[2],
      top[2],
      dir[2],
      0,
      -vecDot(sid, position),
      -vecDot(top, position),
      -vecDot(dir, position),
      1
    ];
  }

  // src/math/mat4/mat4Multiply.ts
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
      a03 * b30 + a13 * b31 + a23 * b32 + a33 * b33
    ];
  }

  // src/math/mat4/mat4Perspective.ts
  function mat4Perspective(fov = 45, near = 0.01, far = 100, aspect = 1) {
    const p = 1 / Math.tan(fov * Math.PI / 360);
    const d = far - near;
    return [
      p / aspect,
      0,
      0,
      0,
      0,
      p,
      0,
      0,
      0,
      0,
      -(far + near) / d,
      -1,
      0,
      0,
      -2 * far * near / d,
      0
    ];
  }

  // src/math/mat4/mat4RotationX.ts
  function mat4RotationX(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
      1,
      0,
      0,
      0,
      0,
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4RotationY.ts
  function mat4RotationY(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
      c,
      0,
      s,
      0,
      0,
      1,
      0,
      0,
      -s,
      0,
      c,
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4RotationZ.ts
  function mat4RotationZ(theta) {
    const c = Math.cos(theta);
    const s = Math.sin(theta);
    return [
      c,
      -s,
      0,
      0,
      s,
      c,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4Scale.ts
  function mat4Scale(vec) {
    return [
      vec[0],
      0,
      0,
      0,
      0,
      vec[1],
      0,
      0,
      0,
      0,
      vec[2],
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4ScaleScalar.ts
  function mat4ScaleScalar(scalar) {
    return [
      scalar,
      0,
      0,
      0,
      0,
      scalar,
      0,
      0,
      0,
      0,
      scalar,
      0,
      0,
      0,
      0,
      1
    ];
  }

  // src/math/mat4/mat4Translate.ts
  function mat4Translate(vec) {
    return [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      vec[0],
      vec[1],
      vec[2],
      1
    ];
  }

  // src/math/mat4/mat4Transpose.ts
  function mat4Transpose(m) {
    return [
      m[0],
      m[4],
      m[8],
      m[12],
      m[1],
      m[5],
      m[9],
      m[13],
      m[2],
      m[6],
      m[10],
      m[14],
      m[3],
      m[7],
      m[11],
      m[15]
    ];
  }

  // src/math/mat4/Matrix4.ts
  var rawIdentityMatrix4 = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
  ];
  var Matrix4 = class {
    constructor(v = rawIdentityMatrix4) {
      this.elements = v;
    }
    get transpose() {
      return new Matrix4(mat4Transpose(this.elements));
    }
    get determinant() {
      return mat4Determinant(this.elements);
    }
    get inverse() {
      return new Matrix4(mat4Inverse(this.elements));
    }
    get matrix3() {
      return Matrix3.fromMatrix4(this);
    }
    get normalMatrix() {
      return Matrix3.createNormalMatrix(this);
    }
    toString() {
      const m = this.elements.map((v) => v.toFixed(3));
      return `Matrix4( ${m[0]}, ${m[4]}, ${m[8]}, ${m[12]}; ${m[1]}, ${m[5]}, ${m[9]}, ${m[13]}; ${m[2]}, ${m[6]}, ${m[10]}, ${m[14]}; ${m[3]}, ${m[7]}, ${m[11]}, ${m[15]} )`;
    }
    clone() {
      return new Matrix4(this.elements.concat());
    }
    multiply(...matrices) {
      return Matrix4.multiply(this, ...matrices);
    }
    scaleScalar(scalar) {
      return new Matrix4(vecScale(this.elements, scalar));
    }
    decompose() {
      const { position, scale, rotation } = mat4Decompose(this.elements);
      return {
        position: new Vector3(position),
        scale: new Vector3(scale),
        rotation: new Quaternion(rotation)
      };
    }
    static get identity() {
      return new Matrix4(rawIdentityMatrix4);
    }
    static multiply(...matrices) {
      if (matrices.length === 0) {
        return Matrix4.identity;
      } else {
        return new Matrix4(mat4Multiply(...matrices.map((m) => m.elements)));
      }
    }
    static fromQuaternion(quaternion) {
      return new Matrix4(mat4FromQuaternion(quaternion.elements));
    }
    static fromMatrix3(matrix3) {
      return new Matrix4(mat4FromMat3(matrix3.elements));
    }
    static translate(vector) {
      return new Matrix4(mat4Translate(vector.elements));
    }
    static scale(vector) {
      return new Matrix4(mat4Scale(vector.elements));
    }
    static scaleScalar(scalar) {
      return new Matrix4(mat4ScaleScalar(scalar));
    }
    static rotationX(theta) {
      return new Matrix4(mat4RotationX(theta));
    }
    static rotationY(theta) {
      return new Matrix4(mat4RotationY(theta));
    }
    static rotationZ(theta) {
      return new Matrix4(mat4RotationZ(theta));
    }
    static lookAt(position, target = new Vector3([0, 0, 0]), up = new Vector3([0, 1, 0]), roll = 0) {
      return new Matrix4(mat4LookAt(position.elements, target.elements, up.elements, roll));
    }
    static lookAtInverse(position, target = new Vector3([0, 0, 0]), up = new Vector3([0, 1, 0]), roll = 0) {
      return new Matrix4(mat4LookAtInverse(position.elements, target.elements, up.elements, roll));
    }
    static perspective(fov = 45, near = 0.01, far = 100) {
      return new Matrix4(mat4Perspective(fov, near, far));
    }
    static compose(position, rotation, scale) {
      return new Matrix4(mat4Compose(position.elements, rotation.elements, scale.elements));
    }
  };

  // src/math/quat/quatFromAxisAngle.ts
  function quatFromAxisAngle(axis, angle) {
    const halfAngle = angle / 2;
    const sinHalfAngle = Math.sin(halfAngle);
    return [
      axis[0] * sinHalfAngle,
      axis[1] * sinHalfAngle,
      axis[2] * sinHalfAngle,
      Math.cos(halfAngle)
    ];
  }

  // src/math/quat/quatLookRotation.ts
  function quatLookRotation(look, up) {
    const { normal, tangent, binormal } = vec3OrthoNormalize(look, up != null ? up : [0, 1, 0]);
    const w = Math.sqrt(1 + binormal[0] + tangent[1] + normal[2]) * 0.5;
    const invW4 = 0.25 / w;
    return [
      (tangent[2] - normal[1]) * invW4,
      (normal[0] - binormal[2]) * invW4,
      (binormal[1] - tangent[0]) * invW4,
      w
    ];
  }

  // src/math/quat/quatNormalize.ts
  function quatNormalize(vec) {
    const len = vecLength(vec);
    if (len === 0) {
      return [0, 0, 0, 1];
    }
    return vecScale(vec, 1 / len);
  }

  // src/math/quat/quatRotationX.ts
  function quatRotationX(theta) {
    return [Math.sin(theta / 2), 0, 0, Math.cos(theta / 2)];
  }

  // src/math/quat/quatRotationY.ts
  function quatRotationY(theta) {
    return [0, Math.sin(theta / 2), 0, Math.cos(theta / 2)];
  }

  // src/math/quat/quatRotationZ.ts
  function quatRotationZ(theta) {
    return [0, 0, Math.sin(theta / 2), Math.cos(theta / 2)];
  }

  // src/math/quat/quatSlerp.ts
  function quatSlerp(a, b, t) {
    if (t === 0) {
      return a.concat();
    }
    if (t === 1) {
      return b.concat();
    }
    let cosHalfTheta = vecDot(a, b);
    if (cosHalfTheta < 0) {
      b = vecNeg(b);
      cosHalfTheta = -cosHalfTheta;
    }
    if (cosHalfTheta >= 1) {
      return a.concat();
    }
    const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;
    if (sqrSinHalfTheta <= Number.EPSILON) {
      const s = 1 - t;
      return vecNormalize([
        s * a[0] + t * b[0],
        s * a[1] + t * b[1],
        s * a[2] + t * b[2],
        s * a[3] + t * b[3]
      ]);
    }
    const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
    const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
    const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
    return [
      a[0] * ratioA + b[0] * ratioB,
      a[1] * ratioA + b[1] * ratioB,
      a[2] * ratioA + b[2] * ratioB,
      a[3] * ratioA + b[3] * ratioB
    ];
  }

  // src/math/quat/Quaternion.ts
  var rawIdentityQuaternion = [0, 0, 0, 1];
  var Quaternion = class {
    constructor(elements = rawIdentityQuaternion) {
      this.elements = elements;
    }
    get x() {
      return this.elements[0];
    }
    get y() {
      return this.elements[1];
    }
    get z() {
      return this.elements[2];
    }
    get w() {
      return this.elements[3];
    }
    toString() {
      return `Quaternion( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)} )`;
    }
    clone() {
      return new Quaternion(this.elements.concat());
    }
    get matrix4() {
      return new Matrix4(mat4FromQuaternion(this.elements));
    }
    get inversed() {
      return new Quaternion(quatInverse(this.elements));
    }
    get length() {
      return vecLength(this.elements);
    }
    get lengthSq() {
      return vecLengthSq(this.elements);
    }
    get normalized() {
      return new Quaternion(quatNormalize(this.elements));
    }
    multiply(...quaternions) {
      return Quaternion.multiply(this, ...quaternions);
    }
    slerp(b, t) {
      return Quaternion.slerp(this, b, t);
    }
    static get identity() {
      return new Quaternion(rawIdentityQuaternion);
    }
    static multiply(...quaternions) {
      if (quaternions.length === 0) {
        return Quaternion.identity;
      } else {
        return new Quaternion(quatMultiply(...quaternions.map((q) => q.elements)));
      }
    }
    static slerp(a, b, t) {
      return new Quaternion(quatSlerp(a.elements, b.elements, t));
    }
    static rotationX(theta) {
      return new Quaternion(quatRotationX(theta));
    }
    static rotationY(theta) {
      return new Quaternion(quatRotationY(theta));
    }
    static rotationZ(theta) {
      return new Quaternion(quatRotationZ(theta));
    }
    static lookRotation(look, up) {
      return new Quaternion(quatLookRotation(look.elements, up.elements));
    }
    static fromAxisAngle(axis, angle) {
      return new Quaternion(quatFromAxisAngle(axis.elements, angle));
    }
    static fromMatrix4(matrix) {
      return new Quaternion(quatFromMatrix4(matrix.elements));
    }
  };

  // src/math/mod.ts
  function mod(value, divisor) {
    return value - Math.floor(value / divisor) * divisor;
  }

  // src/math/sanitizeAngle.ts
  function sanitizeAngle(angle) {
    return mod(angle + Math.PI, 2 * Math.PI) - Math.PI;
  }

  // src/math/euler/eulerFromMat3.ts
  function eulerFromMat3(m, order) {
    const [i, j, k, sign] = !order || order === "XYZ" ? [0, 1, 2, 1] : order === "XZY" ? [0, 2, 1, -1] : order === "YXZ" ? [1, 0, 2, -1] : order === "YZX" ? [1, 2, 0, 1] : order === "ZXY" ? [2, 0, 1, 1] : [2, 1, 0, -1];
    const result = [0, 0, 0];
    const c = m[k + i * 3];
    result[j] = -sign * Math.asin(clamp(c, -1, 1));
    if (Math.abs(c) < 0.999999) {
      result[i] = sign * Math.atan2(m[k + j * 3], m[k * 4]);
      result[k] = sign * Math.atan2(m[j + i * 3], m[i * 4]);
    } else {
      result[i] = sign * Math.atan2(-m[j + k * 3], m[j * 4]);
    }
    if (vecManhattanLength(result) > 1.5 * Math.PI) {
      result[i] = sanitizeAngle(result[i] + Math.PI);
      result[j] = sanitizeAngle(Math.PI - result[j]);
      result[k] = sanitizeAngle(result[k] + Math.PI);
    }
    return result;
  }

  // src/math/euler/eulerFromMat4.ts
  function eulerFromMat4(m, order) {
    return eulerFromMat3(mat3FromMat4(m), order);
  }

  // src/math/euler/eulerFromQuaternion.ts
  function eulerFromQuaternion(m, order) {
    return eulerFromMat3(mat3FromQuaternion(m), order);
  }

  // src/math/quat/quatFromEuler.ts
  function quatFromEuler(euler, order) {
    const [i, j, k, sign] = !order || order === "XYZ" ? [0, 1, 2, 1] : order === "XZY" ? [0, 2, 1, -1] : order === "YXZ" ? [1, 0, 2, -1] : order === "YZX" ? [1, 2, 0, 1] : order === "ZXY" ? [2, 0, 1, 1] : [2, 1, 0, -1];
    const ti = 0.5 * euler[i];
    const tj = 0.5 * sign * euler[j];
    const tk = 0.5 * euler[k];
    const ci = Math.cos(ti);
    const cj = Math.cos(tj);
    const ck = Math.cos(tk);
    const si = Math.sin(ti);
    const sj = Math.sin(tj);
    const sk = Math.sin(tk);
    const result = [
      0,
      0,
      0,
      ck * cj * ci + sk * sj * si
    ];
    result[i] = ck * cj * si - sk * sj * ci;
    result[j] = sign * (ck * sj * ci + sk * cj * si);
    result[k] = sk * cj * ci - ck * sj * si;
    return result;
  }

  // src/math/euler/Euler.ts
  var Euler = class {
    constructor(elements = [0, 0, 0], order = "XYZ") {
      this.elements = elements;
      this.order = order;
    }
    get x() {
      return this.elements[0];
    }
    get y() {
      return this.elements[1];
    }
    get z() {
      return this.elements[2];
    }
    toString() {
      return `Euler( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)} (${this.order}) )`;
    }
    clone() {
      return new Euler(this.elements.concat(), this.order);
    }
    get quaternion() {
      return new Quaternion(quatFromEuler(this.elements, this.order));
    }
    get matrix4() {
      return this.quaternion.matrix4;
    }
    static fromMatrix3(matrix, order) {
      return new Euler(eulerFromMat3(matrix.elements, order), order);
    }
    static fromMatrix4(matrix, order) {
      return new Euler(eulerFromMat4(matrix.elements, order), order);
    }
    static fromQuaternion(quaternion, order) {
      return new Euler(eulerFromQuaternion(quaternion.elements, order), order);
    }
  };

  // src/math/ray3/ray3DistanceToSphere.ts
  function ray3DistanceToSphere([ro, rd], sphere) {
    const v = vecSub(ro, sphere[0]);
    const b = vecDot(v, rd);
    const c = vecDot(v, v) - sphere[1];
    const d = b * b - c;
    if (d < 0) {
      return null;
    }
    const sqrtD = Math.sqrt(d);
    return [-b - sqrtD, -b + sqrtD];
  }

  // src/math/line3/line3Delta.ts
  function line3Delta(line) {
    return vecSub(line[1], line[0]);
  }

  // src/math/ray3/ray3FromLine3.ts
  function ray3FromLine3(line) {
    return [
      line[0],
      vecNormalize(line3Delta(line))
    ];
  }

  // src/math/ray3/Ray3.ts
  var Ray3 = class {
    constructor(start = Vector3.zero, end = Vector3.pz) {
      this.origin = start;
      this.direction = end;
    }
    get raw() {
      return [this.origin.elements, this.direction.elements];
    }
    distanceToSphere(sphere) {
      return ray3DistanceToSphere(this.raw, sphere.raw);
    }
    static fromRaw(ray) {
      return new Ray3(new Vector3(ray[0]), new Vector3(ray[1]));
    }
    static fromLine3(line) {
      return Ray3.fromRaw(ray3FromLine3(line.raw));
    }
  };

  // src/math/line3/line3ApplyMatrix4.ts
  function line3ApplyMatrix4([start, end], matrix) {
    return [
      vec3ApplyMatrix4(start, matrix),
      vec3ApplyMatrix4(end, matrix)
    ];
  }

  // src/math/line3/line3At.ts
  function line3At(line, t) {
    return vecAdd(vecScale(line[0], 1 - t), vecScale(line[1], t));
  }

  // src/math/line3/line3ClosestPointToPoint.ts
  function line3ClosestPointToPoint(line, point, segment) {
    const ap = vecSub(point, line[0]);
    const ab = vecSub(line[1], line[0]);
    let t = vecDot(ap, ab) / vecDot(ab, ab);
    segment && (t = saturate(t));
    return line3At(line, t);
  }

  // src/math/line3/line3DistanceToPoint.ts
  function line3DistanceToPoint(line, point, segment) {
    return vecLength(vecSub(line3ClosestPointToPoint(line, point, segment), point));
  }

  // src/math/line3/Line3.ts
  var Line3 = class {
    constructor(start = Vector3.zero, end = Vector3.zero) {
      this.start = start;
      this.end = end;
    }
    get raw() {
      return [this.start.elements, this.end.elements];
    }
    get ray() {
      return Ray3.fromLine3(this);
    }
    delta() {
      return new Vector3(line3Delta(this.raw));
    }
    length() {
      return this.delta.length;
    }
    at(t) {
      return new Vector3(line3At(this.raw, t));
    }
    applyMatrix4(matrix) {
      return Line3.fromRaw(line3ApplyMatrix4(this.raw, matrix.elements));
    }
    closestPointToPoint(point, segment) {
      return new Vector3(line3ClosestPointToPoint(this.raw, point.elements, segment));
    }
    distanceToPoint(point, segment) {
      return line3DistanceToPoint(this.raw, point.elements, segment);
    }
    static fromRaw(line) {
      return new Line3(new Vector3(line[0]), new Vector3(line[1]));
    }
  };

  // src/math/vec3/vec3ApplyMatrix3.ts
  function vec3ApplyMatrix3(v, m) {
    return [
      m[0] * v[0] + m[3] * v[1] + m[6] * v[2],
      m[1] * v[0] + m[4] * v[1] + m[7] * v[2],
      m[2] * v[0] + m[5] * v[1] + m[8] * v[2]
    ];
  }

  // src/math/plane3/plane3ApplyMatrix4.ts
  function plane3ApplyMatrix4([normal, distance], matrix, normalMatrix) {
    const newNormal = vecNormalize(vec3ApplyMatrix3(normal, normalMatrix));
    const coplanar = vecScale(normal, -distance);
    const refPoint = vec3ApplyMatrix4(coplanar, matrix);
    const newDistance = -vecDot(refPoint, normal);
    return [newNormal, newDistance];
  }

  // src/math/plane3/plane3DistanceToPoint.ts
  function plane3DistanceToPoint([normal, distance], point) {
    return vecDot(normal, point) + distance;
  }

  // src/math/plane3/plane3Normalize.ts
  function plane3Normalize([normal, distance]) {
    const invL = 1 / vecLength(normal);
    return [vecScale(normal, invL), distance * invL];
  }

  // src/math/plane3/Plane3.ts
  var Plane3 = class {
    get raw() {
      return [this.normal.elements, this.distance];
    }
    get normalized() {
      return Plane3.fromRaw(plane3Normalize(this.raw));
    }
    constructor(normal = Vector3.pz, distance = 0) {
      this.normal = normal;
      this.distance = distance;
    }
    applyMatrix4(matrix, normalMatrix) {
      var _a;
      return Plane3.fromRaw(plane3ApplyMatrix4(this.raw, matrix.elements, (_a = normalMatrix == null ? void 0 : normalMatrix.elements) != null ? _a : matrix.normalMatrix.elements));
    }
    distanceToPoint(point) {
      return plane3DistanceToPoint(this.raw, point.elements);
    }
    static fromRaw(plane) {
      return new Plane3(new Vector3(plane[0]), plane[1]);
    }
  };

  // src/math/plane3/planes3ContainPoint.ts
  function planes3ContainPoint(planes, point) {
    return planes.every((plane) => plane3DistanceToPoint(plane, point) >= 0);
  }

  // src/math/plane3/planes3FromBox3.ts
  function planes3FromBox3(box) {
    return [
      [[1, 0, 0], -box[0][0]],
      [[-1, 0, 0], box[1][0]],
      [[0, 1, 0], -box[0][1]],
      [[0, -1, 0], box[1][1]],
      [[0, 0, 1], -box[0][2]],
      [[0, 0, -1], box[1][2]]
    ];
  }

  // src/math/plane3/planes3FromProjectionMatrix.ts
  function planes3FromProjectionMatrix(m) {
    const m11 = m[0], m12 = m[4], m13 = m[8], m14 = m[12], m21 = m[1], m22 = m[5], m23 = m[9], m24 = m[13], m31 = m[2], m32 = m[6], m33 = m[10], m34 = m[14], m41 = m[3], m42 = m[7], m43 = m[11], m44 = m[15];
    return [
      plane3Normalize([[m41 - m11, m42 - m12, m43 - m13], m44 - m14]),
      plane3Normalize([[m41 + m11, m42 + m12, m43 + m13], m44 + m14]),
      plane3Normalize([[m41 - m21, m42 - m22, m43 - m23], m44 - m24]),
      plane3Normalize([[m41 + m21, m42 + m22, m43 + m23], m44 + m24]),
      plane3Normalize([[m41 - m31, m42 - m32, m43 - m33], m44 - m34]),
      plane3Normalize([[m41 + m31, m42 + m32, m43 + m33], m44 + m34])
    ];
  }

  // src/math/plane3/planes3IntersectBox3.ts
  function planes3IntersectBox3(planes, box) {
    return planes.every((plane) => {
      const v = plane[0].map((nc, i) => box[nc > 0 ? 1 : 0][i]);
      return plane3DistanceToPoint(plane, v) >= 0;
    });
  }

  // src/math/plane3/planes3IntersectSphere3.ts
  function planes3IntersectSphere3(planes, sphere) {
    return planes.every((plane) => plane3DistanceToPoint(plane, sphere[0]) >= -sphere[1]);
  }

  // src/math/plane3/Planes3.ts
  var Planes3 = class {
    get raw() {
      return this.planes.map((plane) => plane.raw);
    }
    constructor(planes) {
      this.planes = planes;
    }
    containPoint(point) {
      return planes3ContainPoint(this.raw, point.elements);
    }
    intersectBox3(box) {
      return planes3IntersectBox3(this.raw, box.raw);
    }
    intersectSphere3(sphere) {
      return planes3IntersectSphere3(this.raw, sphere.raw);
    }
    static fromRaw(planes) {
      return new Planes3(planes.map((plane) => Plane3.fromRaw(plane)));
    }
    static fromBox3(box) {
      return Planes3.fromRaw(planes3FromBox3(box.raw));
    }
    static fromProjectionMatrix(matrix) {
      return Planes3.fromRaw(planes3FromProjectionMatrix(matrix.elements));
    }
  };

  // src/math/sphere3/sphere3ContainsPoint.ts
  function sphere3ContainsPoint(sphere, point) {
    return vecLengthSq(vecSub(sphere[0], point)) <= sphere[1] * sphere[1];
  }

  // src/math/sphere3/Sphere3.ts
  var Sphere3 = class {
    constructor(origin = Vector3.zero, radius = 0) {
      this.origin = origin;
      this.radius = radius;
    }
    get raw() {
      return [this.origin.elements, this.radius];
    }
    containsPoint(point) {
      return sphere3ContainsPoint(this.raw, point.elements);
    }
    static fromRaw(sphere) {
      return new Sphere3(new Vector3(sphere[0]), sphere[1]);
    }
  };

  // src/math/vec4/vec4ApplyMatrix3.ts
  function vec4ApplyMatrix3(v, m) {
    const v3 = [v[0], v[1], v[2]];
    const xyz = vec3ApplyMatrix3(v3, m);
    const w = v[3];
    return [xyz[0], xyz[1], xyz[2], w];
  }

  // src/math/vec4/Vector4.ts
  var Vector4 = class extends Vector {
    constructor(v = [0, 0, 0, 0]) {
      super();
      this.elements = v;
    }
    get x() {
      return this.elements[0];
    }
    set x(x) {
      this.elements[0] = x;
    }
    get y() {
      return this.elements[1];
    }
    set y(y) {
      this.elements[1] = y;
    }
    get z() {
      return this.elements[2];
    }
    set z(z) {
      this.elements[2] = z;
    }
    get w() {
      return this.elements[3];
    }
    set w(z) {
      this.elements[3] = z;
    }
    toString() {
      return `Vector4( ${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)}, ${this.w.toFixed(3)} )`;
    }
    applyMatrix3(matrix) {
      return new Vector4(vec4ApplyMatrix3(this.elements, matrix.elements));
    }
    applyMatrix4(matrix) {
      return new Vector4(vec4ApplyMatrix4(this.elements, matrix.elements));
    }
    __new(v) {
      return new Vector4(v);
    }
    static get zero() {
      return new Vector4([0, 0, 0, 0]);
    }
    static get one() {
      return new Vector4([1, 1, 1, 1]);
    }
  };

  // src/poker/pokerRanksByStrength.ts
  var pokerRanksByStrength = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A"
  ];

  // src/poker/pokerSuitsByIndex.ts
  var pokerSuitsByIndex = [
    "c",
    "d",
    "h",
    "s"
  ];

  // src/poker/createPokerDeck.ts
  function createPokerDeck() {
    const array = [];
    pokerSuitsByIndex.map((suit) => pokerRanksByStrength.map((rank) => array.push(rank + suit)));
    return array;
  }

  // src/poker/pokerHandStrengthMap.ts
  var pokerHandStrengthMap = {
    "HighCard": 0,
    "OnePair": 1,
    "TwoPair": 2,
    "ThreeOfAKind": 3,
    "Straight": 4,
    "Flush": 5,
    "FullHouse": 6,
    "FourOfAKind": 7,
    "StraightFlush": 8
  };

  // src/poker/pokerRankStrengthMap.ts
  var pokerRankStrengthMap = {
    "2": 0,
    "3": 1,
    "4": 2,
    "5": 3,
    "6": 4,
    "7": 5,
    "8": 6,
    "9": 7,
    "T": 8,
    "J": 9,
    "Q": 10,
    "K": 11,
    "A": 12
  };

  // src/poker/pokerSuitIndexMap.ts
  var pokerSuitIndexMap = {
    "c": 0,
    "d": 1,
    "h": 2,
    "s": 3
  };

  // src/poker/sortPokerCardsByRank.ts
  function sortPokerCardsByRank(cards) {
    return cards.sort((a, b) => pokerSuitIndexMap[a[1]] - pokerSuitIndexMap[b[1]]).sort((a, b) => pokerRankStrengthMap[a[0]] - pokerRankStrengthMap[b[0]]);
  }

  // src/poker/evaluatePokerHand.ts
  function evaluatePokerHand(cards) {
    const cards_ = cards.concat();
    const cardsByRank = new MapOfSet();
    const cardsBySuit = new MapOfSet();
    cards_.map((card) => {
      const rank = card[0];
      const suit = card[1];
      cardsByRank.add(rank, card);
      cardsBySuit.add(suit, card);
    });
    const fours = [];
    const threes = [];
    const twos = [];
    pokerRanksByStrength.map((rank) => {
      const cards2 = cardsByRank.get(rank);
      if (cards2.size > 3) {
        fours.push(rank);
      } else if (cards2.size > 2) {
        threes.push(rank);
      } else if (cards2.size > 1) {
        twos.push(rank);
      }
    });
    let straightCards;
    {
      let current = [];
      const a = Array.from(cardsByRank.get("A"))[0];
      if (a) {
        current.push(a);
      }
      pokerRanksByStrength.map((rank) => {
        const card = Array.from(cardsByRank.get(rank))[0];
        if (card) {
          current.push(card);
          if (current.length > 4) {
            straightCards = current;
          }
        } else {
          current = [];
        }
      });
    }
    if (straightCards) {
      for (const [suit, cardsSet] of cardsBySuit.map) {
        if (cardsSet.size > 0) {
          let straightFlushCards;
          let current = [];
          const target = "A" + suit;
          const a = cardsSet.has(target);
          if (a) {
            current.push(target);
          }
          pokerRanksByStrength.map((rank) => {
            const target2 = rank + suit;
            if (cardsSet.has(target2)) {
              current.push(target2);
              if (current.length > 4) {
                straightFlushCards = current;
              }
            } else {
              current = [];
            }
          });
          if (straightFlushCards) {
            straightFlushCards.splice(0, straightFlushCards.length - 5);
            const hand = "StraightFlush";
            const strength = [
              pokerHandStrengthMap[hand],
              pokerRankStrengthMap[straightFlushCards[4][0]]
            ];
            return {
              hand,
              cards: straightFlushCards,
              strength
            };
          }
        }
      }
    }
    if (fours.length > 0) {
      fours.sort((a, b) => pokerRankStrengthMap[a] - pokerRankStrengthMap[b]);
      fours.splice(0, fours.length - 1);
      const sameCards = Array.from(cardsByRank.get(fours[0]));
      sameCards.map((card) => cards_.splice(cards_.indexOf(card), 1));
      sortPokerCardsByRank(cards_).splice(0, cards_.length - 1);
      const hand = "FourOfAKind";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[fours[0]],
        pokerRankStrengthMap[cards_[0][0]]
      ];
      cards_.push(...sameCards);
      sortPokerCardsByRank(cards_);
      return {
        hand,
        cards: cards_,
        strength
      };
    }
    if (threes.length > 0 && threes.length + twos.length > 1) {
      threes.sort((a, b) => pokerRankStrengthMap[a] - pokerRankStrengthMap[b]);
      twos.push(...threes.splice(0, threes.length - 1));
      twos.sort((a, b) => pokerRankStrengthMap[a] - pokerRankStrengthMap[b]);
      twos.splice(0, twos.length - 1);
      const sameCards = Array.from(cardsByRank.get(threes[0]));
      sameCards.push(...Array.from(cardsByRank.get(twos[0])));
      sortPokerCardsByRank(sameCards).splice(0, sameCards.length - 5);
      const hand = "FullHouse";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[threes[0]],
        pokerRankStrengthMap[twos[0]]
      ];
      return {
        hand,
        cards: sameCards,
        strength
      };
    }
    for (const [_suit, cardsSet] of cardsBySuit.map) {
      if (cardsSet.size > 4) {
        const cards2 = sortPokerCardsByRank(Array.from(cardsSet));
        cards2.splice(0, cards2.length - 5);
        const hand = "Flush";
        const strength = [
          pokerHandStrengthMap[hand],
          ...cards2.concat().reverse().map((card) => pokerRankStrengthMap[card[0]])
        ];
        return {
          hand,
          cards: cards2,
          strength
        };
      }
    }
    if (straightCards) {
      straightCards.splice(0, straightCards.length - 5);
      const hand = "Straight";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[straightCards[4][0]]
      ];
      return {
        hand,
        cards: straightCards,
        strength
      };
    }
    if (threes.length > 0) {
      threes.sort((a, b) => pokerRankStrengthMap[a] - pokerRankStrengthMap[b]);
      threes.splice(0, threes.length - 1);
      const sameCards = Array.from(cardsByRank.get(threes[0]));
      sameCards.map((card) => cards_.splice(cards_.indexOf(card), 1));
      sortPokerCardsByRank(cards_).splice(0, cards_.length - 2);
      const hand = "ThreeOfAKind";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[threes[0]],
        pokerRankStrengthMap[cards_[1][0]],
        pokerRankStrengthMap[cards_[0][0]]
      ];
      cards_.push(...sameCards);
      sortPokerCardsByRank(cards_);
      return {
        hand,
        cards: cards_,
        strength
      };
    }
    if (twos.length > 1) {
      twos.sort((a, b) => pokerRankStrengthMap[a] - pokerRankStrengthMap[b]);
      twos.splice(0, twos.length - 2);
      const pairs = Array.from(cardsByRank.get(twos[0]));
      pairs.push(...Array.from(cardsByRank.get(twos[1])));
      pairs.map((card) => cards_.splice(cards_.indexOf(card), 1));
      sortPokerCardsByRank(cards_).splice(0, cards_.length - 1);
      const hand = "TwoPair";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[twos[1]],
        pokerRankStrengthMap[twos[0]],
        pokerRankStrengthMap[cards_[0][0]]
      ];
      cards_.push(...pairs);
      sortPokerCardsByRank(cards_);
      return {
        hand,
        cards: cards_,
        strength
      };
    }
    if (twos.length > 0) {
      const pair = Array.from(cardsByRank.get(twos[0]));
      pair.map((card) => cards_.splice(cards_.indexOf(card), 1));
      sortPokerCardsByRank(cards_).splice(0, cards_.length - 3);
      const hand = "OnePair";
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[twos[0]],
        pokerRankStrengthMap[cards_[2][0]],
        pokerRankStrengthMap[cards_[1][0]],
        pokerRankStrengthMap[cards_[0][0]]
      ];
      cards_.push(...pair);
      sortPokerCardsByRank(cards_);
      return {
        hand,
        cards: cards_,
        strength
      };
    }
    {
      const hand = "HighCard";
      sortPokerCardsByRank(cards_);
      cards_.splice(0, cards_.length - 5);
      const strength = [
        pokerHandStrengthMap[hand],
        pokerRankStrengthMap[cards_[4][0]],
        pokerRankStrengthMap[cards_[3][0]],
        pokerRankStrengthMap[cards_[2][0]],
        pokerRankStrengthMap[cards_[1][0]],
        pokerRankStrengthMap[cards_[0][0]]
      ];
      return {
        hand,
        cards: cards_,
        strength
      };
    }
  }

  // src/poker/pokerHandsByStrength.ts
  var pokerHandsByStrength = [
    "HighCard",
    "OnePair",
    "TwoPair",
    "ThreeOfAKind",
    "Straight",
    "Flush",
    "FullHouse",
    "FourOfAKind",
    "StraightFlush"
  ];

  // src/stniccc/parseSTNICCC.ts
  function parseSTNICCC(buffer) {
    const frames = [];
    const array = new Uint8Array(buffer);
    const palette = new Uint16Array(16);
    let head = 0;
    let shouldSkip = false;
    let shouldEnd = false;
    for (; ; ) {
      const flags = array[head++];
      const needsClear = (flags & 1) === 1;
      const hasPalette = (flags >> 1 & 1) === 1;
      const indexedMode = (flags >> 2 & 1) === 1;
      if (hasPalette) {
        const bitmask = array[head++] << 8 | array[head++];
        for (let i = 0; i < 16; i++) {
          if (bitmask >> 15 - i & 1) {
            palette[i] = array[head++] << 8 | array[head++];
          }
        }
      }
      if (indexedMode) {
        const nVertices = array[head++];
        const vertices = array.subarray(head, head + 2 * nVertices);
        head += 2 * nVertices;
        const polygons = [];
        for (; ; ) {
          const descriptor = array[head++];
          if (descriptor === 255) {
            break;
          } else if (descriptor === 254) {
            shouldSkip = true;
            break;
          } else if (descriptor === 253) {
            shouldEnd = true;
            break;
          }
          const colorIndex = descriptor >> 4 & 15;
          const nIndices = descriptor & 15;
          const indices = array.subarray(head, head + nIndices);
          head += nIndices;
          polygons.push({
            colorIndex,
            indices: Array.from(indices)
          });
        }
        frames.push({
          needsClear,
          indexedMode,
          palette: Array.from(palette),
          vertices: Array.from(vertices),
          polygons
        });
      } else {
        const polygons = [];
        for (; ; ) {
          const descriptor = array[head++];
          if (descriptor === 255) {
            break;
          } else if (descriptor === 254) {
            shouldSkip = true;
            break;
          } else if (descriptor === 253) {
            shouldEnd = true;
            break;
          }
          const colorIndex = descriptor >> 4 & 15;
          const nVertices = descriptor & 15;
          const vertices = array.subarray(head, head + 2 * nVertices);
          head += 2 * nVertices;
          polygons.push({
            colorIndex,
            vertices: Array.from(vertices)
          });
        }
        frames.push({
          needsClear,
          indexedMode,
          palette: Array.from(palette),
          polygons
        });
      }
      if (shouldSkip) {
        head = (Math.floor(head / 65536) + 1) * 65536;
        shouldSkip = false;
      }
      if (shouldEnd) {
        break;
      }
    }
    return frames;
  }

  // src/stniccc/stnicccToSVG.ts
  function stnicccToSVG(frames, options = {}) {
    var _a;
    const delta = 1 / ((_a = options == null ? void 0 : options.fps) != null ? _a : 30);
    let svg = '<svg width="256" height="200" viewBox="0 0 256 200" xmlns="http://www.w3.org/2000/svg">';
    let style = `g{visibility:hidden;animation-duration:${(delta * frames.length).toFixed(3)}s;animation-iteration-count:infinite;animation-name:frame}@keyframes frame{0%{visibility:visible}${200 / frames.length}%{visibility:hidden}}`;
    frames.map((frame, iFrame) => {
      const { indexedMode, palette, polygons } = frame;
      style += `#f${iFrame}{animation-delay:${(delta * iFrame).toFixed(3)}s}`;
      const paletteInHex = palette.map((stColor) => {
        const color = colorFromAtariST(stColor);
        return colorToHex(color);
      });
      let childrenStr = '<rect width="256" height="200" fill="#000" />';
      let currentColorIndex = -1;
      let d = "";
      if (indexedMode) {
        const { vertices } = frame;
        polygons.map(({ colorIndex, indices }) => {
          if (currentColorIndex !== colorIndex) {
            if (currentColorIndex !== -1) {
              const colorHex2 = paletteInHex[currentColorIndex];
              childrenStr += `<path d="${d}" fill="${colorHex2}" />`;
            }
            currentColorIndex = colorIndex;
            d = "";
          }
          for (let i = 0; i < indices.length; i++) {
            const index = indices[i];
            const x = vertices[2 * index];
            const y = vertices[2 * index + 1];
            d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
          }
        });
      } else {
        polygons.map(({ colorIndex, vertices }) => {
          if (currentColorIndex !== colorIndex) {
            if (currentColorIndex !== -1) {
              const colorHex2 = paletteInHex[currentColorIndex];
              childrenStr += `<path d="${d}" fill="${colorHex2}" />`;
            }
            currentColorIndex = colorIndex;
            d = "";
          }
          for (let i = 0; i < vertices.length; i += 2) {
            const x = vertices[i];
            const y = vertices[i + 1];
            d += i === 0 ? `M${x},${y}` : `L${x},${y}`;
          }
        });
      }
      const colorHex = paletteInHex[currentColorIndex];
      childrenStr += `<path d="${d}" fill="${colorHex}" />`;
      svg += `<g id="f${iFrame}">${childrenStr}</g>`;
    });
    svg += `<style>${style}</style></svg>`;
    return svg;
  }

  // src/Swap/Swap.ts
  var Swap = class {
    constructor(a, b) {
      this.i = a;
      this.o = b;
    }
    swap() {
      const i = this.i;
      this.i = this.o;
      this.o = i;
    }
  };

  // src/TapTempo/TapTempo.ts
  var TapTempo = class {
    constructor() {
      this.__bpm = 0;
      this.__lastTap = 0;
      this.__lastBeat = 0;
      this.__lastTime = 0;
      this.__calc = new HistoryMeanCalculator(16);
    }
    get beatDuration() {
      return 60 / this.__bpm;
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
      return this.__lastBeat + (performance.now() - this.__lastTime) * 1e-3 / this.beatDuration;
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
      const delta = (now - this.__lastTap) * 1e-3;
      if (2 < delta) {
        this.reset();
      } else {
        this.__calc.push(delta);
        this.__bpm = 60 / this.__calc.mean;
      }
      this.__lastTap = now;
      this.__lastTime = now;
      this.__lastBeat = 0;
    }
  };

  // src/Xorshift/Xorshift.ts
  var Xorshift = class {
    constructor(seed) {
      this.seed = seed || 1;
    }
    gen(seed) {
      if (seed) {
        this.seed = seed;
      }
      this.seed = this.seed ^ this.seed << 13;
      this.seed = this.seed ^ this.seed >>> 17;
      this.seed = this.seed ^ this.seed << 5;
      return this.seed / Math.pow(2, 32) + 0.5;
    }
    set(seed) {
      this.seed = seed || this.seed || 1;
    }
  };

  // src/yugop/getYugopText.ts
  function getYugopText(text, phase, randomRatio = 0.5) {
    if (phase >= 1) {
      return text;
    }
    if (phase < 0) {
      return "";
    }
    const displayTween = linearstep(0, 1 - randomRatio, phase);
    const fixTween = linearstep(randomRatio, 1, phase);
    const displayLength = 1 + Math.floor(displayTween * (text.length - 1));
    const fixLength = phase < randomRatio ? 0 : 1 + Math.floor(fixTween * (text.length - 1));
    const randomLength = displayLength - fixLength;
    const randomStr = [...Array(randomLength)].map(() => String.fromCharCode(33 + Math.floor(93 * Math.random()))).join("");
    return text.substring(0, fixLength) + randomStr;
  }
  return __toCommonJS(src_exports);
})();
/*!
 * Turbo colormap
 *
 * Copyright 2019 Google LLC. (Apache-2.0)
 *
 * https://gist.github.com/mikhailov-work/0d177465a8151eb6ede1768d51d476c7
 */
//# sourceMappingURL=0b5vr-experimental.iife.js.map
