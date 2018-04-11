exports["wasa"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wrapNode = exports.createNoiseBuffer = exports.createRandomWaveForm = exports.mandatory = undefined;

var _ramda = __webpack_require__(6);

var mandatory = exports.mandatory = (parameterName = '') => {
	throw new Error(`Missing mandatory parameter ${parameterName}`);
};

var createRandomWaveForm = exports.createRandomWaveForm = (audioContext = mandatory(), complexity = 8) => {
	var i = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	var r = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	return audioContext.createPeriodicWave(r, i);
};

var createNoiseBuffer = exports.createNoiseBuffer = (audioContext = mandatory()) => {
	var bufferSize = audioContext.sampleRate;
	var numChannels = 1;
	var buffer = audioContext.createBuffer(numChannels, bufferSize, bufferSize);
	var o = buffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random();
	}
	return buffer;
};

var wrapNode = exports.wrapNode = (audioNode = mandatory()) => ({
	getNode() {
		return audioNode;
	},
	getInput() {
		return audioNode;
	},
	connect({ getInput, connect }) {
		audioNode.connect(getInput());
		return { connect };
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var core = __webpack_require__(0);
var ctx = __webpack_require__(30);
var hide = __webpack_require__(32);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(33);
var IE8_DOM_DEFINE = __webpack_require__(34);
var toPrimitive = __webpack_require__(36);
var dP = Object.defineProperty;

exports.f = __webpack_require__(8) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WaveForms = undefined;

var _freeze = __webpack_require__(9);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaveForms = exports.WaveForms = (0, _freeze2.default)({
	SQUARE: 'square',
	SAWTOOTH: 'sawtooth',
	TRIANGLE: 'triangle',
	SINE: 'sine',
	RANDOM: 'random'
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FilterTypes = undefined;

var _freeze = __webpack_require__(9);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterTypes = exports.FilterTypes = (0, _freeze2.default)({
	LOW_PASS: 'lowpass',
	BAND_PASS: 'bandpass',
	HIGH_PASS: 'highpass',
	LOW_SHELF: 'lowshelf',
	HIGH_SHELF: 'highshelf',
	ALL_PASS: 'allpass'
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NodeOutputMixer = undefined;

var _utils = __webpack_require__(1);

var NodeOutputMixer = exports.NodeOutputMixer = (audioContext = (0, _utils.mandatory)()) => {
	/* web audio nodes */
	var outputGainNode = audioContext.createGain();
	var leftGainNode = audioContext.createGain();
	var rightGainNode = audioContext.createGain();

	/* constant values */
	var MIDDLE_GAIN_VALUE = 0.5;

	/* parameter values */
	var fadeValue = 0;

	/* routing */
	leftGainNode.connect(outputGainNode);
	rightGainNode.connect(outputGainNode);
	leftGainNode.gain.value = MIDDLE_GAIN_VALUE;
	rightGainNode.gain.value = MIDDLE_GAIN_VALUE;

	return {
		setFadeValue(value) {
			leftGainNode.gain.value = MIDDLE_GAIN_VALUE - value * MIDDLE_GAIN_VALUE;
			rightGainNode.gain.value = MIDDLE_GAIN_VALUE + value * MIDDLE_GAIN_VALUE;
			fadeValue = value;
			return this;
		},
		getFadeValue() {
			return fadeValue;
		},
		setLeftInput(audioNode) {
			audioNode.connect(leftGainNode);
			return this;
		},
		setRightInput(audioNode) {
			audioNode.connect(rightGainNode);
			return this;
		},
		connect({ connect, getInput }) {
			outputGainNode.connect(getInput());
			return { connect };
		},
		getLeftGainNode() {
			return leftGainNode;
		},
		getRightGainNode() {
			return rightGainNode;
		}
	};
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(40);
var enumBugKeys = __webpack_require__(47);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(20);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(41);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(7);
var core = __webpack_require__(0);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Kick = undefined;

var _waveForms = __webpack_require__(12);

var _utils = __webpack_require__(1);

var Kick = exports.Kick = (audioContext = (0, _utils.mandatory)('audioContext')) => {
	var output = audioContext.createGain();
	var oscGain = audioContext.createGain();
	var comp = audioContext.createDynamicsCompressor();
	var filter = audioContext.createBiquadFilter();
	var osc = audioContext.createOscillator();

	filter.frequency.value = 2500;

	comp.threshold.value = 0.0; // this is the pitfall, leave some headroom
	comp.knee.value = 0.0; // brute force
	comp.ratio.value = 20.0; // max compression
	comp.attack.value = 0.05; // 5ms attack
	comp.release.value = 0.050; // 50ms release

	var finalFrequency = 0.01;

	var initialFrequency = 200;
	var duration = 0.15;
	var isMuted = false;
	var outputGainValue = 1E-10;

	/* routing */
	osc.connect(oscGain).connect(filter).connect(comp).connect(output);

	output.gain.value = outputGainValue;
	oscGain.gain.value = 1E-10;
	osc.type = _waveForms.WaveForms.SINE;
	osc.start(audioContext.currentTime);

	return {
		noteOn(velocity = 0.8, time = audioContext.currentTime) {
			oscGain.gain.exponentialRampToValueAtTime(velocity, time);
			osc.frequency.exponentialRampToValueAtTime(initialFrequency, time);
			osc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			oscGain.gain.cancelScheduledValues(time);
			osc.frequency.cancelScheduledValues(time);
			osc.frequency.exponentialRampToValueAtTime(finalFrequency, time);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time);
		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		setFrequencyValue(value) {
			initialFrequency = value;
			return this;
		},
		getFrequencyValue() {
			return initialFrequency;
		},
		setDurationValue(value) {
			duration = value;
			return this;
		},
		getDurationValue() {
			return duration;
		},
		setOutputGainValue(value) {
			outputGainValue = value;
			if (!isMuted) {
				output.gain.value = outputGainValue;
			}
			return this;
		},
		getOutputGainValue() {
			return outputGainValue;
		},
		mute() {
			isMuted = true;
			output.gain.value = 1E-10;
		},
		unMute() {
			output.gain.value = outputGainValue;
			isMuted = false;
		}
	};
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Hat = undefined;

var _utils = __webpack_require__(1);

var _filterTypes = __webpack_require__(13);

var _waveForms = __webpack_require__(12);

var Hat = exports.Hat = (audioContext = (0, _utils.mandatory)('audioContext')) => {
	var output = audioContext.createGain();
	var gate = audioContext.createGain();
	var bandpassFilter = audioContext.createBiquadFilter();
	var highpassFilter = audioContext.createBiquadFilter();

	var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
	var oscs = [];

	var fundamental = 35;
	var duration = 0.25;

	/* routing */
	bandpassFilter.connect(highpassFilter).connect(gate).connect(output);

	bandpassFilter.type = _filterTypes.FilterTypes.BAND_PASS;
	bandpassFilter.frequency.value = 9000;
	highpassFilter.type = _filterTypes.FilterTypes.HIGH_PASS;
	highpassFilter.frequency.value = 9000;

	return {
		noteOn(velocity = 1, time = audioContext.currentTime) {
			ratios.forEach(ratio => {
				var osc = audioContext.createOscillator();
				osc.type = _waveForms.WaveForms.SQUARE;
				// Frequency is the fundamental * this oscillator's ratio
				osc.frequency.value = fundamental * ratio;
				osc.connect(bandpassFilter);
				osc.start(time);
				oscs.push(osc);
			});
			gate.gain.setValueAtTime(1E-10, time);
			gate.gain.exponentialRampToValueAtTime(velocity / ratios.length, time + 0.02);
			gate.gain.exponentialRampToValueAtTime(velocity / ratios.length * 0.3, time + 0.03);
			gate.gain.exponentialRampToValueAtTime(1E-10, time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			gate.gain.cancelScheduledValues(time);
			oscs.forEach(() => {
				oscs.pop().stop(time);
			});
		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		setDurationValue(value) {
			duration = value;
			return this;
		},
		getDurationValue() {
			return duration;
		},
		setFundamentalValue(value) {
			fundamental = value;
			return this;
		},
		getFundamentalValue() {
			return fundamental;
		},
		setOutputGainValue(value) {
			output.gain.value = value;
			return this;
		},
		getOutputGainValue() {
			return output.gain.value;
		}
	};
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Snare = undefined;

var _nodeOutputMixer = __webpack_require__(14);

var _filterTypes = __webpack_require__(13);

var Snare = exports.Snare = audioContext => {

	var bufferSize = 2 * audioContext.sampleRate;
	var noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	var o = noiseBuffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random() * 2 - 1;
	}

	var output = audioContext.createGain();
	var noiseGain = audioContext.createGain();
	var noiseFilter = audioContext.createBiquadFilter();
	var oscGain = audioContext.createGain();
	var nodeMixer = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);
	var osc = audioContext.createOscillator();
	var noise = audioContext.createBufferSource();

	var duration = 0.25;
	var frequency = 80;
	var oscMixValue = 0.2;
	var noiseFilterValue = 4000;

	var real = new Float32Array([0, 0, 1, 0, 1]);
	var imaginary = new Float32Array([0, 1, 0, 0, 0]);
	var customWave = audioContext.createPeriodicWave(real, imaginary);

	noiseFilter.type = _filterTypes.FilterTypes.BAND_PASS;
	noiseFilter.frequency.value = noiseFilterValue;
	osc.frequency.value = frequency;
	oscGain.gain.value = 1E-10;
	noiseGain.gain.value = 1E-10;
	noise.buffer = noiseBuffer;
	noise.loop = true;

	osc.setPeriodicWave(customWave);

	osc.connect(oscGain);
	noise.connect(noiseFilter).connect(noiseGain);
	nodeMixer.setLeftInput(noiseGain);
	nodeMixer.setRightInput(noiseGain);
	nodeMixer.connect({ getInput: () => output });

	osc.start(audioContext.currentTime);
	noise.start(audioContext.currentTime);

	return {
		noteOn(velocity = 1, time = audioContext.currentTime) {
			osc.frequency.setValueAtTime(frequency, time);
			oscGain.gain.setValueAtTime(velocity, time);
			noiseGain.gain.setValueAtTime(velocity, time);
			osc.frequency.exponentialRampToValueAtTime(frequency / 2, time + 0.15);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15);
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			osc.frequency.cancelScheduledValues(time);
			oscGain.gain.cancelScheduledValues(time);
			noiseGain.gain.cancelScheduledValues(time);
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time);
		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		setDurationValue(value) {
			duration = value;
			return this;
		},
		getDurationValue() {
			return duration;
		},
		setFrequencyValue(value) {
			frequency = value;
			return this;
		},
		getFrequencyValue() {
			return frequency;
		},
		setOscMixValue(value) {
			oscMixValue = value;
			nodeMixer.setFadeValue(oscMixValue);
			return this;
		},
		getOscMixValue() {
			return oscMixValue;
		},
		setNoiseFilterValue(value) {
			noiseFilterValue = value;
			noiseFilter.frequency.value = value;
			return this;
		},
		getNoiseFilterValue() {
			return noiseFilterValue;
		},
		setOutputGainValue(value) {
			output.gain.value = value;
			return this;
		},
		getOutputGainValue() {
			return output.gain.value;
		}
	};
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(48);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(55);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(63);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_macros).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _macros[key];
    }
  });
});

var _constants = __webpack_require__(76);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(7);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(11).f });


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(31);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(11);
var createDesc = __webpack_require__(37);
module.exports = __webpack_require__(8) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(8) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(35)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
var document = __webpack_require__(10).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(15);
var $keys = __webpack_require__(17);

__webpack_require__(23)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(18);
var toIObject = __webpack_require__(19);
var arrayIndexOf = __webpack_require__(42)(false);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(19);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(44);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(46)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(10);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dispatcher = __webpack_require__(49);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(54);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

var _utils = __webpack_require__(1);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(9);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(53);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = exports.Events = (0, _freeze2.default)({
	SEQUENCER_START: 0,
	SEQUENCER_STOP: 1,
	SEQUENCER_TICK: 2,
	TEMPO_CHANGE: 3,
	CHANGE: 999
});

var Dispatcher = exports.Dispatcher = (() => {
	var subject = new _rxjs.Subject();
	return {
		dispatch(type, data) {
			subject.next({ type, data });
		},
		as(type) {
			return subject.filter(action => action.type === type).map(action => action.data);
		}
	};
})();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(3);
var meta = __webpack_require__(52).onFreeze;

__webpack_require__(23)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(3);
var has = __webpack_require__(18);
var setDesc = __webpack_require__(11).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(4)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.unscale = undefined;

var _ramda = __webpack_require__(6);

/**
 * Unnormalizes a [0-1] range value back to the given range
 * @param {Object} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 */
var unscale = exports.unscale = (range, value) => {
  if ((0, _ramda.isNil)(range)) {
    return value;
  }
  return (range.max - range.min) * value + range.min;
};

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param {Object} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 */
var scale = exports.scale = (range, value) => {
  if ((0, _ramda.isNil)(range)) {
    return value;
  }
  return (value - range.min) / (range.max - range.min);
};

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequencer = __webpack_require__(56);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(59);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_note).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _note[key];
    }
  });
});

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sequencer = undefined;

