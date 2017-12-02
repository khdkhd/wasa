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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
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
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(20), __esModule: true };

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


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

module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(0);
var ctx = __webpack_require__(22);
var hide = __webpack_require__(24);
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
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(25);
var IE8_DOM_DEFINE = __webpack_require__(26);
var toPrimitive = __webpack_require__(28);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var NodeOutputMixer = exports.NodeOutputMixer = audioContext => {
	var outputGainNode = audioContext.createGain();
	var leftGainNode = audioContext.createGain();
	var rightGainNode = audioContext.createGain();

	leftGainNode.connect(outputGainNode);
	rightGainNode.connect(outputGainNode);
	leftGainNode.gain.value = 0.5;
	rightGainNode.gain.value = 0.5;

	return {
		fade(value) {
			leftGainNode.gain.value = 1 - Math.abs(value);
			rightGainNode.gain.value = Math.abs(value);
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
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(35);
var defined = __webpack_require__(11);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(6);
var core = __webpack_require__(0);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencyToMidi = exports.midiToFrequency = exports.midiToSymbol = exports.symbolToMidi = exports.frequencyToSymbol = exports.symbolToFrequency = exports.pitchClasses = exports.DURATIONS = undefined;

var _log = __webpack_require__(54);

var _log2 = _interopRequireDefault(_log);

var _freeze = __webpack_require__(17);

var _freeze2 = _interopRequireDefault(_freeze);

var _ramda = __webpack_require__(9);

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
 * Computes the frequency value of the given note in the given octave
 * @param {string} pitchClass - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
var symbolToFrequency = exports.symbolToFrequency = (pitchClass, octave) => {
  return midiToFrequency(440, symbolToMidi(pitchClass, octave));
};

/**
 * Computes the note and octave values of the given frequency
 * @param {number} frequency - Octave value for note
 */
var frequencyToSymbol = exports.frequencyToSymbol = frequency => {
  return midiToSymbol(frequencyToMidi(440, frequency));
};

/**
 * Computes the midiValue value of the given note in the given octave
 * @param {string} note - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
var symbolToMidi = exports.symbolToMidi = (pitchClass, octave) => {
  return (octave + 1) * 12 + pitchClasses.indexOf(pitchClass);
};

/**
 * Computes the pitch class and octave for the given midi value
 * @param {number} midValue - Octave value for note
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

/***/ }),
/* 19 */
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

var _common = __webpack_require__(43);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(50);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _macros = __webpack_require__(57);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(6);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(8).f });


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
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
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(8);
var createDesc = __webpack_require__(29);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(7).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(31);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(32);
var $keys = __webpack_require__(33);

__webpack_require__(16)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(11);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(34);
var enumBugKeys = __webpack_require__(42);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(12);
var toIObject = __webpack_require__(13);
var arrayIndexOf = __webpack_require__(37)(false);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(36);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13);
var toLength = __webpack_require__(38);
var toAbsoluteIndex = __webpack_require__(39);
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(14);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(14);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(41)('keys');
var uid = __webpack_require__(15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 43 */
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

var _dispatcher = __webpack_require__(44);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(49);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(17);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(48);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(46);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(47).onFreeze;

__webpack_require__(16)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(15)('meta');
var isObject = __webpack_require__(1);
var has = __webpack_require__(12);
var setDesc = __webpack_require__(8).f;
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
/* 48 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.unscale = undefined;

var _ramda = __webpack_require__(9);

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
/* 50 */
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

var _sequencer = __webpack_require__(51);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(18);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sequencer = undefined;

var _workerTimer = __webpack_require__(52);

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
/* 52 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
module.exports = __webpack_require__(0).Math.log2;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(6);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 57 */
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

var _kick = __webpack_require__(58);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_kick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _kick[key];
    }
  });
});

var _hat = __webpack_require__(59);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(60);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
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

var _nodeInputMixer = __webpack_require__(61);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_nodeInputMixer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _nodeInputMixer[key];
    }
  });
});

var _cheapSynth = __webpack_require__(62);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_cheapSynth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _cheapSynth[key];
    }
  });
});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Kick = exports.Kick = audioContext => {
	var output = audioContext.createGain();
	var gains = [audioContext.createGain(), audioContext.createGain()];
	var filter = audioContext.createBiquadFilter();

	filter.connect(output);
	gains.forEach(gain => {
		gain.connect(filter);
	});
	var oscs = [];
	var mainOsc = void 0;
	var subOsc = void 0;
	var initialFrequency = 150;
	var duration = 0.15;
	var subOscEnabled = true;

	var finalFrequency = 0.01;

	output.gain.value = 1;
	filter.type = 'allpass';
	filter.frequency.value = 40;
	filter.gain.value = -50;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			mainOsc = audioContext.createOscillator();
			mainOsc.type = 'triangle';
			mainOsc.frequency.setValueAtTime(initialFrequency, time);
			mainOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration);
			oscs = [mainOsc];
			if (subOscEnabled) {
				subOsc = audioContext.createOscillator();
				subOsc.type = 'sine';
				subOsc.frequency.setValueAtTime(initialFrequency / 2, time);
				subOsc.frequency.exponentialRampToValueAtTime(finalFrequency, time + duration);
				oscs.push(subOsc);
			}
			gains.forEach(gain => {
				gain.gain.linearRampToValueAtTime(1 / oscs.length * velocity, time);
				gain.gain.exponentialRampToValueAtTime(1E-10, time + duration);
			});
			oscs.forEach((osc, i) => {
				osc.connect(gains[i]);
				osc.start(time);
				osc.stop(time + duration);
			});
		},
		noteOff(time = audioContext.currentTime + duration) {
			oscs.forEach((osc, i) => {
				osc.stop(time);
				osc.frequency.cancelScheduledValues(time);
				gains[i].gain.cancelScheduledValues(time);
			});
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
		},
		getIsSubOscEnabled() {
			return subOscEnabled;
		},
		setIsSubOscEnabled(value) {
			subOscEnabled = value;
			return this;
		}
	};
};

/***/ }),
/* 59 */
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
			output.gain.exponentialRampToValueAtTime(1 * velocity, time + 0.02);
			output.gain.exponentialRampToValueAtTime(0.3, time + 0.03);
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Snare = undefined;

