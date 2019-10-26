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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mandatory = mandatory;
exports.createRandomWaveForm = createRandomWaveForm;
exports.createNoiseBuffer = createNoiseBuffer;
exports.createGenerator = createGenerator;
exports.wrapNode = wrapNode;

var _ramda = __webpack_require__(0);

var _waveForms = __webpack_require__(5);

function mandatory(parameterName = '') {
	throw new Error(`Missing mandatory parameter ${parameterName}`);
}

function createRandomWaveForm(audioContext = mandatory(), complexity = 8) {
	var i = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	var r = Float32Array.from((0, _ramda.times)(Math.random, complexity));
	return audioContext.createPeriodicWave(r, i);
}

function createNoiseBuffer(audioContext = mandatory()) {
	var bufferSize = audioContext.sampleRate;
	var numChannels = 1;
	var buffer = audioContext.createBuffer(numChannels, bufferSize, bufferSize);
	var o = buffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random();
	}
	return buffer;
}

function createGenerator(audioContext, waveForm) {
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
}

function wrapNode(audioNode = mandatory()) {
	return {
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
	};
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.WaveForms = undefined;

var _freeze = __webpack_require__(7);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(25)
  , core      = __webpack_require__(2)
  , ctx       = __webpack_require__(26)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.FilterTypes = undefined;

var _freeze = __webpack_require__(7);

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
/* 10 */
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6)
  , core    = __webpack_require__(2)
  , fails   = __webpack_require__(14);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pitchClasses = undefined;

var _log = __webpack_require__(39);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(7);

var _freeze2 = _interopRequireDefault(_freeze);

exports.midiToFrequency = midiToFrequency;
exports.symbolToMidi = symbolToMidi;
exports.midiToSymbol = midiToSymbol;
exports.frequencyToMidi = frequencyToMidi;
exports.symbolToFrequency = symbolToFrequency;
exports.frequencyToSymbol = frequencyToSymbol;

var _ramda = __webpack_require__(0);

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
 * @param {number} frequency - Frequency of the note in HZ
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBassDrum = createBassDrum;

var _waveForms = __webpack_require__(5);

var _utils = __webpack_require__(1);

function createBassDrum(audioContext = (0, _utils.mandatory)('audioContext')) {
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
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createHat = createHat;

var _utils = __webpack_require__(1);

var _filterTypes = __webpack_require__(9);

var _waveForms = __webpack_require__(5);

function createHat(audioContext = (0, _utils.mandatory)('audioContext')) {
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
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSnare = createSnare;

var _nodeOutputMixer = __webpack_require__(10);

var _filterTypes = __webpack_require__(9);

function createSnare(audioContext) {
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
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(50), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(53);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(28);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(35);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(42);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_macros).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _macros[key];
    }
  });
});

var _constants = __webpack_require__(61);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(8);
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(24);
module.exports = __webpack_require__(2).Object.keys;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);

__webpack_require__(13)('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 25 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dispatcher = __webpack_require__(29);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(34);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(7);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = exports.Events = (0, _freeze2.default)({
	SEQUENCER_START: 0,
	SEQUENCER_STOP: 1,
	SEQUENCER_TICK: 2,
	TEMPO_CHANGE: 3,
	CHANGE: 999
});

var subject = new _rxjs.Subject();

var Dispatcher = exports.Dispatcher = {
	dispatch(type, data) {
		subject.next({ type, data });
	},
	as(type) {
		return subject.filter(action => action.type === type).map(action => action.data);
	}
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
module.exports = __webpack_require__(2).Object.freeze;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(32);

__webpack_require__(13)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unscale = unscale;
exports.scale = scale;

var _ramda = __webpack_require__(0);

/**
 * De-normalizes a [0-1] range value back to the given range
 * @param range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - De-normalized value in range
 */
function unscale(range, value) {
  if ((0, _ramda.isNil)(range) || (0, _ramda.isNil)(value)) {
    throw new Error('range and value are mandatory');
  }
  return (range.max - range.min) * value + range.min;
}

/**
 * Normalizes value to a [0,1] range given its original range.min and range.max
 * @param range - The original range in which value scales
 * @param {number} value - The value to be scaled to a [0,1] range
 * @returns {number} - Normalized value in range [0,1]
 */
function scale(range, value) {
  if ((0, _ramda.isNil)(range) || (0, _ramda.isNil)(value)) {
    throw new Error('range and value are mandatory');
  }
  return (value - range.min) / (range.max - range.min);
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequencer = __webpack_require__(36);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(15);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createSequencer = createSequencer;

var _workerTimer = __webpack_require__(37);

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
function createSequencer(audioContext = (0, _utils.mandatory)()) {
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
}

/***/ }),
/* 37 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 38 */
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(40), __esModule: true };

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
module.exports = __webpack_require__(2).Math.log2;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(6);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bassDrum = __webpack_require__(16);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_bassDrum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _bassDrum[key];
    }
  });
});

var _hat = __webpack_require__(17);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(18);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
    }
  });
});

var _delay = __webpack_require__(43);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _distortion = __webpack_require__(44);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_distortion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _distortion[key];
    }
  });
});

var _noiseConvolver = __webpack_require__(45);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_noiseConvolver).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _noiseConvolver[key];
    }
  });
});

var _bitCrusher = __webpack_require__(46);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_bitCrusher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _bitCrusher[key];
    }
  });
});

var _noopInstrument = __webpack_require__(47);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_noopInstrument).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _noopInstrument[key];
    }
  });
});

var _gmDrumSynth = __webpack_require__(48);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_gmDrumSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _gmDrumSynth[key];
    }
  });
});

var _dryWetMixer = __webpack_require__(49);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dryWetMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dryWetMixer[key];
    }
  });
});

var _nodeOutputMixer = __webpack_require__(10);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_nodeOutputMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeOutputMixer[key];
    }
  });
});

var _accentEnvelope = __webpack_require__(54);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_accentEnvelope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _accentEnvelope[key];
    }
  });
});

var _voice = __webpack_require__(55);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createDelay = createDelay;
function createDelay(audioContext) {
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
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createDistortion = createDistortion;

var _ramda = __webpack_require__(0);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createDistortion(audioContext) {
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
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createNoiseConvolver = undefined;

var _ramda = __webpack_require__(0);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createBitCrusher = createBitCrusher;

var _ramda = __webpack_require__(0);

var R = _interopRequireWildcard(_ramda);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createBitCrusher(audioContext) {
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
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.NoopInstrument = NoopInstrument;
function NoopInstrument(audioContext) {
	var output = audioContext.createGain();

	return {
		noteOn() {},
		noteOff() {},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		}
	};
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GMDrumSynth = GMDrumSynth;

var _ramda = __webpack_require__(0);

var R = _interopRequireWildcard(_ramda);

var _bassDrum = __webpack_require__(16);

var _snare = __webpack_require__(18);

var _hat = __webpack_require__(17);

var _utils = __webpack_require__(1);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function GMDrumSynth(audioContext = (0, _utils.mandatory)('audioContext')) {
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
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createDryWetMixer = undefined;

var _assign = __webpack_require__(19);

var _assign2 = _interopRequireDefault(_assign);

var _nodeOutputMixer = __webpack_require__(10);

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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(51);
module.exports = __webpack_require__(2).Object.assign;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(6);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(52)});

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.1 Object.assign(target, source, ...)
var $        = __webpack_require__(8)
  , toObject = __webpack_require__(11)
  , IObject  = __webpack_require__(20);

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = __webpack_require__(14)(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createAccentEnvelope = undefined;

var _ramda = __webpack_require__(0);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _values = __webpack_require__(56);

var _values2 = _interopRequireDefault(_values);

var _assign = __webpack_require__(19);

var _assign2 = _interopRequireDefault(_assign);

exports.createVoice = createVoice;

var _waveForms = __webpack_require__(5);

var _note = __webpack_require__(15);

var _utils = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVoice(audioContext = (0, _utils.mandatory)('AudioContext')) {
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
}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
module.exports = __webpack_require__(2).Object.values;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// http://goo.gl/XkBrjD
var $export = __webpack_require__(6)
  , $values = __webpack_require__(59)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var $         = __webpack_require__(8)
  , toIObject = __webpack_require__(60)
  , isEnum    = $.isEnum;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(20)
  , defined = __webpack_require__(12);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _waveForms = __webpack_require__(5);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_waveForms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _waveForms[key];
    }
  });
});