var _workerTimer = __webpack_require__(57);

var _workerTimer2 = _interopRequireDefault(_workerTimer);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequencer = exports.Sequencer = (audioContext = (0, _utils.mandatory)()) => {
	/* time values */
	var ticksPerQuarterNote = 4;
	var startTime = 0;
	var nextTickTime = 0;
	var tick = 0;
	/* state change callbacks */
	var onTick = () => {};
	var onStop = () => {};
	var onStart = () => {};
	var onLoop = () => {};
	/* state */
	var stop = true;
	var loop = true;
	var tempo = 130;
	var length = 16;

	var timer = void 0;

	/**
  * Schedule is called every time a new tick occurs
  * @param {function} op - on tick callback function
  */
	var schedule = op => {
		var currentTime = audioContext.currentTime - startTime;
		if (!stop && currentTime >= nextTickTime) {
			tick += 1;
			nextTickTime = currentTime + 60 / (tempo * ticksPerQuarterNote);
			op(tick, tempo, ticksPerQuarterNote, nextTickTime);
			if (loop && tick === length) {
				tick = 0;
				onLoop();
			}
		}
	};

	var play = () => {
		timer = _workerTimer2.default.setInterval(() => {
			schedule(onTick);
		}, 0);
	};

	return {
		start() {
			onStart();
			startTime = audioContext.currentTime;
			stop = false;
			play();
			return this;
		},
		stop() {
			_workerTimer2.default.clearInterval(timer);
			stop = true;
			nextTickTime = 0;
			tick = 0;
			onStop();
			return this;
		},
		isStarted() {
			return !stop;
		},
		setLoopMode(value) {
			loop = value;
			return this;
		},
		getLoopMode() {
			return loop;
		},
		setLength(value) {
			length = value;
			return this;
		},
		getLength() {
			return length;
		},
		setDivision(value) {
			ticksPerQuarterNote = value;
			return this;
		},
		getDivision() {
			return ticksPerQuarterNote;
		},
		setTempo(value) {
			tempo = value;
			return this;
		},
		getTempo() {
			return tempo;
		},
		getTime() {
			return audioContext.currentTime - startTime;
		},
		onStart(op) {
			onStart = op;
			return this;
		},
		onStop(op) {
			onStop = op;
			return this;
		},
		onTick(op) {
			onTick = op;
			return this;
		},
		onLoop(op) {
			onLoop = op;
			return this;
		}
	};
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

if (global === global.window && global.URL && global.Blob && global.Worker) {
  module.exports = (function() {
    var TIMER_WORKER_SOURCE = [
      "var timerIds = {}, _ = {};",
      "_.setInterval = function(args) {",
      "  timerIds[args.timerId] = setInterval(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearInterval = function(args) {",
      "  clearInterval(timerIds[args.timerId]);",
      "};",
      "_.setTimeout = function(args) {",
      "  timerIds[args.timerId] = setTimeout(function() { postMessage(args.timerId); }, args.delay);",
      "};",
      "_.clearTimeout = function(args) {",
      "  clearTimeout(timerIds[args.timerId]);",
      "};",
      "onmessage = function(e) { _[e.data.type](e.data) };"
    ].join("");

    var _timerId = 0;
    var _callbacks = {};
    var _timer = new global.Worker(global.URL.createObjectURL(
      new global.Blob([ TIMER_WORKER_SOURCE ], { type: "text/javascript" })
    ));

    _timer.onmessage = function(e) {
      if (_callbacks[e.data]) {
        _callbacks[e.data].callback.apply(null, _callbacks[e.data].params);
      }
    };

    return {
      setInterval: function(callback, delay) {
        var params = Array.prototype.slice.call(arguments, 2);

        _timerId += 1;

        _timer.postMessage({ type: "setInterval", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = { callback: callback, params: params };

        return _timerId;
      },
      setTimeout: function(callback, delay) {
        var params = Array.prototype.slice.call(arguments, 2);

        _timerId += 1;

        _timer.postMessage({ type: "setTimeout", timerId: _timerId, delay: delay });
        _callbacks[_timerId] = { callback: callback, params: params };

        return _timerId;
      },
      clearInterval: function(timerId) {
        _timer.postMessage({ type: "clearInterval", timerId: timerId });
        _callbacks[timerId] = null;
      },
      clearTimeout: function(timerId) {
        _timer.postMessage({ type: "clearTimeout", timerId: timerId });
        _callbacks[timerId] = null;
      }
    };
  })();
} else {
  module.exports = global;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ }),
/* 58 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencyToSymbol = exports.symbolToFrequency = exports.frequencyToMidi = exports.midiToSymbol = exports.symbolToMidi = exports.midiToFrequency = exports.pitchClasses = exports.DURATIONS = undefined;

var _log = __webpack_require__(60);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(9);

var _freeze2 = _interopRequireDefault(_freeze);

var _ramda = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Notes Durations Constants
 * @type {Object}
 */
var DURATIONS = exports.DURATIONS = (0, _freeze2.default)({
  WHOLE: 1,
  HALF: 1 / 2,
  QUARTER: 1 / 4,
  EIGHTH: 1 / 8
});

var pitchClasses = exports.pitchClasses = (0, _freeze2.default)(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']);

/**
 * Computes the frequency value of the given midi note
 * with custom, optional tuning (default value for
 * tuning is 440 for A4)
 * This curry function will be partially applied if tuning
 * is the only parameter
 * @param {number} tuning - The frequency associated to midi value 69 (A4)
 * @param {number} midiValue - Midi value (0 to 127) of the note
 * @returns {number|function} The computed frequency or a computing function
 */
var midiToFrequency = exports.midiToFrequency = (tuning = 440, midiValue) => {
  if ((0, _ramda.isNil)(midiValue)) {
    return _ => midiToFrequency(tuning, _);
  }
  if (midiValue >= 0 && midiValue <= 127) {
    return tuning * Math.pow(2, (midiValue - 69) / 12);
  }
  return null;
};

/**
 * Computes the midiValue value of the given note in the given octave
 * @param {string} pitchClass - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
var symbolToMidi = exports.symbolToMidi = (pitchClass, octave) => (octave + 1) * 12 + pitchClasses.indexOf(pitchClass);

/**
 * Computes the pitch class and octave for the given midi value
 * @param {number} midiValue - Octave value for note
 */
var midiToSymbol = exports.midiToSymbol = midiValue => {
  var pitchClassIndex = (midiValue - 12 * 2) % 12;
  var octave = (midiValue - pitchClassIndex - 12) / 12;
  return {
    pitchClass: pitchClasses[pitchClassIndex],
    octave
  };
};

/**
 * Computes the frequency value of the given midi note
 * with custom, optional tuning (default value for
 * tuning is 440 for A4)
 * This curry function will be partially applied if tuning
 * is the only parameter
 * @param {number} tuning - The frequency associated to midi value 69 (A4)
 * @param {number} midiValue - Midi value (0 to 127) of the note
 * @returns {number|function} The computed frequency or a computing function
 */
var frequencyToMidi = exports.frequencyToMidi = (tuning = 440, frequency) => {
  if ((0, _ramda.isNil)(frequency)) {
    return _ => frequencyToMidi(tuning, _);
  }
  if (frequency >= 8 && frequency < 3952) {
    return 69 + 12 * (0, _log2.default)(frequency / tuning);
  }
  return null;
};

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} pitchClass - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
var symbolToFrequency = exports.symbolToFrequency = (pitchClass, octave) => midiToFrequency(440, symbolToMidi(pitchClass, octave));

/**
 * Computes the note and octave values of the given frequency
 * @param {number} frequency - Octave value for note
 */
var frequencyToSymbol = exports.frequencyToSymbol = frequency => midiToSymbol(frequencyToMidi(440, frequency));

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(7);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kick = __webpack_require__(24);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_kick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _kick[key];
    }
  });
});

