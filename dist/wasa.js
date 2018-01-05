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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
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

module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var core = __webpack_require__(0);
var ctx = __webpack_require__(26);
var hide = __webpack_require__(28);
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

module.exports = { "default": __webpack_require__(34), __esModule: true };

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

var anObject = __webpack_require__(29);
var IE8_DOM_DEFINE = __webpack_require__(30);
var toPrimitive = __webpack_require__(32);
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
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(11);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(36);
var enumBugKeys = __webpack_require__(43);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(15);
var defined = __webpack_require__(11);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(37);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(46), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencyToSymbol = exports.symbolToFrequency = exports.frequencyToMidi = exports.midiToSymbol = exports.symbolToMidi = exports.midiToFrequency = exports.pitchClasses = exports.DURATIONS = undefined;

var _log = __webpack_require__(55);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(19);

var _freeze2 = _interopRequireDefault(_freeze);

var _ramda = __webpack_require__(20);

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
	/* audio nodes */
	var output = audioContext.createGain();
	var filter = audioContext.createBiquadFilter();
	var delay = audioContext.createDelay(5.0);
	var feedback = audioContext.createGain();
	/* routing */
	delay.connect(feedback);
	feedback.connect(filter);
	filter.connect(delay);
	filter.type = 'lowpass';
	delay.connect(output);
	/* parameters */
	var tempo = 120;
	var division = 3;
	/* convert beat division to delay time in seconds */
	var divisionToDelayTime = (division, tempo) => 60 / (tempo * division);
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
/* 23 */
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

var _common = __webpack_require__(44);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(51);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(58);

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(5), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
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
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(33);
module.exports = __webpack_require__(5) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(2)(function () {
  return Object.defineProperty(__webpack_require__(31)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(8).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(35);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(10);
var $keys = __webpack_require__(12);

__webpack_require__(18)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(13);
var toIObject = __webpack_require__(14);
var arrayIndexOf = __webpack_require__(38)(false);
var IE_PROTO = __webpack_require__(41)('IE_PROTO');

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
/* 37 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(14);
var toLength = __webpack_require__(39);
var toAbsoluteIndex = __webpack_require__(40);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(16);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(16);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(42)('keys');
var uid = __webpack_require__(17);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(8);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 44 */
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

var _dispatcher = __webpack_require__(45);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(50);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(19);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(49);

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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(48).onFreeze;

__webpack_require__(18)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(17)('meta');
var isObject = __webpack_require__(1);
var has = __webpack_require__(13);
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
/* 49 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.unscale = undefined;

var _ramda = __webpack_require__(20);

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
/* 51 */
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

var _sequencer = __webpack_require__(52);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sequencer = undefined;

var _workerTimer = __webpack_require__(53);

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
			nextTickTime = currentTime + 60 / (tempo * ticksPerQuarterNote);
			op(tick, tempo, ticksPerQuarterNote, nextTickTime);
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
/* 53 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)))

/***/ }),
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(56), __esModule: true };

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(57);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(4);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 58 */
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

var _kick = __webpack_require__(59);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_kick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _kick[key];
    }
  });
});

var _hat = __webpack_require__(60);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(61);

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

var _distortion = __webpack_require__(62);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_distortion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _distortion[key];
    }
  });
});

var _cheapSynth = __webpack_require__(63);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_cheapSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _cheapSynth[key];
    }
  });
});

