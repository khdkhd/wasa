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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wrapNode = exports.createNoiseBuffer = exports.createGenerator = exports.createRandomWaveForm = exports.mandatory = undefined;

var _ramda = __webpack_require__(1);

var _waveForms = __webpack_require__(8);

var mandatory = exports.mandatory = (parameterName = '') => {
	throw new Error(`Missing mandatory parameter ${parameterName}`);
};

var createRandomWaveForm = exports.createRandomWaveForm = (audioContext = mandatory(), complexity = 8) => {
	var i = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	var r = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	return audioContext.createPeriodicWave(r, i);
};

var createGenerator = exports.createGenerator = (audioContext, waveForm) => {
	if (waveForm === _waveForms.WaveForms.WHITE_NOISE) {
		return createNoiseBuffer(audioContext);
	}
	var osc = audioContext.createOscillator();
	if (waveForm === _waveForms.WaveForms.RANDOM) {
		osc.setPeriodicWave(createRandomWaveForm(audioContext));
		return osc;
	}
	osc.type = waveForm;
	return osc;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var core = __webpack_require__(0);
var ctx = __webpack_require__(33);
var hide = __webpack_require__(35);
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
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WaveForms = undefined;

var _freeze = __webpack_require__(10);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * WaveForms provides a hash of constants for oscillator type assignation
 * @type {Object}
 */
var WaveForms = exports.WaveForms = (0, _freeze2.default)({
	SQUARE: 'square',
	SAWTOOTH: 'sawtooth',
	TRIANGLE: 'triangle',
	SINE: 'sine',
	RANDOM: 'random',
	WHITE_NOISE: 'white_noise'
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(6)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(36);
var IE8_DOM_DEFINE = __webpack_require__(37);
var toPrimitive = __webpack_require__(39);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(43);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(20);
var defined = __webpack_require__(18);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FilterTypes = undefined;

var _freeze = __webpack_require__(10);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * FilterTypes provides constants for filter type assignation
 * @type {Object}
 */
var FilterTypes = exports.FilterTypes = (0, _freeze2.default)({
	LOW_PASS: 'lowpass',
	BAND_PASS: 'bandpass',
	HIGH_PASS: 'highpass',
	LOW_SHELF: 'lowshelf',
	HIGH_SHELF: 'highshelf',
	ALL_PASS: 'allpass'
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createNodeOutputMixer = undefined;

var _utils = __webpack_require__(2);

var createNodeOutputMixer = exports.createNodeOutputMixer = (audioContext = (0, _utils.mandatory)()) => {
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(18);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(44);
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
var $export = __webpack_require__(4);
var core = __webpack_require__(0);
var fails = __webpack_require__(6);
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
exports.pitchClasses = undefined;

var _log = __webpack_require__(62);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(10);

var _freeze2 = _interopRequireDefault(_freeze);

exports.midiToFrequency = midiToFrequency;
exports.symbolToMidi = symbolToMidi;
exports.midiToSymbol = midiToSymbol;
exports.frequencyToMidi = frequencyToMidi;
exports.symbolToFrequency = symbolToFrequency;
exports.frequencyToSymbol = frequencyToSymbol;

var _ramda = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {Object} Note
 * @property {string} pitchClass - The pitch in chromatic scale (english notation)
 * @property {number} octave - The octave value associated to pitch class
 */

/**
 * pitchClasses provides the chromatic scale symbols exported as a list:
 * 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
 * @type {Object}
 */
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
function midiToFrequency(tuning = 440, midiValue) {
  if ((0, _ramda.isNil)(midiValue)) {
    return _ => midiToFrequency(tuning, _);
  }
  if (midiValue >= 0 && midiValue <= 127) {
    return tuning * Math.pow(2, (midiValue - 69) / 12);
  }
  return null;
}

/**
 * Computes the midiValue value of the given note in the given octave
 * @param {string} pitchClass - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
function symbolToMidi(pitchClass, octave) {
  return (octave + 1) * 12 + pitchClasses.indexOf(pitchClass);
}

/**
 * Computes the pitch class and octave for the given midi value
 * @param {number} midiValue - Octave value for note
 * @returns {Note}
 */
function midiToSymbol(midiValue) {
  var pitchClassIndex = (midiValue - 12 * 2) % 12;
  var octave = (midiValue - pitchClassIndex - 12) / 12;
  return {
    pitchClass: pitchClasses[pitchClassIndex],
    octave
  };
}

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
function frequencyToMidi(tuning = 440, frequency) {
  if ((0, _ramda.isNil)(frequency)) {
    return _ => frequencyToMidi(tuning, _);
  }
  if (frequency >= 8 && frequency < 3952) {
    return 69 + 12 * (0, _log2.default)(frequency / tuning);
  }
  return null;
}

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} pitchClass - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
function symbolToFrequency(pitchClass, octave) {
  return midiToFrequency(440, symbolToMidi(pitchClass, octave));
}

/**
 * Computes the note and octave values of the given frequency
 * @param {number} frequency - Octave value for note
 */
function frequencyToSymbol(frequency) {
  return midiToSymbol(frequencyToMidi(440, frequency));
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBassDrum = undefined;

var _waveForms = __webpack_require__(8);

var _utils = __webpack_require__(2);

var createBassDrum = exports.createBassDrum = (audioContext = (0, _utils.mandatory)('audioContext')) => {
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createHat = undefined;

var _utils = __webpack_require__(2);

var _filterTypes = __webpack_require__(15);

var _waveForms = __webpack_require__(8);

var createHat = exports.createHat = (audioContext = (0, _utils.mandatory)('audioContext')) => {
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
	bandpassFilter.frequency.value = 8000;
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSnare = undefined;

var _nodeOutputMixer = __webpack_require__(16);

var _filterTypes = __webpack_require__(15);

var createSnare = exports.createSnare = audioContext => {
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
	var nodeMixer = (0, _nodeOutputMixer.createNodeOutputMixer)(audioContext);
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
	nodeMixer.setLeftInput(oscGain);
	nodeMixer.setRightInput(noiseGain);
	nodeMixer.connect({ getInput: () => output });

	osc.start(audioContext.currentTime);
	noise.start(audioContext.currentTime);

	return {
		noteOn(velocity = 1, time = audioContext.currentTime) {
			osc.frequency.setValueAtTime(frequency, time);
			oscGain.gain.setValueAtTime(velocity, time);
			noiseGain.gain.setValueAtTime(velocity, time);
			osc.frequency.exponentialRampToValueAtTime(frequency / 10, time + 0.15);
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ }),
/* 29 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(51);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(58);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(65);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_macros).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _macros[key];
    }
  });
});

var _constants = __webpack_require__(83);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(12).f });


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(34);
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
/* 34 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(12);
var createDesc = __webpack_require__(40);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(6)(function () {
  return Object.defineProperty(__webpack_require__(38)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var document = __webpack_require__(11).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(17);
var $keys = __webpack_require__(13);

__webpack_require__(23)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(19);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(45)(false);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');

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
/* 44 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(46);
var toAbsoluteIndex = __webpack_require__(47);
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(21);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(21);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(22);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(11);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dispatcher = __webpack_require__(52);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(57);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

var _utils = __webpack_require__(2);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(10);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(56);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = exports.Events = (0, _freeze2.default)({
	SEQUENCER_START: 0,
	SEQUENCER_STOP: 1,
	SEQUENCER_TICK: 2,
	TEMPO_CHANGE: 3,
	CHANGE: 999
});

var ids = function* () {
	var i = 0;
	for (;;) {
		yield ++i;
	}
}();

var Dispatcher = exports.Dispatcher = (() => {
	var subject = new _rxjs.Subject();
	return {
		openSession() {
			var id = ids.next();
			return {
				dispatch(type, data) {
					subject.next({ type, data, id });
				},
				as(type) {
					return subject.filter(action => action.id !== id).filter(action => action.type === type).map(action => action.data);
				}
			};
		}
	};
})();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(54);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(5);
var meta = __webpack_require__(55).onFreeze;

__webpack_require__(23)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(22)('meta');
var isObject = __webpack_require__(5);
var has = __webpack_require__(19);
var setDesc = __webpack_require__(12).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(6)(function () {
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
/* 56 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unscale = unscale;
exports.scale = scale;

var _ramda = __webpack_require__(1);

/**
 * @typedef {Object} Range
 * @property {number} min - Range minimum
 * @property {number} max - Range maximum
 */

/**
 * Unnormalizes a [0-1] range value back to the given range
 * @param {module:range~Range} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Unnormalized value in range
 */
function unscale(range, value) {
  if ((0, _ramda.isNil)(range)) {
    return value;
  }
  return (range.max - range.min) * value + range.min;
}

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param {module:range~Range} range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Normalized value in range [0,1]
 */
/**
 * range module exports utility function for scaling/unscaling values to range
 * @module range
 */

function scale(range, value) {
  if ((0, _ramda.isNil)(range)) {
    return value;
  }
  return (value - range.min) / (range.max - range.min);
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequencer = __webpack_require__(59);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(24);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSequencer = undefined;

var _workerTimer = __webpack_require__(60);

var _workerTimer2 = _interopRequireDefault(_workerTimer);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function
 * @param audioContext
 * @returns {Sequencer}
 */
/**
 * sequencer module exports a factory function creating a sequencer tied to an AudioContext
 * @module sequencer
 */
var createSequencer = exports.createSequencer = (audioContext = (0, _utils.mandatory)()) => {
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
/* 60 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)))

/***/ }),
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(64);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(4);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bassDrum = __webpack_require__(25);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_bassDrum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _bassDrum[key];
    }
  });
});

var _hat = __webpack_require__(26);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(27);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
    }
  });
});