var _hat = __webpack_require__(25);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(26);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
    }
  });
});

var _delay = __webpack_require__(64);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _distortion = __webpack_require__(65);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_distortion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _distortion[key];
    }
  });
});

var _noopInstrument = __webpack_require__(66);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_noopInstrument).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _noopInstrument[key];
    }
  });
});

var _gmDrumSynth = __webpack_require__(67);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_gmDrumSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _gmDrumSynth[key];
    }
  });
});

var _dryWetMixer = __webpack_require__(68);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dryWetMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dryWetMixer[key];
    }
  });
});

var _nodeOutputMixer = __webpack_require__(14);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_nodeOutputMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeOutputMixer[key];
    }
  });
});

var _accentEnvelope = __webpack_require__(75);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_accentEnvelope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _accentEnvelope[key];
    }
  });
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Delay = exports.Delay = audioContext => {
	/* audio nodes */
	var output = audioContext.createGain();
	var filter = audioContext.createBiquadFilter();
	var delay = audioContext.createDelay(5.0);
	var feedback = audioContext.createGain();
	/* routing */
	delay.connect(feedback).connect(filter).connect(delay).connect(output);
	/* parameters */
	filter.type = 'lowpass';
	var tempo = 120;
	var division = 3;
	/* convert beat division to delay time in seconds */
	var divisionToDelayTime = (_division, _tempo) => 60 / (_tempo * _division);
	var delayTimeSeconds = divisionToDelayTime(division, tempo);

	delay.delayTime.value = delayTimeSeconds;

	return {
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		getInput() {
			return delay;
		},
		setTempoValue(value) {
			tempo = value;
			delay.delayTime.value = divisionToDelayTime(division, tempo);
			return this;
		},
		getTempoValue() {
			return tempo;
		},
		setDivisionValue(value) {
			division = value;
			delayTimeSeconds = divisionToDelayTime(division, tempo);
			var feedbackValue = feedback.gain.value;
			feedback.gain.value = 0;
			delay.delayTime.value = delayTimeSeconds;
			feedback.gain.value = feedbackValue;
			return this;
		},
		getDivisionValue() {
			return division;
		},
		setDelayTimeValue(value) {
			delayTimeSeconds = value;
			delay.delayTime.value = delayTimeSeconds;
			return this;
		},
		getDelayTimeValue() {
			return delayTimeSeconds;
		},
		setFrequencyValue(value) {
			filter.frequency.value = value;
			return this;
		},
		getFrequencyValue() {
			return filter.frequency.value;
		},
		setFeedbackValue(value) {
			feedback.gain.value = value;
			return this;
		},
		getFeedbackValue() {
			return feedback.gain.value;
		}
	};
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Distortion = exports.Distortion = audioContext => {
	var makeDistortionCurve = amount => {
		var k = typeof amount === 'number' ? amount : 50;
		var nSamples = 44100;
		var curve = new Float32Array(44100);
		var deg = Math.PI / 180;
		for (var i = 0; i < nSamples; i += 1) {
			var x = i * 2 / (nSamples - 1);
			curve[i] = (3 + k) * x * 20 * deg / ((Math.PI + k) * Math.abs(x));
		}
		return curve;
	};
	var dist = audioContext.createWaveShaper();
	dist.curve = makeDistortionCurve(100);
	return {
		connect({ connect, getInput }) {
			dist.connect(getInput());
			return connect;
		},
		getInput() {
			return dist;
		},
		setCurve(amount) {
			dist.curve = makeDistortionCurve(amount);
			return this;
		}
	};
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var NoopInstrument = exports.NoopInstrument = audioContext => {
	var output = audioContext.createGain();

	return {
		noteOn() {},
		noteOff() {},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		}
	};
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GMDrumSynth = undefined;

var _ramda = __webpack_require__(6);

var R = _interopRequireWildcard(_ramda);

var _kick = __webpack_require__(24);

var _snare = __webpack_require__(26);

var _hat = __webpack_require__(25);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GMDrumSynth = exports.GMDrumSynth = (audioContext = (0, _utils.mandatory)('audioContext')) => {
	var bd = (0, _kick.Kick)(audioContext).setDurationValue(0.1);
	var sn = (0, _snare.Snare)(audioContext).setDurationValue(0.5);
	var hi = (0, _hat.Hat)(audioContext).setDurationValue(0.1);
	var hat = (0, _hat.Hat)(audioContext).setDurationValue(0.5);

	var output = (0, _utils.wrapNode)(audioContext.createGain());

	bd.connect(output);
	sn.connect(output);
	hi.connect(output);
	hat.connect(output);

	return {
		noteOn(midiValue, velocity, time = audioContext.currentTime) {
			R.cond([[R.equals(35), () => bd.noteOn(time)], [R.equals(36), () => bd.noteOn(time)], [R.equals(38), () => sn.noteOn(time)], [R.equals(40), () => sn.noteOn(time)], [R.equals(42), () => hi.noteOn(time)], [R.equals(46), () => hat.noteOn(time)], [R.T, () => {}]])(midiValue);
		},
		noteOff(midiValue, time = audioContext.currentTime) {
			R.cond([[R.equals(36), () => bd.noteOff(time)], [R.equals(38), () => sn.noteOff(time)], [R.T, () => {}]])(midiValue);
		},
		connect({ connect, getInput }) {
			output.connect({ getInput });
			return { connect };
		}
	};
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DryWetMixer = undefined;

var _assign = __webpack_require__(69);

var _assign2 = _interopRequireDefault(_assign);

var _nodeOutputMixer = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DryWetMixer = exports.DryWetMixer = audioContext => {
	var nodeOutputMixer = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);
	var inputGainNode = audioContext.createGain();
	var dryGainNode = audioContext.createGain();

	var wetNode = audioContext.createGain();

	inputGainNode.connect(dryGainNode);
	inputGainNode.connect(wetNode);

	nodeOutputMixer.setLeftInput(dryGainNode);
	nodeOutputMixer.setRightInput(wetNode);

	return (0, _assign2.default)(nodeOutputMixer, {
		getInput() {
			return inputGainNode;
		},
		setWetNode(sfxNodeOrMacro) {
			wetNode = sfxNodeOrMacro.getInput ? sfxNodeOrMacro.getInput() : sfxNodeOrMacro;
			nodeOutputMixer.setRightInput(wetNode);
			inputGainNode.disconnect();
			inputGainNode.connect(dryGainNode);
			inputGainNode.connect(wetNode);
			return this;
		}
	});
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(7);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(72) });


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(73);
var pIE = __webpack_require__(74);
var toObject = __webpack_require__(15);
var IObject = __webpack_require__(20);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AccentEnvelope = undefined;

var _ramda = __webpack_require__(6);

var _utils = __webpack_require__(1);

var AccentEnvelope = exports.AccentEnvelope = (audioContext = (0, _utils.mandatory)()) => {
	var attackTime = 0;
	var decayTime = 0;
	var accentValue = 0;
	var peakValue = 0;
	var sustainValue = peakValue;
	var isActive = true;

	var parameter = void 0;

	var assertMandatoryParameter = () => {
		if ((0, _ramda.isNil)(parameter)) {
			throw new Error('Missing envelope parameter, use connect(audioParam) before calling method');
		}
	};

	return {
		connect(audioParam = (0, _utils.mandatory)()) {
			parameter = audioParam;
			return this;
		},
		trigger(time = audioContext.currentTime) {
			assertMandatoryParameter();
			if (isActive) {
				peakValue = sustainValue + accentValue;
				parameter.setValueAtTime(sustainValue, time);
				parameter.linearRampToValueAtTime(peakValue, time + attackTime);
				parameter.exponentialRampToValueAtTime(sustainValue, time + attackTime + decayTime);
			}
		},
		disconnect(time = audioContext.currentTime) {
			assertMandatoryParameter();
			if (isActive) {
				parameter.setValueAtTime(sustainValue, time);
				parameter.cancelScheduledValues(time);
			}
		},
		isActive() {
			return isActive;
		},
		setActive(value = (0, _utils.mandatory)()) {
			isActive = value;
			return this;
		},
		setAccentValue(value = (0, _utils.mandatory)()) {
			accentValue = value;
			return this;
		},
		getAccentValue() {
			return accentValue;
		},
		setAttackTime(time = (0, _utils.mandatory)()) {
			attackTime = time;
			return this;
		},
		getAttackTime() {
			return attackTime;
		},
		setDecayTime(time = (0, _utils.mandatory)()) {
			decayTime = time;
			return this;
		},
		getDecayTime() {
			return decayTime;
		},
		setSustainValue(value = (0, _utils.mandatory)()) {
			sustainValue = value;
			return this;
		},
		getSustainValue() {
			return sustainValue;
		}
	};
};

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _waveForms = __webpack_require__(12);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_waveForms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _waveForms[key];
    }
  });
});

