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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
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

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(0);
var ctx = __webpack_require__(28);
var hide = __webpack_require__(30);
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
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(36), __esModule: true };

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var NodeOutputMixer = exports.NodeOutputMixer = audioContext => {
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
			fadeValue = value;
			leftGainNode.gain.value = MIDDLE_GAIN_VALUE - value * MIDDLE_GAIN_VALUE;
			rightGainNode.gain.value = MIDDLE_GAIN_VALUE + value * MIDDLE_GAIN_VALUE;
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
/* 8 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(31);
var IE8_DOM_DEFINE = __webpack_require__(32);
var toPrimitive = __webpack_require__(34);
var dP = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(12);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(38);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(16);
var defined = __webpack_require__(12);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(39);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(0);
var fails = __webpack_require__(2);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencyToSymbol = exports.symbolToFrequency = exports.frequencyToMidi = exports.midiToSymbol = exports.symbolToMidi = exports.midiToFrequency = exports.pitchClasses = exports.DURATIONS = undefined;

var _log = __webpack_require__(57);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(20);

var _freeze2 = _interopRequireDefault(_freeze);

var _ramda = __webpack_require__(10);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Delay = exports.Delay = audioContext => {
	var output = audioContext.createGain();
	var filter = audioContext.createBiquadFilter();
	var delay = audioContext.createDelay();
	var feedback = audioContext.createGain();
	delay.connect(feedback);
	feedback.connect(filter);
	filter.connect(delay);
	filter.type = 'lowpass';
	delay.connect(output);
	var tempo = 120;
	var division = 3;
	delay.delayTime.value = 60 / (tempo * division);

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
			delay.delayTime.value = 60 / (tempo * division);
			return this;
		},
		getTempoValue() {
			return tempo;
		},
		setDivisionValue(value) {
			division = value;
			delay.delayTime.value = 60 / (tempo * division);
			return this;
		},
		getDivisionValue() {
			return division;
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RingModulator = undefined;

var _ramda = __webpack_require__(10);

var RingModulator = exports.RingModulator = audioContext => {
	/* web audio nodes */
	var input = audioContext.createGain();
	var attenuator = audioContext.createGain();
	var channelSplitter = audioContext.createChannelSplitter(2);
	var stereoLeftDelay = audioContext.createDelay();
	var stereoRightDelay = audioContext.createDelay();
	var lfoGain = audioContext.createGain();
	var feedbackLeftToRight = audioContext.createGain();
	var feedbackRightToLeft = audioContext.createGain();
	var feedbackFilter = audioContext.createBiquadFilter();
	var channelMerger = audioContext.createChannelMerger(2);
	var output = audioContext.createGain();
	var real = new Float32Array([0, 0, 1, 0, 1]);
	var imaginary = new Float32Array([0, 1, 0, 0, 0]);
	var lfoWave = audioContext.createPeriodicWave(real, imaginary);

	/* parameters values */
	var delayTimeValue = 0.01;
	var releaseTimeValue = 0.1;
	var outputGainValue = 0.9;
	var frequencyValue = 18000;
	var lfo = void 0;

	/* constant values (caution with your speakers !) */
	var MAX_LFO_HZ_FREQUENCY = 18000;
	var MAX_DELAY_TIME_IN_SECONDS = 1;
	var MAX_LFO_GAIN_IN_DB = 1;

	/* routing */
	input.connect(attenuator);
	attenuator.connect(output);
	attenuator.connect(channelSplitter);
	channelSplitter.connect(stereoLeftDelay, 0);
	channelSplitter.connect(stereoRightDelay, 1);
	stereoLeftDelay.connect(feedbackLeftToRight);
	stereoRightDelay.connect(feedbackRightToLeft);
	feedbackLeftToRight.connect(feedbackFilter);
	feedbackRightToLeft.connect(feedbackFilter);
	feedbackFilter.connect(stereoLeftDelay);
	feedbackFilter.connect(stereoRightDelay);
	feedbackRightToLeft.connect(stereoLeftDelay);
	stereoLeftDelay.connect(channelMerger, 0, 0);
	stereoRightDelay.connect(channelMerger, 0, 1);
	lfoGain.connect(stereoRightDelay.delayTime);
	lfoGain.connect(stereoLeftDelay.delayTime);
	lfoGain.connect(feedbackFilter.frequency);
	channelMerger.connect(output);

	/* setting default values */
	feedbackRightToLeft.gain.value = 0.3;
	feedbackLeftToRight.gain.value = 0.3;
	feedbackFilter.type = 'bandpass';
	feedbackFilter.Q.value = 1000;
	feedbackFilter.gain.value = 1;
	feedbackFilter.frequency.value = 1000;
	stereoLeftDelay.delayTime.value = delayTimeValue;
	stereoRightDelay.delayTime.value = delayTimeValue;
	attenuator.gain.value = 1;
	output.gain.value = 1E-100;

	return {
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		getInput() {
			return input;
		},
		noteOn(time = audioContext.currentTime) {
			lfo = audioContext.createOscillator();
			lfo.connect(lfoGain);
			lfo.frequency.value = frequencyValue;
			lfo.setPeriodicWave(lfoWave);
			lfo.start(time);
			output.gain.linearRampToValueAtTime(outputGainValue, time);
		},
		noteOff(time = audioContext.currentTime) {
			output.gain.linearRampToValueAtTime(0, time + releaseTimeValue);
			lfo.stop(time + releaseTimeValue);
		},
		setRingModulationValue(value) {
			frequencyValue = (0, _ramda.clamp)(0, MAX_LFO_HZ_FREQUENCY, value);
			return this;
		},
		getRingModulationValue() {
			return frequencyValue;
		},
		setDelayTimeValue(value) {
			delayTimeValue = (0, MAX_DELAY_TIME_IN_SECONDS, value);
			stereoRightDelay.delayTime.value = delayTimeValue;
			stereoLeftDelay.delayTime.value = delayTimeValue;
			return this;
		},
		getDelayTimeValue() {
			return delayTimeValue;
		},
		setReleaseTimeValue(value) {
			releaseTimeValue = value;
			return this;
		},
		getReleaseTimeValue() {
			return releaseTimeValue;
		},
		setLfoGainValue(value) {
			lfoGain.gain.value = (0, _ramda.clamp)(0, MAX_LFO_GAIN_IN_DB, value);
			return this;
		},
		getLfoGainValue() {
			return lfoGain.gain.value;
		},
		setOutputGainValue(value) {
			outputGainValue = value;
			return this;
		},
		getOutputGainValue() {
			return outputGainValue;
		}
	};
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DryWetMixer = undefined;

var _assign = __webpack_require__(65);

var _assign2 = _interopRequireDefault(_assign);

var _nodeOutputMixer = __webpack_require__(7);

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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = __webpack_require__(46);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(53);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(60);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_macros).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _macros[key];
    }
  });
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(29);
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
/* 29 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(35);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(2)(function () {
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(8).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(1);
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(13);

__webpack_require__(19)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(40)(false);
var IE_PROTO = __webpack_require__(43)('IE_PROTO');

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
/* 39 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(41);
var toAbsoluteIndex = __webpack_require__(42);
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(17);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(17);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(44)('keys');
var uid = __webpack_require__(18);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dispatcher = __webpack_require__(47);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(52);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(20);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(51);

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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(50).onFreeze;

__webpack_require__(19)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(18)('meta');
var isObject = __webpack_require__(1);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(2)(function () {
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
/* 51 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.unscale = undefined;

var _ramda = __webpack_require__(10);

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
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequencer = __webpack_require__(54);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(21);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sequencer = undefined;

var _workerTimer = __webpack_require__(55);

var _workerTimer2 = _interopRequireDefault(_workerTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequencer = exports.Sequencer = audioContext => {
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
			op(tick, tempo, ticksPerQuarterNote);
			nextTickTime = currentTime + 60 / (tempo * ticksPerQuarterNote);
			if (loop && tick === length) {
				tick = 0;
				onLoop();
			}
		}
	};

	var play = () => {
		schedule(onTick);
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
/* 55 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)))

/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(59);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(4);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys__);




Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kick = __webpack_require__(61);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_kick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _kick[key];
    }
  });
});

var _hat = __webpack_require__(62);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(63);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
    }
  });
});

var _delay = __webpack_require__(22);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _ringModulator = __webpack_require__(23);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_ringModulator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _ringModulator[key];
    }
  });
});

var _cheapSynth = __webpack_require__(64);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_cheapSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _cheapSynth[key];
    }
  });
});

var _dryWetMixer = __webpack_require__(24);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dryWetMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dryWetMixer[key];
    }
  });
});

var _nodeOutputMixer = __webpack_require__(7);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_nodeOutputMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeOutputMixer[key];
    }
  });
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Kick = exports.Kick = audioContext => {
	var output = audioContext.createGain();
	var mainOscGain = audioContext.createGain();
	mainOscGain.connect(output);
	var mainOsc = void 0;
	var initialFrequency = 150;
	var duration = 0.15;
	var on = false;
	var finalFrequency = 0.01;

	output.gain.value = 1E-10;
	mainOscGain.gain.value = 1E-10;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			mainOsc = audioContext.createOscillator();
			mainOsc.type = 'triangle';
			mainOsc.frequency.setValueAtTime(initialFrequency, time);
			mainOscGain.gain.setValueAtTime(velocity, time);
			mainOscGain.gain.exponentialRampToValueAtTime(0.01, time + duration);
			mainOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration);
			mainOsc.start(time);
			mainOsc.stop(time + duration);
			mainOsc.connect(mainOscGain);
			on = true;
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (!on) {
				return;
			}
			mainOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time);
			mainOscGain.gain.exponentialRampToValueAtTime(1E-10, time);
			mainOsc.stop(time);
			on = false;
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
			output.gain.value = value;
			return this;
		},
		getOutputGainValue() {
			return output.gain.value;
		}
	};
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Hat = exports.Hat = audioContext => {
	var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
	var bandpass = audioContext.createBiquadFilter();
	var output = audioContext.createGain();
	var highpass = audioContext.createBiquadFilter();
	var fundamental = 35;
	var duration = 0.25;
	var osc = void 0;

	bandpass.type = 'bandpass';
	bandpass.frequency.value = 10000;

	highpass.type = 'highpass';
	highpass.frequency.value = 7000;

	bandpass.connect(highpass);
	highpass.connect(output);

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			ratios.forEach(ratio => {
				osc = audioContext.createOscillator();
				osc.type = 'square';
				// Frequency is the fundamental * this oscillator's ratio
				osc.frequency.value = fundamental * ratio;
				osc.connect(bandpass);
				osc.start(time);
				osc.stop(time + duration);
			});
			output.gain.setValueAtTime(0.00001, time);
			output.gain.exponentialRampToValueAtTime(velocity, time + 0.02);
			output.gain.exponentialRampToValueAtTime(velocity * 0.3, time + 0.03);
			output.gain.exponentialRampToValueAtTime(0.00001, time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				output.gain.cancelScheduledValues(time);
				osc.stop(time);
			}
		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		setDuration(value) {
			duration = value;
			return this;
		},
		getDuration() {
			return duration;
		}
	};
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Snare = undefined;

var _nodeOutputMixer = __webpack_require__(7);

var Snare = exports.Snare = audioContext => {
	var bufferSize = audioContext.sampleRate;
	var buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	var o = buffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random() * 2 - 1;
	}

	var output = audioContext.createGain();
	var noiseGain = audioContext.createGain();
	var noiseFilter = audioContext.createBiquadFilter();
	var oscGain = audioContext.createGain();
	var nodeMixer = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);

	var osc = void 0;
	var noise = void 0;
	var duration = 0.25;
	var frequency = 80;
	var oscMixValue = -0.2;
	var noiseFilterValue = 1000;

	var real = new Float32Array([0, 0, 1, 0, 1]);
	var imaginary = new Float32Array([0, 1, 0, 0, 0]);
	var customWave = audioContext.createPeriodicWave(real, imaginary);

	noiseFilter.type = 'lowpass';
	noiseFilter.frequency.value = noiseFilterValue;
	noiseFilter.connect(noiseGain);
	nodeMixer.setLeftInput(oscGain);
	nodeMixer.setRightInput(noiseGain);
	nodeMixer.connect({ getInput: () => output });

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator();
			osc.setPeriodicWave(customWave);
			osc.connect(oscGain);
			noise = audioContext.createBufferSource();
			noise.buffer = buffer;
			noise.connect(noiseFilter);
			osc.frequency.setValueAtTime(frequency, time);
			osc.frequency.exponentialRampToValueAtTime(frequency / 2, time + 0.15);
			oscGain.gain.setValueAtTime(0.5 * velocity, time);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15);
			osc.start(time);
			osc.stop(time + 0.15);
			noiseGain.gain.setValueAtTime(0.5 * velocity, time);
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration);
			noise.start(time);
			noise.stop(time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				osc.frequency.cancelScheduledValues(time);
				oscGain.gain.cancelScheduledValues(time);
				noiseGain.gain.cancelScheduledValues(time);
				osc.stop(time);
				noise.stop(time);
			}
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheapSynth = undefined;

var _nodeOutputMixer = __webpack_require__(7);

var _note = __webpack_require__(21);

var _delay = __webpack_require__(22);

var _ringModulator = __webpack_require__(23);

var _dryWetMixer = __webpack_require__(24);

var CheapSynth = exports.CheapSynth = audioContext => {
	var filter = audioContext.createBiquadFilter();
	var oscMix = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);
	var output = audioContext.createGain();
	var subOscGain = audioContext.createGain();
	var mainOscGain = audioContext.createGain();
	var delay = (0, _delay.Delay)(audioContext);
	var chorus = (0, _ringModulator.RingModulator)(audioContext).setRingModulationValue(8000);
	oscMix.setLeftInput(subOscGain);
	oscMix.setRightInput(mainOscGain);
	filter.frequency.value = 800;
	oscMix.connect((0, _dryWetMixer.DryWetMixer)(audioContext).setWetNode(chorus).setFadeValue(-0.05)).connect({ getInput: () => output });
	delay.setTempoValue(120).setDivisionValue(4).setFrequencyValue(400).setFeedbackValue(0.4);
	var mainOsc = void 0;
	var subOsc = void 0;

	output.gain.value = 0.1;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1, midiValue) {
			mainOsc = audioContext.createOscillator();
			mainOsc.type = 'square';
			mainOsc.frequency.setValueAtTime((0, _note.midiToFrequency)(440, midiValue), time);
			mainOscGain.gain.setValueAtTime(0.5 * velocity, time);
			subOsc = audioContext.createOscillator();
			subOsc.type = 'triangle';
			subOsc.frequency.setValueAtTime((0, _note.midiToFrequency)(440, midiValue - 7), time);
			subOscGain.gain.setValueAtTime(0.5 * velocity, time);
			mainOsc.connect(mainOscGain);
			subOsc.connect(subOscGain);
			mainOsc.start(time);
			subOsc.start(time);
			chorus.noteOn(time);
		},
		noteOff(time = audioContext.currentTime) {
			mainOsc.frequency.cancelScheduledValues(time);
			subOsc.frequency.cancelScheduledValues(time);
			subOscGain.gain.cancelScheduledValues(time);
			mainOscGain.gain.cancelScheduledValues(time);
			mainOsc.stop(time);
			subOsc.stop(time);
			chorus.noteOff(time);
		},
		connect({ connect, getInput }) {
			output.connect(getInput());
			return { connect };
		},
		getDelay() {
			return delay;
		}
	};
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(68) });


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(13);
var gOPS = __webpack_require__(69);
var pIE = __webpack_require__(70);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(16);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(2)(function () {
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
/* 69 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 70 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmY3NjJkOGUyZTVlOGNkMTNlNjYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9yaW5nLW1vZHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL21hdGgvbG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZHJ1bXMva2ljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2RydW1zL2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2RydW1zL3NuYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvY2hlYXAtc3ludGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIl0sIm5hbWVzIjpbIk5vZGVPdXRwdXRNaXhlciIsImF1ZGlvQ29udGV4dCIsIm91dHB1dEdhaW5Ob2RlIiwiY3JlYXRlR2FpbiIsImxlZnRHYWluTm9kZSIsInJpZ2h0R2Fpbk5vZGUiLCJNSURETEVfR0FJTl9WQUxVRSIsImZhZGVWYWx1ZSIsImNvbm5lY3QiLCJnYWluIiwidmFsdWUiLCJzZXRGYWRlVmFsdWUiLCJnZXRGYWRlVmFsdWUiLCJzZXRMZWZ0SW5wdXQiLCJhdWRpb05vZGUiLCJzZXRSaWdodElucHV0IiwiZ2V0SW5wdXQiLCJnZXRMZWZ0R2Fpbk5vZGUiLCJnZXRSaWdodEdhaW5Ob2RlIiwiRFVSQVRJT05TIiwiV0hPTEUiLCJIQUxGIiwiUVVBUlRFUiIsIkVJR0hUSCIsInBpdGNoQ2xhc3NlcyIsIm1pZGlUb0ZyZXF1ZW5jeSIsInR1bmluZyIsIm1pZGlWYWx1ZSIsIl8iLCJzeW1ib2xUb01pZGkiLCJwaXRjaENsYXNzIiwib2N0YXZlIiwiaW5kZXhPZiIsIm1pZGlUb1N5bWJvbCIsInBpdGNoQ2xhc3NJbmRleCIsImZyZXF1ZW5jeVRvTWlkaSIsImZyZXF1ZW5jeSIsInN5bWJvbFRvRnJlcXVlbmN5IiwiZnJlcXVlbmN5VG9TeW1ib2wiLCJEZWxheSIsIm91dHB1dCIsImZpbHRlciIsImNyZWF0ZUJpcXVhZEZpbHRlciIsImRlbGF5IiwiY3JlYXRlRGVsYXkiLCJmZWVkYmFjayIsInR5cGUiLCJ0ZW1wbyIsImRpdmlzaW9uIiwiZGVsYXlUaW1lIiwic2V0VGVtcG9WYWx1ZSIsImdldFRlbXBvVmFsdWUiLCJzZXREaXZpc2lvblZhbHVlIiwiZ2V0RGl2aXNpb25WYWx1ZSIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXRGZWVkYmFja1ZhbHVlIiwiZ2V0RmVlZGJhY2tWYWx1ZSIsIlJpbmdNb2R1bGF0b3IiLCJpbnB1dCIsImF0dGVudWF0b3IiLCJjaGFubmVsU3BsaXR0ZXIiLCJjcmVhdGVDaGFubmVsU3BsaXR0ZXIiLCJzdGVyZW9MZWZ0RGVsYXkiLCJzdGVyZW9SaWdodERlbGF5IiwibGZvR2FpbiIsImZlZWRiYWNrTGVmdFRvUmlnaHQiLCJmZWVkYmFja1JpZ2h0VG9MZWZ0IiwiZmVlZGJhY2tGaWx0ZXIiLCJjaGFubmVsTWVyZ2VyIiwiY3JlYXRlQ2hhbm5lbE1lcmdlciIsInJlYWwiLCJGbG9hdDMyQXJyYXkiLCJpbWFnaW5hcnkiLCJsZm9XYXZlIiwiY3JlYXRlUGVyaW9kaWNXYXZlIiwiZGVsYXlUaW1lVmFsdWUiLCJyZWxlYXNlVGltZVZhbHVlIiwib3V0cHV0R2FpblZhbHVlIiwiZnJlcXVlbmN5VmFsdWUiLCJsZm8iLCJNQVhfTEZPX0haX0ZSRVFVRU5DWSIsIk1BWF9ERUxBWV9USU1FX0lOX1NFQ09ORFMiLCJNQVhfTEZPX0dBSU5fSU5fREIiLCJRIiwibm90ZU9uIiwidGltZSIsImN1cnJlbnRUaW1lIiwiY3JlYXRlT3NjaWxsYXRvciIsInNldFBlcmlvZGljV2F2ZSIsInN0YXJ0IiwibGluZWFyUmFtcFRvVmFsdWVBdFRpbWUiLCJub3RlT2ZmIiwic3RvcCIsInNldFJpbmdNb2R1bGF0aW9uVmFsdWUiLCJnZXRSaW5nTW9kdWxhdGlvblZhbHVlIiwic2V0RGVsYXlUaW1lVmFsdWUiLCJnZXREZWxheVRpbWVWYWx1ZSIsInNldFJlbGVhc2VUaW1lVmFsdWUiLCJnZXRSZWxlYXNlVGltZVZhbHVlIiwic2V0TGZvR2FpblZhbHVlIiwiZ2V0TGZvR2FpblZhbHVlIiwic2V0T3V0cHV0R2FpblZhbHVlIiwiZ2V0T3V0cHV0R2FpblZhbHVlIiwiRHJ5V2V0TWl4ZXIiLCJub2RlT3V0cHV0TWl4ZXIiLCJpbnB1dEdhaW5Ob2RlIiwiZHJ5R2Fpbk5vZGUiLCJ3ZXROb2RlIiwic2V0V2V0Tm9kZSIsInNmeE5vZGVPck1hY3JvIiwiZGlzY29ubmVjdCIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwiZGF0YSIsIm5leHQiLCJhcyIsImFjdGlvbiIsIm1hcCIsInVuc2NhbGUiLCJyYW5nZSIsIm1heCIsIm1pbiIsInNjYWxlIiwiU2VxdWVuY2VyIiwidGlja3NQZXJRdWFydGVyTm90ZSIsInN0YXJ0VGltZSIsIm5leHRUaWNrVGltZSIsInRpY2siLCJvblRpY2siLCJvblN0b3AiLCJvblN0YXJ0Iiwib25Mb29wIiwibG9vcCIsImxlbmd0aCIsInRpbWVyIiwic2NoZWR1bGUiLCJvcCIsInBsYXkiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpc1N0YXJ0ZWQiLCJzZXRMb29wTW9kZSIsImdldExvb3BNb2RlIiwic2V0TGVuZ3RoIiwiZ2V0TGVuZ3RoIiwic2V0RGl2aXNpb24iLCJnZXREaXZpc2lvbiIsInNldFRlbXBvIiwiZ2V0VGVtcG8iLCJnZXRUaW1lIiwiS2ljayIsIm1haW5Pc2NHYWluIiwibWFpbk9zYyIsImluaXRpYWxGcmVxdWVuY3kiLCJkdXJhdGlvbiIsIm9uIiwiZmluYWxGcmVxdWVuY3kiLCJ2ZWxvY2l0eSIsInNldFZhbHVlQXRUaW1lIiwiZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSIsInNldER1cmF0aW9uVmFsdWUiLCJnZXREdXJhdGlvblZhbHVlIiwiSGF0IiwicmF0aW9zIiwiYmFuZHBhc3MiLCJoaWdocGFzcyIsImZ1bmRhbWVudGFsIiwib3NjIiwiZm9yRWFjaCIsInJhdGlvIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwic2V0RHVyYXRpb24iLCJnZXREdXJhdGlvbiIsIlNuYXJlIiwiYnVmZmVyU2l6ZSIsInNhbXBsZVJhdGUiLCJidWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJvIiwiZ2V0Q2hhbm5lbERhdGEiLCJpIiwiTWF0aCIsInJhbmRvbSIsIm5vaXNlR2FpbiIsIm5vaXNlRmlsdGVyIiwib3NjR2FpbiIsIm5vZGVNaXhlciIsIm5vaXNlIiwib3NjTWl4VmFsdWUiLCJub2lzZUZpbHRlclZhbHVlIiwiY3VzdG9tV2F2ZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsInNldE9zY01peFZhbHVlIiwiZ2V0T3NjTWl4VmFsdWUiLCJzZXROb2lzZUZpbHRlclZhbHVlIiwiZ2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsIkNoZWFwU3lu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SyxFQUFQO0FBaUNBLENBeERNLEM7Ozs7OztBQ05QLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7Ozs7Ozs7QUNEQTtBQUNBOztBQUVBLDBDQUEwQyxrQ0FBc0M7Ozs7Ozs7O0FDSGhGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxVQUFVLEVBQUU7QUFDaEQsbUJBQW1CLHNDQUFzQztBQUN6RCxDQUFDLHFDQUFxQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQzs7Ozs7OztBQ2pDRDs7Ozs7OztBQ0FBLGNBQWMiLCJmaWxlIjoid2FzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDI1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZjc2MmQ4ZTJlNWU4Y2QxM2U2NiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiB3ZWIgYXVkaW8gbm9kZXMgKi9cblx0Y29uc3Qgb3V0cHV0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGxlZnRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgcmlnaHRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHQvKiBjb25zdGFudCB2YWx1ZXMgKi9cblx0Y29uc3QgTUlERExFX0dBSU5fVkFMVUUgPSAwLjVcblxuXHQvKiBwYXJhbWV0ZXIgdmFsdWVzICovXG5cdGxldCBmYWRlVmFsdWUgPSAwXG5cblx0Lyogcm91dGluZyAqL1xuXHRsZWZ0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0cmlnaHRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFXG5cdHJpZ2h0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFXG5cblx0cmV0dXJuIHtcblx0XHRzZXRGYWRlVmFsdWUodmFsdWUpIHtcblx0XHRcdGZhZGVWYWx1ZSA9IHZhbHVlXG5cdFx0XHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFIC0gKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpXG5cdFx0XHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNSURETEVfR0FJTl9WQUxVRSArICh2YWx1ZSAqIE1JRERMRV9HQUlOX1ZBTFVFKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZhZGVWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmYWRlVmFsdWVcblx0XHR9LFxuXHRcdHNldExlZnRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KGxlZnRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRSaWdodElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QocmlnaHRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0R2Fpbk5vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRMZWZ0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbGVmdEdhaW5Ob2RlXG5cdFx0fSxcblx0XHRnZXRSaWdodEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIHJpZ2h0R2Fpbk5vZGVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlkID0gMDtcbnZhciBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdWlkLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVksIGV4ZWMpIHtcbiAgdmFyIGZuID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldO1xuICB2YXIgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24gKCkgeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJ1xuXG4vKipcbiAqIE5vdGVzIER1cmF0aW9ucyBDb25zdGFudHNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBEVVJBVElPTlMgPSBPYmplY3QuZnJlZXplKHtcblx0V0hPTEU6IDEsXG5cdEhBTEY6IDEgLyAyLFxuXHRRVUFSVEVSOiAxIC8gNCxcblx0RUlHSFRIOiAxIC8gOCxcbn0pXG5cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgbWlkaVRvRnJlcXVlbmN5ID0gKHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3Qgc3ltYm9sVG9NaWRpID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0KChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcGl0Y2ggY2xhc3MgYW5kIG9jdGF2ZSBmb3IgdGhlIGdpdmVuIG1pZGkgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pZGlUb1N5bWJvbCA9IChtaWRpVmFsdWUpID0+IHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9NaWRpID0gKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSA9PiB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbFRvRnJlcXVlbmN5ID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0bWlkaVRvRnJlcXVlbmN5KDQ0MCwgc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkpXG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG5vdGUgYW5kIG9jdGF2ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIGZyZXF1ZW5jeVxuICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9TeW1ib2wgPSBmcmVxdWVuY3kgPT4gbWlkaVRvU3ltYm9sKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIGZyZXF1ZW5jeSkpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9ub3RlLmpzIiwiZXhwb3J0IGNvbnN0IERlbGF5ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBkZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSgpXG5cdGNvbnN0IGZlZWRiYWNrID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRkZWxheS5jb25uZWN0KGZlZWRiYWNrKVxuXHRmZWVkYmFjay5jb25uZWN0KGZpbHRlcilcblx0ZmlsdGVyLmNvbm5lY3QoZGVsYXkpXG5cdGZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG5cdGRlbGF5LmNvbm5lY3Qob3V0cHV0KVxuXHRsZXQgdGVtcG8gPSAxMjBcblx0bGV0IGRpdmlzaW9uID0gM1xuXHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSA2MCAvICh0ZW1wbyAqIGRpdmlzaW9uKVxuXG5cdHJldHVybiB7XG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5XG5cdFx0fSxcblx0XHRzZXRUZW1wb1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSA2MCAvICh0ZW1wbyAqIGRpdmlzaW9uKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdHNldERpdmlzaW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGRpdmlzaW9uID0gdmFsdWVcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IDYwIC8gKHRlbXBvICogZGl2aXNpb24pXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkaXZpc2lvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZpbHRlci5mcmVxdWVuY3kudmFsdWVcblx0XHR9LFxuXHRcdHNldEZlZWRiYWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGZlZWRiYWNrLmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZlZWRiYWNrVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmVlZGJhY2suZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsImltcG9ydCB7IGNsYW1wIH0gZnJvbSAncmFtZGEnXG5cbmV4cG9ydCBjb25zdCBSaW5nTW9kdWxhdG9yID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiB3ZWIgYXVkaW8gbm9kZXMgKi9cblx0Y29uc3QgaW5wdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGF0dGVudWF0b3IgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGNoYW5uZWxTcGxpdHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVDaGFubmVsU3BsaXR0ZXIoMilcblx0Y29uc3Qgc3RlcmVvTGVmdERlbGF5ID0gYXVkaW9Db250ZXh0LmNyZWF0ZURlbGF5KClcblx0Y29uc3Qgc3RlcmVvUmlnaHREZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSgpXG5cdGNvbnN0IGxmb0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZlZWRiYWNrTGVmdFRvUmlnaHQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZlZWRiYWNrUmlnaHRUb0xlZnQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZlZWRiYWNrRmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGNoYW5uZWxNZXJnZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQ2hhbm5lbE1lcmdlcigyKVxuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IHJlYWwgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAxXSlcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pXG5cdGNvbnN0IGxmb1dhdmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHJlYWwsIGltYWdpbmFyeSlcblxuXHQvKiBwYXJhbWV0ZXJzIHZhbHVlcyAqL1xuXHRsZXQgZGVsYXlUaW1lVmFsdWUgPSAwLjAxXG5cdGxldCByZWxlYXNlVGltZVZhbHVlID0gMC4xXG5cdGxldCBvdXRwdXRHYWluVmFsdWUgPSAwLjlcblx0bGV0IGZyZXF1ZW5jeVZhbHVlID0gMTgwMDBcblx0bGV0IGxmb1xuXG5cdC8qIGNvbnN0YW50IHZhbHVlcyAoY2F1dGlvbiB3aXRoIHlvdXIgc3BlYWtlcnMgISkgKi9cblx0Y29uc3QgTUFYX0xGT19IWl9GUkVRVUVOQ1kgPSAxODAwMFxuXHRjb25zdCBNQVhfREVMQVlfVElNRV9JTl9TRUNPTkRTID0gMVxuXHRjb25zdCBNQVhfTEZPX0dBSU5fSU5fREIgPSAxXG5cblx0Lyogcm91dGluZyAqL1xuXHRpbnB1dC5jb25uZWN0KGF0dGVudWF0b3IpXG5cdGF0dGVudWF0b3IuY29ubmVjdChvdXRwdXQpXG5cdGF0dGVudWF0b3IuY29ubmVjdChjaGFubmVsU3BsaXR0ZXIpXG5cdGNoYW5uZWxTcGxpdHRlci5jb25uZWN0KHN0ZXJlb0xlZnREZWxheSwgMClcblx0Y2hhbm5lbFNwbGl0dGVyLmNvbm5lY3Qoc3RlcmVvUmlnaHREZWxheSwgMSlcblx0c3RlcmVvTGVmdERlbGF5LmNvbm5lY3QoZmVlZGJhY2tMZWZ0VG9SaWdodClcblx0c3RlcmVvUmlnaHREZWxheS5jb25uZWN0KGZlZWRiYWNrUmlnaHRUb0xlZnQpXG5cdGZlZWRiYWNrTGVmdFRvUmlnaHQuY29ubmVjdChmZWVkYmFja0ZpbHRlcilcblx0ZmVlZGJhY2tSaWdodFRvTGVmdC5jb25uZWN0KGZlZWRiYWNrRmlsdGVyKVxuXHRmZWVkYmFja0ZpbHRlci5jb25uZWN0KHN0ZXJlb0xlZnREZWxheSlcblx0ZmVlZGJhY2tGaWx0ZXIuY29ubmVjdChzdGVyZW9SaWdodERlbGF5KVxuXHRmZWVkYmFja1JpZ2h0VG9MZWZ0LmNvbm5lY3Qoc3RlcmVvTGVmdERlbGF5KVxuXHRzdGVyZW9MZWZ0RGVsYXkuY29ubmVjdChjaGFubmVsTWVyZ2VyLCAwLCAwKVxuXHRzdGVyZW9SaWdodERlbGF5LmNvbm5lY3QoY2hhbm5lbE1lcmdlciwgMCwgMSlcblx0bGZvR2Fpbi5jb25uZWN0KHN0ZXJlb1JpZ2h0RGVsYXkuZGVsYXlUaW1lKVxuXHRsZm9HYWluLmNvbm5lY3Qoc3RlcmVvTGVmdERlbGF5LmRlbGF5VGltZSlcblx0bGZvR2Fpbi5jb25uZWN0KGZlZWRiYWNrRmlsdGVyLmZyZXF1ZW5jeSlcblx0Y2hhbm5lbE1lcmdlci5jb25uZWN0KG91dHB1dClcblxuXHQvKiBzZXR0aW5nIGRlZmF1bHQgdmFsdWVzICovXG5cdGZlZWRiYWNrUmlnaHRUb0xlZnQuZ2Fpbi52YWx1ZSA9IDAuM1xuXHRmZWVkYmFja0xlZnRUb1JpZ2h0LmdhaW4udmFsdWUgPSAwLjNcblx0ZmVlZGJhY2tGaWx0ZXIudHlwZSA9ICdiYW5kcGFzcydcblx0ZmVlZGJhY2tGaWx0ZXIuUS52YWx1ZSA9IDEwMDBcblx0ZmVlZGJhY2tGaWx0ZXIuZ2Fpbi52YWx1ZSA9IDFcblx0ZmVlZGJhY2tGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gMTAwMFxuXHRzdGVyZW9MZWZ0RGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lVmFsdWVcblx0c3RlcmVvUmlnaHREZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVWYWx1ZVxuXHRhdHRlbnVhdG9yLmdhaW4udmFsdWUgPSAxXG5cdG91dHB1dC5nYWluLnZhbHVlID0gMUUtMTAwXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRcblx0XHR9LFxuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRsZm8gPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdFx0XHRsZm8uY29ubmVjdChsZm9HYWluKVxuXHRcdFx0bGZvLmZyZXF1ZW5jeS52YWx1ZSA9IGZyZXF1ZW5jeVZhbHVlXG5cdFx0XHRsZm8uc2V0UGVyaW9kaWNXYXZlKGxmb1dhdmUpXG5cdFx0XHRsZm8uc3RhcnQodGltZSlcblx0XHRcdG91dHB1dC5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKG91dHB1dEdhaW5WYWx1ZSwgdGltZSlcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgdGltZSArIHJlbGVhc2VUaW1lVmFsdWUpXG5cdFx0XHRsZm8uc3RvcCh0aW1lICsgcmVsZWFzZVRpbWVWYWx1ZSlcblx0XHR9LFxuXHRcdHNldFJpbmdNb2R1bGF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeVZhbHVlID0gY2xhbXAoMCwgTUFYX0xGT19IWl9GUkVRVUVOQ1ksIHZhbHVlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFJpbmdNb2R1bGF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5VmFsdWVcblx0XHR9LFxuXHRcdHNldERlbGF5VGltZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkZWxheVRpbWVWYWx1ZSA9ICgwLCBNQVhfREVMQVlfVElNRV9JTl9TRUNPTkRTLCB2YWx1ZSlcblx0XHRcdHN0ZXJlb1JpZ2h0RGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lVmFsdWVcblx0XHRcdHN0ZXJlb0xlZnREZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVWYWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERlbGF5VGltZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRlbGF5VGltZVZhbHVlXG5cdFx0fSxcblx0XHRzZXRSZWxlYXNlVGltZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRyZWxlYXNlVGltZVZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRSZWxlYXNlVGltZVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHJlbGVhc2VUaW1lVmFsdWVcblx0XHR9LFxuXHRcdHNldExmb0dhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bGZvR2Fpbi5nYWluLnZhbHVlID0gY2xhbXAoMCwgTUFYX0xGT19HQUlOX0lOX0RCLCB2YWx1ZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMZm9HYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gbGZvR2Fpbi5nYWluLnZhbHVlXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dEdhaW5WYWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dEdhaW5WYWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9yaW5nLW1vZHVsYXRvci5qcyIsImltcG9ydCB7IE5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4vbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBEcnlXZXRNaXhlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblxuXHRjb25zdCBub2RlT3V0cHV0TWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBkcnlHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRsZXQgd2V0Tm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRMZWZ0SW5wdXQoZHJ5R2Fpbk5vZGUpXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRSaWdodElucHV0KHdldE5vZGUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24obm9kZU91dHB1dE1peGVyLCB7XG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRHYWluTm9kZVxuXHRcdH0sXG5cdFx0c2V0V2V0Tm9kZShzZnhOb2RlT3JNYWNybykge1xuXHRcdFx0d2V0Tm9kZSA9IHNmeE5vZGVPck1hY3JvLmdldElucHV0ID8gc2Z4Tm9kZU9yTWFjcm8uZ2V0SW5wdXQoKSA6IHNmeE5vZGVPck1hY3JvXG5cdFx0XHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXHRcdFx0aW5wdXRHYWluTm9kZS5kaXNjb25uZWN0KClcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdChkcnlHYWluTm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9XG5cdH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJ1xuZXhwb3J0ICogZnJvbSAnLi9tYWNyb3MnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2Rpc3BhdGNoZXInXG5leHBvcnQgKiBmcm9tICcuL3JhbmdlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJ1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVFx0OiAwLFxuXHRTRVFVRU5DRVJfU1RPUFx0OiAxLFxuXHRTRVFVRU5DRVJfVElDS1x0OiAyLFxuXHRURU1QT19DSEFOR0VcdDogMyxcblx0Q0hBTkdFOiA5OTksXG59KVxuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9ICgoKSA9PiB7XG5cdGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpXG5cdHJldHVybiB7XG5cdFx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdFx0c3ViamVjdC5uZXh0KHsgdHlwZSwgZGF0YSB9KVxuXHRcdH0sXG5cdFx0YXModHlwZSkge1xuXHRcdFx0cmV0dXJuIHN1YmplY3Rcblx0XHRcdFx0LmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG5cdFx0XHRcdC5tYXAoYWN0aW9uID0+IGFjdGlvbi5kYXRhKVxuXHRcdH0sXG5cdH1cbn0pKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbiAoJGZyZWV6ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBVbm5vcm1hbGl6ZXMgYSBbMC0xXSByYW5nZSB2YWx1ZSBiYWNrIHRvIHRoZSBnaXZlbiByYW5nZVxuICogQHBhcmFtIHtPYmplY3R9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNjYWxlID0gKHJhbmdlLCB2YWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pblxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdmFsdWUgdG8gYSBbMCwxXSByYW5nZSBnaXZlbiBpdHMgb3JpZ2luYWwgcmFuZ2UubWluIGFuZCByYW5nZS5tYXhcbiAqIEBwYXJhbSB7T2JqZWN0fSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICovXG5leHBvcnQgY29uc3Qgc2NhbGUgPSAocmFuZ2UsIHZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKHZhbHVlIC0gcmFuZ2UubWluKSAvIChyYW5nZS5tYXggLSByYW5nZS5taW4pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5cbmV4cG9ydCBjb25zdCBTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCB0aWNrc1BlclF1YXJ0ZXJOb3RlID0gNFxuXHRsZXQgc3RhcnRUaW1lID0gMFxuXHRsZXQgbmV4dFRpY2tUaW1lID0gMFxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSBuZXh0VGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0b3AodGljaywgdGVtcG8sIHRpY2tzUGVyUXVhcnRlck5vdGUpXG5cdFx0XHRuZXh0VGlja1RpbWUgPSBjdXJyZW50VGltZSArICg2MCAvICh0ZW1wbyAqIHRpY2tzUGVyUXVhcnRlck5vdGUpKVxuXHRcdFx0aWYgKGxvb3AgJiYgdGljayA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRcdHRpY2sgPSAwXG5cdFx0XHRcdG9uTG9vcCgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcGxheSA9ICgpID0+IHtcblx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0fSwgMClcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KClcblx0XHRcdHN0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuXHRcdFx0c3RvcCA9IGZhbHNlXG5cdFx0XHRwbGF5KClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzdG9wKCkge1xuXHRcdFx0V29ya2VyVGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lcilcblx0XHRcdHN0b3AgPSB0cnVlXG5cdFx0XHRuZXh0VGlja1RpbWUgPSAwXG5cdFx0XHR0aWNrID0gMFxuXHRcdFx0b25TdG9wKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRpc1N0YXJ0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gIXN0b3Bcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMb29wTW9kZSgpIHtcblx0XHRcdHJldHVybiBsb29wXG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVuZ3RoKCkge1xuXHRcdFx0cmV0dXJuIGxlbmd0aFxuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdHRpY2tzUGVyUXVhcnRlck5vdGUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uKCkge1xuXHRcdFx0cmV0dXJuIHRpY2tzUGVyUXVhcnRlck5vdGVcblx0XHR9LFxuXHRcdHNldFRlbXBvKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG8oKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdGdldFRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lXG5cdFx0fSxcblx0XHRvblN0YXJ0KG9wKSB7XG5cdFx0XHRvblN0YXJ0ID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblN0b3Aob3ApIHtcblx0XHRcdG9uU3RvcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25UaWNrKG9wKSB7XG5cdFx0XHRvblRpY2sgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uTG9vcChvcCkge1xuXHRcdFx0b25Mb29wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChnbG9iYWwgPT09IGdsb2JhbC53aW5kb3cgJiYgZ2xvYmFsLlVSTCAmJiBnbG9iYWwuQmxvYiAmJiBnbG9iYWwuV29ya2VyKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBUSU1FUl9XT1JLRVJfU09VUkNFID0gW1xuICAgICAgXCJ2YXIgdGltZXJJZHMgPSB7fSwgXyA9IHt9O1wiLFxuICAgICAgXCJfLnNldEludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhckludGVydmFsKHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLnNldFRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhclRpbWVvdXQodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsgX1tlLmRhdGEudHlwZV0oZS5kYXRhKSB9O1wiXG4gICAgXS5qb2luKFwiXCIpO1xuXG4gICAgdmFyIF90aW1lcklkID0gMDtcbiAgICB2YXIgX2NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciBfdGltZXIgPSBuZXcgZ2xvYmFsLldvcmtlcihnbG9iYWwuVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICAgIG5ldyBnbG9iYWwuQmxvYihbIFRJTUVSX1dPUktFUl9TT1VSQ0UgXSwgeyB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiIH0pXG4gICAgKSk7XG5cbiAgICBfdGltZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKF9jYWxsYmFja3NbZS5kYXRhXSkge1xuICAgICAgICBfY2FsbGJhY2tzW2UuZGF0YV0uY2FsbGJhY2suYXBwbHkobnVsbCwgX2NhbGxiYWNrc1tlLmRhdGFdLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRJbnRlcnZhbFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFRpbWVvdXRcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFySW50ZXJ2YWxcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJUaW1lb3V0XCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYubWF0aC5sb2cyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5NYXRoLmxvZzI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCkge1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vZHJ1bXMva2ljaydcbmV4cG9ydCAqIGZyb20gJy4vZHJ1bXMvaGF0J1xuZXhwb3J0ICogZnJvbSAnLi9kcnVtcy9zbmFyZSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9kZWxheSdcbmV4cG9ydCAqIGZyb20gJy4vZWZmZWN0cy9yaW5nLW1vZHVsYXRvcidcbmV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMvY2hlYXAtc3ludGgnXG5leHBvcnQgKiBmcm9tICcuL3JvdXRpbmcvZHJ5LXdldC1taXhlcidcbmV4cG9ydCAqIGZyb20gJy4vcm91dGluZy9ub2RlLW91dHB1dC1taXhlcidcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEtpY2sgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbWFpbk9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdG1haW5Pc2NHYWluLmNvbm5lY3Qob3V0cHV0KVxuXHRsZXQgbWFpbk9zY1xuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDE1MFxuXHRsZXQgZHVyYXRpb24gPSAwLjE1XG5cdGxldCBvbiA9IGZhbHNlXG5cdGNvbnN0IGZpbmFsRnJlcXVlbmN5ID0gMC4wMVxuXG5cdG91dHB1dC5nYWluLnZhbHVlID0gMUUtMTBcblx0bWFpbk9zY0dhaW4uZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgdmVsb2NpdHkgPSAxKSB7XG5cdFx0XHRtYWluT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0bWFpbk9zYy50eXBlID0gJ3RyaWFuZ2xlJ1xuXHRcdFx0bWFpbk9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoaW5pdGlhbEZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG1haW5Pc2NHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUodmVsb2NpdHksIHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0bWFpbk9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXF1ZW5jeSwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0bWFpbk9zYy5zdGFydCh0aW1lKVxuXHRcdFx0bWFpbk9zYy5zdG9wKHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG1haW5Pc2MuY29ubmVjdChtYWluT3NjR2Fpbilcblx0XHRcdG9uID0gdHJ1ZVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdGlmICghb24pIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcXVlbmN5LCB0aW1lKVxuXHRcdFx0bWFpbk9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lKVxuXHRcdFx0bWFpbk9zYy5zdG9wKHRpbWUpXG5cdFx0XHRvbiA9IGZhbHNlXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGluaXRpYWxGcmVxdWVuY3kgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGluaXRpYWxGcmVxdWVuY3lcblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGR1cmF0aW9uXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2RydW1zL2tpY2suanMiLCJleHBvcnQgY29uc3QgSGF0ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCByYXRpb3MgPSBbMiwgMywgNC4xNiwgNS40MywgNi43OSwgOC4yMV1cblx0Y29uc3QgYmFuZHBhc3MgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBoaWdocGFzcyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBmdW5kYW1lbnRhbCA9IDM1XG5cdGxldCBkdXJhdGlvbiA9IDAuMjVcblx0bGV0IG9zY1xuXG5cdGJhbmRwYXNzLnR5cGUgPSAnYmFuZHBhc3MnXG5cdGJhbmRwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDEwMDAwXG5cblx0aGlnaHBhc3MudHlwZSA9ICdoaWdocGFzcydcblx0aGlnaHBhc3MuZnJlcXVlbmN5LnZhbHVlID0gNzAwMFxuXG5cdGJhbmRwYXNzLmNvbm5lY3QoaGlnaHBhc3MpXG5cdGhpZ2hwYXNzLmNvbm5lY3Qob3V0cHV0KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0cmF0aW9zLmZvckVhY2goKHJhdGlvKSA9PiB7XG5cdFx0XHRcdG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdFx0b3NjLnR5cGUgPSAnc3F1YXJlJ1xuXHRcdFx0XHQvLyBGcmVxdWVuY3kgaXMgdGhlIGZ1bmRhbWVudGFsICogdGhpcyBvc2NpbGxhdG9yJ3MgcmF0aW9cblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZ1bmRhbWVudGFsICogcmF0aW9cblx0XHRcdFx0b3NjLmNvbm5lY3QoYmFuZHBhc3MpXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0XHR9KVxuXHRcdFx0b3V0cHV0LmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDAwMSwgdGltZSlcblx0XHRcdG91dHB1dC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUodmVsb2NpdHksIHRpbWUgKyAwLjAyKVxuXHRcdFx0b3V0cHV0LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSh2ZWxvY2l0eSAqIDAuMywgdGltZSArIDAuMDMpXG5cdFx0XHRvdXRwdXQuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAwMDEsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRpZiAob3NjKSB7XG5cdFx0XHRcdG91dHB1dC5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb24oKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2RydW1zL2hhdC5qcyIsImltcG9ydCB7IE5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4uL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBTbmFyZSA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXG5cdGxldCBvc2Ncblx0bGV0IG5vaXNlXG5cdGxldCBkdXJhdGlvbiA9IDAuMjVcblx0bGV0IGZyZXF1ZW5jeSA9IDgwXG5cdGxldCBvc2NNaXhWYWx1ZSA9IC0wLjJcblx0bGV0IG5vaXNlRmlsdGVyVmFsdWUgPSAxMDAwXG5cblx0Y29uc3QgcmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDFdKVxuXHRjb25zdCBpbWFnaW5hcnkgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCAwLCAwXSlcblx0Y29uc3QgY3VzdG9tV2F2ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUocmVhbCwgaW1hZ2luYXJ5KVxuXG5cdG5vaXNlRmlsdGVyLnR5cGUgPSAnbG93cGFzcydcblx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRub2lzZUZpbHRlci5jb25uZWN0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLnNldExlZnRJbnB1dChvc2NHYWluKVxuXHRub2RlTWl4ZXIuc2V0UmlnaHRJbnB1dChub2lzZUdhaW4pXG5cdG5vZGVNaXhlci5jb25uZWN0KHsgZ2V0SW5wdXQ6ICgpID0+IG91dHB1dCB9KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0b3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKVxuXHRcdFx0b3NjLmNvbm5lY3Qob3NjR2Fpbilcblx0XHRcdG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cdFx0XHRub2lzZS5idWZmZXIgPSBidWZmZXJcblx0XHRcdG5vaXNlLmNvbm5lY3Qobm9pc2VGaWx0ZXIpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmcmVxdWVuY3kgLyAyLCB0aW1lICsgMC4xNSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0b3NjLnN0b3AodGltZSArIDAuMTUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG5vaXNlLnN0YXJ0KHRpbWUpXG5cdFx0XHRub2lzZS5zdG9wKHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRpZiAob3NjKSB7XG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0bm9pc2VHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUpXG5cdFx0XHRcdG5vaXNlLnN0b3AodGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXRPc2NNaXhWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3NjTWl4VmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9kZU1peGVyLnNldEZhZGVWYWx1ZShvc2NNaXhWYWx1ZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPc2NNaXhWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvc2NNaXhWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0Tm9pc2VGaWx0ZXJWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0bm9pc2VGaWx0ZXJWYWx1ZSA9IHZhbHVlXG5cdFx0XHRub2lzZUZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE5vaXNlRmlsdGVyVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9kcnVtcy9zbmFyZS5qcyIsImltcG9ydCB7IE5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4uL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5pbXBvcnQgeyBtaWRpVG9GcmVxdWVuY3kgfSBmcm9tICcuLi8uLi9jb3JlL25vdGUnXG5pbXBvcnQgeyBEZWxheSB9IGZyb20gJy4uL2VmZmVjdHMvZGVsYXknXG5pbXBvcnQgeyBSaW5nTW9kdWxhdG9yIH0gZnJvbSAnLi4vZWZmZWN0cy9yaW5nLW1vZHVsYXRvcidcbmltcG9ydCB7IERyeVdldE1peGVyIH0gZnJvbSAnLi4vcm91dGluZy9kcnktd2V0LW1peGVyJ1xuXG5leHBvcnQgY29uc3QgQ2hlYXBTeW50aCA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zY01peCA9IE5vZGVPdXRwdXRNaXhlcihhdWRpb0NvbnRleHQpXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgc3ViT3NjR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbWFpbk9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGRlbGF5ID0gRGVsYXkoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBjaG9ydXMgPSBSaW5nTW9kdWxhdG9yKGF1ZGlvQ29udGV4dCkuc2V0UmluZ01vZHVsYXRpb25WYWx1ZSg4MDAwKVxuXHRvc2NNaXguc2V0TGVmdElucHV0KHN1Yk9zY0dhaW4pXG5cdG9zY01peC5zZXRSaWdodElucHV0KG1haW5Pc2NHYWluKVxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gODAwXG5cdG9zY01peFxuXHRcdC5jb25uZWN0KERyeVdldE1peGVyKGF1ZGlvQ29udGV4dCkuc2V0V2V0Tm9kZShjaG9ydXMpLnNldEZhZGVWYWx1ZSgtMC4wNSkpXG5cdFx0LmNvbm5lY3QoeyBnZXRJbnB1dDogKCkgPT4gb3V0cHV0IH0pXG5cdGRlbGF5LnNldFRlbXBvVmFsdWUoMTIwKVxuXHRcdC5zZXREaXZpc2lvblZhbHVlKDQpXG5cdFx0LnNldEZyZXF1ZW5jeVZhbHVlKDQwMClcblx0XHQuc2V0RmVlZGJhY2tWYWx1ZSgwLjQpXG5cdGxldCBtYWluT3NjXG5cdGxldCBzdWJPc2NcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDAuMVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSwgbWlkaVZhbHVlKSB7XG5cdFx0XHRtYWluT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0bWFpbk9zYy50eXBlID0gJ3NxdWFyZSdcblx0XHRcdG1haW5Pc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKG1pZGlUb0ZyZXF1ZW5jeSg0NDAsIG1pZGlWYWx1ZSksIHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0c3ViT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0c3ViT3NjLnR5cGUgPSAndHJpYW5nbGUnXG5cdFx0XHRzdWJPc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKG1pZGlUb0ZyZXF1ZW5jeSg0NDAsIG1pZGlWYWx1ZSAtIDcpLCB0aW1lKVxuXHRcdFx0c3ViT3NjR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0bWFpbk9zYy5jb25uZWN0KG1haW5Pc2NHYWluKVxuXHRcdFx0c3ViT3NjLmNvbm5lY3Qoc3ViT3NjR2Fpbilcblx0XHRcdG1haW5Pc2Muc3RhcnQodGltZSlcblx0XHRcdHN1Yk9zYy5zdGFydCh0aW1lKVxuXHRcdFx0Y2hvcnVzLm5vdGVPbih0aW1lKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdHN1Yk9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRzdWJPc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bWFpbk9zYy5zdG9wKHRpbWUpXG5cdFx0XHRzdWJPc2Muc3RvcCh0aW1lKVxuXHRcdFx0Y2hvcnVzLm5vdGVPZmYodGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXREZWxheSgpIHtcblx0XHRcdHJldHVybiBkZWxheVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvY2hlYXAtc3ludGguanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==