var _delay = __webpack_require__(66);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _distortion = __webpack_require__(67);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_distortion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _distortion[key];
    }
  });
});

var _noiseConvolver = __webpack_require__(68);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_noiseConvolver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _noiseConvolver[key];
    }
  });
});

var _bitCrusher = __webpack_require__(69);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_bitCrusher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _bitCrusher[key];
    }
  });
});

var _noopInstrument = __webpack_require__(70);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_noopInstrument).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _noopInstrument[key];
    }
  });
});

var _gmDrumSynth = __webpack_require__(71);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_gmDrumSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _gmDrumSynth[key];
    }
  });
});

var _dryWetMixer = __webpack_require__(72);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dryWetMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dryWetMixer[key];
    }
  });
});

var _nodeOutputMixer = __webpack_require__(16);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_nodeOutputMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeOutputMixer[key];
    }
  });
});

var _accentEnvelope = __webpack_require__(77);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_accentEnvelope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _accentEnvelope[key];
    }
  });
});

var _voice = __webpack_require__(78);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_voice).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _voice[key];
    }
  });
});

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var createDelay = exports.createDelay = audioContext => {
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
			delay.disconnect(feedback);
			delay.delayTime.value = delayTimeSeconds;
			delay.connect(feedback);
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createDistortion = undefined;

var _ramda = __webpack_require__(1);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createDistortion = exports.createDistortion = audioContext => {
	var makeDistortionCurve = amount => {
		var { sampleRate } = audioContext;
		var curve = new Float32Array(44100);
		var deg = Math.PI / 180;
		R.times(i => {
			var x = i * 2 / (sampleRate - 1);
			var a = (3 + amount) * x * 20 * deg;
			var b = Math.PI + amount * Math.abs(x);
			curve[i] = a / b;
		}, sampleRate);
		return curve;
	};

	var preGain = audioContext.createGain();
	var postGain = audioContext.createGain();
	var dist = audioContext.createWaveShaper();
	preGain.connect(dist).connect(postGain);
	dist.curve = makeDistortionCurve(400);
	dist.oversample = '4x';
	preGain.gain.value = 50;
	postGain.gain.value = 1;
	return {
		connect({ connect, getInput }) {
			postGain.connect(getInput());
			return { connect };
		},
		getInput() {
			return preGain;
		},
		setCurveAmount(amount) {
			dist.curve = makeDistortionCurve(amount);
			return this;
		},
		setPreGainValue(value) {
			preGain.gain.value = value;
			return this;
		},
		getPreGainValue() {
			return preGain.gain.value;
		},
		setPostGainValue(value) {
			postGain.gain.value = value;
			return this;
		},
		getPostGainValue() {
			return postGain.gain.value;
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
exports.createNoiseConvolver = undefined;

var _ramda = __webpack_require__(1);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createNoiseConvolver = exports.createNoiseConvolver = audioContext => {
	var convolver = audioContext.createConvolver();
	var bufferSize = audioContext.sampleRate;
	var buffer = audioContext.createBuffer(2, bufferSize / 2, bufferSize);
	var left = buffer.getChannelData(0);
	var right = buffer.getChannelData(1);
	R.times(i => {
		left[i] = Math.random();
		right[i] = Math.random();
	}, buffer.length);
	convolver.buffer = buffer;

	return {
		connect({ connect, getInput }) {
			convolver.connect(getInput());
			return { connect };
		},
		getInput() {
			return convolver;
		}
	};
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBitCrusher = undefined;

var _ramda = __webpack_require__(1);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var createBitCrusher = exports.createBitCrusher = audioContext => {
	var bufferSize = 512;
	var scriptProcessor = audioContext.createScriptProcessor(bufferSize, 1, 1);
	var bits = 16;
	var normFreq = 0.05;
	var step = Math.pow(0.5, bits);
	var phaser = 0;
	var last = 0;
	scriptProcessor.onaudioprocess = event => {
		var input = event.inputBuffer.getChannelData(0);
		var output = event.outputBuffer.getChannelData(0);
		R.times(i => {
			phaser += normFreq;
			if (phaser >= 1) {
				phaser -= 1;
				last = step * Math.floor(input[i] / step + 0.5);
			}
			output[i] = last;
		}, bufferSize);
	};

	return {
		connect({ connect, getInput }) {
			scriptProcessor.connect(getInput());
			return { connect };
		},
		getInput() {
			return scriptProcessor;
		},
		setFrequencyValue(value) {
			normFreq = value;
			return this;
		},
		setBitsValue(value) {
			bits = value;
			return this;
		}
	};
};

/***/ }),
/* 70 */
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GMDrumSynth = undefined;

var _ramda = __webpack_require__(1);

var R = _interopRequireWildcard(_ramda);

var _bassDrum = __webpack_require__(25);

var _snare = __webpack_require__(27);

var _hat = __webpack_require__(26);

var _utils = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GMDrumSynth = exports.GMDrumSynth = (audioContext = (0, _utils.mandatory)('audioContext')) => {
	var bd = (0, _bassDrum.createBassDrum)(audioContext).setDurationValue(0.1);
	var sn = (0, _snare.createSnare)(audioContext).setDurationValue(0.5);
	var hi = (0, _hat.createHat)(audioContext).setDurationValue(0.1);
	var hat = (0, _hat.createHat)(audioContext).setDurationValue(0.5);

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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createDryWetMixer = undefined;

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _nodeOutputMixer = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDryWetMixer = exports.createDryWetMixer = audioContext => {
	var nodeOutputMixer = (0, _nodeOutputMixer.createNodeOutputMixer)(audioContext);
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(74);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(75) });


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(13);
var gOPS = __webpack_require__(76);
var pIE = __webpack_require__(29);
var toObject = __webpack_require__(17);
var IObject = __webpack_require__(20);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(6)(function () {
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
/* 76 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createAccentEnvelope = undefined;

var _ramda = __webpack_require__(1);

var _utils = __webpack_require__(2);

var createAccentEnvelope = exports.createAccentEnvelope = (audioContext = (0, _utils.mandatory)()) => {
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
			sustainValue = parameter.value;
			return this;
		},
		on(time = audioContext.currentTime) {
			assertMandatoryParameter();
			if (isActive) {
				peakValue = sustainValue + accentValue;
				parameter.setValueAtTime(sustainValue, time);
				parameter.linearRampToValueAtTime(peakValue, time + attackTime);
				parameter.exponentialRampToValueAtTime(sustainValue, time + attackTime + decayTime);
			}
		},
		off(time = audioContext.currentTime) {
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createVoice = undefined;

var _values = __webpack_require__(79);

var _values2 = _interopRequireDefault(_values);

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

var _waveForms = __webpack_require__(8);

var _note = __webpack_require__(24);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createVoice = exports.createVoice = (audioContext = (0, _utils.mandatory)('AudioContext')) => {
	var setWaveForm = (waveForm, osc) => {
		if (waveForm === _waveForms.WaveForms.RANDOM) {
			osc.setPeriodicWave((0, _utils.createRandomWaveForm)(audioContext));
		} else {
			// eslint-disable-next-line no-param-reassign
			osc.type = waveForm;
		}
	};
	var osc = audioContext.createOscillator();
	var waveForm = _waveForms.WaveForms.TRIANGLE;

	setWaveForm(waveForm, osc);

	var output = audioContext.createGain();
	osc.connect(output);
	osc.start(audioContext.currentTime);

	return (0, _assign2.default)(osc, {
		pitch(multiplier = (0, _utils.mandatory)('multiplier')) {
			/* retrieve midi note value from actual frequency */
			var lastMidiValue = Math.round((0, _note.frequencyToMidi)(440, osc.frequency.value));
			/* pitch actual frequency */
			var newFrequencyValue = osc.frequency.value * multiplier;
			/* get midi note value back from pitched frequency */
			var newMidiValue = Math.round((0, _note.frequencyToMidi)(440, newFrequencyValue));
			/* apply new frequency */
			osc.frequency.setValueAtTime(newFrequencyValue, audioContext.currentTime);
			return { lastMidiValue, newMidiValue };
		},
		connect({ getInput = (0, _utils.mandatory)('input'), connect }) {
			output.connect(getInput());
			return { connect };
		},
		getWaveForm() {
			return osc.type;
		},
		setWaveForm(value = (0, _utils.mandatory)('waveForm')) {
			waveForm = value;
			setWaveForm(waveForm, osc);
			return this;
		},
		getWaveForms() {
			return (0, _values2.default)(_waveForms.WaveForms);
		},
		getOutput() {
			return output;
		}
	});
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(81);
module.exports = __webpack_require__(0).Object.values;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(4);
var $values = __webpack_require__(82)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(13);
var toIObject = __webpack_require__(14);
var isEnum = __webpack_require__(29).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _waveForms = __webpack_require__(8);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_waveForms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _waveForms[key];
    }
  });
});