var _filterTypes = __webpack_require__(9);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjViYzY4ZDdjZGRiMDJhOGJmZjAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy93YXZlLWZvcm1zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmV4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9maWx0ZXItdHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLm9iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL2Jhc3MtZHJ1bS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL3NuYXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmlzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGlzdG9ydGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2VmZmVjdHMvbm9pc2UtY29udm9sdmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9iaXQtY3J1c2hlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2dtLWRydW0tc3ludGguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9yb3V0aW5nL2RyeS13ZXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmNvZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL21vZHVsYXRpb25zL2FjY2VudC1lbnZlbG9wZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2dlbmVyYXRvcnMvdm9pY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQub2JqZWN0LXRvLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtYW5kYXRvcnkiLCJjcmVhdGVSYW5kb21XYXZlRm9ybSIsImNyZWF0ZU5vaXNlQnVmZmVyIiwiY3JlYXRlR2VuZXJhdG9yIiwid3JhcE5vZGUiLCJwYXJhbWV0ZXJOYW1lIiwiRXJyb3IiLCJhdWRpb0NvbnRleHQiLCJjb21wbGV4aXR5IiwiaSIsIkZsb2F0MzJBcnJheSIsImZyb20iLCJNYXRoIiwicmFuZG9tIiwiciIsImNyZWF0ZVBlcmlvZGljV2F2ZSIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwibnVtQ2hhbm5lbHMiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJ3YXZlRm9ybSIsIldhdmVGb3JtcyIsIldISVRFX05PSVNFIiwib3NjIiwiY3JlYXRlT3NjaWxsYXRvciIsIlJBTkRPTSIsInNldFBlcmlvZGljV2F2ZSIsInR5cGUiLCJhdWRpb05vZGUiLCJnZXROb2RlIiwiZ2V0SW5wdXQiLCJjb25uZWN0IiwiU1FVQVJFIiwiU0FXVE9PVEgiLCJUUklBTkdMRSIsIlNJTkUiLCJGaWx0ZXJUeXBlcyIsIkxPV19QQVNTIiwiQkFORF9QQVNTIiwiSElHSF9QQVNTIiwiTE9XX1NIRUxGIiwiSElHSF9TSEVMRiIsIkFMTF9QQVNTIiwiY3JlYXRlTm9kZU91dHB1dE1peGVyIiwib3V0cHV0R2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwibGVmdEdhaW5Ob2RlIiwicmlnaHRHYWluTm9kZSIsIk1JRERMRV9HQUlOX1ZBTFVFIiwiZmFkZVZhbHVlIiwiZ2FpbiIsInZhbHVlIiwic2V0RmFkZVZhbHVlIiwiZ2V0RmFkZVZhbHVlIiwic2V0TGVmdElucHV0Iiwic2V0UmlnaHRJbnB1dCIsImdldExlZnRHYWluTm9kZSIsImdldFJpZ2h0R2Fpbk5vZGUiLCJtaWRpVG9GcmVxdWVuY3kiLCJzeW1ib2xUb01pZGkiLCJtaWRpVG9TeW1ib2wiLCJmcmVxdWVuY3lUb01pZGkiLCJzeW1ib2xUb0ZyZXF1ZW5jeSIsImZyZXF1ZW5jeVRvU3ltYm9sIiwicGl0Y2hDbGFzc2VzIiwidHVuaW5nIiwibWlkaVZhbHVlIiwiXyIsInBpdGNoQ2xhc3MiLCJvY3RhdmUiLCJpbmRleE9mIiwicGl0Y2hDbGFzc0luZGV4IiwiZnJlcXVlbmN5IiwiY3JlYXRlQmFzc0RydW0iLCJvdXRwdXQiLCJvc2NHYWluIiwiY29tcCIsImNyZWF0ZUR5bmFtaWNzQ29tcHJlc3NvciIsImZpbHRlciIsImNyZWF0ZUJpcXVhZEZpbHRlciIsInRocmVzaG9sZCIsImtuZWUiLCJyYXRpbyIsImF0dGFjayIsInJlbGVhc2UiLCJmaW5hbEZyZXF1ZW5jeSIsImluaXRpYWxGcmVxdWVuY3kiLCJkdXJhdGlvbiIsImlzTXV0ZWQiLCJvdXRwdXRHYWluVmFsdWUiLCJzdGFydCIsImN1cnJlbnRUaW1lIiwibm90ZU9uIiwidmVsb2NpdHkiLCJ0aW1lIiwiZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSIsIm5vdGVPZmYiLCJjYW5jZWxTY2hlZHVsZWRWYWx1ZXMiLCJzZXRGcmVxdWVuY3lWYWx1ZSIsImdldEZyZXF1ZW5jeVZhbHVlIiwic2V0RHVyYXRpb25WYWx1ZSIsImdldER1cmF0aW9uVmFsdWUiLCJzZXRPdXRwdXRHYWluVmFsdWUiLCJnZXRPdXRwdXRHYWluVmFsdWUiLCJtdXRlIiwidW5NdXRlIiwiY3JlYXRlSGF0IiwiZ2F0ZSIsImJhbmRwYXNzRmlsdGVyIiwiaGlnaHBhc3NGaWx0ZXIiLCJyYXRpb3MiLCJvc2NzIiwiZnVuZGFtZW50YWwiLCJmb3JFYWNoIiwicHVzaCIsInNldFZhbHVlQXRUaW1lIiwibGVuZ3RoIiwicG9wIiwic3RvcCIsInNldEZ1bmRhbWVudGFsVmFsdWUiLCJnZXRGdW5kYW1lbnRhbFZhbHVlIiwiY3JlYXRlU25hcmUiLCJub2lzZUJ1ZmZlciIsIm5vaXNlR2FpbiIsIm5vaXNlRmlsdGVyIiwibm9kZU1peGVyIiwibm9pc2UiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJvc2NNaXhWYWx1ZSIsIm5vaXNlRmlsdGVyVmFsdWUiLCJyZWFsIiwiaW1hZ2luYXJ5IiwiY3VzdG9tV2F2ZSIsImxvb3AiLCJzZXRPc2NNaXhWYWx1ZSIsImdldE9zY01peFZhbHVlIiwic2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsImdldE5vaXNlRmlsdGVyVmFsdWUiLCJFdmVudHMiLCJTRVFVRU5DRVJfU1RBUlQiLCJTRVFVRU5DRVJfU1RPUCIsIlNFUVVFTkNFUl9USUNLIiwiVEVNUE9fQ0hBTkdFIiwiQ0hBTkdFIiwic3ViamVjdCIsIlN1YmplY3QiLCJEaXNwYXRjaGVyIiwiZGlzcGF0Y2giLCJkYXRhIiwibmV4dCIsImFzIiwiYWN0aW9uIiwibWFwIiwidW5zY2FsZSIsInNjYWxlIiwicmFuZ2UiLCJtYXgiLCJtaW4iLCJjcmVhdGVTZXF1ZW5jZXIiLCJ0aWNrc1BlclF1YXJ0ZXJOb3RlIiwic3RhcnRUaW1lIiwibmV4dFRpY2tUaW1lIiwidGljayIsIm9uVGljayIsIm9uU3RvcCIsIm9uU3RhcnQiLCJvbkxvb3AiLCJ0ZW1wbyIsInRpbWVyIiwic2NoZWR1bGUiLCJvcCIsInBsYXkiLCJXb3JrZXJUaW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsImlzU3RhcnRlZCIsInNldExvb3BNb2RlIiwiZ2V0TG9vcE1vZGUiLCJzZXRMZW5ndGgiLCJnZXRMZW5ndGgiLCJzZXREaXZpc2lvbiIsImdldERpdmlzaW9uIiwic2V0VGVtcG8iLCJnZXRUZW1wbyIsImdldFRpbWUiLCJjcmVhdGVEZWxheSIsImRlbGF5IiwiZmVlZGJhY2siLCJkaXZpc2lvbiIsImRpdmlzaW9uVG9EZWxheVRpbWUiLCJfZGl2aXNpb24iLCJfdGVtcG8iLCJkZWxheVRpbWVTZWNvbmRzIiwiZGVsYXlUaW1lIiwic2V0VGVtcG9WYWx1ZSIsImdldFRlbXBvVmFsdWUiLCJzZXREaXZpc2lvblZhbHVlIiwiZGlzY29ubmVjdCIsImdldERpdmlzaW9uVmFsdWUiLCJzZXREZWxheVRpbWVWYWx1ZSIsImdldERlbGF5VGltZVZhbHVlIiwic2V0RmVlZGJhY2tWYWx1ZSIsImdldEZlZWRiYWNrVmFsdWUiLCJjcmVhdGVEaXN0b3J0aW9uIiwiUiIsIm1ha2VEaXN0b3J0aW9uQ3VydmUiLCJhbW91bnQiLCJjdXJ2ZSIsImRlZyIsIlBJIiwidGltZXMiLCJ4IiwiYSIsImIiLCJhYnMiLCJwcmVHYWluIiwicG9zdEdhaW4iLCJkaXN0IiwiY3JlYXRlV2F2ZVNoYXBlciIsIm92ZXJzYW1wbGUiLCJzZXRDdXJ2ZUFtb3VudCIsInNldFByZUdhaW5WYWx1ZSIsImdldFByZUdhaW5WYWx1ZSIsInNldFBvc3RHYWluVmFsdWUiLCJnZXRQb3N0R2FpblZhbHVlIiwiY3JlYXRlTm9pc2VDb252b2x2ZXIiLCJjb252b2x2ZXIiLCJjcmVhdGVDb252b2x2ZXIiLCJsZWZ0IiwicmlnaHQiLCJjcmVhdGVCaXRDcnVzaGVyIiwic2NyaXB0UHJvY2Vzc29yIiwiY3JlYXRlU2NyaXB0UHJvY2Vzc29yIiwiYml0cyIsIm5vcm1GcmVxIiwic3RlcCIsInBoYXNlciIsImxhc3QiLCJvbmF1ZGlvcHJvY2VzcyIsImV2ZW50IiwiaW5wdXQiLCJpbnB1dEJ1ZmZlciIsIm91dHB1dEJ1ZmZlciIsImZsb29yIiwic2V0Qml0c1ZhbHVlIiwiTm9vcEluc3RydW1lbnQiLCJHTURydW1TeW50aCIsImJkIiwic24iLCJoaSIsImhhdCIsImNvbmQiLCJlcXVhbHMiLCJUIiwiY3JlYXRlRHJ5V2V0TWl4ZXIiLCJub2RlT3V0cHV0TWl4ZXIiLCJpbnB1dEdhaW5Ob2RlIiwiZHJ5R2Fpbk5vZGUiLCJ3ZXROb2RlIiwic2V0V2V0Tm9kZSIsInNmeE5vZGVPck1hY3JvIiwiY3JlYXRlQWNjZW50RW52ZWxvcGUiLCJhdHRhY2tUaW1lIiwiZGVjYXlUaW1lIiwiYWNjZW50VmFsdWUiLCJwZWFrVmFsdWUiLCJzdXN0YWluVmFsdWUiLCJpc0FjdGl2ZSIsInBhcmFtZXRlciIsImFzc2VydE1hbmRhdG9yeVBhcmFtZXRlciIsImF1ZGlvUGFyYW0iLCJvbiIsImxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lIiwib2ZmIiwic2V0QWN0aXZlIiwic2V0QWNjZW50VmFsdWUiLCJnZXRBY2NlbnRWYWx1ZSIsInNldEF0dGFja1RpbWUiLCJnZXRBdHRhY2tUaW1lIiwic2V0RGVjYXlUaW1lIiwiZ2V0RGVjYXlUaW1lIiwic2V0U3VzdGFpblZhbHVlIiwiZ2V0U3VzdGFpblZhbHVlIiwiY3JlYXRlVm9pY2UiLCJzZXRXYXZlRm9ybSIsInBpdGNoIiwibXVsdGlwbGllciIsImxhc3RNaWRpVmFsdWUiLCJyb3VuZCIsIm5ld0ZyZXF1ZW5jeVZhbHVlIiwibmV3TWlkaVZhbHVlIiwiZ2V0V2F2ZUZvcm0iLCJnZXRXYXZlRm9ybXMiLCJnZXRPdXRwdXQiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7QUM3REEsa0M7Ozs7Ozs7Ozs7OztRQ0dnQkEsUyxHQUFBQSxTO1FBSUFDLG9CLEdBQUFBLG9CO1FBTUFDLGlCLEdBQUFBLGlCO1FBV0FDLGUsR0FBQUEsZTtRQWFBQyxRLEdBQUFBLFE7O0FBckNoQjs7QUFDQTs7QUFFTyxTQUFTSixTQUFULENBQW1CSyxnQkFBZ0IsRUFBbkMsRUFBdUM7QUFDN0MsT0FBTSxJQUFJQyxLQUFKLENBQVcsK0JBQThCRCxhQUFjLEVBQXZELENBQU47QUFDQTs7QUFFTSxTQUFTSixvQkFBVCxDQUE4Qk0sZUFBZVAsV0FBN0MsRUFB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c0JBQWMvUSxvQkFBZCxDQUFQO0FBQ0EsR0ExQndCO0FBMkJ6QmdSLGNBQVk7QUFDWCxVQUFPM04sTUFBUDtBQUNBO0FBN0J3QixFQUFuQixDQUFQO0FBK0JBLEM7Ozs7OztBQ3BERCxrQkFBa0IsWUFBWSxtQkFBTyxDQUFDLEVBQWtDLHNCOzs7Ozs7QUNBeEUsbUJBQU8sQ0FBQyxFQUFpQztBQUN6QyxpQkFBaUIsbUJBQU8sQ0FBQyxDQUFzQixnQjs7Ozs7O0FDRC9DO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLENBQVk7QUFDbEMsY0FBYyxtQkFBTyxDQUFDLEVBQXFCOztBQUUzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRTs7Ozs7O0FDUkQsZ0JBQWdCLG1CQUFPLENBQUMsQ0FBSztBQUM3QixnQkFBZ0IsbUJBQU8sQ0FBQyxFQUFnQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsRTs7Ozs7O0FDZkE7QUFDQSxjQUFjLG1CQUFPLENBQUMsRUFBYTtBQUNuQyxjQUFjLG1CQUFPLENBQUMsRUFBYTtBQUNuQztBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7QUFDQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJmaWxlIjoid2FzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNWJjNjhkN2NkZGIwMmE4YmZmMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyB0aW1lcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IFdhdmVGb3JtcyB9IGZyb20gJy4uL2NvbnN0YW50cy93YXZlLWZvcm1zJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1hbmRhdG9yeShwYXJhbWV0ZXJOYW1lID0gJycpIHtcblx0dGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIG1hbmRhdG9yeSBwYXJhbWV0ZXIgJHtwYXJhbWV0ZXJOYW1lfWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmFuZG9tV2F2ZUZvcm0oYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCksIGNvbXBsZXhpdHkgPSA4KSB7XG5cdGNvbnN0IGkgPSBGbG9hdDMyQXJyYXkuZnJvbSh0aW1lcyhNYXRoLnJhbmRvbSwgY29tcGxleGl0eSkpO1xuXHRjb25zdCByID0gRmxvYXQzMkFycmF5LmZyb20odGltZXMoTWF0aC5yYW5kb20sIGNvbXBsZXhpdHkpKTtcblx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUociwgaSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb2lzZUJ1ZmZlcihhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkge1xuXHRjb25zdCBidWZmZXJTaXplID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGU7XG5cdGNvbnN0IG51bUNoYW5uZWxzID0gMTtcblx0Y29uc3QgYnVmZmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlcihudW1DaGFubmVscywgYnVmZmVyU2l6ZSwgYnVmZmVyU2l6ZSk7XG5cdGNvbnN0IG8gPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSArPSAxKSB7XG5cdFx0b1tpXSA9IE1hdGgucmFuZG9tKCk7XG5cdH1cblx0cmV0dXJuIGJ1ZmZlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdlbmVyYXRvcihhdWRpb0NvbnRleHQsIHdhdmVGb3JtKSB7XG5cdGlmICh3YXZlRm9ybSA9PT0gV2F2ZUZvcm1zLldISVRFX05PSVNFKSB7XG5cdFx0cmV0dXJuIGNyZWF0ZU5vaXNlQnVmZmVyKGF1ZGlvQ29udGV4dCk7XG5cdH1cblx0Y29uc3Qgb3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKTtcblx0aWYgKHdhdmVGb3JtID09PSBXYXZlRm9ybXMuUkFORE9NKSB7XG5cdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjcmVhdGVSYW5kb21XYXZlRm9ybShhdWRpb0NvbnRleHQpKTtcblx0XHRyZXR1cm4gb3NjO1xuXHR9XG5cdG9zYy50eXBlID0gd2F2ZUZvcm07XG5cdHJldHVybiBvc2M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwTm9kZShhdWRpb05vZGUgPSBtYW5kYXRvcnkoKSkge1xuXHRyZXR1cm4ge1xuXHRcdGdldE5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Ob2RlO1xuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Ob2RlO1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGdldElucHV0LCBjb25uZWN0IH0pIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KGdldElucHV0KCkpO1xuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9O1xuXHRcdH0sXG5cdH07XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vdXRpbHMuanMiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcxLjIuNid9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogV2F2ZUZvcm1zIHByb3ZpZGVzIGEgaGFzaCBvZiBjb25zdGFudHMgZm9yIG9zY2lsbGF0b3IgdHlwZSBhc3NpZ25hdGlvblxuICogQHR5cGUge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IFdhdmVGb3JtcyA9IE9iamVjdC5mcmVlemUoe1xuXHRTUVVBUkU6ICdzcXVhcmUnLFxuXHRTQVdUT09USDogJ3Nhd3Rvb3RoJyxcblx0VFJJQU5HTEU6ICd0cmlhbmdsZScsXG5cdFNJTkU6ICdzaW5lJyxcblx0UkFORE9NOiAncmFuZG9tJyxcblx0V0hJVEVfTk9JU0U6ICd3aGl0ZV9ub2lzZScsXG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb25zdGFudHMvd2F2ZS1mb3Jtcy5qcyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuLyQuZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuLyQuY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi8kLmN0eCcpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIGlmKElTX1BST1RPKShleHBvcnRzW1BST1RPVFlQRV0gfHwgKGV4cG9ydHNbUFJPVE9UWVBFXSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgLy8gd3JhcFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRPYmplY3QgPSBPYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY3JlYXRlOiAgICAgJE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgICRPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIGlzRW51bTogICAgIHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICBnZXREZXNjOiAgICAkT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0eSxcbiAgc2V0RGVzY3M6ICAgJE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICAkT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgICRPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgZ2V0U3ltYm9sczogJE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGVhY2g6ICAgICAgIFtdLmZvckVhY2hcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEZpbHRlclR5cGVzIHByb3ZpZGVzIGNvbnN0YW50cyBmb3IgZmlsdGVyIHR5cGUgYXNzaWduYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBGaWx0ZXJUeXBlcyA9IE9iamVjdC5mcmVlemUoe1xuXHRMT1dfUEFTUzogJ2xvd3Bhc3MnLFxuXHRCQU5EX1BBU1M6ICdiYW5kcGFzcycsXG5cdEhJR0hfUEFTUzogJ2hpZ2hwYXNzJyxcblx0TE9XX1NIRUxGOiAnbG93c2hlbGYnLFxuXHRISUdIX1NIRUxGOiAnaGlnaHNoZWxmJyxcblx0QUxMX1BBU1M6ICdhbGxwYXNzJyxcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnN0YW50cy9maWx0ZXItdHlwZXMuanMiLCJpbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCA9IG1hbmRhdG9yeSgpKSA9PiB7XG5cdC8qIHdlYiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdGNvbnN0IGxlZnRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdGNvbnN0IHJpZ2h0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdC8qIGNvbnN0YW50IHZhbHVlcyAqL1xuXHRjb25zdCBNSURETEVfR0FJTl9WQUxVRSA9IDAuNTtcblxuXHQvKiBwYXJhbWV0ZXIgdmFsdWVzICovXG5cdGxldCBmYWRlVmFsdWUgPSAwO1xuXG5cdC8qIHJvdXRpbmcgKi9cblx0bGVmdEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpO1xuXHRyaWdodEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpO1xuXHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFO1xuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRTtcblxuXHRyZXR1cm4ge1xuXHRcdHNldEZhZGVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSAtICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKTtcblx0XHRcdHJpZ2h0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFICsgKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpO1xuXHRcdFx0ZmFkZVZhbHVlID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldEZhZGVWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmYWRlVmFsdWU7XG5cdFx0fSxcblx0XHRzZXRMZWZ0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRzZXRSaWdodElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QocmlnaHRHYWluTm9kZSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXRHYWluTm9kZS5jb25uZWN0KGdldElucHV0KCkpO1xuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9O1xuXHRcdH0sXG5cdFx0Z2V0TGVmdEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIGxlZnRHYWluTm9kZTtcblx0XHR9LFxuXHRcdGdldFJpZ2h0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gcmlnaHRHYWluTm9kZTtcblx0XHR9LFxuXHR9O1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9ub2RlLW91dHB1dC1taXhlci5qcyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi8kLmRlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC50by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuLyQuZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi8kLmNvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuLyQuZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJztcbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTm90ZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBUaGUgcGl0Y2ggaW4gY2hyb21hdGljIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHByb3BlcnR5IHtudW1iZXJ9IG9jdGF2ZSAtIFRoZSBvY3RhdmUgdmFsdWUgYXNzb2NpYXRlZCB0byBwaXRjaCBjbGFzc1xuICovXG5cbi8qKlxuICogcGl0Y2hDbGFzc2VzIHByb3ZpZGVzIHRoZSBjaHJvbWF0aWMgc2NhbGUgc3ltYm9scyBleHBvcnRlZCBhcyBhIGxpc3Q6XG4gKiAnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQidcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBtaWRpIG5vdGVcbiAqIHdpdGggY3VzdG9tLCBvcHRpb25hbCB0dW5pbmcgKGRlZmF1bHQgdmFsdWUgZm9yXG4gKiB0dW5pbmcgaXMgNDQwIGZvciBBNClcbiAqIFRoaXMgY3VycnkgZnVuY3Rpb24gd2lsbCBiZSBwYXJ0aWFsbHkgYXBwbGllZCBpZiB0dW5pbmdcbiAqIGlzIHRoZSBvbmx5IHBhcmFtZXRlclxuICogQHBhcmFtIHtudW1iZXJ9IHR1bmluZyAtIFRoZSBmcmVxdWVuY3kgYXNzb2NpYXRlZCB0byBtaWRpIHZhbHVlIDY5IChBNClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBNaWRpIHZhbHVlICgwIHRvIDEyNykgb2YgdGhlIG5vdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ8ZnVuY3Rpb259IFRoZSBjb21wdXRlZCBmcmVxdWVuY3kgb3IgYSBjb21wdXRpbmcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1pZGlUb0ZyZXF1ZW5jeSh0dW5pbmcgPSA0NDAsIG1pZGlWYWx1ZSkge1xuXHRpZiAoaXNOaWwobWlkaVZhbHVlKSkge1xuXHRcdHJldHVybiBfID0+IG1pZGlUb0ZyZXF1ZW5jeSh0dW5pbmcsIF8pO1xuXHR9XG5cdGlmIChtaWRpVmFsdWUgPj0gMCAmJiBtaWRpVmFsdWUgPD0gMTI3KSB7XG5cdFx0cmV0dXJuIHR1bmluZyAqICgyICoqICgobWlkaVZhbHVlIC0gNjkpIC8gMTIpKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWlkaVZhbHVlIHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN5bWJvbFRvTWlkaShwaXRjaENsYXNzLCBvY3RhdmUpIHtcblx0cmV0dXJuICgob2N0YXZlICsgMSkgKiAxMikgKyBwaXRjaENsYXNzZXMuaW5kZXhPZihwaXRjaENsYXNzKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcGl0Y2ggY2xhc3MgYW5kIG9jdGF2ZSBmb3IgdGhlIGdpdmVuIG1pZGkgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqIEByZXR1cm5zIHtOb3RlfVxuICovXG5leHBvcnQgZnVuY3Rpb24gbWlkaVRvU3ltYm9sKG1pZGlWYWx1ZSkge1xuXHRjb25zdCBwaXRjaENsYXNzSW5kZXggPSAobWlkaVZhbHVlIC0gKDEyICogMikpICUgMTI7XG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMjtcblx0cmV0dXJuIHtcblx0XHRwaXRjaENsYXNzOiBwaXRjaENsYXNzZXNbcGl0Y2hDbGFzc0luZGV4XSxcblx0XHRvY3RhdmUsXG5cdH07XG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGZyZXF1ZW5jeSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbWlkaSBub3RlXG4gKiB3aXRoIGN1c3RvbSwgb3B0aW9uYWwgdHVuaW5nIChkZWZhdWx0IHZhbHVlIGZvclxuICogdHVuaW5nIGlzIDQ0MCBmb3IgQTQpXG4gKiBUaGlzIGN1cnJ5IGZ1bmN0aW9uIHdpbGwgYmUgcGFydGlhbGx5IGFwcGxpZWQgaWYgdHVuaW5nXG4gKiBpcyB0aGUgb25seSBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSB0dW5pbmcgLSBUaGUgZnJlcXVlbmN5IGFzc29jaWF0ZWQgdG8gbWlkaSB2YWx1ZSA2OSAoQTQpXG4gKiBAcGFyYW0ge251bWJlcn0gZnJlcXVlbmN5IC0gRnJlcXVlbmN5IG9mIHRoZSBub3RlIGluIEhaXG4gKiBAcmV0dXJucyB7bnVtYmVyfGZ1bmN0aW9ufSBUaGUgY29tcHV0ZWQgZnJlcXVlbmN5IG9yIGEgY29tcHV0aW5nIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVxdWVuY3lUb01pZGkodHVuaW5nID0gNDQwLCBmcmVxdWVuY3kpIHtcblx0aWYgKGlzTmlsKGZyZXF1ZW5jeSkpIHtcblx0XHRyZXR1cm4gXyA9PiBmcmVxdWVuY3lUb01pZGkodHVuaW5nLCBfKTtcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKTtcblx0fVxuXHRyZXR1cm4gbnVsbDtcbn1cblxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9GcmVxdWVuY3kocGl0Y2hDbGFzcywgb2N0YXZlKSB7XG5cdHJldHVybiBcdG1pZGlUb0ZyZXF1ZW5jeSg0NDAsIHN5bWJvbFRvTWlkaShwaXRjaENsYXNzLCBvY3RhdmUpKTtcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbm90ZSBhbmQgb2N0YXZlIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gZnJlcXVlbmN5XG4gKiBAcGFyYW0ge251bWJlcn0gZnJlcXVlbmN5IC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmcmVxdWVuY3lUb1N5bWJvbChmcmVxdWVuY3kpIHtcblx0cmV0dXJuIG1pZGlUb1N5bWJvbChmcmVxdWVuY3lUb01pZGkoNDQwLCBmcmVxdWVuY3kpKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL25vdGUuanMiLCJpbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3Jtcyc7XG5pbXBvcnQgeyBtYW5kYXRvcnkgfSBmcm9tICcuLi8uLi8uLi9jb21tb24vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFzc0RydW0oYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0Y29uc3QgY29tcCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEeW5hbWljc0NvbXByZXNzb3IoKTtcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuXHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuXG5cdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSAyNTAwO1xuXG5cdGNvbXAudGhyZXNob2xkLnZhbHVlID0gMC4wOyAvLyB0aGlzIGlzIHRoZSBwaXRmYWxsLCBsZWF2ZSBzb21lIGhlYWRyb29tXG5cdGNvbXAua25lZS52YWx1ZSA9IDAuMDsgLy8gYnJ1dGUgZm9yY2Vcblx0Y29tcC5yYXRpby52YWx1ZSA9IDIwLjA7IC8vIG1heCBjb21wcmVzc2lvblxuXHRjb21wLmF0dGFjay52YWx1ZSA9IDAuMDU7IC8vIDVtcyBhdHRhY2tcblx0Y29tcC5yZWxlYXNlLnZhbHVlID0gMC4wNTA7IC8vIDUwbXMgcmVsZWFzZVxuXG5cdGNvbnN0IGZpbmFsRnJlcXVlbmN5ID0gMC4wMTtcblxuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDIwMDtcblx0bGV0IGR1cmF0aW9uID0gMC4xNTtcblx0bGV0IGlzTXV0ZWQgPSBmYWxzZTtcblx0bGV0IG91dHB1dEdhaW5WYWx1ZSA9IDFFLTEwO1xuXG5cdC8qIHJvdXRpbmcgKi9cblx0b3NjLmNvbm5lY3Qob3NjR2FpbikuY29ubmVjdChmaWx0ZXIpLmNvbm5lY3QoY29tcCkuY29ubmVjdChvdXRwdXQpO1xuXG5cdG91dHB1dC5nYWluLnZhbHVlID0gb3V0cHV0R2FpblZhbHVlO1xuXHRvc2NHYWluLmdhaW4udmFsdWUgPSAxRS0xMDtcblx0b3NjLnR5cGUgPSBXYXZlRm9ybXMuU0lORTtcblx0b3NjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAwLjgsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lKTtcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShpbml0aWFsRnJlcXVlbmN5LCB0aW1lKTtcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSArIGR1cmF0aW9uKTtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pO1xuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSk7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKTtcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSk7XG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSk7XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aW5pdGlhbEZyZXF1ZW5jeSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBpbml0aWFsRnJlcXVlbmN5O1xuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvbjtcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0R2FpblZhbHVlID0gdmFsdWU7XG5cdFx0XHRpZiAoIWlzTXV0ZWQpIHtcblx0XHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXRHYWluVmFsdWU7XG5cdFx0fSxcblx0XHRtdXRlKCkge1xuXHRcdFx0aXNNdXRlZCA9IHRydWU7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwO1xuXHRcdH0sXG5cdFx0dW5NdXRlKCkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWU7XG5cdFx0XHRpc011dGVkID0gZmFsc2U7XG5cdFx0fSxcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZHJ1bXMvYmFzcy1kcnVtLmpzIiwiaW1wb3J0IHsgbWFuZGF0b3J5IH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3V0aWxzJztcbmltcG9ydCB7IEZpbHRlclR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2ZpbHRlci10eXBlcyc7XG5pbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi8uLi9jb25zdGFudHMvd2F2ZS1mb3Jtcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXQoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCdhdWRpb0NvbnRleHQnKSkge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRjb25zdCBnYXRlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0Y29uc3QgYmFuZHBhc3NGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG5cdGNvbnN0IGhpZ2hwYXNzRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuXG5cdGNvbnN0IHJhdGlvcyA9IFsyLCAzLCA0LjE2LCA1LjQzLCA2Ljc5LCA4LjIxXTtcblx0Y29uc3Qgb3NjcyA9IFtdO1xuXG5cdGxldCBmdW5kYW1lbnRhbCA9IDM1O1xuXHRsZXQgZHVyYXRpb24gPSAwLjI1O1xuXG5cdC8qIHJvdXRpbmcgKi9cblx0YmFuZHBhc3NGaWx0ZXJcblx0XHQuY29ubmVjdChoaWdocGFzc0ZpbHRlcilcblx0XHQuY29ubmVjdChnYXRlKVxuXHRcdC5jb25uZWN0KG91dHB1dCk7XG5cblx0YmFuZHBhc3NGaWx0ZXIudHlwZSA9IEZpbHRlclR5cGVzLkJBTkRfUEFTUztcblx0YmFuZHBhc3NGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gODAwMDtcblx0aGlnaHBhc3NGaWx0ZXIudHlwZSA9IEZpbHRlclR5cGVzLkhJR0hfUEFTUztcblx0aGlnaHBhc3NGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gOTAwMDtcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih2ZWxvY2l0eSA9IDEsIHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdHJhdGlvcy5mb3JFYWNoKChyYXRpbykgPT4ge1xuXHRcdFx0XHRjb25zdCBvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpO1xuXHRcdFx0XHRvc2MudHlwZSA9IFdhdmVGb3Jtcy5TUVVBUkU7XG5cdFx0XHRcdC8vIEZyZXF1ZW5jeSBpcyB0aGUgZnVuZGFtZW50YWwgKiB0aGlzIG9zY2lsbGF0b3IncyByYXRpb1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnVuZGFtZW50YWwgKiByYXRpbztcblx0XHRcdFx0b3NjLmNvbm5lY3QoYmFuZHBhc3NGaWx0ZXIpO1xuXHRcdFx0XHRvc2Muc3RhcnQodGltZSk7XG5cdFx0XHRcdG9zY3MucHVzaChvc2MpO1xuXHRcdFx0fSk7XG5cdFx0XHRnYXRlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpO1xuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUodmVsb2NpdHkgLyByYXRpb3MubGVuZ3RoLCB0aW1lICsgMC4wMik7XG5cdFx0XHRnYXRlLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgodmVsb2NpdHkgLyByYXRpb3MubGVuZ3RoKSAqIDAuMywgdGltZSArIDAuMDMpO1xuXHRcdFx0Z2F0ZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbik7XG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0Z2F0ZS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKTtcblx0XHRcdG9zY3MuZm9yRWFjaCgoKSA9PiB7XG5cdFx0XHRcdG9zY3MucG9wKCkuc3RvcCh0aW1lKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpO1xuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9O1xuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvbjtcblx0XHR9LFxuXHRcdHNldEZ1bmRhbWVudGFsVmFsdWUodmFsdWUpIHtcblx0XHRcdGZ1bmRhbWVudGFsID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldEZ1bmRhbWVudGFsVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnVuZGFtZW50YWw7XG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZTtcblx0XHR9LFxuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQuanMiLCJpbXBvcnQgeyBjcmVhdGVOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi8uLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJztcbmltcG9ydCB7IEZpbHRlclR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vY29uc3RhbnRzL2ZpbHRlci10eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTbmFyZShhdWRpb0NvbnRleHQpIHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IDIgKiBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZTtcblx0Y29uc3Qgbm9pc2VCdWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGJ1ZmZlclNpemUsIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKTtcblx0Y29uc3QgbyA9IG5vaXNlQnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkgKz0gMSkge1xuXHRcdG9baV0gPSAoTWF0aC5yYW5kb20oKSAqIDIpIC0gMTtcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdGNvbnN0IG5vaXNlR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdGNvbnN0IG5vaXNlRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0Y29uc3Qgbm9kZU1peGVyID0gY3JlYXRlTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dCk7XG5cdGNvbnN0IG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKCk7XG5cdGNvbnN0IG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuXG5cdGxldCBkdXJhdGlvbiA9IDAuMjU7XG5cdGxldCBmcmVxdWVuY3kgPSA4MDtcblx0bGV0IG9zY01peFZhbHVlID0gMC4yO1xuXHRsZXQgbm9pc2VGaWx0ZXJWYWx1ZSA9IDQwMDA7XG5cblx0Y29uc3QgcmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDFdKTtcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pO1xuXHRjb25zdCBjdXN0b21XYXZlID0gYXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZShyZWFsLCBpbWFnaW5hcnkpO1xuXG5cdG5vaXNlRmlsdGVyLnR5cGUgPSBGaWx0ZXJUeXBlcy5CQU5EX1BBU1M7XG5cdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IG5vaXNlRmlsdGVyVmFsdWU7XG5cdG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmcmVxdWVuY3k7XG5cdG9zY0dhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwO1xuXHRub2lzZUdhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwO1xuXHRub2lzZS5idWZmZXIgPSBub2lzZUJ1ZmZlcjtcblx0bm9pc2UubG9vcCA9IHRydWU7XG5cblx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKTtcblxuXHRvc2MuY29ubmVjdChvc2NHYWluKTtcblx0bm9pc2UuY29ubmVjdChub2lzZUZpbHRlcikuY29ubmVjdChub2lzZUdhaW4pO1xuXHRub2RlTWl4ZXIuc2V0TGVmdElucHV0KG9zY0dhaW4pO1xuXHRub2RlTWl4ZXIuc2V0UmlnaHRJbnB1dChub2lzZUdhaW4pO1xuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSk7XG5cblx0b3NjLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cdG5vaXNlLnN0YXJ0KGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSk7XG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odmVsb2NpdHkgPSAxLCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSk7XG5cdFx0XHRvc2NHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUodmVsb2NpdHksIHRpbWUpO1xuXHRcdFx0bm9pc2VHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUodmVsb2NpdHksIHRpbWUpO1xuXHRcdFx0b3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXF1ZW5jeSAvIDEwLCB0aW1lICsgMC4xNSk7XG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIDAuMTUpO1xuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKTtcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKTtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSk7XG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSk7XG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKTtcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKTtcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKTtcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfTtcblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb247XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZnJlcXVlbmN5ID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZyZXF1ZW5jeTtcblx0XHR9LFxuXHRcdHNldE9zY01peFZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvc2NNaXhWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0bm9kZU1peGVyLnNldEZhZGVWYWx1ZShvc2NNaXhWYWx1ZSk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldE9zY01peFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG9zY01peFZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0Tm9pc2VGaWx0ZXJWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9pc2VGaWx0ZXJWYWx1ZSA9IHZhbHVlO1xuXHRcdFx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldE5vaXNlRmlsdGVyVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gbm9pc2VGaWx0ZXJWYWx1ZTtcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlO1xuXHRcdH0sXG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL3NuYXJlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2Fzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuLyQuY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9jb21tb24nO1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJztcbmV4cG9ydCAqIGZyb20gJy4vbWFjcm9zJztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInZhciAkID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJC5zZXREZXNjKGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kLmNvcmUnKS5PYmplY3Qua2V5cztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi8kLnRvLW9iamVjdCcpO1xuXG5yZXF1aXJlKCcuLyQub2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oJGtleXMpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmdsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi8kLmEtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5jdHguanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9kaXNwYXRjaGVyJztcbmV4cG9ydCAqIGZyb20gJy4vcmFuZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVDogMCxcblx0U0VRVUVOQ0VSX1NUT1A6IDEsXG5cdFNFUVVFTkNFUl9USUNLOiAyLFxuXHRURU1QT19DSEFOR0U6IDMsXG5cdENIQU5HRTogOTk5LFxufSk7XG5cbmNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9IHtcblx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdHN1YmplY3QubmV4dCh7IHR5cGUsIGRhdGEgfSk7XG5cdH0sXG5cdGFzKHR5cGUpIHtcblx0XHRyZXR1cm4gc3ViamVjdFxuICAgICAgICAgICAgLmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG4gICAgICAgICAgICAubWFwKGFjdGlvbiA9PiBhY3Rpb24uZGF0YSk7XG5cdH0sXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vJC5pcy1vYmplY3QnKTtcblxucmVxdWlyZSgnLi8kLm9iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24oJGZyZWV6ZSl7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpe1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUoaXQpIDogaXQ7XG4gIH07XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuaXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSc7XG5cbi8qKlxuICogRGUtbm9ybWFsaXplcyBhIFswLTFdIHJhbmdlIHZhbHVlIGJhY2sgdG8gdGhlIGdpdmVuIHJhbmdlXG4gKiBAcGFyYW0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gRGUtbm9ybWFsaXplZCB2YWx1ZSBpbiByYW5nZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5zY2FsZShyYW5nZSwgdmFsdWUpIHtcblx0aWYgKGlzTmlsKHJhbmdlKSB8fCBpc05pbCh2YWx1ZSkpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ3JhbmdlIGFuZCB2YWx1ZSBhcmUgbWFuZGF0b3J5Jyk7XG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pbjtcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHZhbHVlIHRvIGEgWzAsMV0gcmFuZ2UgZ2l2ZW4gaXRzIG9yaWdpbmFsIHJhbmdlLm1pbiBhbmQgcmFuZ2UubWF4XG4gKiBAcGFyYW0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gTm9ybWFsaXplZCB2YWx1ZSBpbiByYW5nZSBbMCwxXVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2NhbGUocmFuZ2UsIHZhbHVlKSB7XG5cdGlmIChpc05pbChyYW5nZSkgfHwgaXNOaWwodmFsdWUpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdyYW5nZSBhbmQgdmFsdWUgYXJlIG1hbmRhdG9yeScpO1xuXHR9XG5cdHJldHVybiAodmFsdWUgLSByYW5nZS5taW4pIC8gKHJhbmdlLm1heCAtIHJhbmdlLm1pbik7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInO1xuZXhwb3J0ICogZnJvbSAnLi9ub3RlJztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL2luZGV4LmpzIiwiLyoqXG4gKiBzZXF1ZW5jZXIgbW9kdWxlIGV4cG9ydHMgYSBmYWN0b3J5IGZ1bmN0aW9uIGNyZWF0aW5nIGEgc2VxdWVuY2VyIHRpZWQgdG8gYW4gQXVkaW9Db250ZXh0XG4gKiBAbW9kdWxlIHNlcXVlbmNlclxuICovXG5pbXBvcnQgV29ya2VyVGltZXIgZnJvbSAnd29ya2VyLXRpbWVyJztcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uL2NvbW1vbi91dGlscyc7XG5cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSBhdWRpb0NvbnRleHRcbiAqIEByZXR1cm5zIHtTZXF1ZW5jZXJ9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZXF1ZW5jZXIoYXVkaW9Db250ZXh0ID0gbWFuZGF0b3J5KCkpIHtcblx0LyogdGltZSB2YWx1ZXMgKi9cblx0bGV0IHRpY2tzUGVyUXVhcnRlck5vdGUgPSA0O1xuXHRsZXQgc3RhcnRUaW1lID0gMDtcblx0bGV0IG5leHRUaWNrVGltZSA9IDA7XG5cdGxldCB0aWNrID0gMDtcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge1xuXHR9O1xuXHRsZXQgb25TdG9wID0gKCkgPT4ge1xuXHR9O1xuXHRsZXQgb25TdGFydCA9ICgpID0+IHtcblx0fTtcblx0bGV0IG9uTG9vcCA9ICgpID0+IHtcblx0fTtcblx0Lyogc3RhdGUgKi9cblx0bGV0IHN0b3AgPSB0cnVlO1xuXHRsZXQgbG9vcCA9IHRydWU7XG5cdGxldCB0ZW1wbyA9IDEzMDtcblx0bGV0IGxlbmd0aCA9IDE2O1xuXG5cdGxldCB0aW1lcjtcblxuXHQvKipcblx0ICogU2NoZWR1bGUgaXMgY2FsbGVkIGV2ZXJ5IHRpbWUgYSBuZXcgdGljayBvY2N1cnNcblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gb3AgLSBvbiB0aWNrIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdCAqL1xuXHRjb25zdCBzY2hlZHVsZSA9IChvcCkgPT4ge1xuXHRcdGNvbnN0IGN1cnJlbnRUaW1lID0gKGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZSk7XG5cdFx0aWYgKCFzdG9wICYmIGN1cnJlbnRUaW1lID49IG5leHRUaWNrVGltZSkge1xuXHRcdFx0dGljayArPSAxO1xuXHRcdFx0bmV4dFRpY2tUaW1lID0gY3VycmVudFRpbWUgKyAoNjAgLyAodGVtcG8gKiB0aWNrc1BlclF1YXJ0ZXJOb3RlKSk7XG5cdFx0XHRvcCh0aWNrLCB0ZW1wbywgdGlja3NQZXJRdWFydGVyTm90ZSwgbmV4dFRpY2tUaW1lKTtcblx0XHRcdGlmIChsb29wICYmIHRpY2sgPT09IGxlbmd0aCkge1xuXHRcdFx0XHR0aWNrID0gMDtcblx0XHRcdFx0b25Mb29wKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG5cdGNvbnN0IHBsYXkgPSAoKSA9PiB7XG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spO1xuXHRcdH0sIDApO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KCk7XG5cdFx0XHRzdGFydFRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWU7XG5cdFx0XHRzdG9wID0gZmFsc2U7XG5cdFx0XHRwbGF5KCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdHN0b3AoKSB7XG5cdFx0XHRXb3JrZXJUaW1lci5jbGVhckludGVydmFsKHRpbWVyKTtcblx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0bmV4dFRpY2tUaW1lID0gMDtcblx0XHRcdHRpY2sgPSAwO1xuXHRcdFx0b25TdG9wKCk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGlzU3RhcnRlZCgpIHtcblx0XHRcdHJldHVybiAhc3RvcDtcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldExvb3BNb2RlKCkge1xuXHRcdFx0cmV0dXJuIGxvb3A7XG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRMZW5ndGgoKSB7XG5cdFx0XHRyZXR1cm4gbGVuZ3RoO1xuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdHRpY2tzUGVyUXVhcnRlck5vdGUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGlja3NQZXJRdWFydGVyTm90ZTtcblx0XHR9LFxuXHRcdHNldFRlbXBvKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRUZW1wbygpIHtcblx0XHRcdHJldHVybiB0ZW1wbztcblx0XHR9LFxuXHRcdGdldFRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lO1xuXHRcdH0sXG5cdFx0b25TdGFydChvcCkge1xuXHRcdFx0b25TdGFydCA9IG9wO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRvblN0b3Aob3ApIHtcblx0XHRcdG9uU3RvcCA9IG9wO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRvblRpY2sob3ApIHtcblx0XHRcdG9uVGljayA9IG9wO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRvbkxvb3Aob3ApIHtcblx0XHRcdG9uTG9vcCA9IG9wO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pZiAoZ2xvYmFsID09PSBnbG9iYWwud2luZG93ICYmIGdsb2JhbC5VUkwgJiYgZ2xvYmFsLkJsb2IgJiYgZ2xvYmFsLldvcmtlcikge1xuICBtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgVElNRVJfV09SS0VSX1NPVVJDRSA9IFtcbiAgICAgIFwidmFyIHRpbWVySWRzID0ge30sIF8gPSB7fTtcIixcbiAgICAgIFwiXy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJUaW1lb3V0KHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJvbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7IF9bZS5kYXRhLnR5cGVdKGUuZGF0YSkgfTtcIlxuICAgIF0uam9pbihcIlwiKTtcblxuICAgIHZhciBfdGltZXJJZCA9IDA7XG4gICAgdmFyIF9jYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgX3RpbWVyID0gbmV3IGdsb2JhbC5Xb3JrZXIoZ2xvYmFsLlVSTC5jcmVhdGVPYmplY3RVUkwoXG4gICAgICBuZXcgZ2xvYmFsLkJsb2IoWyBUSU1FUl9XT1JLRVJfU09VUkNFIF0sIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9KVxuICAgICkpO1xuXG4gICAgX3RpbWVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChfY2FsbGJhY2tzW2UuZGF0YV0pIHtcbiAgICAgICAgX2NhbGxiYWNrc1tlLmRhdGFdLmNhbGxiYWNrLmFwcGx5KG51bGwsIF9jYWxsYmFja3NbZS5kYXRhXS5wYXJhbXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0SW50ZXJ2YWxcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgc2V0VGltZW91dDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRUaW1lb3V0XCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhckludGVydmFsXCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFyVGltZW91dFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm1hdGgubG9nMicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk1hdGgubG9nMjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdNYXRoJywge1xuICBsb2cyOiBmdW5jdGlvbiBsb2cyKHgpe1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL2Jhc3MtZHJ1bSc7XG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL2hhdCc7XG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2RydW1zL3NuYXJlJztcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kZWxheSc7XG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvZGlzdG9ydGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2VmZmVjdHMvbm9pc2UtY29udm9sdmVyJztcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9iaXQtY3J1c2hlcic7XG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL25vb3AtaW5zdHJ1bWVudCc7XG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2dtLWRydW0tc3ludGgnO1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL2RyeS13ZXQtbWl4ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJztcbmV4cG9ydCAqIGZyb20gJy4vbW9kdWxhdGlvbnMvYWNjZW50LWVudmVsb3BlJztcbmV4cG9ydCAqIGZyb20gJy4vZ2VuZXJhdG9ycy92b2ljZSc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURlbGF5KGF1ZGlvQ29udGV4dCkge1xuICAgIC8qIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcblx0Y29uc3QgZGVsYXkgPSBhdWRpb0NvbnRleHQuY3JlYXRlRGVsYXkoNS4wKTtcblx0Y29uc3QgZmVlZGJhY2sgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIC8qIHJvdXRpbmcgKi9cblx0ZGVsYXkuY29ubmVjdChmZWVkYmFjaylcbiAgICAgICAgLmNvbm5lY3QoZmlsdGVyKVxuICAgICAgICAuY29ubmVjdChkZWxheSlcbiAgICAgICAgLmNvbm5lY3Qob3V0cHV0KTtcbiAgICAvKiBwYXJhbWV0ZXJzICovXG5cdGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnO1xuXHRsZXQgdGVtcG8gPSAxMjA7XG5cdGxldCBkaXZpc2lvbiA9IDM7XG4gICAgLyogY29udmVydCBiZWF0IGRpdmlzaW9uIHRvIGRlbGF5IHRpbWUgaW4gc2Vjb25kcyAqL1xuXHRjb25zdCBkaXZpc2lvblRvRGVsYXlUaW1lID0gKF9kaXZpc2lvbiwgX3RlbXBvKSA9PiA2MCAvIChfdGVtcG8gKiBfZGl2aXNpb24pO1xuXHRsZXQgZGVsYXlUaW1lU2Vjb25kcyA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKTtcblxuXHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzO1xuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpO1xuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9O1xuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXk7XG5cdFx0fSxcblx0XHRzZXRUZW1wb1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlO1xuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGl2aXNpb25Ub0RlbGF5VGltZShkaXZpc2lvbiwgdGVtcG8pO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRUZW1wb1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvO1xuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGl2aXNpb24gPSB2YWx1ZTtcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbyk7XG5cdFx0XHRkZWxheS5kaXNjb25uZWN0KGZlZWRiYWNrKTtcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVNlY29uZHM7XG5cdFx0XHRkZWxheS5jb25uZWN0KGZlZWRiYWNrKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkaXZpc2lvbjtcblx0XHR9LFxuXHRcdHNldERlbGF5VGltZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkZWxheVRpbWVTZWNvbmRzID0gdmFsdWU7XG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXREZWxheVRpbWVWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkZWxheVRpbWVTZWNvbmRzO1xuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZTtcblx0XHR9LFxuXHRcdHNldEZlZWRiYWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGZlZWRiYWNrLmdhaW4udmFsdWUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0Z2V0RmVlZGJhY2tWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmZWVkYmFjay5nYWluLnZhbHVlO1xuXHRcdH0sXG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGVsYXkuanMiLCJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpc3RvcnRpb24oYXVkaW9Db250ZXh0KSB7XG5cdGNvbnN0IG1ha2VEaXN0b3J0aW9uQ3VydmUgPSAoYW1vdW50KSA9PiB7XG5cdFx0Y29uc3QgeyBzYW1wbGVSYXRlIH0gPSBhdWRpb0NvbnRleHQ7XG5cdFx0Y29uc3QgY3VydmUgPSBuZXcgRmxvYXQzMkFycmF5KDQ0MTAwKTtcblx0XHRjb25zdCBkZWcgPSBNYXRoLlBJIC8gMTgwO1xuXHRcdFIudGltZXMoKGkpID0+IHtcblx0XHRcdGNvbnN0IHggPSAoaSAqIDIpIC8gKHNhbXBsZVJhdGUgLSAxKTtcblx0XHRcdGNvbnN0IGEgPSAoMyArIGFtb3VudCkgKiB4ICogMjAgKiBkZWc7XG5cdFx0XHRjb25zdCBiID0gTWF0aC5QSSArIChhbW91bnQgKiBNYXRoLmFicyh4KSk7XG5cdFx0XHRjdXJ2ZVtpXSA9IGEgLyBiO1xuXHRcdH0sIHNhbXBsZVJhdGUpO1xuXHRcdHJldHVybiBjdXJ2ZTtcblx0fTtcblxuXHRjb25zdCBwcmVHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0Y29uc3QgcG9zdEdhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXHRjb25zdCBkaXN0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZVdhdmVTaGFwZXIoKTtcblx0cHJlR2Fpbi5jb25uZWN0KGRpc3QpLmNvbm5lY3QocG9zdEdhaW4pO1xuXHRkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZSg0MDApO1xuXHRkaXN0Lm92ZXJzYW1wbGUgPSAnNHgnO1xuXHRwcmVHYWluLmdhaW4udmFsdWUgPSA1MDtcblx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IDE7XG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdHBvc3RHYWluLmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBwcmVHYWluO1xuXHRcdH0sXG5cdFx0c2V0Q3VydmVBbW91bnQoYW1vdW50KSB7XG5cdFx0XHRkaXN0LmN1cnZlID0gbWFrZURpc3RvcnRpb25DdXJ2ZShhbW91bnQpO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRzZXRQcmVHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdHByZUdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRQcmVHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gcHJlR2Fpbi5nYWluLnZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0UG9zdEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0cG9zdEdhaW4uZ2Fpbi52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRQb3N0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHBvc3RHYWluLmdhaW4udmFsdWU7XG5cdFx0fSxcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kaXN0b3J0aW9uLmpzIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVOb2lzZUNvbnZvbHZlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgY29udm9sdmVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUNvbnZvbHZlcigpO1xuXHRjb25zdCBidWZmZXJTaXplID0gYXVkaW9Db250ZXh0LnNhbXBsZVJhdGU7XG5cdGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMiwgYnVmZmVyU2l6ZSAvIDIsIGJ1ZmZlclNpemUpO1xuXHRjb25zdCBsZWZ0ID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuXHRjb25zdCByaWdodCA9IGJ1ZmZlci5nZXRDaGFubmVsRGF0YSgxKTtcblx0Ui50aW1lcygoaSkgPT4ge1xuXHRcdGxlZnRbaV0gPSBNYXRoLnJhbmRvbSgpO1xuXHRcdHJpZ2h0W2ldID0gTWF0aC5yYW5kb20oKTtcblx0fSwgYnVmZmVyLmxlbmd0aCk7XG5cdGNvbnZvbHZlci5idWZmZXIgPSBidWZmZXI7XG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0Y29udm9sdmVyLmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBjb252b2x2ZXI7XG5cdFx0fSxcblx0fTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvbm9pc2UtY29udm9sdmVyLmpzIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCaXRDcnVzaGVyKGF1ZGlvQ29udGV4dCkge1xuXHRjb25zdCBidWZmZXJTaXplID0gNTEyO1xuXHRjb25zdCBzY3JpcHRQcm9jZXNzb3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlU2NyaXB0UHJvY2Vzc29yKGJ1ZmZlclNpemUsIDEsIDEpO1xuXHRsZXQgYml0cyA9IDE2O1xuXHRsZXQgbm9ybUZyZXEgPSAwLjA1O1xuXHRjb25zdCBzdGVwID0gMC41ICoqIGJpdHM7XG5cdGxldCBwaGFzZXIgPSAwO1xuXHRsZXQgbGFzdCA9IDA7XG5cdHNjcmlwdFByb2Nlc3Nvci5vbmF1ZGlvcHJvY2VzcyA9IChldmVudCkgPT4ge1xuXHRcdGNvbnN0IGlucHV0ID0gZXZlbnQuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG5cdFx0Y29uc3Qgb3V0cHV0ID0gZXZlbnQub3V0cHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuXHRcdFIudGltZXMoKGkpID0+IHtcblx0XHRcdHBoYXNlciArPSBub3JtRnJlcTtcblx0XHRcdGlmIChwaGFzZXIgPj0gMSkge1xuXHRcdFx0XHRwaGFzZXIgLT0gMTtcblx0XHRcdFx0bGFzdCA9IHN0ZXAgKiBNYXRoLmZsb29yKChpbnB1dFtpXSAvIHN0ZXApICsgMC41KTtcblx0XHRcdH1cblx0XHRcdG91dHB1dFtpXSA9IGxhc3Q7XG5cdFx0fSwgYnVmZmVyU2l6ZSk7XG5cdH07XG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0c2NyaXB0UHJvY2Vzc29yLmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBzY3JpcHRQcm9jZXNzb3I7XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9ybUZyZXEgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdFx0c2V0Qml0c1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHRiaXRzID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2JpdC1jcnVzaGVyLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIE5vb3BJbnN0cnVtZW50KGF1ZGlvQ29udGV4dCkge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKCkge1xuXG5cdFx0fSxcblx0XHRub3RlT2ZmKCkge1xuXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvbm9vcC1pbnN0cnVtZW50LmpzIiwiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjcmVhdGVCYXNzRHJ1bSB9IGZyb20gJy4vZHJ1bXMvYmFzcy1kcnVtJztcbmltcG9ydCB7IGNyZWF0ZVNuYXJlIH0gZnJvbSAnLi4vLi4vbWFjcm9zL2luc3RydW1lbnRzL2RydW1zL3NuYXJlJztcbmltcG9ydCB7IGNyZWF0ZUhhdCB9IGZyb20gJy4uLy4uL21hY3Jvcy9pbnN0cnVtZW50cy9kcnVtcy9oYXQnO1xuaW1wb3J0IHsgbWFuZGF0b3J5LCB3cmFwTm9kZSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBHTURydW1TeW50aChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoJ2F1ZGlvQ29udGV4dCcpKSB7XG5cdGNvbnN0IGJkID0gY3JlYXRlQmFzc0RydW0oYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuMSk7XG5cdGNvbnN0IHNuID0gY3JlYXRlU25hcmUoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuNSk7XG5cdGNvbnN0IGhpID0gY3JlYXRlSGF0KGF1ZGlvQ29udGV4dCkuc2V0RHVyYXRpb25WYWx1ZSgwLjEpO1xuXHRjb25zdCBoYXQgPSBjcmVhdGVIYXQoYXVkaW9Db250ZXh0KS5zZXREdXJhdGlvblZhbHVlKDAuNSk7XG5cblx0Y29uc3Qgb3V0cHV0ID0gd3JhcE5vZGUoYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSk7XG5cblx0YmQuY29ubmVjdChvdXRwdXQpO1xuXHRzbi5jb25uZWN0KG91dHB1dCk7XG5cdGhpLmNvbm5lY3Qob3V0cHV0KTtcblx0aGF0LmNvbm5lY3Qob3V0cHV0KTtcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbihtaWRpVmFsdWUsIHZlbG9jaXR5LCB0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRSLmNvbmQoW1xuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzUpLFxuXHRcdFx0XHRcdCgpID0+IGJkLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM2KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscygzOCksXG5cdFx0XHRcdFx0KCkgPT4gc24ubm90ZU9uKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoNDApLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDQyKSxcblx0XHRcdFx0XHQoKSA9PiBoaS5ub3RlT24odGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLmVxdWFscyg0NiksXG5cdFx0XHRcdFx0KCkgPT4gaGF0Lm5vdGVPbih0aW1lKSxcblx0XHRcdFx0XSxcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuVCxcblx0XHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdF0pKG1pZGlWYWx1ZSk7XG5cdFx0fSxcblx0XHRub3RlT2ZmKG1pZGlWYWx1ZSwgdGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0Ui5jb25kKFtcblx0XHRcdFx0W1xuXHRcdFx0XHRcdFIuZXF1YWxzKDM2KSxcblx0XHRcdFx0XHQoKSA9PiBiZC5ub3RlT2ZmKHRpbWUpLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRbXG5cdFx0XHRcdFx0Ui5lcXVhbHMoMzgpLFxuXHRcdFx0XHRcdCgpID0+IHNuLm5vdGVPZmYodGltZSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFtcblx0XHRcdFx0XHRSLlQsXG5cdFx0XHRcdFx0KCkgPT4ge1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHRdKShtaWRpVmFsdWUpO1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KHsgZ2V0SW5wdXQgfSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0fTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvZ20tZHJ1bS1zeW50aC5qcyIsImltcG9ydCB7IGNyZWF0ZU5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4vbm9kZS1vdXRwdXQtbWl4ZXInO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRHJ5V2V0TWl4ZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG5vZGVPdXRwdXRNaXhlciA9IGNyZWF0ZU5vZGVPdXRwdXRNaXhlcihhdWRpb0NvbnRleHQpO1xuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblx0Y29uc3QgZHJ5R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpO1xuXG5cdGxldCB3ZXROb2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcblxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpO1xuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3Qod2V0Tm9kZSk7XG5cblx0bm9kZU91dHB1dE1peGVyLnNldExlZnRJbnB1dChkcnlHYWluTm9kZSk7XG5cdG5vZGVPdXRwdXRNaXhlci5zZXRSaWdodElucHV0KHdldE5vZGUpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG5vZGVPdXRwdXRNaXhlciwge1xuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGlucHV0R2Fpbk5vZGU7XG5cdFx0fSxcblx0XHRzZXRXZXROb2RlKHNmeE5vZGVPck1hY3JvKSB7XG5cdFx0XHR3ZXROb2RlID0gc2Z4Tm9kZU9yTWFjcm8uZ2V0SW5wdXQgPyBzZnhOb2RlT3JNYWNyby5nZXRJbnB1dCgpIDogc2Z4Tm9kZU9yTWFjcm87XG5cdFx0XHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKTtcblx0XHRcdGlucHV0R2Fpbk5vZGUuZGlzY29ubmVjdCgpO1xuXHRcdFx0aW5wdXRHYWluTm9kZS5jb25uZWN0KGRyeUdhaW5Ob2RlKTtcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH0sXG5cdH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3Mvcm91dGluZy9kcnktd2V0LW1peGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQub2JqZWN0LWFzc2lnbicpfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuLyQudG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vJC5pb2JqZWN0Jyk7XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgYSA9IE9iamVjdC5hc3NpZ25cbiAgICAsIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gYSh7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cyhhKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCAkJCAgICA9IGFyZ3VtZW50c1xuICAgICwgJCRsZW4gPSAkJC5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0S2V5cyAgICA9ICQuZ2V0S2V5c1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9sc1xuICAgICwgaXNFbnVtICAgICA9ICQuaXNFbnVtO1xuICB3aGlsZSgkJGxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdCgkJFtpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufSA6IE9iamVjdC5hc3NpZ247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3QtYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuY29mLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVBY2NlbnRFbnZlbG9wZSA9IChhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoKSkgPT4ge1xuXHRsZXQgYXR0YWNrVGltZSA9IDA7XG5cdGxldCBkZWNheVRpbWUgPSAwO1xuXHRsZXQgYWNjZW50VmFsdWUgPSAwO1xuXHRsZXQgcGVha1ZhbHVlID0gMDtcblx0bGV0IHN1c3RhaW5WYWx1ZSA9IHBlYWtWYWx1ZTtcblx0bGV0IGlzQWN0aXZlID0gdHJ1ZTtcblxuXHRsZXQgcGFyYW1ldGVyO1xuXG5cdGNvbnN0IGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlciA9ICgpID0+IHtcblx0XHRpZiAoaXNOaWwocGFyYW1ldGVyKSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIGVudmVsb3BlIHBhcmFtZXRlciwgdXNlIGNvbm5lY3QoYXVkaW9QYXJhbSkgYmVmb3JlIGNhbGxpbmcgbWV0aG9kJyk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdChhdWRpb1BhcmFtID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHBhcmFtZXRlciA9IGF1ZGlvUGFyYW07XG5cdFx0XHRzdXN0YWluVmFsdWUgPSBwYXJhbWV0ZXIudmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdG9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGFzc2VydE1hbmRhdG9yeVBhcmFtZXRlcigpO1xuXHRcdFx0aWYgKGlzQWN0aXZlKSB7XG5cdFx0XHRcdHBlYWtWYWx1ZSA9IHN1c3RhaW5WYWx1ZSArIGFjY2VudFZhbHVlO1xuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKTtcblx0XHRcdFx0cGFyYW1ldGVyLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHBlYWtWYWx1ZSwgdGltZSArIGF0dGFja1RpbWUpO1xuXHRcdFx0XHRwYXJhbWV0ZXIuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShzdXN0YWluVmFsdWUsIHRpbWUgKyBhdHRhY2tUaW1lICsgZGVjYXlUaW1lKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdG9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRhc3NlcnRNYW5kYXRvcnlQYXJhbWV0ZXIoKTtcblx0XHRcdGlmIChpc0FjdGl2ZSkge1xuXHRcdFx0XHRwYXJhbWV0ZXIuc2V0VmFsdWVBdFRpbWUoc3VzdGFpblZhbHVlLCB0aW1lKTtcblx0XHRcdFx0cGFyYW1ldGVyLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGlzQWN0aXZlKCkge1xuXHRcdFx0cmV0dXJuIGlzQWN0aXZlO1xuXHRcdH0sXG5cdFx0c2V0QWN0aXZlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGlzQWN0aXZlID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdHNldEFjY2VudFZhbHVlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGFjY2VudFZhbHVlID0gdmFsdWU7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldEFjY2VudFZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGFjY2VudFZhbHVlO1xuXHRcdH0sXG5cdFx0c2V0QXR0YWNrVGltZSh0aW1lID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdGF0dGFja1RpbWUgPSB0aW1lO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRBdHRhY2tUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGF0dGFja1RpbWU7XG5cdFx0fSxcblx0XHRzZXREZWNheVRpbWUodGltZSA9IG1hbmRhdG9yeSgpKSB7XG5cdFx0XHRkZWNheVRpbWUgPSB0aW1lO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXREZWNheVRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gZGVjYXlUaW1lO1xuXHRcdH0sXG5cdFx0c2V0U3VzdGFpblZhbHVlKHZhbHVlID0gbWFuZGF0b3J5KCkpIHtcblx0XHRcdHN1c3RhaW5WYWx1ZSA9IHZhbHVlO1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHRnZXRTdXN0YWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gc3VzdGFpblZhbHVlO1xuXHRcdH0sXG5cdH07XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9tb2R1bGF0aW9ucy9hY2NlbnQtZW52ZWxvcGUuanMiLCJpbXBvcnQgeyBXYXZlRm9ybXMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvd2F2ZS1mb3Jtcyc7XG5pbXBvcnQgeyBmcmVxdWVuY3lUb01pZGkgfSBmcm9tICcuLi8uLi9jb3JlL25vdGUnO1xuaW1wb3J0IHsgY3JlYXRlUmFuZG9tV2F2ZUZvcm0sIG1hbmRhdG9yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWb2ljZShhdWRpb0NvbnRleHQgPSBtYW5kYXRvcnkoJ0F1ZGlvQ29udGV4dCcpKSB7XG5cdGNvbnN0IHNldFdhdmVGb3JtID0gKHdhdmVGb3JtLCBvc2MpID0+IHtcblx0XHRpZiAod2F2ZUZvcm0gPT09IFdhdmVGb3Jtcy5SQU5ET00pIHtcblx0XHRcdG9zYy5zZXRQZXJpb2RpY1dhdmUoY3JlYXRlUmFuZG9tV2F2ZUZvcm0oYXVkaW9Db250ZXh0KSk7XG5cdFx0fSBlbHNlIHsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRvc2MudHlwZSA9IHdhdmVGb3JtO1xuXHRcdH1cblx0fTtcblx0Y29uc3Qgb3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKTtcblx0bGV0IHdhdmVGb3JtID0gV2F2ZUZvcm1zLlRSSUFOR0xFO1xuXG5cdHNldFdhdmVGb3JtKHdhdmVGb3JtLCBvc2MpO1xuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCk7XG5cdG9zYy5jb25uZWN0KG91dHB1dCk7XG5cdG9zYy5zdGFydChhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXG5cdHJldHVybiBPYmplY3QuYXNzaWduKG9zYywge1xuXHRcdHBpdGNoKG11bHRpcGxpZXIgPSBtYW5kYXRvcnkoJ211bHRpcGxpZXInKSkge1xuXHRcdFx0LyogcmV0cmlldmUgbWlkaSBub3RlIHZhbHVlIGZyb20gYWN0dWFsIGZyZXF1ZW5jeSAqL1xuXHRcdFx0Y29uc3QgbGFzdE1pZGlWYWx1ZSA9IE1hdGgucm91bmQoZnJlcXVlbmN5VG9NaWRpKDQ0MCwgb3NjLmZyZXF1ZW5jeS52YWx1ZSkpO1xuXHRcdFx0LyogcGl0Y2ggYWN0dWFsIGZyZXF1ZW5jeSAqL1xuXHRcdFx0Y29uc3QgbmV3RnJlcXVlbmN5VmFsdWUgPSBvc2MuZnJlcXVlbmN5LnZhbHVlICogbXVsdGlwbGllcjtcblx0XHRcdC8qIGdldCBtaWRpIG5vdGUgdmFsdWUgYmFjayBmcm9tIHBpdGNoZWQgZnJlcXVlbmN5ICovXG5cdFx0XHRjb25zdCBuZXdNaWRpVmFsdWUgPSBNYXRoLnJvdW5kKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIG5ld0ZyZXF1ZW5jeVZhbHVlKSk7XG5cdFx0XHQvKiBhcHBseSBuZXcgZnJlcXVlbmN5ICovXG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKG5ld0ZyZXF1ZW5jeVZhbHVlLCBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpO1xuXHRcdFx0cmV0dXJuIHsgbGFzdE1pZGlWYWx1ZSwgbmV3TWlkaVZhbHVlIH07XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgZ2V0SW5wdXQgPSBtYW5kYXRvcnkoJ2lucHV0JyksIGNvbm5lY3QgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSk7XG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH07XG5cdFx0fSxcblx0XHRnZXRXYXZlRm9ybSgpIHtcblx0XHRcdHJldHVybiBvc2MudHlwZTtcblx0XHR9LFxuXHRcdHNldFdhdmVGb3JtKHZhbHVlID0gbWFuZGF0b3J5KCd3YXZlRm9ybScpKSB7XG5cdFx0XHR3YXZlRm9ybSA9IHZhbHVlO1xuXHRcdFx0c2V0V2F2ZUZvcm0od2F2ZUZvcm0sIG9zYyk7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdGdldFdhdmVGb3JtcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QudmFsdWVzKFdhdmVGb3Jtcyk7XG5cdFx0fSxcblx0XHRnZXRPdXRwdXQoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0sXG5cdH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9nZW5lcmF0b3JzL3ZvaWNlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L3ZhbHVlcy5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LnZhbHVlcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQuY29yZScpLk9iamVjdC52YWx1ZXM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC92YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHA6Ly9nb28uZ2wvWGtCcmpEXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vJC5leHBvcnQnKVxuICAsICR2YWx1ZXMgPSByZXF1aXJlKCcuLyQub2JqZWN0LXRvLWFycmF5JykoZmFsc2UpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoaXQpe1xuICAgIHJldHVybiAkdmFsdWVzKGl0KTtcbiAgfVxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC52YWx1ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkICAgICAgICAgPSByZXF1aXJlKCcuLyQnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vJC50by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSAkLmlzRW51bTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSAkLmdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5vYmplY3QtdG8tYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuLyQuaW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vJC5kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnRvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vd2F2ZS1mb3Jtcyc7XG5leHBvcnQgKiBmcm9tICcuL2ZpbHRlci10eXBlcyc7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==