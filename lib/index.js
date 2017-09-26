(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("rxsource", [], factory);
	else if(typeof exports === 'object')
		exports["rxsource"] = factory();
	else
		root["rxsource"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var INJECT_DATA = exports.INJECT_DATA = 'rxsource/INJECT_DATA';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = exports.mutations = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _mutationTypes = __webpack_require__(0);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const testMap = [
//   {
//     branch : 'bid',
//     key : 'getBidById',
//     updateByMerging: true //defaults to replace. Note: Arrays are concatenated
//   }
// ];

var mapKeyToStateBranch = function mapKeyToStateBranch(d, m) {
  return m.filter(function (item) {
    return d && d.hasOwnProperty(item.key);
  })[0];
};

// mutations
var mutations = exports.mutations = _defineProperty({}, _mutationTypes.INJECT_DATA, function (state, _ref) {
  var data = _ref.data,
      map = _ref.map,
      options = _ref.options;

  var mapped = mapKeyToStateBranch(data, map);
  if (!mapped) {
    return false;
  }
  console.log('MUTATION', data, mapped);
  /**
   * Merge or replace based on assigned update strategy as assigned in the map
   * Handles arrays or objects
   */
  if (state.hasOwnProperty(mapped.branch) && mapped.updateByMerging) {
    if (Array.isArray(state[mapped.branch])) {
      state[mapped.branch] = state[mapped.branch].concat(data[mapped.key]);
    } else {
      state[mapped.branch] = _extends({}, state[mapped.branch], data[mapped.key]);
    }
  } else {
    state[mapped.branch] = data[mapped.key];
  }
});

// actions
var actions = exports.actions = {
  injectData: function injectData(_ref2, payload) {
    var commit = _ref2.commit,
        state = _ref2.state;

    commit(_mutationTypes.INJECT_DATA, payload);
  }
};

exports.default = {
  namespaced: false,
  actions: actions,
  mutations: mutations
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _module = __webpack_require__(1);

var rxsourceModule = _interopRequireWildcard(_module);

var _mutationTypes = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * $stream is an Observable
 * options {updateMethod: "replace", "merge"}
 * @param {*}  
 * @param {*} map   
 */
function Rxsource($stream, map, options) {
  return function (store) {
    $stream.subscribe(function (data) {
      console.log('STREAM', data, map);

      // commit(action, payload) 
      store.commit(_mutationTypes.INJECT_DATA, { data: data, map: map, options: options });
    });
    //store.subscribe(mutation => {})
  };
}

exports.default = {
  Rxsource: Rxsource,
  rxsourceModule: rxsourceModule
};

/***/ })
/******/ ]);
});