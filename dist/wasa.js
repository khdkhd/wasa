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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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

module.exports = { "default": __webpack_require__(18), __esModule: true };

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

module.exports = { "default": __webpack_require__(28), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(23);
var IE8_DOM_DEFINE = __webpack_require__(24);
var toPrimitive = __webpack_require__(26);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(0);
var ctx = __webpack_require__(20);
var hide = __webpack_require__(22);
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
/* 9 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(33);
var defined = __webpack_require__(9);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8);
var core = __webpack_require__(0);
var fails = __webpack_require__(4);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = exports.unscale = undefined;

var _ramda = __webpack_require__(47);

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
/* 17 */
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

var _common = __webpack_require__(41);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _core = __webpack_require__(48);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _core[key];
    }
  });
});

var _blocks = __webpack_require__(53);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_blocks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _blocks[key];
    }
  });
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(19);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(21);
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
/* 21 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(27);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(25)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(30);
var $keys = __webpack_require__(31);

__webpack_require__(14)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(32);
var enumBugKeys = __webpack_require__(40);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(35)(false);
var IE_PROTO = __webpack_require__(38)('IE_PROTO');

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(34);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(37);
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(12);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys');
var uid = __webpack_require__(13);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 41 */
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

var _dispatcher = __webpack_require__(42);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(16);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(15);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(46);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(45).onFreeze;

__webpack_require__(14)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(13)('meta');
var isObject = __webpack_require__(1);
var has = __webpack_require__(10);
var setDesc = __webpack_require__(7).f;
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
/* 46 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("ramda");

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

var _sequencer = __webpack_require__(49);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_sequencer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _sequencer[key];
    }
  });
});

var _note = __webpack_require__(52);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Sequencer = undefined;

var _workerTimer = __webpack_require__(50);

var _workerTimer2 = _interopRequireDefault(_workerTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequencer = exports.Sequencer = audioContext => {
	/* time values */
	var division = 4; // ticks per quarter note
	var startTime = 0; // start time
	var tickTime = 0; // next tick time
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
		if (!stop && currentTime >= tickTime) {
			tick += 1;
			op(tick, tempo, division);
			tickTime = currentTime + 60 / (tempo * division);
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
			tickTime = 0;
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
			division = value;
			return this;
		},
		getDivision() {
			return division;
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
/* 50 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(51)))

/***/ }),
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFrequency = exports.Note = exports.DURATIONS = undefined;

var _freeze = __webpack_require__(15);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DURATIONS = exports.DURATIONS = (0, _freeze2.default)({
	WHOLE: 1,
	HALF: 1 / 2,
	QUARTER: 1 / 4,
	EIGHTH: 1 / 8
});

var Note = exports.Note = ({ note, octave, duration }) => ({
	getNote() {
		return note;
	},
	getOctave() {
		return octave;
	},
	getDuration() {
		return DURATIONS[duration] || duration;
	}
});

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} note - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
var getFrequency = exports.getFrequency = (note, octave) => {
	var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	var o = 4; // base octave
	var n = 'A'; // base note
	var f = 440; // base frequency
	var d = notes.indexOf(note) - notes.indexOf(n); // delta
	var a = Math.pow(2, 1 / 12); // semi tone factor
	var m = octave - o >= 0 ? octave - o + 1 : 1 / (o - octave + 1); // multiplier
	return f * Math.pow(a, d) * m;
};

/***/ }),
/* 53 */
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

var _kick = __webpack_require__(54);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_kick).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _kick[key];
    }
  });
});

var _hat = __webpack_require__(55);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_hat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _hat[key];
    }
  });
});

