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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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

module.exports = { "default": __webpack_require__(17), __esModule: true };

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

module.exports = { "default": __webpack_require__(27), __esModule: true };

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

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(23);
var toPrimitive = __webpack_require__(25);
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
var ctx = __webpack_require__(19);
var hide = __webpack_require__(21);
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
var IObject = __webpack_require__(32);
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

module.exports = { "default": __webpack_require__(42), __esModule: true };

/***/ }),
/* 16 */
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

var _common = __webpack_require__(40);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(20);
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
/* 20 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(26);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(4)(function () {
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(1);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(28);
module.exports = __webpack_require__(0).Object.keys;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(29);
var $keys = __webpack_require__(30);

__webpack_require__(14)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(9);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(31);
var enumBugKeys = __webpack_require__(39);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(10);
var toIObject = __webpack_require__(11);
var arrayIndexOf = __webpack_require__(34)(false);
var IE_PROTO = __webpack_require__(37)('IE_PROTO');

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(33);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(11);
var toLength = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(36);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(12);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(38)('keys');
var uid = __webpack_require__(13);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 40 */
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

var _dispatcher = __webpack_require__(41);

__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_keys___default()(_dispatcher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_define_property___default()(exports, key, {
    enumerable: true,
    get: function () {
      return _dispatcher[key];
    }
  });
});

var _range = __webpack_require__(46);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Dispatcher = exports.Events = undefined;

var _freeze = __webpack_require__(15);

var _freeze2 = _interopRequireDefault(_freeze);

var _rxjs = __webpack_require__(45);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43);
module.exports = __webpack_require__(0).Object.freeze;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(1);
var meta = __webpack_require__(44).onFreeze;

__webpack_require__(14)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 44 */
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
/* 45 */
/***/ (function(module, exports) {

module.exports = require("rxjs");

/***/ }),
/* 46 */
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

