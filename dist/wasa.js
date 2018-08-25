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
exports.wrapNode = exports.createNoiseBuffer = exports.createRandomWaveForm = exports.mandatory = undefined;

var _ramda = __webpack_require__(1);

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

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(6)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(53), __esModule: true };

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WaveForms = undefined;

var _freeze = __webpack_require__(9);

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
	RANDOM: 'random'
});

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

var _freeze = __webpack_require__(9);

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

var _freeze = __webpack_require__(9);

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

var _waveForms = __webpack_require__(10);

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

var _waveForms = __webpack_require__(10);

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
$export($export.S + $export.F * !__webpack_require__(8), 'Object', { defineProperty: __webpack_require__(12).f });


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
module.exports = __webpack_require__(8) ? function (object, key, value) {
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

module.exports = !__webpack_require__(8) && !__webpack_require__(6)(function () {
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

var _freeze = __webpack_require__(9);

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

var _waveForms = __webpack_require__(10);

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

var _waveForms = __webpack_require__(10);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTdjYTVjYzBhN2FiMzJkNDE1YTAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmFtZGFcIixcImNvbW1vbmpzMlwiOlwicmFtZGFcIixcImFtZFwiOlwicmFtZGFcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2ZpbHRlci10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2JpdC1jcnVzaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZ2VuZXJhdG9ycy92b2ljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1hbmRhdG9yeSIsInBhcmFtZXRlck5hbWUiLCJFcnJvciIsImNyZWF0ZVJhbmRvbVdhdmVGb3JtIiwiYXVkaW9Db250ZXh0IiwiY29tcGxleGl0eSIsImkiLCJGbG9hdDMyQXJyYXkiLCJmcm9tIiwiTWF0aCIsInJhbmRvbSIsInIiLCJjcmVhdGVQZXJpb2RpY1dhdmUiLCJjcmVhdGVOb2lzZUJ1ZmZlciIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwibnVtQ2hhbm5lbHMiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJ3cmFwTm9kZSIsImF1ZGlvTm9kZSIsImdldE5vZGUiLCJnZXRJbnB1dCIsImNvbm5lY3QiLCJXYXZlRm9ybXMiLCJTUVVBUkUiLCJTQVdUT09USCIsIlRSSUFOR0xFIiwiU0lORSIsIlJBTkRPTSIsIkZpbHRlclR5cGVzIiwiTE9XX1BBU1MiLCJCQU5EX1BBU1MiLCJISUdIX1BBU1MiLCJMT1dfU0hFTEYiLCJISUdIX1NIRUxGIiwiQUxMX1BBU1MiLCJjcmVhdGVOb2RlT3V0cHV0TWl4ZXIiLCJvdXRwdXRHYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJsZWZ0R2Fpbk5vZGUiLCJyaWdodEdhaW5Ob2RlIiwiTUlERExFX0dBSU5fVkFMVUUiLCJmYWRlVmFsdWUiLCJnYWluIiwidmFsdWUiLCJzZXRGYWRlVmFsdWUiLCJnZXRGYWRlVmFsdWUiLCJzZXRMZWZ0SW5wdXQiLCJzZXRSaWdodElucHV0IiwiZ2V0TGVmdEdhaW5Ob2RlIiwiZ2V0UmlnaHRHYWluTm9kZSIsIm1pZGlUb0ZyZXF1ZW5jeSIsInN5bWJvbFRvTWlkaSIsIm1pZGlUb1N5bWJvbCIsImZyZXF1ZW5jeVRvTWlkaSIsInN5bWJvbFRvRnJlcXVlbmN5IiwiZnJlcXVlbmN5VG9TeW1ib2wiLCJwaXRjaENsYXNzZXMiLCJ0dW5pbmciLCJtaWRpVmFsdWUiLCJfIiwicGl0Y2hDbGFzcyIsIm9jdGF2ZSIsImluZGV4T2YiLCJwaXRjaENsYXNzSW5kZXgiLCJmcmVxdWVuY3kiLCJjcmVhdGVCYXNzRHJ1bSIsIm91dHB1dCIsIm9zY0dhaW4iLCJjb21wIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiZmlsdGVyIiwiY3JlYXRlQmlxdWFkRmlsdGVyIiwib3NjIiwiY3JlYXRlT3NjaWxsYXRvciIsInRocmVzaG9sZCIsImtuZWUiLCJyYXRpbyIsImF0dGFjayIsInJlbGVhc2UiLCJmaW5hbEZyZXF1ZW5jeSIsImluaXRpYWxGcmVxdWVuY3kiLCJkdXJhdGlvbiIsImlzTXV0ZWQiLCJvdXRwdXRHYWluVmFsdWUiLCJ0eXBlIiwic3RhcnQiLCJjdXJyZW50VGltZSIsIm5vdGVPbiIsInZlbG9jaXR5IiwidGltZSIsImV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUiLCJub3RlT2ZmIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwic2V0RnJlcXVlbmN5VmFsdWUiLCJnZXRGcmVxdWVuY3lWYWx1ZSIsInNldER1cmF0aW9uVmFsdWUiLCJnZXREdXJhdGlvblZhbHVlIiwic2V0T3V0cHV0R2FpblZhbHVlIiwiZ2V0T3V0cHV0R2FpblZhbHVlIiwibXV0ZSIsInVuTXV0ZSIsImNyZWF0ZUhhdCIsImdhdGUiLCJiYW5kcGFzc0ZpbHRlciIsImhpZ2hwYXNzRmlsdGVyIiwicmF0aW9zIiwib3NjcyIsImZ1bmRhbWVudGFsIiwiZm9yRWFjaCIsInB1c2giLCJzZXRWYWx1ZUF0VGltZSIsImxlbmd0aCIsInBvcCIsInN0b3AiLCJzZXRGdW5kYW1lbnRhbFZhbHVlIiwiZ2V0RnVuZGFtZW50YWxWYWx1ZSIsImNyZWF0ZVNuYXJlIiwibm9pc2VCdWZmZXIiLCJub2lzZUdhaW4iLCJub2lzZUZpbHRlciIsIm5vZGVNaXhlciIsIm5vaXNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib3NjTWl4VmFsdWUiLCJub2lzZUZpbHRlclZhbHVlIiwicmVhbCIsImltYWdpbmFyeSIsImN1c3RvbVdhdmUiLCJsb29wIiwic2V0UGVyaW9kaWNXYXZlIiwic2V0T3NjTWl4VmFsdWUiLCJnZXRPc2NNaXhWYWx1ZSIsInNldE5vaXNlRmlsdGVyVmFsdWUiLCJnZXROb2lzZUZpbHRlclZhbHVlIiwiRXZlbnRzIiwiU0VRVUVOQ0VSX1NUQVJUIiwiU0VRVUVOQ0VSX1NUT1AiLCJTRVFVRU5DRVJfVElDSyIsIlRFTVBPX0NIQU5HRSIsIkNIQU5HRSIsIkRpc3BhdGNoZXIiLCJzdWJqZWN0IiwiZGlzcGF0Y2giLCJkYXRhIiwibmV4dCIsImFzIiwiYWN0aW9uIiwibWFwIiwidW5zY2FsZSIsInNjYWxlIiwicmFuZ2UiLCJtYXgiLCJtaW4iLCJjcmVhdGVTZXF1ZW5jZXIiLCJ0aWNrc1BlclF1YXJ0ZXJOb3RlIiwic3RhcnRUaW1lIiwibmV4dFRpY2tUaW1lIiwidGljayIsIm9uVGljayIsIm9uU3RvcCIsIm9uU3RhcnQiLCJvbkxvb3AiLCJ0ZW1wbyIsInRpbWVyIiwic2NoZWR1bGUiLCJvcCIsInBsYXkiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpc1N0YXJ0ZWQiLCJzZXRMb29wTW9kZSIsImdldExvb3BNb2RlIiwic2V0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwic2V0RGl2aXNpb24iLCJnZXREaXZpc2lvbiIsInNldFRlbXBvIiwiZ2V0VGVtcG8iLCJnZXRUaW1lIiwiY3JlYXRlRGVsYXkiLCJkZWxheSIsImZlZWRiYWNrIiwiZGl2aXNpb24iLCJkaXZpc2lvblRvRGVsYXlUaW1lIiwiX2RpdmlzaW9uIiwiX3RlbXBvIiwiZGVsYXlUaW1lU2Vjb25kcyIsImRlbGF5VGltZSIsInNldFRlbXBvVmFsdWUiLCJnZXRUZW1wb1ZhbHVlIiwic2V0RGl2aXNpb25WYWx1ZSIsImRpc2Nvbm5lY3QiLCJnZXREaXZpc2lvblZhbHVlIiwic2V0RGVsYXlUaW1lVmFsdWUiLCJnZXREZWxheVRpbWVWYWx1ZSIsInNldEZlZWRiYWNrVmFsdWUiLCJnZXRGZWVkYmFja1ZhbHVlIiwiUiIsImNyZWF0ZURpc3RvcnRpb24iLCJtYWtlRGlzdG9ydGlvbkN1cnZlIiwiYW1vdW50IiwiY3VydmUiLCJkZWciLCJQSSIsInRpbWVzIiwieCIsImEiLCJiIiwiYWJzIiwicHJlR2FpbiIsInBvc3RHYWluIiwiZGlzdCIsImNyZWF0ZVdhdmVTaGFwZXIiLCJvdmVyc2FtcGxlIiwic2V0Q3VydmVBbW91bnQiLCJzZXRQcmVHYWluVmFsdWUiLCJnZXRQcmVHYWluVmFsdWUiLCJzZXRQb3N0R2FpblZhbHVlIiwiZ2V0UG9zdEdhaW5WYWx1ZSIsImNyZWF0ZU5vaXNlQ29udm9sdmVyIiwiY29udm9sdmVyIiwiY3JlYXRlQ29udm9sdmVyIiwibGVmdCIsInJpZ2h0IiwiY3JlYXRlQml0Q3J1c2hlciIsInNjcmlwdFByb2Nlc3NvciIsImNyZWF0ZVNjcmlwdFByb2Nlc3NvciIsImJpdHMiLCJub3JtRnJlcSIsInN0ZXAiLCJwaGFzZXIiLCJsYXN0Iiwib25hdWRpb3Byb2Nlc3MiLCJldmVudCIsImlucHV0IiwiaW5wdXRCdWZmZXIiLCJvdXRwdXRCdWZmZXIiLCJmbG9vciIsInNldEJpdHNWYWx1ZSIsIk5vb3BJbnN0cnVtZW50IiwiR01EcnVtU3ludGgiLCJiZCIsInNuIiwiaGkiLCJoYXQiLCJjb25kIiwiZXF1YWxzIiwiVCIsImNyZWF0ZURyeVdldE1peGVyIiwibm9kZU91dHB1dE1peGVyIiwiaW5wdXRHYWluTm9kZSIsImRyeUdhaW5Ob2RlIiwid2V0Tm9kZSIsInNldFdldE5vZGUiLCJzZnhOb2RlT3JNYWNybyIsImNyZWF0ZUFjY2VudEVudmVsb3BlIiwiYXR0YWNrVGltZSIsImRlY2F5VGltZSIsImFjY2VudFZhbHVlIiwicGVha1ZhbHVlIiwic3VzdGFpblZhbHVlIiwiaXNBY3RpdmUiLCJwYXJhbWV0ZXIiLCJhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIiLCJhdWRpb1BhcmFtIiwib24iLCJsaW5lYXJSYW1wVG9WYWx1ZUF0VGltZSIsIm9mZiIsInNldEFjdGl2ZSIsInNldEFjY2VudFZhbHVlIiwiZ2V0QWNjZW50VmFsdWUiLCJzZXRBdHRhY2tUaW1lIiwiZ2V0QXR0YWNrVGltZSIsInNldERlY2F5VGltZSIsImdldERlY2F5VGltZSIsInNldFN1c3RhaW5WYWx1ZSIsImdldFN1c3RhaW5WYWx1ZSIsImNyZWF0ZVZvaWNlIiwic2V0V2F2ZUZvcm0iLCJ3YXZlRm9ybSIsInBpdGNoIiwibXVsdGlwbGllciIsImxhc3RNaWRpVmFsdWUiLCJyb3VuZCIsIm5ld0ZyZXF1ZW5jeVZhbHVlIiwibmV3TWlkaVZhbHVlIiwiZ2V0V2F2ZUZvcm0iLCJnZXRXYXZlRm9ybXMiLCJnZXRPdXRwdXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QSw0QkFBNEIseUNBQXlDO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7QUNsRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkEsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FB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Ozs7O0FDZkE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJ3YXNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk3Y2E1Y2MwYTdhYjMyZDQxNWEwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyB0aW1lcyB9IGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgbWFuZGF0b3J5ID0gKHBhcmFtZXRlck5hbWUgPSAnJykgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgbWFuZGF0b3J5IHBhcmFtZXRlciAke3BhcmFtZXRlck5hbWV9YClcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJhbmRvbVdhdmVGb3JtID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpLCBjb21wbGV4aXR5ID0gOCkgPT4ge1xuXHRjb25zdCBpID0gRmxvYXQzMkFycmF5LmZyb20odGltZXMoTWF0aC5yYW5kb20sIGNvbXBsZXhpdHkpKVxuXHRjb25zdCByID0gRmxvYXQzMkFycmF5LmZyb20odGltZXMoTWF0aC5yYW5kb20sIGNvbXBsZXhpdHkpKVxuXHRyZXR1cm4gYXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZShyLCBpKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9pc2VCdWZmZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IG51bUNoYW5uZWxzID0gMVxuXHRjb25zdCBidWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKG51bUNoYW5uZWxzLCBidWZmZXJTaXplLCBidWZmZXJTaXplKVxuXHRjb25zdCBvID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSArPSAxKSB7XG5cdFx0b1tpXSA9IE1hdGgucmFuZG9tKClcblx0fVxuXHRyZXR1cm4gYnVmZmVyXG59XG5cbmV4cG9ydCBjb25zdCB3cmFwTm9kZSA9IChhdWRpb05vZGUgPSBtYW5kYXRvcnkoKSkgPT4gKHtcblx0Z2V0Tm9kZSgpIHtcblx0XHRyZXR1cm4gYXVkaW9Ob2RlXG5cdH0sXG5cdGdldElucHV0KCkge1xuXHRcdHJldHVybiBhdWRpb05vZGVcblx0fSxcblx0Y29ubmVjdCh7IGdldElucHV0LCBjb25uZWN0IH0pIHtcblx0XHRhdWRpb05vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHR9LFxufSlcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBXYXZlRm9ybXMgcHJvdmlkZXMgYSBoYXNoIG9mIGNvbnN0YW50cyBmb3Igb3NjaWxsYXRvciB0eXBlIGFzc2lnbmF0aW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgV2F2ZUZvcm1zID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNRVUFSRTogJ3NxdWFyZScsXG5cdFNBV1RPT1RIOiAnc2F3dG9vdGgnLFxuXHRUUklBTkdMRTogJ3RyaWFuZ2xlJyxcblx0U0lORTogJ3NpbmUnLFxuXHRSQU5ET006ICdyYW5kb20nLFxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogRmlsdGVyVHlwZXMgcHJvdmlkZXMgY29uc3RhbnRzIGZvciBmaWx0ZXIgdHlwZSBhc3NpZ25hdGlvblxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IEZpbHRlclR5cGVzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdExPV19QQVNTOiAnbG93cGFzcycsXG5cdEJBTkRfUEFTUzogJ2JhbmRwYXNzJyxcblx0SElHSF9QQVNTOiAnaGlnaHBhc3MnLFxuXHRMT1dfU0hFTEY6ICdsb3dzaGVsZicsXG5cdEhJR0hfU0hFTEY6ICdoaWdoc2hlbGYnLFxuXHRBTExfUEFTUzogJ2FsbHBhc3MnLFxufSlcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvZmlsdGVyLXR5cGVzLmpzIiwiaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdC8qIHdlYiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbGVmdEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCByaWdodEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXG5cdC8qIGNvbnN0YW50IHZhbHVlcyAqL1xuXHRjb25zdCBNSURETEVfR0FJTl9WQUxVRSA9IDAuNVxuXG5cdC8qIHBhcmFtZXRlciB2YWx1ZXMgKi9cblx0bGV0IGZhZGVWYWx1ZSA9IDBcblxuXHQvKiByb3V0aW5nICovXG5cdGxlZnRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRyaWdodEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUVcblx0cmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUVcblxuXHRyZXR1cm4ge1xuXHRcdHNldEZhZGVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSAtICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0cmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUUgKyAodmFsdWUgKiBNSURETEVfR0FJTl9WQUxVRSlcblx0XHRcdGZhZGVWYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RmFkZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZhZGVWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0TGVmdElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QobGVmdEdhaW5Ob2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldFJpZ2h0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChyaWdodEdhaW5Ob2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXRHYWluTm9kZS5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldExlZnRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiBsZWZ0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdGdldFJpZ2h0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gcmlnaHRHYWluTm9kZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9ub2RlLW91dHB1dC1taXhlci5qcyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IE5vdGVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gVGhlIHBpdGNoIGluIGNocm9tYXRpYyBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBvY3RhdmUgLSBUaGUgb2N0YXZlIHZhbHVlIGFzc29jaWF0ZWQgdG8gcGl0Y2ggY2xhc3NcbiAqL1xuXG4vKipcbiAqIHBpdGNoQ2xhc3NlcyBwcm92aWRlcyB0aGUgY2hyb21hdGljIHNjYWxlIHN5bWJvbHMgZXhwb3J0ZWQgYXMgYSBsaXN0OlxuICogJ0MnLCAnQyMnLCAnRCcsICdEIycsICdFJywgJ0YnLCAnRiMnLCAnRycsICdHIycsICdBJywgJ0EjJywgJ0InXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgcGl0Y2hDbGFzc2VzID0gT2JqZWN0LmZyZWV6ZShbJ0MnLCAnQyMnLCAnRCcsICdEIycsICdFJywgJ0YnLCAnRiMnLCAnRycsICdHIycsICdBJywgJ0EjJywgJ0InXSlcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBtaWRpIG5vdGVcbiAqIHdpdGggY3VzdG9tLCBvcHRpb25hbCB0dW5pbmcgKGRlZmF1bHQgdmFsdWUgZm9yXG4gKiB0dW5pbmcgaXMgNDQwIGZvciBBNClcbiAqIFRoaXMgY3VycnkgZnVuY3Rpb24gd2lsbCBiZSBwYXJ0aWFsbHkgYXBwbGllZCBpZiB0dW5pbmdcbiAqIGlzIHRoZSBvbmx5IHBhcmFtZXRlclxuICogQHBhcmFtIHtudW1iZXJ9IHR1bmluZyAtIFRoZSBmcmVxdWVuY3kgYXNzb2NpYXRlZCB0byBtaWRpIHZhbHVlIDY5IChBNClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBNaWRpIHZhbHVlICgwIHRvIDEyNykgb2YgdGhlIG5vdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ8ZnVuY3Rpb259IFRoZSBjb21wdXRlZCBmcmVxdWVuY3kgb3IgYSBjb21wdXRpbmcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pZGlUb0ZyZXF1ZW5jeSh0dW5pbmcgPSA0NDAsIG1pZGlWYWx1ZSkge1xuXHRpZiAoaXNOaWwobWlkaVZhbHVlKSkge1xuXHRcdHJldHVybiBfID0+IG1pZGlUb0ZyZXF1ZW5jeSh0dW5pbmcsIF8pXG5cdH1cblx0aWYgKG1pZGlWYWx1ZSA+PSAwICYmIG1pZGlWYWx1ZSA8PSAxMjcpIHtcblx0XHRyZXR1cm4gdHVuaW5nICogKDIgKiogKChtaWRpVmFsdWUgLSA2OSkgLyAxMikpXG5cdH1cblx0cmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWlkaVZhbHVlIHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvTWlkaShwaXRjaENsYXNzLCBvY3RhdmUpIHtcblx0cmV0dXJuICgob2N0YXZlICsgMSkgKiAxMikgKyBwaXRjaENsYXNzZXMuaW5kZXhPZihwaXRjaENsYXNzKVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBwaXRjaCBjbGFzcyBhbmQgb2N0YXZlIGZvciB0aGUgZ2l2ZW4gbWlkaSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICogQHJldHVybnMge05vdGV9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaWRpVG9TeW1ib2wobWlkaVZhbHVlKSB7XG5cdGNvbnN0IHBpdGNoQ2xhc3NJbmRleCA9IChtaWRpVmFsdWUgLSAoMTIgKiAyKSkgJSAxMlxuXHRjb25zdCBvY3RhdmUgPSAobWlkaVZhbHVlIC0gcGl0Y2hDbGFzc0luZGV4IC0gMTIpIC8gMTJcblx0cmV0dXJuIHtcblx0XHRwaXRjaENsYXNzOiBwaXRjaENsYXNzZXNbcGl0Y2hDbGFzc0luZGV4XSxcblx0XHRvY3RhdmUsXG5cdH1cbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBtaWRpIG5vdGVcbiAqIHdpdGggY3VzdG9tLCBvcHRpb25hbCB0dW5pbmcgKGRlZmF1bHQgdmFsdWUgZm9yXG4gKiB0dW5pbmcgaXMgNDQwIGZvciBBNClcbiAqIFRoaXMgY3VycnkgZnVuY3Rpb24gd2lsbCBiZSBwYXJ0aWFsbHkgYXBwbGllZCBpZiB0dW5pbmdcbiAqIGlzIHRoZSBvbmx5IHBhcmFtZXRlclxuICogQHBhcmFtIHtudW1iZXJ9IHR1bmluZyAtIFRoZSBmcmVxdWVuY3kgYXNzb2NpYXRlZCB0byBtaWRpIHZhbHVlIDY5IChBNClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBNaWRpIHZhbHVlICgwIHRvIDEyNykgb2YgdGhlIG5vdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ8ZnVuY3Rpb259IFRoZSBjb21wdXRlZCBmcmVxdWVuY3kgb3IgYSBjb21wdXRpbmcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyZXF1ZW5jeVRvTWlkaSh0dW5pbmcgPSA0NDAsIGZyZXF1ZW5jeSkge1xuXHRpZiAoaXNOaWwoZnJlcXVlbmN5KSkge1xuXHRcdHJldHVybiBfID0+IGZyZXF1ZW5jeVRvTWlkaSh0dW5pbmcsIF8pXG5cdH1cblx0aWYgKGZyZXF1ZW5jeSA+PSA4ICYmIGZyZXF1ZW5jeSA8IDM5NTIpIHtcblx0XHRyZXR1cm4gNjkgKyAoMTIgKiBNYXRoLmxvZzIoZnJlcXVlbmN5IC8gdHVuaW5nKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGZyZXF1ZW5jeSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbm90ZSBpbiB0aGUgZ2l2ZW4gb2N0YXZlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGl0Y2hDbGFzcyAtIE5vdGUgaW4gc2NhbGUgKGVuZ2xpc2ggbm90YXRpb24pXG4gKiBAcGFyYW0ge251bWJlcn0gb2N0YXZlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzeW1ib2xUb0ZyZXF1ZW5jeShwaXRjaENsYXNzLCBvY3RhdmUpIHtcblx0cmV0dXJuIFx0bWlkaVRvRnJlcXVlbmN5KDQ0MCwgc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkpXG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG5vdGUgYW5kIG9jdGF2ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIGZyZXF1ZW5jeVxuICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJlcXVlbmN5VG9TeW1ib2woZnJlcXVlbmN5KSB7XG5cdHJldHVybiBtaWRpVG9TeW1ib2woZnJlcXVlbmN5VG9NaWRpKDQ0MCwgZnJlcXVlbmN5KSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL25vdGUuanMiLCJpbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhc3NEcnVtID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBjb21wID0gYXVkaW9Db250ZXh0LmNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvcigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cblx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDI1MDBcblxuXHRjb21wLnRocmVzaG9sZC52YWx1ZSA9IDAuMCAvLyB0aGlzIGlzIHRoZSBwaXRmYWxsLCBsZWF2ZSBzb21lIGhlYWRyb29tXG5cdGNvbXAua25lZS52YWx1ZSA9IDAuMCAvLyBicnV0ZSBmb3JjZVxuXHRjb21wLnJhdGlvLnZhbHVlID0gMjAuMCAvLyBtYXggY29tcHJlc3Npb25cblx0Y29tcC5hdHRhY2sudmFsdWUgPSAwLjA1IC8vIDVtcyBhdHRhY2tcblx0Y29tcC5yZWxlYXNlLnZhbHVlID0gMC4wNTAgLy8gNTBtcyByZWxlYXNlXG5cblx0Y29uc3QgZmluYWxGcmVxdWVuY3kgPSAwLjAxXG5cblx0bGV0IGluaXRpYWxGcmVxdWVuY3kgPSAyMDBcblx0bGV0IGR1cmF0aW9uID0gMC4xNVxuXHRsZXQgaXNNdXRlZCA9IGZhbHNlXG5cdGxldCBvdXRwdXRHYWluVmFsdWUgPSAxRS0xMFxuXG5cdC8qIHJvdXRpbmcgKi9cblx0b3NjLmNvbm5lY3Qob3NjR2FpbikuY29ubmVjdChmaWx0ZXIpLmNvbm5lY3QoY29tcCkuY29ubmVjdChvdXRwdXQpXG5cblx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWVcblx0b3NjR2Fpbi5nYWluLnZhbHVlID0gMUUtMTBcblx0b3NjLnR5cGUgPSBXYXZlRm9ybXMuU0lORVxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHZlbG9jaXR5ID0gMC44LCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShpbml0aWFsRnJlcXVlbmN5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcXVlbmN5LCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aW5pdGlhbEZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gaW5pdGlhbEZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0R2FpblZhbHVlID0gdmFsdWVcblx0XHRcdGlmICghaXNNdXRlZCkge1xuXHRcdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXRHYWluVmFsdWVcblx0XHR9LFxuXHRcdG11dGUoKSB7XG5cdFx0XHRpc011dGVkID0gdHJ1ZVxuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSAxRS0xMFxuXHRcdH0sXG5cdFx0dW5NdXRlKCkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWVcblx0XHRcdGlzTXV0ZWQgPSBmYWxzZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvYmFzcy1kcnVtLmpzIiwiaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxzJ1xuaW1wb3J0IHsgRmlsdGVyVHlwZXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZmlsdGVyLXR5cGVzJ1xuaW1wb3J0IHsgV2F2ZUZvcm1zIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL3dhdmUtZm9ybXMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVIYXQgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGdhdGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGJhbmRwYXNzRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGhpZ2hwYXNzRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cblx0Y29uc3QgcmF0aW9zID0gWzIsIDMsIDQuMTYsIDUuNDMsIDYuNzksIDguMjFdXG5cdGNvbnN0IG9zY3MgPSBbXVxuXG5cdGxldCBmdW5kYW1lbnRhbCA9IDM1XG5cdGxldCBkdXJhdGlvbiA9IDAuMjVcblxuXHQvKiByb3V0aW5nICovXG5cdGJhbmRwYXNzRmlsdGVyXG5cdFx0LmNvbm5lY3QoaGlnaHBhc3NGaWx0ZXIpXG5cdFx0LmNvbm5lY3QoZ2F0ZSlcblx0XHQuY29ubmVjdChvdXRwdXQpXG5cblx0YmFuZHBhc3NGaWx0ZXIudHlwZSA9IEZpbHRlclR5cGVzLkJBTkRfUEFTU1xuXHRiYW5kcGFzc0ZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSA4MDAwXG5cdGhpZ2hwYXNzRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5ISUdIX1BBU1Ncblx0aGlnaHBhc3NGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gOTAwMFxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHZlbG9jaXR5ID0gMSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0cmF0aW9zLmZvckVhY2goKHJhdGlvKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdFx0b3NjLnR5cGUgPSBXYXZlRm9ybXMuU1FVQVJFXG5cdFx0XHRcdC8vIEZyZXF1ZW5jeSBpcyB0aGUgZnVuZGFtZW50YWwgKiB0aGlzIG9zY2lsbGF0b3IncyByYXRpb1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnVuZGFtZW50YWwgKiByYXRpb1xuXHRcdFx0XHRvc2MuY29ubmVjdChiYW5kcGFzc0ZpbHRlcilcblx0XHRcdFx0b3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRcdG9zY3MucHVzaChvc2MpXG5cdFx0XHR9KVxuXHRcdFx0Z2F0ZS5nYWluLnNldFZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUodmVsb2NpdHkgLyByYXRpb3MubGVuZ3RoLCB0aW1lICsgMC4wMilcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKCh2ZWxvY2l0eSAvIHJhdGlvcy5sZW5ndGgpICogMC4zLCB0aW1lICsgMC4wMylcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0Z2F0ZS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3Njcy5mb3JFYWNoKCgpID0+IHtcblx0XHRcdFx0b3Njcy5wb3AoKS5zdG9wKHRpbWUpXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGR1cmF0aW9uXG5cdFx0fSxcblx0XHRzZXRGdW5kYW1lbnRhbFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmdW5kYW1lbnRhbCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnVuZGFtZW50YWxWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmdW5kYW1lbnRhbFxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJpbXBvcnQgeyBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi8uLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuaW1wb3J0IHsgRmlsdGVyVHlwZXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZmlsdGVyLXR5cGVzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU25hcmUgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGJ1ZmZlclNpemUgPSAyICogYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3Qgbm9pc2VCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGJ1ZmZlclNpemUsIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKVxuXHRjb25zdCBvID0gbm9pc2VCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGNvbnN0IG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgZnJlcXVlbmN5ID0gODBcblx0bGV0IG9zY01peFZhbHVlID0gMC4yXG5cdGxldCBub2lzZUZpbHRlclZhbHVlID0gNDAwMFxuXG5cdGNvbnN0IHJlYWwgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAxXSlcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pXG5cdGNvbnN0IGN1c3RvbVdhdmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHJlYWwsIGltYWdpbmFyeSlcblxuXHRub2lzZUZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IG5vaXNlRmlsdGVyVmFsdWVcblx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRub2lzZUdhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdG5vaXNlLmJ1ZmZlciA9IG5vaXNlQnVmZmVyXG5cdG5vaXNlLmxvb3AgPSB0cnVlXG5cblx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKVxuXG5cdG9zYy5jb25uZWN0KG9zY0dhaW4pXG5cdG5vaXNlLmNvbm5lY3Qobm9pc2VGaWx0ZXIpLmNvbm5lY3Qobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuc2V0TGVmdElucHV0KG9zY0dhaW4pXG5cdG5vZGVNaXhlci5zZXRSaWdodElucHV0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLmNvbm5lY3QoeyBnZXRJbnB1dDogKCkgPT4gb3V0cHV0IH0pXG5cblx0b3NjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSlcblx0bm9pc2Uuc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHZlbG9jaXR5ID0gMSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0b3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUodmVsb2NpdHksIHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmcmVxdWVuY3kgLyAxMCwgdGltZSArIDAuMTUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIDAuMTUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0b3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGR1cmF0aW9uXG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZnJlcXVlbmN5ID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmcmVxdWVuY3lcblx0XHR9LFxuXHRcdHNldE9zY01peFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvc2NNaXhWYWx1ZSA9IHZhbHVlXG5cdFx0XHRub2RlTWl4ZXIuc2V0RmFkZVZhbHVlKG9zY01peFZhbHVlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE9zY01peFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG9zY01peFZhbHVlXG5cdFx0fSxcblx0XHRzZXROb2lzZUZpbHRlclZhbHVlKHZhbHVlKSB7XG5cdFx0XHRub2lzZUZpbHRlclZhbHVlID0gdmFsdWVcblx0XHRcdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0Tm9pc2VGaWx0ZXJWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBub2lzZUZpbHRlclZhbHVlXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL3NuYXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9jb21tb24nXG5leHBvcnQgKiBmcm9tICcuL2NvcmUnXG5leHBvcnQgKiBmcm9tICcuL21hY3JvcydcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9kaXNwYXRjaGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9yYW5nZSdcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnXG5cbmV4cG9ydCBjb25zdCBFdmVudHMgPSBPYmplY3QuZnJlZXplKHtcblx0U0VRVUVOQ0VSX1NUQVJUXHQ6IDAsXG5cdFNFUVVFTkNFUl9TVE9QXHQ6IDEsXG5cdFNFUVVFTkNFUl9USUNLXHQ6IDIsXG5cdFRFTVBPX0NIQU5HRVx0OiAzLFxuXHRDSEFOR0U6IDk5OSxcbn0pXG5cbmV4cG9ydCBjb25zdCBEaXNwYXRjaGVyID0gKCgpID0+IHtcblx0Y29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0KClcblx0cmV0dXJuIHtcblx0XHRkaXNwYXRjaCh0eXBlLCBkYXRhKSB7XG5cdFx0XHRzdWJqZWN0Lm5leHQoeyB0eXBlLCBkYXRhIH0pXG5cdFx0fSxcblx0XHRhcyh0eXBlKSB7XG5cdFx0XHRyZXR1cm4gc3ViamVjdFxuXHRcdFx0XHQuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24udHlwZSA9PT0gdHlwZSlcblx0XHRcdFx0Lm1hcChhY3Rpb24gPT4gYWN0aW9uLmRhdGEpXG5cdFx0fSxcblx0fVxufSkoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmZyZWV6ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuNSBPYmplY3QuZnJlZXplKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2ZyZWV6ZScsIGZ1bmN0aW9uICgkZnJlZXplKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpIHtcbiAgICByZXR1cm4gJGZyZWV6ZSAmJiBpc09iamVjdChpdCkgPyAkZnJlZXplKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9XG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIHJhbmdlIG1vZHVsZSBleHBvcnRzIHV0aWxpdHkgZnVuY3Rpb24gZm9yIHNjYWxpbmcvdW5zY2FsaW5nIHZhbHVlcyB0byByYW5nZVxuICogQG1vZHVsZSByYW5nZVxuICovXG5cbmltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUmFuZ2VcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtaW4gLSBSYW5nZSBtaW5pbXVtXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4IC0gUmFuZ2UgbWF4aW11bVxuICovXG5cbi8qKlxuICogVW5ub3JtYWxpemVzIGEgWzAtMV0gcmFuZ2UgdmFsdWUgYmFjayB0byB0aGUgZ2l2ZW4gcmFuZ2VcbiAqIEBwYXJhbSB7bW9kdWxlOnJhbmdlflJhbmdlfSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICogQHJldHVybnMge251bWJlcn0gLSBVbm5vcm1hbGl6ZWQgdmFsdWUgaW4gcmFuZ2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuc2NhbGUocmFuZ2UsIHZhbHVlKSB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKChyYW5nZS5tYXggLSByYW5nZS5taW4pICogdmFsdWUpICsgcmFuZ2UubWluXG59XG5cbi8qKlxuICogTm9ybWFsaXplcyB2YWx1ZSB0byBhIFswLDFdIHJhbmdlIGdpdmVuIGl0cyBvcmlnaW5hbCByYW5nZS5taW4gYW5kIHJhbmdlLm1heFxuICogQHBhcmFtIHttb2R1bGU6cmFuZ2V+UmFuZ2V9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIE5vcm1hbGl6ZWQgdmFsdWUgaW4gcmFuZ2UgWzAsMV1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlKHJhbmdlLCB2YWx1ZSkge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICh2YWx1ZSAtIHJhbmdlLm1pbikgLyAocmFuZ2UubWF4IC0gcmFuZ2UubWluKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vc2VxdWVuY2VyJ1xuZXhwb3J0ICogZnJvbSAnLi9ub3RlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvaW5kZXguanMiLCIvKipcbiAqIHNlcXVlbmNlciBtb2R1bGUgZXhwb3J0cyBhIGZhY3RvcnkgZnVuY3Rpb24gY3JlYXRpbmcgYSBzZXF1ZW5jZXIgdGllZCB0byBhbiBBdWRpb0NvbnRleHRcbiAqIEBtb2R1bGUgc2VxdWVuY2VyXG4gKi9cbmltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi9jb21tb24vdXRpbHMnXG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0gYXVkaW9Db250ZXh0XG4gKiBAcmV0dXJucyB7U2VxdWVuY2VyfVxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlU2VxdWVuY2VyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCB0aWNrc1BlclF1YXJ0ZXJOb3RlID0gNFxuXHRsZXQgc3RhcnRUaW1lID0gMFxuXHRsZXQgbmV4dFRpY2tUaW1lID0gMFxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSBuZXh0VGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0bmV4dFRpY2tUaW1lID0gY3VycmVudFRpbWUgKyAoNjAgLyAodGVtcG8gKiB0aWNrc1BlclF1YXJ0ZXJOb3RlKSlcblx0XHRcdG9wKHRpY2ssIHRlbXBvLCB0aWNrc1BlclF1YXJ0ZXJOb3RlLCBuZXh0VGlja1RpbWUpXG5cdFx0XHRpZiAobG9vcCAmJiB0aWNrID09PSBsZW5ndGgpIHtcblx0XHRcdFx0dGljayA9IDBcblx0XHRcdFx0b25Mb29wKClcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ID0gKCkgPT4ge1xuXHRcdHRpbWVyID0gV29ya2VyVGltZXIuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0c2NoZWR1bGUob25UaWNrKVxuXHRcdH0sIDApXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0YXJ0KCkge1xuXHRcdFx0b25TdGFydCgpXG5cdFx0XHRzdGFydFRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWVcblx0XHRcdHN0b3AgPSBmYWxzZVxuXHRcdFx0cGxheSgpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c3RvcCgpIHtcblx0XHRcdFdvcmtlclRpbWVyLmNsZWFySW50ZXJ2YWwodGltZXIpXG5cdFx0XHRzdG9wID0gdHJ1ZVxuXHRcdFx0bmV4dFRpY2tUaW1lID0gMFxuXHRcdFx0dGljayA9IDBcblx0XHRcdG9uU3RvcCgpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0aXNTdGFydGVkKCkge1xuXHRcdFx0cmV0dXJuICFzdG9wXG5cdFx0fSxcblx0XHRzZXRMb29wTW9kZSh2YWx1ZSkge1xuXHRcdFx0bG9vcCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TG9vcE1vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbG9vcFxuXHRcdH0sXG5cdFx0c2V0TGVuZ3RoKHZhbHVlKSB7XG5cdFx0XHRsZW5ndGggPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldExlbmd0aCgpIHtcblx0XHRcdHJldHVybiBsZW5ndGhcblx0XHR9LFxuXHRcdHNldERpdmlzaW9uKHZhbHVlKSB7XG5cdFx0XHR0aWNrc1BlclF1YXJ0ZXJOb3RlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvbigpIHtcblx0XHRcdHJldHVybiB0aWNrc1BlclF1YXJ0ZXJOb3RlXG5cdFx0fSxcblx0XHRzZXRUZW1wbyh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvXG5cdFx0fSxcblx0XHRnZXRUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZVxuXHRcdH0sXG5cdFx0b25TdGFydChvcCkge1xuXHRcdFx0b25TdGFydCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25TdG9wKG9wKSB7XG5cdFx0XHRvblN0b3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uVGljayhvcCkge1xuXHRcdFx0b25UaWNrID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvbkxvb3Aob3ApIHtcblx0XHRcdG9uTG9vcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pZiAoZ2xvYmFsID09PSBnbG9iYWwud2luZG93ICYmIGdsb2JhbC5VUkwgJiYgZ2xvYmFsLkJsb2IgJiYgZ2xvYmFsLldvcmtlcikge1xuICBtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgVElNRVJfV09SS0VSX1NPVVJDRSA9IFtcbiAgICAgIFwidmFyIHRpbWVySWRzID0ge30sIF8gPSB7fTtcIixcbiAgICAgIFwiXy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJUaW1lb3V0KHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJvbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7IF9bZS5kYXRhLnR5cGVdKGUuZGF0YSkgfTtcIlxuICAgIF0uam9pbihcIlwiKTtcblxuICAgIHZhciBfdGltZXJJZCA9IDA7XG4gICAgdmFyIF9jYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgX3RpbWVyID0gbmV3IGdsb2JhbC5Xb3JrZXIoZ2xvYmFsLlVSTC5jcmVhdGVPYmplY3RVUkwoXG4gICAgICBuZXcgZ2xvYmFsLkJsb2IoWyBUSU1FUl9XT1JLRVJfU09VUkNFIF0sIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9KVxuICAgICkpO1xuXG4gICAgX3RpbWVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChfY2FsbGJhY2tzW2UuZGF0YV0pIHtcbiAgICAgICAgX2NhbGxiYWNrc1tlLmRhdGFdLmNhbGxiYWNrLmFwcGx5KG51bGwsIF9jYWxsYmFja3NbZS5kYXRhXS5wYXJhbXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0SW50ZXJ2YWxcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgc2V0VGltZW91dDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRUaW1lb3V0XCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhckludGVydmFsXCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFyVGltZW91dFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuTWF0aC5sb2cyO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMjAuMi4yLjIyIE1hdGgubG9nMih4KVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeCkgLyBNYXRoLkxOMjtcbiAgfVxufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL2Jhc3MtZHJ1bSdcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kZWxheSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kaXN0b3J0aW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL25vaXNlLWNvbnZvbHZlcidcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9iaXQtY3J1c2hlcidcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50J1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9nbS1kcnVtLXN5bnRoJ1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL2RyeS13ZXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICcuL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICcuL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZSdcbmV4cG9ydCAqIGZyb20gJy4vZ2VuZXJhdG9ycy92b2ljZSdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5kZXguanMiLCJleHBvcnQgY29uc3QgY3JlYXRlRGVsYXkgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGRlbGF5ID0gYXVkaW9Db250ZXh0LmNyZWF0ZURlbGF5KDUuMClcblx0Y29uc3QgZmVlZGJhY2sgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdC8qIHJvdXRpbmcgKi9cblx0ZGVsYXkuY29ubmVjdChmZWVkYmFjaylcblx0XHRcdC5jb25uZWN0KGZpbHRlcilcblx0XHRcdC5jb25uZWN0KGRlbGF5KVxuXHRcdFx0LmNvbm5lY3Qob3V0cHV0KVxuXHQvKiBwYXJhbWV0ZXJzICovXG5cdGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG5cdGxldCB0ZW1wbyA9IDEyMFxuXHRsZXQgZGl2aXNpb24gPSAzXG5cdC8qIGNvbnZlcnQgYmVhdCBkaXZpc2lvbiB0byBkZWxheSB0aW1lIGluIHNlY29uZHMgKi9cblx0Y29uc3QgZGl2aXNpb25Ub0RlbGF5VGltZSA9IChfZGl2aXNpb24sIF90ZW1wbykgPT4gNjAgLyAoX3RlbXBvICogX2RpdmlzaW9uKVxuXHRsZXQgZGVsYXlUaW1lU2Vjb25kcyA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXG5cdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHNcblxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBkZWxheVxuXHRcdH0sXG5cdFx0c2V0VGVtcG9WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGl2aXNpb25Ub0RlbGF5VGltZShkaXZpc2lvbiwgdGVtcG8pXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG9WYWx1ZSgpIHtcblx0XHRcdHJldHVybiB0ZW1wb1xuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGl2aXNpb24gPSB2YWx1ZVxuXHRcdFx0ZGVsYXlUaW1lU2Vjb25kcyA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXHRcdFx0ZGVsYXkuZGlzY29ubmVjdChmZWVkYmFjaylcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHNcblx0XHRcdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkaXZpc2lvblxuXHRcdH0sXG5cdFx0c2V0RGVsYXlUaW1lVmFsdWUodmFsdWUpIHtcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSB2YWx1ZVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlbGF5VGltZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5VGltZVNlY29uZHNcblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlXG5cdFx0fSxcblx0XHRzZXRGZWVkYmFja1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmZWVkYmFjay5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGZWVkYmFja1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZlZWRiYWNrLmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGVsYXkuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGlzdG9ydGlvbiA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgbWFrZURpc3RvcnRpb25DdXJ2ZSA9IChhbW91bnQpID0+IHtcblx0XHRjb25zdCB7IHNhbXBsZVJhdGUgfSA9IGF1ZGlvQ29udGV4dFxuXHRcdGNvbnN0IGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheSg0NDEwMClcblx0XHRjb25zdCBkZWcgPSBNYXRoLlBJIC8gMTgwXG5cdFx0Ui50aW1lcygoaSkgPT4ge1xuXHRcdFx0Y29uc3QgeCA9IChpICogMikgLyAoc2FtcGxlUmF0ZSAtIDEpXG5cdFx0XHRjb25zdCBhID0gKDMgKyBhbW91bnQpICogeCAqIDIwICogZGVnXG5cdFx0XHRjb25zdCBiID0gTWF0aC5QSSArIChhbW91bnQgKiBNYXRoLmFicyh4KSlcblx0XHRcdGN1cnZlW2ldID0gYSAvIGJcblx0XHR9LCBzYW1wbGVSYXRlKVxuXHRcdHJldHVybiBjdXJ2ZVxuXHR9XG5cblx0Y29uc3QgcHJlR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgcG9zdEdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGRpc3QgPSBhdWRpb0NvbnRleHQuY3JlYXRlV2F2ZVNoYXBlcigpXG5cdHByZUdhaW4uY29ubmVjdChkaXN0KS5jb25uZWN0KHBvc3RHYWluKVxuXHRkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg0MDApXG5cdGRpc3Qub3ZlcnNhbXBsZSA9ICc0eCdcblx0cHJlR2Fpbi5nYWluLnZhbHVlID0gNTBcblx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IDFcblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0cG9zdEdhaW4uY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBwcmVHYWluXG5cdFx0fSxcblx0XHRzZXRDdXJ2ZUFtb3VudChhbW91bnQpIHtcblx0XHRcdGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKGFtb3VudClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRQcmVHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdHByZUdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0UHJlR2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHByZUdhaW4uZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdFx0c2V0UG9zdEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0UG9zdEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBwb3N0R2Fpbi5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9pc2VDb252b2x2ZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGNvbnZvbHZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKVxuXHRjb25zdCBidWZmZXJTaXplID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigyLCBidWZmZXJTaXplIC8gMiwgYnVmZmVyU2l6ZSlcblx0Y29uc3QgbGVmdCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRjb25zdCByaWdodCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgxKVxuXHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0bGVmdFtpXSA9IE1hdGgucmFuZG9tKClcblx0XHRyaWdodFtpXSA9IE1hdGgucmFuZG9tKClcblx0fSwgYnVmZmVyLmxlbmd0aClcblx0Y29udm9sdmVyLmJ1ZmZlciA9IGJ1ZmZlclxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdGNvbnZvbHZlci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGNvbnZvbHZlclxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQml0Q3J1c2hlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDUxMlxuXHRjb25zdCBzY3JpcHRQcm9jZXNzb3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG5cdGxldCBiaXRzID0gMTZcblx0bGV0IG5vcm1GcmVxID0gMC4wNVxuXHRjb25zdCBzdGVwID0gMC41ICoqIGJpdHNcblx0bGV0IHBoYXNlciA9IDBcblx0bGV0IGxhc3QgPSAwXG5cdHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRjb25zdCBvdXRwdXQgPSBldmVudC5vdXRwdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0XHRwaGFzZXIgKz0gbm9ybUZyZXFcblx0XHRcdGlmIChwaGFzZXIgPj0gMSkge1xuXHRcdFx0XHRwaGFzZXIgLT0gMVxuXHRcdFx0XHRsYXN0ID0gc3RlcCAqIE1hdGguZmxvb3IoKGlucHV0W2ldIC8gc3RlcCkgKyAwLjUpXG5cdFx0XHR9XG5cdFx0XHRvdXRwdXRbaV0gPSBsYXN0XG5cdFx0fSwgYnVmZmVyU2l6ZSlcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdHNjcmlwdFByb2Nlc3Nvci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIHNjcmlwdFByb2Nlc3NvclxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdG5vcm1GcmVxID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRCaXRzVmFsdWUodmFsdWUpIHtcblx0XHRcdGJpdHMgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvYml0LWNydXNoZXIuanMiLCJleHBvcnQgY29uc3QgTm9vcEluc3RydW1lbnQgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbigpIHtcblxuXHRcdH0sXG5cdFx0bm90ZU9mZigpIHtcblxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudC5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBjcmVhdGVCYXNzRHJ1bSB9IGZyb20gJy4vZHJ1bXMvYmFzcy1kcnVtJ1xuaW1wb3J0IHsgY3JlYXRlU25hcmUgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5pbXBvcnQgeyBjcmVhdGVIYXQgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuaW1wb3J0IHsgbWFuZGF0b3J5LCB3cmFwTm9kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IEdNRHJ1bVN5bnRoID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3QgYmQgPSBjcmVhdGVCYXNzRHJ1bShhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC4xKVxuXHRjb25zdCBzbiA9IGNyZWF0ZVNuYXJlKGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjUpXG5cdGNvbnN0IGhpID0gY3JlYXRlSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpXG5cdGNvbnN0IGhhdCA9IGNyZWF0ZUhhdChhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC41KVxuXG5cdGNvbnN0IG91dHB1dCA9IHdyYXBOb2RlKGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCkpXG5cblx0YmQuY29ubmVjdChvdXRwdXQpXG5cdHNuLmNvbm5lY3Qob3V0cHV0KVxuXHRoaS5jb25uZWN0KG91dHB1dClcblx0aGF0LmNvbm5lY3Qob3V0cHV0KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKG1pZGlWYWx1ZSwgdmVsb2NpdHksIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNSksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzYpLFxuXHRcdFx0XHRcdCgpID0+IGJkLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0MCksXG5cdFx0XHRcdFx0KCkgPT4gc24ubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDIpLFxuXHRcdFx0XHRcdCgpID0+IGhpLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQ2KSxcblx0XHRcdFx0XHQoKSA9PiBoYXQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0bm90ZU9mZihtaWRpVmFsdWUsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNiksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9mZih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KHsgZ2V0SW5wdXQgfSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4vbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEcnlXZXRNaXhlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgbm9kZU91dHB1dE1peGVyID0gY3JlYXRlTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dClcblx0Y29uc3QgaW5wdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZHJ5R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0bGV0IHdldE5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0aW5wdXRHYWluTm9kZS5jb25uZWN0KGRyeUdhaW5Ob2RlKVxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0TGVmdElucHV0KGRyeUdhaW5Ob2RlKVxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5vZGVPdXRwdXRNaXhlciwge1xuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGlucHV0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdHNldFdldE5vZGUoc2Z4Tm9kZU9yTWFjcm8pIHtcblx0XHRcdHdldE5vZGUgPSBzZnhOb2RlT3JNYWNyby5nZXRJbnB1dCA/IHNmeE5vZGVPck1hY3JvLmdldElucHV0KCkgOiBzZnhOb2RlT3JNYWNyb1xuXHRcdFx0bm9kZU91dHB1dE1peGVyLnNldFJpZ2h0SW5wdXQod2V0Tm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuZGlzY29ubmVjdCgpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9kcnktd2V0LW1peGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBY2NlbnRFbnZlbG9wZSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkgPT4ge1xuXHRsZXQgYXR0YWNrVGltZSA9IDBcblx0bGV0IGRlY2F5VGltZSA9IDBcblx0bGV0IGFjY2VudFZhbHVlID0gMFxuXHRsZXQgcGVha1ZhbHVlID0gMFxuXHRsZXQgc3VzdGFpblZhbHVlID0gcGVha1ZhbHVlXG5cdGxldCBpc0FjdGl2ZSA9IHRydWVcblxuXHRsZXQgcGFyYW1ldGVyXG5cblx0Y29uc3QgYXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyID0gKCkgPT4ge1xuXHRcdGlmIChpc05pbChwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZW52ZWxvcGUgcGFyYW1ldGVyLCB1c2UgY29ubmVjdChhdWRpb1BhcmFtKSBiZWZvcmUgY2FsbGluZyBtZXRob2QnKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdChhdWRpb1BhcmFtID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHBhcmFtZXRlciA9IGF1ZGlvUGFyYW1cblx0XHRcdHN1c3RhaW5WYWx1ZSA9IHBhcmFtZXRlci52YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlcigpXG5cdFx0XHRpZiAoaXNBY3RpdmUpIHtcblx0XHRcdFx0cGVha1ZhbHVlID0gc3VzdGFpblZhbHVlICsgYWNjZW50VmFsdWVcblx0XHRcdFx0cGFyYW1ldGVyLnNldFZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHBlYWtWYWx1ZSwgdGltZSArIGF0dGFja1RpbWUpXG5cdFx0XHRcdHBhcmFtZXRlci5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSArIGF0dGFja1RpbWUgKyBkZWNheVRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRvZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0YXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyKClcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKVxuXHRcdFx0XHRwYXJhbWV0ZXIuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRpc0FjdGl2ZSgpIHtcblx0XHRcdHJldHVybiBpc0FjdGl2ZVxuXHRcdH0sXG5cdFx0c2V0QWN0aXZlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGlzQWN0aXZlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRBY2NlbnRWYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhY2NlbnRWYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0QWNjZW50VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gYWNjZW50VmFsdWVcblx0XHR9LFxuXHRcdHNldEF0dGFja1RpbWUodGltZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRhdHRhY2tUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEF0dGFja1RpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXR0YWNrVGltZVxuXHRcdH0sXG5cdFx0c2V0RGVjYXlUaW1lKHRpbWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0ZGVjYXlUaW1lID0gdGltZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlY2F5VGltZSgpIHtcblx0XHRcdHJldHVybiBkZWNheVRpbWVcblx0XHR9LFxuXHRcdHNldFN1c3RhaW5WYWx1ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRzdXN0YWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFN1c3RhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBzdXN0YWluVmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZS5qcyIsImltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuaW1wb3J0IHsgZnJlcXVlbmN5VG9NaWRpIH0gZnJvbSAnLi4vLi4vY29yZS9ub3RlJ1xuaW1wb3J0IHsgY3JlYXRlUmFuZG9tV2F2ZUZvcm0sIG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVZvaWNlID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnQXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgc2V0V2F2ZUZvcm0gPSAod2F2ZUZvcm0sIG9zYykgPT4ge1xuXHRcdGlmICh3YXZlRm9ybSA9PT0gV2F2ZUZvcm1zLlJBTkRPTSkge1xuXHRcdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjcmVhdGVSYW5kb21XYXZlRm9ybShhdWRpb0NvbnRleHQpKVxuXHRcdH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0b3NjLnR5cGUgPSB3YXZlRm9ybVxuXHRcdH1cblx0fVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGxldCB3YXZlRm9ybSA9IFdhdmVGb3Jtcy5UUklBTkdMRVxuXG5cdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpXG5cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRvc2MuY29ubmVjdChvdXRwdXQpXG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24ob3NjLCB7XG5cdFx0cGl0Y2gobXVsdGlwbGllciA9IG1hbmRhdG9yeSgnbXVsdGlwbGllcicpKSB7XG5cdFx0XHQvKiByZXRyaWV2ZSBtaWRpIG5vdGUgdmFsdWUgZnJvbSBhY3R1YWwgZnJlcXVlbmN5ICovXG5cdFx0XHRjb25zdCBsYXN0TWlkaVZhbHVlID0gTWF0aC5yb3VuZChmcmVxdWVuY3lUb01pZGkoNDQwLCBvc2MuZnJlcXVlbmN5LnZhbHVlKSlcblx0XHRcdC8qIHBpdGNoIGFjdHVhbCBmcmVxdWVuY3kgKi9cblx0XHRcdGNvbnN0IG5ld0ZyZXF1ZW5jeVZhbHVlID0gb3NjLmZyZXF1ZW5jeS52YWx1ZSAqIG11bHRpcGxpZXJcblx0XHRcdC8qIGdldCBtaWRpIG5vdGUgdmFsdWUgYmFjayBmcm9tIHBpdGNoZWQgZnJlcXVlbmN5ICovXG5cdFx0XHRjb25zdCBuZXdNaWRpVmFsdWUgPSBNYXRoLnJvdW5kKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIG5ld0ZyZXF1ZW5jeVZhbHVlKSlcblx0XHRcdC8qIGFwcGx5IG5ldyBmcmVxdWVuY3kgKi9cblx0XHRcdG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUobmV3RnJlcXVlbmN5VmFsdWUsIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSlcblx0XHRcdHJldHVybiB7IGxhc3RNaWRpVmFsdWUsIG5ld01pZGlWYWx1ZSB9XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgZ2V0SW5wdXQgPSBtYW5kYXRvcnkoJ2lucHV0JyksIGNvbm5lY3QgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0V2F2ZUZvcm0oKSB7XG5cdFx0XHRyZXR1cm4gb3NjLnR5cGVcblx0XHR9LFxuXHRcdHNldFdhdmVGb3JtKHZhbHVlID0gbWFuZGF0b3J5KCd3YXZlRm9ybScpKSB7XG5cdFx0XHR3YXZlRm9ybSA9IHZhbHVlXG5cdFx0XHRzZXRXYXZlRm9ybSh3YXZlRm9ybSwgb3NjKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFdhdmVGb3JtcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QudmFsdWVzKFdhdmVGb3Jtcylcblx0XHR9LFxuXHRcdGdldE91dHB1dCgpIHtcblx0XHRcdHJldHVybiBvdXRwdXRcblx0XHR9LFxuXHR9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9nZW5lcmF0b3JzL3ZvaWNlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gNzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnZhbHVlcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgJHZhbHVlcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKGZhbHNlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIHZhbHVlczogZnVuY3Rpb24gdmFsdWVzKGl0KSB7XG4gICAgcmV0dXJuICR2YWx1ZXMoaXQpO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGlzRW51bSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXNFbnRyaWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdChpdCk7XG4gICAgdmFyIGtleXMgPSBnZXRLZXlzKE8pO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXk7XG4gICAgd2hpbGUgKGxlbmd0aCA+IGkpIGlmIChpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKSB7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi93YXZlLWZvcm1zJ1xuZXhwb3J0ICogZnJvbSAnLi9maWx0ZXItdHlwZXMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==