var _dryWetMixer = __webpack_require__(64);

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
/* 59 */
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
	var muted = false;
	var outputGainValue = 1E-10;
	var finalFrequency = 0.01;

	output.gain.value = outputGainValue;
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
			outputGainValue = value;
			if (!muted) {
				output.gain.value = outputGainValue;
			}
			return this;
		},
		getOutputGainValue() {
			return outputGainValue;
		},
		mute() {
			muted = true;
			output.gain.value = 1E-10;
		},
		unMute() {
			output.gain.value = outputGainValue;
			muted = false;
		}
	};
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Hat = exports.Hat = audioContext => {
	var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];
	var bandpass = audioContext.createBiquadFilter();
	var gate = audioContext.createGain();
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
	highpass.connect(gate);
	gate.connect(output);

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
			gate.gain.setValueAtTime(0.00001, time);
			gate.gain.exponentialRampToValueAtTime(velocity, time + 0.02);
			gate.gain.exponentialRampToValueAtTime(velocity * 0.3, time + 0.03);
			gate.gain.exponentialRampToValueAtTime(0.00001, time + duration);
		},
		noteOff(time = audioContext.currentTime + duration) {
			if (osc) {
				gate.gain.cancelScheduledValues(time);
				osc.stop(time);
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Distortion = exports.Distortion = audioContext => {
	var dist = audioContext.createWaveShaper();
	dist.curve = makeDistortionCurve(50);
	dist.oversample = '2x';
	function makeDistortionCurve(amount) {
		var k = typeof amount === 'number' ? amount : 50;
		var nSamples = 44100;
		var curve = new Float32Array(44100);
		var deg = Math.PI / 180;
		for (var i = 0; i < nSamples; ++i) {
			var x = i * 2 / nSamples - 1;
			curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
		}
		return curve;
	}
	return {
		connect({ connect, getInput }) {
			dist.connect(getInput());
			return connect;
		},
		getInput() {
			return dist;
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
exports.CheapSynth = undefined;

var _nodeOutputMixer = __webpack_require__(7);

var _note = __webpack_require__(21);

var _delay = __webpack_require__(22);

var CheapSynth = exports.CheapSynth = audioContext => {
	var filter = audioContext.createBiquadFilter();
	var oscMix = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);
	var output = audioContext.createGain();
	var subOscGain = audioContext.createGain();
	var mainOscGain = audioContext.createGain();
	var delay = (0, _delay.Delay)(audioContext);
	oscMix.setLeftInput(subOscGain);
	oscMix.setRightInput(mainOscGain);
	filter.frequency.value = 800;
	oscMix.connect({ getInput: () => output });
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
/* 64 */
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
var getKeys = __webpack_require__(12);
var gOPS = __webpack_require__(69);
var pIE = __webpack_require__(70);
var toObject = __webpack_require__(10);
var IObject = __webpack_require__(15);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWQ4YTk0MGNiY2U0ZTMzN2EyYWYiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2RlbGF5LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYubWF0aC5sb2cyLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9kcnVtcy9raWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZHJ1bXMvaGF0LmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZHJ1bXMvc25hcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbnN0cnVtZW50cy9jaGVhcC1zeW50aC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvZHJ5LXdldC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiXSwibmFtZXMiOlsiTm9kZU91dHB1dE1peGVyIiwiYXVkaW9Db250ZXh0Iiwib3V0cHV0R2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwibGVmdEdhaW5Ob2RlIiwicmlnaHRHYWluTm9kZSIsIk1JRERMRV9HQUlOX1ZBTFVFIiwiZmFkZVZhbHVlIiwiY29ubmVjdCIsImdhaW4iLCJ2YWx1ZSIsInNldEZhZGVWYWx1ZSIsImdldEZhZGVWYWx1ZSIsInNldExlZnRJbnB1dCIsImF1ZGlvTm9kZSIsInNldFJpZ2h0SW5wdXQiLCJnZXRJbnB1dCIsImdldExlZnRHYWluTm9kZSIsImdldFJpZ2h0R2Fpbk5vZGUiLCJEVVJBVElPTlMiLCJXSE9MRSIsIkhBTEYiLCJRVUFSVEVSIiwiRUlHSFRIIiwicGl0Y2hDbGFzc2VzIiwibWlkaVRvRnJlcXVlbmN5IiwidHVuaW5nIiwibWlkaVZhbHVlIiwiXyIsInN5bWJvbFRvTWlkaSIsInBpdGNoQ2xhc3MiLCJvY3RhdmUiLCJpbmRleE9mIiwibWlkaVRvU3ltYm9sIiwicGl0Y2hDbGFzc0luZGV4IiwiZnJlcXVlbmN5VG9NaWRpIiwiZnJlcXVlbmN5Iiwic3ltYm9sVG9GcmVxdWVuY3kiLCJmcmVxdWVuY3lUb1N5bWJvbCIsIkRlbGF5Iiwib3V0cHV0IiwiZmlsdGVyIiwiY3JlYXRlQmlxdWFkRmlsdGVyIiwiZGVsYXkiLCJjcmVhdGVEZWxheSIsImZlZWRiYWNrIiwidHlwZSIsInRlbXBvIiwiZGl2aXNpb24iLCJkaXZpc2lvblRvRGVsYXlUaW1lIiwiZGVsYXlUaW1lU2Vjb25kcyIsImRlbGF5VGltZSIsInNldFRlbXBvVmFsdWUiLCJnZXRUZW1wb1ZhbHVlIiwic2V0RGl2aXNpb25WYWx1ZSIsImZlZWRiYWNrVmFsdWUiLCJnZXREaXZpc2lvblZhbHVlIiwic2V0RGVsYXlUaW1lVmFsdWUiLCJnZXREZWxheVRpbWVWYWx1ZSIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXRGZWVkYmFja1ZhbHVlIiwiZ2V0RmVlZGJhY2tWYWx1ZSIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwiZGF0YSIsIm5leHQiLCJhcyIsImFjdGlvbiIsIm1hcCIsInVuc2NhbGUiLCJyYW5nZSIsIm1heCIsIm1pbiIsInNjYWxlIiwiU2VxdWVuY2VyIiwidGlja3NQZXJRdWFydGVyTm90ZSIsInN0YXJ0VGltZSIsIm5leHRUaWNrVGltZSIsInRpY2siLCJvblRpY2siLCJvblN0b3AiLCJvblN0YXJ0Iiwib25Mb29wIiwic3RvcCIsImxvb3AiLCJsZW5ndGgiLCJ0aW1lciIsInNjaGVkdWxlIiwib3AiLCJjdXJyZW50VGltZSIsInBsYXkiLCJzZXRJbnRlcnZhbCIsInN0YXJ0IiwiY2xlYXJJbnRlcnZhbCIsImlzU3RhcnRlZCIsInNldExvb3BNb2RlIiwiZ2V0TG9vcE1vZGUiLCJzZXRMZW5ndGgiLCJnZXRMZW5ndGgiLCJzZXREaXZpc2lvbiIsImdldERpdmlzaW9uIiwic2V0VGVtcG8iLCJnZXRUZW1wbyIsImdldFRpbWUiLCJLaWNrIiwibWFpbk9zY0dhaW4iLCJtYWluT3NjIiwiaW5pdGlhbEZyZXF1ZW5jeSIsImR1cmF0aW9uIiwib24iLCJtdXRlZCIsIm91dHB1dEdhaW5WYWx1ZSIsImZpbmFsRnJlcXVlbmN5Iiwibm90ZU9uIiwidGltZSIsInZlbG9jaXR5IiwiY3JlYXRlT3NjaWxsYXRvciIsInNldFZhbHVlQXRUaW1lIiwiZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSIsIm5vdGVPZmYiLCJzZXREdXJhdGlvblZhbHVlIiwiZ2V0RHVyYXRpb25WYWx1ZSIsInNldE91dHB1dEdhaW5WYWx1ZSIsImdldE91dHB1dEdhaW5WYWx1ZSIsIm11dGUiLCJ1bk11dGUiLCJIYXQiLCJyYXRpb3MiLCJiYW5kcGFzcyIsImdhdGUiLCJoaWdocGFzcyIsImZ1bmRhbWVudGFsIiwib3NjIiwiZm9yRWFjaCIsInJhdGlvIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwic2V0RnVuZGFtZW50YWxWYWx1ZSIsImdldEZ1bmRhbWVudGFsVmFsdWUiLCJTbmFyZSIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwibyIsImdldENoYW5uZWxEYXRhIiwiaSIsIk1hdGgiLCJyYW5kb20iLCJub2lzZUdhaW4iLCJub2lzZUZpbHRlciIsIm9zY0dhaW4iLCJub2RlTWl4ZXIiLCJub2lzZSIsIm9zY01peFZhbHVlIiwibm9pc2VGaWx0ZXJWYWx1ZSIsInJlYWwiLCJGbG9hdDMyQXJyYXkiLCJpbWFnaW5hcnkiLCJjdXN0b21XYXZlIiwiY3JlYXRlUGVyaW9kaWNXYXZlIiwic2V0UGVyaW9kaWNXYXZlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwic2V0T3NjTWl4VmFsdWUiLCJnZXRPc2NNaXhWYWx1ZSIsInNldE5vaXNlRmlsdGVyVmFsdWUiLCJnZXROb2lzZUZpbHRlclZhbHVlIiwiRGlzdG9ydGlvbiIsImRpc3QiLCJjcmVhdGVXYXZlU2hhcGVyIiwiY3VydmUiLCJtYWtlRGlzdG9ydGlvbkN1cnZlIiwib3ZlcnNhbXBsZSIsImFtb3VudCIsImsiLCJuU2FtcGxlcyIsImRlZyIsIlBJIiwieCIsImFicyIsIkNoZWFwU3ludGgiLCJvc2NNaXgiLCJzdWJPc2NHYWluIiwic3ViT3NjIiwiY2hvcnVzIiwiZ2V0RGVsYXkiLCJEcnlXZXRNaXhlciIsIm5vZGVPdXRwdXRNaXhlciIsImlucHV0R2Fpbk5vZGUiLCJkcnlHYWluTm9kZSIsIndldE5vZGUiLCJzZXRXZXROb2RlIiwic2Z4Tm9kZU9yTWFjcm8iLCJkaXNjb25uZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7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QWMiLCJmaWxlIjoid2FzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5ZDhhOTQwY2JjZTRlMzM3YTJhZiIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiB3ZWIgYXVkaW8gbm9kZXMgKi9cblx0Y29uc3Qgb3V0cHV0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGxlZnRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgcmlnaHRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHQvKiBjb25zdGFudCB2YWx1ZXMgKi9cblx0Y29uc3QgTUlERExFX0dBSU5fVkFMVUUgPSAwLjVcblxuXHQvKiBwYXJhbWV0ZXIgdmFsdWVzICovXG5cdGxldCBmYWRlVmFsdWUgPSAwXG5cblx0Lyogcm91dGluZyAqL1xuXHRsZWZ0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0cmlnaHRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFXG5cdHJpZ2h0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFXG5cblx0cmV0dXJuIHtcblx0XHRzZXRGYWRlVmFsdWUodmFsdWUpIHtcblx0XHRcdGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gTUlERExFX0dBSU5fVkFMVUUgLSAodmFsdWUgKiBNSURETEVfR0FJTl9WQUxVRSlcblx0XHRcdHJpZ2h0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IE1JRERMRV9HQUlOX1ZBTFVFICsgKHZhbHVlICogTUlERExFX0dBSU5fVkFMVUUpXG5cdFx0XHRmYWRlVmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZhZGVWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmYWRlVmFsdWVcblx0XHR9LFxuXHRcdHNldExlZnRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KGxlZnRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRSaWdodElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QocmlnaHRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0R2Fpbk5vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRMZWZ0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbGVmdEdhaW5Ob2RlXG5cdFx0fSxcblx0XHRnZXRSaWdodEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIHJpZ2h0R2Fpbk5vZGVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmFtZGFcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJ1xuXG4vKipcbiAqIE5vdGVzIER1cmF0aW9ucyBDb25zdGFudHNcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBEVVJBVElPTlMgPSBPYmplY3QuZnJlZXplKHtcblx0V0hPTEU6IDEsXG5cdEhBTEY6IDEgLyAyLFxuXHRRVUFSVEVSOiAxIC8gNCxcblx0RUlHSFRIOiAxIC8gOCxcbn0pXG5cbmV4cG9ydCBjb25zdCBwaXRjaENsYXNzZXMgPSBPYmplY3QuZnJlZXplKFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddKVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgbWlkaVRvRnJlcXVlbmN5ID0gKHR1bmluZyA9IDQ0MCwgbWlkaVZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChtaWRpVmFsdWUpKSB7XG5cdFx0cmV0dXJuIF8gPT4gbWlkaVRvRnJlcXVlbmN5KHR1bmluZywgXylcblx0fVxuXHRpZiAobWlkaVZhbHVlID49IDAgJiYgbWlkaVZhbHVlIDw9IDEyNykge1xuXHRcdHJldHVybiB0dW5pbmcgKiAoMiAqKiAoKG1pZGlWYWx1ZSAtIDY5KSAvIDEyKSlcblx0fVxuXHRyZXR1cm4gbnVsbFxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBtaWRpVmFsdWUgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IHBpdGNoQ2xhc3MgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3Qgc3ltYm9sVG9NaWRpID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0KChvY3RhdmUgKyAxKSAqIDEyKSArIHBpdGNoQ2xhc3Nlcy5pbmRleE9mKHBpdGNoQ2xhc3MpXG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgcGl0Y2ggY2xhc3MgYW5kIG9jdGF2ZSBmb3IgdGhlIGdpdmVuIG1pZGkgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IG1pZGlUb1N5bWJvbCA9IChtaWRpVmFsdWUpID0+IHtcblx0Y29uc3QgcGl0Y2hDbGFzc0luZGV4ID0gKG1pZGlWYWx1ZSAtICgxMiAqIDIpKSAlIDEyXG5cdGNvbnN0IG9jdGF2ZSA9IChtaWRpVmFsdWUgLSBwaXRjaENsYXNzSW5kZXggLSAxMikgLyAxMlxuXHRyZXR1cm4ge1xuXHRcdHBpdGNoQ2xhc3M6IHBpdGNoQ2xhc3Nlc1twaXRjaENsYXNzSW5kZXhdLFxuXHRcdG9jdGF2ZSxcblx0fVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG1pZGkgbm90ZVxuICogd2l0aCBjdXN0b20sIG9wdGlvbmFsIHR1bmluZyAoZGVmYXVsdCB2YWx1ZSBmb3JcbiAqIHR1bmluZyBpcyA0NDAgZm9yIEE0KVxuICogVGhpcyBjdXJyeSBmdW5jdGlvbiB3aWxsIGJlIHBhcnRpYWxseSBhcHBsaWVkIGlmIHR1bmluZ1xuICogaXMgdGhlIG9ubHkgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge251bWJlcn0gdHVuaW5nIC0gVGhlIGZyZXF1ZW5jeSBhc3NvY2lhdGVkIHRvIG1pZGkgdmFsdWUgNjkgKEE0KVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZGlWYWx1ZSAtIE1pZGkgdmFsdWUgKDAgdG8gMTI3KSBvZiB0aGUgbm90ZVxuICogQHJldHVybnMge251bWJlcnxmdW5jdGlvbn0gVGhlIGNvbXB1dGVkIGZyZXF1ZW5jeSBvciBhIGNvbXB1dGluZyBmdW5jdGlvblxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9NaWRpID0gKHR1bmluZyA9IDQ0MCwgZnJlcXVlbmN5KSA9PiB7XG5cdGlmIChpc05pbChmcmVxdWVuY3kpKSB7XG5cdFx0cmV0dXJuIF8gPT4gZnJlcXVlbmN5VG9NaWRpKHR1bmluZywgXylcblx0fVxuXHRpZiAoZnJlcXVlbmN5ID49IDggJiYgZnJlcXVlbmN5IDwgMzk1Mikge1xuXHRcdHJldHVybiA2OSArICgxMiAqIE1hdGgubG9nMihmcmVxdWVuY3kgLyB0dW5pbmcpKVxuXHR9XG5cdHJldHVybiBudWxsXG59XG5cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbFRvRnJlcXVlbmN5ID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT5cblx0bWlkaVRvRnJlcXVlbmN5KDQ0MCwgc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkpXG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG5vdGUgYW5kIG9jdGF2ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIGZyZXF1ZW5jeVxuICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9TeW1ib2wgPSBmcmVxdWVuY3kgPT4gbWlkaVRvU3ltYm9sKGZyZXF1ZW5jeVRvTWlkaSg0NDAsIGZyZXF1ZW5jeSkpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9ub3RlLmpzIiwiZXhwb3J0IGNvbnN0IERlbGF5ID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHQvKiBhdWRpbyBub2RlcyAqL1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBkZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSg1LjApXG5cdGNvbnN0IGZlZWRiYWNrID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHQvKiByb3V0aW5nICovXG5cdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdGZlZWRiYWNrLmNvbm5lY3QoZmlsdGVyKVxuXHRmaWx0ZXIuY29ubmVjdChkZWxheSlcblx0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcblx0ZGVsYXkuY29ubmVjdChvdXRwdXQpXG5cdC8qIHBhcmFtZXRlcnMgKi9cblx0bGV0IHRlbXBvID0gMTIwXG5cdGxldCBkaXZpc2lvbiA9IDNcblx0LyogY29udmVydCBiZWF0IGRpdmlzaW9uIHRvIGRlbGF5IHRpbWUgaW4gc2Vjb25kcyAqL1xuXHRjb25zdCBkaXZpc2lvblRvRGVsYXlUaW1lID0gKGRpdmlzaW9uLCB0ZW1wbykgPT4gNjAgLyAodGVtcG8gKiBkaXZpc2lvbilcblx0bGV0IGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblxuXHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlcblx0XHR9LFxuXHRcdHNldFRlbXBvVmFsdWUodmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRpdmlzaW9uVG9EZWxheVRpbWUoZGl2aXNpb24sIHRlbXBvKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdHNldERpdmlzaW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGRpdmlzaW9uID0gdmFsdWVcblx0XHRcdGRlbGF5VGltZVNlY29uZHMgPSBkaXZpc2lvblRvRGVsYXlUaW1lKGRpdmlzaW9uLCB0ZW1wbylcblx0XHRcdGNvbnN0IGZlZWRiYWNrVmFsdWUgPSBmZWVkYmFjay5nYWluLnZhbHVlXG5cdFx0XHRmZWVkYmFjay5nYWluLnZhbHVlID0gMFxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdFx0ZmVlZGJhY2suZ2Fpbi52YWx1ZSA9IGZlZWRiYWNrVmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGRpdmlzaW9uXG5cdFx0fSxcblx0XHRzZXREZWxheVRpbWVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZGVsYXlUaW1lU2Vjb25kcyA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVTZWNvbmRzXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGVsYXlUaW1lVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlUaW1lU2Vjb25kc1xuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZpbHRlci5mcmVxdWVuY3kudmFsdWVcblx0XHR9LFxuXHRcdHNldEZlZWRiYWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGZlZWRiYWNrLmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZlZWRiYWNrVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZmVlZGJhY2suZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJ1xuZXhwb3J0ICogZnJvbSAnLi9tYWNyb3MnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2Rpc3BhdGNoZXInXG5leHBvcnQgKiBmcm9tICcuL3JhbmdlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJ1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVFx0OiAwLFxuXHRTRVFVRU5DRVJfU1RPUFx0OiAxLFxuXHRTRVFVRU5DRVJfVElDS1x0OiAyLFxuXHRURU1QT19DSEFOR0VcdDogMyxcblx0Q0hBTkdFOiA5OTksXG59KVxuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9ICgoKSA9PiB7XG5cdGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpXG5cdHJldHVybiB7XG5cdFx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdFx0c3ViamVjdC5uZXh0KHsgdHlwZSwgZGF0YSB9KVxuXHRcdH0sXG5cdFx0YXModHlwZSkge1xuXHRcdFx0cmV0dXJuIHN1YmplY3Rcblx0XHRcdFx0LmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG5cdFx0XHRcdC5tYXAoYWN0aW9uID0+IGFjdGlvbi5kYXRhKVxuXHRcdH0sXG5cdH1cbn0pKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbiAoJGZyZWV6ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBVbm5vcm1hbGl6ZXMgYSBbMC0xXSByYW5nZSB2YWx1ZSBiYWNrIHRvIHRoZSBnaXZlbiByYW5nZVxuICogQHBhcmFtIHtPYmplY3R9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNjYWxlID0gKHJhbmdlLCB2YWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pblxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdmFsdWUgdG8gYSBbMCwxXSByYW5nZSBnaXZlbiBpdHMgb3JpZ2luYWwgcmFuZ2UubWluIGFuZCByYW5nZS5tYXhcbiAqIEBwYXJhbSB7T2JqZWN0fSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICovXG5leHBvcnQgY29uc3Qgc2NhbGUgPSAocmFuZ2UsIHZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKHZhbHVlIC0gcmFuZ2UubWluKSAvIChyYW5nZS5tYXggLSByYW5nZS5taW4pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5cbmV4cG9ydCBjb25zdCBTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCB0aWNrc1BlclF1YXJ0ZXJOb3RlID0gNFxuXHRsZXQgc3RhcnRUaW1lID0gMFxuXHRsZXQgbmV4dFRpY2tUaW1lID0gMFxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSBuZXh0VGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0bmV4dFRpY2tUaW1lID0gY3VycmVudFRpbWUgKyAoNjAgLyAodGVtcG8gKiB0aWNrc1BlclF1YXJ0ZXJOb3RlKSlcblx0XHRcdG9wKHRpY2ssIHRlbXBvLCB0aWNrc1BlclF1YXJ0ZXJOb3RlLCBuZXh0VGlja1RpbWUpXG5cdFx0XHRpZiAobG9vcCAmJiB0aWNrID09PSBsZW5ndGgpIHtcblx0XHRcdFx0dGljayA9IDBcblx0XHRcdFx0b25Mb29wKClcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBwbGF5ID0gKCkgPT4ge1xuXHRcdHNjaGVkdWxlKG9uVGljaylcblx0XHR0aW1lciA9IFdvcmtlclRpbWVyLnNldEludGVydmFsKCgpID0+IHtcblx0XHRcdHNjaGVkdWxlKG9uVGljaylcblx0XHR9LCAwKVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdGFydCgpIHtcblx0XHRcdG9uU3RhcnQoKVxuXHRcdFx0c3RhcnRUaW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lXG5cdFx0XHRzdG9wID0gZmFsc2Vcblx0XHRcdHBsYXkoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHN0b3AoKSB7XG5cdFx0XHRXb3JrZXJUaW1lci5jbGVhckludGVydmFsKHRpbWVyKVxuXHRcdFx0c3RvcCA9IHRydWVcblx0XHRcdG5leHRUaWNrVGltZSA9IDBcblx0XHRcdHRpY2sgPSAwXG5cdFx0XHRvblN0b3AoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGlzU3RhcnRlZCgpIHtcblx0XHRcdHJldHVybiAhc3RvcFxuXHRcdH0sXG5cdFx0c2V0TG9vcE1vZGUodmFsdWUpIHtcblx0XHRcdGxvb3AgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldExvb3BNb2RlKCkge1xuXHRcdFx0cmV0dXJuIGxvb3Bcblx0XHR9LFxuXHRcdHNldExlbmd0aCh2YWx1ZSkge1xuXHRcdFx0bGVuZ3RoID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMZW5ndGgoKSB7XG5cdFx0XHRyZXR1cm4gbGVuZ3RoXG5cdFx0fSxcblx0XHRzZXREaXZpc2lvbih2YWx1ZSkge1xuXHRcdFx0dGlja3NQZXJRdWFydGVyTm90ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RGl2aXNpb24oKSB7XG5cdFx0XHRyZXR1cm4gdGlja3NQZXJRdWFydGVyTm90ZVxuXHRcdH0sXG5cdFx0c2V0VGVtcG8odmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRUZW1wbygpIHtcblx0XHRcdHJldHVybiB0ZW1wb1xuXHRcdH0sXG5cdFx0Z2V0VGltZSgpIHtcblx0XHRcdHJldHVybiBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSBzdGFydFRpbWVcblx0XHR9LFxuXHRcdG9uU3RhcnQob3ApIHtcblx0XHRcdG9uU3RhcnQgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uU3RvcChvcCkge1xuXHRcdFx0b25TdG9wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblRpY2sob3ApIHtcblx0XHRcdG9uVGljayA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25Mb29wKG9wKSB7XG5cdFx0XHRvbkxvb3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaWYgKGdsb2JhbCA9PT0gZ2xvYmFsLndpbmRvdyAmJiBnbG9iYWwuVVJMICYmIGdsb2JhbC5CbG9iICYmIGdsb2JhbC5Xb3JrZXIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIFRJTUVSX1dPUktFUl9TT1VSQ0UgPSBbXG4gICAgICBcInZhciB0aW1lcklkcyA9IHt9LCBfID0ge307XCIsXG4gICAgICBcIl8uc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhckludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFySW50ZXJ2YWwodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uc2V0VGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFyVGltZW91dCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwib25tZXNzYWdlID0gZnVuY3Rpb24oZSkgeyBfW2UuZGF0YS50eXBlXShlLmRhdGEpIH07XCJcbiAgICBdLmpvaW4oXCJcIik7XG5cbiAgICB2YXIgX3RpbWVySWQgPSAwO1xuICAgIHZhciBfY2FsbGJhY2tzID0ge307XG4gICAgdmFyIF90aW1lciA9IG5ldyBnbG9iYWwuV29ya2VyKGdsb2JhbC5VUkwuY3JlYXRlT2JqZWN0VVJMKFxuICAgICAgbmV3IGdsb2JhbC5CbG9iKFsgVElNRVJfV09SS0VSX1NPVVJDRSBdLCB7IHR5cGU6IFwidGV4dC9qYXZhc2NyaXB0XCIgfSlcbiAgICApKTtcblxuICAgIF90aW1lci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoX2NhbGxiYWNrc1tlLmRhdGFdKSB7XG4gICAgICAgIF9jYWxsYmFja3NbZS5kYXRhXS5jYWxsYmFjay5hcHBseShudWxsLCBfY2FsbGJhY2tzW2UuZGF0YV0ucGFyYW1zKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldEludGVydmFsOiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldEludGVydmFsXCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0VGltZW91dFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJJbnRlcnZhbFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhclRpbWVvdXRcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzJcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5tYXRoLmxvZzInKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk1hdGgubG9nMjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDIwLjIuMi4yMiBNYXRoLmxvZzIoeClcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnTWF0aCcsIHtcbiAgbG9nMjogZnVuY3Rpb24gbG9nMih4KSB7XG4gICAgcmV0dXJuIE1hdGgubG9nKHgpIC8gTWF0aC5MTjI7XG4gIH1cbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm1hdGgubG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9kcnVtcy9raWNrJ1xuZXhwb3J0ICogZnJvbSAnLi9kcnVtcy9oYXQnXG5leHBvcnQgKiBmcm9tICcuL2RydW1zL3NuYXJlJ1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL2RlbGF5J1xuZXhwb3J0ICogZnJvbSAnLi9lZmZlY3RzL2Rpc3RvcnRpb24nXG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnRzL2NoZWFwLXN5bnRoJ1xuZXhwb3J0ICogZnJvbSAnLi9yb3V0aW5nL2RyeS13ZXQtbWl4ZXInXG5leHBvcnQgKiBmcm9tICcuL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEtpY2sgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbWFpbk9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdG1haW5Pc2NHYWluLmNvbm5lY3Qob3V0cHV0KVxuXHRsZXQgbWFpbk9zY1xuXHRsZXQgaW5pdGlhbEZyZXF1ZW5jeSA9IDE1MFxuXHRsZXQgZHVyYXRpb24gPSAwLjE1XG5cdGxldCBvbiA9IGZhbHNlXG5cdGxldCBtdXRlZCA9IGZhbHNlXG5cdGxldCBvdXRwdXRHYWluVmFsdWUgPSAxRS0xMFxuXHRjb25zdCBmaW5hbEZyZXF1ZW5jeSA9IDAuMDFcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRtYWluT3NjR2Fpbi5nYWluLnZhbHVlID0gMUUtMTBcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCB2ZWxvY2l0eSA9IDEpIHtcblx0XHRcdG1haW5Pc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdFx0XHRtYWluT3NjLnR5cGUgPSAndHJpYW5nbGUnXG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShpbml0aWFsRnJlcXVlbmN5LCB0aW1lKVxuXHRcdFx0bWFpbk9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG1haW5Pc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcXVlbmN5LCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRtYWluT3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRtYWluT3NjLnN0b3AodGltZSArIGR1cmF0aW9uKVxuXHRcdFx0bWFpbk9zYy5jb25uZWN0KG1haW5Pc2NHYWluKVxuXHRcdFx0b24gPSB0cnVlXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0aWYgKCFvbikge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdG1haW5Pc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUpXG5cdFx0XHRtYWluT3NjLnN0b3AodGltZSlcblx0XHRcdG9uID0gZmFsc2Vcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXRGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0aW5pdGlhbEZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gaW5pdGlhbEZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0R2FpblZhbHVlID0gdmFsdWVcblx0XHRcdGlmICghbXV0ZWQpIHtcblx0XHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSBvdXRwdXRHYWluVmFsdWVcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0R2FpblZhbHVlXG5cdFx0fSxcblx0XHRtdXRlKCkge1xuXHRcdFx0bXV0ZWQgPSB0cnVlXG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwXG5cdFx0fSxcblx0XHR1bk11dGUoKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IG91dHB1dEdhaW5WYWx1ZVxuXHRcdFx0bXV0ZWQgPSBmYWxzZVxuXHRcdH1cblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9kcnVtcy9raWNrLmpzIiwiZXhwb3J0IGNvbnN0IEhhdCA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgcmF0aW9zID0gWzIsIDMsIDQuMTYsIDUuNDMsIDYuNzksIDguMjFdXG5cdGNvbnN0IGJhbmRwYXNzID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGdhdGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgaGlnaHBhc3MgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblxuXHRsZXQgZnVuZGFtZW50YWwgPSAzNVxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cdGxldCBvc2NcblxuXHRiYW5kcGFzcy50eXBlID0gJ2JhbmRwYXNzJ1xuXHRiYW5kcGFzcy5mcmVxdWVuY3kudmFsdWUgPSAxMDAwMFxuXG5cdGhpZ2hwYXNzLnR5cGUgPSAnaGlnaHBhc3MnXG5cdGhpZ2hwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDcwMDBcblxuXHRiYW5kcGFzcy5jb25uZWN0KGhpZ2hwYXNzKVxuXHRoaWdocGFzcy5jb25uZWN0KGdhdGUpXG5cdGdhdGUuY29ubmVjdChvdXRwdXQpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgdmVsb2NpdHkgPSAxKSB7XG5cdFx0XHRyYXRpb3MuZm9yRWFjaCgocmF0aW8pID0+IHtcblx0XHRcdFx0b3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0XHRvc2MudHlwZSA9ICdzcXVhcmUnXG5cdFx0XHRcdC8vIEZyZXF1ZW5jeSBpcyB0aGUgZnVuZGFtZW50YWwgKiB0aGlzIG9zY2lsbGF0b3IncyByYXRpb1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnVuZGFtZW50YWwgKiByYXRpb1xuXHRcdFx0XHRvc2MuY29ubmVjdChiYW5kcGFzcylcblx0XHRcdFx0b3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdH0pXG5cdFx0XHRnYXRlLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDAwMSwgdGltZSlcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5LCB0aW1lICsgMC4wMilcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKHZlbG9jaXR5ICogMC4zLCB0aW1lICsgMC4wMylcblx0XHRcdGdhdGUuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAwMDEsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRpZiAob3NjKSB7XG5cdFx0XHRcdGdhdGUuZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0b3NjLnN0b3AodGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnVuZGFtZW50YWxWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZnVuZGFtZW50YWwgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZ1bmRhbWVudGFsVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnVuZGFtZW50YWxcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH1cblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9kcnVtcy9oYXQuanMiLCJpbXBvcnQgeyBOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuXG5leHBvcnQgY29uc3QgU25hcmUgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IGJ1ZmZlclNpemUgPSBhdWRpb0NvbnRleHQuc2FtcGxlUmF0ZVxuXHRjb25zdCBidWZmZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyKDEsIGJ1ZmZlclNpemUsIGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlKVxuXHRjb25zdCBvID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSArPSAxKSB7XG5cdFx0b1tpXSA9IChNYXRoLnJhbmRvbSgpICogMikgLSAxXG5cdH1cblxuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IG5vaXNlR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VGaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3Qgb3NjR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9kZU1peGVyID0gTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dClcblxuXHRsZXQgb3NjXG5cdGxldCBub2lzZVxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cdGxldCBmcmVxdWVuY3kgPSA4MFxuXHRsZXQgb3NjTWl4VmFsdWUgPSAtMC4yXG5cdGxldCBub2lzZUZpbHRlclZhbHVlID0gMTAwMFxuXG5cdGNvbnN0IHJlYWwgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAwLCAxLCAwLCAxXSlcblx0Y29uc3QgaW1hZ2luYXJ5ID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMSwgMCwgMCwgMF0pXG5cdGNvbnN0IGN1c3RvbVdhdmUgPSBhdWRpb0NvbnRleHQuY3JlYXRlUGVyaW9kaWNXYXZlKHJlYWwsIGltYWdpbmFyeSlcblxuXHRub2lzZUZpbHRlci50eXBlID0gJ2xvd3Bhc3MnXG5cdG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IG5vaXNlRmlsdGVyVmFsdWVcblx0bm9pc2VGaWx0ZXIuY29ubmVjdChub2lzZUdhaW4pXG5cdG5vZGVNaXhlci5zZXRMZWZ0SW5wdXQob3NjR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuY29ubmVjdCh7IGdldElucHV0OiAoKSA9PiBvdXRwdXQgfSlcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCB2ZWxvY2l0eSA9IDEpIHtcblx0XHRcdG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdG9zYy5zZXRQZXJpb2RpY1dhdmUoY3VzdG9tV2F2ZSlcblx0XHRcdG9zYy5jb25uZWN0KG9zY0dhaW4pXG5cdFx0XHRub2lzZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKVxuXHRcdFx0bm9pc2UuYnVmZmVyID0gYnVmZmVyXG5cdFx0XHRub2lzZS5jb25uZWN0KG5vaXNlRmlsdGVyKVxuXHRcdFx0b3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZnJlcXVlbmN5IC8gMiwgdGltZSArIDAuMTUpXG5cdFx0XHRvc2NHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC41ICogdmVsb2NpdHksIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIDAuMTUpXG5cdFx0XHRvc2Muc3RhcnQodGltZSlcblx0XHRcdG9zYy5zdG9wKHRpbWUgKyAwLjE1KVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC41ICogdmVsb2NpdHksIHRpbWUpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRub2lzZS5zdGFydCh0aW1lKVxuXHRcdFx0bm9pc2Uuc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0aWYgKG9zYykge1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG5vaXNlR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0XHRub2lzZS5zdG9wKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb25WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZHVyYXRpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldER1cmF0aW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmcmVxdWVuY3kgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZyZXF1ZW5jeVxuXHRcdH0sXG5cdFx0c2V0T3NjTWl4VmFsdWUodmFsdWUpIHtcblx0XHRcdG9zY01peFZhbHVlID0gdmFsdWVcblx0XHRcdG5vZGVNaXhlci5zZXRGYWRlVmFsdWUob3NjTWl4VmFsdWUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3NjTWl4VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3NjTWl4VmFsdWVcblx0XHR9LFxuXHRcdHNldE5vaXNlRmlsdGVyVmFsdWUodmFsdWUpIHtcblx0XHRcdG5vaXNlRmlsdGVyVmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXROb2lzZUZpbHRlclZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG5vaXNlRmlsdGVyVmFsdWVcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZHJ1bXMvc25hcmUuanMiLCJleHBvcnQgY29uc3QgRGlzdG9ydGlvbiA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgZGlzdCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVXYXZlU2hhcGVyKClcblx0ZGlzdC5jdXJ2ZSA9IG1ha2VEaXN0b3J0aW9uQ3VydmUoNTApXG5cdGRpc3Qub3ZlcnNhbXBsZSA9ICcyeCdcblx0ZnVuY3Rpb24gbWFrZURpc3RvcnRpb25DdXJ2ZShhbW91bnQpIHtcblx0XHRjb25zdCBrID0gdHlwZW9mIGFtb3VudCA9PT0gJ251bWJlcicgPyBhbW91bnQgOiA1MFxuXHRcdGNvbnN0IG5TYW1wbGVzID0gNDQxMDBcblx0XHRjb25zdCBjdXJ2ZSA9IG5ldyBGbG9hdDMyQXJyYXkoNDQxMDApXG5cdFx0Y29uc3QgZGVnID0gTWF0aC5QSSAvIDE4MFxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgblNhbXBsZXM7ICsraSApIHtcblx0XHRcdGxldCB4ID0gaSAqIDIgLyBuU2FtcGxlcyAtIDFcblx0XHRcdGN1cnZlW2ldID0gKCAzICsgayApICogeCAqIDIwICogZGVnIC8gKCBNYXRoLlBJICsgayAqIE1hdGguYWJzKHgpIClcblx0XHR9XG5cdFx0cmV0dXJuIGN1cnZlXG5cdH1cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0ZGlzdC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4gY29ubmVjdFxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gZGlzdFxuXHRcdH1cblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL2Rpc3RvcnRpb24uanMiLCJpbXBvcnQgeyBOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuaW1wb3J0IHsgbWlkaVRvRnJlcXVlbmN5IH0gZnJvbSAnLi4vLi4vY29yZS9ub3RlJ1xuaW1wb3J0IHsgRGVsYXkgfSBmcm9tICcuLi9lZmZlY3RzL2RlbGF5J1xuXG5leHBvcnQgY29uc3QgQ2hlYXBTeW50aCA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG9zY01peCA9IE5vZGVPdXRwdXRNaXhlcihhdWRpb0NvbnRleHQpXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgc3ViT3NjR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbWFpbk9zY0dhaW4gPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGRlbGF5ID0gRGVsYXkoYXVkaW9Db250ZXh0KVxuXHRvc2NNaXguc2V0TGVmdElucHV0KHN1Yk9zY0dhaW4pXG5cdG9zY01peC5zZXRSaWdodElucHV0KG1haW5Pc2NHYWluKVxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gODAwXG5cdG9zY01peFxuXHRcdC5jb25uZWN0KHsgZ2V0SW5wdXQ6ICgpID0+IG91dHB1dCB9KVxuXHRkZWxheS5zZXRUZW1wb1ZhbHVlKDEyMClcblx0XHQuc2V0RGl2aXNpb25WYWx1ZSg0KVxuXHRcdC5zZXRGcmVxdWVuY3lWYWx1ZSg0MDApXG5cdFx0LnNldEZlZWRiYWNrVmFsdWUoMC40KVxuXHRsZXQgbWFpbk9zY1xuXHRsZXQgc3ViT3NjXG5cblx0b3V0cHV0LmdhaW4udmFsdWUgPSAwLjFcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCB2ZWxvY2l0eSA9IDEsIG1pZGlWYWx1ZSkge1xuXHRcdFx0bWFpbk9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdG1haW5Pc2MudHlwZSA9ICdzcXVhcmUnXG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShtaWRpVG9GcmVxdWVuY3koNDQwLCBtaWRpVmFsdWUpLCB0aW1lKVxuXHRcdFx0bWFpbk9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdHN1Yk9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdHN1Yk9zYy50eXBlID0gJ3RyaWFuZ2xlJ1xuXHRcdFx0c3ViT3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShtaWRpVG9GcmVxdWVuY3koNDQwLCBtaWRpVmFsdWUgLSA3KSwgdGltZSlcblx0XHRcdHN1Yk9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG1haW5Pc2MuY29ubmVjdChtYWluT3NjR2Fpbilcblx0XHRcdHN1Yk9zYy5jb25uZWN0KHN1Yk9zY0dhaW4pXG5cdFx0XHRtYWluT3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRzdWJPc2Muc3RhcnQodGltZSlcblx0XHRcdGNob3J1cy5ub3RlT24odGltZSlcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0bWFpbk9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRzdWJPc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0c3ViT3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bWFpbk9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdG1haW5Pc2Muc3RvcCh0aW1lKVxuXHRcdFx0c3ViT3NjLnN0b3AodGltZSlcblx0XHRcdGNob3J1cy5ub3RlT2ZmKHRpbWUpXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0RGVsYXkoKSB7XG5cdFx0XHRyZXR1cm4gZGVsYXlcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2NoZWFwLXN5bnRoLmpzIiwiaW1wb3J0IHsgTm9kZU91dHB1dE1peGVyIH0gZnJvbSAnLi9ub2RlLW91dHB1dC1taXhlcidcblxuZXhwb3J0IGNvbnN0IERyeVdldE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBub2RlT3V0cHV0TWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBkcnlHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRsZXQgd2V0Tm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRpbnB1dEdhaW5Ob2RlLmNvbm5lY3QoZHJ5R2Fpbk5vZGUpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRMZWZ0SW5wdXQoZHJ5R2Fpbk5vZGUpXG5cdG5vZGVPdXRwdXRNaXhlci5zZXRSaWdodElucHV0KHdldE5vZGUpXG5cblx0cmV0dXJuIE9iamVjdC5hc3NpZ24obm9kZU91dHB1dE1peGVyLCB7XG5cdFx0Z2V0SW5wdXQoKSB7XG5cdFx0XHRyZXR1cm4gaW5wdXRHYWluTm9kZVxuXHRcdH0sXG5cdFx0c2V0V2V0Tm9kZShzZnhOb2RlT3JNYWNybykge1xuXHRcdFx0d2V0Tm9kZSA9IHNmeE5vZGVPck1hY3JvLmdldElucHV0ID8gc2Z4Tm9kZU9yTWFjcm8uZ2V0SW5wdXQoKSA6IHNmeE5vZGVPck1hY3JvXG5cdFx0XHRub2RlT3V0cHV0TWl4ZXIuc2V0UmlnaHRJbnB1dCh3ZXROb2RlKVxuXHRcdFx0aW5wdXRHYWluTm9kZS5kaXNjb25uZWN0KClcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdChkcnlHYWluTm9kZSlcblx0XHRcdGlucHV0R2Fpbk5vZGUuY29ubmVjdCh3ZXROb2RlKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL2RyeS13ZXQtbWl4ZXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbi8vIG1vZHVsZSBpZCA9IDY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHsgYXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJykgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xudmFyIGdPUFMgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpO1xudmFyIHBJRSA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0Jyk7XG52YXIgJGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgdmFyIEEgPSB7fTtcbiAgdmFyIEIgPSB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBTID0gU3ltYm9sKCk7XG4gIHZhciBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGspIHsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgPSB0b09iamVjdCh0YXJnZXQpO1xuICB2YXIgYUxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDE7XG4gIHZhciBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICB2YXIgaXNFbnVtID0gcElFLmY7XG4gIHdoaWxlIChhTGVuID4gaW5kZXgpIHtcbiAgICB2YXIgUyA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKTtcbiAgICB2YXIga2V5cyA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBqID0gMDtcbiAgICB2YXIga2V5O1xuICAgIHdoaWxlIChsZW5ndGggPiBqKSBpZiAoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSkgVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qc1xuLy8gbW9kdWxlIGlkID0gNjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qc1xuLy8gbW9kdWxlIGlkID0gNjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qc1xuLy8gbW9kdWxlIGlkID0gNzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==