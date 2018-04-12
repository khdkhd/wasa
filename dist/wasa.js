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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.wrapNode = exports.createNoiseBuffer = exports.createRandomWaveForm = exports.mandatory = undefined;

var _ramda = __webpack_require__(2);

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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("ramda");

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

var _utils = __webpack_require__(1);

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

var _ramda = __webpack_require__(2);

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

var _utils = __webpack_require__(1);

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

var _utils = __webpack_require__(1);

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
	bandpassFilter.frequency.value = 10000;
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

var _constants = __webpack_require__(84);

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

var _ramda = __webpack_require__(2);

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

var _utils = __webpack_require__(1);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NoiseConvolver = undefined;

var _ramda = __webpack_require__(2);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var NoiseConvolver = exports.NoiseConvolver = audioContext => {
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
exports.BitCrusher = undefined;

var _ramda = __webpack_require__(2);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var BitCrusher = exports.BitCrusher = audioContext => {
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

var _ramda = __webpack_require__(2);

var R = _interopRequireWildcard(_ramda);

var _bassDrum = __webpack_require__(25);

var _snare = __webpack_require__(27);

var _hat = __webpack_require__(26);

var _utils = __webpack_require__(1);

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

var _ramda = __webpack_require__(2);

var _utils = __webpack_require__(1);

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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createVoice = undefined;

var _values = __webpack_require__(79);

var _values2 = _interopRequireDefault(_values);

var _extends2 = __webpack_require__(83);

var _extends3 = _interopRequireDefault(_extends2);

var _waveForms = __webpack_require__(8);

var _note = __webpack_require__(24);

var _utils = __webpack_require__(1);

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
	var getFrequency = (0, _note.midiToFrequency)(440);
	var osc = audioContext.createOscillator();
	var waveForm = _waveForms.WaveForms.TRIANGLE;

	setWaveForm(waveForm, osc);

	var output = audioContext.createGain();

	return (0, _extends3.default)({}, osc, {
		noteOn(value, time = audioContext.currentTime) {
			var frequency = getFrequency(value);
			osc.frequency.value = frequency;
			osc.connect(output);
			osc.start(time);
		},
		noteOff(time = audioContext.currentTime) {
			osc.stop(time);
		},
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
		},
		getWaveForms() {
			return (0, _values2.default)(_waveForms.WaveForms);
		},
		get output() {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(28);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 84 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2EwNWRhOGU2MGFmZDcxODJlZDkiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzL2ZpbHRlci10eXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2JpdC1jcnVzaGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZ2VuZXJhdG9ycy92b2ljZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC92YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC10by1hcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYW5kYXRvcnkiLCJwYXJhbWV0ZXJOYW1lIiwiRXJyb3IiLCJjcmVhdGVSYW5kb21XYXZlRm9ybSIsImF1ZGlvQ29udGV4dCIsImNvbXBsZXhpdHkiLCJpIiwiRmxvYXQzMkFycmF5IiwiZnJvbSIsIk1hdGgiLCJyYW5kb20iLCJyIiwiY3JlYXRlUGVyaW9kaWNXYXZlIiwiY3JlYXRlTm9pc2VCdWZmZXIiLCJidWZmZXJTaXplIiwic2FtcGxlUmF0ZSIsIm51bUNoYW5uZWxzIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwibyIsImdldENoYW5uZWxEYXRhIiwid3JhcE5vZGUiLCJhdWRpb05vZGUiLCJnZXROb2RlIiwiZ2V0SW5wdXQiLCJjb25uZWN0IiwiV2F2ZUZvcm1zIiwiU1FVQVJFIiwiU0FXVE9PVEgiLCJUUklBTkdMRSIsIlNJTkUiLCJSQU5ET00iLCJGaWx0ZXJUeXBlcyIsIkxPV19QQVNTIiwiQkFORF9QQVNTIiwiSElHSF9QQVNTIiwiTE9XX1NIRUxGIiwiSElHSF9TSEVMRiIsIkFMTF9QQVNTIiwiY3JlYXRlTm9kZU91dHB1dE1peGVyIiwib3V0cHV0R2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwibGVmdEdhaW5Ob2RlIiwicmlnaHRHYWluTm9kZSIsIk1JRERMRV9HQUlOX1ZBTFVFIiwiZmFkZVZhbHVlIiwiZ2FpbiIsInZhbHVlIiwic2V0RmFkZVZhbHVlIiwiZ2V0RmFkZVZhbHVlIiwic2V0TGVmdElucHV0Iiwic2V0UmlnaHRJbnB1dCIsImdldExlZnRHYWluTm9kZSIsImdldFJpZ2h0R2Fpbk5vZGUiLCJtaWRpVG9GcmVxdWVuY3kiLCJzeW1ib2xUb01pZGkiLCJtaWRpVG9TeW1ib2wiLCJmcmVxdWVuY3lUb01pZGkiLCJzeW1ib2xUb0ZyZXF1ZW5jeSIsImZyZXF1ZW5jeVRvU3ltYm9sIiwicGl0Y2hDbGFzc2VzIiwidHVuaW5nIiwibWlkaVZhbHVlIiwiXyIsInBpdGNoQ2xhc3MiLCJvY3RhdmUiLCJpbmRleE9mIiwicGl0Y2hDbGFzc0luZGV4IiwiZnJlcXVlbmN5IiwiY3JlYXRlQmFzc0RydW0iLCJvdXRwdXQiLCJvc2NHYWluIiwiY29tcCIsImNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciIsImZpbHRlciIsImNyZWF0ZUJpcXVhZEZpbHRlciIsIm9zYyIsImNyZWF0ZU9zY2lsbGF0b3IiLCJ0aHJlc2hvbGQiLCJrbmVlIiwicmF0aW8iLCJhdHRhY2siLCJyZWxlYXNlIiwiZmluYWxGcmVxdWVuY3kiLCJpbml0aWFsRnJlcXVlbmN5IiwiZHVyYXRpb24iLCJpc011dGVkIiwib3V0cHV0R2FpblZhbHVlIiwidHlwZSIsInN0YXJ0IiwiY3VycmVudFRpbWUiLCJub3RlT24iLCJ2ZWxvY2l0eSIsInRpbWUiLCJleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lIiwibm90ZU9mZiIsImNhbmNlbFNjaGVkdWxlZFZhbHVlcyIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXREdXJhdGlvblZhbHVlIiwiZ2V0RHVyYXRpb25WYWx1ZSIsInNldE91dHB1dEdhaW5WYWx1ZSIsImdldE91dHB1dEdhaW5WYWx1ZSIsIm11dGUiLCJ1bk11dGUiLCJjcmVhdGVIYXQiLCJnYXRlIiwiYmFuZHBhc3NGaWx0ZXIiLCJoaWdocGFzc0ZpbHRlciIsInJhdGlvcyIsIm9zY3MiLCJmdW5kYW1lbnRhbCIsImZvckVhY2giLCJwdXNoIiwic2V0VmFsdWVBdFRpbWUiLCJsZW5ndGgiLCJwb3AiLCJzdG9wIiwic2V0RnVuZGFtZW50YWxWYWx1ZSIsImdldEZ1bmRhbWVudGFsVmFsdWUiLCJjcmVhdGVTbmFyZSIsIm5vaXNlQnVmZmVyIiwibm9pc2VHYWluIiwibm9pc2VGaWx0ZXIiLCJub2RlTWl4ZXIiLCJub2lzZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsIm9zY01peFZhbHVlIiwibm9pc2VGaWx0ZXJWYWx1ZSIsInJlYWwiLCJpbWFnaW5hcnkiLCJjdXN0b21XYXZlIiwibG9vcCIsInNldFBlcmlvZGljV2F2ZSIsInNldE9zY01peFZhbHVlIiwiZ2V0T3NjTWl4VmFsdWUiLCJzZXROb2lzZUZpbHRlclZhbHVlIiwiZ2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwiZGF0YSIsIm5leHQiLCJhcyIsImFjdGlvbiIsIm1hcCIsInVuc2NhbGUiLCJzY2FsZSIsInJhbmdlIiwibWF4IiwibWluIiwiY3JlYXRlU2VxdWVuY2VyIiwidGlja3NQZXJRdWFydGVyTm90ZSIsInN0YXJ0VGltZSIsIm5leHRUaWNrVGltZSIsInRpY2siLCJvblRpY2siLCJvblN0b3AiLCJvblN0YXJ0Iiwib25Mb29wIiwidGVtcG8iLCJ0aW1lciIsInNjaGVkdWxlIiwib3AiLCJwbGF5Iiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwiaXNTdGFydGVkIiwic2V0TG9vcE1vZGUiLCJnZXRMb29wTW9kZSIsInNldExlbmd0aCIsImdldExlbmd0aCIsInNldERpdmlzaW9uIiwiZ2V0RGl2aXNpb24iLCJzZXRUZW1wbyIsImdldFRlbXBvIiwiZ2V0VGltZSIsImNyZWF0ZURlbGF5IiwiZGVsYXkiLCJmZWVkYmFjayIsImRpdmlzaW9uIiwiZGl2aXNpb25Ub0RlbGF5VGltZSIsIl9kaXZpc2lvbiIsIl90ZW1wbyIsImRlbGF5VGltZVNlY29uZHMiLCJkZWxheVRpbWUiLCJzZXRUZW1wb1ZhbHVlIiwiZ2V0VGVtcG9WYWx1ZSIsInNldERpdmlzaW9uVmFsdWUiLCJkaXNjb25uZWN0IiwiZ2V0RGl2aXNpb25WYWx1ZSIsInNldERlbGF5VGltZVZhbHVlIiwiZ2V0RGVsYXlUaW1lVmFsdWUiLCJzZXRGZWVkYmFja1ZhbHVlIiwiZ2V0RmVlZGJhY2tWYWx1ZSIsIkRpc3RvcnRpb24iLCJtYWtlRGlzdG9ydGlvbkN1cnZlIiwiYW1vdW50IiwiayIsIm5TYW1wbGVzIiwiY3VydmUiLCJkZWciLCJQSSIsIngiLCJhYnMiLCJkaXN0IiwiY3JlYXRlV2F2ZVNoYXBlciIsInNldEN1cnZlIiwiUiIsIk5vaXNlQ29udm9sdmVyIiwiY29udm9sdmVyIiwiY3JlYXRlQ29udm9sdmVyIiwibGVmdCIsInJpZ2h0IiwidGltZXMiLCJCaXRDcnVzaGVyIiwic2NyaXB0UHJvY2Vzc29yIiwiY3JlYXRlU2NyaXB0UHJvY2Vzc29yIiwiYml0cyIsIm5vcm1GcmVxIiwic3RlcCIsInBoYXNlciIsImxhc3QiLCJvbmF1ZGlvcHJvY2VzcyIsImV2ZW50IiwiaW5wdXQiLCJpbnB1dEJ1ZmZlciIsIm91dHB1dEJ1ZmZlciIsImZsb29yIiwic2V0Qml0c1ZhbHVlIiwiTm9vcEluc3RydW1lbnQiLCJHTURydW1TeW50aCIsImJkIiwic24iLCJoaSIsImhhdCIsImNvbmQiLCJlcXVhbHMiLCJUIiwiY3JlYXRlRHJ5V2V0TWl4ZXIiLCJub2RlT3V0cHV0TWl4ZXIiLCJpbnB1dEdhaW5Ob2RlIiwiZHJ5R2Fpbk5vZGUiLCJ3ZXROb2RlIiwic2V0V2V0Tm9kZSIsInNmeE5vZGVPck1hY3JvIiwiY3JlYXRlQWNjZW50RW52ZWxvcGUiLCJhdHRhY2tUaW1lIiwiZGVjYXlUaW1lIiwiYWNjZW50VmFsdWUiLCJwZWFrVmFsdWUiLCJzdXN0YWluVmFsdWUiLCJpc0FjdGl2ZSIsInBhcmFtZXRlciIsImFzc2VydE1hbmRhdG9yeVBhcmFtZXRlciIsImF1ZGlvUGFyYW0iLCJ0cmlnZ2VyIiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiLCJzZXRBY3RpdmUiLCJzZXRBY2NlbnRWYWx1ZSIsImdldEFjY2VudFZhbHVlIiwic2V0QXR0YWNrVGltZSIsImdldEF0dGFja1RpbWUiLCJzZXREZWNheVRpbWUiLCJnZXREZWNheVRpbWUiLCJzZXRTdXN0YWluVmFsdWUiLCJnZXRTdXN0YWluVmFsdWUiLCJjcmVhdGVWb2ljZSIsInNldFdhdmVGb3JtIiwid2F2ZUZvcm0iLCJnZXRGcmVxdWVuY3kiLCJwaXRjaCIsIm11bHRpcGxpZXIiLCJsYXN0TWlkaVZhbHVlIiwicm91bmQiLCJuZXdGcmVxdWVuY3lWYWx1ZSIsIm5ld01pZGlWYWx1ZSIsImdldFdhdmVGb3JtIiwiZ2V0V2F2ZUZvcm1zIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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QUFDQTs7Ozs7Ozs7QUNsRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkEsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTs7Ozs7OztBQ0RBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7O0FBQ0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRzs7Ozs7Ozs7Ozs7O0FDWk8sSUFBTWMsb0NBQWVuTCxZQUFELElB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RixFQUFQO0FBQ0EsR0F4QkM7QUF5QkZrUSxnQkFBYztBQUNiLFVBQU8vTSxJQUFJWSxJQUFYO0FBQ0EsR0EzQkM7QUE0QkYwTCxjQUFZbk8sUUFBUSxzQkFBVSxVQUFWLENBQXBCLEVBQTJDO0FBQzFDb08sY0FBV3BPLEtBQVg7QUFDQW1PLGVBQVlDLFFBQVosRUFBc0J2TSxHQUF0QjtBQUNBLEdBL0JDO0FBZ0NGZ04saUJBQWU7QUFDZCxVQUFPLDJDQUFQO0FBQ0EsR0FsQ0M7QUFtQ0YsTUFBSXROLE1BQUosR0FBYTtBQUNaLFVBQU9BLE1BQVA7QUFDQTtBQXJDQyxFQUZKO0FBMENBLENBM0RNLEM7Ozs7OztBQ0pQLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDUkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7QUNmQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQ0FBc0MsdUNBQXVDLGdCQUFnQjs7QUFFN0Y7QUFDQSxpQkFBaUIsc0JBQXNCO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7OztBQUNBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsImZpbGUiOiJ3YXNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMzApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDNhMDVkYThlNjBhZmQ3MTgyZWQ5IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuaW1wb3J0IHsgdGltZXMgfSBmcm9tICdyYW1kYSdcbmltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuXG5leHBvcnQgY29uc3QgbWFuZGF0b3J5ID0gKHBhcmFtZXRlck5hbWUgPSAnJykgPT4ge1xuXHR0aHJvdyBuZXcgRXJyb3IoYE1pc3NpbmcgbWFuZGF0b3J5IHBhcmFtZXRlciAke3BhcmFtZXRlck5hbWV9YClcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJhbmRvbVdhdmVGb3JtID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpLCBjb21wbGV4aXR5ID0gOCkgPT4ge1xuXHRjb25zdCBpID0gRmxvYXQzMkFycmF5LmZyb20odGltZXMoTWF0aC5yYW5kb20sIGNvbXBsZXhpdHkpKVxuXHRjb25zdCByID0gRmxvYXQzMkFycmF5LmZyb20odGltZXMoTWF0aC5yYW5kb20sIGNvbXBsZXhpdHkpKVxuXHRyZXR1cm4gYXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZShyLCBpKVxufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9pc2VCdWZmZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IG51bUNoYW5uZWxzID0gMVxuXHRjb25zdCBidWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKG51bUNoYW5uZWxzLCBidWZmZXJTaXplLCBidWZmZXJTaXplKVxuXHRjb25zdCBvID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSArPSAxKSB7XG5cdFx0b1tpXSA9IE1hdGgucmFuZG9tKClcblx0fVxuXHRyZXR1cm4gYnVmZmVyXG59XG5cbmV4cG9ydCBjb25zdCB3cmFwTm9kZSA9IChhdWRpb05vZGUgPSBtYW5kYXRvcnkoKSkgPT4gKHtcblx0Z2V0Tm9kZSgpIHtcblx0XHRyZXR1cm4gYXVkaW9Ob2RlXG5cdH0sXG5cdGdldElucHV0KCkge1xuXHRcdHJldHVybiBhdWRpb05vZGVcblx0fSxcblx0Y29ubmVjdCh7IGdldElucHV0LCBjb25uZWN0IH0pIHtcblx0XHRhdWRpb05vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHR9LFxufSlcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi91dGlscy5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIFdhdmVGb3JtcyBwcm92aWRlcyBhIGhhc2ggb2YgY29uc3RhbnRzIGZvciBvc2NpbGxhdG9yIHR5cGUgYXNzaWduYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBXYXZlRm9ybXMgPSBPYmplY3QuZnJlZXplKHtcblx0U1FVQVJFOiAnc3F1YXJlJyxcblx0U0FXVE9PVEg6ICdzYXd0b290aCcsXG5cdFRSSUFOR0xFOiAndHJpYW5nbGUnLFxuXHRTSU5FOiAnc2luZScsXG5cdFJBTkRPTTogJ3JhbmRvbScsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy93YXZlLWZvcm1zLmpzIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaWx0ZXJUeXBlcyBwcm92aWRlcyBjb25zdGFudHMgZm9yIGZpbHRlciB0eXBlIGFzc2lnbmF0aW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgRmlsdGVyVHlwZXMgPSBPYmplY3QuZnJlZXplKHtcblx0TE9XX1BBU1M6ICdsb3dwYXNzJyxcblx0QkFORF9QQVNTOiAnYmFuZHBhc3MnLFxuXHRISUdIX1BBU1M6ICdoaWdocGFzcycsXG5cdExPV19TSEVMRjogJ2xvd3NoZWxmJyxcblx0SElHSF9TSEVMRjogJ2hpZ2hzaGVsZicsXG5cdEFMTF9QQVNTOiAnYWxscGFzcycsXG59KVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy9maWx0ZXItdHlwZXMuanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpID0+IHtcblx0Lyogd2ViIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBsZWZ0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IHJpZ2h0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0LyogY29uc3RhbnQgdmFsdWVzICovXG5cdGNvbnN0IE1JRERMRV9HQUlOX1ZBTFVFID0gMC41XG5cblx0LyogcGFyYW1ldGVyIHZhbHVlcyAqL1xuXHRsZXQgZmFkZVZhbHVlID0gMFxuXG5cdC8qIHJvdXRpbmcgKi9cblx0bGVmdEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdHJpZ2h0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRVxuXG5cdHJldHVybiB7XG5cdFx0c2V0RmFkZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFIC0gKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpXG5cdFx0XHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSArICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0ZmFkZVZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGYWRlVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmFkZVZhbHVlXG5cdFx0fSxcblx0XHRzZXRMZWZ0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0UmlnaHRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KHJpZ2h0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dEdhaW5Ob2RlLmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0TGVmdEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIGxlZnRHYWluTm9kZVxuXHRcdH0sXG5cdFx0Z2V0UmlnaHRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiByaWdodEdhaW5Ob2RlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyLmpzIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm90ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBUaGUgcGl0Y2ggaW4gY2hyb21hdGljIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG9jdGF2ZSAtIFRoZSBvY3RhdmUgdmFsdWUgYXNzb2NpYXRlZCB0byBwaXRjaCBjbGFzc1xuICovXG5cbi8qKlxuICogcGl0Y2hDbGFzc2VzIHByb3ZpZGVzIHRoZSBjaHJvbWF0aWMgc2NhbGUgc3ltYm9scyBleHBvcnRlZCBhcyBhIGxpc3Q6XG4gKiAnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQidcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkaVRvRnJlcXVlbmN5KHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gKChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHBpdGNoIGNsYXNzIGFuZCBvY3RhdmUgZm9yIHRoZSBnaXZlbiBtaWRpIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWlkaVZhbHVlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKiBAcmV0dXJucyB7Tm90ZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pZGlUb1N5bWJvbChtaWRpVmFsdWUpIHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZnJlcXVlbmN5VG9NaWRpKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvRnJlcXVlbmN5KHBpdGNoQ2xhc3MsIG9jdGF2ZSkge1xuXHRyZXR1cm4gXHRtaWRpVG9GcmVxdWVuY3koNDQwLCBzeW1ib2xUb01pZGkocGl0Y2hDbGFzcywgb2N0YXZlKSlcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbm90ZSBhbmQgb2N0YXZlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gZnJlcXVlbmN5XG4gKiBAcGFyYW0ge251bWJlcn0gZnJlcXVlbmN5IC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVxdWVuY3lUb1N5bWJvbChmcmVxdWVuY3kpIHtcblx0cmV0dXJuIG1pZGlUb1N5bWJvbChmcmVxdWVuY3lUb01pZGkoNDQwLCBmcmVxdWVuY3kpKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbm90ZS5qcyIsImltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJ1xuaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQmFzc0RydW0gPSAoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGNvbXAgPSBhdWRpb0NvbnRleHQuY3JlYXRlRHluYW1pY3NDb21wcmVzc29yKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gMjUwMFxuXG5cdGNvbXAudGhyZXNob2xkLnZhbHVlID0gMC4wIC8vIHRoaXMgaXMgdGhlIHBpdGZhbGwsIGxlYXZlIHNvbWUgaGVhZHJvb21cblx0Y29tcC5rbmVlLnZhbHVlID0gMC4wIC8vIGJydXRlIGZvcmNlXG5cdGNvbXAucmF0aW8udmFsdWUgPSAyMC4wIC8vIG1heCBjb21wcmVzc2lvblxuXHRjb21wLmF0dGFjay52YWx1ZSA9IDAuMDUgLy8gNW1zIGF0dGFja1xuXHRjb21wLnJlbGVhc2UudmFsdWUgPSAwLjA1MCAvLyA1MG1zIHJlbGVhc2VcblxuXHRjb25zdCBmaW5hbEZyZXF1ZW5jeSA9IDAuMDFcblxuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDIwMFxuXHRsZXQgZHVyYXRpb24gPSAwLjE1XG5cdGxldCBpc011dGVkID0gZmFsc2Vcblx0bGV0IG91dHB1dEdhaW5WYWx1ZSA9IDFFLTEwXG5cblx0Lyogcm91dGluZyAqL1xuXHRvc2MuY29ubmVjdChvc2NHYWluKS5jb25uZWN0KGZpbHRlcikuY29ubmVjdChjb21wKS5jb25uZWN0KG91dHB1dClcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TSU5FXG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAwLjgsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGluaXRpYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpbml0aWFsRnJlcXVlbmN5ID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBpbml0aWFsRnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXRHYWluVmFsdWUgPSB2YWx1ZVxuXHRcdFx0aWYgKCFpc011dGVkKSB7XG5cdFx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gb3V0cHV0R2FpblZhbHVlXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dEdhaW5WYWx1ZVxuXHRcdH0sXG5cdFx0bXV0ZSgpIHtcblx0XHRcdGlzTXV0ZWQgPSB0cnVlXG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdFx0fSxcblx0XHR1bk11dGUoKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0aXNNdXRlZCA9IGZhbHNlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0uanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnXG5pbXBvcnQgeyBGaWx0ZXJUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWx0ZXItdHlwZXMnXG5pbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUhhdCA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoJ2F1ZGlvQ29udGV4dCcpKSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZ2F0ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgYmFuZHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3QgaGlnaHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblxuXHRjb25zdCByYXRpb3MgPSBbMiwgMywgNC4xNiwgNS40MywgNi43OSwgOC4yMV1cblx0Y29uc3Qgb3NjcyA9IFtdXG5cblx0bGV0IGZ1bmRhbWVudGFsID0gMzVcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXG5cdC8qIHJvdXRpbmcgKi9cblx0YmFuZHBhc3NGaWx0ZXJcblx0XHQuY29ubmVjdChoaWdocGFzc0ZpbHRlcilcblx0XHQuY29ubmVjdChnYXRlKVxuXHRcdC5jb25uZWN0KG91dHB1dClcblxuXHRiYW5kcGFzc0ZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdGJhbmRwYXNzRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDEwMDAwXG5cdGhpZ2hwYXNzRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5ISUdIX1BBU1Ncblx0aGlnaHBhc3NGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gOTAwMFxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHZlbG9jaXR5ID0gMSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0cmF0aW9zLmZvckVhY2goKHJhdGlvKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdFx0b3NjLnR5cGUgPSBXYXZlRm9ybXMuU1FVQVJFXG5cdFx0XHRcdC8vIEZyZXF1ZW5jeSBpcyB0aGUgZnVuZGFtZW50YWwgKiB0aGlzIG9zY2lsbGF0b3IncyByYXRpb1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnVuZGFtZW50YWwgKiByYXRpb1xuXHRcdFx0XHRvc2MuY29ubmVjdChiYW5kcGFzc0ZpbHRlcilcblx0XHRcdFx0b3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRcdG9zY3MucHVzaChvc2MpXG5cdFx0XHR9KVxuXHRcdFx0Z2F0ZS5nYWluLnNldFZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUodmVsb2NpdHkgLyByYXRpb3MubGVuZ3RoLCB0aW1lICsgMC4wMilcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKCh2ZWxvY2l0eSAvIHJhdGlvcy5sZW5ndGgpICogMC4zLCB0aW1lICsgMC4wMylcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0Z2F0ZS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0b3Njcy5mb3JFYWNoKCgpID0+IHtcblx0XHRcdFx0b3Njcy5wb3AoKS5zdG9wKHRpbWUpXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGR1cmF0aW9uXG5cdFx0fSxcblx0XHRzZXRGdW5kYW1lbnRhbFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmdW5kYW1lbnRhbCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnVuZGFtZW50YWxWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmdW5kYW1lbnRhbFxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJpbXBvcnQgeyBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi8uLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuaW1wb3J0IHsgRmlsdGVyVHlwZXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvZmlsdGVyLXR5cGVzJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlU25hcmUgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGJ1ZmZlclNpemUgPSAyICogYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3Qgbm9pc2VCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGJ1ZmZlclNpemUsIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKVxuXHRjb25zdCBvID0gbm9pc2VCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGNvbnN0IG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgZnJlcXVlbmN5ID0gODBcblx0bGV0IG9zY01peFZhbHVlID0gMC4yXG5cdGxldCBub2lzZUZpbHRlclZhbHVlID0gNDAwMFxuXG5cdGNvbnN0IHJlYWwgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAxXSlcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pXG5cdGNvbnN0IGN1c3RvbVdhdmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHJlYWwsIGltYWdpbmFyeSlcblxuXHRub2lzZUZpbHRlci50eXBlID0gRmlsdGVyVHlwZXMuQkFORF9QQVNTXG5cdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IG5vaXNlRmlsdGVyVmFsdWVcblx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeVxuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMFxuXHRub2lzZUdhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdG5vaXNlLmJ1ZmZlciA9IG5vaXNlQnVmZmVyXG5cdG5vaXNlLmxvb3AgPSB0cnVlXG5cblx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKVxuXG5cdG9zYy5jb25uZWN0KG9zY0dhaW4pXG5cdG5vaXNlLmNvbm5lY3Qobm9pc2VGaWx0ZXIpLmNvbm5lY3Qobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuc2V0TGVmdElucHV0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSlcblxuXHRvc2Muc3RhcnQoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRub2lzZS5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXF1ZW5jeSAvIDIsIHRpbWUgKyAwLjE1KVxuXHRcdFx0b3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyAwLjE1KVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXRPc2NNaXhWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3NjTWl4VmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9kZU1peGVyLnNldEZhZGVWYWx1ZShvc2NNaXhWYWx1ZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPc2NNaXhWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvc2NNaXhWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0Tm9pc2VGaWx0ZXJWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9pc2VGaWx0ZXJWYWx1ZSA9IHZhbHVlXG5cdFx0XHRub2lzZUZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE5vaXNlRmlsdGVyVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9zbmFyZS5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJ1xuZXhwb3J0ICogZnJvbSAnLi9tYWNyb3MnXG5leHBvcnQgKiBmcm9tICcuL2NvbnN0YW50cydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vZGlzcGF0Y2hlcidcbmV4cG9ydCAqIGZyb20gJy4vcmFuZ2UnXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJ1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVFx0OiAwLFxuXHRTRVFVRU5DRVJfU1RPUFx0OiAxLFxuXHRTRVFVRU5DRVJfVElDS1x0OiAyLFxuXHRURU1QT19DSEFOR0VcdDogMyxcblx0Q0hBTkdFOiA5OTksXG59KVxuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9ICgoKSA9PiB7XG5cdGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpXG5cdHJldHVybiB7XG5cdFx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdFx0c3ViamVjdC5uZXh0KHsgdHlwZSwgZGF0YSB9KVxuXHRcdH0sXG5cdFx0YXModHlwZSkge1xuXHRcdFx0cmV0dXJuIHN1YmplY3Rcblx0XHRcdFx0LmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG5cdFx0XHRcdC5tYXAoYWN0aW9uID0+IGFjdGlvbi5kYXRhKVxuXHRcdH0sXG5cdH1cbn0pKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbiAoJGZyZWV6ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiByYW5nZSBtb2R1bGUgZXhwb3J0cyB1dGlsaXR5IGZ1bmN0aW9uIGZvciBzY2FsaW5nL3Vuc2NhbGluZyB2YWx1ZXMgdG8gcmFuZ2VcbiAqIEBtb2R1bGUgcmFuZ2VcbiAqL1xuXG5pbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJ1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJhbmdlXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWluIC0gUmFuZ2UgbWluaW11bVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1heCAtIFJhbmdlIG1heGltdW1cbiAqL1xuXG4vKipcbiAqIFVubm9ybWFsaXplcyBhIFswLTFdIHJhbmdlIHZhbHVlIGJhY2sgdG8gdGhlIGdpdmVuIHJhbmdlXG4gKiBAcGFyYW0ge21vZHVsZTpyYW5nZX5SYW5nZX0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gVW5ub3JtYWxpemVkIHZhbHVlIGluIHJhbmdlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnNjYWxlKHJhbmdlLCB2YWx1ZSkge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pblxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdmFsdWUgdG8gYSBbMCwxXSByYW5nZSBnaXZlbiBpdHMgb3JpZ2luYWwgcmFuZ2UubWluIGFuZCByYW5nZS5tYXhcbiAqIEBwYXJhbSB7bW9kdWxlOnJhbmdlflJhbmdlfSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICogQHJldHVybnMge251bWJlcn0gLSBOb3JtYWxpemVkIHZhbHVlIGluIHJhbmdlIFswLDFdXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShyYW5nZSwgdmFsdWUpIHtcblx0aWYgKGlzTmlsKHJhbmdlKSkge1xuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHJldHVybiAodmFsdWUgLSByYW5nZS5taW4pIC8gKHJhbmdlLm1heCAtIHJhbmdlLm1pbilcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vcmFuZ2UuanMiLCJleHBvcnQgKiBmcm9tICcuL3NlcXVlbmNlcidcbmV4cG9ydCAqIGZyb20gJy4vbm90ZSdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL2luZGV4LmpzIiwiLyoqXG4gKiBzZXF1ZW5jZXIgbW9kdWxlIGV4cG9ydHMgYSBmYWN0b3J5IGZ1bmN0aW9uIGNyZWF0aW5nIGEgc2VxdWVuY2VyIHRpZWQgdG8gYW4gQXVkaW9Db250ZXh0XG4gKiBAbW9kdWxlIHNlcXVlbmNlclxuICovXG5pbXBvcnQgV29ya2VyVGltZXIgZnJvbSAnd29ya2VyLXRpbWVyJ1xuaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJ1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIGF1ZGlvQ29udGV4dFxuICogQHJldHVybnMge1NlcXVlbmNlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVNlcXVlbmNlciA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkgPT4ge1xuXHQvKiB0aW1lIHZhbHVlcyAqL1xuXHRsZXQgdGlja3NQZXJRdWFydGVyTm90ZSA9IDRcblx0bGV0IHN0YXJ0VGltZSA9IDBcblx0bGV0IG5leHRUaWNrVGltZSA9IDBcblx0bGV0IHRpY2sgPSAwXG5cdC8qIHN0YXRlIGNoYW5nZSBjYWxsYmFja3MgKi9cblx0bGV0IG9uVGljayA9ICgpID0+IHt9XG5cdGxldCBvblN0b3AgPSAoKSA9PiB7fVxuXHRsZXQgb25TdGFydCA9ICgpID0+IHt9XG5cdGxldCBvbkxvb3AgPSAoKSA9PiB7fVxuXHQvKiBzdGF0ZSAqL1xuXHRsZXQgc3RvcCA9IHRydWVcblx0bGV0IGxvb3AgPSB0cnVlXG5cdGxldCB0ZW1wbyA9IDEzMFxuXHRsZXQgbGVuZ3RoID0gMTZcblxuXHRsZXQgdGltZXJcblxuXHQvKipcblx0ICogU2NoZWR1bGUgaXMgY2FsbGVkIGV2ZXJ5IHRpbWUgYSBuZXcgdGljayBvY2N1cnNcblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gb3AgLSBvbiB0aWNrIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdCAqL1xuXHRjb25zdCBzY2hlZHVsZSA9IChvcCkgPT4ge1xuXHRcdGNvbnN0IGN1cnJlbnRUaW1lID0gKGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZSlcblx0XHRpZiAoIXN0b3AgJiYgY3VycmVudFRpbWUgPj0gbmV4dFRpY2tUaW1lKSB7XG5cdFx0XHR0aWNrICs9IDFcblx0XHRcdG5leHRUaWNrVGltZSA9IGN1cnJlbnRUaW1lICsgKDYwIC8gKHRlbXBvICogdGlja3NQZXJRdWFydGVyTm90ZSkpXG5cdFx0XHRvcCh0aWNrLCB0ZW1wbywgdGlja3NQZXJRdWFydGVyTm90ZSwgbmV4dFRpY2tUaW1lKVxuXHRcdFx0aWYgKGxvb3AgJiYgdGljayA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRcdHRpY2sgPSAwXG5cdFx0XHRcdG9uTG9vcCgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcGxheSA9ICgpID0+IHtcblx0XHR0aW1lciA9IFdvcmtlclRpbWVyLnNldEludGVydmFsKCgpID0+IHtcblx0XHRcdHNjaGVkdWxlKG9uVGljaylcblx0XHR9LCAwKVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdGFydCgpIHtcblx0XHRcdG9uU3RhcnQoKVxuXHRcdFx0c3RhcnRUaW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lXG5cdFx0XHRzdG9wID0gZmFsc2Vcblx0XHRcdHBsYXkoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHN0b3AoKSB7XG5cdFx0XHRXb3JrZXJUaW1lci5jbGVhckludGVydmFsKHRpbWVyKVxuXHRcdFx0c3RvcCA9IHRydWVcblx0XHRcdG5leHRUaWNrVGltZSA9IDBcblx0XHRcdHRpY2sgPSAwXG5cdFx0XHRvblN0b3AoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGlzU3RhcnRlZCgpIHtcblx0XHRcdHJldHVybiAhc3RvcFxuXHRcdH0sXG5cdFx0c2V0TG9vcE1vZGUodmFsdWUpIHtcblx0XHRcdGxvb3AgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldExvb3BNb2RlKCkge1xuXHRcdFx0cmV0dXJuIGxvb3Bcblx0XHR9LFxuXHRcdHNldExlbmd0aCh2YWx1ZSkge1xuXHRcdFx0bGVuZ3RoID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMZW5ndGgoKSB7XG5cdFx0XHRyZXR1cm4gbGVuZ3RoXG5cdFx0fSxcblx0XHRzZXREaXZpc2lvbih2YWx1ZSkge1xuXHRcdFx0dGlja3NQZXJRdWFydGVyTm90ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGlja3NQZXJRdWFydGVyTm90ZVxuXHRcdH0sXG5cdFx0c2V0VGVtcG8odmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRUZW1wbygpIHtcblx0XHRcdHJldHVybiB0ZW1wb1xuXHRcdH0sXG5cdFx0Z2V0VGltZSgpIHtcblx0XHRcdHJldHVybiBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSBzdGFydFRpbWVcblx0XHR9LFxuXHRcdG9uU3RhcnQob3ApIHtcblx0XHRcdG9uU3RhcnQgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uU3RvcChvcCkge1xuXHRcdFx0b25TdG9wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblRpY2sob3ApIHtcblx0XHRcdG9uVGljayA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25Mb29wKG9wKSB7XG5cdFx0XHRvbkxvb3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaWYgKGdsb2JhbCA9PT0gZ2xvYmFsLndpbmRvdyAmJiBnbG9iYWwuVVJMICYmIGdsb2JhbC5CbG9iICYmIGdsb2JhbC5Xb3JrZXIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIFRJTUVSX1dPUktFUl9TT1VSQ0UgPSBbXG4gICAgICBcInZhciB0aW1lcklkcyA9IHt9LCBfID0ge307XCIsXG4gICAgICBcIl8uc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhckludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFySW50ZXJ2YWwodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uc2V0VGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFyVGltZW91dCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwib25tZXNzYWdlID0gZnVuY3Rpb24oZSkgeyBfW2UuZGF0YS50eXBlXShlLmRhdGEpIH07XCJcbiAgICBdLmpvaW4oXCJcIik7XG5cbiAgICB2YXIgX3RpbWVySWQgPSAwO1xuICAgIHZhciBfY2FsbGJhY2tzID0ge307XG4gICAgdmFyIF90aW1lciA9IG5ldyBnbG9iYWwuV29ya2VyKGdsb2JhbC5VUkwuY3JlYXRlT2JqZWN0VVJMKFxuICAgICAgbmV3IGdsb2JhbC5CbG9iKFsgVElNRVJfV09SS0VSX1NPVVJDRSBdLCB7IHR5cGU6IFwidGV4dC9qYXZhc2NyaXB0XCIgfSlcbiAgICApKTtcblxuICAgIF90aW1lci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoX2NhbGxiYWNrc1tlLmRhdGFdKSB7XG4gICAgICAgIF9jYWxsYmFja3NbZS5kYXRhXS5jYWxsYmFjay5hcHBseShudWxsLCBfY2FsbGJhY2tzW2UuZGF0YV0ucGFyYW1zKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldEludGVydmFsOiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldEludGVydmFsXCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0VGltZW91dFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJJbnRlcnZhbFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhclRpbWVvdXRcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzJcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzInKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk1hdGgubG9nMjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjIuMi4yMiBNYXRoLmxvZzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMjogZnVuY3Rpb24gbG9nMih4KSB7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9kcnVtcy9iYXNzLWRydW0nXG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL2hhdCdcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvZGVsYXknXG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvZGlzdG9ydGlvbidcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9ub2lzZS1jb252b2x2ZXInXG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvYml0LWNydXNoZXInXG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudCdcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aCdcbmV4cG9ydCAqIGZyb20gJy4vcm91dGluZy9kcnktd2V0LW1peGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGF0aW9ucy9hY2NlbnQtZW52ZWxvcGUnXG5leHBvcnQgKiBmcm9tICcuL2dlbmVyYXRvcnMvdm9pY2UnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IGNyZWF0ZURlbGF5ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBkZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSg1LjApXG5cdGNvbnN0IGZlZWRiYWNrID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHQvKiByb3V0aW5nICovXG5cdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdFx0XHQuY29ubmVjdChmaWx0ZXIpXG5cdFx0XHQuY29ubmVjdChkZWxheSlcblx0XHRcdC5jb25uZWN0KG91dHB1dClcblx0LyogcGFyYW1ldGVycyAqL1xuXHRmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuXHRsZXQgdGVtcG8gPSAxMjBcblx0bGV0IGRpdmlzaW9uID0gM1xuXHQvKiBjb252ZXJ0IGJlYXQgZGl2aXNpb24gdG8gZGVsYXkgdGltZSBpbiBzZWNvbmRzICovXG5cdGNvbnN0IGRpdmlzaW9uVG9EZWxheVRpbWUgPSAoX2RpdmlzaW9uLCBfdGVtcG8pID0+IDYwIC8gKF90ZW1wbyAqIF9kaXZpc2lvbilcblx0bGV0IGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblxuXHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlcblx0XHR9LFxuXHRcdHNldFRlbXBvVmFsdWUodmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdHNldERpdmlzaW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGRpdmlzaW9uID0gdmFsdWVcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblx0XHRcdGRlbGF5LmRpc2Nvbm5lY3QoZmVlZGJhY2spXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cdFx0XHRkZWxheS5jb25uZWN0KGZlZWRiYWNrKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZGl2aXNpb25cblx0XHR9LFxuXHRcdHNldERlbGF5VGltZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkZWxheVRpbWVTZWNvbmRzID0gdmFsdWVcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHNcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREZWxheVRpbWVWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkZWxheVRpbWVTZWNvbmRzXG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZVxuXHRcdH0sXG5cdFx0c2V0RmVlZGJhY2tWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZmVlZGJhY2suZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RmVlZGJhY2tWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmZWVkYmFjay5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwiZXhwb3J0IGNvbnN0IERpc3RvcnRpb24gPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG1ha2VEaXN0b3J0aW9uQ3VydmUgPSAoYW1vdW50KSA9PiB7XG5cdFx0Y29uc3QgayA9IHR5cGVvZiBhbW91bnQgPT09ICdudW1iZXInID8gYW1vdW50IDogNTBcblx0XHRjb25zdCBuU2FtcGxlcyA9IDQ0MTAwXG5cdFx0Y29uc3QgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KDQ0MTAwKVxuXHRcdGNvbnN0IGRlZyA9IE1hdGguUEkgLyAxODBcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5TYW1wbGVzOyBpICs9IDEpIHtcblx0XHRcdGNvbnN0IHggPSAoaSAqIDIpIC8gKG5TYW1wbGVzIC0gMSlcblx0XHRcdGN1cnZlW2ldID0gKCgzICsgaykgKiB4ICogMjAgKiBkZWcpIC8gKChNYXRoLlBJICsgaykgKiBNYXRoLmFicyh4KSlcblx0XHR9XG5cdFx0cmV0dXJuIGN1cnZlXG5cdH1cblx0Y29uc3QgZGlzdCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVXYXZlU2hhcGVyKClcblx0ZGlzdC5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoMTAwKVxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRkaXN0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiBjb25uZWN0XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBkaXN0XG5cdFx0fSxcblx0XHRzZXRDdXJ2ZShhbW91bnQpIHtcblx0XHRcdGRpc3QuY3VydmUgPSBtYWtlRGlzdG9ydGlvbkN1cnZlKGFtb3VudClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgTm9pc2VDb252b2x2ZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGNvbnZvbHZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVDb252b2x2ZXIoKVxuXHRjb25zdCBidWZmZXJTaXplID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGVcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcigyLCBidWZmZXJTaXplIC8gMiwgYnVmZmVyU2l6ZSlcblx0Y29uc3QgbGVmdCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKVxuXHRjb25zdCByaWdodCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgxKVxuXHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0bGVmdFtpXSA9IE1hdGgucmFuZG9tKClcblx0XHRyaWdodFtpXSA9IE1hdGgucmFuZG9tKClcblx0fSwgYnVmZmVyLmxlbmd0aClcblx0Y29udm9sdmVyLmJ1ZmZlciA9IGJ1ZmZlclxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdGNvbnZvbHZlci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGNvbnZvbHZlclxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9ub2lzZS1jb252b2x2ZXIuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgQml0Q3J1c2hlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDUxMlxuXHRjb25zdCBzY3JpcHRQcm9jZXNzb3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpXG5cdGxldCBiaXRzID0gMTZcblx0bGV0IG5vcm1GcmVxID0gMC4wNVxuXHRjb25zdCBzdGVwID0gMC41ICoqIGJpdHNcblx0bGV0IHBoYXNlciA9IDBcblx0bGV0IGxhc3QgPSAwXG5cdHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRjb25zdCBvdXRwdXQgPSBldmVudC5vdXRwdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0XHRSLnRpbWVzKChpKSA9PiB7XG5cdFx0XHRwaGFzZXIgKz0gbm9ybUZyZXFcblx0XHRcdGlmIChwaGFzZXIgPj0gMSkge1xuXHRcdFx0XHRwaGFzZXIgLT0gMVxuXHRcdFx0XHRsYXN0ID0gc3RlcCAqIE1hdGguZmxvb3IoKGlucHV0W2ldIC8gc3RlcCkgKyAwLjUpXG5cdFx0XHR9XG5cdFx0XHRvdXRwdXRbaV0gPSBsYXN0XG5cdFx0fSwgYnVmZmVyU2l6ZSlcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdHNjcmlwdFByb2Nlc3Nvci5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIHNjcmlwdFByb2Nlc3NvclxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdG5vcm1GcmVxID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRCaXRzVmFsdWUodmFsdWUpIHtcblx0XHRcdGJpdHMgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvYml0LWNydXNoZXIuanMiLCJleHBvcnQgY29uc3QgTm9vcEluc3RydW1lbnQgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbigpIHtcblxuXHRcdH0sXG5cdFx0bm90ZU9mZigpIHtcblxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudC5qcyIsImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBjcmVhdGVCYXNzRHJ1bSB9IGZyb20gJy4vZHJ1bXMvYmFzcy1kcnVtJ1xuaW1wb3J0IHsgY3JlYXRlU25hcmUgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvc25hcmUnXG5pbXBvcnQgeyBjcmVhdGVIYXQgfSBmcm9tICcuLi8uLi9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvaGF0J1xuaW1wb3J0IHsgbWFuZGF0b3J5LCB3cmFwTm9kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IEdNRHJ1bVN5bnRoID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnYXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3QgYmQgPSBjcmVhdGVCYXNzRHJ1bShhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC4xKVxuXHRjb25zdCBzbiA9IGNyZWF0ZVNuYXJlKGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjUpXG5cdGNvbnN0IGhpID0gY3JlYXRlSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpXG5cdGNvbnN0IGhhdCA9IGNyZWF0ZUhhdChhdWRpb0NvbnRleHQpLnNldER1cmF0aW9uVmFsdWUoMC41KVxuXG5cdGNvbnN0IG91dHB1dCA9IHdyYXBOb2RlKGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCkpXG5cblx0YmQuY29ubmVjdChvdXRwdXQpXG5cdHNuLmNvbm5lY3Qob3V0cHV0KVxuXHRoaS5jb25uZWN0KG91dHB1dClcblx0aGF0LmNvbm5lY3Qob3V0cHV0KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKG1pZGlWYWx1ZSwgdmVsb2NpdHksIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNSksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzYpLFxuXHRcdFx0XHRcdCgpID0+IGJkLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0MCksXG5cdFx0XHRcdFx0KCkgPT4gc24ubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDIpLFxuXHRcdFx0XHRcdCgpID0+IGhpLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQ2KSxcblx0XHRcdFx0XHQoKSA9PiBoYXQubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0bm90ZU9mZihtaWRpVmFsdWUsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdFIuY29uZChbXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzNiksXG5cdFx0XHRcdFx0KCkgPT4gYmQubm90ZU9mZih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM4KSxcblx0XHRcdFx0XHQoKSA9PiBzbi5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5ULFxuXHRcdFx0XHRcdCgpID0+IHt9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XSkobWlkaVZhbHVlKVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KHsgZ2V0SW5wdXQgfSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4vbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVEcnlXZXRNaXhlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgbm9kZU91dHB1dE1peGVyID0gY3JlYXRlTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dClcblx0Y29uc3QgaW5wdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZHJ5R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0bGV0IHdldE5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cblx0aW5wdXRHYWluTm9kZS5jb25uZWN0KGRyeUdhaW5Ob2RlKVxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0TGVmdElucHV0KGRyeUdhaW5Ob2RlKVxuXHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5vZGVPdXRwdXRNaXhlciwge1xuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGlucHV0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdHNldFdldE5vZGUoc2Z4Tm9kZU9yTWFjcm8pIHtcblx0XHRcdHdldE5vZGUgPSBzZnhOb2RlT3JNYWNyby5nZXRJbnB1dCA/IHNmeE5vZGVPck1hY3JvLmdldElucHV0KCkgOiBzZnhOb2RlT3JNYWNyb1xuXHRcdFx0bm9kZU91dHB1dE1peGVyLnNldFJpZ2h0SW5wdXQod2V0Tm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuZGlzY29ubmVjdCgpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdFx0XHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9kcnktd2V0LW1peGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7IGFzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciBnT1BTID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKTtcbnZhciBwSUUgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyICRhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHZhciBBID0ge307XG4gIHZhciBCID0ge307XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICB2YXIgUyA9IFN5bWJvbCgpO1xuICB2YXIgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUID0gdG9PYmplY3QodGFyZ2V0KTtcbiAgdmFyIGFMZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgdmFyIGlzRW51bSA9IHBJRS5mO1xuICB3aGlsZSAoYUxlbiA+IGluZGV4KSB7XG4gICAgdmFyIFMgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgdmFyIGtleXMgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgaiA9IDA7XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaikgaWYgKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpIFRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanNcbi8vIG1vZHVsZSBpZCA9IDc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBY2NlbnRFbnZlbG9wZSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkgPT4ge1xuXHRsZXQgYXR0YWNrVGltZSA9IDBcblx0bGV0IGRlY2F5VGltZSA9IDBcblx0bGV0IGFjY2VudFZhbHVlID0gMFxuXHRsZXQgcGVha1ZhbHVlID0gMFxuXHRsZXQgc3VzdGFpblZhbHVlID0gcGVha1ZhbHVlXG5cdGxldCBpc0FjdGl2ZSA9IHRydWVcblxuXHRsZXQgcGFyYW1ldGVyXG5cblx0Y29uc3QgYXNzZXJ0TWFuZGF0b3J5UGFyYW1ldGVyID0gKCkgPT4ge1xuXHRcdGlmIChpc05pbChwYXJhbWV0ZXIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgZW52ZWxvcGUgcGFyYW1ldGVyLCB1c2UgY29ubmVjdChhdWRpb1BhcmFtKSBiZWZvcmUgY2FsbGluZyBtZXRob2QnKVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdChhdWRpb1BhcmFtID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHBhcmFtZXRlciA9IGF1ZGlvUGFyYW1cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHR0cmlnZ2VyKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlcigpXG5cdFx0XHRpZiAoaXNBY3RpdmUpIHtcblx0XHRcdFx0cGVha1ZhbHVlID0gc3VzdGFpblZhbHVlICsgYWNjZW50VmFsdWVcblx0XHRcdFx0cGFyYW1ldGVyLnNldFZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHBlYWtWYWx1ZSwgdGltZSArIGF0dGFja1RpbWUpXG5cdFx0XHRcdHBhcmFtZXRlci5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSArIGF0dGFja1RpbWUgKyBkZWNheVRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkaXNjb25uZWN0KHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlcigpXG5cdFx0XHRpZiAoaXNBY3RpdmUpIHtcblx0XHRcdFx0cGFyYW1ldGVyLnNldFZhbHVlQXRUaW1lKHN1c3RhaW5WYWx1ZSwgdGltZSlcblx0XHRcdFx0cGFyYW1ldGVyLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aXNBY3RpdmUoKSB7XG5cdFx0XHRyZXR1cm4gaXNBY3RpdmVcblx0XHR9LFxuXHRcdHNldEFjdGl2ZSh2YWx1ZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRpc0FjdGl2ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0QWNjZW50VmFsdWUodmFsdWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0YWNjZW50VmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEFjY2VudFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGFjY2VudFZhbHVlXG5cdFx0fSxcblx0XHRzZXRBdHRhY2tUaW1lKHRpbWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0YXR0YWNrVGltZSA9IHRpbWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRBdHRhY2tUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGF0dGFja1RpbWVcblx0XHR9LFxuXHRcdHNldERlY2F5VGltZSh0aW1lID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGRlY2F5VGltZSA9IHRpbWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREZWNheVRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gZGVjYXlUaW1lXG5cdFx0fSxcblx0XHRzZXRTdXN0YWluVmFsdWUodmFsdWUgPSBtYW5kYXRvcnkoKSkge1xuXHRcdFx0c3VzdGFpblZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRTdXN0YWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gc3VzdGFpblZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9tb2R1bGF0aW9ucy9hY2NlbnQtZW52ZWxvcGUuanMiLCJpbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvd2F2ZS1mb3JtcydcbmltcG9ydCB7IGZyZXF1ZW5jeVRvTWlkaSwgbWlkaVRvRnJlcXVlbmN5IH0gZnJvbSAnLi4vLi4vY29yZS9ub3RlJ1xuaW1wb3J0IHsgbWFuZGF0b3J5LCBjcmVhdGVSYW5kb21XYXZlRm9ybSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscydcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVZvaWNlID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgnQXVkaW9Db250ZXh0JykpID0+IHtcblx0Y29uc3Qgc2V0V2F2ZUZvcm0gPSAod2F2ZUZvcm0sIG9zYykgPT4ge1xuXHRcdGlmICh3YXZlRm9ybSA9PT0gV2F2ZUZvcm1zLlJBTkRPTSkge1xuXHRcdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjcmVhdGVSYW5kb21XYXZlRm9ybShhdWRpb0NvbnRleHQpKVxuXHRcdH0gZWxzZSB7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0b3NjLnR5cGUgPSB3YXZlRm9ybVxuXHRcdH1cblx0fVxuXHRjb25zdCBnZXRGcmVxdWVuY3kgPSBtaWRpVG9GcmVxdWVuY3koNDQwKVxuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdGxldCB3YXZlRm9ybSA9IFdhdmVGb3Jtcy5UUklBTkdMRVxuXG5cdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpXG5cblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXG5cblx0cmV0dXJuIHtcblx0XHQuLi5vc2MsXG5cdFx0Li4ue1xuXHRcdFx0bm90ZU9uKHZhbHVlLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRcdGNvbnN0IGZyZXF1ZW5jeSA9IGdldEZyZXF1ZW5jeSh2YWx1ZSlcblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeVxuXHRcdFx0XHRvc2MuY29ubmVjdChvdXRwdXQpXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0fSxcblx0XHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0fSxcblx0XHRcdHBpdGNoKG11bHRpcGxpZXIgPSBtYW5kYXRvcnkoJ211bHRpcGxpZXInKSkge1xuXHRcdFx0XHQvKiByZXRyaWV2ZSBtaWRpIG5vdGUgdmFsdWUgZnJvbSBhY3R1YWwgZnJlcXVlbmN5ICovXG5cdFx0XHRcdGNvbnN0IGxhc3RNaWRpVmFsdWUgPSBNYXRoLnJvdW5kKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIG9zYy5mcmVxdWVuY3kudmFsdWUpKVxuXHRcdFx0XHQvKiBwaXRjaCBhY3R1YWwgZnJlcXVlbmN5ICovXG5cdFx0XHRcdGNvbnN0IG5ld0ZyZXF1ZW5jeVZhbHVlID0gb3NjLmZyZXF1ZW5jeS52YWx1ZSAqIG11bHRpcGxpZXJcblx0XHRcdFx0LyogZ2V0IG1pZGkgbm90ZSB2YWx1ZSBiYWNrIGZyb20gcGl0Y2hlZCBmcmVxdWVuY3kgKi9cblx0XHRcdFx0Y29uc3QgbmV3TWlkaVZhbHVlID0gTWF0aC5yb3VuZChmcmVxdWVuY3lUb01pZGkoNDQwLCBuZXdGcmVxdWVuY3lWYWx1ZSkpXG5cdFx0XHRcdC8qIGFwcGx5IG5ldyBmcmVxdWVuY3kgKi9cblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShuZXdGcmVxdWVuY3lWYWx1ZSwgYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKVxuXHRcdFx0XHRyZXR1cm4geyBsYXN0TWlkaVZhbHVlLCBuZXdNaWRpVmFsdWUgfVxuXHRcdFx0fSxcblx0XHRcdGNvbm5lY3QoeyBnZXRJbnB1dCA9IG1hbmRhdG9yeSgnaW5wdXQnKSwgY29ubmVjdCB9KSB7XG5cdFx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdFx0fSxcblx0XHRcdGdldFdhdmVGb3JtKCkge1xuXHRcdFx0XHRyZXR1cm4gb3NjLnR5cGVcblx0XHRcdH0sXG5cdFx0XHRzZXRXYXZlRm9ybSh2YWx1ZSA9IG1hbmRhdG9yeSgnd2F2ZUZvcm0nKSkge1xuXHRcdFx0XHR3YXZlRm9ybSA9IHZhbHVlXG5cdFx0XHRcdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpXG5cdFx0XHR9LFxuXHRcdFx0Z2V0V2F2ZUZvcm1zKCkge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyhXYXZlRm9ybXMpXG5cdFx0XHR9LFxuXHRcdFx0Z2V0IG91dHB1dCgpIHtcblx0XHRcdFx0cmV0dXJuIG91dHB1dFxuXHRcdFx0fSxcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2dlbmVyYXRvcnMvdm9pY2UuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvdmFsdWVzLmpzXG4vLyBtb2R1bGUgaWQgPSA3OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5vYmplY3QudmFsdWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QudmFsdWVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciAkdmFsdWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpIHtcbiAgICByZXR1cm4gJHZhbHVlcyhpdCk7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgaXNFbnVtID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpc0VudHJpZXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IGdldEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkgaWYgKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qc1xuLy8gbW9kdWxlIGlkID0gODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi93YXZlLWZvcm1zJ1xuZXhwb3J0ICogZnJvbSAnLi9maWx0ZXItdHlwZXMnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==