var _filterTypes = __webpack_require__(15);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODg2YmIwYzZiYmVkMzc0Yjg4M2IiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmFtZGFcIixcImNvbW1vbmpzMlwiOlwicmFtZGFcIixcImFtZFwiOlwicmFtZGFcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2ZpbHRlci10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2JpdC1jcnVzaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZ2VuZXJhdG9ycy92b2ljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1hbmRhdG9yeSIsInBhcmFtZXRlck5hbWUiLCJFcnJvciIsImNyZWF0ZVJhbmRvbVdhdmVGb3JtIiwiYXVkaW9Db250ZXh0IiwiY29tcGxleGl0eSIsImkiLCJGbG9hdDMyQXJyYXkiLCJmcm9tIiwiTWF0aCIsInJhbmRvbSIsInIiLCJjcmVhdGVQZXJpb2RpY1dhdmUiLCJjcmVhdGVHZW5lcmF0b3IiLCJ3YXZlRm9ybSIsIldISVRFX05PSVNFIiwiY3JlYXRlTm9pc2VCdWZmZXIiLCJvc2MiLCJjcmVhdGVPc2NpbGxhdG9yIiwiUkFORE9NIiwic2V0UGVyaW9kaWNXYXZlIiwidHlwZSIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwibnVtQ2hhbm5lbHMiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJ3cmFwTm9kZSIsImF1ZGlvTm9kZSIsImdldE5vZGUiLCJnZXRJbnB1dCIsImNvbm5lY3QiLCJXYXZlRm9ybXMiLCJTUVVBUkUiLCJTQVdUT09USCIsIlRSSUFOR0xFIiwiU0lORSIsIkZpbHRlclR5cGVzIiwiTE9XX1BBU1MiLCJCQU5EX1BBU1MiLCJISUdIX1BBU1MiLCJMT1dfU0hFTEYiLCJISUdIX1NIRUxGIiwiQUxMX1BBU1MiLCJjcmVhdGVOb2RlT3V0cHV0TWl4ZXIiLCJvdXRwdXRHYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJsZWZ0R2Fpbk5vZGUiLCJyaWdodEdhaW5Ob2RlIiwiTUlERExFX0dBSU5fVkFMVUUiLCJmYWRlVmFsdWUiLCJnYWluIiwidmFsdWUiLCJzZXRGYWRlVmFsdWUiLCJnZXRGYWRlVmFsdWUiLCJzZXRMZWZ0SW5wdXQiLCJzZXRSaWdodElucHV0IiwiZ2V0TGVmdEdhaW5Ob2RlIiwiZ2V0UmlnaHRHYWluTm9kZSIsIm1pZGlUb0ZyZXF1ZW5jeSIsInN5bWJvbFRvTWlkaSIsIm1pZGlUb1N5bWJvbCIsImZyZXF1ZW5jeVRvTWlkaSIsInN5bWJvbFRvRnJlcXVlbmN5IiwiZnJlcXVlbmN5VG9TeW1ib2wiLCJwaXRjaENsYXNzZXMiLCJ0dW5pbmciLCJtaWRpVmFsdWUiLCJfIiwicGl0Y2hDbGFzcyIsIm9jdGF2ZSIsImluZGV4T2YiLCJwaXRjaENsYXNzSW5kZXgiLCJmcmVxdWVuY3kiLCJjcmVhdGVCYXNzRHJ1bSIsIm91dHB1dCIsIm9zY0dhaW4iLCJjb21wIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiZmlsdGVyIiwiY3JlYXRlQmlxdWFkRmlsdGVyIiwidGhyZXNob2xkIiwia25lZSIsInJhdGlvIiwiYXR0YWNrIiwicmVsZWFzZSIsImZpbmFsRnJlcXVlbmN5IiwiaW5pdGlhbEZyZXF1ZW5jeSIsImR1cmF0aW9uIiwiaXNNdXRlZCIsIm91dHB1dEdhaW5WYWx1ZSIsInN0YXJ0IiwiY3VycmVudFRpbWUiLCJub3RlT24iLCJ2ZWxvY2l0eSIsInRpbWUiLCJleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lIiwibm90ZU9mZiIsImNhbmNlbFNjaGVkdWxlZFZhbHVlcyIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXREdXJhdGlvblZhbHVlIiwiZ2V0RHVyYXRpb25WYWx1ZSIsInNldE91dHB1dEdhaW5WYWx1ZSIsImdldE91dHB1dEdhaW5WYWx1ZSIsIm11dGUiLCJ1bk11dGUiLCJjcmVhdGVIYXQiLCJnYXRlIiwiYmFuZHBhc3NGaWx0ZXIiLCJoaWdocGFzc0ZpbHRlciIsInJhdGlvcyIsIm9zY3MiLCJmdW5kYW1lbnRhbCIsImZvckVhY2giLCJwdXNoIiwic2V0VmFsdWVBdFRpbWUiLCJsZW5ndGgiLCJwb3AiLCJzdG9wIiwic2V0RnVuZGFtZW50YWxWYWx1ZSIsImdldEZ1bmRhbWVudGFsVmFsdWUiLCJjcmVhdGVTbmFyZSIsIm5vaXNlQnVmZmVyIiwibm9pc2VHYWluIiwibm9pc2VGaWx0ZXIiLCJub2RlTWl4ZXIiLCJub2lzZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsIm9zY01peFZhbHVlIiwibm9pc2VGaWx0ZXJWYWx1ZSIsInJlYWwiLCJpbWFnaW5hcnkiLCJjdXN0b21XYXZlIiwibG9vcCIsInNldE9zY01peFZhbHVlIiwiZ2V0T3NjTWl4VmFsdWUiLCJzZXROb2lzZUZpbHRlclZhbHVlIiwiZ2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJpZHMiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsIm9wZW5TZXNzaW9uIiwiaWQiLCJuZXh0IiwiZGlzcGF0Y2giLCJkYXRhIiwiYXMiLCJhY3Rpb24iLCJtYXAiLCJ1bnNjYWxlIiwic2NhbGUiLCJyYW5nZSIsIm1heCIsIm1pbiIsImNyZWF0ZVNlcXVlbmNlciIsInRpY2tzUGVyUXVhcnRlck5vdGUiLCJzdGFydFRpbWUiLCJuZXh0VGlja1RpbWUiLCJ0aWNrIiwib25UaWNrIiwib25TdG9wIiwib25TdGFydCIsIm9uTG9vcCIsInRlbXBvIiwidGltZXIiLCJzY2hlZHVsZSIsIm9wIiwicGxheSIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImlzU3RhcnRlZCIsInNldExvb3BNb2RlIiwiZ2V0TG9vcE1vZGUiLCJzZXRMZW5ndGgiLCJnZXRMZW5ndGgiLCJzZXREaXZpc2lvbiIsImdldERpdmlzaW9uIiwic2V0VGVtcG8iLCJnZXRUZW1wbyIsImdldFRpbWUiLCJjcmVhdGVEZWxheSIsImRlbGF5IiwiZmVlZGJhY2siLCJkaXZpc2lvbiIsImRpdmlzaW9uVG9EZWxheVRpbWUiLCJfZGl2aXNpb24iLCJfdGVtcG8iLCJkZWxheVRpbWVTZWNvbmRzIiwiZGVsYXlUaW1lIiwic2V0VGVtcG9WYWx1ZSIsImdldFRlbXBvVmFsdWUiLCJzZXREaXZpc2lvblZhbHVlIiwiZGlzY29ubmVjdCIsImdldERpdmlzaW9uVmFsdWUiLCJzZXREZWxheVRpbWVWYWx1ZSIsImdldERlbGF5VGltZVZhbHVlIiwic2V0RmVlZGJhY2tWYWx1ZSIsImdldEZlZWRiYWNrVmFsdWUiLCJSIiwiY3JlYXRlRGlzdG9ydGlvbiIsIm1ha2VEaXN0b3J0aW9uQ3VydmUiLCJhbW91bnQiLCJjdXJ2ZSIsImRlZyIsIlBJIiwidGltZXMiLCJ4IiwiYSIsImIiLCJhYnMiLCJwcmVHYWluIiwicG9zdEdhaW4iLCJkaXN0IiwiY3JlYXRlV2F2ZVNoYXBlciIsIm92ZXJzYW1wbGUiLCJzZXRDdXJ2ZUFtb3VudCIsInNldFByZUdhaW5WYWx1ZSIsImdldFByZUdhaW5WYWx1ZSIsInNldFBvc3RHYWluVmFsdWUiLCJnZXRQb3N0R2FpblZhbHVlIiwiY3JlYXRlTm9pc2VDb252b2x2ZXIiLCJjb252b2x2ZXIiLCJjcmVhdGVDb252b2x2ZXIiLCJsZWZ0IiwicmlnaHQiLCJjcmVhdGVCaXRDcnVzaGVyIiwic2NyaXB0UHJvY2Vzc29yIiwiY3JlYXRlU2NyaXB0UHJvY2Vzc29yIiwiYml0cyIsIm5vcm1GcmVxIiwic3RlcCIsInBoYXNlciIsImxhc3QiLCJvbmF1ZGlvcHJvY2VzcyIsImV2ZW50IiwiaW5wdXQiLCJpbnB1dEJ1ZmZlciIsIm91dHB1dEJ1ZmZlciIsImZsb29yIiwic2V0Qml0c1ZhbHVlIiwiTm9vcEluc3RydW1lbnQiLCJHTURydW1TeW50aCIsImJkIiwic24iLCJoaSIsImhhdCIsImNvbmQiLCJlcXVhbHMiLCJUIiwiY3JlYXRlRHJ5V2V0TWl4ZXIiLCJub2RlT3V0cHV0TWl4ZXIiLCJpbnB1dEdhaW5Ob2RlIiwiZHJ5R2Fpbk5vZGUiLCJ3ZXROb2RlIiwic2V0V2V0Tm9kZSIsInNmeE5vZGVPck1hY3JvIiwiY3JlYXRlQWNjZW50RW52ZWxvcGUiLCJhdHRhY2tUaW1lIiwiZGVjYXlUaW1lIiwiYWNjZW50VmFsdWUiLCJwZWFrVmFsdWUiLCJzdXN0YWluVmFsdWUiLCJpc0FjdGl2ZSIsInBhcmFtZXRlciIsImFzc2VydE1hbmRhdG9yeVBhcmFtZXRlciIsImF1ZGlvUGFyYW0iLCJvbiIsImxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lIiwib2ZmIiwic2V0QWN0aXZlIiwic2V0QWNjZW50VmFsdWUiLCJnZXRBY2NlbnRWYWx1ZSIsInNldEF0dGFja1RpbWUiLCJnZXRBdHRhY2tUaW1lIiwic2V0RGVjYXlUaW1lIiwiZ2V0RGVjYXlUaW1lIiwic2V0U3VzdGFpblZhbHVlIiwiZ2V0U3VzdGFpblZhbHVlIiwiY3JlYXRlVm9pY2UiLCJzZXRXYXZlRm9ybSIsInBpdGNoIiwibXVsdGlwbGllciIsImxhc3RNaWRpVmFsdWUiLCJyb3VuZCIsIm5ld0ZyZXF1ZW5jeVZhbHVlIiwibmV3TWlkaVZhbHVlIiwiZ2V0V2F2ZUZvcm0iLCJnZXRXYXZlRm9ybXMiLCJnZXRPdXRwdXQiXSwi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QUVxTSxhQUFGLEVBQWlCRyxZQUFqQixFQUFQO0FBQ0EsR0FYd0I7QUFZekJyUSxVQUFRLEVBQUVELFdBQVcsc0JBQVUsT0FBVixDQUFiLEVBQWlDQyxPQUFqQyxFQUFSLEVBQW9EO0FBQ25ENEMsVUFBTzVDLE9BQVAsQ0FBZUQsVUFBZjtBQUNBLFVBQU8sRUFBRUMsT0FBRixFQUFQO0FBQ0EsR0Fmd0I7QUFnQnpCc1EsZ0JBQWM7QUFDYixVQUFPdFIsSUFBSUksSUFBWDtBQUNBLEdBbEJ3QjtBQW1CekIyUSxjQUFZMU8sUUFBUSxzQkFBVSxVQUFWLENBQXBCLEVBQTJDO0FBQzFDeEMsY0FBV3dDLEtBQVg7QUFDQTBPLGVBQVlsUixRQUFaLEVBQXNCRyxHQUF0QjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBdkJ3QjtBQXdCekJ1UixpQkFBZTtBQUNkLFVBQU8sMkNBQVA7QUFDQSxHQTFCd0I7QUEyQnpCQyxjQUFZO0FBQ1gsVUFBTzVOLE1BQVA7QUFDQTtBQTdCd0IsRUFBbkIsQ0FBUDtBQStCQSxDQWhETSxDOzs7Ozs7QUNKUCxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ1JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJ3YXNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDg4NmJiMGM2YmJlZDM3NGI4ODNiIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyB0aW1lcyB9IGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgV2F2ZUZvcm1zIH0gZnJvbSAnLi4vY29uc3RhbnRzL3dhdmUtZm9ybXMnXG5cbmV4cG9ydCBjb25zdCBtYW5kYXRvcnkgPSAocGFyYW1ldGVyTmFtZSA9ICcnKSA9PiB7XG5cdHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBtYW5kYXRvcnkgcGFyYW1ldGVyICR7cGFyYW1ldGVyTmFtZX1gKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlUmFuZG9tV2F2ZUZvcm0gPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCksIGNvbXBsZXhpdHkgPSA4KSA9PiB7XG5cdGNvbnN0IGkgPSBGbG9hdDMyQXJyYXkuZnJvbSh0aW1lcyhNYXRoLnJhbmRvbSwgY29tcGxleGl0eSkpXG5cdGNvbnN0IHIgPSBGbG9hdDMyQXJyYXkuZnJvbSh0aW1lcyhNYXRoLnJhbmRvbSwgY29tcGxleGl0eSkpXG5cdHJldHVybiBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHIsIGkpXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVHZW5lcmF0b3IgPSAoYXVkaW9Db250ZXh0LCB3YXZlRm9ybSkgPT4ge1xuICBpZiAod2F2ZUZvcm0gPT09IFdhdmVGb3Jtcy5XSElURV9OT0lTRSkge1xuICAgIHJldHVybiBjcmVhdGVOb2lzZUJ1ZmZlcihhdWRpb0NvbnRleHQpXG4gIH1cbiAgY29uc3Qgb3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuICBpZiAod2F2ZUZvcm0gPT09IFdhdmVGb3Jtcy5SQU5ET00pIHtcbiAgICBvc2Muc2V0UGVyaW9kaWNXYXZlKGNyZWF0ZVJhbmRvbVdhdmVGb3JtKGF1ZGlvQ29udGV4dCkpXG4gICAgcmV0dXJuIG9zY1xuICB9XG4gIG9zYy50eXBlID0gd2F2ZUZvcm1cbiAgcmV0dXJuIG9zY1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9pc2VCdWZmZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IG51bUNoYW5uZWxzID0gMVxuXHRjb25zdCBidWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKG51bUNoYW5uZWxzLCBidWZmZXJTaXplLCBidWZmZXJTaXplKVxuXHRjb25zdCBvID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSArPSAxKSB7XG5cdFx0b1tpXSA9IE1hdGgucmFuZG9tKClcblx0fVxuXHRyZXR1cm4gYnVmZmVyXG59XG5cbmV4cG9ydCBjb25zdCB3cmFwTm9kZSA9IChhdWRpb05vZGUgPSBtYW5kYXRvcnkoKSkgPT4gKHtcblx0Z2V0Tm9kZSgpIHtcblx0XHRyZXR1cm4gYXVkaW9Ob2RlXG5cdH0sXG5cdGdldElucHV0KCkge1xuXHRcdHJldHVybiBhdWRpb05vZGVcblx0fSxcblx0Y29ubmVjdCh7IGdldElucHV0LCBjb25uZWN0IH0pIHtcblx0XHRhdWRpb05vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHR9LFxufSlcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogV2F2ZUZvcm1zIHByb3ZpZGVzIGEgaGFzaCBvZiBjb25zdGFudHMgZm9yIG9zY2lsbGF0b3IgdHlwZSBhc3NpZ25hdGlvblxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IFdhdmVGb3JtcyA9IE9iamVjdC5mcmVlemUoe1xuXHRTUVVBUkU6ICdzcXVhcmUnLFxuXHRTQVdUT09USDogJ3Nhd3Rvb3RoJyxcblx0VFJJQU5HTEU6ICd0cmlhbmdsZScsXG5cdFNJTkU6ICdzaW5lJyxcblx0UkFORE9NOiAncmFuZG9tJyxcblx0V0hJVEVfTk9JU0U6ICd3aGl0ZV9ub2lzZScsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy93YXZlLWZvcm1zLmpzIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWx0ZXJUeXBlcyBwcm92aWRlcyBjb25zdGFudHMgZm9yIGZpbHRlciB0eXBlIGFzc2lnbmF0aW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgRmlsdGVyVHlwZXMgPSBPYmplY3QuZnJlZXplKHtcblx0TE9XX1BBU1M6ICdsb3dwYXNzJyxcblx0QkFORF9QQVNTOiAnYmFuZHBhc3MnLFxuXHRISUdIX1BBU1M6ICdoaWdocGFzcycsXG5cdExPV19TSEVMRjogJ2xvd3NoZWxmJyxcblx0SElHSF9TSEVMRjogJ2hpZ2hzaGVsZicsXG5cdEFMTF9QQVNTOiAnYWxscGFzcycsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy9maWx0ZXItdHlwZXMuanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Lyogd2ViIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBsZWZ0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IHJpZ2h0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0LyogY29uc3RhbnQgdmFsdWVzICovXG5cdGNvbnN0IE1JRERMRV9HQUlOX1ZBTFVFID0gMC41XG5cblx0LyogcGFyYW1ldGVyIHZhbHVlcyAqL1xuXHRsZXQgZmFkZVZhbHVlID0gMFxuXG5cdC8qIHJvdXRpbmcgKi9cblx0bGVmdEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdHJpZ2h0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXG5cdHJldHVybiB7XG5cdFx0c2V0RmFkZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFIC0gKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpXG5cdFx0XHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSArICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0ZmFkZVZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGYWRlVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmFkZVZhbHVlXG5cdFx0fSxcblx0XHRzZXRMZWZ0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0UmlnaHRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KHJpZ2h0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dEdhaW5Ob2RlLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0TGVmdEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIGxlZnRHYWluTm9kZVxuXHRcdH0sXG5cdFx0Z2V0UmlnaHRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiByaWdodEdhaW5Ob2RlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyLmpzIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm90ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBUaGUgcGl0Y2ggaW4gY2hyb21hdGljIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG9jdGF2ZSAtIFRoZSBvY3RhdmUgdmFsdWUgYXNzb2NpYXRlZCB0byBwaXRjaCBjbGFzc1xuICovXG5cbi8qKlxuICogcGl0Y2hDbGFzc2VzIHByb3ZpZGVzIHRoZSBjaHJvbWF0aWMgc2NhbGUgc3ltYm9scyBleHBvcnRlZCBhcyBhIGxpc3Q6XG4gKiAnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQidcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkaVRvRnJlcXVlbmN5KHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gKChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHBpdGNoIGNsYXNzIGFuZCBvY3RhdmUgZm9yIHRoZSBnaXZlbiBtaWRpIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWlkaVZhbHVlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKiBAcmV0dXJucyB7Tm90ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pZGlUb1N5bWJvbChtaWRpVmFsdWUpIHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJlcXVlbmN5VG9NaWRpKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvRnJlcXVlbmN5KHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gXHRtaWRpVG9GcmVxdWVuY3koNDQwLCBzeW1ib2xUb01pZGkocGl0Y2hDbGFzcywgb2N0YXZlKSlcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbm90ZSBhbmQgb2N0YXZlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gZnJlcXVlbmN5XG4gKiBAcGFyYW0ge251bWJlcn0gZnJlcXVlbmN5IC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVxdWVuY3lUb1N5bWJvbChmcmVxdWVuY3kpIHtcblx0cmV0dXJuIG1pZGlUb1N5bWJvbChmcmVxdWVuY3lUb01pZGkoNDQwLCBmcmVxdWVuY3kpKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbm90ZS5qcyIsImltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQmFzc0RydW0gPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGNvbXAgPSBhdWRpb0NvbnRleHQuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gMjUwMFxuXG5cdGNvbXAudGhyZXNob2xkLnZhbHVlID0gMC4wIC8vIHRoaXMgaXMgdGhlIHBpdGZhbGwsIGxlYXZlIHNvbWUgaGVhZHJvb21cblx0Y29tcC5rbmVlLnZhbHVlID0gMC4wIC8vIGJydXRlIGZvcmNlXG5cdGNvbXAucmF0aW8udmFsdWUgPSAyMC4wIC8vIG1heCBjb21wcmVzc2lvblxuXHRjb21wLmF0dGFjay52YWx1ZSA9IDAuMDUgLy8gNW1zIGF0dGFja1xuXHRjb21wLnJlbGVhc2UudmFsdWUgPSAwLjA1MCAvLyA1MG1zIHJlbGVhc2VcblxuXHRjb25zdCBmaW5hbEZyZXF1ZW5jeSA9IDAuMDFcblxuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDIwMFxuXHRsZXQgZHVyYXRpb24gPSAwLjE1XG5cdGxldCBpc011dGVkID0gZmFsc2Vcblx0bGV0IG91dHB1dEdhaW5WYWx1ZSA9IDFFLTEwXG5cblx0Lyogcm91dGluZyAqL1xuXHRvc2MuY29ubmVjdChvc2NHYWluKS5jb25uZWN0KGZpbHRlcikuY29ubmVjdChjb21wKS5jb25uZWN0KG91dHB1dClcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TSU5FXG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAwLjgsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGluaXRpYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpbml0aWFsRnJlcXVlbmN5ID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBpbml0aWFsRnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXRHYWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0aWYgKCFpc011dGVkKSB7XG5cdFx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gb3V0cHV0R2FpblZhbHVlXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dEdhaW5WYWx1ZVxuXHRcdH0sXG5cdFx0bXV0ZSgpIHtcblx0XHRcdGlzTXV0ZWQgPSB0cnVlXG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdFx0fSxcblx0XHR1bk11dGUoKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0aXNNdXRlZCA9IGZhbHNlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnXG5pbXBvcnQgeyBGaWx0ZXJUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWx0ZXItdHlwZXMnXG5pbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhdCA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoJ2F1ZGlvQ29udGV4dCcpKSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZ2F0ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgYmFuZHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3QgaGlnaHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblxuXHRjb25zdCByYXRpb3MgPSBbMiwgMywgNC4xNiwgNS40MywgNi43OSwgOC4yMV1cblx0Y29uc3Qgb3NjcyA9IFtdXG5cblx0bGV0IGZ1bmRhbWVudGFsID0gMzVcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXG5cdC8qIHJvdXRpbmcgKi9cblx0YmFuZHBhc3NGaWx0ZXJcblx0XHQuY29ubmVjdChoaWdocGFzc0ZpbHRlcilcblx0XHQuY29ubmVjdChnYXRlKVxuXHRcdC5jb25uZWN0KG91dHB1dClcblxuXHRiYW5kcGFzc0ZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdGJhbmRwYXNzRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDgwMDBcblx0aGlnaHBhc3NGaWx0ZXIudHlwZSA9IEZpbHRlclR5cGVzLkhJR0hfUEFTU1xuXHRoaWdocGFzc0ZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSA5MDAwXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRyYXRpb3MuZm9yRWFjaCgocmF0aW8pID0+IHtcblx0XHRcdFx0Y29uc3Qgb3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0XHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TUVVBUkVcblx0XHRcdFx0Ly8gRnJlcXVlbmN5IGlzIHRoZSBmdW5kYW1lbnRhbCAqIHRoaXMgb3NjaWxsYXRvcidzIHJhdGlvXG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmdW5kYW1lbnRhbCAqIHJhdGlvXG5cdFx0XHRcdG9zYy5jb25uZWN0KGJhbmRwYXNzRmlsdGVyKVxuXHRcdFx0XHRvc2Muc3RhcnQodGltZSlcblx0XHRcdFx0b3Njcy5wdXNoKG9zYylcblx0XHRcdH0pXG5cdFx0XHRnYXRlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0XHRnYXRlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2ZWxvY2l0eSAvIHJhdGlvcy5sZW5ndGgsIHRpbWUgKyAwLjAyKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoKHZlbG9jaXR5IC8gcmF0aW9zLmxlbmd0aCkgKiAwLjMsIHRpbWUgKyAwLjAzKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRnYXRlLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2NzLmZvckVhY2goKCkgPT4ge1xuXHRcdFx0XHRvc2NzLnBvcCgpLnN0b3AodGltZSlcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldEZ1bmRhbWVudGFsVmFsdWUodmFsdWUpIHtcblx0XHRcdGZ1bmRhbWVudGFsID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGdW5kYW1lbnRhbFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZ1bmRhbWVudGFsXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL2hhdC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4uLy4uL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5pbXBvcnQgeyBGaWx0ZXJUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWx0ZXItdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTbmFyZSA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDIgKiBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBub2lzZUJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBub2lzZUJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkgKz0gMSkge1xuXHRcdG9baV0gPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMVxuXHR9XG5cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG5vaXNlRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG5vZGVNaXhlciA9IGNyZWF0ZU5vZGVPdXRwdXRNaXhlcihhdWRpb0NvbnRleHQpXG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0Y29uc3Qgbm9pc2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKClcblxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cdGxldCBmcmVxdWVuY3kgPSA4MFxuXHRsZXQgb3NjTWl4VmFsdWUgPSAwLjJcblx0bGV0IG5vaXNlRmlsdGVyVmFsdWUgPSA0MDAwXG5cblx0Y29uc3QgcmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDFdKVxuXHRjb25zdCBpbWFnaW5hcnkgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCAwLCAwXSlcblx0Y29uc3QgY3VzdG9tV2F2ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUocmVhbCwgaW1hZ2luYXJ5KVxuXG5cdG5vaXNlRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5CQU5EX1BBU1Ncblx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnJlcXVlbmN5XG5cdG9zY0dhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdG5vaXNlR2Fpbi5nYWluLnZhbHVlID0gMUUtMTBcblx0bm9pc2UuYnVmZmVyID0gbm9pc2VCdWZmZXJcblx0bm9pc2UubG9vcCA9IHRydWVcblxuXHRvc2Muc2V0UGVyaW9kaWNXYXZlKGN1c3RvbVdhdmUpXG5cblx0b3NjLmNvbm5lY3Qob3NjR2Fpbilcblx0bm9pc2UuY29ubmVjdChub2lzZUZpbHRlcikuY29ubmVjdChub2lzZUdhaW4pXG5cdG5vZGVNaXhlci5zZXRMZWZ0SW5wdXQob3NjR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSlcblxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRub2lzZS5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXF1ZW5jeSAvIDEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmcmVxdWVuY3kgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0T3NjTWl4VmFsdWUodmFsdWUpIHtcblx0XHRcdG9zY01peFZhbHVlID0gdmFsdWVcblx0XHRcdG5vZGVNaXhlci5zZXRGYWRlVmFsdWUob3NjTWl4VmFsdWUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3NjTWl4VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3NjTWl4VmFsdWVcblx0XHR9LFxuXHRcdHNldE5vaXNlRmlsdGVyVmFsdWUodmFsdWUpIHtcblx0XHRcdG5vaXNlRmlsdGVyVmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXROb2lzZUZpbHRlclZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG5vaXNlRmlsdGVyVmFsdWVcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2NvbW1vbidcbmV4cG9ydCAqIGZyb20gJy4vY29yZSdcbmV4cG9ydCAqIGZyb20gJy4vbWFjcm9zJ1xuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2Rpc3BhdGNoZXInXG5leHBvcnQgKiBmcm9tICcuL3JhbmdlJ1xuZXhwb3J0ICogZnJvbSAnLi91dGlscydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW5kZXguanMiLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcydcblxuZXhwb3J0IGNvbnN0IEV2ZW50cyA9IE9iamVjdC5mcmVlemUoe1xuXHRTRVFVRU5DRVJfU1RBUlRcdDogMCxcblx0U0VRVUVOQ0VSX1NUT1BcdDogMSxcblx0U0VRVUVOQ0VSX1RJQ0tcdDogMixcblx0VEVNUE9fQ0hBTkdFXHQ6IDMsXG5cdENIQU5HRTogOTk5LFxufSlcblxuY29uc3QgaWRzID0gZnVuY3Rpb24qKCkge1xuICBsZXQgaSA9IDBcbiAgZm9yICg7IDspIHtcbiAgICB5aWVsZCArK2lcbiAgfVxufSgpXG5cbmV4cG9ydCBjb25zdCBEaXNwYXRjaGVyID0gKCgpID0+IHtcblx0Y29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0KClcblx0cmV0dXJuIHtcblx0XHRvcGVuU2Vzc2lvbigpIHtcblx0XHRcdGNvbnN0IGlkID0gaWRzLm5leHQoKVxuXHRcdFx0cmV0dXJuIHtcbiAgICAgICAgZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuICAgICAgICAgIHN1YmplY3QubmV4dCh7IHR5cGUsIGRhdGEsIGlkIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGFzKHR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gc3ViamVjdFxuXHRcdFx0XHRcdC5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi5pZCAhPT0gaWQpXG4gICAgICAgICAgLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG4gICAgICAgICAgLm1hcChhY3Rpb24gPT4gYWN0aW9uLmRhdGEpXG4gICAgICAgIH0sXG5cdFx0XHR9XG5cdFx0fSxcblx0fVxufSkoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmZyZWV6ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuNSBPYmplY3QuZnJlZXplKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2ZyZWV6ZScsIGZ1bmN0aW9uICgkZnJlZXplKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpIHtcbiAgICByZXR1cm4gJGZyZWV6ZSAmJiBpc09iamVjdChpdCkgPyAkZnJlZXplKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9XG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIHJhbmdlIG1vZHVsZSBleHBvcnRzIHV0aWxpdHkgZnVuY3Rpb24gZm9yIHNjYWxpbmcvdW5zY2FsaW5nIHZhbHVlcyB0byByYW5nZVxuICogQG1vZHVsZSByYW5nZVxuICovXG5cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUmFuZ2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtaW4gLSBSYW5nZSBtaW5pbXVtXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4IC0gUmFuZ2UgbWF4aW11bVxuICovXG5cbi8qKlxuICogVW5ub3JtYWxpemVzIGEgWzAtMV0gcmFuZ2UgdmFsdWUgYmFjayB0byB0aGUgZ2l2ZW4gcmFuZ2VcbiAqIEBwYXJhbSB7bW9kdWxlOnJhbmdlflJhbmdlfSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICogQHJldHVybnMge251bWJlcn0gLSBVbm5vcm1hbGl6ZWQgdmFsdWUgaW4gcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuc2NhbGUocmFuZ2UsIHZhbHVlKSB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKChyYW5nZS5tYXggLSByYW5nZS5taW4pICogdmFsdWUpICsgcmFuZ2UubWluXG59XG5cbi8qKlxuICogTm9ybWFsaXplcyB2YWx1ZSB0byBhIFswLDFdIHJhbmdlIGdpdmVuIGl0cyBvcmlnaW5hbCByYW5nZS5taW4gYW5kIHJhbmdlLm1heFxuICogQHBhcmFtIHttb2R1bGU6cmFuZ2V+UmFuZ2V9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIE5vcm1hbGl6ZWQgdmFsdWUgaW4gcmFuZ2UgWzAsMV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKHJhbmdlLCB2YWx1ZSkge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICh2YWx1ZSAtIHJhbmdlLm1pbikgLyAocmFuZ2UubWF4IC0gcmFuZ2UubWluKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vc2VxdWVuY2VyJ1xuZXhwb3J0ICogZnJvbSAnLi9ub3RlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvaW5kZXguanMiLCIvKipcbiAqIHNlcXVlbmNlciBtb2R1bGUgZXhwb3J0cyBhIGZhY3RvcnkgZnVuY3Rpb24gY3JlYXRpbmcgYSBzZXF1ZW5jZXIgdGllZCB0byBhbiBBdWRpb0NvbnRleHRcbiAqIEBtb2R1bGUgc2VxdWVuY2VyXG4gKi9cbmltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnXG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0gYXVkaW9Db250ZXh0XG4gKiBAcmV0dXJucyB7U2VxdWVuY2VyfVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2VxdWVuY2VyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCB0aWNrc1BlclF1YXJ0ZXJOb3RlID0gNFxuXHRsZXQgc3RhcnRUaW1lID0gMFxuXHRsZXQgbmV4dFRpY2tUaW1lID0gMFxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSBuZXh0VGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0bmV4dFRpY2tUaW1lID0gY3VycmVudFRpbWUgKyAoNjAgLyAodGVtcG8gKiB0aWNrc1BlclF1YXJ0ZXJOb3RlKSlcblx0XHRcdG9wKHRpY2ssIHRlbXBvLCB0aWNrc1BlclF1YXJ0ZXJOb3RlLCBuZXh0VGlja1RpbWUpXG5cdFx0XHRpZiAobG9vcCAmJiB0aWNrID09PSBsZW5ndGgpIHtcblx0XHRcdFx0dGljayA9IDBcblx0XHRcdFx0b25Mb29wKClcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ID0gKCkgPT4ge1xuXHRcdHRpbWVyID0gV29ya2VyVGltZXIuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0c2NoZWR1bGUob25UaWNrKVxuXHRcdH0sIDApXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0YXJ0KCkge1xuXHRcdFx0b25TdGFydCgpXG5cdFx0XHRzdGFydFRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWVcblx0XHRcdHN0b3AgPSBmYWxzZVxuXHRcdFx0cGxheSgpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c3RvcCgpIHtcblx0XHRcdFdvcmtlclRpbWVyLmNsZWFySW50ZXJ2YWwodGltZXIpXG5cdFx0XHRzdG9wID0gdHJ1ZVxuXHRcdFx0bmV4dFRpY2tUaW1lID0gMFxuXHRcdFx0dGljayA9IDBcblx0XHRcdG9uU3RvcCgpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0aXNTdGFydGVkKCkge1xuXHRcdFx0cmV0dXJuICFzdG9wXG5cdFx0fSxcblx0XHRzZXRMb29wTW9kZSh2YWx1ZSkge1xuXHRcdFx0bG9vcCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TG9vcE1vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbG9vcFxuXHRcdH0sXG5cdFx0c2V0TGVuZ3RoKHZhbHVlKSB7XG5cdFx0XHRsZW5ndGggPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldExlbmd0aCgpIHtcblx0XHRcdHJldHVybiBsZW5ndGhcblx0XHR9LFxuXHRcdHNldERpdmlzaW9uKHZhbHVlKSB7XG5cdFx0XHR0aWNrc1BlclF1YXJ0ZXJOb3RlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvbigpIHtcblx0XHRcdHJldHVybiB0aWNrc1BlclF1YXJ0ZXJOb3RlXG5cdFx0fSxcblx0XHRzZXRUZW1wbyh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvXG5cdFx0fSxcblx0XHRnZXRUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZVxuXHRcdH0sXG5cdFx0b25TdGFydChvcCkge1xuXHRcdFx0b25TdGFydCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25TdG9wKG9wKSB7XG5cdFx0XHRvblN0b3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uVGljayhvcCkge1xuXHRcdFx0b25UaWNrID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvbkxvb3Aob3ApIHtcblx0XHRcdG9uTG9vcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pZiAoZ2xvYmFsID09PSBnbG9iYWwud2luZG93ICYmIGdsb2JhbC5VUkwgJiYgZ2xvYmFsLkJsb2IgJiYgZ2xvYmFsLldvcmtlcikge1xuICBtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgVElNRVJfV09SS0VSX1NPVVJDRSA9IFtcbiAgICAgIFwidmFyIHRpbWVySWRzID0ge30sIF8gPSB7fTtcIixcbiAgICAgIFwiXy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJUaW1lb3V0KHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJvbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7IF9bZS5kYXRhLnR5cGVdKGUuZGF0YSkgfTtcIlxuICAgIF0uam9pbihcIlwiKTtcblxuICAgIHZhciBfdGltZXJJZCA9IDA7XG4gICAgdmFyIF9jYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgX3RpbWVyID0gbmV3IGdsb2JhbC5Xb3JrZXIoZ2xvYmFsLlVSTC5jcmVhdGVPYmplY3RVUkwoXG4gICAgICBuZXcgZ2xvYmFsLkJsb2IoWyBUSU1FUl9XT1JLRVJfU09VUkNFIF0sIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9KVxuICAgICkpO1xuXG4gICAgX3RpbWVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChfY2FsbGJhY2tzW2UuZGF0YV0pIHtcbiAgICAgICAgX2NhbGxiYWNrc1tlLmRhdGFdLmNhbGxiYWNrLmFwcGx5KG51bGwsIF9jYWxsYmFja3NbZS5kYXRhXS5wYXJhbXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0SW50ZXJ2YWxcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgc2V0VGltZW91dDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRUaW1lb3V0XCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhckludGVydmFsXCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFyVGltZW91dFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuTWF0aC5sb2cyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL2Jhc3MtZHJ1bSdcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kZWxheSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kaXN0b3J0aW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL25vaXNlLWNvbnZvbHZlcidcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9iaXQtY3J1c2hlcidcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50J1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9nbS1kcnVtLXN5bnRoJ1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL2RyeS13ZXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICcuL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICcuL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZSdcbmV4cG9ydCAqIGZyb20gJy4vZ2VuZXJhdG9ycy92b2ljZSdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5kZXguanMiLCJleHBvcnQgY29uc3QgY3JlYXRlRGVsYXkgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGRlbGF5ID0gYXVkaW9Db250ZXh0LmNyZWF0ZURlbGF5KDUuMClcblx0Y29uc3QgZmVlZGJhY2sgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdC8qIHJvdXRpbmcgKi9cblx0ZGVsYXkuY29ubmVjdChmZWVkYmFjaylcblx0XHRcdC5jb25uZWN0KGZpbHRlcilcblx0XHRcdC5jb25uZWN0KGRlbGF5KVxuXHRcdFx0LmNvbm5lY3Qob3V0cHV0KVxuXHQvKiBwYXJhbWV0ZXJzICovXG5cdGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG5cdGxldCB0ZW1wbyA9IDEyMFxuXHRsZXQgZGl2aXNpb24gPSAzXG5cdC8qIGNvbnZlcnQgYmVhdCBkaXZpc2lvbiB0byBkZWxheSB0aW1lIGluIHNlY29uZHMgKi9cblx0Y29uc3QgZGl2aXNpb25Ub0RlbGF5VGltZSA9IChfZGl2aXNpb24sIF90ZW1wbykgPT4gNjAgLyAoX3RlbXBvICogX2RpdmlzaW9uKVxuXHRsZXQgZGVsYXlUaW1lU2Vjb25kcyA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXG5cdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHNcblxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBkZWxheVxuXHRcdH0sXG5cdFx0c2V0VGVtcG9WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGl2aXNpb25Ub0RlbGF5VGltZShkaXZpc2lvbiwgdGVtcG8pXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG9WYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0ZW1wb1xuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGl2aXNpb24gPSB2YWx1ZVxuXHRcdFx0ZGVsYXlUaW1lU2Vjb25kcyA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXHRcdFx0ZGVsYXkuZGlzY29ubmVjdChmZWVkYmFjaylcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHNcblx0XHRcdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkaXZpc2lvblxuXHRcdH0sXG5cdFx0c2V0RGVsYXlUaW1lVmFsdWUodmFsdWUpIHtcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSB2YWx1ZVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlbGF5VGltZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5VGltZVNlY29uZHNcblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlXG5cdFx0fSxcblx0XHRzZXRGZWVkYmFja1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmZWVkYmFjay5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGZWVkYmFja1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZlZWRiYWNrLmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGVsYXkuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlzdG9ydGlvbiA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IChhbW91bnQpID0+IHtcblx0XHRjb25zdCB7IHNhbXBsZVJhdGUgfSA9IGF1ZGlvQ29udGV4dFxuXHRcdGNvbnN0IGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheSg0NDEwMClcblx0XHRjb25zdCBkZWcgPSBNYXRoLlBJIC8gMTgwXG5cdFx0Ui50aW1lcygoaSkgPT4ge1xuXHRcdFx0Y29uc3QgeCA9IChpICogMikgLyAoc2FtcGxlUmF0ZSAtIDEpXG5cdFx0XHRjb25zdCBhID0gKDMgKyBhbW91bnQpICogeCAqIDIwICogZGVnXG5cdFx0XHRjb25zdCBiID0gTWF0aC5QSSArIChhbW91bnQgKiBNYXRoLmFicyh4KSlcblx0XHRcdGN1cnZlW2ldID0gYSAvIGJcblx0XHR9LCBzYW1wbGVSYXRlKVxuXHRcdHJldHVybiBjdXJ2ZVxuXHR9XG5cblx0Y29uc3QgcHJlR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgcG9zdEdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGRpc3QgPSBhdWRpb0NvbnRleHQuY3JlYXRlV2F2ZVNoYXBlcigpXG5cdHByZUdhaW4uY29ubmVjdChkaXN0KS5jb25uZWN0KHBvc3RHYWluKVxuXHRkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg0MDApXG5cdGRpc3Qub3ZlcnNhbXBsZSA9ICc0eCdcblx0cHJlR2Fpbi5nYWluLnZhbHVlID0gNTBcblx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IDFcblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0cG9zdEdhaW4uY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBwcmVHYWluXG5cdFx0fSxcblx0XHRzZXRDdXJ2ZUFtb3VudChhbW91bnQpIHtcblx0XHRcdGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKGFtb3VudClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRQcmVHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdHByZUdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0UHJlR2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHByZUdhaW4uZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdFx0c2V0UG9zdEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0UG9zdEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBwb3N0R2Fpbi5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9pc2VDb252b2x2ZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGNvbnZvbHZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKVxuXHRjb25zdCBidWZmZXJTaXplID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigyLCBidWZmZXJTaXplIC8gMiwgYnVmZmVyU2l6ZSlcblx0Y29uc3QgbGVmdCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRjb25zdCByaWdodCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgxKVxuXHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0bGVmdFtpXSA9IE1hdGgucmFuZG9tKClcblx0XHRyaWdodFtpXSA9IE1hdGgucmFuZG9tKClcblx0fSwgYnVmZmVyLmxlbmd0aClcblx0Y29udm9sdmVyLmJ1ZmZlciA9IGJ1ZmZlclxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdGNvbnZvbHZlci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGNvbnZvbHZlclxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQml0Q3J1c2hlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDUxMlxuXHRjb25zdCBzY3JpcHRQcm9jZXNzb3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG5cdGxldCBiaXRzID0gMTZcblx0bGV0IG5vcm1GcmVxID0gMC4wNVxuXHRjb25zdCBzdGVwID0gMC41ICoqIGJpdHNcblx0bGV0IHBoYXNlciA9IDBcblx0bGV0IGxhc3QgPSAwXG5cdHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRjb25zdCBvdXRwdXQgPSBldmVudC5vdXRwdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0XHRwaGFzZXIgKz0gbm9ybUZyZXFcblx0XHRcdGlmIChwaGFzZXIgPj0gMSkge1xuXHRcdFx0XHRwaGFzZXIgLT0gMVxuXHRcdFx0XHRsYXN0ID0gc3RlcCAqIE1hdGguZmxvb3IoKGlucHV0W2ldIC8gc3RlcCkgKyAwLjUpXG5cdFx0XHR9XG5cdFx0XHRvdXRwdXRbaV0gPSBsYXN0XG5cdFx0fSwgYnVmZmVyU2l6ZSlcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdHNjcmlwdFByb2Nlc3Nvci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIHNjcmlwdFByb2Nlc3NvclxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdG5vcm1GcmVxID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRCaXRzVmFsdWUodmFsdWUpIHtcblx0XHRcdGJpdHMgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvYml0LWNydXNoZXIuanMiLCJleHBvcnQgY29uc3QgTm9vcEluc3RydW1lbnQgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbigpIHtcblxuXHRcdH0sXG5cdFx0bm90ZU9mZigpIHtcblxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudC5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBjcmVhdGVCYXNzRHJ1bSB9IGZyb20gJy4vZHJ1bXMvYmFzcy1kcnVtJ1xuaW1wb3J0IHsgY3JlYXRlU25hcmUgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5pbXBvcnQgeyBjcmVhdGVIYXQgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuaW1wb3J0IHsgbWFuZGF0b3J5LCB3cmFwTm9kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IEdNRHJ1bVN5bnRoID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3QgYmQgPSBjcmVhdGVCYXNzRHJ1bShhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC4xKVxuXHRjb25zdCBzbiA9IGNyZWF0ZVNuYXJlKGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjUpXG5cdGNvbnN0IGhpID0gY3JlYXRlSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpXG5cdGNvbnN0IGhhdCA9IGNyZWF0ZUhhdChhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC41KVxuXG5cdGNvbnN0IG91dHB1dCA9IHdyYXBOb2RlKGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCkpXG5cblx0YmQuY29ubmVjdChvdXRwdXQpXG5cdHNuLmNvbm5lY3Qob3V0cHV0KVxuXHRoaS5jb25uZWN0KG91dHB1dClcblx0aGF0LmNvbm5lY3Qob3V0cHV0KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKG1pZGlWYWx1ZSwgdmVsb2NpdHksIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNSksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzYpLFxuXHRcdFx0XHRcdCgpID0+IGJkLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0MCksXG5cdFx0XHRcdFx0KCkgPT4gc24ubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDIpLFxuXHRcdFx0XHRcdCgpID0+IGhpLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQ2KSxcblx0XHRcdFx0XHQoKSA9PiBoYXQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0bm90ZU9mZihtaWRpVmFsdWUsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNiksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9mZih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KHsgZ2V0SW5wdXQgfSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4vbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEcnlXZXRNaXhlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgbm9kZU91dHB1dE1peGVyID0gY3JlYXRlTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dClcblx0Y29uc3QgaW5wdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZHJ5R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0bGV0IHdldE5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0aW5wdXRHYWluTm9kZS5jb25uZWN0KGRyeUdhaW5Ob2RlKVxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0TGVmdElucHV0KGRyeUdhaW5Ob2RlKVxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5vZGVPdXRwdXRNaXhlciwge1xuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGlucHV0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdHNldFdldE5vZGUoc2Z4Tm9kZU9yTWFjcm8pIHtcblx0XHRcdHdldE5vZGUgPSBzZnhOb2RlT3JNYWNyby5nZXRJbnB1dCA/IHNmeE5vZGVPck1hY3JvLmdldElucHV0KCkgOiBzZnhOb2RlT3JNYWNyb1xuXHRcdFx0bm9kZU91dHB1dE1peGVyLnNldFJpZ2h0SW5wdXQod2V0Tm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuZGlzY29ubmVjdCgpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9kcnktd2V0LW1peGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBY2NlbnRFbnZlbG9wZSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkgPT4ge1xuXHRsZXQgYXR0YWNrVGltZSA9IDBcblx0bGV0IGRlY2F5VGltZSA9IDBcblx0bGV0IGFjY2VudFZhbHVlID0gMFxuXHRsZXQgcGVha1ZhbHVlID0gMFxuXHRsZXQgc3VzdGFpblZhbHVlID0gcGVha1ZhbHVlXG5cdGxldCBpc0FjdGl2ZSA9IHRydWVcblxuXHRsZXQgcGFyYW1ldGVyXG5cblx0Y29uc3QgYXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyID0gKCkgPT4ge1xuXHRcdGlmIChpc05pbChwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZW52ZWxvcGUgcGFyYW1ldGVyLCB1c2UgY29ubmVjdChhdWRpb1BhcmFtKSBiZWZvcmUgY2FsbGluZyBtZXRob2QnKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdChhdWRpb1BhcmFtID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHBhcmFtZXRlciA9IGF1ZGlvUGFyYW1cblx0XHRcdHN1c3RhaW5WYWx1ZSA9IHBhcmFtZXRlci52YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlcigpXG5cdFx0XHRpZiAoaXNBY3RpdmUpIHtcblx0XHRcdFx0cGVha1ZhbHVlID0gc3VzdGFpblZhbHVlICsgYWNjZW50VmFsdWVcblx0XHRcdFx0cGFyYW1ldGVyLnNldFZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHBlYWtWYWx1ZSwgdGltZSArIGF0dGFja1RpbWUpXG5cdFx0XHRcdHBhcmFtZXRlci5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSArIGF0dGFja1RpbWUgKyBkZWNheVRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0YXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyKClcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKVxuXHRcdFx0XHRwYXJhbWV0ZXIuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpc0FjdGl2ZSgpIHtcblx0XHRcdHJldHVybiBpc0FjdGl2ZVxuXHRcdH0sXG5cdFx0c2V0QWN0aXZlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGlzQWN0aXZlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRBY2NlbnRWYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhY2NlbnRWYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0QWNjZW50VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gYWNjZW50VmFsdWVcblx0XHR9LFxuXHRcdHNldEF0dGFja1RpbWUodGltZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhdHRhY2tUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEF0dGFja1RpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXR0YWNrVGltZVxuXHRcdH0sXG5cdFx0c2V0RGVjYXlUaW1lKHRpbWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0ZGVjYXlUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlY2F5VGltZSgpIHtcblx0XHRcdHJldHVybiBkZWNheVRpbWVcblx0XHR9LFxuXHRcdHNldFN1c3RhaW5WYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRzdXN0YWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFN1c3RhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBzdXN0YWluVmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZS5qcyIsImltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuaW1wb3J0IHsgZnJlcXVlbmN5VG9NaWRpIH0gZnJvbSAnLi4vLi4vY29yZS9ub3RlJ1xuaW1wb3J0IHsgY3JlYXRlUmFuZG9tV2F2ZUZvcm0sIG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVZvaWNlID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnQXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgc2V0V2F2ZUZvcm0gPSAod2F2ZUZvcm0sIG9zYykgPT4ge1xuXHRcdGlmICh3YXZlRm9ybSA9PT0gV2F2ZUZvcm1zLlJBTkRPTSkge1xuXHRcdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjcmVhdGVSYW5kb21XYXZlRm9ybShhdWRpb0NvbnRleHQpKVxuXHRcdH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0b3NjLnR5cGUgPSB3YXZlRm9ybVxuXHRcdH1cblx0fVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGxldCB3YXZlRm9ybSA9IFdhdmVGb3Jtcy5UUklBTkdMRVxuXG5cdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpXG5cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRvc2MuY29ubmVjdChvdXRwdXQpXG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24ob3NjLCB7XG5cdFx0cGl0Y2gobXVsdGlwbGllciA9IG1hbmRhdG9yeSgnbXVsdGlwbGllcicpKSB7XG5cdFx0XHQvKiByZXRyaWV2ZSBtaWRpIG5vdGUgdmFsdWUgZnJvbSBhY3R1YWwgZnJlcXVlbmN5ICovXG5cdFx0XHRjb25zdCBsYXN0TWlkaVZhbHVlID0gTWF0aC5yb3VuZChmcmVxdWVuY3lUb01pZGkoNDQwLCBvc2MuZnJlcXVlbmN5LnZhbHVlKSlcblx0XHRcdC8qIHBpdGNoIGFjdHVhbCBmcmVxdWVuY3kgKi9cblx0XHRcdGNvbnN0IG5ld0ZyZXF1ZW5jeVZhbHVlID0gb3NjLmZyZXF1ZW5jeS52YWx1ZSAqIG11bHRpcGxpZXJcblx0XHRcdC8qIGdldCBtaWRpIG5vdGUgdmFsdWUgYmFjayBmcm9tIHBpdGNoZWQgZnJlcXVlbmN5ICovXG5cdFx0XHRjb25zdCBuZXdNaWRpVmFsdWUgPSBNYXRoLnJvdW5kKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIG5ld0ZyZXF1ZW5jeVZhbHVlKSlcblx0XHRcdC8qIGFwcGx5IG5ldyBmcmVxdWVuY3kgKi9cblx0XHRcdG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUobmV3RnJlcXVlbmN5VmFsdWUsIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSlcblx0XHRcdHJldHVybiB7IGxhc3RNaWRpVmFsdWUsIG5ld01pZGlWYWx1ZSB9XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgZ2V0SW5wdXQgPSBtYW5kYXRvcnkoJ2lucHV0JyksIGNvbm5lY3QgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0V2F2ZUZvcm0oKSB7XG5cdFx0XHRyZXR1cm4gb3NjLnR5cGVcblx0XHR9LFxuXHRcdHNldFdhdmVGb3JtKHZhbHVlID0gbWFuZGF0b3J5KCd3YXZlRm9ybScpKSB7XG5cdFx0XHR3YXZlRm9ybSA9IHZhbHVlXG5cdFx0XHRzZXRXYXZlRm9ybSh3YXZlRm9ybSwgb3NjKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFdhdmVGb3JtcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QudmFsdWVzKFdhdmVGb3Jtcylcblx0XHR9LFxuXHRcdGdldE91dHB1dCgpIHtcblx0XHRcdHJldHVybiBvdXRwdXRcblx0XHR9LFxuXHR9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9nZW5lcmF0b3JzL3ZvaWNlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnZhbHVlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KSB7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGlzRW51bSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXNFbnRyaWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdChpdCk7XG4gICAgdmFyIGtleXMgPSBnZXRLZXlzKE8pO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKSB7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi93YXZlLWZvcm1zJ1xuZXhwb3J0ICogZnJvbSAnLi9maWx0ZXItdHlwZXMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==