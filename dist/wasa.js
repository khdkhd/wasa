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

var _waveForms = __webpack_require__(8);

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
	RANDOM: 'random'
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
			console.log('connect');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzBkMTk0MjUyMTAxYWQwYTRhYzIiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmFtZGFcIixcImNvbW1vbmpzMlwiOlwicmFtZGFcIixcImFtZFwiOlwicmFtZGFcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2ZpbHRlci10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2JpdC1jcnVzaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZ2VuZXJhdG9ycy92b2ljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sIm5hbWVzIjpbIm1hbmRhdG9yeSIsInBhcmFtZXRlck5hbWUiLCJFcnJvciIsImNyZWF0ZVJhbmRvbVdhdmVGb3JtIiwiYXVkaW9Db250ZXh0IiwiY29tcGxleGl0eSIsImkiLCJGbG9hdDMyQXJyYXkiLCJmcm9tIiwiTWF0aCIsInJhbmRvbSIsInIiLCJjcmVhdGVQZXJpb2RpY1dhdmUiLCJjcmVhdGVOb2lzZUJ1ZmZlciIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwibnVtQ2hhbm5lbHMiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJ3cmFwTm9kZSIsImF1ZGlvTm9kZSIsImdldE5vZGUiLCJnZXRJbnB1dCIsImNvbm5lY3QiLCJXYXZlRm9ybXMiLCJTUVVBUkUiLCJTQVdUT09USCIsIlRSSUFOR0xFIiwiU0lORSIsIlJBTkRPTSIsIkZpbHRlclR5cGVzIiwiTE9XX1BBU1MiLCJCQU5EX1BBU1MiLCJISUdIX1BBU1MiLCJMT1dfU0hFTEYiLCJISUdIX1NIRUxGIiwiQUxMX1BBU1MiLCJjcmVhdGVOb2RlT3V0cHV0TWl4ZXIiLCJvdXRwdXRHYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJsZWZ0R2Fpbk5vZGUiLCJyaWdodEdhaW5Ob2RlIiwiTUlERExFX0dBSU5fVkFMVUUiLCJmYWRlVmFsdWUiLCJnYWluIiwidmFsdWUiLCJzZXRGYWRlVmFsdWUiLCJnZXRGYWRlVmFsdWUiLCJzZXRMZWZ0SW5wdXQiLCJzZXRSaWdodElucHV0IiwiZ2V0TGVmdEdhaW5Ob2RlIiwiZ2V0UmlnaHRHYWluTm9kZSIsIm1pZGlUb0ZyZXF1ZW5jeSIsInN5bWJvbFRvTWlkaSIsIm1pZGlUb1N5bWJvbCIsImZyZXF1ZW5jeVRvTWlkaSIsInN5bWJvbFRvRnJlcXVlbmN5IiwiZnJlcXVlbmN5VG9TeW1ib2wiLCJwaXRjaENsYXNzZXMiLCJ0dW5pbmciLCJtaWRpVmFsdWUiLCJfIiwicGl0Y2hDbGFzcyIsIm9jdGF2ZSIsImluZGV4T2YiLCJwaXRjaENsYXNzSW5kZXgiLCJmcmVxdWVuY3kiLCJjcmVhdGVCYXNzRHJ1bSIsIm91dHB1dCIsIm9zY0dhaW4iLCJjb21wIiwiY3JlYXRlRHluYW1pY3NDb21wcmVzc29yIiwiZmlsdGVyIiwiY3JlYXRlQmlxdWFkRmlsdGVyIiwib3NjIiwiY3JlYXRlT3NjaWxsYXRvciIsInRocmVzaG9sZCIsImtuZWUiLCJyYXRpbyIsImF0dGFjayIsInJlbGVhc2UiLCJmaW5hbEZyZXF1ZW5jeSIsImluaXRpYWxGcmVxdWVuY3kiLCJkdXJhdGlvbiIsImlzTXV0ZWQiLCJvdXRwdXRHYWluVmFsdWUiLCJ0eXBlIiwic3RhcnQiLCJjdXJyZW50VGltZSIsIm5vdGVPbiIsInZlbG9jaXR5IiwidGltZSIsImV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUiLCJub3RlT2ZmIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwic2V0RnJlcXVlbmN5VmFsdWUiLCJnZXRGcmVxdWVuY3lWYWx1ZSIsInNldER1cmF0aW9uVmFsdWUiLCJnZXREdXJhdGlvblZhbHVlIiwic2V0T3V0cHV0R2FpblZhbHVlIiwiZ2V0T3V0cHV0R2FpblZhbHVlIiwibXV0ZSIsInVuTXV0ZSIsImNyZWF0ZUhhdCIsImdhdGUiLCJiYW5kcGFzc0ZpbHRlciIsImhpZ2hwYXNzRmlsdGVyIiwicmF0aW9zIiwib3NjcyIsImZ1bmRhbWVudGFsIiwiZm9yRWFjaCIsInB1c2giLCJzZXRWYWx1ZUF0VGltZSIsImxlbmd0aCIsInBvcCIsInN0b3AiLCJzZXRGdW5kYW1lbnRhbFZhbHVlIiwiZ2V0RnVuZGFtZW50YWxWYWx1ZSIsImNyZWF0ZVNuYXJlIiwibm9pc2VCdWZmZXIiLCJub2lzZUdhaW4iLCJub2lzZUZpbHRlciIsIm5vZGVNaXhlciIsIm5vaXNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib3NjTWl4VmFsdWUiLCJub2lzZUZpbHRlclZhbHVlIiwicmVhbCIsImltYWdpbmFyeSIsImN1c3RvbVdhdmUiLCJsb29wIiwic2V0UGVyaW9kaWNXYXZlIiwic2V0T3NjTWl4VmFsdWUiLCJnZXRPc2NNaXhWYWx1ZSIsInNldE5vaXNlRmlsdGVyVmFsdWUiLCJnZXROb2lzZUZpbHRlclZhbHVlIiwiRXZlbnRzIiwiU0VRVUVOQ0VSX1NUQVJUIiwiU0VRVUVOQ0VSX1NUT1AiLCJTRVFVRU5DRVJfVElDSyIsIlRFTVBPX0NIQU5HRSIsIkNIQU5HRSIsIkRpc3BhdGNoZXIiLCJzdWJqZWN0IiwiZGlzcGF0Y2giLCJkYXRhIiwibmV4dCIsImFzIiwiYWN0aW9uIiwibWFwIiwidW5zY2FsZSIsInNjYWxlIiwicmFuZ2UiLCJtYXgiLCJtaW4iLCJjcmVhdGVTZXF1ZW5jZXIiLCJ0aWNrc1BlclF1YXJ0ZXJOb3RlIiwic3RhcnRUaW1lIiwibmV4dFRpY2tUaW1lIiwidGljayIsIm9uVGljayIsIm9uU3RvcCIsIm9uU3RhcnQiLCJvbkxvb3AiLCJ0ZW1wbyIsInRpbWVyIiwic2NoZWR1bGUiLCJvcCIsInBsYXkiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpc1N0YXJ0ZWQiLCJzZXRMb29wTW9kZSIsImdldExvb3BNb2RlIiwic2V0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwic2V0RGl2aXNpb24iLCJnZXREaXZpc2lvbiIsInNldFRlbXBvIiwiZ2V0VGVtcG8iLCJnZXRUaW1lIiwiY3JlYXRlRGVsYXkiLCJkZWxheSIsImZlZWRiYWNrIiwiZGl2aXNpb24iLCJkaXZpc2lvblRvRGVsYXlUaW1lIiwiX2RpdmlzaW9uIiwiX3RlbXBvIiwiZGVsYXlUaW1lU2Vjb25kcyIsImRlbGF5VGltZSIsInNldFRlbXBvVmFsdWUiLCJnZXRUZW1wb1ZhbHVlIiwic2V0RGl2aXNpb25WYWx1ZSIsImRpc2Nvbm5lY3QiLCJnZXREaXZpc2lvblZhbHVlIiwic2V0RGVsYXlUaW1lVmFsdWUiLCJnZXREZWxheVRpbWVWYWx1ZSIsInNldEZlZWRiYWNrVmFsdWUiLCJnZXRGZWVkYmFja1ZhbHVlIiwiUiIsImNyZWF0ZURpc3RvcnRpb24iLCJtYWtlRGlzdG9ydGlvbkN1cnZlIiwiYW1vdW50IiwiY3VydmUiLCJkZWciLCJQSSIsInRpbWVzIiwieCIsImEiLCJiIiwiYWJzIiwicHJlR2FpbiIsInBvc3RHYWluIiwiZGlzdCIsImNyZWF0ZVdhdmVTaGFwZXIiLCJvdmVyc2FtcGxlIiwic2V0Q3VydmVBbW91bnQiLCJzZXRQcmVHYWluVmFsdWUiLCJnZXRQcmVHYWluVmFsdWUiLCJzZXRQb3N0R2FpblZhbHVlIiwiZ2V0UG9zdEdhaW5WYWx1ZSIsImNyZWF0ZU5vaXNlQ29udm9sdmVyIiwiY29udm9sdmVyIiwiY3JlYXRlQ29udm9sdmVyIiwibGVmdCIsInJpZ2h0IiwiY3JlYXRlQml0Q3J1c2hlciIsInNjcmlwdFByb2Nlc3NvciIsImNyZWF0ZVNjcmlwdFByb2Nlc3NvciIsImJpdHMiLCJub3JtRnJlcSIsInN0ZXAiLCJwaGFzZXIiLCJsYXN0Iiwib25hdWRpb3Byb2Nlc3MiLCJldmVudCIsImlucHV0IiwiaW5wdXRCdWZmZXIiLCJvdXRwdXRCdWZmZXIiLCJmbG9vciIsInNldEJpdHNWYWx1ZSIsIk5vb3BJbnN0cnVtZW50IiwiR01EcnVtU3ludGgiLCJiZCIsInNuIiwiaGkiLCJoYXQiLCJjb25kIiwiZXF1YWxzIiwiVCIsImNyZWF0ZURyeVdldE1peGVyIiwibm9kZU91dHB1dE1peGVyIiwiaW5wdXRHYWluTm9kZSIsImRyeUdhaW5Ob2RlIiwid2V0Tm9kZSIsInNldFdldE5vZGUiLCJzZnhOb2RlT3JNYWNybyIsImNyZWF0ZUFjY2VudEVudmVsb3BlIiwiYXR0YWNrVGltZSIsImRlY2F5VGltZSIsImFjY2VudFZhbHVlIiwicGVha1ZhbHVlIiwic3VzdGFpblZhbHVlIiwiaXNBY3RpdmUiLCJwYXJhbWV0ZXIiLCJhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIiLCJhdWRpb1BhcmFtIiwib24iLCJsaW5lYXJSYW1wVG9WYWx1ZUF0VGltZSIsIm9mZiIsInNldEFjdGl2ZSIsInNldEFjY2VudFZhbHVlIiwiZ2V0QWNjZW50VmFsdWUiLCJzZXRBdHRhY2tUaW1lIiwiZ2V0QXR0YWNrVGltZSIsInNldERlY2F5VGltZSIsImdldERlY2F5VGltZSIsInNldFN1c3RhaW5WYWx1ZSIsImdldFN1c3RhaW5WYWx1ZSIsImNyZWF0ZVZvaWNlIiwic2V0V2F2ZUZvcm0iLCJ3YXZlRm9ybSIsInBpdGNoIiwibXVsdGlwbGllciIsImxhc3RNaWRpVmFsdWUiLCJyb3VuZCIsIm5ld0ZyZXF1ZW5jeVZhbHVlIiwibmV3TWlkaVZhbHVlIiwiY29uc29sZSIsImxvZyIsImdldFdhdmVGb3JtIiwiZ2V0V2F2ZUZvcm1zIiwiZ2V0T3V0cHV0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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Q3RFO0FBQ0EsT0FBTztBQUNQO0FBQ0EsNEJBQTRCLHlDQUF5QztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7Ozs7Ozs7O0FDbEVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7O0FDcEJBLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQRDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7Ozs7Ozs7OztBQ1pPLElBQU1jLG9DQUFlbkwsWUFBRCxJQUFrQjtBQUM1QztBQUNBLEtBQU1rRSxTQUFTbEUsYUFBYXFDLFVBQWIsRUFBZjtBQUNBLEtBQU1pQyxTQUFTdEUsYUFBYXVFLGtCQUFiLEVBQWY7QUFDQSxLQUFNNkcsUUFBUXBMLGFBQWFtTCxXQUFiLENBQXlCLEdBQXpCLENBQWQ7QUFDQSxLQUFNRSxXQUFXckwsYUFBYXFDLFVBQWIsRUFBakI7QUFDQTtBQUNBK0ksT0FBTS9KLE9BQU4sQ0FBY2dLLFFBQWQsRUFDR2hLLE9BREgsQ0FDV2lELE1BRFgsRUFFR2pELE9BRkgsQ0FFVytKLEtBRlgsRUFHRy9KLE9BSEgsQ0FHVzZDLE1BSFg7QUFJQTtBQUNBSSxRQUFPYyxJQUFQLEdBQWMsU0FBZDtBQUNBLEtBQUk4RSxRQUFRLEdBQVo7QUFDQSxLQUFJb0IsV0FBVyxDQUFmO0FBQ0E7QUFDQSxLQUFNQyxzQkFBc0IsQ0FBQ0MsU0FBRCxFQUFZQyxNQUFaLEtBQXVCLE1BQU1BLFNBQVNELFNBQWYsQ0FBbkQ7QUFDQSxLQUFJRSxtQkFBbUJILG9CQUFvQkQsUUFBcEIsRUFBOEJwQixLQUE5QixDQUF2Qjs7QUFFQWtCLE9BQU1PLFNBQU4sQ0FBZ0JoSixLQUFoQixHQUF3QitJLGdCQUF4Qjs7QUFFQSxRQUFPO0FBQ05ySyxVQUFRLEVBQUVBLE9BQUYsRUFBV0QsUUFBWCxFQUFSLEVBQStCO0FBQzlCOEMsVUFBTzdDLE9BQVAsQ0FBZUQsVUFBZjtBQUNBLFVBQU8sRUFBRUMsT0FBRixFQUFQO0FBQ0EsR0FKSztBQUtORCxhQUFXO0FBQ1YsVUFBT2dLLEtBQVA7QUFDQSxHQVBLO0FBUU5RLGdCQUFjakosS0FBZCxFQUFxQjtBQUNwQnVILFdBQVF2SCxLQUFSO0FBQ0F5SSxTQUFNTyxTQUFOLENBQWdCaEosS0FBaEIsR0FBd0I0SSxvQkFBb0JELFFBQXBCLEVBQThCcEIsS0FBOUIsQ0FBeEI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQVpLO0FBYU4yQixrQkFBZ0I7QUFDZixVQUFPM0IsS0FBUDtBQUNBLEdBZks7QUFnQk40QixtQkFBaUJuSixLQUFqQixFQUF3QjtBQUN2QjJJLGNBQVczSSxLQUFYO0FBQ0ErSSxzQkFBbUJILG9CQUFvQkQsUUFBcEIsRUFBOEJwQixLQUE5QixDQUFuQjtBQUNBa0IsU0FBTVcsVUFBTixDQUFpQlYsUUFBakI7QUFDQUQsU0FBTU8sU0FBTixDQUFnQmhKLEtBQWhCLEdBQXdCK0ksZ0JBQXhCO0FBQ0FOLFNBQU0vSixPQUFOLENBQWNnSyxRQUFkO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsR0F2Qks7QUF3Qk5XLHFCQUFtQjtBQUNsQixVQUFPVixRQUFQO0FBQ0EsR0ExQks7QUEyQk5XLG9CQUFrQnRKLEtBQWxCLEVBQXlCO0FBQ3hCK0ksc0JBQW1CL0ksS0FBbkI7QUFDQXlJLFNBQU1PLFNBQU4sQ0FBZ0JoSixLQUFoQixHQUF3QitJLGdCQUF4QjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBL0JLO0FBZ0NOUSxzQkFBb0I7QUFDbkIsVUFBT1IsZ0JBQVA7QUFDQSxHQWxDSztBQW1DTjdGLG9CQUFrQmxELEtBQWxCLEVBQXlCO0FBQ3hCMkIsVUFBT04sU0FBUCxDQUFpQnJCLEtBQWpCLEdBQXlCQSxLQUF6QjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBdENLO0FBdUNObUQsc0JBQW9CO0FBQ25CLFVBQU94QixPQUFPTixTQUFQLENBQWlCckIsS0FBeEI7QUFDQSxHQXpDSztBQTBDTndKLG1CQUFpQnhKLEtBQWpCLEVBQXdCO0FBQ3ZCMEksWUFBUzNJLElBQVQsQ0FBY0MsS0FBZCxHQUFzQkEsS0FBdEI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQTdDSztBQThDTnlKLHFCQUFtQjtBQUNsQixVQUFPZixTQUFTM0ksSUFBVCxDQUFjQyxLQUFyQjtBQUNBO0FBaERLLEVBQVA7QUFrREEsQ0F2RU0sQzs7Ozs7Ozs7Ozs7Ozs7QUNBUDs7SUFBWTBKLEM7Ozs7QUFFTCxJQUFNQyw4Q0FBb0J0TSxZQUFELElBQWtCO0FBQ2pELEtBQU11TSxzQkFBdUJDLE1BQUQsSUFBWTtBQUN2QyxNQUFNLEVBQUU3TCxVQUFGLEtBQWlCWCxZQUF2QjtBQUNBLE1BQU15TSxRQUFRLElBQUl0TSxZQUFKLENBQWlCLEtBQWpCLENBQWQ7QUFDQSxNQUFNdU0sTUFBTXJNLEtBQUtzTSxFQUFMLEdBQVUsR0FBdEI7QUFDQU4sSUFBRU8sS0FBRixDQUFTMU0sQ0FBRCxJQUFPO0FBQ2QsT0FBTTJNLElBQUszTSxJQUFJLENBQUwsSUFBV1MsYUFBYSxDQUF4QixDQUFWO0FBQ0EsT0FBTW1NLElBQUksQ0FBQyxJQUFJTixNQUFMLElBQWVLLENBQWYsR0FBbUIsRUFBbkIsR0FBd0JILEdBQWxDO0FBQ0EsT0FBTUssSUFBSTFNLEtBQUtzTSxFQUFMLEdBQVdILFNBQVNuTSxLQUFLMk0sR0FBTCxDQUFTSCxDQUFULENBQTlCO0FBQ0FKLFNBQU12TSxDQUFOLElBQVc0TSxJQUFJQyxDQUFmO0FBQ0EsR0FMRCxFQUtHcE0sVUFMSDtBQU1BLFNBQU84TCxLQUFQO0FBQ0EsRUFYRDs7QUFhQSxLQUFNUSxVQUFVak4sYUFBYXFDLFVBQWIsRUFBaEI7QUFDQSxLQUFNNkssV0FBV2xOLGFBQWFxQyxVQUFiLEVBQWpCO0FBQ0EsS0FBTThLLE9BQU9uTixhQUFhb04sZ0JBQWIsRUFBYjtBQUNBSCxTQUFRNUwsT0FBUixDQUFnQjhMLElBQWhCLEVBQXNCOUwsT0FBdEIsQ0FBOEI2TCxRQUE5QjtBQUNBQyxNQUFLVixLQUFMLEdBQWFGLG9CQUFvQixHQUFwQixDQUFiO0FBQ0FZLE1BQUtFLFVBQUwsR0FBa0IsSUFBbEI7QUFDQUosU0FBUXZLLElBQVIsQ0FBYUMsS0FBYixHQUFxQixFQUFyQjtBQUNBdUssVUFBU3hLLElBQVQsQ0FBY0MsS0FBZCxHQUFzQixDQUF0QjtBQUNBLFFBQU87QUFDTnRCLFVBQVEsRUFBRUEsT0FBRixFQUFXRCxRQUFYLEVBQVIsRUFBK0I7QUFDOUI4TCxZQUFTN0wsT0FBVCxDQUFpQkQsVUFBakI7QUFDQSxVQUFPLEVBQUVDLE9BQUYsRUFBUDtBQUNBLEdBSks7QUFLTkQsYUFBVztBQUNWLFVBQU82TCxPQUFQO0FBQ0EsR0FQSztBQVFOSyxpQkFBZWQsTUFBZixFQUF1QjtBQUN0QlcsUUFBS1YsS0FBTCxHQUFhRixvQkFBb0JDLE1BQXBCLENBQWI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQVhLO0FBWU5lLGtCQUFnQjVLLEtBQWhCLEVBQXVCO0FBQ3RCc0ssV0FBUXZLLElBQVIsQ0FBYUMsS0FBYixHQUFxQkEsS0FBckI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQWZLO0FBZ0JONkssb0JBQWtCO0FBQ2pCLFVBQU9QLFFBQVF2SyxJQUFSLENBQWFDLEtBQXBCO0FBQ0EsR0FsQks7QUFtQk44SyxtQkFBaUI5SyxLQUFqQixFQUF3QjtBQUN2QnVLLFlBQVN4SyxJQUFULENBQWNDLEtBQWQsR0FBc0JBLEtBQXRCO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsR0F0Qks7QUF1Qk4rSyxxQkFBbUI7QUFDbEIsVUFBT1IsU0FBU3hLLElBQVQsQ0FBY0MsS0FBckI7QUFDQTtBQXpCSyxFQUFQO0FBMkJBLENBakRNLEM7Ozs7Ozs7Ozs7Ozs7O0FDRlA7O0lBQVkwSixDOzs7O0FBRUwsSUFBTXNCLHNEQUF3QjNOLFlBQUQsSUFBa0I7QUFDckQsS0FBTTROLFlBQVk1TixhQUFhNk4sZUFBYixFQUFsQjtBQUNBLEtBQU1uTixhQUFhVixhQUFhVyxVQUFoQztBQUNBLEtBQU1FLFNBQVNiLGFBQWFjLFlBQWIsQ0FBMEIsQ0FBMUIsRUFBNkJKLGFBQWEsQ0FBMUMsRUFBNkNBLFVBQTdDLENBQWY7QUFDQSxLQUFNb04sT0FBT2pOLE9BQU9HLGNBQVAsQ0FBc0IsQ0FBdEIsQ0FBYjtBQUNBLEtBQU0rTSxRQUFRbE4sT0FBT0csY0FBUCxDQUFzQixDQUF0QixDQUFkO0FBQ0FxTCxHQUFFTyxLQUFGLENBQVMxTSxDQUFELElBQU87QUFDZDROLE9BQUs1TixDQUFMLElBQVVHLEtBQUtDLE1BQUwsRUFBVjtBQUNBeU4sUUFBTTdOLENBQU4sSUFBV0csS0FBS0MsTUFBTCxFQUFYO0FBQ0EsRUFIRCxFQUdHTyxPQUFPa0csTUFIVjtBQUlBNkcsV0FBVS9NLE1BQVYsR0FBbUJBLE1BQW5COztBQUVBLFFBQU87QUFDTlEsVUFBUSxFQUFFQSxPQUFGLEVBQVdELFFBQVgsRUFBUixFQUErQjtBQUM5QndNLGFBQVV2TSxPQUFWLENBQWtCRCxVQUFsQjtBQUNBLFVBQU8sRUFBRUMsT0FBRixFQUFQO0FBQ0EsR0FKSztBQUtORCxhQUFXO0FBQ1YsVUFBT3dNLFNBQVA7QUFDQTtBQVBLLEVBQVA7QUFTQSxDQXJCTSxDOzs7Ozs7Ozs7Ozs7OztBQ0ZQOztJQUFZdkIsQzs7OztBQUVMLElBQU0yQiw4Q0FBb0JoTyxZQUFELElBQWtCO0FBQ2pELEtBQU1VLGFBQWEsR0FBbkI7QUFDQSxLQUFNdU4sa0JBQWtCak8sYUFBYWtPLHFCQUFiLENBQW1DeE4sVUFBbkMsRUFBK0MsQ0FBL0MsRUFBa0QsQ0FBbEQsQ0FBeEI7QUFDQSxLQUFJeU4sT0FBTyxFQUFYO0FBQ0EsS0FBSUMsV0FBVyxJQUFmO0FBQ0EsS0FBTUMsZ0JBQU8sR0FBUCxFQUFjRixJQUFkLENBQU47QUFDQSxLQUFJRyxTQUFTLENBQWI7QUFDQSxLQUFJQyxPQUFPLENBQVg7QUFDQU4saUJBQWdCTyxjQUFoQixHQUFrQ0MsS0FBRCxJQUFXO0FBQzNDLE1BQU1DLFFBQVFELE1BQU1FLFdBQU4sQ0FBa0IzTixjQUFsQixDQUFpQyxDQUFqQyxDQUFkO0FBQ0EsTUFBTWtELFNBQVN1SyxNQUFNRyxZQUFOLENBQW1CNU4sY0FBbkIsQ0FBa0MsQ0FBbEMsQ0FBZjtBQUNBcUwsSUFBRU8sS0FBRixDQUFTMU0sQ0FBRCxJQUFPO0FBQ2RvTyxhQUFVRixRQUFWO0FBQ0EsT0FBSUUsVUFBVSxDQUFkLEVBQWlCO0FBQ2hCQSxjQUFVLENBQVY7QUFDQUMsV0FBT0YsT0FBT2hPLEtBQUt3TyxLQUFMLENBQVlILE1BQU14TyxDQUFOLElBQVdtTyxJQUFaLEdBQW9CLEdBQS9CLENBQWQ7QUFDQTtBQUNEbkssVUFBT2hFLENBQVAsSUFBWXFPLElBQVo7QUFDQSxHQVBELEVBT0c3TixVQVBIO0FBUUEsRUFYRDs7QUFhQSxRQUFPO0FBQ05XLFVBQVEsRUFBRUEsT0FBRixFQUFXRCxRQUFYLEVBQVIsRUFBK0I7QUFDOUI2TSxtQkFBZ0I1TSxPQUFoQixDQUF3QkQsVUFBeEI7QUFDQSxVQUFPLEVBQUVDLE9BQUYsRUFBUDtBQUNBLEdBSks7QUFLTkQsYUFBVztBQUNWLFVBQU82TSxlQUFQO0FBQ0EsR0FQSztBQVFOcEksb0JBQWtCbEQsS0FBbEIsRUFBeUI7QUFDeEJ5TCxjQUFXekwsS0FBWDtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBWEs7QUFZTm1NLGVBQWFuTSxLQUFiLEVBQW9CO0FBQ25Cd0wsVUFBT3hMLEtBQVA7QUFDQSxVQUFPLElBQVA7QUFDQTtBQWZLLEVBQVA7QUFpQkEsQ0F0Q00sQzs7Ozs7Ozs7Ozs7O0FDRkEsSUFBTW9NLDBDQUFrQi9PLFlBQUQsSUFBa0I7QUFDL0MsS0FBTWtFLFNBQVNsRSxhQUFhcUMsVUFBYixFQUFmOztBQUVBLFFBQU87QUFDTmtELFdBQVMsQ0FFUixDQUhLO0FBSU5JLFlBQVUsQ0FFVCxDQU5LO0FBT050RSxVQUFRLEVBQUVBLE9BQUYsRUFBV0QsUUFBWCxFQUFSLEVBQStCO0FBQzlCOEMsVUFBTzdDLE9BQVAsQ0FBZUQsVUFBZjtBQUNBLFVBQU8sRUFBRUMsT0FBRixFQUFQO0FBQ0E7QUFWSyxFQUFQO0FBWUEsQ0FmTSxDOzs7Ozs7Ozs7Ozs7OztBQ0FQOztJQUFZZ0wsQzs7QUFDWjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVPLElBQU0yQyxvQ0FBYyxDQUFDaFAsZUFBZSxzQkFBVSxjQUFWLENBQWhCLEtBQThDO0FBQ3hFLEtBQU1pUCxLQUFLLDhCQUFlalAsWUFBZixFQUE2QitGLGdCQUE3QixDQUE4QyxHQUE5QyxDQUFYO0FBQ0EsS0FBTW1KLEtBQUssd0JBQVlsUCxZQUFaLEVBQTBCK0YsZ0JBQTFCLENBQTJDLEdBQTNDLENBQVg7QUFDQSxLQUFNb0osS0FBSyxvQkFBVW5QLFlBQVYsRUFBd0IrRixnQkFBeEIsQ0FBeUMsR0FBekMsQ0FBWDtBQUNBLEtBQU1xSixNQUFNLG9CQUFVcFAsWUFBVixFQUF3QitGLGdCQUF4QixDQUF5QyxHQUF6QyxDQUFaOztBQUVBLEtBQU03QixTQUFTLHFCQUFTbEUsYUFBYXFDLFVBQWIsRUFBVCxDQUFmOztBQUVBNE0sSUFBRzVOLE9BQUgsQ0FBVzZDLE1BQVg7QUFDQWdMLElBQUc3TixPQUFILENBQVc2QyxNQUFYO0FBQ0FpTCxJQUFHOU4sT0FBSCxDQUFXNkMsTUFBWDtBQUNBa0wsS0FBSS9OLE9BQUosQ0FBWTZDLE1BQVo7O0FBRUEsUUFBTztBQUNOcUIsU0FBTzdCLFNBQVAsRUFBa0I4QixRQUFsQixFQUE0QkMsT0FBT3pGLGFBQWFzRixXQUFoRCxFQUE2RDtBQUM1RCtHLEtBQUVnRCxJQUFGLENBQU8sQ0FDTixDQUNDaEQsRUFBRWlELE1BQUYsQ0FBUyxFQUFULENBREQsRUFFQyxNQUFNTCxHQUFHMUosTUFBSCxDQUFVRSxJQUFWLENBRlAsQ0FETSxFQUtOLENBQ0M0RyxFQUFFaUQsTUFBRixDQUFTLEVBQVQsQ0FERCxFQUVDLE1BQU1MLEdBQUcxSixNQUFILENBQVVFLElBQVYsQ0FGUCxDQUxNLEVBU04sQ0FDQzRHLEVBQUVpRCxNQUFGLENBQVMsRUFBVCxDQURELEVBRUMsTUFBTUosR0FBRzNKLE1BQUgsQ0FBVUUsSUFBVixDQUZQLENBVE0sRUFhTixDQUNDNEcsRUFBRWlELE1BQUYsQ0FBUyxFQUFULENBREQsRUFFQyxNQUFNSixHQUFHM0osTUFBSCxDQUFVRSxJQUFWLENBRlAsQ0FiTSxFQWlCTixDQUNDNEcsRUFBRWlELE1BQUYsQ0FBUyxFQUFULENBREQsRUFFQyxNQUFNSCxHQUFHNUosTUFBSCxDQUFVRSxJQUFWLENBRlAsQ0FqQk0sRUFxQk4sQ0FDQzRHLEVBQUVpRCxNQUFGLENBQVMsRUFBVCxDQURELEVBRUMsTUFBTUYsSUFBSTdKLE1BQUosQ0FBV0UsSUFBWCxDQUZQLENBckJNLEVBeUJOLENBQ0M0RyxFQUFFa0QsQ0FESCxFQUVDLE1BQU0sQ0FBRSxDQUZULENBekJNLENBQVAsRUE2Qkc3TCxTQTdCSDtBQThCQSxHQWhDSztBQWlDTmlDLFVBQVFqQyxTQUFSLEVBQW1CK0IsT0FBT3pGLGFBQWFzRixXQUF2QyxFQUFvRDtBQUNuRCtHLEtBQUVnRCxJQUFGLENBQU8sQ0FDTixDQUNDaEQsRUFBRWlELE1BQUYsQ0FBUyxFQUFULENBREQsRUFFQyxNQUFNTCxHQUFHdEosT0FBSCxDQUFXRixJQUFYLENBRlAsQ0FETSxFQUtOLENBQ0M0RyxFQUFFaUQsTUFBRixDQUFTLEVBQVQsQ0FERCxFQUVDLE1BQU1KLEdBQUd2SixPQUFILENBQVdGLElBQVgsQ0FGUCxDQUxNLEVBU04sQ0FDQzRHLEVBQUVrRCxDQURILEVBRUMsTUFBTSxDQUFFLENBRlQsQ0FUTSxDQUFQLEVBYUc3TCxTQWJIO0FBY0EsR0FoREs7QUFpRE5yQyxVQUFRLEVBQUVBLE9BQUYsRUFBV0QsUUFBWCxFQUFSLEVBQStCO0FBQzlCOEMsVUFBTzdDLE9BQVAsQ0FBZSxFQUFFRCxRQUFGLEVBQWY7QUFDQSxVQUFPLEVBQUVDLE9BQUYsRUFBUDtBQUNBO0FBcERLLEVBQVA7QUFzREEsQ0FuRU0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTlA7Ozs7QUFFTyxJQUFNbU8sZ0RBQXFCeFAsWUFBRCxJQUFrQjtBQUNsRCxLQUFNeVAsa0JBQWtCLDRDQUFzQnpQLFlBQXRCLENBQXhCO0FBQ0EsS0FBTTBQLGdCQUFnQjFQLGFBQWFxQyxVQUFiLEVBQXRCO0FBQ0EsS0FBTXNOLGNBQWMzUCxhQUFhcUMsVUFBYixFQUFwQjs7QUFFQSxLQUFJdU4sVUFBVTVQLGFBQWFxQyxVQUFiLEVBQWQ7O0FBRUFxTixlQUFjck8sT0FBZCxDQUFzQnNPLFdBQXRCO0FBQ0FELGVBQWNyTyxPQUFkLENBQXNCdU8sT0FBdEI7O0FBRUFILGlCQUFnQjNNLFlBQWhCLENBQTZCNk0sV0FBN0I7QUFDQUYsaUJBQWdCMU0sYUFBaEIsQ0FBOEI2TSxPQUE5Qjs7QUFFQSxRQUFPLHNCQUFjSCxlQUFkLEVBQStCO0FBQ3JDck8sYUFBVztBQUNWLFVBQU9zTyxhQUFQO0FBQ0EsR0FIb0M7QUFJckNHLGFBQVdDLGNBQVgsRUFBMkI7QUFDMUJGLGFBQVVFLGVBQWUxTyxRQUFmLEdBQTBCME8sZUFBZTFPLFFBQWYsRUFBMUIsR0FBc0QwTyxjQUFoRTtBQUNBTCxtQkFBZ0IxTSxhQUFoQixDQUE4QjZNLE9BQTlCO0FBQ0FGLGlCQUFjM0QsVUFBZDtBQUNBMkQsaUJBQWNyTyxPQUFkLENBQXNCc08sV0FBdEI7QUFDQUQsaUJBQWNyTyxPQUFkLENBQXNCdU8sT0FBdEI7QUFDQSxVQUFPLElBQVA7QUFDQTtBQVhvQyxFQUEvQixDQUFQO0FBYUEsQ0ExQk0sQzs7Ozs7O0FDRlA7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7O0FBRUEsMENBQTBDLGtDQUFzQzs7Ozs7Ozs7QUNIaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLFVBQVUsRUFBRTtBQUNoRCxtQkFBbUIsc0NBQXNDO0FBQ3pELENBQUMscUNBQXFDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOzs7Ozs7O0FDakNEOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7QUFDQTs7QUFFTyxJQUFNRyxzREFBdUIsQ0FBQy9QLGVBQWUsdUJBQWhCLEtBQWdDO0FBQ25FLEtBQUlnUSxhQUFhLENBQWpCO0FBQ0EsS0FBSUMsWUFBWSxDQUFoQjtBQUNBLEtBQUlDLGNBQWMsQ0FBbEI7QUFDQSxLQUFJQyxZQUFZLENBQWhCO0FBQ0EsS0FBSUMsZUFBZUQsU0FBbkI7QUFDQSxLQUFJRSxXQUFXLElBQWY7O0FBRUEsS0FBSUMsa0JBQUo7O0FBRUEsS0FBTUMsMkJBQTJCLE1BQU07QUFDdEMsTUFBSSxrQkFBTUQsU0FBTixDQUFKLEVBQXNCO0FBQ3JCLFNBQU0sSUFBSXhRLEtBQUosQ0FBVSwyRUFBVixDQUFOO0FBQ0E7QUFDRCxFQUpEOztBQU1BLFFBQU87QUFDTnVCLFVBQVFtUCxhQUFhLHVCQUFyQixFQUFrQztBQUNqQ0YsZUFBWUUsVUFBWjtBQUNBSixrQkFBZUUsVUFBVTNOLEtBQXpCO0FBQ0EsVUFBTyxJQUFQO0FBQ0EsR0FMSztBQU1OOE4sS0FBR2hMLE9BQU96RixhQUFhc0YsV0FBdkIsRUFBb0M7QUFDbkNpTDtBQUNBLE9BQUlGLFFBQUosRUFBYztBQUNiRixnQkFBWUMsZUFBZUYsV0FBM0I7QUFDQUksY0FBVXhKLGNBQVYsQ0FBeUJzSixZQUF6QixFQUF1QzNLLElBQXZDO0FBQ0E2SyxjQUFVSSx1QkFBVixDQUFrQ1AsU0FBbEMsRUFBNkMxSyxPQUFPdUssVUFBcEQ7QUFDQU0sY0FBVTVLLDRCQUFWLENBQXVDMEssWUFBdkMsRUFBcUQzSyxPQUFPdUssVUFBUCxHQUFvQkMsU0FBekU7QUFDQTtBQUNELEdBZEs7QUFlTlUsTUFBSWxMLE9BQU96RixhQUFhc0YsV0FBeEIsRUFBcUM7QUFDcENpTDtBQUNBLE9BQUlGLFFBQUosRUFBYztBQUNiQyxjQUFVeEosY0FBVixDQUF5QnNKLFlBQXpCLEVBQXVDM0ssSUFBdkM7QUFDQTZLLGNBQVUxSyxxQkFBVixDQUFnQ0gsSUFBaEM7QUFDQTtBQUNELEdBckJLO0FBc0JONEssYUFBVztBQUNWLFVBQU9BLFFBQVA7QUFDQSxHQXhCSztBQXlCTk8sWUFBVWpPLFFBQVEsdUJBQWxCLEVBQStCO0FBQzlCME4sY0FBVzFOLEtBQVg7QUFDQSxVQUFPLElBQVA7QUFDQSxHQTVCSztBQTZCTmtPLGlCQUFlbE8sUUFBUSx1QkFBdkIsRUFBb0M7QUFDbkN1TixpQkFBY3ZOLEtBQWQ7QUFDQSxVQUFPLElBQVA7QUFDQSxHQWhDSztBQWlDTm1PLG1CQUFpQjtBQUNoQixVQUFPWixXQUFQO0FBQ0EsR0FuQ0s7QUFvQ05hLGdCQUFjdEwsT0FBTyx1QkFBckIsRUFBa0M7QUFDakN1SyxnQkFBYXZLLElBQWI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQXZDSztBQXdDTnVMLGtCQUFnQjtBQUNmLFVBQU9oQixVQUFQO0FBQ0EsR0ExQ0s7QUEyQ05pQixlQUFheEwsT0FBTyx1QkFBcEIsRUFBaUM7QUFDaEN3SyxlQUFZeEssSUFBWjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBOUNLO0FBK0NOeUwsaUJBQWU7QUFDZCxVQUFPakIsU0FBUDtBQUNBLEdBakRLO0FBa0ROa0Isa0JBQWdCeE8sUUFBUSx1QkFBeEIsRUFBcUM7QUFDcEN5TixrQkFBZXpOLEtBQWY7QUFDQSxVQUFPLElBQVA7QUFDQSxHQXJESztBQXNETnlPLG9CQUFrQjtBQUNqQixVQUFPaEIsWUFBUDtBQUNBO0FBeERLLEVBQVA7QUEwREEsQ0ExRU0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hQOztBQUNBOztBQUNBOzs7O0FBRU8sSUFBTWlCLG9DQUFjLENBQUNyUixlQUFlLHNCQUFVLGNBQVYsQ0FBaEIsS0FBOEM7QUFDeEUsS0FBTXNSLGNBQWMsQ0FBQ0MsUUFBRCxFQUFXL00sR0FBWCxLQUFtQjtBQUN0QyxNQUFJK00sYUFBYSxxQkFBVTVQLE1BQTNCLEVBQW1DO0FBQ2xDNkMsT0FBSXlELGVBQUosQ0FBb0IsaUNBQXFCakksWUFBckIsQ0FBcEI7QUFDQSxHQUZELE1BRU87QUFBRTtBQUNSd0UsT0FBSVksSUFBSixHQUFXbU0sUUFBWDtBQUNBO0FBQ0QsRUFORDtBQU9BLEtBQU0vTSxNQUFNeEUsYUFBYXlFLGdCQUFiLEVBQVo7QUFDQSxLQUFJOE0sV0FBVyxxQkFBVTlQLFFBQXpCOztBQUVBNlAsYUFBWUMsUUFBWixFQUFzQi9NLEdBQXRCOztBQUVBLEtBQU1OLFNBQVNsRSxhQUFhcUMsVUFBYixFQUFmO0FBQ0FtQyxLQUFJbkQsT0FBSixDQUFZNkMsTUFBWjtBQUNBTSxLQUFJYSxLQUFKLENBQVVyRixhQUFhc0YsV0FBdkI7O0FBRUEsUUFBTyxzQkFBY2QsR0FBZCxFQUFtQjtBQUN6QmdOLFFBQU1DLGFBQWEsc0JBQVUsWUFBVixDQUFuQixFQUE0QztBQUMzQztBQUNBLE9BQU1DLGdCQUFnQnJSLEtBQUtzUixLQUFMLENBQVcsMkJBQWdCLEdBQWhCLEVBQXFCbk4sSUFBSVIsU0FBSixDQUFjckIsS0FBbkMsQ0FBWCxDQUF0QjtBQUNBO0FBQ0EsT0FBTWlQLG9CQUFvQnBOLElBQUlSLFNBQUosQ0FBY3JCLEtBQWQsR0FBc0I4TyxVQUFoRDtBQUNBO0FBQ0EsT0FBTUksZUFBZXhSLEtBQUtzUixLQUFMLENBQVcsMkJBQWdCLEdBQWhCLEVBQXFCQyxpQkFBckIsQ0FBWCxDQUFyQjtBQUNBO0FBQ0FwTixPQUFJUixTQUFKLENBQWM4QyxjQUFkLENBQTZCOEssaUJBQTdCLEVBQWdENVIsYUFBYXNGLFdBQTdEO0FBQ0EsVUFBTyxFQUFFb00sYUFBRixFQUFpQkcsWUFBakIsRUFBUDtBQUNBLEdBWHdCO0FBWXpCeFEsVUFBUSxFQUFFRCxXQUFXLHNCQUFVLE9BQVYsQ0FBYixFQUFpQ0MsT0FBakMsRUFBUixFQUFvRDtBQUNuRHlRLFdBQVFDLEdBQVIsQ0FBWSxTQUFaO0FBQ0E3TixVQUFPN0MsT0FBUCxDQUFlRCxVQUFmO0FBQ0EsVUFBTyxFQUFFQyxPQUFGLEVBQVA7QUFDQSxHQWhCd0I7QUFpQnpCMlEsZ0JBQWM7QUFDYixVQUFPeE4sSUFBSVksSUFBWDtBQUNBLEdBbkJ3QjtBQW9CekJrTSxjQUFZM08sUUFBUSxzQkFBVSxVQUFWLENBQXBCLEVBQTJDO0FBQzFDNE8sY0FBVzVPLEtBQVg7QUFDQTJPLGVBQVlDLFFBQVosRUFBc0IvTSxHQUF0QjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBeEJ3QjtBQXlCekJ5TixpQkFBZTtBQUNkLFVBQU8sMkNBQVA7QUFDQSxHQTNCd0I7QUE0QnpCQyxjQUFZO0FBQ1gsVUFBT2hPLE1BQVA7QUFDQTtBQTlCd0IsRUFBbkIsQ0FBUDtBQWdDQSxDQWpETSxDOzs7Ozs7QUNKUCxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBOzs7Ozs7O0FDREE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ1JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJ3YXNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDcwZDE5NDI1MjEwMWFkMGE0YWMyIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcblxuZXhwb3J0IGNvbnN0IG1hbmRhdG9yeSA9IChwYXJhbWV0ZXJOYW1lID0gJycpID0+IHtcblx0dGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG1hbmRhdG9yeSBwYXJhbWV0ZXIgJHtwYXJhbWV0ZXJOYW1lfWApXG59XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVSYW5kb21XYXZlRm9ybSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSwgY29tcGxleGl0eSA9IDgpID0+IHtcblx0Y29uc3QgaSA9IEZsb2F0MzJBcnJheS5mcm9tKHRpbWVzKE1hdGgucmFuZG9tLCBjb21wbGV4aXR5KSlcblx0Y29uc3QgciA9IEZsb2F0MzJBcnJheS5mcm9tKHRpbWVzKE1hdGgucmFuZG9tLCBjb21wbGV4aXR5KSlcblx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUociwgaSlcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vaXNlQnVmZmVyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdGNvbnN0IGJ1ZmZlclNpemUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBudW1DaGFubmVscyA9IDFcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihudW1DaGFubmVscywgYnVmZmVyU2l6ZSwgYnVmZmVyU2l6ZSlcblx0Y29uc3QgbyA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkgKz0gMSkge1xuXHRcdG9baV0gPSBNYXRoLnJhbmRvbSgpXG5cdH1cblx0cmV0dXJuIGJ1ZmZlclxufVxuXG5leHBvcnQgY29uc3Qgd3JhcE5vZGUgPSAoYXVkaW9Ob2RlID0gbWFuZGF0b3J5KCkpID0+ICh7XG5cdGdldE5vZGUoKSB7XG5cdFx0cmV0dXJuIGF1ZGlvTm9kZVxuXHR9LFxuXHRnZXRJbnB1dCgpIHtcblx0XHRyZXR1cm4gYXVkaW9Ob2RlXG5cdH0sXG5cdGNvbm5lY3QoeyBnZXRJbnB1dCwgY29ubmVjdCB9KSB7XG5cdFx0YXVkaW9Ob2RlLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0fSxcbn0pXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vdXRpbHMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFdhdmVGb3JtcyBwcm92aWRlcyBhIGhhc2ggb2YgY29uc3RhbnRzIGZvciBvc2NpbGxhdG9yIHR5cGUgYXNzaWduYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBXYXZlRm9ybXMgPSBPYmplY3QuZnJlZXplKHtcblx0U1FVQVJFOiAnc3F1YXJlJyxcblx0U0FXVE9PVEg6ICdzYXd0b290aCcsXG5cdFRSSUFOR0xFOiAndHJpYW5nbGUnLFxuXHRTSU5FOiAnc2luZScsXG5cdFJBTkRPTTogJ3JhbmRvbScsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy93YXZlLWZvcm1zLmpzIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWx0ZXJUeXBlcyBwcm92aWRlcyBjb25zdGFudHMgZm9yIGZpbHRlciB0eXBlIGFzc2lnbmF0aW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgRmlsdGVyVHlwZXMgPSBPYmplY3QuZnJlZXplKHtcblx0TE9XX1BBU1M6ICdsb3dwYXNzJyxcblx0QkFORF9QQVNTOiAnYmFuZHBhc3MnLFxuXHRISUdIX1BBU1M6ICdoaWdocGFzcycsXG5cdExPV19TSEVMRjogJ2xvd3NoZWxmJyxcblx0SElHSF9TSEVMRjogJ2hpZ2hzaGVsZicsXG5cdEFMTF9QQVNTOiAnYWxscGFzcycsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy9maWx0ZXItdHlwZXMuanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Lyogd2ViIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBsZWZ0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IHJpZ2h0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0LyogY29uc3RhbnQgdmFsdWVzICovXG5cdGNvbnN0IE1JRERMRV9HQUlOX1ZBTFVFID0gMC41XG5cblx0LyogcGFyYW1ldGVyIHZhbHVlcyAqL1xuXHRsZXQgZmFkZVZhbHVlID0gMFxuXG5cdC8qIHJvdXRpbmcgKi9cblx0bGVmdEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdHJpZ2h0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXG5cdHJldHVybiB7XG5cdFx0c2V0RmFkZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFIC0gKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpXG5cdFx0XHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSArICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0ZmFkZVZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGYWRlVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmFkZVZhbHVlXG5cdFx0fSxcblx0XHRzZXRMZWZ0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0UmlnaHRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KHJpZ2h0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dEdhaW5Ob2RlLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0TGVmdEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIGxlZnRHYWluTm9kZVxuXHRcdH0sXG5cdFx0Z2V0UmlnaHRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiByaWdodEdhaW5Ob2RlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyLmpzIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm90ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBUaGUgcGl0Y2ggaW4gY2hyb21hdGljIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG9jdGF2ZSAtIFRoZSBvY3RhdmUgdmFsdWUgYXNzb2NpYXRlZCB0byBwaXRjaCBjbGFzc1xuICovXG5cbi8qKlxuICogcGl0Y2hDbGFzc2VzIHByb3ZpZGVzIHRoZSBjaHJvbWF0aWMgc2NhbGUgc3ltYm9scyBleHBvcnRlZCBhcyBhIGxpc3Q6XG4gKiAnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQidcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkaVRvRnJlcXVlbmN5KHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gKChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHBpdGNoIGNsYXNzIGFuZCBvY3RhdmUgZm9yIHRoZSBnaXZlbiBtaWRpIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWlkaVZhbHVlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKiBAcmV0dXJucyB7Tm90ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pZGlUb1N5bWJvbChtaWRpVmFsdWUpIHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJlcXVlbmN5VG9NaWRpKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvRnJlcXVlbmN5KHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gXHRtaWRpVG9GcmVxdWVuY3koNDQwLCBzeW1ib2xUb01pZGkocGl0Y2hDbGFzcywgb2N0YXZlKSlcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbm90ZSBhbmQgb2N0YXZlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gZnJlcXVlbmN5XG4gKiBAcGFyYW0ge251bWJlcn0gZnJlcXVlbmN5IC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVxdWVuY3lUb1N5bWJvbChmcmVxdWVuY3kpIHtcblx0cmV0dXJuIG1pZGlUb1N5bWJvbChmcmVxdWVuY3lUb01pZGkoNDQwLCBmcmVxdWVuY3kpKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbm90ZS5qcyIsImltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQmFzc0RydW0gPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGNvbXAgPSBhdWRpb0NvbnRleHQuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gMjUwMFxuXG5cdGNvbXAudGhyZXNob2xkLnZhbHVlID0gMC4wIC8vIHRoaXMgaXMgdGhlIHBpdGZhbGwsIGxlYXZlIHNvbWUgaGVhZHJvb21cblx0Y29tcC5rbmVlLnZhbHVlID0gMC4wIC8vIGJydXRlIGZvcmNlXG5cdGNvbXAucmF0aW8udmFsdWUgPSAyMC4wIC8vIG1heCBjb21wcmVzc2lvblxuXHRjb21wLmF0dGFjay52YWx1ZSA9IDAuMDUgLy8gNW1zIGF0dGFja1xuXHRjb21wLnJlbGVhc2UudmFsdWUgPSAwLjA1MCAvLyA1MG1zIHJlbGVhc2VcblxuXHRjb25zdCBmaW5hbEZyZXF1ZW5jeSA9IDAuMDFcblxuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDIwMFxuXHRsZXQgZHVyYXRpb24gPSAwLjE1XG5cdGxldCBpc011dGVkID0gZmFsc2Vcblx0bGV0IG91dHB1dEdhaW5WYWx1ZSA9IDFFLTEwXG5cblx0Lyogcm91dGluZyAqL1xuXHRvc2MuY29ubmVjdChvc2NHYWluKS5jb25uZWN0KGZpbHRlcikuY29ubmVjdChjb21wKS5jb25uZWN0KG91dHB1dClcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TSU5FXG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAwLjgsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGluaXRpYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpbml0aWFsRnJlcXVlbmN5ID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBpbml0aWFsRnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXRHYWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0aWYgKCFpc011dGVkKSB7XG5cdFx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gb3V0cHV0R2FpblZhbHVlXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dEdhaW5WYWx1ZVxuXHRcdH0sXG5cdFx0bXV0ZSgpIHtcblx0XHRcdGlzTXV0ZWQgPSB0cnVlXG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdFx0fSxcblx0XHR1bk11dGUoKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0aXNNdXRlZCA9IGZhbHNlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnXG5pbXBvcnQgeyBGaWx0ZXJUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWx0ZXItdHlwZXMnXG5pbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhdCA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoJ2F1ZGlvQ29udGV4dCcpKSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZ2F0ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgYmFuZHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3QgaGlnaHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblxuXHRjb25zdCByYXRpb3MgPSBbMiwgMywgNC4xNiwgNS40MywgNi43OSwgOC4yMV1cblx0Y29uc3Qgb3NjcyA9IFtdXG5cblx0bGV0IGZ1bmRhbWVudGFsID0gMzVcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXG5cdC8qIHJvdXRpbmcgKi9cblx0YmFuZHBhc3NGaWx0ZXJcblx0XHQuY29ubmVjdChoaWdocGFzc0ZpbHRlcilcblx0XHQuY29ubmVjdChnYXRlKVxuXHRcdC5jb25uZWN0KG91dHB1dClcblxuXHRiYW5kcGFzc0ZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdGJhbmRwYXNzRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDgwMDBcblx0aGlnaHBhc3NGaWx0ZXIudHlwZSA9IEZpbHRlclR5cGVzLkhJR0hfUEFTU1xuXHRoaWdocGFzc0ZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSA5MDAwXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRyYXRpb3MuZm9yRWFjaCgocmF0aW8pID0+IHtcblx0XHRcdFx0Y29uc3Qgb3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0XHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TUVVBUkVcblx0XHRcdFx0Ly8gRnJlcXVlbmN5IGlzIHRoZSBmdW5kYW1lbnRhbCAqIHRoaXMgb3NjaWxsYXRvcidzIHJhdGlvXG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmdW5kYW1lbnRhbCAqIHJhdGlvXG5cdFx0XHRcdG9zYy5jb25uZWN0KGJhbmRwYXNzRmlsdGVyKVxuXHRcdFx0XHRvc2Muc3RhcnQodGltZSlcblx0XHRcdFx0b3Njcy5wdXNoKG9zYylcblx0XHRcdH0pXG5cdFx0XHRnYXRlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0XHRnYXRlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2ZWxvY2l0eSAvIHJhdGlvcy5sZW5ndGgsIHRpbWUgKyAwLjAyKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoKHZlbG9jaXR5IC8gcmF0aW9zLmxlbmd0aCkgKiAwLjMsIHRpbWUgKyAwLjAzKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRnYXRlLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2NzLmZvckVhY2goKCkgPT4ge1xuXHRcdFx0XHRvc2NzLnBvcCgpLnN0b3AodGltZSlcblx0XHRcdH0pXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldEZ1bmRhbWVudGFsVmFsdWUodmFsdWUpIHtcblx0XHRcdGZ1bmRhbWVudGFsID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGdW5kYW1lbnRhbFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZ1bmRhbWVudGFsXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL2hhdC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4uLy4uL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5pbXBvcnQgeyBGaWx0ZXJUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWx0ZXItdHlwZXMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTbmFyZSA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDIgKiBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBub2lzZUJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBub2lzZUJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkgKz0gMSkge1xuXHRcdG9baV0gPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMVxuXHR9XG5cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG5vaXNlRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG5vZGVNaXhlciA9IGNyZWF0ZU5vZGVPdXRwdXRNaXhlcihhdWRpb0NvbnRleHQpXG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0Y29uc3Qgbm9pc2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKClcblxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cdGxldCBmcmVxdWVuY3kgPSA4MFxuXHRsZXQgb3NjTWl4VmFsdWUgPSAwLjJcblx0bGV0IG5vaXNlRmlsdGVyVmFsdWUgPSA0MDAwXG5cblx0Y29uc3QgcmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDFdKVxuXHRjb25zdCBpbWFnaW5hcnkgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCAwLCAwXSlcblx0Y29uc3QgY3VzdG9tV2F2ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUocmVhbCwgaW1hZ2luYXJ5KVxuXG5cdG5vaXNlRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5CQU5EX1BBU1Ncblx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnJlcXVlbmN5XG5cdG9zY0dhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdG5vaXNlR2Fpbi5nYWluLnZhbHVlID0gMUUtMTBcblx0bm9pc2UuYnVmZmVyID0gbm9pc2VCdWZmZXJcblx0bm9pc2UubG9vcCA9IHRydWVcblxuXHRvc2Muc2V0UGVyaW9kaWNXYXZlKGN1c3RvbVdhdmUpXG5cblx0b3NjLmNvbm5lY3Qob3NjR2Fpbilcblx0bm9pc2UuY29ubmVjdChub2lzZUZpbHRlcikuY29ubmVjdChub2lzZUdhaW4pXG5cdG5vZGVNaXhlci5zZXRMZWZ0SW5wdXQob3NjR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSlcblxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRub2lzZS5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXF1ZW5jeSAvIDEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmcmVxdWVuY3kgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0T3NjTWl4VmFsdWUodmFsdWUpIHtcblx0XHRcdG9zY01peFZhbHVlID0gdmFsdWVcblx0XHRcdG5vZGVNaXhlci5zZXRGYWRlVmFsdWUob3NjTWl4VmFsdWUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3NjTWl4VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3NjTWl4VmFsdWVcblx0XHR9LFxuXHRcdHNldE5vaXNlRmlsdGVyVmFsdWUodmFsdWUpIHtcblx0XHRcdG5vaXNlRmlsdGVyVmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXROb2lzZUZpbHRlclZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG5vaXNlRmlsdGVyVmFsdWVcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2NvbW1vbidcbmV4cG9ydCAqIGZyb20gJy4vY29yZSdcbmV4cG9ydCAqIGZyb20gJy4vbWFjcm9zJ1xuZXhwb3J0ICogZnJvbSAnLi9jb25zdGFudHMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2Rpc3BhdGNoZXInXG5leHBvcnQgKiBmcm9tICcuL3JhbmdlJ1xuZXhwb3J0ICogZnJvbSAnLi91dGlscydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW5kZXguanMiLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcydcblxuZXhwb3J0IGNvbnN0IEV2ZW50cyA9IE9iamVjdC5mcmVlemUoe1xuXHRTRVFVRU5DRVJfU1RBUlRcdDogMCxcblx0U0VRVUVOQ0VSX1NUT1BcdDogMSxcblx0U0VRVUVOQ0VSX1RJQ0tcdDogMixcblx0VEVNUE9fQ0hBTkdFXHQ6IDMsXG5cdENIQU5HRTogOTk5LFxufSlcblxuZXhwb3J0IGNvbnN0IERpc3BhdGNoZXIgPSAoKCkgPT4ge1xuXHRjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKVxuXHRyZXR1cm4ge1xuXHRcdGRpc3BhdGNoKHR5cGUsIGRhdGEpIHtcblx0XHRcdHN1YmplY3QubmV4dCh7IHR5cGUsIGRhdGEgfSlcblx0XHR9LFxuXHRcdGFzKHR5cGUpIHtcblx0XHRcdHJldHVybiBzdWJqZWN0XG5cdFx0XHRcdC5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi50eXBlID09PSB0eXBlKVxuXHRcdFx0XHQubWFwKGFjdGlvbiA9PiBhY3Rpb24uZGF0YSlcblx0XHR9LFxuXHR9XG59KSgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIuanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZnJlZXplO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24gKCRmcmVlemUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShpdCkge1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn1cbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogcmFuZ2UgbW9kdWxlIGV4cG9ydHMgdXRpbGl0eSBmdW5jdGlvbiBmb3Igc2NhbGluZy91bnNjYWxpbmcgdmFsdWVzIHRvIHJhbmdlXG4gKiBAbW9kdWxlIHJhbmdlXG4gKi9cblxuaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSYW5nZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1pbiAtIFJhbmdlIG1pbmltdW1cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXggLSBSYW5nZSBtYXhpbXVtXG4gKi9cblxuLyoqXG4gKiBVbm5vcm1hbGl6ZXMgYSBbMC0xXSByYW5nZSB2YWx1ZSBiYWNrIHRvIHRoZSBnaXZlbiByYW5nZVxuICogQHBhcmFtIHttb2R1bGU6cmFuZ2V+UmFuZ2V9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSAtIFVubm9ybWFsaXplZCB2YWx1ZSBpbiByYW5nZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5zY2FsZShyYW5nZSwgdmFsdWUpIHtcblx0aWYgKGlzTmlsKHJhbmdlKSkge1xuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHJldHVybiAoKHJhbmdlLm1heCAtIHJhbmdlLm1pbikgKiB2YWx1ZSkgKyByYW5nZS5taW5cbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHZhbHVlIHRvIGEgWzAsMV0gcmFuZ2UgZ2l2ZW4gaXRzIG9yaWdpbmFsIHJhbmdlLm1pbiBhbmQgcmFuZ2UubWF4XG4gKiBAcGFyYW0ge21vZHVsZTpyYW5nZX5SYW5nZX0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gTm9ybWFsaXplZCB2YWx1ZSBpbiByYW5nZSBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUocmFuZ2UsIHZhbHVlKSB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKHZhbHVlIC0gcmFuZ2UubWluKSAvIChyYW5nZS5tYXggLSByYW5nZS5taW4pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsIi8qKlxuICogc2VxdWVuY2VyIG1vZHVsZSBleHBvcnRzIGEgZmFjdG9yeSBmdW5jdGlvbiBjcmVhdGluZyBhIHNlcXVlbmNlciB0aWVkIHRvIGFuIEF1ZGlvQ29udGV4dFxuICogQG1vZHVsZSBzZXF1ZW5jZXJcbiAqL1xuaW1wb3J0IFdvcmtlclRpbWVyIGZyb20gJ3dvcmtlci10aW1lcidcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uL2NvbW1vbi91dGlscydcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSBhdWRpb0NvbnRleHRcbiAqIEByZXR1cm5zIHtTZXF1ZW5jZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0LyogdGltZSB2YWx1ZXMgKi9cblx0bGV0IHRpY2tzUGVyUXVhcnRlck5vdGUgPSA0XG5cdGxldCBzdGFydFRpbWUgPSAwXG5cdGxldCBuZXh0VGlja1RpbWUgPSAwXG5cdGxldCB0aWNrID0gMFxuXHQvKiBzdGF0ZSBjaGFuZ2UgY2FsbGJhY2tzICovXG5cdGxldCBvblRpY2sgPSAoKSA9PiB7fVxuXHRsZXQgb25TdG9wID0gKCkgPT4ge31cblx0bGV0IG9uU3RhcnQgPSAoKSA9PiB7fVxuXHRsZXQgb25Mb29wID0gKCkgPT4ge31cblx0Lyogc3RhdGUgKi9cblx0bGV0IHN0b3AgPSB0cnVlXG5cdGxldCBsb29wID0gdHJ1ZVxuXHRsZXQgdGVtcG8gPSAxMzBcblx0bGV0IGxlbmd0aCA9IDE2XG5cblx0bGV0IHRpbWVyXG5cblx0LyoqXG5cdCAqIFNjaGVkdWxlIGlzIGNhbGxlZCBldmVyeSB0aW1lIGEgbmV3IHRpY2sgb2NjdXJzXG5cdCAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wIC0gb24gdGljayBjYWxsYmFjayBmdW5jdGlvblxuXHQgKi9cblx0Y29uc3Qgc2NoZWR1bGUgPSAob3ApID0+IHtcblx0XHRjb25zdCBjdXJyZW50VGltZSA9IChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSBzdGFydFRpbWUpXG5cdFx0aWYgKCFzdG9wICYmIGN1cnJlbnRUaW1lID49IG5leHRUaWNrVGltZSkge1xuXHRcdFx0dGljayArPSAxXG5cdFx0XHRuZXh0VGlja1RpbWUgPSBjdXJyZW50VGltZSArICg2MCAvICh0ZW1wbyAqIHRpY2tzUGVyUXVhcnRlck5vdGUpKVxuXHRcdFx0b3AodGljaywgdGVtcG8sIHRpY2tzUGVyUXVhcnRlck5vdGUsIG5leHRUaWNrVGltZSlcblx0XHRcdGlmIChsb29wICYmIHRpY2sgPT09IGxlbmd0aCkge1xuXHRcdFx0XHR0aWNrID0gMFxuXHRcdFx0XHRvbkxvb3AoKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHBsYXkgPSAoKSA9PiB7XG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0fSwgMClcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KClcblx0XHRcdHN0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuXHRcdFx0c3RvcCA9IGZhbHNlXG5cdFx0XHRwbGF5KClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzdG9wKCkge1xuXHRcdFx0V29ya2VyVGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lcilcblx0XHRcdHN0b3AgPSB0cnVlXG5cdFx0XHRuZXh0VGlja1RpbWUgPSAwXG5cdFx0XHR0aWNrID0gMFxuXHRcdFx0b25TdG9wKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRpc1N0YXJ0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gIXN0b3Bcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMb29wTW9kZSgpIHtcblx0XHRcdHJldHVybiBsb29wXG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVuZ3RoKCkge1xuXHRcdFx0cmV0dXJuIGxlbmd0aFxuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdHRpY2tzUGVyUXVhcnRlck5vdGUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uKCkge1xuXHRcdFx0cmV0dXJuIHRpY2tzUGVyUXVhcnRlck5vdGVcblx0XHR9LFxuXHRcdHNldFRlbXBvKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG8oKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdGdldFRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lXG5cdFx0fSxcblx0XHRvblN0YXJ0KG9wKSB7XG5cdFx0XHRvblN0YXJ0ID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblN0b3Aob3ApIHtcblx0XHRcdG9uU3RvcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25UaWNrKG9wKSB7XG5cdFx0XHRvblRpY2sgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uTG9vcChvcCkge1xuXHRcdFx0b25Mb29wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChnbG9iYWwgPT09IGdsb2JhbC53aW5kb3cgJiYgZ2xvYmFsLlVSTCAmJiBnbG9iYWwuQmxvYiAmJiBnbG9iYWwuV29ya2VyKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBUSU1FUl9XT1JLRVJfU09VUkNFID0gW1xuICAgICAgXCJ2YXIgdGltZXJJZHMgPSB7fSwgXyA9IHt9O1wiLFxuICAgICAgXCJfLnNldEludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhckludGVydmFsKHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLnNldFRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhclRpbWVvdXQodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsgX1tlLmRhdGEudHlwZV0oZS5kYXRhKSB9O1wiXG4gICAgXS5qb2luKFwiXCIpO1xuXG4gICAgdmFyIF90aW1lcklkID0gMDtcbiAgICB2YXIgX2NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciBfdGltZXIgPSBuZXcgZ2xvYmFsLldvcmtlcihnbG9iYWwuVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICAgIG5ldyBnbG9iYWwuQmxvYihbIFRJTUVSX1dPUktFUl9TT1VSQ0UgXSwgeyB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiIH0pXG4gICAgKSk7XG5cbiAgICBfdGltZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKF9jYWxsYmFja3NbZS5kYXRhXSkge1xuICAgICAgICBfY2FsbGJhY2tzW2UuZGF0YV0uY2FsbGJhY2suYXBwbHkobnVsbCwgX2NhbGxiYWNrc1tlLmRhdGFdLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRJbnRlcnZhbFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFRpbWVvdXRcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFySW50ZXJ2YWxcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJUaW1lb3V0XCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYubWF0aC5sb2cyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5NYXRoLmxvZzI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCkge1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvZHJ1bXMvYmFzcy1kcnVtJ1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9kcnVtcy9oYXQnXG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL3NuYXJlJ1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL2RlbGF5J1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL2Rpc3RvcnRpb24nXG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvbm9pc2UtY29udm9sdmVyJ1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL2JpdC1jcnVzaGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9ub29wLWluc3RydW1lbnQnXG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2dtLWRydW0tc3ludGgnXG5leHBvcnQgKiBmcm9tICcuL3JvdXRpbmcvZHJ5LXdldC1taXhlcidcbmV4cG9ydCAqIGZyb20gJy4vcm91dGluZy9ub2RlLW91dHB1dC1taXhlcidcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlJ1xuZXhwb3J0ICogZnJvbSAnLi9nZW5lcmF0b3JzL3ZvaWNlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbmRleC5qcyIsImV4cG9ydCBjb25zdCBjcmVhdGVEZWxheSA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0LyogYXVkaW8gbm9kZXMgKi9cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBmaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3QgZGVsYXkgPSBhdWRpb0NvbnRleHQuY3JlYXRlRGVsYXkoNS4wKVxuXHRjb25zdCBmZWVkYmFjayA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Lyogcm91dGluZyAqL1xuXHRkZWxheS5jb25uZWN0KGZlZWRiYWNrKVxuXHRcdFx0LmNvbm5lY3QoZmlsdGVyKVxuXHRcdFx0LmNvbm5lY3QoZGVsYXkpXG5cdFx0XHQuY29ubmVjdChvdXRwdXQpXG5cdC8qIHBhcmFtZXRlcnMgKi9cblx0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcblx0bGV0IHRlbXBvID0gMTIwXG5cdGxldCBkaXZpc2lvbiA9IDNcblx0LyogY29udmVydCBiZWF0IGRpdmlzaW9uIHRvIGRlbGF5IHRpbWUgaW4gc2Vjb25kcyAqL1xuXHRjb25zdCBkaXZpc2lvblRvRGVsYXlUaW1lID0gKF9kaXZpc2lvbiwgX3RlbXBvKSA9PiA2MCAvIChfdGVtcG8gKiBfZGl2aXNpb24pXG5cdGxldCBkZWxheVRpbWVTZWNvbmRzID0gZGl2aXNpb25Ub0RlbGF5VGltZShkaXZpc2lvbiwgdGVtcG8pXG5cblx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5XG5cdFx0fSxcblx0XHRzZXRUZW1wb1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRUZW1wb1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvXG5cdFx0fSxcblx0XHRzZXREaXZpc2lvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkaXZpc2lvbiA9IHZhbHVlXG5cdFx0XHRkZWxheVRpbWVTZWNvbmRzID0gZGl2aXNpb25Ub0RlbGF5VGltZShkaXZpc2lvbiwgdGVtcG8pXG5cdFx0XHRkZWxheS5kaXNjb25uZWN0KGZlZWRiYWNrKVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdFx0ZGVsYXkuY29ubmVjdChmZWVkYmFjaylcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRpdmlzaW9uXG5cdFx0fSxcblx0XHRzZXREZWxheVRpbWVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGVsYXlUaW1lU2Vjb25kcyA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGVsYXlUaW1lVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZpbHRlci5mcmVxdWVuY3kudmFsdWVcblx0XHR9LFxuXHRcdHNldEZlZWRiYWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGZlZWRiYWNrLmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZlZWRiYWNrVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmVlZGJhY2suZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEaXN0b3J0aW9uID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBtYWtlRGlzdG9ydGlvbkN1cnZlID0gKGFtb3VudCkgPT4ge1xuXHRcdGNvbnN0IHsgc2FtcGxlUmF0ZSB9ID0gYXVkaW9Db250ZXh0XG5cdFx0Y29uc3QgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KDQ0MTAwKVxuXHRcdGNvbnN0IGRlZyA9IE1hdGguUEkgLyAxODBcblx0XHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0XHRjb25zdCB4ID0gKGkgKiAyKSAvIChzYW1wbGVSYXRlIC0gMSlcblx0XHRcdGNvbnN0IGEgPSAoMyArIGFtb3VudCkgKiB4ICogMjAgKiBkZWdcblx0XHRcdGNvbnN0IGIgPSBNYXRoLlBJICsgKGFtb3VudCAqIE1hdGguYWJzKHgpKVxuXHRcdFx0Y3VydmVbaV0gPSBhIC8gYlxuXHRcdH0sIHNhbXBsZVJhdGUpXG5cdFx0cmV0dXJuIGN1cnZlXG5cdH1cblxuXHRjb25zdCBwcmVHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBwb3N0R2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZGlzdCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVXYXZlU2hhcGVyKClcblx0cHJlR2Fpbi5jb25uZWN0KGRpc3QpLmNvbm5lY3QocG9zdEdhaW4pXG5cdGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKDQwMClcblx0ZGlzdC5vdmVyc2FtcGxlID0gJzR4J1xuXHRwcmVHYWluLmdhaW4udmFsdWUgPSA1MFxuXHRwb3N0R2Fpbi5nYWluLnZhbHVlID0gMVxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRwb3N0R2Fpbi5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIHByZUdhaW5cblx0XHR9LFxuXHRcdHNldEN1cnZlQW1vdW50KGFtb3VudCkge1xuXHRcdFx0ZGlzdC5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoYW1vdW50KVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldFByZUdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0cHJlR2Fpbi5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRQcmVHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gcHJlR2Fpbi5nYWluLnZhbHVlXG5cdFx0fSxcblx0XHRzZXRQb3N0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRwb3N0R2Fpbi5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRQb3N0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHBvc3RHYWluLmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGlzdG9ydGlvbi5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2lzZUNvbnZvbHZlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgY29udm9sdmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpXG5cdGNvbnN0IGJ1ZmZlclNpemUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBidWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDIsIGJ1ZmZlclNpemUgLyAyLCBidWZmZXJTaXplKVxuXHRjb25zdCBsZWZ0ID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG5cdGNvbnN0IHJpZ2h0ID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDEpXG5cdFIudGltZXMoKGkpID0+IHtcblx0XHRsZWZ0W2ldID0gTWF0aC5yYW5kb20oKVxuXHRcdHJpZ2h0W2ldID0gTWF0aC5yYW5kb20oKVxuXHR9LCBidWZmZXIubGVuZ3RoKVxuXHRjb252b2x2ZXIuYnVmZmVyID0gYnVmZmVyXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0Y29udm9sdmVyLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gY29udm9sdmVyXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL25vaXNlLWNvbnZvbHZlci5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVCaXRDcnVzaGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBidWZmZXJTaXplID0gNTEyXG5cdGNvbnN0IHNjcmlwdFByb2Nlc3NvciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoYnVmZmVyU2l6ZSwgMSwgMSlcblx0bGV0IGJpdHMgPSAxNlxuXHRsZXQgbm9ybUZyZXEgPSAwLjA1XG5cdGNvbnN0IHN0ZXAgPSAwLjUgKiogYml0c1xuXHRsZXQgcGhhc2VyID0gMFxuXHRsZXQgbGFzdCA9IDBcblx0c2NyaXB0UHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gKGV2ZW50KSA9PiB7XG5cdFx0Y29uc3QgaW5wdXQgPSBldmVudC5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRcdGNvbnN0IG91dHB1dCA9IGV2ZW50Lm91dHB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRcdFIudGltZXMoKGkpID0+IHtcblx0XHRcdHBoYXNlciArPSBub3JtRnJlcVxuXHRcdFx0aWYgKHBoYXNlciA+PSAxKSB7XG5cdFx0XHRcdHBoYXNlciAtPSAxXG5cdFx0XHRcdGxhc3QgPSBzdGVwICogTWF0aC5mbG9vcigoaW5wdXRbaV0gLyBzdGVwKSArIDAuNSlcblx0XHRcdH1cblx0XHRcdG91dHB1dFtpXSA9IGxhc3Rcblx0XHR9LCBidWZmZXJTaXplKVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0c2NyaXB0UHJvY2Vzc29yLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gc2NyaXB0UHJvY2Vzc29yXG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9ybUZyZXEgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldEJpdHNWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0Yml0cyA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9iaXQtY3J1c2hlci5qcyIsImV4cG9ydCBjb25zdCBOb29wSW5zdHJ1bWVudCA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKCkge1xuXG5cdFx0fSxcblx0XHRub3RlT2ZmKCkge1xuXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IGNyZWF0ZUJhc3NEcnVtIH0gZnJvbSAnLi9kcnVtcy9iYXNzLWRydW0nXG5pbXBvcnQgeyBjcmVhdGVTbmFyZSB9IGZyb20gJy4uLy4uL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZSdcbmltcG9ydCB7IGNyZWF0ZUhhdCB9IGZyb20gJy4uLy4uL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQnXG5pbXBvcnQgeyBtYW5kYXRvcnksIHdyYXBOb2RlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgR01EcnVtU3ludGggPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBiZCA9IGNyZWF0ZUJhc3NEcnVtKGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpXG5cdGNvbnN0IHNuID0gY3JlYXRlU25hcmUoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuNSlcblx0Y29uc3QgaGkgPSBjcmVhdGVIYXQoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuMSlcblx0Y29uc3QgaGF0ID0gY3JlYXRlSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjUpXG5cblx0Y29uc3Qgb3V0cHV0ID0gd3JhcE5vZGUoYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSlcblxuXHRiZC5jb25uZWN0KG91dHB1dClcblx0c24uY29ubmVjdChvdXRwdXQpXG5cdGhpLmNvbm5lY3Qob3V0cHV0KVxuXHRoYXQuY29ubmVjdChvdXRwdXQpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24obWlkaVZhbHVlLCB2ZWxvY2l0eSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0Ui5jb25kKFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM1KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNiksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzgpLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQwKSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0MiksXG5cdFx0XHRcdFx0KCkgPT4gaGkubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDYpLFxuXHRcdFx0XHRcdCgpID0+IGhhdC5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLlQsXG5cdFx0XHRcdFx0KCkgPT4ge30sXG5cdFx0XHRcdF0sXG5cdFx0XHRdKShtaWRpVmFsdWUpXG5cdFx0fSxcblx0XHRub3RlT2ZmKG1pZGlWYWx1ZSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0Ui5jb25kKFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM2KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzgpLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPZmYodGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLlQsXG5cdFx0XHRcdFx0KCkgPT4ge30sXG5cdFx0XHRcdF0sXG5cdFx0XHRdKShtaWRpVmFsdWUpXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoeyBnZXRJbnB1dCB9KVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9nbS1kcnVtLXN5bnRoLmpzIiwiaW1wb3J0IHsgY3JlYXRlTm9kZU91dHB1dE1peGVyIH0gZnJvbSAnLi9ub2RlLW91dHB1dC1taXhlcidcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURyeVdldE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBub2RlT3V0cHV0TWl4ZXIgPSBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBkcnlHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRsZXQgd2V0Tm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRMZWZ0SW5wdXQoZHJ5R2Fpbk5vZGUpXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRSaWdodElucHV0KHdldE5vZGUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24obm9kZU91dHB1dE1peGVyLCB7XG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRHYWluTm9kZVxuXHRcdH0sXG5cdFx0c2V0V2V0Tm9kZShzZnhOb2RlT3JNYWNybykge1xuXHRcdFx0d2V0Tm9kZSA9IHNmeE5vZGVPck1hY3JvLmdldElucHV0ID8gc2Z4Tm9kZU9yTWFjcm8uZ2V0SW5wdXQoKSA6IHNmeE5vZGVPck1hY3JvXG5cdFx0XHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXHRcdFx0aW5wdXRHYWluTm9kZS5kaXNjb25uZWN0KClcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdChkcnlHYWluTm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL2RyeS13ZXQtbWl4ZXIuanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUFjY2VudEVudmVsb3BlID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdGxldCBhdHRhY2tUaW1lID0gMFxuXHRsZXQgZGVjYXlUaW1lID0gMFxuXHRsZXQgYWNjZW50VmFsdWUgPSAwXG5cdGxldCBwZWFrVmFsdWUgPSAwXG5cdGxldCBzdXN0YWluVmFsdWUgPSBwZWFrVmFsdWVcblx0bGV0IGlzQWN0aXZlID0gdHJ1ZVxuXG5cdGxldCBwYXJhbWV0ZXJcblxuXHRjb25zdCBhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIgPSAoKSA9PiB7XG5cdFx0aWYgKGlzTmlsKHBhcmFtZXRlcikpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyBlbnZlbG9wZSBwYXJhbWV0ZXIsIHVzZSBjb25uZWN0KGF1ZGlvUGFyYW0pIGJlZm9yZSBjYWxsaW5nIG1ldGhvZCcpXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KGF1ZGlvUGFyYW0gPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0cGFyYW1ldGVyID0gYXVkaW9QYXJhbVxuXHRcdFx0c3VzdGFpblZhbHVlID0gcGFyYW1ldGVyLnZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0YXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyKClcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwZWFrVmFsdWUgPSBzdXN0YWluVmFsdWUgKyBhY2NlbnRWYWx1ZVxuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKVxuXHRcdFx0XHRwYXJhbWV0ZXIubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUocGVha1ZhbHVlLCB0aW1lICsgYXR0YWNrVGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lICsgYXR0YWNrVGltZSArIGRlY2F5VGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIoKVxuXHRcdFx0aWYgKGlzQWN0aXZlKSB7XG5cdFx0XHRcdHBhcmFtZXRlci5zZXRWYWx1ZUF0VGltZShzdXN0YWluVmFsdWUsIHRpbWUpXG5cdFx0XHRcdHBhcmFtZXRlci5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGlzQWN0aXZlKCkge1xuXHRcdFx0cmV0dXJuIGlzQWN0aXZlXG5cdFx0fSxcblx0XHRzZXRBY3RpdmUodmFsdWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0aXNBY3RpdmUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldEFjY2VudFZhbHVlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGFjY2VudFZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRBY2NlbnRWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBhY2NlbnRWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0QXR0YWNrVGltZSh0aW1lID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGF0dGFja1RpbWUgPSB0aW1lXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0QXR0YWNrVGltZSgpIHtcblx0XHRcdHJldHVybiBhdHRhY2tUaW1lXG5cdFx0fSxcblx0XHRzZXREZWNheVRpbWUodGltZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRkZWNheVRpbWUgPSB0aW1lXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGVjYXlUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGRlY2F5VGltZVxuXHRcdH0sXG5cdFx0c2V0U3VzdGFpblZhbHVlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHN1c3RhaW5WYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0U3VzdGFpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHN1c3RhaW5WYWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlLmpzIiwiaW1wb3J0IHsgV2F2ZUZvcm1zIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3dhdmUtZm9ybXMnXG5pbXBvcnQgeyBmcmVxdWVuY3lUb01pZGkgfSBmcm9tICcuLi8uLi9jb3JlL25vdGUnXG5pbXBvcnQgeyBjcmVhdGVSYW5kb21XYXZlRm9ybSwgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVm9pY2UgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdBdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBzZXRXYXZlRm9ybSA9ICh3YXZlRm9ybSwgb3NjKSA9PiB7XG5cdFx0aWYgKHdhdmVGb3JtID09PSBXYXZlRm9ybXMuUkFORE9NKSB7XG5cdFx0XHRvc2Muc2V0UGVyaW9kaWNXYXZlKGNyZWF0ZVJhbmRvbVdhdmVGb3JtKGF1ZGlvQ29udGV4dCkpXG5cdFx0fSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRvc2MudHlwZSA9IHdhdmVGb3JtXG5cdFx0fVxuXHR9XG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0bGV0IHdhdmVGb3JtID0gV2F2ZUZvcm1zLlRSSUFOR0xFXG5cblx0c2V0V2F2ZUZvcm0od2F2ZUZvcm0sIG9zYylcblxuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdG9zYy5jb25uZWN0KG91dHB1dClcblx0b3NjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSlcblxuXHRyZXR1cm4gT2JqZWN0LmFzc2lnbihvc2MsIHtcblx0XHRwaXRjaChtdWx0aXBsaWVyID0gbWFuZGF0b3J5KCdtdWx0aXBsaWVyJykpIHtcblx0XHRcdC8qIHJldHJpZXZlIG1pZGkgbm90ZSB2YWx1ZSBmcm9tIGFjdHVhbCBmcmVxdWVuY3kgKi9cblx0XHRcdGNvbnN0IGxhc3RNaWRpVmFsdWUgPSBNYXRoLnJvdW5kKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIG9zYy5mcmVxdWVuY3kudmFsdWUpKVxuXHRcdFx0LyogcGl0Y2ggYWN0dWFsIGZyZXF1ZW5jeSAqL1xuXHRcdFx0Y29uc3QgbmV3RnJlcXVlbmN5VmFsdWUgPSBvc2MuZnJlcXVlbmN5LnZhbHVlICogbXVsdGlwbGllclxuXHRcdFx0LyogZ2V0IG1pZGkgbm90ZSB2YWx1ZSBiYWNrIGZyb20gcGl0Y2hlZCBmcmVxdWVuY3kgKi9cblx0XHRcdGNvbnN0IG5ld01pZGlWYWx1ZSA9IE1hdGgucm91bmQoZnJlcXVlbmN5VG9NaWRpKDQ0MCwgbmV3RnJlcXVlbmN5VmFsdWUpKVxuXHRcdFx0LyogYXBwbHkgbmV3IGZyZXF1ZW5jeSAqL1xuXHRcdFx0b3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShuZXdGcmVxdWVuY3lWYWx1ZSwgYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRcdFx0cmV0dXJuIHsgbGFzdE1pZGlWYWx1ZSwgbmV3TWlkaVZhbHVlIH1cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBnZXRJbnB1dCA9IG1hbmRhdG9yeSgnaW5wdXQnKSwgY29ubmVjdCB9KSB7XG5cdFx0XHRjb25zb2xlLmxvZygnY29ubmVjdCcpXG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRXYXZlRm9ybSgpIHtcblx0XHRcdHJldHVybiBvc2MudHlwZVxuXHRcdH0sXG5cdFx0c2V0V2F2ZUZvcm0odmFsdWUgPSBtYW5kYXRvcnkoJ3dhdmVGb3JtJykpIHtcblx0XHRcdHdhdmVGb3JtID0gdmFsdWVcblx0XHRcdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0V2F2ZUZvcm1zKCkge1xuXHRcdFx0cmV0dXJuIE9iamVjdC52YWx1ZXMoV2F2ZUZvcm1zKVxuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0KCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dFxuXHRcdH0sXG5cdH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2dlbmVyYXRvcnMvdm9pY2UuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QudmFsdWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpIHtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgaXNFbnVtID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpc0VudHJpZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IGdldEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL3dhdmUtZm9ybXMnXG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci10eXBlcydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9