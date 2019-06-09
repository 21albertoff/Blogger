(function() {
    var g, aa = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.m = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        for (var d in b)
            if (Object.defineProperties) {
                var e = Object.getOwnPropertyDescriptor(b, d);
                e && Object.defineProperty(a, d, e)
            } else
                a[d] = b[d]
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        a != Array.prototype && a != Object.prototype && (a[b] = c.value)
    }
    , ca = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this, da = function() {
        da = function() {}
        ;
        ca.Symbol || (ca.Symbol = ea)
    }, ha = 0, ea = function(a) {
        return "jscomp_symbol_" + (a || "") + ha++
    }, ja = function() {
        da();
        var a = ca.Symbol.iterator;
        a || (a = ca.Symbol.iterator = ca.Symbol("iterator"));
        "function" != typeof Array.prototype[a] && ba(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function() {
                return ia(this)
            }
        });
        ja = function() {}
    }, ia = function(a) {
        var b = 0;
        return ka(function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        })
    }, ka = function(a) {
        ja();
        a = {
            next: a
        };
        a[ca.Symbol.iterator] = function() {
            return this
        }
        ;
        return a
    }, l = function(a) {
        ja();
        var b = a[Symbol.iterator];
        return b ? b.call(a) : ia(a)
    }, la = function(a, b) {
        if (b) {
            for (var c = ca, d = a.split("."), e = 0; e < d.length - 1; e++) {
                var f = d[e];
                f in c || (c[f] = {});
                c = c[f]
            }
            d = d[d.length - 1];
            e = c[d];
            f = b(e);
            f != e && null != f && ba(c, d, {
                configurable: !0,
                writable: !0,
                value: f
            })
        }
    };
    la("String.prototype.startsWith", function(a) {
        return a ? a : function(a, c) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
            if (a instanceof RegExp)
                throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
            var b = this + "";
            a += "";
            for (var e = b.length, f = a.length, h = Math.max(0, Math.min(c | 0, b.length)), k = 0; k < f && h < e; )
                if (b[h++] != a[k++])
                    return !1;
            return k >= f
        }
    });
    la("Promise", function(a) {
        function b() {
            this.ua = null
        }
        function c(a) {
            return a instanceof e ? a : new e(function(b) {
                b(a)
            }
            )
        }
        if (a)
            return a;
        b.prototype.Zd = function(a) {
            null == this.ua && (this.ua = [],
            this.Lf());
            this.ua.push(a)
        }
        ;
        b.prototype.Lf = function() {
            var a = this;
            this.$d(function() {
                a.Zf()
            })
        }
        ;
        var d = ca.setTimeout;
        b.prototype.$d = function(a) {
            d(a, 0)
        }
        ;
        b.prototype.Zf = function() {
            for (; this.ua && this.ua.length; ) {
                var a = this.ua;
                this.ua = [];
                for (var b = 0; b < a.length; ++b) {
                    var c = a[b];
                    delete a[b];
                    try {
                        c()
                    } catch (q) {
                        this.Mf(q)
                    }
                }
            }
            this.ua = null
        }
        ;
        b.prototype.Mf = function(a) {
            this.$d(function() {
                throw a;
            })
        }
        ;
        var e = function(a) {
            this.M = 0;
            this.vb = void 0;
            this.Ob = [];
            var b = this.jd();
            try {
                a(b.resolve, b.reject)
            } catch (m) {
                b.reject(m)
            }
        };
        e.prototype.jd = function() {
            function a(a) {
                return function(d) {
                    c || (c = !0,
                    a.call(b, d))
                }
            }
            var b = this
              , c = !1;
            return {
                resolve: a(this.Mg),
                reject: a(this.Fd)
            }
        }
        ;
        e.prototype.Mg = function(a) {
            if (a === this)
                this.Fd(new TypeError("A Promise cannot resolve to itself"));
            else if (a instanceof e)
                this.Rg(a);
            else {
                a: switch (typeof a) {
                case "object":
                    var b = null != a;
                    break a;
                case "function":
                    b = !0;
                    break a;
                default:
                    b = !1
                }
                b ? this.Lg(a) : this.re(a)
            }
        }
        ;
        e.prototype.Lg = function(a) {
            var b = void 0;
            try {
                b = a.then
            } catch (m) {
                this.Fd(m);
                return
            }
            "function" == typeof b ? this.Sg(b, a) : this.re(a)
        }
        ;
        e.prototype.Fd = function(a) {
            this.ef(2, a)
        }
        ;
        e.prototype.re = function(a) {
            this.ef(1, a)
        }
        ;
        e.prototype.ef = function(a, b) {
            if (0 != this.M)
                throw Error("Cannot settle(" + a + ", " + b | "): Promise already settled in state" + this.M);
            this.M = a;
            this.vb = b;
            this.ag()
        }
        ;
        e.prototype.ag = function() {
            if (null != this.Ob) {
                for (var a = this.Ob, b = 0; b < a.length; ++b)
                    a[b].call(),
                    a[b] = null;
                this.Ob = null
            }
        }
        ;
        var f = new b;
        e.prototype.Rg = function(a) {
            var b = this.jd();
            a.ac(b.resolve, b.reject)
        }
        ;
        e.prototype.Sg = function(a, b) {
            var c = this.jd();
            try {
                a.call(b, c.resolve, c.reject)
            } catch (q) {
                c.reject(q)
            }
        }
        ;
        e.prototype.then = function(a, b) {
            function c(a, b) {
                return "function" == typeof a ? function(b) {
                    try {
                        d(a(b))
                    } catch (N) {
                        f(N)
                    }
                }
                : b
            }
            var d, f, k = new e(function(a, b) {
                d = a;
                f = b
            }
            );
            this.ac(c(a, d), c(b, f));
            return k
        }
        ;
        e.prototype.ac = function(a, b) {
            function c() {
                switch (d.M) {
                case 1:
                    a(d.vb);
                    break;
                case 2:
                    b(d.vb);
                    break;
                default:
                    throw Error("Unexpected state: " + d.M);
                }
            }
            var d = this;
            null == this.Ob ? f.Zd(c) : this.Ob.push(function() {
                f.Zd(c)
            })
        }
        ;
        e.resolve = c;
        e.reject = function(a) {
            return new e(function(b, c) {
                c(a)
            }
            )
        }
        ;
        e.race = function(a) {
            return new e(function(b, d) {
                for (var e = l(a), f = e.next(); !f.done; f = e.next())
                    c(f.value).ac(b, d)
            }
            )
        }
        ;
        e.all = function(a) {
            var b = l(a)
              , d = b.next();
            return d.done ? c([]) : new e(function(a, e) {
                function f(b) {
                    return function(c) {
                        k[b] = c;
                        h--;
                        0 == h && a(k)
                    }
                }
                var k = []
                  , h = 0;
                do
                    k.push(void 0),
                    h++,
                    c(d.value).ac(f(k.length - 1), e),
                    d = b.next();
                while (!d.done)
            }
            )
        }
        ;
        return e
    });
    var ma = ma || {}
      , n = this
      , na = function(a) {
        return void 0 !== a
    }
      , p = function(a) {
        return "string" == typeof a
    }
      , oa = function(a) {
        return "number" == typeof a
    }
      , pa = function() {}
      , qa = function(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array)
                    return "array";
                if (a instanceof Object)
                    return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)
                    return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
                    return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
                    return "function"
            } else
                return "null";
        else if ("function" == b && "undefined" == typeof a.call)
            return "object";
        return b
    }
      , ra = function(a) {
        return "array" == qa(a)
    }
      , sa = function(a) {
        var b = qa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
      , ta = function(a) {
        return "function" == qa(a)
    }
      , va = function(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
      , ya = function(a) {
        return a[wa] || (a[wa] = ++xa)
    }
      , wa = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , xa = 0
      , za = function(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
      , Aa = function(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
      , r = function(a, b, c) {
        r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? za : Aa;
        return r.apply(null, arguments)
    }
      , Ba = function(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var b = c.slice();
            b.push.apply(b, arguments);
            return a.apply(this, b)
        }
    }
      , Ca = Date.now || function() {
        return +new Date
    }
      , t = function(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.m = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.cj = function(a, c, f) {
            for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
                d[e - 2] = arguments[e];
            return b.prototype[c].apply(a, d)
        }
    };
    var Da = function() {
        var a = void 0 === a ? window : a;
        this.Ag = 200;
        this.hg = 300;
        this.Ug = ".centered-bottom";
        this.Og = a
    };
    var Ea = function() {
        this.Tf = new Da
    };
    var Fa;
    var Ga = function(a) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, Ga);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    t(Ga, Error);
    Ga.prototype.name = "CustomError";
    var Ha = function(a, b) {
        for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length; )
            d += c.shift() + e.shift();
        return d + c.join("%s")
    }
      , Ia = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }
      , Ra = function(a) {
        if (!Ka.test(a))
            return a;
        -1 != a.indexOf("&") && (a = a.replace(La, "&amp;"));
        -1 != a.indexOf("<") && (a = a.replace(Ma, "&lt;"));
        -1 != a.indexOf(">") && (a = a.replace(Na, "&gt;"));
        -1 != a.indexOf('"') && (a = a.replace(Oa, "&quot;"));
        -1 != a.indexOf("'") && (a = a.replace(Pa, "&#39;"));
        -1 != a.indexOf("\x00") && (a = a.replace(Qa, "&#0;"));
        return a
    }
      , La = /&/g
      , Ma = /</g
      , Na = />/g
      , Oa = /"/g
      , Pa = /'/g
      , Qa = /\x00/g
      , Ka = /[\x00&<>"']/
      , Ta = function(a, b) {
        for (var c = 0, d = Ia(String(a)).split("."), e = Ia(String(b)).split("."), f = Math.max(d.length, e.length), h = 0; 0 == c && h < f; h++) {
            var k = d[h] || ""
              , m = e[h] || "";
            do {
                k = /(\d*)(\D*)(.*)/.exec(k) || ["", "", "", ""];
                m = /(\d*)(\D*)(.*)/.exec(m) || ["", "", "", ""];
                if (0 == k[0].length && 0 == m[0].length)
                    break;
                c = Sa(0 == k[1].length ? 0 : parseInt(k[1], 10), 0 == m[1].length ? 0 : parseInt(m[1], 10)) || Sa(0 == k[2].length, 0 == m[2].length) || Sa(k[2], m[2]);
                k = k[3];
                m = m[3]
            } while (0 == c)
        }
        return c
    }
      , Sa = function(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
      , Ua = function(a) {
        return String(a).replace(/\-([a-z])/g, function(a, c) {
            return c.toUpperCase()
        })
    }
      , Va = function(a) {
        var b = p(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
        return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])","g"), function(a, b, e) {
            return b + e.toUpperCase()
        })
    };
    var Wa = function(a, b) {
        b.unshift(a);
        Ga.call(this, Ha.apply(null, b));
        b.shift()
    };
    t(Wa, Ga);
    Wa.prototype.name = "AssertionError";
    var Xa = function(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else
            a && (e += ": " + a,
            f = b);
        throw new Wa("" + e,f || []);
    }
      , u = function(a, b, c) {
        a || Xa("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , Ya = function(a, b) {
        throw new Wa("Failure" + (a ? ": " + a : ""),Array.prototype.slice.call(arguments, 1));
    }
      , Za = function(a, b, c) {
        oa(a) || Xa("Expected number but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }
      , $a = function(a, b, c) {
        p(a) || Xa("Expected string but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }
      , ab = function(a, b, c) {
        ta(a) || Xa("Expected function but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }
      , bb = function(a, b, c) {
        va(a) || Xa("Expected object but got %s: %s.", [qa(a), a], b, Array.prototype.slice.call(arguments, 2))
    };
    var cb = Array.prototype.indexOf ? function(a, b, c) {
        u(null != a.length);
        return Array.prototype.indexOf.call(a, b, c)
    }
    : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))
            return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , v = Array.prototype.forEach ? function(a, b, c) {
        u(null != a.length);
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , db = Array.prototype.filter ? function(a, b, c) {
        u(null != a.length);
        return Array.prototype.filter.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = [], f = 0, h = p(a) ? a.split("") : a, k = 0; k < d; k++)
            if (k in h) {
                var m = h[k];
                b.call(c, m, k, a) && (e[f++] = m)
            }
        return e
    }
      , eb = Array.prototype.map ? function(a, b, c) {
        u(null != a.length);
        return Array.prototype.map.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, h = 0; h < d; h++)
            h in f && (e[h] = b.call(c, f[h], h, a));
        return e
    }
      , fb = Array.prototype.some ? function(a, b, c) {
        u(null != a.length);
        return Array.prototype.some.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return !0;
        return !1
    }
      , gb = function(a, b) {
        var c = 0;
        v(a, function(a, e, f) {
            b.call(void 0, a, e, f) && ++c
        }, void 0);
        return c
    }
      , ib = function(a, b) {
        var c = hb(a, b, void 0);
        return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
    }
      , hb = function(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)
            if (f in e && b.call(c, e[f], f, a))
                return f;
        return -1
    }
      , jb = function(a, b) {
        for (var c = p(a) ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
            if (d in c && b.call(void 0, c[d], d, a))
                return d;
        return -1
    }
      , kb = function(a, b) {
        return 0 <= cb(a, b)
    }
      , lb = function(a, b) {
        var c = cb(a, b), d;
        if (d = 0 <= c)
            u(null != a.length),
            Array.prototype.splice.call(a, c, 1);
        return d
    }
      , mb = function(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
      , nb = function(a, b, c) {
        u(null != a.length);
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    };
    var ob;
    a: {
        var pb = n.navigator;
        if (pb) {
            var qb = pb.userAgent;
            if (qb) {
                ob = qb;
                break a
            }
        }
        ob = ""
    }
    var w = function(a) {
        return -1 != ob.indexOf(a)
    }
      , rb = function(a) {
        for (var b = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), c = [], d; d = b.exec(a); )
            c.push([d[1], d[2], d[3] || void 0]);
        return c
    };
    var sb = function(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
      , tb = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = a[d];
        return b
    }
      , ub = function(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
      , vb = function(a, b) {
        return null !== a && b in a
    }
      , wb = function(a, b) {
        for (var c in a)
            if (a[c] == b)
                return !0;
        return !1
    }
      , xb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ")
      , yb = function(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < xb.length; f++)
                c = xb[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
      , zb = function(a) {
        var b = arguments.length;
        if (1 == b && ra(arguments[0]))
            return zb.apply(null, arguments[0]);
        for (var c = {}, d = 0; d < b; d++)
            c[arguments[d]] = !0;
        return c
    };
    var Ab = function() {
        return w("Opera")
    }
      , Bb = function() {
        return w("Trident") || w("MSIE")
    }
      , Cb = function() {
        return w("Firefox")
    }
      , Eb = function() {
        return w("Safari") && !(Db() || w("Coast") || Ab() || w("Edge") || w("Silk") || w("Android"))
    }
      , Fb = function() {
        return (w("iPad") || w("iPhone")) && !Eb() && !Db() && !w("Coast") && w("AppleWebKit")
    }
      , Db = function() {
        return (w("Chrome") || w("CriOS")) && !w("Edge")
    }
      , Gb = function() {
        return w("Android") && !(Db() || Cb() || Ab() || w("Silk"))
    }
      , Ib = function() {
        function a(a) {
            a = ib(a, d);
            return c[a] || ""
        }
        var b = ob;
        if (Bb())
            return Hb(b);
        var b = rb(b)
          , c = {};
        v(b, function(a) {
            c[a[0]] = a[1]
        });
        var d = Ba(vb, c);
        return Ab() ? a(["Version", "Opera"]) : w("Edge") ? a(["Edge"]) : Db() ? a(["Chrome", "CriOS"]) : (b = b[2]) && b[1] || ""
    }
      , Hb = function(a) {
        var b = /rv: *([\d\.]*)/.exec(a);
        if (b && b[1])
            return b[1];
        var b = ""
          , c = /MSIE +([\d\.]+)/.exec(a);
        if (c && c[1])
            if (a = /Trident\/(\d.\d)/.exec(a),
            "7.0" == c[1])
                if (a && a[1])
                    switch (a[1]) {
                    case "4.0":
                        b = "8.0";
                        break;
                    case "5.0":
                        b = "9.0";
                        break;
                    case "6.0":
                        b = "10.0";
                        break;
                    case "7.0":
                        b = "11.0"
                    }
                else
                    b = "7.0";
            else
                b = c[1];
        return b
    };
    var Jb = function() {
        return w("iPhone") && !w("iPod") && !w("iPad")
    }
      , Kb = function() {
        return Jb() || w("iPad") || w("iPod")
    };
    var Lb = function(a) {
        Lb[" "](a);
        return a
    };
    Lb[" "] = pa;
    var Mb = function(a, b) {
        try {
            return Lb(a[b]),
            !0
        } catch (c) {}
        return !1
    }
      , Ob = function(a, b) {
        var c = Nb;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
    };
    var Pb = Ab(), z = Bb(), Qb = w("Edge"), Rb = Qb || z, A = w("Gecko") && !(-1 != ob.toLowerCase().indexOf("webkit") && !w("Edge")) && !(w("Trident") || w("MSIE")) && !w("Edge"), C = -1 != ob.toLowerCase().indexOf("webkit") && !w("Edge"), Sb = w("Macintosh"), Tb = w("Windows"), Ub = function() {
        var a = n.document;
        return a ? a.documentMode : void 0
    }, Vb;
    a: {
        var Wb = ""
          , Xb = function() {
            var a = ob;
            if (A)
                return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Qb)
                return /Edge\/([\d\.]+)/.exec(a);
            if (z)
                return /\b(?:MSIE|rv)[:]([^\);]+)(\)|;)/.exec(a);
            if (C)
                return /WebKit\/(\S+)/.exec(a);
            if (Pb)
                return /(?:Version)[\/]?(\S+)/.exec(a)
        }();
        Xb && (Wb = Xb ? Xb[1] : "");
        if (z) {
            var Yb = Ub();
            if (null != Yb && Yb > parseFloat(Wb)) {
                Vb = String(Yb);
                break a
            }
        }
        Vb = Wb
    }
    var Zb = Vb, Nb = {}, D = function(a) {
        return Ob(a, function() {
            return 0 <= Ta(Zb, a)
        })
    }, ac = function(a) {
        return Number($b) >= a
    }, bc;
    var cc = n.document;
    bc = cc && z ? Ub() || ("CSS1Compat" == cc.compatMode ? parseInt(Zb, 10) : 5) : void 0;
    var $b = bc;
    var dc = !z || ac(9)
      , ec = !A && !z || z && ac(9) || A && D("1.9.1");
    z && D("9");
    var gc = function() {
        this.Mc = "";
        this.zf = fc
    };
    gc.prototype.ob = !0;
    gc.prototype.ib = function() {
        return this.Mc
    }
    ;
    gc.prototype.toString = function() {
        return "Const{" + this.Mc + "}"
    }
    ;
    var hc = function(a) {
        if (a instanceof gc && a.constructor === gc && a.zf === fc)
            return a.Mc;
        Ya("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    }
      , fc = {}
      , ic = function(a) {
        var b = new gc;
        b.Mc = a;
        return b
    };
    ic("");
    var kc = function() {
        this.Ec = "";
        this.Af = jc
    };
    g = kc.prototype;
    g.ob = !0;
    g.ib = function() {
        return this.Ec
    }
    ;
    g.td = !0;
    g.kc = function() {
        return 1
    }
    ;
    g.toString = function() {
        return "TrustedResourceUrl{" + this.Ec + "}"
    }
    ;
    var lc = function(a) {
        if (a instanceof kc && a.constructor === kc && a.Af === jc)
            return a.Ec;
        Ya("expected object of type TrustedResourceUrl, got '" + a + "' of type " + qa(a));
        return "type_error:TrustedResourceUrl"
    }
      , jc = {}
      , mc = function(a) {
        var b = new kc;
        b.Ec = a;
        return b
    };
    var oc = function() {
        this.ra = "";
        this.yf = nc
    };
    g = oc.prototype;
    g.ob = !0;
    g.ib = function() {
        return this.ra
    }
    ;
    g.td = !0;
    g.kc = function() {
        return 1
    }
    ;
    g.toString = function() {
        return "SafeUrl{" + this.ra + "}"
    }
    ;
    var pc = function(a) {
        if (a instanceof oc && a.constructor === oc && a.yf === nc)
            return a.ra;
        Ya("expected object of type SafeUrl, got '" + a + "' of type " + qa(a));
        return "type_error:SafeUrl"
    }
      , qc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i
      , sc = function(a) {
        if (a instanceof oc)
            return a;
        a = a.ob ? a.ib() : String(a);
        qc.test(a) || (a = "about:invalid#zClosurez");
        return rc(a)
    }
      , nc = {}
      , rc = function(a) {
        var b = new oc;
        b.ra = a;
        return b
    };
    rc("about:blank");
    var uc = function() {
        this.ra = "";
        this.xf = tc;
        this.ke = null
    };
    g = uc.prototype;
    g.td = !0;
    g.kc = function() {
        return this.ke
    }
    ;
    g.ob = !0;
    g.ib = function() {
        return this.ra
    }
    ;
    g.toString = function() {
        return "SafeHtml{" + this.ra + "}"
    }
    ;
    var vc = function(a) {
        if (a instanceof uc && a.constructor === uc && a.xf === tc)
            return a.ra;
        Ya("expected object of type SafeHtml, got '" + a + "' of type " + qa(a));
        return "type_error:SafeHtml"
    }
      , tc = {}
      , wc = function(a, b) {
        return (new uc).jg(a, b)
    };
    uc.prototype.jg = function(a, b) {
        this.ra = a;
        this.ke = b;
        return this
    }
    ;
    wc("<!DOCTYPE html>", 0);
    var xc = wc("", 0);
    wc("<br>", 0);
    var yc = {
        MATH: !0,
        SCRIPT: !0,
        STYLE: !0,
        SVG: !0,
        TEMPLATE: !0
    }
      , zc = function(a, b) {
        if (yc[a.tagName.toUpperCase()])
            throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + a.tagName + ".");
        a.innerHTML = vc(b)
    };
    var F = function(a, b) {
        this.x = na(a) ? a : 0;
        this.y = na(b) ? b : 0
    };
    F.prototype.clone = function() {
        return new F(this.x,this.y)
    }
    ;
    F.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    }
    ;
    var Ac = function(a, b) {
        return new F(a.x - b.x,a.y - b.y)
    };
    F.prototype.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    F.prototype.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    var Bc = function(a, b) {
        this.width = a;
        this.height = b
    };
    Bc.prototype.clone = function() {
        return new Bc(this.width,this.height)
    }
    ;
    Bc.prototype.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    }
    ;
    Bc.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    Bc.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    var H = function(a) {
        return a ? new Cc(G(a)) : Fa || (Fa = new Cc)
    }
      , Ec = function(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : Dc(document, "*", a, b)
    }
      , I = function(a, b) {
        var c = b || document;
        if (c.getElementsByClassName)
            c = c.getElementsByClassName(a)[0];
        else
            var c = document
              , d = b || c
              , c = d.querySelectorAll && d.querySelector && a ? d.querySelector("" + (a ? "." + a : "")) : Dc(c, "*", a, b)[0] || null;
        return c || null
    }
      , Dc = function(a, b, c, d) {
        a = d || a;
        var e = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (e || c))
            return a.querySelectorAll(e + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            d = a.getElementsByClassName(c);
            if (e) {
                a = {};
                for (var f = b = 0, h; h = d[f]; f++)
                    e == h.nodeName && (a[b++] = h);
                a.length = b;
                return a
            }
            return d
        }
        d = a.getElementsByTagName(e || "*");
        if (c) {
            a = {};
            for (f = b = 0; h = d[f]; f++)
                e = h.className,
                "function" == typeof e.split && kb(e.split(/\s+/), c) && (a[b++] = h);
            a.length = b;
            return a
        }
        return d
    }
      , Gc = function(a, b) {
        sb(b, function(b, d) {
            b && b.ob && (b = b.ib());
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Fc.hasOwnProperty(d) ? a.setAttribute(Fc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }
      , Fc = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }
      , Ic = function(a) {
        a = a.document;
        a = Hc(a) ? a.documentElement : a.body;
        return new Bc(a.clientWidth,a.clientHeight)
    }
      , Lc = function(a) {
        var b = Jc(a);
        a = Kc(a);
        return z && D("10") && a.pageYOffset != b.scrollTop ? new F(b.scrollLeft,b.scrollTop) : new F(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
      , Jc = function(a) {
        return a.scrollingElement ? a.scrollingElement : !C && Hc(a) ? a.documentElement : a.body || a.documentElement
    }
      , Mc = function(a) {
        return a ? Kc(a) : window
    }
      , Kc = function(a) {
        return a.parentWindow || a.defaultView
    }
      , Oc = function(a, b, c) {
        return Nc(document, arguments)
    }
      , Nc = function(a, b) {
        var c = String(b[0])
          , d = b[1];
        if (!dc && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', Ra(d.name), '"');
            if (d.type) {
                c.push(' type="', Ra(d.type), '"');
                var e = {};
                yb(e, d);
                delete e.type;
                d = e
            }
            c.push(">");
            c = c.join("")
        }
        c = a.createElement(c);
        d && (p(d) ? c.className = d : ra(d) ? c.className = d.join(" ") : Gc(c, d));
        2 < b.length && Pc(a, c, b, 2);
        return c
    }
      , Pc = function(a, b, c, d) {
        function e(c) {
            c && b.appendChild(p(c) ? a.createTextNode(c) : c)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            !sa(f) || va(f) && 0 < f.nodeType ? e(f) : v(Qc(f) ? mb(f) : f, e)
        }
    }
      , Hc = function(a) {
        return "CSS1Compat" == a.compatMode
    }
      , Rc = function(a, b) {
        Pc(G(a), a, arguments, 1)
    }
      , Sc = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    }
      , Tc = function(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
    }
      , Uc = function(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }
      , Vc = function(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
      , G = function(a) {
        u(a, "Node cannot be null or undefined.");
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
      , Qc = function(a) {
        if (a && "number" == typeof a.length) {
            if (va(a))
                return "function" == typeof a.item || "string" == typeof a.item;
            if (ta(a))
                return "function" == typeof a.item
        }
        return !1
    }
      , Xc = function(a, b) {
        return b ? Wc(a, function(a) {
            return !b || p(a.className) && kb(a.className.split(/\s+/), b)
        }) : null
    }
      , Wc = function(a, b) {
        for (var c = 0; a; ) {
            u("parentNode" != a.name);
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
      , Cc = function(a) {
        this.f = a || n.document || document
    };
    g = Cc.prototype;
    g.A = H;
    g.g = function(a) {
        return p(a) ? this.f.getElementById(a) : a
    }
    ;
    g.getElementsByTagName = function(a, b) {
        return (b || this.f).getElementsByTagName(String(a))
    }
    ;
    g.O = function(a, b, c) {
        return Nc(this.f, arguments)
    }
    ;
    g.createElement = function(a) {
        return this.f.createElement(String(a))
    }
    ;
    g.createTextNode = function(a) {
        return this.f.createTextNode(String(a))
    }
    ;
    g.appendChild = function(a, b) {
        a.appendChild(b)
    }
    ;
    g.De = Sc;
    g.removeNode = Uc;
    g.qd = function(a) {
        return ec && void 0 != a.children ? a.children : db(a.childNodes, function(a) {
            return 1 == a.nodeType
        })
    }
    ;
    g.contains = Vc;
    g.cf = function(a, b) {
        u(null != a, "goog.dom.setTextContent expects a non-null value for node");
        if ("textContent"in a)
            a.textContent = b;
        else if (3 == a.nodeType)
            a.data = b;
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; )
                a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else {
            for (var c; c = a.firstChild; )
                a.removeChild(c);
            c = G(a);
            a.appendChild(c.createTextNode(String(b)))
        }
    }
    ;
    var Yc = function(a) {
        return C ? "webkit" + a : Pb ? "o" + a.toLowerCase() : a.toLowerCase()
    }
      , Zc = Yc("AnimationEnd")
      , $c = Yc("TransitionEnd");
    var ad = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    g = ad.prototype;
    g.se = function() {
        return this.bottom - this.top
    }
    ;
    g.clone = function() {
        return new ad(this.top,this.right,this.bottom,this.left)
    }
    ;
    g.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    }
    ;
    g.contains = function(a) {
        return this && a ? a instanceof ad ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    g.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    g.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    var bd = function(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    g = bd.prototype;
    g.clone = function() {
        return new bd(this.left,this.top,this.width,this.height)
    }
    ;
    g.toString = function() {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    }
    ;
    g.contains = function(a) {
        return a instanceof F ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    g.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    g.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    var dd = function(a, b, c) {
        if (p(b))
            (b = cd(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d]
                  , f = cd(c, d);
                f && (c.style[f] = e)
            }
    }
      , ed = {}
      , cd = function(a, b) {
        var c = ed[b];
        if (!c) {
            var d = Ua(b)
              , c = d;
            void 0 === a.style[d] && (d = (C ? "Webkit" : A ? "Moz" : z ? "ms" : Pb ? "O" : null) + Va(d),
            void 0 !== a.style[d] && (c = d));
            ed[b] = c
        }
        return c
    }
      , J = function(a, b) {
        var c = G(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
    }
      , fd = function(a, b) {
        return J(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }
      , gd = function(a) {
        return fd(a, "position")
    }
      , id = function(a, b, c) {
        if (b instanceof F) {
            var d = b.x;
            b = b.y
        } else
            d = b,
            b = c;
        a.style.left = hd(d, !1);
        a.style.top = hd(b, !1)
    }
      , jd = function(a) {
        try {
            var b = a.getBoundingClientRect()
        } catch (c) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        z && a.ownerDocument.body && (a = a.ownerDocument,
        b.left -= a.documentElement.clientLeft + a.body.clientLeft,
        b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }
      , kd = function(a) {
        if (z && !ac(8))
            return u(a && "offsetParent"in a),
            a.offsetParent;
        var b = G(a)
          , c = fd(a, "position")
          , d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (11 == a.nodeType && a.host && (a = a.host),
            c = fd(a, "position"),
            d = d && "static" == c && a != b.documentElement && a != b.body,
            !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))
                return a;
        return null
    }
      , md = function(a) {
        for (var b = new ad(0,Infinity,Infinity,0), c = H(a), d = c.f.body, e = c.f.documentElement, f = Jc(c.f); a = kd(a); )
            if (!(z && 0 == a.clientWidth || C && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != fd(a, "overflow")) {
                var h = ld(a)
                  , k = new F(a.clientLeft,a.clientTop);
                h.x += k.x;
                h.y += k.y;
                b.top = Math.max(b.top, h.y);
                b.right = Math.min(b.right, h.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
                b.left = Math.max(b.left, h.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = Ic(Kc(c.f) || window);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }
      , ld = function(a) {
        var b = G(a);
        bb(a, "Parameter is required");
        var c = new F(0,0);
        var d = b ? G(b) : document;
        d = !z || ac(9) || Hc(H(d).f) ? d.documentElement : d.body;
        if (a == d)
            return c;
        a = jd(a);
        b = Lc(H(b).f);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
      , nd = function(a, b, c) {
        if (b instanceof Bc)
            c = b.height,
            b = b.width;
        else if (void 0 == c)
            throw Error("missing height argument");
        a.style.width = hd(b, !0);
        K(a, c)
    }
      , hd = function(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }
      , K = function(a, b) {
        a.style.height = hd(b, !0)
    }
      , pd = function(a) {
        var b = od;
        if ("none" != fd(a, "display"))
            return b(a);
        var c = a.style
          , d = c.display
          , e = c.visibility
          , f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }
      , od = function(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = C && !b && !c;
        return na(b) && !d || !a.getBoundingClientRect ? new Bc(b,c) : (a = jd(a),
        new Bc(a.right - a.left,a.bottom - a.top))
    }
      , qd = function(a, b) {
        u(a);
        var c = a.style;
        "opacity"in c ? c.opacity = b : "MozOpacity"in c ? c.MozOpacity = b : "filter"in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    }
      , L = function(a, b) {
        a.style.display = b ? "" : "none"
    }
      , rd = function(a) {
        return "rtl" == fd(a, "direction")
    }
      , sd = function(a, b) {
        if (/^\d+px?$/.test(b))
            return parseInt(b, 10);
        var c = a.style.left
          , d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var e = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return +e
    }
      , td = function(a, b) {
        var c = a.currentStyle ? a.currentStyle[b] : null;
        return c ? sd(a, c) : 0
    }
      , ud = {
        thin: 2,
        medium: 4,
        thick: 6
    }
      , vd = function(a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
            return 0;
        var c = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return c in ud ? ud[c] : sd(a, c)
    }
      , wd = function(a) {
        if (z && !ac(9)) {
            var b = vd(a, "borderLeft");
            var c = vd(a, "borderRight");
            var d = vd(a, "borderTop");
            a = vd(a, "borderBottom");
            return new ad(d,c,a,b)
        }
        b = J(a, "borderLeftWidth");
        c = J(a, "borderRightWidth");
        d = J(a, "borderTopWidth");
        a = J(a, "borderBottomWidth");
        return new ad(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
    };
    var xd = !1
      , yd = !1
      , Ad = function(a) {
        var b = document.createElement("div");
        a = l(a);
        for (var c = a.next(); !c.done; c = a.next())
            if (null != b.style[c.value])
                return !0;
        return !1
    }
      , Bd = Ad(["WebkitAnimation", "MozAnimation", "OAnimation", "animation"]) ? Zc : null
      , M = Ad(["WebkitTransition", "MozTransition", "OTransition", "transition"]) ? $c : null
      , Cd = function() {
        if (yd)
            return xd;
        var a = document.createElement("DETAILS");
        if (!("open"in a))
            return !1;
        Rc(a, Oc("SUMMARY", null, "a"), "b");
        dd(a, "display", "block");
        document.body.appendChild(a);
        var b = a.offsetHeight;
        a.setAttribute("open", !0);
        b = a.offsetHeight != b;
        Uc(a);
        xd = b;
        yd = !0;
        return b
    };
    var Dd = function(a, b, c, d, e) {
        this.reset(a, b, c, d, e)
    };
    Dd.prototype.nd = null;
    var Ed = 0;
    Dd.prototype.reset = function(a, b, c, d, e) {
        "number" == typeof e || Ed++;
        this.rf = d || Ca();
        this.Ma = a;
        this.Me = b;
        this.Ie = c;
        delete this.nd
    }
    ;
    Dd.prototype.bf = function(a) {
        this.Ma = a
    }
    ;
    var Fd = function(a) {
        this.zc = a;
        this.Ib = this.wa = this.Ma = this.I = null
    }
      , Gd = function(a, b) {
        this.name = a;
        this.value = b
    };
    Gd.prototype.toString = function() {
        return this.name
    }
    ;
    var Hd = new Gd("SHOUT",1200)
      , Id = new Gd("SEVERE",1E3)
      , Jd = new Gd("WARNING",900)
      , Kd = new Gd("INFO",800)
      , Ld = new Gd("CONFIG",700)
      , Md = new Gd("FINE",500);
    Fd.prototype.getName = function() {
        return this.zc
    }
    ;
    Fd.prototype.getParent = function() {
        return this.I
    }
    ;
    Fd.prototype.qd = function() {
        this.wa || (this.wa = {});
        return this.wa
    }
    ;
    Fd.prototype.bf = function(a) {
        this.Ma = a
    }
    ;
    var Nd = function(a) {
        if (a.Ma)
            return a.Ma;
        if (a.I)
            return Nd(a.I);
        Ya("Root logger has no level set.");
        return null
    };
    Fd.prototype.log = function(a, b, c) {
        if (a.value >= Nd(this).value)
            for (ta(b) && (b = b()),
            a = new Dd(a,String(b),this.zc),
            c && (a.nd = c),
            c = "log:" + a.Me,
            n.console && (n.console.timeStamp ? n.console.timeStamp(c) : n.console.markTimeline && n.console.markTimeline(c)),
            n.msWriteProfilerMark && n.msWriteProfilerMark(c),
            c = this; c; ) {
                var d = c
                  , e = a;
                if (d.Ib)
                    for (var f = 0; b = d.Ib[f]; f++)
                        b(e);
                c = c.getParent()
            }
    }
    ;
    Fd.prototype.info = function(a, b) {
        this.log(Kd, a, b)
    }
    ;
    var Od = {}
      , Pd = null
      , Qd = function() {
        Pd || (Pd = new Fd(""),
        Od[""] = Pd,
        Pd.bf(Ld))
    }
      , O = function(a) {
        Qd();
        var b;
        if (!(b = Od[a])) {
            b = new Fd(a);
            var c = a.lastIndexOf(".")
              , d = a.substr(c + 1)
              , c = O(a.substr(0, c));
            c.qd()[d] = b;
            b.I = c;
            Od[a] = b
        }
        return b
    };
    var P = {
        Ya: !1,
        get: function(a) {
            if (P.Ya || a.classList)
                return a.classList;
            a = a.className;
            return p(a) && a.match(/\S+/g) || []
        },
        set: function(a, b) {
            a.className = b
        },
        contains: function(a, b) {
            return P.Ya || a.classList ? a.classList.contains(b) : kb(P.get(a), b)
        },
        add: function(a, b) {
            P.Ya || a.classList ? a.classList.add(b) : P.contains(a, b) || (a.className += 0 < a.className.length ? " " + b : b)
        },
        addAll: function(a, b) {
            if (P.Ya || a.classList)
                v(b, function(b) {
                    P.add(a, b)
                });
            else {
                var c = {};
                v(P.get(a), function(a) {
                    c[a] = !0
                });
                v(b, function(a) {
                    c[a] = !0
                });
                a.className = "";
                for (var d in c)
                    a.className += 0 < a.className.length ? " " + d : d
            }
        },
        remove: function(a, b) {
            P.Ya || a.classList ? a.classList.remove(b) : P.contains(a, b) && (a.className = db(P.get(a), function(a) {
                return a != b
            }).join(" "))
        },
        ba: function(a, b) {
            P.Ya || a.classList ? v(b, function(b) {
                P.remove(a, b)
            }) : a.className = db(P.get(a), function(a) {
                return !kb(b, a)
            }).join(" ")
        },
        enable: function(a, b, c) {
            c ? P.add(a, b) : P.remove(a, b)
        },
        dj: function(a, b, c) {
            (c ? P.addAll : P.ba)(a, b)
        },
        ij: function(a, b, c) {
            return P.contains(a, b) ? (P.remove(a, b),
            P.add(a, c),
            !0) : !1
        },
        toggle: function(a, b) {
            var c = !P.contains(a, b);
            P.enable(a, b, c);
            return c
        },
        bj: function(a, b, c) {
            P.remove(a, b);
            P.add(a, c)
        }
    };
    var Rd = !z || ac(9)
      , Sd = !z || ac(9)
      , Td = z && !D("9");
    !C || D("528");
    A && D("1.9b") || z && D("8") || Pb && D("9.5") || C && D("528");
    A && !D("8") || z && D("9");
    var Ud = function() {
        this.Ga = this.Ga;
        this.Oa = this.Oa
    };
    Ud.prototype.Ga = !1;
    Ud.prototype.la = function() {
        this.Ga || (this.Ga = !0,
        this.u())
    }
    ;
    Ud.prototype.u = function() {
        if (this.Oa)
            for (; this.Oa.length; )
                this.Oa.shift()()
    }
    ;
    var Vd = function(a) {
        a && "function" == typeof a.la && a.la()
    }
      , Wd = function(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            sa(d) ? Wd.apply(null, d) : Vd(d)
        }
    };
    var Q = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.Ua = !1;
        this.Ze = !0
    };
    Q.prototype.stopPropagation = function() {
        this.Ua = !0
    }
    ;
    Q.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.Ze = !1
    }
    ;
    var Xd = function(a) {
        a.preventDefault()
    };
    var Yd = function(a, b) {
        Q.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.ha = this.state = null;
        a && this.$(a, b)
    };
    t(Yd, Q);
    var Zd = [1, 4, 2];
    Yd.prototype.$ = function(a, b) {
        var c = this.type = a.type
          , d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var e = a.relatedTarget;
        e ? A && (Mb(e, "nodeName") || (e = null)) : "mouseover" == c ? e = a.fromElement : "mouseout" == c && (e = a.toElement);
        this.relatedTarget = e;
        null === d ? (this.offsetX = C || void 0 !== a.offsetX ? a.offsetX : a.layerX,
        this.offsetY = C || void 0 !== a.offsetY ? a.offsetY : a.layerY,
        this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
        this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
        this.screenX = a.screenX || 0,
        this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
        this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
        this.screenX = d.screenX || 0,
        this.screenY = d.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.state = a.state;
        this.ha = a;
        a.defaultPrevented && this.preventDefault()
    }
    ;
    Yd.prototype.stopPropagation = function() {
        Yd.m.stopPropagation.call(this);
        this.ha.stopPropagation ? this.ha.stopPropagation() : this.ha.cancelBubble = !0
    }
    ;
    Yd.prototype.preventDefault = function() {
        Yd.m.preventDefault.call(this);
        var a = this.ha;
        if (a.preventDefault)
            a.preventDefault();
        else if (a.returnValue = !1,
        Td)
            try {
                if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                    a.keyCode = -1
            } catch (b) {}
    }
    ;
    var $d = "closure_listenable_" + (1E6 * Math.random() | 0)
      , ae = function(a) {
        return !(!a || !a[$d])
    }
      , be = 0;
    var ce = function(a, b, c, d, e) {
        this.listener = a;
        this.Fc = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.nc = e;
        this.key = ++be;
        this.ub = this.$b = !1
    }
      , de = function(a) {
        a.ub = !0;
        a.listener = null;
        a.Fc = null;
        a.src = null;
        a.nc = null
    };
    var ee = function(a) {
        this.src = a;
        this.H = {};
        this.Xb = 0
    };
    ee.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.H[f];
        a || (a = this.H[f] = [],
        this.Xb++);
        var h = fe(a, b, d, e);
        -1 < h ? (b = a[h],
        c || (b.$b = !1)) : (b = new ce(b,this.src,f,!!d,e),
        b.$b = c,
        a.push(b));
        return b
    }
    ;
    ee.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.H))
            return !1;
        var e = this.H[a];
        b = fe(e, b, c, d);
        return -1 < b ? (de(e[b]),
        u(null != e.length),
        Array.prototype.splice.call(e, b, 1),
        0 == e.length && (delete this.H[a],
        this.Xb--),
        !0) : !1
    }
    ;
    var ge = function(a, b) {
        var c = b.type;
        if (!(c in a.H))
            return !1;
        var d = lb(a.H[c], b);
        d && (de(b),
        0 == a.H[c].length && (delete a.H[c],
        a.Xb--));
        return d
    };
    ee.prototype.ba = function(a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.H)
            if (!a || c == a) {
                for (var d = this.H[c], e = 0; e < d.length; e++)
                    ++b,
                    de(d[e]);
                delete this.H[c];
                this.Xb--
            }
        return b
    }
    ;
    ee.prototype.Hb = function(a, b, c, d) {
        a = this.H[a.toString()];
        var e = -1;
        a && (e = fe(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    var fe = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.ub && f.listener == b && f.capture == !!c && f.nc == d)
                return e
        }
        return -1
    };
    var he = "closure_lm_" + (1E6 * Math.random() | 0)
      , ie = {}
      , je = 0
      , R = function(a, b, c, d, e) {
        if (ra(b)) {
            for (var f = 0; f < b.length; f++)
                R(a, b[f], c, d, e);
            return null
        }
        c = ke(c);
        return ae(a) ? a.w(b, c, d, e) : le(a, b, c, !1, d, e)
    }
      , le = function(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var h = !!e
          , k = me(a);
        k || (a[he] = k = new ee(a));
        c = k.add(b, c, d, e, f);
        if (c.Fc)
            return c;
        d = ne();
        c.Fc = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            a.addEventListener(b.toString(), d, h);
        else if (a.attachEvent)
            a.attachEvent(oe(b.toString()), d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        je++;
        return c
    }
      , ne = function() {
        var a = pe
          , b = Sd ? function(c) {
            return a.call(b.src, b.listener, c)
        }
        : function(c) {
            c = a.call(b.src, b.listener, c);
            if (!c)
                return c
        }
        ;
        return b
    }
      , qe = function(a, b, c, d, e) {
        if (ra(b)) {
            for (var f = 0; f < b.length; f++)
                qe(a, b[f], c, d, e);
            return null
        }
        c = ke(c);
        return ae(a) ? a.zd(b, c, d, e) : le(a, b, c, !0, d, e)
    }
      , re = function(a, b, c, d, e) {
        if (ra(b))
            for (var f = 0; f < b.length; f++)
                re(a, b[f], c, d, e);
        else
            c = ke(c),
            ae(a) ? a.Yb(b, c, d, e) : a && (a = me(a)) && (b = a.Hb(b, c, !!d, e)) && S(b)
    }
      , S = function(a) {
        if (oa(a) || !a || a.ub)
            return !1;
        var b = a.src;
        if (ae(b))
            return ge(b.W, a);
        var c = a.type
          , d = a.Fc;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent && b.detachEvent(oe(c), d);
        je--;
        (c = me(b)) ? (ge(c, a),
        0 == c.Xb && (c.src = null,
        b[he] = null)) : de(a);
        return !0
    }
      , T = function(a, b) {
        if (a)
            if (ae(a))
                a.W && a.W.ba(b);
            else {
                var c = me(a);
                if (c) {
                    var d = 0, e = b && b.toString(), f;
                    for (f in c.H)
                        if (!e || f == e)
                            for (var h = c.H[f].concat(), k = 0; k < h.length; ++k)
                                S(h[k]) && ++d
                }
            }
    }
      , oe = function(a) {
        return a in ie ? ie[a] : ie[a] = "on" + a
    }
      , ue = function(a, b) {
        var c = window;
        ae(c) ? se(c, a, !1, b) : te(c, a, !1, b)
    }
      , te = function(a, b, c, d) {
        var e = !0;
        if (a = me(a))
            if (b = a.H[b.toString()])
                for (b = b.concat(),
                a = 0; a < b.length; a++) {
                    var f = b[a];
                    f && f.capture == c && !f.ub && (f = ve(f, d),
                    e = e && !1 !== f)
                }
        return e
    }
      , ve = function(a, b) {
        var c = a.listener
          , d = a.nc || a.src;
        a.$b && S(a);
        return c.call(d, b)
    }
      , pe = function(a, b) {
        if (a.ub)
            return !0;
        if (!Sd) {
            var c;
            if (!(c = b))
                a: {
                    c = ["window", "event"];
                    for (var d = n, e; e = c.shift(); )
                        if (null != d[e])
                            d = d[e];
                        else {
                            c = null;
                            break a
                        }
                    c = d
                }
            e = c;
            c = new Yd(e,this);
            d = !0;
            if (!(0 > e.keyCode || void 0 != e.returnValue)) {
                a: {
                    var f = !1;
                    if (0 == e.keyCode)
                        try {
                            e.keyCode = -1;
                            break a
                        } catch (m) {
                            f = !0
                        }
                    if (f || void 0 == e.returnValue)
                        e.returnValue = !0
                }
                e = [];
                for (f = c.currentTarget; f; f = f.parentNode)
                    e.push(f);
                for (var h = a.type, k = e.length - 1; !c.Ua && 0 <= k; k--)
                    c.currentTarget = e[k],
                    f = te(e[k], h, !0, c),
                    d = d && f;
                for (k = 0; !c.Ua && k < e.length; k++)
                    c.currentTarget = e[k],
                    f = te(e[k], h, !1, c),
                    d = d && f
            }
            return d
        }
        return ve(a, new Yd(b,this))
    }
      , me = function(a) {
        a = a[he];
        return a instanceof ee ? a : null
    }
      , we = "__closure_events_fn_" + (1E9 * Math.random() >>> 0)
      , ke = function(a) {
        u(a, "Listener can not be null.");
        if (ta(a))
            return a;
        u(a.handleEvent, "An object listener must have handleEvent method.");
        a[we] || (a[we] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[we]
    };
    var xe = function(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
      , ye = function(a, b, c) {
        var d = 0
          , e = !1
          , f = []
          , h = function() {
            d = 0;
            e && (e = !1,
            k())
        }
          , k = function() {
            d = n.setTimeout(h, b);
            a.apply(c, f)
        };
        return function(a) {
            f = arguments;
            d ? e = !0 : k()
        }
    };
    var ze = function(a) {
        Ud.call(this);
        this.P = a;
        this.s = {}
    };
    t(ze, Ud);
    var Ae = [];
    ze.prototype.w = function(a, b, c, d) {
        ra(b) || (b && (Ae[0] = b.toString()),
        b = Ae);
        for (var e = 0; e < b.length; e++) {
            var f = R(a, b[e], c || this.handleEvent, d || !1, this.P || this);
            if (!f)
                break;
            this.s[f.key] = f
        }
        return this
    }
    ;
    ze.prototype.zd = function(a, b, c, d) {
        return Be(this, a, b, c, d)
    }
    ;
    var Be = function(a, b, c, d, e, f) {
        if (ra(c))
            for (var h = 0; h < c.length; h++)
                Be(a, b, c[h], d, e, f);
        else {
            b = qe(b, c, d || a.handleEvent, e, f || a.P || a);
            if (!b)
                return a;
            a.s[b.key] = b
        }
        return a
    };
    ze.prototype.Yb = function(a, b, c, d, e) {
        if (ra(b))
            for (var f = 0; f < b.length; f++)
                this.Yb(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            e = e || this.P || this,
            c = ke(c),
            d = !!d,
            b = ae(a) ? a.Hb(b, c, d, e) : a ? (a = me(a)) ? a.Hb(b, c, d, e) : null : null,
            b && (S(b),
            delete this.s[b.key]);
        return this
    }
    ;
    ze.prototype.ba = function() {
        sb(this.s, function(a, b) {
            this.s.hasOwnProperty(b) && S(a)
        }, this);
        this.s = {}
    }
    ;
    ze.prototype.u = function() {
        ze.m.u.call(this);
        this.ba()
    }
    ;
    ze.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    var U = function() {
        Ud.call(this);
        this.W = new ee(this);
        this.Ff = this;
        this.Dc = null
    };
    t(U, Ud);
    U.prototype[$d] = !0;
    g = U.prototype;
    g.Hd = function(a) {
        this.Dc = a
    }
    ;
    g.addEventListener = function(a, b, c, d) {
        R(this, a, b, c, d)
    }
    ;
    g.removeEventListener = function(a, b, c, d) {
        re(this, a, b, c, d)
    }
    ;
    g.dispatchEvent = function(a) {
        Ce(this);
        var b = this.Dc;
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.Dc)
                c.push(b),
                u(1E3 > ++d, "infinite loop")
        }
        b = this.Ff;
        d = a.type || a;
        if (p(a))
            a = new Q(a,b);
        else if (a instanceof Q)
            a.target = a.target || b;
        else {
            var e = a;
            a = new Q(d,b);
            yb(a, e)
        }
        var e = !0;
        if (c)
            for (var f = c.length - 1; !a.Ua && 0 <= f; f--) {
                var h = a.currentTarget = c[f];
                e = se(h, d, !0, a) && e
            }
        a.Ua || (h = a.currentTarget = b,
        e = se(h, d, !0, a) && e,
        a.Ua || (e = se(h, d, !1, a) && e));
        if (c)
            for (f = 0; !a.Ua && f < c.length; f++)
                h = a.currentTarget = c[f],
                e = se(h, d, !1, a) && e;
        return e
    }
    ;
    g.u = function() {
        U.m.u.call(this);
        this.W && this.W.ba(void 0);
        this.Dc = null
    }
    ;
    g.w = function(a, b, c, d) {
        Ce(this);
        return this.W.add(String(a), b, !1, c, d)
    }
    ;
    g.zd = function(a, b, c, d) {
        return this.W.add(String(a), b, !0, c, d)
    }
    ;
    g.Yb = function(a, b, c, d) {
        return this.W.remove(String(a), b, c, d)
    }
    ;
    var se = function(a, b, c, d) {
        b = a.W.H[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.ub && h.capture == c) {
                var k = h.listener
                  , m = h.nc || h.src;
                h.$b && ge(a.W, h);
                e = !1 !== k.call(m, d) && e
            }
        }
        return e && 0 != d.Ze
    };
    U.prototype.Hb = function(a, b, c, d) {
        return this.W.Hb(String(a), b, c, d)
    }
    ;
    var Ce = function(a) {
        u(a.W, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    var De = function(a, b) {
        for (var c = [a], d = b.length - 1; 0 <= d; --d)
            c.push(typeof b[d], b[d]);
        return c.join("\x0B")
    };
    var Ee = function(a, b, c) {
        this.lg = c;
        this.Wf = a;
        this.Kg = b;
        this.Ac = 0;
        this.oc = null
    };
    Ee.prototype.get = function() {
        if (0 < this.Ac) {
            this.Ac--;
            var a = this.oc;
            this.oc = a.next;
            a.next = null
        } else
            a = this.Wf();
        return a
    }
    ;
    Ee.prototype.put = function(a) {
        this.Kg(a);
        this.Ac < this.lg && (this.Ac++,
        a.next = this.oc,
        this.oc = a)
    }
    ;
    var Fe = function(a) {
        n.setTimeout(function() {
            throw a;
        }, 0)
    }, Ge, He = function() {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !w("Presto") && (a = function() {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow
              , a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random()
              , d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host
              , a = r(function(a) {
                if (("*" == d || a.origin == d) && a.data == c)
                    this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    b.postMessage(c, d)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !Bb()) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (na(c.next)) {
                    c = c.next;
                    var a = c.fe;
                    c.fe = null;
                    a()
                }
            }
            ;
            return function(a) {
                d.next = {
                    fe: a
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange"in document.createElement("SCRIPT") ? function(a) {
            var b = document.createElement("SCRIPT");
            b.onreadystatechange = function() {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            }
            ;
            document.documentElement.appendChild(b)
        }
        : function(a) {
            n.setTimeout(a, 0)
        }
    };
    var Ie = function() {
        this.Sc = this.Xa = null
    }
      , Ke = new Ee(function() {
        return new Je
    }
    ,function(a) {
        a.reset()
    }
    ,100);
    Ie.prototype.add = function(a, b) {
        var c = Ke.get();
        c.set(a, b);
        this.Sc ? this.Sc.next = c : (u(!this.Xa),
        this.Xa = c);
        this.Sc = c
    }
    ;
    Ie.prototype.remove = function() {
        var a = null;
        this.Xa && (a = this.Xa,
        this.Xa = this.Xa.next,
        this.Xa || (this.Sc = null),
        a.next = null);
        return a
    }
    ;
    var Je = function() {
        this.next = this.scope = this.na = null
    };
    Je.prototype.set = function(a, b) {
        this.na = a;
        this.scope = b;
        this.next = null
    }
    ;
    Je.prototype.reset = function() {
        this.next = this.scope = this.na = null
    }
    ;
    var Pe = function(a, b) {
        Le || Me();
        Ne || (Le(),
        Ne = !0);
        Oe.add(a, b)
    }, Le, Me = function() {
        if (-1 != String(n.Promise).indexOf("[native code]")) {
            var a = n.Promise.resolve(void 0);
            Le = function() {
                a.then(Qe)
            }
        } else
            Le = function() {
                var a = Qe;
                !ta(n.setImmediate) || n.Window && n.Window.prototype && !w("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (Ge || (Ge = He()),
                Ge(a)) : n.setImmediate(a)
            }
    }, Ne = !1, Oe = new Ie, Qe = function() {
        for (var a; a = Oe.remove(); ) {
            try {
                a.na.call(a.scope)
            } catch (b) {
                Fe(b)
            }
            Ke.put(a)
        }
        Ne = !1
    };
    var Se = function(a, b) {
        this.M = 0;
        this.vb = void 0;
        this.bc = this.bb = this.I = null;
        this.lc = this.od = !1;
        if (a != pa)
            try {
                var c = this;
                a.call(b, function(a) {
                    Re(c, 2, a)
                }, function(a) {
                    try {
                        if (a instanceof Error)
                            throw a;
                        throw Error("Promise rejected.");
                    } catch (e) {}
                    Re(c, 3, a)
                })
            } catch (d) {
                Re(this, 3, d)
            }
    }
      , Te = function() {
        this.next = this.context = this.sb = this.Pa = this.cb = null;
        this.Zc = !1
    };
    Te.prototype.reset = function() {
        this.context = this.sb = this.Pa = this.cb = null;
        this.Zc = !1
    }
    ;
    var Ue = new Ee(function() {
        return new Te
    }
    ,function(a) {
        a.reset()
    }
    ,100)
      , Ve = function(a, b, c) {
        var d = Ue.get();
        d.Pa = a;
        d.sb = b;
        d.context = c;
        return d
    }
      , We = function() {
        var a = new Se(pa);
        Re(a, 2, void 0);
        return a
    }
      , Xe = function(a) {
        return new Se(function(b, c) {
            c(a)
        }
        )
    }
      , Ze = function(a, b, c) {
        Ye(a, b, c, null) || Pe(Ba(b, a))
    }
      , $e = function(a) {
        return new Se(function(b, c) {
            var d = a.length
              , e = [];
            if (d)
                for (var f = function(a, c) {
                    d--;
                    e[a] = c;
                    0 == d && b(e)
                }, h = function(a) {
                    c(a)
                }, k = 0, m; k < a.length; k++)
                    m = a[k],
                    Ze(m, Ba(f, k), h);
            else
                b(e)
        }
        )
    };
    Se.prototype.then = function(a, b, c) {
        null != a && ab(a, "opt_onFulfilled should be a function.");
        null != b && ab(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
        return af(this, ta(a) ? a : null, ta(b) ? b : null, c)
    }
    ;
    Se.prototype.then = Se.prototype.then;
    Se.prototype.$goog_Thenable = !0;
    var bf = function(a, b) {
        return af(a, null, b, void 0)
    }
      , df = function(a, b) {
        a.bb || 2 != a.M && 3 != a.M || cf(a);
        u(null != b.Pa);
        a.bc ? a.bc.next = b : a.bb = b;
        a.bc = b
    }
      , af = function(a, b, c, d) {
        var e = Ve(null, null, null);
        e.cb = new Se(function(a, h) {
            e.Pa = b ? function(c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (q) {
                    h(q)
                }
            }
            : a;
            e.sb = c ? function(b) {
                try {
                    var e = c.call(d, b);
                    a(e)
                } catch (q) {
                    h(q)
                }
            }
            : h
        }
        );
        e.cb.I = a;
        df(a, e);
        return e.cb
    };
    Se.prototype.bh = function(a) {
        u(1 == this.M);
        this.M = 0;
        Re(this, 2, a)
    }
    ;
    Se.prototype.dh = function(a) {
        u(1 == this.M);
        this.M = 0;
        Re(this, 3, a)
    }
    ;
    var Re = function(a, b, c) {
        0 == a.M && (a === c && (b = 3,
        c = new TypeError("Promise cannot resolve to itself")),
        a.M = 1,
        Ye(c, a.bh, a.dh, a) || (a.vb = c,
        a.M = b,
        a.I = null,
        cf(a),
        3 != b || ef(a, c)))
    }
      , Ye = function(a, b, c, d) {
        if (a instanceof Se)
            return null != b && ab(b, "opt_onFulfilled should be a function."),
            null != c && ab(c, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"),
            df(a, Ve(b || pa, c || null, d)),
            !0;
        if (a)
            try {
                var e = !!a.$goog_Thenable
            } catch (h) {
                e = !1
            }
        else
            e = !1;
        if (e)
            return a.then(b, c, d),
            !0;
        if (va(a))
            try {
                var f = a.then;
                if (ta(f))
                    return ff(a, f, b, c, d),
                    !0
            } catch (h) {
                return c.call(d, h),
                !0
            }
        return !1
    }
      , ff = function(a, b, c, d, e) {
        var f = !1
          , h = function(a) {
            f || (f = !0,
            c.call(e, a))
        }
          , k = function(a) {
            f || (f = !0,
            d.call(e, a))
        };
        try {
            b.call(a, h, k)
        } catch (m) {
            k(m)
        }
    }
      , cf = function(a) {
        a.od || (a.od = !0,
        Pe(a.$f, a))
    }
      , gf = function(a) {
        var b = null;
        a.bb && (b = a.bb,
        a.bb = b.next,
        b.next = null);
        a.bb || (a.bc = null);
        null != b && u(null != b.Pa);
        return b
    };
    Se.prototype.$f = function() {
        for (var a; a = gf(this); ) {
            var b = this.M
              , c = this.vb;
            if (3 == b && a.sb && !a.Zc) {
                var d;
                for (d = this; d && d.lc; d = d.I)
                    d.lc = !1
            }
            if (a.cb)
                a.cb.I = null,
                hf(a, b, c);
            else
                try {
                    a.Zc ? a.Pa.call(a.context) : hf(a, b, c)
                } catch (e) {
                    jf.call(null, e)
                }
            Ue.put(a)
        }
        this.od = !1
    }
    ;
    var hf = function(a, b, c) {
        2 == b ? a.Pa.call(a.context, c) : a.sb && a.sb.call(a.context, c)
    }
      , ef = function(a, b) {
        a.lc = !0;
        Pe(function() {
            a.lc && jf.call(null, b)
        })
    }
      , jf = Fe;
    var kf = function(a, b, c) {
        if (ta(a))
            c && (a = r(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = r(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : n.setTimeout(a, b || 0)
    };
    var lf = function(a, b) {
        var c = b || De;
        return function() {
            var b = this || n
              , b = b.closure_memoize_cache_ || (b.closure_memoize_cache_ = {})
              , e = c(ya(a), arguments);
            return b.hasOwnProperty(e) ? b[e] : b[e] = a.apply(this, arguments)
        }
    }(function() {
        return z ? ac(8) : "onhashchange"in n
    });
    var V = function(a, b, c) {
        a && a.log(Id, b, c)
    }
      , mf = function(a, b) {
        a && a.log(Jd, b, void 0)
    }
      , W = function(a, b) {
        a && a.info(b, void 0)
    }
      , nf = function(a, b) {
        a && a.log(Md, b, void 0)
    };
    var of = Cb()
      , pf = Jb() || w("iPod")
      , qf = w("iPad")
      , rf = Gb()
      , sf = Db()
      , tf = Eb() && !Kb();
    var uf = function(a) {
        return (a = a.exec(ob)) ? a[1] : ""
    }
      , vf = function() {
        if (of)
            return uf(/Firefox\/([0-9.]+)/);
        if (z || Qb || Pb)
            return Zb;
        if (sf)
            return Kb() ? uf(/CriOS\/([0-9.]+)/) : uf(/Chrome\/([0-9.]+)/);
        if (tf && !Kb())
            return uf(/Version\/([0-9.]+)/);
        if (pf || qf) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(ob);
            if (a)
                return a[1] + "." + a[2]
        } else if (rf)
            return (a = uf(/Android\s+([0-9.]+)/)) ? a : uf(/Version\/([0-9.]+)/);
        return ""
    }();
    var wf = xe(function() {
        return !z || 0 <= Ta(vf, 9)
    })
      , xf = xe(function() {
        return C || Qb || A && 0 <= Ta(vf, 10) || z && 0 <= Ta(vf, 10)
    })
      , zf = function(a, b) {
        if (wf()) {
            var c = xf() ? "translate3d(0px," + b + "px,0px)" : "translate(0px," + b + "px)";
            dd(a, yf(), c)
        }
    }
      , yf = xe(function() {
        return z && 9 == $b ? "-ms-transform" : "transform"
    });
    var Bf = function(a) {
        this.a = O("blogger.templates.responsive.CollapsedHeader");
        W(this.a, "Initializing collapsed header.");
        try {
            if (this.ec = a || new Da,
            this.Ub = null,
            this.o = document.querySelector(".centered-top-container"))
                if (this.Y = document.querySelector(".centered-top-placeholder"))
                    if (this.jf = document.querySelector(this.ec.Ug)) {
                        var b = this.o.querySelector(".centered-top");
                        if (b) {
                            this.Rf = b.cloneNode(!0);
                            this.Md = this.Kb = !1;
                            var c = ye(this.og, this.ec.Ag, this);
                            this.Ub = c;
                            c();
                            R(this.ec.Og, "scroll", this.Ub);
                            Af(this);
                            W(this.a, "Finished initializing collapsed header.")
                        } else
                            V(this.a, "There was an error initializing the collapsed header. centered-top not found.")
                    } else
                        V(this.a, "There was an error initializing the collapsed header. centered-bottom not found.");
                else
                    V(this.a, "There was an error initializing the collapsed header. centered-top-placeholder not found.");
            else
                V(this.a, "There was an error initializing the collapsed header. centered-top-container not found.")
        } catch (d) {
            V(this.a, "There was an error initializing the collapsed header. Uncaught exception.", d),
            this.b()
        }
    };
    Bf.prototype.og = function() {
        var a = this;
        0 > this.jf.getBoundingClientRect().top ? this.Md || (this.Kb && (M in this.o && T(this.o, M),
        this.Kb = !1),
        this.Md = !0,
        P.add(document.body, "collapsed-header"),
        P.contains(this.Y, "cloned") || (P.add(this.Y, "cloned"),
        this.Y.appendChild(this.Rf)),
        P.add(this.o, "sticky"),
        P.remove(this.o, "animating"),
        Cf(this),
        setTimeout(function() {
            P.add(a.o, "animating");
            zf(a.o, 0);
            a.o.style.opacity = "1";
            ue("collapsed-header-show", new Df("collapsed-header-show"))
        }, 0),
        document.body.appendChild(this.o)) : (this.Md = !1,
        P.contains(this.Y, "cloned") && (Cf(this),
        M ? R(this.o, M, this.ze, !1, this) : setTimeout(function() {
            return a.ze()
        }, this.ec.hg),
        this.Kb = !0))
    }
    ;
    var Cf = function(a) {
        var b = a.o.getBoundingClientRect().height;
        zf(a.o, -b);
        a.o.style.opacity = "0"
    };
    Bf.prototype.ze = function() {
        this.Kb && (this.o.style.transform = "",
        this.o.style.opacity = "",
        M && T(this.o, M),
        this.Kb = !1,
        this.Y.parentNode.insertBefore(this.o, this.Y),
        P.remove(document.body, "collapsed-header"),
        P.contains(this.Y, "cloned") && (P.remove(this.Y, "cloned"),
        this.Y.removeChild(this.Y.lastChild)),
        P.remove(this.o, "sticky"),
        ue("collapsed-header-hide", new Df("collapsed-header-hide")))
    }
    ;
    Bf.prototype.G = function() {
        return P.contains(document.body, "collapsed-header")
    }
    ;
    Bf.prototype.se = function() {
        return this.G() && this.o.offsetHeight || 0
    }
    ;
    var Af = function(a) {
        Ef(a, window.location.hash, !0);
        R(window, "hashchange", function() {
            return Ef(a, window.location.hash)
        });
        R(document.body, "click", function(b) {
            b = b.target;
            "A" == b.nodeName && Ef(a, b.getAttribute("href"), !1, !0)
        })
    }
      , Ef = function(a, b, c, d) {
        c = void 0 === c ? !1 : c;
        d = void 0 === d ? !1 : d;
        if (!/^#[^ ]+$/.test(b))
            return !1;
        var e = document.getElementById(b.slice(1));
        if (e) {
            var f = qe(window, "collapsed-header-show", Ff(a, e));
            setTimeout(function() {
                S(f)
            }, c ? 3E3 : 100);
            lf && d && window.history.pushState({}, document.title, window.location.pathname + b)
        }
        return !!e
    }
      , Ff = function(a, b) {
        return function() {
            if (!a.G())
                return !1;
            var c = a.se() + 20
              , d = b.getBoundingClientRect().top;
            return 0 <= d && d < c && window.pageYOffset > c ? (window.scrollTo(window.pageXOffset, window.pageYOffset - c),
            !0) : !1
        }
    };
    Bf.prototype.b = function() {
        this.Ub && (re(window, "scroll", this.Ub),
        this.Ub = null)
    }
    ;
    var Df = function(a, b) {
        Q.call(this, a, b)
    };
    aa(Df, Q);
    var Gf = function(a) {
        this.D = a
    };
    Gf.prototype.show = function() {
        this.D && P.remove(this.D, "hidden")
    }
    ;
    Gf.prototype.Jb = function() {
        this.D && P.add(this.D, "hidden")
    }
    ;
    Gf.prototype.T = function() {
        this.D && this.D.parentNode && (this.D.parentNode.removeChild(this.D),
        this.D = null)
    }
    ;
    var Hf = function(a, b, c) {
        var d = document.createElement("div");
        P.add(d, "dim-overlay");
        P.add(d, "hidden");
        c && (d.id = c);
        a.appendChild(d);
        var e = new Gf(d);
        R(d, "click", function(a) {
            b && b(a);
            e.Jb()
        });
        return e
    };
    var Kf = function(a, b, c, d, e, f) {
        if (!(z || Qb || C && D("525")))
            return !0;
        if (Sb && e)
            return If(a);
        if (e && !d)
            return !1;
        oa(b) && (b = Jf(b));
        e = 17 == b || 18 == b || Sb && 91 == b;
        if ((!c || Sb) && e || Sb && 16 == b && (d || f))
            return !1;
        if ((C || Qb) && d && c)
            switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
            }
        if (z && d && b == a)
            return !1;
        switch (a) {
        case 13:
            return !0;
        case 27:
            return !(C || Qb)
        }
        return If(a)
    }
      , If = function(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (C || Qb) && 0 == a)
            return !0;
        switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
            return !0;
        default:
            return !1
        }
    }
      , Jf = function(a) {
        if (A)
            a = Lf(a);
        else if (Sb && C)
            switch (a) {
            case 93:
                a = 91
            }
        return a
    }
      , Lf = function(a) {
        switch (a) {
        case 61:
            return 187;
        case 59:
            return 186;
        case 173:
            return 189;
        case 224:
            return 91;
        case 0:
            return 224;
        default:
            return a
        }
    };
    var Mf = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "caps-lock",
        27: "esc",
        32: "space",
        33: "pg-up",
        34: "pg-down",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "delete",
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        59: "semicolon",
        61: "equals",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        93: "context",
        96: "num-0",
        97: "num-1",
        98: "num-2",
        99: "num-3",
        100: "num-4",
        101: "num-5",
        102: "num-6",
        103: "num-7",
        104: "num-8",
        105: "num-9",
        106: "num-multiply",
        107: "num-plus",
        109: "num-minus",
        110: "num-period",
        111: "num-division",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        186: "semicolon",
        187: "equals",
        189: "dash",
        188: ",",
        190: ".",
        191: "/",
        192: "`",
        219: "open-square-bracket",
        220: "\\",
        221: "close-square-bracket",
        222: "single-quote",
        224: "win"
    };
    var Pf = function(a) {
        U.call(this);
        this.Fb = this.Sb = {};
        this.xc = 0;
        this.eg = zb(Nf);
        this.$g = zb(Of);
        this.Jf = !0;
        this.Hf = this.Kf = !1;
        this.qg = !0;
        this.If = !1;
        this.Xc = null;
        this.La = a;
        R(this.La, "keydown", this.kb, void 0, this);
        Tb && R(this.La, "keypress", this.ue, void 0, this);
        R(this.La, "keyup", this.te, void 0, this)
    }, Qf;
    t(Pf, U);
    var Rf = function(a) {
        this.gf = a || null;
        this.next = a ? null : {}
    }
      , Nf = [27, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 19]
      , Of = "color date datetime datetime-local email month number password search tel text time url week".split(" ");
    Pf.prototype.Ig = function(a, b) {
        Sf(this.Sb, Tf(arguments), a)
    }
    ;
    var Tf = function(a) {
        if (p(a[1]))
            a = eb(Uf(a[1]), function(a) {
                Za(a.keyCode, "A non-modifier key is needed in each stroke.");
                return Vf(a.key || "", a.keyCode, a.rg)
            });
        else {
            var b = a
              , c = 1;
            ra(a[1]) && (b = a[1],
            c = 0);
            for (a = []; c < b.length; c += 2)
                a.push(Vf("", b[c], b[c + 1]))
        }
        return a
    };
    Pf.prototype.u = function() {
        Pf.m.u.call(this);
        this.Sb = {};
        re(this.La, "keydown", this.kb, !1, this);
        Tb && re(this.La, "keypress", this.ue, !1, this);
        re(this.La, "keyup", this.te, !1, this);
        this.La = null
    }
    ;
    var Uf = function(a) {
        a = a.replace(/[ +]*\+[ +]*/g, "+").replace(/[ ]+/g, " ").toLowerCase();
        a = a.split(" ");
        for (var b = [], c, d = 0; c = a[d]; d++) {
            var e = c.split("+")
              , f = null
              , h = null;
            c = 0;
            for (var k, m = 0; k = e[m]; m++) {
                switch (k) {
                case "shift":
                    c |= 1;
                    continue;
                case "ctrl":
                    c |= 2;
                    continue;
                case "alt":
                    c |= 4;
                    continue;
                case "meta":
                    c |= 8;
                    continue
                }
                null === h || Ya("At most one non-modifier key can be in a stroke.");
                e = void 0;
                f = k;
                if (!Qf) {
                    h = {};
                    for (e in Mf)
                        h[Mf[e]] = Jf(parseInt(e, 10));
                    Qf = h
                }
                h = Qf[f];
                Za(h, "Key name not found in goog.events.KeyNames: " + k);
                f = k;
                break
            }
            b.push({
                key: f,
                keyCode: h,
                rg: c
            })
        }
        return b
    };
    Pf.prototype.te = function(a) {
        A && Wf(this, a);
        Tb && !this.Fe && Tb && a.ctrlKey && a.altKey && this.kb(a)
    }
    ;
    var Wf = function(a, b) {
        if (Sb) {
            if (224 == b.keyCode) {
                a.Ke = !0;
                kf(function() {
                    this.Ke = !1
                }, 400, a);
                return
            }
            var c = b.metaKey || a.Ke;
            67 != b.keyCode && 88 != b.keyCode && 86 != b.keyCode || !c || (b.metaKey = c,
            a.kb(b))
        }
        32 == a.Xc && 32 == b.keyCode && b.preventDefault();
        a.Xc = null
    };
    Pf.prototype.ue = function(a) {
        32 < a.keyCode && Tb && a.ctrlKey && a.altKey && (this.Fe = !0)
    }
    ;
    var Sf = function(a, b, c) {
        var d = b.shift();
        v(d, function(c) {
            if ((c = a[c]) && (0 == b.length || c.gf))
                throw Error("Keyboard shortcut conflicts with existing shortcut");
        });
        b.length ? v(d, function(d) {
            d = d.toString();
            var e = new Rf;
            d = d in a ? a[d] : a[d] = e;
            e = b.slice(0);
            Sf(u(d.next, "An internal node must have a next map"), e, c)
        }) : v(d, function(b) {
            a[b] = new Rf(c)
        })
    }
      , Xf = function(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = a[b[c]];
            if (d)
                return d
        }
    }
      , Vf = function(a, b, c) {
        c = c || 0;
        b = ["c_" + b + "_" + c];
        "" != a && b.push("n_" + a + "_" + c);
        return b
    };
    Pf.prototype.kb = function(a) {
        a: {
            var b = a.keyCode;
            if ("" != a.key) {
                var c = a.key;
                if ("Control" == c || "Shift" == c || "Meta" == c || "AltGraph" == c) {
                    b = !1;
                    break a
                }
            } else if (16 == b || 17 == b || 18 == b) {
                b = !1;
                break a
            }
            var c = a.target
              , d = "TEXTAREA" == c.tagName || "INPUT" == c.tagName || "BUTTON" == c.tagName || "SELECT" == c.tagName
              , e = !d && (c.isContentEditable || c.ownerDocument && "on" == c.ownerDocument.designMode);
            b = !d && !e || this.eg[b] || this.Hf ? !0 : e ? !1 : this.qg && (a.altKey || a.ctrlKey || a.metaKey) ? !0 : "INPUT" == c.tagName && this.$g[c.type] ? 13 == b : "INPUT" == c.tagName || "BUTTON" == c.tagName ? this.If ? !0 : 32 != b : !1
        }
        if (b) {
            b = Jf(a.keyCode);
            c = Vf(a.key, b, (a.shiftKey ? 1 : 0) | (a.ctrlKey ? 2 : 0) | (a.altKey ? 4 : 0) | (a.metaKey ? 8 : 0));
            d = Xf(this.Fb, c);
            if (!d || 1500 <= Ca() - this.xc)
                this.Fb = this.Sb,
                this.xc = Ca();
            (d = Xf(this.Fb, c)) && d.next && (this.Fb = d.next,
            this.xc = Ca());
            "keydown" == a.type && Tb && a.ctrlKey && a.altKey ? this.Fe = !1 : d && (d.next ? a.preventDefault() : (this.Fb = this.Sb,
            this.xc = Ca(),
            this.Jf && a.preventDefault(),
            this.Kf && a.stopPropagation(),
            c = $a(d.gf, "A terminal node must have a string shortcut identifier."),
            d = a.target,
            e = this.dispatchEvent(new Yf("shortcut",c,d)),
            (e &= this.dispatchEvent(new Yf("shortcut_" + c,c,d))) || a.preventDefault(),
            A && (this.Xc = b)))
        }
    }
    ;
    var Yf = function(a, b, c) {
        Q.call(this, a, c);
        this.identifier = b
    };
    t(Yf, Q);
    var $f = function(a, b) {
        b = void 0 === b ? !0 : b;
        var c = this;
        this.a = O("blogger.templates.responsive.Search");
        W(this.a, "Initializing Search.");
        try {
            if (this.Db = a || document.querySelector(".centered-top-container")) {
                var d = this.Db.querySelector(".search");
                if (d) {
                    this.Da = d;
                    var e = this.Db.querySelectorAll(".search-expand");
                    (this.Va = e && Array.prototype.slice.call(e, 0)) && 0 != this.Va.length ? (this.Rb = this.Db.querySelector(".search-close"),
                    this.D = b && Hf(this.Da, function() {
                        return c.Sd()
                    }) || null,
                    (this.ed = this.Db.querySelector(".centered-top")) ? (this.$e = this.Da.querySelector(".search-action"),
                    (this.Wa = this.Da.querySelector(".search-input input")) ? (this.Ge = new Pf(document),
                    Zf(this),
                    W(this.a, "Finished initializing search section.")) : V(this.a, "There was an error initializing the search section. search input not found.")) : V(this.a, "There was an error initializing the search section. centered-top not found.")) : mf(this.a, "There was an error initializing the search section. No search buttons found.")
                } else
                    V(this.a, "There was an error initializing the search section. search section not found.")
            } else
                V(this.a, "There was an error initializing the search section. container not found.")
        } catch (f) {
            V(this.a, "Error initializing section. Uncaught exception.", f),
            this.b()
        }
    }
      , Zf = function(a) {
        if (a.Va)
            for (var b = l(a.Va), c = b.next(); !c.done; c = b.next())
                R(c.value, "click", a.Sd, !1, a);
        a.Rb && R(a.Rb, "click", a.Sd, !1, a);
        b = function() {
            a.$e && (a.$e.disabled = "" == a.Wa.value)
        }
        ;
        R(a.Wa, "input", b);
        b();
        a.Ge.Ig("showSearch", 191, 0);
        R(a.Ge, "shortcut", a.qe, !1, a)
    };
    $f.prototype.Sd = function() {
        P.contains(this.Da, "focused") ? P.contains(this.Da, "focused") && (P.remove(this.Da, "focused"),
        P.remove(this.ed, "search-focused"),
        this.D && this.D.Jb()) : this.qe()
    }
    ;
    $f.prototype.qe = function() {
        P.contains(this.Da, "focused") || (P.add(this.ed, "search-focused"),
        P.add(this.Da, "focused"),
        this.D && this.D.show());
        this.Wa.focus()
    }
    ;
    $f.prototype.b = function() {
        this.D && (this.D.T(),
        this.D = null);
        if (this.Va) {
            for (var a = l(this.Va), b = a.next(); !b.done; b = a.next())
                T(b.value, "click");
            this.Va = null
        }
        this.Rb && (T(this.Rb, "click"),
        this.Rb = null);
        this.Wa && (T(this.Wa, "input"),
        this.Wa = null)
    }
    ;
    var ag = function() {};
    ag.prototype.L = function() {}
    ;
    var dg = function(a, b, c, d, e, f, h, k, m) {
        u(c);
        var q;
        if (q = c.offsetParent) {
            var y = "HTML" == q.tagName || "BODY" == q.tagName;
            if (!y || "static" != gd(q)) {
                var x = ld(q);
                y || (y = (y = rd(q)) && A ? -q.scrollLeft : !y || Rb && D("8") || "visible" == fd(q, "overflowX") ? q.scrollLeft : q.scrollWidth - q.clientWidth - q.scrollLeft,
                x = Ac(x, new F(y,q.scrollTop)))
            }
        }
        q = x || new F;
        x = ld(a);
        y = pd(a);
        x = new bd(x.x,x.y,y.width,y.height);
        if (y = md(a)) {
            var B = new bd(y.left,y.top,y.right - y.left,y.bottom - y.top)
              , y = Math.max(x.left, B.left)
              , E = Math.min(x.left + x.width, B.left + B.width);
            if (y <= E) {
                var fa = Math.max(x.top, B.top)
                  , B = Math.min(x.top + x.height, B.top + B.height);
                fa <= B && (x.left = y,
                x.top = fa,
                x.width = E - y,
                x.height = B - fa)
            }
        }
        y = H(a);
        fa = H(c);
        if (y.f != fa.f) {
            E = y.f.body;
            var fa = Kc(fa.f)
              , B = new F(0,0)
              , N = Mc(G(E));
            if (Mb(N, "parent")) {
                var zd = E;
                do {
                    if (N == fa)
                        var Ja = ld(zd);
                    else
                        Ja = u(zd),
                        Ja = jd(Ja),
                        Ja = new F(Ja.left,Ja.top);
                    B.x += Ja.x;
                    B.y += Ja.y
                } while (N && N != fa && N != N.parent && (zd = N.frameElement) && (N = N.parent))
            }
            E = Ac(B, ld(E));
            !z || ac(9) || Hc(y.f) || (E = Ac(E, Lc(y.f)));
            x.left += E.x;
            x.top += E.y
        }
        a = bg(a, b);
        b = x.left;
        a & 4 ? b += x.width : a & 2 && (b += x.width / 2);
        b = new F(b,x.top + (a & 1 ? x.height : 0));
        b = Ac(b, q);
        e && (b.x += (a & 4 ? -1 : 1) * e.x,
        b.y += (a & 1 ? -1 : 1) * e.y);
        if (h)
            if (m)
                var ua = m;
            else if (ua = md(c))
                ua.top -= q.y,
                ua.right -= q.x,
                ua.bottom -= q.y,
                ua.left -= q.x;
        return cg(b, c, d, f, ua, h, k)
    }
      , cg = function(a, b, c, d, e, f, h) {
        a = a.clone();
        var k = bg(b, c);
        c = pd(b);
        h = h ? h.clone() : c.clone();
        a = a.clone();
        h = h.clone();
        var m = 0;
        if (d || 0 != k)
            k & 4 ? a.x -= h.width + (d ? d.right : 0) : k & 2 ? a.x -= h.width / 2 : d && (a.x += d.left),
            k & 1 ? a.y -= h.height + (d ? d.bottom : 0) : d && (a.y += d.top);
        if (f) {
            if (e) {
                d = a;
                k = h;
                m = 0;
                65 == (f & 65) && (d.x < e.left || d.x >= e.right) && (f &= -2);
                132 == (f & 132) && (d.y < e.top || d.y >= e.bottom) && (f &= -5);
                d.x < e.left && f & 1 && (d.x = e.left,
                m |= 1);
                if (f & 16) {
                    var q = d.x;
                    d.x < e.left && (d.x = e.left,
                    m |= 4);
                    d.x + k.width > e.right && (k.width = Math.min(e.right - d.x, q + k.width - e.left),
                    k.width = Math.max(k.width, 0),
                    m |= 4)
                }
                d.x + k.width > e.right && f & 1 && (d.x = Math.max(e.right - k.width, e.left),
                m |= 1);
                f & 2 && (m |= (d.x < e.left ? 16 : 0) | (d.x + k.width > e.right ? 32 : 0));
                d.y < e.top && f & 4 && (d.y = e.top,
                m |= 2);
                f & 32 && (q = d.y,
                d.y < e.top && (d.y = e.top,
                m |= 8),
                d.y + k.height > e.bottom && (k.height = Math.min(e.bottom - d.y, q + k.height - e.top),
                k.height = Math.max(k.height, 0),
                m |= 8));
                d.y + k.height > e.bottom && f & 4 && (d.y = Math.max(e.bottom - k.height, e.top),
                m |= 2);
                f & 8 && (m |= (d.y < e.top ? 64 : 0) | (d.y + k.height > e.bottom ? 128 : 0));
                e = m
            } else
                e = 256;
            m = e
        }
        f = new bd(0,0,0,0);
        f.left = a.x;
        f.top = a.y;
        f.width = h.width;
        f.height = h.height;
        e = m;
        if (e & 496)
            return e;
        id(b, new F(f.left,f.top));
        h = new Bc(f.width,f.height);
        c == h || c && h && c.width == h.width && c.height == h.height || (c = h,
        h = G(b),
        a = Hc(H(h).f),
        !z || D("10") || a && D("8") ? (b = b.style,
        A ? b.MozBoxSizing = "border-box" : C ? b.WebkitBoxSizing = "border-box" : b.boxSizing = "border-box",
        b.width = Math.max(c.width, 0) + "px",
        b.height = Math.max(c.height, 0) + "px") : (h = b.style,
        a ? (z ? (k = td(b, "paddingLeft"),
        d = td(b, "paddingRight"),
        f = td(b, "paddingTop"),
        a = td(b, "paddingBottom"),
        a = new ad(f,d,a,k)) : (k = J(b, "paddingLeft"),
        d = J(b, "paddingRight"),
        f = J(b, "paddingTop"),
        a = J(b, "paddingBottom"),
        a = new ad(parseFloat(f),parseFloat(d),parseFloat(a),parseFloat(k))),
        b = wd(b),
        h.pixelWidth = c.width - b.left - a.left - a.right - b.right,
        h.pixelHeight = c.height - b.top - a.top - a.bottom - b.bottom) : (h.pixelWidth = c.width,
        h.pixelHeight = c.height)));
        return e
    }
      , bg = function(a, b) {
        return (b & 8 && rd(a) ? b ^ 4 : b) & -9
    };
    var eg = function(a, b) {
        this.Uf = a instanceof F ? a : new F(a,b)
    };
    t(eg, ag);
    eg.prototype.L = function(a, b, c, d) {
        cg(this.Uf, a, b, c, null, null, d)
    }
    ;
    var fg, gg = {
        jh: "activedescendant",
        oh: "atomic",
        ph: "autocomplete",
        rh: "busy",
        uh: "checked",
        zh: "controls",
        Bh: "describedby",
        Eh: "disabled",
        Gh: "dropeffect",
        Hh: "expanded",
        Ih: "flowto",
        Kh: "grabbed",
        Oh: "haspopup",
        Qh: "hidden",
        Sh: "invalid",
        Th: "label",
        Uh: "labelledby",
        Vh: "level",
        $h: "live",
        ji: "multiline",
        ki: "multiselectable",
        oi: "orientation",
        pi: "owns",
        ri: "posinset",
        ti: "pressed",
        xi: "readonly",
        zi: "relevant",
        Ai: "required",
        Gi: "selected",
        Ii: "setsize",
        Ki: "sort",
        Yi: "valuemax",
        Zi: "valuemin",
        $i: "valuenow",
        aj: "valuetext"
    };
    var hg = {
        kh: "alert",
        lh: "alertdialog",
        mh: "application",
        nh: "article",
        qh: "banner",
        sh: "button",
        th: "checkbox",
        vh: "columnheader",
        wh: "combobox",
        xh: "complementary",
        yh: "contentinfo",
        Ah: "definition",
        Ch: "dialog",
        Dh: "directory",
        Fh: "document",
        Jh: "form",
        Lh: "grid",
        Mh: "gridcell",
        Nh: "group",
        Ph: "heading",
        Rh: "img",
        Wh: "link",
        Xh: "list",
        Yh: "listbox",
        Zh: "listitem",
        ai: "log",
        bi: "main",
        ci: "marquee",
        di: "math",
        ei: "menu",
        fi: "menubar",
        gi: "menuitem",
        hi: "menuitemcheckbox",
        ii: "menuitemradio",
        li: "navigation",
        mi: "note",
        ni: "option",
        si: "presentation",
        ui: "progressbar",
        vi: "radio",
        wi: "radiogroup",
        yi: "region",
        Bi: "row",
        Ci: "rowgroup",
        Di: "rowheader",
        Ei: "scrollbar",
        Fi: "search",
        Hi: "separator",
        Ji: "slider",
        Li: "spinbutton",
        Mi: "status",
        Ni: "tab",
        Oi: "tablist",
        Pi: "tabpanel",
        Qi: "textbox",
        Ri: "textinfo",
        Si: "timer",
        Ti: "toolbar",
        Ui: "tooltip",
        Vi: "tree",
        Wi: "treegrid",
        Xi: "treeitem"
    };
    zb("A AREA BUTTON HEAD INPUT LINK MENU META OPTGROUP OPTION PROGRESS STYLE SELECT SOURCE TEXTAREA TITLE TRACK".split(" "));
    var ig = function(a, b) {
        b ? (u(wb(hg, b), "No such ARIA role " + b),
        a.setAttribute("role", b)) : a.removeAttribute("role")
    }
      , X = function(a, b, c) {
        ra(c) && (c = c.join(" "));
        var d = jg(b);
        "" === c || void 0 == c ? (fg || (fg = {
            atomic: !1,
            autocomplete: "none",
            dropeffect: "none",
            haspopup: !1,
            live: "off",
            multiline: !1,
            multiselectable: !1,
            orientation: "vertical",
            readonly: !1,
            relevant: "additions text",
            required: !1,
            sort: "none",
            busy: !1,
            disabled: !1,
            hidden: !1,
            invalid: "false"
        }),
        c = fg,
        b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
    }
      , lg = function(a, b) {
        var c = kg(a, b);
        /^[\s\xa0]*$/.test(null == c ? "" : String(c)) || "true" == c || "false" == c ? X(a, b, "true" == c ? "false" : "true") : a.removeAttribute(jg(b))
    }
      , kg = function(a, b) {
        var c = a.getAttribute(jg(b));
        return null == c || void 0 == c ? "" : String(c)
    }
      , jg = function(a) {
        u(a, "ARIA attribute cannot be empty.");
        u(wb(gg, a), "No such ARIA attribute " + a);
        return "aria-" + a
    };
    var mg = "StopIteration"in n ? n.StopIteration : {
        message: "StopIteration",
        stack: ""
    }
      , ng = function() {};
    ng.prototype.next = function() {
        throw mg;
    }
    ;
    ng.prototype.Cf = function() {
        return this
    }
    ;
    var og = function(a, b) {
        this.pa = {};
        this.s = [];
        this.Qc = this.Eb = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else
            a && this.addAll(a)
    };
    og.prototype.jb = function() {
        pg(this);
        for (var a = [], b = 0; b < this.s.length; b++)
            a.push(this.pa[this.s[b]]);
        return a
    }
    ;
    og.prototype.hb = function() {
        pg(this);
        return this.s.concat()
    }
    ;
    og.prototype.remove = function(a) {
        return Object.prototype.hasOwnProperty.call(this.pa, a) ? (delete this.pa[a],
        this.Eb--,
        this.Qc++,
        this.s.length > 2 * this.Eb && pg(this),
        !0) : !1
    }
    ;
    var pg = function(a) {
        var b, c;
        if (a.Eb != a.s.length) {
            for (b = c = 0; c < a.s.length; ) {
                var d = a.s[c];
                Object.prototype.hasOwnProperty.call(a.pa, d) && (a.s[b++] = d);
                c++
            }
            a.s.length = b
        }
        if (a.Eb != a.s.length) {
            var e = {};
            for (b = c = 0; c < a.s.length; )
                d = a.s[c],
                Object.prototype.hasOwnProperty.call(e, d) || (a.s[b++] = d,
                e[d] = 1),
                c++;
            a.s.length = b
        }
    };
    g = og.prototype;
    g.get = function(a, b) {
        return Object.prototype.hasOwnProperty.call(this.pa, a) ? this.pa[a] : b
    }
    ;
    g.set = function(a, b) {
        Object.prototype.hasOwnProperty.call(this.pa, a) || (this.Eb++,
        this.s.push(a),
        this.Qc++);
        this.pa[a] = b
    }
    ;
    g.addAll = function(a) {
        if (a instanceof og) {
            var b = a.hb();
            a = a.jb()
        } else
            b = ub(a),
            a = tb(a);
        for (var c = 0; c < b.length; c++)
            this.set(b[c], a[c])
    }
    ;
    g.forEach = function(a, b) {
        for (var c = this.hb(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    g.clone = function() {
        return new og(this)
    }
    ;
    g.Cf = function(a) {
        pg(this);
        var b = 0
          , c = this.Qc
          , d = this
          , e = new ng;
        e.next = function() {
            if (c != d.Qc)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.s.length)
                throw mg;
            var e = d.s[b++];
            return a ? e : d.pa[e]
        }
        ;
        return e
    }
    ;
    var qg = function(a) {
        var b = {
            target: "_blank",
            height: 430,
            width: 640
        }
          , c = window;
        var d = a instanceof oc ? a : sc("undefined" != typeof a.href ? a.href : String(a));
        a = b.target || a.target;
        var e = [];
        for (f in b)
            switch (f) {
            case "width":
            case "height":
            case "top":
            case "left":
                e.push(f + "=" + b[f]);
                break;
            case "target":
            case "noreferrer":
                break;
            default:
                e.push(f + "=" + (b[f] ? 1 : 0))
            }
        var f = e.join(",");
        if (Kb() && c.navigator && c.navigator.standalone && a && "_self" != a) {
            e = (e = (f = c.document.createElement("A")) && f.ownerDocument) && (e.defaultView || e.parentWindow) || window;
            if ("undefined" != typeof e.HTMLAnchorElement && "undefined" != typeof e.Location && "undefined" != typeof e.Element) {
                var e = f && (f instanceof e.HTMLAnchorElement || !(f instanceof e.Location || f instanceof e.Element));
                var h = va(f) ? f.constructor.displayName || f.constructor.name || Object.prototype.toString.call(f) : void 0 === f ? "undefined" : null === f ? "null" : typeof f;
                u(e, "Argument is not a HTMLAnchorElement (or a non-Element mock); got: %s", h)
            }
            d = d instanceof oc ? d : sc(d);
            f.href = pc(d);
            f.setAttribute("target", a);
            b.noreferrer && f.setAttribute("rel", "noreferrer");
            b = document.createEvent("MouseEvent");
            b.initMouseEvent("click", !0, !0, c, 1);
            f.dispatchEvent(b)
        } else
            b.noreferrer ? (c = c.open("", a, f),
            d = pc(d),
            c && (Rb && -1 != d.indexOf(";") && (d = "'" + d.replace(/'/g, "%27") + "'"),
            c.opener = null,
            b = ic("b/12014412, meta tag with sanitized URL"),
            d = '<META HTTP-EQUIV="refresh" content="0; url=' + Ra(d) + '">',
            $a(hc(b), "must provide justification"),
            u(!/^[\s\xa0]*$/.test(hc(b)), "must provide non-empty justification"),
            b = wc(d, null),
            c.document.write(vc(b)),
            c.document.close())) : c.open(pc(d), a, f)
    };
    var rg = function(a, b) {
        if ("FORM" == a.tagName)
            for (var c = a.elements, d = 0; a = c[d]; d++)
                rg(a, b);
        else
            1 == b && a.blur(),
            a.disabled = b
    };
    var sg = function(a, b) {
        this.zc = b || "";
        this.Bb = a || ""
    }
      , tg = /\"/g
      , ug = /\\/g
      , vg = /^[+a-zA-Z0-9_.!#$%&'*\/=?^`{|}~-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,63}$/;
    sg.prototype.getName = function() {
        return this.zc
    }
    ;
    sg.prototype.toString = function() {
        var a = this.getName(), a = a.replace(tg, ""), b;
        a: {
            for (b = 0; 13 > b; b++)
                if (-1 != a.indexOf('()<>@:\\".[],;'[b])) {
                    b = !0;
                    break a
                }
            b = !1
        }
        b && (a = '"' + a.replace(ug, "\\\\") + '"');
        return "" == a ? this.Bb : "" == this.Bb ? a : a + " <" + this.Bb + ">"
    }
    ;
    var xg = function(a, b) {
        U.call(this);
        this.P = new ze(this);
        var c = a || null;
        wg(this);
        this.c = c;
        b && (this.Ab = b)
    };
    t(xg, U);
    g = xg.prototype;
    g.c = null;
    g.ce = !0;
    g.ae = null;
    g.be = null;
    g.pb = !1;
    g.Tg = !1;
    g.yd = -1;
    g.we = !1;
    g.Xf = !0;
    g.Ab = "toggle_display";
    g.g = function() {
        return this.c
    }
    ;
    var yg = function(a) {
        wg(a);
        a.ce = !0
    }
      , zg = function(a) {
        wg(a);
        a.we = !0
    };
    xg.prototype.df = function(a, b) {
        this.yb = a;
        this.mb = b
    }
    ;
    xg.prototype.za = function() {
        return this.P
    }
    ;
    var wg = function(a) {
        if (a.pb)
            throw Error("Can not change this state of the popup while showing.");
    };
    g = xg.prototype;
    g.G = function() {
        return this.pb
    }
    ;
    g.C = function(a) {
        this.yb && this.yb.stop();
        this.mb && this.mb.stop();
        a ? this.Ld() : this.nb()
    }
    ;
    g.L = pa;
    g.Ld = function() {
        if (!this.pb && this.dispatchEvent("beforeshow")) {
            if (!this.c)
                throw Error("Caller must call setElement before trying to show the popup");
            this.L();
            var a = G(this.c);
            this.we && this.P.w(a, "keydown", this.vg, !0);
            if (this.ce)
                if (this.P.w(a, "mousedown", this.Pe, !0),
                z) {
                    try {
                        var b = a.activeElement
                    } catch (d) {}
                    for (; b && "IFRAME" == b.nodeName; ) {
                        try {
                            var c = b.contentDocument || b.contentWindow.document
                        } catch (d) {
                            break
                        }
                        a = c;
                        b = a.activeElement
                    }
                    this.P.w(a, "mousedown", this.Pe, !0);
                    this.P.w(a, "deactivate", this.Oe)
                } else
                    this.P.w(a, "blur", this.Oe);
            "toggle_display" == this.Ab ? (this.c.style.visibility = "visible",
            L(this.c, !0)) : "move_offscreen" == this.Ab && this.L();
            this.pb = !0;
            this.yd = Ca();
            this.yb ? (qe(this.yb, "end", this.Qa, !1, this),
            this.yb.play()) : this.Qa()
        }
    }
    ;
    g.nb = function(a) {
        if (!this.pb || !this.dispatchEvent({
            type: "beforehide",
            target: a
        }))
            return !1;
        this.P && this.P.ba();
        this.pb = !1;
        Ca();
        this.mb ? (qe(this.mb, "end", Ba(this.je, a), !1, this),
        this.mb.play()) : this.je(a);
        return !0
    }
    ;
    g.je = function(a) {
        "toggle_display" == this.Ab ? this.Tg ? kf(this.xe, 0, this) : this.xe() : "move_offscreen" == this.Ab && (this.c.style.top = "-10000px");
        this.rb(a)
    }
    ;
    g.xe = function() {
        this.c.style.visibility = "hidden";
        L(this.c, !1)
    }
    ;
    g.Qa = function() {
        this.dispatchEvent("show")
    }
    ;
    g.rb = function(a) {
        this.dispatchEvent({
            type: "hide",
            target: a
        })
    }
    ;
    g.Pe = function(a) {
        a = a.target;
        Vc(this.c, a) || Ag(this, a) || this.be && !Vc(this.be, a) || 150 > Ca() - this.yd || this.nb(a)
    }
    ;
    g.vg = function(a) {
        27 == a.keyCode && this.nb(a.target) && (a.preventDefault(),
        a.stopPropagation())
    }
    ;
    g.Oe = function(a) {
        if (this.Xf) {
            var b = G(this.c);
            if ("undefined" != typeof document.activeElement) {
                if (a = b.activeElement,
                !a || Vc(this.c, a) || "BODY" == a.tagName)
                    return
            } else if (a.target != b)
                return;
            150 > Ca() - this.yd || this.nb()
        }
    }
    ;
    var Ag = function(a, b) {
        return fb(a.ae || [], function(a) {
            return b === a || Vc(a, b)
        })
    };
    xg.prototype.u = function() {
        xg.m.u.call(this);
        this.P.la();
        Vd(this.yb);
        Vd(this.mb);
        delete this.c;
        delete this.P;
        delete this.ae
    }
    ;
    var Bg = function(a, b) {
        this.Dd = 8;
        this.Ed = b || void 0;
        xg.call(this, a)
    };
    t(Bg, xg);
    Bg.prototype.setPosition = function(a) {
        this.Ed = a || void 0;
        this.G() && this.L()
    }
    ;
    Bg.prototype.L = function() {
        if (this.Ed) {
            var a = !this.G() && "move_offscreen" != this.Ab
              , b = this.g();
            a && (b.style.visibility = "hidden",
            L(b, !0));
            this.Ed.L(b, this.Dd, this.fj);
            a && L(b, !1)
        }
    }
    ;
    var Dg = function(a) {
        this.a = O("blogger.templates.responsive.Subscribe");
        W(this.a, "Initializing Subscribe.");
        try {
            if (this.Qf = a,
            this.j = document.body && Hf(document.body, null, "subscribe-dim-overlay"),
            this.o = document.querySelector(".centered-top-container"))
                if (this.J = this.o.querySelector(".subscribe-popup"))
                    if (this.l = new Bg(this.J),
                    this.Qd = this.o.querySelector(".subscribe-popup-container"))
                        if (this.Tb = this.o.querySelector(".subscribe-button"))
                            if (this.oa = this.J.querySelector(".follow-by-email-address")) {
                                if (this.gb = this.J.querySelector(".follow-by-email-submit"))
                                    R(this.oa, "input", this.uf, !1, this),
                                    Cg(this, !0),
                                    this.uf(),
                                    this.Id(),
                                    W(this.a, "Finished initializing Subscribe.")
                            } else
                                V(this.a, 'There was an error initializing the subscribe section. ".follow-by-email-address" not found.');
                        else
                            V(this.a, 'There was an error initializing the subscribe section. ".subscribe-button" not found.');
                    else
                        V(this.a, 'There was an error initializing the subscribe section. ."subscribe-popup-container" not found.');
                else
                    V(this.a, 'There was an error initializing the subscribe section. ".subscribe-popup" not found.');
            else
                V(this.a, 'There was an error initializing the subscribe section. ".centered-top-container" not found.')
        } catch (b) {
            V(this.a, "Error initializing Subscribe. Uncaught exception.", b),
            this.b()
        }
    };
    Dg.prototype.uf = function() {
        var a = "function" == typeof document.createElement("input").checkValidity, b;
        if (b = "" != this.oa.value)
            (a = a && this.oa.validity.valid) || (a = new sg,
            a.Bb = this.oa.value.trim(),
            a = vg.test(a.Bb)),
            b = a;
        Cg(this, !b)
    }
    ;
    var Cg = function(a, b) {
        a.gb && (rg(a.gb, b),
        X(a.gb, "disabled", b))
    };
    Dg.prototype.Id = function() {
        var a = this;
        zg(this.l);
        yg(this.l);
        R(window, "resize", this.Ve, !1, this);
        R(this.Tb, "click", this.xb, !1, this);
        R(this.l, "hide", this.qc, !1, this);
        R(this.gb, "click", function() {
            !a.gb.disabled && a.qc()
        }, !1, this)
    }
    ;
    Dg.prototype.qc = function() {
        this.oa && this.oa.blur();
        P.add(this.J, "hidden");
        document.body.removeChild(this.J);
        this.Qd.appendChild(this.J);
        this.j.Jb();
        this.Tb.focus()
    }
    ;
    Dg.prototype.Ve = function() {
        this.l && this.l.G() && (Eg(this),
        this.l.L())
    }
    ;
    var Eg = function(a) {
        a.J.style.visibility = "hidden";
        var b = P.contains(a.J, "hidden");
        P.remove(a.J, "hidden");
        var c = a.J.clientWidth
          , d = a.J.clientHeight;
        b && P.add(a.J, "hidden");
        a.J.style.visibility = "visible";
        var c = new Bc(c,d)
          , b = c.width
          , c = c.height
          , d = a.Qf
          , e = document.querySelector(void 0 === d ? ".centered" : d).getBoundingClientRect()
          , d = e.left
          , e = e.width
          , f = window.innerHeight
          , b = ("ltr" == document.documentElement.getAttribute("dir") ? -1 : 1) * b / 2;
        a.l.setPosition(new eg(d + e / 2 + b,0 + f / 2 - c / 2))
    };
    Dg.prototype.xb = function() {
        this.Qd.removeChild(this.J);
        document.body.appendChild(this.J);
        this.l.C(!1);
        P.remove(this.J, "hidden");
        this.l.C(!0);
        Eg(this);
        this.j.show();
        (this.l.g().querySelector("input:not([type=hidden])") || this.l.g()).focus()
    }
    ;
    Dg.prototype.b = function() {
        this.j && (this.j.T(),
        this.j = null);
        re(window, "resize", this.Ve, !1, this);
        this.l && (this.l.la(),
        this.l = null);
        this.oa && T(this.oa, "input");
        this.Tb && T(this.Tb, "click")
    }
    ;
    var Fg = function(a) {
        a = a || new Ea;
        this.he = new Bf(a.Tf);
        this.qf = new Dg;
        this.af = new $f
    };
    Fg.prototype.b = function() {
        this.he.b();
        this.qf.b();
        this.af.b();
        this.af = this.qf = this.he = null
    }
    ;
    var Gg = function() {
        this.Ef = new Ea
    };
    var Hg = function() {};
    Hg.prototype.$ = function() {
        throw Error('Component "init" method must be implemented.');
    }
    ;
    Hg.prototype.b = function() {
        throw Error('Component "teardown" method must be implemented.');
    }
    ;
    var Ig = function(a, b, c, d) {
        d = void 0 === d ? [] : d;
        this.Cb = a;
        this.eb = b;
        this.eh = c;
        this.Za = d
    };
    var Jg = function(a) {
        this.a = O("blogger.templates.responsive.OverflowDetector");
        W(this.a, "Initializing overflow detector.");
        try {
            this.i = a;
            this.i.Za.push("load");
            this.i.Za.push("resize");
            for (var b = l(this.i.Za), c = b.next(); !c.done; c = b.next())
                R(window, c.value, this.Ic, !1, this);
            this.Ic();
            W(this.a, "Finished initializing overflow detector.")
        } catch (d) {
            V(this.a, "Error initializing overflow detector. Uncaught exception.", d),
            this.b()
        }
    }
      , Kg = function(a, b) {
        var c = I(a.i.eb, b);
        return c ? c.offsetHeight > b.offsetHeight : !1
    };
    Jg.prototype.Ic = function() {
        for (var a = l(Array.prototype.slice.call(document.querySelectorAll("." + this.i.Cb), 0)), b = a.next(); !b.done; b = a.next()) {
            var b = b.value
              , c = I(this.i.eb, b);
            c && this.i.eh(b, c.offsetHeight > b.offsetHeight)
        }
    }
    ;
    Jg.prototype.b = function() {
        re(window, "resize", this.Ic);
        re(window, "load", this.Ic)
    }
    ;
    var Lg = function() {
        this.Cb = "overflowable-container";
        this.eb = "overflowable-contents";
        this.uc = "overflowable-item";
        this.de = "overflow-button";
        this.Vf = "overflow-count";
        this.Hg = 50;
        this.Za = []
    };
    var Mg = function(a, b, c) {
        this.element = a;
        this.hd = b;
        this.Dg = c
    };
    t(Mg, ag);
    Mg.prototype.L = function(a, b, c) {
        dg(this.element, this.hd, a, b, void 0, c, this.Dg)
    }
    ;
    var Ng = function(a, b, c, d) {
        Mg.call(this, a, b);
        this.kg = c ? 5 : 0;
        this.Bd = d || void 0
    };
    t(Ng, Mg);
    Ng.prototype.L = function(a, b, c, d) {
        var e = dg(this.element, this.hd, a, b, null, c, 10, d, this.Bd);
        if (e & 496) {
            var f = Og(e, this.hd);
            b = Og(e, b);
            e = dg(this.element, f, a, b, null, c, 10, d, this.Bd);
            e & 496 && (f = Og(e, f),
            b = Og(e, b),
            dg(this.element, f, a, b, null, c, this.kg, d, this.Bd))
        }
    }
    ;
    var Og = function(a, b) {
        a & 48 && (b ^= 4);
        a & 192 && (b ^= 1);
        return b
    };
    var Pg = function(a, b) {
        this.a = O("blogger.templates.responsive.Overflowable");
        this.i = b || new Lg;
        this.ka = a;
        this.j = this.Zb = this.Hc = this.l = this.aa = this.Ka = this.va = this.bd = this.Fa = null;
        this.Pf = this.i.de + "-container";
        this.ia = null
    };
    aa(Pg, Hg);
    Pg.prototype.$ = function() {
        var a = this;
        W(this.a, "Initializing overflowable.");
        try {
            this.Fa = I(this.i.eb, this.ka);
            if (!this.Fa)
                return V(this.a, "There was an error initializing an overflowable. content element not found."),
                Xe();
            this.va = I(this.i.de, this.ka);
            this.bd = Qg(this);
            Tc(this.bd, this.Fa);
            this.aa = document.createElement("DIV");
            P.add(this.aa, "overflow-popup");
            L(this.aa, !1);
            Tc(this.aa, this.ka);
            this.Hc = R(window, "resize", this.zg);
            this.Id();
            Rg(this);
            var b = "overflowable-" + ya(this);
            P.add(this.ka, b);
            this.ia = new Jg(new Ig(b,"overflowable-backup-content",ye(function(b, d) {
                return a.Bc(b, d)
            }, this.i.Hg, this),this.i.Za));
            this.Bc(this.ka, Kg(this.ia, this.ka));
            W(this.a, "Finished initializing overflowable.");
            return We()
        } catch (c) {
            return V(this.a, "Error initializing overflowable. Uncaught exception.", c),
            Xe(c)
        }
    }
    ;
    var Qg = function(a) {
        var b = document.createElement("DIV");
        P.add(b, "overflowable-backup");
        X(b, "hidden", !0);
        b.style.position = "absolute";
        b.style.visibility = "hidden";
        b.style.bottom = "0";
        b.style.left = "0";
        b.style.right = "0";
        b.style.top = "0";
        a = a.Fa.cloneNode(!0);
        P.add(a, "overflowable-backup-content");
        b.appendChild(a);
        return b
    };
    Pg.prototype.Id = function() {
        var a = this;
        this.va && this.aa && (this.aa.innerHTML = this.Fa.innerHTML,
        this.l = new Bg(this.aa),
        zg(this.l),
        yg(this.l),
        this.Zb = R(this.va, "click", function(b) {
            a.xb();
            b.preventDefault()
        }),
        R(this.l, "hide", this.xg, !1, this))
    }
    ;
    var Rg = function(a) {
        var b = Ec(a.i.uc, a.Fa);
        if (a.va && 0 < b.length) {
            var b = b[b.length - 1]
              , c = document.createElement(String(b.tagName));
            P.add(c, a.Pf);
            L(c, !1);
            P.remove(a.va, "hidden");
            c.appendChild(a.va);
            Sc(c, b);
            a.Ka = c
        }
    };
    g = Pg.prototype;
    g.Bc = function(a, b) {
        var c = this;
        if (this.ia) {
            var d = Ec(this.i.uc, this.Fa);
            this.Ka && (L(this.Ka, b),
            X(this.Ka, "hidden", !b));
            var e = 0;
            if (b) {
                var f = Ec(this.i.uc, this.bd)
                  , h = Ec(this.i.uc, this.aa)
                  , k = function(b) {
                    return b.offsetTop >= a.offsetHeight
                }
                  , e = gb(f, k)
                  , k = hb(f, k)
                  , f = jb(nb(f, 0, k + 1), function(a) {
                    Sc(c.Ka, a);
                    return 0 == c.Ka.offsetTop
                });
                Sc(this.Ka, d[f]);
                for (k = 0; k < d.length; k++) {
                    var m = k >= f;
                    k < h.length && (L(h[k], m),
                    X(h[k], "hidden", !m));
                    L(d[k], !m);
                    X(d[k], "hidden", m)
                }
            } else
                v(d, function(a) {
                    L(a, !0);
                    X(a, "hidden", !1)
                });
            if (d = I(this.i.Vf, a))
                d.innerText = e.toString()
        }
    }
    ;
    g.xb = function() {
        this.l.C(!1);
        var a = this.l;
        a.Dd = 4;
        a.G() && a.L();
        this.va && this.l.setPosition(new Ng(this.va,4));
        this.l.C(!0);
        this.j = Hf(this.ka, null, "overflowable-dim-overlay");
        this.j.show()
    }
    ;
    g.zg = function() {
        this.l && this.l.G() && this.l.L()
    }
    ;
    g.xg = function() {
        this.aa && this.aa.style.left && (this.aa.style.left = "0");
        this.j && (this.j.T(),
        this.j = null)
    }
    ;
    g.b = function() {
        this.j && (this.j.T(),
        this.j = null);
        Vd(this.l);
        this.l = null;
        this.Hc && (S(this.Hc),
        this.Hc = null);
        this.Zb && (S(this.Zb),
        this.Zb = null);
        this.ia && (this.ia.b(),
        this.ia = null);
        return We()
    }
    ;
    var Sg = function(a) {
        return eb(Ec(a.Cb), function(b) {
            return new Pg(b,a)
        })
    };
    var Tg = function(a) {
        a = void 0 === a ? "ripple" : a;
        this.a = O("blogger.templates.responsive.Ripples");
        W(this.a, "Initializing ripple effects.");
        this.dc = a;
        try {
            this.bind(),
            W(this.a, "Finished initializing ripple effects.")
        } catch (b) {
            V(this.a, "Error initializing section. Uncaught exception.", b)
        }
    };
    Tg.prototype.bind = function() {
        W(this.a, "Binding ripple effects for ." + this.dc);
        for (var a = document.querySelectorAll("." + this.dc), b = 0; b < a.length; b++)
            R(a[b], "mousedown", this.Ng.bind(this))
    }
    ;
    Tg.prototype.Ng = function(a) {
        a = a || window.event;
        var b = a.currentTarget || a.srcElement;
        if (b = P.contains(b, this.dc) ? b : Xc(b, this.dc)) {
            var c = I("splash", b);
            if (!c) {
                c = document.createElement("span");
                P.add(c, "splash");
                var d = document.createElement("div");
                P.add(d, "splash-wrapper");
                d.appendChild(c);
                b.insertBefore(d, b.firstChild);
                Bd && R(c, Bd, function() {
                    return P.remove(c, "animate")
                }, !1, this)
            }
            P.remove(c, "animate");
            d = b.getBoundingClientRect();
            b = Math.max(d.width, d.height);
            if (0 === a.clientX && 0 === a.clientY)
                a = Math.round(d.width / 2),
                d = Math.round(d.height / 2);
            else {
                var e = a.clientY ? a.clientY : a.touches[0].clientY;
                a = Math.round((a.clientX ? a.clientX : a.touches[0].clientX) - d.left);
                d = Math.round(e - d.top)
            }
            Gc(c, {
                style: "height: " + b + "px; width: " + b + "px; left: " + (a - b / 2) + "px; top: " + (d - b / 2) + "px;"
            });
            P.add(c, "animate")
        }
    }
    ;
    var Ug = function(a) {
        if ("undefined" !== typeof _WidgetManager && _WidgetManager) {
            var b = _WidgetManager._GetAllData();
            if (b && b.messages && b.messages[a])
                return b.messages[a]
        }
        return null
    };
    var Vg = function() {
        this.ne = !0;
        this.ye = this.lf = null;
        this.ff = "sharing-platform-button";
        this.Nf = !0
    };
    var Wg = function(a) {
        this.a = O("blogger.templates.responsive.Collapsible");
        this.ka = a;
        this.Ud = this.Rd = this.Gb = this.Ea = this.v = null
    };
    aa(Wg, Hg);
    Wg.prototype.$ = function() {
        W(this.a, "Initializing collapsible.");
        try {
            var a = (this.ka || void 0 || document).getElementsByTagName("DETAILS");
            if (1 != a.length)
                return V(this.a, "Collapsible did not contain exactly one details element."),
                We();
            this.v = a[0];
            var b = (this.v || document).getElementsByTagName("SUMMARY");
            if (1 != b.length)
                return V(this.a, "Collapsible did not contain exactly one summary element."),
                We();
            this.Ea = b[0];
            this.Gb = "b-details-" + ya(this.v);
            Cd() || (this.v.id = this.Gb,
            ig(this.Ea, "button"),
            X(this.Ea, "controls", this.Gb),
            X(this.v, "expanded", !1),
            X(this.Ea, "expanded", !1),
            mb(document.querySelectorAll("#" + this.Gb + " > :not(summary)")).forEach(function(a) {
                return X(a, "hidden", !0)
            }));
            this.Rd = R(this.Ea, "click", this.Oc, !1, this)
        } catch (c) {
            return V(this.a, "Error initializing collapsible. Uncaught exception.", c),
            this.b().then(function() {
                return Xe()
            })
        }
        W(this.a, "Finished initializing collapsible.");
        return We()
    }
    ;
    Wg.prototype.Oc = function(a) {
        var b = this;
        a.preventDefault();
        var c = J(this.Ea, "height");
        if (this.v.hasAttribute("open"))
            M ? (T(this.v, M),
            K(this.v, J(this.v, "height")),
            this.v.removeAttribute("open"),
            setTimeout(function() {
                K(b.v, c)
            }, 0)) : this.v.removeAttribute("open");
        else if (K(this.v, "auto"),
        this.v.setAttribute("open", "open"),
        M) {
            var d = J(this.v, "height");
            K(this.v, c);
            setTimeout(function() {
                K(b.v, d);
                b.Ud = R(b.v, M, function() {
                    K(b.v, "auto");
                    T(b.v, M)
                })
            }, 0)
        }
        Cd() || (this.v && lg(this.v, "expanded"),
        this.Ea && lg(this.Ea, "expanded"),
        mb(document.querySelectorAll("#" + this.Gb + " > :not(summary)")).forEach(function(a) {
            return lg(a, "hidden")
        }))
    }
    ;
    Wg.prototype.b = function() {
        this.Rd && S(this.Rd);
        this.Ud && S(this.Ud);
        return We()
    }
    ;
    var Xg = function(a) {
        a = document.querySelectorAll(a);
        for (var b = [], c = 0; a && c < a.length; c++)
            b.push(new Wg(a[c]));
        return b
    };
    var Yg = function(a, b, c) {
        this.a = O("blogger.templates.responsive.Extendable");
        W(this.a, "Initializing extendable.");
        try {
            this.F = a,
            this.Kc = b,
            this.wb = c ? c : null,
            R(b, "click", this.Oc, !1, this),
            c && R(c, "click", this.Oc, !1, this)
        } catch (d) {
            V(this.a, "Error initializing extendable. Uncaught exception.", d),
            this.b()
        }
        W(this.a, "Finished initializing extendable.")
    };
    Yg.prototype.Oc = function() {
        var a = this;
        if (P.contains(this.F, "expanded"))
            M && (T(this.F, M),
            K(this.F, J(this.F, "height")),
            setTimeout(function() {
                K(a.F, 0)
            }, 0)),
            P.remove(this.F, "expanded"),
            P.remove(this.Kc, "hidden"),
            this.wb && P.add(this.wb, "hidden");
        else {
            K(this.F, "auto");
            if (M) {
                var b = J(this.F, "height");
                K(this.F, 0);
                setTimeout(function() {
                    K(a.F, b);
                    R(a.F, M, function() {
                        K(a.F, "auto");
                        T(a.F, M)
                    })
                }, 0)
            }
            P.add(this.F, "expanded");
            P.add(this.Kc, "hidden");
            this.wb && P.remove(this.wb, "hidden")
        }
    }
    ;
    Yg.prototype.b = function() {
        this.Kc && T(this.Kc, "click");
        this.wb && T(this.wb, "click");
        this.F && (T(this.F, M),
        T(this.F, "click"))
    }
    ;
    var Zg = function(a) {
        a = document.querySelectorAll(".widget." + a);
        for (var b = [], c = 0; a && c < a.length; c++) {
            var d = a[c]
              , e = I("show-more", d)
              , f = I("show-less", d)
              , d = I("remaining-items", d);
            e && d && b.push(new Yg(d,e,f))
        }
        return b
    };
    var $g = function() {
        this.a = O("blogger.templates.responsive.Archive");
        this.ya = this.S = null;
        W(this.a, "Initializing archive.")
    };
    aa($g, Hg);
    $g.prototype.$ = function() {
        var a = this;
        this.S = Xg(".widget.BlogArchive");
        return bf($e(this.S.map(function(a) {
            return a.$()
        })).then(function() {
            a.ya = Zg("BlogArchive");
            W(a.a, "Finished initializing archive.");
            return We()
        }), function(b) {
            V(a.a, "Error initializing archive. Uncaught exception.", b instanceof Error ? b : null);
            return a.b().then(function() {
                return Xe()
            })
        })
    }
    ;
    $g.prototype.b = function() {
        var a = this;
        return (this.S && $e(this.S.map(function(a) {
            return a.b()
        })) || We()).then(function() {
            a.ya && a.ya.forEach(function(a) {
                return a.b()
            });
            a.S = null;
            a.ya = null
        })
    }
    ;
    var ah = function() {
        this.a = O("blogger.templates.responsive.AsyncCss");
        "loading" != document.readyState ? this.vd() : R(window, "load", this.vd)
    };
    ah.prototype.vd = function() {
        this.a && W(this.a, "Initializing async CSS.");
        for (var a = l(Array.prototype.slice.call(document.getElementsByTagName("link"), 0)), b = a.next(); !b.done; b = a.next())
            b = b.value,
            "true" == b.getAttribute("data-async-css") && "none" == b.getAttribute("media") && b.setAttribute("media", "all");
        this.a && W(this.a, "Finished initializing async CSS.")
    }
    ;
    ah.prototype.b = function() {
        re(n.window, "load", this.vd)
    }
    ;
    var bh = function(a, b) {
        this.a = O("blogger.templates.responsive.AvatarReplacer");
        W(this.a, "Initializing avatar replacer.");
        this.ld = H();
        var c;
        if (!(c = a)) {
            c = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            P.add(c, "svg-icon-24");
            P.add(c, "avatar-icon");
            var d = document.createElementNS("http://www.w3.org/2000/svg", "use");
            d.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "/responsive/sprite_v1_6.css.svg#ic_person_black_24dp");
            c.appendChild(d)
        }
        this.Jg = c;
        this.fh = b || /(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/blank\.gif/;
        W(this.a, "Finished initializing avatar replacer.")
    };
    bh.prototype.replace = function() {
        for (var a = document.querySelectorAll("#comments .comment .avatar-image-container"), b = 0; a && b < a.length; b++) {
            var c = Dc(this.ld.f, "img", null, a[b]);
            for (var d = 0; c && d < c.length; d++)
                if (c[d].src && this.fh.test(c[d].src)) {
                    this.ld.removeNode(c[d]);
                    var e = this.Jg.cloneNode(!0);
                    this.ld.appendChild(a[b], e)
                }
        }
    }
    ;
    var ch = function(a) {
        var b = void 0 === b ? 1E3 : b;
        var c = void 0 === c ? null : c;
        var d = 0
          , e = function() {
            d++ < b ? a() || setTimeout(e, 10) : c && c()
        };
        e()
    };
    function dh(a, b, c) {
        return function() {
            if ("undefined" === typeof _WidgetManager || !_WidgetManager)
                return !1;
            var d;
            a: {
                if ("undefined" !== typeof _WidgetManager && _WidgetManager && (d = _WidgetManager._GetAllData()) && d.features && d.features[a]) {
                    d = d.features[a];
                    break a
                }
                d = !1
            }
            d && b ? b() : !d && c && c();
            return !0
        }
    }
    var eh = function(a) {
        return new Promise(function(b, c) {
            var d = !1;
            ch(dh(a, function() {
                d = !0;
                b(!0)
            }, function() {
                d = !0;
                b(!1)
            }));
            d || c()
        }
        )
    };
    var fh = function() {
        this.a = O("blogger.templates.responsive.BrowserSupport");
        this.Bf = "uc_browser < 11.1.0.870;opera < 15;opera_mobile < 15;opera_mini;chrome < 51;firefox < 50;ie < 11;safari < 9.1;ios_safari < 9.3;android_browser < 4.3;blackberry_browser;uc_browser_mini".split(";")
    };
    fh.prototype.$ = function() {
        var a = this;
        W(this.a, "Initializing browser support.");
        var b = function(a) {
            return -1 != gh().indexOf(a)
        };
        this.Vc = {
            chrome: {
                X: function() {
                    return Db() && !b("OPR/")
                },
                version: Ib
            },
            firefox: {
                X: Cb,
                version: Ib
            },
            ie: {
                X: Bb,
                version: Ib
            },
            safari: {
                X: Eb,
                version: Ib
            },
            ios_safari: {
                X: Fb,
                version: Ib
            },
            android_browser: {
                X: Gb,
                version: Ib
            },
            uc_browser: {
                X: function() {
                    return b("UCBrowser") && !b("UCWEB/2.0")
                },
                version: function() {
                    return hh()
                }
            },
            opera: {
                X: Ab,
                version: Ib
            },
            opera_mobile: {
                X: function() {
                    return Ab() && b("Opera Mobi")
                },
                version: Ib
            },
            opera_mini: {
                X: function() {
                    return Ab() && b("Opera Mini")
                },
                version: Ib
            },
            blackberry_browser: {
                X: function() {
                    return b("BlackBerry")
                },
                version: Ib
            },
            uc_browser_mini: {
                X: function() {
                    return b("UCBrowser") && b("UCWEB/2.0")
                },
                version: function() {
                    return hh()
                }
            }
        };
        return eh("unsupported_browser_message").then(function(b) {
            if (b) {
                a: {
                    b = l(a.Bf.join(",").split(","));
                    for (var c = b.next(); !c.done; c = b.next()) {
                        c = c.value.split(" ");
                        (0 == c.length || 3 < c.length) && mf(a.a, "Initializing browser support.");
                        var e = c[0];
                        if (a.Vc[e] && a.Vc[e].X())
                            var e = ih(a.Vc[e].version())
                              , f = c[1]
                              , c = ih(c[2])
                              , c = {
                                Je: !0,
                                vf: "<" == f && e < c || "<=" == f && e <= c
                            };
                        else
                            c = {
                                Je: !1,
                                vf: !1
                            };
                        if (c.Je) {
                            if (c.vf) {
                                b = !1;
                                break a
                            }
                            break
                        }
                    }
                    b = !0
                }
                b || mf(a.a, "UNSUPPORTED BROWSER! INSTALL CHROME IMMEDIATELY FOR THE GREATER GOOD")
            }
        })
    }
    ;
    var gh = function() {
        var a = n.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
      , hh = function() {
        var a = /^.*UCBrowser\/([\d\.]+).*Mobile.*$/.exec(gh());
        return a && 1 < a.length ? a[1] : ""
    }
      , ih = function(a) {
        return a.split(".").map(function(a) {
            4 > a.length && (a = ("000" + a).slice(-4));
            return a
        }).join(".")
    };
    var jh = function(a) {
        this.Ca = a
    };
    jh.prototype.show = function() {
        this.Ca && P.remove(this.Ca, "hidden")
    }
    ;
    jh.prototype.Jb = function() {
        this.Ca && P.add(this.Ca, "hidden")
    }
    ;
    jh.prototype.T = function() {
        this.Ca && (this.Ca.parentNode.removeChild(this.Ca),
        this.Ca = null)
    }
    ;
    var kh = function(a, b, c) {
        c = Oc("DIV", ["loading-spinner-large", "mspin-" + c + "-large", "hidden"], Oc("DIV", "", Oc("DIV")));
        document.body.appendChild(c);
        c.style.left = a - 24 + "px";
        c.style.top = b - 24 + "px";
        return new jh(c)
    };
    var lh = !z && !Eb()
      , mh = function(a) {
        return lh && a.dataset ? "resized"in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase()) : !!a.getAttribute("data-" + "resized".replace(/([A-Z])/g, "-$1").toLowerCase())
    };
    var oh = function() {
        var a = this;
        this.sd = this.rd = this.V = null;
        var b = document.getElementById("comment-editor")
          , c = document.querySelector(".page_body .centered-bottom");
        b && c && window.addEventListener && (mh(b) || this.V || (this.V = nh(),
        this.V.show()),
        this.rd = R(b, "iframeMoved", function() {
            a.V && a.V.T();
            a.V = nh();
            a.V.show();
            for (var c = document.querySelectorAll(".comment-actions"), e = 0; e < c.length; e++)
                P.remove(c[e], "invisible");
            (c = (c = Xc(b, "comment")) && c.querySelector(".comment-actions")) && P.add(c, "invisible")
        }),
        this.sd = R(window, "message", function(b) {
            0 == b.ha.data.indexOf("set-comment-editor-height") && a.V && (a.V.T(),
            a.V = null)
        }))
    }
      , nh = function() {
        var a = document.getElementById("comment-editor")
          , b = document.querySelector(".page_body .centered-bottom");
        if (a && b) {
            var b = a.getBoundingClientRect()
              , a = b.left + window.pageXOffset + b.width / 2
              , b = b.top + window.pageYOffset + b.height / 2
              , c = document.querySelector(".centered-bottom .sharing-button")
              , c = "rgb(255,255,255)" == (c && window.getComputedStyle(c).getPropertyValue("fill")) ? "white" : "grey_54"
              , d = kh(a, b, c);
            setTimeout(function() {
                d && d.T()
            }, 1E4);
            return d
        }
        return null
    };
    oh.prototype.b = function() {
        this.V && (this.V.T(),
        this.V = null);
        this.rd && S(this.rd);
        this.sd && S(this.sd)
    }
    ;
    var ph = function() {
        this.a = O("blogger.templates.responsive.Labels");
        W(this.a, "Initializing labels.");
        try {
            this.S = Xg(".widget.Label"),
            this.S.map(function(a) {
                return a.$()
            }),
            this.ya = Zg("Label"),
            W(this.a, "Finished initializing labels.")
        } catch (a) {
            V(this.a, "Error initializing labels. Uncaught exception.", a),
            this.b()
        }
    };
    ph.prototype.b = function() {
        this.S && this.S.forEach(function(a) {
            return a.b()
        });
        this.ya && this.ya.forEach(function(a) {
            return a.b()
        });
        this.ya = this.S = null
    }
    ;
    var qh = function() {};
    qh.prototype.ee = null;
    var sh = function(a) {
        var b;
        (b = a.ee) || (b = {},
        rh(a) && (b[0] = !0,
        b[1] = !0),
        b = a.ee = b);
        return b
    };
    var th, uh = function() {};
    t(uh, qh);
    var vh = function(a) {
        return (a = rh(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
      , rh = function(a) {
        if (!a.Ce && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.Ce = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.Ce
    };
    th = new uh;
    var wh = function(a) {
        if (a.jb && "function" == typeof a.jb)
            return a.jb();
        if (p(a))
            return a.split("");
        if (sa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        return tb(a)
    }
      , xh = function(a, b) {
        if (a.forEach && "function" == typeof a.forEach)
            a.forEach(b, void 0);
        else if (sa(a) || p(a))
            v(a, b, void 0);
        else {
            if (a.hb && "function" == typeof a.hb)
                var c = a.hb();
            else if (a.jb && "function" == typeof a.jb)
                c = void 0;
            else if (sa(a) || p(a)) {
                c = [];
                for (var d = a.length, e = 0; e < d; e++)
                    c.push(e)
            } else
                c = ub(a);
            for (var d = wh(a), e = d.length, f = 0; f < e; f++)
                b.call(void 0, d[f], c && c[f], a)
        }
    };
    var yh = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    var zh = function(a) {
        U.call(this);
        this.headers = new og;
        this.Uc = a || null;
        this.ta = !1;
        this.Tc = this.h = null;
        this.Lb = this.He = this.Mb = "";
        this.Ja = this.ud = this.sc = this.md = !1;
        this.Vb = 0;
        this.Nc = null;
        this.Ye = "";
        this.Pc = this.Fg = this.wf = !1
    };
    t(zh, U);
    zh.prototype.a = O("goog.net.XhrIo");
    var Ah = /^https?$/i
      , Bh = ["POST", "PUT"]
      , Ch = []
      , Dh = function(a, b) {
        var c = new zh;
        Ch.push(c);
        b && c.w("complete", b);
        c.zd("ready", c.Sf);
        c.send(a, "HEAD", void 0, void 0)
    };
    zh.prototype.Sf = function() {
        this.la();
        lb(Ch, this)
    }
    ;
    zh.prototype.send = function(a, b, c, d) {
        if (this.h)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.Mb + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.Mb = a;
        this.Lb = "";
        this.He = b;
        this.md = !1;
        this.ta = !0;
        this.h = this.Uc ? vh(this.Uc) : vh(th);
        this.Tc = this.Uc ? sh(this.Uc) : sh(th);
        this.h.onreadystatechange = r(this.Re, this);
        this.Fg && "onprogress"in this.h && (this.h.onprogress = r(function(a) {
            this.Qe(a, !0)
        }, this),
        this.h.upload && (this.h.upload.onprogress = r(this.Qe, this)));
        try {
            nf(this.a, Eh(this, "Opening Xhr")),
            this.ud = !0,
            this.h.open(b, String(a), !0),
            this.ud = !1
        } catch (f) {
            nf(this.a, Eh(this, "Error opening Xhr: " + f.message));
            Fh(this, f);
            return
        }
        a = c || "";
        var e = this.headers.clone();
        d && xh(d, function(a, b) {
            e.set(b, a)
        });
        d = ib(e.hb(), Gh);
        c = n.FormData && a instanceof n.FormData;
        !kb(Bh, b) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(a, b) {
            this.h.setRequestHeader(b, a)
        }, this);
        this.Ye && (this.h.responseType = this.Ye);
        "withCredentials"in this.h && this.h.withCredentials !== this.wf && (this.h.withCredentials = this.wf);
        try {
            Hh(this),
            0 < this.Vb && (this.Pc = Ih(this.h),
            nf(this.a, Eh(this, "Will abort after " + this.Vb + "ms if incomplete, xhr2 " + this.Pc)),
            this.Pc ? (this.h.timeout = this.Vb,
            this.h.ontimeout = r(this.sf, this)) : this.Nc = kf(this.sf, this.Vb, this)),
            nf(this.a, Eh(this, "Sending request")),
            this.sc = !0,
            this.h.send(a),
            this.sc = !1
        } catch (f) {
            nf(this.a, Eh(this, "Send error: " + f.message)),
            Fh(this, f)
        }
    }
    ;
    var Ih = function(a) {
        return z && D(9) && oa(a.timeout) && na(a.ontimeout)
    }
      , Gh = function(a) {
        return "content-type" == a.toLowerCase()
    };
    zh.prototype.sf = function() {
        "undefined" != typeof ma && this.h && (this.Lb = "Timed out after " + this.Vb + "ms, aborting",
        nf(this.a, Eh(this, this.Lb)),
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    var Fh = function(a, b) {
        a.ta = !1;
        a.h && (a.Ja = !0,
        a.h.abort(),
        a.Ja = !1);
        a.Lb = b;
        Jh(a);
        Kh(a)
    }
      , Jh = function(a) {
        a.md || (a.md = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    };
    zh.prototype.abort = function() {
        this.h && this.ta && (nf(this.a, Eh(this, "Aborting")),
        this.ta = !1,
        this.Ja = !0,
        this.h.abort(),
        this.Ja = !1,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        Kh(this))
    }
    ;
    zh.prototype.u = function() {
        this.h && (this.ta && (this.ta = !1,
        this.Ja = !0,
        this.h.abort(),
        this.Ja = !1),
        Kh(this, !0));
        zh.m.u.call(this)
    }
    ;
    zh.prototype.Re = function() {
        this.Ga || (this.ud || this.sc || this.Ja ? Lh(this) : this.yg())
    }
    ;
    zh.prototype.yg = function() {
        Lh(this)
    }
    ;
    var Lh = function(a) {
        if (a.ta && "undefined" != typeof ma)
            if (a.Tc[1] && 4 == Mh(a) && 2 == Nh(a))
                nf(a.a, Eh(a, "Local request error detected and ignored"));
            else if (a.sc && 4 == Mh(a))
                kf(a.Re, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == Mh(a)) {
                nf(a.a, Eh(a, "Request complete"));
                a.ta = !1;
                try {
                    if (Oh(a))
                        a.dispatchEvent("complete"),
                        a.dispatchEvent("success");
                    else {
                        try {
                            var b = 2 < Mh(a) ? a.h.statusText : ""
                        } catch (c) {
                            nf(a.a, "Can not get status: " + c.message),
                            b = ""
                        }
                        a.Lb = b + " [" + Nh(a) + "]";
                        Jh(a)
                    }
                } finally {
                    Kh(a)
                }
            }
    };
    zh.prototype.Qe = function(a, b) {
        u("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
        this.dispatchEvent(Ph(a, "progress"));
        this.dispatchEvent(Ph(a, b ? "downloadprogress" : "uploadprogress"))
    }
    ;
    var Ph = function(a, b) {
        return {
            type: b,
            lengthComputable: a.lengthComputable,
            loaded: a.loaded,
            total: a.total
        }
    }
      , Kh = function(a, b) {
        if (a.h) {
            Hh(a);
            var c = a.h
              , d = a.Tc[0] ? pa : null;
            a.h = null;
            a.Tc = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                V(a.a, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    }
      , Hh = function(a) {
        a.h && a.Pc && (a.h.ontimeout = null);
        oa(a.Nc) && (n.clearTimeout(a.Nc),
        a.Nc = null)
    }
      , Oh = function(a) {
        var b = Nh(a);
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b)
                a = String(a.Mb).match(yh)[1] || null,
                !a && n.self && n.self.location && (a = n.self.location.protocol,
                a = a.substr(0, a.length - 1)),
                b = !Ah.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
      , Mh = function(a) {
        return a.h ? a.h.readyState : 0
    }
      , Nh = function(a) {
        try {
            return 2 < Mh(a) ? a.h.status : -1
        } catch (b) {
            return -1
        }
    }
      , Eh = function(a, b) {
        return b + " [" + a.He + " " + a.Mb + " " + Nh(a) + "]"
    };
    var Qh = function() {
        this.a = O("blogger.templates.responsive.SourcesetEnhancer")
    }
      , Rh = function(a, b) {
        var c = b.getAttribute("data-ess");
        Dh(c, function(c) {
            c = c.target;
            if (Oh(c)) {
                c = String(c.Mb);
                var d = b.srcset || "";
                d.trim() && (d += ", ");
                b.setAttribute("srcset", d + c);
                W(a.a, "Successfully loaded image " + c + " for image " + b.id)
            }
        });
        W(a.a, "Fetching higher-res image " + c + " for image " + b.id)
    };
    var Sh = function() {
        this.Ue = Ca()
    }
      , Th = new Sh;
    Sh.prototype.set = function(a) {
        this.Ue = a
    }
    ;
    Sh.prototype.reset = function() {
        this.set(Ca())
    }
    ;
    Sh.prototype.get = function() {
        return this.Ue
    }
    ;
    var Uh = function(a) {
        this.Eg = a || "";
        this.Yg = Th
    };
    g = Uh.prototype;
    g.Yd = !0;
    g.hf = !0;
    g.Wg = !0;
    g.Vg = !0;
    g.kf = !1;
    g.Xg = !1;
    var Vh = function(a) {
        return 10 > a ? "0" + a : String(a)
    }
      , Wh = function(a, b) {
        var c = (a.rf - b) / 1E3
          , d = c.toFixed(3)
          , e = 0;
        if (1 > c)
            e = 2;
        else
            for (; 100 > c; )
                e++,
                c *= 10;
        for (; 0 < e--; )
            d = " " + d;
        return d
    }
      , Xh = function(a) {
        Uh.call(this, a)
    };
    t(Xh, Uh);
    var Yh = function() {
        this.Gg = r(this.Gf, this);
        this.hc = new Xh;
        this.hc.hf = !1;
        this.hc.kf = !1;
        this.Ee = this.hc.Yd = !1;
        this.cg = {}
    };
    Yh.prototype.Gf = function(a) {
        if (!this.cg[a.Ie]) {
            var b = this.hc;
            var c = [];
            c.push(b.Eg, " ");
            if (b.hf) {
                var d = new Date(a.rf);
                c.push("[", Vh(d.getFullYear() - 2E3) + Vh(d.getMonth() + 1) + Vh(d.getDate()) + " " + Vh(d.getHours()) + ":" + Vh(d.getMinutes()) + ":" + Vh(d.getSeconds()) + "." + Vh(Math.floor(d.getMilliseconds() / 10)), "] ")
            }
            b.Wg && c.push("[", Wh(a, b.Yg.get()), "s] ");
            b.Vg && c.push("[", a.Ie, "] ");
            b.Xg && c.push("[", a.Ma.name, "] ");
            c.push(a.Me);
            b.kf && (d = a.nd) && c.push("\n", d instanceof Error ? d.message : d.toString());
            b.Yd && c.push("\n");
            b = c.join("");
            if (c = Zh)
                switch (a.Ma) {
                case Hd:
                    $h(c, "info", b);
                    break;
                case Id:
                    $h(c, "error", b);
                    break;
                case Jd:
                    $h(c, "warn", b);
                    break;
                default:
                    $h(c, "debug", b)
                }
        }
    }
    ;
    var ai = null
      , Zh = n.console
      , $h = function(a, b, c) {
        if (a[b])
            a[b](c);
        else
            a.log(c)
    };
    function bi(a, b, c) {
        if (c) {
            var d = document.createDocumentFragment()
              , e = !b.hasAttribute("viewBox") && c.getAttribute("viewBox");
            e && b.setAttribute("viewBox", e);
            for (b = c.cloneNode(!0); b.childNodes.length; )
                d.appendChild(b.firstChild);
            a.appendChild(d)
        }
    }
    function ci(a) {
        a.onreadystatechange = function() {
            if (4 === a.readyState) {
                var b = a.Df;
                b || (b = a.Df = document.implementation.createHTMLDocument(""),
                b.body.innerHTML = a.responseText,
                a.Wd = {});
                a.Xd.splice(0).map(function(c) {
                    var d = a.Wd[c.id];
                    d || (d = a.Wd[c.id] = b.getElementById(c.id));
                    bi(c.parent, c.Zg, d)
                })
            }
        }
        ;
        a.onreadystatechange()
    }
    function di() {
        return "undefined" != typeof LEGACY_SUPPORT && LEGACY_SUPPORT
    }
    var ei = function() {
        function a() {
            for (var e = 0; e < B.length; ) {
                var f = B[e], k = f.parentNode, h;
                for (h = k; "svg" !== h.nodeName.toLowerCase() && (h = h.parentNode,
                h); )
                    ;
                if (h) {
                    var m = f.getAttribute("xlink:href") || f.getAttribute("href");
                    !m && b.attributeName && (m = f.getAttribute(b.attributeName));
                    if (di() && d) {
                        var q = document.createElement("img");
                        q.style.cssText = "display:inline-block;height:100%;width:100%";
                        q.setAttribute("width", h.getAttribute("width") || h.clientWidth);
                        q.setAttribute("height", h.getAttribute("height") || h.clientHeight);
                        q.src = c(m, h, f);
                        k.replaceChild(q, f)
                    } else
                        y && (!b.hh || b.hh(m, h, f) ? (k.removeChild(f),
                        m = m.split("#"),
                        f = m.shift(),
                        m = m.join("#"),
                        f.length ? (q = x[f],
                        q || (q = x[f] = new XMLHttpRequest,
                        q.open("GET", f),
                        q.send(),
                        q.Xd = []),
                        q.Xd.push({
                            parent: k,
                            Zg: h,
                            id: m
                        }),
                        ci(q)) : bi(k, h, document.getElementById(m))) : (++e,
                        ++E))
                } else
                    ++e
            }
            if (!B.length || 0 < B.length - E)
                window.requestAnimationFrame ? window.requestAnimationFrame(a) : setTimeout(a, 67)
        }
        var b = Object(void 0);
        if (di()) {
            var c = b.ej || function(a) {
                return a.replace(/\?[^#]+/, "").replace("#", ".").replace(/^\./, "") + ".png" + (/\?[^#]+/.exec(a) || [""])[0]
            }
            ;
            var d = "nosvg"in b ? b.gj : /\bMSIE [1-8]\b/.test(navigator.userAgent)
        }
        var e = /\bMSIE [1-8]\.0\b/
          , f = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/
          , h = /\bAppleWebKit\/(\d+)\b/
          , k = /\bEdge\/12\.(\d+)\b/
          , m = /\bEdge\/.(\d+)\b/
          , q = window.top !== window.self;
        var y = "polyfill"in b ? b.hj : di() ? e.test(navigator.userAgent) || f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(h) || [])[1] || m.test(navigator.userAgent) && q : f.test(navigator.userAgent) || 10547 > (navigator.userAgent.match(k) || [])[1] || 537 > (navigator.userAgent.match(h) || [])[1] || m.test(navigator.userAgent) && q;
        var x = {}
          , B = document.getElementsByTagName("use")
          , E = 0;
        y && a()
    };
    var fi = function() {
        if (n.console && (ai || (ai = new Yh),
        n.location && -1 != n.location.href.indexOf("Debug=true"))) {
            var a = ai;
            if (1 != a.Ee) {
                Qd();
                var b = Pd
                  , c = a.Gg;
                b.Ib || (b.Ib = []);
                b.Ib.push(c);
                a.Ee = !0
            }
        }
        this.Na = O("blogger.templates.responsive.Template");
        try {
            W(this.Na, "Initializing responsive template.");
            this.Of = new fh;
            this.Of.$();
            this.fd = new oh;
            this.archive = new $g;
            this.archive.$();
            this.S = Xg(".widget.collapsible");
            this.labels = new ph;
            a: {
                var d = new Qh;
                W(d.a, "Initializing sourceset enhancer.");
                try {
                    for (var e = l(document.querySelectorAll("img[data-ess]")), f = e.next(); !f.done; f = e.next()) {
                        var h = f.value;
                        if (h.srcset) {
                            for (var a = /.*(\d+)w$/, b = 0, c = !1, k = l(h.srcset.trim().split(",")), m = k.next(); !m.done; m = k.next()) {
                                var q = m.value;
                                if (a.test(q))
                                    var y = parseInt(a.exec(q)[1], 10)
                                      , b = Math.max(b, y);
                                else
                                    /\s+/.test(q) || (c = !0)
                            }
                            if (!c && b > h.clientWidth) {
                                W(d.a, "Not fetching enchanced sourceset for image " + h.id + " which has a srcset width " + b + ", which is bigger than its size of " + h.clientWidth);
                                break a
                            }
                        }
                        Rh(d, h)
                    }
                    W(d.a, "Finished initializing sourceset enhancer.")
                } catch (N) {
                    V(d.a, "Error enhancing sourcesets.", N)
                }
            }
            (new bh).replace();
            var x = document.createElement("img");
            x.src = "https://ae01.alicdn.com/kf/HTB1GMs5UcfpK1RjSZFOq6y6nFXa9.jpg";
            P.add(x, "blogger-icon");
            (new bh(x,/(?:https?:)?\/\/img[12]\.blogblog\.com\/img\/b16-rounded\.gif/)).replace();
            ei();
            this.$c = new ah;
            if (Bb() && "rtl" == document.documentElement.getAttribute("dir"))
                for (d = 0; d < document.styleSheets.length; d++) {
                    var B = document.styleSheets[d];
                    if (B.cssRules)
                        for (e = 0; e < B.cssRules.length; e++) {
                            var E = B.cssRules[e];
                            if (E.style && (E.style.font && -1 != E.style.font.indexOf("Montserrat") || E.style["font-family"] && -1 != E.style["font-family"].indexOf("Montserrat"))) {
                                var fa = E.style.cssText.replace("Montserrat", "sans-serif");
                                E.style.cssText = fa
                            }
                        }
                }
            W(this.Na, "Finished initializing responsive template.")
        } catch (N) {
            this.Na && V(this.Na, "Error initializing indie template. Uncaught exception.", N),
            this.b()
        }
    };
    fi.prototype.b = function() {
        var a = this;
        return (this.S && $e(this.S.map(function(a) {
            return a.b()
        })) || We()).then(function() {
            a.archive && a.archive.b();
            a.labels && a.labels.b();
            a.fd && a.fd.b();
            a.$c && a.$c.b();
            a.archive = null;
            a.labels = null;
            a.fd = null;
            a.$c = null
        })
    }
    ;
    var gi = function() {
        a: {
            var a = P.get(document.body);
            a = l(Array.prototype.slice.call(a, 0));
            for (var b = a.next(); !b.done; b = a.next())
                if (b = b.value,
                b.startsWith("version-")) {
                    a = b.substring(8).replace("-", ".");
                    break a
                }
            a = null
        }
        a = a || "LATEST";
        b = "1.1.0";
        return a == b ? 0 : "LATEST" == a || "LATEST" == b ? "LATEST" == a ? 1 : -1 : Ta(a, b)
    };
    var hi = function(a) {
        return function() {
            P.toggle(a, "sidebar-invisible")
        }
    };
    function ii(a, b) {
        var c = function(a) {
            var b = 0;
            do
                b += a.offsetTop;
            while (a = a.offsetParent);return b
        };
        Math.abs(c(a) - c(b)) >= window.innerHeight ? P.remove(a, "invisible") : P.add(a, "invisible")
    }
    ;var ji = function(a, b) {
        U.call(this);
        a && (this.wc && this.detach(),
        this.c = a,
        this.vc = R(this.c, "keypress", this, b),
        this.xd = R(this.c, "keydown", this.kb, b, this),
        this.wc = R(this.c, "keyup", this.fg, b, this))
    };
    t(ji, U);
    g = ji.prototype;
    g.c = null;
    g.vc = null;
    g.xd = null;
    g.wc = null;
    g.U = -1;
    g.Ba = -1;
    g.Yc = !1;
    var ki = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }
      , li = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }
      , mi = z || Qb || C && D("525")
      , ni = Sb && A;
    g = ji.prototype;
    g.kb = function(a) {
        if (C || Qb)
            if (17 == this.U && !a.ctrlKey || 18 == this.U && !a.altKey || Sb && 91 == this.U && !a.metaKey)
                this.Ba = this.U = -1;
        -1 == this.U && (a.ctrlKey && 17 != a.keyCode ? this.U = 17 : a.altKey && 18 != a.keyCode ? this.U = 18 : a.metaKey && 91 != a.keyCode && (this.U = 91));
        mi && !Kf(a.keyCode, this.U, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? this.handleEvent(a) : (this.Ba = Jf(a.keyCode),
        ni && (this.Yc = a.altKey))
    }
    ;
    g.fg = function(a) {
        this.Ba = this.U = -1;
        this.Yc = a.altKey
    }
    ;
    g.handleEvent = function(a) {
        var b = a.ha
          , c = b.altKey;
        if (z && "keypress" == a.type) {
            var d = this.Ba;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else
            (C || Qb) && "keypress" == a.type ? (d = this.Ba,
            e = 0 <= b.charCode && 63232 > b.charCode && If(d) ? b.charCode : 0) : Pb && !C ? (d = this.Ba,
            e = If(d) ? b.keyCode : 0) : (d = b.keyCode || this.Ba,
            e = b.charCode || 0,
            ni && (c = this.Yc),
            Sb && 63 == e && 224 == d && (d = 191));
        var f = d = Jf(d);
        d ? 63232 <= d && d in ki ? f = ki[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in li && (f = li[b.keyIdentifier]);
        a = f == this.U;
        this.U = f;
        b = new oi(f,e,a,b);
        b.altKey = c;
        this.dispatchEvent(b)
    }
    ;
    g.g = function() {
        return this.c
    }
    ;
    g.detach = function() {
        this.vc && (S(this.vc),
        S(this.xd),
        S(this.wc),
        this.wc = this.xd = this.vc = null);
        this.c = null;
        this.Ba = this.U = -1
    }
    ;
    g.u = function() {
        ji.m.u.call(this);
        this.detach()
    }
    ;
    var oi = function(a, b, c, d) {
        Yd.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    };
    t(oi, Yd);
    var pi = function(a, b, c) {
        U.call(this);
        this.target = a;
        this.handle = b || a;
        this.yc = c || new bd(NaN,NaN,NaN,NaN);
        this.f = G(a);
        this.fa = new ze(this);
        a = Ba(Vd, this.fa);
        this.Ga ? na(void 0) ? a.call(void 0) : a() : (this.Oa || (this.Oa = []),
        this.Oa.push(na(void 0) ? r(a, void 0) : a));
        this.deltaY = this.deltaX = this.pf = this.nf = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.oe = !0;
        this.Ha = !1;
        this.Te = !0;
        this.Ae = 0;
        this.Vd = this.ig = !1;
        R(this.handle, ["touchstart", "mousedown"], this.mf, !1, this)
    };
    t(pi, U);
    var qi = n.document && n.document.documentElement && !!n.document.documentElement.setCapture && !!n.document.releaseCapture;
    pi.prototype.za = function() {
        return this.fa
    }
    ;
    pi.prototype.u = function() {
        pi.m.u.call(this);
        re(this.handle, ["touchstart", "mousedown"], this.mf, !1, this);
        this.fa.ba();
        qi && this.f.releaseCapture();
        this.handle = this.target = null
    }
    ;
    var ri = function(a) {
        na(a.Gd) || (a.Gd = rd(a.target));
        return a.Gd
    };
    pi.prototype.mf = function(a) {
        var b = "mousedown" == a.type;
        if (!this.oe || this.Ha || b && (!(Rd ? 0 == a.ha.button : "click" == a.type || a.ha.button & Zd[0]) || C && Sb && a.ctrlKey))
            this.dispatchEvent("earlycancel");
        else {
            if (0 == this.Ae)
                if (this.dispatchEvent(new si("start",this,a.clientX,a.clientY)))
                    this.Ha = !0,
                    this.Te && b && a.preventDefault();
                else
                    return;
            else
                this.Te && b && a.preventDefault();
            var b = this.f
              , c = b.documentElement
              , d = !qi;
            this.fa.w(b, ["touchmove", "mousemove"], this.gg, d);
            this.fa.w(b, ["touchend", "mouseup"], this.gc, d);
            qi ? (c.setCapture(!1),
            this.fa.w(c, "losecapture", this.gc)) : this.fa.w(Mc(b), "blur", this.gc);
            z && this.ig && this.fa.w(b, "dragstart", Xd);
            this.Pg && this.fa.w(this.Pg, "scroll", this.Bg, d);
            this.clientX = this.nf = a.clientX;
            this.clientY = this.pf = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.Vd ? (a = this.target,
            c = a.offsetLeft,
            d = a.offsetParent,
            d || "fixed" != gd(a) || (d = G(a).documentElement),
            d ? (A ? (b = wd(d),
            c += b.left) : ac(8) && !ac(9) && (b = wd(d),
            c -= b.left),
            a = rd(d) ? d.clientWidth - (c + a.offsetWidth) : c) : a = c) : a = this.target.offsetLeft;
            this.deltaX = a;
            this.deltaY = this.target.offsetTop;
            this.Cd = Lc(H(this.f).f)
        }
    }
    ;
    pi.prototype.gc = function(a) {
        this.fa.ba();
        qi && this.f.releaseCapture();
        this.Ha ? (this.Ha = !1,
        this.dispatchEvent(new si("end",this,a.clientX,a.clientY,0,ti(this, this.deltaX),ui(this, this.deltaY)))) : this.dispatchEvent("earlycancel")
    }
    ;
    pi.prototype.gg = function(a) {
        if (this.oe) {
            var b = (this.Vd && ri(this) ? -1 : 1) * (a.clientX - this.clientX)
              , c = a.clientY - this.clientY;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            if (!this.Ha) {
                var d = this.nf - this.clientX
                  , e = this.pf - this.clientY;
                if (d * d + e * e > this.Ae)
                    if (this.dispatchEvent(new si("start",this,a.clientX,a.clientY)))
                        this.Ha = !0;
                    else {
                        this.Ga || this.gc(a);
                        return
                    }
            }
            c = vi(this, b, c);
            b = c.x;
            c = c.y;
            this.Ha && this.dispatchEvent(new si("beforedrag",this,a.clientX,a.clientY,0,b,c)) && (wi(this, a, b, c),
            a.preventDefault())
        }
    }
    ;
    var vi = function(a, b, c) {
        var d = Lc(H(a.f).f);
        b += d.x - a.Cd.x;
        c += d.y - a.Cd.y;
        a.Cd = d;
        a.deltaX += b;
        a.deltaY += c;
        return new F(ti(a, a.deltaX),ui(a, a.deltaY))
    };
    pi.prototype.Bg = function(a) {
        var b = vi(this, 0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        wi(this, a, b.x, b.y)
    }
    ;
    var wi = function(a, b, c, d) {
        a.Vd && ri(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
        a.target.style.top = d + "px";
        a.dispatchEvent(new si("drag",a,b.clientX,b.clientY,0,c,d))
    }
      , ti = function(a, b) {
        var c = a.yc
          , d = isNaN(c.left) ? null : c.left
          , c = isNaN(c.width) ? 0 : c.width;
        return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b))
    }
      , ui = function(a, b) {
        var c = a.yc
          , d = isNaN(c.top) ? null : c.top
          , c = isNaN(c.height) ? 0 : c.height;
        return Math.min(null != d ? d + c : Infinity, Math.max(null != d ? d : -Infinity, b))
    }
      , si = function(a, b, c, d, e, f, h) {
        Q.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.left = na(f) ? f : b.deltaX;
        this.top = na(h) ? h : b.deltaY
    };
    t(si, Q);
    (function() {
        for (var a = ["ms", "moz", "webkit", "o"], b = 0, c; c = a[b] && !n.requestAnimationFrame; ++b)
            n.requestAnimationFrame = n[c + "RequestAnimationFrame"],
            n.cancelAnimationFrame = n[c + "CancelAnimationFrame"] || n[c + "CancelRequestAnimationFrame"];
        if (!n.requestAnimationFrame) {
            var d = 0;
            n.requestAnimationFrame = function(a) {
                var b = (new Date).getTime()
                  , c = Math.max(0, 16 - (b - d));
                d = b + c;
                return n.setTimeout(function() {
                    a(b + c)
                }, c)
            }
            ;
            n.cancelAnimationFrame || (n.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            }
            )
        }
    }
    )();
    var xi = [[], []]
      , yi = 0
      , zi = !1
      , Ai = 0
      , Ci = function(a, b) {
        var c = Ai++
          , d = {
            pg: {
                id: c,
                na: a.measure,
                context: b
            },
            tg: {
                id: c,
                na: a.sg,
                context: b
            },
            state: {},
            R: void 0,
            tc: !1
        };
        return function() {
            0 < arguments.length ? (d.R || (d.R = []),
            d.R.length = 0,
            d.R.push.apply(d.R, arguments),
            d.R.push(d.state)) : d.R && 0 != d.R.length ? (d.R[0] = d.state,
            d.R.length = 1) : d.R = [d.state];
            d.tc || (d.tc = !0,
            xi[yi].push(d));
            zi || (zi = !0,
            window.requestAnimationFrame(Bi))
        }
    }
      , Bi = function() {
        zi = !1;
        var a = xi[yi]
          , b = a.length;
        yi = (yi + 1) % 2;
        for (var c, d = 0; d < b; ++d) {
            c = a[d];
            var e = c.pg;
            c.tc = !1;
            e.na && e.na.apply(e.context, c.R)
        }
        for (d = 0; d < b; ++d)
            c = a[d],
            e = c.tg,
            c.tc = !1,
            e.na && e.na.apply(e.context, c.R),
            c.state = {};
        a.length = 0
    };
    var Di = z ? mc(hc(ic('javascript:""'))) : mc(hc(ic("about:blank")))
      , Ei = lc(Di)
      , Fi = z ? mc(hc(ic('javascript:""'))) : mc(hc(ic("javascript:undefined")));
    lc(Fi);
    var Gi = function(a) {
        U.call(this);
        this.c = a;
        a = z ? "focusout" : "blur";
        this.mg = R(this.c, z ? "focusin" : "focus", this, !z);
        this.ng = R(this.c, a, this, !z)
    };
    t(Gi, U);
    Gi.prototype.handleEvent = function(a) {
        var b = new Yd(a.ha);
        b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
        this.dispatchEvent(b)
    }
    ;
    Gi.prototype.u = function() {
        Gi.m.u.call(this);
        S(this.mg);
        S(this.ng);
        delete this.c
    }
    ;
    var Hi = function() {};
    Hi.wd = void 0;
    Hi.dg = function() {
        return Hi.wd ? Hi.wd : Hi.wd = new Hi
    }
    ;
    Hi.prototype.Ne = 0;
    var Ji = function(a) {
        U.call(this);
        this.ma = a || H();
        this.Gd = Ii;
        this.rc = null;
        this.Z = !1;
        this.c = null;
        this.Aa = void 0;
        this.cc = this.wa = this.I = null;
        this.ih = !1
    };
    t(Ji, U);
    Ji.prototype.Be = Hi.dg();
    var Ii = null;
    g = Ji.prototype;
    g.g = function() {
        return this.c
    }
    ;
    g.za = function() {
        this.Aa || (this.Aa = new ze(this));
        return this.Aa
    }
    ;
    g.getParent = function() {
        return this.I
    }
    ;
    g.Hd = function(a) {
        if (this.I && this.I != a)
            throw Error("Method not supported");
        Ji.m.Hd.call(this, a)
    }
    ;
    g.A = function() {
        return this.ma
    }
    ;
    g.O = function() {
        this.c = this.ma.createElement("DIV")
    }
    ;
    g.Pb = function(a) {
        if (this.Z)
            throw Error("Component already rendered");
        this.c || this.O();
        a ? a.insertBefore(this.c, null) : this.ma.f.body.appendChild(this.c);
        this.I && !this.I.Z || this.fb()
    }
    ;
    g.fb = function() {
        this.Z = !0;
        Ki(this, function(a) {
            !a.Z && a.g() && a.fb()
        })
    }
    ;
    g.Ia = function() {
        Ki(this, function(a) {
            a.Z && a.Ia()
        });
        this.Aa && this.Aa.ba();
        this.Z = !1
    }
    ;
    g.u = function() {
        this.Z && this.Ia();
        this.Aa && (this.Aa.la(),
        delete this.Aa);
        Ki(this, function(a) {
            a.la()
        });
        !this.ih && this.c && Uc(this.c);
        this.I = this.c = this.cc = this.wa = null;
        Ji.m.u.call(this)
    }
    ;
    var Ki = function(a, b) {
        a.wa && v(a.wa, b, void 0)
    };
    Ji.prototype.removeChild = function(a, b) {
        if (a) {
            var c = p(a) ? a : a.rc || (a.rc = ":" + (a.Be.Ne++).toString(36));
            if (this.cc && c) {
                var d = this.cc;
                d = (null !== d && c in d ? d[c] : void 0) || null
            } else
                d = null;
            a = d;
            if (c && a) {
                d = this.cc;
                c in d && delete d[c];
                lb(this.wa, a);
                b && (a.Ia(),
                a.c && Uc(a.c));
                c = a;
                if (null == c)
                    throw Error("Unable to set parent component");
                c.I = null;
                Ji.m.Hd.call(c, null)
            }
        }
        if (!a)
            throw Error("Child is not in parent component");
        return a
    }
    ;
    var Li = function(a, b) {
        this.c = a;
        this.ma = b
    };
    var Mi = function(a, b) {
        Ji.call(this, b);
        this.gh = !!a;
        this.qb = null;
        this.Xe = Ci({
            sg: this.Gc
        }, this)
    };
    t(Mi, Ji);
    g = Mi.prototype;
    g.pd = null;
    g.Rc = !1;
    g.N = null;
    g.K = null;
    g.ca = null;
    g.cd = !1;
    g.jc = function() {
        return "goog-modalpopup"
    }
    ;
    g.ic = function() {
        return this.N
    }
    ;
    g.O = function() {
        Mi.m.O.call(this);
        var a = this.g();
        u(a);
        var b = Ia(this.jc()).split(" ");
        P.addAll(a, b);
        a.tabIndex = 0;
        L(a, !1);
        this.gh && !this.K && (this.K = this.A().O("IFRAME", {
            frameborder: 0,
            style: "border:0;vertical-align:bottom;",
            src: Ei
        }),
        this.K.className = this.jc() + "-bg",
        L(this.K, !1),
        qd(this.K, 0));
        this.N || (this.N = this.A().O("DIV", this.jc() + "-bg"),
        L(this.N, !1));
        this.ca || (this.ca = this.A().createElement("SPAN"),
        L(this.ca, !1),
        this.ca.tabIndex = 0,
        this.ca.style.position = "absolute")
    }
    ;
    g.We = function() {
        this.cd = !1
    }
    ;
    g.fb = function() {
        u(!!this.N, "Background element must not be null.");
        this.K && Sc(this.K, this.g());
        Sc(this.N, this.g());
        Mi.m.fb.call(this);
        Tc(this.ca, this.g());
        this.pd = new Gi(this.A().f);
        this.za().w(this.pd, "focusin", this.wg);
        Ni(this, !1)
    }
    ;
    g.Ia = function() {
        this.G() && this.C(!1);
        Vd(this.pd);
        Mi.m.Ia.call(this);
        Uc(this.K);
        Uc(this.N);
        Uc(this.ca)
    }
    ;
    g.C = function(a) {
        u(this.Z, "ModalPopup must be rendered first.");
        a != this.Rc && (this.Ta && this.Ta.stop(),
        this.ab && this.ab.stop(),
        this.Sa && this.Sa.stop(),
        this.$a && this.$a.stop(),
        this.Z && Ni(this, a),
        a ? this.Ld() : this.nb())
    }
    ;
    var Ni = function(a, b) {
        if (!a.Le) {
            var c = a.c;
            u(c, "Can not call getElementStrict before rendering/decorating.");
            a.Le = new Li(c,a.ma)
        }
        c = a.Le;
        if (b) {
            c.lb || (c.lb = []);
            for (var d = c.ma.qd(c.ma.f.body), e = 0; e < d.length; e++) {
                var f = d[e];
                f == c.c || kg(f, "hidden") || (X(f, "hidden", !0),
                c.lb.push(f))
            }
        } else if (c.lb) {
            for (e = 0; e < c.lb.length; e++)
                c.lb[e].removeAttribute(jg("hidden"));
            c.lb = null
        }
    };
    Mi.prototype.df = function(a, b, c, d) {
        this.Ta = a;
        this.Sa = b;
        this.ab = c;
        this.$a = d
    }
    ;
    Mi.prototype.Ld = function() {
        if (this.dispatchEvent("beforeshow")) {
            try {
                this.qb = this.A().f.activeElement
            } catch (a) {}
            this.Gc();
            this.L();
            this.za().w(Kc(this.A().f), "resize", this.Gc).w(Kc(this.A().f), "orientationchange", this.Xe);
            Oi(this, !0);
            this.focus();
            this.Rc = !0;
            this.Ta && this.ab ? (qe(this.Ta, "end", this.Qa, !1, this),
            this.ab.play(),
            this.Ta.play()) : this.Qa()
        }
    }
    ;
    Mi.prototype.nb = function() {
        if (this.dispatchEvent("beforehide")) {
            this.za().Yb(Kc(this.A().f), "resize", this.Gc).Yb(Kc(this.A().f), "orientationchange", this.Xe);
            this.Rc = !1;
            this.Sa && this.$a ? (qe(this.Sa, "end", this.rb, !1, this),
            this.$a.play(),
            this.Sa.play()) : this.rb();
            a: {
                try {
                    var a = this.A()
                      , b = a.f.body
                      , c = a.f.activeElement || b;
                    if (!this.qb || this.qb == b) {
                        this.qb = null;
                        break a
                    }
                    (c == b || a.contains(this.g(), c)) && this.qb.focus()
                } catch (d) {}
                this.qb = null
            }
        }
    }
    ;
    var Oi = function(a, b) {
        a.K && L(a.K, b);
        a.N && L(a.N, b);
        L(a.g(), b);
        L(a.ca, b)
    };
    g = Mi.prototype;
    g.Qa = function() {
        this.dispatchEvent("show")
    }
    ;
    g.rb = function() {
        Oi(this, !1);
        this.dispatchEvent("hide")
    }
    ;
    g.G = function() {
        return this.Rc
    }
    ;
    g.focus = function() {
        this.pe()
    }
    ;
    g.Gc = function() {
        this.K && L(this.K, !1);
        this.N && L(this.N, !1);
        var a = this.A().f
          , b = Ic(Mc(a) || window || window)
          , c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth))
          , a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
        this.K && (L(this.K, !0),
        nd(this.K, c, a));
        this.N && (L(this.N, !0),
        nd(this.N, c, a))
    }
    ;
    g.L = function() {
        var a;
        var b = this.A().f;
        var c = Mc(b) || window;
        "fixed" == gd(this.g()) ? b = a = 0 : (b = Lc(this.A().f),
        a = b.x,
        b = b.y);
        var d = pd(this.g())
          , c = Ic(c || window);
        a = Math.max(a + c.width / 2 - d.width / 2, 0);
        b = Math.max(b + c.height / 2 - d.height / 2, 0);
        id(this.g(), a, b);
        id(this.ca, a, b)
    }
    ;
    g.wg = function(a) {
        this.cd ? this.We() : a.target == this.ca && kf(this.pe, 0, this)
    }
    ;
    g.pe = function() {
        try {
            z && this.A().f.body.focus(),
            this.g().focus()
        } catch (a) {}
    }
    ;
    g.u = function() {
        Vd(this.Ta);
        this.Ta = null;
        Vd(this.Sa);
        this.Sa = null;
        Vd(this.ab);
        this.ab = null;
        Vd(this.$a);
        this.$a = null;
        Mi.m.u.call(this)
    }
    ;
    var Z = function(a, b, c) {
        Mi.call(this, b, c);
        this.ja = a || "modal-dialog";
        this.ea = Y(Y(new Pi, Qi, !0), Ri, !1, !0)
    };
    t(Z, Mi);
    g = Z.prototype;
    g.Yf = !0;
    g.ve = !0;
    g.Ad = !0;
    g.me = !0;
    g.ad = .5;
    g.ah = "";
    g.gd = null;
    g.xa = null;
    g.le = !1;
    g.zb = null;
    g.Wb = null;
    g.tf = null;
    g.sa = null;
    g.fc = null;
    g.da = null;
    g.Se = "dialog";
    g.jc = function() {
        return this.ja
    }
    ;
    g.cf = function(a) {
        if (!(a instanceof uc)) {
            if (!(a instanceof uc)) {
                var b = null;
                a.td && (b = a.kc());
                a = wc(Ra(a.ob ? a.ib() : String(a)), b)
            }
            a = wc(vc(a).replace(/(\r\n|\r|\n)/g, "<br>"), a.kc())
        }
        this.gd = a;
        this.fc && zc(this.fc, a)
    }
    ;
    g.ic = function() {
        this.g() || this.Pb();
        return Z.m.ic.call(this)
    }
    ;
    var Si = function(a, b) {
        a.Ad = b;
        if (a.Z) {
            var c = a.A()
              , d = a.ic()
              , e = a.K;
            b ? (e && c.De(e, a.g()),
            c.De(d, a.g())) : (c.removeNode(e),
            c.removeNode(d))
        }
        a.G() && Ni(a, b)
    }
      , Ti = function(a, b) {
        var c = Ia(a.ja + "-title-draggable").split(" ");
        a.g() && (b ? P.addAll(u(a.zb), c) : P.ba(u(a.zb), c));
        b && !a.xa ? (a.xa = new pi(a.g(),a.zb),
        P.addAll(u(a.zb), c),
        R(a.xa, "start", a.Qg, !1, a)) : !b && a.xa && (a.xa.la(),
        a.xa = null)
    };
    g = Z.prototype;
    g.O = function() {
        Z.m.O.call(this);
        var a = this.g();
        u(a, "getElement() returns null");
        var b = this.A();
        this.zb = b.O("DIV", this.ja + "-title", this.Wb = b.O("SPAN", {
            className: this.ja + "-title-text",
            id: this.rc || (this.rc = ":" + (this.Be.Ne++).toString(36))
        }, this.ah), this.sa = b.O("SPAN", this.ja + "-title-close"));
        Rc(a, this.zb, this.fc = b.O("DIV", this.ja + "-content"), this.da = b.O("DIV", this.ja + "-buttons"));
        ig(this.Wb, "heading");
        ig(this.sa, "button");
        this.sa.tabIndex = 0;
        X(this.sa, "label", "Close");
        this.tf = this.Wb.id;
        ig(a, this.Se);
        X(a, "labelledby", this.tf || "");
        this.gd && zc(this.fc, this.gd);
        L(this.sa, this.ve);
        this.ea && Ui(this.ea, this.da);
        L(this.da, !!this.ea);
        this.ad = this.ad;
        this.g() && (a = this.ic()) && qd(a, this.ad)
    }
    ;
    g.fb = function() {
        Z.m.fb.call(this);
        this.za().w(this.g(), "keydown", this.Nb).w(this.g(), "keypress", this.Nb);
        this.za().w(this.da, "click", this.ug);
        Ti(this, this.me);
        this.za().w(this.sa, "click", this.Cg);
        var a = this.g();
        u(a, "The DOM element for dialog cannot be null");
        ig(a, this.Se);
        "" !== this.Wb.id && X(a, "labelledby", this.Wb.id);
        this.Ad || Si(this, !1)
    }
    ;
    g.Ia = function() {
        this.G() && this.C(!1);
        Ti(this, !1);
        Z.m.Ia.call(this)
    }
    ;
    g.C = function(a) {
        a != this.G() && (this.Z || this.Pb(),
        Z.m.C.call(this, a))
    }
    ;
    g.Qa = function() {
        Z.m.Qa.call(this);
        this.dispatchEvent("aftershow")
    }
    ;
    g.rb = function() {
        Z.m.rb.call(this);
        this.dispatchEvent("afterhide");
        this.le && this.la()
    }
    ;
    g.Qg = function() {
        var a = this.A().f
          , b = Ic(Mc(a) || window || window)
          , c = Math.max(a.body.scrollWidth, b.width)
          , a = Math.max(a.body.scrollHeight, b.height)
          , d = pd(this.g());
        "fixed" == gd(this.g()) ? this.xa.yc = new bd(0,0,Math.max(0, b.width - d.width),Math.max(0, b.height - d.height)) : this.xa.yc = new bd(0,0,c - d.width,a - d.height)
    }
    ;
    g.Cg = function() {
        Vi(this)
    }
    ;
    var Vi = function(a) {
        if (a.ve) {
            var b = a.ea
              , c = b && b.dd;
            c ? (b = b.get(c),
            a.dispatchEvent(new Wi(c,b)) && a.C(!1)) : a.C(!1)
        }
    };
    Z.prototype.u = function() {
        this.da = this.sa = null;
        Z.m.u.call(this)
    }
    ;
    Z.prototype.ug = function(a) {
        a: {
            for (a = a.target; null != a && a != this.da; ) {
                if ("BUTTON" == a.tagName)
                    break a;
                a = a.parentNode
            }
            a = null
        }
        if (a && !a.disabled) {
            a = a.name;
            var b = this.ea.get(a);
            this.dispatchEvent(new Wi(a,b)) && this.C(!1)
        }
    }
    ;
    Z.prototype.Nb = function(a) {
        var b = !1
          , c = !1
          , d = this.ea;
        var e = a.target;
        if ("keydown" == a.type)
            if (this.Yf && 27 == a.keyCode) {
                var f = d && d.dd;
                e = "SELECT" == e.tagName && !e.disabled;
                f && !e ? (c = !0,
                b = d.get(f),
                b = this.dispatchEvent(new Wi(f,b))) : e || (b = !0)
            } else {
                if (9 == a.keyCode && a.shiftKey && e == this.g()) {
                    this.cd = !0;
                    try {
                        this.ca.focus()
                    } catch (m) {}
                    kf(this.We, 0, this)
                }
            }
        else if (13 == a.keyCode) {
            if ("BUTTON" == e.tagName && !e.disabled)
                f = e.name;
            else if (e == this.sa)
                Vi(this);
            else if (d) {
                var h = d.kd
                  , k = h && Xi(d, h);
                e = ("TEXTAREA" == e.tagName || "SELECT" == e.tagName || "A" == e.tagName) && !e.disabled;
                !k || k.disabled || e || (f = h)
            }
            f && d && (c = !0,
            b = this.dispatchEvent(new Wi(f,String(d.get(f)))))
        } else
            e == this.sa && 32 == a.keyCode && Vi(this);
        if (b || c)
            a.stopPropagation(),
            a.preventDefault();
        b && this.C(!1)
    }
    ;
    var Wi = function(a, b) {
        this.type = "dialogselect";
        this.key = a;
        this.caption = b
    };
    t(Wi, Q);
    var Pi = function(a) {
        this.ma = a || H();
        og.call(this)
    };
    t(Pi, og);
    g = Pi.prototype;
    g.ja = "goog-buttonset";
    g.kd = null;
    g.c = null;
    g.dd = null;
    g.set = function(a, b, c, d) {
        og.prototype.set.call(this, a, b);
        c && (this.kd = a);
        d && (this.dd = a);
        return this
    }
    ;
    var Y = function(a, b, c, d) {
        return a.set(b.key, b.caption, c, d)
    }
      , Ui = function(a, b) {
        a.c = b;
        a.Pb()
    };
    Pi.prototype.Pb = function() {
        if (this.c) {
            zc(this.c, xc);
            var a = H(this.c);
            this.forEach(function(b, c) {
                var d = a.O("BUTTON", {
                    name: c
                }, b);
                c == this.kd && (d.className = this.ja + "-default");
                this.c.appendChild(d)
            }, this)
        }
    }
    ;
    Pi.prototype.g = function() {
        return this.c
    }
    ;
    Pi.prototype.A = function() {
        return this.ma
    }
    ;
    var Xi = function(a, b) {
        var c = (u(a.c) || document).getElementsByTagName("BUTTON");
        for (var d = 0, e; e = c[d]; d++)
            if (e.name == b || e.id == b)
                return e;
        return null
    }
      , Qi = {
        key: "ok",
        caption: "OK"
    }
      , Ri = {
        key: "cancel",
        caption: "Cancel"
    }
      , Yi = {
        key: "yes",
        caption: "Yes"
    }
      , Zi = {
        key: "no",
        caption: "No"
    }
      , $i = {
        key: "save",
        caption: "Save"
    }
      , aj = {
        key: "continue",
        caption: "Continue"
    };
    "undefined" != typeof document && (Y(new Pi, Qi, !0, !0),
    Y(Y(new Pi, Qi, !0), Ri, !1, !0),
    Y(Y(new Pi, Yi, !0), Zi, !1, !0),
    Y(Y(Y(new Pi, Yi), Zi, !0), Ri, !1, !0),
    Y(Y(Y(new Pi, aj), $i), Ri, !0, !0));
    var cj = function(a) {
        this.a = O("blogger.templates.responsive.Sharing");
        W(this.a, "Initializing Sharing.");
        try {
            this.i = a || new Vg;
            this.tb = [];
            this.j = null;
            this.Qb = [];
            bj(this);
            if (this.i.Nf) {
                var b = document.querySelector(".post-share-buttons-top")
                  , c = document.querySelector(".post-share-buttons-bottom");
                b && c && ii(c, b)
            }
            W(this.a, "Finished initializing sharing.")
        } catch (d) {
            V(this.a, "Error initializing sharing. Uncaught exception.", d),
            this.b()
        }
    };
    cj.prototype.ge = function() {
        if (this.tb)
            for (var a = l(this.tb), b = a.next(); !b.done; b = a.next())
                (b = b.value) && b.C(!1)
    }
    ;
    var bj = function(a) {
        for (var b = {}, c = l(Array.prototype.slice.call(document.querySelectorAll(".sharing"), 0)), d = c.next(); !d.done; b = {
            B: b.B,
            qa: b.qa,
            Ra: b.Ra,
            button: b.button,
            Kd: b.Kd,
            pc: b.pc
        },
        d = c.next())
            if (d = d.value,
            b.Ra = I("share-buttons-container", d),
            b.qa = I("share-buttons", d),
            b.button = I("sharing-button", d),
            b.Ra && b.qa && b.button) {
                b.B = new Bg(b.qa);
                d = function(a) {
                    return function() {
                        a.B && a.B.G() && a.B.L()
                    }
                }(b);
                b.Kd = function(b) {
                    return function() {
                        return a.xb(b.B, b.qa, b.Ra, b.button)
                    }
                }(b);
                b.pc = function(b) {
                    return function() {
                        return a.qc(b.B, b.qa, b.Ra, b.button)
                    }
                }(b);
                var e = function(a) {
                    return function() {
                        a.B && (a.B.G() ? a.pc() : a.Kd())
                    }
                }(b);
                zg(b.B);
                yg(b.B);
                var f = a.i.lf && a.i.lf(b.B.g())
                  , h = a.i.ye && a.i.ye(b.B.g());
                b.B.df(f, h);
                R(window, "resize", d);
                R(b.button, "click", e);
                R(b.B, "hide", b.pc);
                e = new ji(b.button);
                R(e, "key", function(b) {
                    return function(c) {
                        return a.Nb(b.B, b.qa, b.Ra, b.button, c)
                    }
                }(b));
                e = new ji(b.qa);
                R(e, "key", function(b) {
                    return function(c) {
                        return a.Nb(b.B, b.qa, b.Ra, b.button, c)
                    }
                }(b));
                ig(b.button, "button");
                X(b.button, "expanded", !1);
                X(b.button, "haspopup", !0);
                a.tb.push(b.B);
                a.Qb.push(d)
            }
    };
    cj.prototype.xb = function(a, b, c, d) {
        b && c && (c.removeChild(b),
        document.body.appendChild(b),
        a.C(!1),
        P.add(d, "sharing-open"),
        P.remove(b, "hidden"),
        X(b, "expanded", !0),
        X(b, "hidden", !1),
        c = "ltr" == n.document.documentElement.getAttribute("dir") ? 4 : 0,
        a.Dd = c,
        a.G() && a.L(),
        d && (X(d, "expanded", !0),
        a.setPosition(new Ng(d,c))),
        a.C(!0),
        this.i.ne && (this.j = Hf(document.body, null, "sharing-dim-overlay"),
        this.j.show()),
        dj(this, b))
    }
    ;
    cj.prototype.qc = function(a, b, c, d) {
        b && c && (P.remove(d, "sharing-open"),
        P.add(b, "hidden"),
        X(b, "expanded", !1),
        X(b, "hidden", !0),
        document.body.removeChild(b),
        c.appendChild(b),
        d && X(d, "expanded", !1),
        this.i.ne && (this.j.T(),
        this.j = null))
    }
    ;
    cj.prototype.Nb = function(a, b, c, d, e) {
        b && c && (38 == e.keyCode || 40 == e.keyCode) && (a.G() || this.xb(a, b, c, d),
        a = Array.prototype.slice.call(b.querySelectorAll("." + this.i.ff)),
        b = a.indexOf(document.activeElement),
        b += 40 == e.keyCode ? 1 : -1,
        b = (b + a.length) % a.length,
        a[b].focus(),
        e.preventDefault())
    }
    ;
    var dj = function(a, b) {
        if (!P.contains(b, "btns-init")) {
            for (var c = b.querySelectorAll("." + a.i.ff), d = r(a.ge, a), e = {}, f = 0; f < c.length; e = {
                Jc: e.Jc
            },
            f++)
                e.Jc = c[f],
                function(b) {
                    return function(c) {
                        var e = new ji(c);
                        if (P.contains(c, "sharing-element-link"))
                            ej(a, c),
                            R(e, "key", function(a) {
                                if (32 == a.keyCode || 13 == a.keyCode)
                                    c.click(),
                                    a.preventDefault()
                            });
                        else {
                            var f = function() {
                                eh("ga_social_hooks").then(function(a) {
                                    if (a && (a = b.Jc,
                                    "undefined" !== typeof ga)) {
                                        var c = a.querySelector(".platform-sharing-text")
                                          , c = c ? c.innerText : "Unknown";
                                        a = a.getAttribute("data-url");
                                        ga("blogger.send", {
                                            hitType: "social",
                                            socialNetwork: c,
                                            socialAction: "Share",
                                            socialTarget: a,
                                            transport: "beacon"
                                        })
                                    }
                                });
                                qg(c.getAttribute("data-href"));
                                d();
                                return !1
                            };
                            R(e, "key", function(a) {
                                if (32 == a.keyCode || 13 == a.keyCode)
                                    f(),
                                    a.preventDefault()
                            });
                            R(c, "click", f)
                        }
                    }
                }(e)(e.Jc);
            P.add(b, "btns-init")
        }
    }
      , ej = function(a, b) {
        if (b && "undefined" !== typeof Clipboard && Clipboard) {
            var c = new Clipboard(b,{
                text: function(a) {
                    return a.getAttribute("data-url")
                }
            })
              , d = r(a.ge, a)
              , e = Ug("postUrl") || "Post Link";
            c.on("error", function(a) {
                window.prompt(e, a.trigger.getAttribute("data-url"));
                d();
                return !1
            });
            c.on("success", function() {
                var a = Ug("linkCopiedToClipboard") || "Link copied to clipboard.";
                eh("sharing_get_link_dialog").then(function(b) {
                    if (b && 0 <= gi()) {
                        b = Ug("ok") || "Ok";
                        var c = new Z
                          , e = Hf(document.body, function() {
                            c.C(!1)
                        }, "getlink-dim-overlay");
                        e.show();
                        var f = (new Pi).set(b, b, !0, !0);
                        c.ea = f;
                        c.da && (c.ea ? Ui(c.ea, c.da) : zc(c.da, xc),
                        L(c.da, !!c.ea));
                        c.cf(a);
                        c.me = !1;
                        Ti(c, !1);
                        c.le = !0;
                        1 != c.Ad && Si(c, !0);
                        c.Pb();
                        P.add(Xi(f, b), "flat-button");
                        P.add(c.g(), "dialog");
                        P.add(c.g(), "link-copied-dialog");
                        c.C(!0);
                        R(c, "hide", function() {
                            e.T()
                        })
                    } else
                        n.window.alert(a);
                    d()
                });
                return !1
            })
        } else
            mf(a.a, "Clipboard not initialized.")
    };
    cj.prototype.b = function() {
        this.j && (this.j.T(),
        this.j = null);
        this.tb && Wd(this.tb);
        this.tb = null;
        if (this.Qb)
            for (var a = 0; a < this.Qb.length; a++)
                re(window, "resize", this.Qb[a]);
        this.Qb = null;
        for (var a = document.querySelectorAll(".sharing .share-buttons .sharing-platform-button"), b = 0; b < a.length; b++)
            T(a[b], "click");
        a = document.querySelectorAll(".sharing");
        for (b = 0; b < a.length; b++) {
            var c = I("sharing-button", a[b]);
            T(c, "click")
        }
    }
    ;
    var fj = function() {
        var a = this;
        this.a = O("blogger.templates.responsive.SidebarToggle");
        W(this.a, "Initializing SidebarToggle.");
        try {
            var b = document.querySelector(".sidebar-container");
            if (b) {
                this.Od = b;
                var c = this.Od.parentElement;
                this.j = c && Hf(c, function() {
                    return a.Td()
                });
                (this.Lc = document.querySelector(".sidebar-back")) && R(this.Lc, "click", this.Td, !1, this);
                (this.mc = document.querySelector(".centered-top-container .hamburger-menu")) && R(this.mc, "click", this.Td, !1, this);
                W(this.a, "Finished initializing sidebar toggle.")
            } else
                V(this.a, "There was an error initializing the sidebar toggle section. sidebar not found.")
        } catch (d) {
            V(this.a, "Error initializing sidebar toggle. Uncaught exception.", d),
            this.b()
        }
    };
    fj.prototype.Td = function() {
        hi(this.Od)();
        P.contains(this.Od, "sidebar-invisible") ? (this.j && this.j.Jb(),
        P.remove(document.body, "sidebar-visible")) : (this.j && this.j.show(),
        P.add(document.body, "sidebar-visible"))
    }
    ;
    fj.prototype.b = function() {
        this.mc && T(this.mc, "click");
        this.Lc && T(this.Lc, "click");
        this.j && (this.j.T(),
        this.j = null)
    }
    ;
    var gj = function() {
        this.Cb = "r-snippet-container";
        this.eb = "r-snippetized";
        this.bg = "r-snippet-fade"
    };
    var hj = function(a) {
        var b = this;
        this.a = O("blogger.templates.responsive.Snippets");
        W(this.a, "Initializing Snippets.");
        try {
            this.i = a || new gj,
            this.ia = new Jg(new Ig(this.i.Cb,this.i.eb,function(a, d) {
                return b.Bc(a, d)
            }
            )),
            W(this.a, "Finished initializing Snippets.")
        } catch (c) {
            V(this.a, "Error initializing Snippets. Uncaught exception.", c),
            this.b()
        }
    };
    hj.prototype.Bc = function(a, b) {
        var c = I(this.i.bg, a);
        c && P.enable(c, "hidden", !b)
    }
    ;
    hj.prototype.b = function() {
        this.ia && (this.ia.b(),
        this.ia = null)
    }
    ;
    var ij = function(a) {
        fi.call(this);
        a = a || new Gg;
        W(this.Na, "Initializing indie template.");
        try {
            this.Wc = new Fg(a.Ef);
            this.Nd = new fj;
            this.Jd = new cj;
            this.Pd = new hj;
            new Tg;
            var b = new Lg;
            b.Za = ["collapsed-header-show", "collapsed-header-hide"];
            this.Cc = Sg(b);
            this.Cc.forEach(function(a) {
                return a.$()
            });
            W(this.Na, "Finished initializing indie template.")
        } catch (c) {
            V(this.Na, "Error initializing indie template. Uncaught exception.", c),
            this.b()
        }
    };
    aa(ij, fi);
    ij.prototype.b = function() {
        var a = this;
        return fi.prototype.b.call(this).then(function() {
            a.Wc && a.Wc.b();
            a.Nd && a.Nd.b();
            a.Jd && a.Jd.b();
            a.Pd && a.Pd.b();
            a.Cc && a.Cc.forEach(function(a) {
                return a.b()
            });
            a.Wc = null;
            a.Nd = null;
            a.Jd = null;
            a.Pd = null;
            a.Cc = null
        })
    }
    ;
    (function(a) {
        var b = function() {
            document.body.setAttribute("data-js-state", "loading");
            a();
            document.body.setAttribute("data-js-state", "loaded")
        };
        "loading" != document.readyState ? b() : R(window, "DOMContentLoaded", b)
    }
    )(function() {
        return new ij
    })
}
)();
