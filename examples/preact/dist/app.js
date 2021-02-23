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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var n,
    l,
    u,
    i,
    t,
    r,
    o = {},
    f = [],
    e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function c(n, l) {
  for (var u in l) {
    n[u] = l[u];
  }return n;
}function s(n) {
  var l = n.parentNode;l && l.removeChild(n);
}function a(n, l, u) {
  var i,
      t,
      r,
      o = arguments,
      f = {};for (r in l) {
    "key" == r ? i = l[r] : "ref" == r ? t = l[r] : f[r] = l[r];
  }if (arguments.length > 3) for (u = [u], r = 3; r < arguments.length; r++) {
    u.push(o[r]);
  }if (null != u && (f.children = u), "function" == typeof n && null != n.defaultProps) for (r in n.defaultProps) {
    void 0 === f[r] && (f[r] = n.defaultProps[r]);
  }return v(n, f, i, t, null);
}function v(l, u, i, t, r) {
  var o = { type: l, props: u, key: i, ref: t, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == r ? ++n.__v : r };return null != n.vnode && n.vnode(o), o;
}function h() {
  return { current: null };
}function y(n) {
  return n.children;
}function p(n, l) {
  this.props = n, this.context = l;
}function d(n, l) {
  if (null == l) return n.__ ? d(n.__, n.__.__k.indexOf(n) + 1) : null;for (var u; l < n.__k.length; l++) {
    if (null != (u = n.__k[l]) && null != u.__e) return u.__e;
  }return "function" == typeof n.type ? d(n) : null;
}function _(n) {
  var l, u;if (null != (n = n.__) && null != n.__c) {
    for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) {
      if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;break;
      }
    }return _(n);
  }
}function k(l) {
  (!l.__d && (l.__d = !0) && u.push(l) && !m.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(m);
}function m() {
  for (var n; m.__r = u.length;) {
    n = u.sort(function (n, l) {
      return n.__v.__b - l.__v.__b;
    }), u = [], n.some(function (n) {
      var l, u, i, t, r, o;n.__d && (r = (t = (l = n).__v).__e, (o = l.__P) && (u = [], (i = c({}, t)).__v = t.__v + 1, T(o, t, i, l.__n, void 0 !== o.ownerSVGElement, null != t.__h ? [r] : null, u, null == r ? d(t) : r, t.__h), j(u, t), t.__e != r && _(t)));
    });
  }
}function b(n, l, u, i, t, r, e, c, s, a) {
  var h,
      p,
      _,
      k,
      m,
      b,
      w,
      A = i && i.__k || f,
      P = A.length;for (u.__k = [], h = 0; h < l.length; h++) {
    if (null != (k = u.__k[h] = null == (k = l[h]) || "boolean" == typeof k ? null : "string" == typeof k || "number" == typeof k ? v(null, k, null, null, k) : Array.isArray(k) ? v(y, { children: k }, null, null, null) : k.__b > 0 ? v(k.type, k.props, k.key, null, k.__v) : k)) {
      if (k.__ = u, k.__b = u.__b + 1, null === (_ = A[h]) || _ && k.key == _.key && k.type === _.type) A[h] = void 0;else for (p = 0; p < P; p++) {
        if ((_ = A[p]) && k.key == _.key && k.type === _.type) {
          A[p] = void 0;break;
        }_ = null;
      }T(n, k, _ = _ || o, t, r, e, c, s, a), m = k.__e, (p = k.ref) && _.ref != p && (w || (w = []), _.ref && w.push(_.ref, null, k), w.push(p, k.__c || m, k)), null != m ? (null == b && (b = m), "function" == typeof k.type && null != k.__k && k.__k === _.__k ? k.__d = s = g(k, s, n) : s = x(n, k, _, A, m, s), a || "option" !== u.type ? "function" == typeof u.type && (u.__d = s) : n.value = "") : s && _.__e == s && s.parentNode != n && (s = d(_));
    }
  }for (u.__e = b, h = P; h--;) {
    null != A[h] && ("function" == typeof u.type && null != A[h].__e && A[h].__e == u.__d && (u.__d = d(i, h + 1)), L(A[h], A[h]));
  }if (w) for (h = 0; h < w.length; h++) {
    I(w[h], w[++h], w[++h]);
  }
}function g(n, l, u) {
  var i, t;for (i = 0; i < n.__k.length; i++) {
    (t = n.__k[i]) && (t.__ = n, l = "function" == typeof t.type ? g(t, l, u) : x(u, t, t, n.__k, t.__e, l));
  }return l;
}function w(n, l) {
  return l = l || [], null == n || "boolean" == typeof n || (Array.isArray(n) ? n.some(function (n) {
    w(n, l);
  }) : l.push(n)), l;
}function x(n, l, u, i, t, r) {
  var o, f, e;if (void 0 !== l.__d) o = l.__d, l.__d = void 0;else if (null == u || t != r || null == t.parentNode) n: if (null == r || r.parentNode !== n) n.appendChild(t), o = null;else {
    for (f = r, e = 0; (f = f.nextSibling) && e < i.length; e += 2) {
      if (f == t) break n;
    }n.insertBefore(t, r), o = r;
  }return void 0 !== o ? o : t.nextSibling;
}function A(n, l, u, i, t) {
  var r;for (r in u) {
    "children" === r || "key" === r || r in l || C(n, r, null, u[r], i);
  }for (r in l) {
    t && "function" != typeof l[r] || "children" === r || "key" === r || "value" === r || "checked" === r || u[r] === l[r] || C(n, r, l[r], u[r], i);
  }
}function P(n, l, u) {
  "-" === l[0] ? n.setProperty(l, u) : n[l] = null == u ? "" : "number" != typeof u || e.test(l) ? u : u + "px";
}function C(n, l, u, i, t) {
  var r;n: if ("style" === l) {
    if ("string" == typeof u) n.style.cssText = u;else {
      if ("string" == typeof i && (n.style.cssText = i = ""), i) for (l in i) {
        u && l in u || P(n.style, l, "");
      }if (u) for (l in u) {
        i && u[l] === i[l] || P(n.style, l, u[l]);
      }
    }
  } else if ("o" === l[0] && "n" === l[1]) r = l !== (l = l.replace(/Capture$/, "")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + r] = u, u ? i || n.addEventListener(l, r ? H : $, r) : n.removeEventListener(l, r ? H : $, r);else if ("dangerouslySetInnerHTML" !== l) {
    if (t) l = l.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");else if ("href" !== l && "list" !== l && "form" !== l && "download" !== l && l in n) try {
      n[l] = null == u ? "" : u;break n;
    } catch (n) {}"function" == typeof u || (null != u && (!1 !== u || "a" === l[0] && "r" === l[1]) ? n.setAttribute(l, u) : n.removeAttribute(l));
  }
}function $(l) {
  this.l[l.type + !1](n.event ? n.event(l) : l);
}function H(l) {
  this.l[l.type + !0](n.event ? n.event(l) : l);
}function T(l, u, i, t, r, o, f, e, s) {
  var a,
      v,
      h,
      d,
      _,
      k,
      m,
      g,
      w,
      x,
      A,
      P = u.type;if (void 0 !== u.constructor) return null;null != i.__h && (s = i.__h, e = u.__e = i.__e, u.__h = null, o = [e]), (a = n.__b) && a(u);try {
    n: if ("function" == typeof P) {
      if (g = u.props, w = (a = P.contextType) && t[a.__c], x = a ? w ? w.props.value : a.__ : t, i.__c ? m = (v = u.__c = i.__c).__ = v.__E : ("prototype" in P && P.prototype.render ? u.__c = v = new P(g, x) : (u.__c = v = new p(g, x), v.constructor = P, v.render = M), w && w.sub(v), v.props = g, v.state || (v.state = {}), v.context = x, v.__n = t, h = v.__d = !0, v.__h = []), null == v.__s && (v.__s = v.state), null != P.getDerivedStateFromProps && (v.__s == v.state && (v.__s = c({}, v.__s)), c(v.__s, P.getDerivedStateFromProps(g, v.__s))), d = v.props, _ = v.state, h) null == P.getDerivedStateFromProps && null != v.componentWillMount && v.componentWillMount(), null != v.componentDidMount && v.__h.push(v.componentDidMount);else {
        if (null == P.getDerivedStateFromProps && g !== d && null != v.componentWillReceiveProps && v.componentWillReceiveProps(g, x), !v.__e && null != v.shouldComponentUpdate && !1 === v.shouldComponentUpdate(g, v.__s, x) || u.__v === i.__v) {
          v.props = g, v.state = v.__s, u.__v !== i.__v && (v.__d = !1), v.__v = u, u.__e = i.__e, u.__k = i.__k, v.__h.length && f.push(v);break n;
        }null != v.componentWillUpdate && v.componentWillUpdate(g, v.__s, x), null != v.componentDidUpdate && v.__h.push(function () {
          v.componentDidUpdate(d, _, k);
        });
      }v.context = x, v.props = g, v.state = v.__s, (a = n.__r) && a(u), v.__d = !1, v.__v = u, v.__P = l, a = v.render(v.props, v.state, v.context), v.state = v.__s, null != v.getChildContext && (t = c(c({}, t), v.getChildContext())), h || null == v.getSnapshotBeforeUpdate || (k = v.getSnapshotBeforeUpdate(d, _)), A = null != a && a.type === y && null == a.key ? a.props.children : a, b(l, Array.isArray(A) ? A : [A], u, i, t, r, o, f, e, s), v.base = u.__e, u.__h = null, v.__h.length && f.push(v), m && (v.__E = v.__ = null), v.__e = !1;
    } else null == o && u.__v === i.__v ? (u.__k = i.__k, u.__e = i.__e) : u.__e = z(i.__e, u, i, t, r, o, f, s);(a = n.diffed) && a(u);
  } catch (l) {
    u.__v = null, (s || null != o) && (u.__e = e, u.__h = !!s, o[o.indexOf(e)] = null), n.__e(l, u, i);
  }
}function j(l, u) {
  n.__c && n.__c(u, l), l.some(function (u) {
    try {
      l = u.__h, u.__h = [], l.some(function (n) {
        n.call(u);
      });
    } catch (l) {
      n.__e(l, u.__v);
    }
  });
}function z(n, l, u, i, t, r, e, c) {
  var a,
      v,
      h,
      y,
      p = u.props,
      d = l.props,
      _ = l.type,
      k = 0;if ("svg" === _ && (t = !0), null != r) for (; k < r.length; k++) {
    if ((a = r[k]) && (a === n || (_ ? a.localName == _ : 3 == a.nodeType))) {
      n = a, r[k] = null;break;
    }
  }if (null == n) {
    if (null === _) return document.createTextNode(d);n = t ? document.createElementNS("http://www.w3.org/2000/svg", _) : document.createElement(_, d.is && d), r = null, c = !1;
  }if (null === _) p === d || c && n.data === d || (n.data = d);else {
    if (r = r && f.slice.call(n.childNodes), v = (p = u.props || o).dangerouslySetInnerHTML, h = d.dangerouslySetInnerHTML, !c) {
      if (null != r) for (p = {}, y = 0; y < n.attributes.length; y++) {
        p[n.attributes[y].name] = n.attributes[y].value;
      }(h || v) && (h && (v && h.__html == v.__html || h.__html === n.innerHTML) || (n.innerHTML = h && h.__html || ""));
    }if (A(n, d, p, t, c), h) l.__k = [];else if (k = l.props.children, b(n, Array.isArray(k) ? k : [k], l, u, i, t && "foreignObject" !== _, r, e, n.firstChild, c), null != r) for (k = r.length; k--;) {
      null != r[k] && s(r[k]);
    }c || ("value" in d && void 0 !== (k = d.value) && (k !== n.value || "progress" === _ && !k) && C(n, "value", k, p.value, !1), "checked" in d && void 0 !== (k = d.checked) && k !== n.checked && C(n, "checked", k, p.checked, !1));
  }return n;
}function I(l, u, i) {
  try {
    "function" == typeof l ? l(u) : l.current = u;
  } catch (l) {
    n.__e(l, i);
  }
}function L(l, u, i) {
  var t, r, o;if (n.unmount && n.unmount(l), (t = l.ref) && (t.current && t.current !== l.__e || I(t, null, u)), i || "function" == typeof l.type || (i = null != (r = l.__e)), l.__e = l.__d = void 0, null != (t = l.__c)) {
    if (t.componentWillUnmount) try {
      t.componentWillUnmount();
    } catch (l) {
      n.__e(l, u);
    }t.base = t.__P = null;
  }if (t = l.__k) for (o = 0; o < t.length; o++) {
    t[o] && L(t[o], u, i);
  }null != r && s(r);
}function M(n, l, u) {
  return this.constructor(n, u);
}function N(l, u, i) {
  var t, r, e;n.__ && n.__(l, u), r = (t = "function" == typeof i) ? null : i && i.__k || u.__k, e = [], T(u, l = (!t && i || u).__k = a(y, null, [l]), r || o, o, void 0 !== u.ownerSVGElement, !t && i ? [i] : r ? null : u.firstChild ? f.slice.call(u.childNodes) : null, e, !t && i ? i : r ? r.__e : u.firstChild, t), j(e, l);
}function O(n, l) {
  N(n, l, O);
}function S(n, l, u) {
  var i,
      t,
      r,
      o = arguments,
      f = c({}, n.props);for (r in l) {
    "key" == r ? i = l[r] : "ref" == r ? t = l[r] : f[r] = l[r];
  }if (arguments.length > 3) for (u = [u], r = 3; r < arguments.length; r++) {
    u.push(o[r]);
  }return null != u && (f.children = u), v(n.type, f, i || n.key, t || n.ref, null);
}function q(n, l) {
  var u = { __c: l = "__cC" + r++, __: n, Consumer: function Consumer(n, l) {
      return n.children(l);
    }, Provider: function Provider(n) {
      var u, i;return this.getChildContext || (u = [], (i = {})[l] = this, this.getChildContext = function () {
        return i;
      }, this.shouldComponentUpdate = function (n) {
        this.props.value !== n.value && u.some(k);
      }, this.sub = function (n) {
        u.push(n);var l = n.componentWillUnmount;n.componentWillUnmount = function () {
          u.splice(u.indexOf(n), 1), l && l.call(n);
        };
      }), n.children;
    } };return u.Provider.__ = u.Consumer.contextType = u;
}exports.options = n = { __e: function __e(n, l) {
    for (var u, i, t; l = l.__;) {
      if ((u = l.__c) && !u.__) try {
        if ((i = u.constructor) && null != i.getDerivedStateFromError && (u.setState(i.getDerivedStateFromError(n)), t = u.__d), null != u.componentDidCatch && (u.componentDidCatch(n), t = u.__d), t) return u.__E = u;
      } catch (l) {
        n = l;
      }
    }throw n;
  }, __v: 0 }, exports.isValidElement = l = function l(n) {
  return null != n && void 0 === n.constructor;
}, p.prototype.setState = function (n, l) {
  var u;u = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof n && (n = n(c({}, u), this.props)), n && c(u, n), null != n && this.__v && (l && this.__h.push(l), k(this));
}, p.prototype.forceUpdate = function (n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), k(this));
}, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, m.__r = 0, r = 0;exports.render = N;
exports.hydrate = O;
exports.createElement = a;
exports.h = a;
exports.Fragment = y;
exports.createRef = h;
exports.isValidElement = l;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
exports.options = n;
//# sourceMappingURL=preact.module.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Route = exports.Router = exports.route = exports.getCurrentUrl = exports.subscribers = undefined;