var _filterTypes = __webpack_require__(13);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_filterTypes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _filterTypes[key];
    }
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDRlN2Y4ZjZmYmQ5ZjliYjA3Y2UiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2ZpbHRlci10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMva2ljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL3NuYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGVsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9ub29wLWluc3RydW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9nbS1kcnVtLXN5bnRoLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3Mvcm91dGluZy9kcnktd2V0LW1peGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1hbmRhdG9yeSIsInBhcmFtZXRlck5hbWUiLCJFcnJvciIsImNyZWF0ZVJhbmRvbVdhdmVGb3JtIiwiYXVkaW9Db250ZXh0IiwiY29tcGxleGl0eSIsImkiLCJGbG9hdDMyQXJyYXkiLCJmcm9tIiwiTWF0aCIsInJhbmRvbSIsInIiLCJjcmVhdGVQZXJpb2RpY1dhdmUiLCJjcmVhdGVOb2lzZUJ1ZmZlciIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwibnVtQ2hhbm5lbHMiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJ3cmFwTm9kZSIsImF1ZGlvTm9kZSIsImdldE5vZGUiLCJnZXRJbnB1dCIsImNvbm5lY3QiLCJXYXZlRm9ybXMiLCJTUVVBUkUiLCJTQVdUT09USCIsIlRSSUFOR0xFIiwiU0lORSIsIlJBTkRPTSIsIkZpbHRlclR5cGVzIiwiTE9XX1BBU1MiLCJCQU5EX1BBU1MiLCJISUdIX1BBU1MiLCJMT1dfU0hFTEYiLCJISUdIX1NIRUxGIiwiQUxMX1BBU1MiLCJOb2RlT3V0cHV0TWl4ZXIiLCJvdXRwdXRHYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJsZWZ0R2Fpbk5vZGUiLCJyaWdodEdhaW5Ob2RlIiwiTUlERExFX0dBSU5fVkFMVUUiLCJmYWRlVmFsdWUiLCJnYWluIiwidmFsdWUiLCJzZXRGYWRlVmFsdWUiLCJnZXRGYWRlVmFsdWUiLCJzZXRMZWZ0SW5wdXQiLCJzZXRSaWdodElucHV0IiwiZ2V0TGVmdEdhaW5Ob2RlIiwiZ2V0UmlnaHRHYWluTm9kZSIsIktpY2siLCJvdXRwdXQiLCJvc2NHYWluIiwiY29tcCIsImNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciIsImZpbHRlciIsImNyZWF0ZUJpcXVhZEZpbHRlciIsIm9zYyIsImNyZWF0ZU9zY2lsbGF0b3IiLCJmcmVxdWVuY3kiLCJ0aHJlc2hvbGQiLCJrbmVlIiwicmF0aW8iLCJhdHRhY2siLCJyZWxlYXNlIiwiZmluYWxGcmVxdWVuY3kiLCJpbml0aWFsRnJlcXVlbmN5IiwiZHVyYXRpb24iLCJpc011dGVkIiwib3V0cHV0R2FpblZhbHVlIiwidHlwZSIsInN0YXJ0IiwiY3VycmVudFRpbWUiLCJub3RlT24iLCJ2ZWxvY2l0eSIsInRpbWUiLCJleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lIiwibm90ZU9mZiIsImNhbmNlbFNjaGVkdWxlZFZhbHVlcyIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXREdXJhdGlvblZhbHVlIiwiZ2V0RHVyYXRpb25WYWx1ZSIsInNldE91dHB1dEdhaW5WYWx1ZSIsImdldE91dHB1dEdhaW5WYWx1ZSIsIm11dGUiLCJ1bk11dGUiLCJIYXQiLCJnYXRlIiwiYmFuZHBhc3NGaWx0ZXIiLCJoaWdocGFzc0ZpbHRlciIsInJhdGlvcyIsIm9zY3MiLCJmdW5kYW1lbnRhbCIsImZvckVhY2giLCJwdXNoIiwic2V0VmFsdWVBdFRpbWUiLCJsZW5ndGgiLCJwb3AiLCJzdG9wIiwic2V0RnVuZGFtZW50YWxWYWx1ZSIsImdldEZ1bmRhbWVudGFsVmFsdWUiLCJTbmFyZSIsIm5vaXNlQnVmZmVyIiwibm9pc2VHYWluIiwibm9pc2VGaWx0ZXIiLCJub2RlTWl4ZXIiLCJub2lzZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsIm9zY01peFZhbHVlIiwibm9pc2VGaWx0ZXJWYWx1ZSIsInJlYWwiLCJpbWFnaW5hcnkiLCJjdXN0b21XYXZlIiwibG9vcCIsInNldFBlcmlvZGljV2F2ZSIsInNldE9zY01peFZhbHVlIiwiZ2V0T3NjTWl4VmFsdWUiLCJzZXROb2lzZUZpbHRlclZhbHVlIiwiZ2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwiZGF0YSIsIm5leHQiLCJhcyIsImFjdGlvbiIsIm1hcCIsInVuc2NhbGUiLCJyYW5nZSIsIm1heCIsIm1pbiIsInNjYWxlIiwiU2VxdWVuY2VyIiwidGlja3NQZXJRdWFydGVyTm90ZSIsInN0YXJ0VGltZSIsIm5leHRUaWNrVGltZSIsInRpY2siLCJvblRpY2siLCJvblN0b3AiLCJvblN0YXJ0Iiwib25Mb29wIiwidGVtcG8iLCJ0aW1lciIsInNjaGVkdWxlIiwib3AiLCJwbGF5Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiaXNTdGFydGVkIiwic2V0TG9vcE1vZGUiLCJnZXRMb29wTW9kZSIsInNldExlbmd0aCIsImdldExlbmd0aCIsInNldERpdmlzaW9uIiwiZ2V0RGl2aXNpb24iLCJzZXRUZW1wbyIsImdldFRlbXBvIiwiZ2V0VGltZSIsIkRVUkFUSU9OUyIsIldIT0xFIiwiSEFMRiIsIlFVQVJURVIiLCJFSUdIVEgiLCJwaXRjaENsYXNzZXMiLCJtaWRpVG9GcmVxdWVuY3kiLCJ0dW5pbmciLCJtaWRpVmFsdWUiLCJfIiwic3ltYm9sVG9NaWRpIiwicGl0Y2hDbGFzcyIsIm9jdGF2ZSIsImluZGV4T2YiLCJtaWRpVG9TeW1ib2wiLCJwaXRjaENsYXNzSW5kZXgiLCJmcmVxdWVuY3lUb01pZGkiLCJzeW1ib2xUb0ZyZXF1ZW5jeSIsImZyZXF1ZW5jeVRvU3ltYm9sIiwiRGVsYXkiLCJkZWxheSIsImNyZWF0ZURlbGF5IiwiZmVlZGJhY2siLCJkaXZpc2lvbiIsImRpdmlzaW9uVG9EZWxheVRpbWUiLCJfZGl2aXNpb24iLCJfdGVtcG8iLCJkZWxheVRpbWVTZWNvbmRzIiwiZGVsYXlUaW1lIiwic2V0VGVtcG9WYWx1ZSIsImdldFRlbXBvVmFsdWUiLCJzZXREaXZpc2lvblZhbHVlIiwiZmVlZGJhY2tWYWx1ZSIsImdldERpdmlzaW9uVmFsdWUiLCJzZXREZWxheVRpbWVWYWx1ZSIsImdldERlbGF5VGltZVZhbHVlIiwic2V0RmVlZGJhY2tWYWx1ZSIsImdldEZlZWRiYWNrVmFsdWUiLCJEaXN0b3J0aW9uIiwibWFrZURpc3RvcnRpb25DdXJ2ZSIsImFtb3VudCIsImsiLCJuU2FtcGxlcyIsImN1cnZlIiwiZGVnIiwiUEkiLCJ4IiwiYWJzIiwiZGlzdCIsImNyZWF0ZVdhdmVTaGFwZXIiLCJzZXRDdXJ2ZSIsIk5vb3BJbnN0cnVtZW50IiwiUiIsIkdNRHJ1bVN5bnRoIiwiYmQiLCJzbiIsImhpIiwiaGF0IiwiY29uZCIsImVxdWFscyIsIlQiLCJEcnlXZXRNaXhlciIsIm5vZGVPdXRwdXRNaXhlciIsImlucHV0R2Fpbk5vZGUiLCJkcnlHYWluTm9kZSIsIndldE5vZGUiLCJzZXRXZXROb2RlIiwic2Z4Tm9kZU9yTWFjcm8iLCJkaXNjb25uZWN0IiwiQWNjZW50RW52ZWxvcGUiLCJhdHRhY2tUaW1lIiwiZGVjYXlUaW1lIiwiYWNjZW50VmFsdWUiLCJwZWFrVmFsdWUiLCJzdXN0YWluVmFsdWUiLCJpc0FjdGl2ZSIsInBhcmFtZXRlciIsImFzc2VydE1hbmRhdG9yeVBhcmFtZXRlciIsImF1ZGlvUGFyYW0iLCJ0cmlnZ2VyIiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiLCJzZXRBY3RpdmUiLCJzZXRBY2NlbnRWYWx1ZSIsImdldEFjY2VudFZhbHVlIiwic2V0QXR0YWNrVGltZSIsImdldEF0dGFja1RpbWUiLCJzZXREZWNheVRpbWUiLCJnZXREZWNheVRpbWUiLCJzZXRTdXN0YWluVmFsdWUiLCJnZXRTdXN0YWluVmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FB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O0FBQ0EsR0FsQ0s7QUFtQ05ZLGdCQUFjOUssT0FBTyx1QkFBckIsRUFBa0M7QUFDakNnSyxnQkFBYWhLLElBQWI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQXRDSztBQXVDTitLLGtCQUFnQjtBQUNmLFVBQU9mLFVBQVA7QUFDQSxHQXpDSztBQTBDTmdCLGVBQWFoTCxPQUFPLHVCQUFwQixFQUFpQztBQUNoQ2lLLGVBQVlqSyxJQUFaO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsR0E3Q0s7QUE4Q05pTCxpQkFBZTtBQUNkLFVBQU9oQixTQUFQO0FBQ0EsR0FoREs7QUFpRE5pQixrQkFBZ0JsTixRQUFRLHVCQUF4QixFQUFxQztBQUNwQ29NLGtCQUFlcE0sS0FBZjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBcERLO0FBcURObU4sb0JBQWtCO0FBQ2pCLFVBQU9mLFlBQVA7QUFDQTtBQXZESyxFQUFQO0FBeURBLENBekVNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwiZmlsZSI6Indhc2EuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDRlN2Y4ZjZmYmQ5ZjliYjA3Y2UiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi41LjEnIH07XG5pZiAodHlwZW9mIF9fZSA9PSAnbnVtYmVyJykgX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgdGltZXMgfSBmcm9tICdyYW1kYSdcblxuZXhwb3J0IGNvbnN0IG1hbmRhdG9yeSA9IChwYXJhbWV0ZXJOYW1lID0gJycpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG1hbmRhdG9yeSBwYXJhbWV0ZXIgJHtwYXJhbWV0ZXJOYW1lfWApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSYW5kb21XYXZlRm9ybSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSwgY29tcGxleGl0eSA9IDgpID0+IHtcblx0Y29uc3QgaSA9IEZsb2F0MzJBcnJheS5mcm9tKHRpbWVzKE1hdGgucmFuZG9tLCBjb21wbGV4aXR5KSlcblx0Y29uc3QgciA9IEZsb2F0MzJBcnJheS5mcm9tKHRpbWVzKE1hdGgucmFuZG9tLCBjb21wbGV4aXR5KSlcblx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUociwgaSlcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vaXNlQnVmZmVyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdGNvbnN0IGJ1ZmZlclNpemUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBudW1DaGFubmVscyA9IDFcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihudW1DaGFubmVscywgYnVmZmVyU2l6ZSwgYnVmZmVyU2l6ZSlcblx0Y29uc3QgbyA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkgKz0gMSkge1xuXHRcdG9baV0gPSBNYXRoLnJhbmRvbSgpXG5cdH1cblx0cmV0dXJuIGJ1ZmZlclxufVxuXG5leHBvcnQgY29uc3Qgd3JhcE5vZGUgPSAoYXVkaW9Ob2RlID0gbWFuZGF0b3J5KCkpID0+ICh7XG5cdGdldE5vZGUoKSB7XG5cdFx0cmV0dXJuIGF1ZGlvTm9kZVxuXHR9LFxuXHRnZXRJbnB1dCgpIHtcblx0XHRyZXR1cm4gYXVkaW9Ob2RlXG5cdH0sXG5cdGNvbm5lY3QoeyBnZXRJbnB1dCwgY29ubmVjdCB9KSB7XG5cdFx0YXVkaW9Ob2RlLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0fSxcbn0pXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYW1kYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmFtZGFcIixcImNvbW1vbmpzMlwiOlwicmFtZGFcIixcImFtZFwiOlwicmFtZGFcIn1cbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBXYXZlRm9ybXMgPSBPYmplY3QuZnJlZXplKHtcblx0U1FVQVJFOiAnc3F1YXJlJyxcblx0U0FXVE9PVEg6ICdzYXd0b290aCcsXG5cdFRSSUFOR0xFOiAndHJpYW5nbGUnLFxuXHRTSU5FOiAnc2luZScsXG5cdFJBTkRPTTogJ3JhbmRvbScsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy93YXZlLWZvcm1zLmpzIiwiZXhwb3J0IGNvbnN0IEZpbHRlclR5cGVzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdExPV19QQVNTOiAnbG93cGFzcycsXG5cdEJBTkRfUEFTUzogJ2JhbmRwYXNzJyxcblx0SElHSF9QQVNTOiAnaGlnaHBhc3MnLFxuXHRMT1dfU0hFTEY6ICdsb3dzaGVsZicsXG5cdEhJR0hfU0hFTEY6ICdoaWdoc2hlbGYnLFxuXHRBTExfUEFTUzogJ2FsbHBhc3MnLFxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvZmlsdGVyLXR5cGVzLmpzIiwiaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdC8qIHdlYiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbGVmdEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCByaWdodEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXG5cdC8qIGNvbnN0YW50IHZhbHVlcyAqL1xuXHRjb25zdCBNSURETEVfR0FJTl9WQUxVRSA9IDAuNVxuXG5cdC8qIHBhcmFtZXRlciB2YWx1ZXMgKi9cblx0bGV0IGZhZGVWYWx1ZSA9IDBcblxuXHQvKiByb3V0aW5nICovXG5cdGxlZnRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRyaWdodEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUVcblx0cmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUVcblxuXHRyZXR1cm4ge1xuXHRcdHNldEZhZGVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSAtICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0cmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUUgKyAodmFsdWUgKiBNSURETEVfR0FJTl9WQUxVRSlcblx0XHRcdGZhZGVWYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RmFkZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZhZGVWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0TGVmdElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QobGVmdEdhaW5Ob2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldFJpZ2h0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChyaWdodEdhaW5Ob2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXRHYWluTm9kZS5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldExlZnRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiBsZWZ0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdGdldFJpZ2h0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gcmlnaHRHYWluTm9kZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9ub2RlLW91dHB1dC1taXhlci5qcyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgV2F2ZUZvcm1zIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3dhdmUtZm9ybXMnXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBLaWNrID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBjb21wID0gYXVkaW9Db250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cblx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDI1MDBcblxuXHRjb21wLnRocmVzaG9sZC52YWx1ZSA9IDAuMCAvLyB0aGlzIGlzIHRoZSBwaXRmYWxsLCBsZWF2ZSBzb21lIGhlYWRyb29tXG5cdGNvbXAua25lZS52YWx1ZSA9IDAuMCAvLyBicnV0ZSBmb3JjZVxuXHRjb21wLnJhdGlvLnZhbHVlID0gMjAuMCAvLyBtYXggY29tcHJlc3Npb25cblx0Y29tcC5hdHRhY2sudmFsdWUgPSAwLjA1IC8vIDVtcyBhdHRhY2tcblx0Y29tcC5yZWxlYXNlLnZhbHVlID0gMC4wNTAgLy8gNTBtcyByZWxlYXNlXG5cblx0Y29uc3QgZmluYWxGcmVxdWVuY3kgPSAwLjAxXG5cblx0bGV0IGluaXRpYWxGcmVxdWVuY3kgPSAyMDBcblx0bGV0IGR1cmF0aW9uID0gMC4xNVxuXHRsZXQgaXNNdXRlZCA9IGZhbHNlXG5cdGxldCBvdXRwdXRHYWluVmFsdWUgPSAxRS0xMFxuXG5cdC8qIHJvdXRpbmcgKi9cblx0b3NjLmNvbm5lY3Qob3NjR2FpbikuY29ubmVjdChmaWx0ZXIpLmNvbm5lY3QoY29tcCkuY29ubmVjdChvdXRwdXQpXG5cblx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWVcblx0b3NjR2Fpbi5nYWluLnZhbHVlID0gMUUtMTBcblx0b3NjLnR5cGUgPSBXYXZlRm9ybXMuU0lORVxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHZlbG9jaXR5ID0gMC44LCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShpbml0aWFsRnJlcXVlbmN5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcXVlbmN5LCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aW5pdGlhbEZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gaW5pdGlhbEZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0R2FpblZhbHVlID0gdmFsdWVcblx0XHRcdGlmICghaXNNdXRlZCkge1xuXHRcdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXRHYWluVmFsdWVcblx0XHR9LFxuXHRcdG11dGUoKSB7XG5cdFx0XHRpc011dGVkID0gdHJ1ZVxuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSAxRS0xMFxuXHRcdH0sXG5cdFx0dW5NdXRlKCkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWVcblx0XHRcdGlzTXV0ZWQgPSBmYWxzZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMva2ljay5qcyIsImltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlscydcbmltcG9ydCB7IEZpbHRlclR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2ZpbHRlci10eXBlcydcbmltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuXG5leHBvcnQgY29uc3QgSGF0ID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBnYXRlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBiYW5kcGFzc0ZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBoaWdocGFzc0ZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXG5cdGNvbnN0IHJhdGlvcyA9IFsyLCAzLCA0LjE2LCA1LjQzLCA2Ljc5LCA4LjIxXVxuXHRjb25zdCBvc2NzID0gW11cblxuXHRsZXQgZnVuZGFtZW50YWwgPSAzNVxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cblx0Lyogcm91dGluZyAqL1xuXHRiYW5kcGFzc0ZpbHRlclxuXHRcdC5jb25uZWN0KGhpZ2hwYXNzRmlsdGVyKVxuXHRcdC5jb25uZWN0KGdhdGUpXG5cdFx0LmNvbm5lY3Qob3V0cHV0KVxuXG5cdGJhbmRwYXNzRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5CQU5EX1BBU1Ncblx0YmFuZHBhc3NGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gOTAwMFxuXHRoaWdocGFzc0ZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuSElHSF9QQVNTXG5cdGhpZ2hwYXNzRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDkwMDBcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih2ZWxvY2l0eSA9IDEsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdHJhdGlvcy5mb3JFYWNoKChyYXRpbykgPT4ge1xuXHRcdFx0XHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdFx0XHRcdG9zYy50eXBlID0gV2F2ZUZvcm1zLlNRVUFSRVxuXHRcdFx0XHQvLyBGcmVxdWVuY3kgaXMgdGhlIGZ1bmRhbWVudGFsICogdGhpcyBvc2NpbGxhdG9yJ3MgcmF0aW9cblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZ1bmRhbWVudGFsICogcmF0aW9cblx0XHRcdFx0b3NjLmNvbm5lY3QoYmFuZHBhc3NGaWx0ZXIpXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0XHRvc2NzLnB1c2gob3NjKVxuXHRcdFx0fSlcblx0XHRcdGdhdGUuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5IC8gcmF0aW9zLmxlbmd0aCwgdGltZSArIDAuMDIpXG5cdFx0XHRnYXRlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgodmVsb2NpdHkgLyByYXRpb3MubGVuZ3RoKSAqIDAuMywgdGltZSArIDAuMDMpXG5cdFx0XHRnYXRlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdGdhdGUuZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zY3MuZm9yRWFjaCgoKSA9PiB7XG5cdFx0XHRcdG9zY3MucG9wKCkuc3RvcCh0aW1lKVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnVuZGFtZW50YWxWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZnVuZGFtZW50YWwgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZ1bmRhbWVudGFsVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnVuZGFtZW50YWxcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0LmpzIiwiaW1wb3J0IHsgTm9kZU91dHB1dE1peGVyIH0gZnJvbSAnLi4vLi4vcm91dGluZy9ub2RlLW91dHB1dC1taXhlcidcbmltcG9ydCB7IEZpbHRlclR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2ZpbHRlci10eXBlcydcblxuZXhwb3J0IGNvbnN0IFNuYXJlID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXG5cdGNvbnN0IGJ1ZmZlclNpemUgPSAyICogYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3Qgbm9pc2VCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGJ1ZmZlclNpemUsIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKVxuXHRjb25zdCBvID0gbm9pc2VCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGNvbnN0IG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgZnJlcXVlbmN5ID0gODBcblx0bGV0IG9zY01peFZhbHVlID0gMC4yXG5cdGxldCBub2lzZUZpbHRlclZhbHVlID0gNDAwMFxuXG5cdGNvbnN0IHJlYWwgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAxXSlcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pXG5cdGNvbnN0IGN1c3RvbVdhdmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHJlYWwsIGltYWdpbmFyeSlcblxuXHRub2lzZUZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IG5vaXNlRmlsdGVyVmFsdWVcblx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRub2lzZUdhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdG5vaXNlLmJ1ZmZlciA9IG5vaXNlQnVmZmVyXG5cdG5vaXNlLmxvb3AgPSB0cnVlXG5cblx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKVxuXG5cdG9zYy5jb25uZWN0KG9zY0dhaW4pXG5cdG5vaXNlLmNvbm5lY3Qobm9pc2VGaWx0ZXIpLmNvbm5lY3Qobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuc2V0TGVmdElucHV0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSlcblxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRub2lzZS5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXF1ZW5jeSAvIDIsIHRpbWUgKyAwLjE1KVxuXHRcdFx0b3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyAwLjE1KVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXRPc2NNaXhWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3NjTWl4VmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9kZU1peGVyLnNldEZhZGVWYWx1ZShvc2NNaXhWYWx1ZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPc2NNaXhWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvc2NNaXhWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0Tm9pc2VGaWx0ZXJWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9pc2VGaWx0ZXJWYWx1ZSA9IHZhbHVlXG5cdFx0XHRub2lzZUZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE5vaXNlRmlsdGVyVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJ1xuZXhwb3J0ICogZnJvbSAnLi9tYWNyb3MnXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vZGlzcGF0Y2hlcidcbmV4cG9ydCAqIGZyb20gJy4vcmFuZ2UnXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJ1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVFx0OiAwLFxuXHRTRVFVRU5DRVJfU1RPUFx0OiAxLFxuXHRTRVFVRU5DRVJfVElDS1x0OiAyLFxuXHRURU1QT19DSEFOR0VcdDogMyxcblx0Q0hBTkdFOiA5OTksXG59KVxuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9ICgoKSA9PiB7XG5cdGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpXG5cdHJldHVybiB7XG5cdFx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdFx0c3ViamVjdC5uZXh0KHsgdHlwZSwgZGF0YSB9KVxuXHRcdH0sXG5cdFx0YXModHlwZSkge1xuXHRcdFx0cmV0dXJuIHN1YmplY3Rcblx0XHRcdFx0LmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG5cdFx0XHRcdC5tYXAoYWN0aW9uID0+IGFjdGlvbi5kYXRhKVxuXHRcdH0sXG5cdH1cbn0pKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbiAoJGZyZWV6ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBVbm5vcm1hbGl6ZXMgYSBbMC0xXSByYW5nZSB2YWx1ZSBiYWNrIHRvIHRoZSBnaXZlbiByYW5nZVxuICogQHBhcmFtIHtPYmplY3R9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNjYWxlID0gKHJhbmdlLCB2YWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pblxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdmFsdWUgdG8gYSBbMCwxXSByYW5nZSBnaXZlbiBpdHMgb3JpZ2luYWwgcmFuZ2UubWluIGFuZCByYW5nZS5tYXhcbiAqIEBwYXJhbSB7T2JqZWN0fSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICovXG5leHBvcnQgY29uc3Qgc2NhbGUgPSAocmFuZ2UsIHZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKHZhbHVlIC0gcmFuZ2UubWluKSAvIChyYW5nZS5tYXggLSByYW5nZS5taW4pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0LyogdGltZSB2YWx1ZXMgKi9cblx0bGV0IHRpY2tzUGVyUXVhcnRlck5vdGUgPSA0XG5cdGxldCBzdGFydFRpbWUgPSAwXG5cdGxldCBuZXh0VGlja1RpbWUgPSAwXG5cdGxldCB0aWNrID0gMFxuXHQvKiBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2tzICovXG5cdGxldCBvblRpY2sgPSAoKSA9PiB7fVxuXHRsZXQgb25TdG9wID0gKCkgPT4ge31cblx0bGV0IG9uU3RhcnQgPSAoKSA9PiB7fVxuXHRsZXQgb25Mb29wID0gKCkgPT4ge31cblx0Lyogc3RhdGUgKi9cblx0bGV0IHN0b3AgPSB0cnVlXG5cdGxldCBsb29wID0gdHJ1ZVxuXHRsZXQgdGVtcG8gPSAxMzBcblx0bGV0IGxlbmd0aCA9IDE2XG5cblx0bGV0IHRpbWVyXG5cblx0LyoqXG5cdCAqIFNjaGVkdWxlIGlzIGNhbGxlZCBldmVyeSB0aW1lIGEgbmV3IHRpY2sgb2NjdXJzXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wIC0gb24gdGljayBjYWxsYmFjayBmdW5jdGlvblxuXHQgKi9cblx0Y29uc3Qgc2NoZWR1bGUgPSAob3ApID0+IHtcblx0XHRjb25zdCBjdXJyZW50VGltZSA9IChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0aWYgKCFzdG9wICYmIGN1cnJlbnRUaW1lID49IG5leHRUaWNrVGltZSkge1xuXHRcdFx0dGljayArPSAxXG5cdFx0XHRuZXh0VGlja1RpbWUgPSBjdXJyZW50VGltZSArICg2MCAvICh0ZW1wbyAqIHRpY2tzUGVyUXVhcnRlck5vdGUpKVxuXHRcdFx0b3AodGljaywgdGVtcG8sIHRpY2tzUGVyUXVhcnRlck5vdGUsIG5leHRUaWNrVGltZSlcblx0XHRcdGlmIChsb29wICYmIHRpY2sgPT09IGxlbmd0aCkge1xuXHRcdFx0XHR0aWNrID0gMFxuXHRcdFx0XHRvbkxvb3AoKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHBsYXkgPSAoKSA9PiB7XG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0fSwgMClcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KClcblx0XHRcdHN0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuXHRcdFx0c3RvcCA9IGZhbHNlXG5cdFx0XHRwbGF5KClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzdG9wKCkge1xuXHRcdFx0V29ya2VyVGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lcilcblx0XHRcdHN0b3AgPSB0cnVlXG5cdFx0XHRuZXh0VGlja1RpbWUgPSAwXG5cdFx0XHR0aWNrID0gMFxuXHRcdFx0b25TdG9wKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRpc1N0YXJ0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gIXN0b3Bcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMb29wTW9kZSgpIHtcblx0XHRcdHJldHVybiBsb29wXG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVuZ3RoKCkge1xuXHRcdFx0cmV0dXJuIGxlbmd0aFxuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdHRpY2tzUGVyUXVhcnRlck5vdGUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uKCkge1xuXHRcdFx0cmV0dXJuIHRpY2tzUGVyUXVhcnRlck5vdGVcblx0XHR9LFxuXHRcdHNldFRlbXBvKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG8oKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdGdldFRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lXG5cdFx0fSxcblx0XHRvblN0YXJ0KG9wKSB7XG5cdFx0XHRvblN0YXJ0ID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblN0b3Aob3ApIHtcblx0XHRcdG9uU3RvcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25UaWNrKG9wKSB7XG5cdFx0XHRvblRpY2sgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uTG9vcChvcCkge1xuXHRcdFx0b25Mb29wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChnbG9iYWwgPT09IGdsb2JhbC53aW5kb3cgJiYgZ2xvYmFsLlVSTCAmJiBnbG9iYWwuQmxvYiAmJiBnbG9iYWwuV29ya2VyKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBUSU1FUl9XT1JLRVJfU09VUkNFID0gW1xuICAgICAgXCJ2YXIgdGltZXJJZHMgPSB7fSwgXyA9IHt9O1wiLFxuICAgICAgXCJfLnNldEludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhckludGVydmFsKHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLnNldFRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhclRpbWVvdXQodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsgX1tlLmRhdGEudHlwZV0oZS5kYXRhKSB9O1wiXG4gICAgXS5qb2luKFwiXCIpO1xuXG4gICAgdmFyIF90aW1lcklkID0gMDtcbiAgICB2YXIgX2NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciBfdGltZXIgPSBuZXcgZ2xvYmFsLldvcmtlcihnbG9iYWwuVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICAgIG5ldyBnbG9iYWwuQmxvYihbIFRJTUVSX1dPUktFUl9TT1VSQ0UgXSwgeyB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiIH0pXG4gICAgKSk7XG5cbiAgICBfdGltZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKF9jYWxsYmFja3NbZS5kYXRhXSkge1xuICAgICAgICBfY2FsbGJhY2tzW2UuZGF0YV0uY2FsbGJhY2suYXBwbHkobnVsbCwgX2NhbGxiYWNrc1tlLmRhdGFdLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRJbnRlcnZhbFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFRpbWVvdXRcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFySW50ZXJ2YWxcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJUaW1lb3V0XCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJ1xuXG4vKipcbiAqIE5vdGVzIER1cmF0aW9ucyBDb25zdGFudHNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBEVVJBVElPTlMgPSBPYmplY3QuZnJlZXplKHtcblx0V0hPTEU6IDEsXG5cdEhBTEY6IDEgLyAyLFxuXHRRVUFSVEVSOiAxIC8gNCxcblx0RUlHSFRIOiAxIC8gOCxcbn0pXG5cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgbWlkaVRvRnJlcXVlbmN5ID0gKHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3Qgc3ltYm9sVG9NaWRpID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0KChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcGl0Y2ggY2xhc3MgYW5kIG9jdGF2ZSBmb3IgdGhlIGdpdmVuIG1pZGkgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pZGlUb1N5bWJvbCA9IChtaWRpVmFsdWUpID0+IHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9NaWRpID0gKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSA9PiB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbFRvRnJlcXVlbmN5ID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0bWlkaVRvRnJlcXVlbmN5KDQ0MCwgc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkpXG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG5vdGUgYW5kIG9jdGF2ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIGZyZXF1ZW5jeVxuICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9TeW1ib2wgPSBmcmVxdWVuY3kgPT4gbWlkaVRvU3ltYm9sKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIGZyZXF1ZW5jeSkpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9ub3RlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuTWF0aC5sb2cyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICdAL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9raWNrJ1xuZXhwb3J0ICogZnJvbSAnQC9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuZXhwb3J0ICogZnJvbSAnQC9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5leHBvcnQgKiBmcm9tICdAL21hY3Jvcy9lZmZlY3RzL2RlbGF5J1xuZXhwb3J0ICogZnJvbSAnQC9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uJ1xuZXhwb3J0ICogZnJvbSAnQC9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50J1xuZXhwb3J0ICogZnJvbSAnQC9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aCdcbmV4cG9ydCAqIGZyb20gJ0AvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlcidcbmV4cG9ydCAqIGZyb20gJ0AvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICdAL21hY3Jvcy9tb2R1bGF0aW9ucy9hY2NlbnQtZW52ZWxvcGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IERlbGF5ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBkZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSg1LjApXG5cdGNvbnN0IGZlZWRiYWNrID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHQvKiByb3V0aW5nICovXG5cdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdFx0XHQuY29ubmVjdChmaWx0ZXIpXG5cdFx0XHQuY29ubmVjdChkZWxheSlcblx0XHRcdC5jb25uZWN0KG91dHB1dClcblx0LyogcGFyYW1ldGVycyAqL1xuXHRmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuXHRsZXQgdGVtcG8gPSAxMjBcblx0bGV0IGRpdmlzaW9uID0gM1xuXHQvKiBjb252ZXJ0IGJlYXQgZGl2aXNpb24gdG8gZGVsYXkgdGltZSBpbiBzZWNvbmRzICovXG5cdGNvbnN0IGRpdmlzaW9uVG9EZWxheVRpbWUgPSAoX2RpdmlzaW9uLCBfdGVtcG8pID0+IDYwIC8gKF90ZW1wbyAqIF9kaXZpc2lvbilcblx0bGV0IGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblxuXHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlcblx0XHR9LFxuXHRcdHNldFRlbXBvVmFsdWUodmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdHNldERpdmlzaW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGRpdmlzaW9uID0gdmFsdWVcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblx0XHRcdGNvbnN0IGZlZWRiYWNrVmFsdWUgPSBmZWVkYmFjay5nYWluLnZhbHVlXG5cdFx0XHRmZWVkYmFjay5nYWluLnZhbHVlID0gMFxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdFx0ZmVlZGJhY2suZ2Fpbi52YWx1ZSA9IGZlZWRiYWNrVmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRpdmlzaW9uXG5cdFx0fSxcblx0XHRzZXREZWxheVRpbWVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGVsYXlUaW1lU2Vjb25kcyA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGVsYXlUaW1lVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZpbHRlci5mcmVxdWVuY3kudmFsdWVcblx0XHR9LFxuXHRcdHNldEZlZWRiYWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGZlZWRiYWNrLmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZlZWRiYWNrVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmVlZGJhY2suZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsImV4cG9ydCBjb25zdCBEaXN0b3J0aW9uID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBtYWtlRGlzdG9ydGlvbkN1cnZlID0gKGFtb3VudCkgPT4ge1xuXHRcdGNvbnN0IGsgPSB0eXBlb2YgYW1vdW50ID09PSAnbnVtYmVyJyA/IGFtb3VudCA6IDUwXG5cdFx0Y29uc3QgblNhbXBsZXMgPSA0NDEwMFxuXHRcdGNvbnN0IGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheSg0NDEwMClcblx0XHRjb25zdCBkZWcgPSBNYXRoLlBJIC8gMTgwXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuU2FtcGxlczsgaSArPSAxKSB7XG5cdFx0XHRjb25zdCB4ID0gKGkgKiAyKSAvIChuU2FtcGxlcyAtIDEpXG5cdFx0XHRjdXJ2ZVtpXSA9ICgoMyArIGspICogeCAqIDIwICogZGVnKSAvICgoTWF0aC5QSSArIGspICogTWF0aC5hYnMoeCkpXG5cdFx0fVxuXHRcdHJldHVybiBjdXJ2ZVxuXHR9XG5cdGNvbnN0IGRpc3QgPSBhdWRpb0NvbnRleHQuY3JlYXRlV2F2ZVNoYXBlcigpXG5cdGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDEwMClcblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0ZGlzdC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4gY29ubmVjdFxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGlzdFxuXHRcdH0sXG5cdFx0c2V0Q3VydmUoYW1vdW50KSB7XG5cdFx0XHRkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZShhbW91bnQpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwiZXhwb3J0IGNvbnN0IE5vb3BJbnN0cnVtZW50ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24oKSB7XG5cblx0XHR9LFxuXHRcdG5vdGVPZmYoKSB7XG5cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9ub29wLWluc3RydW1lbnQuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgS2ljayB9IGZyb20gJy4uLy4uL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9raWNrJ1xuaW1wb3J0IHsgU25hcmUgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5pbXBvcnQgeyBIYXQgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuaW1wb3J0IHsgbWFuZGF0b3J5LCB3cmFwTm9kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IEdNRHJ1bVN5bnRoID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3QgYmQgPSBLaWNrKGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpXG5cdGNvbnN0IHNuID0gU25hcmUoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuNSlcblx0Y29uc3QgaGkgPSBIYXQoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuMSlcblx0Y29uc3QgaGF0ID0gSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjUpXG5cblx0Y29uc3Qgb3V0cHV0ID0gd3JhcE5vZGUoYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSlcblxuXHRiZC5jb25uZWN0KG91dHB1dClcblx0c24uY29ubmVjdChvdXRwdXQpXG5cdGhpLmNvbm5lY3Qob3V0cHV0KVxuXHRoYXQuY29ubmVjdChvdXRwdXQpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24obWlkaVZhbHVlLCB2ZWxvY2l0eSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0Ui5jb25kKFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM1KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNiksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzgpLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQwKSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0MiksXG5cdFx0XHRcdFx0KCkgPT4gaGkubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDYpLFxuXHRcdFx0XHRcdCgpID0+IGhhdC5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLlQsXG5cdFx0XHRcdFx0KCkgPT4ge30sXG5cdFx0XHRcdF0sXG5cdFx0XHRdKShtaWRpVmFsdWUpXG5cdFx0fSxcblx0XHRub3RlT2ZmKG1pZGlWYWx1ZSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0Ui5jb25kKFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM2KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzgpLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPZmYodGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLlQsXG5cdFx0XHRcdFx0KCkgPT4ge30sXG5cdFx0XHRcdF0sXG5cdFx0XHRdKShtaWRpVmFsdWUpXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoeyBnZXRJbnB1dCB9KVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9nbS1kcnVtLXN5bnRoLmpzIiwiaW1wb3J0IHsgTm9kZU91dHB1dE1peGVyIH0gZnJvbSAnLi9ub2RlLW91dHB1dC1taXhlcidcblxuZXhwb3J0IGNvbnN0IERyeVdldE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBub2RlT3V0cHV0TWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBkcnlHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRsZXQgd2V0Tm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRMZWZ0SW5wdXQoZHJ5R2Fpbk5vZGUpXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRSaWdodElucHV0KHdldE5vZGUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24obm9kZU91dHB1dE1peGVyLCB7XG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRHYWluTm9kZVxuXHRcdH0sXG5cdFx0c2V0V2V0Tm9kZShzZnhOb2RlT3JNYWNybykge1xuXHRcdFx0d2V0Tm9kZSA9IHNmeE5vZGVPck1hY3JvLmdldElucHV0ID8gc2Z4Tm9kZU9yTWFjcm8uZ2V0SW5wdXQoKSA6IHNmeE5vZGVPck1hY3JvXG5cdFx0XHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXHRcdFx0aW5wdXRHYWluTm9kZS5kaXNjb25uZWN0KClcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdChkcnlHYWluTm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL2RyeS13ZXQtbWl4ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IEFjY2VudEVudmVsb3BlID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdGxldCBhdHRhY2tUaW1lID0gMFxuXHRsZXQgZGVjYXlUaW1lID0gMFxuXHRsZXQgYWNjZW50VmFsdWUgPSAwXG5cdGxldCBwZWFrVmFsdWUgPSAwXG5cdGxldCBzdXN0YWluVmFsdWUgPSBwZWFrVmFsdWVcblx0bGV0IGlzQWN0aXZlID0gdHJ1ZVxuXG5cdGxldCBwYXJhbWV0ZXJcblxuXHRjb25zdCBhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIgPSAoKSA9PiB7XG5cdFx0aWYgKGlzTmlsKHBhcmFtZXRlcikpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbnZlbG9wZSBwYXJhbWV0ZXIsIHVzZSBjb25uZWN0KGF1ZGlvUGFyYW0pIGJlZm9yZSBjYWxsaW5nIG1ldGhvZCcpXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KGF1ZGlvUGFyYW0gPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0cGFyYW1ldGVyID0gYXVkaW9QYXJhbVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHRyaWdnZXIodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0YXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyKClcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwZWFrVmFsdWUgPSBzdXN0YWluVmFsdWUgKyBhY2NlbnRWYWx1ZVxuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKVxuXHRcdFx0XHRwYXJhbWV0ZXIubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUocGVha1ZhbHVlLCB0aW1lICsgYXR0YWNrVGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lICsgYXR0YWNrVGltZSArIGRlY2F5VGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRpc2Nvbm5lY3QodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0YXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyKClcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKVxuXHRcdFx0XHRwYXJhbWV0ZXIuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpc0FjdGl2ZSgpIHtcblx0XHRcdHJldHVybiBpc0FjdGl2ZVxuXHRcdH0sXG5cdFx0c2V0QWN0aXZlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGlzQWN0aXZlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRBY2NlbnRWYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhY2NlbnRWYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0QWNjZW50VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gYWNjZW50VmFsdWVcblx0XHR9LFxuXHRcdHNldEF0dGFja1RpbWUodGltZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhdHRhY2tUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEF0dGFja1RpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXR0YWNrVGltZVxuXHRcdH0sXG5cdFx0c2V0RGVjYXlUaW1lKHRpbWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0ZGVjYXlUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlY2F5VGltZSgpIHtcblx0XHRcdHJldHVybiBkZWNheVRpbWVcblx0XHR9LFxuXHRcdHNldFN1c3RhaW5WYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRzdXN0YWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFN1c3RhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBzdXN0YWluVmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vd2F2ZS1mb3JtcydcbmV4cG9ydCAqIGZyb20gJy4vZmlsdGVyLXR5cGVzJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=