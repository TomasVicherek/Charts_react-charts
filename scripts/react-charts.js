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
/******/ 	return __webpack_require__(__webpack_require__.s = 141);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(290);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Animate = __webpack_require__(284);

var _Animate2 = _interopRequireDefault(_Animate);

var _Appear = __webpack_require__(285);

var _Appear2 = _interopRequireDefault(_Appear);

var _Transition = __webpack_require__(119);

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Animate: _Animate2.default,
  Appear: _Appear2.default,
  Transition: _Transition2.default
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiQW5pbWF0ZSIsIkFwcGVhciIsIlRyYW5zaXRpb24iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyw0QkFEZTtBQUVmQywwQkFGZTtBQUdmQztBQUhlLENBQWpCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFuaW1hdGUgZnJvbSAnLi9BbmltYXRlJ1xuaW1wb3J0IEFwcGVhciBmcm9tICcuL0FwcGVhcidcbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJy4vVHJhbnNpdGlvbidcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFuaW1hdGUsXG4gIEFwcGVhcixcbiAgVHJhbnNpdGlvbixcbn1cbiJdfQ==

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = newInterval;
var t0 = new Date,
    t1 = new Date;

function newInterval(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = new Date(+date)), date;
  }

  interval.floor = interval;

  interval.ceil = function(date) {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = function(date) {
    var d0 = interval(date),
        d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = function(date, step) {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = function(start, stop, step) {
    var range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    do range.push(new Date(+start)); while (offseti(start, step), floori(start), start < stop)
    return range;
  };

  interval.filter = function(test) {
    return newInterval(function(date) {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, function(date, step) {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, +1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = function(start, end) {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = function(step) {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? function(d) { return field(d) % step === 0; }
              : function(d) { return interval.count(0, d) % step === 0; });
    };
  }

  return interval;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Provider = __webpack_require__(287);

var _Provider2 = _interopRequireDefault(_Provider);

var _Connect = __webpack_require__(286);

var _Connect2 = _interopRequireDefault(_Connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Provider: _Provider2.default,
  Connect: _Connect2.default
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiUHJvdmlkZXIiLCJDb25uZWN0Il0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7OztBQUVBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLDhCQURlO0FBRWZDO0FBRmUsQ0FBakIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvdmlkZXIgZnJvbSAnLi9Qcm92aWRlcidcbmltcG9ydCBDb25uZWN0IGZyb20gJy4vQ29ubmVjdCdcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFByb3ZpZGVyLFxuICBDb25uZWN0XG59XG4iXX0=

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

var _raf = __webpack_require__(63);

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactMove.Animate.defaults.immutable = false;

exports.default = {
  requestAnimationFrame: _raf2.default,
  throttle: throttle,
  seriesStatus: seriesStatus,
  datumStatus: datumStatus,
  getStatusStyles: getStatusStyles,
  getStatusStyle: getStatusStyle,
  getCenterPointOfSide: getCenterPointOfSide,
  getClosestPoint: getClosestPoint,
  normalizeComponent: normalizeComponent,
  materializeStyles: materializeStyles,
  normalizeGetter: normalizeGetter,
  normalizePathGetter: normalizePathGetter,
  get: get,
  mapValues: mapValues,
  uniq: uniq,
  groupBy: groupBy,
  orderBy: orderBy,
  isArray: isArray
};


function throttle(func) {
  var running = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (running) return;
    running = (0, _raf2.default)(function () {
      func.apply(undefined, args);
      running = false;
    });
  };
}

function seriesStatus(series, hovered, selected) {
  var status = {
    selected: false,
    hovered: false,
    otherSelected: false,
    otherHovered: false
  };
  if (selected && selected.active && selected.series) {
    status.selected = selected.series.id === series.id;
    status.otherSelected = !status.selected;
  }
  if (hovered && hovered.active && hovered.series) {
    status.hovered = hovered.series.id === series.id;
    status.otherHovered = !status.hovered;
  }

  return status;
}

function datumStatus(series, datum, hovered, selected) {
  var status = {
    selected: false,
    hovered: false,
    otherSelected: false,
    otherHovered: false
  };

  var d = void 0;
  if (selected && selected.active && selected.datums) {
    for (var i = 0; i < selected.datums.length; i++) {
      d = selected.datums[i];
      if (d.seriesID === series.id && d.index === datum.index) {
        status.selected = true;
        break;
      }
    }
    status.otherSelected = !status.selected;
  }
  if (hovered && hovered.active && hovered.datums) {
    for (var _i = 0; _i < hovered.datums.length; _i++) {
      d = hovered.datums[_i];
      if (d.seriesID === series.id && d.index === datum.index) {
        status.hovered = true;
        break;
      }
    }
    status.otherHovered = !status.hovered;
  }

  return status;
}

function getStatusStyles(item, decorator, defaults) {
  var styles = {
    default: decorator(item),
    selected: decorator(_extends({}, item, {
      selected: true
    })),
    selectedHovered: decorator(_extends({}, item, {
      selected: true,
      hovered: true
    })),
    selectedOtherHovered: decorator(_extends({}, item, {
      selected: true,
      otherHovered: true
    })),
    otherSelected: decorator(_extends({}, item, {
      otherSelected: true
    })),
    otherSelectedHovered: decorator(_extends({}, item, {
      otherSelected: true,
      hovered: true
    })),
    otherSelectedOtherHovered: decorator(_extends({}, item, {
      otherHovered: true,
      otherSelected: true
    })),
    hovered: decorator(_extends({}, item, {
      hovered: true
    })),
    otherHovered: decorator(_extends({}, item, {
      otherHovered: true
    }))
  };
  Object.keys(styles).forEach(function (key) {
    styles[key] = materializeStyles(styles[key], defaults);
  });
  return styles;
}

function getStatusStyle(status, styles) {
  if (status.selected) {
    if (status.hovered) {
      return styles.selectedHovered;
    }
    return styles.selected;
  }
  if (status.hovered) {
    return styles.hovered;
  }
  return styles.default;
}

function getCenterPointOfSide(position, points) {
  var xMin = void 0,
      xMax = void 0,
      yMin = void 0,
      yMax = void 0;

  xMin = points[0].focus.x;
  xMax = points[0].focus.x;
  yMin = points[0].focus.y;
  yMax = points[0].focus.y;

  points.forEach(function (point) {
    xMin = Math.min(point.focus.x, xMin);
    xMax = Math.max(point.focus.x, xMax);
    yMin = Math.min(point.focus.y, yMin);
    yMax = Math.max(point.focus.y, yMax);
  });

  if (position === 'left') {
    return {
      x: xMin,
      y: (yMin + yMax) / 2
    };
  }
  if (position === 'right') {
    return {
      x: xMax,
      y: (yMin + yMax) / 2
    };
  }
  if (position === 'top') {
    return {
      x: (xMin + xMax) / 2,
      y: yMin
    };
  }
  if (position === 'bottom') {
    return {
      x: (xMin + xMax) / 2,
      y: yMax
    };
  }
  // Center
  return {
    x: (xMin + xMax) / 2,
    y: (yMin + yMax) / 2
  };
}

function getClosestPoint(position, points) {
  var closestDistance = Infinity;
  var closestPoint = points[0] || {};
  points.forEach(function (p) {
    var distance = Math.sqrt(Math.pow(p.focus.x - position.x, 2) + Math.pow(p.focus.y - position.y, 2));
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPoint = p;
    }
  });
  return closestPoint;
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? Object.getPrototypeOf(Comp).isReactComponent ? _react2.default.createElement(Comp, params) : Comp(params) : fallback;
}

function materializeStyles() {
  var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  style = _extends({}, style, {
    stroke: style.stroke || style.color || defaults.stroke || defaults.color,
    fill: style.fill || style.color || defaults.fill || defaults.color
  });['area', 'line', 'rectangle', 'circle'].forEach(function (type) {
    style[type] = style[type] ? materializeStyles(style[type], defaults) : {};
  });
  return style;
}

function normalizeGetter(getter) {
  if (!getter) {
    return;
  }
  if (typeof getter === 'function') {
    return getter;
  }
  return function () {
    return getter;
  };
}

function normalizePathGetter(getter) {
  if (typeof getter === 'function') {
    return getter;
  }
  return function (d, i) {
    return get(d, getter);
  };
}

function get(obj, path, def) {
  if (typeof obj === 'function') {
    try {
      return obj();
    } catch (e) {
      return path;
    }
  }
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {}
  return typeof val !== 'undefined' ? val : def;
}

function mapValues(obj, cb) {
  var newObj = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = cb(obj[prop], prop, obj);
    }
  }
  return newObj;
}

function uniq(arr) {
  return arr.filter(function (d, i) {
    return arr.filter(function (dd) {
      return dd === d;
    }).length === 1;
  });
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function orderBy(arr, funcs) {
  var dirs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  funcs = isArray(funcs) ? funcs : [funcs];
  return arr.sort(function (a, b) {
    for (var i = 0; i < funcs.length; i++) {
      var comp = funcs[i];
      var ca = comp(a);
      var cb = comp(b);
      var desc = dirs[i] === false || dirs[i] === 'desc';
      if (ca > cb) {
        return desc ? -1 : 1;
      }
      if (ca < cb) {
        return desc ? 1 : -1;
      }
    }
    return dirs[0] ? a.__index - b.__index : b.__index - b.__index;
  });
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace('[', '.').replace(']', '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i++) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Memoize = __webpack_require__(145);

var _Memoize2 = _interopRequireDefault(_Memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  primaryAxis: function primaryAxis() {
    return (0, _Memoize2.default)(function (state) {
      return [state.axes];
    }, function (axes) {
      for (var key in axes) {
        if (axes.hasOwnProperty(key)) {
          if (axes[key].primary) {
            return axes[key];
          }
        }
      }
      return undefined;
    });
  },

  secondaryAxis: function secondaryAxis() {
    return (0, _Memoize2.default)(function (state) {
      return [state.axes];
    }, function (axes) {
      for (var key in axes) {
        if (axes.hasOwnProperty(key)) {
          if (!axes[key].primary) {
            return axes[key];
          }
        }
      }
      return undefined;
    });
  },

  offset: function offset() {
    return (0, _Memoize2.default)(function (state) {
      return [state && state.offset && state.offset.left || 0, state && state.offset && state.offset.top || 0];
    }, function (left, top) {
      return {
        left: left,
        top: top
      };
    });
  },

  gridX: function gridX() {
    return (0, _Memoize2.default)(function (state) {
      return [state && state.padding && state.padding.left || 0, state && state.axisDimensions && state.axisDimensions.left && state.axisDimensions.left.width || 0, state && state.axisDimensions && state.axisDimensions.top && state.axisDimensions.top.left || 0, state && state.axisDimensions && state.axisDimensions.bottom && state.axisDimensions.bottom.left || 0];
    }, function (paddingLeft, axesLeftWidth, axesTopLeft, axesBottomLeft) {
      return paddingLeft + Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft);
    });
  },

  gridY: function gridY() {
    return (0, _Memoize2.default)(function (state) {
      return [state && state.padding && state.padding.top || 0, state && state.axisDimensions && state.axisDimensions.top && state.axisDimensions.top.height || 0, state && state.axisDimensions && state.axisDimensions.left && state.axisDimensions.left.top || 0, state && state.axisDimensions && state.axisDimensions.right && state.axisDimensions.right.top || 0];
    }, function (paddingTop, axesTopHeight, axesLeftTop, axesRightTop) {
      return paddingTop + Math.max(axesTopHeight, axesLeftTop, axesRightTop);
    });
  },

  gridWidth: function gridWidth() {
    return (0, _Memoize2.default)(function (state) {
      return [state && state.width && state.width || 0, state && state.padding && state.padding.left || 0, state && state.padding && state.padding.right || 0, state && state.axisDimensions && state.axisDimensions.left && state.axisDimensions.left.width || 0, state && state.axisDimensions && state.axisDimensions.right && state.axisDimensions.right.width || 0, state && state.axisDimensions && state.axisDimensions.top && state.axisDimensions.top.left || 0, state && state.axisDimensions && state.axisDimensions.top && state.axisDimensions.top.right || 0, state && state.axisDimensions && state.axisDimensions.bottom && state.axisDimensions.bottom.left || 0, state && state.axisDimensions && state.axisDimensions.bottom && state.axisDimensions.bottom.right || 0];
    }, function (width, paddingLeft, paddingRight, axesLeftWidth, axesRightWidth, axesTopLeft, axesTopRight, axesBottomLeft, axesBottomRight) {
      return width - paddingLeft - paddingRight - Math.max(axesLeftWidth, axesTopLeft, axesBottomLeft) - Math.max(axesRightWidth, axesTopRight, axesBottomRight);
    });
  },

  gridHeight: function gridHeight() {
    return (0, _Memoize2.default)(function (state) {
      return [state && state.height || 0, state && state.padding && state.padding.top || 0, state && state.padding && state.padding.bottom || 0, state && state.axisDimensions && state.axisDimensions.top && state.axisDimensions.top.height || 0, state && state.axisDimensions && state.axisDimensions.bottom && state.axisDimensions.bottom.height || 0, state && state.axisDimensions && state.axisDimensions.left && state.axisDimensions.left.top || 0, state && state.axisDimensions && state.axisDimensions.left && state.axisDimensions.left.bottom || 0, state && state.axisDimensions && state.axisDimensions.right && state.axisDimensions.right.top || 0, state && state.axisDimensions && state.axisDimensions.right && state.axisDimensions.right.bottom || 0];
    }, function (height, paddingTop, paddingBottom, axesTopHeight, axesBottomHeight, axesLeftTop, axesLeftBottom, axesRightTop, axesRightBottom) {
      return height - paddingTop - paddingBottom - Math.max(axesTopHeight, axesLeftTop, axesRightTop) - Math.max(axesBottomHeight, axesLeftBottom, axesRightBottom);
    });
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_bisect__ = __webpack_require__(68);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__src_bisect__["a"]; });
/* unused harmony reexport bisectRight */
/* unused harmony reexport bisectLeft */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ascending__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_1__src_ascending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_bisector__ = __webpack_require__(69);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__src_bisector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_cross__ = __webpack_require__(148);
/* unused harmony reexport cross */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_descending__ = __webpack_require__(149);
/* unused harmony reexport descending */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_deviation__ = __webpack_require__(70);
/* unused harmony reexport deviation */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_extent__ = __webpack_require__(71);
/* unused harmony reexport extent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_histogram__ = __webpack_require__(150);
/* unused harmony reexport histogram */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_threshold_freedmanDiaconis__ = __webpack_require__(160);
/* unused harmony reexport thresholdFreedmanDiaconis */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_threshold_scott__ = __webpack_require__(161);
/* unused harmony reexport thresholdScott */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_threshold_sturges__ = __webpack_require__(75);
/* unused harmony reexport thresholdSturges */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_max__ = __webpack_require__(152);
/* unused harmony reexport max */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_mean__ = __webpack_require__(153);
/* unused harmony reexport mean */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_median__ = __webpack_require__(154);
/* unused harmony reexport median */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_merge__ = __webpack_require__(155);
/* unused harmony reexport merge */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_min__ = __webpack_require__(72);
/* unused harmony reexport min */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_pairs__ = __webpack_require__(73);
/* unused harmony reexport pairs */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_permute__ = __webpack_require__(156);
/* unused harmony reexport permute */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_quantile__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_18__src_quantile__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_range__ = __webpack_require__(74);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_19__src_range__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_scan__ = __webpack_require__(157);
/* unused harmony reexport scan */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_shuffle__ = __webpack_require__(158);
/* unused harmony reexport shuffle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_sum__ = __webpack_require__(159);
/* unused harmony reexport sum */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_ticks__ = __webpack_require__(76);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_23__src_ticks__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_23__src_ticks__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_23__src_ticks__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_transpose__ = __webpack_require__(77);
/* unused harmony reexport transpose */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_variance__ = __webpack_require__(78);
/* unused harmony reexport variance */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_zip__ = __webpack_require__(162);
/* unused harmony reexport zip */





























/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return durationSecond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return durationMinute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return durationHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return durationDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return durationWeek; });
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(37);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_color__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__src_color__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_lab__ = __webpack_require__(170);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__src_lab__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__src_lab__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubehelix__ = __webpack_require__(169);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubehelix__["a"]; });





/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_value__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolate", function() { return __WEBPACK_IMPORTED_MODULE_0__src_value__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_array__ = __webpack_require__(86);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateArray", function() { return __WEBPACK_IMPORTED_MODULE_1__src_array__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_basis__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateBasis", function() { return __WEBPACK_IMPORTED_MODULE_2__src_basis__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_basisClosed__ = __webpack_require__(87);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateBasisClosed", function() { return __WEBPACK_IMPORTED_MODULE_3__src_basisClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_date__ = __webpack_require__(89);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateDate", function() { return __WEBPACK_IMPORTED_MODULE_4__src_date__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_number__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateNumber", function() { return __WEBPACK_IMPORTED_MODULE_5__src_number__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_object__ = __webpack_require__(90);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateObject", function() { return __WEBPACK_IMPORTED_MODULE_6__src_object__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_round__ = __webpack_require__(195);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateRound", function() { return __WEBPACK_IMPORTED_MODULE_7__src_round__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_string__ = __webpack_require__(92);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateString", function() { return __WEBPACK_IMPORTED_MODULE_8__src_string__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_transform_index__ = __webpack_require__(197);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformCss", function() { return __WEBPACK_IMPORTED_MODULE_9__src_transform_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateTransformSvg", function() { return __WEBPACK_IMPORTED_MODULE_9__src_transform_index__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_zoom__ = __webpack_require__(199);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateZoom", function() { return __WEBPACK_IMPORTED_MODULE_10__src_zoom__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_rgb__ = __webpack_require__(91);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateRgb", function() { return __WEBPACK_IMPORTED_MODULE_11__src_rgb__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasis", function() { return __WEBPACK_IMPORTED_MODULE_11__src_rgb__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateRgbBasisClosed", function() { return __WEBPACK_IMPORTED_MODULE_11__src_rgb__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_hsl__ = __webpack_require__(192);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateHsl", function() { return __WEBPACK_IMPORTED_MODULE_12__src_hsl__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateHslLong", function() { return __WEBPACK_IMPORTED_MODULE_12__src_hsl__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_lab__ = __webpack_require__(193);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateLab", function() { return __WEBPACK_IMPORTED_MODULE_13__src_lab__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_hcl__ = __webpack_require__(191);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateHcl", function() { return __WEBPACK_IMPORTED_MODULE_14__src_hcl__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateHclLong", function() { return __WEBPACK_IMPORTED_MODULE_14__src_hcl__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__ = __webpack_require__(190);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelix", function() { return __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixLong", function() { return __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_quantize__ = __webpack_require__(194);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "quantize", function() { return __WEBPACK_IMPORTED_MODULE_16__src_quantize__["a"]; });



















/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return slice; });
var array = Array.prototype;

var map = array.map;
var slice = array.slice;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function constant() {
    return x;
  };
});


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(38);

var ReactCurrentOwner = __webpack_require__(39);

var warning = __webpack_require__(10);
var canDefineProperty = __webpack_require__(40);
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = __webpack_require__(122);

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_arc__ = __webpack_require__(233);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return __WEBPACK_IMPORTED_MODULE_0__src_arc__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_area__ = __webpack_require__(97);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "area", function() { return __WEBPACK_IMPORTED_MODULE_1__src_area__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_line__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return __WEBPACK_IMPORTED_MODULE_2__src_line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_pie__ = __webpack_require__(254);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return __WEBPACK_IMPORTED_MODULE_3__src_pie__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__ = __webpack_require__(234);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "areaRadial", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialArea", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__ = __webpack_require__(102);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lineRadial", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialLine", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__ = __webpack_require__(103);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pointRadial", function() { return __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_link_index__ = __webpack_require__(246);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkHorizontal", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkVertical", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkRadial", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_symbol__ = __webpack_require__(256);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbols", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__ = __webpack_require__(104);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCircle", function() { return __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__ = __webpack_require__(105);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCross", function() { return __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__ = __webpack_require__(106);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolDiamond", function() { return __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__ = __webpack_require__(107);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolSquare", function() { return __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolStar", function() { return __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__ = __webpack_require__(109);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolTriangle", function() { return __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__ = __webpack_require__(110);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolWye", function() { return __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__ = __webpack_require__(235);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisClosed", function() { return __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__ = __webpack_require__(236);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisOpen", function() { return __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasis", function() { return __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__ = __webpack_require__(237);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBundle", function() { return __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__ = __webpack_require__(99);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalClosed", function() { return __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__ = __webpack_require__(100);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalOpen", function() { return __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinal", function() { return __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__ = __webpack_require__(238);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomClosed", function() { return __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__ = __webpack_require__(239);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomOpen", function() { return __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRom", function() { return __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__ = __webpack_require__(240);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinearClosed", function() { return __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinear", function() { return __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__ = __webpack_require__(241);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneY", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__ = __webpack_require__(242);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveNatural", function() { return __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__src_curve_step__ = __webpack_require__(243);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStep", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepAfter", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepBefore", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__src_stack__ = __webpack_require__(255);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return __WEBPACK_IMPORTED_MODULE_31__src_stack__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__ = __webpack_require__(248);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetExpand", function() { return __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__ = __webpack_require__(247);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetDiverging", function() { return __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__src_offset_none__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetNone", function() { return __WEBPACK_IMPORTED_MODULE_34__src_offset_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__ = __webpack_require__(249);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetSilhouette", function() { return __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__ = __webpack_require__(250);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetWiggle", function() { return __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderAscending", function() { return __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__src_order_descending__ = __webpack_require__(251);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderDescending", function() { return __WEBPACK_IMPORTED_MODULE_38__src_order_descending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__ = __webpack_require__(252);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderInsideOut", function() { return __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__src_order_none__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderNone", function() { return __WEBPACK_IMPORTED_MODULE_40__src_order_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__ = __webpack_require__(253);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderReverse", function() { return __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__["a"]; });




 // Note: radialArea is deprecated!
 // Note: radialLine is deprecated!









































/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var defaultStyle = {
  strokeWidth: 2,
  stroke: '#6b6b6b',
  fill: 'transparent',
  opacity: 1
};

var Path = function (_PureComponent) {
  _inherits(Path, _PureComponent);

  function Path() {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
  }

  _createClass(Path, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          opacity = _props.opacity,
          rest = _objectWithoutProperties(_props, ['style', 'opacity']);

      var resolvedStyle = _extends({}, defaultStyle, style);

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: resolvedStyle

        },
        function (inter) {
          return _react2.default.createElement('path', _extends({}, rest, {
            style: _extends({}, inter, {
              opacity: opacity * inter.opacity
            })
          }));
        }
      );
    }
  }]);

  return Path;
}(_react.PureComponent);

Path.defaultProps = {
  opacity: 1
};
exports.default = Path;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.hoverSeries = hoverSeries;
exports.hoverDatum = hoverDatum;
exports.selectSeries = selectSeries;
exports.selectDatum = selectDatum;
function hoverSeries(series) {
  this.props.dispatch(function (state) {
    return _extends({}, state, {
      hovered: series ? {
        active: true,
        series: series,
        datums: null,
        single: false
      } : _extends({}, state.hovered, {
        active: false
      })
    });
  }, {
    type: 'hoverSeries'
  });
}

function hoverDatum(datum) {
  this.props.dispatch(function (state) {
    return _extends({}, state, {
      hovered: datum ? {
        active: true,
        series: null,
        datums: [datum],
        single: true
      } : _extends({}, state.hovered, {
        active: false
      })
    });
  }, {
    type: 'hoverDatum'
  });
}

function selectSeries(series) {
  this.props.dispatch(function (state) {
    return _extends({}, state, {
      selected: series ? {
        active: true,
        series: series,
        datums: null,
        single: false
      } : {
        active: false
      }
    });
  }, {
    type: 'selectSeries'
  });
}

function selectDatum(datum) {
  this.props.dispatch(function (state) {
    return _extends({}, state, {
      selected: datum ? {
        active: true,
        series: null,
        datums: [datum],
        single: true
      } : {
        active: false
      }
    });
  }, {
    type: 'selectDatum'
  });
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return x === null ? NaN : +x;
});


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = hue;
/* harmony export (immutable) */ __webpack_exports__["c"] = gamma;
/* harmony export (immutable) */ __webpack_exports__["a"] = nogamma;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(88);


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(isNaN(a) ? b : a);
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_path__ = __webpack_require__(200);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_path__["a"]; });



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(s) {
  return s.match(/.{6}/g).map(function(x) {
    return "#" + x;
  });
});


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = linearish;
/* harmony export (immutable) */ __webpack_exports__["a"] = linear;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__continuous__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tickFormat__ = __webpack_require__(230);





function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["a" /* ticks */])(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tickFormat__["a" /* default */])(domain(), count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["b" /* tickIncrement */])(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["b" /* tickIncrement */])(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["b" /* tickIncrement */])(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__continuous__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2__continuous__["b" /* deinterpolateLinear */], __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateNumber"]);

  scale.copy = function() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__continuous__["c" /* copy */])(scale, linear());
  };

  return linearish(scale);
}


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tau; });
/* harmony export (immutable) */ __webpack_exports__["l"] = acos;
/* harmony export (immutable) */ __webpack_exports__["k"] = asin;
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return epsilon2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return beaches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return circles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return edges; });
/* harmony export (immutable) */ __webpack_exports__["a"] = Diagram;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Beach__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cell__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Circle__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Edge__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RedBlackTree__ = __webpack_require__(60);






var epsilon = 1e-6;
var epsilon2 = 1e-12;
var beaches;
var cells;
var circles;
var edges;

function triangleArea(a, b, c) {
  return (a[0] - c[0]) * (b[1] - a[1]) - (a[0] - b[0]) * (c[1] - a[1]);
}

function lexicographic(a, b) {
  return b[1] - a[1]
      || b[0] - a[0];
}

function Diagram(sites, extent) {
  var site = sites.sort(lexicographic).pop(),
      x,
      y,
      circle;

  edges = [];
  cells = new Array(sites.length);
  beaches = new __WEBPACK_IMPORTED_MODULE_4__RedBlackTree__["a" /* default */];
  circles = new __WEBPACK_IMPORTED_MODULE_4__RedBlackTree__["a" /* default */];

  while (true) {
    circle = __WEBPACK_IMPORTED_MODULE_2__Circle__["a" /* firstCircle */];
    if (site && (!circle || site[1] < circle.y || (site[1] === circle.y && site[0] < circle.x))) {
      if (site[0] !== x || site[1] !== y) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Beach__["a" /* addBeach */])(site);
        x = site[0], y = site[1];
      }
      site = sites.pop();
    } else if (circle) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Beach__["b" /* removeBeach */])(circle.arc);
    } else {
      break;
    }
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Cell__["a" /* sortCellHalfedges */])();

  if (extent) {
    var x0 = +extent[0][0],
        y0 = +extent[0][1],
        x1 = +extent[1][0],
        y1 = +extent[1][1];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["a" /* clipEdges */])(x0, y0, x1, y1);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Cell__["b" /* clipCells */])(x0, y0, x1, y1);
  }

  this.edges = edges;
  this.cells = cells;

  beaches =
  circles =
  edges =
  cells = null;
}

Diagram.prototype = {
  constructor: Diagram,

  polygons: function() {
    var edges = this.edges;

    return this.cells.map(function(cell) {
      var polygon = cell.halfedges.map(function(i) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Cell__["c" /* cellHalfedgeStart */])(cell, edges[i]); });
      polygon.data = cell.site.data;
      return polygon;
    });
  },

  triangles: function() {
    var triangles = [],
        edges = this.edges;

    this.cells.forEach(function(cell, i) {
      if (!(m = (halfedges = cell.halfedges).length)) return;
      var site = cell.site,
          halfedges,
          j = -1,
          m,
          s0,
          e1 = edges[halfedges[m - 1]],
          s1 = e1.left === site ? e1.right : e1.left;

      while (++j < m) {
        s0 = s1;
        e1 = edges[halfedges[j]];
        s1 = e1.left === site ? e1.right : e1.left;
        if (s0 && s1 && i < s0.index && i < s1.index && triangleArea(site, s0, s1) < 0) {
          triangles.push([site.data, s0.data, s1.data]);
        }
      }
    });

    return triangles;
  },

  links: function() {
    return this.edges.filter(function(edge) {
      return edge.right;
    }).map(function(edge) {
      return {
        source: edge.left.data,
        target: edge.right.data
      };
    });
  },

  find: function(x, y, radius) {
    var that = this, i0, i1 = that._found || 0, n = that.cells.length, cell;

    // Use the previously-found cell, or start with an arbitrary one.
    while (!(cell = that.cells[i1])) if (++i1 >= n) return null;
    var dx = x - cell.site[0], dy = y - cell.site[1], d2 = dx * dx + dy * dy;

    // Traverse the half-edges to find a closer cell, if any.
    do {
      cell = that.cells[i0 = i1], i1 = null;
      cell.halfedges.forEach(function(e) {
        var edge = that.edges[e], v = edge.left;
        if ((v === cell.site || !v) && !(v = edge.right)) return;
        var vx = x - v[0], vy = y - v[1], v2 = vx * vx + vy * vy;
        if (v2 < d2) d2 = v2, i1 = v.index;
      });
    } while (i1 !== null);

    that._found = i0;

    return radius == null || d2 <= radius * radius ? cell.site : null;
  }
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatDecimal__ = __webpack_require__(48);


/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return x = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__formatDecimal__["a" /* default */])(Math.abs(x)), x ? x[1] : NaN;
});


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return a + b * t;
  };
});


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = deinterpolateLinear;
/* harmony export (immutable) */ __webpack_exports__["c"] = copy;
/* harmony export (immutable) */ __webpack_exports__["a"] = continuous;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__constant__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__number__ = __webpack_require__(94);






var unit = [0, 1];

function deinterpolateLinear(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__constant__["a" /* default */])(b);
}

function deinterpolateClamp(deinterpolate) {
  return function(a, b) {
    var d = deinterpolate(a = +a, b = +b);
    return function(x) { return x <= a ? 0 : x >= b ? 1 : d(x); };
  };
}

function reinterpolateClamp(reinterpolate) {
  return function(a, b) {
    var r = reinterpolate(a = +a, b = +b);
    return function(t) { return t <= 0 ? a : t >= 1 ? b : r(t); };
  };
}

function bimap(domain, range, deinterpolate, reinterpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = deinterpolate(d1, d0), r0 = reinterpolate(r1, r0);
  else d0 = deinterpolate(d0, d1), r0 = reinterpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, deinterpolate, reinterpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = deinterpolate(domain[i], domain[i + 1]);
    r[i] = reinterpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["c" /* bisect */])(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp());
}

// deinterpolate(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// reinterpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding domain value x in [a,b].
function continuous(deinterpolate, reinterpolate) {
  var domain = unit,
      range = unit,
      interpolate = __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolate"],
      clamp = false,
      piecewise,
      output,
      input;

  function rescale() {
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return (output || (output = piecewise(domain, range, clamp ? deinterpolateClamp(deinterpolate) : deinterpolate, interpolate)))(+x);
  }

  scale.invert = function(y) {
    return (input || (input = piecewise(range, domain, deinterpolateLinear, clamp ? reinterpolateClamp(reinterpolate) : reinterpolate)))(+y);
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = __WEBPACK_IMPORTED_MODULE_2__array__["a" /* map */].call(_, __WEBPACK_IMPORTED_MODULE_4__number__["a" /* default */]), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = __WEBPACK_IMPORTED_MODULE_2__array__["b" /* slice */].call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = __WEBPACK_IMPORTED_MODULE_2__array__["b" /* slice */].call(_), interpolate = __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateRound"], rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, rescale()) : clamp;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  return rescale();
}


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Basis;
function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Basis(context);
});


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Cardinal;
function point(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Linear(context);
});


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {});


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

module.exports = ReactCurrentOwner;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Shape = __webpack_require__(17);

exports.default = {
  basisClosed: _d3Shape.curveBasisClosed,
  basisOpen: _d3Shape.curveBasisOpen,
  basis: _d3Shape.curveBasis,
  bundle: _d3Shape.curveBundle,
  cardinalClosed: _d3Shape.curveCardinalClosed,
  cardinalOpen: _d3Shape.curveCardinalOpen,
  cardinal: _d3Shape.curveCardinal,
  catmullRomClosed: _d3Shape.curveCatmullRomClosed,
  catmullRomOpen: _d3Shape.curveCatmullRomOpen,
  catmullRom: _d3Shape.curveCatmullRom,
  linearClosed: _d3Shape.curveLinearClosed,
  linear: _d3Shape.curveLinear,
  monotoneX: _d3Shape.curveMonotoneX,
  monotoneY: _d3Shape.curveMonotoneY,
  natural: _d3Shape.curveNatural,
  step: _d3Shape.curveStep,
  stepAfter: _d3Shape.curveStepAfter,
  stepBefore: _d3Shape.curveStepBefore
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionLeft = exports.positionBottom = exports.positionRight = exports.positionTop = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _AxisLinear = __webpack_require__(137);

var _AxisLinear2 = _interopRequireDefault(_AxisLinear);

var _AxisLinear3 = __webpack_require__(138);

var _AxisLinear4 = _interopRequireDefault(_AxisLinear3);

var _Path = __webpack_require__(19);

var _Path2 = _interopRequireDefault(_Path);

var _Line = __webpack_require__(142);

var _Line2 = _interopRequireDefault(_Line);

var _Text = __webpack_require__(143);

var _Text2 = _interopRequireDefault(_Text);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var positionTop = exports.positionTop = 'top';
var positionRight = exports.positionRight = 'right';
var positionBottom = exports.positionBottom = 'bottom';
var positionLeft = exports.positionLeft = 'left';

var defaultStyles = {
  line: {
    stroke: '#acacac',
    strokeWidth: '1',
    fill: 'transparent'
  },
  tick: {
    fontSize: 10,
    color: '#000',
    fontFamily: 'sans-serif'
  }
};

var Axis = function (_PureComponent) {
  _inherits(Axis, _PureComponent);

  // Lifecycle
  function Axis() {
    _classCallCheck(this, Axis);

    var _this = _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).call(this));

    _this.state = {
      rotation: 0
    };
    _this.measureRotation = _Utils2.default.throttle(_AxisLinear2.default.bind(_this));
    _this.measure = _Utils2.default.throttle(_AxisLinear2.default.bind(_this));
    _this.updateScale = _AxisLinear4.default.bind(_this);
    return _this;
  }

  _createClass(Axis, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var oldProps = this.props;
      if (oldProps.axis !== newProps.axis && oldProps.axis) {
        this.prevAxis = oldProps.axis;
      }

      // If any of the following change,
      // we need to update the axis
      if (newProps.primary !== oldProps.primary || newProps.type !== oldProps.type || newProps.invert !== oldProps.invert || newProps.materializedData !== oldProps.materializedData || newProps.height !== oldProps.height || newProps.width !== oldProps.width || newProps.position !== oldProps.position || newProps.min !== oldProps.min || newProps.max !== oldProps.max || newProps.hardMin !== oldProps.hardMin || newProps.hardMax !== oldProps.hardMax) {
        this.updateScale(newProps);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateScale(this.props);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps, nextState) {
      if (newProps.axis !== this.props.axis || this.state.rotation !== nextState.rotation) {
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          type = _props.type,
          axis = _props.axis,
          position = _props.position,
          width = _props.width,
          height = _props.height,
          showGrid = _props.showGrid,
          tickSizeInner = _props.tickSizeInner,
          tickSizeOuter = _props.tickSizeOuter,
          display = _props.display,
          styles = _props.styles;
      var rotation = this.state.rotation;

      // Combine default styles with style props

      var axisStyles = _extends({}, defaultStyles, styles);

      // Render Dependencies
      if (!axis || !display) {
        return null;
      }

      var scale = axis.scale,
          max = axis.max,
          transform = axis.transform,
          vertical = axis.vertical,
          format = axis.format,
          ticks = axis.ticks,
          _axis$range = _slicedToArray(axis.range, 2),
          range0 = _axis$range[0],
          range1 = _axis$range[1],
          directionMultiplier = axis.directionMultiplier,
          tickOffset = axis.tickOffset,
          gridOffset = axis.gridOffset,
          spacing = axis.spacing;

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: {
            width: width,
            height: height,
            max: max,
            range0: range0,
            range1: range1,
            directionMultiplier: directionMultiplier,
            tickSizeOuter: tickSizeOuter,
            tickOffset: tickOffset,
            gridOffset: gridOffset,
            spacing: spacing,
            rotation: rotation
          },
          onRest: function onRest() {
            return _this2.measureRotation(true);
          }
        },
        function (_ref) {
          var width = _ref.width,
              height = _ref.height,
              max = _ref.max,
              range0 = _ref.range0,
              range1 = _ref.range1,
              directionMultiplier = _ref.directionMultiplier,
              tickSizeOuter = _ref.tickSizeOuter,
              tickOffset = _ref.tickOffset,
              gridOffset = _ref.gridOffset,
              spacing = _ref.spacing;

          var axisPath = void 0;
          if (vertical) {
            if (position === positionLeft) {
              axisPath = '\n                M ' + -tickSizeOuter + ', ' + range0 + '\n                H 0\n                V ' + range1 + '\n                H ' + -tickSizeOuter + '\n              ';
            } else {
              axisPath = '\n                M ' + tickSizeOuter + ', ' + range0 + '\n                H 0\n                V ' + range1 + '\n                H ' + tickSizeOuter + '\n              ';
            }
          } else {
            if (position === positionBottom) {
              axisPath = '\n                M 0, ' + tickSizeOuter + '\n                V 0\n                H ' + range1 + '\n                V ' + tickSizeOuter + '\n              ';
            } else {
              axisPath = '\n                M 0, ' + -tickSizeOuter + '\n                V 0\n                H ' + range1 + '\n                V ' + -tickSizeOuter + '\n              ';
            }
          }

          return _react2.default.createElement(
            'g',
            {
              className: 'Axis',
              transform: position === positionRight ? translateX(width) : position === positionBottom ? translateY(height) : undefined
            },
            _react2.default.createElement(_Path2.default, { className: 'domain', d: axisPath, style: axisStyles.line }),
            _react2.default.createElement(
              _reactMove.Transition,
              {
                data: [].concat(_toConsumableArray(ticks)),
                getKey: function getKey(d, i) {
                  return String(d);
                },
                update: function update(d) {
                  return {
                    tick: scale(d),
                    visibility: 1,
                    measureable: 1,
                    rotation: rotation
                  };
                },
                enter: function enter(d) {
                  return {
                    tick: _this2.prevAxis.scale(d),
                    visibility: 0,
                    measureable: 1,
                    rotation: rotation
                  };
                },
                leave: function leave(d) {
                  return {
                    tick: scale(d),
                    visibility: 0,
                    measureable: 0,
                    rotation: rotation
                  };
                },
                ignore: ['measureable'],
                duration: 500,
                onRest: function onRest() {
                  return _this2.measure();
                }
              },
              function (inters) {
                var showGridLine = showGrid;

                // If ordinal and showGrid isn't explicit, hide it
                if (type === 'ordinal' && showGrid === 1) {
                  showGridLine = false;
                }

                return _react2.default.createElement(
                  'g',
                  {
                    className: 'ticks',
                    ref: function ref(el) {
                      _this2.el = el;
                    }
                  },
                  inters.map(function (inter, index) {
                    return _react2.default.createElement(
                      'g',
                      {
                        key: inter.key,
                        className: 'tick' + (inter.state.measureable ? ' -measureable' : ''),
                        transform: transform(inter.state.tick)
                      },
                      _react2.default.createElement(_Line2.default, {
                        x1: vertical ? 0 : tickOffset,
                        x2: vertical ? directionMultiplier * tickSizeInner : tickOffset,
                        y1: vertical ? tickOffset : 0,
                        y2: vertical ? tickOffset : directionMultiplier * tickSizeInner,
                        style: {
                          strokeWidth: 1
                        },
                        opacity: inter.state.visibility * 0.2
                      }),
                      showGridLine && _react2.default.createElement(_Line2.default, {
                        x1: vertical ? 0 : gridOffset,
                        x2: vertical ? max : gridOffset,
                        y1: vertical ? gridOffset : 0,
                        y2: vertical ? gridOffset : max,
                        style: {
                          strokeWidth: 1
                        },
                        opacity: inter.state.visibility * (index !== 0 && index !== inters.length - 1 && inter.data === 0 ? 0.5 : 0.2)
                      }),
                      _react2.default.createElement(
                        _Text2.default,
                        {
                          opacity: inter.state.visibility,
                          style: axisStyles.tick,
                          transform: '\n                                translate(' + (vertical ? directionMultiplier * spacing : tickOffset) + ', ' + (vertical ? tickOffset : directionMultiplier * spacing) + ')\n                                rotate(' + -inter.state.rotation + ')\n                              ',
                          dominantBaseline: inter.state.rotation ? 'central' : position === positionBottom ? 'hanging' : position === positionTop ? 'alphabetic' : 'central',
                          textAnchor: inter.state.rotation ? 'end' : position === positionRight ? 'start' : position === positionLeft ? 'end' : 'middle'
                        },
                        format(inter.data)
                      )
                    );
                  })
                );
              }
            )
          );
        }
      );
    }
  }]);

  return Axis;
}(_react.PureComponent);

Axis.defaultProps = {
  min: undefined,
  max: undefined,
  hardMin: undefined,
  hardMax: undefined,
  base: undefined,
  tickArguments: [],
  tickValues: null,
  tickFormat: null,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  maxLabelRotation: 50,
  innerPadding: 0.2,
  outerPadding: 0.1,
  showGrid: 1,
  display: true };
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    gridWidth: _Selectors2.default.gridWidth(),
    gridHeight: _Selectors2.default.gridHeight(),
    primaryAxis: _Selectors2.default.primaryAxis()
  };
  return function (state, props) {
    var type = props.type,
        position = props.position;


    var id = type + '_' + position;

    return {
      id: id,
      materializedData: state.materializedData,
      width: selectors.gridWidth(state),
      height: selectors.gridHeight(state),
      primaryAxis: selectors.primaryAxis(state),
      axis: state.axes && state.axes[id]
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(Axis);


function translateX(x) {
  return 'translate(' + x + ', 0)';
}

function translateY(y) {
  return 'translate(0, ' + y + ')';
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var defaultStyle = {
  r: 2,
  strokeWidth: '1',
  stroke: '#000000',
  fill: '#000000',
  opacity: 1
};

var Circle = function (_PureComponent) {
  _inherits(Circle, _PureComponent);

  function Circle() {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
  }

  _createClass(Circle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          x = _props.x,
          y = _props.y,
          r = _props.r,
          style = _props.style,
          opacity = _props.opacity,
          rest = _objectWithoutProperties(_props, ['x', 'y', 'r', 'style', 'opacity']);

      if (typeof x !== 'number' || typeof y !== 'number' || isNaN(x) || isNaN(y)) {
        return null;
      }

      var resolvedStyle = _extends({}, defaultStyle, style);
      return _react2.default.createElement(
        _reactMove.Animate,
        { data: resolvedStyle },
        function (inter) {
          return _react2.default.createElement('circle', _extends({}, rest, {
            cx: x || 0,
            cy: y || 0,
            r: r || 0,
            style: _extends({}, inter, {
              opacity: opacity * inter.opacity
            })
          }));
        }
      );
    }
  }]);

  return Circle;
}(_react.PureComponent);

Circle.defaultProps = {
  opacity: 1
};
exports.default = Circle;

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(values, p, valueof) {
  if (valueof == null) valueof = __WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */];
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
});


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prefix; });
var prefix = "$";

function Map() {}

Map.prototype = map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

/* harmony default export */ __webpack_exports__["a"] = (map);


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = Color;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return brighter; });
/* harmony export (immutable) */ __webpack_exports__["h"] = color;
/* harmony export (immutable) */ __webpack_exports__["b"] = rgbConvert;
/* harmony export (immutable) */ __webpack_exports__["g"] = rgb;
/* harmony export (immutable) */ __webpack_exports__["a"] = Rgb;
/* unused harmony export hslConvert */
/* harmony export (immutable) */ __webpack_exports__["f"] = hsl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(47);


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex3 = /^#([0-9a-f]{3})$/,
    reHex6 = /^#([0-9a-f]{6})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Color, color, {
  displayable: function() {
    return this.rgb().displayable();
  },
  toString: function() {
    return this.rgb() + "";
  }
});

function color(format) {
  var m;
  format = (format + "").trim().toLowerCase();
  return (m = reHex3.exec(format)) ? (m = parseInt(m[1], 16), new Rgb((m >> 8 & 0xf) | (m >> 4 & 0x0f0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1)) // #f00
      : (m = reHex6.exec(format)) ? rgbn(parseInt(m[1], 16)) // #ff0000
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format])
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Rgb, rgb, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (0 <= this.r && this.r <= 255)
        && (0 <= this.g && this.g <= 255)
        && (0 <= this.b && this.b <= 255)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  toString: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Hsl, hsl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = extend;
/* harmony default export */ __webpack_exports__["a"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimal(1.23) returns ["123", 0].
/* harmony default export */ __webpack_exports__["a"] = (function(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
});


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = basis;
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ __webpack_exports__["a"] = (function(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__rgb__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__date__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__number__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__object__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__string__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__constant__ = __webpack_require__(88);









/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__constant__["a" /* default */])(b)
      : (t === "number" ? __WEBPACK_IMPORTED_MODULE_4__number__["a" /* default */]
      : t === "string" ? ((c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["f" /* color */])(b)) ? (b = c, __WEBPACK_IMPORTED_MODULE_1__rgb__["a" /* default */]) : __WEBPACK_IMPORTED_MODULE_6__string__["a" /* default */])
      : b instanceof __WEBPACK_IMPORTED_MODULE_0_d3_color__["f" /* color */] ? __WEBPACK_IMPORTED_MODULE_1__rgb__["a" /* default */]
      : b instanceof Date ? __WEBPACK_IMPORTED_MODULE_3__date__["a" /* default */]
      : Array.isArray(b) ? __WEBPACK_IMPORTED_MODULE_2__array__["a" /* default */]
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? __WEBPACK_IMPORTED_MODULE_5__object__["a" /* default */]
      : __WEBPACK_IMPORTED_MODULE_4__number__["a" /* default */])(a, b);
});


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
});


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = point;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(34);



function point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new __WEBPACK_IMPORTED_MODULE_1__cardinal__["b" /* Cardinal */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(56);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sum;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(28);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var sums = series.map(sum);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[a] - sums[b]; });
});

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = x;
/* harmony export (immutable) */ __webpack_exports__["b"] = y;
function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return timeFormat; });
/* unused harmony export timeParse */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return utcFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return utcParse; });
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale__ = __webpack_require__(113);


var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;

defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale(definition) {
  locale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__locale__["a" /* default */])(definition);
  timeFormat = locale.format;
  timeParse = locale.parse;
  utcFormat = locale.utcFormat;
  utcParse = locale.utcParse;
  return locale;
}


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_interval__ = __webpack_require__(3);
/* unused harmony reexport timeInterval */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_millisecond__ = __webpack_require__(260);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_1__src_millisecond__["a"]; });
/* unused harmony reexport timeMilliseconds */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_1__src_millisecond__["a"]; });
/* unused harmony reexport utcMilliseconds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_second__ = __webpack_require__(263);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_2__src_second__["a"]; });
/* unused harmony reexport timeSeconds */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_2__src_second__["a"]; });
/* unused harmony reexport utcSeconds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_minute__ = __webpack_require__(261);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_3__src_minute__["a"]; });
/* unused harmony reexport timeMinutes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_hour__ = __webpack_require__(259);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_4__src_hour__["a"]; });
/* unused harmony reexport timeHours */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_day__ = __webpack_require__(258);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_5__src_day__["a"]; });
/* unused harmony reexport timeDays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_week__ = __webpack_require__(270);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_6__src_week__["a"]; });
/* unused harmony reexport timeWeeks */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_6__src_week__["a"]; });
/* unused harmony reexport timeSundays */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_6__src_week__["b"]; });
/* unused harmony reexport timeMondays */
/* unused harmony reexport timeTuesday */
/* unused harmony reexport timeTuesdays */
/* unused harmony reexport timeWednesday */
/* unused harmony reexport timeWednesdays */
/* unused harmony reexport timeThursday */
/* unused harmony reexport timeThursdays */
/* unused harmony reexport timeFriday */
/* unused harmony reexport timeFridays */
/* unused harmony reexport timeSaturday */
/* unused harmony reexport timeSaturdays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_month__ = __webpack_require__(262);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_7__src_month__["a"]; });
/* unused harmony reexport timeMonths */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_year__ = __webpack_require__(271);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_8__src_year__["a"]; });
/* unused harmony reexport timeYears */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_utcMinute__ = __webpack_require__(266);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_9__src_utcMinute__["a"]; });
/* unused harmony reexport utcMinutes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_utcHour__ = __webpack_require__(265);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__src_utcHour__["a"]; });
/* unused harmony reexport utcHours */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_utcDay__ = __webpack_require__(264);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_11__src_utcDay__["a"]; });
/* unused harmony reexport utcDays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_utcWeek__ = __webpack_require__(268);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_12__src_utcWeek__["a"]; });
/* unused harmony reexport utcWeeks */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_12__src_utcWeek__["a"]; });
/* unused harmony reexport utcSundays */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_12__src_utcWeek__["b"]; });
/* unused harmony reexport utcMondays */
/* unused harmony reexport utcTuesday */
/* unused harmony reexport utcTuesdays */
/* unused harmony reexport utcWednesday */
/* unused harmony reexport utcWednesdays */
/* unused harmony reexport utcThursday */
/* unused harmony reexport utcThursdays */
/* unused harmony reexport utcFriday */
/* unused harmony reexport utcFridays */
/* unused harmony reexport utcSaturday */
/* unused harmony reexport utcSaturdays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_utcMonth__ = __webpack_require__(267);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_13__src_utcMonth__["a"]; });
/* unused harmony reexport utcMonths */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_utcYear__ = __webpack_require__(269);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_14__src_utcYear__["a"]; });
/* unused harmony reexport utcYears */































/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = createEdge;
/* harmony export (immutable) */ __webpack_exports__["b"] = createBorderEdge;
/* harmony export (immutable) */ __webpack_exports__["c"] = setEdgeEnd;
/* harmony export (immutable) */ __webpack_exports__["a"] = clipEdges;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Diagram__ = __webpack_require__(29);


function createEdge(left, right, v0, v1) {
  var edge = [null, null],
      index = __WEBPACK_IMPORTED_MODULE_0__Diagram__["d" /* edges */].push(edge) - 1;
  edge.left = left;
  edge.right = right;
  if (v0) setEdgeEnd(edge, left, right, v0);
  if (v1) setEdgeEnd(edge, right, left, v1);
  __WEBPACK_IMPORTED_MODULE_0__Diagram__["c" /* cells */][left.index].halfedges.push(index);
  __WEBPACK_IMPORTED_MODULE_0__Diagram__["c" /* cells */][right.index].halfedges.push(index);
  return edge;
}

function createBorderEdge(left, v0, v1) {
  var edge = [v0, v1];
  edge.left = left;
  return edge;
}

function setEdgeEnd(edge, left, right, vertex) {
  if (!edge[0] && !edge[1]) {
    edge[0] = vertex;
    edge.left = left;
    edge.right = right;
  } else if (edge.left === right) {
    edge[1] = vertex;
  } else {
    edge[0] = vertex;
  }
}

// Liang–Barsky line clipping.
function clipEdge(edge, x0, y0, x1, y1) {
  var a = edge[0],
      b = edge[1],
      ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (!(t0 > 0) && !(t1 < 1)) return true; // TODO Better check?

  if (t0 > 0) edge[0] = [ax + t0 * dx, ay + t0 * dy];
  if (t1 < 1) edge[1] = [ax + t1 * dx, ay + t1 * dy];
  return true;
}

function connectEdge(edge, x0, y0, x1, y1) {
  var v1 = edge[1];
  if (v1) return true;

  var v0 = edge[0],
      left = edge.left,
      right = edge.right,
      lx = left[0],
      ly = left[1],
      rx = right[0],
      ry = right[1],
      fx = (lx + rx) / 2,
      fy = (ly + ry) / 2,
      fm,
      fb;

  if (ry === ly) {
    if (fx < x0 || fx >= x1) return;
    if (lx > rx) {
      if (!v0) v0 = [fx, y0];
      else if (v0[1] >= y1) return;
      v1 = [fx, y1];
    } else {
      if (!v0) v0 = [fx, y1];
      else if (v0[1] < y0) return;
      v1 = [fx, y0];
    }
  } else {
    fm = (lx - rx) / (ry - ly);
    fb = fy - fm * fx;
    if (fm < -1 || fm > 1) {
      if (lx > rx) {
        if (!v0) v0 = [(y0 - fb) / fm, y0];
        else if (v0[1] >= y1) return;
        v1 = [(y1 - fb) / fm, y1];
      } else {
        if (!v0) v0 = [(y1 - fb) / fm, y1];
        else if (v0[1] < y0) return;
        v1 = [(y0 - fb) / fm, y0];
      }
    } else {
      if (ly < ry) {
        if (!v0) v0 = [x0, fm * x0 + fb];
        else if (v0[0] >= x1) return;
        v1 = [x1, fm * x1 + fb];
      } else {
        if (!v0) v0 = [x1, fm * x1 + fb];
        else if (v0[0] < x0) return;
        v1 = [x0, fm * x0 + fb];
      }
    }
  }

  edge[0] = v0;
  edge[1] = v1;
  return true;
}

function clipEdges(x0, y0, x1, y1) {
  var i = __WEBPACK_IMPORTED_MODULE_0__Diagram__["d" /* edges */].length,
      edge;

  while (i--) {
    if (!connectEdge(edge = __WEBPACK_IMPORTED_MODULE_0__Diagram__["d" /* edges */][i], x0, y0, x1, y1)
        || !clipEdge(edge, x0, y0, x1, y1)
        || !(Math.abs(edge[0][0] - edge[1][0]) > __WEBPACK_IMPORTED_MODULE_0__Diagram__["b" /* epsilon */]
            || Math.abs(edge[0][1] - edge[1][1]) > __WEBPACK_IMPORTED_MODULE_0__Diagram__["b" /* epsilon */])) {
      delete __WEBPACK_IMPORTED_MODULE_0__Diagram__["d" /* edges */][i];
    }
  }
}


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = RedBlackNode;
function RedBlackTree() {
  this._ = null; // root node
}

function RedBlackNode(node) {
  node.U = // parent node
  node.C = // color - true for red, false for black
  node.L = // left node
  node.R = // right node
  node.P = // previous node
  node.N = null; // next node
}

RedBlackTree.prototype = {
  constructor: RedBlackTree,

  insert: function(after, node) {
    var parent, grandpa, uncle;

    if (after) {
      node.P = after;
      node.N = after.N;
      if (after.N) after.N.P = node;
      after.N = node;
      if (after.R) {
        after = after.R;
        while (after.L) after = after.L;
        after.L = node;
      } else {
        after.R = node;
      }
      parent = after;
    } else if (this._) {
      after = RedBlackFirst(this._);
      node.P = null;
      node.N = after;
      after.P = after.L = node;
      parent = after;
    } else {
      node.P = node.N = null;
      this._ = node;
      parent = null;
    }
    node.L = node.R = null;
    node.U = parent;
    node.C = true;

    after = node;
    while (parent && parent.C) {
      grandpa = parent.U;
      if (parent === grandpa.L) {
        uncle = grandpa.R;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.R) {
            RedBlackRotateLeft(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateRight(this, grandpa);
        }
      } else {
        uncle = grandpa.L;
        if (uncle && uncle.C) {
          parent.C = uncle.C = false;
          grandpa.C = true;
          after = grandpa;
        } else {
          if (after === parent.L) {
            RedBlackRotateRight(this, parent);
            after = parent;
            parent = after.U;
          }
          parent.C = false;
          grandpa.C = true;
          RedBlackRotateLeft(this, grandpa);
        }
      }
      parent = after.U;
    }
    this._.C = false;
  },

  remove: function(node) {
    if (node.N) node.N.P = node.P;
    if (node.P) node.P.N = node.N;
    node.N = node.P = null;

    var parent = node.U,
        sibling,
        left = node.L,
        right = node.R,
        next,
        red;

    if (!left) next = right;
    else if (!right) next = left;
    else next = RedBlackFirst(right);

    if (parent) {
      if (parent.L === node) parent.L = next;
      else parent.R = next;
    } else {
      this._ = next;
    }

    if (left && right) {
      red = next.C;
      next.C = node.C;
      next.L = left;
      left.U = next;
      if (next !== right) {
        parent = next.U;
        next.U = node.U;
        node = next.R;
        parent.L = node;
        next.R = right;
        right.U = next;
      } else {
        next.U = parent;
        parent = next;
        node = next.R;
      }
    } else {
      red = node.C;
      node = next;
    }

    if (node) node.U = parent;
    if (red) return;
    if (node && node.C) { node.C = false; return; }

    do {
      if (node === this._) break;
      if (node === parent.L) {
        sibling = parent.R;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateLeft(this, parent);
          sibling = parent.R;
        }
        if ((sibling.L && sibling.L.C)
            || (sibling.R && sibling.R.C)) {
          if (!sibling.R || !sibling.R.C) {
            sibling.L.C = false;
            sibling.C = true;
            RedBlackRotateRight(this, sibling);
            sibling = parent.R;
          }
          sibling.C = parent.C;
          parent.C = sibling.R.C = false;
          RedBlackRotateLeft(this, parent);
          node = this._;
          break;
        }
      } else {
        sibling = parent.L;
        if (sibling.C) {
          sibling.C = false;
          parent.C = true;
          RedBlackRotateRight(this, parent);
          sibling = parent.L;
        }
        if ((sibling.L && sibling.L.C)
          || (sibling.R && sibling.R.C)) {
          if (!sibling.L || !sibling.L.C) {
            sibling.R.C = false;
            sibling.C = true;
            RedBlackRotateLeft(this, sibling);
            sibling = parent.L;
          }
          sibling.C = parent.C;
          parent.C = sibling.L.C = false;
          RedBlackRotateRight(this, parent);
          node = this._;
          break;
        }
      }
      sibling.C = true;
      node = parent;
      parent = parent.U;
    } while (!node.C);

    if (node) node.C = false;
  }
};

function RedBlackRotateLeft(tree, node) {
  var p = node,
      q = node.R,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.R = q.L;
  if (p.R) p.R.U = p;
  q.L = p;
}

function RedBlackRotateRight(tree, node) {
  var p = node,
      q = node.L,
      parent = p.U;

  if (parent) {
    if (parent.L === p) parent.L = q;
    else parent.R = q;
  } else {
    tree._ = q;
  }

  q.U = parent;
  p.U = q;
  p.L = q.R;
  if (p.L) p.L.U = p;
  q.R = p;
}

function RedBlackFirst(node) {
  while (node.L) node = node.L;
  return node;
}

/* harmony default export */ __webpack_exports__["a"] = (RedBlackTree);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(61)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(301)))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(18);

var ReactCurrentOwner = __webpack_require__(39);

var invariant = __webpack_require__(7);
var warning = __webpack_require__(10);

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty
  // Strip regex characters so we can use it for regex
  ).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'
  // Remove hasOwnProperty from the template to make it generic
  ).replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs,

  pushNonStandardWarningStack: function (isCreatingElement, currentSource) {
    if (typeof console.reactStack !== 'function') {
      return;
    }

    var stack = [];
    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    try {
      if (isCreatingElement) {
        stack.push({
          name: id ? ReactComponentTreeHook.getDisplayName(id) : null,
          fileName: currentSource ? currentSource.fileName : null,
          lineNumber: currentSource ? currentSource.lineNumber : null
        });
      }

      while (id) {
        var element = ReactComponentTreeHook.getElement(id);
        var parentID = ReactComponentTreeHook.getParentID(id);
        var ownerID = ReactComponentTreeHook.getOwnerID(id);
        var ownerName = ownerID ? ReactComponentTreeHook.getDisplayName(ownerID) : null;
        var source = element && element._source;
        stack.push({
          name: ownerName,
          fileName: source ? source.fileName : null,
          lineNumber: source ? source.lineNumber : null
        });
        id = parentID;
      }
    } catch (err) {
      // Internal state is messed up.
      // Stop building the stack (it's just a nice to have).
    }

    console.reactStack(stack);
  },
  popNonStandardWarningStack: function () {
    if (typeof console.reactStackEnd !== 'function') {
      return;
    }
    console.reactStackEnd();
  }
};

module.exports = ReactComponentTreeHook;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = lowPriorityWarning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var defaultStyle = {
  strokeWidth: 0,
  fill: '#333',
  opacity: 1,
  rx: 0,
  ry: 0
};

var Rectangle = function (_PureComponent) {
  _inherits(Rectangle, _PureComponent);

  function Rectangle() {
    _classCallCheck(this, Rectangle);

    return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).apply(this, arguments));
  }

  _createClass(Rectangle, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          opacity = _props.opacity,
          x1 = _props.x1,
          y1 = _props.y1,
          x2 = _props.x2,
          y2 = _props.y2,
          rest = _objectWithoutProperties(_props, ['style', 'opacity', 'x1', 'y1', 'x2', 'y2']);

      var resolvedStyle = _extends({}, defaultStyle, style);

      var xStart = Math.min(x1, x2);
      var yStart = Math.min(y1, y2);
      var xEnd = Math.max(x1, x2);
      var yEnd = Math.max(y1, y2);

      var height = Math.max(yEnd - yStart, 0);
      var width = Math.max(xEnd - xStart, 0);

      return _react2.default.createElement(
        _reactMove.Animate,
        { data: resolvedStyle },
        function (inter) {
          return _react2.default.createElement('rect', _extends({}, rest, {
            x: xStart,
            y: yStart,
            width: width,
            height: height,
            style: _extends({}, inter, {
              opacity: opacity * inter.opacity
            })
          }));
        }
      );
    }
  }]);

  return Rectangle;
}(_react.PureComponent);

Rectangle.defaultProps = {
  opacity: 1
};
exports.default = Rectangle;

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return slice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return map; });
var array = Array.prototype;

var slice = array.slice;
var map = array.map;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export bisectRight */
/* unused harmony export bisectLeft */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bisector__ = __webpack_require__(69);



var ascendingBisect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bisector__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */]);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ __webpack_exports__["a"] = (bisectRight);


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(16);


/* harmony default export */ __webpack_exports__["a"] = (function(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
});

function ascendingComparator(f) {
  return function(d, x) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */])(f(d), x);
  };
}


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__variance__ = __webpack_require__(78);


/* harmony default export */ __webpack_exports__["a"] = (function(array, f) {
  var v = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__variance__["a" /* default */])(array, f);
  return v ? Math.sqrt(v) : v;
});


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
});


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && min > value) {
            min = value;
          }
        }
      }
    }
  }

  return min;
});


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pair;
/* unused harmony default export */ var _unused_webpack_default_export = (function(array, f) {
  if (f == null) f = pair;
  var i = 0, n = array.length - 1, p = array[0], pairs = new Array(n < 0 ? 0 : n);
  while (i < n) pairs[i] = f(p, p = array[++i]);
  return pairs;
});

function pair(a, b) {
  return [a, b];
}


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
});


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(values) {
  return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
});


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = tickIncrement;
/* harmony export (immutable) */ __webpack_exports__["c"] = tickStep;
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ __webpack_exports__["a"] = (function(start, stop, count) {
  var reverse = stop < start,
      i = -1,
      n,
      ticks,
      step;

  if (reverse) n = start, start = stop, stop = n;

  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
});

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__min__ = __webpack_require__(72);


/* harmony default export */ __webpack_exports__["a"] = (function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__min__["a" /* default */])(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
});

function length(d) {
  return d.length;
}


/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(21);


/* harmony default export */ __webpack_exports__["a"] = (function(values, valueof) {
  var n = values.length,
      m = 0,
      i = -1,
      mean = 0,
      value,
      delta,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(values[i]))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(valueof(values[i], i, values)))) {
        delta = value - mean;
        mean += delta / ++m;
        sum += delta * (value - mean);
      }
    }
  }

  if (m > 1) return sum / (m - 1);
});


/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_linear__ = __webpack_require__(177);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeLinear", function() { return __WEBPACK_IMPORTED_MODULE_0__src_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_quad__ = __webpack_require__(179);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuad", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadIn", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadOut", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeQuadInOut", function() { return __WEBPACK_IMPORTED_MODULE_1__src_quad__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_cubic__ = __webpack_require__(174);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubic", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicIn", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicOut", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCubicInOut", function() { return __WEBPACK_IMPORTED_MODULE_2__src_cubic__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_poly__ = __webpack_require__(178);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePoly", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyIn", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyOut", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easePolyInOut", function() { return __WEBPACK_IMPORTED_MODULE_3__src_poly__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_sin__ = __webpack_require__(180);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSin", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinIn", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinOut", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeSinInOut", function() { return __WEBPACK_IMPORTED_MODULE_4__src_sin__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_exp__ = __webpack_require__(176);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExp", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpIn", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpOut", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeExpInOut", function() { return __WEBPACK_IMPORTED_MODULE_5__src_exp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_circle__ = __webpack_require__(173);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircle", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleIn", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleOut", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeCircleInOut", function() { return __WEBPACK_IMPORTED_MODULE_6__src_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_bounce__ = __webpack_require__(172);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounce", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceIn", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceOut", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBounceInOut", function() { return __WEBPACK_IMPORTED_MODULE_7__src_bounce__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_back__ = __webpack_require__(171);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBack", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackIn", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackOut", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeBackInOut", function() { return __WEBPACK_IMPORTED_MODULE_8__src_back__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_elastic__ = __webpack_require__(175);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElastic", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticIn", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticOut", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "easeElasticInOut", function() { return __WEBPACK_IMPORTED_MODULE_9__src_elastic__["c"]; });





















/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__ = __webpack_require__(181);
/* unused harmony reexport formatDefaultLocale */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_locale__ = __webpack_require__(85);
/* unused harmony reexport formatLocale */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_formatSpecifier__ = __webpack_require__(83);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_formatSpecifier__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_precisionFixed__ = __webpack_require__(187);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_3__src_precisionFixed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_precisionPrefix__ = __webpack_require__(188);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__src_precisionPrefix__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_precisionRound__ = __webpack_require__(189);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__src_precisionRound__["a"]; });








/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return prefixExponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatDecimal__ = __webpack_require__(48);


var prefixExponent;

/* harmony default export */ __webpack_exports__["a"] = (function(x, p) {
  var d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__formatDecimal__["a" /* default */])(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__formatDecimal__["a" /* default */])(x, Math.max(0, p + i - 1))[0]; // less than 1y!
});


/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = formatSpecifier;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatTypes__ = __webpack_require__(84);


// [[fill]align][sign][symbol][0][width][,][.precision][type]
var re = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  return new FormatSpecifier(specifier);
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);

  var match,
      fill = match[1] || " ",
      align = match[2] || ">",
      sign = match[3] || "-",
      symbol = match[4] || "",
      zero = !!match[5],
      width = match[6] && +match[6],
      comma = !!match[7],
      precision = match[8] && +match[8].slice(1),
      type = match[9] || "";

  // The "n" type is an alias for ",g".
  if (type === "n") comma = true, type = "g";

  // Map invalid types to the default format.
  else if (!__WEBPACK_IMPORTED_MODULE_0__formatTypes__["a" /* default */][type]) type = "";

  // If zero fill is specified, padding goes after sign and before digits.
  if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

  this.fill = fill;
  this.align = align;
  this.sign = sign;
  this.symbol = symbol;
  this.zero = zero;
  this.width = width;
  this.comma = comma;
  this.precision = precision;
  this.type = type;
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width == null ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision == null ? "" : "." + Math.max(0, this.precision | 0))
      + this.type;
};


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatDefault__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formatPrefixAuto__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formatRounded__ = __webpack_require__(185);




/* harmony default export */ __webpack_exports__["a"] = ({
  "": __WEBPACK_IMPORTED_MODULE_0__formatDefault__["a" /* default */],
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": function(x) { return Math.round(x).toString(10); },
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__formatRounded__["a" /* default */])(x * 100, p); },
  "r": __WEBPACK_IMPORTED_MODULE_2__formatRounded__["a" /* default */],
  "s": __WEBPACK_IMPORTED_MODULE_1__formatPrefixAuto__["a" /* default */],
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
});


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exponent__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__formatGroup__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formatNumerals__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formatSpecifier__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__formatTypes__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__formatPrefixAuto__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__identity__ = __webpack_require__(186);








var prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ __webpack_exports__["a"] = (function(locale) {
  var group = locale.grouping && locale.thousands ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__formatGroup__["a" /* default */])(locale.grouping, locale.thousands) : __WEBPACK_IMPORTED_MODULE_6__identity__["a" /* default */],
      currency = locale.currency,
      decimal = locale.decimal,
      numerals = locale.numerals ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__formatNumerals__["a" /* default */])(locale.numerals) : __WEBPACK_IMPORTED_MODULE_6__identity__["a" /* default */],
      percent = locale.percent || "%";

  function newFormat(specifier) {
    specifier = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__formatSpecifier__["a" /* default */])(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        type = specifier.type;

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currency[0] : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currency[1] : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = __WEBPACK_IMPORTED_MODULE_4__formatTypes__["a" /* default */][type],
        maybeSuffix = !type || /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision == null ? (type ? 6 : 12)
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Perform the initial formatting.
        var valueNegative = value < 0;
        value = formatType(Math.abs(value), precision);

        // If a negative value rounds to zero during formatting, treat as positive.
        if (valueNegative && +value === 0) valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : "-") : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = valueSuffix + (type === "s" ? prefixes[8 + __WEBPACK_IMPORTED_MODULE_5__formatPrefixAuto__["b" /* prefixExponent */] / 3] : "") + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__formatSpecifier__["a" /* default */])(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
});


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__value__ = __webpack_require__(50);


/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(nb),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__value__["a" /* default */])(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
});


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(49);


/* harmony default export */ __webpack_exports__["a"] = (function(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__basis__["b" /* basis */])((t - i / n) * n, v0, v1, v2, v3);
  };
});


/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var d = new Date;
  return a = +a, b -= a, function(t) {
    return d.setTime(a + b * t), d;
  };
});


/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__value__ = __webpack_require__(50);


/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__value__["a" /* default */])(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
});


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rgbBasis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return rgbBasisClosed; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basis__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basisClosed__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__color__ = __webpack_require__(22);





/* harmony default export */ __webpack_exports__["a"] = ((function rgbGamma(y) {
  var color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__color__["c" /* gamma */])(y);

  function rgb(start, end) {
    var r = color((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["e" /* rgb */])(start)).r, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["e" /* rgb */])(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["e" /* rgb */])(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(__WEBPACK_IMPORTED_MODULE_1__basis__["a" /* default */]);
var rgbBasisClosed = rgbSpline(__WEBPACK_IMPORTED_MODULE_2__basisClosed__["a" /* default */]);


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(31);


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
});


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
});


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return +x;
});


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return implicit; });
/* harmony export (immutable) */ __webpack_exports__["a"] = ordinal;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_collection__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(13);



var implicit = {name: "implicit"};

function ordinal(range) {
  var index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_collection__["a" /* map */])(),
      domain = [],
      unknown = implicit;

  range = range == null ? [] : __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(range);

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_collection__["a" /* map */])();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return scale;
}


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = calendar;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_time__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3_time_format__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__array__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__continuous__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nice__ = __webpack_require__(93);








var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__continuous__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_5__continuous__["b" /* deinterpolateLinear */], __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateNumber"]),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["e" /* bisector */])(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["d" /* tickStep */])(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["d" /* tickStep */])(start, stop, interval);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(__WEBPACK_IMPORTED_MODULE_4__array__["a" /* map */].call(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__nice__["a" /* default */])(d, interval))
        : scale;
  };

  scale.copy = function() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__continuous__["c" /* copy */])(scale, calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return calendar(__WEBPACK_IMPORTED_MODULE_2_d3_time__["j" /* timeYear */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["o" /* timeMonth */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["p" /* timeWeek */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["i" /* timeDay */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["q" /* timeHour */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["r" /* timeMinute */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["s" /* timeSecond */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["t" /* timeMillisecond */], __WEBPACK_IMPORTED_MODULE_3_d3_time_format__["b" /* timeFormat */]).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]);
});


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__point__ = __webpack_require__(56);






/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x0 = __WEBPACK_IMPORTED_MODULE_4__point__["a" /* x */],
      x1 = null,
      y0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      y1 = __WEBPACK_IMPORTED_MODULE_4__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__line__["a" /* default */])().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
});


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slice; });
var slice = Array.prototype.slice;


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalClosed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(34);



function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalOpen;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinal__ = __webpack_require__(34);


function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return curveRadialLinear; });
/* harmony export (immutable) */ __webpack_exports__["a"] = curveRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linear__ = __webpack_require__(35);


var curveRadialLinear = curveRadial(__WEBPACK_IMPORTED_MODULE_0__linear__["a" /* default */]);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lineRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line__ = __webpack_require__(54);



function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return l;
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return lineRadial(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__line__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]));
});


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
});


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(26);


/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */]);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */]);
  }
});


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
});


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
});


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
});


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(26);


var ka = 0.89081309152928522810,
    kr = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10) / Math.sin(7 * __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10),
    kx = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr,
    ky = -Math.cos(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
});


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var sqrt3 = Math.sqrt(3);

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
});


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
});


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__ = __webpack_require__(57);
/* unused harmony reexport timeFormatDefaultLocale */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__["c"]; });
/* unused harmony reexport timeParse */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_defaultLocale__["a"]; });
/* unused harmony reexport utcParse */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_locale__ = __webpack_require__(113);
/* unused harmony reexport timeFormatLocale */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_isoFormat__ = __webpack_require__(112);
/* unused harmony reexport isoFormat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_isoParse__ = __webpack_require__(257);
/* unused harmony reexport isoParse */






/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isoSpecifier; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defaultLocale__ = __webpack_require__(57);


var isoSpecifier = "%Y-%m-%dT%H:%M:%S.%LZ";

function formatIsoNative(date) {
  return date.toISOString();
}

var formatIso = Date.prototype.toISOString
    ? formatIsoNative
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__defaultLocale__["a" /* utcFormat */])(isoSpecifier);

/* unused harmony default export */ var _unused_webpack_default_export = (formatIso);


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = formatLocale;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_time__ = __webpack_require__(58);


function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newYear(y) {
  return {y: y, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "S": formatSeconds,
    "U": formatWeekNumberSunday,
    "w": formatWeekdayNumber,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "S": formatUTCSeconds,
    "U": formatUTCWeekNumberSunday,
    "w": formatUTCWeekdayNumber,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "S": parseSeconds,
    "U": parseWeekNumberSunday,
    "w": parseWeekdayNumber,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, newDate) {
    return function(string) {
      var d = newYear(1900),
          i = parseSpecifier(d, specifier, string += "", 0);
      if (i != string.length) return null;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "W" in d ? 1 : 0;
        var day = "Z" in d ? utcDate(newYear(d.y)).getUTCDay() : newDate(newYear(d.y)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return newDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", localDate);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier, utcDate);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?:\:?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + __WEBPACK_IMPORTED_MODULE_0_d3_time__["i" /* timeDay */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["j" /* timeYear */])(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekNumberSunday(d, p) {
  return pad(__WEBPACK_IMPORTED_MODULE_0_d3_time__["k" /* timeSunday */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["j" /* timeYear */])(d), d), p, 2);
}

function formatWeekdayNumber(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(__WEBPACK_IMPORTED_MODULE_0_d3_time__["l" /* timeMonday */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["j" /* timeYear */])(d), d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + __WEBPACK_IMPORTED_MODULE_0_d3_time__["d" /* utcDay */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["a" /* utcYear */])(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(__WEBPACK_IMPORTED_MODULE_0_d3_time__["m" /* utcSunday */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["a" /* utcYear */])(d), d), p, 2);
}

function formatUTCWeekdayNumber(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(__WEBPACK_IMPORTED_MODULE_0_d3_time__["n" /* utcMonday */].count(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_time__["a" /* utcYear */])(d), d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = createCell;
/* harmony export (immutable) */ __webpack_exports__["c"] = cellHalfedgeStart;
/* unused harmony export cellHalfedgeEnd */
/* harmony export (immutable) */ __webpack_exports__["a"] = sortCellHalfedges;
/* harmony export (immutable) */ __webpack_exports__["b"] = clipCells;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Edge__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Diagram__ = __webpack_require__(29);



function createCell(site) {
  return __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][site.index] = {
    site: site,
    halfedges: []
  };
}

function cellHalfedgeAngle(cell, edge) {
  var site = cell.site,
      va = edge.left,
      vb = edge.right;
  if (site === vb) vb = va, va = site;
  if (vb) return Math.atan2(vb[1] - va[1], vb[0] - va[0]);
  if (site === va) va = edge[1], vb = edge[0];
  else va = edge[0], vb = edge[1];
  return Math.atan2(va[0] - vb[0], vb[1] - va[1]);
}

function cellHalfedgeStart(cell, edge) {
  return edge[+(edge.left !== cell.site)];
}

function cellHalfedgeEnd(cell, edge) {
  return edge[+(edge.left === cell.site)];
}

function sortCellHalfedges() {
  for (var i = 0, n = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */].length, cell, halfedges, j, m; i < n; ++i) {
    if ((cell = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][i]) && (m = (halfedges = cell.halfedges).length)) {
      var index = new Array(m),
          array = new Array(m);
      for (j = 0; j < m; ++j) index[j] = j, array[j] = cellHalfedgeAngle(cell, __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */][halfedges[j]]);
      index.sort(function(i, j) { return array[j] - array[i]; });
      for (j = 0; j < m; ++j) array[j] = halfedges[index[j]];
      for (j = 0; j < m; ++j) halfedges[j] = array[j];
    }
  }
}

function clipCells(x0, y0, x1, y1) {
  var nCells = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */].length,
      iCell,
      cell,
      site,
      iHalfedge,
      halfedges,
      nHalfedges,
      start,
      startX,
      startY,
      end,
      endX,
      endY,
      cover = true;

  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][iCell]) {
      site = cell.site;
      halfedges = cell.halfedges;
      iHalfedge = halfedges.length;

      // Remove any dangling clipped edges.
      while (iHalfedge--) {
        if (!__WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */][halfedges[iHalfedge]]) {
          halfedges.splice(iHalfedge, 1);
        }
      }

      // Insert any border edges as necessary.
      iHalfedge = 0, nHalfedges = halfedges.length;
      while (iHalfedge < nHalfedges) {
        end = cellHalfedgeEnd(cell, __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */][halfedges[iHalfedge]]), endX = end[0], endY = end[1];
        start = cellHalfedgeStart(cell, __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */][halfedges[++iHalfedge % nHalfedges]]), startX = start[0], startY = start[1];
        if (Math.abs(endX - startX) > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] || Math.abs(endY - startY) > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */]) {
          halfedges.splice(iHalfedge, 0, __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Edge__["b" /* createBorderEdge */])(site, end,
              Math.abs(endX - x0) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] && y1 - endY > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? [x0, Math.abs(startX - x0) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? startY : y1]
              : Math.abs(endY - y1) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] && x1 - endX > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? [Math.abs(startY - y1) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? startX : x1, y1]
              : Math.abs(endX - x1) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] && endY - y0 > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? [x1, Math.abs(startX - x1) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? startY : y0]
              : Math.abs(endY - y0) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] && endX - x0 > __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? [Math.abs(startY - y0) < __WEBPACK_IMPORTED_MODULE_1__Diagram__["b" /* epsilon */] ? startX : x0, y0]
              : null)) - 1);
          ++nHalfedges;
        }
      }

      if (nHalfedges) cover = false;
    }
  }

  // If there weren’t any edges, have the closest site cover the extent.
  // It doesn’t matter which corner of the extent we measure!
  if (cover) {
    var dx, dy, d2, dc = Infinity;

    for (iCell = 0, cover = null; iCell < nCells; ++iCell) {
      if (cell = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][iCell]) {
        site = cell.site;
        dx = site[0] - x0;
        dy = site[1] - y0;
        d2 = dx * dx + dy * dy;
        if (d2 < dc) dc = d2, cover = cell;
      }
    }

    if (cover) {
      var v00 = [x0, y0], v01 = [x0, y1], v11 = [x1, y1], v10 = [x1, y0];
      cover.halfedges.push(
        __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Edge__["b" /* createBorderEdge */])(site = cover.site, v00, v01)) - 1,
        __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Edge__["b" /* createBorderEdge */])(site, v01, v11)) - 1,
        __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Edge__["b" /* createBorderEdge */])(site, v11, v10)) - 1,
        __WEBPACK_IMPORTED_MODULE_1__Diagram__["d" /* edges */].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Edge__["b" /* createBorderEdge */])(site, v10, v00)) - 1
      );
    }
  }

  // Lastly delete any cells with no edges; these were entirely clipped.
  for (iCell = 0; iCell < nCells; ++iCell) {
    if (cell = __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][iCell]) {
      if (!cell.halfedges.length) {
        delete __WEBPACK_IMPORTED_MODULE_1__Diagram__["c" /* cells */][iCell];
      }
    }
  }
}


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firstCircle; });
/* harmony export (immutable) */ __webpack_exports__["c"] = attachCircle;
/* harmony export (immutable) */ __webpack_exports__["b"] = detachCircle;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedBlackTree__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Diagram__ = __webpack_require__(29);



var circlePool = [];

var firstCircle;

function Circle() {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__RedBlackTree__["b" /* RedBlackNode */])(this);
  this.x =
  this.y =
  this.arc =
  this.site =
  this.cy = null;
}

function attachCircle(arc) {
  var lArc = arc.P,
      rArc = arc.N;

  if (!lArc || !rArc) return;

  var lSite = lArc.site,
      cSite = arc.site,
      rSite = rArc.site;

  if (lSite === rSite) return;

  var bx = cSite[0],
      by = cSite[1],
      ax = lSite[0] - bx,
      ay = lSite[1] - by,
      cx = rSite[0] - bx,
      cy = rSite[1] - by;

  var d = 2 * (ax * cy - ay * cx);
  if (d >= -__WEBPACK_IMPORTED_MODULE_1__Diagram__["f" /* epsilon2 */]) return;

  var ha = ax * ax + ay * ay,
      hc = cx * cx + cy * cy,
      x = (cy * ha - ay * hc) / d,
      y = (ax * hc - cx * ha) / d;

  var circle = circlePool.pop() || new Circle;
  circle.arc = arc;
  circle.site = cSite;
  circle.x = x + bx;
  circle.y = (circle.cy = y + by) + Math.sqrt(x * x + y * y); // y bottom

  arc.circle = circle;

  var before = null,
      node = __WEBPACK_IMPORTED_MODULE_1__Diagram__["g" /* circles */]._;

  while (node) {
    if (circle.y < node.y || (circle.y === node.y && circle.x <= node.x)) {
      if (node.L) node = node.L;
      else { before = node.P; break; }
    } else {
      if (node.R) node = node.R;
      else { before = node; break; }
    }
  }

  __WEBPACK_IMPORTED_MODULE_1__Diagram__["g" /* circles */].insert(before, circle);
  if (!before) firstCircle = circle;
}

function detachCircle(arc) {
  var circle = arc.circle;
  if (circle) {
    if (!circle.P) firstCircle = circle.N;
    __WEBPACK_IMPORTED_MODULE_1__Diagram__["g" /* circles */].remove(circle);
    circlePool.push(circle);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__RedBlackTree__["b" /* RedBlackNode */])(circle);
    arc.circle = null;
  }
}


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(37);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(10);

var ReactPropTypesSecret = __webpack_require__(62);
var checkPropTypes = __webpack_require__(281);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(117)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(283)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _performanceNow = __webpack_require__(61);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__(63);

var _raf2 = _interopRequireDefault(_raf);

var _d3Interpolate = __webpack_require__(12);

var _d3Ease = __webpack_require__(80);

var Easing = _interopRequireWildcard(_d3Ease);

var _Utils = __webpack_require__(120);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var msPerFrame = 1000 / 60;

var defaults = {
  data: [],
  ignore: [],
  duration: 500,
  easing: 'easeCubicOut',
  enter: function enter() {
    return null;
  },
  leave: function leave() {
    return null;
  },
  onRest: function onRest() {
    return null;
  },
  stagger: null,
  flexDuration: false,
  immutable: true,
  staggerGroups: true
};

// Used to make all the interpolators from origin to destination states
var makeInterpolators = function makeInterpolators(originState, destState, ignore) {
  // Make sure we interpolate new and old keys
  var allKeys = dedupe(Object.keys(originState), Object.keys(destState));
  var interpolators = {};
  allKeys.forEach(function (key) {
    if (ignore.indexOf(key) > -1) {
      interpolators[key] = null;
      return;
    }
    if (originState[key] === destState[key]) {
      interpolators[key] = null;
      return;
    }
    interpolators[key] = (0, _d3Interpolate.interpolate)(originState[key], destState[key]);
  });
  return interpolators;
};

var Transition = function (_Component) {
  _inherits(Transition, _Component);

  function Transition() {
    _classCallCheck(this, Transition);

    var _this = _possibleConstructorReturn(this, (Transition.__proto__ || Object.getPrototypeOf(Transition)).call(this));

    _this.items = [];
    _this.state = {
      items: []
    };
    return _this;
  }

  _createClass(Transition, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.unmounting = false;
      this.animationID = null;
      this.lastRenderTime = 0;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pivot(this.props);
      this.ranFirst = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.pivot(props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unmounting = true;
      if (this.animationID != null) {
        _raf2.default.cancel(this.animationID);
        this.animationID = null;
      }
    }
  }, {
    key: 'pivot',
    value: function pivot(props) {
      var _this2 = this;

      var getKey = props.getKey,
          data = props.data,
          easing = props.easing,
          duration = props.duration,
          getDuration = props.getDuration,
          getEasing = props.getEasing,
          enter = props.enter,
          update = props.update,
          leave = props.leave,
          immutable = props.immutable,
          stagger = props.stagger,
          staggerGroups = props.staggerGroups;

      // Detect if we need to animate

      var noChanges = immutable ? this.props.data === data : _Utils2.default.deepEquals(this.props.data, data);

      // If this is the first time, animate regardless
      if (this.ranFirst && noChanges) {
        return;
      }

      // Get the current items from the state (which is the visual
      // representation of our items)
      var currentItems = this.items;

      // Get the new items with their keys and data
      var newItems = data.map(function (d, i) {
        return {
          key: getKey(d, i),
          data: d,
          next: {}
        };
      });

      // Detect instant rendering
      if (!duration) {
        this.items = newItems;
        this.items.forEach(function (item) {
          item.progress = 1;
          item.originState = update(item.data, item.key);
          item.destState = _extends({}, item.originState);
        });
        this.renderProgress();
        return;
      }

      // Find items that are entering
      var enteringItems = newItems.filter(function (newItem) {
        return !currentItems.find(function (currentItem) {
          return currentItem.key === newItem.key;
        });
      });

      enteringItems.forEach(function (item, i) {
        item.willEnter = true;
      });

      // Find items that should leave
      var leavingItems = currentItems.filter(function (currentItem) {
        return !newItems.find(function (newItem) {
          return newItem.key === currentItem.key;
        });
      });

      leavingItems.forEach(function (item, i) {
        item.willLeave = true;
      });

      // Find items that are staying
      var stayingItems = currentItems.filter(function (currentItem) {
        return newItems.find(function (newItem) {
          return newItem.key === currentItem.key;
        });
      });

      stayingItems.forEach(function (item) {
        // If the item was leaving, and is now staying, update it
        if (item.leaving) {
          item.willUpdate = true;
        }
        // If the item's update function returns something new, update it
        var newDestState = update(item.data, item.key);
        if (!_Utils2.default.deepEquals(item.destState, newDestState)) {
          item.willUpdate = true;
        }
        item.willLeave = false;
        item.willEnter = false;
      });

      // Merge all of the items together and
      // give each item it's new origin/destination states
      // with corresponding interpolators
      this.items = mergeItems(currentItems, enteringItems);

      this.items.forEach(function (item, i) {
        // Queue an update either immediately or using a staggerOffset
        var staggerOffset = 0;
        // For staggering time based animations, we just need the index
        var staggerIndex = i + 1;
        // But if we are staggering by group, we will instead need the index of the
        // item relative to its predecessors who share the same entering/leaving group
        if (stagger && staggerGroups) {
          staggerIndex = 0;
          for (var ii = 0; ii < i; ii++) {
            var staggerItem = _this2.items[ii];
            if (staggerItem.willEnter === item.willEnter && staggerItem.willLeave === item.willLeave) {
              staggerIndex++;
            }
          }
        }

        if (stagger) {
          // If its staggered, we need base the progress off of
          // the staggered time, instead of the currentTime
          staggerOffset = stagger * staggerIndex;
        }

        // For every item that needs to be reset, set a new startTime
        if (item.willEnter || item.willLeave || item.willUpdate) {
          item.nextUpdate = staggerOffset ? (0, _performanceNow2.default)() + staggerOffset : true;
          item.duration = typeof getDuration === 'function' ? getDuration(item.data, item.key) : duration;
          item.easing = typeof getEasing === 'function' ? getEasing(item.data, item.key) : easing;

          // Update the easing function
          item.easer = typeof item.easing === 'function' ? item.easing : Easing[item.easing] || Easing[defaults.easing];
        }

        // Compile the possible states for each item
        item.next.update = update(item.data, item.key);
        item.next.enter = enter(item.data, item.key);
        item.next.leave = leave(item.data, item.key);

        // Since the underlying data could have changed for the currentItems
        // update them all
        var newItem = newItems.find(function (d) {
          return d.key === item.key;
        });
        item.data = newItem ? newItem.data : item.data;
      });

      // Be sure to render the origin frame
      this.renderProgress();

      // Animate if needed
      this.animate();
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this3 = this;

      // If we're unmounting, bail out.
      if (this.unmounting) {
        return;
      }

      // If we're already animated, bail out.
      if (this.animationID) {
        return;
      }

      var _props = this.props,
          flexDuration = _props.flexDuration,
          ignore = _props.ignore;


      this.animationID = (0, _raf2.default)(function () {
        // Double check that we are still mounted, since RAF can perform
        // asyncronously sometimes
        if (_this3.unmounting) {
          return;
        }

        // Keep track of time
        var currentTime = (0, _performanceNow2.default)();

        // this.items = this.items.filter(
        //   item => !(item.leaving && item.progress === 1)
        // )

        var needsAnimation = _this3.items.some(function (item) {
          return item.nextUpdate || item.progress < 1;
        });

        // If the animation is complete, tie up any loose ends...
        if (!needsAnimation) {
          _this3.animationID = null;
          _this3.wasAnimating = false;
          return;
        }

        // It's time to animate!
        _this3.wasAnimating = true;

        // If we using flexDuration, add however many milliseconds behind we are to the flexAmount to offset
        // any dropped frames
        var timeSinceLastFrame = currentTime - _this3.lastRenderTime;
        currentTime += flexDuration ? Math.max(Math.floor(timeSinceLastFrame - msPerFrame), 0) : 0;

        _this3.items.forEach(function (item, i) {
          // If the item is ready to be updated, do it now
          if (item.nextUpdate === true || item.nextUpdate && item.nextUpdate <= currentTime) {
            item.entering = false;
            item.leaving = false;
            item.updating = false;
            // Update leaving, entering, and changed items with their new origins,
            // destinations and interpolators
            if (item.willEnter) {
              item.willEnter = false;
              item.entering = true;
              item.originState = item.next.enter || item.next.update;
              item.destState = item.next.update;
              item.interpolators = makeInterpolators(item.originState, item.destState, ignore);
            } else if (item.willLeave) {
              item.willLeave = false;
              item.leaving = true;
              item.originState = item.state || item.next.update;
              item.destState = item.next.leave || item.next.update;
              item.interpolators = makeInterpolators(item.originState, item.destState, ignore);
            } else if (item.willUpdate) {
              item.willUpdate = false;
              item.updating = true;
              item.originState = item.state || item.next.update;
              item.destState = item.next.update;
              item.interpolators = makeInterpolators(item.originState, item.destState, ignore);
            }

            // For every item that needs to be reset, set a new startTime and durtaion
            item.startTime = (0, _performanceNow2.default)();
            item.nextUpdate = false;
          }

          // Set the progress
          var progress = item.startTime ? (currentTime - item.startTime) / item.duration : 0;

          // Make sure progress is between 0 and 1
          progress = Math.max(Math.min(progress, 1), 0);

          item.progress = progress;
        });

        // Render with the progress
        _this3.renderProgress();

        // Update the lastRenderTime
        _this3.lastRenderTime = currentTime;

        // Mark the frame as done
        _this3.animationID = null;

        _this3.animate();
      });
    }
  }, {
    key: 'renderProgress',
    value: function renderProgress() {
      var onRest = this.props.onRest;
      // Don't interpolate items that haven't entered yet

      var items = this.items.filter(function (item) {
        return !item.willEnter && item.originState && item.destState;
      });

      items.forEach(function (item) {
        item.state = {};
        var allKeys = dedupe(Object.keys(item.originState || {}), Object.keys(item.destState || {}));

        allKeys.forEach(function (key) {
          if (!item.progress) {
            // If at absolute 0, draw the origin state
            item.state[key] = item.originState[key];
          } else if (item.progress === 1 || !item.interpolators[key]) {
            // If ignored, skip right to the value
            item.state[key] = item.destState[key];
          } else {
            // Otherwise, interpolate with the progress
            item.state[key] = item.interpolators[key](item.easer(item.progress));
          }
        });
        if (item.progress === 1) {
          onRest(item.data, item.key);
        }
      });

      // Don't render items that haven't entered yet or have exited
      items = items.filter(function (item) {
        return !(item.willEnter || item.leaving && item.progress === 1);
      });

      // Remove items that have exited
      this.items = this.items.filter(function (item) {
        return !(item.leaving && item.progress === 1);
      });

      this.setState({ items: items });
    }
  }, {
    key: 'render',
    value: function render() {
      var renderedChildren = this.props.children(this.state.items);
      return renderedChildren && _react2.default.Children.only(renderedChildren);
    }
  }]);

  return Transition;
}(_react.Component);

// Taken from react-motion's mergeDiff (https://github.com/chenglou/react-motion/blob/446a8d0130072c4a59fec1ab788bfc2cc5c5b788/src/mergeDiff.js)


Transition.defaultProps = defaults;
exports.default = Transition;
function mergeItems(prev, next) {
  var prevKeyIndex = {};
  for (var i = 0; i < prev.length; i++) {
    prevKeyIndex[prev[i].key] = i;
  }
  var nextKeyIndex = {};
  for (var _i = 0; _i < next.length; _i++) {
    nextKeyIndex[next[_i].key] = _i;
  }
  // Merge the arrays
  var allItems = [];
  for (var _i2 = 0; _i2 < next.length; _i2++) {
    allItems[_i2] = next[_i2];
  }
  for (var _i3 = 0; _i3 < prev.length; _i3++) {
    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[_i3].key)) {
      allItems.push(prev[_i3]);
    }
  }
  // now all the items all present. Core sorting logic to have the right order
  return allItems.sort(function (a, b) {
    var nextOrderA = nextKeyIndex[a.key];
    var nextOrderB = nextKeyIndex[b.key];
    var prevOrderA = prevKeyIndex[a.key];
    var prevOrderB = prevKeyIndex[b.key];
    if (nextOrderA != null && nextOrderB != null) {
      // both keys in next
      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
    } else if (prevOrderA != null && prevOrderB != null) {
      // both keys in prev
      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
    } else if (nextOrderA != null) {
      // key a in next, key b in prev
      // how to determine the order between a and b? We find a "pivot" (term
      // abuse), a key present in both prev and next, that is sandwiched between
      // a and b. In the context of our above example, if we're comparing a and
      // d, b's (the only) pivot
      for (var _i4 = 0; _i4 < next.length; _i4++) {
        var pivot = next[_i4].key;
        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
          continue;
        }
        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
          return -1;
        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
          return 1;
        }
      }
      // pluggable. default to: next bigger than prev
      return 1;
    }
    // prevOrderA, nextOrderB
    for (var _i5 = 0; _i5 < next.length; _i5++) {
      var _pivot = next[_i5].key;
      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, _pivot)) {
        continue;
      }
      if (nextOrderB < nextKeyIndex[_pivot] && prevOrderA > prevKeyIndex[_pivot]) {
        return 1;
      } else if (nextOrderB > nextKeyIndex[_pivot] && prevOrderA < prevKeyIndex[_pivot]) {
        return -1;
      }
    }
    // pluggable. default to: next bigger than prev
    return -1;
  });
}

Transition.defaults = defaults;

function dedupe() {
  for (var _len = arguments.length, arrs = Array(_len), _key = 0; _key < _len; _key++) {
    arrs[_key] = arguments[_key];
  }

  var allItems = arrs.reduce(function (a, b) {
    return a.concat(b);
  }, []);
  for (var i = 0; i < allItems.length; ++i) {
    for (var j = i + 1; j < allItems.length; ++j) {
      if (allItems[i] === allItems[j]) {
        allItems.splice(j--, 1);
      }
    }
  }
  return allItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc2l0aW9uLmpzIl0sIm5hbWVzIjpbIkVhc2luZyIsIm1zUGVyRnJhbWUiLCJkZWZhdWx0cyIsImRhdGEiLCJpZ25vcmUiLCJkdXJhdGlvbiIsImVhc2luZyIsImVudGVyIiwibGVhdmUiLCJvblJlc3QiLCJzdGFnZ2VyIiwiZmxleER1cmF0aW9uIiwiaW1tdXRhYmxlIiwic3RhZ2dlckdyb3VwcyIsIm1ha2VJbnRlcnBvbGF0b3JzIiwib3JpZ2luU3RhdGUiLCJkZXN0U3RhdGUiLCJhbGxLZXlzIiwiZGVkdXBlIiwiT2JqZWN0Iiwia2V5cyIsImludGVycG9sYXRvcnMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsImtleSIsIlRyYW5zaXRpb24iLCJpdGVtcyIsInN0YXRlIiwidW5tb3VudGluZyIsImFuaW1hdGlvbklEIiwibGFzdFJlbmRlclRpbWUiLCJwaXZvdCIsInByb3BzIiwicmFuRmlyc3QiLCJjYW5jZWwiLCJnZXRLZXkiLCJnZXREdXJhdGlvbiIsImdldEVhc2luZyIsInVwZGF0ZSIsIm5vQ2hhbmdlcyIsImRlZXBFcXVhbHMiLCJjdXJyZW50SXRlbXMiLCJuZXdJdGVtcyIsIm1hcCIsImQiLCJpIiwibmV4dCIsIml0ZW0iLCJwcm9ncmVzcyIsInJlbmRlclByb2dyZXNzIiwiZW50ZXJpbmdJdGVtcyIsImZpbHRlciIsImZpbmQiLCJjdXJyZW50SXRlbSIsIm5ld0l0ZW0iLCJ3aWxsRW50ZXIiLCJsZWF2aW5nSXRlbXMiLCJ3aWxsTGVhdmUiLCJzdGF5aW5nSXRlbXMiLCJsZWF2aW5nIiwid2lsbFVwZGF0ZSIsIm5ld0Rlc3RTdGF0ZSIsIm1lcmdlSXRlbXMiLCJzdGFnZ2VyT2Zmc2V0Iiwic3RhZ2dlckluZGV4IiwiaWkiLCJzdGFnZ2VySXRlbSIsIm5leHRVcGRhdGUiLCJlYXNlciIsImFuaW1hdGUiLCJjdXJyZW50VGltZSIsIm5lZWRzQW5pbWF0aW9uIiwic29tZSIsIndhc0FuaW1hdGluZyIsInRpbWVTaW5jZUxhc3RGcmFtZSIsIk1hdGgiLCJtYXgiLCJmbG9vciIsImVudGVyaW5nIiwidXBkYXRpbmciLCJzdGFydFRpbWUiLCJtaW4iLCJzZXRTdGF0ZSIsInJlbmRlcmVkQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIkNoaWxkcmVuIiwib25seSIsImRlZmF1bHRQcm9wcyIsInByZXYiLCJwcmV2S2V5SW5kZXgiLCJsZW5ndGgiLCJuZXh0S2V5SW5kZXgiLCJhbGxJdGVtcyIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJuZXh0T3JkZXJBIiwibmV4dE9yZGVyQiIsInByZXZPcmRlckEiLCJwcmV2T3JkZXJCIiwiYXJycyIsInJlZHVjZSIsImNvbmNhdCIsImoiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7SUFBWUEsTTs7QUFFWjs7Ozs7Ozs7Ozs7OztBQURBOzs7QUFHQSxJQUFNQyxhQUFhLE9BQU8sRUFBMUI7O0FBRUEsSUFBTUMsV0FBVztBQUNmQyxRQUFNLEVBRFM7QUFFZkMsVUFBUSxFQUZPO0FBR2ZDLFlBQVUsR0FISztBQUlmQyxVQUFRLGNBSk87QUFLZkMsU0FBTztBQUFBLFdBQU0sSUFBTjtBQUFBLEdBTFE7QUFNZkMsU0FBTztBQUFBLFdBQU0sSUFBTjtBQUFBLEdBTlE7QUFPZkMsVUFBUTtBQUFBLFdBQU0sSUFBTjtBQUFBLEdBUE87QUFRZkMsV0FBUyxJQVJNO0FBU2ZDLGdCQUFjLEtBVEM7QUFVZkMsYUFBVyxJQVZJO0FBV2ZDLGlCQUFlO0FBWEEsQ0FBakI7O0FBY0E7QUFDQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDQyxXQUFELEVBQWNDLFNBQWQsRUFBeUJaLE1BQXpCLEVBQW9DO0FBQzVEO0FBQ0EsTUFBTWEsVUFBVUMsT0FBT0MsT0FBT0MsSUFBUCxDQUFZTCxXQUFaLENBQVAsRUFBaUNJLE9BQU9DLElBQVAsQ0FBWUosU0FBWixDQUFqQyxDQUFoQjtBQUNBLE1BQU1LLGdCQUFnQixFQUF0QjtBQUNBSixVQUFRSyxPQUFSLENBQWdCLGVBQU87QUFDckIsUUFBSWxCLE9BQU9tQixPQUFQLENBQWVDLEdBQWYsSUFBc0IsQ0FBQyxDQUEzQixFQUE4QjtBQUM1Qkgsb0JBQWNHLEdBQWQsSUFBcUIsSUFBckI7QUFDQTtBQUNEO0FBQ0QsUUFBSVQsWUFBWVMsR0FBWixNQUFxQlIsVUFBVVEsR0FBVixDQUF6QixFQUF5QztBQUN2Q0gsb0JBQWNHLEdBQWQsSUFBcUIsSUFBckI7QUFDQTtBQUNEO0FBQ0RILGtCQUFjRyxHQUFkLElBQXFCLGdDQUFZVCxZQUFZUyxHQUFaLENBQVosRUFBOEJSLFVBQVVRLEdBQVYsQ0FBOUIsQ0FBckI7QUFDRCxHQVZEO0FBV0EsU0FBT0gsYUFBUDtBQUNELENBaEJEOztJQWtCcUJJLFU7OztBQUduQix3QkFBZTtBQUFBOztBQUFBOztBQUViLFVBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsVUFBS0MsS0FBTCxHQUFhO0FBQ1hELGFBQU87QUFESSxLQUFiO0FBSGE7QUFNZDs7Ozt5Q0FFcUI7QUFDcEIsV0FBS0UsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUtDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCLENBQXRCO0FBQ0Q7Ozt3Q0FFb0I7QUFDbkIsV0FBS0MsS0FBTCxDQUFXLEtBQUtDLEtBQWhCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixJQUFoQjtBQUNEOzs7OENBRTBCRCxLLEVBQU87QUFDaEMsV0FBS0QsS0FBTCxDQUFXQyxLQUFYO0FBQ0Q7OzsyQ0FFdUI7QUFDdEIsV0FBS0osVUFBTCxHQUFrQixJQUFsQjtBQUNBLFVBQUksS0FBS0MsV0FBTCxJQUFvQixJQUF4QixFQUE4QjtBQUM1QixzQkFBSUssTUFBSixDQUFXLEtBQUtMLFdBQWhCO0FBQ0EsYUFBS0EsV0FBTCxHQUFtQixJQUFuQjtBQUNEO0FBQ0Y7OzswQkFFTUcsSyxFQUFPO0FBQUE7O0FBQUEsVUFFVkcsTUFGVSxHQWNSSCxLQWRRLENBRVZHLE1BRlU7QUFBQSxVQUdWaEMsSUFIVSxHQWNSNkIsS0FkUSxDQUdWN0IsSUFIVTtBQUFBLFVBSVZHLE1BSlUsR0FjUjBCLEtBZFEsQ0FJVjFCLE1BSlU7QUFBQSxVQUtWRCxRQUxVLEdBY1IyQixLQWRRLENBS1YzQixRQUxVO0FBQUEsVUFNVitCLFdBTlUsR0FjUkosS0FkUSxDQU1WSSxXQU5VO0FBQUEsVUFPVkMsU0FQVSxHQWNSTCxLQWRRLENBT1ZLLFNBUFU7QUFBQSxVQVFWOUIsS0FSVSxHQWNSeUIsS0FkUSxDQVFWekIsS0FSVTtBQUFBLFVBU1YrQixNQVRVLEdBY1JOLEtBZFEsQ0FTVk0sTUFUVTtBQUFBLFVBVVY5QixLQVZVLEdBY1J3QixLQWRRLENBVVZ4QixLQVZVO0FBQUEsVUFXVkksU0FYVSxHQWNSb0IsS0FkUSxDQVdWcEIsU0FYVTtBQUFBLFVBWVZGLE9BWlUsR0FjUnNCLEtBZFEsQ0FZVnRCLE9BWlU7QUFBQSxVQWFWRyxhQWJVLEdBY1JtQixLQWRRLENBYVZuQixhQWJVOztBQWdCWjs7QUFDQSxVQUFJMEIsWUFBWTNCLFlBQ1osS0FBS29CLEtBQUwsQ0FBVzdCLElBQVgsS0FBb0JBLElBRFIsR0FFWixnQkFBTXFDLFVBQU4sQ0FBaUIsS0FBS1IsS0FBTCxDQUFXN0IsSUFBNUIsRUFBa0NBLElBQWxDLENBRko7O0FBSUE7QUFDQSxVQUFJLEtBQUs4QixRQUFMLElBQWlCTSxTQUFyQixFQUFnQztBQUM5QjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxVQUFNRSxlQUFlLEtBQUtmLEtBQTFCOztBQUVBO0FBQ0EsVUFBSWdCLFdBQVd2QyxLQUFLd0MsR0FBTCxDQUFTLFVBQUNDLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ2hDLGVBQU87QUFDTHJCLGVBQUtXLE9BQU9TLENBQVAsRUFBVUMsQ0FBVixDQURBO0FBRUwxQyxnQkFBTXlDLENBRkQ7QUFHTEUsZ0JBQU07QUFIRCxTQUFQO0FBS0QsT0FOYyxDQUFmOztBQVFBO0FBQ0EsVUFBSSxDQUFDekMsUUFBTCxFQUFlO0FBQ2IsYUFBS3FCLEtBQUwsR0FBYWdCLFFBQWI7QUFDQSxhQUFLaEIsS0FBTCxDQUFXSixPQUFYLENBQW1CLGdCQUFRO0FBQ3pCeUIsZUFBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBRCxlQUFLaEMsV0FBTCxHQUFtQnVCLE9BQU9TLEtBQUs1QyxJQUFaLEVBQWtCNEMsS0FBS3ZCLEdBQXZCLENBQW5CO0FBQ0F1QixlQUFLL0IsU0FBTCxnQkFBc0IrQixLQUFLaEMsV0FBM0I7QUFDRCxTQUpEO0FBS0EsYUFBS2tDLGNBQUw7QUFDQTtBQUNEOztBQUVEO0FBQ0EsVUFBTUMsZ0JBQWdCUixTQUFTUyxNQUFULENBQ3BCO0FBQUEsZUFDRSxDQUFDVixhQUFhVyxJQUFiLENBQWtCO0FBQUEsaUJBQWVDLFlBQVk3QixHQUFaLEtBQW9COEIsUUFBUTlCLEdBQTNDO0FBQUEsU0FBbEIsQ0FESDtBQUFBLE9BRG9CLENBQXRCOztBQUtBMEIsb0JBQWM1QixPQUFkLENBQXNCLFVBQUN5QixJQUFELEVBQU9GLENBQVAsRUFBYTtBQUNqQ0UsYUFBS1EsU0FBTCxHQUFpQixJQUFqQjtBQUNELE9BRkQ7O0FBSUE7QUFDQSxVQUFNQyxlQUFlZixhQUFhVSxNQUFiLENBQ25CO0FBQUEsZUFBZSxDQUFDVCxTQUFTVSxJQUFULENBQWM7QUFBQSxpQkFBV0UsUUFBUTlCLEdBQVIsS0FBZ0I2QixZQUFZN0IsR0FBdkM7QUFBQSxTQUFkLENBQWhCO0FBQUEsT0FEbUIsQ0FBckI7O0FBSUFnQyxtQkFBYWxDLE9BQWIsQ0FBcUIsVUFBQ3lCLElBQUQsRUFBT0YsQ0FBUCxFQUFhO0FBQ2hDRSxhQUFLVSxTQUFMLEdBQWlCLElBQWpCO0FBQ0QsT0FGRDs7QUFJQTtBQUNBLFVBQU1DLGVBQWVqQixhQUFhVSxNQUFiLENBQW9CO0FBQUEsZUFDdkNULFNBQVNVLElBQVQsQ0FBYztBQUFBLGlCQUFXRSxRQUFROUIsR0FBUixLQUFnQjZCLFlBQVk3QixHQUF2QztBQUFBLFNBQWQsQ0FEdUM7QUFBQSxPQUFwQixDQUFyQjs7QUFJQWtDLG1CQUFhcEMsT0FBYixDQUFxQixnQkFBUTtBQUMzQjtBQUNBLFlBQUl5QixLQUFLWSxPQUFULEVBQWtCO0FBQ2hCWixlQUFLYSxVQUFMLEdBQWtCLElBQWxCO0FBQ0Q7QUFDRDtBQUNBLFlBQU1DLGVBQWV2QixPQUFPUyxLQUFLNUMsSUFBWixFQUFrQjRDLEtBQUt2QixHQUF2QixDQUFyQjtBQUNBLFlBQUksQ0FBQyxnQkFBTWdCLFVBQU4sQ0FBaUJPLEtBQUsvQixTQUF0QixFQUFpQzZDLFlBQWpDLENBQUwsRUFBcUQ7QUFDbkRkLGVBQUthLFVBQUwsR0FBa0IsSUFBbEI7QUFDRDtBQUNEYixhQUFLVSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FWLGFBQUtRLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxPQVpEOztBQWNBO0FBQ0E7QUFDQTtBQUNBLFdBQUs3QixLQUFMLEdBQWFvQyxXQUFXckIsWUFBWCxFQUF5QlMsYUFBekIsQ0FBYjs7QUFFQSxXQUFLeEIsS0FBTCxDQUFXSixPQUFYLENBQW1CLFVBQUN5QixJQUFELEVBQU9GLENBQVAsRUFBYTtBQUM5QjtBQUNBLFlBQUlrQixnQkFBZ0IsQ0FBcEI7QUFDQTtBQUNBLFlBQUlDLGVBQWVuQixJQUFJLENBQXZCO0FBQ0E7QUFDQTtBQUNBLFlBQUluQyxXQUFXRyxhQUFmLEVBQThCO0FBQzVCbUQseUJBQWUsQ0FBZjtBQUNBLGVBQUssSUFBSUMsS0FBSyxDQUFkLEVBQWlCQSxLQUFLcEIsQ0FBdEIsRUFBeUJvQixJQUF6QixFQUErQjtBQUM3QixnQkFBTUMsY0FBYyxPQUFLeEMsS0FBTCxDQUFXdUMsRUFBWCxDQUFwQjtBQUNBLGdCQUNFQyxZQUFZWCxTQUFaLEtBQTBCUixLQUFLUSxTQUEvQixJQUNBVyxZQUFZVCxTQUFaLEtBQTBCVixLQUFLVSxTQUZqQyxFQUdFO0FBQ0FPO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFlBQUl0RCxPQUFKLEVBQWE7QUFDWDtBQUNBO0FBQ0FxRCwwQkFBZ0JyRCxVQUFVc0QsWUFBMUI7QUFDRDs7QUFFRDtBQUNBLFlBQUlqQixLQUFLUSxTQUFMLElBQWtCUixLQUFLVSxTQUF2QixJQUFvQ1YsS0FBS2EsVUFBN0MsRUFBeUQ7QUFDdkRiLGVBQUtvQixVQUFMLEdBQWtCSixnQkFBZ0Isa0NBQVFBLGFBQXhCLEdBQXdDLElBQTFEO0FBQ0FoQixlQUFLMUMsUUFBTCxHQUNFLE9BQU8rQixXQUFQLEtBQXVCLFVBQXZCLEdBQ0lBLFlBQVlXLEtBQUs1QyxJQUFqQixFQUF1QjRDLEtBQUt2QixHQUE1QixDQURKLEdBRUluQixRQUhOO0FBSUEwQyxlQUFLekMsTUFBTCxHQUNFLE9BQU8rQixTQUFQLEtBQXFCLFVBQXJCLEdBQ0lBLFVBQVVVLEtBQUs1QyxJQUFmLEVBQXFCNEMsS0FBS3ZCLEdBQTFCLENBREosR0FFSWxCLE1BSE47O0FBS0E7QUFDQXlDLGVBQUtxQixLQUFMLEdBQ0UsT0FBT3JCLEtBQUt6QyxNQUFaLEtBQXVCLFVBQXZCLEdBQ0l5QyxLQUFLekMsTUFEVCxHQUVJTixPQUFPK0MsS0FBS3pDLE1BQVosS0FBdUJOLE9BQU9FLFNBQVNJLE1BQWhCLENBSDdCO0FBSUQ7O0FBRUQ7QUFDQXlDLGFBQUtELElBQUwsQ0FBVVIsTUFBVixHQUFtQkEsT0FBT1MsS0FBSzVDLElBQVosRUFBa0I0QyxLQUFLdkIsR0FBdkIsQ0FBbkI7QUFDQXVCLGFBQUtELElBQUwsQ0FBVXZDLEtBQVYsR0FBa0JBLE1BQU13QyxLQUFLNUMsSUFBWCxFQUFpQjRDLEtBQUt2QixHQUF0QixDQUFsQjtBQUNBdUIsYUFBS0QsSUFBTCxDQUFVdEMsS0FBVixHQUFrQkEsTUFBTXVDLEtBQUs1QyxJQUFYLEVBQWlCNEMsS0FBS3ZCLEdBQXRCLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxZQUFNOEIsVUFBVVosU0FBU1UsSUFBVCxDQUFjO0FBQUEsaUJBQUtSLEVBQUVwQixHQUFGLEtBQVV1QixLQUFLdkIsR0FBcEI7QUFBQSxTQUFkLENBQWhCO0FBQ0F1QixhQUFLNUMsSUFBTCxHQUFZbUQsVUFBVUEsUUFBUW5ELElBQWxCLEdBQXlCNEMsS0FBSzVDLElBQTFDO0FBQ0QsT0F0REQ7O0FBd0RBO0FBQ0EsV0FBSzhDLGNBQUw7O0FBRUE7QUFDQSxXQUFLb0IsT0FBTDtBQUNEOzs7OEJBRVU7QUFBQTs7QUFDVDtBQUNBLFVBQUksS0FBS3pDLFVBQVQsRUFBcUI7QUFDbkI7QUFDRDs7QUFFRDtBQUNBLFVBQUksS0FBS0MsV0FBVCxFQUFzQjtBQUNwQjtBQUNEOztBQVRRLG1CQVd3QixLQUFLRyxLQVg3QjtBQUFBLFVBV0RyQixZQVhDLFVBV0RBLFlBWEM7QUFBQSxVQVdhUCxNQVhiLFVBV2FBLE1BWGI7OztBQWFULFdBQUt5QixXQUFMLEdBQW1CLG1CQUFJLFlBQU07QUFDM0I7QUFDQTtBQUNBLFlBQUksT0FBS0QsVUFBVCxFQUFxQjtBQUNuQjtBQUNEOztBQUVEO0FBQ0EsWUFBSTBDLGNBQWMsK0JBQWxCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFNQyxpQkFBaUIsT0FBSzdDLEtBQUwsQ0FBVzhDLElBQVgsQ0FDckI7QUFBQSxpQkFBUXpCLEtBQUtvQixVQUFMLElBQW1CcEIsS0FBS0MsUUFBTCxHQUFnQixDQUEzQztBQUFBLFNBRHFCLENBQXZCOztBQUlBO0FBQ0EsWUFBSSxDQUFDdUIsY0FBTCxFQUFxQjtBQUNuQixpQkFBSzFDLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxpQkFBSzRDLFlBQUwsR0FBb0IsS0FBcEI7QUFDQTtBQUNEOztBQUVEO0FBQ0EsZUFBS0EsWUFBTCxHQUFvQixJQUFwQjs7QUFFQTtBQUNBO0FBQ0EsWUFBTUMscUJBQXFCSixjQUFjLE9BQUt4QyxjQUE5QztBQUNBd0MsdUJBQWUzRCxlQUNYZ0UsS0FBS0MsR0FBTCxDQUFTRCxLQUFLRSxLQUFMLENBQVdILHFCQUFxQnpFLFVBQWhDLENBQVQsRUFBc0QsQ0FBdEQsQ0FEVyxHQUVYLENBRko7O0FBSUEsZUFBS3lCLEtBQUwsQ0FBV0osT0FBWCxDQUFtQixVQUFDeUIsSUFBRCxFQUFPRixDQUFQLEVBQWE7QUFDOUI7QUFDQSxjQUNFRSxLQUFLb0IsVUFBTCxLQUFvQixJQUFwQixJQUNDcEIsS0FBS29CLFVBQUwsSUFBbUJwQixLQUFLb0IsVUFBTCxJQUFtQkcsV0FGekMsRUFHRTtBQUNBdkIsaUJBQUsrQixRQUFMLEdBQWdCLEtBQWhCO0FBQ0EvQixpQkFBS1ksT0FBTCxHQUFlLEtBQWY7QUFDQVosaUJBQUtnQyxRQUFMLEdBQWdCLEtBQWhCO0FBQ0E7QUFDQTtBQUNBLGdCQUFJaEMsS0FBS1EsU0FBVCxFQUFvQjtBQUNsQlIsbUJBQUtRLFNBQUwsR0FBaUIsS0FBakI7QUFDQVIsbUJBQUsrQixRQUFMLEdBQWdCLElBQWhCO0FBQ0EvQixtQkFBS2hDLFdBQUwsR0FBbUJnQyxLQUFLRCxJQUFMLENBQVV2QyxLQUFWLElBQW1Cd0MsS0FBS0QsSUFBTCxDQUFVUixNQUFoRDtBQUNBUyxtQkFBSy9CLFNBQUwsR0FBaUIrQixLQUFLRCxJQUFMLENBQVVSLE1BQTNCO0FBQ0FTLG1CQUFLMUIsYUFBTCxHQUFxQlAsa0JBQ25CaUMsS0FBS2hDLFdBRGMsRUFFbkJnQyxLQUFLL0IsU0FGYyxFQUduQlosTUFIbUIsQ0FBckI7QUFLRCxhQVZELE1BVU8sSUFBSTJDLEtBQUtVLFNBQVQsRUFBb0I7QUFDekJWLG1CQUFLVSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0FWLG1CQUFLWSxPQUFMLEdBQWUsSUFBZjtBQUNBWixtQkFBS2hDLFdBQUwsR0FBbUJnQyxLQUFLcEIsS0FBTCxJQUFjb0IsS0FBS0QsSUFBTCxDQUFVUixNQUEzQztBQUNBUyxtQkFBSy9CLFNBQUwsR0FBaUIrQixLQUFLRCxJQUFMLENBQVV0QyxLQUFWLElBQW1CdUMsS0FBS0QsSUFBTCxDQUFVUixNQUE5QztBQUNBUyxtQkFBSzFCLGFBQUwsR0FBcUJQLGtCQUNuQmlDLEtBQUtoQyxXQURjLEVBRW5CZ0MsS0FBSy9CLFNBRmMsRUFHbkJaLE1BSG1CLENBQXJCO0FBS0QsYUFWTSxNQVVBLElBQUkyQyxLQUFLYSxVQUFULEVBQXFCO0FBQzFCYixtQkFBS2EsVUFBTCxHQUFrQixLQUFsQjtBQUNBYixtQkFBS2dDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQWhDLG1CQUFLaEMsV0FBTCxHQUFtQmdDLEtBQUtwQixLQUFMLElBQWNvQixLQUFLRCxJQUFMLENBQVVSLE1BQTNDO0FBQ0FTLG1CQUFLL0IsU0FBTCxHQUFpQitCLEtBQUtELElBQUwsQ0FBVVIsTUFBM0I7QUFDQVMsbUJBQUsxQixhQUFMLEdBQXFCUCxrQkFDbkJpQyxLQUFLaEMsV0FEYyxFQUVuQmdDLEtBQUsvQixTQUZjLEVBR25CWixNQUhtQixDQUFyQjtBQUtEOztBQUVEO0FBQ0EyQyxpQkFBS2lDLFNBQUwsR0FBaUIsK0JBQWpCO0FBQ0FqQyxpQkFBS29CLFVBQUwsR0FBa0IsS0FBbEI7QUFDRDs7QUFFRDtBQUNBLGNBQUluQixXQUFXRCxLQUFLaUMsU0FBTCxHQUNYLENBQUNWLGNBQWN2QixLQUFLaUMsU0FBcEIsSUFBaUNqQyxLQUFLMUMsUUFEM0IsR0FFWCxDQUZKOztBQUlBO0FBQ0EyQyxxQkFBVzJCLEtBQUtDLEdBQUwsQ0FBU0QsS0FBS00sR0FBTCxDQUFTakMsUUFBVCxFQUFtQixDQUFuQixDQUFULEVBQWdDLENBQWhDLENBQVg7O0FBRUFELGVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0QsU0F6REQ7O0FBMkRBO0FBQ0EsZUFBS0MsY0FBTDs7QUFFQTtBQUNBLGVBQUtuQixjQUFMLEdBQXNCd0MsV0FBdEI7O0FBRUE7QUFDQSxlQUFLekMsV0FBTCxHQUFtQixJQUFuQjs7QUFFQSxlQUFLd0MsT0FBTDtBQUNELE9BeEdrQixDQUFuQjtBQXlHRDs7O3FDQUVpQjtBQUFBLFVBQ1I1RCxNQURRLEdBQ0csS0FBS3VCLEtBRFIsQ0FDUnZCLE1BRFE7QUFFaEI7O0FBQ0EsVUFBSWlCLFFBQVEsS0FBS0EsS0FBTCxDQUFXeUIsTUFBWCxDQUNWO0FBQUEsZUFBUSxDQUFDSixLQUFLUSxTQUFOLElBQW1CUixLQUFLaEMsV0FBeEIsSUFBdUNnQyxLQUFLL0IsU0FBcEQ7QUFBQSxPQURVLENBQVo7O0FBSUFVLFlBQU1KLE9BQU4sQ0FBYyxnQkFBUTtBQUNwQnlCLGFBQUtwQixLQUFMLEdBQWEsRUFBYjtBQUNBLFlBQU1WLFVBQVVDLE9BQ2RDLE9BQU9DLElBQVAsQ0FBWTJCLEtBQUtoQyxXQUFMLElBQW9CLEVBQWhDLENBRGMsRUFFZEksT0FBT0MsSUFBUCxDQUFZMkIsS0FBSy9CLFNBQUwsSUFBa0IsRUFBOUIsQ0FGYyxDQUFoQjs7QUFLQUMsZ0JBQVFLLE9BQVIsQ0FBZ0IsZUFBTztBQUNyQixjQUFJLENBQUN5QixLQUFLQyxRQUFWLEVBQW9CO0FBQ2xCO0FBQ0FELGlCQUFLcEIsS0FBTCxDQUFXSCxHQUFYLElBQWtCdUIsS0FBS2hDLFdBQUwsQ0FBaUJTLEdBQWpCLENBQWxCO0FBQ0QsV0FIRCxNQUdPLElBQUl1QixLQUFLQyxRQUFMLEtBQWtCLENBQWxCLElBQXVCLENBQUNELEtBQUsxQixhQUFMLENBQW1CRyxHQUFuQixDQUE1QixFQUFxRDtBQUMxRDtBQUNBdUIsaUJBQUtwQixLQUFMLENBQVdILEdBQVgsSUFBa0J1QixLQUFLL0IsU0FBTCxDQUFlUSxHQUFmLENBQWxCO0FBQ0QsV0FITSxNQUdBO0FBQ0w7QUFDQXVCLGlCQUFLcEIsS0FBTCxDQUFXSCxHQUFYLElBQWtCdUIsS0FBSzFCLGFBQUwsQ0FBbUJHLEdBQW5CLEVBQXdCdUIsS0FBS3FCLEtBQUwsQ0FBV3JCLEtBQUtDLFFBQWhCLENBQXhCLENBQWxCO0FBQ0Q7QUFDRixTQVhEO0FBWUEsWUFBSUQsS0FBS0MsUUFBTCxLQUFrQixDQUF0QixFQUF5QjtBQUN2QnZDLGlCQUFPc0MsS0FBSzVDLElBQVosRUFBa0I0QyxLQUFLdkIsR0FBdkI7QUFDRDtBQUNGLE9BdEJEOztBQXdCQTtBQUNBRSxjQUFRQSxNQUFNeUIsTUFBTixDQUNOO0FBQUEsZUFBUSxFQUFFSixLQUFLUSxTQUFMLElBQW1CUixLQUFLWSxPQUFMLElBQWdCWixLQUFLQyxRQUFMLEtBQWtCLENBQXZELENBQVI7QUFBQSxPQURNLENBQVI7O0FBSUE7QUFDQSxXQUFLdEIsS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV3lCLE1BQVgsQ0FDWDtBQUFBLGVBQVEsRUFBRUosS0FBS1ksT0FBTCxJQUFnQlosS0FBS0MsUUFBTCxLQUFrQixDQUFwQyxDQUFSO0FBQUEsT0FEVyxDQUFiOztBQUlBLFdBQUtrQyxRQUFMLENBQWMsRUFBRXhELFlBQUYsRUFBZDtBQUNEOzs7NkJBRVM7QUFDUixVQUFNeUQsbUJBQW1CLEtBQUtuRCxLQUFMLENBQVdvRCxRQUFYLENBQW9CLEtBQUt6RCxLQUFMLENBQVdELEtBQS9CLENBQXpCO0FBQ0EsYUFBT3lELG9CQUFvQixnQkFBTUUsUUFBTixDQUFlQyxJQUFmLENBQW9CSCxnQkFBcEIsQ0FBM0I7QUFDRDs7Ozs7O0FBR0g7OztBQXpXcUIxRCxVLENBQ1o4RCxZLEdBQWVyRixRO2tCQURIdUIsVTtBQTBXckIsU0FBU3FDLFVBQVQsQ0FBcUIwQixJQUFyQixFQUEyQjFDLElBQTNCLEVBQWlDO0FBQy9CLE1BQU0yQyxlQUFlLEVBQXJCO0FBQ0EsT0FBSyxJQUFJNUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMkMsS0FBS0UsTUFBekIsRUFBaUM3QyxHQUFqQyxFQUFzQztBQUNwQzRDLGlCQUFhRCxLQUFLM0MsQ0FBTCxFQUFRckIsR0FBckIsSUFBNEJxQixDQUE1QjtBQUNEO0FBQ0QsTUFBTThDLGVBQWUsRUFBckI7QUFDQSxPQUFLLElBQUk5QyxLQUFJLENBQWIsRUFBZ0JBLEtBQUlDLEtBQUs0QyxNQUF6QixFQUFpQzdDLElBQWpDLEVBQXNDO0FBQ3BDOEMsaUJBQWE3QyxLQUFLRCxFQUFMLEVBQVFyQixHQUFyQixJQUE0QnFCLEVBQTVCO0FBQ0Q7QUFDRDtBQUNBLE1BQU0rQyxXQUFXLEVBQWpCO0FBQ0EsT0FBSyxJQUFJL0MsTUFBSSxDQUFiLEVBQWdCQSxNQUFJQyxLQUFLNEMsTUFBekIsRUFBaUM3QyxLQUFqQyxFQUFzQztBQUNwQytDLGFBQVMvQyxHQUFULElBQWNDLEtBQUtELEdBQUwsQ0FBZDtBQUNEO0FBQ0QsT0FBSyxJQUFJQSxNQUFJLENBQWIsRUFBZ0JBLE1BQUkyQyxLQUFLRSxNQUF6QixFQUFpQzdDLEtBQWpDLEVBQXNDO0FBQ3BDLFFBQUksQ0FBQzFCLE9BQU8wRSxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNKLFlBQXJDLEVBQW1ESCxLQUFLM0MsR0FBTCxFQUFRckIsR0FBM0QsQ0FBTCxFQUFzRTtBQUNwRW9FLGVBQVNJLElBQVQsQ0FBY1IsS0FBSzNDLEdBQUwsQ0FBZDtBQUNEO0FBQ0Y7QUFDRDtBQUNBLFNBQU8rQyxTQUFTSyxJQUFULENBQWMsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ25DLFFBQU1DLGFBQWFULGFBQWFPLEVBQUUxRSxHQUFmLENBQW5CO0FBQ0EsUUFBTTZFLGFBQWFWLGFBQWFRLEVBQUUzRSxHQUFmLENBQW5CO0FBQ0EsUUFBTThFLGFBQWFiLGFBQWFTLEVBQUUxRSxHQUFmLENBQW5CO0FBQ0EsUUFBTStFLGFBQWFkLGFBQWFVLEVBQUUzRSxHQUFmLENBQW5CO0FBQ0EsUUFBSTRFLGNBQWMsSUFBZCxJQUFzQkMsY0FBYyxJQUF4QyxFQUE4QztBQUM1QztBQUNBLGFBQU9WLGFBQWFPLEVBQUUxRSxHQUFmLElBQXNCbUUsYUFBYVEsRUFBRTNFLEdBQWYsQ0FBN0I7QUFDRCxLQUhELE1BR08sSUFBSThFLGNBQWMsSUFBZCxJQUFzQkMsY0FBYyxJQUF4QyxFQUE4QztBQUNuRDtBQUNBLGFBQU9kLGFBQWFTLEVBQUUxRSxHQUFmLElBQXNCaUUsYUFBYVUsRUFBRTNFLEdBQWYsQ0FBN0I7QUFDRCxLQUhNLE1BR0EsSUFBSTRFLGNBQWMsSUFBbEIsRUFBd0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUssSUFBSXZELE1BQUksQ0FBYixFQUFnQkEsTUFBSUMsS0FBSzRDLE1BQXpCLEVBQWlDN0MsS0FBakMsRUFBc0M7QUFDcEMsWUFBTWQsUUFBUWUsS0FBS0QsR0FBTCxFQUFRckIsR0FBdEI7QUFDQSxZQUFJLENBQUNMLE9BQU8wRSxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNOLFlBQXJDLEVBQW1EMUQsS0FBbkQsQ0FBTCxFQUFnRTtBQUM5RDtBQUNEO0FBQ0QsWUFDRXFFLGFBQWFULGFBQWE1RCxLQUFiLENBQWIsSUFDQXdFLGFBQWFkLGFBQWExRCxLQUFiLENBRmYsRUFHRTtBQUNBLGlCQUFPLENBQUMsQ0FBUjtBQUNELFNBTEQsTUFLTyxJQUNMcUUsYUFBYVQsYUFBYTVELEtBQWIsQ0FBYixJQUNBd0UsYUFBYWQsYUFBYTFELEtBQWIsQ0FGUixFQUdMO0FBQ0EsaUJBQU8sQ0FBUDtBQUNEO0FBQ0Y7QUFDRDtBQUNBLGFBQU8sQ0FBUDtBQUNEO0FBQ0Q7QUFDQSxTQUFLLElBQUljLE1BQUksQ0FBYixFQUFnQkEsTUFBSUMsS0FBSzRDLE1BQXpCLEVBQWlDN0MsS0FBakMsRUFBc0M7QUFDcEMsVUFBTWQsU0FBUWUsS0FBS0QsR0FBTCxFQUFRckIsR0FBdEI7QUFDQSxVQUFJLENBQUNMLE9BQU8wRSxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUNOLFlBQXJDLEVBQW1EMUQsTUFBbkQsQ0FBTCxFQUFnRTtBQUM5RDtBQUNEO0FBQ0QsVUFDRXNFLGFBQWFWLGFBQWE1RCxNQUFiLENBQWIsSUFDQXVFLGFBQWFiLGFBQWExRCxNQUFiLENBRmYsRUFHRTtBQUNBLGVBQU8sQ0FBUDtBQUNELE9BTEQsTUFLTyxJQUNMc0UsYUFBYVYsYUFBYTVELE1BQWIsQ0FBYixJQUNBdUUsYUFBYWIsYUFBYTFELE1BQWIsQ0FGUixFQUdMO0FBQ0EsZUFBTyxDQUFDLENBQVI7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxXQUFPLENBQUMsQ0FBUjtBQUNELEdBekRNLENBQVA7QUEwREQ7O0FBRUROLFdBQVd2QixRQUFYLEdBQXNCQSxRQUF0Qjs7QUFFQSxTQUFTZ0IsTUFBVCxHQUEwQjtBQUFBLG9DQUFOc0YsSUFBTTtBQUFOQSxRQUFNO0FBQUE7O0FBQ3hCLE1BQU1aLFdBQVdZLEtBQUtDLE1BQUwsQ0FBWSxVQUFDUCxDQUFELEVBQUlDLENBQUo7QUFBQSxXQUFVRCxFQUFFUSxNQUFGLENBQVNQLENBQVQsQ0FBVjtBQUFBLEdBQVosRUFBbUMsRUFBbkMsQ0FBakI7QUFDQSxPQUFLLElBQUl0RCxJQUFJLENBQWIsRUFBZ0JBLElBQUkrQyxTQUFTRixNQUE3QixFQUFxQyxFQUFFN0MsQ0FBdkMsRUFBMEM7QUFDeEMsU0FBSyxJQUFJOEQsSUFBSTlELElBQUksQ0FBakIsRUFBb0I4RCxJQUFJZixTQUFTRixNQUFqQyxFQUF5QyxFQUFFaUIsQ0FBM0MsRUFBOEM7QUFDNUMsVUFBSWYsU0FBUy9DLENBQVQsTUFBZ0IrQyxTQUFTZSxDQUFULENBQXBCLEVBQWlDO0FBQy9CZixpQkFBU2dCLE1BQVQsQ0FBZ0JELEdBQWhCLEVBQXFCLENBQXJCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBT2YsUUFBUDtBQUNEIiwiZmlsZSI6IlRyYW5zaXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgbm93IGZyb20gJ3BlcmZvcm1hbmNlLW5vdydcbmltcG9ydCBSQUYgZnJvbSAncmFmJ1xuaW1wb3J0IHsgaW50ZXJwb2xhdGUgfSBmcm9tICdkMy1pbnRlcnBvbGF0ZSdcbmltcG9ydCAqIGFzIEVhc2luZyBmcm9tICdkMy1lYXNlJ1xuLy9cbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzJ1xuXG5jb25zdCBtc1BlckZyYW1lID0gMTAwMCAvIDYwXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBkYXRhOiBbXSxcbiAgaWdub3JlOiBbXSxcbiAgZHVyYXRpb246IDUwMCxcbiAgZWFzaW5nOiAnZWFzZUN1YmljT3V0JyxcbiAgZW50ZXI6ICgpID0+IG51bGwsXG4gIGxlYXZlOiAoKSA9PiBudWxsLFxuICBvblJlc3Q6ICgpID0+IG51bGwsXG4gIHN0YWdnZXI6IG51bGwsXG4gIGZsZXhEdXJhdGlvbjogZmFsc2UsXG4gIGltbXV0YWJsZTogdHJ1ZSxcbiAgc3RhZ2dlckdyb3VwczogdHJ1ZSxcbn1cblxuLy8gVXNlZCB0byBtYWtlIGFsbCB0aGUgaW50ZXJwb2xhdG9ycyBmcm9tIG9yaWdpbiB0byBkZXN0aW5hdGlvbiBzdGF0ZXNcbmNvbnN0IG1ha2VJbnRlcnBvbGF0b3JzID0gKG9yaWdpblN0YXRlLCBkZXN0U3RhdGUsIGlnbm9yZSkgPT4ge1xuICAvLyBNYWtlIHN1cmUgd2UgaW50ZXJwb2xhdGUgbmV3IGFuZCBvbGQga2V5c1xuICBjb25zdCBhbGxLZXlzID0gZGVkdXBlKE9iamVjdC5rZXlzKG9yaWdpblN0YXRlKSwgT2JqZWN0LmtleXMoZGVzdFN0YXRlKSlcbiAgY29uc3QgaW50ZXJwb2xhdG9ycyA9IHt9XG4gIGFsbEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmIChpZ25vcmUuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgIGludGVycG9sYXRvcnNba2V5XSA9IG51bGxcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAob3JpZ2luU3RhdGVba2V5XSA9PT0gZGVzdFN0YXRlW2tleV0pIHtcbiAgICAgIGludGVycG9sYXRvcnNba2V5XSA9IG51bGxcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpbnRlcnBvbGF0b3JzW2tleV0gPSBpbnRlcnBvbGF0ZShvcmlnaW5TdGF0ZVtrZXldLCBkZXN0U3RhdGVba2V5XSlcbiAgfSlcbiAgcmV0dXJuIGludGVycG9sYXRvcnNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNpdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBkZWZhdWx0c1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5pdGVtcyA9IFtdXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGl0ZW1zOiBbXSxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgIHRoaXMudW5tb3VudGluZyA9IGZhbHNlXG4gICAgdGhpcy5hbmltYXRpb25JRCA9IG51bGxcbiAgICB0aGlzLmxhc3RSZW5kZXJUaW1lID0gMFxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgIHRoaXMucGl2b3QodGhpcy5wcm9wcylcbiAgICB0aGlzLnJhbkZpcnN0ID0gdHJ1ZVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyAocHJvcHMpIHtcbiAgICB0aGlzLnBpdm90KHByb3BzKVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuICAgIHRoaXMudW5tb3VudGluZyA9IHRydWVcbiAgICBpZiAodGhpcy5hbmltYXRpb25JRCAhPSBudWxsKSB7XG4gICAgICBSQUYuY2FuY2VsKHRoaXMuYW5pbWF0aW9uSUQpXG4gICAgICB0aGlzLmFuaW1hdGlvbklEID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHBpdm90IChwcm9wcykge1xuICAgIGNvbnN0IHtcbiAgICAgIGdldEtleSxcbiAgICAgIGRhdGEsXG4gICAgICBlYXNpbmcsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIGdldER1cmF0aW9uLFxuICAgICAgZ2V0RWFzaW5nLFxuICAgICAgZW50ZXIsXG4gICAgICB1cGRhdGUsXG4gICAgICBsZWF2ZSxcbiAgICAgIGltbXV0YWJsZSxcbiAgICAgIHN0YWdnZXIsXG4gICAgICBzdGFnZ2VyR3JvdXBzLFxuICAgIH0gPSBwcm9wc1xuXG4gICAgLy8gRGV0ZWN0IGlmIHdlIG5lZWQgdG8gYW5pbWF0ZVxuICAgIGxldCBub0NoYW5nZXMgPSBpbW11dGFibGVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXRhID09PSBkYXRhXG4gICAgICA6IFV0aWxzLmRlZXBFcXVhbHModGhpcy5wcm9wcy5kYXRhLCBkYXRhKVxuXG4gICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSwgYW5pbWF0ZSByZWdhcmRsZXNzXG4gICAgaWYgKHRoaXMucmFuRmlyc3QgJiYgbm9DaGFuZ2VzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgaXRlbXMgZnJvbSB0aGUgc3RhdGUgKHdoaWNoIGlzIHRoZSB2aXN1YWxcbiAgICAvLyByZXByZXNlbnRhdGlvbiBvZiBvdXIgaXRlbXMpXG4gICAgY29uc3QgY3VycmVudEl0ZW1zID0gdGhpcy5pdGVtc1xuXG4gICAgLy8gR2V0IHRoZSBuZXcgaXRlbXMgd2l0aCB0aGVpciBrZXlzIGFuZCBkYXRhXG4gICAgbGV0IG5ld0l0ZW1zID0gZGF0YS5tYXAoKGQsIGkpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogZ2V0S2V5KGQsIGkpLFxuICAgICAgICBkYXRhOiBkLFxuICAgICAgICBuZXh0OiB7fSxcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gRGV0ZWN0IGluc3RhbnQgcmVuZGVyaW5nXG4gICAgaWYgKCFkdXJhdGlvbikge1xuICAgICAgdGhpcy5pdGVtcyA9IG5ld0l0ZW1zXG4gICAgICB0aGlzLml0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0ucHJvZ3Jlc3MgPSAxXG4gICAgICAgIGl0ZW0ub3JpZ2luU3RhdGUgPSB1cGRhdGUoaXRlbS5kYXRhLCBpdGVtLmtleSlcbiAgICAgICAgaXRlbS5kZXN0U3RhdGUgPSB7IC4uLml0ZW0ub3JpZ2luU3RhdGUgfVxuICAgICAgfSlcbiAgICAgIHRoaXMucmVuZGVyUHJvZ3Jlc3MoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRmluZCBpdGVtcyB0aGF0IGFyZSBlbnRlcmluZ1xuICAgIGNvbnN0IGVudGVyaW5nSXRlbXMgPSBuZXdJdGVtcy5maWx0ZXIoXG4gICAgICBuZXdJdGVtID0+XG4gICAgICAgICFjdXJyZW50SXRlbXMuZmluZChjdXJyZW50SXRlbSA9PiBjdXJyZW50SXRlbS5rZXkgPT09IG5ld0l0ZW0ua2V5KVxuICAgIClcblxuICAgIGVudGVyaW5nSXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgICAgaXRlbS53aWxsRW50ZXIgPSB0cnVlXG4gICAgfSlcblxuICAgIC8vIEZpbmQgaXRlbXMgdGhhdCBzaG91bGQgbGVhdmVcbiAgICBjb25zdCBsZWF2aW5nSXRlbXMgPSBjdXJyZW50SXRlbXMuZmlsdGVyKFxuICAgICAgY3VycmVudEl0ZW0gPT4gIW5ld0l0ZW1zLmZpbmQobmV3SXRlbSA9PiBuZXdJdGVtLmtleSA9PT0gY3VycmVudEl0ZW0ua2V5KVxuICAgIClcblxuICAgIGxlYXZpbmdJdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICBpdGVtLndpbGxMZWF2ZSA9IHRydWVcbiAgICB9KVxuXG4gICAgLy8gRmluZCBpdGVtcyB0aGF0IGFyZSBzdGF5aW5nXG4gICAgY29uc3Qgc3RheWluZ0l0ZW1zID0gY3VycmVudEl0ZW1zLmZpbHRlcihjdXJyZW50SXRlbSA9PlxuICAgICAgbmV3SXRlbXMuZmluZChuZXdJdGVtID0+IG5ld0l0ZW0ua2V5ID09PSBjdXJyZW50SXRlbS5rZXkpXG4gICAgKVxuXG4gICAgc3RheWluZ0l0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAvLyBJZiB0aGUgaXRlbSB3YXMgbGVhdmluZywgYW5kIGlzIG5vdyBzdGF5aW5nLCB1cGRhdGUgaXRcbiAgICAgIGlmIChpdGVtLmxlYXZpbmcpIHtcbiAgICAgICAgaXRlbS53aWxsVXBkYXRlID0gdHJ1ZVxuICAgICAgfVxuICAgICAgLy8gSWYgdGhlIGl0ZW0ncyB1cGRhdGUgZnVuY3Rpb24gcmV0dXJucyBzb21ldGhpbmcgbmV3LCB1cGRhdGUgaXRcbiAgICAgIGNvbnN0IG5ld0Rlc3RTdGF0ZSA9IHVwZGF0ZShpdGVtLmRhdGEsIGl0ZW0ua2V5KVxuICAgICAgaWYgKCFVdGlscy5kZWVwRXF1YWxzKGl0ZW0uZGVzdFN0YXRlLCBuZXdEZXN0U3RhdGUpKSB7XG4gICAgICAgIGl0ZW0ud2lsbFVwZGF0ZSA9IHRydWVcbiAgICAgIH1cbiAgICAgIGl0ZW0ud2lsbExlYXZlID0gZmFsc2VcbiAgICAgIGl0ZW0ud2lsbEVudGVyID0gZmFsc2VcbiAgICB9KVxuXG4gICAgLy8gTWVyZ2UgYWxsIG9mIHRoZSBpdGVtcyB0b2dldGhlciBhbmRcbiAgICAvLyBnaXZlIGVhY2ggaXRlbSBpdCdzIG5ldyBvcmlnaW4vZGVzdGluYXRpb24gc3RhdGVzXG4gICAgLy8gd2l0aCBjb3JyZXNwb25kaW5nIGludGVycG9sYXRvcnNcbiAgICB0aGlzLml0ZW1zID0gbWVyZ2VJdGVtcyhjdXJyZW50SXRlbXMsIGVudGVyaW5nSXRlbXMpXG5cbiAgICB0aGlzLml0ZW1zLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgIC8vIFF1ZXVlIGFuIHVwZGF0ZSBlaXRoZXIgaW1tZWRpYXRlbHkgb3IgdXNpbmcgYSBzdGFnZ2VyT2Zmc2V0XG4gICAgICBsZXQgc3RhZ2dlck9mZnNldCA9IDBcbiAgICAgIC8vIEZvciBzdGFnZ2VyaW5nIHRpbWUgYmFzZWQgYW5pbWF0aW9ucywgd2UganVzdCBuZWVkIHRoZSBpbmRleFxuICAgICAgbGV0IHN0YWdnZXJJbmRleCA9IGkgKyAxXG4gICAgICAvLyBCdXQgaWYgd2UgYXJlIHN0YWdnZXJpbmcgYnkgZ3JvdXAsIHdlIHdpbGwgaW5zdGVhZCBuZWVkIHRoZSBpbmRleCBvZiB0aGVcbiAgICAgIC8vIGl0ZW0gcmVsYXRpdmUgdG8gaXRzIHByZWRlY2Vzc29ycyB3aG8gc2hhcmUgdGhlIHNhbWUgZW50ZXJpbmcvbGVhdmluZyBncm91cFxuICAgICAgaWYgKHN0YWdnZXIgJiYgc3RhZ2dlckdyb3Vwcykge1xuICAgICAgICBzdGFnZ2VySW5kZXggPSAwXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBpOyBpaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc3RhZ2dlckl0ZW0gPSB0aGlzLml0ZW1zW2lpXVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHN0YWdnZXJJdGVtLndpbGxFbnRlciA9PT0gaXRlbS53aWxsRW50ZXIgJiZcbiAgICAgICAgICAgIHN0YWdnZXJJdGVtLndpbGxMZWF2ZSA9PT0gaXRlbS53aWxsTGVhdmVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHN0YWdnZXJJbmRleCsrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFnZ2VyKSB7XG4gICAgICAgIC8vIElmIGl0cyBzdGFnZ2VyZWQsIHdlIG5lZWQgYmFzZSB0aGUgcHJvZ3Jlc3Mgb2ZmIG9mXG4gICAgICAgIC8vIHRoZSBzdGFnZ2VyZWQgdGltZSwgaW5zdGVhZCBvZiB0aGUgY3VycmVudFRpbWVcbiAgICAgICAgc3RhZ2dlck9mZnNldCA9IHN0YWdnZXIgKiBzdGFnZ2VySW5kZXhcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIGV2ZXJ5IGl0ZW0gdGhhdCBuZWVkcyB0byBiZSByZXNldCwgc2V0IGEgbmV3IHN0YXJ0VGltZVxuICAgICAgaWYgKGl0ZW0ud2lsbEVudGVyIHx8IGl0ZW0ud2lsbExlYXZlIHx8IGl0ZW0ud2lsbFVwZGF0ZSkge1xuICAgICAgICBpdGVtLm5leHRVcGRhdGUgPSBzdGFnZ2VyT2Zmc2V0ID8gbm93KCkgKyBzdGFnZ2VyT2Zmc2V0IDogdHJ1ZVxuICAgICAgICBpdGVtLmR1cmF0aW9uID1cbiAgICAgICAgICB0eXBlb2YgZ2V0RHVyYXRpb24gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gZ2V0RHVyYXRpb24oaXRlbS5kYXRhLCBpdGVtLmtleSlcbiAgICAgICAgICAgIDogZHVyYXRpb25cbiAgICAgICAgaXRlbS5lYXNpbmcgPVxuICAgICAgICAgIHR5cGVvZiBnZXRFYXNpbmcgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gZ2V0RWFzaW5nKGl0ZW0uZGF0YSwgaXRlbS5rZXkpXG4gICAgICAgICAgICA6IGVhc2luZ1xuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgZWFzaW5nIGZ1bmN0aW9uXG4gICAgICAgIGl0ZW0uZWFzZXIgPVxuICAgICAgICAgIHR5cGVvZiBpdGVtLmVhc2luZyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBpdGVtLmVhc2luZ1xuICAgICAgICAgICAgOiBFYXNpbmdbaXRlbS5lYXNpbmddIHx8IEVhc2luZ1tkZWZhdWx0cy5lYXNpbmddXG4gICAgICB9XG5cbiAgICAgIC8vIENvbXBpbGUgdGhlIHBvc3NpYmxlIHN0YXRlcyBmb3IgZWFjaCBpdGVtXG4gICAgICBpdGVtLm5leHQudXBkYXRlID0gdXBkYXRlKGl0ZW0uZGF0YSwgaXRlbS5rZXkpXG4gICAgICBpdGVtLm5leHQuZW50ZXIgPSBlbnRlcihpdGVtLmRhdGEsIGl0ZW0ua2V5KVxuICAgICAgaXRlbS5uZXh0LmxlYXZlID0gbGVhdmUoaXRlbS5kYXRhLCBpdGVtLmtleSlcblxuICAgICAgLy8gU2luY2UgdGhlIHVuZGVybHlpbmcgZGF0YSBjb3VsZCBoYXZlIGNoYW5nZWQgZm9yIHRoZSBjdXJyZW50SXRlbXNcbiAgICAgIC8vIHVwZGF0ZSB0aGVtIGFsbFxuICAgICAgY29uc3QgbmV3SXRlbSA9IG5ld0l0ZW1zLmZpbmQoZCA9PiBkLmtleSA9PT0gaXRlbS5rZXkpXG4gICAgICBpdGVtLmRhdGEgPSBuZXdJdGVtID8gbmV3SXRlbS5kYXRhIDogaXRlbS5kYXRhXG4gICAgfSlcblxuICAgIC8vIEJlIHN1cmUgdG8gcmVuZGVyIHRoZSBvcmlnaW4gZnJhbWVcbiAgICB0aGlzLnJlbmRlclByb2dyZXNzKClcblxuICAgIC8vIEFuaW1hdGUgaWYgbmVlZGVkXG4gICAgdGhpcy5hbmltYXRlKClcbiAgfVxuXG4gIGFuaW1hdGUgKCkge1xuICAgIC8vIElmIHdlJ3JlIHVubW91bnRpbmcsIGJhaWwgb3V0LlxuICAgIGlmICh0aGlzLnVubW91bnRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIElmIHdlJ3JlIGFscmVhZHkgYW5pbWF0ZWQsIGJhaWwgb3V0LlxuICAgIGlmICh0aGlzLmFuaW1hdGlvbklEKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB7IGZsZXhEdXJhdGlvbiwgaWdub3JlIH0gPSB0aGlzLnByb3BzXG5cbiAgICB0aGlzLmFuaW1hdGlvbklEID0gUkFGKCgpID0+IHtcbiAgICAgIC8vIERvdWJsZSBjaGVjayB0aGF0IHdlIGFyZSBzdGlsbCBtb3VudGVkLCBzaW5jZSBSQUYgY2FuIHBlcmZvcm1cbiAgICAgIC8vIGFzeW5jcm9ub3VzbHkgc29tZXRpbWVzXG4gICAgICBpZiAodGhpcy51bm1vdW50aW5nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHRpbWVcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IG5vdygpXG5cbiAgICAgIC8vIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihcbiAgICAgIC8vICAgaXRlbSA9PiAhKGl0ZW0ubGVhdmluZyAmJiBpdGVtLnByb2dyZXNzID09PSAxKVxuICAgICAgLy8gKVxuXG4gICAgICBjb25zdCBuZWVkc0FuaW1hdGlvbiA9IHRoaXMuaXRlbXMuc29tZShcbiAgICAgICAgaXRlbSA9PiBpdGVtLm5leHRVcGRhdGUgfHwgaXRlbS5wcm9ncmVzcyA8IDFcbiAgICAgIClcblxuICAgICAgLy8gSWYgdGhlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZSwgdGllIHVwIGFueSBsb29zZSBlbmRzLi4uXG4gICAgICBpZiAoIW5lZWRzQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uSUQgPSBudWxsXG4gICAgICAgIHRoaXMud2FzQW5pbWF0aW5nID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIEl0J3MgdGltZSB0byBhbmltYXRlIVxuICAgICAgdGhpcy53YXNBbmltYXRpbmcgPSB0cnVlXG5cbiAgICAgIC8vIElmIHdlIHVzaW5nIGZsZXhEdXJhdGlvbiwgYWRkIGhvd2V2ZXIgbWFueSBtaWxsaXNlY29uZHMgYmVoaW5kIHdlIGFyZSB0byB0aGUgZmxleEFtb3VudCB0byBvZmZzZXRcbiAgICAgIC8vIGFueSBkcm9wcGVkIGZyYW1lc1xuICAgICAgY29uc3QgdGltZVNpbmNlTGFzdEZyYW1lID0gY3VycmVudFRpbWUgLSB0aGlzLmxhc3RSZW5kZXJUaW1lXG4gICAgICBjdXJyZW50VGltZSArPSBmbGV4RHVyYXRpb25cbiAgICAgICAgPyBNYXRoLm1heChNYXRoLmZsb29yKHRpbWVTaW5jZUxhc3RGcmFtZSAtIG1zUGVyRnJhbWUpLCAwKVxuICAgICAgICA6IDBcblxuICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIC8vIElmIHRoZSBpdGVtIGlzIHJlYWR5IHRvIGJlIHVwZGF0ZWQsIGRvIGl0IG5vd1xuICAgICAgICBpZiAoXG4gICAgICAgICAgaXRlbS5uZXh0VXBkYXRlID09PSB0cnVlIHx8XG4gICAgICAgICAgKGl0ZW0ubmV4dFVwZGF0ZSAmJiBpdGVtLm5leHRVcGRhdGUgPD0gY3VycmVudFRpbWUpXG4gICAgICAgICkge1xuICAgICAgICAgIGl0ZW0uZW50ZXJpbmcgPSBmYWxzZVxuICAgICAgICAgIGl0ZW0ubGVhdmluZyA9IGZhbHNlXG4gICAgICAgICAgaXRlbS51cGRhdGluZyA9IGZhbHNlXG4gICAgICAgICAgLy8gVXBkYXRlIGxlYXZpbmcsIGVudGVyaW5nLCBhbmQgY2hhbmdlZCBpdGVtcyB3aXRoIHRoZWlyIG5ldyBvcmlnaW5zLFxuICAgICAgICAgIC8vIGRlc3RpbmF0aW9ucyBhbmQgaW50ZXJwb2xhdG9yc1xuICAgICAgICAgIGlmIChpdGVtLndpbGxFbnRlcikge1xuICAgICAgICAgICAgaXRlbS53aWxsRW50ZXIgPSBmYWxzZVxuICAgICAgICAgICAgaXRlbS5lbnRlcmluZyA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0ub3JpZ2luU3RhdGUgPSBpdGVtLm5leHQuZW50ZXIgfHwgaXRlbS5uZXh0LnVwZGF0ZVxuICAgICAgICAgICAgaXRlbS5kZXN0U3RhdGUgPSBpdGVtLm5leHQudXBkYXRlXG4gICAgICAgICAgICBpdGVtLmludGVycG9sYXRvcnMgPSBtYWtlSW50ZXJwb2xhdG9ycyhcbiAgICAgICAgICAgICAgaXRlbS5vcmlnaW5TdGF0ZSxcbiAgICAgICAgICAgICAgaXRlbS5kZXN0U3RhdGUsXG4gICAgICAgICAgICAgIGlnbm9yZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS53aWxsTGVhdmUpIHtcbiAgICAgICAgICAgIGl0ZW0ud2lsbExlYXZlID0gZmFsc2VcbiAgICAgICAgICAgIGl0ZW0ubGVhdmluZyA9IHRydWVcbiAgICAgICAgICAgIGl0ZW0ub3JpZ2luU3RhdGUgPSBpdGVtLnN0YXRlIHx8IGl0ZW0ubmV4dC51cGRhdGVcbiAgICAgICAgICAgIGl0ZW0uZGVzdFN0YXRlID0gaXRlbS5uZXh0LmxlYXZlIHx8IGl0ZW0ubmV4dC51cGRhdGVcbiAgICAgICAgICAgIGl0ZW0uaW50ZXJwb2xhdG9ycyA9IG1ha2VJbnRlcnBvbGF0b3JzKFxuICAgICAgICAgICAgICBpdGVtLm9yaWdpblN0YXRlLFxuICAgICAgICAgICAgICBpdGVtLmRlc3RTdGF0ZSxcbiAgICAgICAgICAgICAgaWdub3JlXG4gICAgICAgICAgICApXG4gICAgICAgICAgfSBlbHNlIGlmIChpdGVtLndpbGxVcGRhdGUpIHtcbiAgICAgICAgICAgIGl0ZW0ud2lsbFVwZGF0ZSA9IGZhbHNlXG4gICAgICAgICAgICBpdGVtLnVwZGF0aW5nID0gdHJ1ZVxuICAgICAgICAgICAgaXRlbS5vcmlnaW5TdGF0ZSA9IGl0ZW0uc3RhdGUgfHwgaXRlbS5uZXh0LnVwZGF0ZVxuICAgICAgICAgICAgaXRlbS5kZXN0U3RhdGUgPSBpdGVtLm5leHQudXBkYXRlXG4gICAgICAgICAgICBpdGVtLmludGVycG9sYXRvcnMgPSBtYWtlSW50ZXJwb2xhdG9ycyhcbiAgICAgICAgICAgICAgaXRlbS5vcmlnaW5TdGF0ZSxcbiAgICAgICAgICAgICAgaXRlbS5kZXN0U3RhdGUsXG4gICAgICAgICAgICAgIGlnbm9yZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEZvciBldmVyeSBpdGVtIHRoYXQgbmVlZHMgdG8gYmUgcmVzZXQsIHNldCBhIG5ldyBzdGFydFRpbWUgYW5kIGR1cnRhaW9uXG4gICAgICAgICAgaXRlbS5zdGFydFRpbWUgPSBub3coKVxuICAgICAgICAgIGl0ZW0ubmV4dFVwZGF0ZSA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIHByb2dyZXNzXG4gICAgICAgIGxldCBwcm9ncmVzcyA9IGl0ZW0uc3RhcnRUaW1lXG4gICAgICAgICAgPyAoY3VycmVudFRpbWUgLSBpdGVtLnN0YXJ0VGltZSkgLyBpdGVtLmR1cmF0aW9uXG4gICAgICAgICAgOiAwXG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHByb2dyZXNzIGlzIGJldHdlZW4gMCBhbmQgMVxuICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKHByb2dyZXNzLCAxKSwgMClcblxuICAgICAgICBpdGVtLnByb2dyZXNzID0gcHJvZ3Jlc3NcbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlbmRlciB3aXRoIHRoZSBwcm9ncmVzc1xuICAgICAgdGhpcy5yZW5kZXJQcm9ncmVzcygpXG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgbGFzdFJlbmRlclRpbWVcbiAgICAgIHRoaXMubGFzdFJlbmRlclRpbWUgPSBjdXJyZW50VGltZVxuXG4gICAgICAvLyBNYXJrIHRoZSBmcmFtZSBhcyBkb25lXG4gICAgICB0aGlzLmFuaW1hdGlvbklEID0gbnVsbFxuXG4gICAgICB0aGlzLmFuaW1hdGUoKVxuICAgIH0pXG4gIH1cblxuICByZW5kZXJQcm9ncmVzcyAoKSB7XG4gICAgY29uc3QgeyBvblJlc3QgfSA9IHRoaXMucHJvcHNcbiAgICAvLyBEb24ndCBpbnRlcnBvbGF0ZSBpdGVtcyB0aGF0IGhhdmVuJ3QgZW50ZXJlZCB5ZXRcbiAgICBsZXQgaXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gIWl0ZW0ud2lsbEVudGVyICYmIGl0ZW0ub3JpZ2luU3RhdGUgJiYgaXRlbS5kZXN0U3RhdGVcbiAgICApXG5cbiAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5zdGF0ZSA9IHt9XG4gICAgICBjb25zdCBhbGxLZXlzID0gZGVkdXBlKFxuICAgICAgICBPYmplY3Qua2V5cyhpdGVtLm9yaWdpblN0YXRlIHx8IHt9KSxcbiAgICAgICAgT2JqZWN0LmtleXMoaXRlbS5kZXN0U3RhdGUgfHwge30pXG4gICAgICApXG5cbiAgICAgIGFsbEtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0ucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAvLyBJZiBhdCBhYnNvbHV0ZSAwLCBkcmF3IHRoZSBvcmlnaW4gc3RhdGVcbiAgICAgICAgICBpdGVtLnN0YXRlW2tleV0gPSBpdGVtLm9yaWdpblN0YXRlW2tleV1cbiAgICAgICAgfSBlbHNlIGlmIChpdGVtLnByb2dyZXNzID09PSAxIHx8ICFpdGVtLmludGVycG9sYXRvcnNba2V5XSkge1xuICAgICAgICAgIC8vIElmIGlnbm9yZWQsIHNraXAgcmlnaHQgdG8gdGhlIHZhbHVlXG4gICAgICAgICAgaXRlbS5zdGF0ZVtrZXldID0gaXRlbS5kZXN0U3RhdGVba2V5XVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSwgaW50ZXJwb2xhdGUgd2l0aCB0aGUgcHJvZ3Jlc3NcbiAgICAgICAgICBpdGVtLnN0YXRlW2tleV0gPSBpdGVtLmludGVycG9sYXRvcnNba2V5XShpdGVtLmVhc2VyKGl0ZW0ucHJvZ3Jlc3MpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgaWYgKGl0ZW0ucHJvZ3Jlc3MgPT09IDEpIHtcbiAgICAgICAgb25SZXN0KGl0ZW0uZGF0YSwgaXRlbS5rZXkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIERvbid0IHJlbmRlciBpdGVtcyB0aGF0IGhhdmVuJ3QgZW50ZXJlZCB5ZXQgb3IgaGF2ZSBleGl0ZWRcbiAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihcbiAgICAgIGl0ZW0gPT4gIShpdGVtLndpbGxFbnRlciB8fCAoaXRlbS5sZWF2aW5nICYmIGl0ZW0ucHJvZ3Jlc3MgPT09IDEpKVxuICAgIClcblxuICAgIC8vIFJlbW92ZSBpdGVtcyB0aGF0IGhhdmUgZXhpdGVkXG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKFxuICAgICAgaXRlbSA9PiAhKGl0ZW0ubGVhdmluZyAmJiBpdGVtLnByb2dyZXNzID09PSAxKVxuICAgIClcblxuICAgIHRoaXMuc2V0U3RhdGUoeyBpdGVtcyB9KVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCByZW5kZXJlZENoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbih0aGlzLnN0YXRlLml0ZW1zKVxuICAgIHJldHVybiByZW5kZXJlZENoaWxkcmVuICYmIFJlYWN0LkNoaWxkcmVuLm9ubHkocmVuZGVyZWRDaGlsZHJlbilcbiAgfVxufVxuXG4vLyBUYWtlbiBmcm9tIHJlYWN0LW1vdGlvbidzIG1lcmdlRGlmZiAoaHR0cHM6Ly9naXRodWIuY29tL2NoZW5nbG91L3JlYWN0LW1vdGlvbi9ibG9iLzQ0NmE4ZDAxMzAwNzJjNGE1OWZlYzFhYjc4OGJmYzJjYzVjNWI3ODgvc3JjL21lcmdlRGlmZi5qcylcbmZ1bmN0aW9uIG1lcmdlSXRlbXMgKHByZXYsIG5leHQpIHtcbiAgY29uc3QgcHJldktleUluZGV4ID0ge31cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2Lmxlbmd0aDsgaSsrKSB7XG4gICAgcHJldktleUluZGV4W3ByZXZbaV0ua2V5XSA9IGlcbiAgfVxuICBjb25zdCBuZXh0S2V5SW5kZXggPSB7fVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQubGVuZ3RoOyBpKyspIHtcbiAgICBuZXh0S2V5SW5kZXhbbmV4dFtpXS5rZXldID0gaVxuICB9XG4gIC8vIE1lcmdlIHRoZSBhcnJheXNcbiAgY29uc3QgYWxsSXRlbXMgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQubGVuZ3RoOyBpKyspIHtcbiAgICBhbGxJdGVtc1tpXSA9IG5leHRbaV1cbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXYubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuZXh0S2V5SW5kZXgsIHByZXZbaV0ua2V5KSkge1xuICAgICAgYWxsSXRlbXMucHVzaChwcmV2W2ldKVxuICAgIH1cbiAgfVxuICAvLyBub3cgYWxsIHRoZSBpdGVtcyBhbGwgcHJlc2VudC4gQ29yZSBzb3J0aW5nIGxvZ2ljIHRvIGhhdmUgdGhlIHJpZ2h0IG9yZGVyXG4gIHJldHVybiBhbGxJdGVtcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgY29uc3QgbmV4dE9yZGVyQSA9IG5leHRLZXlJbmRleFthLmtleV1cbiAgICBjb25zdCBuZXh0T3JkZXJCID0gbmV4dEtleUluZGV4W2Iua2V5XVxuICAgIGNvbnN0IHByZXZPcmRlckEgPSBwcmV2S2V5SW5kZXhbYS5rZXldXG4gICAgY29uc3QgcHJldk9yZGVyQiA9IHByZXZLZXlJbmRleFtiLmtleV1cbiAgICBpZiAobmV4dE9yZGVyQSAhPSBudWxsICYmIG5leHRPcmRlckIgIT0gbnVsbCkge1xuICAgICAgLy8gYm90aCBrZXlzIGluIG5leHRcbiAgICAgIHJldHVybiBuZXh0S2V5SW5kZXhbYS5rZXldIC0gbmV4dEtleUluZGV4W2Iua2V5XVxuICAgIH0gZWxzZSBpZiAocHJldk9yZGVyQSAhPSBudWxsICYmIHByZXZPcmRlckIgIT0gbnVsbCkge1xuICAgICAgLy8gYm90aCBrZXlzIGluIHByZXZcbiAgICAgIHJldHVybiBwcmV2S2V5SW5kZXhbYS5rZXldIC0gcHJldktleUluZGV4W2Iua2V5XVxuICAgIH0gZWxzZSBpZiAobmV4dE9yZGVyQSAhPSBudWxsKSB7XG4gICAgICAvLyBrZXkgYSBpbiBuZXh0LCBrZXkgYiBpbiBwcmV2XG4gICAgICAvLyBob3cgdG8gZGV0ZXJtaW5lIHRoZSBvcmRlciBiZXR3ZWVuIGEgYW5kIGI/IFdlIGZpbmQgYSBcInBpdm90XCIgKHRlcm1cbiAgICAgIC8vIGFidXNlKSwgYSBrZXkgcHJlc2VudCBpbiBib3RoIHByZXYgYW5kIG5leHQsIHRoYXQgaXMgc2FuZHdpY2hlZCBiZXR3ZWVuXG4gICAgICAvLyBhIGFuZCBiLiBJbiB0aGUgY29udGV4dCBvZiBvdXIgYWJvdmUgZXhhbXBsZSwgaWYgd2UncmUgY29tcGFyaW5nIGEgYW5kXG4gICAgICAvLyBkLCBiJ3MgKHRoZSBvbmx5KSBwaXZvdFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHBpdm90ID0gbmV4dFtpXS5rZXlcbiAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocHJldktleUluZGV4LCBwaXZvdCkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICBuZXh0T3JkZXJBIDwgbmV4dEtleUluZGV4W3Bpdm90XSAmJlxuICAgICAgICAgIHByZXZPcmRlckIgPiBwcmV2S2V5SW5kZXhbcGl2b3RdXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIG5leHRPcmRlckEgPiBuZXh0S2V5SW5kZXhbcGl2b3RdICYmXG4gICAgICAgICAgcHJldk9yZGVyQiA8IHByZXZLZXlJbmRleFtwaXZvdF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcGx1Z2dhYmxlLiBkZWZhdWx0IHRvOiBuZXh0IGJpZ2dlciB0aGFuIHByZXZcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIC8vIHByZXZPcmRlckEsIG5leHRPcmRlckJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5leHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBpdm90ID0gbmV4dFtpXS5rZXlcbiAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByZXZLZXlJbmRleCwgcGl2b3QpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIG5leHRPcmRlckIgPCBuZXh0S2V5SW5kZXhbcGl2b3RdICYmXG4gICAgICAgIHByZXZPcmRlckEgPiBwcmV2S2V5SW5kZXhbcGl2b3RdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG5leHRPcmRlckIgPiBuZXh0S2V5SW5kZXhbcGl2b3RdICYmXG4gICAgICAgIHByZXZPcmRlckEgPCBwcmV2S2V5SW5kZXhbcGl2b3RdXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgfVxuICAgIC8vIHBsdWdnYWJsZS4gZGVmYXVsdCB0bzogbmV4dCBiaWdnZXIgdGhhbiBwcmV2XG4gICAgcmV0dXJuIC0xXG4gIH0pXG59XG5cblRyYW5zaXRpb24uZGVmYXVsdHMgPSBkZWZhdWx0c1xuXG5mdW5jdGlvbiBkZWR1cGUgKC4uLmFycnMpIHtcbiAgY29uc3QgYWxsSXRlbXMgPSBhcnJzLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYiksIFtdKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbEl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgZm9yIChsZXQgaiA9IGkgKyAxOyBqIDwgYWxsSXRlbXMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmIChhbGxJdGVtc1tpXSA9PT0gYWxsSXRlbXNbal0pIHtcbiAgICAgICAgYWxsSXRlbXMuc3BsaWNlKGotLSwgMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFsbEl0ZW1zXG59XG4iXX0=

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepEqual = __webpack_require__(277);

var _deepEqual2 = _interopRequireDefault(_deepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  deepEquals: deepEquals,
  pickBy: pickBy
};


function deepEquals(a, b) {
  return (0, _deepEqual2.default)(a, b);
}

function pickBy(obj, cb) {
  var newObj = {};
  for (var key in obj) {
    if (cb(obj[key], key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlscy5qcyJdLCJuYW1lcyI6WyJkZWVwRXF1YWxzIiwicGlja0J5IiwiYSIsImIiLCJvYmoiLCJjYiIsIm5ld09iaiIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztrQkFFZTtBQUNiQSx3QkFEYTtBQUViQztBQUZhLEM7OztBQUtmLFNBQVNELFVBQVQsQ0FBcUJFLENBQXJCLEVBQXdCQyxDQUF4QixFQUEyQjtBQUN6QixTQUFPLHlCQUFVRCxDQUFWLEVBQWFDLENBQWIsQ0FBUDtBQUNEOztBQUVELFNBQVNGLE1BQVQsQ0FBaUJHLEdBQWpCLEVBQXNCQyxFQUF0QixFQUEwQjtBQUN4QixNQUFNQyxTQUFTLEVBQWY7QUFDQSxPQUFLLElBQUlDLEdBQVQsSUFBZ0JILEdBQWhCLEVBQXFCO0FBQ25CLFFBQUlDLEdBQUdELElBQUlHLEdBQUosQ0FBSCxFQUFhQSxHQUFiLENBQUosRUFBdUI7QUFDckJELGFBQU9DLEdBQVAsSUFBY0gsSUFBSUcsR0FBSixDQUFkO0FBQ0Q7QUFDRjtBQUNELFNBQU9ELE1BQVA7QUFDRCIsImZpbGUiOiJVdGlscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWVwRXF1YWwgZnJvbSAnZGVlcC1lcXVhbCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkZWVwRXF1YWxzLFxuICBwaWNrQnksXG59XG5cbmZ1bmN0aW9uIGRlZXBFcXVhbHMgKGEsIGIpIHtcbiAgcmV0dXJuIERlZXBFcXVhbChhLCBiKVxufVxuXG5mdW5jdGlvbiBwaWNrQnkgKG9iaiwgY2IpIHtcbiAgY29uc3QgbmV3T2JqID0ge31cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChjYihvYmpba2V5XSwga2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmpba2V5XVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqXG59XG4iXX0=

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18),
    _assign = __webpack_require__(38);

var ReactNoopUpdateQueue = __webpack_require__(124);

var canDefineProperty = __webpack_require__(40);
var emptyObject = __webpack_require__(116);
var invariant = __webpack_require__(7);
var lowPriorityWarning = __webpack_require__(65);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          lowPriorityWarning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactCurrentOwner = __webpack_require__(39);
var ReactComponentTreeHook = __webpack_require__(64);
var ReactElement = __webpack_require__(15);

var checkReactTypeSpec = __webpack_require__(297);

var canDefineProperty = __webpack_require__(40);
var getIteratorFn = __webpack_require__(125);
var warning = __webpack_require__(10);
var lowPriorityWarning = __webpack_require__(65);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return ' Check your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += ReactComponentTreeHook.getCurrentStackAddendum();

        var currentSource = props !== null && props !== undefined && props.__source !== undefined ? props.__source : null;
        ReactComponentTreeHook.pushNonStandardWarningStack(true, currentSource);
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
        ReactComponentTreeHook.popNonStandardWarningStack();
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            lowPriorityWarning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var warning = __webpack_require__(10);

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

var _reactState = __webpack_require__(4);

var _d3Shape = __webpack_require__(17);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Curves = __webpack_require__(41);

var _Curves2 = _interopRequireDefault(_Curves);

var _interactionMethods = __webpack_require__(20);

var _Path = __webpack_require__(19);

var _Path2 = _interopRequireDefault(_Path);

var _Circle = __webpack_require__(43);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var pathDefaultStyle = {
  strokeWidth: 2
};

var circleDefaultStyle = {
  r: 2
};

var Area = function (_PureComponent) {
  _inherits(Area, _PureComponent);

  function Area() {
    _classCallCheck(this, Area);

    var _this = _possibleConstructorReturn(this, (Area.__proto__ || Object.getPrototypeOf(Area)).call(this));

    _this.selectSeries = _interactionMethods.selectSeries.bind(_this);
    _this.hoverSeries = _interactionMethods.hoverSeries.bind(_this);
    _this.selectDatum = _interactionMethods.selectDatum.bind(_this);
    _this.hoverDatum = _interactionMethods.hoverDatum.bind(_this);
    return _this;
  }

  _createClass(Area, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          visibility = _props.visibility,
          showPoints = _props.showPoints,
          curve = _props.curve,
          selected = _props.selected,
          hovered = _props.hovered,
          interaction = _props.interaction;


      var status = _Utils2.default.seriesStatus(series, hovered, selected);
      var style = _Utils2.default.getStatusStyle(status, series.statusStyles);

      var areaFn = (0, _d3Shape.area)().defined(function (d) {
        return typeof d[0] === 'number' && typeof d[1] === 'number';
      }).curve(_Curves2.default[curve] || curve).y0(function (d) {
        return d[2];
      });

      var lineFn = (0, _d3Shape.line)().defined(function (d) {
        return typeof d[0] === 'number' && typeof d[1] === 'number';
      }).curve(_Curves2.default[curve] || curve);

      var data = series.data.map(function (d) {
        return {
          x: d.x,
          y: d.y,
          r: d.r,
          base: d.base
        };
      });

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          'default': {
            data: data,
            visibility: 0
          },
          data: {
            data: data,
            visibility: visibility
          }
        },
        function (inter) {
          var areaPath = areaFn(inter.data.map(function (d) {
            return [isNaN(d.x) ? null : d.x, isNaN(d.y) ? null : d.y, isNaN(d.base) ? null : d.base];
          }));
          var linePath = lineFn(inter.data.map(function (d) {
            return [isNaN(d.x) ? null : d.x, isNaN(d.y) ? null : d.y];
          }));

          var seriesInteractionProps = interaction === 'series' ? {
            onClick: function onClick() {
              return _this2.selectSeries(series);
            },
            onMouseEnter: function onMouseEnter() {
              return _this2.hoverSeries(series);
            },
            onMouseMove: function onMouseMove() {
              return _this2.hoverSeries(series);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hoverSeries(null);
            }
          } : {};

          return _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(_Path2.default, _extends({
              d: areaPath,
              style: _extends({}, pathDefaultStyle, style, style.area, {
                stroke: 'transparent'
              }),
              opacity: inter.visibility
            }, seriesInteractionProps)),
            _react2.default.createElement(_Path2.default, _extends({
              d: linePath,
              style: _extends({}, pathDefaultStyle, style, style.line, {
                fill: 'none'
              }),
              opacity: inter.visibility
            }, seriesInteractionProps)),
            showPoints && series.data.map(function (datum, i) {
              var status = _Utils2.default.datumStatus(series, datum, hovered, selected);
              var dataStyle = _Utils2.default.getStatusStyle(status, datum.statusStyles);

              var datumInteractionProps = interaction === 'element' ? {
                onClick: function onClick() {
                  return _this2.selectDatum(datum);
                },
                onMouseEnter: function onMouseEnter() {
                  return _this2.hoverDatum(datum);
                },
                onMouseMove: function onMouseMove() {
                  return _this2.hoverDatum(datum);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this2.hoverDatum(null);
                }
              } : {};

              return _react2.default.createElement(_Circle2.default, _extends({
                key: i,
                x: inter.data[i].x,
                y: inter.data[i].y,
                style: _extends({}, circleDefaultStyle, style, style.circle, dataStyle, dataStyle.circle),
                opacity: inter.visibility
              }, seriesInteractionProps, datumInteractionProps));
            })
          );
        }
      );
    }
  }]);

  return Area;
}(_react.PureComponent);

Area.defaultProps = {
  showPoints: false,
  curve: 'monotoneX'
};
exports.default = (0, _reactState.Connect)(function (state, props) {
  return {
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  },
  statics: {
    SeriesType: 'Area'
  }
})(Area);

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _AxisPie = __webpack_require__(139);

var _AxisPie2 = _interopRequireDefault(_AxisPie);

var _AxisLinear = __webpack_require__(42);

var _AxisLinear2 = _interopRequireDefault(_AxisLinear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var Axis = function (_PureComponent) {
  _inherits(Axis, _PureComponent);

  function Axis() {
    _classCallCheck(this, Axis);

    return _possibleConstructorReturn(this, (Axis.__proto__ || Object.getPrototypeOf(Axis)).apply(this, arguments));
  }

  _createClass(Axis, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;


      if (type === 'pie') {
        return _react2.default.createElement(_AxisPie2.default, this.props);
      }

      return _react2.default.createElement(_AxisLinear2.default, this.props);
    }
  }]);

  return Axis;
}(_react.PureComponent);

exports.default = Axis;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

var _interactionMethods = __webpack_require__(20);

var _Rectangle = __webpack_require__(66);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var Bars = function (_PureComponent) {
  _inherits(Bars, _PureComponent);

  function Bars() {
    _classCallCheck(this, Bars);

    var _this = _possibleConstructorReturn(this, (Bars.__proto__ || Object.getPrototypeOf(Bars)).call(this));

    _this.selectSeries = _interactionMethods.selectSeries.bind(_this);
    _this.hoverSeries = _interactionMethods.hoverSeries.bind(_this);
    _this.selectDatum = _interactionMethods.selectDatum.bind(_this);
    _this.hoverDatum = _interactionMethods.hoverDatum.bind(_this);
    return _this;
  }

  _createClass(Bars, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          visibility = _props.visibility,
          primaryAxis = _props.primaryAxis,
          selected = _props.selected,
          hovered = _props.hovered,
          interaction = _props.interaction;


      var status = _Utils2.default.seriesStatus(series, hovered, selected);
      var style = _Utils2.default.getStatusStyle(status, series.statusStyles);

      var barSize = primaryAxis.barSize;
      var barOffset = primaryAxis.barOffset;

      var data = series.data.map(function (d) {
        return {
          x: d.x,
          y: d.y,
          r: d.r,
          base: d.base
        };
      });

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          'default': {
            data: data,
            barSize: barSize,
            barOffset: barOffset,
            visibility: 0
          },
          data: {
            data: data,
            barSize: barSize,
            barOffset: barOffset,
            visibility: visibility
          }
        },
        function (inter) {
          var seriesInteractionProps = interaction === 'series' ? {
            onClick: function onClick() {
              return _this2.selectSeries(series);
            },
            onMouseEnter: function onMouseEnter() {
              return _this2.hoverSeries(series);
            },
            onMouseMove: function onMouseMove() {
              return _this2.hoverSeries(series);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hoverSeries(null);
            }
          } : {};
          return _react2.default.createElement(
            'g',
            { className: 'series bar' },
            series.data.map(function (datum, i) {
              var x1 = void 0,
                  y1 = void 0,
                  x2 = void 0,
                  y2 = void 0;
              if (primaryAxis.vertical) {
                x1 = inter.data[i].base;
                x2 = inter.data[i].x;
                y1 = inter.data[i].y + inter.barOffset;
                y2 = y1 + inter.barSize;
              } else {
                x1 = inter.data[i].x + inter.barOffset;
                x2 = x1 + inter.barSize;
                y1 = inter.data[i].y;
                y2 = inter.data[i].base;
              }

              var status = _Utils2.default.datumStatus(series, datum, hovered, selected);
              var dataStyle = _Utils2.default.getStatusStyle(status, datum.statusStyles);

              var datumInteractionProps = interaction === 'element' ? {
                onClick: function onClick() {
                  return _this2.selectDatum(datum);
                },
                onMouseEnter: function onMouseEnter() {
                  return _this2.hoverDatum(datum);
                },
                onMouseMove: function onMouseMove() {
                  return _this2.hoverDatum(datum);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this2.hoverDatum(null);
                }
              } : {};

              return _react2.default.createElement(_Rectangle2.default, _extends({
                style: _extends({}, style, style.rectangle, dataStyle, dataStyle.rectangle),
                key: i,
                x1: isNaN(x1) ? null : x1,
                y1: isNaN(y1) ? null : y1,
                x2: isNaN(x2) ? null : x2,
                y2: isNaN(y2) ? null : y2,
                opacity: inter.visibility
              }, seriesInteractionProps, datumInteractionProps));
            })
          );
        }
      );
    }
  }]);

  return Bars;
}(_react.PureComponent);

exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis()
  };
  return function (state, props) {
    return {
      primaryAxis: selectors.primaryAxis(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  },
  statics: {
    SeriesType: 'Bar'
  }
})(Bars);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


// import Rectangle from '../primitives/Rectangle'

var Brush = function (_PureComponent) {
  _inherits(Brush, _PureComponent);

  function Brush() {
    _classCallCheck(this, Brush);

    return _possibleConstructorReturn(this, (Brush.__proto__ || Object.getPrototypeOf(Brush)).apply(this, arguments));
  }

  _createClass(Brush, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props,
          onSelect = _props.onSelect,
          cursor = _props.cursor,
          primaryAxis = _props.primaryAxis;

      if (this.props.cursor && nextProps.cursor.released !== this.props.cursor.released) {
        onSelect({
          cursor: nextProps.cursor.released,
          start: primaryAxis.scale.invert(cursor.sourceX),
          end: primaryAxis.scale.invert(cursor.x)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$cursor = _props2.cursor,
          cursor = _props2$cursor === undefined ? {} : _props2$cursor,
          offset = _props2.offset,
          gridX = _props2.gridX,
          gridY = _props2.gridY,
          gridHeight = _props2.gridHeight;


      return _react2.default.createElement(
        'div',
        {
          className: 'Brush',
          style: {
            pointerEvents: 'none',
            position: 'absolute',
            left: offset.left + gridX + 'px',
            top: offset.top + gridY + 'px',
            opacity: !cursor.dragging ? 0 : 1
          }
        },
        _react2.default.createElement('div', {
          style: {
            position: 'absolute',
            left: Math.min(cursor.x, cursor.sourceX) + 'px',
            width: Math.abs(cursor.x - cursor.sourceX) + 'px',
            height: gridHeight + 'px',
            background: 'rgba(0,0,0,.2)'
          }
        })
      );
    }
  }]);

  return Brush;
}(_react.PureComponent);

Brush.defaultProps = {
  onSelect: function onSelect() {}
};
exports.default = (0, _reactState.Connect)(function (state) {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    secondaryAxis: _Selectors2.default.secondaryAxis(),
    offset: _Selectors2.default.offset(),
    gridHeight: _Selectors2.default.gridHeight(),
    gridX: _Selectors2.default.gridX(),
    gridY: _Selectors2.default.gridY()
  };
  return function (state) {
    return {
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      cursor: state.cursor,
      offset: selectors.offset(state),
      gridHeight: selectors.gridHeight(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state)
    };
  };
}, {
  statics: {
    isHTML: true
  }
})(Brush);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _interactionMethods = __webpack_require__(20);

var _Circle = __webpack_require__(43);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//


var circleDefaultStyle = {
  r: 2
};

var Line = function (_PureComponent) {
  _inherits(Line, _PureComponent);

  function Line() {
    _classCallCheck(this, Line);

    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

    _this.selectSeries = _interactionMethods.selectSeries.bind(_this);
    _this.hoverSeries = _interactionMethods.hoverSeries.bind(_this);
    _this.selectDatum = _interactionMethods.selectDatum.bind(_this);
    _this.hoverDatum = _interactionMethods.hoverDatum.bind(_this);
    return _this;
  }

  _createClass(Line, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          visibility = _props.visibility,
          selected = _props.selected,
          hovered = _props.hovered,
          interaction = _props.interaction;


      var status = _Utils2.default.seriesStatus(series, hovered, selected);
      var style = _Utils2.default.getStatusStyle(status, series.statusStyles);

      var data = series.data.map(function (d) {
        return {
          x: d.x,
          y: d.y,
          r: d.r,
          base: d.base
        };
      });

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          'default': {
            data: data,
            visibility: 0
          },
          data: {
            data: data,
            visibility: visibility
          }
        },
        function (inter) {
          var seriesInteractionProps = interaction === 'series' ? {
            onClick: function onClick() {
              return _this2.selectSeries(series);
            },
            onMouseEnter: function onMouseEnter() {
              return _this2.hoverSeries(series);
            },
            onMouseMove: function onMouseMove() {
              return _this2.hoverSeries(series);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hoverSeries(null);
            }
          } : {};
          return _react2.default.createElement(
            'g',
            null,
            inter.data.map(function (datum, i) {
              var status = _Utils2.default.datumStatus(series, datum, hovered, selected);
              var dataStyle = _Utils2.default.getStatusStyle(status, datum.statusStyles);

              var datumInteractionProps = interaction === 'element' ? {
                onClick: function onClick() {
                  return _this2.selectDatum(datum);
                },
                onMouseEnter: function onMouseEnter() {
                  return _this2.hoverDatum(datum);
                },
                onMouseMove: function onMouseMove() {
                  return _this2.hoverDatum(datum);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this2.hoverDatum(null);
                }
              } : {};

              return _react2.default.createElement(_Circle2.default, _extends({
                key: i,
                x: inter.data[i].x,
                y: inter.data[i].y,
                r: inter.data[i].r,
                style: _extends({}, circleDefaultStyle, style, style.circle, dataStyle, dataStyle.circle),
                opacity: inter.visibility
              }, seriesInteractionProps, datumInteractionProps));
            }),
            ')}'
          );
        }
      );
    }
  }]);

  return Line;
}(_react.PureComponent);

exports.default = (0, _reactState.Connect)(function (state, props) {
  return {
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(Line);

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

var _reactState = __webpack_require__(4);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

var _HyperResponsive = __webpack_require__(144);

var _HyperResponsive2 = _interopRequireDefault(_HyperResponsive);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Rectangle = __webpack_require__(66);

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Voronoi = __webpack_require__(140);

var _Voronoi2 = _interopRequireDefault(_Voronoi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var Chart = function (_PureComponent) {
  _inherits(Chart, _PureComponent);

  function Chart() {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this));

    _this.updateDataModel = _this.updateDataModel.bind(_this);
    _this.measure = _this.measure.bind(_this);
    _this.onMouseMove = _Utils2.default.throttle(_this.onMouseMove.bind(_this), 16);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);
    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.dispatch(function (state) {
        return _extends({}, state, {
          interaction: _this2.props.interaction
        });
      }, {
        type: 'interaction'
      });
      this.updateDataModel(this.props);
      this.componentDidUpdate(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // If anything related to the data model changes, update it
      if (nextProps.interaction !== this.props.interaction) {
        this.props.dispatch(function (state) {
          return _extends({}, state, {
            interaction: nextProps.interaction
          });
        }, {
          type: 'interaction'
        });
      }

      if (nextProps.data !== this.props.data || nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.getData !== this.props.getData || nextProps.getSeriesID !== this.props.getSeriesID || nextProps.getLabel !== this.props.getLabel || nextProps.getPrimary !== this.props.getPrimary || nextProps.getSecondary !== this.props.getSecondary || nextProps.getR !== this.props.getR) {
        this.updateDataModel(nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.style !== this.props.style || nextProps.width !== this.props.width || nextProps.height !== this.props.height || nextProps.gridX !== this.props.gridX || nextProps.gridY !== this.props.gridY || nextProps.children !== this.props.children) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      _Utils2.default.requestAnimationFrame(function () {
        return _this3.measure(prevProps);
      });
    }
  }, {
    key: 'updateDataModel',
    value: function updateDataModel(props) {
      var data = props.data;
      var getData = props.getData,
          getLabel = props.getLabel,
          getSeriesID = props.getSeriesID,
          getPrimary = props.getPrimary,
          getSecondary = props.getSecondary,
          getR = props.getR;

      // Normalize getters

      getData = _Utils2.default.normalizePathGetter(getData);
      getLabel = _Utils2.default.normalizePathGetter(getLabel);
      getSeriesID = _Utils2.default.normalizePathGetter(getSeriesID);
      getPrimary = _Utils2.default.normalizePathGetter(getPrimary);
      getSecondary = _Utils2.default.normalizePathGetter(getSecondary);
      getR = _Utils2.default.normalizePathGetter(getR);

      // First access the data, and provide it to the context
      var materializedData = data.map(function (s, seriesIndex) {
        var seriesID = getSeriesID(s, seriesIndex);
        var seriesLabel = getLabel(s, seriesIndex);
        var series = {
          row: s,
          index: seriesIndex,
          id: seriesID,
          label: seriesLabel,
          data: getData(s, seriesIndex).map(function (d, index) {
            return {
              row: s,
              seriesIndex: seriesIndex,
              seriesID: seriesID,
              seriesLabel: seriesLabel,
              index: index,
              datum: d,
              primary: getPrimary(d, index),
              secondary: getSecondary(d, index),
              r: getR(d, index)
            };
          })
        };
        return series;
      });

      // Provide the materializedData to the chart instance
      this.props.dispatch(function (state) {
        return _extends({}, state, {
          materializedData: materializedData
        });
      }, {
        type: 'materializedData'
      });
    }
  }, {
    key: 'measure',
    value: function measure(prevProps) {
      var _this4 = this;

      if (prevProps && (this.props.offset.left !== prevProps.offset.left || this.props.offset.top !== prevProps.offset.top)) {
        this.props.dispatch(function (state) {
          return _extends({}, state, {
            offset: {
              left: _this4.el.offsetLeft,
              top: _this4.el.offsetTop
            }
          });
        }, {
          type: 'offset'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          style = _props.style,
          width = _props.width,
          height = _props.height,
          gridX = _props.gridX,
          gridY = _props.gridY,
          children = _props.children;


      var allChildren = _react2.default.Children.toArray(children);
      var svgChildren = allChildren.filter(function (d) {
        return !d.type.isHTML;
      });
      var htmlChildren = allChildren.filter(function (d) {
        return d.type.isHTML;
      });

      return _react2.default.createElement(
        'div',
        {
          className: 'Chart',
          style: {
            height: '0',
            width: '0'
          }
        },
        _react2.default.createElement(
          _reactMove.Animate,
          {
            data: {
              gridX: gridX,
              gridY: gridY
            }
          },
          function (_ref) {
            var gridX = _ref.gridX,
                gridY = _ref.gridY;
            return _react2.default.createElement(
              'svg',
              {
                ref: function ref(el) {
                  _this5.el = el;
                },
                style: _extends({
                  width: width,
                  height: height
                }, style)
              },
              _react2.default.createElement(
                'g',
                {
                  ref: function ref(el) {
                    _this5.el = el;
                  },
                  transform: 'translate(' + (gridX || 0) + ', ' + (gridY || 0) + ')',
                  onMouseEnter: function onMouseEnter(e) {
                    e.persist();
                    _this5.onMouseMove(e);
                  },
                  onMouseMove: function onMouseMove(e) {
                    e.persist();
                    _this5.onMouseMove(e);
                  },
                  onMouseLeave: _this5.onMouseLeave,
                  onMouseDown: _this5.onMouseDown,
                  onMouseUp: _this5.onMouseUp
                },
                _react2.default.createElement(_Rectangle2.default
                // This is to ensure the cursor always has something to hit
                , { x1: -gridX,
                  x2: width - gridX,
                  y1: -gridY,
                  y2: height - gridY,
                  style: {
                    opacity: 0
                  }
                }),
                svgChildren,
                _react2.default.createElement(_Voronoi2.default, null)
              )
            );
          }
        ),
        htmlChildren
      );
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      var _this6 = this;

      var clientX = e.clientX,
          clientY = e.clientY;

      this.dims = this.el.getBoundingClientRect();
      var _props2 = this.props,
          gridX = _props2.gridX,
          gridY = _props2.gridY,
          dispatch = _props2.dispatch;


      dispatch(function (state) {
        return _extends({}, state, {
          cursor: _extends({}, state.cursor, {
            active: true,
            x: clientX - _this6.dims.left - gridX,
            y: clientY - _this6.dims.top - gridY,
            dragging: state.cursor && state.cursor.down
          })
        });
      }, {
        type: 'cursor'
      });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.props.dispatch(function (state) {
        return _extends({}, state, {
          cursor: _extends({}, state.cursor, {
            active: false
          }),
          hovered: _extends({}, state.hovered, {
            active: false
          })
        });
      }, {
        type: 'cursor_hovered'
      });
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown() {
      var dispatch = this.props.dispatch;


      dispatch(function (state) {
        return _extends({}, state, {
          cursor: _extends({}, state.cursor, {
            sourceX: state.cursor.x,
            sourceY: state.cursor.y,
            down: true
          })
        });
      }, {
        type: 'cursor'
      });
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      var dispatch = this.props.dispatch;

      dispatch(function (state) {
        return _extends({}, state, {
          cursor: _extends({}, state.cursor, {
            down: false,
            dragging: false,
            released: {
              x: state.cursor.x,
              y: state.cursor.y
            }
          })
        });
      }, {
        type: 'cursor'
      });
    }
  }]);

  return Chart;
}(_react.PureComponent);

Chart.defaultProps = {
  getData: function getData(d) {
    return d;
  },
  getLabel: function getLabel(d, i) {
    return 'Series ' + (i + 1);
  },
  getSeriesID: function getSeriesID(d, i) {
    return i;
  },
  getPrimary: function getPrimary(d) {
    return Array.isArray(d) ? d[0] : d.x;
  },
  getSecondary: function getSecondary(d) {
    return Array.isArray(d) ? d[1] : d.y;
  },
  getR: function getR(d) {
    return Array.isArray(d) ? d[0] : d.r;
  },
  decorate: function decorate(d) {
    return {};
  },
  interaction: 'closestPoint'
};


var ReactChart = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    gridX: _Selectors2.default.gridX(),
    gridY: _Selectors2.default.gridY(),
    offset: _Selectors2.default.offset()
  };
  return function (state) {
    return {
      data: state.data,
      width: state.width,
      height: state.height,
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
      active: state.active,
      offset: selectors.offset(state),
      selected: state.selected
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(Chart);

exports.default = (0, _HyperResponsive2.default)((0, _reactState.Provider)(ReactChart));

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var Cursor = function (_PureComponent) {
  _inherits(Cursor, _PureComponent);

  function Cursor() {
    _classCallCheck(this, Cursor);

    var _this = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));

    _this.onHover = _this.onHover.bind(_this);
    _this.onActivate = _this.onActivate.bind(_this);
    return _this;
  }

  _createClass(Cursor, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          primary = _props.primary,
          snap = _props.snap,
          stackData = _props.stackData,
          primaryAxis = _props.primaryAxis,
          secondaryAxis = _props.secondaryAxis,
          cursor = _props.cursor,
          _props$offset = _props.offset,
          left = _props$offset.left,
          top = _props$offset.top,
          gridX = _props.gridX,
          gridY = _props.gridY,
          children = _props.children;

      // Don't render until we have all dependencies

      if (!stackData || !cursor || !primaryAxis || !secondaryAxis) {
        return null;
      }

      var x = cursor.x;
      var y = cursor.y;
      var animated = false;

      var axis = primary ? primaryAxis : secondaryAxis;
      var siblingAxis = primary ? secondaryAxis : primaryAxis;
      var siblingRange = siblingAxis.scale.range();

      var invert = axis.scale.invert || function (d) {
        return d;
      };

      var x1 = void 0,
          x2 = void 0,
          y1 = void 0,
          y2 = void 0,
          label = void 0,
          alignPctX = void 0,
          alignPctY = void 0;

      if (primary && (axis.type === 'ordinal' || snap)) {
        animated = true;
        var closestDatum = { focus: {} };
        if (primaryAxis.vertical) {
          var smallestDistance = 10000000;
          stackData.forEach(function (series) {
            series.data.forEach(function (datum) {
              var distance = Math.abs(y - datum.focus.x);
              if (distance < smallestDistance) {
                smallestDistance = distance;
                closestDatum = datum;
              }
            });
          });
          y = closestDatum.focus.x;
          label = typeof closestDatum.primary !== 'undefined' ? axis.format(closestDatum.primary) : undefined;
        } else {
          var _smallestDistance = 10000000;
          stackData.forEach(function (series) {
            series.data.forEach(function (datum) {
              var distance = Math.abs(x - datum.focus.x);
              if (distance < _smallestDistance) {
                _smallestDistance = distance;
                closestDatum = datum;
              }
            });
          });
          x = closestDatum.focus.x;
          label = typeof closestDatum.primary !== 'undefined' ? axis.format(closestDatum.primary) : undefined;
        }
      }

      if (axis.vertical) {
        x1 = siblingRange[0];
        x2 = siblingRange[1];
        y1 = y - 1;
        y2 = y + 1;
        label = typeof label !== 'undefined' ? label : axis.format(invert(cursor.y));
        if (axis.position === 'left') {
          alignPctX = -100;
          alignPctY = -50;
        } else {
          alignPctX = 0;
          alignPctY = -50;
        }
      } else {
        x1 = x - 1;
        x2 = x + 1;
        y1 = siblingRange[0];
        y2 = siblingRange[1];
        label = typeof label !== 'undefined' ? label : axis.format(invert(cursor.x));
        if (axis.position === 'top') {
          alignPctX = -500;
          alignPctY = -100;
        } else {
          alignPctX = -50;
          alignPctY = 0;
        }
      }

      var xStart = Math.min(x1, x2);
      var yStart = Math.min(y1, y2);
      var xEnd = Math.max(x1, x2);
      var yEnd = Math.max(y1, y2);

      var height = Math.max(yEnd - yStart, 0);
      var width = Math.max(xEnd - xStart, 0);

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: {
            xStart: xStart,
            yStart: yStart,
            width: width,
            height: height,
            x1: x1,
            y1: y1,
            visibility: cursor.active ? 1 : 0
          },
          duration: 400
        },
        function (inter) {
          return _react2.default.createElement(
            'div',
            {
              className: 'Cursor',
              onMouseLeave: function onMouseLeave(e) {
                return _this2.onHover(null, e);
              },
              style: {
                pointerEvents: 'none',
                position: 'absolute',
                left: left + gridX + 'px',
                top: top + gridY + 'px',
                opacity: inter.visibility
              }
            },
            JSON.stringify(cursor, null, 2),
            _react2.default.createElement('div', {
              style: {
                position: 'absolute',
                transform: 'translate3d(' + (animated ? inter.xStart : xStart) + 'px, ' + (animated ? inter.yStart : yStart) + 'px, 0px)',
                width: (animated ? inter.width : width) + 'px',
                height: (animated ? inter.height : height) + 'px',
                background: 'rgba(0,0,0,.3)',
                WebkitBackfaceVisibility: 'hidden'
              }
            }),
            _react2.default.createElement(
              'div',
              {
                style: {
                  position: 'absolute',
                  transform: 'translate3d(' + (animated ? inter.x1 : x1) + 'px, ' + (animated ? inter.y1 : y1) + 'px, 0px)'
                }
              },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    padding: '5px',
                    fontSize: '10px',
                    background: 'rgba(0,0,0,.6)',
                    color: 'white',
                    borderRadius: '3px',
                    position: 'relative',
                    transform: 'translate3d(' + alignPctX + '%, ' + alignPctY + '%, 0px)',
                    whiteSpace: !axis.vertical && 'nowrap'
                  }
                },
                children({
                  label: label
                })
              )
            )
          );
        }
      );
    }
  }, {
    key: 'onHover',
    value: function onHover(hovered, e) {
      return this.props.dispatch(function (state) {
        return _extends({}, state, {
          hovered: hovered
        });
      }, {
        type: 'hovered'
      });
    }
  }, {
    key: 'onActivate',
    value: function onActivate(newActive, e) {
      var _props2 = this.props,
          active = _props2.active,
          dispatch = _props2.dispatch;

      if (active === newActive) {
        return dispatch(function (state) {
          return _extends({}, state, {
            active: null
          });
        }, {
          type: 'active'
        });
      }
      dispatch(function (state) {
        return _extends({}, state, {
          active: newActive
        });
      }, {
        type: 'active'
      });
    }
  }]);

  return Cursor;
}(_react.PureComponent);

Cursor.defaultProps = {
  children: function children(_ref) {
    var label = _ref.label;
    return _react2.default.createElement(
      'span',
      null,
      label
    );
  }
};
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    secondaryAxis: _Selectors2.default.secondaryAxis(),
    offset: _Selectors2.default.offset(),
    gridX: _Selectors2.default.gridX(),
    gridY: _Selectors2.default.gridY()
  };
  return function (state) {
    return {
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      cursor: state.cursor,
      offset: selectors.offset(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state)
    };
  };
}, {
  statics: {
    isHTML: true
  }
})(Cursor);

/* <g

  >

  <Rectangle
    x1={labelX1}
    x2={labelX2}
    y1={labelY1}
    y2={labelY2}
  />
  <Text
    x={x1}
    y={y1}
    fontSize={fontSize}
    textAnchor={axis.position === 'left' ? 'end' : axis.position === 'right' ? 'start' : 'middle'}
    dominantBaseline={axis.position === 'top' ? 'alphabetic' : axis.position === 'bottom' ? 'hanging' : 'central'}
  >
    {label}
  </Text>
</g> */

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _d3Shape = __webpack_require__(17);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Curves = __webpack_require__(41);

var _Curves2 = _interopRequireDefault(_Curves);

var _interactionMethods = __webpack_require__(20);

var _Path = __webpack_require__(19);

var _Path2 = _interopRequireDefault(_Path);

var _Circle = __webpack_require__(43);

var _Circle2 = _interopRequireDefault(_Circle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//


var pathDefaultStyle = {
  strokeWidth: 2
};

var circleDefaultStyle = {
  r: 2
};

var Line = function (_PureComponent) {
  _inherits(Line, _PureComponent);

  function Line() {
    _classCallCheck(this, Line);

    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

    _this.selectSeries = _interactionMethods.selectSeries.bind(_this);
    _this.hoverSeries = _interactionMethods.hoverSeries.bind(_this);
    _this.selectDatum = _interactionMethods.selectDatum.bind(_this);
    _this.hoverDatum = _interactionMethods.hoverDatum.bind(_this);
    return _this;
  }

  _createClass(Line, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          visibility = _props.visibility,
          showPoints = _props.showPoints,
          curve = _props.curve,
          selected = _props.selected,
          hovered = _props.hovered,
          interaction = _props.interaction;


      var status = _Utils2.default.seriesStatus(series, hovered, selected);
      var style = _Utils2.default.getStatusStyle(status, series.statusStyles);

      var lineFn = (0, _d3Shape.line)().curve(_Curves2.default[curve] || curve).defined(function (d) {
        return typeof d[0] === 'number' && typeof d[1] === 'number';
      });

      var data = series.data.map(function (d) {
        return {
          x: d.x,
          y: d.y,
          r: d.r,
          base: d.base
        };
      });

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          'default': {
            data: data,
            visibility: 0
          },
          data: {
            data: data,
            visibility: visibility
          },
          duration: 500,
          ignore: ['originalData']
        },
        function (inter) {
          var path = lineFn(inter.data.map(function (d) {
            return [isNaN(d.x) ? null : d.x, isNaN(d.y) ? null : d.y];
          }));

          var seriesInteractionProps = interaction === 'series' ? {
            onClick: function onClick() {
              return _this2.selectSeries(series);
            },
            onMouseEnter: function onMouseEnter() {
              return _this2.hoverSeries(series);
            },
            onMouseMove: function onMouseMove() {
              return _this2.hoverSeries(series);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hoverSeries(null);
            }
          } : {};

          return _react2.default.createElement(
            'g',
            null,
            _react2.default.createElement(_Path2.default, _extends({
              d: path,
              style: _extends({}, pathDefaultStyle, style, style.line, {
                fill: 'none'
              }),
              opacity: inter.visibility
            }, seriesInteractionProps)),
            showPoints && series.data.map(function (datum, i) {
              var status = _Utils2.default.datumStatus(series, datum, hovered, selected);
              var dataStyle = _Utils2.default.getStatusStyle(status, datum.statusStyles);

              var datumInteractionProps = interaction === 'element' ? {
                onClick: function onClick() {
                  return _this2.selectDatum(datum);
                },
                onMouseEnter: function onMouseEnter() {
                  return _this2.hoverDatum(datum);
                },
                onMouseMove: function onMouseMove() {
                  return _this2.hoverDatum(datum);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this2.hoverDatum(null);
                }
              } : {};

              return _react2.default.createElement(_Circle2.default, _extends({
                key: i,
                x: inter.data[i].x,
                y: inter.data[i].y,
                style: _extends({}, circleDefaultStyle, style, style.circle, dataStyle, dataStyle.circle),
                opacity: inter.visibility
              }, seriesInteractionProps, datumInteractionProps));
            })
          );
        }
      );
    }
  }]);

  return Line;
}(_react.PureComponent);

Line.defaultProps = {
  showPoints: true,
  curve: 'monotoneX'
};
exports.default = (0, _reactState.Connect)(function (state, props) {
  return {
    hovered: state.hovered,
    selected: state.selected,
    interaction: state.interaction
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  },
  statics: {
    SeriesType: 'Line'
  }
})(Line);

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _d3Shape = __webpack_require__(17);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _interactionMethods = __webpack_require__(20);

var _Path = __webpack_require__(19);

var _Path2 = _interopRequireDefault(_Path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//


var Arc = _d3Shape.arc;

var arcDefaultStyle = {
  r: 2
};

var Pie = function (_PureComponent) {
  _inherits(Pie, _PureComponent);

  function Pie() {
    _classCallCheck(this, Pie);

    var _this = _possibleConstructorReturn(this, (Pie.__proto__ || Object.getPrototypeOf(Pie)).call(this));

    _this.selectSeries = _interactionMethods.selectSeries.bind(_this);
    _this.hoverSeries = _interactionMethods.hoverSeries.bind(_this);
    _this.selectDatum = _interactionMethods.selectDatum.bind(_this);
    _this.hoverDatum = _interactionMethods.hoverDatum.bind(_this);
    return _this;
  }

  _createClass(Pie, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          visibility = _props.visibility,
          stackData = _props.stackData,
          selected = _props.selected,
          hovered = _props.hovered,
          interaction = _props.interaction,
          primaryAxis = _props.primaryAxis;


      var status = _Utils2.default.seriesStatus(series, hovered, selected);
      var style = _Utils2.default.getStatusStyle(status, series.statusStyles);

      var radius = primaryAxis.radius,
          cutoutPercentage = primaryAxis.cutoutPercentage,
          cornerRadius = primaryAxis.cornerRadius,
          arcPadding = primaryAxis.arcPadding,
          seriesPadding = primaryAxis.seriesPadding;


      var outerRadius = radius;
      var innerRadius = radius * cutoutPercentage;
      var totalRadius = outerRadius - innerRadius;
      var seriesRadius = totalRadius / stackData.length;
      var seriesInnerRadius = innerRadius + seriesRadius * series.index;
      var seriesOuterRadius = seriesInnerRadius + seriesRadius;

      var arcPaddingRadius = outerRadius * arcPadding * 20;
      var seriesPaddingRadius = totalRadius * seriesPadding / 2.5;

      var preData = series.data.map(function (d) {
        return {
          x: d.primary,
          y: d.secondary
        };
      });

      var pie = (0, _d3Shape.pie)().sort(null).padAngle(0.01).value(function (d) {
        return d.y;
      });
      var data = pie(preData);

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          'default': {
            data: data,
            visibility: 0,
            seriesPaddingRadius: 0,
            seriesInnerRadius: outerRadius,
            seriesOuterRadius: outerRadius,
            cornerRadius: cornerRadius,
            arcPaddingRadius: arcPaddingRadius
          },
          data: {
            data: data,
            visibility: visibility,
            seriesPaddingRadius: seriesPaddingRadius,
            seriesInnerRadius: seriesInnerRadius,
            seriesOuterRadius: seriesOuterRadius,
            cornerRadius: cornerRadius,
            arcPaddingRadius: arcPaddingRadius
          },
          duration: 500
        },
        function (inter) {
          var seriesInteractionProps = interaction === 'series' ? {
            onClick: function onClick() {
              return _this2.selectSeries(series);
            },
            onMouseEnter: function onMouseEnter() {
              return _this2.hoverSeries(series);
            },
            onMouseMove: function onMouseMove() {
              return _this2.hoverSeries(series);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.hoverSeries(null);
            }
          } : {};

          return _react2.default.createElement(
            'g',
            {
              transform: 'translate(' + primaryAxis.width / 2 + ', ' + primaryAxis.height / 2 + ')'
            },
            series.data.map(function (datum, i) {
              var status = _Utils2.default.datumStatus(series, datum, hovered, selected);
              var dataStyle = _Utils2.default.getStatusStyle(status, datum.statusStyles);

              var datumInteractionProps = interaction === 'element' ? {
                onClick: function onClick() {
                  return _this2.selectDatum(datum);
                },
                onMouseEnter: function onMouseEnter() {
                  return _this2.hoverDatum(datum);
                },
                onMouseMove: function onMouseMove() {
                  return _this2.hoverDatum(datum);
                },
                onMouseLeave: function onMouseLeave() {
                  return _this2.hoverDatum(null);
                }
              } : {};

              var arc = Arc().startAngle(inter.data[i].startAngle).endAngle(inter.data[i].endAngle).padAngle(inter.data[i].padAngle).padRadius(inter.arcPaddingRadius).innerRadius(inter.seriesInnerRadius + seriesPaddingRadius).outerRadius(inter.seriesOuterRadius).cornerRadius(inter.cornerRadius);

              return _react2.default.createElement(_Path2.default, _extends({
                key: i,
                d: arc(),
                style: _extends({}, arcDefaultStyle, style, style.arc, dataStyle, dataStyle.arc),
                opacity: inter.visibility
              }, seriesInteractionProps, datumInteractionProps));
            })
          );
        }
      );
    }
  }]);

  return Pie;
}(_react.PureComponent);

Pie.defaultProps = {
  showPoints: true
};
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis()
  };
  return function (state, props) {
    return {
      primaryAxis: selectors.primaryAxis(state),
      hovered: state.hovered,
      selected: state.selected,
      interaction: state.interaction
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  },
  statics: {
    SeriesType: 'Pie'
  }
})(Pie);

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _d3Quadtree = __webpack_require__(201);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var defaultColors = ['#4ab5eb', '#fc6868', '#DECF3F', '#60BD68', '#FAA43A', '#c63b89', '#1aaabe', '#734fe9', '#1828bd', '#cd82ad'];

var getType = function getType(type, data, i) {
  // Allow dynamic types
  var typeGetter = typeof type === 'function' && type.prototype.isReactComponent ? function () {
    return type;
  } : type;
  return typeGetter(data, i);
};

var Series = function (_PureComponent) {
  _inherits(Series, _PureComponent);

  function Series() {
    _classCallCheck(this, Series);

    return _possibleConstructorReturn(this, (Series.__proto__ || Object.getPrototypeOf(Series)).apply(this, arguments));
  }

  _createClass(Series, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateStackData(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var oldProps = this.props;

      // If any of the following change,
      // we need to update the stack
      if (newProps.materializedData !== oldProps.materializedData || newProps.axes !== oldProps.axes || newProps.type !== oldProps.type || newProps.seriesKey !== oldProps.seriesKey || newProps.primaryAxis !== oldProps.primaryAxis || newProps.secondaryAxis !== oldProps.secondaryAxis) {
        this.updateStackData(newProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      if (nextProps.stackData !== this.props.stackData) {
        this.stackData = [].concat(_toConsumableArray(nextProps.stackData)).reverse(); // For proper svg stacking
        return true;
      }
      return false;
    }
  }, {
    key: 'updateStackData',
    value: function updateStackData(props) {
      var type = props.type,
          getStyles = props.getStyles,
          getDataStyles = props.getDataStyles,
          materializedData = props.materializedData,
          primaryAxis = props.primaryAxis,
          secondaryAxis = props.secondaryAxis;

      // We need materializedData to proceed

      if (!materializedData) {
        return;
      }

      // If the axes are not ready, just provide the materializedData
      if (!primaryAxis || !secondaryAxis) {
        return;
      }

      // If the axes are ready, let's decorate the materializedData for visual plotting
      var secondaryStacked = secondaryAxis.stacked;

      // Make sure we're mapping x and y to the correct axes
      var xKey = primaryAxis.vertical ? 'secondary' : 'primary';
      var yKey = primaryAxis.vertical ? 'primary' : 'secondary';
      var xAxis = primaryAxis.vertical ? secondaryAxis : primaryAxis;
      var yAxis = primaryAxis.vertical ? primaryAxis : secondaryAxis;
      var xScale = xAxis.scale;
      var yScale = yAxis.scale;

      // "totals" are kept and used for bases if secondaryAxis stacking is enabled
      var totals = {};
      if (secondaryStacked) {
        materializedData.forEach(function (series) {
          series.data.forEach(function (datum) {
            totals[datum.primary] = {
              negative: 0,
              positive: 0
            };
          });
        });
      }

      var stackData = materializedData.map(function (series, seriesIndex) {
        var SeriesComponent = getType(type, series, seriesIndex) || {};
        return _extends({}, series, {
          type: SeriesComponent.SeriesType,
          data: series.data.map(function (d, index) {
            var datum = _extends({}, d, {
              x: d[xKey],
              y: d[yKey],
              base: 0
            });
            if (secondaryStacked) {
              var start = totals[d.primary];
              // Stack the x or y values (according to axis positioning)
              if (primaryAxis.vertical) {
                // Should we use positive or negative base?
                var key = datum.x >= 0 ? 'positive' : 'negative';
                // Assign the base
                datum.base = start[key];
                // Add the value to the base
                datum.x = datum.base + datum.x;
                // Update the totals
                totals[d.primary][key] = datum.x;
              } else {
                // Should we use positive or negative base?
                var _key = datum.y >= 0 ? 'positive' : 'negative';
                // Assign the base
                datum.base = start[_key];
                // Add the value to the base
                datum.y = datum.base + datum.y;
                // Update the totals
                totals[d.primary][_key] = datum.y;
              }
            }
            return datum;
          })
        });
      });

      // Now, scale the datapoints to their axis coordinates
      // (mutation is okay here, since we have already made a materialized copy)
      stackData.forEach(function (series) {
        series.data.forEach(function (d, index) {
          // Data for cartesian charts
          if (series.type === 'Line' || series.type === 'Area' || series.type === 'Bar') {
            d.x = xScale(d.x);
            d.y = yScale(d.y);
            d.base = primaryAxis.vertical ? xScale(d.base) : yScale(d.base);
            // Adjust non-bar elements for ordinal scales
            if (series.type !== 'Bar') {
              if (xAxis.type === 'ordinal') {
                d.x += xAxis.tickOffset;
              }
              if (yAxis.type === 'ordinal') {
                d.y += yAxis.tickOffset;
              }
            }

            // Set the default focus point
            d.focus = {
              x: d.x,
              y: d.y

              // Adjust the focus point for specific elements
            };if (series.type === 'Bar') {
              if (!xAxis.vertical) {
                d.focus.x = d.x + xAxis.tickOffset;
              }
              if (!yAxis.vertical) {
                d.focus.y = d.y + yAxis.tickOffset;
              }
            }
          } else if (series.type === 'Pie') {
            // data for Radial charts
            d.focus = primaryAxis.scale(d);
            d.x = d.focus.x;
            d.y = d.focus.y;
          }
        });
      });

      // Not we need to precalculate all of the possible status styles by
      // calling the seemingly 'live' getStyles, and getDataStyles callbacks ;)
      stackData.forEach(function (series) {
        var defaults = series.type !== 'Pie' ? {
          // Pass some sane defaults
          color: defaultColors[series.index % (defaultColors.length - 1)]
        } : {};

        series.statusStyles = _Utils2.default.getStatusStyles(series, getStyles, defaults);

        // We also need to decorate each datum in the same fashion
        series.data.forEach(function (datum) {
          if (series.type === 'Pie') {
            defaults.color = defaultColors[datum.index % (defaultColors.length - 1)];
          }
          datum.statusStyles = _Utils2.default.getStatusStyles(datum, getDataStyles, _extends({}, defaults, series.statusStyles.default));
        });
      });

      var allPoints = [];

      stackData.forEach(function (s) {
        s.data.forEach(function (d) {
          allPoints.push(d);
        });
      });

      var quadTree = (0, _d3Quadtree.quadtree)().x(function (d) {
        return d.x;
      }).y(function (d) {
        return d.y;
      }).addAll(allPoints);

      this.props.dispatch(function (state) {
        return _extends({}, state, {
          stackData: stackData,
          quadTree: quadTree
        });
      }, {
        type: 'stackData'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          type = _props.type,
          getStyles = _props.getStyles,
          getDataStyles = _props.getDataStyles,
          rest = _objectWithoutProperties(_props, ['type', 'getStyles', 'getDataStyles']);

      var stackData = this.stackData;


      if (!stackData) {
        return null;
      }

      return _react2.default.createElement(
        _reactMove.Transition,
        {
          data: stackData // The stack is reversed for proper z-index painting
          , getKey: function getKey(d, i) {
            return d.id;
          },
          update: function update(d) {
            return {
              visibility: 1
            };
          },
          enter: function enter(d, i) {
            return {
              visibility: 0
            };
          },
          leave: function leave(d) {
            return {
              visibility: 0
            };
          },
          ignore: ['visibility'],
          duration: 500
        },
        function (inters) {
          return _react2.default.createElement(
            'g',
            { className: 'Series' },
            inters.map(function (inter, i) {
              var StackCmp = getType(type, inter.data, inter.data.id);
              return _react2.default.createElement(StackCmp, _extends({}, rest, {
                key: inter.key,
                series: inter.data,
                stackData: stackData,
                visibility: inter.state.visibility
              }));
            })
          );
        }
      );
    }
  }]);

  return Series;
}(_react.PureComponent);

Series.defaultProps = {
  getStyles: function getStyles(d) {
    return {};
  },
  getDataStyles: function getDataStyles(d) {
    return {};
  }
};
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    secondaryAxis: _Selectors2.default.secondaryAxis()
  };
  return function (state, props) {
    return {
      materializedData: state.materializedData,
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      hovered: state.hovered,
      selected: state.selected
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(Series);

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _reactMove = __webpack_require__(2);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


//

var fontSize = 12;

var Tooltip = function (_PureComponent) {
  _inherits(Tooltip, _PureComponent);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          hovered = _props.hovered,
          primaryAxis = _props.primaryAxis,
          secondaryAxis = _props.secondaryAxis,
          _props$offset = _props.offset,
          left = _props$offset.left,
          top = _props$offset.top,
          gridX = _props.gridX,
          gridY = _props.gridY,
          cursor = _props.cursor,
          position = _props.position,
          align = _props.align,
          children = _props.children;


      if (!primaryAxis || !secondaryAxis || !hovered || !cursor) {
        return null;
      }

      var datums = hovered.datums && hovered.datums.length ? hovered.datums : hovered.series ? hovered.series.data : null;

      // TODO: tooltip origin: hovered or chart or custom. Allows the user to position the tooltip relative to different parts of the chart
      // TODO: tooltip hardcoded offset and/or dynamic offset based on target element

      var focus = datums ? typeof position === 'function' ? position(datums, cursor) : position === 'left' ? _Utils2.default.getCenterPointOfSide('left', datums) : position === 'right' ? _Utils2.default.getCenterPointOfSide('right', datums) : position === 'top' ? _Utils2.default.getCenterPointOfSide('top', datums) : position === 'bottom' ? _Utils2.default.getCenterPointOfSide('bottom', datums) : position === 'center' ? _Utils2.default.getCenterPointOfSide('center', datums) : position === 'cursor' ? cursor : _Utils2.default.getClosestPoint(cursor, datums).focus // : quadTree.find(cursor.x, cursor.y)
      : {
        x: gridX,
        y: gridY
      };

      var x = gridX + focus.x;
      var y = gridY + focus.y;

      var alignX = void 0;
      var alignY = void 0;

      var triangleStyles = {};

      if (align === 'top') {
        alignX = '-50%';
        alignY = '-100%';
        triangleStyles = {
          top: '100%',
          left: '50%',
          transform: 'translate(-50%, 0%)',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '5px solid rgba(38, 38, 38, 0.8)'
        };
      } else if (align === 'bottom') {
        alignX = '-50%';
        alignY = '0%';
        triangleStyles = {
          top: '0%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '5px solid rgba(38, 38, 38, 0.8)'
        };
      } else if (align === 'left') {
        alignX = '-100%';
        alignY = '-50%';
        triangleStyles = {
          top: '50%',
          left: '100%',
          transform: 'translate(0%, -50%)',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderLeft: '5px solid rgba(38, 38, 38, 0.8)'
        };
      } else if (align === 'right') {
        alignX = '0%';
        alignY = '-50%';
        triangleStyles = {
          top: '50%',
          left: '0%',
          transform: 'translate(-100%, -50%)',
          borderTop: '5px solid transparent',
          borderBottom: '5px solid transparent',
          borderRight: '5px solid rgba(38, 38, 38, 0.8)'
        };
      } else if (align === 'center') {
        // TODO: Automatic Mode
        alignX = '-50%';
        alignY = '-50%';
        triangleStyles = {
          opacity: 0
        };
      }

      var visibility = hovered.active ? 1 : 0;

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: {
            x: x,
            y: y,
            alignX: alignX,
            alignY: alignY,
            triangleStyles: triangleStyles,
            visibility: visibility
          },
          duration: 400
        },
        function (_ref) {
          var x = _ref.x,
              y = _ref.y,
              alignX = _ref.alignX,
              alignY = _ref.alignY,
              triangleStyles = _ref.triangleStyles,
              visibility = _ref.visibility;
          return _react2.default.createElement(
            'div',
            {
              className: 'tooltip-wrap',
              style: {
                pointerEvents: 'none',
                position: 'absolute',
                left: left + 'px',
                top: top + 'px',
                opacity: visibility
              }
            },
            _react2.default.createElement(
              'div',
              {
                style: {
                  transform: 'translate3d(' + x + 'px, ' + y + 'px, 0px)'
                }
              },
              _react2.default.createElement(
                'div',
                {
                  style: {
                    transform: 'translate3d(' + alignX + ', ' + alignY + ', 0)',
                    padding: '7px'
                  }
                },
                _react2.default.createElement(
                  'div',
                  {
                    style: {
                      fontSize: fontSize + 'px',
                      padding: '5px',
                      background: 'rgba(38, 38, 38, 0.8)',
                      color: 'white',
                      borderRadius: '3px',
                      position: 'relative'
                    }
                  },
                  children(_extends({}, hovered, {
                    primaryAxis: primaryAxis,
                    secondaryAxis: secondaryAxis
                  })),
                  _react2.default.createElement('div', {
                    style: _extends({
                      position: 'absolute',
                      width: '0',
                      height: '0'
                    }, triangleStyles)
                  })
                )
              )
            )
          );
        }
      );
    }
  }]);

  return Tooltip;
}(_react.PureComponent);

Tooltip.defaultProps = {
  position: 'average',
  align: 'top',
  children: function children(props) {
    var series = props.series,
        datums = props.datums,
        primaryAxis = props.primaryAxis,
        secondaryAxis = props.secondaryAxis;

    return series ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'strong',
        null,
        series.label
      ),
      _react2.default.createElement('br', null)
    ) : datums && datums.length ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        {
          style: {
            marginBottom: '3px'
          }
        },
        _react2.default.createElement(
          'strong',
          null,
          primaryAxis.format(datums[0].primary)
        )
      ),
      _react2.default.createElement(
        'table',
        null,
        _react2.default.createElement(
          'tbody',
          null,
          (secondaryAxis.stacked ? [].concat(_toConsumableArray(datums)).reverse() : datums).map(function (d, i) {
            return _react2.default.createElement(
              'tr',
              { key: i },
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'span',
                  { style: { color: d.statusStyles.hovered.fill } },
                  '\u25CF'
                ),
                ' ',
                d.seriesLabel,
                ': \xA0'
              ),
              _react2.default.createElement(
                'td',
                {
                  style: {
                    textAlign: 'right'
                  }
                },
                Math.floor(d.secondary) < d.secondary ? secondaryAxis.format(Math.round(d.secondary * 100) / 100) : secondaryAxis.format(d.secondary)
              )
            );
          })
        )
      )
    ) : null;
  }
};
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    secondaryAxis: _Selectors2.default.secondaryAxis(),
    gridX: _Selectors2.default.gridX(),
    gridY: _Selectors2.default.gridY(),
    offset: _Selectors2.default.offset()
  };
  return function (state) {
    return {
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      gridX: selectors.gridX(state),
      gridY: selectors.gridY(state),
      hovered: state.hovered,
      cursor: state.cursor,
      offset: selectors.offset(state),
      quadTree: state.quadTree
    };
  };
}, {
  statics: {
    isHTML: true
  }
})(Tooltip);

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = measure;

var _AxisLinear = __webpack_require__(42);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fontSize = 10;

var getPixel = function getPixel(d) {
  return d;
};
var radiansToDegrees = function radiansToDegrees(r) {
  return r * (180 / Math.PI);
};

function measure(isRotation) {
  // Measure finds the amount of overflow this axis produces and
  // updates the margins to ensure that the axis is visibility
  // Unfortunately, this currently happens after a render, but potentially
  // could happen pre-render if we could reliably predict the size of the
  // labels before they render. Considering that ticks could be anything,
  // even a react component, this could get very tough.
  var _props = this.props,
      axis = _props.axis,
      tickSizeInner = _props.tickSizeInner,
      tickSizeOuter = _props.tickSizeOuter,
      tickPadding = _props.tickPadding,
      maxLabelRotation = _props.maxLabelRotation,
      position = _props.position,
      dispatch = _props.dispatch;
  var rotation = this.state.rotation;
  var visibleLabelStep = this.visibleLabelStep;


  if (!this.el) {
    return;
  }

  var isHorizontal = position === _AxisLinear.positionTop || position === _AxisLinear.positionBottom;
  var labelDims = Array.apply(undefined, _toConsumableArray(this.el.querySelectorAll('.tick.-measureable text'))).map(function (el) {
    var bbox = el.getBoundingClientRect();
    var obj = {};
    for (var key in bbox) {
      obj[key] = bbox[key];
    }
    return obj;
  });

  var smallestTickGap = 10000; // This is just a ridiculously large tick spacing that would never happen (hopefully)
  // If the axis is horizontal, we need to determine any necessary rotation and tick skipping
  if (isHorizontal) {
    var tickDims = Array.apply(undefined, _toConsumableArray(this.el.querySelectorAll('.tick.-measureable'))).map(function (el) {
      return el.getBoundingClientRect();
    });
    tickDims.reduce(function (prev, current) {
      if (prev) {
        var gap = current.left - prev.left;
        smallestTickGap = gap < smallestTickGap ? gap : smallestTickGap;
      }
      return current;
    }, false);
    var largestLabel = labelDims.reduce(function (prev, current) {
      current._overflow = current.width - smallestTickGap;
      if (current._overflow > 0 && current._overflow > prev._overflow) {
        return current;
      }
      return prev;
    }, _extends({}, labelDims[0], { _overflow: 0 }));

    // Determine axis rotation before we measure
    if (isRotation) {
      var newRotation = Math.min(Math.max(Math.abs(radiansToDegrees(Math.acos((smallestTickGap + fontSize / 2) / largestLabel.width))), 0), maxLabelRotation);

      newRotation = isNaN(newRotation) ? 0 : Math.round(newRotation);
      if (Math.abs(rotation - newRotation) > 20) {
        this.setState({
          rotation: axis.position === 'top' ? -newRotation : newRotation
        });
      }
      return;
    }
  }

  var newVisibleLabelStep = Math.ceil(fontSize / smallestTickGap);

  if (visibleLabelStep !== newVisibleLabelStep) {
    this.visibleLabelStep = newVisibleLabelStep;
  }

  if (!labelDims.length || labelDims.length !== this.ticks.length) {
    return false;
  }

  var width = 0;
  var height = 0;
  var top = 0;
  var bottom = 0;
  var left = 0;
  var right = 0;

  if (isHorizontal) {
    // Add width overflow from the first and last ticks
    left = Math.ceil(getPixel(labelDims[0].width) / 2);
    right = Math.ceil(getPixel(labelDims[labelDims.length - 1].width) / 2);
    height = Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
    tickPadding + // Add tick padding
    Math.max.apply(Math, _toConsumableArray(labelDims.map(function (d) {
      return Math.ceil(getPixel(d.height));
    }))); // Add the height of the largest label
  } else {
    // Add height overflow from the first and last ticks
    top = Math.ceil(getPixel(labelDims[0].height) / 2);
    bottom = Math.ceil(getPixel(labelDims[labelDims.length - 1].height) / 2);
    width = Math.max(tickSizeInner, tickSizeOuter) + // Add tick size
    tickPadding + // Add tick padding
    Math.max.apply(Math, _toConsumableArray(labelDims.map(function (d) {
      return Math.ceil(getPixel(d.width));
    }))); // Add the width of the largest label
  }

  dispatch(function (state) {
    return _extends({}, state, {
      axisDimensions: _extends({}, state.axisDimensions, _defineProperty({}, position, {
        width: width,
        height: height,
        top: top,
        bottom: bottom,
        left: left,
        right: right
      }))
    });
  }, {
    type: 'axisDimensions'
  });

  return true;
}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = updateScale;

var _d3Scale = __webpack_require__(215);

var _AxisLinear = __webpack_require__(42);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
//


var scales = {
  linear: _d3Scale.scaleLinear,
  log: _d3Scale.scaleLog,
  time: _d3Scale.scaleTime,
  ordinal: _d3Scale.scaleBand
};

var detectVertical = function detectVertical(position) {
  return [_AxisLinear.positionLeft, _AxisLinear.positionRight].indexOf(position) > -1;
};
var detectRTL = function detectRTL(position) {
  return [_AxisLinear.positionTop, _AxisLinear.positionRight].indexOf(position) > -1;
};

function updateScale(props) {
  var id = props.id,
      type = props.type,
      position = props.position,
      invert = props.invert,
      primary = props.primary,
      stacked = props.stacked,
      innerPadding = props.innerPadding,
      outerPadding = props.outerPadding,
      tickArguments = props.tickArguments,
      tickValues = props.tickValues,
      tickFormat = props.tickFormat,
      tickPadding = props.tickPadding,
      tickSizeInner = props.tickSizeInner,
      base = props.base,
      defaultMin = props.min,
      defaultMax = props.max,
      hardMin = props.hardMin,
      hardMax = props.hardMax,
      materializedData = props.materializedData,
      width = props.width,
      height = props.height,
      primaryAxis = props.primaryAxis;

  // We need the data to proceed

  if (!materializedData) {
    return;
  }

  // If this axis is secondary, we need the primaryAxis to proceed
  if (!primary && !primaryAxis) {
    return;
  }

  // Detect some settings
  var valueKey = primary ? 'primary' : 'secondary';
  var groupKey = !primary && 'primary';
  var vertical = detectVertical(position);
  var RTL = primary && detectRTL(position); // Right to left OR top to bottom

  // TODO: Any sorting needs to happen here, else the min/max's might not line up correctly

  // First we need to find unique values, min/max values and negative/positive totals
  var uniqueVals = [];
  var min = void 0;
  var max = void 0;
  var datumValues = {};
  var negativeTotal = 0;
  var positiveTotal = 0;
  var domain = void 0;

  if (type === 'ordinal') {
    materializedData.forEach(function (series) {
      var seriesValues = series.data.map(function (d) {
        return d[valueKey];
      });
      seriesValues.forEach(function (d) {
        if (uniqueVals.indexOf(d) === -1) {
          uniqueVals.push(d);
        }
      });
    });
    domain = uniqueVals;
  } else if (type === 'time') {
    materializedData.forEach(function (series) {
      var seriesValues = series.data.map(function (d) {
        return +d[valueKey];
      });
      seriesValues.forEach(function (d, i) {
        var key = groupKey ? series.data[i][groupKey] : i;
        datumValues[key] = [].concat(_toConsumableArray(datumValues[key] || []), [d]);
      });
      min = Math.min.apply(Math, _toConsumableArray(typeof min !== 'undefined' ? [min] : []).concat(_toConsumableArray(seriesValues)));
      max = Math.max.apply(Math, _toConsumableArray(typeof max !== 'undefined' ? [max] : []).concat(_toConsumableArray(seriesValues)));
    });
    domain = [min, max];
  } else {
    materializedData.forEach(function (series) {
      var seriesValues = series.data.map(function (d) {
        return d[valueKey];
      });
      seriesValues.forEach(function (d, i) {
        var key = groupKey ? series.data[i][groupKey] : i;
        datumValues[key] = [].concat(_toConsumableArray(datumValues[key] || []), [d]);
      });
      seriesValues = seriesValues.filter(function (d) {
        return typeof d === 'number';
      });
      min = Math.min.apply(Math, _toConsumableArray(typeof min === 'number' ? [min] : []).concat(_toConsumableArray(seriesValues)));
      max = Math.max.apply(Math, _toConsumableArray(typeof max === 'number' ? [max] : []).concat(_toConsumableArray(seriesValues)));
    });
    if (stacked) {
      // If we're stacking, calculate and use the max and min values for the largest stack
      ;
      var _Object$keys$map$redu = Object.keys(datumValues).map(function (d) {
        return datumValues[d];
      }).reduce(function (totals, vals) {
        var positive = vals.filter(function (d) {
          return d >= 0;
        }).reduce(function (ds, d) {
          return ds + d;
        }, 0);
        var negative = vals.filter(function (d) {
          return d < 0;
        }).reduce(function (ds, d) {
          return ds + d;
        }, 0);
        return [positive > totals[0] ? positive : totals[0], negative < totals[1] ? negative : totals[1]];
      }, [0, 0]);

      var _Object$keys$map$redu2 = _slicedToArray(_Object$keys$map$redu, 2);

      positiveTotal = _Object$keys$map$redu2[0];
      negativeTotal = _Object$keys$map$redu2[1];

      domain = [negativeTotal, positiveTotal];
    } else {
      // If we're not stacking, use the min and max values
      domain = [min, max];
    }
  }

  // Now we need to figure out the range
  var range = vertical ? [height, 0] // If the axis is inverted, swap the range, too
  : [0, width];

  if (!primary) {
    // Secondary axes are usually dependent on primary axes for orientation, so if the
    // primaryAxis is in RTL mode, we need to reverse the range on this secondary axis
    // to match the origin of the primary axis
    if (primaryAxis.RTL) {
      range = [].concat(_toConsumableArray(range)).reverse();
    }
  }

  // Give the scale a home
  var scale = void 0;

  // If this is an ordinal or other primary axis, it needs to be able to display bars.
  var bandScale = void 0;
  var barSize = 1;
  var stepSize = 0;

  if (type === 'ordinal' || primary) {
    // Calculate a band axis that is similar and pass down the bandwidth
    // just in case.
    bandScale = (0, _d3Scale.scaleBand)().domain(materializedData.reduce(function (prev, current) {
      return current.data.length > prev.length ? current.data : prev;
    }, []).map(function (d) {
      return d.primary;
    })).rangeRound(range, 0.1).padding(0);

    if (type === 'ordinal') {
      bandScale.paddingOuter(outerPadding).paddingInner(innerPadding);
      barSize = bandScale.bandwidth();
    } else {
      barSize = bandScale.bandwidth();
    }

    stepSize = bandScale.step();
  }

  if (type === 'ordinal') {
    // If it's ordinal, just assign the bandScale we made
    scale = bandScale;
  } else {
    // Otherwise, create a new scale of the appropriate type
    scale = scales[type]();
  }

  // Set base, min, and max
  if (typeof base === 'number') {
    domain[0] = Math.min(domain[0], base);
    domain[1] = Math.max(domain[1], base);
  }
  if (typeof defaultMin === 'number') {
    domain[0] = Math.min(domain[0], defaultMin);
  }
  if (typeof defaultMax === 'number') {
    domain[1] = Math.max(domain[1], defaultMax);
  }

  // Set the domain
  scale.domain(domain);

  // If we're not using an ordinal scale, round the ticks to "nice" values
  if (type !== 'ordinal') {
    scale.nice();
  }

  // If hard min and max are set, override any "nice" rounding values
  if (typeof hardMin === 'number') {
    scale.domain([hardMin, scale.domain()[1]]);
  }
  if (typeof hardMax === 'number') {
    scale.domain([scale.domain()[0], hardMax]);
  }

  // Invert if necessary
  if (invert) {
    scale.domain([].concat(_toConsumableArray(scale.domain())).reverse());
  }

  // Now set the range
  scale.range(range);

  // Pass down the axis config (including the scale itself) for posterity
  var axis = {
    type: type,
    scale: scale,
    uniqueVals: uniqueVals,
    primary: primary,
    invert: invert,
    vertical: vertical,
    RTL: RTL,
    position: position,
    stacked: stacked,
    barSize: barSize,
    stepSize: stepSize,
    domain: domain,
    range: range,
    max: position === _AxisLinear.positionBottom ? -height : position === _AxisLinear.positionLeft ? width : position === _AxisLinear.positionTop ? height : -width,
    directionMultiplier: position === _AxisLinear.positionTop || position === _AxisLinear.positionLeft ? -1 : 1,
    transform: !vertical ? translateX : translateY,
    ticks: this.ticks = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues,
    format: tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity : tickFormat,
    spacing: Math.max(tickSizeInner, 0) + tickPadding
  };

  if (type === 'ordinal') {
    axis.gridOffset = -(axis.stepSize * innerPadding) / 2;
    axis.tickOffset = axis.barSize / 2;
    axis.barOffset = 0;
  } else {
    axis.tickOffset = 0;
    axis.barOffset = -axis.barSize / 2;
  }

  // Make sure we start with a prevAxis
  this.prevAxis = this.prevAxis || axis;

  this.props.dispatch(function (state) {
    return _extends({}, state, {
      axes: _extends({}, state.axes, _defineProperty({}, id, axis))
    });
  }, {
    type: 'axisUpdateScale'
  });
}

function identity(x) {
  return x;
}

function translateX(x) {
  return 'translate(' + x + ', 0)';
}

function translateY(y) {
  return 'translate(0, ' + y + ')';
}

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.positionLeft = exports.positionBottom = exports.positionRight = exports.positionTop = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _reactState = __webpack_require__(4);

var _d3Shape = __webpack_require__(17);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


// const fontSize = 10

var positionTop = exports.positionTop = 'top';
var positionRight = exports.positionRight = 'right';
var positionBottom = exports.positionBottom = 'bottom';
var positionLeft = exports.positionLeft = 'left';

var AxisPie = function (_PureComponent) {
  _inherits(AxisPie, _PureComponent);

  // Lifecycle
  function AxisPie() {
    _classCallCheck(this, AxisPie);

    // this.measure = measure.bind(this)
    var _this = _possibleConstructorReturn(this, (AxisPie.__proto__ || Object.getPrototypeOf(AxisPie)).call(this));

    _this.updateScale = _this.updateScale.bind(_this);
    return _this;
  }

  _createClass(AxisPie, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var oldProps = this.props;

      // If any of the following change,
      // we need to update the axis
      if (newProps.materializedData !== oldProps.materializedData || newProps.height !== oldProps.height || newProps.width !== oldProps.width) {
        this.updateScale(newProps);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateScale(this.props);
      // this.measure()
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(newProps) {
      if (newProps.axis !== this.props.axis) {
        return true;
      }
      return false;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // RAF(() => {
      //   if (!this.measure()) {
      //     window.setTimeout(() => this.componentDidUpdate(), 1)
      //   }
      // })
    }
  }, {
    key: 'updateScale',
    value: function updateScale(props) {
      var type = props.type,
          id = props.id,
          materializedData = props.materializedData,
          cutoutPercentage = props.cutoutPercentage,
          width = props.width,
          height = props.height,
          dispatch = props.dispatch,
          outerPadding = props.outerPadding,
          cornerRadius = props.cornerRadius,
          arcPadding = props.arcPadding,
          seriesPadding = props.seriesPadding;
      // We need the data to proceed

      if (!materializedData) {
        return;
      }

      var midX = width / 2;
      var midY = height / 2;
      var radius = Math.min(midX, midY) - outerPadding;

      var outerRadius = radius;
      var innerRadius = radius * cutoutPercentage;
      var totalRadius = outerRadius - innerRadius;
      var seriesRadius = totalRadius / materializedData.length;
      var arcPaddingRadius = outerRadius * arcPadding * 20;
      var seriesPaddingRadius = totalRadius * seriesPadding / 2.5;
      var padAngle = 0.01;

      var data = materializedData.map(function (series) {
        var seriesInnerRadius = innerRadius + seriesRadius * series.index;
        var seriesOuterRadius = seriesRadius + seriesInnerRadius;
        var preData = series.data.map(function (d) {
          return {
            x: d.primary,
            y: d.secondary
          };
        });
        var pie = (0, _d3Shape.pie)().sort(null).padAngle(padAngle).value(function (d) {
          return d.y;
        });
        var pieData = pie(preData);
        return pieData.map(function (d) {
          var arcData = {
            startAngle: d.startAngle,
            endAngle: d.endAngle,
            padAngle: d.padAngle,
            padRadius: arcPaddingRadius,
            innerRadius: seriesInnerRadius + seriesPaddingRadius,
            outerRadius: seriesOuterRadius,
            cornerRadius: cornerRadius
            // Calculate the arc for the centroid
          };var arc = (0, _d3Shape.arc)().startAngle(arcData.startAngle).endAngle(arcData.endAngle).padAngle(arcData.padAngle).padRadius(arcPaddingRadius).innerRadius(seriesInnerRadius + seriesPaddingRadius).outerRadius(seriesOuterRadius).cornerRadius(cornerRadius);
          var centroid = arc.centroid();
          return {
            x: centroid[0] + midX,
            y: centroid[1] + midY
          };
        });
      });

      var primaryScale = function primaryScale(d) {
        return data[d.seriesIndex] ? data[d.seriesIndex][d.index] ? data[d.seriesIndex][d.index] : 0 : 0;
      };
      var secondaryScale = function secondaryScale(d) {
        return data[d.seriesIndex] ? data[d.seriesIndex][d.index] ? data[d.seriesIndex][d.index] : 0 : 0;
      };
      primaryScale.range = function () {
        return [0, width];
      };
      secondaryScale.range = function () {
        return [height, 0];
      };

      var primaryAxis = {
        id: id,
        scale: primaryScale,
        cutoutPercentage: cutoutPercentage,
        type: type,
        primary: true,
        format: function format(d) {
          return d;
        },
        width: width,
        height: height,
        radius: radius,
        cornerRadius: cornerRadius,
        arcPadding: arcPadding,
        seriesPadding: seriesPadding,
        outerRadius: outerRadius,
        innerRadius: innerRadius,
        totalRadius: totalRadius,
        seriesRadius: seriesRadius,
        arcPaddingRadius: arcPaddingRadius,
        seriesPaddingRadius: seriesPaddingRadius,
        padAngle: padAngle
      };

      var secondaryAxis = {
        id: id,
        scale: secondaryScale,
        format: function format(d) {
          return d;
        },
        type: type
      };

      dispatch(function (state) {
        return _extends({}, state, {
          axes: {
            pie_primary: primaryAxis,
            pie_secondary: secondaryAxis
          }
        });
      }, {
        type: 'axisUpdateScale'
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // TODO: This is where permanent labels and lines will be drawn
      return null;
    }
  }]);

  return AxisPie;
}(_react.PureComponent);

AxisPie.defaultProps = {
  tickArguments: [],
  tickValues: null,
  tickFormat: null,
  tickSizeInner: 6,
  tickSizeOuter: 6,
  tickPadding: 3,
  cutoutPercentage: 0.5,
  outerPadding: 10,
  cornerRadius: 1,
  arcPadding: 0.2,
  seriesPadding: 0.2 };
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    gridWidth: _Selectors2.default.gridWidth(),
    gridHeight: _Selectors2.default.gridHeight()
  };
  return function (state, props) {
    return {
      materializedData: state.materializedData,
      width: selectors.gridWidth(state),
      height: selectors.gridHeight(state)
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(AxisPie);

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactState = __webpack_require__(4);

var _d3Voronoi = __webpack_require__(272);

var _d3Shape = __webpack_require__(17);

var _Path = __webpack_require__(19);

var _Path2 = _interopRequireDefault(_Path);

var _Selectors = __webpack_require__(6);

var _Selectors2 = _interopRequireDefault(_Selectors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var noop = function noop() {
  return null;
};

var modeClosestSeries = 'closestSeries';
var modeClosestPoint = 'closestPoint';
var modeAxis = 'axis';

var Interaction = function (_PureComponent) {
  _inherits(Interaction, _PureComponent);

  function Interaction() {
    _classCallCheck(this, Interaction);

    var _this = _possibleConstructorReturn(this, (Interaction.__proto__ || Object.getPrototypeOf(Interaction)).call(this));

    _this.onHover = _this.onHover.bind(_this);
    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  _createClass(Interaction, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          interaction = _props.interaction,
          stackData = _props.stackData,
          primaryAxis = _props.primaryAxis,
          secondaryAxis = _props.secondaryAxis;

      // Don't render until we have all dependencies

      if (!stackData || !primaryAxis || !secondaryAxis) {
        return null;
      }

      var xScale = primaryAxis.vertical ? secondaryAxis : primaryAxis;
      var yScale = primaryAxis.vertical ? primaryAxis : secondaryAxis;

      var extent = [[xScale.scale.range()[0], yScale.scale.range()[1]], [xScale.scale.range()[1], yScale.scale.range()[0]]];
      var lineFn = (0, _d3Shape.line)();

      var polygons = void 0;

      if (interaction === modeClosestSeries) {
        // Closest Point Voronoi
        var voronoiData = stackData.reduce(function (prev, now) {
          return prev.concat(now.data);
        }, []).map(function (d) {
          return {
            x: d.focus.x,
            y: d.focus.y,
            series: stackData[d.seriesIndex],
            datums: null,
            single: false
          };
        }).filter(function (d) {
          return typeof d.x === 'number' && typeof d.y === 'number';
        });
        var vor = (0, _d3Voronoi.voronoi)().x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).extent(extent)(voronoiData);
        polygons = vor.polygons();
      } else if (interaction === modeClosestPoint) {
        // Closest Point Voronoi
        var _voronoiData = stackData.reduce(function (prev, now) {
          return prev.concat(now.data);
        }, []).map(function (d) {
          return {
            x: d.focus.x,
            y: d.focus.y,
            series: null,
            datums: [d],
            single: true
          };
        }).filter(function (d) {
          return typeof d.x === 'number' && typeof d.y === 'number';
        });
        var _vor = (0, _d3Voronoi.voronoi)().x(function (d) {
          return d.x;
        }).y(function (d) {
          return d.y;
        }).extent(extent)(_voronoiData);
        polygons = _vor.polygons();
      } else if (interaction === modeAxis) {
        // Axis Voronoi
        // Group all data points based on primaryAxis
        var allDatums = stackData.reduce(function (prev, now) {
          return prev.concat(now.data);
        }, []);
        var datumsByAxis = {};
        allDatums.forEach(function (d) {
          var key = String(d.primary);
          datumsByAxis[key] = datumsByAxis[key] || {
            x: d.focus.x,
            y: d.focus.y,
            series: null, // AxisAxis can't be the series, so don't send it
            datums: [],
            single: false
          };
          datumsByAxis[key].datums.push(d);
        });
        var _voronoiData2 = Object.keys(datumsByAxis).map(function (d) {
          return datumsByAxis[d];
        });
        var _vor2 = (0, _d3Voronoi.voronoi)().x(function (d) {
          return primaryAxis.vertical ? 0 : d.x;
        }).y(function (d) {
          return primaryAxis.vertical ? d.y : 0;
        }).extent(extent)(_voronoiData2);
        polygons = _vor2.polygons();
      } else {
        return null;
      }

      // Series and Element interactions modes are handled by the
      // elements themselves, so do nothing for them here.

      return _react2.default.createElement(
        'g',
        { className: 'Interaction', onMouseLeave: function onMouseLeave() {
            return _this2.onHover(null, null);
          } },
        !!polygons && polygons.map(function (points, i) {
          // Only draw the voronoi if we need it
          var path = lineFn(points);
          return _react2.default.createElement(_Path2.default, {
            key: i,
            d: path,
            className: 'action-voronoi',
            onMouseEnter: function onMouseEnter(e) {
              return _this2.onHover(points.data.series, points.data.datums);
            },
            onClick: function onClick(e) {
              return _this2.onClick(points.data.series, points.data.datums);
            },
            style: {
              fill: 'rgba(0,0,0,.2)',
              strokeWidth: 5,
              stroke: 'rgba(255,255,255,.5)',
              opacity: 0
            }
          });
        })
      );
    }
  }, {
    key: 'onHover',
    value: function onHover(series, datums) {
      // activate the hover with any series or datums
      if (series || datums) {
        return this.props.dispatch(function (state) {
          return _extends({}, state, {
            hovered: {
              active: true,
              series: series,
              datums: datums
            }
          });
        }, {
          type: 'hoveredVoronoi'
        });
      }
      // If we just left the area, deactive the hover
      return this.props.dispatch(function (state) {
        return _extends({}, state, {
          hovered: _extends({}, state.hovered, {
            active: false
          })
        });
      }, {
        type: 'hoveredVoronoi'
      });
    }
  }, {
    key: 'onClick',
    value: function onClick(series, datums) {
      if (series || datums) {
        return this.props.dispatch(function (state) {
          return _extends({}, state, {
            selected: {
              active: true,
              series: series,
              datums: datums
            }
          });
        }, {
          type: 'selectedVoronoi'
        });
      }
    }
  }]);

  return Interaction;
}(_react.PureComponent);

Interaction.defaultProps = {
  onHover: noop,
  onActivate: noop
};
exports.default = (0, _reactState.Connect)(function () {
  var selectors = {
    primaryAxis: _Selectors2.default.primaryAxis(),
    secondaryAxis: _Selectors2.default.secondaryAxis()
  };
  return function (state) {
    return {
      stackData: state.stackData,
      primaryAxis: selectors.primaryAxis(state),
      secondaryAxis: selectors.secondaryAxis(state),
      interaction: state.interaction
    };
  };
}, {
  filter: function filter(oldState, newState, meta) {
    return meta.type !== 'cursor';
  }
})(Interaction);

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Chart = __webpack_require__(131);

var _Chart2 = _interopRequireDefault(_Chart);

var _Axis = __webpack_require__(127);

var _Axis2 = _interopRequireDefault(_Axis);

var _Series = __webpack_require__(135);

var _Series2 = _interopRequireDefault(_Series);

var _Tooltip = __webpack_require__(136);

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Cursor = __webpack_require__(132);

var _Cursor2 = _interopRequireDefault(_Cursor);

var _Brush = __webpack_require__(129);

var _Brush2 = _interopRequireDefault(_Brush);

var _Line = __webpack_require__(133);

var _Line2 = _interopRequireDefault(_Line);

var _Area = __webpack_require__(126);

var _Area2 = _interopRequireDefault(_Area);

var _Bar = __webpack_require__(128);

var _Bar2 = _interopRequireDefault(_Bar);

var _Bubble = __webpack_require__(130);

var _Bubble2 = _interopRequireDefault(_Bubble);

var _Pie = __webpack_require__(134);

var _Pie2 = _interopRequireDefault(_Pie);

var _Curves = __webpack_require__(41);

var _Curves2 = _interopRequireDefault(_Curves);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// types
// Components
module.exports = {
  // Components
  Chart: _Chart2.default,
  Axis: _Axis2.default,
  Series: _Series2.default,
  Tooltip: _Tooltip2.default,
  Cursor: _Cursor2.default,
  Brush: _Brush2.default,
  // Types
  Line: _Line2.default,
  Area: _Area2.default,
  Bar: _Bar2.default,
  Bubble: _Bubble2.default,
  Pie: _Pie2.default,
  // Utils
  Curves: _Curves2.default
};
// Utils

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var defaultStyle = {
  strokeWidth: 1,
  stroke: 'black',
  fill: 'transparent',
  opacity: 1
};

var Line = function (_PureComponent) {
  _inherits(Line, _PureComponent);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
  }

  _createClass(Line, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['style']);

      var resolvedStyle = _extends({}, defaultStyle, style);

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: _extends({}, resolvedStyle)
        },
        function (inter) {
          return _react2.default.createElement('line', _extends({}, inter, rest));
        }
      );
    }
  }]);

  return Line;
}(_react.PureComponent);

exports.default = Line;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactMove = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//

var defaultStyle = {
  fontFamily: 'Helvetica',
  stroke: 'none',
  fill: 'black',
  fontSize: 10,
  opacity: 1
};

var Text = function (_PureComponent) {
  _inherits(Text, _PureComponent);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          style = _props.style,
          opacity = _props.opacity,
          rest = _objectWithoutProperties(_props, ['style', 'opacity']);

      var resolvedStyle = _extends({}, defaultStyle, style);

      return _react2.default.createElement(
        _reactMove.Animate,
        {
          data: resolvedStyle

        },
        function (inter) {
          return _react2.default.createElement('text', _extends({}, rest, {
            style: _extends({}, inter, {
              opacity: opacity * inter.opacity
            })
          }));
        }
      );
    }
  }]);

  return Text;
}(_react.PureComponent);

Text.defaultProps = {
  opacity: 1
};
exports.default = Text;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = HyperResponsive;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(280);

var _Utils = __webpack_require__(5);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


function HyperResponsive(WrappedComponent) {
  return function (_PureComponent) {
    _inherits(HyperResponsive, _PureComponent);

    function HyperResponsive() {
      _classCallCheck(this, HyperResponsive);

      var _this = _possibleConstructorReturn(this, (HyperResponsive.__proto__ || Object.getPrototypeOf(HyperResponsive)).call(this));

      _this.state = {
        ready: false,
        width: 0,
        height: 0
      };
      _this.resize = _this.resize.bind(_this);
      return _this;
    }

    _createClass(HyperResponsive, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.resize = _Utils2.default.throttle(this.resize, 16);
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (!this.resizeListener) {
          this.resizeListener = window.addResizeListener(this.el, this.resize);
        }
        this.resize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.resizeListener && window.removeResizeListener(this.el, this.resize);
      }
    }, {
      key: 'resize',
      value: function resize(e) {
        this.setState({
          ready: true,
          width: parseInt(window.getComputedStyle(this.el).width),
          height: parseInt(window.getComputedStyle(this.el).height)
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            style = _props.style,
            rest = _objectWithoutProperties(_props, ['style']);

        var _state = this.state,
            ready = _state.ready,
            width = _state.width,
            height = _state.height;

        return _react2.default.createElement(
          'div',
          {
            className: 'ResponsiveWrapper',
            ref: function ref(el) {
              _this2.el = el;
            },
            style: _extends({
              width: '100%',
              height: '100%'
            }, style)
          },
          ready && _react2.default.createElement(WrappedComponent, _extends({ width: width, height: height }, rest))
        );
      }
    }]);

    return HyperResponsive;
  }(_react.PureComponent);
}

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Memo;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Memo() {
  var getParams = function getParams() {
    for (var _len = arguments.length, subArgs = Array(_len), _key = 0; _key < _len; _key++) {
      subArgs[_key] = arguments[_key];
    }

    return subArgs;
  };
  var fn = arguments.length <= 0 ? undefined : arguments[0];
  if (arguments.length > 1) {
    getParams = arguments.length <= 0 ? undefined : arguments[0];
    fn = arguments.length <= 1 ? undefined : arguments[1];
  }
  var params = [];
  var value = void 0;

  return function () {
    for (var _len2 = arguments.length, p = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      p[_key2] = arguments[_key2];
    }

    var newParams = getParams.apply(undefined, p);
    var recompute = function recompute() {
      params = newParams;
      value = fn.apply(undefined, _toConsumableArray(params));
      return value;
    };

    if (newParams.length !== p.length) {
      return recompute();
    }

    for (var i = 0; i < newParams.length; i++) {
      if (newParams[i] !== p[i]) {
        return recompute();
      }
    }

    return value;
  };
}

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(38);

var emptyObject = __webpack_require__(116);
var _invariant = __webpack_require__(7);

if (process.env.NODE_ENV !== 'production') {
  var warning = __webpack_require__(10);
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (process.env.NODE_ENV !== 'production') {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (process.env.NODE_ENV !== 'production') {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (process.env.NODE_ENV !== 'production') {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (process.env.NODE_ENV !== 'production') {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (process.env.NODE_ENV !== 'production') {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (process.env.NODE_ENV !== 'production') {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (process.env.NODE_ENV !== 'production') {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pairs__ = __webpack_require__(73);


/* unused harmony default export */ var _unused_webpack_default_export = (function(values0, values1, reduce) {
  var n0 = values0.length,
      n1 = values1.length,
      values = new Array(n0 * n1),
      i0,
      i1,
      i,
      value0;

  if (reduce == null) reduce = __WEBPACK_IMPORTED_MODULE_0__pairs__["a" /* pair */];

  for (i0 = i = 0; i0 < n0; ++i0) {
    for (value0 = values0[i0], i1 = 0; i1 < n1; ++i1, ++i) {
      values[i] = reduce(value0, values1[i1]);
    }
  }

  return values;
});


/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});


/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bisect__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extent__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__identity__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__range__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ticks__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__threshold_sturges__ = __webpack_require__(75);









/* unused harmony default export */ var _unused_webpack_default_export = (function() {
  var value = __WEBPACK_IMPORTED_MODULE_4__identity__["a" /* default */],
      domain = __WEBPACK_IMPORTED_MODULE_3__extent__["a" /* default */],
      threshold = __WEBPACK_IMPORTED_MODULE_7__threshold_sturges__["a" /* default */];

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__ticks__["c" /* tickStep */])(x0, x1, tz);
      tz = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__range__["a" /* default */])(Math.ceil(x0 / tz) * tz, Math.floor(x1 / tz) * tz, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__bisect__["a" /* default */])(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["b" /* slice */].call(_)) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(_), histogram) : threshold;
  };

  return histogram;
});


/***/ }),
/* 151 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return x;
});


/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null && value > max) {
            max = value;
          }
        }
      }
    }
  }

  return max;
});


/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(21);


/* unused harmony default export */ var _unused_webpack_default_export = (function(values, valueof) {
  var n = values.length,
      m = n,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(values[i]))) sum += value;
      else --m;
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(valueof(values[i], i, values)))) sum += value;
      else --m;
    }
  }

  if (m) return sum / m;
});


/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__number__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__quantile__ = __webpack_require__(44);




/* unused harmony default export */ var _unused_webpack_default_export = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      numbers = [];

  if (valueof == null) {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__number__["a" /* default */])(values[i]))) {
        numbers.push(value);
      }
    }
  }

  else {
    while (++i < n) {
      if (!isNaN(value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__number__["a" /* default */])(valueof(values[i], i, values)))) {
        numbers.push(value);
      }
    }
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__quantile__["a" /* default */])(numbers.sort(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */]), 0.5);
});


/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(arrays) {
  var n = arrays.length,
      m,
      i = -1,
      j = 0,
      merged,
      array;

  while (++i < n) j += arrays[i].length;
  merged = new Array(j);

  while (--n >= 0) {
    array = arrays[n];
    m = array.length;
    while (--m >= 0) {
      merged[--j] = array[m];
    }
  }

  return merged;
});


/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(array, indexes) {
  var i = indexes.length, permutes = new Array(i);
  while (i--) permutes[i] = array[indexes[i]];
  return permutes;
});


/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(16);


/* unused harmony default export */ var _unused_webpack_default_export = (function(values, compare) {
  if (!(n = values.length)) return;
  var n,
      i = 0,
      j = 0,
      xi,
      xj = values[j];

  if (compare == null) compare = __WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */];

  while (++i < n) {
    if (compare(xi = values[i], xj) < 0 || compare(xj, xj) !== 0) {
      xj = xi, j = i;
    }
  }

  if (compare(xj, xj) === 0) return j;
});


/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(array, i0, i1) {
  var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
      t,
      i;

  while (m) {
    i = Math.random() * m-- | 0;
    t = array[m + i0];
    array[m + i0] = array[i + i0];
    array[i + i0] = t;
  }

  return array;
});


/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      sum = 0;

  if (valueof == null) {
    while (++i < n) {
      if (value = +values[i]) sum += value; // Note: zero and null are equivalent.
    }
  }

  else {
    while (++i < n) {
      if (value = +valueof(values[i], i, values)) sum += value;
    }
  }

  return sum;
});


/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascending__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quantile__ = __webpack_require__(44);





/* unused harmony default export */ var _unused_webpack_default_export = (function(values, min, max) {
  values = __WEBPACK_IMPORTED_MODULE_0__array__["a" /* map */].call(values, __WEBPACK_IMPORTED_MODULE_2__number__["a" /* default */]).sort(__WEBPACK_IMPORTED_MODULE_1__ascending__["a" /* default */]);
  return Math.ceil((max - min) / (2 * (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__quantile__["a" /* default */])(values, 0.75) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__quantile__["a" /* default */])(values, 0.25)) * Math.pow(values.length, -1 / 3)));
});


/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deviation__ = __webpack_require__(70);


/* unused harmony default export */ var _unused_webpack_default_export = (function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__deviation__["a" /* default */])(values) * Math.pow(values.length, -1 / 3)));
});


/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transpose__ = __webpack_require__(77);


/* unused harmony default export */ var _unused_webpack_default_export = (function() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__transpose__["a" /* default */])(arguments);
});


/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_nest__ = __webpack_require__(166);
/* unused harmony reexport nest */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_set__ = __webpack_require__(167);
/* unused harmony reexport set */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_map__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__src_map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_keys__ = __webpack_require__(165);
/* unused harmony reexport keys */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_values__ = __webpack_require__(168);
/* unused harmony reexport values */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_entries__ = __webpack_require__(164);
/* unused harmony reexport entries */








/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
});


/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
});


/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(45);


/* unused harmony default export */ var _unused_webpack_default_export = (function() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
});

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */])();
}

function setMap(map, key, value) {
  map.set(key, value);
}


/***/ }),
/* 167 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__map__ = __webpack_require__(45);


function Set() {}

var proto = __WEBPACK_IMPORTED_MODULE_0__map__["a" /* default */].prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[__WEBPACK_IMPORTED_MODULE_0__map__["b" /* prefix */] + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

/* unused harmony default export */ var _unused_webpack_default_export = (set);


/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = (function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
});


/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = cubehelix;
/* unused harmony export Cubehelix */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(79);




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof __WEBPACK_IMPORTED_MODULE_1__color__["a" /* Rgb */])) o = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* rgbConvert */])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * __WEBPACK_IMPORTED_MODULE_2__math__["a" /* rad2deg */] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Cubehelix, cubehelix, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["c" /* Color */], {
  brighter: function(k) {
    k = k == null ? __WEBPACK_IMPORTED_MODULE_1__color__["d" /* brighter */] : Math.pow(__WEBPACK_IMPORTED_MODULE_1__color__["d" /* brighter */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? __WEBPACK_IMPORTED_MODULE_1__color__["e" /* darker */] : Math.pow(__WEBPACK_IMPORTED_MODULE_1__color__["e" /* darker */], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * __WEBPACK_IMPORTED_MODULE_2__math__["b" /* deg2rad */],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new __WEBPACK_IMPORTED_MODULE_1__color__["a" /* Rgb */](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lab;
/* unused harmony export Lab */
/* harmony export (immutable) */ __webpack_exports__["a"] = hcl;
/* unused harmony export Hcl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__define__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(79);




var Kn = 18,
    Xn = 0.950470, // D65 standard referent
    Yn = 1,
    Zn = 1.088830,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) {
    var h = o.h * __WEBPACK_IMPORTED_MODULE_2__math__["b" /* deg2rad */];
    return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
  }
  if (!(o instanceof __WEBPACK_IMPORTED_MODULE_1__color__["a" /* Rgb */])) o = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* rgbConvert */])(o);
  var b = rgb2xyz(o.r),
      a = rgb2xyz(o.g),
      l = rgb2xyz(o.b),
      x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
      y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
      z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Lab, lab, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["c" /* Color */], {
  brighter: function(k) {
    return new Lab(this.l + Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - Kn * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return new __WEBPACK_IMPORTED_MODULE_1__color__["a" /* Rgb */](
      xyz2rgb( 3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
      xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
      xyz2rgb( 0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  var h = Math.atan2(o.b, o.a) * __WEBPACK_IMPORTED_MODULE_2__math__["a" /* rad2deg */];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["a" /* default */])(Hcl, hcl, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__define__["b" /* extend */])(__WEBPACK_IMPORTED_MODULE_1__color__["c" /* Color */], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + Kn * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - Kn * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return labConvert(this).rgb();
  }
}));


/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return backIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return backOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return backInOut; });
var overshoot = 1.70158;

var backIn = (function custom(s) {
  s = +s;

  function backIn(t) {
    return t * t * ((s + 1) * t - s);
  }

  backIn.overshoot = custom;

  return backIn;
})(overshoot);

var backOut = (function custom(s) {
  s = +s;

  function backOut(t) {
    return --t * t * ((s + 1) * t + s) + 1;
  }

  backOut.overshoot = custom;

  return backOut;
})(overshoot);

var backInOut = (function custom(s) {
  s = +s;

  function backInOut(t) {
    return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
  }

  backInOut.overshoot = custom;

  return backInOut;
})(overshoot);


/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = bounceIn;
/* harmony export (immutable) */ __webpack_exports__["a"] = bounceOut;
/* harmony export (immutable) */ __webpack_exports__["c"] = bounceInOut;
var b1 = 4 / 11,
    b2 = 6 / 11,
    b3 = 8 / 11,
    b4 = 3 / 4,
    b5 = 9 / 11,
    b6 = 10 / 11,
    b7 = 15 / 16,
    b8 = 21 / 22,
    b9 = 63 / 64,
    b0 = 1 / b1 / b1;

function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}

function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}

function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}


/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = circleIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = circleOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = circleInOut;
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}

function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}


/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = cubicIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = cubicOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = cubicInOut;
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return elasticIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return elasticOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return elasticInOut; });
var tau = 2 * Math.PI,
    amplitude = 1,
    period = 0.3;

var elasticIn = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticIn(t) {
    return a * Math.pow(2, 10 * --t) * Math.sin((s - t) / p);
  }

  elasticIn.amplitude = function(a) { return custom(a, p * tau); };
  elasticIn.period = function(p) { return custom(a, p); };

  return elasticIn;
})(amplitude, period);

var elasticOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticOut(t) {
    return 1 - a * Math.pow(2, -10 * (t = +t)) * Math.sin((t + s) / p);
  }

  elasticOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticOut.period = function(p) { return custom(a, p); };

  return elasticOut;
})(amplitude, period);

var elasticInOut = (function custom(a, p) {
  var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);

  function elasticInOut(t) {
    return ((t = t * 2 - 1) < 0
        ? a * Math.pow(2, 10 * t) * Math.sin((s - t) / p)
        : 2 - a * Math.pow(2, -10 * t) * Math.sin((s + t) / p)) / 2;
  }

  elasticInOut.amplitude = function(a) { return custom(a, p * tau); };
  elasticInOut.period = function(p) { return custom(a, p); };

  return elasticInOut;
})(amplitude, period);


/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = expIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = expOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = expInOut;
function expIn(t) {
  return Math.pow(2, 10 * t - 10);
}

function expOut(t) {
  return 1 - Math.pow(2, -10 * t);
}

function expInOut(t) {
  return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2;
}


/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = linear;
function linear(t) {
  return +t;
}


/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return polyIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return polyOut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return polyInOut; });
var exponent = 3;

var polyIn = (function custom(e) {
  e = +e;

  function polyIn(t) {
    return Math.pow(t, e);
  }

  polyIn.exponent = custom;

  return polyIn;
})(exponent);

var polyOut = (function custom(e) {
  e = +e;

  function polyOut(t) {
    return 1 - Math.pow(1 - t, e);
  }

  polyOut.exponent = custom;

  return polyOut;
})(exponent);

var polyInOut = (function custom(e) {
  e = +e;

  function polyInOut(t) {
    return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
  }

  polyInOut.exponent = custom;

  return polyInOut;
})(exponent);


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = quadIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = quadOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = quadInOut;
function quadIn(t) {
  return t * t;
}

function quadOut(t) {
  return t * (2 - t);
}

function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}


/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sinIn;
/* harmony export (immutable) */ __webpack_exports__["c"] = sinOut;
/* harmony export (immutable) */ __webpack_exports__["a"] = sinInOut;
var pi = Math.PI,
    halfPi = pi / 2;

function sinIn(t) {
  return 1 - Math.cos(t * halfPi);
}

function sinOut(t) {
  return Math.sin(t * halfPi);
}

function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}


/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return format; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatPrefix; });
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale__ = __webpack_require__(85);


var locale;
var format;
var formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__locale__["a" /* default */])(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}


/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, p) {
  x = x.toPrecision(p);

  out: for (var n = x.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (x[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      case "e": break out;
      default: if (i0 > 0) i0 = 0; break;
    }
  }

  return i0 > 0 ? x.slice(0, i0) + x.slice(i1 + 1) : x;
});


/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
});


/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
});


/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__formatDecimal__ = __webpack_require__(48);


/* harmony default export */ __webpack_exports__["a"] = (function(x, p) {
  var d = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__formatDecimal__["a" /* default */])(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
});


/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return x;
});


/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exponent__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = (function(step) {
  return Math.max(0, -__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(Math.abs(step)));
});


/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exponent__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = (function(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(value) / 3))) * 3 - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(Math.abs(step)));
});


/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exponent__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = (function(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(max) - __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__exponent__["a" /* default */])(step)) + 1;
});


/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cubehelixLong; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(22);



function cubehelix(hue) {
  return (function cubehelixGamma(y) {
    y = +y;

    function cubehelix(start, end) {
      var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(end)).h),
          s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.s, end.s),
          l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
          opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
      return function(t) {
        start.h = h(t);
        start.s = s(t);
        start.l = l(Math.pow(t, y));
        start.opacity = opacity(t);
        return start + "";
      };
    }

    cubehelix.gamma = cubehelixGamma;

    return cubehelix;
  })(1);
}

/* harmony default export */ __webpack_exports__["a"] = (cubehelix(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]));
var cubehelixLong = cubehelix(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hclLong; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(22);



function hcl(hue) {
  return function(start, end) {
    var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["b" /* hcl */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["b" /* hcl */])(end)).h),
        c = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.c, end.c),
        l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.c = c(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (hcl(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]));
var hclLong = hcl(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hslLong; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(22);



function hsl(hue) {
  return function(start, end) {
    var h = hue((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["d" /* hsl */])(start)).h, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["d" /* hsl */])(end)).h),
        s = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.s, end.s),
        l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.l, end.l),
        opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
    return function(t) {
      start.h = h(t);
      start.s = s(t);
      start.l = l(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (hsl(__WEBPACK_IMPORTED_MODULE_1__color__["b" /* hue */]));
var hslLong = hsl(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */]);


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = lab;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(22);



function lab(start, end) {
  var l = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])((start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["c" /* lab */])(start)).l, (end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["c" /* lab */])(end)).l),
      a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.a, end.a),
      b = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.b, end.b),
      opacity = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__color__["a" /* default */])(start.opacity, end.opacity);
  return function(t) {
    start.l = l(t);
    start.a = a(t);
    start.b = b(t);
    start.opacity = opacity(t);
    return start + "";
  };
}


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
});


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return a = +a, b -= a, function(t) {
    return Math.round(a + b * t);
  };
});


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return identity; });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ __webpack_exports__["b"] = (function(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
});


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return interpolateTransformCss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return interpolateTransformSvg; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parse__ = __webpack_require__(198);



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(xa, xb)}, {i: i - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(xa, xb)}, {i: i - 2, x: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__number__["a" /* default */])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(__WEBPACK_IMPORTED_MODULE_1__parse__["a" /* parseCss */], "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(__WEBPACK_IMPORTED_MODULE_1__parse__["b" /* parseSvg */], ", ", ")", ")");


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = parseCss;
/* harmony export (immutable) */ __webpack_exports__["b"] = parseSvg;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__decompose__ = __webpack_require__(196);


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__decompose__["b" /* default */])(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}

function parseSvg(value) {
  if (value == null) return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return __WEBPACK_IMPORTED_MODULE_0__decompose__["a" /* identity */];
  value = value.matrix;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__decompose__["b" /* default */])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var rho = Math.SQRT2,
    rho2 = 2,
    rho4 = 4,
    epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

// p0 = [ux0, uy0, w0]
// p1 = [ux1, uy1, w1]
/* harmony default export */ __webpack_exports__["a"] = (function(p0, p1) {
  var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
      ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
      dx = ux1 - ux0,
      dy = uy1 - uy0,
      d2 = dx * dx + dy * dy,
      i,
      S;

  // Special case for u0 ≅ u1.
  if (d2 < epsilon2) {
    S = Math.log(w1 / w0) / rho;
    i = function(t) {
      return [
        ux0 + t * dx,
        uy0 + t * dy,
        w0 * Math.exp(rho * t * S)
      ];
    }
  }

  // General case.
  else {
    var d1 = Math.sqrt(d2),
        b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
        b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
        r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
        r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
    S = (r1 - r0) / rho;
    i = function(t) {
      var s = t * S,
          coshr0 = cosh(r0),
          u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
      return [
        ux0 + u * dx,
        uy0 + u * dy,
        w0 * coshr0 / cosh(rho * s + r0)
      ];
    }
  }

  i.duration = S * 1000;

  return i;
});


/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (path);


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_quadtree__ = __webpack_require__(207);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "quadtree", function() { return __WEBPACK_IMPORTED_MODULE_0__src_quadtree__["a"]; });



/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = addAll;
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  var x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
});

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, inherit the existing extent.
  if (x1 < x0) x0 = this._x0, x1 = this._x1;
  if (y1 < y0) y0 = this._y0, y1 = this._y1;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}


/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else if (x0 > x || x > x1 || y0 > y || y > y1) {
    var z = x1 - x0,
        node = this._root,
        parent,
        i;

    switch (i = (y < (y0 + y1) / 2) << 1 | (x < (x0 + x1) / 2)) {
      case 0: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x1 = x0 + z, y1 = y0 + z, x > x1 || y > y1);
        break;
      }
      case 1: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x0 = x1 - z, y1 = y0 + z, x0 > x || y > y1);
        break;
      }
      case 2: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x1 = x0 + z, y0 = y1 - z, x > x1 || y0 > y);
        break;
      }
      case 3: {
        do parent = new Array(4), parent[i] = node, node = parent;
        while (z *= 2, x0 = x1 - z, y0 = y1 - z, x0 > x || y0 > y);
        break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  // If the quadtree covers the point already, just return.
  else return this;

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
});


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
});


/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
});


/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quad__ = __webpack_require__(51);


/* harmony default export */ __webpack_exports__["a"] = (function(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node[3], xm, ym, x2, y2),
        new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node[2], x1, ym, xm, y2),
        new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node[1], xm, y1, x2, ym),
        new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
});


/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = quadtree;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cover__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__extent__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__find__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__remove__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__root__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__size__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__visit__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__visitAfter__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__x__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__y__ = __webpack_require__(214);













function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? __WEBPACK_IMPORTED_MODULE_10__x__["a" /* defaultX */] : x, y == null ? __WEBPACK_IMPORTED_MODULE_11__y__["a" /* defaultY */] : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = __WEBPACK_IMPORTED_MODULE_0__add__["a" /* default */];
treeProto.addAll = __WEBPACK_IMPORTED_MODULE_0__add__["b" /* addAll */];
treeProto.cover = __WEBPACK_IMPORTED_MODULE_1__cover__["a" /* default */];
treeProto.data = __WEBPACK_IMPORTED_MODULE_2__data__["a" /* default */];
treeProto.extent = __WEBPACK_IMPORTED_MODULE_3__extent__["a" /* default */];
treeProto.find = __WEBPACK_IMPORTED_MODULE_4__find__["a" /* default */];
treeProto.remove = __WEBPACK_IMPORTED_MODULE_5__remove__["a" /* default */];
treeProto.removeAll = __WEBPACK_IMPORTED_MODULE_5__remove__["b" /* removeAll */];
treeProto.root = __WEBPACK_IMPORTED_MODULE_6__root__["a" /* default */];
treeProto.size = __WEBPACK_IMPORTED_MODULE_7__size__["a" /* default */];
treeProto.visit = __WEBPACK_IMPORTED_MODULE_8__visit__["a" /* default */];
treeProto.visitAfter = __WEBPACK_IMPORTED_MODULE_9__visitAfter__["a" /* default */];
treeProto.x = __WEBPACK_IMPORTED_MODULE_10__x__["b" /* default */];
treeProto.y = __WEBPACK_IMPORTED_MODULE_11__y__["b" /* default */];


/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = removeAll;
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
});

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}


/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this._root;
});


/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
});


/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quad__ = __webpack_require__(51);


/* harmony default export */ __webpack_exports__["a"] = (function(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, x0, y0, xm, ym));
    }
  }
  return this;
});


/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quad__ = __webpack_require__(51);


/* harmony default export */ __webpack_exports__["a"] = (function(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new __WEBPACK_IMPORTED_MODULE_0__quad__["a" /* default */](child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
});


/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultX;
function defaultX(d) {
  return d[0];
}

/* harmony default export */ __webpack_exports__["b"] = (function(_) {
  return arguments.length ? (this._x = _, this) : this._x;
});


/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultY;
function defaultY(d) {
  return d[1];
}

/* harmony default export */ __webpack_exports__["b"] = (function(_) {
  return arguments.length ? (this._y = _, this) : this._y;
});


/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_band__ = __webpack_require__(216);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleBand", function() { return __WEBPACK_IMPORTED_MODULE_0__src_band__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scalePoint", function() { return __WEBPACK_IMPORTED_MODULE_0__src_band__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_identity__ = __webpack_require__(222);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleIdentity", function() { return __WEBPACK_IMPORTED_MODULE_1__src_identity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_linear__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleLinear", function() { return __WEBPACK_IMPORTED_MODULE_2__src_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_log__ = __webpack_require__(223);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleLog", function() { return __WEBPACK_IMPORTED_MODULE_3__src_log__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ordinal__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleOrdinal", function() { return __WEBPACK_IMPORTED_MODULE_4__src_ordinal__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleImplicit", function() { return __WEBPACK_IMPORTED_MODULE_4__src_ordinal__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_pow__ = __webpack_require__(224);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scalePow", function() { return __WEBPACK_IMPORTED_MODULE_5__src_pow__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleSqrt", function() { return __WEBPACK_IMPORTED_MODULE_5__src_pow__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_quantile__ = __webpack_require__(225);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleQuantile", function() { return __WEBPACK_IMPORTED_MODULE_6__src_quantile__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_quantize__ = __webpack_require__(226);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleQuantize", function() { return __WEBPACK_IMPORTED_MODULE_7__src_quantize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_threshold__ = __webpack_require__(229);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleThreshold", function() { return __WEBPACK_IMPORTED_MODULE_8__src_threshold__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_time__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleTime", function() { return __WEBPACK_IMPORTED_MODULE_9__src_time__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_utcTime__ = __webpack_require__(231);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleUtc", function() { return __WEBPACK_IMPORTED_MODULE_10__src_utcTime__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_category10__ = __webpack_require__(217);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "schemeCategory10", function() { return __WEBPACK_IMPORTED_MODULE_11__src_category10__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_category20b__ = __webpack_require__(219);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "schemeCategory20b", function() { return __WEBPACK_IMPORTED_MODULE_12__src_category20b__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_category20c__ = __webpack_require__(220);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "schemeCategory20c", function() { return __WEBPACK_IMPORTED_MODULE_13__src_category20c__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_category20__ = __webpack_require__(218);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "schemeCategory20", function() { return __WEBPACK_IMPORTED_MODULE_14__src_category20__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__ = __webpack_require__(221);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateCubehelixDefault", function() { return __WEBPACK_IMPORTED_MODULE_15__src_cubehelix__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_rainbow__ = __webpack_require__(227);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateRainbow", function() { return __WEBPACK_IMPORTED_MODULE_16__src_rainbow__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateWarm", function() { return __WEBPACK_IMPORTED_MODULE_16__src_rainbow__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateCool", function() { return __WEBPACK_IMPORTED_MODULE_16__src_rainbow__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_viridis__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateViridis", function() { return __WEBPACK_IMPORTED_MODULE_17__src_viridis__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateMagma", function() { return __WEBPACK_IMPORTED_MODULE_17__src_viridis__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateInferno", function() { return __WEBPACK_IMPORTED_MODULE_17__src_viridis__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "interpolatePlasma", function() { return __WEBPACK_IMPORTED_MODULE_17__src_viridis__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_sequential__ = __webpack_require__(228);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "scaleSequential", function() { return __WEBPACK_IMPORTED_MODULE_18__src_sequential__["a"]; });







































/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = band;
/* harmony export (immutable) */ __webpack_exports__["b"] = point;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ordinal__ = __webpack_require__(95);



function band() {
  var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__ordinal__["a" /* default */])().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["h" /* range */])(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.max(0, Math.min(1, _)), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = Math.max(0, Math.min(1, _)), rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band()
        .domain(domain())
        .range(range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return rescale();
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band().paddingInner(1));
}


/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors__ = __webpack_require__(24);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"));


/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors__ = __webpack_require__(24);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"));


/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors__ = __webpack_require__(24);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"));


/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors__ = __webpack_require__(24);


/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"));


/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(12);



/* harmony default export */ __webpack_exports__["a"] = (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateCubehelixLong"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(300, 0.5, 0.0), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(-240, 0.5, 1.0)));


/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linear__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__number__ = __webpack_require__(94);




function identity() {
  var domain = [0, 1];

  function scale(x) {
    return +x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = __WEBPACK_IMPORTED_MODULE_0__array__["a" /* map */].call(_, __WEBPACK_IMPORTED_MODULE_2__number__["a" /* default */]), scale) : domain.slice();
  };

  scale.copy = function() {
    return identity().domain(domain);
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__linear__["b" /* linearish */])(scale);
}


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = log;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_format__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nice__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__continuous__ = __webpack_require__(32);






function deinterpolate(a, b) {
  return (b = Math.log(b / a))
      ? function(x) { return Math.log(x / a) / b; }
      : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(b);
}

function reinterpolate(a, b) {
  return a < 0
      ? function(t) { return -Math.pow(-b, t) * Math.pow(-a, 1 - t); }
      : function(t) { return Math.pow(b, t) * Math.pow(a, 1 - t); };
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log() {
  var scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__continuous__["a" /* default */])(deinterpolate, reinterpolate).domain([1, 10]),
      domain = scale.domain,
      base = 10,
      logs = logp(10),
      pows = powp(10);

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) logs = reflect(logs), pows = reflect(pows);
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["a" /* ticks */])(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["f" /* format */])(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__nice__["a" /* default */])(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  scale.copy = function() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__continuous__["c" /* copy */])(scale, log().base(base));
  };

  return scale;
}


/***/ }),
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pow;
/* harmony export (immutable) */ __webpack_exports__["b"] = sqrt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__linear__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__continuous__ = __webpack_require__(32);




function raise(x, exponent) {
  return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
}

function pow() {
  var exponent = 1,
      scale = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__continuous__["a" /* default */])(deinterpolate, reinterpolate),
      domain = scale.domain;

  function deinterpolate(a, b) {
    return (b = raise(b, exponent) - (a = raise(a, exponent)))
        ? function(x) { return (raise(x, exponent) - a) / b; }
        : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(b);
  }

  function reinterpolate(a, b) {
    b = raise(b, exponent) - (a = raise(a, exponent));
    return function(t) { return raise(a + b * t, 1 / exponent); };
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, domain(domain())) : exponent;
  };

  scale.copy = function() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__continuous__["c" /* copy */])(scale, pow().exponent(exponent));
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__linear__["b" /* linearish */])(scale);
}

function sqrt() {
  return pow().exponent(0.5);
}


/***/ }),
/* 225 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = quantile;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(13);



function quantile() {
  var domain = [],
      range = [],
      thresholds = [];

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["f" /* quantile */])(domain, i / n);
    return scale;
  }

  function scale(x) {
    if (!isNaN(x = +x)) return range[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["c" /* bisect */])(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(__WEBPACK_IMPORTED_MODULE_0_d3_array__["g" /* ascending */]);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(_), rescale()) : range.slice();
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile()
        .domain(domain)
        .range(range);
  };

  return scale;
}


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = quantize;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__linear__ = __webpack_require__(25);




function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1];

  function scale(x) {
    if (x <= x) return range[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["c" /* bisect */])(domain, x, 0, n)];
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range);
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__linear__["b" /* linearish */])(scale);
}


/***/ }),
/* 227 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return warm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return cool; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_color__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_interpolate__ = __webpack_require__(12);



var warm = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateCubehelixLong"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(-100, 0.75, 0.35), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(80, 1.50, 0.8));

var cool = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_interpolate__["interpolateCubehelixLong"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(260, 0.75, 0.35), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])(80, 1.50, 0.8));

var rainbow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_color__["a" /* cubehelix */])();

/* harmony default export */ __webpack_exports__["a"] = (function(t) {
  if (t < 0 || t > 1) t -= Math.floor(t);
  var ts = Math.abs(t - 0.5);
  rainbow.h = 360 * t - 100;
  rainbow.s = 1.5 - 1.5 * ts;
  rainbow.l = 0.8 - 0.9 * ts;
  return rainbow + "";
});


/***/ }),
/* 228 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sequential;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linear__ = __webpack_require__(25);


function sequential(interpolator) {
  var x0 = 0,
      x1 = 1,
      clamp = false;

  function scale(x) {
    var t = (x - x0) / (x1 - x0);
    return interpolator(clamp ? Math.max(0, Math.min(1, t)) : t);
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequential(interpolator).domain([x0, x1]).clamp(clamp);
  };

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__linear__["b" /* linearish */])(scale);
}


/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = threshold;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(13);



function threshold() {
  var domain = [0.5],
      range = [0, 1],
      n = 1;

  function scale(x) {
    if (x <= x) return range[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["c" /* bisect */])(domain, x, 0, n)];
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = __WEBPACK_IMPORTED_MODULE_1__array__["b" /* slice */].call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.copy = function() {
    return threshold()
        .domain(domain)
        .range(range);
  };

  return scale;
}


/***/ }),
/* 230 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_array__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_format__ = __webpack_require__(81);



/* harmony default export */ __webpack_exports__["a"] = (function(domain, count, specifier) {
  var start = domain[0],
      stop = domain[domain.length - 1],
      step = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_array__["d" /* tickStep */])(start, stop, count == null ? 10 : count),
      precision;
  specifier = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["a" /* formatSpecifier */])(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["b" /* precisionPrefix */])(step, value))) specifier.precision = precision;
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["c" /* formatPrefix */])(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["d" /* precisionRound */])(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["e" /* precisionFixed */])(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3_format__["f" /* format */])(specifier);
});


/***/ }),
/* 231 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__time__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_time_format__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3_time__ = __webpack_require__(58);




/* harmony default export */ __webpack_exports__["a"] = (function() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__time__["b" /* calendar */])(__WEBPACK_IMPORTED_MODULE_2_d3_time__["a" /* utcYear */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["b" /* utcMonth */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["c" /* utcWeek */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["d" /* utcDay */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["e" /* utcHour */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["f" /* utcMinute */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["g" /* utcSecond */], __WEBPACK_IMPORTED_MODULE_2_d3_time__["h" /* utcMillisecond */], __WEBPACK_IMPORTED_MODULE_1_d3_time_format__["a" /* utcFormat */]).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]);
});


/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return magma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return inferno; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return plasma; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors__ = __webpack_require__(24);


function ramp(range) {
  var n = range.length;
  return function(t) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

/* harmony default export */ __webpack_exports__["a"] = (ramp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")));

var magma = ramp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));

var inferno = ramp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));

var plasma = ramp(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__colors__["a" /* default */])("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));


/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(26);




function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["e" /* max */])(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        a1 = endAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        da = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > __WEBPACK_IMPORTED_MODULE_2__math__["c" /* tau */] - __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
      context.moveTo(r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a0), r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        context.moveTo(r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a1), r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) && (padRadius ? +padRadius.apply(this, arguments) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(r0 * r0 + r1 * r1)),
          rc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap)),
            p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap));
        if ((da0 -= p0 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a01),
          y01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a01),
          x10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a10),
          y10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a10);

      // Apply rounded corners?
      if (rc > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var x11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a11),
            y11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a11),
            x00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a00),
            y00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */]) {
          var oc = da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */] ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["l" /* acos */])((ax * bx + ay * by) / (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(ax * ax + ay * ay) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(bx * bx + by * by))) / 2),
              lc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r0 - lc) / (kc - 1));
          rc1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) || !(da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */] / 2;
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a) * r, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
});


/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__area__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lineRadial__ = __webpack_require__(102);




/* harmony default export */ __webpack_exports__["a"] = (function() {
  var a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__area__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return a;
});


/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basis__ = __webpack_require__(33);



function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisClosed(context);
});


/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(33);


function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisOpen(context);
});


/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(33);


function Bundle(context, beta) {
  this._basis = new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85));


/***/ }),
/* 238 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noop__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__catmullRom__ = __webpack_require__(53);




function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__["b" /* CardinalClosed */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__catmullRom__ = __webpack_require__(53);



function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__["b" /* CardinalOpen */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(36);


function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new LinearClosed(context);
});


/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = monotoneX;
/* harmony export (immutable) */ __webpack_exports__["b"] = monotoneY;
function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
}

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}


/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Natural(context);
});


/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = stepBefore;
/* harmony export (immutable) */ __webpack_exports__["b"] = stepAfter;
function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Step(context, 0.5);
});

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}


/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});


/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  return d;
});


/***/ }),
/* 246 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = linkHorizontal;
/* harmony export (immutable) */ __webpack_exports__["b"] = linkVertical;
/* harmony export (immutable) */ __webpack_exports__["c"] = linkRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pointRadial__ = __webpack_require__(103);






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      context = null;

  function link() {
    var buffer, argv = __WEBPACK_IMPORTED_MODULE_1__array__["a" /* slice */].call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0),
      p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0 = (y0 + y1) / 2),
      p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y0),
      p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}


/***/ }),
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
});


/***/ }),
/* 248 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(27);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 249 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(27);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 250 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(27);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 251 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(55);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */])(series).reverse();
});


/***/ }),
/* 252 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascending__ = __webpack_require__(55);



/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(__WEBPACK_IMPORTED_MODULE_1__ascending__["b" /* sum */]),
      order = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
});


/***/ }),
/* 253 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(28);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).reverse();
});


/***/ }),
/* 254 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__descending__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math__ = __webpack_require__(26);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var value = __WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */],
      sortValues = __WEBPACK_IMPORTED_MODULE_1__descending__["a" /* default */],
      sort = null,
      startAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0),
      endAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */]),
      padAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], Math.max(-__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : padAngle;
  };

  return pie;
});


/***/ }),
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offset_none__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_none__ = __webpack_require__(28);





function stackValue(d, key) {
  return d[key];
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var keys = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])([]),
      order = __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */],
      offset = __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */],
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */] : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */] : _, stack) : offset;
  };

  return stack;
});


/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return symbols; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_circle__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_cross__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__symbol_star__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_square__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_wye__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constant__ = __webpack_require__(14);










var symbols = [
  __WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__symbol_cross__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_5__symbol_square__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__symbol_star__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_7__symbol_wye__["a" /* default */]
];

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */]),
      size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
});


/***/ }),
/* 257 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__isoFormat__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defaultLocale__ = __webpack_require__(57);



function parseIsoNative(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
}

var parseIso = +new Date("2000-01-01T00:00:00.000Z")
    ? parseIsoNative
    : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__defaultLocale__["b" /* utcParse */])(__WEBPACK_IMPORTED_MODULE_0__isoFormat__["a" /* isoSpecifier */]);

/* unused harmony default export */ var _unused_webpack_default_export = (parseIso);


/***/ }),
/* 258 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export days */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var day = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setDate(date.getDate() + step);
}, function(start, end) {
  return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]) / __WEBPACK_IMPORTED_MODULE_1__duration__["b" /* durationDay */];
}, function(date) {
  return date.getDate() - 1;
});

/* harmony default export */ __webpack_exports__["a"] = (day);
var days = day.range;


/***/ }),
/* 259 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hours */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var hour = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  var offset = date.getTimezoneOffset() * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */] % __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */];
  if (offset < 0) offset += __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */];
  date.setTime(Math.floor((+date - offset) / __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */]) * __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */] + offset);
}, function(date, step) {
  date.setTime(+date + step * __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */]);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */];
}, function(date) {
  return date.getHours();
});

/* harmony default export */ __webpack_exports__["a"] = (hour);
var hours = hour.range;


/***/ }),
/* 260 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export milliseconds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);


var millisecond = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function() {
  // noop
}, function(date, step) {
  date.setTime(+date + step);
}, function(start, end) {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = function(k) {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
    date.setTime(Math.floor(date / k) * k);
  }, function(date, step) {
    date.setTime(+date + step * k);
  }, function(start, end) {
    return (end - start) / k;
  });
};

/* harmony default export */ __webpack_exports__["a"] = (millisecond);
var milliseconds = millisecond.range;


/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export minutes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var minute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setTime(Math.floor(date / __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]) * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]);
}, function(date, step) {
  date.setTime(+date + step * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */];
}, function(date) {
  return date.getMinutes();
});

/* harmony default export */ __webpack_exports__["a"] = (minute);
var minutes = minute.range;


/***/ }),
/* 262 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export months */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);


var month = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setMonth(date.getMonth() + step);
}, function(start, end) {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
  return date.getMonth();
});

/* harmony default export */ __webpack_exports__["a"] = (month);
var months = month.range;


/***/ }),
/* 263 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export seconds */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var second = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setTime(Math.floor(date / __WEBPACK_IMPORTED_MODULE_1__duration__["e" /* durationSecond */]) * __WEBPACK_IMPORTED_MODULE_1__duration__["e" /* durationSecond */]);
}, function(date, step) {
  date.setTime(+date + step * __WEBPACK_IMPORTED_MODULE_1__duration__["e" /* durationSecond */]);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["e" /* durationSecond */];
}, function(date) {
  return date.getUTCSeconds();
});

/* harmony default export */ __webpack_exports__["a"] = (second);
var seconds = second.range;


/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcDays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var utcDay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["b" /* durationDay */];
}, function(date) {
  return date.getUTCDate() - 1;
});

/* harmony default export */ __webpack_exports__["a"] = (utcDay);
var utcDays = utcDay.range;


/***/ }),
/* 265 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcHours */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var utcHour = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
  date.setTime(+date + step * __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */]);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["c" /* durationHour */];
}, function(date) {
  return date.getUTCHours();
});

/* harmony default export */ __webpack_exports__["a"] = (utcHour);
var utcHours = utcHour.range;


/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcMinutes */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



var utcMinute = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setUTCSeconds(0, 0);
}, function(date, step) {
  date.setTime(+date + step * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]);
}, function(start, end) {
  return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */];
}, function(date) {
  return date.getUTCMinutes();
});

/* harmony default export */ __webpack_exports__["a"] = (utcMinute);
var utcMinutes = utcMinute.range;


/***/ }),
/* 267 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcMonths */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);


var utcMonth = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
  return date.getUTCMonth();
});

/* harmony default export */ __webpack_exports__["a"] = (utcMonth);
var utcMonths = utcMonth.range;


/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return utcSunday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return utcMonday; });
/* unused harmony export utcTuesday */
/* unused harmony export utcWednesday */
/* unused harmony export utcThursday */
/* unused harmony export utcFriday */
/* unused harmony export utcSaturday */
/* unused harmony export utcSundays */
/* unused harmony export utcMondays */
/* unused harmony export utcTuesdays */
/* unused harmony export utcWednesdays */
/* unused harmony export utcThursdays */
/* unused harmony export utcFridays */
/* unused harmony export utcSaturdays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



function utcWeekday(i) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, function(start, end) {
    return (end - start) / __WEBPACK_IMPORTED_MODULE_1__duration__["a" /* durationWeek */];
  });
}

var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);

var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;


/***/ }),
/* 269 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export utcYears */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);


var utcYear = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (utcYear);
var utcYears = utcYear.range;


/***/ }),
/* 270 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sunday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return monday; });
/* unused harmony export tuesday */
/* unused harmony export wednesday */
/* unused harmony export thursday */
/* unused harmony export friday */
/* unused harmony export saturday */
/* unused harmony export sundays */
/* unused harmony export mondays */
/* unused harmony export tuesdays */
/* unused harmony export wednesdays */
/* unused harmony export thursdays */
/* unused harmony export fridays */
/* unused harmony export saturdays */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(9);



function weekday(i) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setDate(date.getDate() + step * 7);
  }, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * __WEBPACK_IMPORTED_MODULE_1__duration__["d" /* durationMinute */]) / __WEBPACK_IMPORTED_MODULE_1__duration__["a" /* durationWeek */];
  });
}

var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);

var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;


/***/ }),
/* 271 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export years */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__interval__ = __webpack_require__(3);


var year = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, function(date, step) {
  date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
  return end.getFullYear() - start.getFullYear();
}, function(date) {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
year.every = function(k) {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__interval__["a" /* default */])(function(date) {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, function(date, step) {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

/* harmony default export */ __webpack_exports__["a"] = (year);
var years = year.range;


/***/ }),
/* 272 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_voronoi__ = __webpack_require__(276);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "voronoi", function() { return __WEBPACK_IMPORTED_MODULE_0__src_voronoi__["a"]; });



/***/ }),
/* 273 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = removeBeach;
/* harmony export (immutable) */ __webpack_exports__["a"] = addBeach;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RedBlackTree__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cell__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Circle__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Edge__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Diagram__ = __webpack_require__(29);






var beachPool = [];

function Beach() {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__RedBlackTree__["b" /* RedBlackNode */])(this);
  this.edge =
  this.site =
  this.circle = null;
}

function createBeach(site) {
  var beach = beachPool.pop() || new Beach;
  beach.site = site;
  return beach;
}

function detachBeach(beach) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(beach);
  __WEBPACK_IMPORTED_MODULE_4__Diagram__["e" /* beaches */].remove(beach);
  beachPool.push(beach);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__RedBlackTree__["b" /* RedBlackNode */])(beach);
}

function removeBeach(beach) {
  var circle = beach.circle,
      x = circle.x,
      y = circle.cy,
      vertex = [x, y],
      previous = beach.P,
      next = beach.N,
      disappearing = [beach];

  detachBeach(beach);

  var lArc = previous;
  while (lArc.circle
      && Math.abs(x - lArc.circle.x) < __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]
      && Math.abs(y - lArc.circle.cy) < __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) {
    previous = lArc.P;
    disappearing.unshift(lArc);
    detachBeach(lArc);
    lArc = previous;
  }

  disappearing.unshift(lArc);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(lArc);

  var rArc = next;
  while (rArc.circle
      && Math.abs(x - rArc.circle.x) < __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]
      && Math.abs(y - rArc.circle.cy) < __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) {
    next = rArc.N;
    disappearing.push(rArc);
    detachBeach(rArc);
    rArc = next;
  }

  disappearing.push(rArc);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(rArc);

  var nArcs = disappearing.length,
      iArc;
  for (iArc = 1; iArc < nArcs; ++iArc) {
    rArc = disappearing[iArc];
    lArc = disappearing[iArc - 1];
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["c" /* setEdgeEnd */])(rArc.edge, lArc.site, rArc.site, vertex);
  }

  lArc = disappearing[0];
  rArc = disappearing[nArcs - 1];
  rArc.edge = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["d" /* createEdge */])(lArc.site, rArc.site, null, vertex);

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(lArc);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(rArc);
}

function addBeach(site) {
  var x = site[0],
      directrix = site[1],
      lArc,
      rArc,
      dxl,
      dxr,
      node = __WEBPACK_IMPORTED_MODULE_4__Diagram__["e" /* beaches */]._;

  while (node) {
    dxl = leftBreakPoint(node, directrix) - x;
    if (dxl > __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) node = node.L; else {
      dxr = x - rightBreakPoint(node, directrix);
      if (dxr > __WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) {
        if (!node.R) {
          lArc = node;
          break;
        }
        node = node.R;
      } else {
        if (dxl > -__WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) {
          lArc = node.P;
          rArc = node;
        } else if (dxr > -__WEBPACK_IMPORTED_MODULE_4__Diagram__["b" /* epsilon */]) {
          lArc = node;
          rArc = node.N;
        } else {
          lArc = rArc = node;
        }
        break;
      }
    }
  }

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__Cell__["d" /* createCell */])(site);
  var newArc = createBeach(site);
  __WEBPACK_IMPORTED_MODULE_4__Diagram__["e" /* beaches */].insert(lArc, newArc);

  if (!lArc && !rArc) return;

  if (lArc === rArc) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(lArc);
    rArc = createBeach(lArc.site);
    __WEBPACK_IMPORTED_MODULE_4__Diagram__["e" /* beaches */].insert(newArc, rArc);
    newArc.edge = rArc.edge = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["d" /* createEdge */])(lArc.site, newArc.site);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(lArc);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(rArc);
    return;
  }

  if (!rArc) { // && lArc
    newArc.edge = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["d" /* createEdge */])(lArc.site, newArc.site);
    return;
  }

  // else lArc !== rArc
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(lArc);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["b" /* detachCircle */])(rArc);

  var lSite = lArc.site,
      ax = lSite[0],
      ay = lSite[1],
      bx = site[0] - ax,
      by = site[1] - ay,
      rSite = rArc.site,
      cx = rSite[0] - ax,
      cy = rSite[1] - ay,
      d = 2 * (bx * cy - by * cx),
      hb = bx * bx + by * by,
      hc = cx * cx + cy * cy,
      vertex = [(cy * hb - by * hc) / d + ax, (bx * hc - cx * hb) / d + ay];

  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["c" /* setEdgeEnd */])(rArc.edge, lSite, rSite, vertex);
  newArc.edge = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["d" /* createEdge */])(lSite, site, null, vertex);
  rArc.edge = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Edge__["d" /* createEdge */])(site, rSite, null, vertex);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(lArc);
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Circle__["c" /* attachCircle */])(rArc);
}

function leftBreakPoint(arc, directrix) {
  var site = arc.site,
      rfocx = site[0],
      rfocy = site[1],
      pby2 = rfocy - directrix;

  if (!pby2) return rfocx;

  var lArc = arc.P;
  if (!lArc) return -Infinity;

  site = lArc.site;
  var lfocx = site[0],
      lfocy = site[1],
      plby2 = lfocy - directrix;

  if (!plby2) return lfocx;

  var hl = lfocx - rfocx,
      aby2 = 1 / pby2 - 1 / plby2,
      b = hl / plby2;

  if (aby2) return (-b + Math.sqrt(b * b - 2 * aby2 * (hl * hl / (-2 * plby2) - lfocy + plby2 / 2 + rfocy - pby2 / 2))) / aby2 + rfocx;

  return (rfocx + lfocx) / 2;
}

function rightBreakPoint(arc, directrix) {
  var rArc = arc.N;
  if (rArc) return leftBreakPoint(rArc, directrix);
  var site = arc.site;
  return site[1] === directrix ? site[0] : Infinity;
}


/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 275 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = x;
/* harmony export (immutable) */ __webpack_exports__["b"] = y;
function x(d) {
  return d[0];
}

function y(d) {
  return d[1];
}


/***/ }),
/* 276 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Diagram__ = __webpack_require__(29);




/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = __WEBPACK_IMPORTED_MODULE_1__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_1__point__["b" /* y */],
      extent = null;

  function voronoi(data) {
    return new __WEBPACK_IMPORTED_MODULE_2__Diagram__["a" /* default */](data.map(function(d, i) {
      var s = [Math.round(x(d, i, data) / __WEBPACK_IMPORTED_MODULE_2__Diagram__["b" /* epsilon */]) * __WEBPACK_IMPORTED_MODULE_2__Diagram__["b" /* epsilon */], Math.round(y(d, i, data) / __WEBPACK_IMPORTED_MODULE_2__Diagram__["b" /* epsilon */]) * __WEBPACK_IMPORTED_MODULE_2__Diagram__["b" /* epsilon */]];
      s.index = i;
      s.data = d;
      return s;
    }), extent);
  }

  voronoi.polygons = function(data) {
    return voronoi(data).polygons();
  };

  voronoi.links = function(data) {
    return voronoi(data).links();
  };

  voronoi.triangles = function(data) {
    return voronoi(data).triangles();
  };

  voronoi.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), voronoi) : x;
  };

  voronoi.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), voronoi) : y;
  };

  voronoi.extent = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]], voronoi) : extent && [[extent[0][0], extent[0][1]], [extent[1][0], extent[1][1]]];
  };

  voronoi.size = function(_) {
    return arguments.length ? (extent = _ == null ? null : [[0, 0], [+_[0], +_[1]]], voronoi) : extent && [extent[1][0] - extent[0][0], extent[1][1] - extent[0][1]];
  };

  return voronoi;
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(279);
var isArguments = __webpack_require__(278);

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),
/* 278 */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),
/* 279 */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),
/* 280 */
/***/ (function(module, exports) {

/**
* Detect Element Resize
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

(function () {
	var attachEvent = document.attachEvent,
		stylesCreated = false;
	
	if (!attachEvent) {
		var requestFrame = (function(){
			var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
								function(fn){ return window.setTimeout(fn, 20); };
			return function(fn){ return raf(fn); };
		})();
		
		var cancelFrame = (function(){
			var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
								   window.clearTimeout;
		  return function(id){ return cancel(id); };
		})();

		function resetTriggers(element){
			var triggers = element.__resizeTriggers__,
				expand = triggers.firstElementChild,
				contract = triggers.lastElementChild,
				expandChild = expand.firstElementChild;
			contract.scrollLeft = contract.scrollWidth;
			contract.scrollTop = contract.scrollHeight;
			expandChild.style.width = expand.offsetWidth + 1 + 'px';
			expandChild.style.height = expand.offsetHeight + 1 + 'px';
			expand.scrollLeft = expand.scrollWidth;
			expand.scrollTop = expand.scrollHeight;
		};

		function checkTriggers(element){
			return element.offsetWidth != element.__resizeLast__.width ||
						 element.offsetHeight != element.__resizeLast__.height;
		}
		
		function scrollListener(e){
			var element = this;
			resetTriggers(this);
			if (this.__resizeRAF__) cancelFrame(this.__resizeRAF__);
			this.__resizeRAF__ = requestFrame(function(){
				if (checkTriggers(element)) {
					element.__resizeLast__.width = element.offsetWidth;
					element.__resizeLast__.height = element.offsetHeight;
					element.__resizeListeners__.forEach(function(fn){
						fn.call(element, e);
					});
				}
			});
		};
		
		/* Detect CSS Animations support to detect element display/re-attach */
		var animation = false,
			animationstring = 'animation',
			keyframeprefix = '',
			animationstartevent = 'animationstart',
			domPrefixes = 'Webkit Moz O ms'.split(' '),
			startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
			pfx  = '';
		{
			var elm = document.createElement('fakeelement');
			if( elm.style.animationName !== undefined ) { animation = true; }    
			
			if( animation === false ) {
				for( var i = 0; i < domPrefixes.length; i++ ) {
					if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
						pfx = domPrefixes[ i ];
						animationstring = pfx + 'Animation';
						keyframeprefix = '-' + pfx.toLowerCase() + '-';
						animationstartevent = startEvents[ i ];
						animation = true;
						break;
					}
				}
			}
		}
		
		var animationName = 'resizeanim';
		var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
		var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
	}
	
	function createStyles() {
		if (!stylesCreated) {
			//opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
			var css = (animationKeyframes ? animationKeyframes : '') +
					'.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
					'.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
				head = document.head || document.getElementsByTagName('head')[0],
				style = document.createElement('style');
			
			style.type = 'text/css';
			if (style.styleSheet) {
				style.styleSheet.cssText = css;
			} else {
				style.appendChild(document.createTextNode(css));
			}

			head.appendChild(style);
			stylesCreated = true;
		}
	}
	
	window.addResizeListener = function(element, fn){
		if (attachEvent) element.attachEvent('onresize', fn);
		else {
			if (!element.__resizeTriggers__) {
				if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
				createStyles();
				element.__resizeLast__ = {};
				element.__resizeListeners__ = [];
				(element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
				element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
																						'<div class="contract-trigger"></div>';
				element.appendChild(element.__resizeTriggers__);
				resetTriggers(element);
				element.addEventListener('scroll', scrollListener, true);
				
				/* Listen for a css animation to detect element display/re-attach */
				animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
					if(e.animationName == animationName)
						resetTriggers(element);
				});
			}
			element.__resizeListeners__.push(fn);
		}
	};
	
	window.removeResizeListener = function(element, fn){
		if (attachEvent) element.detachEvent('onresize', fn);
		else {
			element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
			if (!element.__resizeListeners__.length) {
					element.removeEventListener('scroll', scrollListener);
					element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
			}
		}
	}
})();

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(10);
  var ReactPropTypesSecret = __webpack_require__(62);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



// React 15.5 references this module, and assumes PropTypes are still callable in production.
// Therefore we re-export development-only version with all the PropTypes checks here.
// However if one is migrating to the `prop-types` npm library, they will go through the
// `index.js` entry point, and it will branch depending on the environment.
var factory = __webpack_require__(117);
module.exports = function(isValidElement) {
  // It is still allowed in 15.5.
  var throwOnDirectAccess = false;
  return factory(isValidElement, throwOnDirectAccess);
};


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(37);
var invariant = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(62);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _performanceNow = __webpack_require__(61);

var _performanceNow2 = _interopRequireDefault(_performanceNow);

var _raf = __webpack_require__(63);

var _raf2 = _interopRequireDefault(_raf);

var _d3Interpolate = __webpack_require__(12);

var _d3Ease = __webpack_require__(80);

var Easing = _interopRequireWildcard(_d3Ease);

var _Utils = __webpack_require__(120);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


//
var msPerFrame = 1000 / 60;

var defaults = {
  data: {},
  ignore: [],
  duration: 500,
  easing: 'easeCubicOut',
  onRest: function onRest() {
    return null;
  },
  flexDuration: false,
  immutable: true
};

var Animate = function (_Component) {
  _inherits(Animate, _Component);

  function Animate(props) {
    _classCallCheck(this, Animate);

    var _this = _possibleConstructorReturn(this, (Animate.__proto__ || Object.getPrototypeOf(Animate)).call(this));

    var defaultState = props.default,
        data = props.data;

    _this.destination = data;
    _this.state = {
      current: defaultState || data
    };
    return _this;
  }

  _createClass(Animate, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.wasAnimating = false;
      this.animationID = null;
      this.lastRenderTime = 0;
      this.interpolators = {};
      this.progress = 0;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.pivot(this.props);
      this.ranFirst = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.pivot(props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.animationID != null) {
        _raf2.default.cancel(this.animationID);
        this.animationID = null;
      }
    }
  }, {
    key: 'pivot',
    value: function pivot(props) {
      var data = props.data,
          easing = props.easing,
          ignore = props.ignore,
          immutable = props.immutable;

      // Detect non-change render

      var needsUpdate = immutable ? this.props.data !== data : !_Utils2.default.deepEquals(this.props.data, data);

      if (this.ranFirst && !needsUpdate) {
        return;
      }

      // Update the easing function
      this.easer = typeof easing === 'function' ? easing : Easing[easing] || Easing[defaults.easing];

      // Update the origins and destinations
      this.origin = this.state.current;
      this.destination = data;

      // Update the interpolators
      for (var key in this.destination) {
        if (!Object.prototype.hasOwnProperty.call(this.destination, key)) {
          continue;
        }
        if (ignore.indexOf(key) > -1) {
          this.interpolators[key] = null;
          continue;
        }
        if (this.origin[key] === this.destination[key]) {
          this.interpolators[key] = null;
          continue;
        }
        this.interpolators[key] = (0, _d3Interpolate.interpolate)(this.origin[key], this.destination[key]);
      }

      // Reset the startTime and the progress
      this.startTime = (0, _performanceNow2.default)();
      this.progress = 0;
      if (!this.wasAnimating) {
        this.lastRenderTime = (0, _performanceNow2.default)();
      }

      // Be sure to render the origin frame
      this.renderProgress();

      // Animate if needed
      this.animate();
    }
  }, {
    key: 'animate',
    value: function animate() {
      var _this2 = this;

      if (this.animationID) {
        return;
      }

      var _props = this.props,
          onRest = _props.onRest,
          duration = _props.duration,
          flexDuration = _props.flexDuration;


      this.animationID = (0, _raf2.default)(function () {
        // If the animation is complete, tie up any loose ends...
        if (_this2.progress >= 1) {
          if (_this2.wasAnimating) {
            onRest();
          }

          // no need to cancel animationID here shouldn't have any in flight
          _this2.animationID = null;
          _this2.wasAnimating = false;
          return;
        }

        // It's time to animate!
        _this2.wasAnimating = true;

        // Keep track of time
        var currentTime = (0, _performanceNow2.default)();
        var timeSinceLastFrame = currentTime - _this2.lastRenderTime;

        // Are we using flexDuration?
        if (flexDuration) {
          // Add however many milliseconds behind we are to the startTime to offset
          // any dropped frames
          _this2.startTime += Math.max(Math.floor(timeSinceLastFrame - msPerFrame), 0);
        }

        // Update the progress
        _this2.progress = Math.max(Math.min((currentTime - _this2.startTime) / duration, 1), 0);

        // Render the progress
        _this2.renderProgress();

        // Update the lastRenderTime
        _this2.lastRenderTime = currentTime;

        // Mark the frame as done
        _this2.animationID = null;

        // Try to animate again
        _this2.animate();
      });
    }
  }, {
    key: 'renderProgress',
    value: function renderProgress() {
      var _props2 = this.props,
          data = _props2.data,
          duration = _props2.duration;


      var newCurrent = {};

      // Then use the percentage and easer to interpolate to the destination
      for (var key in data) {
        if (!Object.prototype.hasOwnProperty.call(data, key)) {
          continue;
        }

        // If ignored or no change needed, skip right to the value
        if (this.interpolators[key] === null) {
          newCurrent[key] = data[key];
        } else {
          // Otherwise, interpolate with the progress
          newCurrent[key] = duration ? this.interpolators[key](this.easer(this.progress)) : this.interpolators[key](this.progress);
        }
      }

      this.setState({
        current: newCurrent
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var renderedChildren = this.props.children(this.state.current);
      return renderedChildren && _react2.default.Children.only(renderedChildren);
    }
  }]);

  return Animate;
}(_react.Component);

Animate.defaultProps = defaults;
exports.default = Animate;


Animate.defaults = defaults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BbmltYXRlLmpzIl0sIm5hbWVzIjpbIkVhc2luZyIsIm1zUGVyRnJhbWUiLCJkZWZhdWx0cyIsImRhdGEiLCJpZ25vcmUiLCJkdXJhdGlvbiIsImVhc2luZyIsIm9uUmVzdCIsImZsZXhEdXJhdGlvbiIsImltbXV0YWJsZSIsIkFuaW1hdGUiLCJwcm9wcyIsImRlZmF1bHRTdGF0ZSIsImRlZmF1bHQiLCJkZXN0aW5hdGlvbiIsInN0YXRlIiwiY3VycmVudCIsIndhc0FuaW1hdGluZyIsImFuaW1hdGlvbklEIiwibGFzdFJlbmRlclRpbWUiLCJpbnRlcnBvbGF0b3JzIiwicHJvZ3Jlc3MiLCJwaXZvdCIsInJhbkZpcnN0IiwiY2FuY2VsIiwibmVlZHNVcGRhdGUiLCJkZWVwRXF1YWxzIiwiZWFzZXIiLCJvcmlnaW4iLCJrZXkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpbmRleE9mIiwic3RhcnRUaW1lIiwicmVuZGVyUHJvZ3Jlc3MiLCJhbmltYXRlIiwiY3VycmVudFRpbWUiLCJ0aW1lU2luY2VMYXN0RnJhbWUiLCJNYXRoIiwibWF4IiwiZmxvb3IiLCJtaW4iLCJuZXdDdXJyZW50Iiwic2V0U3RhdGUiLCJyZW5kZXJlZENoaWxkcmVuIiwiY2hpbGRyZW4iLCJDaGlsZHJlbiIsIm9ubHkiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0lBQVlBLE07O0FBRVo7Ozs7Ozs7Ozs7Ozs7QUFEQTs7O0FBRUE7QUFDQSxJQUFNQyxhQUFhLE9BQU8sRUFBMUI7O0FBRUEsSUFBTUMsV0FBVztBQUNmQyxRQUFNLEVBRFM7QUFFZkMsVUFBUSxFQUZPO0FBR2ZDLFlBQVUsR0FISztBQUlmQyxVQUFRLGNBSk87QUFLZkMsVUFBUTtBQUFBLFdBQU0sSUFBTjtBQUFBLEdBTE87QUFNZkMsZ0JBQWMsS0FOQztBQU9mQyxhQUFXO0FBUEksQ0FBakI7O0lBVXFCQyxPOzs7QUFFbkIsbUJBQWFDLEtBQWIsRUFBb0I7QUFBQTs7QUFBQTs7QUFBQSxRQUVEQyxZQUZDLEdBRXNCRCxLQUZ0QixDQUVWRSxPQUZVO0FBQUEsUUFFYVYsSUFGYixHQUVzQlEsS0FGdEIsQ0FFYVIsSUFGYjs7QUFHbEIsVUFBS1csV0FBTCxHQUFtQlgsSUFBbkI7QUFDQSxVQUFLWSxLQUFMLEdBQWE7QUFDWEMsZUFBU0osZ0JBQWdCVDtBQURkLEtBQWI7QUFKa0I7QUFPbkI7Ozs7eUNBRXFCO0FBQ3BCLFdBQUtjLFlBQUwsR0FBb0IsS0FBcEI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsV0FBS0MsY0FBTCxHQUFzQixDQUF0QjtBQUNBLFdBQUtDLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxXQUFLQyxRQUFMLEdBQWdCLENBQWhCO0FBQ0Q7Ozt3Q0FFb0I7QUFDbkIsV0FBS0MsS0FBTCxDQUFXLEtBQUtYLEtBQWhCO0FBQ0EsV0FBS1ksUUFBTCxHQUFnQixJQUFoQjtBQUNEOzs7OENBRTBCWixLLEVBQU87QUFDaEMsV0FBS1csS0FBTCxDQUFXWCxLQUFYO0FBQ0Q7OzsyQ0FFdUI7QUFDdEIsVUFBSSxLQUFLTyxXQUFMLElBQW9CLElBQXhCLEVBQThCO0FBQzVCLHNCQUFJTSxNQUFKLENBQVcsS0FBS04sV0FBaEI7QUFDQSxhQUFLQSxXQUFMLEdBQW1CLElBQW5CO0FBQ0Q7QUFDRjs7OzBCQUVNUCxLLEVBQU87QUFBQSxVQUNKUixJQURJLEdBQ2dDUSxLQURoQyxDQUNKUixJQURJO0FBQUEsVUFDRUcsTUFERixHQUNnQ0ssS0FEaEMsQ0FDRUwsTUFERjtBQUFBLFVBQ1VGLE1BRFYsR0FDZ0NPLEtBRGhDLENBQ1VQLE1BRFY7QUFBQSxVQUNrQkssU0FEbEIsR0FDZ0NFLEtBRGhDLENBQ2tCRixTQURsQjs7QUFHWjs7QUFDQSxVQUFJZ0IsY0FBY2hCLFlBQ2QsS0FBS0UsS0FBTCxDQUFXUixJQUFYLEtBQW9CQSxJQUROLEdBRWQsQ0FBQyxnQkFBTXVCLFVBQU4sQ0FBaUIsS0FBS2YsS0FBTCxDQUFXUixJQUE1QixFQUFrQ0EsSUFBbEMsQ0FGTDs7QUFJQSxVQUFJLEtBQUtvQixRQUFMLElBQWlCLENBQUNFLFdBQXRCLEVBQW1DO0FBQ2pDO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFLRSxLQUFMLEdBQ0UsT0FBT3JCLE1BQVAsS0FBa0IsVUFBbEIsR0FDSUEsTUFESixHQUVJTixPQUFPTSxNQUFQLEtBQWtCTixPQUFPRSxTQUFTSSxNQUFoQixDQUh4Qjs7QUFLQTtBQUNBLFdBQUtzQixNQUFMLEdBQWMsS0FBS2IsS0FBTCxDQUFXQyxPQUF6QjtBQUNBLFdBQUtGLFdBQUwsR0FBbUJYLElBQW5COztBQUVBO0FBQ0EsV0FBSyxJQUFJMEIsR0FBVCxJQUFnQixLQUFLZixXQUFyQixFQUFrQztBQUNoQyxZQUFJLENBQUNnQixPQUFPQyxTQUFQLENBQWlCQyxjQUFqQixDQUFnQ0MsSUFBaEMsQ0FBcUMsS0FBS25CLFdBQTFDLEVBQXVEZSxHQUF2RCxDQUFMLEVBQWtFO0FBQ2hFO0FBQ0Q7QUFDRCxZQUFJekIsT0FBTzhCLE9BQVAsQ0FBZUwsR0FBZixJQUFzQixDQUFDLENBQTNCLEVBQThCO0FBQzVCLGVBQUtULGFBQUwsQ0FBbUJTLEdBQW5CLElBQTBCLElBQTFCO0FBQ0E7QUFDRDtBQUNELFlBQUksS0FBS0QsTUFBTCxDQUFZQyxHQUFaLE1BQXFCLEtBQUtmLFdBQUwsQ0FBaUJlLEdBQWpCLENBQXpCLEVBQWdEO0FBQzlDLGVBQUtULGFBQUwsQ0FBbUJTLEdBQW5CLElBQTBCLElBQTFCO0FBQ0E7QUFDRDtBQUNELGFBQUtULGFBQUwsQ0FBbUJTLEdBQW5CLElBQTBCLGdDQUN4QixLQUFLRCxNQUFMLENBQVlDLEdBQVosQ0FEd0IsRUFFeEIsS0FBS2YsV0FBTCxDQUFpQmUsR0FBakIsQ0FGd0IsQ0FBMUI7QUFJRDs7QUFFRDtBQUNBLFdBQUtNLFNBQUwsR0FBaUIsK0JBQWpCO0FBQ0EsV0FBS2QsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFVBQUksQ0FBQyxLQUFLSixZQUFWLEVBQXdCO0FBQ3RCLGFBQUtFLGNBQUwsR0FBc0IsK0JBQXRCO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFLaUIsY0FBTDs7QUFFQTtBQUNBLFdBQUtDLE9BQUw7QUFDRDs7OzhCQUVVO0FBQUE7O0FBQ1QsVUFBSSxLQUFLbkIsV0FBVCxFQUFzQjtBQUNwQjtBQUNEOztBQUhRLG1CQUtrQyxLQUFLUCxLQUx2QztBQUFBLFVBS0RKLE1BTEMsVUFLREEsTUFMQztBQUFBLFVBS09GLFFBTFAsVUFLT0EsUUFMUDtBQUFBLFVBS2lCRyxZQUxqQixVQUtpQkEsWUFMakI7OztBQU9ULFdBQUtVLFdBQUwsR0FBbUIsbUJBQUksWUFBTTtBQUMzQjtBQUNBLFlBQUksT0FBS0csUUFBTCxJQUFpQixDQUFyQixFQUF3QjtBQUN0QixjQUFJLE9BQUtKLFlBQVQsRUFBdUI7QUFDckJWO0FBQ0Q7O0FBRUQ7QUFDQSxpQkFBS1csV0FBTCxHQUFtQixJQUFuQjtBQUNBLGlCQUFLRCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0E7QUFDRDs7QUFFRDtBQUNBLGVBQUtBLFlBQUwsR0FBb0IsSUFBcEI7O0FBRUE7QUFDQSxZQUFJcUIsY0FBYywrQkFBbEI7QUFDQSxZQUFNQyxxQkFBcUJELGNBQWMsT0FBS25CLGNBQTlDOztBQUVBO0FBQ0EsWUFBSVgsWUFBSixFQUFrQjtBQUNoQjtBQUNBO0FBQ0EsaUJBQUsyQixTQUFMLElBQWtCSyxLQUFLQyxHQUFMLENBQ2hCRCxLQUFLRSxLQUFMLENBQVdILHFCQUFxQnRDLFVBQWhDLENBRGdCLEVBRWhCLENBRmdCLENBQWxCO0FBSUQ7O0FBRUQ7QUFDQSxlQUFLb0IsUUFBTCxHQUFnQm1CLEtBQUtDLEdBQUwsQ0FDZEQsS0FBS0csR0FBTCxDQUFTLENBQUNMLGNBQWMsT0FBS0gsU0FBcEIsSUFBaUM5QixRQUExQyxFQUFvRCxDQUFwRCxDQURjLEVBRWQsQ0FGYyxDQUFoQjs7QUFLQTtBQUNBLGVBQUsrQixjQUFMOztBQUVBO0FBQ0EsZUFBS2pCLGNBQUwsR0FBc0JtQixXQUF0Qjs7QUFFQTtBQUNBLGVBQUtwQixXQUFMLEdBQW1CLElBQW5COztBQUVBO0FBQ0EsZUFBS21CLE9BQUw7QUFDRCxPQS9Da0IsQ0FBbkI7QUFnREQ7OztxQ0FFaUI7QUFBQSxvQkFDVyxLQUFLMUIsS0FEaEI7QUFBQSxVQUNSUixJQURRLFdBQ1JBLElBRFE7QUFBQSxVQUNGRSxRQURFLFdBQ0ZBLFFBREU7OztBQUdoQixVQUFNdUMsYUFBYSxFQUFuQjs7QUFFQTtBQUNBLFdBQUssSUFBSWYsR0FBVCxJQUFnQjFCLElBQWhCLEVBQXNCO0FBQ3BCLFlBQUksQ0FBQzJCLE9BQU9DLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQzlCLElBQXJDLEVBQTJDMEIsR0FBM0MsQ0FBTCxFQUFzRDtBQUNwRDtBQUNEOztBQUVEO0FBQ0EsWUFBSSxLQUFLVCxhQUFMLENBQW1CUyxHQUFuQixNQUE0QixJQUFoQyxFQUFzQztBQUNwQ2UscUJBQVdmLEdBQVgsSUFBa0IxQixLQUFLMEIsR0FBTCxDQUFsQjtBQUNELFNBRkQsTUFFTztBQUNMO0FBQ0FlLHFCQUFXZixHQUFYLElBQWtCeEIsV0FDZCxLQUFLZSxhQUFMLENBQW1CUyxHQUFuQixFQUF3QixLQUFLRixLQUFMLENBQVcsS0FBS04sUUFBaEIsQ0FBeEIsQ0FEYyxHQUVkLEtBQUtELGFBQUwsQ0FBbUJTLEdBQW5CLEVBQXdCLEtBQUtSLFFBQTdCLENBRko7QUFHRDtBQUNGOztBQUVELFdBQUt3QixRQUFMLENBQWM7QUFDWjdCLGlCQUFTNEI7QUFERyxPQUFkO0FBR0Q7Ozs2QkFFUztBQUNSLFVBQU1FLG1CQUFtQixLQUFLbkMsS0FBTCxDQUFXb0MsUUFBWCxDQUFvQixLQUFLaEMsS0FBTCxDQUFXQyxPQUEvQixDQUF6QjtBQUNBLGFBQU84QixvQkFBb0IsZ0JBQU1FLFFBQU4sQ0FBZUMsSUFBZixDQUFvQkgsZ0JBQXBCLENBQTNCO0FBQ0Q7Ozs7OztBQWpMa0JwQyxPLENBQ1p3QyxZLEdBQWVoRCxRO2tCQURIUSxPOzs7QUFvTHJCQSxRQUFRUixRQUFSLEdBQW1CQSxRQUFuQiIsImZpbGUiOiJBbmltYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IG5vdyBmcm9tICdwZXJmb3JtYW5jZS1ub3cnXG5pbXBvcnQgUkFGIGZyb20gJ3JhZidcbmltcG9ydCB7IGludGVycG9sYXRlIH0gZnJvbSAnZDMtaW50ZXJwb2xhdGUnXG5pbXBvcnQgKiBhcyBFYXNpbmcgZnJvbSAnZDMtZWFzZSdcbi8vXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi9VdGlscydcbi8vXG5jb25zdCBtc1BlckZyYW1lID0gMTAwMCAvIDYwXG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuICBkYXRhOiB7fSxcbiAgaWdub3JlOiBbXSxcbiAgZHVyYXRpb246IDUwMCxcbiAgZWFzaW5nOiAnZWFzZUN1YmljT3V0JyxcbiAgb25SZXN0OiAoKSA9PiBudWxsLFxuICBmbGV4RHVyYXRpb246IGZhbHNlLFxuICBpbW11dGFibGU6IHRydWUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuaW1hdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdHNcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIoKVxuICAgIGNvbnN0IHsgZGVmYXVsdDogZGVmYXVsdFN0YXRlLCBkYXRhIH0gPSBwcm9wc1xuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkYXRhXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGN1cnJlbnQ6IGRlZmF1bHRTdGF0ZSB8fCBkYXRhLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG4gICAgdGhpcy53YXNBbmltYXRpbmcgPSBmYWxzZVxuICAgIHRoaXMuYW5pbWF0aW9uSUQgPSBudWxsXG4gICAgdGhpcy5sYXN0UmVuZGVyVGltZSA9IDBcbiAgICB0aGlzLmludGVycG9sYXRvcnMgPSB7fVxuICAgIHRoaXMucHJvZ3Jlc3MgPSAwXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG4gICAgdGhpcy5waXZvdCh0aGlzLnByb3BzKVxuICAgIHRoaXMucmFuRmlyc3QgPSB0cnVlXG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChwcm9wcykge1xuICAgIHRoaXMucGl2b3QocHJvcHMpXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uSUQgIT0gbnVsbCkge1xuICAgICAgUkFGLmNhbmNlbCh0aGlzLmFuaW1hdGlvbklEKVxuICAgICAgdGhpcy5hbmltYXRpb25JRCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBwaXZvdCAocHJvcHMpIHtcbiAgICBjb25zdCB7IGRhdGEsIGVhc2luZywgaWdub3JlLCBpbW11dGFibGUgfSA9IHByb3BzXG5cbiAgICAvLyBEZXRlY3Qgbm9uLWNoYW5nZSByZW5kZXJcbiAgICBsZXQgbmVlZHNVcGRhdGUgPSBpbW11dGFibGVcbiAgICAgID8gdGhpcy5wcm9wcy5kYXRhICE9PSBkYXRhXG4gICAgICA6ICFVdGlscy5kZWVwRXF1YWxzKHRoaXMucHJvcHMuZGF0YSwgZGF0YSlcblxuICAgIGlmICh0aGlzLnJhbkZpcnN0ICYmICFuZWVkc1VwZGF0ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBlYXNpbmcgZnVuY3Rpb25cbiAgICB0aGlzLmVhc2VyID1cbiAgICAgIHR5cGVvZiBlYXNpbmcgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBlYXNpbmdcbiAgICAgICAgOiBFYXNpbmdbZWFzaW5nXSB8fCBFYXNpbmdbZGVmYXVsdHMuZWFzaW5nXVxuXG4gICAgLy8gVXBkYXRlIHRoZSBvcmlnaW5zIGFuZCBkZXN0aW5hdGlvbnNcbiAgICB0aGlzLm9yaWdpbiA9IHRoaXMuc3RhdGUuY3VycmVudFxuICAgIHRoaXMuZGVzdGluYXRpb24gPSBkYXRhXG5cbiAgICAvLyBVcGRhdGUgdGhlIGludGVycG9sYXRvcnNcbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5kZXN0aW5hdGlvbikge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5kZXN0aW5hdGlvbiwga2V5KSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgaWYgKGlnbm9yZS5pbmRleE9mKGtleSkgPiAtMSkge1xuICAgICAgICB0aGlzLmludGVycG9sYXRvcnNba2V5XSA9IG51bGxcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9yaWdpbltrZXldID09PSB0aGlzLmRlc3RpbmF0aW9uW2tleV0pIHtcbiAgICAgICAgdGhpcy5pbnRlcnBvbGF0b3JzW2tleV0gPSBudWxsXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICB0aGlzLmludGVycG9sYXRvcnNba2V5XSA9IGludGVycG9sYXRlKFxuICAgICAgICB0aGlzLm9yaWdpbltrZXldLFxuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uW2tleV1cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBSZXNldCB0aGUgc3RhcnRUaW1lIGFuZCB0aGUgcHJvZ3Jlc3NcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5vdygpXG4gICAgdGhpcy5wcm9ncmVzcyA9IDBcbiAgICBpZiAoIXRoaXMud2FzQW5pbWF0aW5nKSB7XG4gICAgICB0aGlzLmxhc3RSZW5kZXJUaW1lID0gbm93KClcbiAgICB9XG5cbiAgICAvLyBCZSBzdXJlIHRvIHJlbmRlciB0aGUgb3JpZ2luIGZyYW1lXG4gICAgdGhpcy5yZW5kZXJQcm9ncmVzcygpXG5cbiAgICAvLyBBbmltYXRlIGlmIG5lZWRlZFxuICAgIHRoaXMuYW5pbWF0ZSgpXG4gIH1cblxuICBhbmltYXRlICgpIHtcbiAgICBpZiAodGhpcy5hbmltYXRpb25JRCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyBvblJlc3QsIGR1cmF0aW9uLCBmbGV4RHVyYXRpb24gfSA9IHRoaXMucHJvcHNcblxuICAgIHRoaXMuYW5pbWF0aW9uSUQgPSBSQUYoKCkgPT4ge1xuICAgICAgLy8gSWYgdGhlIGFuaW1hdGlvbiBpcyBjb21wbGV0ZSwgdGllIHVwIGFueSBsb29zZSBlbmRzLi4uXG4gICAgICBpZiAodGhpcy5wcm9ncmVzcyA+PSAxKSB7XG4gICAgICAgIGlmICh0aGlzLndhc0FuaW1hdGluZykge1xuICAgICAgICAgIG9uUmVzdCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBuZWVkIHRvIGNhbmNlbCBhbmltYXRpb25JRCBoZXJlIHNob3VsZG4ndCBoYXZlIGFueSBpbiBmbGlnaHRcbiAgICAgICAgdGhpcy5hbmltYXRpb25JRCA9IG51bGxcbiAgICAgICAgdGhpcy53YXNBbmltYXRpbmcgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gSXQncyB0aW1lIHRvIGFuaW1hdGUhXG4gICAgICB0aGlzLndhc0FuaW1hdGluZyA9IHRydWVcblxuICAgICAgLy8gS2VlcCB0cmFjayBvZiB0aW1lXG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBub3coKVxuICAgICAgY29uc3QgdGltZVNpbmNlTGFzdEZyYW1lID0gY3VycmVudFRpbWUgLSB0aGlzLmxhc3RSZW5kZXJUaW1lXG5cbiAgICAgIC8vIEFyZSB3ZSB1c2luZyBmbGV4RHVyYXRpb24/XG4gICAgICBpZiAoZmxleER1cmF0aW9uKSB7XG4gICAgICAgIC8vIEFkZCBob3dldmVyIG1hbnkgbWlsbGlzZWNvbmRzIGJlaGluZCB3ZSBhcmUgdG8gdGhlIHN0YXJ0VGltZSB0byBvZmZzZXRcbiAgICAgICAgLy8gYW55IGRyb3BwZWQgZnJhbWVzXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lICs9IE1hdGgubWF4KFxuICAgICAgICAgIE1hdGguZmxvb3IodGltZVNpbmNlTGFzdEZyYW1lIC0gbXNQZXJGcmFtZSksXG4gICAgICAgICAgMFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgcHJvZ3Jlc3NcbiAgICAgIHRoaXMucHJvZ3Jlc3MgPSBNYXRoLm1heChcbiAgICAgICAgTWF0aC5taW4oKGN1cnJlbnRUaW1lIC0gdGhpcy5zdGFydFRpbWUpIC8gZHVyYXRpb24sIDEpLFxuICAgICAgICAwXG4gICAgICApXG5cbiAgICAgIC8vIFJlbmRlciB0aGUgcHJvZ3Jlc3NcbiAgICAgIHRoaXMucmVuZGVyUHJvZ3Jlc3MoKVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIGxhc3RSZW5kZXJUaW1lXG4gICAgICB0aGlzLmxhc3RSZW5kZXJUaW1lID0gY3VycmVudFRpbWVcblxuICAgICAgLy8gTWFyayB0aGUgZnJhbWUgYXMgZG9uZVxuICAgICAgdGhpcy5hbmltYXRpb25JRCA9IG51bGxcblxuICAgICAgLy8gVHJ5IHRvIGFuaW1hdGUgYWdhaW5cbiAgICAgIHRoaXMuYW5pbWF0ZSgpXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlclByb2dyZXNzICgpIHtcbiAgICBjb25zdCB7IGRhdGEsIGR1cmF0aW9uIH0gPSB0aGlzLnByb3BzXG5cbiAgICBjb25zdCBuZXdDdXJyZW50ID0ge31cblxuICAgIC8vIFRoZW4gdXNlIHRoZSBwZXJjZW50YWdlIGFuZCBlYXNlciB0byBpbnRlcnBvbGF0ZSB0byB0aGUgZGVzdGluYXRpb25cbiAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpZ25vcmVkIG9yIG5vIGNoYW5nZSBuZWVkZWQsIHNraXAgcmlnaHQgdG8gdGhlIHZhbHVlXG4gICAgICBpZiAodGhpcy5pbnRlcnBvbGF0b3JzW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgbmV3Q3VycmVudFtrZXldID0gZGF0YVtrZXldXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBPdGhlcndpc2UsIGludGVycG9sYXRlIHdpdGggdGhlIHByb2dyZXNzXG4gICAgICAgIG5ld0N1cnJlbnRba2V5XSA9IGR1cmF0aW9uXG4gICAgICAgICAgPyB0aGlzLmludGVycG9sYXRvcnNba2V5XSh0aGlzLmVhc2VyKHRoaXMucHJvZ3Jlc3MpKVxuICAgICAgICAgIDogdGhpcy5pbnRlcnBvbGF0b3JzW2tleV0odGhpcy5wcm9ncmVzcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGN1cnJlbnQ6IG5ld0N1cnJlbnQsXG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcmVuZGVyZWRDaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW4odGhpcy5zdGF0ZS5jdXJyZW50KVxuICAgIHJldHVybiByZW5kZXJlZENoaWxkcmVuICYmIFJlYWN0LkNoaWxkcmVuLm9ubHkocmVuZGVyZWRDaGlsZHJlbilcbiAgfVxufVxuXG5BbmltYXRlLmRlZmF1bHRzID0gZGVmYXVsdHNcbiJdfQ==

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Transition = __webpack_require__(119);

var _Transition2 = _interopRequireDefault(_Transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//


var Appear = function (_Component) {
  _inherits(Appear, _Component);

  function Appear() {
    _classCallCheck(this, Appear);

    var _this = _possibleConstructorReturn(this, (Appear.__proto__ || Object.getPrototypeOf(Appear)).call(this));

    _this.refresh = _this.refresh.bind(_this);
    return _this;
  }

  _createClass(Appear, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.refresh(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.refresh(props);
    }
  }, {
    key: 'refresh',
    value: function refresh(props) {
      this.update = function () {
        return props.update;
      };
      this.enter = function () {
        return props.enter;
      };
      this.leave = function () {
        return props.leave;
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          update = _props.update,
          enter = _props.enter,
          leave = _props.leave,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['show', 'update', 'enter', 'leave', 'children']);

      return _react2.default.createElement(
        _Transition2.default,
        _extends({}, rest, {
          data: show ? [true] : [],
          getKey: function getKey(d) {
            return d;
          },
          update: this.update,
          enter: this.enter,
          leave: this.leave
        }),
        function (items) {
          return items.length ? children(items[0].state) : null;
        }
      );
    }
  }]);

  return Appear;
}(_react.Component);

Appear.defaultProps = {
  show: true
};
exports.default = Appear;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BcHBlYXIuanMiXSwibmFtZXMiOlsiQXBwZWFyIiwicmVmcmVzaCIsImJpbmQiLCJwcm9wcyIsInVwZGF0ZSIsImVudGVyIiwibGVhdmUiLCJzaG93IiwiY2hpbGRyZW4iLCJyZXN0IiwiZCIsIml0ZW1zIiwibGVuZ3RoIiwic3RhdGUiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7O0FBREE7OztJQUdxQkEsTTs7O0FBSW5CLG9CQUFlO0FBQUE7O0FBQUE7O0FBRWIsVUFBS0MsT0FBTCxHQUFlLE1BQUtBLE9BQUwsQ0FBYUMsSUFBYixPQUFmO0FBRmE7QUFHZDs7Ozt5Q0FDcUI7QUFDcEIsV0FBS0QsT0FBTCxDQUFhLEtBQUtFLEtBQWxCO0FBQ0Q7Ozs4Q0FDMEJBLEssRUFBTztBQUNoQyxXQUFLRixPQUFMLENBQWFFLEtBQWI7QUFDRDs7OzRCQUNRQSxLLEVBQU87QUFDZCxXQUFLQyxNQUFMLEdBQWM7QUFBQSxlQUFNRCxNQUFNQyxNQUFaO0FBQUEsT0FBZDtBQUNBLFdBQUtDLEtBQUwsR0FBYTtBQUFBLGVBQU1GLE1BQU1FLEtBQVo7QUFBQSxPQUFiO0FBQ0EsV0FBS0MsS0FBTCxHQUFhO0FBQUEsZUFBTUgsTUFBTUcsS0FBWjtBQUFBLE9BQWI7QUFDRDs7OzZCQUNTO0FBQUEsbUJBQ2tELEtBQUtILEtBRHZEO0FBQUEsVUFDQUksSUFEQSxVQUNBQSxJQURBO0FBQUEsVUFDTUgsTUFETixVQUNNQSxNQUROO0FBQUEsVUFDY0MsS0FEZCxVQUNjQSxLQURkO0FBQUEsVUFDcUJDLEtBRHJCLFVBQ3FCQSxLQURyQjtBQUFBLFVBQzRCRSxRQUQ1QixVQUM0QkEsUUFENUI7QUFBQSxVQUN5Q0MsSUFEekM7O0FBRVIsYUFDRTtBQUFBO0FBQUEscUJBQ01BLElBRE47QUFFRSxnQkFBTUYsT0FBTyxDQUFDLElBQUQsQ0FBUCxHQUFnQixFQUZ4QjtBQUdFLGtCQUFRO0FBQUEsbUJBQUtHLENBQUw7QUFBQSxXQUhWO0FBSUUsa0JBQVEsS0FBS04sTUFKZjtBQUtFLGlCQUFPLEtBQUtDLEtBTGQ7QUFNRSxpQkFBTyxLQUFLQztBQU5kO0FBUUc7QUFBQSxpQkFBVUssTUFBTUMsTUFBTixHQUFlSixTQUFTRyxNQUFNLENBQU4sRUFBU0UsS0FBbEIsQ0FBZixHQUEwQyxJQUFwRDtBQUFBO0FBUkgsT0FERjtBQVlEOzs7Ozs7QUFqQ2tCYixNLENBQ1pjLFksR0FBZTtBQUNwQlAsUUFBTTtBQURjLEM7a0JBREhQLE0iLCJmaWxlIjoiQXBwZWFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuLy9cbmltcG9ydCBUcmFuc2l0aW9uIGZyb20gJy4vVHJhbnNpdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwZWFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzaG93OiB0cnVlLFxuICB9XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5yZWZyZXNoID0gdGhpcy5yZWZyZXNoLmJpbmQodGhpcylcbiAgfVxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuICAgIHRoaXMucmVmcmVzaCh0aGlzLnByb3BzKVxuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKHByb3BzKSB7XG4gICAgdGhpcy5yZWZyZXNoKHByb3BzKVxuICB9XG4gIHJlZnJlc2ggKHByb3BzKSB7XG4gICAgdGhpcy51cGRhdGUgPSAoKSA9PiBwcm9wcy51cGRhdGVcbiAgICB0aGlzLmVudGVyID0gKCkgPT4gcHJvcHMuZW50ZXJcbiAgICB0aGlzLmxlYXZlID0gKCkgPT4gcHJvcHMubGVhdmVcbiAgfVxuICByZW5kZXIgKCkge1xuICAgIGNvbnN0IHsgc2hvdywgdXBkYXRlLCBlbnRlciwgbGVhdmUsIGNoaWxkcmVuLCAuLi5yZXN0IH0gPSB0aGlzLnByb3BzXG4gICAgcmV0dXJuIChcbiAgICAgIDxUcmFuc2l0aW9uXG4gICAgICAgIHsuLi5yZXN0fVxuICAgICAgICBkYXRhPXtzaG93ID8gW3RydWVdIDogW119XG4gICAgICAgIGdldEtleT17ZCA9PiBkfVxuICAgICAgICB1cGRhdGU9e3RoaXMudXBkYXRlfVxuICAgICAgICBlbnRlcj17dGhpcy5lbnRlcn1cbiAgICAgICAgbGVhdmU9e3RoaXMubGVhdmV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtcyA9PiAoaXRlbXMubGVuZ3RoID8gY2hpbGRyZW4oaXRlbXNbMF0uc3RhdGUpIDogbnVsbCl9XG4gICAgICA8L1RyYW5zaXRpb24+XG4gICAgKVxuICB9XG59XG4iXX0=

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = Connect;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(118);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var alwaysUpdate = function alwaysUpdate(d) {
  return d;
};
var neverUpdate = function neverUpdate() {
  return {};
};

var defaultConfig = {
  statics: {}
};

function Connect(subscribe) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultConfig;

  // If subscribe is true, always update,
  // If Subscribe is truthy, expect a function
  // Otherwise, never update the component, only provide dispatch
  subscribe = subscribe === true ? alwaysUpdate : subscribe || neverUpdate;
  var statics = config.statics;


  return function (ComponentToWrap) {
    var Connected = function (_PureComponent) {
      _inherits(Connected, _PureComponent);

      // let’s define what’s needed from the `context`
      function Connected() {
        _classCallCheck(this, Connected);

        // Bind non-react methods
        var _this = _possibleConstructorReturn(this, (Connected.__proto__ || Object.getPrototypeOf(Connected)).call(this));

        _this.onNotify = _this.onNotify.bind(_this);

        // Find out if subscribe returns a function
        var subscribePreview = void 0;
        try {
          subscribePreview = subscribe();
        } catch (e) {}

        if (typeof subscribePreview === 'function') {
          // If it does, make a new instance of it for this component
          _this.subscribe = subscribe();
        } else {
          // Otherwise just use it as is
          _this.subscribe = subscribe;
        }
        return _this;
      }

      _createClass(Connected, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          // Resolve props on mount
          this.resolveProps();
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          // Subscribe to the store for updates
          this.unsubscribe = this.context.reactState.subscribe(this.onNotify.bind(this), config);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (this.resolveProps(nextProps)) {
            this.forceUpdate();
          }
        }
      }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
          return false;
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.unsubscribe();
        }
      }, {
        key: 'onNotify',
        value: function onNotify() {
          if (this.resolveProps()) {
            this.forceUpdate();
          }
        }
      }, {
        key: 'resolveProps',
        value: function resolveProps() {
          var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

          var children = props.children,
              rest = _objectWithoutProperties(props, ['children']);

          var reactState = this.context.reactState;


          var mappedProps = this.subscribe(reactState.getStore(), rest);

          var newProps = _extends({}, rest, mappedProps);

          var needsUpdate = !this.resolvedProps;

          if (this.resolvedProps) {
            for (var prop in newProps) {
              if (newProps.hasOwnProperty(prop)) {
                if (this.resolvedProps[prop] !== newProps[prop]) {
                  needsUpdate = true;
                  break;
                }
                if (needsUpdate) break;
              }
              if (needsUpdate) break;
            }
          }

          this.resolvedProps = newProps;

          return needsUpdate;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(ComponentToWrap, _extends({}, this.props, this.resolvedProps, {
            dispatch: this.context.reactState.dispatch
          }));
        }
      }]);

      return Connected;
    }(_react.PureComponent);

    Connected.displayName = 'Connect(' + (ComponentToWrap.displayName || ComponentToWrap.name) + ')';
    Connected.contextTypes = {
      reactState: _propTypes2.default.object.isRequired
    };


    for (var prop in statics) {
      if (statics.hasOwnProperty(prop)) {
        Connected[prop] = statics[prop];
      }
    }
    return Connected;
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db25uZWN0LmpzIl0sIm5hbWVzIjpbIkNvbm5lY3QiLCJhbHdheXNVcGRhdGUiLCJkIiwibmV2ZXJVcGRhdGUiLCJkZWZhdWx0Q29uZmlnIiwic3RhdGljcyIsInN1YnNjcmliZSIsImNvbmZpZyIsIkNvbm5lY3RlZCIsIm9uTm90aWZ5IiwiYmluZCIsInN1YnNjcmliZVByZXZpZXciLCJlIiwicmVzb2x2ZVByb3BzIiwidW5zdWJzY3JpYmUiLCJjb250ZXh0IiwicmVhY3RTdGF0ZSIsIm5leHRQcm9wcyIsImZvcmNlVXBkYXRlIiwicHJvcHMiLCJjaGlsZHJlbiIsInJlc3QiLCJtYXBwZWRQcm9wcyIsImdldFN0b3JlIiwibmV3UHJvcHMiLCJuZWVkc1VwZGF0ZSIsInJlc29sdmVkUHJvcHMiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJkaXNwYXRjaCIsImRpc3BsYXlOYW1lIiwiQ29tcG9uZW50VG9XcmFwIiwibmFtZSIsImNvbnRleHRUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBVXdCQSxPOztBQVZ4Qjs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1DLGVBQWUsU0FBZkEsWUFBZTtBQUFBLFNBQUtDLENBQUw7QUFBQSxDQUFyQjtBQUNBLElBQU1DLGNBQWMsU0FBZEEsV0FBYztBQUFBLFNBQU8sRUFBUDtBQUFBLENBQXBCOztBQUVBLElBQU1DLGdCQUFnQjtBQUNwQkMsV0FBUztBQURXLENBQXRCOztBQUllLFNBQVNMLE9BQVQsQ0FBaUJNLFNBQWpCLEVBQW9EO0FBQUEsTUFBeEJDLE1BQXdCLHVFQUFmSCxhQUFlOztBQUNqRTtBQUNBO0FBQ0E7QUFDQUUsY0FBWUEsY0FBYyxJQUFkLEdBQXFCTCxZQUFyQixHQUFvQ0ssYUFBYUgsV0FBN0Q7QUFKaUUsTUFLekRFLE9BTHlELEdBSzdDRSxNQUw2QyxDQUt6REYsT0FMeUQ7OztBQU9qRSxTQUFPLDJCQUFtQjtBQUFBLFFBQ2xCRyxTQURrQjtBQUFBOztBQUV0QjtBQUtBLDJCQUFjO0FBQUE7O0FBRVo7QUFGWTs7QUFHWixjQUFLQyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY0MsSUFBZCxPQUFoQjs7QUFFQTtBQUNBLFlBQUlDLHlCQUFKO0FBQ0EsWUFBSTtBQUNGQSw2QkFBbUJMLFdBQW5CO0FBQ0QsU0FGRCxDQUVFLE9BQU9NLENBQVAsRUFBVSxDQUFFOztBQUVkLFlBQUksT0FBT0QsZ0JBQVAsS0FBNEIsVUFBaEMsRUFBNEM7QUFDMUM7QUFDQSxnQkFBS0wsU0FBTCxHQUFpQkEsV0FBakI7QUFDRCxTQUhELE1BR087QUFDTDtBQUNBLGdCQUFLQSxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEO0FBakJXO0FBa0JiOztBQXpCcUI7QUFBQTtBQUFBLDZDQTBCRDtBQUNuQjtBQUNBLGVBQUtPLFlBQUw7QUFDRDtBQTdCcUI7QUFBQTtBQUFBLDRDQThCRjtBQUNsQjtBQUNBLGVBQUtDLFdBQUwsR0FBbUIsS0FBS0MsT0FBTCxDQUFhQyxVQUFiLENBQXdCVixTQUF4QixDQUNqQixLQUFLRyxRQUFMLENBQWNDLElBQWQsQ0FBbUIsSUFBbkIsQ0FEaUIsRUFFakJILE1BRmlCLENBQW5CO0FBSUQ7QUFwQ3FCO0FBQUE7QUFBQSxrREFxQ0lVLFNBckNKLEVBcUNlO0FBQ25DLGNBQUksS0FBS0osWUFBTCxDQUFrQkksU0FBbEIsQ0FBSixFQUFrQztBQUNoQyxpQkFBS0MsV0FBTDtBQUNEO0FBQ0Y7QUF6Q3FCO0FBQUE7QUFBQSxnREEwQ0U7QUFDdEIsaUJBQU8sS0FBUDtBQUNEO0FBNUNxQjtBQUFBO0FBQUEsK0NBNkNDO0FBQ3JCLGVBQUtKLFdBQUw7QUFDRDtBQS9DcUI7QUFBQTtBQUFBLG1DQWdEWDtBQUNULGNBQUksS0FBS0QsWUFBTCxFQUFKLEVBQXlCO0FBQ3ZCLGlCQUFLSyxXQUFMO0FBQ0Q7QUFDRjtBQXBEcUI7QUFBQTtBQUFBLHVDQXFEVztBQUFBLGNBQXBCQyxLQUFvQix1RUFBWixLQUFLQSxLQUFPOztBQUFBLGNBRTdCQyxRQUY2QixHQUkzQkQsS0FKMkIsQ0FFN0JDLFFBRjZCO0FBQUEsY0FHMUJDLElBSDBCLDRCQUkzQkYsS0FKMkI7O0FBQUEsY0FLdkJILFVBTHVCLEdBS1IsS0FBS0QsT0FMRyxDQUt2QkMsVUFMdUI7OztBQU8vQixjQUFNTSxjQUFjLEtBQUtoQixTQUFMLENBQWVVLFdBQVdPLFFBQVgsRUFBZixFQUFzQ0YsSUFBdEMsQ0FBcEI7O0FBRUEsY0FBTUcsd0JBQ0RILElBREMsRUFFREMsV0FGQyxDQUFOOztBQUtBLGNBQUlHLGNBQWMsQ0FBQyxLQUFLQyxhQUF4Qjs7QUFFQSxjQUFJLEtBQUtBLGFBQVQsRUFBd0I7QUFDdEIsaUJBQUssSUFBSUMsSUFBVCxJQUFpQkgsUUFBakIsRUFBMkI7QUFDekIsa0JBQUlBLFNBQVNJLGNBQVQsQ0FBd0JELElBQXhCLENBQUosRUFBbUM7QUFDakMsb0JBQUksS0FBS0QsYUFBTCxDQUFtQkMsSUFBbkIsTUFBNkJILFNBQVNHLElBQVQsQ0FBakMsRUFBaUQ7QUFDL0NGLGdDQUFjLElBQWQ7QUFDQTtBQUNEO0FBQ0Qsb0JBQUlBLFdBQUosRUFBaUI7QUFDbEI7QUFDRCxrQkFBSUEsV0FBSixFQUFpQjtBQUNsQjtBQUNGOztBQUVELGVBQUtDLGFBQUwsR0FBcUJGLFFBQXJCOztBQUVBLGlCQUFPQyxXQUFQO0FBQ0Q7QUFyRnFCO0FBQUE7QUFBQSxpQ0FzRmI7QUFDUCxpQkFDRSw4QkFBQyxlQUFELGVBQ00sS0FBS04sS0FEWCxFQUVNLEtBQUtPLGFBRlg7QUFHRSxzQkFBVSxLQUFLWCxPQUFMLENBQWFDLFVBQWIsQ0FBd0JhO0FBSHBDLGFBREY7QUFPRDtBQTlGcUI7O0FBQUE7QUFBQTs7QUFDbEJyQixhQURrQixDQUdmc0IsV0FIZSxpQkFHVUMsZ0JBQWdCRCxXQUFoQixJQUErQkMsZ0JBQWdCQyxJQUh6RDtBQUNsQnhCLGFBRGtCLENBSWZ5QixZQUplLEdBSUE7QUFDcEJqQixrQkFBWSxvQkFBVWtCLE1BQVYsQ0FBaUJDO0FBRFQsS0FKQTs7O0FBaUd4QixTQUFLLElBQUlSLElBQVQsSUFBaUJ0QixPQUFqQixFQUEwQjtBQUN4QixVQUFJQSxRQUFRdUIsY0FBUixDQUF1QkQsSUFBdkIsQ0FBSixFQUFrQztBQUNoQ25CLGtCQUFVbUIsSUFBVixJQUFrQnRCLFFBQVFzQixJQUFSLENBQWxCO0FBQ0Q7QUFDRjtBQUNELFdBQU9uQixTQUFQO0FBQ0QsR0F2R0Q7QUF3R0QiLCJmaWxlIjoiQ29ubmVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmNvbnN0IGFsd2F5c1VwZGF0ZSA9IGQgPT4gZFxuY29uc3QgbmV2ZXJVcGRhdGUgPSAoKSA9PiAoe30pXG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIHN0YXRpY3M6IHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENvbm5lY3Qoc3Vic2NyaWJlLCBjb25maWcgPSBkZWZhdWx0Q29uZmlnKSB7XG4gIC8vIElmIHN1YnNjcmliZSBpcyB0cnVlLCBhbHdheXMgdXBkYXRlLFxuICAvLyBJZiBTdWJzY3JpYmUgaXMgdHJ1dGh5LCBleHBlY3QgYSBmdW5jdGlvblxuICAvLyBPdGhlcndpc2UsIG5ldmVyIHVwZGF0ZSB0aGUgY29tcG9uZW50LCBvbmx5IHByb3ZpZGUgZGlzcGF0Y2hcbiAgc3Vic2NyaWJlID0gc3Vic2NyaWJlID09PSB0cnVlID8gYWx3YXlzVXBkYXRlIDogc3Vic2NyaWJlIHx8IG5ldmVyVXBkYXRlXG4gIGNvbnN0IHsgc3RhdGljcyB9ID0gY29uZmlnXG5cbiAgcmV0dXJuIENvbXBvbmVudFRvV3JhcCA9PiB7XG4gICAgY2xhc3MgQ29ubmVjdGVkIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gICAgICAvLyBsZXTigJlzIGRlZmluZSB3aGF04oCZcyBuZWVkZWQgZnJvbSB0aGUgYGNvbnRleHRgXG4gICAgICBzdGF0aWMgZGlzcGxheU5hbWUgPSBgQ29ubmVjdCgke0NvbXBvbmVudFRvV3JhcC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnRUb1dyYXAubmFtZX0pYFxuICAgICAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICAgICAgcmVhY3RTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgICB9XG4gICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICAvLyBCaW5kIG5vbi1yZWFjdCBtZXRob2RzXG4gICAgICAgIHRoaXMub25Ob3RpZnkgPSB0aGlzLm9uTm90aWZ5LmJpbmQodGhpcylcblxuICAgICAgICAvLyBGaW5kIG91dCBpZiBzdWJzY3JpYmUgcmV0dXJucyBhIGZ1bmN0aW9uXG4gICAgICAgIGxldCBzdWJzY3JpYmVQcmV2aWV3XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3Vic2NyaWJlUHJldmlldyA9IHN1YnNjcmliZSgpXG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzdWJzY3JpYmVQcmV2aWV3ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gSWYgaXQgZG9lcywgbWFrZSBhIG5ldyBpbnN0YW5jZSBvZiBpdCBmb3IgdGhpcyBjb21wb25lbnRcbiAgICAgICAgICB0aGlzLnN1YnNjcmliZSA9IHN1YnNjcmliZSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgdXNlIGl0IGFzIGlzXG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmUgPSBzdWJzY3JpYmVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgICAgICAvLyBSZXNvbHZlIHByb3BzIG9uIG1vdW50XG4gICAgICAgIHRoaXMucmVzb2x2ZVByb3BzKClcbiAgICAgIH1cbiAgICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gdGhlIHN0b3JlIGZvciB1cGRhdGVzXG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSB0aGlzLmNvbnRleHQucmVhY3RTdGF0ZS5zdWJzY3JpYmUoXG4gICAgICAgICAgdGhpcy5vbk5vdGlmeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGNvbmZpZ1xuICAgICAgICApXG4gICAgICB9XG4gICAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5yZXNvbHZlUHJvcHMobmV4dFByb3BzKSkge1xuICAgICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzaG91bGRDb21wb25lbnRVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKVxuICAgICAgfVxuICAgICAgb25Ob3RpZnkoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc29sdmVQcm9wcygpKSB7XG4gICAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc29sdmVQcm9wcyhwcm9wcyA9IHRoaXMucHJvcHMpIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGNoaWxkcmVuLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICAgICAgLi4ucmVzdFxuICAgICAgICB9ID0gcHJvcHNcbiAgICAgICAgY29uc3QgeyByZWFjdFN0YXRlIH0gPSB0aGlzLmNvbnRleHRcblxuICAgICAgICBjb25zdCBtYXBwZWRQcm9wcyA9IHRoaXMuc3Vic2NyaWJlKHJlYWN0U3RhdGUuZ2V0U3RvcmUoKSwgcmVzdClcblxuICAgICAgICBjb25zdCBuZXdQcm9wcyA9IHtcbiAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgIC4uLm1hcHBlZFByb3BzXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmVlZHNVcGRhdGUgPSAhdGhpcy5yZXNvbHZlZFByb3BzXG5cbiAgICAgICAgaWYgKHRoaXMucmVzb2x2ZWRQcm9wcykge1xuICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gbmV3UHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChuZXdQcm9wcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5yZXNvbHZlZFByb3BzW3Byb3BdICE9PSBuZXdQcm9wc1twcm9wXSkge1xuICAgICAgICAgICAgICAgIG5lZWRzVXBkYXRlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5lZWRzVXBkYXRlKSBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVzb2x2ZWRQcm9wcyA9IG5ld1Byb3BzXG5cbiAgICAgICAgcmV0dXJuIG5lZWRzVXBkYXRlXG4gICAgICB9XG4gICAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPENvbXBvbmVudFRvV3JhcFxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICB7Li4udGhpcy5yZXNvbHZlZFByb3BzfVxuICAgICAgICAgICAgZGlzcGF0Y2g9e3RoaXMuY29udGV4dC5yZWFjdFN0YXRlLmRpc3BhdGNofVxuICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wIGluIHN0YXRpY3MpIHtcbiAgICAgIGlmIChzdGF0aWNzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIENvbm5lY3RlZFtwcm9wXSA9IHN0YXRpY3NbcHJvcF1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIENvbm5lY3RlZFxuICB9XG59XG4iXX0=

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComponentToWrap) {
  var _class, _temp;

  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultConfig;

  return _temp = _class = function (_PureComponent) {
    _inherits(Provider, _PureComponent);

    function Provider(props) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this));

      var children = props.children,
          rest = _objectWithoutProperties(props, ['children']);
      // Initialize the store with initial state and props


      _this.store = _extends({}, config.initial, rest);
      _this.subscriptions = [];
      _this.subscribe = _this.subscribe.bind(_this);
      _this.dispatch = _this.dispatch.bind(_this);
      return _this;
    }
    // Define our context key


    _createClass(Provider, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
        // If the component receives new props, merge them into
        // the store and notify subscribers
        this.dispatch(function (state) {
          return _extends({}, state, newProps);
        });
        this.forceUpdate();
      }
    }, {
      key: 'subscribe',
      value: function subscribe(connect) {
        var _this2 = this;

        var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var subscription = {
          connect: connect,
          meta: meta
        };
        // Add the subscription
        this.subscriptions.push(subscription);
        // return an unsubscribe function
        return function () {
          _this2.subscriptions = _this2.subscriptions.filter(function (d) {
            return d !== subscription;
          });
        };
      }
    }, {
      key: 'dispatch',
      value: function dispatch(fn) {
        var meta = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        // When we recieve a dispatch command, build a new version
        // of the store by calling the dispatch function

        // TODO: beforeDispatch
        var oldStore = this.store;
        var newStore = fn(oldStore);
        // TODO: middleware
        this.store = newStore;
        this.subscriptions.forEach(function (subscription) {
          var shouldNotify = true;
          if (subscription.meta.filter) {
            shouldNotify = subscription.meta.filter(oldStore, newStore, meta);
          }
          shouldNotify && subscription.connect();
        });
        this.forceUpdate();
      }
    }, {
      key: 'getChildContext',
      value: function getChildContext() {
        var _this3 = this;

        return {
          reactState: {
            getStore: function getStore() {
              return _this3.store;
            },
            subscribe: this.subscribe,
            dispatch: this.dispatch
          }
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          ComponentToWrap,
          this.store,
          this.props.children
        );
      }
    }]);

    return Provider;
  }(_react.PureComponent), _class.childContextTypes = {
    reactState: _propTypes2.default.object.isRequired
  }, _temp;
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(118);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultConfig = {
  initial: {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Qcm92aWRlci5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnRUb1dyYXAiLCJjb25maWciLCJkZWZhdWx0Q29uZmlnIiwicHJvcHMiLCJjaGlsZHJlbiIsInJlc3QiLCJzdG9yZSIsImluaXRpYWwiLCJzdWJzY3JpcHRpb25zIiwic3Vic2NyaWJlIiwiYmluZCIsImRpc3BhdGNoIiwibmV3UHJvcHMiLCJzdGF0ZSIsImZvcmNlVXBkYXRlIiwiY29ubmVjdCIsIm1ldGEiLCJzdWJzY3JpcHRpb24iLCJwdXNoIiwiZmlsdGVyIiwiZCIsImZuIiwib2xkU3RvcmUiLCJuZXdTdG9yZSIsImZvckVhY2giLCJzaG91bGROb3RpZnkiLCJyZWFjdFN0YXRlIiwiZ2V0U3RvcmUiLCJjaGlsZENvbnRleHRUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBT2UsVUFBU0EsZUFBVCxFQUFrRDtBQUFBOztBQUFBLE1BQXhCQyxNQUF3Qix1RUFBZkMsYUFBZTs7QUFDL0Q7QUFBQTs7QUFLRSxzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUFBLFVBR2ZDLFFBSGUsR0FLYkQsS0FMYSxDQUdmQyxRQUhlO0FBQUEsVUFJWkMsSUFKWSw0QkFLYkYsS0FMYTtBQU1qQjs7O0FBQ0EsWUFBS0csS0FBTCxnQkFDS0wsT0FBT00sT0FEWixFQUVLRixJQUZMO0FBSUEsWUFBS0csYUFBTCxHQUFxQixFQUFyQjtBQUNBLFlBQUtDLFNBQUwsR0FBaUIsTUFBS0EsU0FBTCxDQUFlQyxJQUFmLE9BQWpCO0FBQ0EsWUFBS0MsUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNELElBQWQsT0FBaEI7QUFiaUI7QUFjbEI7QUFsQkQ7OztBQURGO0FBQUE7QUFBQSxnREFvQjRCRSxRQXBCNUIsRUFvQnNDO0FBQ2xDO0FBQ0E7QUFDQSxhQUFLRCxRQUFMLENBQWM7QUFBQSw4QkFDVEUsS0FEUyxFQUVURCxRQUZTO0FBQUEsU0FBZDtBQUlBLGFBQUtFLFdBQUw7QUFDRDtBQTVCSDtBQUFBO0FBQUEsZ0NBNkJZQyxPQTdCWixFQTZCZ0M7QUFBQTs7QUFBQSxZQUFYQyxJQUFXLHVFQUFKLEVBQUk7O0FBQzVCLFlBQU1DLGVBQWU7QUFDbkJGLDBCQURtQjtBQUVuQkM7QUFGbUIsU0FBckI7QUFJQTtBQUNBLGFBQUtSLGFBQUwsQ0FBbUJVLElBQW5CLENBQXdCRCxZQUF4QjtBQUNBO0FBQ0EsZUFBTyxZQUFNO0FBQ1gsaUJBQUtULGFBQUwsR0FBcUIsT0FBS0EsYUFBTCxDQUFtQlcsTUFBbkIsQ0FBMEI7QUFBQSxtQkFBS0MsTUFBTUgsWUFBWDtBQUFBLFdBQTFCLENBQXJCO0FBQ0QsU0FGRDtBQUdEO0FBeENIO0FBQUE7QUFBQSwrQkF5Q1dJLEVBekNYLEVBeUMwQjtBQUFBLFlBQVhMLElBQVcsdUVBQUosRUFBSTs7QUFDdEI7QUFDQTs7QUFFQTtBQUNBLFlBQU1NLFdBQVcsS0FBS2hCLEtBQXRCO0FBQ0EsWUFBTWlCLFdBQVdGLEdBQUdDLFFBQUgsQ0FBakI7QUFDQTtBQUNBLGFBQUtoQixLQUFMLEdBQWFpQixRQUFiO0FBQ0EsYUFBS2YsYUFBTCxDQUFtQmdCLE9BQW5CLENBQTJCLHdCQUFnQjtBQUN6QyxjQUFJQyxlQUFlLElBQW5CO0FBQ0EsY0FBSVIsYUFBYUQsSUFBYixDQUFrQkcsTUFBdEIsRUFBOEI7QUFDNUJNLDJCQUFlUixhQUFhRCxJQUFiLENBQWtCRyxNQUFsQixDQUF5QkcsUUFBekIsRUFBbUNDLFFBQW5DLEVBQTZDUCxJQUE3QyxDQUFmO0FBQ0Q7QUFDRFMsMEJBQWdCUixhQUFhRixPQUFiLEVBQWhCO0FBQ0QsU0FORDtBQU9BLGFBQUtELFdBQUw7QUFDRDtBQTFESDtBQUFBO0FBQUEsd0NBMkRvQjtBQUFBOztBQUNoQixlQUFPO0FBQ0xZLHNCQUFZO0FBQ1ZDLHNCQUFVO0FBQUEscUJBQU0sT0FBS3JCLEtBQVg7QUFBQSxhQURBO0FBRVZHLHVCQUFXLEtBQUtBLFNBRk47QUFHVkUsc0JBQVUsS0FBS0E7QUFITDtBQURQLFNBQVA7QUFPRDtBQW5FSDtBQUFBO0FBQUEsK0JBb0VXO0FBQ1AsZUFDRTtBQUFDLHlCQUFEO0FBQXFCLGVBQUtMLEtBQTFCO0FBQ0csZUFBS0gsS0FBTCxDQUFXQztBQURkLFNBREY7QUFLRDtBQTFFSDs7QUFBQTtBQUFBLGtDQUVTd0IsaUJBRlQsR0FFNkI7QUFDekJGLGdCQUFZLG9CQUFVRyxNQUFWLENBQWlCQztBQURKLEdBRjdCO0FBNEVELEM7O0FBcEZEOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTTVCLGdCQUFnQjtBQUNwQkssV0FBUztBQURXLENBQXRCIiwiZmlsZSI6IlByb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgaW5pdGlhbDoge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oQ29tcG9uZW50VG9XcmFwLCBjb25maWcgPSBkZWZhdWx0Q29uZmlnKSB7XG4gIHJldHVybiBjbGFzcyBQcm92aWRlciBleHRlbmRzIFB1cmVDb21wb25lbnQge1xuICAgIC8vIERlZmluZSBvdXIgY29udGV4dCBrZXlcbiAgICBzdGF0aWMgY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gICAgICByZWFjdFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgIHN1cGVyKClcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2hpbGRyZW4sIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgLi4ucmVzdFxuICAgICAgfSA9IHByb3BzXG4gICAgICAvLyBJbml0aWFsaXplIHRoZSBzdG9yZSB3aXRoIGluaXRpYWwgc3RhdGUgYW5kIHByb3BzXG4gICAgICB0aGlzLnN0b3JlID0ge1xuICAgICAgICAuLi5jb25maWcuaW5pdGlhbCxcbiAgICAgICAgLi4ucmVzdFxuICAgICAgfVxuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW11cbiAgICAgIHRoaXMuc3Vic2NyaWJlID0gdGhpcy5zdWJzY3JpYmUuYmluZCh0aGlzKVxuICAgICAgdGhpcy5kaXNwYXRjaCA9IHRoaXMuZGlzcGF0Y2guYmluZCh0aGlzKVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAvLyBJZiB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcywgbWVyZ2UgdGhlbSBpbnRvXG4gICAgICAvLyB0aGUgc3RvcmUgYW5kIG5vdGlmeSBzdWJzY3JpYmVyc1xuICAgICAgdGhpcy5kaXNwYXRjaChzdGF0ZSA9PiAoe1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgLi4ubmV3UHJvcHNcbiAgICAgIH0pKVxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuICAgIHN1YnNjcmliZShjb25uZWN0LCBtZXRhID0ge30pIHtcbiAgICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IHtcbiAgICAgICAgY29ubmVjdCxcbiAgICAgICAgbWV0YVxuICAgICAgfVxuICAgICAgLy8gQWRkIHRoZSBzdWJzY3JpcHRpb25cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1YnNjcmlwdGlvbilcbiAgICAgIC8vIHJldHVybiBhbiB1bnN1YnNjcmliZSBmdW5jdGlvblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gdGhpcy5zdWJzY3JpcHRpb25zLmZpbHRlcihkID0+IGQgIT09IHN1YnNjcmlwdGlvbilcbiAgICAgIH1cbiAgICB9XG4gICAgZGlzcGF0Y2goZm4sIG1ldGEgPSB7fSkge1xuICAgICAgLy8gV2hlbiB3ZSByZWNpZXZlIGEgZGlzcGF0Y2ggY29tbWFuZCwgYnVpbGQgYSBuZXcgdmVyc2lvblxuICAgICAgLy8gb2YgdGhlIHN0b3JlIGJ5IGNhbGxpbmcgdGhlIGRpc3BhdGNoIGZ1bmN0aW9uXG5cbiAgICAgIC8vIFRPRE86IGJlZm9yZURpc3BhdGNoXG4gICAgICBjb25zdCBvbGRTdG9yZSA9IHRoaXMuc3RvcmVcbiAgICAgIGNvbnN0IG5ld1N0b3JlID0gZm4ob2xkU3RvcmUpXG4gICAgICAvLyBUT0RPOiBtaWRkbGV3YXJlXG4gICAgICB0aGlzLnN0b3JlID0gbmV3U3RvcmVcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5mb3JFYWNoKHN1YnNjcmlwdGlvbiA9PiB7XG4gICAgICAgIGxldCBzaG91bGROb3RpZnkgPSB0cnVlXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24ubWV0YS5maWx0ZXIpIHtcbiAgICAgICAgICBzaG91bGROb3RpZnkgPSBzdWJzY3JpcHRpb24ubWV0YS5maWx0ZXIob2xkU3RvcmUsIG5ld1N0b3JlLCBtZXRhKVxuICAgICAgICB9XG4gICAgICAgIHNob3VsZE5vdGlmeSAmJiBzdWJzY3JpcHRpb24uY29ubmVjdCgpXG4gICAgICB9KVxuICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpXG4gICAgfVxuICAgIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlYWN0U3RhdGU6IHtcbiAgICAgICAgICBnZXRTdG9yZTogKCkgPT4gdGhpcy5zdG9yZSxcbiAgICAgICAgICBzdWJzY3JpYmU6IHRoaXMuc3Vic2NyaWJlLFxuICAgICAgICAgIGRpc3BhdGNoOiB0aGlzLmRpc3BhdGNoXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPENvbXBvbmVudFRvV3JhcCB7Li4udGhpcy5zdG9yZX0+XG4gICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgIDwvQ29tcG9uZW50VG9XcmFwPlxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuIl19

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(18);

var invariant = __webpack_require__(7);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(38);

var ReactBaseClasses = __webpack_require__(121);
var ReactChildren = __webpack_require__(291);
var ReactDOMFactories = __webpack_require__(292);
var ReactElement = __webpack_require__(15);
var ReactPropTypes = __webpack_require__(294);
var ReactVersion = __webpack_require__(296);

var createReactClass = __webpack_require__(298);
var onlyChild = __webpack_require__(299);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var lowPriorityWarning = __webpack_require__(65);
  var canDefineProperty = __webpack_require__(40);
  var ReactElementValidator = __webpack_require__(123);
  var didWarnPropTypesDeprecated = false;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;
var createMixin = function (mixin) {
  return mixin;
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForSpread = false;
  var warnedForCreateMixin = false;
  __spread = function () {
    lowPriorityWarning(warnedForSpread, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.');
    warnedForSpread = true;
    return _assign.apply(null, arguments);
  };

  createMixin = function (mixin) {
    lowPriorityWarning(warnedForCreateMixin, 'React.createMixin is deprecated and should not be used. ' + 'In React v16.0, it will be removed. ' + 'You can use this mixin directly instead. ' + 'See https://fb.me/createmixin-was-never-implemented for more info.');
    warnedForCreateMixin = true;
    return mixin;
  };
}

var React = {
  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: createReactClass,
  createFactory: createFactory,
  createMixin: createMixin,

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

if (process.env.NODE_ENV !== 'production') {
  var warnedForCreateClass = false;
  if (canDefineProperty) {
    Object.defineProperty(React, 'PropTypes', {
      get: function () {
        lowPriorityWarning(didWarnPropTypesDeprecated, 'Accessing PropTypes via the main React package is deprecated,' + ' and will be removed in  React v16.0.' + ' Use the latest available v15.* prop-types package from npm instead.' + ' For info on usage, compatibility, migration and more, see ' + 'https://fb.me/prop-types-docs');
        didWarnPropTypesDeprecated = true;
        return ReactPropTypes;
      }
    });

    Object.defineProperty(React, 'createClass', {
      get: function () {
        lowPriorityWarning(warnedForCreateClass, 'Accessing createClass via the main React package is deprecated,' + ' and will be removed in React v16.0.' + " Use a plain JavaScript class instead. If you're not yet " + 'ready to migrate, create-react-class v15.* is available ' + 'on npm as a temporary, drop-in replacement. ' + 'For more info see https://fb.me/react-create-class');
        warnedForCreateClass = true;
        return createReactClass;
      }
    });
  }

  // React.DOM factories are deprecated. Wrap these methods so that
  // invocations of the React.DOM namespace and alert users to switch
  // to the `react-dom-factories` package.
  React.DOM = {};
  var warnedForFactories = false;
  Object.keys(ReactDOMFactories).forEach(function (factory) {
    React.DOM[factory] = function () {
      if (!warnedForFactories) {
        lowPriorityWarning(false, 'Accessing factories like React.DOM.%s has been deprecated ' + 'and will be removed in v16.0+. Use the ' + 'react-dom-factories package instead. ' + ' Version 1.0 provides a drop-in replacement.' + ' For more info, see https://fb.me/react-dom-factories', factory);
        warnedForFactories = true;
      }
      return ReactDOMFactories[factory].apply(ReactDOMFactories, arguments);
    };
  });
}

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var PooledClass = __webpack_require__(289);
var ReactElement = __webpack_require__(15);

var emptyFunction = __webpack_require__(37);
var traverseAllChildren = __webpack_require__(300);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ReactElement = __webpack_require__(15);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = __webpack_require__(123);
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(15),
    isValidElement = _require.isValidElement;

var factory = __webpack_require__(282);

module.exports = factory(isValidElement);

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



module.exports = '15.6.1';

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18);

var ReactPropTypeLocationNames = __webpack_require__(293);
var ReactPropTypesSecret = __webpack_require__(295);

var invariant = __webpack_require__(7);
var warning = __webpack_require__(10);

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = __webpack_require__(64);
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = __webpack_require__(64);
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _require = __webpack_require__(121),
    Component = _require.Component;

var _require2 = __webpack_require__(15),
    isValidElement = _require2.isValidElement;

var ReactNoopUpdateQueue = __webpack_require__(124);
var factory = __webpack_require__(146);

module.exports = factory(Component, isValidElement, ReactNoopUpdateQueue);

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */


var _prodInvariant = __webpack_require__(18);

var ReactElement = __webpack_require__(15);

var invariant = __webpack_require__(7);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(18);

var ReactCurrentOwner = __webpack_require__(39);
var REACT_ELEMENT_TYPE = __webpack_require__(122);

var getIteratorFn = __webpack_require__(125);
var invariant = __webpack_require__(7);
var KeyEscapeUtils = __webpack_require__(288);
var warning = __webpack_require__(10);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = " It looks like you're using an element created by a different " + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 301 */
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


/***/ })
/******/ ]);