var _preact = __webpack_require__(0);

var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return (0, _preact.cloneElement)(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(_preact.Component);

var Link = function Link(props) {
	return (0, _preact.h)('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return (0, _preact.h)(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

exports.subscribers = subscribers;
exports.getCurrentUrl = getCurrentUrl;
exports.route = route;
exports.Router = Router;
exports.Route = Route;
exports.Link = Link;
exports.default = Router;
//# sourceMappingURL=preact-router.es.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var t = __webpack_require__(0);function n(t, n) {
  for (var r in n) t[r] = n[r];return t;
}function r(t) {
  this.getChildContext = function () {
    return { store: t.store };
  };
}r.prototype.render = function (t) {
  return t.children && t.children[0] || t.children;
}, exports.connect = function (r, e) {
  var o;return "function" != typeof r && ("string" == typeof (o = r || {}) && (o = o.split(/\s*,\s*/)), r = function (t) {
    for (var n = {}, r = 0; r < o.length; r++) n[o[r]] = t[o[r]];return n;
  }), function (o) {
    function i(i, u) {
      var c = this,
          f = u.store,
          s = r(f ? f.getState() : {}, i),
          a = e ? function (t, n) {
        "function" == typeof t && (t = t(n));var r = {};for (var e in t) r[e] = n.action(t[e]);return r;
      }(e, f) : { store: f },
          p = function () {
        var t = r(f ? f.getState() : {}, i);for (var n in t) if (t[n] !== s[n]) return s = t, c.setState({});for (var e in s) if (!(e in t)) return s = t, c.setState({});
      };this.componentWillReceiveProps = function (t) {
        i = t, p();
      }, this.componentDidMount = function () {
        f.subscribe(p);
      }, this.componentWillUnmount = function () {
        f.unsubscribe(p);
      }, this.render = function (r) {
        return t.h(o, n(n(n({}, a), r), s));
      };
    }return (i.prototype = new t.Component()).constructor = i;
  };
}, exports.Provider = r;
//# sourceMappingURL=preact.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actions = undefined;

var _unistore = __webpack_require__(7);

var _unistore2 = _interopRequireDefault(_unistore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = exports.actions = function actions(store) {
  return {
    increment: function increment(state) {
      return { count: state.count + 1 };
    },
    decrement: function decrement(state) {
      return { count: state.count - 1 };
    }
  };
};

exports.default = function (initialState) {
  return (0, _unistore2.default)(initialState);
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(0);

var _preact2 = __webpack_require__(2);

var _router = __webpack_require__(5);

var _router2 = _interopRequireDefault(_router);

var _store = __webpack_require__(3);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)(window.__STATE__);

var app = document.getElementById('app');

(0, _preact.render)((0, _preact.h)(
  _preact2.Provider,
  { store: store },
  (0, _preact.h)(_router2.default, null)
), app, app.lastChild);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = __webpack_require__(0);

var _preactRouter = __webpack_require__(1);

var _preactRouter2 = _interopRequireDefault(_preactRouter);

var _App = __webpack_require__(6);

var _About = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return (0, _preact.h)(
    _preactRouter2.default,
    null,
    (0, _preact.h)(_App.App, { path: '/' }),
    (0, _preact.h)(_About.About, { path: '/about' })
  );
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _preact = __webpack_require__(0);

var _preactRouter = __webpack_require__(1);

var _preact2 = __webpack_require__(2);

var _store = __webpack_require__(3);

var App = exports.App = (0, _preact2.connect)('count', _store.actions)(function (_ref) {
  var count = _ref.count,
      increment = _ref.increment,
      decrement = _ref.decrement;
  return (0, _preact.h)(
    'div',
    { 'class': 'count' },
    (0, _preact.h)(
      'p',
      null,
      count
    ),
    (0, _preact.h)(
      'button',
      { 'class': 'increment-btn', onClick: increment },
      'Increment'
    ),
    (0, _preact.h)(
      'button',
      { 'class': 'decrement-btn', onClick: decrement },
      'Decrement'
    ),
    (0, _preact.h)(
      _preactRouter.Link,
      { href: '/about' },
      'About'
    )
  );
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (t) {
  var r = [];function u(n) {
    for (var t = [], u = 0; u < r.length; u++) r[u] === n ? n = null : t.push(r[u]);r = t;
  }function e(u, e, f) {
    t = e ? u : n(n({}, t), u);for (var i = r, o = 0; o < i.length; o++) i[o](t, f);
  }return t = t || {}, { action: function (n) {
      function r(t) {
        e(t, !1, n);
      }return function () {
        for (var u = arguments, e = [t], f = 0; f < arguments.length; f++) e.push(u[f]);var i = n.apply(this, e);if (null != i) return i.then ? i.then(r) : r(i);
      };
    }, setState: e, subscribe: function (n) {
      return r.push(n), function () {
        u(n);
      };
    }, unsubscribe: u, getState: function () {
      return t;
    } };
};

//# sourceMappingURL=unistore.es.js.map
function n(n, t) {
  for (var r in t) n[r] = t[r];return n;
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = undefined;

var _preact = __webpack_require__(0);

var _match = __webpack_require__(9);

var About = exports.About = function About() {
  return (0, _preact.h)(
    'div',
    null,
    (0, _preact.h)(
      'p',
      null,
      'This is a Preact app being rendered on the server. It uses Unistore for state management and preact-router for routing.'
    ),
    (0, _preact.h)(
      _match.Link,
      { href: '/' },
      'Home'
    )
  );
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__(0);

var _preactRouter = __webpack_require__(1);

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ })
/******/ ]);