var _snare = __webpack_require__(56);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_snare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _snare[key];
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
var Kick = exports.Kick = audioContext => {
	var output = audioContext.createGain();
	var gains = [audioContext.createGain(), audioContext.createGain()];
	var filter = audioContext.createBiquadFilter();
	filter.type = 'lowshelf';
	filter.frequency.value = 50;
	filter.gain.value = -1;
	gains.forEach(gain => {
		gain.connect(filter);
		gain.gain.setValueAtTime(1E-10, 0);
	});
	filter.connect(output);
	var oscs = [];
	var subOscEnabled = true;
	var mainOsc = void 0;
	var subOsc = void 0;
	var freq = 100;
	var finalFreq = 0.01;
	var duration = 0.25;
	var attack = 0.01;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			mainOsc = audioContext.createOscillator();
			mainOsc.type = 'triangle';
			mainOsc.frequency.setValueAtTime(freq, time);
			mainOsc.frequency.exponentialRampToValueAtTime(finalFreq, time + duration);
			oscs = [mainOsc];
			if (subOscEnabled) {
				subOsc = audioContext.createOscillator();
				subOsc.type = 'triangle';
				subOsc.frequency.setValueAtTime(freq / 2, time);
				subOsc.frequency.exponentialRampToValueAtTime(finalFreq / 2, time + duration);
				oscs.push(subOsc);
			}
			gains.forEach(gain => {
				gain.gain.linearRampToValueAtTime(1 / oscs.length * velocity, time + attack);
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
		connect({ connect, input }) {
			output.connect(input);
			return { connect };
		},
		setFinalFrequencyValue(value) {
			finalFreq = value;
			return this;
		},
		getFinalFrequencyValue() {
			return finalFreq;
		},
		setFrequencyValue(value) {
			freq = value;
			return this;
		},
		getFrequencyValue() {
			return freq;
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
		getAttackValue() {
			return attack;
		},
		setAttackValue(value) {
			attack = value;
			return this;
		},
		getIsSubOscEnabled() {
			return subOscEnabled;
		},
		setIsSubOscEnabled(value) {
			subOscEnabled = value;
			return this;
		}
	};
}; // @Flow

/***/ }),
/* 55 */
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
		connect({ connect, input }) {
			output.connect(input);
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Snare = undefined;

var _audioNodeMixer = __webpack_require__(57);

// @Flow
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
	var nodeMixer = (0, _audioNodeMixer.AudioNodeMixer)(audioContext);

	var osc = void 0;
	var noise = void 0;
	var duration = 0.25;
	var frequency = 100;
	var oscMixValue = 0.5;
	var noiseFilterValue = 1000;

	var real = new Float32Array([0, 0, 1, 0, 1]);
	var imag = new Float32Array(real.length);
	var customWave = audioContext.createPeriodicWave(real, imag);

	noiseFilter.type = 'lowpass';
	noiseFilter.frequency.value = noiseFilterValue;
	noiseFilter.connect(noiseGain);
	nodeMixer.setLeftInput(noiseGain);
	nodeMixer.setRightInput(oscGain);
	nodeMixer.connect({ input: output });

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
		connect({ connect, input }) {
			output.connect(input);
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AudioNodeMixer = undefined;

var _range = __webpack_require__(16);

var AudioNodeMixer = exports.AudioNodeMixer = audioContext => {
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
		connect({ input, connect }) {
			outputGainNode.connect(input);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTI2OWRiOWMwMzdjMWE3N2ZhOTQiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vcmFuZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyeGpzXCIsXCJjb21tb25qczJcIjpcInJ4anNcIixcImFtZFwiOlwicnhqc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ibG9ja3Mva2ljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL3NuYXJlLmpzIiwid2VicGFjazovLy8uL3NyYy9ibG9ja3MvYXVkaW8tbm9kZS1taXhlci5qcyJdLCJuYW1lcyI6WyJ1bnNjYWxlIiwicmFuZ2UiLCJ2YWx1ZSIsIm1heCIsIm1pbiIsInNjYWxlIiwiRXZlbnRzIiwiU0VRVUVOQ0VSX1NUQVJUIiwiU0VRVUVOQ0VSX1NUT1AiLCJTRVFVRU5DRVJfVElDSyIsIlRFTVBPX0NIQU5HRSIsIkNIQU5HRSIsIkRpc3BhdGNoZXIiLCJzdWJqZWN0IiwiZGlzcGF0Y2giLCJ0eXBlIiwiZGF0YSIsIm5leHQiLCJhcyIsImZpbHRlciIsImFjdGlvbiIsIm1hcCIsIlNlcXVlbmNlciIsImF1ZGlvQ29udGV4dCIsImRpdmlzaW9uIiwic3RhcnRUaW1lIiwidGlja1RpbWUiLCJ0aWNrIiwib25UaWNrIiwib25TdG9wIiwib25TdGFydCIsIm9uTG9vcCIsInN0b3AiLCJsb29wIiwidGVtcG8iLCJsZW5ndGgiLCJ0aW1lciIsInNjaGVkdWxlIiwib3AiLCJjdXJyZW50VGltZSIsInBsYXkiLCJzZXRJbnRlcnZhbCIsInN0YXJ0IiwiY2xlYXJJbnRlcnZhbCIsImlzU3RhcnRlZCIsInNldExvb3BNb2RlIiwiZ2V0TG9vcE1vZGUiLCJzZXRMZW5ndGgiLCJnZXRMZW5ndGgiLCJzZXREaXZpc2lvbiIsImdldERpdmlzaW9uIiwic2V0VGVtcG8iLCJnZXRUZW1wbyIsImdldFRpbWUiLCJEVVJBVElPTlMiLCJXSE9MRSIsIkhBTEYiLCJRVUFSVEVSIiwiRUlHSFRIIiwiTm90ZSIsIm5vdGUiLCJvY3RhdmUiLCJkdXJhdGlvbiIsImdldE5vdGUiLCJnZXRPY3RhdmUiLCJnZXREdXJhdGlvbiIsImdldEZyZXF1ZW5jeSIsIm5vdGVzIiwibyIsIm4iLCJmIiwiZCIsImluZGV4T2YiLCJhIiwibSIsIktpY2siLCJvdXRwdXQiLCJjcmVhdGVHYWluIiwiZ2FpbnMiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJmcmVxdWVuY3kiLCJnYWluIiwiZm9yRWFjaCIsImNvbm5lY3QiLCJzZXRWYWx1ZUF0VGltZSIsIm9zY3MiLCJzdWJPc2NFbmFibGVkIiwibWFpbk9zYyIsInN1Yk9zYyIsImZyZXEiLCJmaW5hbEZyZXEiLCJhdHRhY2siLCJub3RlT24iLCJ0aW1lIiwidmVsb2NpdHkiLCJjcmVhdGVPc2NpbGxhdG9yIiwiZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSIsInB1c2giLCJsaW5lYXJSYW1wVG9WYWx1ZUF0VGltZSIsIm9zYyIsImkiLCJub3RlT2ZmIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwiaW5wdXQiLCJzZXRGaW5hbEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RmluYWxGcmVxdWVuY3lWYWx1ZSIsInNldEZyZXF1ZW5jeVZhbHVlIiwiZ2V0RnJlcXVlbmN5VmFsdWUiLCJzZXREdXJhdGlvblZhbHVlIiwiZ2V0RHVyYXRpb25WYWx1ZSIsInNldE91dHB1dEdhaW5WYWx1ZSIsImdldE91dHB1dEdhaW5WYWx1ZSIsImdldEF0dGFja1ZhbHVlIiwic2V0QXR0YWNrVmFsdWUiLCJnZXRJc1N1Yk9zY0VuYWJsZWQiLCJzZXRJc1N1Yk9zY0VuYWJsZWQiLCJIYXQiLCJyYXRpb3MiLCJiYW5kcGFzcyIsImhpZ2hwYXNzIiwiZnVuZGFtZW50YWwiLCJyYXRpbyIsInNldER1cmF0aW9uIiwiU25hcmUiLCJidWZmZXJTaXplIiwic2FtcGxlUmF0ZSIsImJ1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImdldENoYW5uZWxEYXRhIiwiTWF0aCIsInJhbmRvbSIsIm5vaXNlR2FpbiIsIm5vaXNlRmlsdGVyIiwib3NjR2FpbiIsIm5vZGVNaXhlciIsIm5vaXNlIiwib3NjTWl4VmFsdWUiLCJub2lzZUZpbHRlclZhbHVlIiwicmVhbCIsIkZsb2F0MzJBcnJheSIsImltYWciLCJjdXN0b21XYXZlIiwiY3JlYXRlUGVyaW9kaWNXYXZlIiwic2V0TGVmdElucHV0Iiwic2V0UmlnaHRJbnB1dCIsInNldFBlcmlvZGljV2F2ZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsInNldE9zY01peFZhbHVlIiwiZmFkZSIsImdldE9zY01peFZhbHVlIiwic2V0Tm9pc2VGaWx0ZXJWYWx1ZSIsImdldE5vaXNlRmlsdGVyVmFsdWUiLCJBdWRpb05vZGVNaXhlciIsIm91dHB1dEdhaW5Ob2RlIiwibGVmdEdhaW5Ob2RlIiwicmlnaHRHYWluTm9kZSIsImFicyIsImF1ZGlvTm9kZSIsImdldExlZnRHYWluTm9kZSIsImdldFJpZ2h0R2Fpbk5vZGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsNkJBQTZCO0FBQzdCLHVDQUF1Qzs7Ozs7OztBQ0R2QztBQUNBO0FBQ0E7Ozs7Ozs7QUNGQSxrQkFBa0Isd0Q7Ozs7OztBQ0FsQjtBQUNBO0FBQ0EsaUNBQWlDLFFBQVEsbUJBQW1CLFVBQVUsRUFBRSxFQUFFO0FBQzFFLENBQUM7Ozs7Ozs7QUNIRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOzs7Ozs7O0FDTkEsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5Qzs7Ozs7OztBQ0x6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHLFlBQVk7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUU7QUFDakU7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QWIsQ0FBcUJzRSxjQUFyQjtBQUNBRSxlQUFjeEUsT0FBZCxDQUFzQnNFLGNBQXRCO0FBQ0FDLGNBQWF6RSxJQUFiLENBQWtCL0UsS0FBbEIsR0FBMEIsR0FBMUI7QUFDQXlKLGVBQWMxRSxJQUFkLENBQW1CL0UsS0FBbkIsR0FBMkIsR0FBM0I7O0FBRUEsUUFBTztBQUNOa0osT0FBS2xKLEtBQUwsRUFBWTtBQUNGd0osZ0JBQWF6RSxJQUFiLENBQWtCL0UsS0FBbEIsR0FBMEIsSUFBSStILEtBQUsyQixHQUFMLENBQVMxSixLQUFULENBQTlCO0FBQ0F5SixpQkFBYzFFLElBQWQsQ0FBbUIvRSxLQUFuQixHQUEyQitILEtBQUsyQixHQUFMLENBQVMxSixLQUFULENBQTNCO0FBQ1QsR0FKSztBQUtONkksZUFBYWMsU0FBYixFQUF3QjtBQUN2QkEsYUFBVTFFLE9BQVYsQ0FBa0J1RSxZQUFsQjtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBUks7QUFTTlYsZ0JBQWNhLFNBQWQsRUFBeUI7QUFDeEJBLGFBQVUxRSxPQUFWLENBQWtCd0UsYUFBbEI7QUFDQSxVQUFPLElBQVA7QUFDQSxHQVpLO0FBYU54RSxVQUFRLEVBQUVvQixLQUFGLEVBQVNwQixPQUFULEVBQVIsRUFBNEI7QUFDM0JzRSxrQkFBZXRFLE9BQWYsQ0FBdUJvQixLQUF2QjtBQUNBLFVBQU8sRUFBRXBCLE9BQUYsRUFBUDtBQUNBLEdBaEJLO0FBaUJOMkUsb0JBQWtCO0FBQ2pCLFVBQU9KLFlBQVA7QUFDQSxHQW5CSztBQW9CTksscUJBQW1CO0FBQ2xCLFVBQU9KLGFBQVA7QUFDQTtBQXRCSyxFQUFQO0FBd0JBLENBbENNLEMiLCJmaWxlIjoid2FzYS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxMjY5ZGI5YzAzN2MxYTc3ZmE5NCIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcyLjUuMScgfTtcbmlmICh0eXBlb2YgX19lID09ICdudW1iZXInKSBfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmICh0eXBlb2YgX19nID09ICdudW1iZXInKSBfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgY3R4ID0gcmVxdWlyZSgnLi9fY3R4Jyk7XG52YXIgaGlkZSA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbiAodHlwZSwgbmFtZSwgc291cmNlKSB7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GO1xuICB2YXIgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuRztcbiAgdmFyIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlM7XG4gIHZhciBJU19QUk9UTyA9IHR5cGUgJiAkZXhwb3J0LlA7XG4gIHZhciBJU19CSU5EID0gdHlwZSAmICRleHBvcnQuQjtcbiAgdmFyIElTX1dSQVAgPSB0eXBlICYgJGV4cG9ydC5XO1xuICB2YXIgZXhwb3J0cyA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pO1xuICB2YXIgZXhwUHJvdG8gPSBleHBvcnRzW1BST1RPVFlQRV07XG4gIHZhciB0YXJnZXQgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdO1xuICB2YXIga2V5LCBvd24sIG91dDtcbiAgaWYgKElTX0dMT0JBTCkgc291cmNlID0gbmFtZTtcbiAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZiAob3duICYmIGtleSBpbiBleHBvcnRzKSBjb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uIChDKSB7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgQykge1xuICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEMoKTtcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYgKElTX1BST1RPKSB7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYgKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0pIGhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaWQgPSAwO1xudmFyIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEtFWSwgZXhlYykge1xuICB2YXIgZm4gPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV07XG4gIHZhciBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbiAoKSB7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGlzTmlsIH0gZnJvbSAncmFtZGEnXG5cbi8qKlxuICogVW5ub3JtYWxpemVzIGEgWzAtMV0gcmFuZ2UgdmFsdWUgYmFjayB0byB0aGUgZ2l2ZW4gcmFuZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSByYW5nZSAtIFRoZSBvcmlnaW5hbCByYW5nZSBpbiB3aGljaCB2YWx1ZSBzY2FsZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byBiZSBzY2FsZWQgdG8gYSBbMCwxXSByYW5nZVxuICovXG5leHBvcnQgY29uc3QgdW5zY2FsZSA9IChyYW5nZSwgdmFsdWUpID0+IHtcblx0aWYgKGlzTmlsKHJhbmdlKSkge1xuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHJldHVybiAoKHJhbmdlLm1heCAtIHJhbmdlLm1pbikgKiB2YWx1ZSkgKyByYW5nZS5taW5cbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHZhbHVlIHRvIGEgWzAsMV0gcmFuZ2UgZ2l2ZW4gaXRzIG9yaWdpbmFsIHJhbmdlLm1pbiBhbmQgcmFuZ2UubWF4XG4gKiBAcGFyYW0ge09iamVjdH0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IHNjYWxlID0gKHJhbmdlLCB2YWx1ZSkgPT4ge1xuXHRpZiAoaXNOaWwocmFuZ2UpKSB7XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0cmV0dXJuICh2YWx1ZSAtIHJhbmdlLm1pbikgLyAocmFuZ2UubWF4IC0gcmFuZ2UubWluKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsImV4cG9ydCAqIGZyb20gJy4vY29tbW9uJ1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlJ1xuZXhwb3J0ICogZnJvbSAnLi9ibG9ja3MnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpIHtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHsgZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmYgfSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCwgUykge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICh0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5cztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpIHtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pIHtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0lPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pIGlmIChrZXkgIT0gSUVfUFJPVE8pIGhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi9fdG8tYWJzb2x1dGUtaW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSU9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIGlmIChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSB7XG4gICAgICBpZiAoT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9kaXNwYXRjaGVyJ1xuZXhwb3J0ICogZnJvbSAnLi9yYW5nZSdcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vaW5kZXguanMiLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcydcblxuZXhwb3J0IGNvbnN0IEV2ZW50cyA9IE9iamVjdC5mcmVlemUoe1xuXHRTRVFVRU5DRVJfU1RBUlRcdDogMCxcblx0U0VRVUVOQ0VSX1NUT1BcdDogMSxcblx0U0VRVUVOQ0VSX1RJQ0tcdDogMixcblx0VEVNUE9fQ0hBTkdFXHQ6IDMsXG5cdENIQU5HRTogOTk5LFxufSlcblxuZXhwb3J0IGNvbnN0IERpc3BhdGNoZXIgPSAoKCkgPT4ge1xuXHRjb25zdCBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKVxuXHRyZXR1cm4ge1xuXHRcdGRpc3BhdGNoKHR5cGUsIGRhdGEpIHtcblx0XHRcdHN1YmplY3QubmV4dCh7IHR5cGUsIGRhdGEgfSlcblx0XHR9LFxuXHRcdGFzKHR5cGUpIHtcblx0XHRcdHJldHVybiBzdWJqZWN0XG5cdFx0XHRcdC5maWx0ZXIoYWN0aW9uID0+IGFjdGlvbi50eXBlID09PSB0eXBlKVxuXHRcdFx0XHQubWFwKGFjdGlvbiA9PiBhY3Rpb24uZGF0YSlcblx0XHR9LFxuXHR9XG59KSgpXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2Rpc3BhdGNoZXIuanMiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZnJlZXplO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemUuanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi41IE9iamVjdC5mcmVlemUoTylcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIG1ldGEgPSByZXF1aXJlKCcuL19tZXRhJykub25GcmVlemU7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZnJlZXplJywgZnVuY3Rpb24gKCRmcmVlemUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWV6ZShpdCkge1xuICAgIHJldHVybiAkZnJlZXplICYmIGlzT2JqZWN0KGl0KSA/ICRmcmVlemUobWV0YShpdCkpIDogaXQ7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgTUVUQSA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuL19oYXMnKTtcbnZhciBzZXREZXNjID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbnZhciBpZCA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24gKGl0KSB7XG4gIHNldERlc2MoaXQsIE1FVEEsIHsgdmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IH0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZiAoIWlzT2JqZWN0KGl0KSkgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbiAoaXQsIGNyZWF0ZSkge1xuICBpZiAoIWhhcyhpdCwgTUVUQSkpIHtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmICghaXNFeHRlbnNpYmxlKGl0KSkgcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZiAoIWNyZWF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSkgc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6IE1FVEEsXG4gIE5FRUQ6IGZhbHNlLFxuICBmYXN0S2V5OiBmYXN0S2V5LFxuICBnZXRXZWFrOiBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnhqc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn1cbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJhbWRhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyYW1kYVwiLFwiY29tbW9uanMyXCI6XCJyYW1kYVwiLFwiYW1kXCI6XCJyYW1kYVwifVxuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSAnLi9zZXF1ZW5jZXInXG5leHBvcnQgKiBmcm9tICcuL25vdGUnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9pbmRleC5qcyIsImltcG9ydCBXb3JrZXJUaW1lciBmcm9tICd3b3JrZXItdGltZXInXG5cbmV4cG9ydCBjb25zdCBTZXF1ZW5jZXIgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdC8qIHRpbWUgdmFsdWVzICovXG5cdGxldCBkaXZpc2lvbiA9IDQgLy8gdGlja3MgcGVyIHF1YXJ0ZXIgbm90ZVxuXHRsZXQgc3RhcnRUaW1lID0gMCAvLyBzdGFydCB0aW1lXG5cdGxldCB0aWNrVGltZSA9IDAgLy8gbmV4dCB0aWNrIHRpbWVcblx0bGV0IHRpY2sgPSAwXG5cdC8qIHN0YXRlIGNoYW5nZSBjYWxsYmFja3MgKi9cblx0bGV0IG9uVGljayA9ICgpID0+IHt9XG5cdGxldCBvblN0b3AgPSAoKSA9PiB7fVxuXHRsZXQgb25TdGFydCA9ICgpID0+IHt9XG5cdGxldCBvbkxvb3AgPSAoKSA9PiB7fVxuXHQvKiBzdGF0ZSAqL1xuXHRsZXQgc3RvcCA9IHRydWVcblx0bGV0IGxvb3AgPSB0cnVlXG5cdGxldCB0ZW1wbyA9IDEzMFxuXHRsZXQgbGVuZ3RoID0gMTZcblxuXHRsZXQgdGltZXJcblxuXHQvKipcblx0ICogU2NoZWR1bGUgaXMgY2FsbGVkIGV2ZXJ5IHRpbWUgYSBuZXcgdGljayBvY2N1cnNcblx0ICogQHBhcmFtIHtmdW5jdGlvbn0gb3AgLSBvbiB0aWNrIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdCAqL1xuXHRjb25zdCBzY2hlZHVsZSA9IChvcCkgPT4ge1xuXHRcdGNvbnN0IGN1cnJlbnRUaW1lID0gKGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZSlcblx0XHRpZiAoIXN0b3AgJiYgY3VycmVudFRpbWUgPj0gdGlja1RpbWUpIHtcblx0XHRcdHRpY2sgKz0gMVxuXHRcdFx0b3AodGljaywgdGVtcG8sIGRpdmlzaW9uKVxuXHRcdFx0dGlja1RpbWUgPSBjdXJyZW50VGltZSArICg2MCAvICh0ZW1wbyAqIGRpdmlzaW9uKSlcblx0XHRcdGlmIChsb29wICYmIHRpY2sgPT09IGxlbmd0aCkge1xuXHRcdFx0XHR0aWNrID0gMFxuXHRcdFx0XHRvbkxvb3AoKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IHBsYXkgPSAoKSA9PiB7XG5cdFx0c2NoZWR1bGUob25UaWNrKVxuXHRcdHRpbWVyID0gV29ya2VyVGltZXIuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdFx0c2NoZWR1bGUob25UaWNrKVxuXHRcdH0sIDApXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHN0YXJ0KCkge1xuXHRcdFx0b25TdGFydCgpXG5cdFx0XHRzdGFydFRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWVcblx0XHRcdHN0b3AgPSBmYWxzZVxuXHRcdFx0cGxheSgpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c3RvcCgpIHtcblx0XHRcdFdvcmtlclRpbWVyLmNsZWFySW50ZXJ2YWwodGltZXIpXG5cdFx0XHRzdG9wID0gdHJ1ZVxuXHRcdFx0dGlja1RpbWUgPSAwXG5cdFx0XHR0aWNrID0gMFxuXHRcdFx0b25TdG9wKClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRpc1N0YXJ0ZWQoKSB7XG5cdFx0XHRyZXR1cm4gIXN0b3Bcblx0XHR9LFxuXHRcdHNldExvb3BNb2RlKHZhbHVlKSB7XG5cdFx0XHRsb29wID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMb29wTW9kZSgpIHtcblx0XHRcdHJldHVybiBsb29wXG5cdFx0fSxcblx0XHRzZXRMZW5ndGgodmFsdWUpIHtcblx0XHRcdGxlbmd0aCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0TGVuZ3RoKCkge1xuXHRcdFx0cmV0dXJuIGxlbmd0aFxuXHRcdH0sXG5cdFx0c2V0RGl2aXNpb24odmFsdWUpIHtcblx0XHRcdGRpdmlzaW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREaXZpc2lvbigpIHtcblx0XHRcdHJldHVybiBkaXZpc2lvblxuXHRcdH0sXG5cdFx0c2V0VGVtcG8odmFsdWUpIHtcblx0XHRcdHRlbXBvID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRUZW1wbygpIHtcblx0XHRcdHJldHVybiB0ZW1wb1xuXHRcdH0sXG5cdFx0Z2V0VGltZSgpIHtcblx0XHRcdHJldHVybiBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgLSBzdGFydFRpbWVcblx0XHR9LFxuXHRcdG9uU3RhcnQob3ApIHtcblx0XHRcdG9uU3RhcnQgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uU3RvcChvcCkge1xuXHRcdFx0b25TdG9wID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvblRpY2sob3ApIHtcblx0XHRcdG9uVGljayA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25Mb29wKG9wKSB7XG5cdFx0XHRvbkxvb3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9zZXF1ZW5jZXIuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaWYgKGdsb2JhbCA9PT0gZ2xvYmFsLndpbmRvdyAmJiBnbG9iYWwuVVJMICYmIGdsb2JhbC5CbG9iICYmIGdsb2JhbC5Xb3JrZXIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIFRJTUVSX1dPUktFUl9TT1VSQ0UgPSBbXG4gICAgICBcInZhciB0aW1lcklkcyA9IHt9LCBfID0ge307XCIsXG4gICAgICBcIl8uc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgdGltZXJJZHNbYXJncy50aW1lcklkXSA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhckludGVydmFsID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFySW50ZXJ2YWwodGltZXJJZHNbYXJncy50aW1lcklkXSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uc2V0VGltZW91dCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0VGltZW91dChmdW5jdGlvbigpIHsgcG9zdE1lc3NhZ2UoYXJncy50aW1lcklkKTsgfSwgYXJncy5kZWxheSk7XCIsXG4gICAgICBcIn07XCIsXG4gICAgICBcIl8uY2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIGNsZWFyVGltZW91dCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwib25tZXNzYWdlID0gZnVuY3Rpb24oZSkgeyBfW2UuZGF0YS50eXBlXShlLmRhdGEpIH07XCJcbiAgICBdLmpvaW4oXCJcIik7XG5cbiAgICB2YXIgX3RpbWVySWQgPSAwO1xuICAgIHZhciBfY2FsbGJhY2tzID0ge307XG4gICAgdmFyIF90aW1lciA9IG5ldyBnbG9iYWwuV29ya2VyKGdsb2JhbC5VUkwuY3JlYXRlT2JqZWN0VVJMKFxuICAgICAgbmV3IGdsb2JhbC5CbG9iKFsgVElNRVJfV09SS0VSX1NPVVJDRSBdLCB7IHR5cGU6IFwidGV4dC9qYXZhc2NyaXB0XCIgfSlcbiAgICApKTtcblxuICAgIF90aW1lci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoX2NhbGxiYWNrc1tlLmRhdGFdKSB7XG4gICAgICAgIF9jYWxsYmFja3NbZS5kYXRhXS5jYWxsYmFjay5hcHBseShudWxsLCBfY2FsbGJhY2tzW2UuZGF0YV0ucGFyYW1zKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNldEludGVydmFsOiBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICAgICAgdmFyIHBhcmFtcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG5cbiAgICAgICAgX3RpbWVySWQgKz0gMTtcblxuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInNldEludGVydmFsXCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIHNldFRpbWVvdXQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0VGltZW91dFwiLCB0aW1lcklkOiBfdGltZXJJZCwgZGVsYXk6IGRlbGF5IH0pO1xuICAgICAgICBfY2FsbGJhY2tzW190aW1lcklkXSA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBwYXJhbXM6IHBhcmFtcyB9O1xuXG4gICAgICAgIHJldHVybiBfdGltZXJJZDtcbiAgICAgIH0sXG4gICAgICBjbGVhckludGVydmFsOiBmdW5jdGlvbih0aW1lcklkKSB7XG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwiY2xlYXJJbnRlcnZhbFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjbGVhclRpbWVvdXQ6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhclRpbWVvdXRcIiwgdGltZXJJZDogdGltZXJJZCB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1t0aW1lcklkXSA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XG59IGNhdGNoKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcblx0XHRnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBjb25zdCBEVVJBVElPTlMgPSBPYmplY3QuZnJlZXplKHtcblx0V0hPTEU6IDEsXG5cdEhBTEY6IDEgLyAyLFxuXHRRVUFSVEVSOiAxIC8gNCxcblx0RUlHSFRIOiAxIC8gOCxcbn0pXG5cbmV4cG9ydCBjb25zdCBOb3RlID0gKHsgbm90ZSwgb2N0YXZlLCBkdXJhdGlvbiB9KSA9PiAoe1xuXHRnZXROb3RlKCkge1xuXHRcdHJldHVybiBub3RlXG5cdH0sXG5cdGdldE9jdGF2ZSgpIHtcblx0XHRyZXR1cm4gb2N0YXZlXG5cdH0sXG5cdGdldER1cmF0aW9uKCkge1xuXHRcdHJldHVybiBEVVJBVElPTlNbZHVyYXRpb25dIHx8IGR1cmF0aW9uXG5cdH0sXG59KVxuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBmcmVxdWVuY3kgdmFsdWUgb2YgdGhlIGdpdmVuIG5vdGUgaW4gdGhlIGdpdmVuIG9jdGF2ZVxuICogQHBhcmFtIHtzdHJpbmd9IG5vdGUgLSBOb3RlIGluIHNjYWxlIChlbmdsaXNoIG5vdGF0aW9uKVxuICogQHBhcmFtIHtudW1iZXJ9IG9jdGF2ZSAtIE9jdGF2ZSB2YWx1ZSBmb3Igbm90ZVxuICovXG5leHBvcnQgY29uc3QgZ2V0RnJlcXVlbmN5ID0gKG5vdGUsIG9jdGF2ZSkgPT4ge1xuXHRjb25zdCBub3RlcyA9IFsnQycsICdDIycsICdEJywgJ0QjJywgJ0UnLCAnRicsICdGIycsICdHJywgJ0cjJywgJ0EnLCAnQSMnLCAnQiddXG5cdGNvbnN0IG8gPSA0IC8vIGJhc2Ugb2N0YXZlXG5cdGNvbnN0IG4gPSAnQScgLy8gYmFzZSBub3RlXG5cdGNvbnN0IGYgPSA0NDAgLy8gYmFzZSBmcmVxdWVuY3lcblx0Y29uc3QgZCA9IG5vdGVzLmluZGV4T2Yobm90ZSkgLSBub3Rlcy5pbmRleE9mKG4pIC8vIGRlbHRhXG5cdGNvbnN0IGEgPSAyICoqICgxIC8gMTIpIC8vIHNlbWkgdG9uZSBmYWN0b3Jcblx0Y29uc3QgbSA9IG9jdGF2ZSAtIG8gPj0gMCA/ICgob2N0YXZlIC0gbykgKyAxKSA6IDEgLyAoKG8gLSBvY3RhdmUpICsgMSkgLy8gbXVsdGlwbGllclxuXHRyZXR1cm4gZiAqIChhICoqIGQpICogbVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvbm90ZS5qcyIsImV4cG9ydCAqIGZyb20gJy4va2ljaydcbmV4cG9ydCAqIGZyb20gJy4vaGF0J1xuZXhwb3J0ICogZnJvbSAnLi9zbmFyZSdcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jsb2Nrcy9pbmRleC5qcyIsIi8vIEBGbG93XG5pbXBvcnQgdHlwZSB7IEF1ZGlvQ29udGV4dCB9IGZyb20gXCIuLi9mbG93L2ktYXVkaW8tY29udGV4dFwiO1xuXG5leHBvcnQgY29uc3QgS2ljayA9IChhdWRpb0NvbnRleHQ6IEF1ZGlvQ29udGV4dCk6IE9iamVjdCA9PiB7XG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgZ2FpbnMgPSBbXG5cdFx0YXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSxcblx0XHRhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpLFxuXHRdXG5cdGNvbnN0IGZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRmaWx0ZXIudHlwZSA9ICdsb3dzaGVsZidcblx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDUwXG5cdGZpbHRlci5nYWluLnZhbHVlID0gLTFcblx0Z2FpbnMuZm9yRWFjaCgoZ2FpbikgPT4ge1xuXHRcdGdhaW4uY29ubmVjdChmaWx0ZXIpXG5cdFx0Z2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDFFLTEwLCAwKVxuXHR9KVxuXHRmaWx0ZXIuY29ubmVjdChvdXRwdXQpXG5cdGxldCBvc2NzID0gW11cblx0bGV0IHN1Yk9zY0VuYWJsZWQgPSB0cnVlXG5cdGxldCBtYWluT3NjXG5cdGxldCBzdWJPc2Ncblx0bGV0IGZyZXEgPSAxMDBcblx0bGV0IGZpbmFsRnJlcSA9IDAuMDFcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgYXR0YWNrID0gMC4wMVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0bWFpbk9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdG1haW5Pc2MudHlwZSA9ICd0cmlhbmdsZSdcblx0XHRcdG1haW5Pc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHRpbWUpXG5cdFx0XHRtYWluT3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZpbmFsRnJlcSwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0b3NjcyA9IFtcblx0XHRcdFx0bWFpbk9zYyxcblx0XHRcdF1cblx0XHRcdGlmIChzdWJPc2NFbmFibGVkKSB7XG5cdFx0XHRcdHN1Yk9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdFx0c3ViT3NjLnR5cGUgPSAndHJpYW5nbGUnXG5cdFx0XHRcdHN1Yk9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSAvIDIsIHRpbWUpXG5cdFx0XHRcdHN1Yk9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXEgLyAyLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0XHRcdG9zY3MucHVzaChzdWJPc2MpXG5cdFx0XHR9XG5cdFx0XHRnYWlucy5mb3JFYWNoKChnYWluKSA9PiB7XG5cdFx0XHRcdGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgoMSAvIG9zY3MubGVuZ3RoKSAqIHZlbG9jaXR5LCB0aW1lICsgYXR0YWNrKVxuXHRcdFx0XHRnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0fSlcblx0XHRcdG9zY3MuZm9yRWFjaCgob3NjLCBpKSA9PiB7XG5cdFx0XHRcdG9zYy5jb25uZWN0KGdhaW5zW2ldKVxuXHRcdFx0XHRvc2Muc3RhcnQodGltZSlcblx0XHRcdFx0b3NjLnN0b3AodGltZSArIGR1cmF0aW9uKVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRvc2NzLmZvckVhY2goKG9zYywgaSkgPT4ge1xuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRnYWluc1tpXS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBpbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChpbnB1dClcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RmluYWxGcmVxdWVuY3lWYWx1ZSh2YWx1ZSkge1xuXHRcdFx0ZmluYWxGcmVxID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRGaW5hbEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZpbmFsRnJlcVxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXEgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldEZyZXF1ZW5jeVZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGZyZXFcblx0XHR9LFxuXHRcdHNldER1cmF0aW9uVmFsdWUodmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvblZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGR1cmF0aW9uXG5cdFx0fSxcblx0XHRzZXRPdXRwdXRHYWluVmFsdWUodmFsdWUpIHtcblx0XHRcdG91dHB1dC5nYWluLnZhbHVlID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcblx0XHR9LFxuXHRcdGdldEF0dGFja1ZhbHVlKCkge1xuXHRcdFx0cmV0dXJuIGF0dGFja1xuXHRcdH0sXG5cdFx0c2V0QXR0YWNrVmFsdWUodmFsdWUpIHtcblx0XHRcdGF0dGFjayA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0SXNTdWJPc2NFbmFibGVkKCkge1xuXHRcdFx0cmV0dXJuIHN1Yk9zY0VuYWJsZWRcblx0XHR9LFxuXHRcdHNldElzU3ViT3NjRW5hYmxlZCh2YWx1ZSkge1xuXHRcdFx0c3ViT3NjRW5hYmxlZCA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9ja3Mva2ljay5qcyIsImV4cG9ydCBjb25zdCBIYXQgPSAoYXVkaW9Db250ZXh0KSA9PiB7XG5cdGNvbnN0IHJhdGlvcyA9IFsyLCAzLCA0LjE2LCA1LjQzLCA2Ljc5LCA4LjIxXVxuXHRjb25zdCBiYW5kcGFzcyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGhpZ2hwYXNzID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJpcXVhZEZpbHRlcigpXG5cdGNvbnN0IGZ1bmRhbWVudGFsID0gMzVcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgb3NjXG5cblx0YmFuZHBhc3MudHlwZSA9ICdiYW5kcGFzcydcblx0YmFuZHBhc3MuZnJlcXVlbmN5LnZhbHVlID0gMTAwMDBcblxuXHRoaWdocGFzcy50eXBlID0gJ2hpZ2hwYXNzJ1xuXHRoaWdocGFzcy5mcmVxdWVuY3kudmFsdWUgPSA3MDAwXG5cblx0YmFuZHBhc3MuY29ubmVjdChoaWdocGFzcylcblx0aGlnaHBhc3MuY29ubmVjdChvdXRwdXQpXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgdmVsb2NpdHkgPSAxKSB7XG5cdFx0XHRyYXRpb3MuZm9yRWFjaCgocmF0aW8pID0+IHtcblx0XHRcdFx0b3NjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU9zY2lsbGF0b3IoKVxuXHRcdFx0XHRvc2MudHlwZSA9ICdzcXVhcmUnXG5cdFx0XHRcdC8vIEZyZXF1ZW5jeSBpcyB0aGUgZnVuZGFtZW50YWwgKiB0aGlzIG9zY2lsbGF0b3IncyByYXRpb1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnZhbHVlID0gZnVuZGFtZW50YWwgKiByYXRpb1xuXHRcdFx0XHRvc2MuY29ubmVjdChiYW5kcGFzcylcblx0XHRcdFx0b3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdH0pXG5cdFx0XHRvdXRwdXQuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjAwMDAxLCB0aW1lKVxuXHRcdFx0b3V0cHV0LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxICogdmVsb2NpdHksIHRpbWUgKyAwLjAyKVxuXHRcdFx0b3V0cHV0LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjMsIHRpbWUgKyAwLjAzKVxuXHRcdFx0b3V0cHV0LmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMDAxLCB0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0aWYgKG9zYykge1xuXHRcdFx0XHRvdXRwdXQuZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0b3NjLnN0b3AodGltZSlcblx0XHRcdH1cblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBpbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChpbnB1dClcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RHVyYXRpb24odmFsdWUpIHtcblx0XHRcdGR1cmF0aW9uID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXREdXJhdGlvbigpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9ja3MvaGF0LmpzIiwiaW1wb3J0IHsgQXVkaW9Ob2RlTWl4ZXIgfSBmcm9tICcuL2F1ZGlvLW5vZGUtbWl4ZXInXG4vLyBARmxvd1xuZXhwb3J0IGNvbnN0IFNuYXJlID0gKGF1ZGlvQ29udGV4dDogT2JqZWN0KTogT2JqZWN0ID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2lzZUZpbHRlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBvc2NHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBub2RlTWl4ZXIgPSBBdWRpb05vZGVNaXhlcihhdWRpb0NvbnRleHQpXG5cbiAgICBsZXQgb3NjXG4gICAgbGV0IG5vaXNlXG4gICAgbGV0IGR1cmF0aW9uID0gMC4yNVxuICAgIGxldCBmcmVxdWVuY3kgPSAxMDBcbiAgICBsZXQgb3NjTWl4VmFsdWUgPSAwLjVcblx0bGV0IG5vaXNlRmlsdGVyVmFsdWUgPSAxMDAwXG5cbiAgICBjb25zdCByZWFsID0gbmV3IEZsb2F0MzJBcnJheShbMCwwLDEsMCwxXSlcbiAgICBjb25zdCBpbWFnID0gbmV3IEZsb2F0MzJBcnJheShyZWFsLmxlbmd0aClcbiAgICBjb25zdCBjdXN0b21XYXZlID0gYXVkaW9Db250ZXh0LmNyZWF0ZVBlcmlvZGljV2F2ZShyZWFsLGltYWcpXG5cblx0bm9pc2VGaWx0ZXIudHlwZSA9ICdsb3dwYXNzJ1xuXHRub2lzZUZpbHRlci5mcmVxdWVuY3kudmFsdWUgPSBub2lzZUZpbHRlclZhbHVlXG5cdG5vaXNlRmlsdGVyLmNvbm5lY3Qobm9pc2VHYWluKVxuXHRub2RlTWl4ZXIuc2V0TGVmdElucHV0KG5vaXNlR2Fpbilcblx0bm9kZU1peGVyLnNldFJpZ2h0SW5wdXQob3NjR2Fpbilcblx0bm9kZU1peGVyLmNvbm5lY3QoeyBpbnB1dDogb3V0cHV0IH0pXG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgdmVsb2NpdHkgPSAxKSB7XG5cdFx0XHRvc2MgPSBhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpXG5cdFx0XHRvc2Muc2V0UGVyaW9kaWNXYXZlKGN1c3RvbVdhdmUpXG5cdFx0XHRvc2MuY29ubmVjdChvc2NHYWluKVxuXHRcdFx0bm9pc2UgPSBhdWRpb0NvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKClcblx0XHRcdG5vaXNlLmJ1ZmZlciA9IGJ1ZmZlclxuXHRcdFx0bm9pc2UuY29ubmVjdChub2lzZUZpbHRlcilcblx0XHRcdG5vaXNlR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxRS0xMCwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0bm9pc2Uuc3RhcnQodGltZSlcblx0XHRcdG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcXVlbmN5LCB0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuNSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0b3NjR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMUUtMTAsIHRpbWUgKyAwLjE1KVxuXHRcdFx0b3NjLnN0YXJ0KHRpbWUpXG5cdFx0XHRvc2Muc3RvcCh0aW1lICsgMC4xNSlcblx0XHRcdG5vaXNlLnN0b3AodGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdGlmIChvc2MpIHtcblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0b3NjR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRub2lzZUdhaW4uZ2Fpbi5jYW5jZWxTY2hlZHVsZWRWYWx1ZXModGltZSlcblx0XHRcdFx0b3NjLnN0b3AodGltZSlcblx0XHRcdFx0bm9pc2Uuc3RvcCh0aW1lKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGNvbm5lY3QsIGlucHV0IH0pIHtcblx0XHRcdG91dHB1dC5jb25uZWN0KGlucHV0KVxuXHRcdFx0cmV0dXJuIHsgY29ubmVjdCB9XG5cdFx0fSxcblx0XHRzZXREdXJhdGlvblZhbHVlKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RHVyYXRpb25WYWx1ZSgpIHtcblx0XHRcdHJldHVybiBkdXJhdGlvblxuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5VmFsdWUodmFsdWUpIHtcblx0XHRcdGZyZXF1ZW5jeSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0RnJlcXVlbmN5VmFsdWUoKSB7XG5cdFx0XHRyZXR1cm4gZnJlcXVlbmN5XG5cdFx0fSxcblx0XHRzZXRPc2NNaXhWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgb3NjTWl4VmFsdWUgPSB2YWx1ZVxuXHRcdFx0bm9kZU1peGVyLmZhZGUob3NjTWl4VmFsdWUgLSAwLjUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3NjTWl4VmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3NjTWl4VmFsdWVcbiAgICAgICAgfSxcblx0XHRzZXROb2lzZUZpbHRlclZhbHVlKHZhbHVlKSB7XG5cdFx0XHRub2lzZUZpbHRlclZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgIG5vaXNlRmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0Tm9pc2VGaWx0ZXJWYWx1ZSgpIHtcblx0XHRcdHJldHVybiBub2lzZUZpbHRlclZhbHVlXG5cdFx0fSxcbiAgICAgICAgc2V0T3V0cHV0R2FpblZhbHVlKHZhbHVlKSB7XG4gICAgICAgICAgICBvdXRwdXQuZ2Fpbi52YWx1ZSA9IHZhbHVlXG4gICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9LFxuICAgICAgICBnZXRPdXRwdXRHYWluVmFsdWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0LmdhaW4udmFsdWVcbiAgICAgICAgfSxcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Jsb2Nrcy9zbmFyZS5qcyIsImltcG9ydCB7IHNjYWxlLCB1bnNjYWxlIH0gZnJvbSBcIi4uL2NvbW1vbi9yYW5nZVwiXG5cbmV4cG9ydCBjb25zdCBBdWRpb05vZGVNaXhlciA9IChhdWRpb0NvbnRleHQpID0+IHtcblx0Y29uc3Qgb3V0cHV0R2Fpbk5vZGUgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGxlZnRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3QgcmlnaHRHYWluTm9kZSA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRsZWZ0R2Fpbk5vZGUuY29ubmVjdChvdXRwdXRHYWluTm9kZSlcblx0cmlnaHRHYWluTm9kZS5jb25uZWN0KG91dHB1dEdhaW5Ob2RlKVxuXHRsZWZ0R2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDAuNVxuXHRyaWdodEdhaW5Ob2RlLmdhaW4udmFsdWUgPSAwLjVcblxuXHRyZXR1cm4ge1xuXHRcdGZhZGUodmFsdWUpIHtcbiAgICAgICAgICAgIGxlZnRHYWluTm9kZS5nYWluLnZhbHVlID0gMSAtIE1hdGguYWJzKHZhbHVlKVxuICAgICAgICAgICAgcmlnaHRHYWluTm9kZS5nYWluLnZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cdFx0fSxcblx0XHRzZXRMZWZ0SW5wdXQoYXVkaW9Ob2RlKSB7XG5cdFx0XHRhdWRpb05vZGUuY29ubmVjdChsZWZ0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0UmlnaHRJbnB1dChhdWRpb05vZGUpIHtcblx0XHRcdGF1ZGlvTm9kZS5jb25uZWN0KHJpZ2h0R2Fpbk5vZGUpXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Y29ubmVjdCh7IGlucHV0LCBjb25uZWN0IH0pIHtcblx0XHRcdG91dHB1dEdhaW5Ob2RlLmNvbm5lY3QoaW5wdXQpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdGdldExlZnRHYWluTm9kZSgpIHtcblx0XHRcdHJldHVybiBsZWZ0R2Fpbk5vZGVcblx0XHR9LFxuXHRcdGdldFJpZ2h0R2Fpbk5vZGUoKSB7XG5cdFx0XHRyZXR1cm4gcmlnaHRHYWluTm9kZVxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9ja3MvYXVkaW8tbm9kZS1taXhlci5qcyJdLCJzb3VyY2VSb290IjoiIn0=