var _nodeOutputMixer = __webpack_require__(10);

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
	var frequency = 100;
	var oscMixValue = 0.5;
	var noiseFilterValue = 1000;

	var real = new Float32Array([0, 0, 1, 0, 1]);
	var imaginary = new Float32Array([0, 1, 0, 0, 0]);
	var customWave = audioContext.createPeriodicWave(real, imaginary);

	noiseFilter.type = 'lowpass';
	noiseFilter.frequency.value = noiseFilterValue;
	noiseFilter.connect(noiseGain);
	nodeMixer.setLeftInput(noiseGain);
	nodeMixer.setRightInput(oscGain);
	nodeMixer.connect({ getInput: () => output });

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator();
			osc.setPeriodicWave(customWave);
			osc.connect(oscGain);
			noise = audioContext.createBufferSource();
			noise.buffer = buffer;
			noise.connect(noiseFilter);
			noiseGain.gain.setValueAtTime(0.5 * velocity, time);
			noiseGain.gain.exponentialRampToValueAtTime(1E-10, time + duration);
			noise.start(time);
			osc.frequency.setValueAtTime(frequency, time);
			oscGain.gain.setValueAtTime(0.5 * velocity, time);
			oscGain.gain.exponentialRampToValueAtTime(1E-10, time + 0.15);
			osc.start(time);
			osc.stop(time + 0.15);
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
			nodeMixer.fade(oscMixValue - 0.5);
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var NodeInputMixer = exports.NodeInputMixer = audioContext => {
	var outputGainNode = audioContext.createGain();
	var inputGainNode = audioContext.createGain();
	var leftGainNode = audioContext.createGain();
	var rightGainNode = audioContext.createGain();
	inputGainNode.connect(leftGainNode);
	inputGainNode.connect(rightGainNode);
	leftGainNode.gain.value = 0.5;
	rightGainNode.gain.value = 0.5;

	return {
		connect({ connect, getInput }) {
			outputGainNode.connect(getInput());
			return { connect };
		},
		getInput() {
			return inputGainNode;
		},
		fade(value) {
			leftGainNode.gain.value = 1 - Math.abs(value);
			rightGainNode.gain.value = Math.abs(value);
		},
		setLeftOutput(audioNode) {
			leftGainNode.connect(audioNode);
			audioNode.connect(outputGainNode);
			return this;
		},
		setRightOutput(audioNode) {
			rightGainNode.connect(audioNode);
			audioNode.connect(outputGainNode);
			return this;
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CheapSynth = undefined;

var _nodeOutputMixer = __webpack_require__(10);

var _note = __webpack_require__(18);

var _delay = __webpack_require__(63);

var _ringModulator = __webpack_require__(64);

var CheapSynth = exports.CheapSynth = audioContext => {
	var filter = audioContext.createBiquadFilter();
	var oscMix = (0, _nodeOutputMixer.NodeOutputMixer)(audioContext);
	var output = audioContext.createGain();
	var subOscGain = audioContext.createGain();
	var mainOscGain = audioContext.createGain();
	var delay = (0, _delay.Delay)(audioContext);
	var chorus = (0, _ringModulator.RingModulator)(audioContext);
	oscMix.setLeftInput(subOscGain);
	oscMix.setRightInput(mainOscGain);
	filter.frequency.value = 800;
	oscMix.connect(chorus).connect(delay).connect({ getInput: () => output });
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
/* 63 */
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
	var division = 4;
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.RingModulator = undefined;

var _ramda = __webpack_require__(9);

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
	var lfoGainValue = 1;
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
	feedbackRightToLeft.gain.value = 0.2;
	feedbackLeftToRight.gain.value = 0.2;
	feedbackFilter.type = 'bandpass';
	feedbackFilter.Q.value = 100;
	feedbackFilter.gain.value = 0.5;
	lfoGain.gain.value = lfoGainValue;
	stereoLeftDelay.delayTime.value = delayTimeValue;
	stereoRightDelay.delayTime.value = delayTimeValue;

	attenuator.gain.value = 0.6;
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
			lfo.frequency.value = Math.random() * frequencyValue;
			lfo.setPeriodicWave(lfoWave);
			lfo.start(time);
			output.gain.linearRampToValueAtTime(outputGainValue, time);
		},
		noteOff(time = audioContext.currentTime) {
			output.gain.linearRampToValueAtTime(0, time + releaseTimeValue);
			lfo.stop(time + releaseTimeValue);
		},
		setRingModulation(value) {
			var normalizedValue = (0, _ramda.clamp)(0, 1, value);
			frequencyValue = MAX_LFO_HZ_FREQUENCY * normalizedValue;
		},
		setDelayTimeValue(value) {
			var normalizedValue = (0, _ramda.clamp)(0, 1, value);
			delayTimeValue = MAX_DELAY_TIME_IN_SECONDS * normalizedValue;
		},
		setReleaseTimeValue(value) {
			releaseTimeValue = value;
		},
		setLfoGainValue(value) {
			var normalizedValue = (0, _ramda.clamp)(0, 1, value);
			lfoGainValue = MAX_LFO_GAIN_IN_DB * normalizedValue;
		}
	};
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjAyZWRkMjYyNjBiOGNhMjI3N2MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9Iiwid2VicGFjazovLy8uL3NyYy9tYWNyb3Mvcm91dGluZy9ub2RlLW91dHB1dC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL25vdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9tYXRoL2xvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9tYXRoL2xvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2RydW1zL2tpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9kcnVtcy9oYXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hY3Jvcy9kcnVtcy9zbmFyZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1pbnB1dC1taXhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2luc3RydW1lbnRzL2NoZWFwLXN5bnRoLmpzIiwid2VicGFjazovLy8uL3NyYy9tYWNyb3MvZWZmZWN0cy9kZWxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFjcm9zL2VmZmVjdHMvcmluZy1tb2R1bGF0b3IuanMiXSwibmFtZXMiOlsiTm9kZU91dHB1dE1peGVyIiwiYXVkaW9Db250ZXh0Iiwib3V0cHV0R2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwibGVmdEdhaW5Ob2RlIiwicmlnaHRHYWluTm9kZSIsImNvbm5lY3QiLCJnYWluIiwidmFsdWUiLCJmYWRlIiwiTWF0aCIsImFicyIsInNldExlZnRJbnB1dCIsImF1ZGlvTm9kZSIsInNldFJpZ2h0SW5wdXQiLCJnZXRJbnB1dCIsImdldExlZnRHYWluTm9kZSIsImdldFJpZ2h0R2Fpbk5vZGUiLCJEVVJBVElPTlMiLCJXSE9MRSIsIkhBTEYiLCJRVUFSVEVSIiwiRUlHSFRIIiwicGl0Y2hDbGFzc2VzIiwic3ltYm9sVG9GcmVxdWVuY3kiLCJwaXRjaENsYXNzIiwib2N0YXZlIiwibWlkaVRvRnJlcXVlbmN5Iiwic3ltYm9sVG9NaWRpIiwiZnJlcXVlbmN5VG9TeW1ib2wiLCJmcmVxdWVuY3kiLCJtaWRpVG9TeW1ib2wiLCJmcmVxdWVuY3lUb01pZGkiLCJpbmRleE9mIiwibWlkaVZhbHVlIiwicGl0Y2hDbGFzc0luZGV4IiwidHVuaW5nIiwiXyIsIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwidHlwZSIsImRhdGEiLCJuZXh0IiwiYXMiLCJmaWx0ZXIiLCJhY3Rpb24iLCJtYXAiLCJ1bnNjYWxlIiwicmFuZ2UiLCJtYXgiLCJtaW4iLCJzY2FsZSIsIlNlcXVlbmNlciIsInRpY2tzUGVyUXVhcnRlck5vdGUiLCJzdGFydFRpbWUiLCJuZXh0VGlja1RpbWUiLCJ0aWNrIiwib25UaWNrIiwib25TdG9wIiwib25TdGFydCIsIm9uTG9vcCIsInN0b3AiLCJsb29wIiwidGVtcG8iLCJsZW5ndGgiLCJ0aW1lciIsInNjaGVkdWxlIiwib3AiLCJjdXJyZW50VGltZSIsInBsYXkiLCJzZXRJbnRlcnZhbCIsInN0YXJ0IiwiY2xlYXJJbnRlcnZhbCIsImlzU3RhcnRlZCIsInNldExvb3BNb2RlIiwiZ2V0TG9vcE1vZGUiLCJzZXRMZW5ndGgiLCJnZXRMZW5ndGgiLCJzZXREaXZpc2lvbiIsImdldERpdmlzaW9uIiwic2V0VGVtcG8iLCJnZXRUZW1wbyIsImdldFRpbWUiLCJLaWNrIiwib3V0cHV0IiwiZ2FpbnMiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJmb3JFYWNoIiwib3NjcyIsIm1haW5Pc2MiLCJzdWJPc2MiLCJpbml0aWFsRnJlcXVlbmN5IiwiZHVyYXRpb24iLCJzdWJPc2NFbmFibGVkIiwiZmluYWxGcmVxdWVuY3kiLCJub3RlT24iLCJ0aW1lIiwidmVsb2NpdHkiLCJjcmVhdGVPc2NpbGxhdG9yIiwic2V0VmFsdWVBdFRpbWUiLCJleHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lIiwicHVzaCIsImxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lIiwib3NjIiwiaSIsIm5vdGVPZmYiLCJjYW5jZWxTY2hlZHVsZWRWYWx1ZXMiLCJzZXRGcmVxdWVuY3lWYWx1ZSIsImdldEZyZXF1ZW5jeVZhbHVlIiwic2V0RHVyYXRpb25WYWx1ZSIsImdldER1cmF0aW9uVmFsdWUiLCJzZXRPdXRwdXRHYWluVmFsdWUiLCJnZXRPdXRwdXRHYWluVmFsdWUiLCJnZXRJc1N1Yk9zY0VuYWJsZWQiLCJzZXRJc1N1Yk9zY0VuYWJsZWQiLCJIYXQiLCJyYXRpb3MiLCJiYW5kcGFzcyIsImhpZ2hwYXNzIiwiZnVuZGFtZW50YWwiLCJyYXRpbyIsInNldER1cmF0aW9uIiwiZ2V0RHVyYXRpb24iLCJTbmFyZSIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwibyIsImdldENoYW5uZWxEYXRhIiwicmFuZG9tIiwibm9pc2VHYWluIiwibm9pc2VGaWx0ZXIiLCJvc2NHYWluIiwibm9kZU1peGVyIiwibm9pc2UiLCJvc2NNaXhWYWx1ZSIsIm5vaXNlRmlsdGVyVmFsdWUiLCJyZWFsIiwiRmxvYXQzMkFycmF5IiwiaW1hZ2luYXJ5IiwiY3VzdG9tV2F2ZSIsImNyZWF0ZVBlcmlvZGljV2F2ZSIsInNldFBlcmlvZGljV2F2ZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsInNldE9zY01peFZhbHVlIiwiZ2V0T3NjTWl4VmFsdWUiLCJzZXROb2lzZUZpbHRlclZhbHVlIiwiZ2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsIk5vZGVJbnB1dE1peGVyIiwiaW5wdXRHYWluTm9kZSIsInNldExlZnRPdXRwdXQiLCJzZXRSaWdodE91dHB1dCIsIkNoZWFwU3ludGgiLCJvc2NNaXgiLCJzdWJPc2NHYWluIiwibWFpbk9zY0dhaW4iLCJkZWxheSIsImNob3J1cyIsInNldFRlbXBvVmFsdWUiLCJzZXREaXZpc2lvblZhbHVlIiwic2V0RmVlZGJhY2tWYWx1ZSIsImdldERlbGF5IiwiRGVsYXkiLCJjcmVhdGVEZWxheSIsImZlZWRiYWNrIiwiZGl2aXNpb24iLCJkZWxheVRpbWUiLCJnZXRUZW1wb1ZhbHVlIiwiZ2V0RGl2aXNpb25WYWx1ZSIsImdldEZlZWRiYWNrVmFsdWUiLCJSaW5nTW9kdWxhdG9yIiwiaW5wdXQiLCJhdHRlbnVhdG9yIiwiY2hhbm5lbFNwbGl0dGVyIiwiY3JlYXRlQ2hhbm5lbFNwbGl0dGVyIiwic3RlcmVvTGVmdERlbGF5Iiwic3RlcmVvUmlnaHREZWxheSIsImxmb0dhaW4iLCJmZWVkYmFja0xlZnRUb1JpZ2h0IiwiZmVlZGJhY2tSaWdodFRvTGVmdCIsImZlZWRiYWNrRmlsdGVyIiwiY2hhbm5lbE1lcmdlciIsImNyZWF0ZUNoYW5uZWxNZXJnZXIiLCJsZm9XYXZlIiwiZGVsYXlUaW1lVmFsdWUiLCJyZWxlYXNlVGltZVZhbHVlIiwib3V0cHV0R2FpblZhbHVlIiwiZnJlcXVlbmN5VmFsdWUiLCJsZm9HYWluVmFsdWUiLCJsZm8iLCJNQVhfTEZPX0haX0ZSRVFVRU5DWSIsIk1BWF9ERUxBWV9USU1FX0lOX1NFQ09ORFMiLCJNQVhfTEZPX0dBSU5fSU5fREIiLCJRIiwic2V0UmluZ01vZHVsYXRpb24iLCJub3JtYWxpemVkVmFsdWUiLCJzZXREZWxheVRpbWVWYWx1ZSIsInNldFJlbGVhc2VUaW1lVmFsdWUiLCJzZXRMZm9HYWluVmFsdWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsNkJBQTZCO0FBQzdCLHVDQUF1Qzs7Ozs7OztBQ0R2QztBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsaUNBQWlDLFFB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QUFZbUwsT0FBWjtBQUNBWSxPQUFJdkssU0FBSixDQUFjdEIsS0FBZCxHQUFzQkUsS0FBSytILE1BQUwsS0FBZ0IwRCxjQUF0QztBQUNBRSxPQUFJL0MsZUFBSixDQUFvQnlDLE9BQXBCO0FBQ0FNLE9BQUl2SCxLQUFKLENBQVV5QixJQUFWO0FBQ0FaLFVBQU9wRixJQUFQLENBQVlzRyx1QkFBWixDQUFvQ3FGLGVBQXBDLEVBQXFEM0YsSUFBckQ7QUFDQSxHQWZLO0FBZ0JOUyxVQUFRVCxPQUFPdEcsYUFBYTBFLFdBQTVCLEVBQXlDO0FBQ3hDZ0IsVUFBT3BGLElBQVAsQ0FBWXNHLHVCQUFaLENBQW9DLENBQXBDLEVBQXVDTixPQUFPMEYsZ0JBQTlDO0FBQ0FJLE9BQUlqSSxJQUFKLENBQVNtQyxPQUFPMEYsZ0JBQWhCO0FBQ0EsR0FuQks7QUFvQk5TLG9CQUFrQmxNLEtBQWxCLEVBQXlCO0FBQ3hCLE9BQU1tTSxrQkFBa0Isa0JBQU0sQ0FBTixFQUFTLENBQVQsRUFBWW5NLEtBQVosQ0FBeEI7QUFDQTJMLG9CQUFpQkcsdUJBQXVCSyxlQUF4QztBQUNBLEdBdkJLO0FBd0JOQyxvQkFBa0JwTSxLQUFsQixFQUF5QjtBQUN4QixPQUFNbU0sa0JBQWtCLGtCQUFNLENBQU4sRUFBUyxDQUFULEVBQVluTSxLQUFaLENBQXhCO0FBQ0F3TCxvQkFBaUJPLDRCQUE0QkksZUFBN0M7QUFDQSxHQTNCSztBQTRCTkUsc0JBQW9Cck0sS0FBcEIsRUFBMkI7QUFDMUJ5TCxzQkFBbUJ6TCxLQUFuQjtBQUNBLEdBOUJLO0FBK0JOc00sa0JBQWdCdE0sS0FBaEIsRUFBdUI7QUFDdEIsT0FBTW1NLGtCQUFrQixrQkFBTSxDQUFOLEVBQVMsQ0FBVCxFQUFZbk0sS0FBWixDQUF4QjtBQUNBNEwsa0JBQWVJLHFCQUFxQkcsZUFBcEM7QUFDQTtBQWxDSyxFQUFQO0FBb0NBLENBcEdNLEMiLCJmaWxlIjoid2FzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMDJlZGQyNjI2MGI4Y2EyMjc3YyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24gKHR5cGUsIG5hbWUsIHNvdXJjZSkge1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRjtcbiAgdmFyIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0Lkc7XG4gIHZhciBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TO1xuICB2YXIgSVNfUFJPVE8gPSB0eXBlICYgJGV4cG9ydC5QO1xuICB2YXIgSVNfQklORCA9IHR5cGUgJiAkZXhwb3J0LkI7XG4gIHZhciBJU19XUkFQID0gdHlwZSAmICRleHBvcnQuVztcbiAgdmFyIGV4cG9ydHMgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgdmFyIGV4cFByb3RvID0gZXhwb3J0c1tQUk9UT1RZUEVdO1xuICB2YXIgdGFyZ2V0ID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXTtcbiAgdmFyIGtleSwgb3duLCBvdXQ7XG4gIGlmIChJU19HTE9CQUwpIHNvdXJjZSA9IG5hbWU7XG4gIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYgKG93biAmJiBrZXkgaW4gZXhwb3J0cykgY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbiAoQykge1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgICBpZiAodGhpcyBpbnN0YW5jZW9mIEMpIHtcbiAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDKCk7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmIChJU19QUk9UTykge1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmICh0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKSBoaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKTtcbnZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpO1xudmFyIGRQID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgY29uc3QgTm9kZU91dHB1dE1peGVyID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBvdXRwdXRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgbGVmdEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCByaWdodEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXG5cdGxlZnRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRyaWdodEdhaW5Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gMC41XG5cdHJpZ2h0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDAuNVxuXG5cdHJldHVybiB7XG5cdFx0ZmFkZSh2YWx1ZSkge1xuXHRcdFx0bGVmdEdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxIC0gTWF0aC5hYnModmFsdWUpXG5cdFx0XHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblx0XHR9LFxuXHRcdHNldExlZnRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KGxlZnRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzZXRSaWdodElucHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3QocmlnaHRHYWluTm9kZSlcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0R2Fpbk5vZGUuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRMZWZ0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gbGVmdEdhaW5Ob2RlXG5cdFx0fSxcblx0XHRnZXRSaWdodEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIHJpZ2h0R2Fpbk5vZGVcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXIuanMiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ID09IHVuZGVmaW5lZCkgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBOb3RlcyBEdXJhdGlvbnMgQ29uc3RhbnRzXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5leHBvcnQgY29uc3QgRFVSQVRJT05TID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFdIT0xFOiAxLFxuXHRIQUxGOiAxIC8gMixcblx0UVVBUlRFUjogMSAvIDQsXG5cdEVJR0hUSDogMSAvIDgsXG59KVxuXG5leHBvcnQgY29uc3QgcGl0Y2hDbGFzc2VzID0gT2JqZWN0LmZyZWV6ZShbJ0MnLCAnQyMnLCAnRCcsICdEIycsICdFJywgJ0YnLCAnRiMnLCAnRycsICdHIycsICdBJywgJ0EjJywgJ0InXSlcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwaXRjaENsYXNzIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbFRvRnJlcXVlbmN5ID0gKHBpdGNoQ2xhc3MsIG9jdGF2ZSkgPT4ge1xuXHRyZXR1cm4gbWlkaVRvRnJlcXVlbmN5KDQ0MCwgc3ltYm9sVG9NaWRpKHBpdGNoQ2xhc3MsIG9jdGF2ZSkpXG59XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIG5vdGUgYW5kIG9jdGF2ZSB2YWx1ZXMgb2YgdGhlIGdpdmVuIGZyZXF1ZW5jeVxuICogQHBhcmFtIHtudW1iZXJ9IGZyZXF1ZW5jeSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3QgZnJlcXVlbmN5VG9TeW1ib2wgPSAoZnJlcXVlbmN5KSA9PiB7XG5cdHJldHVybiBtaWRpVG9TeW1ib2woZnJlcXVlbmN5VG9NaWRpKDQ0MCwgZnJlcXVlbmN5KSlcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgbWlkaVZhbHVlIHZhbHVlIG9mIHRoZSBnaXZlbiBub3RlIGluIHRoZSBnaXZlbiBvY3RhdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBub3RlIC0gTm90ZSBpbiBzY2FsZSAoZW5nbGlzaCBub3RhdGlvbilcbiAqIEBwYXJhbSB7bnVtYmVyfSBvY3RhdmUgLSBPY3RhdmUgdmFsdWUgZm9yIG5vdGVcbiAqL1xuZXhwb3J0IGNvbnN0IHN5bWJvbFRvTWlkaSA9IChwaXRjaENsYXNzLCBvY3RhdmUpID0+IHtcblx0cmV0dXJuICgob2N0YXZlICsgMSkgKiAxMikgKyBwaXRjaENsYXNzZXMuaW5kZXhPZihwaXRjaENsYXNzKVxufVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBwaXRjaCBjbGFzcyBhbmQgb2N0YXZlIGZvciB0aGUgZ2l2ZW4gbWlkaSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IG1pZFZhbHVlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBjb25zdCBtaWRpVG9TeW1ib2wgPSAobWlkaVZhbHVlKSA9PiB7XG5cdGNvbnN0IHBpdGNoQ2xhc3NJbmRleCA9IChtaWRpVmFsdWUgLSAoMTIgKiAyKSkgJSAxMlxuXHRjb25zdCBvY3RhdmUgPSAobWlkaVZhbHVlIC0gcGl0Y2hDbGFzc0luZGV4IC0gMTIpIC8gMTJcblx0cmV0dXJuIHtcblx0XHRwaXRjaENsYXNzOiBwaXRjaENsYXNzZXNbcGl0Y2hDbGFzc0luZGV4XSxcblx0XHRvY3RhdmUsXG5cdH1cbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBtaWRpIG5vdGVcbiAqIHdpdGggY3VzdG9tLCBvcHRpb25hbCB0dW5pbmcgKGRlZmF1bHQgdmFsdWUgZm9yXG4gKiB0dW5pbmcgaXMgNDQwIGZvciBBNClcbiAqIFRoaXMgY3VycnkgZnVuY3Rpb24gd2lsbCBiZSBwYXJ0aWFsbHkgYXBwbGllZCBpZiB0dW5pbmdcbiAqIGlzIHRoZSBvbmx5IHBhcmFtZXRlclxuICogQHBhcmFtIHtudW1iZXJ9IHR1bmluZyAtIFRoZSBmcmVxdWVuY3kgYXNzb2NpYXRlZCB0byBtaWRpIHZhbHVlIDY5IChBNClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBNaWRpIHZhbHVlICgwIHRvIDEyNykgb2YgdGhlIG5vdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ8ZnVuY3Rpb259IFRoZSBjb21wdXRlZCBmcmVxdWVuY3kgb3IgYSBjb21wdXRpbmcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IG1pZGlUb0ZyZXF1ZW5jeSA9ICh0dW5pbmcgPSA0NDAsIG1pZGlWYWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwobWlkaVZhbHVlKSkge1xuXHRcdHJldHVybiBfID0+IG1pZGlUb0ZyZXF1ZW5jeSh0dW5pbmcsIF8pXG5cdH1cblx0aWYgKG1pZGlWYWx1ZSA+PSAwICYmIG1pZGlWYWx1ZSA8PSAxMjcpIHtcblx0XHRyZXR1cm4gdHVuaW5nICogKDIgKiogKChtaWRpVmFsdWUgLSA2OSkgLyAxMikpXG5cdH1cblx0cmV0dXJuIG51bGxcbn1cblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgZnJlcXVlbmN5IHZhbHVlIG9mIHRoZSBnaXZlbiBtaWRpIG5vdGVcbiAqIHdpdGggY3VzdG9tLCBvcHRpb25hbCB0dW5pbmcgKGRlZmF1bHQgdmFsdWUgZm9yXG4gKiB0dW5pbmcgaXMgNDQwIGZvciBBNClcbiAqIFRoaXMgY3VycnkgZnVuY3Rpb24gd2lsbCBiZSBwYXJ0aWFsbHkgYXBwbGllZCBpZiB0dW5pbmdcbiAqIGlzIHRoZSBvbmx5IHBhcmFtZXRlclxuICogQHBhcmFtIHtudW1iZXJ9IHR1bmluZyAtIFRoZSBmcmVxdWVuY3kgYXNzb2NpYXRlZCB0byBtaWRpIHZhbHVlIDY5IChBNClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaWRpVmFsdWUgLSBNaWRpIHZhbHVlICgwIHRvIDEyNykgb2YgdGhlIG5vdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ8ZnVuY3Rpb259IFRoZSBjb21wdXRlZCBmcmVxdWVuY3kgb3IgYSBjb21wdXRpbmcgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGZyZXF1ZW5jeVRvTWlkaSA9ICh0dW5pbmcgPSA0NDAsIGZyZXF1ZW5jeSkgPT4ge1xuXHRpZiAoaXNOaWwoZnJlcXVlbmN5KSkge1xuXHRcdHJldHVybiBfID0+IGZyZXF1ZW5jeVRvTWlkaSh0dW5pbmcsIF8pXG5cdH1cblx0aWYgKGZyZXF1ZW5jeSA+PSA4ICYmIGZyZXF1ZW5jeSA8IDM5NTIpIHtcblx0XHRyZXR1cm4gNjkgKyAoMTIgKiBNYXRoLmxvZzIoZnJlcXVlbmN5L3R1bmluZykpXG5cdH1cblx0cmV0dXJuIG51bGxcbn1cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9ub3RlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9jb21tb24nXG5leHBvcnQgKiBmcm9tICcuL2NvcmUnXG5leHBvcnQgKiBmcm9tICcuL21hY3JvcydcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYykge1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0JywgeyBkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZiB9KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCwgbGVuZ3RoKSB7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmICh0aGF0ID09PSB1bmRlZmluZWQpIHJldHVybiBmbjtcbiAgc3dpdGNoIChsZW5ndGgpIHtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpO1xudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCkge1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tYWJzb2x1dGUtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2Rpc3BhdGNoZXInXG5leHBvcnQgKiBmcm9tICcuL3JhbmdlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9pbmRleC5qcyIsImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJ1xuXG5leHBvcnQgY29uc3QgRXZlbnRzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdFNFUVVFTkNFUl9TVEFSVFx0OiAwLFxuXHRTRVFVRU5DRVJfU1RPUFx0OiAxLFxuXHRTRVFVRU5DRVJfVElDS1x0OiAyLFxuXHRURU1QT19DSEFOR0VcdDogMyxcblx0Q0hBTkdFOiA5OTksXG59KVxuXG5leHBvcnQgY29uc3QgRGlzcGF0Y2hlciA9ICgoKSA9PiB7XG5cdGNvbnN0IHN1YmplY3QgPSBuZXcgU3ViamVjdCgpXG5cdHJldHVybiB7XG5cdFx0ZGlzcGF0Y2godHlwZSwgZGF0YSkge1xuXHRcdFx0c3ViamVjdC5uZXh0KHsgdHlwZSwgZGF0YSB9KVxuXHRcdH0sXG5cdFx0YXModHlwZSkge1xuXHRcdFx0cmV0dXJuIHN1YmplY3Rcblx0XHRcdFx0LmZpbHRlcihhY3Rpb24gPT4gYWN0aW9uLnR5cGUgPT09IHR5cGUpXG5cdFx0XHRcdC5tYXAoYWN0aW9uID0+IGFjdGlvbi5kYXRhKVxuXHRcdH0sXG5cdH1cbn0pKClcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vZGlzcGF0Y2hlci5qcyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5mcmVlemU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjUgT2JqZWN0LmZyZWV6ZShPKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbWV0YSA9IHJlcXVpcmUoJy4vX21ldGEnKS5vbkZyZWV6ZTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdmcmVlemUnLCBmdW5jdGlvbiAoJGZyZWV6ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gZnJlZXplKGl0KSB7XG4gICAgcmV0dXJuICRmcmVlemUgJiYgaXNPYmplY3QoaXQpID8gJGZyZWV6ZShtZXRhKGl0KSkgOiBpdDtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBNRVRBID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHNldERlc2MgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xudmFyIGlkID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbiAoaXQpIHtcbiAgc2V0RGVzYyhpdCwgTUVUQSwgeyB2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gfSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmICghY3JlYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKSBzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogTUVUQSxcbiAgTkVFRDogZmFsc2UsXG4gIGZhc3RLZXk6IGZhc3RLZXksXG4gIGdldFdlYWs6IGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyeGpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifVxuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgaXNOaWwgfSBmcm9tICdyYW1kYSdcblxuLyoqXG4gKiBVbm5vcm1hbGl6ZXMgYSBbMC0xXSByYW5nZSB2YWx1ZSBiYWNrIHRvIHRoZSBnaXZlbiByYW5nZVxuICogQHBhcmFtIHtPYmplY3R9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCB1bnNjYWxlID0gKHJhbmdlLCB2YWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICgocmFuZ2UubWF4IC0gcmFuZ2UubWluKSAqIHZhbHVlKSArIHJhbmdlLm1pblxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZXMgdmFsdWUgdG8gYSBbMCwxXSByYW5nZSBnaXZlbiBpdHMgb3JpZ2luYWwgcmFuZ2UubWluIGFuZCByYW5nZS5tYXhcbiAqIEBwYXJhbSB7T2JqZWN0fSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICovXG5leHBvcnQgY29uc3Qgc2NhbGUgPSAocmFuZ2UsIHZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKHZhbHVlIC0gcmFuZ2UubWluKSAvIChyYW5nZS5tYXggLSByYW5nZS5taW4pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL3JhbmdlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5cbmV4cG9ydCBjb25zdCBTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCB0aWNrc1BlclF1YXJ0ZXJOb3RlID0gNFxuXHRsZXQgc3RhcnRUaW1lID0gMFxuXHRsZXQgbmV4dFRpY2tUaW1lID0gMFxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSBuZXh0VGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0b3AodGljaywgdGVtcG8sIHRpY2tzUGVyUXVhcnRlck5vdGUpXG5cdFx0XHRuZXh0VGlja1RpbWUgPSBjdXJyZW50VGltZSArICg2MCAvICh0ZW1wbyAqIHRpY2tzUGVyUXVhcnRlck5vdGUpKVxuXHRcdFx0aWYgKGxvb3AgJiYgdGljayA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRcdHRpY2sgPSAwXG5cdFx0XHRcdG9uTG9vcCgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcGxheSA9ICgpID0+IHtcblx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0fSwgMClcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KClcblx0XHRcdHN0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuXHRcdFx0c3RvcCA9IGZhbHNlXG5cdFx0XHRwbGF5KClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzdG9wKCkge1xuXHRcdFx0V29ya2VyVGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lcilcblx0XHRcdHN0b3AgPSB0cnVlXG5cdFx0XHRuZXh0VGlja1RpbWUgPSAwXG5cdFx0XHR0aWNrID0gMFxuXHRcdFx0b25TdG9wKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRpc1N0YXJ0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gIXN0b3Bcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMb29wTW9kZSgpIHtcblx0XHRcdHJldHVybiBsb29wXG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVuZ3RoKCkge1xuXHRcdFx0cmV0dXJuIGxlbmd0aFxuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdHRpY2tzUGVyUXVhcnRlck5vdGUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uKCkge1xuXHRcdFx0cmV0dXJuIHRpY2tzUGVyUXVhcnRlck5vdGVcblx0XHR9LFxuXHRcdHNldFRlbXBvKHZhbHVlKSB7XG5cdFx0XHR0ZW1wbyA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0VGVtcG8oKSB7XG5cdFx0XHRyZXR1cm4gdGVtcG9cblx0XHR9LFxuXHRcdGdldFRpbWUoKSB7XG5cdFx0XHRyZXR1cm4gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lXG5cdFx0fSxcblx0XHRvblN0YXJ0KG9wKSB7XG5cdFx0XHRvblN0YXJ0ID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblN0b3Aob3ApIHtcblx0XHRcdG9uU3RvcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25UaWNrKG9wKSB7XG5cdFx0XHRvblRpY2sgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uTG9vcChvcCkge1xuXHRcdFx0b25Mb29wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvc2VxdWVuY2VyLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChnbG9iYWwgPT09IGdsb2JhbC53aW5kb3cgJiYgZ2xvYmFsLlVSTCAmJiBnbG9iYWwuQmxvYiAmJiBnbG9iYWwuV29ya2VyKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBUSU1FUl9XT1JLRVJfU09VUkNFID0gW1xuICAgICAgXCJ2YXIgdGltZXJJZHMgPSB7fSwgXyA9IHt9O1wiLFxuICAgICAgXCJfLnNldEludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhckludGVydmFsKHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLnNldFRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICBjbGVhclRpbWVvdXQodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHsgX1tlLmRhdGEudHlwZV0oZS5kYXRhKSB9O1wiXG4gICAgXS5qb2luKFwiXCIpO1xuXG4gICAgdmFyIF90aW1lcklkID0gMDtcbiAgICB2YXIgX2NhbGxiYWNrcyA9IHt9O1xuICAgIHZhciBfdGltZXIgPSBuZXcgZ2xvYmFsLldvcmtlcihnbG9iYWwuVVJMLmNyZWF0ZU9iamVjdFVSTChcbiAgICAgIG5ldyBnbG9iYWwuQmxvYihbIFRJTUVSX1dPUktFUl9TT1VSQ0UgXSwgeyB0eXBlOiBcInRleHQvamF2YXNjcmlwdFwiIH0pXG4gICAgKSk7XG5cbiAgICBfdGltZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKF9jYWxsYmFja3NbZS5kYXRhXSkge1xuICAgICAgICBfY2FsbGJhY2tzW2UuZGF0YV0uY2FsbGJhY2suYXBwbHkobnVsbCwgX2NhbGxiYWNrc1tlLmRhdGFdLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRJbnRlcnZhbFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldFRpbWVvdXRcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFySW50ZXJ2YWxcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9LFxuICAgICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJUaW1lb3V0XCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dvcmtlci10aW1lci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXG5cdFx0ZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL21hdGgvbG9nMi5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYubWF0aC5sb2cyJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5NYXRoLmxvZzI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vbWF0aC9sb2cyLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAyMC4yLjIuMjIgTWF0aC5sb2cyKHgpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ01hdGgnLCB7XG4gIGxvZzI6IGZ1bmN0aW9uIGxvZzIoeCkge1xuICAgIHJldHVybiBNYXRoLmxvZyh4KSAvIE1hdGguTE4yO1xuICB9XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5tYXRoLmxvZzIuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vZHJ1bXMva2ljaydcbmV4cG9ydCAqIGZyb20gJy4vZHJ1bXMvaGF0J1xuZXhwb3J0ICogZnJvbSAnLi9kcnVtcy9zbmFyZSdcbmV4cG9ydCAqIGZyb20gJy4vcm91dGluZy9ub2RlLW91dHB1dC1taXhlcidcbmV4cG9ydCAqIGZyb20gJy4vcm91dGluZy9ub2RlLWlucHV0LW1peGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9pbnN0cnVtZW50cy9jaGVhcC1zeW50aCdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5kZXguanMiLCJleHBvcnQgY29uc3QgS2ljayA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBnYWlucyA9IFtcblx0XHRhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpLFxuXHRcdGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCksXG5cdF1cblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cblx0ZmlsdGVyLmNvbm5lY3Qob3V0cHV0KVxuXHRnYWlucy5mb3JFYWNoKChnYWluKSA9PiB7XG5cdFx0Z2Fpbi5jb25uZWN0KGZpbHRlcilcblx0fSlcblx0bGV0IG9zY3MgPSBbXVxuXHRsZXQgbWFpbk9zY1xuXHRsZXQgc3ViT3NjXG5cdGxldCBpbml0aWFsRnJlcXVlbmN5ID0gMTUwXG5cdGxldCBkdXJhdGlvbiA9IDAuMTVcblx0bGV0IHN1Yk9zY0VuYWJsZWQgPSB0cnVlXG5cblx0Y29uc3QgZmluYWxGcmVxdWVuY3kgPSAwLjAxXG5cblx0b3V0cHV0LmdhaW4udmFsdWUgPSAxXG5cdGZpbHRlci50eXBlID0gJ2FsbHBhc3MnXG5cdGZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSA0MFxuXHRmaWx0ZXIuZ2Fpbi52YWx1ZSA9IC01MFxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0bWFpbk9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdG1haW5Pc2MudHlwZSA9ICd0cmlhbmdsZSdcblx0XHRcdG1haW5Pc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGluaXRpYWxGcmVxdWVuY3ksIHRpbWUpXG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcXVlbmN5LCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRvc2NzID0gW1xuXHRcdFx0XHRtYWluT3NjLFxuXHRcdFx0XVxuXHRcdFx0aWYgKHN1Yk9zY0VuYWJsZWQpIHtcblx0XHRcdFx0c3ViT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0XHRzdWJPc2MudHlwZSA9ICdzaW5lJ1xuXHRcdFx0XHRzdWJPc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGluaXRpYWxGcmVxdWVuY3kgLyAyLCB0aW1lKVxuXHRcdFx0XHRzdWJPc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoZmluYWxGcmVxdWVuY3ksIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdFx0b3Njcy5wdXNoKHN1Yk9zYylcblx0XHRcdH1cblx0XHRcdGdhaW5zLmZvckVhY2goKGdhaW4pID0+IHtcblx0XHRcdFx0Z2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKCgxIC8gb3Njcy5sZW5ndGgpICogdmVsb2NpdHksIHRpbWUpXG5cdFx0XHRcdGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHR9KVxuXHRcdFx0b3Njcy5mb3JFYWNoKChvc2MsIGkpID0+IHtcblx0XHRcdFx0b3NjLmNvbm5lY3QoZ2FpbnNbaV0pXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdG9zY3MuZm9yRWFjaCgob3NjLCBpKSA9PiB7XG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUpXG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdGdhaW5zW2ldLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRpbml0aWFsRnJlcXVlbmN5ID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBpbml0aWFsRnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG91dHB1dC5nYWluLnZhbHVlXG5cdFx0fSxcblx0XHRnZXRJc1N1Yk9zY0VuYWJsZWQoKSB7XG5cdFx0XHRyZXR1cm4gc3ViT3NjRW5hYmxlZFxuXHRcdH0sXG5cdFx0c2V0SXNTdWJPc2NFbmFibGVkKHZhbHVlKSB7XG5cdFx0XHRzdWJPc2NFbmFibGVkID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9kcnVtcy9raWNrLmpzIiwiZXhwb3J0IGNvbnN0IEhhdCA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgcmF0aW9zID0gWzIsIDMsIDQuMTYsIDUuNDMsIDYuNzksIDguMjFdXG5cdGNvbnN0IGJhbmRwYXNzID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgaGlnaHBhc3MgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3QgZnVuZGFtZW50YWwgPSAzNVxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cdGxldCBvc2NcblxuXHRiYW5kcGFzcy50eXBlID0gJ2JhbmRwYXNzJ1xuXHRiYW5kcGFzcy5mcmVxdWVuY3kudmFsdWUgPSAxMDAwMFxuXG5cdGhpZ2hwYXNzLnR5cGUgPSAnaGlnaHBhc3MnXG5cdGhpZ2hwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDcwMDBcblxuXHRiYW5kcGFzcy5jb25uZWN0KGhpZ2hwYXNzKVxuXHRoaWdocGFzcy5jb25uZWN0KG91dHB1dClcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCB2ZWxvY2l0eSA9IDEpIHtcblx0XHRcdHJhdGlvcy5mb3JFYWNoKChyYXRpbykgPT4ge1xuXHRcdFx0XHRvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdFx0XHRcdG9zYy50eXBlID0gJ3NxdWFyZSdcblx0XHRcdFx0Ly8gRnJlcXVlbmN5IGlzIHRoZSBmdW5kYW1lbnRhbCAqIHRoaXMgb3NjaWxsYXRvcidzIHJhdGlvXG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kudmFsdWUgPSBmdW5kYW1lbnRhbCAqIHJhdGlvXG5cdFx0XHRcdG9zYy5jb25uZWN0KGJhbmRwYXNzKVxuXHRcdFx0XHRvc2Muc3RhcnQodGltZSlcblx0XHRcdFx0b3NjLnN0b3AodGltZSArIGR1cmF0aW9uKVxuXHRcdFx0fSlcblx0XHRcdG91dHB1dC5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDAwMDEsIHRpbWUpXG5cdFx0XHRvdXRwdXQuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDEgKiB2ZWxvY2l0eSwgdGltZSArIDAuMDIpXG5cdFx0XHRvdXRwdXQuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMywgdGltZSArIDAuMDMpXG5cdFx0XHRvdXRwdXQuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAwMDEsIHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRpZiAob3NjKSB7XG5cdFx0XHRcdG91dHB1dC5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGdldElucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb24oKSB7XG5cdFx0XHRyZXR1cm4gZHVyYXRpb25cblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2RydW1zL2hhdC5qcyIsImltcG9ydCB7IE5vZGVPdXRwdXRNaXhlciB9IGZyb20gJy4uL3JvdXRpbmcvbm9kZS1vdXRwdXQtbWl4ZXInXG5cbmV4cG9ydCBjb25zdCBTbmFyZSA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBOb2RlT3V0cHV0TWl4ZXIoYXVkaW9Db250ZXh0KVxuXG5cdGxldCBvc2Ncblx0bGV0IG5vaXNlXG5cdGxldCBkdXJhdGlvbiA9IDAuMjVcblx0bGV0IGZyZXF1ZW5jeSA9IDEwMFxuXHRsZXQgb3NjTWl4VmFsdWUgPSAwLjVcblx0bGV0IG5vaXNlRmlsdGVyVmFsdWUgPSAxMDAwXG5cblx0Y29uc3QgcmVhbCA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDAsIDEsIDAsIDFdKVxuXHRjb25zdCBpbWFnaW5hcnkgPSBuZXcgRmxvYXQzMkFycmF5KFswLCAxLCAwLCAwLCAwXSlcblx0Y29uc3QgY3VzdG9tV2F2ZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVQZXJpb2RpY1dhdmUocmVhbCwgaW1hZ2luYXJ5KVxuXG5cdG5vaXNlRmlsdGVyLnR5cGUgPSAnbG93cGFzcydcblx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gbm9pc2VGaWx0ZXJWYWx1ZVxuXHRub2lzZUZpbHRlci5jb25uZWN0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLnNldExlZnRJbnB1dChub2lzZUdhaW4pXG5cdG5vZGVNaXhlci5zZXRSaWdodElucHV0KG9zY0dhaW4pXG5cdG5vZGVNaXhlci5jb25uZWN0KHsgZ2V0SW5wdXQ6ICgpID0+IG91dHB1dCB9KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0b3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0b3NjLnNldFBlcmlvZGljV2F2ZShjdXN0b21XYXZlKVxuXHRcdFx0b3NjLmNvbm5lY3Qob3NjR2Fpbilcblx0XHRcdG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cdFx0XHRub2lzZS5idWZmZXIgPSBidWZmZXJcblx0XHRcdG5vaXNlLmNvbm5lY3Qobm9pc2VGaWx0ZXIpXG5cdFx0XHRub2lzZUdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG5vaXNlR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdG5vaXNlLnN0YXJ0KHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUgKiB2ZWxvY2l0eSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDFFLTEwLCB0aW1lICsgMC4xNSlcblx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0b3NjLnN0b3AodGltZSArIDAuMTUpXG5cdFx0XHRub2lzZS5zdG9wKHRpbWUgKyBkdXJhdGlvbilcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRpZiAob3NjKSB7XG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG9zY0dhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0bm9pc2VHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUpXG5cdFx0XHRcdG5vaXNlLnN0b3AodGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXRPc2NNaXhWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3NjTWl4VmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9kZU1peGVyLmZhZGUob3NjTWl4VmFsdWUgLSAwLjUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3NjTWl4VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3NjTWl4VmFsdWVcblx0XHR9LFxuXHRcdHNldE5vaXNlRmlsdGVyVmFsdWUodmFsdWUpIHtcblx0XHRcdG5vaXNlRmlsdGVyVmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9pc2VGaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXROb2lzZUZpbHRlclZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIG5vaXNlRmlsdGVyVmFsdWVcblx0XHR9LFxuXHRcdHNldE91dHB1dEdhaW5WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4udmFsdWUgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldE91dHB1dEdhaW5WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2Fpbi52YWx1ZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvZHJ1bXMvc25hcmUuanMiLCJleHBvcnQgY29uc3QgTm9kZUlucHV0TWl4ZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBpbnB1dEdhaW5Ob2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBsZWZ0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IHJpZ2h0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpXG5cdGlucHV0R2Fpbk5vZGUuY29ubmVjdChyaWdodEdhaW5Ob2RlKVxuXHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDAuNVxuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSAwLjVcblxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXRHYWluTm9kZS5jb25uZWN0KGdldElucHV0KCkpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldElucHV0KCkge1xuXHRcdFx0cmV0dXJuIGlucHV0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdGZhZGUodmFsdWUpIHtcblx0XHRcdGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gMSAtIE1hdGguYWJzKHZhbHVlKVxuXHRcdFx0cmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cdFx0fSxcblx0XHRzZXRMZWZ0T3V0cHV0KGF1ZGlvTm9kZSkge1xuXHRcdFx0bGVmdEdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9Ob2RlKVxuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0UmlnaHRPdXRwdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRyaWdodEdhaW5Ob2RlLmNvbm5lY3QoYXVkaW9Ob2RlKVxuXHRcdFx0YXVkaW9Ob2RlLmNvbm5lY3Qob3V0cHV0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVmdEdhaW5Ob2RlKCkge1xuXHRcdFx0cmV0dXJuIGxlZnRHYWluTm9kZVxuXHRcdH0sXG5cdFx0Z2V0UmlnaHRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiByaWdodEdhaW5Ob2RlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9yb3V0aW5nL25vZGUtaW5wdXQtbWl4ZXIuanMiLCJpbXBvcnQgeyBOb2RlT3V0cHV0TWl4ZXIgfSBmcm9tICcuLi9yb3V0aW5nL25vZGUtb3V0cHV0LW1peGVyJ1xuaW1wb3J0IHsgbWlkaVRvRnJlcXVlbmN5IH0gZnJvbSAnLi4vLi4vY29yZS9ub3RlJ1xuaW1wb3J0IHsgRGVsYXkgfSBmcm9tICcuLi9lZmZlY3RzL2RlbGF5J1xuaW1wb3J0IHsgUmluZ01vZHVsYXRvciB9IGZyb20gJy4uL2VmZmVjdHMvcmluZy1tb2R1bGF0b3InXG5cbmV4cG9ydCBjb25zdCBDaGVhcFN5bnRoID0gKGF1ZGlvQ29udGV4dCkgPT4ge1xuXHRjb25zdCBmaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3Qgb3NjTWl4ID0gTm9kZU91dHB1dE1peGVyKGF1ZGlvQ29udGV4dClcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBzdWJPc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBtYWluT3NjR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZGVsYXkgPSBEZWxheShhdWRpb0NvbnRleHQpXG5cdGNvbnN0IGNob3J1cyA9IFJpbmdNb2R1bGF0b3IoYXVkaW9Db250ZXh0KVxuXHRvc2NNaXguc2V0TGVmdElucHV0KHN1Yk9zY0dhaW4pXG5cdG9zY01peC5zZXRSaWdodElucHV0KG1haW5Pc2NHYWluKVxuXHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gODAwXG5cdG9zY01peFxuXHRcdC5jb25uZWN0KGNob3J1cylcblx0XHQuY29ubmVjdChkZWxheSlcdFx0LmNvbm5lY3QoeyBnZXRJbnB1dDogKCkgPT4gb3V0cHV0IH0pXG5cdGRlbGF5LnNldFRlbXBvVmFsdWUoMTIwKVxuXHRcdC5zZXREaXZpc2lvblZhbHVlKDQpXG5cdFx0LnNldEZyZXF1ZW5jeVZhbHVlKDQwMClcblx0XHQuc2V0RmVlZGJhY2tWYWx1ZSgwLjQpXG5cdGxldCBtYWluT3NjXG5cdGxldCBzdWJPc2NcblxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDAuMVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSwgbWlkaVZhbHVlKSB7XG5cdFx0XHRtYWluT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0bWFpbk9zYy50eXBlID0gJ3NxdWFyZSdcblx0XHRcdG1haW5Pc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKG1pZGlUb0ZyZXF1ZW5jeSg0NDAsIG1pZGlWYWx1ZSksIHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0c3ViT3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0c3ViT3NjLnR5cGUgPSAndHJpYW5nbGUnXG5cdFx0XHRzdWJPc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKG1pZGlUb0ZyZXF1ZW5jeSg0NDAsIG1pZGlWYWx1ZSAtIDcpLCB0aW1lKVxuXHRcdFx0c3ViT3NjR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0bWFpbk9zYy5jb25uZWN0KG1haW5Pc2NHYWluKVxuXHRcdFx0c3ViT3NjLmNvbm5lY3Qoc3ViT3NjR2Fpbilcblx0XHRcdG1haW5Pc2Muc3RhcnQodGltZSlcblx0XHRcdHN1Yk9zYy5zdGFydCh0aW1lKVxuXHRcdFx0Y2hvcnVzLm5vdGVPbih0aW1lKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdHN1Yk9zYy5mcmVxdWVuY3kuY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRzdWJPc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRtYWluT3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0bWFpbk9zYy5zdG9wKHRpbWUpXG5cdFx0XHRzdWJPc2Muc3RvcCh0aW1lKVxuXHRcdFx0Y2hvcnVzLm5vdGVPZmYodGltZSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXREZWxheSgpIHtcblx0XHRcdHJldHVybiBkZWxheVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9tYWNyb3MvaW5zdHJ1bWVudHMvY2hlYXAtc3ludGguanMiLCJleHBvcnQgY29uc3QgRGVsYXkgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZmlsdGVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGRlbGF5ID0gYXVkaW9Db250ZXh0LmNyZWF0ZURlbGF5KClcblx0Y29uc3QgZmVlZGJhY2sgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGRlbGF5LmNvbm5lY3QoZmVlZGJhY2spXG5cdGZlZWRiYWNrLmNvbm5lY3QoZmlsdGVyKVxuXHRmaWx0ZXIuY29ubmVjdChkZWxheSlcblx0ZmlsdGVyLnR5cGUgPSAnbG93cGFzcydcblx0ZGVsYXkuY29ubmVjdChvdXRwdXQpXG5cdGxldCB0ZW1wbyA9IDEyMFxuXHRsZXQgZGl2aXNpb24gPSA0XG5cdGRlbGF5LmRlbGF5VGltZS52YWx1ZSA9IDYwIC8gKHRlbXBvICogZGl2aXNpb24pXG5cblx0cmV0dXJuIHtcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgZ2V0SW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoZ2V0SW5wdXQoKSlcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0Z2V0SW5wdXQoKXtcblx0XHRcdHJldHVybiBkZWxheVxuXHRcdH0sXG5cdFx0c2V0VGVtcG9WYWx1ZSh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0ZGVsYXkuZGVsYXlUaW1lLnZhbHVlID0gNjAgLyAodGVtcG8gKiBkaXZpc2lvbilcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRUZW1wb1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvXG5cdFx0fSxcblx0XHRzZXREaXZpc2lvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkaXZpc2lvbiA9IHZhbHVlXG5cdFx0XHRkZWxheS5kZWxheVRpbWUudmFsdWUgPSA2MCAvICh0ZW1wbyAqIGRpdmlzaW9uKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZGl2aXNpb25cblx0XHR9LFxuXHRcdHNldEZyZXF1ZW5jeVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGcmVxdWVuY3lWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBmaWx0ZXIuZnJlcXVlbmN5LnZhbHVlXG5cdFx0fSxcblx0XHRzZXRGZWVkYmFja1ZhbHVlKHZhbHVlKSB7XG5cdFx0XHRmZWVkYmFjay5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGZWVkYmFja1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZlZWRiYWNrLmdhaW4udmFsdWVcblx0XHR9XG5cblx0fVxuXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWFjcm9zL2VmZmVjdHMvZGVsYXkuanMiLCJpbXBvcnQgeyBjbGFtcCB9IGZyb20gJ3JhbWRhJ1xuXG5leHBvcnQgY29uc3QgUmluZ01vZHVsYXRvciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Lyogd2ViIGF1ZGlvIG5vZGVzICovXG5cdGNvbnN0IGlucHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBhdHRlbnVhdG9yID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBjaGFubmVsU3BsaXR0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQ2hhbm5lbFNwbGl0dGVyKDIpXG5cdGNvbnN0IHN0ZXJlb0xlZnREZWxheSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVEZWxheSgpXG5cdGNvbnN0IHN0ZXJlb1JpZ2h0RGVsYXkgPSBhdWRpb0NvbnRleHQuY3JlYXRlRGVsYXkoKVxuXHRjb25zdCBsZm9HYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBmZWVkYmFja0xlZnRUb1JpZ2h0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBmZWVkYmFja1JpZ2h0VG9MZWZ0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBmZWVkYmFja0ZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBjaGFubmVsTWVyZ2VyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUNoYW5uZWxNZXJnZXIoMilcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCByZWFsID0gbmV3IEZsb2F0MzJBcnJheShbMCwgMCwgMSwgMCwgMV0pXG5cdGNvbnN0IGltYWdpbmFyeSA9IG5ldyBGbG9hdDMyQXJyYXkoWzAsIDEsIDAsIDAsIDBdKVxuXHRjb25zdCBsZm9XYXZlID0gYXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZShyZWFsLCBpbWFnaW5hcnkpXG5cblx0LyogcGFyYW1ldGVycyB2YWx1ZXMgKi9cblx0bGV0IGRlbGF5VGltZVZhbHVlID0gMC4wMVxuXHRsZXQgcmVsZWFzZVRpbWVWYWx1ZSA9IDAuMVxuXHRsZXQgb3V0cHV0R2FpblZhbHVlID0gMC45XG5cdGxldCBmcmVxdWVuY3lWYWx1ZSA9IDE4MDAwXG5cdGxldCBsZm9HYWluVmFsdWUgPSAxXG5cdGxldCBsZm87XG5cblx0LyogY29uc3RhbnQgdmFsdWVzIChjYXV0aW9uIHdpdGggeW91ciBzcGVha2VycyAhKSAqL1xuXHRjb25zdCBNQVhfTEZPX0haX0ZSRVFVRU5DWSA9IDE4MDAwXG5cdGNvbnN0IE1BWF9ERUxBWV9USU1FX0lOX1NFQ09ORFMgPSAxXG5cdGNvbnN0IE1BWF9MRk9fR0FJTl9JTl9EQiA9IDFcblxuXHQvKiByb3V0aW5nICovXG5cdGlucHV0LmNvbm5lY3QoYXR0ZW51YXRvcilcblx0YXR0ZW51YXRvci5jb25uZWN0KG91dHB1dClcblx0YXR0ZW51YXRvci5jb25uZWN0KGNoYW5uZWxTcGxpdHRlcilcblx0Y2hhbm5lbFNwbGl0dGVyLmNvbm5lY3Qoc3RlcmVvTGVmdERlbGF5LCAwKVxuXHRjaGFubmVsU3BsaXR0ZXIuY29ubmVjdChzdGVyZW9SaWdodERlbGF5LCAxKVxuXHRzdGVyZW9MZWZ0RGVsYXkuY29ubmVjdChmZWVkYmFja0xlZnRUb1JpZ2h0KVxuXHRzdGVyZW9SaWdodERlbGF5LmNvbm5lY3QoZmVlZGJhY2tSaWdodFRvTGVmdClcblx0ZmVlZGJhY2tMZWZ0VG9SaWdodC5jb25uZWN0KGZlZWRiYWNrRmlsdGVyKVxuXHRmZWVkYmFja1JpZ2h0VG9MZWZ0LmNvbm5lY3QoZmVlZGJhY2tGaWx0ZXIpXG5cdGZlZWRiYWNrRmlsdGVyLmNvbm5lY3Qoc3RlcmVvTGVmdERlbGF5KVxuXHRmZWVkYmFja0ZpbHRlci5jb25uZWN0KHN0ZXJlb1JpZ2h0RGVsYXkpXG5cdGZlZWRiYWNrUmlnaHRUb0xlZnQuY29ubmVjdChzdGVyZW9MZWZ0RGVsYXkpXG5cdHN0ZXJlb0xlZnREZWxheS5jb25uZWN0KGNoYW5uZWxNZXJnZXIsIDAsIDApXG5cdHN0ZXJlb1JpZ2h0RGVsYXkuY29ubmVjdChjaGFubmVsTWVyZ2VyLCAwLCAxKVxuXHRsZm9HYWluLmNvbm5lY3Qoc3RlcmVvUmlnaHREZWxheS5kZWxheVRpbWUpXG5cdGxmb0dhaW4uY29ubmVjdChzdGVyZW9MZWZ0RGVsYXkuZGVsYXlUaW1lKVxuXHRsZm9HYWluLmNvbm5lY3QoZmVlZGJhY2tGaWx0ZXIuZnJlcXVlbmN5KVxuXHRjaGFubmVsTWVyZ2VyLmNvbm5lY3Qob3V0cHV0KVxuXG5cdC8qIHNldHRpbmcgZGVmYXVsdCB2YWx1ZXMgKi9cblx0ZmVlZGJhY2tSaWdodFRvTGVmdC5nYWluLnZhbHVlID0gMC4yXG5cdGZlZWRiYWNrTGVmdFRvUmlnaHQuZ2Fpbi52YWx1ZSA9IDAuMlxuXHRmZWVkYmFja0ZpbHRlci50eXBlID0gJ2JhbmRwYXNzJ1xuXHRmZWVkYmFja0ZpbHRlci5RLnZhbHVlID0gMTAwXG5cdGZlZWRiYWNrRmlsdGVyLmdhaW4udmFsdWUgPSAwLjVcblx0bGZvR2Fpbi5nYWluLnZhbHVlID0gbGZvR2FpblZhbHVlXG5cdHN0ZXJlb0xlZnREZWxheS5kZWxheVRpbWUudmFsdWUgPSBkZWxheVRpbWVWYWx1ZVxuXHRzdGVyZW9SaWdodERlbGF5LmRlbGF5VGltZS52YWx1ZSA9IGRlbGF5VGltZVZhbHVlXG5cblxuXG5cdGF0dGVudWF0b3IuZ2Fpbi52YWx1ZSA9IDAuNlxuXHRvdXRwdXQuZ2Fpbi52YWx1ZSA9IDFFLTEwMFxuXHRyZXR1cm4ge1xuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBnZXRJbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChnZXRJbnB1dCgpKVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRnZXRJbnB1dCgpIHtcblx0XHRcdHJldHVybiBpbnB1dFxuXHRcdH0sXG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUpIHtcblx0XHRcdGxmbyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdGxmby5jb25uZWN0KGxmb0dhaW4pXG5cdFx0XHRsZm8uZnJlcXVlbmN5LnZhbHVlID0gTWF0aC5yYW5kb20oKSAqIGZyZXF1ZW5jeVZhbHVlXG5cdFx0XHRsZm8uc2V0UGVyaW9kaWNXYXZlKGxmb1dhdmUpXG5cdFx0XHRsZm8uc3RhcnQodGltZSlcblx0XHRcdG91dHB1dC5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKG91dHB1dEdhaW5WYWx1ZSwgdGltZSlcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSkge1xuXHRcdFx0b3V0cHV0LmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMCwgdGltZSArIHJlbGVhc2VUaW1lVmFsdWUpXG5cdFx0XHRsZm8uc3RvcCh0aW1lICsgcmVsZWFzZVRpbWVWYWx1ZSlcblx0XHR9LFxuXHRcdHNldFJpbmdNb2R1bGF0aW9uKHZhbHVlKSB7XG5cdFx0XHRjb25zdCBub3JtYWxpemVkVmFsdWUgPSBjbGFtcCgwLCAxLCB2YWx1ZSlcblx0XHRcdGZyZXF1ZW5jeVZhbHVlID0gTUFYX0xGT19IWl9GUkVRVUVOQ1kgKiBub3JtYWxpemVkVmFsdWVcblx0XHR9LFxuXHRcdHNldERlbGF5VGltZVZhbHVlKHZhbHVlKSB7XG5cdFx0XHRjb25zdCBub3JtYWxpemVkVmFsdWUgPSBjbGFtcCgwLCAxLCB2YWx1ZSlcblx0XHRcdGRlbGF5VGltZVZhbHVlID0gTUFYX0RFTEFZX1RJTUVfSU5fU0VDT05EUyAqIG5vcm1hbGl6ZWRWYWx1ZVxuXHRcdH0sXG5cdFx0c2V0UmVsZWFzZVRpbWVWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0cmVsZWFzZVRpbWVWYWx1ZSA9IHZhbHVlXG5cdFx0fSxcblx0XHRzZXRMZm9HYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IGNsYW1wKDAsIDEsIHZhbHVlKVxuXHRcdFx0bGZvR2FpblZhbHVlID0gTUFYX0xGT19HQUlOX0lOX0RCICogbm9ybWFsaXplZFZhbHVlXG5cdFx0fSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hY3Jvcy9lZmZlY3RzL3JpbmctbW9kdWxhdG9yLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==