var Sequencer = exports.Sequencer = ({ audioContext }) => {
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
var Kick = exports.Kick = ({ audioContext }) => {
	var output = audioContext.createGain();
	var gains = [audioContext.createGain(), audioContext.createGain()];
	gains.forEach(gain => {
		gain.connect(output);
	});
	var oscs = [];
	var freq = 100;
	var finalFreq = 1;
	var duration = 0.25;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			oscs = [audioContext.createOscillator(), audioContext.createOscillator()];
			oscs[0].type = 'triangle';
			oscs[1].type = 'sine';
			oscs.forEach((osc, i) => {
				osc.frequency.setValueAtTime(freq, time);
				osc.frequency.exponentialRampToValueAtTime(finalFreq, time + duration);
				osc.connect(gains[i]);
				osc.start(time);
				osc.stop(time + duration);
			});
			gains.forEach(gain => {
				gain.gain.setValueAtTime(1 * velocity, time);
				gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
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
		setFinalFreq(value) {
			finalFreq = value;
			return this;
		},
		setFreq(value) {
			freq = value;
			return this;
		},
		setDuration(value) {
			duration = value;
			return this;
		},
		getOutputGain() {
			return output.gain;
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
var Hat = exports.Hat = ({ audioContext }) => {
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
var Snare = exports.Snare = ({ audioContext }) => {
	var bufferSize = audioContext.sampleRate;
	var buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
	var o = buffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i += 1) {
		o[i] = Math.random() * 2 - 1;
	}

	var output = audioContext.createGain();
	var noiseGain = audioContext.createGain();
	var filter = audioContext.createBiquadFilter();
	var oscGain = audioContext.createGain();

	filter.type = 'highpass';
	filter.frequency.value = 1000;
	filter.connect(noiseGain);
	noiseGain.connect(output);
	oscGain.connect(output);

	var osc = void 0;
	var noise = void 0;
	var duration = 0.25;
	var frequency = 80;

	return {
		noteOn(time = audioContext.currentTime, velocity = 1) {
			osc = audioContext.createOscillator();
			osc.type = 'triangle';
			osc.connect(oscGain);
			noise = audioContext.createBufferSource();
			noise.buffer = buffer;
			noise.connect(filter);
			noiseGain.gain.setValueAtTime(1 * velocity, time);
			noiseGain.gain.exponentialRampToValueAtTime(0.01, time + (duration - 0.1));
			noise.start(time);
			osc.frequency.setValueAtTime(frequency, time);
			oscGain.gain.setValueAtTime(1 * velocity, time);
			oscGain.gain.exponentialRampToValueAtTime(0.01, time + (duration - 0.1));
			osc.start(time);
			osc.stop(time + duration);
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
		setDuration(value) {
			duration = value;
			return this;
		},
		setFrequency(value) {
			frequency = value;
			return this;
		}
	};
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTIzMWYyMDZhOThlMGM3YjVjODEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1zYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZnJlZXplLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2ZyZWV6ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5mcmVlemUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwicnhqc1wiLFwiY29tbW9uanMyXCI6XCJyeGpzXCIsXCJhbWRcIjpcInJ4anNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbW1vbi9yYW5nZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJhbWRhXCIsXCJjb21tb25qczJcIjpcInJhbWRhXCIsXCJhbWRcIjpcInJhbWRhXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jb3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd29ya2VyLXRpbWVyL2luZGV4LmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvbm90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9ibG9ja3Mva2ljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL2hhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2tzL3NuYXJlLmpzIl0sIm5hbWVzIjpbIkV2ZW50cyIsIlNFUVVFTkNFUl9TVEFSVCIsIlNFUVVFTkNFUl9TVE9QIiwiU0VRVUVOQ0VSX1RJQ0siLCJURU1QT19DSEFOR0UiLCJDSEFOR0UiLCJEaXNwYXRjaGVyIiwic3ViamVjdCIsImRpc3BhdGNoIiwidHlwZSIsImRhdGEiLCJuZXh0IiwiYXMiLCJmaWx0ZXIiLCJhY3Rpb24iLCJtYXAiLCJ1bnNjYWxlIiwicmFuZ2UiLCJ2YWx1ZSIsIm1heCIsIm1pbiIsInNjYWxlIiwiU2VxdWVuY2VyIiwiYXVkaW9Db250ZXh0IiwiZGl2aXNpb24iLCJzdGFydFRpbWUiLCJ0aWNrVGltZSIsInRpY2siLCJvblRpY2siLCJvblN0b3AiLCJvblN0YXJ0Iiwib25Mb29wIiwic3RvcCIsImxvb3AiLCJ0ZW1wbyIsImxlbmd0aCIsInRpbWVyIiwic2NoZWR1bGUiLCJvcCIsImN1cnJlbnRUaW1lIiwicGxheSIsInNldEludGVydmFsIiwic3RhcnQiLCJjbGVhckludGVydmFsIiwiaXNTdGFydGVkIiwic2V0TG9vcE1vZGUiLCJnZXRMb29wTW9kZSIsInNldExlbmd0aCIsImdldExlbmd0aCIsInNldERpdmlzaW9uIiwiZ2V0RGl2aXNpb24iLCJzZXRUZW1wbyIsImdldFRlbXBvIiwiZ2V0VGltZSIsIkRVUkFUSU9OUyIsIldIT0xFIiwiSEFMRiIsIlFVQVJURVIiLCJFSUdIVEgiLCJOb3RlIiwibm90ZSIsIm9jdGF2ZSIsImR1cmF0aW9uIiwiZ2V0Tm90ZSIsImdldE9jdGF2ZSIsImdldER1cmF0aW9uIiwiZ2V0RnJlcXVlbmN5Iiwibm90ZXMiLCJvIiwibiIsImYiLCJkIiwiaW5kZXhPZiIsImEiLCJtIiwiS2ljayIsIm91dHB1dCIsImNyZWF0ZUdhaW4iLCJnYWlucyIsImZvckVhY2giLCJnYWluIiwiY29ubmVjdCIsIm9zY3MiLCJmcmVxIiwiZmluYWxGcmVxIiwibm90ZU9uIiwidGltZSIsInZlbG9jaXR5IiwiY3JlYXRlT3NjaWxsYXRvciIsIm9zYyIsImkiLCJmcmVxdWVuY3kiLCJzZXRWYWx1ZUF0VGltZSIsImV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUiLCJub3RlT2ZmIiwiY2FuY2VsU2NoZWR1bGVkVmFsdWVzIiwiaW5wdXQiLCJzZXRGaW5hbEZyZXEiLCJzZXRGcmVxIiwic2V0RHVyYXRpb24iLCJnZXRPdXRwdXRHYWluIiwiSGF0IiwicmF0aW9zIiwiYmFuZHBhc3MiLCJjcmVhdGVCaXF1YWRGaWx0ZXIiLCJoaWdocGFzcyIsImZ1bmRhbWVudGFsIiwicmF0aW8iLCJTbmFyZSIsImJ1ZmZlclNpemUiLCJzYW1wbGVSYXRlIiwiYnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiZ2V0Q2hhbm5lbERhdGEiLCJNYXRoIiwicmFuZG9tIiwibm9pc2VHYWluIiwib3NjR2FpbiIsIm5vaXNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwic2V0RnJlcXVlbmN5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLDZCQUE2QjtBQUM3Qix1Q0FBdUM7Ozs7Ozs7QUNEdkM7QUFDQTtBQUNBOzs7Ozs7O0FDRkEsa0JBQWtCLHdEOzs7Ozs7QUNBbEI7QUFDQTtBQUNBLGlDQUFpQyxRQUFRLG1CQUFtQixVQUFVLEVBQUUsRUFBRTtBQUMxRSxDQUFDOzs7Ozs7O0FDSEQ7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7Ozs7OztBQ05BLGtCQUFrQix3RDs7Ozs7O0FDQWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7Ozs7Ozs7QUNMekM7QUFDQTtB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O0FBQ0ErQixXQUFRckMsSUFBUixDQUFhYSw0QkFBYixDQUEwQyxJQUExQyxFQUFnRFAsUUFBUXhCLFdBQVcsR0FBbkIsQ0FBaEQ7QUFDQTJCLE9BQUkvQyxLQUFKLENBQVU0QyxJQUFWO0FBQ0FHLE9BQUl6RCxJQUFKLENBQVNzRCxPQUFPeEIsUUFBaEI7QUFDQXdELFNBQU10RixJQUFOLENBQVdzRCxPQUFPeEIsUUFBbEI7QUFDQSxHQWpCSztBQWtCTmdDLFVBQVFSLE9BQU8vRCxhQUFhZ0IsV0FBYixHQUEyQnVCLFFBQTFDLEVBQW9EO0FBQ25ELE9BQUkyQixHQUFKLEVBQVM7QUFDUkEsUUFBSUUsU0FBSixDQUFjSSxxQkFBZCxDQUFvQ1QsSUFBcEM7QUFDQStCLFlBQVFyQyxJQUFSLENBQWFlLHFCQUFiLENBQW1DVCxJQUFuQztBQUNBOEIsY0FBVXBDLElBQVYsQ0FBZWUscUJBQWYsQ0FBcUNULElBQXJDO0FBQ0FHLFFBQUl6RCxJQUFKLENBQVNzRCxJQUFUO0FBQ0FnQyxVQUFNdEYsSUFBTixDQUFXc0QsSUFBWDtBQUNBO0FBQ0QsR0ExQks7QUEyQk5MLFVBQVEsRUFBRUEsT0FBRixFQUFXZSxLQUFYLEVBQVIsRUFBNEI7QUFDM0JwQixVQUFPSyxPQUFQLENBQWVlLEtBQWY7QUFDQSxVQUFPLEVBQUVmLE9BQUYsRUFBUDtBQUNBLEdBOUJLO0FBK0JOa0IsY0FBWWpGLEtBQVosRUFBbUI7QUFDbEI0QyxjQUFXNUMsS0FBWDtBQUNBLFVBQU8sSUFBUDtBQUNBLEdBbENLO0FBbUNOc0csZUFBYXRHLEtBQWIsRUFBb0I7QUFDbkJ5RSxlQUFZekUsS0FBWjtBQUNBLFVBQU8sSUFBUDtBQUNBO0FBdENLLEVBQVA7QUF3Q0EsQ0FoRU0sQyIsImZpbGUiOiJ3YXNhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGEyMzFmMjA2YTk4ZTBjN2I1YzgxIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHsgdmVyc2lvbjogJzIuNS4xJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYgKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpIF9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJyk7XG52YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKTtcbnZhciBkUCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYga2V5IGluIGV4cG9ydHMpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL19jb3JlJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoS0VZLCBleGVjKSB7XG4gIHZhciBmbiA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXTtcbiAgdmFyIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uICgpIHsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9mcmVlemVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2ZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgS2ljaywgSGF0LCBTbmFyZSB9IGZyb20gJy4vYmxvY2tzJ1xuXG5leHBvcnQgKiBmcm9tICcuL2NvbW1vbidcbmV4cG9ydCAqIGZyb20gJy4vY29yZSdcbmV4cG9ydCAqIGZyb20gJy4vYmxvY2tzJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKSB7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7IGRlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mIH0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICh0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKTtcbnZhciBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFMpIHtcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICBpZiAodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0Jyk7XG52YXIgJGtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KSB7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xudmFyIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpO1xudmFyIElFX1BST1RPID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSBpZiAoa2V5ICE9IElFX1BST1RPKSBoYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4vX3RvLWFic29sdXRlLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0lPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZVxuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSBpZiAoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykge1xuICAgICAgaWYgKE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tbGVuZ3RoLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1hYnNvbHV0ZS1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vZGlzcGF0Y2hlcidcbmV4cG9ydCAqIGZyb20gJy4vcmFuZ2UnXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tbW9uL2luZGV4LmpzIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnXG5cbmV4cG9ydCBjb25zdCBFdmVudHMgPSBPYmplY3QuZnJlZXplKHtcblx0U0VRVUVOQ0VSX1NUQVJUXHQ6IDAsXG5cdFNFUVVFTkNFUl9TVE9QXHQ6IDEsXG5cdFNFUVVFTkNFUl9USUNLXHQ6IDIsXG5cdFRFTVBPX0NIQU5HRVx0OiAzLFxuXHRDSEFOR0U6IDk5OSxcbn0pXG5cbmV4cG9ydCBjb25zdCBEaXNwYXRjaGVyID0gKCgpID0+IHtcblx0Y29uc3Qgc3ViamVjdCA9IG5ldyBTdWJqZWN0KClcblx0cmV0dXJuIHtcblx0XHRkaXNwYXRjaCh0eXBlLCBkYXRhKSB7XG5cdFx0XHRzdWJqZWN0Lm5leHQoeyB0eXBlLCBkYXRhIH0pXG5cdFx0fSxcblx0XHRhcyh0eXBlKSB7XG5cdFx0XHRyZXR1cm4gc3ViamVjdFxuXHRcdFx0XHQuZmlsdGVyKGFjdGlvbiA9PiBhY3Rpb24udHlwZSA9PT0gdHlwZSlcblx0XHRcdFx0Lm1hcChhY3Rpb24gPT4gYWN0aW9uLmRhdGEpXG5cdFx0fSxcblx0fVxufSkoKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbW1vbi9kaXNwYXRjaGVyLmpzIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmZyZWV6ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZnJlZXplLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyAxOS4xLjIuNSBPYmplY3QuZnJlZXplKE8pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbnZhciBtZXRhID0gcmVxdWlyZSgnLi9fbWV0YScpLm9uRnJlZXplO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2ZyZWV6ZScsIGZ1bmN0aW9uICgkZnJlZXplKSB7XG4gIHJldHVybiBmdW5jdGlvbiBmcmVlemUoaXQpIHtcbiAgICByZXR1cm4gJGZyZWV6ZSAmJiBpc09iamVjdChpdCkgPyAkZnJlZXplKG1ldGEoaXQpKSA6IGl0O1xuICB9O1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmZyZWV6ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIE1FVEEgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgc2V0RGVzYyA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaWQgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uIChpdCkge1xuICBzZXREZXNjKGl0LCBNRVRBLCB7IHZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSB9KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uIChpdCwgY3JlYXRlKSB7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYgKCFpc09iamVjdChpdCkpIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmICghaGFzKGl0LCBNRVRBKSkge1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYgKCFpc0V4dGVuc2libGUoaXQpKSByZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24gKGl0LCBjcmVhdGUpIHtcbiAgaWYgKCFoYXMoaXQsIE1FVEEpKSB7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShpdCkpIHJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYgKCFjcmVhdGUpIHJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpIHNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiBNRVRBLFxuICBORUVEOiBmYWxzZSxcbiAgZmFzdEtleTogZmFzdEtleSxcbiAgZ2V0V2VhazogZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJ4anNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJ4anNcIixcImNvbW1vbmpzMlwiOlwicnhqc1wiLFwiYW1kXCI6XCJyeGpzXCJ9XG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBpc05pbCB9IGZyb20gJ3JhbWRhJ1xuXG4vKipcbiAqIFVubm9ybWFsaXplcyBhIFswLTFdIHJhbmdlIHZhbHVlIGJhY2sgdG8gdGhlIGdpdmVuIHJhbmdlXG4gKiBAcGFyYW0ge09iamVjdH0gcmFuZ2UgLSBUaGUgb3JpZ2luYWwgcmFuZ2UgaW4gd2hpY2ggdmFsdWUgc2NhbGVzXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgdmFsdWUgdG8gYmUgc2NhbGVkIHRvIGEgWzAsMV0gcmFuZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IHVuc2NhbGUgPSAocmFuZ2UsIHZhbHVlKSA9PiB7XG5cdGlmIChpc05pbChyYW5nZSkpIHtcblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRyZXR1cm4gKChyYW5nZS5tYXggLSByYW5nZS5taW4pICogdmFsdWUpICsgcmFuZ2UubWluXG59XG5cbi8qKlxuICogTm9ybWFsaXplcyB2YWx1ZSB0byBhIFswLDFdIHJhbmdlIGdpdmVuIGl0cyBvcmlnaW5hbCByYW5nZS5taW4gYW5kIHJhbmdlLm1heFxuICogQHBhcmFtIHtPYmplY3R9IHJhbmdlIC0gVGhlIG9yaWdpbmFsIHJhbmdlIGluIHdoaWNoIHZhbHVlIHNjYWxlc1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHNjYWxlZCB0byBhIFswLDFdIHJhbmdlXG4gKi9cbmV4cG9ydCBjb25zdCBzY2FsZSA9IChyYW5nZSwgdmFsdWUpID0+IHtcblx0aWYgKGlzTmlsKHJhbmdlKSkge1xuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHJldHVybiAodmFsdWUgLSByYW5nZS5taW4pIC8gKHJhbmdlLm1heCAtIHJhbmdlLm1pbilcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21tb24vcmFuZ2UuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyYW1kYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmFtZGFcIixcImNvbW1vbmpzMlwiOlwicmFtZGFcIixcImFtZFwiOlwicmFtZGFcIn1cbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gJy4vc2VxdWVuY2VyJ1xuZXhwb3J0ICogZnJvbSAnLi9ub3RlJ1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvcmUvaW5kZXguanMiLCJpbXBvcnQgV29ya2VyVGltZXIgZnJvbSAnd29ya2VyLXRpbWVyJ1xuXG5leHBvcnQgY29uc3QgU2VxdWVuY2VyID0gKHsgYXVkaW9Db250ZXh0IH0pID0+IHtcblx0LyogdGltZSB2YWx1ZXMgKi9cblx0bGV0IGRpdmlzaW9uID0gNCAvLyB0aWNrcyBwZXIgcXVhcnRlciBub3RlXG5cdGxldCBzdGFydFRpbWUgPSAwIC8vIHN0YXJ0IHRpbWVcblx0bGV0IHRpY2tUaW1lID0gMCAvLyBuZXh0IHRpY2sgdGltZVxuXHRsZXQgdGljayA9IDBcblx0Lyogc3RhdGUgY2hhbmdlIGNhbGxiYWNrcyAqL1xuXHRsZXQgb25UaWNrID0gKCkgPT4ge31cblx0bGV0IG9uU3RvcCA9ICgpID0+IHt9XG5cdGxldCBvblN0YXJ0ID0gKCkgPT4ge31cblx0bGV0IG9uTG9vcCA9ICgpID0+IHt9XG5cdC8qIHN0YXRlICovXG5cdGxldCBzdG9wID0gdHJ1ZVxuXHRsZXQgbG9vcCA9IHRydWVcblx0bGV0IHRlbXBvID0gMTMwXG5cdGxldCBsZW5ndGggPSAxNlxuXG5cdGxldCB0aW1lclxuXG5cdC8qKlxuXHQgKiBTY2hlZHVsZSBpcyBjYWxsZWQgZXZlcnkgdGltZSBhIG5ldyB0aWNrIG9jY3Vyc1xuXHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcCAtIG9uIHRpY2sgY2FsbGJhY2sgZnVuY3Rpb25cblx0ICovXG5cdGNvbnN0IHNjaGVkdWxlID0gKG9wKSA9PiB7XG5cdFx0Y29uc3QgY3VycmVudFRpbWUgPSAoYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lIC0gc3RhcnRUaW1lKVxuXHRcdGlmICghc3RvcCAmJiBjdXJyZW50VGltZSA+PSB0aWNrVGltZSkge1xuXHRcdFx0dGljayArPSAxXG5cdFx0XHRvcCh0aWNrLCB0ZW1wbywgZGl2aXNpb24pXG5cdFx0XHR0aWNrVGltZSA9IGN1cnJlbnRUaW1lICsgKDYwIC8gKHRlbXBvICogZGl2aXNpb24pKVxuXHRcdFx0aWYgKGxvb3AgJiYgdGljayA9PT0gbGVuZ3RoKSB7XG5cdFx0XHRcdHRpY2sgPSAwXG5cdFx0XHRcdG9uTG9vcCgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgcGxheSA9ICgpID0+IHtcblx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0dGltZXIgPSBXb3JrZXJUaW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG5cdFx0XHRzY2hlZHVsZShvblRpY2spXG5cdFx0fSwgMClcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0c3RhcnQoKSB7XG5cdFx0XHRvblN0YXJ0KClcblx0XHRcdHN0YXJ0VGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZVxuXHRcdFx0c3RvcCA9IGZhbHNlXG5cdFx0XHRwbGF5KClcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRzdG9wKCkge1xuXHRcdFx0V29ya2VyVGltZXIuY2xlYXJJbnRlcnZhbCh0aW1lcilcblx0XHRcdHN0b3AgPSB0cnVlXG5cdFx0XHR0aWNrVGltZSA9IDBcblx0XHRcdHRpY2sgPSAwXG5cdFx0XHRvblN0b3AoKVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGlzU3RhcnRlZCgpIHtcblx0XHRcdHJldHVybiAhc3RvcFxuXHRcdH0sXG5cdFx0c2V0TG9vcE1vZGUodmFsdWUpIHtcblx0XHRcdGxvb3AgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldExvb3BNb2RlKCkge1xuXHRcdFx0cmV0dXJuIGxvb3Bcblx0XHR9LFxuXHRcdHNldExlbmd0aCh2YWx1ZSkge1xuXHRcdFx0bGVuZ3RoID0gdmFsdWVcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRnZXRMZW5ndGgoKSB7XG5cdFx0XHRyZXR1cm4gbGVuZ3RoXG5cdFx0fSxcblx0XHRzZXREaXZpc2lvbih2YWx1ZSkge1xuXHRcdFx0ZGl2aXNpb24gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldERpdmlzaW9uKCkge1xuXHRcdFx0cmV0dXJuIGRpdmlzaW9uXG5cdFx0fSxcblx0XHRzZXRUZW1wbyh2YWx1ZSkge1xuXHRcdFx0dGVtcG8gPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdGdldFRlbXBvKCkge1xuXHRcdFx0cmV0dXJuIHRlbXBvXG5cdFx0fSxcblx0XHRnZXRUaW1lKCkge1xuXHRcdFx0cmV0dXJuIGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSAtIHN0YXJ0VGltZVxuXHRcdH0sXG5cdFx0b25TdGFydChvcCkge1xuXHRcdFx0b25TdGFydCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0b25TdG9wKG9wKSB7XG5cdFx0XHRvblN0b3AgPSBvcFxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdG9uVGljayhvcCkge1xuXHRcdFx0b25UaWNrID0gb3Bcblx0XHRcdHJldHVybiB0aGlzXG5cdFx0fSxcblx0XHRvbkxvb3Aob3ApIHtcblx0XHRcdG9uTG9vcCA9IG9wXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb3JlL3NlcXVlbmNlci5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pZiAoZ2xvYmFsID09PSBnbG9iYWwud2luZG93ICYmIGdsb2JhbC5VUkwgJiYgZ2xvYmFsLkJsb2IgJiYgZ2xvYmFsLldvcmtlcikge1xuICBtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgVElNRVJfV09SS0VSX1NPVVJDRSA9IFtcbiAgICAgIFwidmFyIHRpbWVySWRzID0ge30sIF8gPSB7fTtcIixcbiAgICAgIFwiXy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKGFyZ3MpIHtcIixcbiAgICAgIFwiICB0aW1lcklkc1thcmdzLnRpbWVySWRdID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHBvc3RNZXNzYWdlKGFyZ3MudGltZXJJZCk7IH0sIGFyZ3MuZGVsYXkpO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJfLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJJbnRlcnZhbCh0aW1lcklkc1thcmdzLnRpbWVySWRdKTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oYXJncykge1wiLFxuICAgICAgXCIgIHRpbWVySWRzW2FyZ3MudGltZXJJZF0gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBwb3N0TWVzc2FnZShhcmdzLnRpbWVySWQpOyB9LCBhcmdzLmRlbGF5KTtcIixcbiAgICAgIFwifTtcIixcbiAgICAgIFwiXy5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbihhcmdzKSB7XCIsXG4gICAgICBcIiAgY2xlYXJUaW1lb3V0KHRpbWVySWRzW2FyZ3MudGltZXJJZF0pO1wiLFxuICAgICAgXCJ9O1wiLFxuICAgICAgXCJvbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7IF9bZS5kYXRhLnR5cGVdKGUuZGF0YSkgfTtcIlxuICAgIF0uam9pbihcIlwiKTtcblxuICAgIHZhciBfdGltZXJJZCA9IDA7XG4gICAgdmFyIF9jYWxsYmFja3MgPSB7fTtcbiAgICB2YXIgX3RpbWVyID0gbmV3IGdsb2JhbC5Xb3JrZXIoZ2xvYmFsLlVSTC5jcmVhdGVPYmplY3RVUkwoXG4gICAgICBuZXcgZ2xvYmFsLkJsb2IoWyBUSU1FUl9XT1JLRVJfU09VUkNFIF0sIHsgdHlwZTogXCJ0ZXh0L2phdmFzY3JpcHRcIiB9KVxuICAgICkpO1xuXG4gICAgX3RpbWVyLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChfY2FsbGJhY2tzW2UuZGF0YV0pIHtcbiAgICAgICAgX2NhbGxiYWNrc1tlLmRhdGFdLmNhbGxiYWNrLmFwcGx5KG51bGwsIF9jYWxsYmFja3NbZS5kYXRhXS5wYXJhbXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2V0SW50ZXJ2YWw6IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSkge1xuICAgICAgICB2YXIgcGFyYW1zID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcblxuICAgICAgICBfdGltZXJJZCArPSAxO1xuXG4gICAgICAgIF90aW1lci5wb3N0TWVzc2FnZSh7IHR5cGU6IFwic2V0SW50ZXJ2YWxcIiwgdGltZXJJZDogX3RpbWVySWQsIGRlbGF5OiBkZWxheSB9KTtcbiAgICAgICAgX2NhbGxiYWNrc1tfdGltZXJJZF0gPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgcGFyYW1zOiBwYXJhbXMgfTtcblxuICAgICAgICByZXR1cm4gX3RpbWVySWQ7XG4gICAgICB9LFxuICAgICAgc2V0VGltZW91dDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICAgIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuXG4gICAgICAgIF90aW1lcklkICs9IDE7XG5cbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJzZXRUaW1lb3V0XCIsIHRpbWVySWQ6IF90aW1lcklkLCBkZWxheTogZGVsYXkgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbX3RpbWVySWRdID0geyBjYWxsYmFjazogY2FsbGJhY2ssIHBhcmFtczogcGFyYW1zIH07XG5cbiAgICAgICAgcmV0dXJuIF90aW1lcklkO1xuICAgICAgfSxcbiAgICAgIGNsZWFySW50ZXJ2YWw6IGZ1bmN0aW9uKHRpbWVySWQpIHtcbiAgICAgICAgX3RpbWVyLnBvc3RNZXNzYWdlKHsgdHlwZTogXCJjbGVhckludGVydmFsXCIsIHRpbWVySWQ6IHRpbWVySWQgfSk7XG4gICAgICAgIF9jYWxsYmFja3NbdGltZXJJZF0gPSBudWxsO1xuICAgICAgfSxcbiAgICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24odGltZXJJZCkge1xuICAgICAgICBfdGltZXIucG9zdE1lc3NhZ2UoeyB0eXBlOiBcImNsZWFyVGltZW91dFwiLCB0aW1lcklkOiB0aW1lcklkIH0pO1xuICAgICAgICBfY2FsbGJhY2tzW3RpbWVySWRdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93b3JrZXItdGltZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0IGNvbnN0IERVUkFUSU9OUyA9IE9iamVjdC5mcmVlemUoe1xuXHRXSE9MRTogMSxcblx0SEFMRjogMSAvIDIsXG5cdFFVQVJURVI6IDEgLyA0LFxuXHRFSUdIVEg6IDEgLyA4LFxufSlcblxuZXhwb3J0IGNvbnN0IE5vdGUgPSAoeyBub3RlLCBvY3RhdmUsIGR1cmF0aW9uIH0pID0+ICh7XG5cdGdldE5vdGUoKSB7XG5cdFx0cmV0dXJuIG5vdGVcblx0fSxcblx0Z2V0T2N0YXZlKCkge1xuXHRcdHJldHVybiBvY3RhdmVcblx0fSxcblx0Z2V0RHVyYXRpb24oKSB7XG5cdFx0cmV0dXJuIERVUkFUSU9OU1tkdXJhdGlvbl0gfHwgZHVyYXRpb25cblx0fSxcbn0pXG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIGZyZXF1ZW5jeSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gbm90ZSBpbiB0aGUgZ2l2ZW4gb2N0YXZlXG4gKiBAcGFyYW0ge3N0cmluZ30gbm90ZSAtIE5vdGUgaW4gc2NhbGUgKGVuZ2xpc2ggbm90YXRpb24pXG4gKiBAcGFyYW0ge251bWJlcn0gb2N0YXZlIC0gT2N0YXZlIHZhbHVlIGZvciBub3RlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRGcmVxdWVuY3kgPSAobm90ZSwgb2N0YXZlKSA9PiB7XG5cdGNvbnN0IG5vdGVzID0gWydDJywgJ0MjJywgJ0QnLCAnRCMnLCAnRScsICdGJywgJ0YjJywgJ0cnLCAnRyMnLCAnQScsICdBIycsICdCJ11cblx0Y29uc3QgbyA9IDQgLy8gYmFzZSBvY3RhdmVcblx0Y29uc3QgbiA9ICdBJyAvLyBiYXNlIG5vdGVcblx0Y29uc3QgZiA9IDQ0MCAvLyBiYXNlIGZyZXF1ZW5jeVxuXHRjb25zdCBkID0gbm90ZXMuaW5kZXhPZihub3RlKSAtIG5vdGVzLmluZGV4T2YobikgLy8gZGVsdGFcblx0Y29uc3QgYSA9IDIgKiogKDEgLyAxMikgLy8gc2VtaSB0b25lIGZhY3RvclxuXHRjb25zdCBtID0gb2N0YXZlIC0gbyA+PSAwID8gKChvY3RhdmUgLSBvKSArIDEpIDogMSAvICgobyAtIG9jdGF2ZSkgKyAxKSAvLyBtdWx0aXBsaWVyXG5cdHJldHVybiBmICogKGEgKiogZCkgKiBtXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29yZS9ub3RlLmpzIiwiZXhwb3J0ICogZnJvbSAnLi9raWNrJ1xuZXhwb3J0ICogZnJvbSAnLi9oYXQnXG5leHBvcnQgKiBmcm9tICcuL3NuYXJlJ1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmxvY2tzL2luZGV4LmpzIiwiZXhwb3J0IGNvbnN0IEtpY2sgPSAoeyBhdWRpb0NvbnRleHQgfSkgPT4ge1xuXHRjb25zdCBvdXRwdXQgPSBhdWRpb0NvbnRleHQuY3JlYXRlR2FpbigpXG5cdGNvbnN0IGdhaW5zID0gW1xuXHRcdGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKCksXG5cdFx0YXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKSxcblx0XVxuXHRnYWlucy5mb3JFYWNoKChnYWluKSA9PiB7XG5cdFx0Z2Fpbi5jb25uZWN0KG91dHB1dClcblx0fSlcblx0bGV0IG9zY3MgPSBbXVxuXHRsZXQgZnJlcSA9IDEwMFxuXHRsZXQgZmluYWxGcmVxID0gMVxuXHRsZXQgZHVyYXRpb24gPSAwLjI1XG5cblx0cmV0dXJuIHtcblx0XHRub3RlT24odGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSwgdmVsb2NpdHkgPSAxKSB7XG5cdFx0XHRvc2NzID0gW1xuXHRcdFx0XHRhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpLFxuXHRcdFx0XHRhdWRpb0NvbnRleHQuY3JlYXRlT3NjaWxsYXRvcigpLFxuXHRcdFx0XVxuXHRcdFx0b3Njc1swXS50eXBlID0gJ3RyaWFuZ2xlJ1xuXHRcdFx0b3Njc1sxXS50eXBlID0gJ3NpbmUnXG5cdFx0XHRvc2NzLmZvckVhY2goKG9zYywgaSkgPT4ge1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIHRpbWUpXG5cdFx0XHRcdG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZShmaW5hbEZyZXEsIHRpbWUgKyBkdXJhdGlvbilcblx0XHRcdFx0b3NjLmNvbm5lY3QoZ2FpbnNbaV0pXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0XHR9KVxuXHRcdFx0Z2FpbnMuZm9yRWFjaCgoZ2FpbikgPT4ge1xuXHRcdFx0XHRnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0XHRnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgdGltZSArIGR1cmF0aW9uKVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdG5vdGVPZmYodGltZSA9IGF1ZGlvQ29udGV4dC5jdXJyZW50VGltZSArIGR1cmF0aW9uKSB7XG5cdFx0XHRvc2NzLmZvckVhY2goKG9zYywgaSkgPT4ge1xuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRnYWluc1tpXS5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0fSlcblx0XHR9LFxuXHRcdGNvbm5lY3QoeyBjb25uZWN0LCBpbnB1dCB9KSB7XG5cdFx0XHRvdXRwdXQuY29ubmVjdChpbnB1dClcblx0XHRcdHJldHVybiB7IGNvbm5lY3QgfVxuXHRcdH0sXG5cdFx0c2V0RmluYWxGcmVxKHZhbHVlKSB7XG5cdFx0XHRmaW5hbEZyZXEgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldEZyZXEodmFsdWUpIHtcblx0XHRcdGZyZXEgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHRcdHNldER1cmF0aW9uKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0Z2V0T3V0cHV0R2FpbigpIHtcblx0XHRcdHJldHVybiBvdXRwdXQuZ2FpblxuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9ja3Mva2ljay5qcyIsImV4cG9ydCBjb25zdCBIYXQgPSAoeyBhdWRpb0NvbnRleHQgfSkgPT4ge1xuXHRjb25zdCByYXRpb3MgPSBbMiwgMywgNC4xNiwgNS40MywgNi43OSwgOC4yMV1cblx0Y29uc3QgYmFuZHBhc3MgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3Qgb3V0cHV0ID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBoaWdocGFzcyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCaXF1YWRGaWx0ZXIoKVxuXHRjb25zdCBmdW5kYW1lbnRhbCA9IDM1XG5cdGxldCBkdXJhdGlvbiA9IDAuMjVcblx0bGV0IG9zY1xuXG5cdGJhbmRwYXNzLnR5cGUgPSAnYmFuZHBhc3MnXG5cdGJhbmRwYXNzLmZyZXF1ZW5jeS52YWx1ZSA9IDEwMDAwXG5cblx0aGlnaHBhc3MudHlwZSA9ICdoaWdocGFzcydcblx0aGlnaHBhc3MuZnJlcXVlbmN5LnZhbHVlID0gNzAwMFxuXG5cdGJhbmRwYXNzLmNvbm5lY3QoaGlnaHBhc3MpXG5cdGhpZ2hwYXNzLmNvbm5lY3Qob3V0cHV0KVxuXG5cdHJldHVybiB7XG5cdFx0bm90ZU9uKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUsIHZlbG9jaXR5ID0gMSkge1xuXHRcdFx0cmF0aW9zLmZvckVhY2goKHJhdGlvKSA9PiB7XG5cdFx0XHRcdG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdFx0b3NjLnR5cGUgPSAnc3F1YXJlJ1xuXHRcdFx0XHQvLyBGcmVxdWVuY3kgaXMgdGhlIGZ1bmRhbWVudGFsICogdGhpcyBvc2NpbGxhdG9yJ3MgcmF0aW9cblx0XHRcdFx0b3NjLmZyZXF1ZW5jeS52YWx1ZSA9IGZ1bmRhbWVudGFsICogcmF0aW9cblx0XHRcdFx0b3NjLmNvbm5lY3QoYmFuZHBhc3MpXG5cdFx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0XHR9KVxuXHRcdFx0b3V0cHV0LmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDAwMSwgdGltZSlcblx0XHRcdG91dHB1dC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMSAqIHZlbG9jaXR5LCB0aW1lICsgMC4wMilcblx0XHRcdG91dHB1dC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4zLCB0aW1lICsgMC4wMylcblx0XHRcdG91dHB1dC5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAwMSwgdGltZSArIGR1cmF0aW9uKVxuXHRcdH0sXG5cdFx0bm90ZU9mZih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lICsgZHVyYXRpb24pIHtcblx0XHRcdGlmIChvc2MpIHtcblx0XHRcdFx0b3V0cHV0LmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG9zYy5zdG9wKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgaW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoaW5wdXQpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9ibG9ja3MvaGF0LmpzIiwiZXhwb3J0IGNvbnN0IFNuYXJlID0gKHsgYXVkaW9Db250ZXh0IH0pID0+IHtcblx0Y29uc3QgYnVmZmVyU2l6ZSA9IGF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlXG5cdGNvbnN0IGJ1ZmZlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgYXVkaW9Db250ZXh0LnNhbXBsZVJhdGUpXG5cdGNvbnN0IG8gPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMClcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJTaXplOyBpICs9IDEpIHtcblx0XHRvW2ldID0gKE1hdGgucmFuZG9tKCkgKiAyKSAtIDFcblx0fVxuXG5cdGNvbnN0IG91dHB1dCA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblx0Y29uc3Qgbm9pc2VHYWluID0gYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKVxuXHRjb25zdCBmaWx0ZXIgPSBhdWRpb0NvbnRleHQuY3JlYXRlQmlxdWFkRmlsdGVyKClcblx0Y29uc3Qgb3NjR2FpbiA9IGF1ZGlvQ29udGV4dC5jcmVhdGVHYWluKClcblxuXHRmaWx0ZXIudHlwZSA9ICdoaWdocGFzcydcblx0ZmlsdGVyLmZyZXF1ZW5jeS52YWx1ZSA9IDEwMDBcblx0ZmlsdGVyLmNvbm5lY3Qobm9pc2VHYWluKVxuXHRub2lzZUdhaW4uY29ubmVjdChvdXRwdXQpXG5cdG9zY0dhaW4uY29ubmVjdChvdXRwdXQpXG5cblx0bGV0IG9zY1xuXHRsZXQgbm9pc2Vcblx0bGV0IGR1cmF0aW9uID0gMC4yNVxuXHRsZXQgZnJlcXVlbmN5ID0gODBcblxuXHRyZXR1cm4ge1xuXHRcdG5vdGVPbih0aW1lID0gYXVkaW9Db250ZXh0LmN1cnJlbnRUaW1lLCB2ZWxvY2l0eSA9IDEpIHtcblx0XHRcdG9zYyA9IGF1ZGlvQ29udGV4dC5jcmVhdGVPc2NpbGxhdG9yKClcblx0XHRcdG9zYy50eXBlID0gJ3RyaWFuZ2xlJ1xuXHRcdFx0b3NjLmNvbm5lY3Qob3NjR2Fpbilcblx0XHRcdG5vaXNlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpXG5cdFx0XHRub2lzZS5idWZmZXIgPSBidWZmZXJcblx0XHRcdG5vaXNlLmNvbm5lY3QoZmlsdGVyKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMSAqIHZlbG9jaXR5LCB0aW1lKVxuXHRcdFx0bm9pc2VHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCB0aW1lICsgKGR1cmF0aW9uIC0gMC4xKSlcblx0XHRcdG5vaXNlLnN0YXJ0KHRpbWUpXG5cdFx0XHRvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXF1ZW5jeSwgdGltZSlcblx0XHRcdG9zY0dhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgxICogdmVsb2NpdHksIHRpbWUpXG5cdFx0XHRvc2NHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCB0aW1lICsgKGR1cmF0aW9uIC0gMC4xKSlcblx0XHRcdG9zYy5zdGFydCh0aW1lKVxuXHRcdFx0b3NjLnN0b3AodGltZSArIGR1cmF0aW9uKVxuXHRcdFx0bm9pc2Uuc3RvcCh0aW1lICsgZHVyYXRpb24pXG5cdFx0fSxcblx0XHRub3RlT2ZmKHRpbWUgPSBhdWRpb0NvbnRleHQuY3VycmVudFRpbWUgKyBkdXJhdGlvbikge1xuXHRcdFx0aWYgKG9zYykge1xuXHRcdFx0XHRvc2MuZnJlcXVlbmN5LmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2NHYWluLmdhaW4uY2FuY2VsU2NoZWR1bGVkVmFsdWVzKHRpbWUpXG5cdFx0XHRcdG5vaXNlR2Fpbi5nYWluLmNhbmNlbFNjaGVkdWxlZFZhbHVlcyh0aW1lKVxuXHRcdFx0XHRvc2Muc3RvcCh0aW1lKVxuXHRcdFx0XHRub2lzZS5zdG9wKHRpbWUpXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjb25uZWN0KHsgY29ubmVjdCwgaW5wdXQgfSkge1xuXHRcdFx0b3V0cHV0LmNvbm5lY3QoaW5wdXQpXG5cdFx0XHRyZXR1cm4geyBjb25uZWN0IH1cblx0XHR9LFxuXHRcdHNldER1cmF0aW9uKHZhbHVlKSB7XG5cdFx0XHRkdXJhdGlvbiA9IHZhbHVlXG5cdFx0XHRyZXR1cm4gdGhpc1xuXHRcdH0sXG5cdFx0c2V0RnJlcXVlbmN5KHZhbHVlKSB7XG5cdFx0XHRmcmVxdWVuY3kgPSB2YWx1ZVxuXHRcdFx0cmV0dXJuIHRoaXNcblx0XHR9LFxuXHR9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYmxvY2tzL3NuYXJlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==