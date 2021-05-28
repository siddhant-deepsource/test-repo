!(function (e) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = e();
  else {
    if ("function" == typeof define && define.amd) return define([], e);
    this.CodeMirror = e();
  }
})(function () {
  "use strict";
  function e(r, n) {
    if (!(this instanceof e)) return new e(r, n);
    (this.options = n = n ? Io(n) : {}), Io(_l, n, !1), d(n);
    var i = n.value;
    "string" == typeof i && (i = new ms(i, n.mode)), (this.doc = i);
    var o = new e.inputStyles[n.inputStyle](this),
      l = (this.display = new t(r, i, o));
    (l.wrapper.CodeMirror = this),
      u(this),
      s(this),
      n.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
      n.autofocus && !Sl && l.input.focus(),
      m(this),
      (this.state = {
        keyMaps: [],
        overlays: [],
        modeGen: 0,
        overwrite: !1,
        delayingBlurEvent: !1,
        focused: !1,
        suppressEdits: !1,
        pasteIncoming: !1,
        cutIncoming: !1,
        draggingText: !1,
        highlight: new To(),
        keySeq: null,
        specialChars: null,
      });
    var a = this;
    dl &&
      11 > pl &&
      setTimeout(function () {
        a.display.input.reset(!0);
      }, 20),
      Br(this),
      Xo(),
      yr(this),
      (this.curOp.forceUpdate = !0),
      Xi(this, i),
      (n.autofocus && !Sl) || a.hasFocus()
        ? setTimeout(Po(dn, this), 20)
        : pn(this);
    for (var c in Yl) Yl.hasOwnProperty(c) && Yl[c](this, n[c], $l);
    C(this), n.finishInit && n.finishInit(this);
    for (var f = 0; f < Jl.length; ++f) Jl[f](this);
    wr(this),
      gl &&
        n.lineWrapping &&
        "optimizelegibility" == getComputedStyle(l.lineDiv).textRendering &&
        (l.lineDiv.style.textRendering = "auto");
  }
  function t(e, t, r) {
    var n = this;
    (this.input = r),
      (n.scrollbarFiller = Ro("div", null, "CodeMirror-scrollbar-filler")),
      n.scrollbarFiller.setAttribute("cm-not-content", "true"),
      (n.gutterFiller = Ro("div", null, "CodeMirror-gutter-filler")),
      n.gutterFiller.setAttribute("cm-not-content", "true"),
      (n.lineDiv = Ro("div", null, "CodeMirror-code")),
      (n.selectionDiv = Ro(
        "div",
        null,
        null,
        "position: relative; z-index: 1"
      )),
      (n.cursorDiv = Ro("div", null, "CodeMirror-cursors")),
      (n.measure = Ro("div", null, "CodeMirror-measure")),
      (n.lineMeasure = Ro("div", null, "CodeMirror-measure")),
      (n.lineSpace = Ro(
        "div",
        [n.measure, n.lineMeasure, n.selectionDiv, n.cursorDiv, n.lineDiv],
        null,
        "position: relative; outline: none"
      )),
      (n.mover = Ro(
        "div",
        [Ro("div", [n.lineSpace], "CodeMirror-lines")],
        null,
        "position: relative"
      )),
      (n.sizer = Ro("div", [n.mover], "CodeMirror-sizer")),
      (n.sizerWidth = null),
      (n.heightForcer = Ro(
        "div",
        null,
        null,
        "position: absolute; height: " + Ms + "px; width: 1px;"
      )),
      (n.gutters = Ro("div", null, "CodeMirror-gutters")),
      (n.lineGutter = null),
      (n.scroller = Ro(
        "div",
        [n.sizer, n.heightForcer, n.gutters],
        "CodeMirror-scroll"
      )),
      n.scroller.setAttribute("tabIndex", "-1"),
      (n.wrapper = Ro(
        "div",
        [n.scrollbarFiller, n.gutterFiller, n.scroller],
        "CodeMirror"
      )),
      dl &&
        8 > pl &&
        ((n.gutters.style.zIndex = -1), (n.scroller.style.paddingRight = 0)),
      gl || (cl && Sl) || (n.scroller.draggable = !0),
      e && (e.appendChild ? e.appendChild(n.wrapper) : e(n.wrapper)),
      (n.viewFrom = n.viewTo = t.first),
      (n.reportedViewFrom = n.reportedViewTo = t.first),
      (n.view = []),
      (n.renderedView = null),
      (n.externalMeasured = null),
      (n.viewOffset = 0),
      (n.lastWrapHeight = n.lastWrapWidth = 0),
      (n.updateLineNumbers = null),
      (n.nativeBarWidth = n.barHeight = n.barWidth = 0),
      (n.scrollbarsClipped = !1),
      (n.lineNumWidth = n.lineNumInnerWidth = n.lineNumChars = null),
      (n.alignWidgets = !1),
      (n.cachedCharWidth = n.cachedTextHeight = n.cachedPaddingH = null),
      (n.maxLine = null),
      (n.maxLineLength = 0),
      (n.maxLineChanged = !1),
      (n.wheelDX = n.wheelDY = n.wheelStartX = n.wheelStartY = null),
      (n.shift = !1),
      (n.selForContextMenu = null),
      (n.activeTouch = null),
      r.init(n);
  }
  function r(t) {
    (t.doc.mode = e.getMode(t.options, t.doc.modeOption)), n(t);
  }
  function n(e) {
    e.doc.iter(function (e) {
      e.stateAfter && (e.stateAfter = null), e.styles && (e.styles = null);
    }),
      (e.doc.frontier = e.doc.first),
      zt(e, 100),
      e.state.modeGen++,
      e.curOp && Hr(e);
  }
  function i(e) {
    e.options.lineWrapping
      ? (Vs(e.display.wrapper, "CodeMirror-wrap"),
        (e.display.sizer.style.minWidth = ""),
        (e.display.sizerWidth = null))
      : (Us(e.display.wrapper, "CodeMirror-wrap"), h(e)),
      l(e),
      Hr(e),
      or(e),
      setTimeout(function () {
        y(e);
      }, 100);
  }
  function o(e) {
    var t = vr(e.display),
      r = e.options.lineWrapping,
      n = r && Math.max(5, e.display.scroller.clientWidth / mr(e.display) - 3);
    return function (i) {
      if (yi(e.doc, i)) return 0;
      var o = 0;
      if (i.widgets)
        for (var l = 0; l < i.widgets.length; l++)
          i.widgets[l].height && (o += i.widgets[l].height);
      return r ? o + (Math.ceil(i.text.length / n) || 1) * t : o + t;
    };
  }
  function l(e) {
    var t = e.doc,
      r = o(e);
    t.iter(function (e) {
      var t = r(e);
      t != e.height && qi(e, t);
    });
  }
  function s(e) {
    (e.display.wrapper.className =
      e.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      e.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
      or(e);
  }
  function a(e) {
    u(e),
      Hr(e),
      setTimeout(function () {
        x(e);
      }, 20);
  }
  function u(e) {
    var t = e.display.gutters,
      r = e.options.gutters;
    Bo(t);
    for (var n = 0; n < r.length; ++n) {
      var i = r[n],
        o = t.appendChild(Ro("div", null, "CodeMirror-gutter " + i));
      "CodeMirror-linenumbers" == i &&
        ((e.display.lineGutter = o),
        (o.style.width = (e.display.lineNumWidth || 1) + "px"));
    }
    (t.style.display = n ? "" : "none"), c(e);
  }
  function c(e) {
    var t = e.display.gutters.offsetWidth;
    e.display.sizer.style.marginLeft = t + "px";
  }
  function f(e) {
    if (0 == e.height) return 0;
    for (var t, r = e.text.length, n = e; (t = fi(n)); ) {
      var i = t.find(0, !0);
      (n = i.from.line), (r += i.from.ch - i.to.ch);
    }
    for (n = e; (t = hi(n)); ) {
      var i = t.find(0, !0);
      (r -= n.text.length - i.from.ch),
        (n = i.to.line),
        (r += n.text.length - i.to.ch);
    }
    return r;
  }
  function h(e) {
    var t = e.display,
      r = e.doc;
    (t.maxLine = _i(r, r.first)),
      (t.maxLineLength = f(t.maxLine)),
      (t.maxLineChanged = !0),
      r.iter(function (e) {
        var r = f(e);
        r > t.maxLineLength && ((t.maxLineLength = r), (t.maxLine = e));
      });
  }
  function d(e) {
    var t = Wo(e.gutters, "CodeMirror-linenumbers");
    -1 == t && e.lineNumbers
      ? (e.gutters = e.gutters.concat(["CodeMirror-linenumbers"]))
      : t > -1 &&
        !e.lineNumbers &&
        ((e.gutters = e.gutters.slice(0)), e.gutters.splice(t, 1));
  }
  function p(e) {
    var t = e.display,
      r = t.gutters.offsetWidth,
      n = Math.round(e.doc.height + Ut(e.display));
    return {
      clientHeight: t.scroller.clientHeight,
      viewHeight: t.wrapper.clientHeight,
      scrollWidth: t.scroller.scrollWidth,
      clientWidth: t.scroller.clientWidth,
      viewWidth: t.wrapper.clientWidth,
      barLeft: e.options.fixedGutter ? r : 0,
      docHeight: n,
      scrollHeight: n + Kt(e) + t.barHeight,
      nativeBarWidth: t.nativeBarWidth,
      gutterWidth: r,
    };
  }
  function g(e, t, r) {
    this.cm = r;
    var n = (this.vert = Ro(
        "div",
        [Ro("div", null, null, "min-width: 1px")],
        "CodeMirror-vscrollbar"
      )),
      i = (this.horiz = Ro(
        "div",
        [Ro("div", null, null, "height: 100%; min-height: 1px")],
        "CodeMirror-hscrollbar"
      ));
    e(n),
      e(i),
      Ss(n, "scroll", function () {
        n.clientHeight && t(n.scrollTop, "vertical");
      }),
      Ss(i, "scroll", function () {
        i.clientWidth && t(i.scrollLeft, "horizontal");
      }),
      (this.checkedOverlay = !1),
      dl &&
        8 > pl &&
        (this.horiz.style.minHeight = this.vert.style.minWidth = "18px");
  }
  function v() {}
  function m(t) {
    t.display.scrollbars &&
      (t.display.scrollbars.clear(),
      t.display.scrollbars.addClass &&
        Us(t.display.wrapper, t.display.scrollbars.addClass)),
      (t.display.scrollbars = new e.scrollbarModel[t.options.scrollbarStyle](
        function (e) {
          t.display.wrapper.insertBefore(e, t.display.scrollbarFiller),
            Ss(e, "mousedown", function () {
              t.state.focused &&
                setTimeout(function () {
                  t.display.input.focus();
                }, 0);
            }),
            e.setAttribute("cm-not-content", "true");
        },
        function (e, r) {
          "horizontal" == r ? en(t, e) : Jr(t, e);
        },
        t
      )),
      t.display.scrollbars.addClass &&
        Vs(t.display.wrapper, t.display.scrollbars.addClass);
  }
  function y(e, t) {
    t || (t = p(e));
    var r = e.display.barWidth,
      n = e.display.barHeight;
    b(e, t);
    for (
      var i = 0;
      (4 > i && r != e.display.barWidth) || n != e.display.barHeight;
      i++
    )
      r != e.display.barWidth && e.options.lineWrapping && O(e),
        b(e, p(e)),
        (r = e.display.barWidth),
        (n = e.display.barHeight);
  }
  function b(e, t) {
    var r = e.display,
      n = r.scrollbars.update(t);
    (r.sizer.style.paddingRight = (r.barWidth = n.right) + "px"),
      (r.sizer.style.paddingBottom = (r.barHeight = n.bottom) + "px"),
      n.right && n.bottom
        ? ((r.scrollbarFiller.style.display = "block"),
          (r.scrollbarFiller.style.height = n.bottom + "px"),
          (r.scrollbarFiller.style.width = n.right + "px"))
        : (r.scrollbarFiller.style.display = ""),
      n.bottom && e.options.coverGutterNextToScrollbar && e.options.fixedGutter
        ? ((r.gutterFiller.style.display = "block"),
          (r.gutterFiller.style.height = n.bottom + "px"),
          (r.gutterFiller.style.width = t.gutterWidth + "px"))
        : (r.gutterFiller.style.display = "");
  }
  function w(e, t, r) {
    var n = r && null != r.top ? Math.max(0, r.top) : e.scroller.scrollTop;
    n = Math.floor(n - Gt(e));
    var i = r && null != r.bottom ? r.bottom : n + e.wrapper.clientHeight,
      o = Qi(t, n),
      l = Qi(t, i);
    if (r && r.ensure) {
      var s = r.ensure.from.line,
        a = r.ensure.to.line;
      o > s
        ? ((o = s), (l = Qi(t, Ji(_i(t, s)) + e.wrapper.clientHeight)))
        : Math.min(a, t.lastLine()) >= l &&
          ((o = Qi(t, Ji(_i(t, a)) - e.wrapper.clientHeight)), (l = a));
    }
    return { from: o, to: Math.max(l, o + 1) };
  }
  function x(e) {
    var t = e.display,
      r = t.view;
    if (t.alignWidgets || (t.gutters.firstChild && e.options.fixedGutter)) {
      for (
        var n = L(t) - t.scroller.scrollLeft + e.doc.scrollLeft,
          i = t.gutters.offsetWidth,
          o = n + "px",
          l = 0;
        l < r.length;
        l++
      )
        if (!r[l].hidden) {
          e.options.fixedGutter && r[l].gutter && (r[l].gutter.style.left = o);
          var s = r[l].alignable;
          if (s) for (var a = 0; a < s.length; a++) s[a].style.left = o;
        }
      e.options.fixedGutter && (t.gutters.style.left = n + i + "px");
    }
  }
  function C(e) {
    if (!e.options.lineNumbers) return !1;
    var t = e.doc,
      r = S(e.options, t.first + t.size - 1),
      n = e.display;
    if (r.length != n.lineNumChars) {
      var i = n.measure.appendChild(
          Ro(
            "div",
            [Ro("div", r)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          )
        ),
        o = i.firstChild.offsetWidth,
        l = i.offsetWidth - o;
      return (
        (n.lineGutter.style.width = ""),
        (n.lineNumInnerWidth = Math.max(o, n.lineGutter.offsetWidth - l) + 1),
        (n.lineNumWidth = n.lineNumInnerWidth + l),
        (n.lineNumChars = n.lineNumInnerWidth ? r.length : -1),
        (n.lineGutter.style.width = n.lineNumWidth + "px"),
        c(e),
        !0
      );
    }
    return !1;
  }
  function S(e, t) {
    return String(e.lineNumberFormatter(t + e.firstLineNumber));
  }
  function L(e) {
    return (
      e.scroller.getBoundingClientRect().left -
      e.sizer.getBoundingClientRect().left
    );
  }
  function k(e, t, r) {
    var n = e.display;
    (this.viewport = t),
      (this.visible = w(n, e.doc, t)),
      (this.editorIsHidden = !n.wrapper.offsetWidth),
      (this.wrapperHeight = n.wrapper.clientHeight),
      (this.wrapperWidth = n.wrapper.clientWidth),
      (this.oldDisplayWidth = jt(e)),
      (this.force = r),
      (this.dims = H(e)),
      (this.events = []);
  }
  function T(e) {
    var t = e.display;
    !t.scrollbarsClipped &&
      t.scroller.offsetWidth &&
      ((t.nativeBarWidth = t.scroller.offsetWidth - t.scroller.clientWidth),
      (t.heightForcer.style.height = Kt(e) + "px"),
      (t.sizer.style.marginBottom = -t.nativeBarWidth + "px"),
      (t.sizer.style.borderRightWidth = Kt(e) + "px"),
      (t.scrollbarsClipped = !0));
  }
  function M(e, t) {
    var r = e.display,
      n = e.doc;
    if (t.editorIsHidden) return Pr(e), !1;
    if (
      !t.force &&
      t.visible.from >= r.viewFrom &&
      t.visible.to <= r.viewTo &&
      (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo) &&
      r.renderedView == r.view &&
      0 == Rr(e)
    )
      return !1;
    C(e) && (Pr(e), (t.dims = H(e)));
    var i = n.first + n.size,
      o = Math.max(t.visible.from - e.options.viewportMargin, n.first),
      l = Math.min(i, t.visible.to + e.options.viewportMargin);
    r.viewFrom < o &&
      o - r.viewFrom < 20 &&
      (o = Math.max(n.first, r.viewFrom)),
      r.viewTo > l && r.viewTo - l < 20 && (l = Math.min(i, r.viewTo)),
      Wl && ((o = vi(e.doc, o)), (l = mi(e.doc, l)));
    var s =
      o != r.viewFrom ||
      l != r.viewTo ||
      r.lastWrapHeight != t.wrapperHeight ||
      r.lastWrapWidth != t.wrapperWidth;
    Fr(e, o, l),
      (r.viewOffset = Ji(_i(e.doc, r.viewFrom))),
      (e.display.mover.style.top = r.viewOffset + "px");
    var a = Rr(e);
    if (
      !s &&
      0 == a &&
      !t.force &&
      r.renderedView == r.view &&
      (null == r.updateLineNumbers || r.updateLineNumbers >= r.viewTo)
    )
      return !1;
    var u = Uo();
    return (
      a > 4 && (r.lineDiv.style.display = "none"),
      I(e, r.updateLineNumbers, t.dims),
      a > 4 && (r.lineDiv.style.display = ""),
      (r.renderedView = r.view),
      u && Uo() != u && u.offsetHeight && u.focus(),
      Bo(r.cursorDiv),
      Bo(r.selectionDiv),
      (r.gutters.style.height = 0),
      s &&
        ((r.lastWrapHeight = t.wrapperHeight),
        (r.lastWrapWidth = t.wrapperWidth),
        zt(e, 400)),
      (r.updateLineNumbers = null),
      !0
    );
  }
  function A(e, t) {
    for (
      var r = t.viewport, n = !0;
      ((n && e.options.lineWrapping && t.oldDisplayWidth != jt(e)) ||
        (r &&
          null != r.top &&
          (r = { top: Math.min(e.doc.height + Ut(e.display) - Xt(e), r.top) }),
        (t.visible = w(e.display, e.doc, r)),
        !(
          t.visible.from >= e.display.viewFrom &&
          t.visible.to <= e.display.viewTo
        ))) &&
      M(e, t);
      n = !1
    ) {
      O(e);
      var i = p(e);
      Dt(e), W(e, i), y(e, i);
    }
    t.signal(e, "update", e),
      (e.display.viewFrom != e.display.reportedViewFrom ||
        e.display.viewTo != e.display.reportedViewTo) &&
        (t.signal(e, "viewportChange", e, e.display.viewFrom, e.display.viewTo),
        (e.display.reportedViewFrom = e.display.viewFrom),
        (e.display.reportedViewTo = e.display.viewTo));
  }
  function N(e, t) {
    var r = new k(e, t);
    if (M(e, r)) {
      O(e), A(e, r);
      var n = p(e);
      Dt(e), W(e, n), y(e, n), r.finish();
    }
  }
  function W(e, t) {
    e.display.sizer.style.minHeight = t.docHeight + "px";
    var r = t.docHeight + e.display.barHeight;
    (e.display.heightForcer.style.top = r + "px"),
      (e.display.gutters.style.height =
        Math.max(r + Kt(e), t.clientHeight) + "px");
  }
  function O(e) {
    for (
      var t = e.display, r = t.lineDiv.offsetTop, n = 0;
      n < t.view.length;
      n++
    ) {
      var i,
        o = t.view[n];
      if (!o.hidden) {
        if (dl && 8 > pl) {
          var l = o.node.offsetTop + o.node.offsetHeight;
          (i = l - r), (r = l);
        } else {
          var s = o.node.getBoundingClientRect();
          i = s.bottom - s.top;
        }
        var a = o.line.height - i;
        if (
          (2 > i && (i = vr(t)),
          (a > 0.001 || -0.001 > a) && (qi(o.line, i), D(o.line), o.rest))
        )
          for (var u = 0; u < o.rest.length; u++) D(o.rest[u]);
      }
    }
  }
  function D(e) {
    if (e.widgets)
      for (var t = 0; t < e.widgets.length; ++t)
        e.widgets[t].height = e.widgets[t].node.offsetHeight;
  }
  function H(e) {
    for (
      var t = e.display,
        r = {},
        n = {},
        i = t.gutters.clientLeft,
        o = t.gutters.firstChild,
        l = 0;
      o;
      o = o.nextSibling, ++l
    )
      (r[e.options.gutters[l]] = o.offsetLeft + o.clientLeft + i),
        (n[e.options.gutters[l]] = o.clientWidth);
    return {
      fixedPos: L(t),
      gutterTotalWidth: t.gutters.offsetWidth,
      gutterLeft: r,
      gutterWidth: n,
      wrapperWidth: t.wrapper.clientWidth,
    };
  }
  function I(e, t, r) {
    function n(t) {
      var r = t.nextSibling;
      return (
        gl && Ll && e.display.currentWheelTarget == t
          ? (t.style.display = "none")
          : t.parentNode.removeChild(t),
        r
      );
    }
    for (
      var i = e.display,
        o = e.options.lineNumbers,
        l = i.lineDiv,
        s = l.firstChild,
        a = i.view,
        u = i.viewFrom,
        c = 0;
      c < a.length;
      c++
    ) {
      var f = a[c];
      if (f.hidden);
      else if (f.node && f.node.parentNode == l) {
        for (; s != f.node; ) s = n(s);
        var h = o && null != t && u >= t && f.lineNumber;
        f.changes && (Wo(f.changes, "gutter") > -1 && (h = !1), P(e, f, u, r)),
          h &&
            (Bo(f.lineNumber),
            f.lineNumber.appendChild(document.createTextNode(S(e.options, u)))),
          (s = f.node.nextSibling);
      } else {
        var d = V(e, f, u, r);
        l.insertBefore(d, s);
      }
      u += f.size;
    }
    for (; s; ) s = n(s);
  }
  function P(e, t, r, n) {
    for (var i = 0; i < t.changes.length; i++) {
      var o = t.changes[i];
      "text" == o
        ? R(e, t)
        : "gutter" == o
        ? G(e, t, r, n)
        : "class" == o
        ? B(t)
        : "widget" == o && U(e, t, n);
    }
    t.changes = null;
  }
  function E(e) {
    return (
      e.node == e.text &&
        ((e.node = Ro("div", null, null, "position: relative")),
        e.text.parentNode && e.text.parentNode.replaceChild(e.node, e.text),
        e.node.appendChild(e.text),
        dl && 8 > pl && (e.node.style.zIndex = 2)),
      e.node
    );
  }
  function z(e) {
    var t = e.bgClass
      ? e.bgClass + " " + (e.line.bgClass || "")
      : e.line.bgClass;
    if ((t && (t += " CodeMirror-linebackground"), e.background))
      t
        ? (e.background.className = t)
        : (e.background.parentNode.removeChild(e.background),
          (e.background = null));
    else if (t) {
      var r = E(e);
      e.background = r.insertBefore(Ro("div", null, t), r.firstChild);
    }
  }
  function F(e, t) {
    var r = e.display.externalMeasured;
    return r && r.line == t.line
      ? ((e.display.externalMeasured = null), (t.measure = r.measure), r.built)
      : Ii(e, t);
  }
  function R(e, t) {
    var r = t.text.className,
      n = F(e, t);
    t.text == t.node && (t.node = n.pre),
      t.text.parentNode.replaceChild(n.pre, t.text),
      (t.text = n.pre),
      n.bgClass != t.bgClass || n.textClass != t.textClass
        ? ((t.bgClass = n.bgClass), (t.textClass = n.textClass), B(t))
        : r && (t.text.className = r);
  }
  function B(e) {
    z(e),
      e.line.wrapClass
        ? (E(e).className = e.line.wrapClass)
        : e.node != e.text && (e.node.className = "");
    var t = e.textClass
      ? e.textClass + " " + (e.line.textClass || "")
      : e.line.textClass;
    e.text.className = t || "";
  }
  function G(e, t, r, n) {
    t.gutter && (t.node.removeChild(t.gutter), (t.gutter = null));
    var i = t.line.gutterMarkers;
    if (e.options.lineNumbers || i) {
      var o = E(t),
        l = (t.gutter = Ro(
          "div",
          null,
          "CodeMirror-gutter-wrapper",
          "left: " +
            (e.options.fixedGutter ? n.fixedPos : -n.gutterTotalWidth) +
            "px; width: " +
            n.gutterTotalWidth +
            "px"
        ));
      if (
        (e.display.input.setUneditable(l),
        o.insertBefore(l, t.text),
        t.line.gutterClass && (l.className += " " + t.line.gutterClass),
        !e.options.lineNumbers ||
          (i && i["CodeMirror-linenumbers"]) ||
          (t.lineNumber = l.appendChild(
            Ro(
              "div",
              S(e.options, r),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " +
                n.gutterLeft["CodeMirror-linenumbers"] +
                "px; width: " +
                e.display.lineNumInnerWidth +
                "px"
            )
          )),
        i)
      )
        for (var s = 0; s < e.options.gutters.length; ++s) {
          var a = e.options.gutters[s],
            u = i.hasOwnProperty(a) && i[a];
          u &&
            l.appendChild(
              Ro(
                "div",
                [u],
                "CodeMirror-gutter-elt",
                "left: " +
                  n.gutterLeft[a] +
                  "px; width: " +
                  n.gutterWidth[a] +
                  "px"
              )
            );
        }
    }
  }
  function U(e, t, r) {
    t.alignable && (t.alignable = null);
    for (var n, i = t.node.firstChild; i; i = n) {
      var n = i.nextSibling;
      "CodeMirror-linewidget" == i.className && t.node.removeChild(i);
    }
    K(e, t, r);
  }
  function V(e, t, r, n) {
    var i = F(e, t);
    return (
      (t.text = t.node = i.pre),
      i.bgClass && (t.bgClass = i.bgClass),
      i.textClass && (t.textClass = i.textClass),
      B(t),
      G(e, t, r, n),
      K(e, t, n),
      t.node
    );
  }
  function K(e, t, r) {
    if ((j(e, t.line, t, r, !0), t.rest))
      for (var n = 0; n < t.rest.length; n++) j(e, t.rest[n], t, r, !1);
  }
  function j(e, t, r, n, i) {
    if (t.widgets)
      for (var o = E(r), l = 0, s = t.widgets; l < s.length; ++l) {
        var a = s[l],
          u = Ro("div", [a.node], "CodeMirror-linewidget");
        a.handleMouseEvents || u.setAttribute("cm-ignore-events", "true"),
          X(a, u, r, n),
          e.display.input.setUneditable(u),
          i && a.above
            ? o.insertBefore(u, r.gutter || r.text)
            : o.appendChild(u),
          wo(a, "redraw");
      }
  }
  function X(e, t, r, n) {
    if (e.noHScroll) {
      (r.alignable || (r.alignable = [])).push(t);
      var i = n.wrapperWidth;
      (t.style.left = n.fixedPos + "px"),
        e.coverGutter ||
          ((i -= n.gutterTotalWidth),
          (t.style.paddingLeft = n.gutterTotalWidth + "px")),
        (t.style.width = i + "px");
    }
    e.coverGutter &&
      ((t.style.zIndex = 5),
      (t.style.position = "relative"),
      e.noHScroll || (t.style.marginLeft = -n.gutterTotalWidth + "px"));
  }
  function _(e) {
    return Ol(e.line, e.ch);
  }
  function Y(e, t) {
    return Dl(e, t) < 0 ? t : e;
  }
  function $(e, t) {
    return Dl(e, t) < 0 ? e : t;
  }
  function q(e) {
    e.state.focused || (e.display.input.focus(), dn(e));
  }
  function Z(e) {
    return e.options.readOnly || e.doc.cantEdit;
  }
  function Q(e, t, r, n, i) {
    var o = e.doc;
    (e.display.shift = !1), n || (n = o.sel);
    var l = Xs(t),
      s = null;
    e.state.pasteIncoming &&
      n.ranges.length > 1 &&
      (Hl && Hl.join("\n") == t
        ? (s = n.ranges.length % Hl.length == 0 && Oo(Hl, Xs))
        : l.length == n.ranges.length &&
          (s = Oo(l, function (e) {
            return [e];
          })));
    for (var a = n.ranges.length - 1; a >= 0; a--) {
      var u = n.ranges[a],
        c = u.from(),
        f = u.to();
      u.empty() &&
        (r && r > 0
          ? (c = Ol(c.line, c.ch - r))
          : e.state.overwrite &&
            !e.state.pasteIncoming &&
            (f = Ol(
              f.line,
              Math.min(_i(o, f.line).text.length, f.ch + No(l).length)
            )));
      var h = e.curOp.updateInput,
        d = {
          from: c,
          to: f,
          text: s ? s[a % s.length] : l,
          origin:
            i ||
            (e.state.pasteIncoming
              ? "paste"
              : e.state.cutIncoming
              ? "cut"
              : "+input"),
        };
      Cn(e.doc, d), wo(e, "inputRead", e, d);
    }
    t && !e.state.pasteIncoming && J(e, t),
      In(e),
      (e.curOp.updateInput = h),
      (e.curOp.typing = !0),
      (e.state.pasteIncoming = e.state.cutIncoming = !1);
  }
  function J(e, t) {
    if (e.options.electricChars && e.options.smartIndent)
      for (var r = e.doc.sel, n = r.ranges.length - 1; n >= 0; n--) {
        var i = r.ranges[n];
        if (
          !(i.head.ch > 100 || (n && r.ranges[n - 1].head.line == i.head.line))
        ) {
          var o = e.getModeAt(i.head),
            l = !1;
          if (o.electricChars) {
            for (var s = 0; s < o.electricChars.length; s++)
              if (t.indexOf(o.electricChars.charAt(s)) > -1) {
                l = En(e, i.head.line, "smart");
                break;
              }
          } else
            o.electricInput &&
              o.electricInput.test(
                _i(e.doc, i.head.line).text.slice(0, i.head.ch)
              ) &&
              (l = En(e, i.head.line, "smart"));
          l && wo(e, "electricInput", e, i.head.line);
        }
      }
  }
  function et(e) {
    for (var t = [], r = [], n = 0; n < e.doc.sel.ranges.length; n++) {
      var i = e.doc.sel.ranges[n].head.line,
        o = { anchor: Ol(i, 0), head: Ol(i + 1, 0) };
      r.push(o), t.push(e.getRange(o.anchor, o.head));
    }
    return { text: t, ranges: r };
  }
  function tt(e) {
    e.setAttribute("autocorrect", "off"),
      e.setAttribute("autocapitalize", "off"),
      e.setAttribute("spellcheck", "false");
  }
  function rt(e) {
    (this.cm = e),
      (this.prevInput = ""),
      (this.pollingFast = !1),
      (this.polling = new To()),
      (this.inaccurateSelection = !1),
      (this.hasSelection = !1),
      (this.composing = null);
  }
  function nt() {
    var e = Ro(
        "textarea",
        null,
        null,
        "position: absolute; padding: 0; width: 1px; height: 1em; outline: none"
      ),
      t = Ro(
        "div",
        [e],
        null,
        "overflow: hidden; position: relative; width: 3px; height: 0px;"
      );
    return (
      gl ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
      Cl && (e.style.border = "1px solid black"),
      tt(e),
      t
    );
  }
  function it(e) {
    (this.cm = e),
      (this.lastAnchorNode =
        this.lastAnchorOffset =
        this.lastFocusNode =
        this.lastFocusOffset =
          null),
      (this.polling = new To()),
      (this.gracePeriod = !1);
  }
  function ot(e, t) {
    var r = Zt(e, t.line);
    if (!r || r.hidden) return null;
    var n = _i(e.doc, t.line),
      i = Yt(r, n, t.line),
      o = eo(n),
      l = "left";
    if (o) {
      var s = ll(o, t.ch);
      l = s % 2 ? "right" : "left";
    }
    var a = er(i.map, t.ch, l);
    return (a.offset = "right" == a.collapse ? a.end : a.start), a;
  }
  function lt(e, t) {
    return t && (e.bad = !0), e;
  }
  function st(e, t, r) {
    var n;
    if (t == e.display.lineDiv) {
      if (((n = e.display.lineDiv.childNodes[r]), !n))
        return lt(e.clipPos(Ol(e.display.viewTo - 1)), !0);
      (t = null), (r = 0);
    } else
      for (n = t; ; n = n.parentNode) {
        if (!n || n == e.display.lineDiv) return null;
        if (n.parentNode && n.parentNode == e.display.lineDiv) break;
      }
    for (var i = 0; i < e.display.view.length; i++) {
      var o = e.display.view[i];
      if (o.node == n) return at(o, t, r);
    }
  }
  function at(e, t, r) {
    function n(t, r, n) {
      for (var i = -1; i < (c ? c.length : 0); i++)
        for (var o = 0 > i ? u.map : c[i], l = 0; l < o.length; l += 3) {
          var s = o[l + 2];
          if (s == t || s == r) {
            var a = Zi(0 > i ? e.line : e.rest[i]),
              f = o[l] + n;
            return (0 > n || s != t) && (f = o[l + (n ? 1 : 0)]), Ol(a, f);
          }
        }
    }
    var i = e.text.firstChild,
      o = !1;
    if (!t || !Rs(i, t)) return lt(Ol(Zi(e.line), 0), !0);
    if (t == i && ((o = !0), (t = i.childNodes[r]), (r = 0), !t)) {
      var l = e.rest ? No(e.rest) : e.line;
      return lt(Ol(Zi(l), l.text.length), o);
    }
    var s = 3 == t.nodeType ? t : null,
      a = t;
    for (
      s ||
      1 != t.childNodes.length ||
      3 != t.firstChild.nodeType ||
      ((s = t.firstChild), r && (r = s.nodeValue.length));
      a.parentNode != i;

    )
      a = a.parentNode;
    var u = e.measure,
      c = u.maps,
      f = n(s, a, r);
    if (f) return lt(f, o);
    for (
      var h = a.nextSibling, d = s ? s.nodeValue.length - r : 0;
      h;
      h = h.nextSibling
    ) {
      if ((f = n(h, h.firstChild, 0))) return lt(Ol(f.line, f.ch - d), o);
      d += h.textContent.length;
    }
    for (var p = a.previousSibling, d = r; p; p = p.previousSibling) {
      if ((f = n(p, p.firstChild, -1))) return lt(Ol(f.line, f.ch + d), o);
      d += h.textContent.length;
    }
  }
  function ut(e, t, r, n, i) {
    function o(e) {
      return function (t) {
        return t.id == e;
      };
    }
    function l(t) {
      if (1 == t.nodeType) {
        var r = t.getAttribute("cm-text");
        if (null != r)
          return (
            "" == r && (r = t.textContent.replace(/\u200b/g, "")), void (s += r)
          );
        var u,
          c = t.getAttribute("cm-marker");
        if (c) {
          var f = e.findMarks(Ol(n, 0), Ol(i + 1, 0), o(+c));
          return void (
            f.length &&
            (u = f[0].find()) &&
            (s += Yi(e.doc, u.from, u.to).join("\n"))
          );
        }
        if ("false" == t.getAttribute("contenteditable")) return;
        for (var h = 0; h < t.childNodes.length; h++) l(t.childNodes[h]);
        /^(pre|div|p)$/i.test(t.nodeName) && (a = !0);
      } else if (3 == t.nodeType) {
        var d = t.nodeValue;
        if (!d) return;
        a && ((s += "\n"), (a = !1)), (s += d);
      }
    }
    for (var s = "", a = !1; l(t), t != r; ) t = t.nextSibling;
    return s;
  }
  function ct(e, t) {
    (this.ranges = e), (this.primIndex = t);
  }
  function ft(e, t) {
    (this.anchor = e), (this.head = t);
  }
  function ht(e, t) {
    var r = e[t];
    e.sort(function (e, t) {
      return Dl(e.from(), t.from());
    }),
      (t = Wo(e, r));
    for (var n = 1; n < e.length; n++) {
      var i = e[n],
        o = e[n - 1];
      if (Dl(o.to(), i.from()) >= 0) {
        var l = $(o.from(), i.from()),
          s = Y(o.to(), i.to()),
          a = o.empty() ? i.from() == i.head : o.from() == o.head;
        t >= n && --t, e.splice(--n, 2, new ft(a ? s : l, a ? l : s));
      }
    }
    return new ct(e, t);
  }
  function dt(e, t) {
    return new ct([new ft(e, t || e)], 0);
  }
  function pt(e, t) {
    return Math.max(e.first, Math.min(t, e.first + e.size - 1));
  }
  function gt(e, t) {
    if (t.line < e.first) return Ol(e.first, 0);
    var r = e.first + e.size - 1;
    return t.line > r
      ? Ol(r, _i(e, r).text.length)
      : vt(t, _i(e, t.line).text.length);
  }
  function vt(e, t) {
    var r = e.ch;
    return null == r || r > t ? Ol(e.line, t) : 0 > r ? Ol(e.line, 0) : e;
  }
  function mt(e, t) {
    return t >= e.first && t < e.first + e.size;
  }
  function yt(e, t) {
    for (var r = [], n = 0; n < t.length; n++) r[n] = gt(e, t[n]);
    return r;
  }
  function bt(e, t, r, n) {
    if ((e.cm && e.cm.display.shift) || e.extend) {
      var i = t.anchor;
      if (n) {
        var o = Dl(r, i) < 0;
        o != Dl(n, i) < 0 ? ((i = r), (r = n)) : o != Dl(r, n) < 0 && (r = n);
      }
      return new ft(i, r);
    }
    return new ft(n || r, r);
  }
  function wt(e, t, r, n) {
    Tt(e, new ct([bt(e, e.sel.primary(), t, r)], 0), n);
  }
  function xt(e, t, r) {
    for (var n = [], i = 0; i < e.sel.ranges.length; i++)
      n[i] = bt(e, e.sel.ranges[i], t[i], null);
    var o = ht(n, e.sel.primIndex);
    Tt(e, o, r);
  }
  function Ct(e, t, r, n) {
    var i = e.sel.ranges.slice(0);
    (i[t] = r), Tt(e, ht(i, e.sel.primIndex), n);
  }
  function St(e, t, r, n) {
    Tt(e, dt(t, r), n);
  }
  function Lt(e, t) {
    var r = {
      ranges: t.ranges,
      update: function (t) {
        this.ranges = [];
        for (var r = 0; r < t.length; r++)
          this.ranges[r] = new ft(gt(e, t[r].anchor), gt(e, t[r].head));
      },
    };
    return (
      ks(e, "beforeSelectionChange", e, r),
      e.cm && ks(e.cm, "beforeSelectionChange", e.cm, r),
      r.ranges != t.ranges ? ht(r.ranges, r.ranges.length - 1) : t
    );
  }
  function kt(e, t, r) {
    var n = e.history.done,
      i = No(n);
    i && i.ranges ? ((n[n.length - 1] = t), Mt(e, t, r)) : Tt(e, t, r);
  }
  function Tt(e, t, r) {
    Mt(e, t, r), so(e, e.sel, e.cm ? e.cm.curOp.id : 0 / 0, r);
  }
  function Mt(e, t, r) {
    (Lo(e, "beforeSelectionChange") ||
      (e.cm && Lo(e.cm, "beforeSelectionChange"))) &&
      (t = Lt(e, t));
    var n =
      (r && r.bias) ||
      (Dl(t.primary().head, e.sel.primary().head) < 0 ? -1 : 1);
    At(e, Wt(e, t, n, !0)), (r && r.scroll === !1) || !e.cm || In(e.cm);
  }
  function At(e, t) {
    t.equals(e.sel) ||
      ((e.sel = t),
      e.cm &&
        ((e.cm.curOp.updateInput = e.cm.curOp.selectionChanged = !0), So(e.cm)),
      wo(e, "cursorActivity", e));
  }
  function Nt(e) {
    At(e, Wt(e, e.sel, null, !1), Ns);
  }
  function Wt(e, t, r, n) {
    for (var i, o = 0; o < t.ranges.length; o++) {
      var l = t.ranges[o],
        s = Ot(e, l.anchor, r, n),
        a = Ot(e, l.head, r, n);
      (i || s != l.anchor || a != l.head) &&
        (i || (i = t.ranges.slice(0, o)), (i[o] = new ft(s, a)));
    }
    return i ? ht(i, t.primIndex) : t;
  }
  function Ot(e, t, r, n) {
    var i = !1,
      o = t,
      l = r || 1;
    e.cantEdit = !1;
    e: for (;;) {
      var s = _i(e, o.line);
      if (s.markedSpans)
        for (var a = 0; a < s.markedSpans.length; ++a) {
          var u = s.markedSpans[a],
            c = u.marker;
          if (
            (null == u.from ||
              (c.inclusiveLeft ? u.from <= o.ch : u.from < o.ch)) &&
            (null == u.to || (c.inclusiveRight ? u.to >= o.ch : u.to > o.ch))
          ) {
            if (n && (ks(c, "beforeCursorEnter"), c.explicitlyCleared)) {
              if (s.markedSpans) {
                --a;
                continue;
              }
              break;
            }
            if (!c.atomic) continue;
            var f = c.find(0 > l ? -1 : 1);
            if (
              0 == Dl(f, o) &&
              ((f.ch += l),
              f.ch < 0
                ? (f = f.line > e.first ? gt(e, Ol(f.line - 1)) : null)
                : f.ch > s.text.length &&
                  (f =
                    f.line < e.first + e.size - 1 ? Ol(f.line + 1, 0) : null),
              !f)
            ) {
              if (i)
                return n
                  ? ((e.cantEdit = !0), Ol(e.first, 0))
                  : Ot(e, t, r, !0);
              (i = !0), (f = t), (l = -l);
            }
            o = f;
            continue e;
          }
        }
      return o;
    }
  }
  function Dt(e) {
    e.display.input.showSelection(e.display.input.prepareSelection());
  }
  function Ht(e, t) {
    for (
      var r = e.doc,
        n = {},
        i = (n.cursors = document.createDocumentFragment()),
        o = (n.selection = document.createDocumentFragment()),
        l = 0;
      l < r.sel.ranges.length;
      l++
    )
      if (t !== !1 || l != r.sel.primIndex) {
        var s = r.sel.ranges[l],
          a = s.empty();
        (a || e.options.showCursorWhenSelecting) && It(e, s, i),
          a || Pt(e, s, o);
      }
    return n;
  }
  function It(e, t, r) {
    var n = fr(
        e,
        t.head,
        "div",
        null,
        null,
        !e.options.singleCursorHeightPerLine
      ),
      i = r.appendChild(Ro("div", " ", "CodeMirror-cursor"));
    if (
      ((i.style.left = n.left + "px"),
      (i.style.top = n.top + "px"),
      (i.style.height =
        Math.max(0, n.bottom - n.top) * e.options.cursorHeight + "px"),
      n.other)
    ) {
      var o = r.appendChild(
        Ro("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor")
      );
      (o.style.display = ""),
        (o.style.left = n.other.left + "px"),
        (o.style.top = n.other.top + "px"),
        (o.style.height = 0.85 * (n.other.bottom - n.other.top) + "px");
    }
  }
  function Pt(e, t, r) {
    function n(e, t, r, n) {
      0 > t && (t = 0),
        (t = Math.round(t)),
        (n = Math.round(n)),
        s.appendChild(
          Ro(
            "div",
            null,
            "CodeMirror-selected",
            "position: absolute; left: " +
              e +
              "px; top: " +
              t +
              "px; width: " +
              (null == r ? c - e : r) +
              "px; height: " +
              (n - t) +
              "px"
          )
        );
    }
    function i(t, r, i) {
      function o(r, n) {
        return cr(e, Ol(t, r), "div", f, n);
      }
      var s,
        a,
        f = _i(l, t),
        h = f.text.length;
      return (
        Zo(eo(f), r || 0, null == i ? h : i, function (e, t, l) {
          var f,
            d,
            p,
            g = o(e, "left");
          if (e == t) (f = g), (d = p = g.left);
          else {
            if (((f = o(t - 1, "right")), "rtl" == l)) {
              var v = g;
              (g = f), (f = v);
            }
            (d = g.left), (p = f.right);
          }
          null == r && 0 == e && (d = u),
            f.top - g.top > 3 &&
              (n(d, g.top, null, g.bottom),
              (d = u),
              g.bottom < f.top && n(d, g.bottom, null, f.top)),
            null == i && t == h && (p = c),
            (!s || g.top < s.top || (g.top == s.top && g.left < s.left)) &&
              (s = g),
            (!a ||
              f.bottom > a.bottom ||
              (f.bottom == a.bottom && f.right > a.right)) &&
              (a = f),
            u + 1 > d && (d = u),
            n(d, f.top, p - d, f.bottom);
        }),
        { start: s, end: a }
      );
    }
    var o = e.display,
      l = e.doc,
      s = document.createDocumentFragment(),
      a = Vt(e.display),
      u = a.left,
      c = Math.max(o.sizerWidth, jt(e) - o.sizer.offsetLeft) - a.right,
      f = t.from(),
      h = t.to();
    if (f.line == h.line) i(f.line, f.ch, h.ch);
    else {
      var d = _i(l, f.line),
        p = _i(l, h.line),
        g = pi(d) == pi(p),
        v = i(f.line, f.ch, g ? d.text.length + 1 : null).end,
        m = i(h.line, g ? 0 : null, h.ch).start;
      g &&
        (v.top < m.top - 2
          ? (n(v.right, v.top, null, v.bottom), n(u, m.top, m.left, m.bottom))
          : n(v.right, v.top, m.left - v.right, v.bottom)),
        v.bottom < m.top && n(u, v.bottom, null, m.top);
    }
    r.appendChild(s);
  }
  function Et(e) {
    if (e.state.focused) {
      var t = e.display;
      clearInterval(t.blinker);
      var r = !0;
      (t.cursorDiv.style.visibility = ""),
        e.options.cursorBlinkRate > 0
          ? (t.blinker = setInterval(function () {
              t.cursorDiv.style.visibility = (r = !r) ? "" : "hidden";
            }, e.options.cursorBlinkRate))
          : e.options.cursorBlinkRate < 0 &&
            (t.cursorDiv.style.visibility = "hidden");
    }
  }
  function zt(e, t) {
    e.doc.mode.startState &&
      e.doc.frontier < e.display.viewTo &&
      e.state.highlight.set(t, Po(Ft, e));
  }
  function Ft(e) {
    var t = e.doc;
    if (
      (t.frontier < t.first && (t.frontier = t.first),
      !(t.frontier >= e.display.viewTo))
    ) {
      var r = +new Date() + e.options.workTime,
        n = ts(t.mode, Bt(e, t.frontier)),
        i = [];
      t.iter(
        t.frontier,
        Math.min(t.first + t.size, e.display.viewTo + 500),
        function (o) {
          if (t.frontier >= e.display.viewFrom) {
            var l = o.styles,
              s = Wi(e, o, n, !0);
            o.styles = s.styles;
            var a = o.styleClasses,
              u = s.classes;
            u ? (o.styleClasses = u) : a && (o.styleClasses = null);
            for (
              var c =
                  !l ||
                  l.length != o.styles.length ||
                  (a != u &&
                    (!a ||
                      !u ||
                      a.bgClass != u.bgClass ||
                      a.textClass != u.textClass)),
                f = 0;
              !c && f < l.length;
              ++f
            )
              c = l[f] != o.styles[f];
            c && i.push(t.frontier), (o.stateAfter = ts(t.mode, n));
          } else
            Di(e, o.text, n),
              (o.stateAfter = t.frontier % 5 == 0 ? ts(t.mode, n) : null);
          return (
            ++t.frontier,
            +new Date() > r ? (zt(e, e.options.workDelay), !0) : void 0
          );
        }
      ),
        i.length &&
          Mr(e, function () {
            for (var t = 0; t < i.length; t++) Ir(e, i[t], "text");
          });
    }
  }
  function Rt(e, t, r) {
    for (
      var n,
        i,
        o = e.doc,
        l = r ? -1 : t - (e.doc.mode.innerMode ? 1e3 : 100),
        s = t;
      s > l;
      --s
    ) {
      if (s <= o.first) return o.first;
      var a = _i(o, s - 1);
      if (a.stateAfter && (!r || s <= o.frontier)) return s;
      var u = Ds(a.text, null, e.options.tabSize);
      (null == i || n > u) && ((i = s - 1), (n = u));
    }
    return i;
  }
  function Bt(e, t, r) {
    var n = e.doc,
      i = e.display;
    if (!n.mode.startState) return !0;
    var o = Rt(e, t, r),
      l = o > n.first && _i(n, o - 1).stateAfter;
    return (
      (l = l ? ts(n.mode, l) : rs(n.mode)),
      n.iter(o, t, function (r) {
        Di(e, r.text, l);
        var s = o == t - 1 || o % 5 == 0 || (o >= i.viewFrom && o < i.viewTo);
        (r.stateAfter = s ? ts(n.mode, l) : null), ++o;
      }),
      r && (n.frontier = o),
      l
    );
  }
  function Gt(e) {
    return e.lineSpace.offsetTop;
  }
  function Ut(e) {
    return e.mover.offsetHeight - e.lineSpace.offsetHeight;
  }
  function Vt(e) {
    if (e.cachedPaddingH) return e.cachedPaddingH;
    var t = Go(e.measure, Ro("pre", "x")),
      r = window.getComputedStyle ? window.getComputedStyle(t) : t.currentStyle,
      n = { left: parseInt(r.paddingLeft), right: parseInt(r.paddingRight) };
    return isNaN(n.left) || isNaN(n.right) || (e.cachedPaddingH = n), n;
  }
  function Kt(e) {
    return Ms - e.display.nativeBarWidth;
  }
  function jt(e) {
    return e.display.scroller.clientWidth - Kt(e) - e.display.barWidth;
  }
  function Xt(e) {
    return e.display.scroller.clientHeight - Kt(e) - e.display.barHeight;
  }
  function _t(e, t, r) {
    var n = e.options.lineWrapping,
      i = n && jt(e);
    if (!t.measure.heights || (n && t.measure.width != i)) {
      var o = (t.measure.heights = []);
      if (n) {
        t.measure.width = i;
        for (
          var l = t.text.firstChild.getClientRects(), s = 0;
          s < l.length - 1;
          s++
        ) {
          var a = l[s],
            u = l[s + 1];
          Math.abs(a.bottom - u.bottom) > 2 &&
            o.push((a.bottom + u.top) / 2 - r.top);
        }
      }
      o.push(r.bottom - r.top);
    }
  }
  function Yt(e, t, r) {
    if (e.line == t) return { map: e.measure.map, cache: e.measure.cache };
    for (var n = 0; n < e.rest.length; n++)
      if (e.rest[n] == t)
        return { map: e.measure.maps[n], cache: e.measure.caches[n] };
    for (var n = 0; n < e.rest.length; n++)
      if (Zi(e.rest[n]) > r)
        return {
          map: e.measure.maps[n],
          cache: e.measure.caches[n],
          before: !0,
        };
  }
  function $t(e, t) {
    t = pi(t);
    var r = Zi(t),
      n = (e.display.externalMeasured = new Or(e.doc, t, r));
    n.lineN = r;
    var i = (n.built = Ii(e, n));
    return (n.text = i.pre), Go(e.display.lineMeasure, i.pre), n;
  }
  function qt(e, t, r, n) {
    return Jt(e, Qt(e, t), r, n);
  }
  function Zt(e, t) {
    if (t >= e.display.viewFrom && t < e.display.viewTo)
      return e.display.view[Er(e, t)];
    var r = e.display.externalMeasured;
    return r && t >= r.lineN && t < r.lineN + r.size ? r : void 0;
  }
  function Qt(e, t) {
    var r = Zi(t),
      n = Zt(e, r);
    n && !n.text ? (n = null) : n && n.changes && P(e, n, r, H(e)),
      n || (n = $t(e, t));
    var i = Yt(n, t, r);
    return {
      line: t,
      view: n,
      rect: null,
      map: i.map,
      cache: i.cache,
      before: i.before,
      hasHeights: !1,
    };
  }
  function Jt(e, t, r, n, i) {
    t.before && (r = -1);
    var o,
      l = r + (n || "");
    return (
      t.cache.hasOwnProperty(l)
        ? (o = t.cache[l])
        : (t.rect || (t.rect = t.view.text.getBoundingClientRect()),
          t.hasHeights || (_t(e, t.view, t.rect), (t.hasHeights = !0)),
          (o = tr(e, t, r, n)),
          o.bogus || (t.cache[l] = o)),
      {
        left: o.left,
        right: o.right,
        top: i ? o.rtop : o.top,
        bottom: i ? o.rbottom : o.bottom,
      }
    );
  }
  function er(e, t, r) {
    for (var n, i, o, l, s = 0; s < e.length; s += 3) {
      var a = e[s],
        u = e[s + 1];
      if (
        (a > t
          ? ((i = 0), (o = 1), (l = "left"))
          : u > t
          ? ((i = t - a), (o = i + 1))
          : (s == e.length - 3 || (t == u && e[s + 3] > t)) &&
            ((o = u - a), (i = o - 1), t >= u && (l = "right")),
        null != i)
      ) {
        if (
          ((n = e[s + 2]),
          a == u && r == (n.insertLeft ? "left" : "right") && (l = r),
          "left" == r && 0 == i)
        )
          for (; s && e[s - 2] == e[s - 3] && e[s - 1].insertLeft; )
            (n = e[(s -= 3) + 2]), (l = "left");
        if ("right" == r && i == u - a)
          for (
            ;
            s < e.length - 3 && e[s + 3] == e[s + 4] && !e[s + 5].insertLeft;

          )
            (n = e[(s += 3) + 2]), (l = "right");
        break;
      }
    }
    return {
      node: n,
      start: i,
      end: o,
      collapse: l,
      coverStart: a,
      coverEnd: u,
    };
  }
  function tr(e, t, r, n) {
    var i,
      o = er(t.map, r, n),
      l = o.node,
      s = o.start,
      a = o.end,
      u = o.collapse;
    if (3 == l.nodeType) {
      for (var c = 0; 4 > c; c++) {
        for (; s && Fo(t.line.text.charAt(o.coverStart + s)); ) --s;
        for (
          ;
          o.coverStart + a < o.coverEnd &&
          Fo(t.line.text.charAt(o.coverStart + a));

        )
          ++a;
        if (dl && 9 > pl && 0 == s && a == o.coverEnd - o.coverStart)
          i = l.parentNode.getBoundingClientRect();
        else if (dl && e.options.lineWrapping) {
          var f = Ps(l, s, a).getClientRects();
          i = f.length ? f["right" == n ? f.length - 1 : 0] : zl;
        } else i = Ps(l, s, a).getBoundingClientRect() || zl;
        if (i.left || i.right || 0 == s) break;
        (a = s), (s -= 1), (u = "right");
      }
      dl && 11 > pl && (i = rr(e.display.measure, i));
    } else {
      s > 0 && (u = n = "right");
      var f;
      i =
        e.options.lineWrapping && (f = l.getClientRects()).length > 1
          ? f["right" == n ? f.length - 1 : 0]
          : l.getBoundingClientRect();
    }
    if (dl && 9 > pl && !s && (!i || (!i.left && !i.right))) {
      var h = l.parentNode.getClientRects()[0];
      i = h
        ? {
            left: h.left,
            right: h.left + mr(e.display),
            top: h.top,
            bottom: h.bottom,
          }
        : zl;
    }
    for (
      var d = i.top - t.rect.top,
        p = i.bottom - t.rect.top,
        g = (d + p) / 2,
        v = t.view.measure.heights,
        c = 0;
      c < v.length - 1 && !(g < v[c]);
      c++
    );
    var m = c ? v[c - 1] : 0,
      y = v[c],
      b = {
        left: ("right" == u ? i.right : i.left) - t.rect.left,
        right: ("left" == u ? i.left : i.right) - t.rect.left,
        top: m,
        bottom: y,
      };
    return (
      i.left || i.right || (b.bogus = !0),
      e.options.singleCursorHeightPerLine || ((b.rtop = d), (b.rbottom = p)),
      b
    );
  }
  function rr(e, t) {
    if (
      !window.screen ||
      null == screen.logicalXDPI ||
      screen.logicalXDPI == screen.deviceXDPI ||
      !qo(e)
    )
      return t;
    var r = screen.logicalXDPI / screen.deviceXDPI,
      n = screen.logicalYDPI / screen.deviceYDPI;
    return {
      left: t.left * r,
      right: t.right * r,
      top: t.top * n,
      bottom: t.bottom * n,
    };
  }
  function nr(e) {
    if (
      e.measure &&
      ((e.measure.cache = {}), (e.measure.heights = null), e.rest)
    )
      for (var t = 0; t < e.rest.length; t++) e.measure.caches[t] = {};
  }
  function ir(e) {
    (e.display.externalMeasure = null), Bo(e.display.lineMeasure);
    for (var t = 0; t < e.display.view.length; t++) nr(e.display.view[t]);
  }
  function or(e) {
    ir(e),
      (e.display.cachedCharWidth =
        e.display.cachedTextHeight =
        e.display.cachedPaddingH =
          null),
      e.options.lineWrapping || (e.display.maxLineChanged = !0),
      (e.display.lineNumChars = null);
  }
  function lr() {
    return (
      window.pageXOffset ||
      (document.documentElement || document.body).scrollLeft
    );
  }
  function sr() {
    return (
      window.pageYOffset ||
      (document.documentElement || document.body).scrollTop
    );
  }
  function ar(e, t, r, n) {
    if (t.widgets)
      for (var i = 0; i < t.widgets.length; ++i)
        if (t.widgets[i].above) {
          var o = xi(t.widgets[i]);
          (r.top += o), (r.bottom += o);
        }
    if ("line" == n) return r;
    n || (n = "local");
    var l = Ji(t);
    if (
      ("local" == n ? (l += Gt(e.display)) : (l -= e.display.viewOffset),
      "page" == n || "window" == n)
    ) {
      var s = e.display.lineSpace.getBoundingClientRect();
      l += s.top + ("window" == n ? 0 : sr());
      var a = s.left + ("window" == n ? 0 : lr());
      (r.left += a), (r.right += a);
    }
    return (r.top += l), (r.bottom += l), r;
  }
  function ur(e, t, r) {
    if ("div" == r) return t;
    var n = t.left,
      i = t.top;
    if ("page" == r) (n -= lr()), (i -= sr());
    else if ("local" == r || !r) {
      var o = e.display.sizer.getBoundingClientRect();
      (n += o.left), (i += o.top);
    }
    var l = e.display.lineSpace.getBoundingClientRect();
    return { left: n - l.left, top: i - l.top };
  }
  function cr(e, t, r, n, i) {
    return n || (n = _i(e.doc, t.line)), ar(e, n, qt(e, n, t.ch, i), r);
  }
  function fr(e, t, r, n, i, o) {
    function l(t, l) {
      var s = Jt(e, i, t, l ? "right" : "left", o);
      return l ? (s.left = s.right) : (s.right = s.left), ar(e, n, s, r);
    }
    function s(e, t) {
      var r = a[t],
        n = r.level % 2;
      return (
        e == Qo(r) && t && r.level < a[t - 1].level
          ? ((r = a[--t]), (e = Jo(r) - (r.level % 2 ? 0 : 1)), (n = !0))
          : e == Jo(r) &&
            t < a.length - 1 &&
            r.level < a[t + 1].level &&
            ((r = a[++t]), (e = Qo(r) - (r.level % 2)), (n = !1)),
        n && e == r.to && e > r.from ? l(e - 1) : l(e, n)
      );
    }
    (n = n || _i(e.doc, t.line)), i || (i = Qt(e, n));
    var a = eo(n),
      u = t.ch;
    if (!a) return l(u);
    var c = ll(a, u),
      f = s(u, c);
    return null != Zs && (f.other = s(u, Zs)), f;
  }
  function hr(e, t) {
    var r = 0,
      t = gt(e.doc, t);
    e.options.lineWrapping || (r = mr(e.display) * t.ch);
    var n = _i(e.doc, t.line),
      i = Ji(n) + Gt(e.display);
    return { left: r, right: r, top: i, bottom: i + n.height };
  }
  function dr(e, t, r, n) {
    var i = Ol(e, t);
    return (i.xRel = n), r && (i.outside = !0), i;
  }
  function pr(e, t, r) {
    var n = e.doc;
    if (((r += e.display.viewOffset), 0 > r)) return dr(n.first, 0, !0, -1);
    var i = Qi(n, r),
      o = n.first + n.size - 1;
    if (i > o) return dr(n.first + n.size - 1, _i(n, o).text.length, !0, 1);
    0 > t && (t = 0);
    for (var l = _i(n, i); ; ) {
      var s = gr(e, l, i, t, r),
        a = hi(l),
        u = a && a.find(0, !0);
      if (!a || !(s.ch > u.from.ch || (s.ch == u.from.ch && s.xRel > 0)))
        return s;
      i = Zi((l = u.to.line));
    }
  }
  function gr(e, t, r, n, i) {
    function o(n) {
      var i = fr(e, Ol(r, n), "line", t, u);
      return (
        (s = !0),
        l > i.bottom ? i.left - a : l < i.top ? i.left + a : ((s = !1), i.left)
      );
    }
    var l = i - Ji(t),
      s = !1,
      a = 2 * e.display.wrapper.clientWidth,
      u = Qt(e, t),
      c = eo(t),
      f = t.text.length,
      h = el(t),
      d = tl(t),
      p = o(h),
      g = s,
      v = o(d),
      m = s;
    if (n > v) return dr(r, d, m, 1);
    for (;;) {
      if (c ? d == h || d == al(t, h, 1) : 1 >= d - h) {
        for (
          var y = p > n || v - n >= n - p ? h : d, b = n - (y == h ? p : v);
          Fo(t.text.charAt(y));

        )
          ++y;
        var w = dr(r, y, y == h ? g : m, -1 > b ? -1 : b > 1 ? 1 : 0);
        return w;
      }
      var x = Math.ceil(f / 2),
        C = h + x;
      if (c) {
        C = h;
        for (var S = 0; x > S; ++S) C = al(t, C, 1);
      }
      var L = o(C);
      L > n
        ? ((d = C), (v = L), (m = s) && (v += 1e3), (f = x))
        : ((h = C), (p = L), (g = s), (f -= x));
    }
  }
  function vr(e) {
    if (null != e.cachedTextHeight) return e.cachedTextHeight;
    if (null == Il) {
      Il = Ro("pre");
      for (var t = 0; 49 > t; ++t)
        Il.appendChild(document.createTextNode("x")), Il.appendChild(Ro("br"));
      Il.appendChild(document.createTextNode("x"));
    }
    Go(e.measure, Il);
    var r = Il.offsetHeight / 50;
    return r > 3 && (e.cachedTextHeight = r), Bo(e.measure), r || 1;
  }
  function mr(e) {
    if (null != e.cachedCharWidth) return e.cachedCharWidth;
    var t = Ro("span", "xxxxxxxxxx"),
      r = Ro("pre", [t]);
    Go(e.measure, r);
    var n = t.getBoundingClientRect(),
      i = (n.right - n.left) / 10;
    return i > 2 && (e.cachedCharWidth = i), i || 10;
  }
  function yr(e) {
    (e.curOp = {
      cm: e,
      viewChanged: !1,
      startHeight: e.doc.height,
      forceUpdate: !1,
      updateInput: null,
      typing: !1,
      changeObjs: null,
      cursorActivityHandlers: null,
      cursorActivityCalled: 0,
      selectionChanged: !1,
      updateMaxLine: !1,
      scrollLeft: null,
      scrollTop: null,
      scrollToPos: null,
      focus: !1,
      id: ++Rl,
    }),
      Fl
        ? Fl.ops.push(e.curOp)
        : (e.curOp.ownsGroup = Fl = { ops: [e.curOp], delayedCallbacks: [] });
  }
  function br(e) {
    var t = e.delayedCallbacks,
      r = 0;
    do {
      for (; r < t.length; r++) t[r]();
      for (var n = 0; n < e.ops.length; n++) {
        var i = e.ops[n];
        if (i.cursorActivityHandlers)
          for (; i.cursorActivityCalled < i.cursorActivityHandlers.length; )
            i.cursorActivityHandlers[i.cursorActivityCalled++](i.cm);
      }
    } while (r < t.length);
  }
  function wr(e) {
    var t = e.curOp,
      r = t.ownsGroup;
    if (r)
      try {
        br(r);
      } finally {
        Fl = null;
        for (var n = 0; n < r.ops.length; n++) r.ops[n].cm.curOp = null;
        xr(r);
      }
  }
  function xr(e) {
    for (var t = e.ops, r = 0; r < t.length; r++) Cr(t[r]);
    for (var r = 0; r < t.length; r++) Sr(t[r]);
    for (var r = 0; r < t.length; r++) Lr(t[r]);
    for (var r = 0; r < t.length; r++) kr(t[r]);
    for (var r = 0; r < t.length; r++) Tr(t[r]);
  }
  function Cr(e) {
    var t = e.cm,
      r = t.display;
    T(t),
      e.updateMaxLine && h(t),
      (e.mustUpdate =
        e.viewChanged ||
        e.forceUpdate ||
        null != e.scrollTop ||
        (e.scrollToPos &&
          (e.scrollToPos.from.line < r.viewFrom ||
            e.scrollToPos.to.line >= r.viewTo)) ||
        (r.maxLineChanged && t.options.lineWrapping)),
      (e.update =
        e.mustUpdate &&
        new k(
          t,
          e.mustUpdate && { top: e.scrollTop, ensure: e.scrollToPos },
          e.forceUpdate
        ));
  }
  function Sr(e) {
    e.updatedDisplay = e.mustUpdate && M(e.cm, e.update);
  }
  function Lr(e) {
    var t = e.cm,
      r = t.display;
    e.updatedDisplay && O(t),
      (e.barMeasure = p(t)),
      r.maxLineChanged &&
        !t.options.lineWrapping &&
        ((e.adjustWidthTo = qt(t, r.maxLine, r.maxLine.text.length).left + 3),
        (t.display.sizerWidth = e.adjustWidthTo),
        (e.barMeasure.scrollWidth = Math.max(
          r.scroller.clientWidth,
          r.sizer.offsetLeft + e.adjustWidthTo + Kt(t) + t.display.barWidth
        )),
        (e.maxScrollLeft = Math.max(
          0,
          r.sizer.offsetLeft + e.adjustWidthTo - jt(t)
        ))),
      (e.updatedDisplay || e.selectionChanged) &&
        (e.preparedSelection = r.input.prepareSelection());
  }
  function kr(e) {
    var t = e.cm;
    null != e.adjustWidthTo &&
      ((t.display.sizer.style.minWidth = e.adjustWidthTo + "px"),
      e.maxScrollLeft < t.doc.scrollLeft &&
        en(t, Math.min(t.display.scroller.scrollLeft, e.maxScrollLeft), !0),
      (t.display.maxLineChanged = !1)),
      e.preparedSelection && t.display.input.showSelection(e.preparedSelection),
      e.updatedDisplay && W(t, e.barMeasure),
      (e.updatedDisplay || e.startHeight != t.doc.height) && y(t, e.barMeasure),
      e.selectionChanged && Et(t),
      t.state.focused && e.updateInput && t.display.input.reset(e.typing),
      e.focus && e.focus == Uo() && q(e.cm);
  }
  function Tr(e) {
    var t = e.cm,
      r = t.display,
      n = t.doc;
    if (
      (e.updatedDisplay && A(t, e.update),
      null == r.wheelStartX ||
        (null == e.scrollTop && null == e.scrollLeft && !e.scrollToPos) ||
        (r.wheelStartX = r.wheelStartY = null),
      null == e.scrollTop ||
        (r.scroller.scrollTop == e.scrollTop && !e.forceScroll) ||
        ((n.scrollTop = Math.max(
          0,
          Math.min(
            r.scroller.scrollHeight - r.scroller.clientHeight,
            e.scrollTop
          )
        )),
        r.scrollbars.setScrollTop(n.scrollTop),
        (r.scroller.scrollTop = n.scrollTop)),
      null == e.scrollLeft ||
        (r.scroller.scrollLeft == e.scrollLeft && !e.forceScroll) ||
        ((n.scrollLeft = Math.max(
          0,
          Math.min(r.scroller.scrollWidth - jt(t), e.scrollLeft)
        )),
        r.scrollbars.setScrollLeft(n.scrollLeft),
        (r.scroller.scrollLeft = n.scrollLeft),
        x(t)),
      e.scrollToPos)
    ) {
      var i = Wn(
        t,
        gt(n, e.scrollToPos.from),
        gt(n, e.scrollToPos.to),
        e.scrollToPos.margin
      );
      e.scrollToPos.isCursor && t.state.focused && Nn(t, i);
    }
    var o = e.maybeHiddenMarkers,
      l = e.maybeUnhiddenMarkers;
    if (o)
      for (var s = 0; s < o.length; ++s) o[s].lines.length || ks(o[s], "hide");
    if (l)
      for (var s = 0; s < l.length; ++s)
        l[s].lines.length && ks(l[s], "unhide");
    r.wrapper.offsetHeight && (n.scrollTop = t.display.scroller.scrollTop),
      e.changeObjs && ks(t, "changes", t, e.changeObjs),
      e.update && e.update.finish();
  }
  function Mr(e, t) {
    if (e.curOp) return t();
    yr(e);
    try {
      return t();
    } finally {
      wr(e);
    }
  }
  function Ar(e, t) {
    return function () {
      if (e.curOp) return t.apply(e, arguments);
      yr(e);
      try {
        return t.apply(e, arguments);
      } finally {
        wr(e);
      }
    };
  }
  function Nr(e) {
    return function () {
      if (this.curOp) return e.apply(this, arguments);
      yr(this);
      try {
        return e.apply(this, arguments);
      } finally {
        wr(this);
      }
    };
  }
  function Wr(e) {
    return function () {
      var t = this.cm;
      if (!t || t.curOp) return e.apply(this, arguments);
      yr(t);
      try {
        return e.apply(this, arguments);
      } finally {
        wr(t);
      }
    };
  }
  function Or(e, t, r) {
    (this.line = t),
      (this.rest = gi(t)),
      (this.size = this.rest ? Zi(No(this.rest)) - r + 1 : 1),
      (this.node = this.text = null),
      (this.hidden = yi(e, t));
  }
  function Dr(e, t, r) {
    for (var n, i = [], o = t; r > o; o = n) {
      var l = new Or(e.doc, _i(e.doc, o), o);
      (n = o + l.size), i.push(l);
    }
    return i;
  }
  function Hr(e, t, r, n) {
    null == t && (t = e.doc.first),
      null == r && (r = e.doc.first + e.doc.size),
      n || (n = 0);
    var i = e.display;
    if (
      (n &&
        r < i.viewTo &&
        (null == i.updateLineNumbers || i.updateLineNumbers > t) &&
        (i.updateLineNumbers = t),
      (e.curOp.viewChanged = !0),
      t >= i.viewTo)
    )
      Wl && vi(e.doc, t) < i.viewTo && Pr(e);
    else if (r <= i.viewFrom)
      Wl && mi(e.doc, r + n) > i.viewFrom
        ? Pr(e)
        : ((i.viewFrom += n), (i.viewTo += n));
    else if (t <= i.viewFrom && r >= i.viewTo) Pr(e);
    else if (t <= i.viewFrom) {
      var o = zr(e, r, r + n, 1);
      o
        ? ((i.view = i.view.slice(o.index)),
          (i.viewFrom = o.lineN),
          (i.viewTo += n))
        : Pr(e);
    } else if (r >= i.viewTo) {
      var o = zr(e, t, t, -1);
      o ? ((i.view = i.view.slice(0, o.index)), (i.viewTo = o.lineN)) : Pr(e);
    } else {
      var l = zr(e, t, t, -1),
        s = zr(e, r, r + n, 1);
      l && s
        ? ((i.view = i.view
            .slice(0, l.index)
            .concat(Dr(e, l.lineN, s.lineN))
            .concat(i.view.slice(s.index))),
          (i.viewTo += n))
        : Pr(e);
    }
    var a = i.externalMeasured;
    a &&
      (r < a.lineN
        ? (a.lineN += n)
        : t < a.lineN + a.size && (i.externalMeasured = null));
  }
  function Ir(e, t, r) {
    e.curOp.viewChanged = !0;
    var n = e.display,
      i = e.display.externalMeasured;
    if (
      (i && t >= i.lineN && t < i.lineN + i.size && (n.externalMeasured = null),
      !(t < n.viewFrom || t >= n.viewTo))
    ) {
      var o = n.view[Er(e, t)];
      if (null != o.node) {
        var l = o.changes || (o.changes = []);
        -1 == Wo(l, r) && l.push(r);
      }
    }
  }
  function Pr(e) {
    (e.display.viewFrom = e.display.viewTo = e.doc.first),
      (e.display.view = []),
      (e.display.viewOffset = 0);
  }
  function Er(e, t) {
    if (t >= e.display.viewTo) return null;
    if (((t -= e.display.viewFrom), 0 > t)) return null;
    for (var r = e.display.view, n = 0; n < r.length; n++)
      if (((t -= r[n].size), 0 > t)) return n;
  }
  function zr(e, t, r, n) {
    var i,
      o = Er(e, t),
      l = e.display.view;
    if (!Wl || r == e.doc.first + e.doc.size) return { index: o, lineN: r };
    for (var s = 0, a = e.display.viewFrom; o > s; s++) a += l[s].size;
    if (a != t) {
      if (n > 0) {
        if (o == l.length - 1) return null;
        (i = a + l[o].size - t), o++;
      } else i = a - t;
      (t += i), (r += i);
    }
    for (; vi(e.doc, r) != r; ) {
      if (o == (0 > n ? 0 : l.length - 1)) return null;
      (r += n * l[o - (0 > n ? 1 : 0)].size), (o += n);
    }
    return { index: o, lineN: r };
  }
  function Fr(e, t, r) {
    var n = e.display,
      i = n.view;
    0 == i.length || t >= n.viewTo || r <= n.viewFrom
      ? ((n.view = Dr(e, t, r)), (n.viewFrom = t))
      : (n.viewFrom > t
          ? (n.view = Dr(e, t, n.viewFrom).concat(n.view))
          : n.viewFrom < t && (n.view = n.view.slice(Er(e, t))),
        (n.viewFrom = t),
        n.viewTo < r
          ? (n.view = n.view.concat(Dr(e, n.viewTo, r)))
          : n.viewTo > r && (n.view = n.view.slice(0, Er(e, r)))),
      (n.viewTo = r);
  }
  function Rr(e) {
    for (var t = e.display.view, r = 0, n = 0; n < t.length; n++) {
      var i = t[n];
      i.hidden || (i.node && !i.changes) || ++r;
    }
    return r;
  }
  function Br(e) {
    function t() {
      i.activeTouch &&
        ((o = setTimeout(function () {
          i.activeTouch = null;
        }, 1e3)),
        (l = i.activeTouch),
        (l.end = +new Date()));
    }
    function r(e) {
      if (1 != e.touches.length) return !1;
      var t = e.touches[0];
      return t.radiusX <= 1 && t.radiusY <= 1;
    }
    function n(e, t) {
      if (null == t.left) return !0;
      var r = t.left - e.left,
        n = t.top - e.top;
      return r * r + n * n > 400;
    }
    var i = e.display;
    Ss(i.scroller, "mousedown", Ar(e, jr)),
      dl && 11 > pl
        ? Ss(
            i.scroller,
            "dblclick",
            Ar(e, function (t) {
              if (!Co(e, t)) {
                var r = Kr(e, t);
                if (r && !qr(e, t) && !Vr(e.display, t)) {
                  ws(t);
                  var n = e.findWordAt(r);
                  wt(e.doc, n.anchor, n.head);
                }
              }
            })
          )
        : Ss(i.scroller, "dblclick", function (t) {
            Co(e, t) || ws(t);
          }),
      Al ||
        Ss(i.scroller, "contextmenu", function (t) {
          gn(e, t);
        });
    var o,
      l = { end: 0 };
    Ss(i.scroller, "touchstart", function (e) {
      if (!r(e)) {
        clearTimeout(o);
        var t = +new Date();
        (i.activeTouch = {
          start: t,
          moved: !1,
          prev: t - l.end <= 300 ? l : null,
        }),
          1 == e.touches.length &&
            ((i.activeTouch.left = e.touches[0].pageX),
            (i.activeTouch.top = e.touches[0].pageY));
      }
    }),
      Ss(i.scroller, "touchmove", function () {
        i.activeTouch && (i.activeTouch.moved = !0);
      }),
      Ss(i.scroller, "touchend", function (r) {
        var o = i.activeTouch;
        if (
          o &&
          !Vr(i, r) &&
          null != o.left &&
          !o.moved &&
          new Date() - o.start < 300
        ) {
          var l,
            s = e.coordsChar(i.activeTouch, "page");
          (l =
            !o.prev || n(o, o.prev)
              ? new ft(s, s)
              : !o.prev.prev || n(o, o.prev.prev)
              ? e.findWordAt(s)
              : new ft(Ol(s.line, 0), gt(e.doc, Ol(s.line + 1, 0)))),
            e.setSelection(l.anchor, l.head),
            e.focus(),
            ws(r);
        }
        t();
      }),
      Ss(i.scroller, "touchcancel", t),
      Ss(i.scroller, "scroll", function () {
        i.scroller.clientHeight &&
          (Jr(e, i.scroller.scrollTop),
          en(e, i.scroller.scrollLeft, !0),
          ks(e, "scroll", e));
      }),
      Ss(i.scroller, "mousewheel", function (t) {
        tn(e, t);
      }),
      Ss(i.scroller, "DOMMouseScroll", function (t) {
        tn(e, t);
      }),
      Ss(i.wrapper, "scroll", function () {
        i.wrapper.scrollTop = i.wrapper.scrollLeft = 0;
      }),
      (i.dragFunctions = {
        simple: function (t) {
          Co(e, t) || Cs(t);
        },
        start: function (t) {
          Qr(e, t);
        },
        drop: Ar(e, Zr),
      });
    var s = i.input.getField();
    Ss(s, "keyup", function (t) {
      cn.call(e, t);
    }),
      Ss(s, "keydown", Ar(e, an)),
      Ss(s, "keypress", Ar(e, fn)),
      Ss(s, "focus", Po(dn, e)),
      Ss(s, "blur", Po(pn, e));
  }
  function Gr(t, r, n) {
    var i = n && n != e.Init;
    if (!r != !i) {
      var o = t.display.dragFunctions,
        l = r ? Ss : Ls;
      l(t.display.scroller, "dragstart", o.start),
        l(t.display.scroller, "dragenter", o.simple),
        l(t.display.scroller, "dragover", o.simple),
        l(t.display.scroller, "drop", o.drop);
    }
  }
  function Ur(e) {
    var t = e.display;
    (t.lastWrapHeight != t.wrapper.clientHeight ||
      t.lastWrapWidth != t.wrapper.clientWidth) &&
      ((t.cachedCharWidth = t.cachedTextHeight = t.cachedPaddingH = null),
      (t.scrollbarsClipped = !1),
      e.setSize());
  }
  function Vr(e, t) {
    for (var r = yo(t); r != e.wrapper; r = r.parentNode)
      if (
        !r ||
        (1 == r.nodeType && "true" == r.getAttribute("cm-ignore-events")) ||
        (r.parentNode == e.sizer && r != e.mover)
      )
        return !0;
  }
  function Kr(e, t, r, n) {
    var i = e.display;
    if (!r && "true" == yo(t).getAttribute("cm-not-content")) return null;
    var o,
      l,
      s = i.lineSpace.getBoundingClientRect();
    try {
      (o = t.clientX - s.left), (l = t.clientY - s.top);
    } catch (t) {
      return null;
    }
    var a,
      u = pr(e, o, l);
    if (n && 1 == u.xRel && (a = _i(e.doc, u.line).text).length == u.ch) {
      var c = Ds(a, a.length, e.options.tabSize) - a.length;
      u = Ol(
        u.line,
        Math.max(0, Math.round((o - Vt(e.display).left) / mr(e.display)) - c)
      );
    }
    return u;
  }
  function jr(e) {
    var t = this,
      r = t.display;
    if (!((r.activeTouch && r.input.supportsTouch()) || Co(t, e))) {
      if (((r.shift = e.shiftKey), Vr(r, e)))
        return void (
          gl ||
          ((r.scroller.draggable = !1),
          setTimeout(function () {
            r.scroller.draggable = !0;
          }, 100))
        );
      if (!qr(t, e)) {
        var n = Kr(t, e);
        switch ((window.focus(), bo(e))) {
          case 1:
            n ? Xr(t, e, n) : yo(e) == r.scroller && ws(e);
            break;
          case 2:
            gl && (t.state.lastMiddleDown = +new Date()),
              n && wt(t.doc, n),
              setTimeout(function () {
                r.input.focus();
              }, 20),
              ws(e);
            break;
          case 3:
            Al ? gn(t, e) : hn(t);
        }
      }
    }
  }
  function Xr(e, t, r) {
    dl ? setTimeout(Po(q, e), 0) : (e.curOp.focus = Uo());
    var n,
      i = +new Date();
    El && El.time > i - 400 && 0 == Dl(El.pos, r)
      ? (n = "triple")
      : Pl && Pl.time > i - 400 && 0 == Dl(Pl.pos, r)
      ? ((n = "double"), (El = { time: i, pos: r }))
      : ((n = "single"), (Pl = { time: i, pos: r }));
    var o,
      l = e.doc.sel,
      s = Ll ? t.metaKey : t.ctrlKey;
    e.options.dragDrop &&
    js &&
    !Z(e) &&
    "single" == n &&
    (o = l.contains(r)) > -1 &&
    !l.ranges[o].empty()
      ? _r(e, t, r, s)
      : Yr(e, t, r, n, s);
  }
  function _r(e, t, r, n) {
    var i = e.display,
      o = +new Date(),
      l = Ar(e, function (s) {
        gl && (i.scroller.draggable = !1),
          (e.state.draggingText = !1),
          Ls(document, "mouseup", l),
          Ls(i.scroller, "drop", l),
          Math.abs(t.clientX - s.clientX) + Math.abs(t.clientY - s.clientY) <
            10 &&
            (ws(s),
            !n && +new Date() - 200 < o && wt(e.doc, r),
            gl || (dl && 9 == pl)
              ? setTimeout(function () {
                  document.body.focus(), i.input.focus();
                }, 20)
              : i.input.focus());
      });
    gl && (i.scroller.draggable = !0),
      (e.state.draggingText = l),
      i.scroller.dragDrop && i.scroller.dragDrop(),
      Ss(document, "mouseup", l),
      Ss(i.scroller, "drop", l);
  }
  function Yr(e, t, r, n, i) {
    function o(t) {
      if (0 != Dl(v, t))
        if (((v = t), "rect" == n)) {
          for (
            var i = [],
              o = e.options.tabSize,
              l = Ds(_i(u, r.line).text, r.ch, o),
              s = Ds(_i(u, t.line).text, t.ch, o),
              a = Math.min(l, s),
              d = Math.max(l, s),
              p = Math.min(r.line, t.line),
              g = Math.min(e.lastLine(), Math.max(r.line, t.line));
            g >= p;
            p++
          ) {
            var m = _i(u, p).text,
              y = Mo(m, a, o);
            a == d
              ? i.push(new ft(Ol(p, y), Ol(p, y)))
              : m.length > y && i.push(new ft(Ol(p, y), Ol(p, Mo(m, d, o))));
          }
          i.length || i.push(new ft(r, r)),
            Tt(u, ht(h.ranges.slice(0, f).concat(i), f), {
              origin: "*mouse",
              scroll: !1,
            }),
            e.scrollIntoView(t);
        } else {
          var b = c,
            w = b.anchor,
            x = t;
          if ("single" != n) {
            if ("double" == n) var C = e.findWordAt(t);
            else var C = new ft(Ol(t.line, 0), gt(u, Ol(t.line + 1, 0)));
            Dl(C.anchor, w) > 0
              ? ((x = C.head), (w = $(b.from(), C.anchor)))
              : ((x = C.anchor), (w = Y(b.to(), C.head)));
          }
          var i = h.ranges.slice(0);
          (i[f] = new ft(gt(u, w), x)), Tt(u, ht(i, f), Ws);
        }
    }
    function l(t) {
      var r = ++y,
        i = Kr(e, t, !0, "rect" == n);
      if (i)
        if (0 != Dl(i, v)) {
          (e.curOp.focus = Uo()), o(i);
          var s = w(a, u);
          (i.line >= s.to || i.line < s.from) &&
            setTimeout(
              Ar(e, function () {
                y == r && l(t);
              }),
              150
            );
        } else {
          var c = t.clientY < m.top ? -20 : t.clientY > m.bottom ? 20 : 0;
          c &&
            setTimeout(
              Ar(e, function () {
                y == r && ((a.scroller.scrollTop += c), l(t));
              }),
              50
            );
        }
    }
    function s(e) {
      (y = 1 / 0),
        ws(e),
        a.input.focus(),
        Ls(document, "mousemove", b),
        Ls(document, "mouseup", x),
        (u.history.lastSelOrigin = null);
    }
    var a = e.display,
      u = e.doc;
    ws(t);
    var c,
      f,
      h = u.sel,
      d = h.ranges;
    if (
      (i && !t.shiftKey
        ? ((f = u.sel.contains(r)), (c = f > -1 ? d[f] : new ft(r, r)))
        : ((c = u.sel.primary()), (f = u.sel.primIndex)),
      t.altKey)
    )
      (n = "rect"), i || (c = new ft(r, r)), (r = Kr(e, t, !0, !0)), (f = -1);
    else if ("double" == n) {
      var p = e.findWordAt(r);
      c = e.display.shift || u.extend ? bt(u, c, p.anchor, p.head) : p;
    } else if ("triple" == n) {
      var g = new ft(Ol(r.line, 0), gt(u, Ol(r.line + 1, 0)));
      c = e.display.shift || u.extend ? bt(u, c, g.anchor, g.head) : g;
    } else c = bt(u, c, r);
    i
      ? -1 == f
        ? ((f = d.length),
          Tt(u, ht(d.concat([c]), f), { scroll: !1, origin: "*mouse" }))
        : d.length > 1 && d[f].empty() && "single" == n && !t.shiftKey
        ? (Tt(u, ht(d.slice(0, f).concat(d.slice(f + 1)), 0)), (h = u.sel))
        : Ct(u, f, c, Ws)
      : ((f = 0), Tt(u, new ct([c], 0), Ws), (h = u.sel));
    var v = r,
      m = a.wrapper.getBoundingClientRect(),
      y = 0,
      b = Ar(e, function (e) {
        bo(e) ? l(e) : s(e);
      }),
      x = Ar(e, s);
    Ss(document, "mousemove", b), Ss(document, "mouseup", x);
  }
  function $r(e, t, r, n, i) {
    try {
      var o = t.clientX,
        l = t.clientY;
    } catch (t) {
      return !1;
    }
    if (o >= Math.floor(e.display.gutters.getBoundingClientRect().right))
      return !1;
    n && ws(t);
    var s = e.display,
      a = s.lineDiv.getBoundingClientRect();
    if (l > a.bottom || !Lo(e, r)) return mo(t);
    l -= a.top - s.viewOffset;
    for (var u = 0; u < e.options.gutters.length; ++u) {
      var c = s.gutters.childNodes[u];
      if (c && c.getBoundingClientRect().right >= o) {
        var f = Qi(e.doc, l),
          h = e.options.gutters[u];
        return i(e, r, e, f, h, t), mo(t);
      }
    }
  }
  function qr(e, t) {
    return $r(e, t, "gutterClick", !0, wo);
  }
  function Zr(e) {
    var t = this;
    if (!Co(t, e) && !Vr(t.display, e)) {
      ws(e), dl && (Bl = +new Date());
      var r = Kr(t, e, !0),
        n = e.dataTransfer.files;
      if (r && !Z(t))
        if (n && n.length && window.FileReader && window.File)
          for (
            var i = n.length,
              o = Array(i),
              l = 0,
              s = function (e, n) {
                var s = new FileReader();
                (s.onload = Ar(t, function () {
                  if (((o[n] = s.result), ++l == i)) {
                    r = gt(t.doc, r);
                    var e = {
                      from: r,
                      to: r,
                      text: Xs(o.join("\n")),
                      origin: "paste",
                    };
                    Cn(t.doc, e), kt(t.doc, dt(r, Xl(e)));
                  }
                })),
                  s.readAsText(e);
              },
              a = 0;
            i > a;
            ++a
          )
            s(n[a], a);
        else {
          if (t.state.draggingText && t.doc.sel.contains(r) > -1)
            return (
              t.state.draggingText(e),
              void setTimeout(function () {
                t.display.input.focus();
              }, 20)
            );
          try {
            var o = e.dataTransfer.getData("Text");
            if (o) {
              if (t.state.draggingText && !(Ll ? e.altKey : e.ctrlKey))
                var u = t.listSelections();
              if ((Mt(t.doc, dt(r, r)), u))
                for (var a = 0; a < u.length; ++a)
                  An(t.doc, "", u[a].anchor, u[a].head, "drag");
              t.replaceSelection(o, "around", "paste"), t.display.input.focus();
            }
          } catch (e) {}
        }
    }
  }
  function Qr(e, t) {
    if (dl && (!e.state.draggingText || +new Date() - Bl < 100))
      return void Cs(t);
    if (
      !Co(e, t) &&
      !Vr(e.display, t) &&
      (t.dataTransfer.setData("Text", e.getSelection()),
      t.dataTransfer.setDragImage && !bl)
    ) {
      var r = Ro("img", null, null, "position: fixed; left: 0; top: 0;");
      (r.src =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
        yl &&
          ((r.width = r.height = 1),
          e.display.wrapper.appendChild(r),
          (r._top = r.offsetTop)),
        t.dataTransfer.setDragImage(r, 0, 0),
        yl && r.parentNode.removeChild(r);
    }
  }
  function Jr(e, t) {
    Math.abs(e.doc.scrollTop - t) < 2 ||
      ((e.doc.scrollTop = t),
      cl || N(e, { top: t }),
      e.display.scroller.scrollTop != t && (e.display.scroller.scrollTop = t),
      e.display.scrollbars.setScrollTop(t),
      cl && N(e),
      zt(e, 100));
  }
  function en(e, t, r) {
    (r ? t == e.doc.scrollLeft : Math.abs(e.doc.scrollLeft - t) < 2) ||
      ((t = Math.min(
        t,
        e.display.scroller.scrollWidth - e.display.scroller.clientWidth
      )),
      (e.doc.scrollLeft = t),
      x(e),
      e.display.scroller.scrollLeft != t && (e.display.scroller.scrollLeft = t),
      e.display.scrollbars.setScrollLeft(t));
  }
  function tn(e, t) {
    var r = Vl(t),
      n = r.x,
      i = r.y,
      o = e.display,
      l = o.scroller;
    if (
      (n && l.scrollWidth > l.clientWidth) ||
      (i && l.scrollHeight > l.clientHeight)
    ) {
      if (i && Ll && gl)
        e: for (var s = t.target, a = o.view; s != l; s = s.parentNode)
          for (var u = 0; u < a.length; u++)
            if (a[u].node == s) {
              e.display.currentWheelTarget = s;
              break e;
            }
      if (n && !cl && !yl && null != Ul)
        return (
          i &&
            Jr(
              e,
              Math.max(
                0,
                Math.min(l.scrollTop + i * Ul, l.scrollHeight - l.clientHeight)
              )
            ),
          en(
            e,
            Math.max(
              0,
              Math.min(l.scrollLeft + n * Ul, l.scrollWidth - l.clientWidth)
            )
          ),
          ws(t),
          void (o.wheelStartX = null)
        );
      if (i && null != Ul) {
        var c = i * Ul,
          f = e.doc.scrollTop,
          h = f + o.wrapper.clientHeight;
        0 > c
          ? (f = Math.max(0, f + c - 50))
          : (h = Math.min(e.doc.height, h + c + 50)),
          N(e, { top: f, bottom: h });
      }
      20 > Gl &&
        (null == o.wheelStartX
          ? ((o.wheelStartX = l.scrollLeft),
            (o.wheelStartY = l.scrollTop),
            (o.wheelDX = n),
            (o.wheelDY = i),
            setTimeout(function () {
              if (null != o.wheelStartX) {
                var e = l.scrollLeft - o.wheelStartX,
                  t = l.scrollTop - o.wheelStartY,
                  r =
                    (t && o.wheelDY && t / o.wheelDY) ||
                    (e && o.wheelDX && e / o.wheelDX);
                (o.wheelStartX = o.wheelStartY = null),
                  r && ((Ul = (Ul * Gl + r) / (Gl + 1)), ++Gl);
              }
            }, 200))
          : ((o.wheelDX += n), (o.wheelDY += i)));
    }
  }
  function rn(e, t, r) {
    if ("string" == typeof t && ((t = ns[t]), !t)) return !1;
    e.display.input.ensurePolled();
    var n = e.display.shift,
      i = !1;
    try {
      Z(e) && (e.state.suppressEdits = !0),
        r && (e.display.shift = !1),
        (i = t(e) != As);
    } finally {
      (e.display.shift = n), (e.state.suppressEdits = !1);
    }
    return i;
  }
  function nn(e, t, r) {
    for (var n = 0; n < e.state.keyMaps.length; n++) {
      var i = os(t, e.state.keyMaps[n], r, e);
      if (i) return i;
    }
    return (
      (e.options.extraKeys && os(t, e.options.extraKeys, r, e)) ||
      os(t, e.options.keyMap, r, e)
    );
  }
  function on(e, t, r, n) {
    var i = e.state.keySeq;
    if (i) {
      if (ls(t)) return "handled";
      Kl.set(50, function () {
        e.state.keySeq == i &&
          ((e.state.keySeq = null), e.display.input.reset());
      }),
        (t = i + " " + t);
    }
    var o = nn(e, t, n);
    return (
      "multi" == o && (e.state.keySeq = t),
      "handled" == o && wo(e, "keyHandled", e, t, r),
      ("handled" == o || "multi" == o) && (ws(r), Et(e)),
      i && !o && /\'$/.test(t) ? (ws(r), !0) : !!o
    );
  }
  function ln(e, t) {
    var r = ss(t, !0);
    return r
      ? t.shiftKey && !e.state.keySeq
        ? on(e, "Shift-" + r, t, function (t) {
            return rn(e, t, !0);
          }) ||
          on(e, r, t, function (t) {
            return ("string" == typeof t ? /^go[A-Z]/.test(t) : t.motion)
              ? rn(e, t)
              : void 0;
          })
        : on(e, r, t, function (t) {
            return rn(e, t);
          })
      : !1;
  }
  function sn(e, t, r) {
    return on(e, "'" + r + "'", t, function (t) {
      return rn(e, t, !0);
    });
  }
  function an(e) {
    var t = this;
    if (((t.curOp.focus = Uo()), !Co(t, e))) {
      dl && 11 > pl && 27 == e.keyCode && (e.returnValue = !1);
      var r = e.keyCode;
      t.display.shift = 16 == r || e.shiftKey;
      var n = ln(t, e);
      yl &&
        ((jl = n ? r : null),
        !n &&
          88 == r &&
          !Ys &&
          (Ll ? e.metaKey : e.ctrlKey) &&
          t.replaceSelection("", null, "cut")),
        18 != r ||
          /\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className) ||
          un(t);
    }
  }
  function un(e) {
    function t(e) {
      (18 != e.keyCode && e.altKey) ||
        (Us(r, "CodeMirror-crosshair"),
        Ls(document, "keyup", t),
        Ls(document, "mouseover", t));
    }
    var r = e.display.lineDiv;
    Vs(r, "CodeMirror-crosshair"),
      Ss(document, "keyup", t),
      Ss(document, "mouseover", t);
  }
  function cn(e) {
    16 == e.keyCode && (this.doc.sel.shift = !1), Co(this, e);
  }
  function fn(e) {
    var t = this;
    if (
      !(
        Vr(t.display, e) ||
        Co(t, e) ||
        (e.ctrlKey && !e.altKey) ||
        (Ll && e.metaKey)
      )
    ) {
      var r = e.keyCode,
        n = e.charCode;
      if (yl && r == jl) return (jl = null), void ws(e);
      if (!yl || (e.which && !(e.which < 10)) || !ln(t, e)) {
        var i = String.fromCharCode(null == n ? r : n);
        sn(t, e, i) || t.display.input.onKeyPress(e);
      }
    }
  }
  function hn(e) {
    (e.state.delayingBlurEvent = !0),
      setTimeout(function () {
        e.state.delayingBlurEvent && ((e.state.delayingBlurEvent = !1), pn(e));
      }, 100);
  }
  function dn(e) {
    e.state.delayingBlurEvent && (e.state.delayingBlurEvent = !1),
      "nocursor" != e.options.readOnly &&
        (e.state.focused ||
          (ks(e, "focus", e),
          (e.state.focused = !0),
          Vs(e.display.wrapper, "CodeMirror-focused"),
          e.curOp ||
            e.display.selForContextMenu == e.doc.sel ||
            (e.display.input.reset(),
            gl &&
              setTimeout(function () {
                e.display.input.reset(!0);
              }, 20)),
          e.display.input.receivedFocus()),
        Et(e));
  }
  function pn(e) {
    e.state.delayingBlurEvent ||
      (e.state.focused &&
        (ks(e, "blur", e),
        (e.state.focused = !1),
        Us(e.display.wrapper, "CodeMirror-focused")),
      clearInterval(e.display.blinker),
      setTimeout(function () {
        e.state.focused || (e.display.shift = !1);
      }, 150));
  }
  function gn(e, t) {
    Vr(e.display, t) || vn(e, t) || e.display.input.onContextMenu(t);
  }
  function vn(e, t) {
    return Lo(e, "gutterContextMenu")
      ? $r(e, t, "gutterContextMenu", !1, ks)
      : !1;
  }
  function mn(e, t) {
    if (Dl(e, t.from) < 0) return e;
    if (Dl(e, t.to) <= 0) return Xl(t);
    var r = e.line + t.text.length - (t.to.line - t.from.line) - 1,
      n = e.ch;
    return e.line == t.to.line && (n += Xl(t).ch - t.to.ch), Ol(r, n);
  }
  function yn(e, t) {
    for (var r = [], n = 0; n < e.sel.ranges.length; n++) {
      var i = e.sel.ranges[n];
      r.push(new ft(mn(i.anchor, t), mn(i.head, t)));
    }
    return ht(r, e.sel.primIndex);
  }
  function bn(e, t, r) {
    return e.line == t.line
      ? Ol(r.line, e.ch - t.ch + r.ch)
      : Ol(r.line + (e.line - t.line), e.ch);
  }
  function wn(e, t, r) {
    for (var n = [], i = Ol(e.first, 0), o = i, l = 0; l < t.length; l++) {
      var s = t[l],
        a = bn(s.from, i, o),
        u = bn(Xl(s), i, o);
      if (((i = s.to), (o = u), "around" == r)) {
        var c = e.sel.ranges[l],
          f = Dl(c.head, c.anchor) < 0;
        n[l] = new ft(f ? u : a, f ? a : u);
      } else n[l] = new ft(a, a);
    }
    return new ct(n, e.sel.primIndex);
  }
  function xn(e, t, r) {
    var n = {
      canceled: !1,
      from: t.from,
      to: t.to,
      text: t.text,
      origin: t.origin,
      cancel: function () {
        this.canceled = !0;
      },
    };
    return (
      r &&
        (n.update = function (t, r, n, i) {
          t && (this.from = gt(e, t)),
            r && (this.to = gt(e, r)),
            n && (this.text = n),
            void 0 !== i && (this.origin = i);
        }),
      ks(e, "beforeChange", e, n),
      e.cm && ks(e.cm, "beforeChange", e.cm, n),
      n.canceled
        ? null
        : { from: n.from, to: n.to, text: n.text, origin: n.origin }
    );
  }
  function Cn(e, t, r) {
    if (e.cm) {
      if (!e.cm.curOp) return Ar(e.cm, Cn)(e, t, r);
      if (e.cm.state.suppressEdits) return;
    }
    if (
      !(Lo(e, "beforeChange") || (e.cm && Lo(e.cm, "beforeChange"))) ||
      (t = xn(e, t, !0))
    ) {
      var n = Nl && !r && ii(e, t.from, t.to);
      if (n)
        for (var i = n.length - 1; i >= 0; --i)
          Sn(e, { from: n[i].from, to: n[i].to, text: i ? [""] : t.text });
      else Sn(e, t);
    }
  }
  function Sn(e, t) {
    if (1 != t.text.length || "" != t.text[0] || 0 != Dl(t.from, t.to)) {
      var r = yn(e, t);
      oo(e, t, r, e.cm ? e.cm.curOp.id : 0 / 0), Tn(e, t, r, ti(e, t));
      var n = [];
      ji(e, function (e, r) {
        r || -1 != Wo(n, e.history) || (vo(e.history, t), n.push(e.history)),
          Tn(e, t, null, ti(e, t));
      });
    }
  }
  function Ln(e, t, r) {
    if (!e.cm || !e.cm.state.suppressEdits) {
      for (
        var n,
          i = e.history,
          o = e.sel,
          l = "undo" == t ? i.done : i.undone,
          s = "undo" == t ? i.undone : i.done,
          a = 0;
        a < l.length &&
        ((n = l[a]), r ? !n.ranges || n.equals(e.sel) : n.ranges);
        a++
      );
      if (a != l.length) {
        for (i.lastOrigin = i.lastSelOrigin = null; (n = l.pop()), n.ranges; ) {
          if ((ao(n, s), r && !n.equals(e.sel)))
            return void Tt(e, n, { clearRedo: !1 });
          o = n;
        }
        var u = [];
        ao(o, s),
          s.push({ changes: u, generation: i.generation }),
          (i.generation = n.generation || ++i.maxGeneration);
        for (
          var c = Lo(e, "beforeChange") || (e.cm && Lo(e.cm, "beforeChange")),
            a = n.changes.length - 1;
          a >= 0;
          --a
        ) {
          var f = n.changes[a];
          if (((f.origin = t), c && !xn(e, f, !1))) return void (l.length = 0);
          u.push(ro(e, f));
          var h = a ? yn(e, f) : No(l);
          Tn(e, f, h, ni(e, f)),
            !a && e.cm && e.cm.scrollIntoView({ from: f.from, to: Xl(f) });
          var d = [];
          ji(e, function (e, t) {
            t ||
              -1 != Wo(d, e.history) ||
              (vo(e.history, f), d.push(e.history)),
              Tn(e, f, null, ni(e, f));
          });
        }
      }
    }
  }
  function kn(e, t) {
    if (
      0 != t &&
      ((e.first += t),
      (e.sel = new ct(
        Oo(e.sel.ranges, function (e) {
          return new ft(
            Ol(e.anchor.line + t, e.anchor.ch),
            Ol(e.head.line + t, e.head.ch)
          );
        }),
        e.sel.primIndex
      )),
      e.cm)
    ) {
      Hr(e.cm, e.first, e.first - t, t);
      for (var r = e.cm.display, n = r.viewFrom; n < r.viewTo; n++)
        Ir(e.cm, n, "gutter");
    }
  }
  function Tn(e, t, r, n) {
    if (e.cm && !e.cm.curOp) return Ar(e.cm, Tn)(e, t, r, n);
    if (t.to.line < e.first)
      return void kn(e, t.text.length - 1 - (t.to.line - t.from.line));
    if (!(t.from.line > e.lastLine())) {
      if (t.from.line < e.first) {
        var i = t.text.length - 1 - (e.first - t.from.line);
        kn(e, i),
          (t = {
            from: Ol(e.first, 0),
            to: Ol(t.to.line + i, t.to.ch),
            text: [No(t.text)],
            origin: t.origin,
          });
      }
      var o = e.lastLine();
      t.to.line > o &&
        (t = {
          from: t.from,
          to: Ol(o, _i(e, o).text.length),
          text: [t.text[0]],
          origin: t.origin,
        }),
        (t.removed = Yi(e, t.from, t.to)),
        r || (r = yn(e, t)),
        e.cm ? Mn(e.cm, t, n) : Ui(e, t, n),
        Mt(e, r, Ns);
    }
  }
  function Mn(e, t, r) {
    var n = e.doc,
      i = e.display,
      l = t.from,
      s = t.to,
      a = !1,
      u = l.line;
    e.options.lineWrapping ||
      ((u = Zi(pi(_i(n, l.line)))),
      n.iter(u, s.line + 1, function (e) {
        return e == i.maxLine ? ((a = !0), !0) : void 0;
      })),
      n.sel.contains(t.from, t.to) > -1 && So(e),
      Ui(n, t, r, o(e)),
      e.options.lineWrapping ||
        (n.iter(u, l.line + t.text.length, function (e) {
          var t = f(e);
          t > i.maxLineLength &&
            ((i.maxLine = e),
            (i.maxLineLength = t),
            (i.maxLineChanged = !0),
            (a = !1));
        }),
        a && (e.curOp.updateMaxLine = !0)),
      (n.frontier = Math.min(n.frontier, l.line)),
      zt(e, 400);
    var c = t.text.length - (s.line - l.line) - 1;
    t.full
      ? Hr(e)
      : l.line != s.line || 1 != t.text.length || Gi(e.doc, t)
      ? Hr(e, l.line, s.line + 1, c)
      : Ir(e, l.line, "text");
    var h = Lo(e, "changes"),
      d = Lo(e, "change");
    if (d || h) {
      var p = {
        from: l,
        to: s,
        text: t.text,
        removed: t.removed,
        origin: t.origin,
      };
      d && wo(e, "change", e, p),
        h && (e.curOp.changeObjs || (e.curOp.changeObjs = [])).push(p);
    }
    e.display.selForContextMenu = null;
  }
  function An(e, t, r, n, i) {
    if ((n || (n = r), Dl(n, r) < 0)) {
      var o = n;
      (n = r), (r = o);
    }
    "string" == typeof t && (t = Xs(t)),
      Cn(e, { from: r, to: n, text: t, origin: i });
  }
  function Nn(e, t) {
    if (!Co(e, "scrollCursorIntoView")) {
      var r = e.display,
        n = r.sizer.getBoundingClientRect(),
        i = null;
      if (
        (t.top + n.top < 0
          ? (i = !0)
          : t.bottom + n.top >
              (window.innerHeight || document.documentElement.clientHeight) &&
            (i = !1),
        null != i && !xl)
      ) {
        var o = Ro(
          "div",
          "​",
          null,
          "position: absolute; top: " +
            (t.top - r.viewOffset - Gt(e.display)) +
            "px; height: " +
            (t.bottom - t.top + Kt(e) + r.barHeight) +
            "px; left: " +
            t.left +
            "px; width: 2px;"
        );
        e.display.lineSpace.appendChild(o),
          o.scrollIntoView(i),
          e.display.lineSpace.removeChild(o);
      }
    }
  }
  function Wn(e, t, r, n) {
    null == n && (n = 0);
    for (var i = 0; 5 > i; i++) {
      var o = !1,
        l = fr(e, t),
        s = r && r != t ? fr(e, r) : l,
        a = Dn(
          e,
          Math.min(l.left, s.left),
          Math.min(l.top, s.top) - n,
          Math.max(l.left, s.left),
          Math.max(l.bottom, s.bottom) + n
        ),
        u = e.doc.scrollTop,
        c = e.doc.scrollLeft;
      if (
        (null != a.scrollTop &&
          (Jr(e, a.scrollTop), Math.abs(e.doc.scrollTop - u) > 1 && (o = !0)),
        null != a.scrollLeft &&
          (en(e, a.scrollLeft), Math.abs(e.doc.scrollLeft - c) > 1 && (o = !0)),
        !o)
      )
        break;
    }
    return l;
  }
  function On(e, t, r, n, i) {
    var o = Dn(e, t, r, n, i);
    null != o.scrollTop && Jr(e, o.scrollTop),
      null != o.scrollLeft && en(e, o.scrollLeft);
  }
  function Dn(e, t, r, n, i) {
    var o = e.display,
      l = vr(e.display);
    0 > r && (r = 0);
    var s =
        e.curOp && null != e.curOp.scrollTop
          ? e.curOp.scrollTop
          : o.scroller.scrollTop,
      a = Xt(e),
      u = {};
    i - r > a && (i = r + a);
    var c = e.doc.height + Ut(o),
      f = l > r,
      h = i > c - l;
    if (s > r) u.scrollTop = f ? 0 : r;
    else if (i > s + a) {
      var d = Math.min(r, (h ? c : i) - a);
      d != s && (u.scrollTop = d);
    }
    var p =
        e.curOp && null != e.curOp.scrollLeft
          ? e.curOp.scrollLeft
          : o.scroller.scrollLeft,
      g = jt(e) - (e.options.fixedGutter ? o.gutters.offsetWidth : 0),
      v = n - t > g;
    return (
      v && (n = t + g),
      10 > t
        ? (u.scrollLeft = 0)
        : p > t
        ? (u.scrollLeft = Math.max(0, t - (v ? 0 : 10)))
        : n > g + p - 3 && (u.scrollLeft = n + (v ? 0 : 10) - g),
      u
    );
  }
  function Hn(e, t, r) {
    (null != t || null != r) && Pn(e),
      null != t &&
        (e.curOp.scrollLeft =
          (null == e.curOp.scrollLeft ? e.doc.scrollLeft : e.curOp.scrollLeft) +
          t),
      null != r &&
        (e.curOp.scrollTop =
          (null == e.curOp.scrollTop ? e.doc.scrollTop : e.curOp.scrollTop) +
          r);
  }
  function In(e) {
    Pn(e);
    var t = e.getCursor(),
      r = t,
      n = t;
    e.options.lineWrapping ||
      ((r = t.ch ? Ol(t.line, t.ch - 1) : t), (n = Ol(t.line, t.ch + 1))),
      (e.curOp.scrollToPos = {
        from: r,
        to: n,
        margin: e.options.cursorScrollMargin,
        isCursor: !0,
      });
  }
  function Pn(e) {
    var t = e.curOp.scrollToPos;
    if (t) {
      e.curOp.scrollToPos = null;
      var r = hr(e, t.from),
        n = hr(e, t.to),
        i = Dn(
          e,
          Math.min(r.left, n.left),
          Math.min(r.top, n.top) - t.margin,
          Math.max(r.right, n.right),
          Math.max(r.bottom, n.bottom) + t.margin
        );
      e.scrollTo(i.scrollLeft, i.scrollTop);
    }
  }
  function En(e, t, r, n) {
    var i,
      o = e.doc;
    null == r && (r = "add"),
      "smart" == r && (o.mode.indent ? (i = Bt(e, t)) : (r = "prev"));
    var l = e.options.tabSize,
      s = _i(o, t),
      a = Ds(s.text, null, l);
    s.stateAfter && (s.stateAfter = null);
    var u,
      c = s.text.match(/^\s*/)[0];
    if (n || /\S/.test(s.text)) {
      if (
        "smart" == r &&
        ((u = o.mode.indent(i, s.text.slice(c.length), s.text)),
        u == As || u > 150)
      ) {
        if (!n) return;
        r = "prev";
      }
    } else (u = 0), (r = "not");
    "prev" == r
      ? (u = t > o.first ? Ds(_i(o, t - 1).text, null, l) : 0)
      : "add" == r
      ? (u = a + e.options.indentUnit)
      : "subtract" == r
      ? (u = a - e.options.indentUnit)
      : "number" == typeof r && (u = a + r),
      (u = Math.max(0, u));
    var f = "",
      h = 0;
    if (e.options.indentWithTabs)
      for (var d = Math.floor(u / l); d; --d) (h += l), (f += "	");
    if ((u > h && (f += Ao(u - h)), f != c))
      return (
        An(o, f, Ol(t, 0), Ol(t, c.length), "+input"), (s.stateAfter = null), !0
      );
    for (var d = 0; d < o.sel.ranges.length; d++) {
      var p = o.sel.ranges[d];
      if (p.head.line == t && p.head.ch < c.length) {
        var h = Ol(t, c.length);
        Ct(o, d, new ft(h, h));
        break;
      }
    }
  }
  function zn(e, t, r, n) {
    var i = t,
      o = t;
    return (
      "number" == typeof t ? (o = _i(e, pt(e, t))) : (i = Zi(t)),
      null == i ? null : (n(o, i) && e.cm && Ir(e.cm, i, r), o)
    );
  }
  function Fn(e, t) {
    for (var r = e.doc.sel.ranges, n = [], i = 0; i < r.length; i++) {
      for (var o = t(r[i]); n.length && Dl(o.from, No(n).to) <= 0; ) {
        var l = n.pop();
        if (Dl(l.from, o.from) < 0) {
          o.from = l.from;
          break;
        }
      }
      n.push(o);
    }
    Mr(e, function () {
      for (var t = n.length - 1; t >= 0; t--)
        An(e.doc, "", n[t].from, n[t].to, "+delete");
      In(e);
    });
  }
  function Rn(e, t, r, n, i) {
    function o() {
      var t = s + r;
      return t < e.first || t >= e.first + e.size
        ? (f = !1)
        : ((s = t), (c = _i(e, t)));
    }
    function l(e) {
      var t = (i ? al : ul)(c, a, r, !0);
      if (null == t) {
        if (e || !o()) return (f = !1);
        a = i ? (0 > r ? tl : el)(c) : 0 > r ? c.text.length : 0;
      } else a = t;
      return !0;
    }
    var s = t.line,
      a = t.ch,
      u = r,
      c = _i(e, s),
      f = !0;
    if ("char" == n) l();
    else if ("column" == n) l(!0);
    else if ("word" == n || "group" == n)
      for (
        var h = null,
          d = "group" == n,
          p = e.cm && e.cm.getHelper(t, "wordChars"),
          g = !0;
        !(0 > r) || l(!g);
        g = !1
      ) {
        var v = c.text.charAt(a) || "\n",
          m = Eo(v, p)
            ? "w"
            : d && "\n" == v
            ? "n"
            : !d || /\s/.test(v)
            ? null
            : "p";
        if ((!d || g || m || (m = "s"), h && h != m)) {
          0 > r && ((r = 1), l());
          break;
        }
        if ((m && (h = m), r > 0 && !l(!g))) break;
      }
    var y = Ot(e, Ol(s, a), u, !0);
    return f || (y.hitSide = !0), y;
  }
  function Bn(e, t, r, n) {
    var i,
      o = e.doc,
      l = t.left;
    if ("page" == n) {
      var s = Math.min(
        e.display.wrapper.clientHeight,
        window.innerHeight || document.documentElement.clientHeight
      );
      i = t.top + r * (s - (0 > r ? 1.5 : 0.5) * vr(e.display));
    } else "line" == n && (i = r > 0 ? t.bottom + 3 : t.top - 3);
    for (;;) {
      var a = pr(e, l, i);
      if (!a.outside) break;
      if (0 > r ? 0 >= i : i >= o.height) {
        a.hitSide = !0;
        break;
      }
      i += 5 * r;
    }
    return a;
  }
  function Gn(t, r, n, i) {
    (e.defaults[t] = r),
      n &&
        (Yl[t] = i
          ? function (e, t, r) {
              r != $l && n(e, t, r);
            }
          : n);
  }
  function Un(e) {
    for (
      var t, r, n, i, o = e.split(/-(?!$)/), e = o[o.length - 1], l = 0;
      l < o.length - 1;
      l++
    ) {
      var s = o[l];
      if (/^(cmd|meta|m)$/i.test(s)) i = !0;
      else if (/^a(lt)?$/i.test(s)) t = !0;
      else if (/^(c|ctrl|control)$/i.test(s)) r = !0;
      else {
        if (!/^s(hift)$/i.test(s))
          throw new Error("Unrecognized modifier name: " + s);
        n = !0;
      }
    }
    return (
      t && (e = "Alt-" + e),
      r && (e = "Ctrl-" + e),
      i && (e = "Cmd-" + e),
      n && (e = "Shift-" + e),
      e
    );
  }
  function Vn(e) {
    return "string" == typeof e ? is[e] : e;
  }
  function Kn(e, t, r, n, i) {
    if (n && n.shared) return jn(e, t, r, n, i);
    if (e.cm && !e.cm.curOp) return Ar(e.cm, Kn)(e, t, r, n, i);
    var o = new cs(e, i),
      l = Dl(t, r);
    if ((n && Io(n, o, !1), l > 0 || (0 == l && o.clearWhenEmpty !== !1)))
      return o;
    if (
      (o.replacedWith &&
        ((o.collapsed = !0),
        (o.widgetNode = Ro("span", [o.replacedWith], "CodeMirror-widget")),
        n.handleMouseEvents ||
          o.widgetNode.setAttribute("cm-ignore-events", "true"),
        n.insertLeft && (o.widgetNode.insertLeft = !0)),
      o.collapsed)
    ) {
      if (
        di(e, t.line, t, r, o) ||
        (t.line != r.line && di(e, r.line, t, r, o))
      )
        throw new Error(
          "Inserting collapsed marker partially overlapping an existing one"
        );
      Wl = !0;
    }
    o.addToHistory &&
      oo(e, { from: t, to: r, origin: "markText" }, e.sel, 0 / 0);
    var s,
      a = t.line,
      u = e.cm;
    if (
      (e.iter(a, r.line + 1, function (e) {
        u &&
          o.collapsed &&
          !u.options.lineWrapping &&
          pi(e) == u.display.maxLine &&
          (s = !0),
          o.collapsed && a != t.line && qi(e, 0),
          Qn(
            e,
            new $n(o, a == t.line ? t.ch : null, a == r.line ? r.ch : null)
          ),
          ++a;
      }),
      o.collapsed &&
        e.iter(t.line, r.line + 1, function (t) {
          yi(e, t) && qi(t, 0);
        }),
      o.clearOnEnter &&
        Ss(o, "beforeCursorEnter", function () {
          o.clear();
        }),
      o.readOnly &&
        ((Nl = !0),
        (e.history.done.length || e.history.undone.length) && e.clearHistory()),
      o.collapsed && ((o.id = ++us), (o.atomic = !0)),
      u)
    ) {
      if ((s && (u.curOp.updateMaxLine = !0), o.collapsed))
        Hr(u, t.line, r.line + 1);
      else if (o.className || o.title || o.startStyle || o.endStyle || o.css)
        for (var c = t.line; c <= r.line; c++) Ir(u, c, "text");
      o.atomic && Nt(u.doc), wo(u, "markerAdded", u, o);
    }
    return o;
  }
  function jn(e, t, r, n, i) {
    (n = Io(n)), (n.shared = !1);
    var o = [Kn(e, t, r, n, i)],
      l = o[0],
      s = n.widgetNode;
    return (
      ji(e, function (e) {
        s && (n.widgetNode = s.cloneNode(!0)),
          o.push(Kn(e, gt(e, t), gt(e, r), n, i));
        for (var a = 0; a < e.linked.length; ++a)
          if (e.linked[a].isParent) return;
        l = No(o);
      }),
      new fs(o, l)
    );
  }
  function Xn(e) {
    return e.findMarks(
      Ol(e.first, 0),
      e.clipPos(Ol(e.lastLine())),
      function (e) {
        return e.parent;
      }
    );
  }
  function _n(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r],
        i = n.find(),
        o = e.clipPos(i.from),
        l = e.clipPos(i.to);
      if (Dl(o, l)) {
        var s = Kn(e, o, l, n.primary, n.primary.type);
        n.markers.push(s), (s.parent = n);
      }
    }
  }
  function Yn(e) {
    for (var t = 0; t < e.length; t++) {
      var r = e[t],
        n = [r.primary.doc];
      ji(r.primary.doc, function (e) {
        n.push(e);
      });
      for (var i = 0; i < r.markers.length; i++) {
        var o = r.markers[i];
        -1 == Wo(n, o.doc) && ((o.parent = null), r.markers.splice(i--, 1));
      }
    }
  }
  function $n(e, t, r) {
    (this.marker = e), (this.from = t), (this.to = r);
  }
  function qn(e, t) {
    if (e)
      for (var r = 0; r < e.length; ++r) {
        var n = e[r];
        if (n.marker == t) return n;
      }
  }
  function Zn(e, t) {
    for (var r, n = 0; n < e.length; ++n)
      e[n] != t && (r || (r = [])).push(e[n]);
    return r;
  }
  function Qn(e, t) {
    (e.markedSpans = e.markedSpans ? e.markedSpans.concat([t]) : [t]),
      t.marker.attachLine(e);
  }
  function Jn(e, t, r) {
    if (e)
      for (var n, i = 0; i < e.length; ++i) {
        var o = e[i],
          l = o.marker,
          s = null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
        if (
          s ||
          (o.from == t && "bookmark" == l.type && (!r || !o.marker.insertLeft))
        ) {
          var a = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
          (n || (n = [])).push(new $n(l, o.from, a ? null : o.to));
        }
      }
    return n;
  }
  function ei(e, t, r) {
    if (e)
      for (var n, i = 0; i < e.length; ++i) {
        var o = e[i],
          l = o.marker,
          s = null == o.to || (l.inclusiveRight ? o.to >= t : o.to > t);
        if (
          s ||
          (o.from == t && "bookmark" == l.type && (!r || o.marker.insertLeft))
        ) {
          var a =
            null == o.from || (l.inclusiveLeft ? o.from <= t : o.from < t);
          (n || (n = [])).push(
            new $n(l, a ? null : o.from - t, null == o.to ? null : o.to - t)
          );
        }
      }
    return n;
  }
  function ti(e, t) {
    if (t.full) return null;
    var r = mt(e, t.from.line) && _i(e, t.from.line).markedSpans,
      n = mt(e, t.to.line) && _i(e, t.to.line).markedSpans;
    if (!r && !n) return null;
    var i = t.from.ch,
      o = t.to.ch,
      l = 0 == Dl(t.from, t.to),
      s = Jn(r, i, l),
      a = ei(n, o, l),
      u = 1 == t.text.length,
      c = No(t.text).length + (u ? i : 0);
    if (s)
      for (var f = 0; f < s.length; ++f) {
        var h = s[f];
        if (null == h.to) {
          var d = qn(a, h.marker);
          d ? u && (h.to = null == d.to ? null : d.to + c) : (h.to = i);
        }
      }
    if (a)
      for (var f = 0; f < a.length; ++f) {
        var h = a[f];
        if ((null != h.to && (h.to += c), null == h.from)) {
          var d = qn(s, h.marker);
          d || ((h.from = c), u && (s || (s = [])).push(h));
        } else (h.from += c), u && (s || (s = [])).push(h);
      }
    s && (s = ri(s)), a && a != s && (a = ri(a));
    var p = [s];
    if (!u) {
      var g,
        v = t.text.length - 2;
      if (v > 0 && s)
        for (var f = 0; f < s.length; ++f)
          null == s[f].to &&
            (g || (g = [])).push(new $n(s[f].marker, null, null));
      for (var f = 0; v > f; ++f) p.push(g);
      p.push(a);
    }
    return p;
  }
  function ri(e) {
    for (var t = 0; t < e.length; ++t) {
      var r = e[t];
      null != r.from &&
        r.from == r.to &&
        r.marker.clearWhenEmpty !== !1 &&
        e.splice(t--, 1);
    }
    return e.length ? e : null;
  }
  function ni(e, t) {
    var r = fo(e, t),
      n = ti(e, t);
    if (!r) return n;
    if (!n) return r;
    for (var i = 0; i < r.length; ++i) {
      var o = r[i],
        l = n[i];
      if (o && l)
        e: for (var s = 0; s < l.length; ++s) {
          for (var a = l[s], u = 0; u < o.length; ++u)
            if (o[u].marker == a.marker) continue e;
          o.push(a);
        }
      else l && (r[i] = l);
    }
    return r;
  }
  function ii(e, t, r) {
    var n = null;
    if (
      (e.iter(t.line, r.line + 1, function (e) {
        if (e.markedSpans)
          for (var t = 0; t < e.markedSpans.length; ++t) {
            var r = e.markedSpans[t].marker;
            !r.readOnly || (n && -1 != Wo(n, r)) || (n || (n = [])).push(r);
          }
      }),
      !n)
    )
      return null;
    for (var i = [{ from: t, to: r }], o = 0; o < n.length; ++o)
      for (var l = n[o], s = l.find(0), a = 0; a < i.length; ++a) {
        var u = i[a];
        if (!(Dl(u.to, s.from) < 0 || Dl(u.from, s.to) > 0)) {
          var c = [a, 1],
            f = Dl(u.from, s.from),
            h = Dl(u.to, s.to);
          (0 > f || (!l.inclusiveLeft && !f)) &&
            c.push({ from: u.from, to: s.from }),
            (h > 0 || (!l.inclusiveRight && !h)) &&
              c.push({ from: s.to, to: u.to }),
            i.splice.apply(i, c),
            (a += c.length - 1);
        }
      }
    return i;
  }
  function oi(e) {
    var t = e.markedSpans;
    if (t) {
      for (var r = 0; r < t.length; ++r) t[r].marker.detachLine(e);
      e.markedSpans = null;
    }
  }
  function li(e, t) {
    if (t) {
      for (var r = 0; r < t.length; ++r) t[r].marker.attachLine(e);
      e.markedSpans = t;
    }
  }
  function si(e) {
    return e.inclusiveLeft ? -1 : 0;
  }
  function ai(e) {
    return e.inclusiveRight ? 1 : 0;
  }
  function ui(e, t) {
    var r = e.lines.length - t.lines.length;
    if (0 != r) return r;
    var n = e.find(),
      i = t.find(),
      o = Dl(n.from, i.from) || si(e) - si(t);
    if (o) return -o;
    var l = Dl(n.to, i.to) || ai(e) - ai(t);
    return l ? l : t.id - e.id;
  }
  function ci(e, t) {
    var r,
      n = Wl && e.markedSpans;
    if (n)
      for (var i, o = 0; o < n.length; ++o)
        (i = n[o]),
          i.marker.collapsed &&
            null == (t ? i.from : i.to) &&
            (!r || ui(r, i.marker) < 0) &&
            (r = i.marker);
    return r;
  }
  function fi(e) {
    return ci(e, !0);
  }
  function hi(e) {
    return ci(e, !1);
  }
  function di(e, t, r, n, i) {
    var o = _i(e, t),
      l = Wl && o.markedSpans;
    if (l)
      for (var s = 0; s < l.length; ++s) {
        var a = l[s];
        if (a.marker.collapsed) {
          var u = a.marker.find(0),
            c = Dl(u.from, r) || si(a.marker) - si(i),
            f = Dl(u.to, n) || ai(a.marker) - ai(i);
          if (
            !((c >= 0 && 0 >= f) || (0 >= c && f >= 0)) &&
            ((0 >= c &&
              (Dl(u.to, r) > 0 ||
                (a.marker.inclusiveRight && i.inclusiveLeft))) ||
              (c >= 0 &&
                (Dl(u.from, n) < 0 ||
                  (a.marker.inclusiveLeft && i.inclusiveRight))))
          )
            return !0;
        }
      }
  }
  function pi(e) {
    for (var t; (t = fi(e)); ) e = t.find(-1, !0).line;
    return e;
  }
  function gi(e) {
    for (var t, r; (t = hi(e)); )
      (e = t.find(1, !0).line), (r || (r = [])).push(e);
    return r;
  }
  function vi(e, t) {
    var r = _i(e, t),
      n = pi(r);
    return r == n ? t : Zi(n);
  }
  function mi(e, t) {
    if (t > e.lastLine()) return t;
    var r,
      n = _i(e, t);
    if (!yi(e, n)) return t;
    for (; (r = hi(n)); ) n = r.find(1, !0).line;
    return Zi(n) + 1;
  }
  function yi(e, t) {
    var r = Wl && t.markedSpans;
    if (r)
      for (var n, i = 0; i < r.length; ++i)
        if (((n = r[i]), n.marker.collapsed)) {
          if (null == n.from) return !0;
          if (
            !n.marker.widgetNode &&
            0 == n.from &&
            n.marker.inclusiveLeft &&
            bi(e, t, n)
          )
            return !0;
        }
  }
  function bi(e, t, r) {
    if (null == r.to) {
      var n = r.marker.find(1, !0);
      return bi(e, n.line, qn(n.line.markedSpans, r.marker));
    }
    if (r.marker.inclusiveRight && r.to == t.text.length) return !0;
    for (var i, o = 0; o < t.markedSpans.length; ++o)
      if (
        ((i = t.markedSpans[o]),
        i.marker.collapsed &&
          !i.marker.widgetNode &&
          i.from == r.to &&
          (null == i.to || i.to != r.from) &&
          (i.marker.inclusiveLeft || r.marker.inclusiveRight) &&
          bi(e, t, i))
      )
        return !0;
  }
  function wi(e, t, r) {
    Ji(t) < ((e.curOp && e.curOp.scrollTop) || e.doc.scrollTop) &&
      Hn(e, null, r);
  }
  function xi(e) {
    if (null != e.height) return e.height;
    var t = e.doc.cm;
    if (!t) return 0;
    if (!Rs(document.body, e.node)) {
      var r = "position: relative;";
      e.coverGutter &&
        (r += "margin-left: -" + t.display.gutters.offsetWidth + "px;"),
        e.noHScroll && (r += "width: " + t.display.wrapper.clientWidth + "px;"),
        Go(t.display.measure, Ro("div", [e.node], null, r));
    }
    return (e.height = e.node.offsetHeight);
  }
  function Ci(e, t, r, n) {
    var i = new hs(e, r, n),
      o = e.cm;
    return (
      o && i.noHScroll && (o.display.alignWidgets = !0),
      zn(e, t, "widget", function (t) {
        var r = t.widgets || (t.widgets = []);
        if (
          (null == i.insertAt
            ? r.push(i)
            : r.splice(Math.min(r.length - 1, Math.max(0, i.insertAt)), 0, i),
          (i.line = t),
          o && !yi(e, t))
        ) {
          var n = Ji(t) < e.scrollTop;
          qi(t, t.height + xi(i)),
            n && Hn(o, null, i.height),
            (o.curOp.forceUpdate = !0);
        }
        return !0;
      }),
      i
    );
  }
  function Si(e, t, r, n) {
    (e.text = t),
      e.stateAfter && (e.stateAfter = null),
      e.styles && (e.styles = null),
      null != e.order && (e.order = null),
      oi(e),
      li(e, r);
    var i = n ? n(e) : 1;
    i != e.height && qi(e, i);
  }
  function Li(e) {
    (e.parent = null), oi(e);
  }
  function ki(e, t) {
    if (e)
      for (;;) {
        var r = e.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!r) break;
        e = e.slice(0, r.index) + e.slice(r.index + r[0].length);
        var n = r[1] ? "bgClass" : "textClass";
        null == t[n]
          ? (t[n] = r[2])
          : new RegExp("(?:^|s)" + r[2] + "(?:$|s)").test(t[n]) ||
            (t[n] += " " + r[2]);
      }
    return e;
  }
  function Ti(t, r) {
    if (t.blankLine) return t.blankLine(r);
    if (t.innerMode) {
      var n = e.innerMode(t, r);
      return n.mode.blankLine ? n.mode.blankLine(n.state) : void 0;
    }
  }
  function Mi(t, r, n, i) {
    for (var o = 0; 10 > o; o++) {
      i && (i[0] = e.innerMode(t, n).mode);
      var l = t.token(r, n);
      if (r.pos > r.start) return l;
    }
    throw new Error("Mode " + t.name + " failed to advance stream.");
  }
  function Ai(e, t, r, n) {
    function i(e) {
      return {
        start: f.start,
        end: f.pos,
        string: f.current(),
        type: o || null,
        state: e ? ts(l.mode, c) : c,
      };
    }
    var o,
      l = e.doc,
      s = l.mode;
    t = gt(l, t);
    var a,
      u = _i(l, t.line),
      c = Bt(e, t.line, r),
      f = new as(u.text, e.options.tabSize);
    for (n && (a = []); (n || f.pos < t.ch) && !f.eol(); )
      (f.start = f.pos), (o = Mi(s, f, c)), n && a.push(i(!0));
    return n ? a : i();
  }
  function Ni(e, t, r, n, i, o, l) {
    var s = r.flattenSpans;
    null == s && (s = e.options.flattenSpans);
    var a,
      u = 0,
      c = null,
      f = new as(t, e.options.tabSize),
      h = e.options.addModeClass && [null];
    for ("" == t && ki(Ti(r, n), o); !f.eol(); ) {
      if (
        (f.pos > e.options.maxHighlightLength
          ? ((s = !1), l && Di(e, t, n, f.pos), (f.pos = t.length), (a = null))
          : (a = ki(Mi(r, f, n, h), o)),
        h)
      ) {
        var d = h[0].name;
        d && (a = "m-" + (a ? d + " " + a : d));
      }
      if (!s || c != a) {
        for (; u < f.start; ) (u = Math.min(f.start, u + 5e4)), i(u, c);
        c = a;
      }
      f.start = f.pos;
    }
    for (; u < f.pos; ) {
      var p = Math.min(f.pos, u + 5e4);
      i(p, c), (u = p);
    }
  }
  function Wi(e, t, r, n) {
    var i = [e.state.modeGen],
      o = {};
    Ni(
      e,
      t.text,
      e.doc.mode,
      r,
      function (e, t) {
        i.push(e, t);
      },
      o,
      n
    );
    for (var l = 0; l < e.state.overlays.length; ++l) {
      var s = e.state.overlays[l],
        a = 1,
        u = 0;
      Ni(
        e,
        t.text,
        s.mode,
        !0,
        function (e, t) {
          for (var r = a; e > u; ) {
            var n = i[a];
            n > e && i.splice(a, 1, e, i[a + 1], n),
              (a += 2),
              (u = Math.min(e, n));
          }
          if (t)
            if (s.opaque) i.splice(r, a - r, e, "cm-overlay " + t), (a = r + 2);
            else
              for (; a > r; r += 2) {
                var o = i[r + 1];
                i[r + 1] = (o ? o + " " : "") + "cm-overlay " + t;
              }
        },
        o
      );
    }
    return { styles: i, classes: o.bgClass || o.textClass ? o : null };
  }
  function Oi(e, t, r) {
    if (!t.styles || t.styles[0] != e.state.modeGen) {
      var n = Wi(e, t, (t.stateAfter = Bt(e, Zi(t))));
      (t.styles = n.styles),
        n.classes
          ? (t.styleClasses = n.classes)
          : t.styleClasses && (t.styleClasses = null),
        r === e.doc.frontier && e.doc.frontier++;
    }
    return t.styles;
  }
  function Di(e, t, r, n) {
    var i = e.doc.mode,
      o = new as(t, e.options.tabSize);
    for (
      o.start = o.pos = n || 0, "" == t && Ti(i, r);
      !o.eol() && o.pos <= e.options.maxHighlightLength;

    )
      Mi(i, o, r), (o.start = o.pos);
  }
  function Hi(e, t) {
    if (!e || /^\s*$/.test(e)) return null;
    var r = t.addModeClass ? gs : ps;
    return r[e] || (r[e] = e.replace(/\S+/g, "cm-$&"));
  }
  function Ii(e, t) {
    var r = Ro("span", null, null, gl ? "padding-right: .1px" : null),
      n = {
        pre: Ro("pre", [r]),
        content: r,
        col: 0,
        pos: 0,
        cm: e,
        splitSpaces: (dl || gl) && e.getOption("lineWrapping"),
      };
    t.measure = {};
    for (var i = 0; i <= (t.rest ? t.rest.length : 0); i++) {
      var o,
        l = i ? t.rest[i - 1] : t.line;
      (n.pos = 0),
        (n.addToken = Ei),
        $o(e.display.measure) &&
          (o = eo(l)) &&
          (n.addToken = Fi(n.addToken, o)),
        (n.map = []);
      var s = t != e.display.externalMeasured && Zi(l);
      Bi(l, n, Oi(e, l, s)),
        l.styleClasses &&
          (l.styleClasses.bgClass &&
            (n.bgClass = Ko(l.styleClasses.bgClass, n.bgClass || "")),
          l.styleClasses.textClass &&
            (n.textClass = Ko(l.styleClasses.textClass, n.textClass || ""))),
        0 == n.map.length &&
          n.map.push(0, 0, n.content.appendChild(Yo(e.display.measure))),
        0 == i
          ? ((t.measure.map = n.map), (t.measure.cache = {}))
          : ((t.measure.maps || (t.measure.maps = [])).push(n.map),
            (t.measure.caches || (t.measure.caches = [])).push({}));
    }
    return (
      gl &&
        /\bcm-tab\b/.test(n.content.lastChild.className) &&
        (n.content.className = "cm-tab-wrap-hack"),
      ks(e, "renderLine", e, t.line, n.pre),
      n.pre.className && (n.textClass = Ko(n.pre.className, n.textClass || "")),
      n
    );
  }
  function Pi(e) {
    var t = Ro("span", "•", "cm-invalidchar");
    return (
      (t.title = "\\u" + e.charCodeAt(0).toString(16)),
      t.setAttribute("aria-label", t.title),
      t
    );
  }
  function Ei(e, t, r, n, i, o, l) {
    if (t) {
      var s = e.splitSpaces ? t.replace(/ {3,}/g, zi) : t,
        a = e.cm.state.specialChars,
        u = !1;
      if (a.test(t))
        for (var c = document.createDocumentFragment(), f = 0; ; ) {
          a.lastIndex = f;
          var h = a.exec(t),
            d = h ? h.index - f : t.length - f;
          if (d) {
            var p = document.createTextNode(s.slice(f, f + d));
            c.appendChild(dl && 9 > pl ? Ro("span", [p]) : p),
              e.map.push(e.pos, e.pos + d, p),
              (e.col += d),
              (e.pos += d);
          }
          if (!h) break;
          if (((f += d + 1), "	" == h[0])) {
            var g = e.cm.options.tabSize,
              v = g - (e.col % g),
              p = c.appendChild(Ro("span", Ao(v), "cm-tab"));
            p.setAttribute("role", "presentation"),
              p.setAttribute("cm-text", "	"),
              (e.col += v);
          } else {
            var p = e.cm.options.specialCharPlaceholder(h[0]);
            p.setAttribute("cm-text", h[0]),
              c.appendChild(dl && 9 > pl ? Ro("span", [p]) : p),
              (e.col += 1);
          }
          e.map.push(e.pos, e.pos + 1, p), e.pos++;
        }
      else {
        e.col += t.length;
        var c = document.createTextNode(s);
        e.map.push(e.pos, e.pos + t.length, c),
          dl && 9 > pl && (u = !0),
          (e.pos += t.length);
      }
      if (r || n || i || u || l) {
        var m = r || "";
        n && (m += n), i && (m += i);
        var y = Ro("span", [c], m, l);
        return o && (y.title = o), e.content.appendChild(y);
      }
      e.content.appendChild(c);
    }
  }
  function zi(e) {
    for (var t = " ", r = 0; r < e.length - 2; ++r) t += r % 2 ? " " : " ";
    return (t += " ");
  }
  function Fi(e, t) {
    return function (r, n, i, o, l, s, a) {
      i = i ? i + " cm-force-border" : "cm-force-border";
      for (var u = r.pos, c = u + n.length; ; ) {
        for (var f = 0; f < t.length; f++) {
          var h = t[f];
          if (h.to > u && h.from <= u) break;
        }
        if (h.to >= c) return e(r, n, i, o, l, s, a);
        e(r, n.slice(0, h.to - u), i, o, null, s, a),
          (o = null),
          (n = n.slice(h.to - u)),
          (u = h.to);
      }
    };
  }
  function Ri(e, t, r, n) {
    var i = !n && r.widgetNode;
    i && e.map.push(e.pos, e.pos + t, i),
      !n &&
        e.cm.display.input.needsContentAttribute &&
        (i || (i = e.content.appendChild(document.createElement("span"))),
        i.setAttribute("cm-marker", r.id)),
      i && (e.cm.display.input.setUneditable(i), e.content.appendChild(i)),
      (e.pos += t);
  }
  function Bi(e, t, r) {
    var n = e.markedSpans,
      i = e.text,
      o = 0;
    if (n)
      for (
        var l, s, a, u, c, f, h, d = i.length, p = 0, g = 1, v = "", m = 0;
        ;

      ) {
        if (m == p) {
          (a = u = c = f = s = ""), (h = null), (m = 1 / 0);
          for (var y = [], b = 0; b < n.length; ++b) {
            var w = n[b],
              x = w.marker;
            "bookmark" == x.type && w.from == p && x.widgetNode
              ? y.push(x)
              : w.from <= p &&
                (null == w.to ||
                  w.to > p ||
                  (x.collapsed && w.to == p && w.from == p))
              ? (null != w.to &&
                  w.to != p &&
                  m > w.to &&
                  ((m = w.to), (u = "")),
                x.className && (a += " " + x.className),
                x.css && (s = x.css),
                x.startStyle && w.from == p && (c += " " + x.startStyle),
                x.endStyle && w.to == m && (u += " " + x.endStyle),
                x.title && !f && (f = x.title),
                x.collapsed && (!h || ui(h.marker, x) < 0) && (h = w))
              : w.from > p && m > w.from && (m = w.from);
          }
          if (h && (h.from || 0) == p) {
            if (
              (Ri(
                t,
                (null == h.to ? d + 1 : h.to) - p,
                h.marker,
                null == h.from
              ),
              null == h.to)
            )
              return;
            h.to == p && (h = !1);
          }
          if (!h && y.length) for (var b = 0; b < y.length; ++b) Ri(t, 0, y[b]);
        }
        if (p >= d) break;
        for (var C = Math.min(d, m); ; ) {
          if (v) {
            var S = p + v.length;
            if (!h) {
              var L = S > C ? v.slice(0, C - p) : v;
              t.addToken(
                t,
                L,
                l ? l + a : a,
                c,
                p + L.length == m ? u : "",
                f,
                s
              );
            }
            if (S >= C) {
              (v = v.slice(C - p)), (p = C);
              break;
            }
            (p = S), (c = "");
          }
          (v = i.slice(o, (o = r[g++]))), (l = Hi(r[g++], t.cm.options));
        }
      }
    else
      for (var g = 1; g < r.length; g += 2)
        t.addToken(t, i.slice(o, (o = r[g])), Hi(r[g + 1], t.cm.options));
  }
  function Gi(e, t) {
    return (
      0 == t.from.ch &&
      0 == t.to.ch &&
      "" == No(t.text) &&
      (!e.cm || e.cm.options.wholeLineUpdateBefore)
    );
  }
  function Ui(e, t, r, n) {
    function i(e) {
      return r ? r[e] : null;
    }
    function o(e, r, i) {
      Si(e, r, i, n), wo(e, "change", e, t);
    }
    function l(e, t) {
      for (var r = e, o = []; t > r; ++r) o.push(new ds(u[r], i(r), n));
      return o;
    }
    var s = t.from,
      a = t.to,
      u = t.text,
      c = _i(e, s.line),
      f = _i(e, a.line),
      h = No(u),
      d = i(u.length - 1),
      p = a.line - s.line;
    if (t.full)
      e.insert(0, l(0, u.length)), e.remove(u.length, e.size - u.length);
    else if (Gi(e, t)) {
      var g = l(0, u.length - 1);
      o(f, f.text, d),
        p && e.remove(s.line, p),
        g.length && e.insert(s.line, g);
    } else if (c == f)
      if (1 == u.length)
        o(c, c.text.slice(0, s.ch) + h + c.text.slice(a.ch), d);
      else {
        var g = l(1, u.length - 1);
        g.push(new ds(h + c.text.slice(a.ch), d, n)),
          o(c, c.text.slice(0, s.ch) + u[0], i(0)),
          e.insert(s.line + 1, g);
      }
    else if (1 == u.length)
      o(c, c.text.slice(0, s.ch) + u[0] + f.text.slice(a.ch), i(0)),
        e.remove(s.line + 1, p);
    else {
      o(c, c.text.slice(0, s.ch) + u[0], i(0)), o(f, h + f.text.slice(a.ch), d);
      var g = l(1, u.length - 1);
      p > 1 && e.remove(s.line + 1, p - 1), e.insert(s.line + 1, g);
    }
    wo(e, "change", e, t);
  }
  function Vi(e) {
    (this.lines = e), (this.parent = null);
    for (var t = 0, r = 0; t < e.length; ++t)
      (e[t].parent = this), (r += e[t].height);
    this.height = r;
  }
  function Ki(e) {
    this.children = e;
    for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
      var i = e[n];
      (t += i.chunkSize()), (r += i.height), (i.parent = this);
    }
    (this.size = t), (this.height = r), (this.parent = null);
  }
  function ji(e, t, r) {
    function n(e, i, o) {
      if (e.linked)
        for (var l = 0; l < e.linked.length; ++l) {
          var s = e.linked[l];
          if (s.doc != i) {
            var a = o && s.sharedHist;
            (!r || a) && (t(s.doc, a), n(s.doc, e, a));
          }
        }
    }
    n(e, null, !0);
  }
  function Xi(e, t) {
    if (t.cm) throw new Error("This document is already in use.");
    (e.doc = t),
      (t.cm = e),
      l(e),
      r(e),
      e.options.lineWrapping || h(e),
      (e.options.mode = t.modeOption),
      Hr(e);
  }
  function _i(e, t) {
    if (((t -= e.first), 0 > t || t >= e.size))
      throw new Error(
        "There is no line " + (t + e.first) + " in the document."
      );
    for (var r = e; !r.lines; )
      for (var n = 0; ; ++n) {
        var i = r.children[n],
          o = i.chunkSize();
        if (o > t) {
          r = i;
          break;
        }
        t -= o;
      }
    return r.lines[t];
  }
  function Yi(e, t, r) {
    var n = [],
      i = t.line;
    return (
      e.iter(t.line, r.line + 1, function (e) {
        var o = e.text;
        i == r.line && (o = o.slice(0, r.ch)),
          i == t.line && (o = o.slice(t.ch)),
          n.push(o),
          ++i;
      }),
      n
    );
  }
  function $i(e, t, r) {
    var n = [];
    return (
      e.iter(t, r, function (e) {
        n.push(e.text);
      }),
      n
    );
  }
  function qi(e, t) {
    var r = t - e.height;
    if (r) for (var n = e; n; n = n.parent) n.height += r;
  }
  function Zi(e) {
    if (null == e.parent) return null;
    for (
      var t = e.parent, r = Wo(t.lines, e), n = t.parent;
      n;
      t = n, n = n.parent
    )
      for (var i = 0; n.children[i] != t; ++i) r += n.children[i].chunkSize();
    return r + t.first;
  }
  function Qi(e, t) {
    var r = e.first;
    e: do {
      for (var n = 0; n < e.children.length; ++n) {
        var i = e.children[n],
          o = i.height;
        if (o > t) {
          e = i;
          continue e;
        }
        (t -= o), (r += i.chunkSize());
      }
      return r;
    } while (!e.lines);
    for (var n = 0; n < e.lines.length; ++n) {
      var l = e.lines[n],
        s = l.height;
      if (s > t) break;
      t -= s;
    }
    return r + n;
  }
  function Ji(e) {
    e = pi(e);
    for (var t = 0, r = e.parent, n = 0; n < r.lines.length; ++n) {
      var i = r.lines[n];
      if (i == e) break;
      t += i.height;
    }
    for (var o = r.parent; o; r = o, o = r.parent)
      for (var n = 0; n < o.children.length; ++n) {
        var l = o.children[n];
        if (l == r) break;
        t += l.height;
      }
    return t;
  }
  function eo(e) {
    var t = e.order;
    return null == t && (t = e.order = Qs(e.text)), t;
  }
  function to(e) {
    (this.done = []),
      (this.undone = []),
      (this.undoDepth = 1 / 0),
      (this.lastModTime = this.lastSelTime = 0),
      (this.lastOp = this.lastSelOp = null),
      (this.lastOrigin = this.lastSelOrigin = null),
      (this.generation = this.maxGeneration = e || 1);
  }
  function ro(e, t) {
    var r = { from: _(t.from), to: Xl(t), text: Yi(e, t.from, t.to) };
    return (
      uo(e, r, t.from.line, t.to.line + 1),
      ji(
        e,
        function (e) {
          uo(e, r, t.from.line, t.to.line + 1);
        },
        !0
      ),
      r
    );
  }
  function no(e) {
    for (; e.length; ) {
      var t = No(e);
      if (!t.ranges) break;
      e.pop();
    }
  }
  function io(e, t) {
    return t
      ? (no(e.done), No(e.done))
      : e.done.length && !No(e.done).ranges
      ? No(e.done)
      : e.done.length > 1 && !e.done[e.done.length - 2].ranges
      ? (e.done.pop(), No(e.done))
      : void 0;
  }
  function oo(e, t, r, n) {
    var i = e.history;
    i.undone.length = 0;
    var o,
      l = +new Date();
    if (
      (i.lastOp == n ||
        (i.lastOrigin == t.origin &&
          t.origin &&
          (("+" == t.origin.charAt(0) &&
            e.cm &&
            i.lastModTime > l - e.cm.options.historyEventDelay) ||
            "*" == t.origin.charAt(0)))) &&
      (o = io(i, i.lastOp == n))
    ) {
      var s = No(o.changes);
      0 == Dl(t.from, t.to) && 0 == Dl(t.from, s.to)
        ? (s.to = Xl(t))
        : o.changes.push(ro(e, t));
    } else {
      var a = No(i.done);
      for (
        (a && a.ranges) || ao(e.sel, i.done),
          o = { changes: [ro(e, t)], generation: i.generation },
          i.done.push(o);
        i.done.length > i.undoDepth;

      )
        i.done.shift(), i.done[0].ranges || i.done.shift();
    }
    i.done.push(r),
      (i.generation = ++i.maxGeneration),
      (i.lastModTime = i.lastSelTime = l),
      (i.lastOp = i.lastSelOp = n),
      (i.lastOrigin = i.lastSelOrigin = t.origin),
      s || ks(e, "historyAdded");
  }
  function lo(e, t, r, n) {
    var i = t.charAt(0);
    return (
      "*" == i ||
      ("+" == i &&
        r.ranges.length == n.ranges.length &&
        r.somethingSelected() == n.somethingSelected() &&
        new Date() - e.history.lastSelTime <=
          (e.cm ? e.cm.options.historyEventDelay : 500))
    );
  }
  function so(e, t, r, n) {
    var i = e.history,
      o = n && n.origin;
    r == i.lastSelOp ||
    (o &&
      i.lastSelOrigin == o &&
      ((i.lastModTime == i.lastSelTime && i.lastOrigin == o) ||
        lo(e, o, No(i.done), t)))
      ? (i.done[i.done.length - 1] = t)
      : ao(t, i.done),
      (i.lastSelTime = +new Date()),
      (i.lastSelOrigin = o),
      (i.lastSelOp = r),
      n && n.clearRedo !== !1 && no(i.undone);
  }
  function ao(e, t) {
    var r = No(t);
    (r && r.ranges && r.equals(e)) || t.push(e);
  }
  function uo(e, t, r, n) {
    var i = t["spans_" + e.id],
      o = 0;
    e.iter(Math.max(e.first, r), Math.min(e.first + e.size, n), function (r) {
      r.markedSpans &&
        ((i || (i = t["spans_" + e.id] = {}))[o] = r.markedSpans),
        ++o;
    });
  }
  function co(e) {
    if (!e) return null;
    for (var t, r = 0; r < e.length; ++r)
      e[r].marker.explicitlyCleared
        ? t || (t = e.slice(0, r))
        : t && t.push(e[r]);
    return t ? (t.length ? t : null) : e;
  }
  function fo(e, t) {
    var r = t["spans_" + e.id];
    if (!r) return null;
    for (var n = 0, i = []; n < t.text.length; ++n) i.push(co(r[n]));
    return i;
  }
  function ho(e, t, r) {
    for (var n = 0, i = []; n < e.length; ++n) {
      var o = e[n];
      if (o.ranges) i.push(r ? ct.prototype.deepCopy.call(o) : o);
      else {
        var l = o.changes,
          s = [];
        i.push({ changes: s });
        for (var a = 0; a < l.length; ++a) {
          var u,
            c = l[a];
          if ((s.push({ from: c.from, to: c.to, text: c.text }), t))
            for (var f in c)
              (u = f.match(/^spans_(\d+)$/)) &&
                Wo(t, Number(u[1])) > -1 &&
                ((No(s)[f] = c[f]), delete c[f]);
        }
      }
    }
    return i;
  }
  function po(e, t, r, n) {
    r < e.line ? (e.line += n) : t < e.line && ((e.line = t), (e.ch = 0));
  }
  function go(e, t, r, n) {
    for (var i = 0; i < e.length; ++i) {
      var o = e[i],
        l = !0;
      if (o.ranges) {
        o.copied || ((o = e[i] = o.deepCopy()), (o.copied = !0));
        for (var s = 0; s < o.ranges.length; s++)
          po(o.ranges[s].anchor, t, r, n), po(o.ranges[s].head, t, r, n);
      } else {
        for (var s = 0; s < o.changes.length; ++s) {
          var a = o.changes[s];
          if (r < a.from.line)
            (a.from = Ol(a.from.line + n, a.from.ch)),
              (a.to = Ol(a.to.line + n, a.to.ch));
          else if (t <= a.to.line) {
            l = !1;
            break;
          }
        }
        l || (e.splice(0, i + 1), (i = 0));
      }
    }
  }
  function vo(e, t) {
    var r = t.from.line,
      n = t.to.line,
      i = t.text.length - (n - r) - 1;
    go(e.done, r, n, i), go(e.undone, r, n, i);
  }
  function mo(e) {
    return null != e.defaultPrevented ? e.defaultPrevented : 0 == e.returnValue;
  }
  function yo(e) {
    return e.target || e.srcElement;
  }
  function bo(e) {
    var t = e.which;
    return (
      null == t &&
        (1 & e.button
          ? (t = 1)
          : 2 & e.button
          ? (t = 3)
          : 4 & e.button && (t = 2)),
      Ll && e.ctrlKey && 1 == t && (t = 3),
      t
    );
  }
  function wo(e, t) {
    function r(e) {
      return function () {
        e.apply(null, o);
      };
    }
    var n = e._handlers && e._handlers[t];
    if (n) {
      var i,
        o = Array.prototype.slice.call(arguments, 2);
      Fl
        ? (i = Fl.delayedCallbacks)
        : Ts
        ? (i = Ts)
        : ((i = Ts = []), setTimeout(xo, 0));
      for (var l = 0; l < n.length; ++l) i.push(r(n[l]));
    }
  }
  function xo() {
    var e = Ts;
    Ts = null;
    for (var t = 0; t < e.length; ++t) e[t]();
  }
  function Co(e, t, r) {
    return (
      "string" == typeof t &&
        (t = {
          type: t,
          preventDefault: function () {
            this.defaultPrevented = !0;
          },
        }),
      ks(e, r || t.type, e, t),
      mo(t) || t.codemirrorIgnore
    );
  }
  function So(e) {
    var t = e._handlers && e._handlers.cursorActivity;
    if (t)
      for (
        var r =
            e.curOp.cursorActivityHandlers ||
            (e.curOp.cursorActivityHandlers = []),
          n = 0;
        n < t.length;
        ++n
      )
        -1 == Wo(r, t[n]) && r.push(t[n]);
  }
  function Lo(e, t) {
    var r = e._handlers && e._handlers[t];
    return r && r.length > 0;
  }
  function ko(e) {
    (e.prototype.on = function (e, t) {
      Ss(this, e, t);
    }),
      (e.prototype.off = function (e, t) {
        Ls(this, e, t);
      });
  }
  function To() {
    this.id = null;
  }
  function Mo(e, t, r) {
    for (var n = 0, i = 0; ; ) {
      var o = e.indexOf("	", n);
      -1 == o && (o = e.length);
      var l = o - n;
      if (o == e.length || i + l >= t) return n + Math.min(l, t - i);
      if (((i += o - n), (i += r - (i % r)), (n = o + 1), i >= t)) return n;
    }
  }
  function Ao(e) {
    for (; Hs.length <= e; ) Hs.push(No(Hs) + " ");
    return Hs[e];
  }
  function No(e) {
    return e[e.length - 1];
  }
  function Wo(e, t) {
    for (var r = 0; r < e.length; ++r) if (e[r] == t) return r;
    return -1;
  }
  function Oo(e, t) {
    for (var r = [], n = 0; n < e.length; n++) r[n] = t(e[n], n);
    return r;
  }
  function Do() {}
  function Ho(e, t) {
    var r;
    return (
      Object.create
        ? (r = Object.create(e))
        : ((Do.prototype = e), (r = new Do())),
      t && Io(t, r),
      r
    );
  }
  function Io(e, t, r) {
    t || (t = {});
    for (var n in e)
      !e.hasOwnProperty(n) ||
        (r === !1 && t.hasOwnProperty(n)) ||
        (t[n] = e[n]);
    return t;
  }
  function Po(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return function () {
      return e.apply(null, t);
    };
  }
  function Eo(e, t) {
    return t ? (t.source.indexOf("\\w") > -1 && zs(e) ? !0 : t.test(e)) : zs(e);
  }
  function zo(e) {
    for (var t in e) if (e.hasOwnProperty(t) && e[t]) return !1;
    return !0;
  }
  function Fo(e) {
    return e.charCodeAt(0) >= 768 && Fs.test(e);
  }
  function Ro(e, t, r, n) {
    var i = document.createElement(e);
    if (
      (r && (i.className = r), n && (i.style.cssText = n), "string" == typeof t)
    )
      i.appendChild(document.createTextNode(t));
    else if (t) for (var o = 0; o < t.length; ++o) i.appendChild(t[o]);
    return i;
  }
  function Bo(e) {
    for (var t = e.childNodes.length; t > 0; --t) e.removeChild(e.firstChild);
    return e;
  }
  function Go(e, t) {
    return Bo(e).appendChild(t);
  }
  function Uo() {
    return document.activeElement;
  }
  function Vo(e) {
    return new RegExp("(^|\\s)" + e + "(?:$|\\s)\\s*");
  }
  function Ko(e, t) {
    for (var r = e.split(" "), n = 0; n < r.length; n++)
      r[n] && !Vo(r[n]).test(t) && (t += " " + r[n]);
    return t;
  }
  function jo(e) {
    if (document.body.getElementsByClassName)
      for (
        var t = document.body.getElementsByClassName("CodeMirror"), r = 0;
        r < t.length;
        r++
      ) {
        var n = t[r].CodeMirror;
        n && e(n);
      }
  }
  function Xo() {
    Ks || (_o(), (Ks = !0));
  }
  function _o() {
    var e;
    Ss(window, "resize", function () {
      null == e &&
        (e = setTimeout(function () {
          (e = null), jo(Ur);
        }, 100));
    }),
      Ss(window, "blur", function () {
        jo(pn);
      });
  }
  function Yo(e) {
    if (null == Bs) {
      var t = Ro("span", "​");
      Go(e, Ro("span", [t, document.createTextNode("x")])),
        0 != e.firstChild.offsetHeight &&
          (Bs = t.offsetWidth <= 1 && t.offsetHeight > 2 && !(dl && 8 > pl));
    }
    var r = Bs
      ? Ro("span", "​")
      : Ro(
          "span",
          " ",
          null,
          "display: inline-block; width: 1px; margin-right: -1px"
        );
    return r.setAttribute("cm-text", ""), r;
  }
  function $o(e) {
    if (null != Gs) return Gs;
    var t = Go(e, document.createTextNode("AخA")),
      r = Ps(t, 0, 1).getBoundingClientRect();
    if (!r || r.left == r.right) return !1;
    var n = Ps(t, 1, 2).getBoundingClientRect();
    return (Gs = n.right - r.right < 3);
  }
  function qo(e) {
    if (null != $s) return $s;
    var t = Go(e, Ro("span", "x")),
      r = t.getBoundingClientRect(),
      n = Ps(t, 0, 1).getBoundingClientRect();
    return ($s = Math.abs(r.left - n.left) > 1);
  }
  function Zo(e, t, r, n) {
    if (!e) return n(t, r, "ltr");
    for (var i = !1, o = 0; o < e.length; ++o) {
      var l = e[o];
      ((l.from < r && l.to > t) || (t == r && l.to == t)) &&
        (n(
          Math.max(l.from, t),
          Math.min(l.to, r),
          1 == l.level ? "rtl" : "ltr"
        ),
        (i = !0));
    }
    i || n(t, r, "ltr");
  }
  function Qo(e) {
    return e.level % 2 ? e.to : e.from;
  }
  function Jo(e) {
    return e.level % 2 ? e.from : e.to;
  }
  function el(e) {
    var t = eo(e);
    return t ? Qo(t[0]) : 0;
  }
  function tl(e) {
    var t = eo(e);
    return t ? Jo(No(t)) : e.text.length;
  }
  function rl(e, t) {
    var r = _i(e.doc, t),
      n = pi(r);
    n != r && (t = Zi(n));
    var i = eo(n),
      o = i ? (i[0].level % 2 ? tl(n) : el(n)) : 0;
    return Ol(t, o);
  }
  function nl(e, t) {
    for (var r, n = _i(e.doc, t); (r = hi(n)); )
      (n = r.find(1, !0).line), (t = null);
    var i = eo(n),
      o = i ? (i[0].level % 2 ? el(n) : tl(n)) : n.text.length;
    return Ol(null == t ? Zi(n) : t, o);
  }
  function il(e, t) {
    var r = rl(e, t.line),
      n = _i(e.doc, r.line),
      i = eo(n);
    if (!i || 0 == i[0].level) {
      var o = Math.max(0, n.text.search(/\S/)),
        l = t.line == r.line && t.ch <= o && t.ch;
      return Ol(r.line, l ? 0 : o);
    }
    return r;
  }
  function ol(e, t, r) {
    var n = e[0].level;
    return t == n ? !0 : r == n ? !1 : r > t;
  }
  function ll(e, t) {
    Zs = null;
    for (var r, n = 0; n < e.length; ++n) {
      var i = e[n];
      if (i.from < t && i.to > t) return n;
      if (i.from == t || i.to == t) {
        if (null != r)
          return ol(e, i.level, e[r].level)
            ? (i.from != i.to && (Zs = r), n)
            : (i.from != i.to && (Zs = n), r);
        r = n;
      }
    }
    return r;
  }
  function sl(e, t, r, n) {
    if (!n) return t + r;
    do t += r;
    while (t > 0 && Fo(e.text.charAt(t)));
    return t;
  }
  function al(e, t, r, n) {
    var i = eo(e);
    if (!i) return ul(e, t, r, n);
    for (
      var o = ll(i, t), l = i[o], s = sl(e, t, l.level % 2 ? -r : r, n);
      ;

    ) {
      if (s > l.from && s < l.to) return s;
      if (s == l.from || s == l.to)
        return ll(i, s) == o
          ? s
          : ((l = i[(o += r)]), r > 0 == l.level % 2 ? l.to : l.from);
      if (((l = i[(o += r)]), !l)) return null;
      s = r > 0 == l.level % 2 ? sl(e, l.to, -1, n) : sl(e, l.from, 1, n);
    }
  }
  function ul(e, t, r, n) {
    var i = t + r;
    if (n) for (; i > 0 && Fo(e.text.charAt(i)); ) i += r;
    return 0 > i || i > e.text.length ? null : i;
  }
  var cl = /gecko\/\d/i.test(navigator.userAgent),
    fl = /MSIE \d/.test(navigator.userAgent),
    hl = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),
    dl = fl || hl,
    pl = dl && (fl ? document.documentMode || 6 : hl[1]),
    gl = /WebKit\//.test(navigator.userAgent),
    vl = gl && /Qt\/\d+\.\d+/.test(navigator.userAgent),
    ml = /Chrome\//.test(navigator.userAgent),
    yl = /Opera\//.test(navigator.userAgent),
    bl = /Apple Computer/.test(navigator.vendor),
    wl = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
    xl = /PhantomJS/.test(navigator.userAgent),
    Cl =
      /AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent),
    Sl =
      Cl ||
      /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(
        navigator.userAgent
      ),
    Ll = Cl || /Mac/.test(navigator.platform),
    kl = /win/i.test(navigator.platform),
    Tl = yl && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
  Tl && (Tl = Number(Tl[1])), Tl && Tl >= 15 && ((yl = !1), (gl = !0));
  var Ml = Ll && (vl || (yl && (null == Tl || 12.11 > Tl))),
    Al = cl || (dl && pl >= 9),
    Nl = !1,
    Wl = !1;
  (g.prototype = Io(
    {
      update: function (e) {
        var t = e.scrollWidth > e.clientWidth + 1,
          r = e.scrollHeight > e.clientHeight + 1,
          n = e.nativeBarWidth;
        if (r) {
          (this.vert.style.display = "block"),
            (this.vert.style.bottom = t ? n + "px" : "0");
          var i = e.viewHeight - (t ? n : 0);
          this.vert.firstChild.style.height =
            Math.max(0, e.scrollHeight - e.clientHeight + i) + "px";
        } else
          (this.vert.style.display = ""),
            (this.vert.firstChild.style.height = "0");
        if (t) {
          (this.horiz.style.display = "block"),
            (this.horiz.style.right = r ? n + "px" : "0"),
            (this.horiz.style.left = e.barLeft + "px");
          var o = e.viewWidth - e.barLeft - (r ? n : 0);
          this.horiz.firstChild.style.width =
            e.scrollWidth - e.clientWidth + o + "px";
        } else
          (this.horiz.style.display = ""),
            (this.horiz.firstChild.style.width = "0");
        return (
          !this.checkedOverlay &&
            e.clientHeight > 0 &&
            (0 == n && this.overlayHack(), (this.checkedOverlay = !0)),
          { right: r ? n : 0, bottom: t ? n : 0 }
        );
      },
      setScrollLeft: function (e) {
        this.horiz.scrollLeft != e && (this.horiz.scrollLeft = e);
      },
      setScrollTop: function (e) {
        this.vert.scrollTop != e && (this.vert.scrollTop = e);
      },
      overlayHack: function () {
        var e = Ll && !wl ? "12px" : "18px";
        this.horiz.style.minHeight = this.vert.style.minWidth = e;
        var t = this,
          r = function (e) {
            yo(e) != t.vert && yo(e) != t.horiz && Ar(t.cm, jr)(e);
          };
        Ss(this.vert, "mousedown", r), Ss(this.horiz, "mousedown", r);
      },
      clear: function () {
        var e = this.horiz.parentNode;
        e.removeChild(this.horiz), e.removeChild(this.vert);
      },
    },
    g.prototype
  )),
    (v.prototype = Io(
      {
        update: function () {
          return { bottom: 0, right: 0 };
        },
        setScrollLeft: function () {},
        setScrollTop: function () {},
        clear: function () {},
      },
      v.prototype
    )),
    (e.scrollbarModel = { native: g, null: v }),
    (k.prototype.signal = function (e, t) {
      Lo(e, t) && this.events.push(arguments);
    }),
    (k.prototype.finish = function () {
      for (var e = 0; e < this.events.length; e++)
        ks.apply(null, this.events[e]);
    });
  var Ol = (e.Pos = function (e, t) {
      return this instanceof Ol
        ? ((this.line = e), void (this.ch = t))
        : new Ol(e, t);
    }),
    Dl = (e.cmpPos = function (e, t) {
      return e.line - t.line || e.ch - t.ch;
    }),
    Hl = null;
  (rt.prototype = Io(
    {
      init: function (e) {
        function t(e) {
          if (n.somethingSelected())
            (Hl = n.getSelections()),
              r.inaccurateSelection &&
                ((r.prevInput = ""),
                (r.inaccurateSelection = !1),
                (o.value = Hl.join("\n")),
                Is(o));
          else {
            if (!n.options.lineWiseCopyCut) return;
            var t = et(n);
            (Hl = t.text),
              "cut" == e.type
                ? n.setSelections(t.ranges, null, Ns)
                : ((r.prevInput = ""), (o.value = t.text.join("\n")), Is(o));
          }
          "cut" == e.type && (n.state.cutIncoming = !0);
        }
        var r = this,
          n = this.cm,
          i = (this.wrapper = nt()),
          o = (this.textarea = i.firstChild);
        e.wrapper.insertBefore(i, e.wrapper.firstChild),
          Cl && (o.style.width = "0px"),
          Ss(o, "input", function () {
            dl && pl >= 9 && r.hasSelection && (r.hasSelection = null),
              r.poll();
          }),
          Ss(o, "paste", function () {
            if (
              gl &&
              !n.state.fakedLastChar &&
              !(new Date() - n.state.lastMiddleDown < 200)
            ) {
              var e = o.selectionStart,
                t = o.selectionEnd;
              (o.value += "$"),
                (o.selectionEnd = t),
                (o.selectionStart = e),
                (n.state.fakedLastChar = !0);
            }
            (n.state.pasteIncoming = !0), r.fastPoll();
          }),
          Ss(o, "cut", t),
          Ss(o, "copy", t),
          Ss(e.scroller, "paste", function (t) {
            Vr(e, t) || ((n.state.pasteIncoming = !0), r.focus());
          }),
          Ss(e.lineSpace, "selectstart", function (t) {
            Vr(e, t) || ws(t);
          }),
          Ss(o, "compositionstart", function () {
            var e = n.getCursor("from");
            r.composing = {
              start: e,
              range: n.markText(e, n.getCursor("to"), {
                className: "CodeMirror-composing",
              }),
            };
          }),
          Ss(o, "compositionend", function () {
            r.composing &&
              (r.poll(), r.composing.range.clear(), (r.composing = null));
          });
      },
      prepareSelection: function () {
        var e = this.cm,
          t = e.display,
          r = e.doc,
          n = Ht(e);
        if (e.options.moveInputWithCursor) {
          var i = fr(e, r.sel.primary().head, "div"),
            o = t.wrapper.getBoundingClientRect(),
            l = t.lineDiv.getBoundingClientRect();
          (n.teTop = Math.max(
            0,
            Math.min(t.wrapper.clientHeight - 10, i.top + l.top - o.top)
          )),
            (n.teLeft = Math.max(
              0,
              Math.min(t.wrapper.clientWidth - 10, i.left + l.left - o.left)
            ));
        }
        return n;
      },
      showSelection: function (e) {
        var t = this.cm,
          r = t.display;
        Go(r.cursorDiv, e.cursors),
          Go(r.selectionDiv, e.selection),
          null != e.teTop &&
            ((this.wrapper.style.top = e.teTop + "px"),
            (this.wrapper.style.left = e.teLeft + "px"));
      },
      reset: function (e) {
        if (!this.contextMenuPending) {
          var t,
            r,
            n = this.cm,
            i = n.doc;
          if (n.somethingSelected()) {
            this.prevInput = "";
            var o = i.sel.primary();
            t =
              Ys &&
              (o.to().line - o.from().line > 100 ||
                (r = n.getSelection()).length > 1e3);
            var l = t ? "-" : r || n.getSelection();
            (this.textarea.value = l),
              n.state.focused && Is(this.textarea),
              dl && pl >= 9 && (this.hasSelection = l);
          } else
            e ||
              ((this.prevInput = this.textarea.value = ""),
              dl && pl >= 9 && (this.hasSelection = null));
          this.inaccurateSelection = t;
        }
      },
      getField: function () {
        return this.textarea;
      },
      supportsTouch: function () {
        return !1;
      },
      focus: function () {
        if (
          "nocursor" != this.cm.options.readOnly &&
          (!Sl || Uo() != this.textarea)
        )
          try {
            this.textarea.focus();
          } catch (e) {}
      },
      blur: function () {
        this.textarea.blur();
      },
      resetPosition: function () {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      },
      receivedFocus: function () {
        this.slowPoll();
      },
      slowPoll: function () {
        var e = this;
        e.pollingFast ||
          e.polling.set(this.cm.options.pollInterval, function () {
            e.poll(), e.cm.state.focused && e.slowPoll();
          });
      },
      fastPoll: function () {
        function e() {
          var n = r.poll();
          n || t
            ? ((r.pollingFast = !1), r.slowPoll())
            : ((t = !0), r.polling.set(60, e));
        }
        var t = !1,
          r = this;
        (r.pollingFast = !0), r.polling.set(20, e);
      },
      poll: function () {
        var e = this.cm,
          t = this.textarea,
          r = this.prevInput;
        if (
          !e.state.focused ||
          (_s(t) && !r) ||
          Z(e) ||
          e.options.disableInput ||
          e.state.keySeq
        )
          return !1;
        e.state.pasteIncoming &&
          e.state.fakedLastChar &&
          ((t.value = t.value.substring(0, t.value.length - 1)),
          (e.state.fakedLastChar = !1));
        var n = t.value;
        if (n == r && !e.somethingSelected()) return !1;
        if (
          (dl && pl >= 9 && this.hasSelection === n) ||
          (Ll && /[\uf700-\uf7ff]/.test(n))
        )
          return e.display.input.reset(), !1;
        if (e.doc.sel == e.display.selForContextMenu) {
          var i = n.charCodeAt(0);
          if ((8203 != i || r || (r = "​"), 8666 == i))
            return this.reset(), this.cm.execCommand("undo");
        }
        for (
          var o = 0, l = Math.min(r.length, n.length);
          l > o && r.charCodeAt(o) == n.charCodeAt(o);

        )
          ++o;
        var s = this;
        return (
          Mr(e, function () {
            Q(
              e,
              n.slice(o),
              r.length - o,
              null,
              s.composing ? "*compose" : null
            ),
              n.length > 1e3 || n.indexOf("\n") > -1
                ? (t.value = s.prevInput = "")
                : (s.prevInput = n),
              s.composing &&
                (s.composing.range.clear(),
                (s.composing.range = e.markText(
                  s.composing.start,
                  e.getCursor("to"),
                  { className: "CodeMirror-composing" }
                )));
          }),
          !0
        );
      },
      ensurePolled: function () {
        this.pollingFast && this.poll() && (this.pollingFast = !1);
      },
      onKeyPress: function () {
        dl && pl >= 9 && (this.hasSelection = null), this.fastPoll();
      },
      onContextMenu: function (e) {
        function t() {
          if (null != l.selectionStart) {
            var e = i.somethingSelected(),
              t = "​" + (e ? l.value : "");
            (l.value = "⇚"),
              (l.value = t),
              (n.prevInput = e ? "" : "​"),
              (l.selectionStart = 1),
              (l.selectionEnd = t.length),
              (o.selForContextMenu = i.doc.sel);
          }
        }
        function r() {
          if (
            ((n.contextMenuPending = !1),
            (n.wrapper.style.position = "relative"),
            (l.style.cssText = c),
            dl &&
              9 > pl &&
              o.scrollbars.setScrollTop((o.scroller.scrollTop = a)),
            null != l.selectionStart)
          ) {
            (!dl || (dl && 9 > pl)) && t();
            var e = 0,
              r = function () {
                o.selForContextMenu == i.doc.sel &&
                0 == l.selectionStart &&
                l.selectionEnd > 0 &&
                "​" == n.prevInput
                  ? Ar(i, ns.selectAll)(i)
                  : e++ < 10
                  ? (o.detectingSelectAll = setTimeout(r, 500))
                  : o.input.reset();
              };
            o.detectingSelectAll = setTimeout(r, 200);
          }
        }
        var n = this,
          i = n.cm,
          o = i.display,
          l = n.textarea,
          s = Kr(i, e),
          a = o.scroller.scrollTop;
        if (s && !yl) {
          var u = i.options.resetSelectionOnContextMenu;
          u && -1 == i.doc.sel.contains(s) && Ar(i, Tt)(i.doc, dt(s), Ns);
          var c = l.style.cssText;
          if (
            ((n.wrapper.style.position = "absolute"),
            (l.style.cssText =
              "position: fixed; width: 30px; height: 30px; top: " +
              (e.clientY - 5) +
              "px; left: " +
              (e.clientX - 5) +
              "px; z-index: 1000; background: " +
              (dl ? "rgba(255, 255, 255, .05)" : "transparent") +
              "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
            gl)
          )
            var f = window.scrollY;
          if (
            (o.input.focus(),
            gl && window.scrollTo(null, f),
            o.input.reset(),
            i.somethingSelected() || (l.value = n.prevInput = " "),
            (n.contextMenuPending = !0),
            (o.selForContextMenu = i.doc.sel),
            clearTimeout(o.detectingSelectAll),
            dl && pl >= 9 && t(),
            Al)
          ) {
            Cs(e);
            var h = function () {
              Ls(window, "mouseup", h), setTimeout(r, 20);
            };
            Ss(window, "mouseup", h);
          } else setTimeout(r, 50);
        }
      },
      setUneditable: Do,
      needsContentAttribute: !1,
    },
    rt.prototype
  )),
    (it.prototype = Io(
      {
        init: function (e) {
          function t(e) {
            if (n.somethingSelected())
              (Hl = n.getSelections()),
                "cut" == e.type && n.replaceSelection("", null, "cut");
            else {
              if (!n.options.lineWiseCopyCut) return;
              var t = et(n);
              (Hl = t.text),
                "cut" == e.type &&
                  n.operation(function () {
                    n.setSelections(t.ranges, 0, Ns),
                      n.replaceSelection("", null, "cut");
                  });
            }
            if (e.clipboardData && !Cl)
              e.preventDefault(),
                e.clipboardData.clearData(),
                e.clipboardData.setData("text/plain", Hl.join("\n"));
            else {
              var r = nt(),
                i = r.firstChild;
              n.display.lineSpace.insertBefore(
                r,
                n.display.lineSpace.firstChild
              ),
                (i.value = Hl.join("\n"));
              var o = document.activeElement;
              Is(i),
                setTimeout(function () {
                  n.display.lineSpace.removeChild(r), o.focus();
                }, 50);
            }
          }
          var r = this,
            n = r.cm,
            i = (r.div = e.lineDiv);
          (i.contentEditable = "true"),
            tt(i),
            Ss(i, "paste", function (e) {
              var t = e.clipboardData && e.clipboardData.getData("text/plain");
              t && (e.preventDefault(), n.replaceSelection(t, null, "paste"));
            }),
            Ss(i, "compositionstart", function (e) {
              var t = e.data;
              if (
                ((r.composing = { sel: n.doc.sel, data: t, startData: t }), t)
              ) {
                var i = n.doc.sel.primary(),
                  o = n.getLine(i.head.line),
                  l = o.indexOf(t, Math.max(0, i.head.ch - t.length));
                l > -1 &&
                  l <= i.head.ch &&
                  (r.composing.sel = dt(
                    Ol(i.head.line, l),
                    Ol(i.head.line, l + t.length)
                  ));
              }
            }),
            Ss(i, "compositionupdate", function (e) {
              r.composing.data = e.data;
            }),
            Ss(i, "compositionend", function (e) {
              var t = r.composing;
              t &&
                (e.data == t.startData ||
                  /\u200b/.test(e.data) ||
                  (t.data = e.data),
                setTimeout(function () {
                  t.handled || r.applyComposition(t),
                    r.composing == t && (r.composing = null);
                }, 50));
            }),
            Ss(i, "touchstart", function () {
              r.forceCompositionEnd();
            }),
            Ss(i, "input", function () {
              r.composing ||
                r.pollContent() ||
                Mr(r.cm, function () {
                  Hr(n);
                });
            }),
            Ss(i, "copy", t),
            Ss(i, "cut", t);
        },
        prepareSelection: function () {
          var e = Ht(this.cm, !1);
          return (e.focus = this.cm.state.focused), e;
        },
        showSelection: function (e) {
          e &&
            this.cm.display.view.length &&
            (e.focus && this.showPrimarySelection(),
            this.showMultipleSelections(e));
        },
        showPrimarySelection: function () {
          var e = window.getSelection(),
            t = this.cm.doc.sel.primary(),
            r = st(this.cm, e.anchorNode, e.anchorOffset),
            n = st(this.cm, e.focusNode, e.focusOffset);
          if (
            !r ||
            r.bad ||
            !n ||
            n.bad ||
            0 != Dl($(r, n), t.from()) ||
            0 != Dl(Y(r, n), t.to())
          ) {
            var i = ot(this.cm, t.from()),
              o = ot(this.cm, t.to());
            if (i || o) {
              var l = this.cm.display.view,
                s = e.rangeCount && e.getRangeAt(0);
              if (i) {
                if (!o) {
                  var a = l[l.length - 1].measure,
                    u = a.maps ? a.maps[a.maps.length - 1] : a.map;
                  o = {
                    node: u[u.length - 1],
                    offset: u[u.length - 2] - u[u.length - 3],
                  };
                }
              } else i = { node: l[0].measure.map[2], offset: 0 };
              try {
                var c = Ps(i.node, i.offset, o.offset, o.node);
              } catch (f) {}
              c &&
                (e.removeAllRanges(),
                e.addRange(c),
                s && null == e.anchorNode
                  ? e.addRange(s)
                  : cl && this.startGracePeriod()),
                this.rememberSelection();
            }
          }
        },
        startGracePeriod: function () {
          var e = this;
          clearTimeout(this.gracePeriod),
            (this.gracePeriod = setTimeout(function () {
              (e.gracePeriod = !1),
                e.selectionChanged() &&
                  e.cm.operation(function () {
                    e.cm.curOp.selectionChanged = !0;
                  });
            }, 20));
        },
        showMultipleSelections: function (e) {
          Go(this.cm.display.cursorDiv, e.cursors),
            Go(this.cm.display.selectionDiv, e.selection);
        },
        rememberSelection: function () {
          var e = window.getSelection();
          (this.lastAnchorNode = e.anchorNode),
            (this.lastAnchorOffset = e.anchorOffset),
            (this.lastFocusNode = e.focusNode),
            (this.lastFocusOffset = e.focusOffset);
        },
        selectionInEditor: function () {
          var e = window.getSelection();
          if (!e.rangeCount) return !1;
          var t = e.getRangeAt(0).commonAncestorContainer;
          return Rs(this.div, t);
        },
        focus: function () {
          "nocursor" != this.cm.options.readOnly && this.div.focus();
        },
        blur: function () {
          this.div.blur();
        },
        getField: function () {
          return this.div;
        },
        supportsTouch: function () {
          return !0;
        },
        receivedFocus: function () {
          function e() {
            t.cm.state.focused &&
              (t.pollSelection(), t.polling.set(t.cm.options.pollInterval, e));
          }
          var t = this;
          this.selectionInEditor()
            ? this.pollSelection()
            : Mr(this.cm, function () {
                t.cm.curOp.selectionChanged = !0;
              }),
            this.polling.set(this.cm.options.pollInterval, e);
        },
        selectionChanged: function () {
          var e = window.getSelection();
          return (
            e.anchorNode != this.lastAnchorNode ||
            e.anchorOffset != this.lastAnchorOffset ||
            e.focusNode != this.lastFocusNode ||
            e.focusOffset != this.lastFocusOffset
          );
        },
        pollSelection: function () {
          if (!this.composing && !this.gracePeriod && this.selectionChanged()) {
            var e = window.getSelection(),
              t = this.cm;
            this.rememberSelection();
            var r = st(t, e.anchorNode, e.anchorOffset),
              n = st(t, e.focusNode, e.focusOffset);
            r &&
              n &&
              Mr(t, function () {
                Tt(t.doc, dt(r, n), Ns),
                  (r.bad || n.bad) && (t.curOp.selectionChanged = !0);
              });
          }
        },
        pollContent: function () {
          var e = this.cm,
            t = e.display,
            r = e.doc.sel.primary(),
            n = r.from(),
            i = r.to();
          if (n.line < t.viewFrom || i.line > t.viewTo - 1) return !1;
          var o;
          if (n.line == t.viewFrom || 0 == (o = Er(e, n.line)))
            var l = Zi(t.view[0].line),
              s = t.view[0].node;
          else
            var l = Zi(t.view[o].line),
              s = t.view[o - 1].node.nextSibling;
          var a = Er(e, i.line);
          if (a == t.view.length - 1)
            var u = t.viewTo - 1,
              c = t.view[a].node;
          else
            var u = Zi(t.view[a + 1].line) - 1,
              c = t.view[a + 1].node.previousSibling;
          for (
            var f = Xs(ut(e, s, c, l, u)),
              h = Yi(e.doc, Ol(l, 0), Ol(u, _i(e.doc, u).text.length));
            f.length > 1 && h.length > 1;

          )
            if (No(f) == No(h)) f.pop(), h.pop(), u--;
            else {
              if (f[0] != h[0]) break;
              f.shift(), h.shift(), l++;
            }
          for (
            var d = 0,
              p = 0,
              g = f[0],
              v = h[0],
              m = Math.min(g.length, v.length);
            m > d && g.charCodeAt(d) == v.charCodeAt(d);

          )
            ++d;
          for (
            var y = No(f),
              b = No(h),
              w = Math.min(
                y.length - (1 == f.length ? d : 0),
                b.length - (1 == h.length ? d : 0)
              );
            w > p &&
            y.charCodeAt(y.length - p - 1) == b.charCodeAt(b.length - p - 1);

          )
            ++p;
          (f[f.length - 1] = y.slice(0, y.length - p)), (f[0] = f[0].slice(d));
          var x = Ol(l, d),
            C = Ol(u, h.length ? No(h).length - p : 0);
          return f.length > 1 || f[0] || Dl(x, C)
            ? (An(e.doc, f, x, C, "+input"), !0)
            : void 0;
        },
        ensurePolled: function () {
          this.forceCompositionEnd();
        },
        reset: function () {
          this.forceCompositionEnd();
        },
        forceCompositionEnd: function () {
          this.composing &&
            !this.composing.handled &&
            (this.applyComposition(this.composing),
            (this.composing.handled = !0),
            this.div.blur(),
            this.div.focus());
        },
        applyComposition: function (e) {
          e.data &&
            e.data != e.startData &&
            Ar(this.cm, Q)(this.cm, e.data, 0, e.sel);
        },
        setUneditable: function (e) {
          e.setAttribute("contenteditable", "false");
        },
        onKeyPress: function (e) {
          e.preventDefault(),
            Ar(this.cm, Q)(
              this.cm,
              String.fromCharCode(null == e.charCode ? e.keyCode : e.charCode),
              0
            );
        },
        onContextMenu: Do,
        resetPosition: Do,
        needsContentAttribute: !0,
      },
      it.prototype
    )),
    (e.inputStyles = { textarea: rt, contenteditable: it }),
    (ct.prototype = {
      primary: function () {
        return this.ranges[this.primIndex];
      },
      equals: function (e) {
        if (e == this) return !0;
        if (
          e.primIndex != this.primIndex ||
          e.ranges.length != this.ranges.length
        )
          return !1;
        for (var t = 0; t < this.ranges.length; t++) {
          var r = this.ranges[t],
            n = e.ranges[t];
          if (0 != Dl(r.anchor, n.anchor) || 0 != Dl(r.head, n.head)) return !1;
        }
        return !0;
      },
      deepCopy: function () {
        for (var e = [], t = 0; t < this.ranges.length; t++)
          e[t] = new ft(_(this.ranges[t].anchor), _(this.ranges[t].head));
        return new ct(e, this.primIndex);
      },
      somethingSelected: function () {
        for (var e = 0; e < this.ranges.length; e++)
          if (!this.ranges[e].empty()) return !0;
        return !1;
      },
      contains: function (e, t) {
        t || (t = e);
        for (var r = 0; r < this.ranges.length; r++) {
          var n = this.ranges[r];
          if (Dl(t, n.from()) >= 0 && Dl(e, n.to()) <= 0) return r;
        }
        return -1;
      },
    }),
    (ft.prototype = {
      from: function () {
        return $(this.anchor, this.head);
      },
      to: function () {
        return Y(this.anchor, this.head);
      },
      empty: function () {
        return (
          this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        );
      },
    });
  var Il,
    Pl,
    El,
    zl = { left: 0, right: 0, top: 0, bottom: 0 },
    Fl = null,
    Rl = 0,
    Bl = 0,
    Gl = 0,
    Ul = null;
  dl ? (Ul = -0.53) : cl ? (Ul = 15) : ml ? (Ul = -0.7) : bl && (Ul = -1 / 3);
  var Vl = function (e) {
    var t = e.wheelDeltaX,
      r = e.wheelDeltaY;
    return (
      null == t && e.detail && e.axis == e.HORIZONTAL_AXIS && (t = e.detail),
      null == r && e.detail && e.axis == e.VERTICAL_AXIS
        ? (r = e.detail)
        : null == r && (r = e.wheelDelta),
      { x: t, y: r }
    );
  };
  e.wheelEventPixels = function (e) {
    var t = Vl(e);
    return (t.x *= Ul), (t.y *= Ul), t;
  };
  var Kl = new To(),
    jl = null,
    Xl = (e.changeEnd = function (e) {
      return e.text
        ? Ol(
            e.from.line + e.text.length - 1,
            No(e.text).length + (1 == e.text.length ? e.from.ch : 0)
          )
        : e.to;
    });
  (e.prototype = {
    constructor: e,
    focus: function () {
      window.focus(), this.display.input.focus();
    },
    setOption: function (e, t) {
      var r = this.options,
        n = r[e];
      (r[e] != t || "mode" == e) &&
        ((r[e] = t), Yl.hasOwnProperty(e) && Ar(this, Yl[e])(this, t, n));
    },
    getOption: function (e) {
      return this.options[e];
    },
    getDoc: function () {
      return this.doc;
    },
    addKeyMap: function (e, t) {
      this.state.keyMaps[t ? "push" : "unshift"](Vn(e));
    },
    removeKeyMap: function (e) {
      for (var t = this.state.keyMaps, r = 0; r < t.length; ++r)
        if (t[r] == e || t[r].name == e) return t.splice(r, 1), !0;
    },
    addOverlay: Nr(function (t, r) {
      var n = t.token ? t : e.getMode(this.options, t);
      if (n.startState) throw new Error("Overlays may not be stateful.");
      this.state.overlays.push({ mode: n, modeSpec: t, opaque: r && r.opaque }),
        this.state.modeGen++,
        Hr(this);
    }),
    removeOverlay: Nr(function (e) {
      for (var t = this.state.overlays, r = 0; r < t.length; ++r) {
        var n = t[r].modeSpec;
        if (n == e || ("string" == typeof e && n.name == e))
          return t.splice(r, 1), this.state.modeGen++, void Hr(this);
      }
    }),
    indentLine: Nr(function (e, t, r) {
      "string" != typeof t &&
        "number" != typeof t &&
        (t =
          null == t
            ? this.options.smartIndent
              ? "smart"
              : "prev"
            : t
            ? "add"
            : "subtract"),
        mt(this.doc, e) && En(this, e, t, r);
    }),
    indentSelection: Nr(function (e) {
      for (var t = this.doc.sel.ranges, r = -1, n = 0; n < t.length; n++) {
        var i = t[n];
        if (i.empty())
          i.head.line > r &&
            (En(this, i.head.line, e, !0),
            (r = i.head.line),
            n == this.doc.sel.primIndex && In(this));
        else {
          var o = i.from(),
            l = i.to(),
            s = Math.max(r, o.line);
          r = Math.min(this.lastLine(), l.line - (l.ch ? 0 : 1)) + 1;
          for (var a = s; r > a; ++a) En(this, a, e);
          var u = this.doc.sel.ranges;
          0 == o.ch &&
            t.length == u.length &&
            u[n].from().ch > 0 &&
            Ct(this.doc, n, new ft(o, u[n].to()), Ns);
        }
      }
    }),
    getTokenAt: function (e, t) {
      return Ai(this, e, t);
    },
    getLineTokens: function (e, t) {
      return Ai(this, Ol(e), t, !0);
    },
    getTokenTypeAt: function (e) {
      e = gt(this.doc, e);
      var t,
        r = Oi(this, _i(this.doc, e.line)),
        n = 0,
        i = (r.length - 1) / 2,
        o = e.ch;
      if (0 == o) t = r[2];
      else
        for (;;) {
          var l = (n + i) >> 1;
          if ((l ? r[2 * l - 1] : 0) >= o) i = l;
          else {
            if (!(r[2 * l + 1] < o)) {
              t = r[2 * l + 2];
              break;
            }
            n = l + 1;
          }
        }
      var s = t ? t.indexOf("cm-overlay ") : -1;
      return 0 > s ? t : 0 == s ? null : t.slice(0, s - 1);
    },
    getModeAt: function (t) {
      var r = this.doc.mode;
      return r.innerMode ? e.innerMode(r, this.getTokenAt(t).state).mode : r;
    },
    getHelper: function (e, t) {
      return this.getHelpers(e, t)[0];
    },
    getHelpers: function (e, t) {
      var r = [];
      if (!es.hasOwnProperty(t)) return r;
      var n = es[t],
        i = this.getModeAt(e);
      if ("string" == typeof i[t]) n[i[t]] && r.push(n[i[t]]);
      else if (i[t])
        for (var o = 0; o < i[t].length; o++) {
          var l = n[i[t][o]];
          l && r.push(l);
        }
      else
        i.helperType && n[i.helperType]
          ? r.push(n[i.helperType])
          : n[i.name] && r.push(n[i.name]);
      for (var o = 0; o < n._global.length; o++) {
        var s = n._global[o];
        s.pred(i, this) && -1 == Wo(r, s.val) && r.push(s.val);
      }
      return r;
    },
    getStateAfter: function (e, t) {
      var r = this.doc;
      return (
        (e = pt(r, null == e ? r.first + r.size - 1 : e)), Bt(this, e + 1, t)
      );
    },
    cursorCoords: function (e, t) {
      var r,
        n = this.doc.sel.primary();
      return (
        (r =
          null == e
            ? n.head
            : "object" == typeof e
            ? gt(this.doc, e)
            : e
            ? n.from()
            : n.to()),
        fr(this, r, t || "page")
      );
    },
    charCoords: function (e, t) {
      return cr(this, gt(this.doc, e), t || "page");
    },
    coordsChar: function (e, t) {
      return (e = ur(this, e, t || "page")), pr(this, e.left, e.top);
    },
    lineAtHeight: function (e, t) {
      return (
        (e = ur(this, { top: e, left: 0 }, t || "page").top),
        Qi(this.doc, e + this.display.viewOffset)
      );
    },
    heightAtLine: function (e, t) {
      var r,
        n = !1;
      if ("number" == typeof e) {
        var i = this.doc.first + this.doc.size - 1;
        e < this.doc.first
          ? (e = this.doc.first)
          : e > i && ((e = i), (n = !0)),
          (r = _i(this.doc, e));
      } else r = e;
      return (
        ar(this, r, { top: 0, left: 0 }, t || "page").top +
        (n ? this.doc.height - Ji(r) : 0)
      );
    },
    defaultTextHeight: function () {
      return vr(this.display);
    },
    defaultCharWidth: function () {
      return mr(this.display);
    },
    setGutterMarker: Nr(function (e, t, r) {
      return zn(this.doc, e, "gutter", function (e) {
        var n = e.gutterMarkers || (e.gutterMarkers = {});
        return (n[t] = r), !r && zo(n) && (e.gutterMarkers = null), !0;
      });
    }),
    clearGutter: Nr(function (e) {
      var t = this,
        r = t.doc,
        n = r.first;
      r.iter(function (r) {
        r.gutterMarkers &&
          r.gutterMarkers[e] &&
          ((r.gutterMarkers[e] = null),
          Ir(t, n, "gutter"),
          zo(r.gutterMarkers) && (r.gutterMarkers = null)),
          ++n;
      });
    }),
    lineInfo: function (e) {
      if ("number" == typeof e) {
        if (!mt(this.doc, e)) return null;
        var t = e;
        if (((e = _i(this.doc, e)), !e)) return null;
      } else {
        var t = Zi(e);
        if (null == t) return null;
      }
      return {
        line: t,
        handle: e,
        text: e.text,
        gutterMarkers: e.gutterMarkers,
        textClass: e.textClass,
        bgClass: e.bgClass,
        wrapClass: e.wrapClass,
        widgets: e.widgets,
      };
    },
    getViewport: function () {
      return { from: this.display.viewFrom, to: this.display.viewTo };
    },
    addWidget: function (e, t, r, n, i) {
      var o = this.display;
      e = fr(this, gt(this.doc, e));
      var l = e.bottom,
        s = e.left;
      if (
        ((t.style.position = "absolute"),
        t.setAttribute("cm-ignore-events", "true"),
        this.display.input.setUneditable(t),
        o.sizer.appendChild(t),
        "over" == n)
      )
        l = e.top;
      else if ("above" == n || "near" == n) {
        var a = Math.max(o.wrapper.clientHeight, this.doc.height),
          u = Math.max(o.sizer.clientWidth, o.lineSpace.clientWidth);
        ("above" == n || e.bottom + t.offsetHeight > a) &&
        e.top > t.offsetHeight
          ? (l = e.top - t.offsetHeight)
          : e.bottom + t.offsetHeight <= a && (l = e.bottom),
          s + t.offsetWidth > u && (s = u - t.offsetWidth);
      }
      (t.style.top = l + "px"),
        (t.style.left = t.style.right = ""),
        "right" == i
          ? ((s = o.sizer.clientWidth - t.offsetWidth), (t.style.right = "0px"))
          : ("left" == i
              ? (s = 0)
              : "middle" == i &&
                (s = (o.sizer.clientWidth - t.offsetWidth) / 2),
            (t.style.left = s + "px")),
        r && On(this, s, l, s + t.offsetWidth, l + t.offsetHeight);
    },
    triggerOnKeyDown: Nr(an),
    triggerOnKeyPress: Nr(fn),
    triggerOnKeyUp: cn,
    execCommand: function (e) {
      return ns.hasOwnProperty(e) ? ns[e](this) : void 0;
    },
    triggerElectric: Nr(function (e) {
      J(this, e);
    }),
    findPosH: function (e, t, r, n) {
      var i = 1;
      0 > t && ((i = -1), (t = -t));
      for (
        var o = 0, l = gt(this.doc, e);
        t > o && ((l = Rn(this.doc, l, i, r, n)), !l.hitSide);
        ++o
      );
      return l;
    },
    moveH: Nr(function (e, t) {
      var r = this;
      r.extendSelectionsBy(function (n) {
        return r.display.shift || r.doc.extend || n.empty()
          ? Rn(r.doc, n.head, e, t, r.options.rtlMoveVisually)
          : 0 > e
          ? n.from()
          : n.to();
      }, Os);
    }),
    deleteH: Nr(function (e, t) {
      var r = this.doc.sel,
        n = this.doc;
      r.somethingSelected()
        ? n.replaceSelection("", null, "+delete")
        : Fn(this, function (r) {
            var i = Rn(n, r.head, e, t, !1);
            return 0 > e ? { from: i, to: r.head } : { from: r.head, to: i };
          });
    }),
    findPosV: function (e, t, r, n) {
      var i = 1,
        o = n;
      0 > t && ((i = -1), (t = -t));
      for (var l = 0, s = gt(this.doc, e); t > l; ++l) {
        var a = fr(this, s, "div");
        if (
          (null == o ? (o = a.left) : (a.left = o),
          (s = Bn(this, a, i, r)),
          s.hitSide)
        )
          break;
      }
      return s;
    },
    moveV: Nr(function (e, t) {
      var r = this,
        n = this.doc,
        i = [],
        o = !r.display.shift && !n.extend && n.sel.somethingSelected();
      if (
        (n.extendSelectionsBy(function (l) {
          if (o) return 0 > e ? l.from() : l.to();
          var s = fr(r, l.head, "div");
          null != l.goalColumn && (s.left = l.goalColumn), i.push(s.left);
          var a = Bn(r, s, e, t);
          return (
            "page" == t &&
              l == n.sel.primary() &&
              Hn(r, null, cr(r, a, "div").top - s.top),
            a
          );
        }, Os),
        i.length)
      )
        for (var l = 0; l < n.sel.ranges.length; l++)
          n.sel.ranges[l].goalColumn = i[l];
    }),
    findWordAt: function (e) {
      var t = this.doc,
        r = _i(t, e.line).text,
        n = e.ch,
        i = e.ch;
      if (r) {
        var o = this.getHelper(e, "wordChars");
        (e.xRel < 0 || i == r.length) && n ? --n : ++i;
        for (
          var l = r.charAt(n),
            s = Eo(l, o)
              ? function (e) {
                  return Eo(e, o);
                }
              : /\s/.test(l)
              ? function (e) {
                  return /\s/.test(e);
                }
              : function (e) {
                  return !/\s/.test(e) && !Eo(e);
                };
          n > 0 && s(r.charAt(n - 1));

        )
          --n;
        for (; i < r.length && s(r.charAt(i)); ) ++i;
      }
      return new ft(Ol(e.line, n), Ol(e.line, i));
    },
    toggleOverwrite: function (e) {
      (null == e || e != this.state.overwrite) &&
        ((this.state.overwrite = !this.state.overwrite)
          ? Vs(this.display.cursorDiv, "CodeMirror-overwrite")
          : Us(this.display.cursorDiv, "CodeMirror-overwrite"),
        ks(this, "overwriteToggle", this, this.state.overwrite));
    },
    hasFocus: function () {
      return this.display.input.getField() == Uo();
    },
    scrollTo: Nr(function (e, t) {
      (null != e || null != t) && Pn(this),
        null != e && (this.curOp.scrollLeft = e),
        null != t && (this.curOp.scrollTop = t);
    }),
    getScrollInfo: function () {
      var e = this.display.scroller;
      return {
        left: e.scrollLeft,
        top: e.scrollTop,
        height: e.scrollHeight - Kt(this) - this.display.barHeight,
        width: e.scrollWidth - Kt(this) - this.display.barWidth,
        clientHeight: Xt(this),
        clientWidth: jt(this),
      };
    },
    scrollIntoView: Nr(function (e, t) {
      if (
        (null == e
          ? ((e = { from: this.doc.sel.primary().head, to: null }),
            null == t && (t = this.options.cursorScrollMargin))
          : "number" == typeof e
          ? (e = { from: Ol(e, 0), to: null })
          : null == e.from && (e = { from: e, to: null }),
        e.to || (e.to = e.from),
        (e.margin = t || 0),
        null != e.from.line)
      )
        Pn(this), (this.curOp.scrollToPos = e);
      else {
        var r = Dn(
          this,
          Math.min(e.from.left, e.to.left),
          Math.min(e.from.top, e.to.top) - e.margin,
          Math.max(e.from.right, e.to.right),
          Math.max(e.from.bottom, e.to.bottom) + e.margin
        );
        this.scrollTo(r.scrollLeft, r.scrollTop);
      }
    }),
    setSize: Nr(function (e, t) {
      function r(e) {
        return "number" == typeof e || /^\d+$/.test(String(e)) ? e + "px" : e;
      }
      var n = this;
      null != e && (n.display.wrapper.style.width = r(e)),
        null != t && (n.display.wrapper.style.height = r(t)),
        n.options.lineWrapping && ir(this);
      var i = n.display.viewFrom;
      n.doc.iter(i, n.display.viewTo, function (e) {
        if (e.widgets)
          for (var t = 0; t < e.widgets.length; t++)
            if (e.widgets[t].noHScroll) {
              Ir(n, i, "widget");
              break;
            }
        ++i;
      }),
        (n.curOp.forceUpdate = !0),
        ks(n, "refresh", this);
    }),
    operation: function (e) {
      return Mr(this, e);
    },
    refresh: Nr(function () {
      var e = this.display.cachedTextHeight;
      Hr(this),
        (this.curOp.forceUpdate = !0),
        or(this),
        this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop),
        c(this),
        (null == e || Math.abs(e - vr(this.display)) > 0.5) && l(this),
        ks(this, "refresh", this);
    }),
    swapDoc: Nr(function (e) {
      var t = this.doc;
      return (
        (t.cm = null),
        Xi(this, e),
        or(this),
        this.display.input.reset(),
        this.scrollTo(e.scrollLeft, e.scrollTop),
        (this.curOp.forceScroll = !0),
        wo(this, "swapDoc", this, t),
        t
      );
    }),
    getInputField: function () {
      return this.display.input.getField();
    },
    getWrapperElement: function () {
      return this.display.wrapper;
    },
    getScrollerElement: function () {
      return this.display.scroller;
    },
    getGutterElement: function () {
      return this.display.gutters;
    },
  }),
    ko(e);
  var _l = (e.defaults = {}),
    Yl = (e.optionHandlers = {}),
    $l = (e.Init = {
      toString: function () {
        return "CodeMirror.Init";
      },
    });
  Gn(
    "value",
    "",
    function (e, t) {
      e.setValue(t);
    },
    !0
  ),
    Gn(
      "mode",
      null,
      function (e, t) {
        (e.doc.modeOption = t), r(e);
      },
      !0
    ),
    Gn("indentUnit", 2, r, !0),
    Gn("indentWithTabs", !1),
    Gn("smartIndent", !0),
    Gn(
      "tabSize",
      4,
      function (e) {
        n(e), or(e), Hr(e);
      },
      !0
    ),
    Gn(
      "specialChars",
      /[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,
      function (t, r, n) {
        (t.state.specialChars = new RegExp(
          r.source + (r.test("	") ? "" : "|	"),
          "g"
        )),
          n != e.Init && t.refresh();
      }
    ),
    Gn(
      "specialCharPlaceholder",
      Pi,
      function (e) {
        e.refresh();
      },
      !0
    ),
    Gn("electricChars", !0),
    Gn(
      "inputStyle",
      Sl ? "contenteditable" : "textarea",
      function () {
        throw new Error(
          "inputStyle can not (yet) be changed in a running editor"
        );
      },
      !0
    ),
    Gn("rtlMoveVisually", !kl),
    Gn("wholeLineUpdateBefore", !0),
    Gn(
      "theme",
      "default",
      function (e) {
        s(e), a(e);
      },
      !0
    ),
    Gn("keyMap", "default", function (t, r, n) {
      var i = Vn(r),
        o = n != e.Init && Vn(n);
      o && o.detach && o.detach(t, i), i.attach && i.attach(t, o || null);
    }),
    Gn("extraKeys", null),
    Gn("lineWrapping", !1, i, !0),
    Gn(
      "gutters",
      [],
      function (e) {
        d(e.options), a(e);
      },
      !0
    ),
    Gn(
      "fixedGutter",
      !0,
      function (e, t) {
        (e.display.gutters.style.left = t ? L(e.display) + "px" : "0"),
          e.refresh();
      },
      !0
    ),
    Gn(
      "coverGutterNextToScrollbar",
      !1,
      function (e) {
        y(e);
      },
      !0
    ),
    Gn(
      "scrollbarStyle",
      "native",
      function (e) {
        m(e),
          y(e),
          e.display.scrollbars.setScrollTop(e.doc.scrollTop),
          e.display.scrollbars.setScrollLeft(e.doc.scrollLeft);
      },
      !0
    ),
    Gn(
      "lineNumbers",
      !1,
      function (e) {
        d(e.options), a(e);
      },
      !0
    ),
    Gn("firstLineNumber", 1, a, !0),
    Gn(
      "lineNumberFormatter",
      function (e) {
        return e;
      },
      a,
      !0
    ),
    Gn("showCursorWhenSelecting", !1, Dt, !0),
    Gn("resetSelectionOnContextMenu", !0),
    Gn("lineWiseCopyCut", !0),
    Gn("readOnly", !1, function (e, t) {
      "nocursor" == t
        ? (pn(e), e.display.input.blur(), (e.display.disabled = !0))
        : ((e.display.disabled = !1), t || e.display.input.reset());
    }),
    Gn(
      "disableInput",
      !1,
      function (e, t) {
        t || e.display.input.reset();
      },
      !0
    ),
    Gn("dragDrop", !0, Gr),
    Gn("cursorBlinkRate", 530),
    Gn("cursorScrollMargin", 0),
    Gn("cursorHeight", 1, Dt, !0),
    Gn("singleCursorHeightPerLine", !0, Dt, !0),
    Gn("workTime", 100),
    Gn("workDelay", 100),
    Gn("flattenSpans", !0, n, !0),
    Gn("addModeClass", !1, n, !0),
    Gn("pollInterval", 100),
    Gn("undoDepth", 200, function (e, t) {
      e.doc.history.undoDepth = t;
    }),
    Gn("historyEventDelay", 1250),
    Gn(
      "viewportMargin",
      10,
      function (e) {
        e.refresh();
      },
      !0
    ),
    Gn("maxHighlightLength", 1e4, n, !0),
    Gn("moveInputWithCursor", !0, function (e, t) {
      t || e.display.input.resetPosition();
    }),
    Gn("tabindex", null, function (e, t) {
      e.display.input.getField().tabIndex = t || "";
    }),
    Gn("autofocus", null);
  var ql = (e.modes = {}),
    Zl = (e.mimeModes = {});
  (e.defineMode = function (t, r) {
    e.defaults.mode || "null" == t || (e.defaults.mode = t),
      arguments.length > 2 &&
        (r.dependencies = Array.prototype.slice.call(arguments, 2)),
      (ql[t] = r);
  }),
    (e.defineMIME = function (e, t) {
      Zl[e] = t;
    }),
    (e.resolveMode = function (t) {
      if ("string" == typeof t && Zl.hasOwnProperty(t)) t = Zl[t];
      else if (t && "string" == typeof t.name && Zl.hasOwnProperty(t.name)) {
        var r = Zl[t.name];
        "string" == typeof r && (r = { name: r }),
          (t = Ho(r, t)),
          (t.name = r.name);
      } else if ("string" == typeof t && /^[\w\-]+\/[\w\-]+\+xml$/.test(t))
        return e.resolveMode("application/xml");
      return "string" == typeof t ? { name: t } : t || { name: "null" };
    }),
    (e.getMode = function (t, r) {
      var r = e.resolveMode(r),
        n = ql[r.name];
      if (!n) return e.getMode(t, "text/plain");
      var i = n(t, r);
      if (Ql.hasOwnProperty(r.name)) {
        var o = Ql[r.name];
        for (var l in o)
          o.hasOwnProperty(l) &&
            (i.hasOwnProperty(l) && (i["_" + l] = i[l]), (i[l] = o[l]));
      }
      if (
        ((i.name = r.name),
        r.helperType && (i.helperType = r.helperType),
        r.modeProps)
      )
        for (var l in r.modeProps) i[l] = r.modeProps[l];
      return i;
    }),
    e.defineMode("null", function () {
      return {
        token: function (e) {
          e.skipToEnd();
        },
      };
    }),
    e.defineMIME("text/plain", "null");
  var Ql = (e.modeExtensions = {});
  (e.extendMode = function (e, t) {
    var r = Ql.hasOwnProperty(e) ? Ql[e] : (Ql[e] = {});
    Io(t, r);
  }),
    (e.defineExtension = function (t, r) {
      e.prototype[t] = r;
    }),
    (e.defineDocExtension = function (e, t) {
      ms.prototype[e] = t;
    }),
    (e.defineOption = Gn);
  var Jl = [];
  e.defineInitHook = function (e) {
    Jl.push(e);
  };
  var es = (e.helpers = {});
  (e.registerHelper = function (t, r, n) {
    es.hasOwnProperty(t) || (es[t] = e[t] = { _global: [] }), (es[t][r] = n);
  }),
    (e.registerGlobalHelper = function (t, r, n, i) {
      e.registerHelper(t, r, i), es[t]._global.push({ pred: n, val: i });
    });
  var ts = (e.copyState = function (e, t) {
      if (t === !0) return t;
      if (e.copyState) return e.copyState(t);
      var r = {};
      for (var n in t) {
        var i = t[n];
        i instanceof Array && (i = i.concat([])), (r[n] = i);
      }
      return r;
    }),
    rs = (e.startState = function (e, t, r) {
      return e.startState ? e.startState(t, r) : !0;
    });
  e.innerMode = function (e, t) {
    for (; e.innerMode; ) {
      var r = e.innerMode(t);
      if (!r || r.mode == e) break;
      (t = r.state), (e = r.mode);
    }
    return r || { mode: e, state: t };
  };
  var ns = (e.commands = {
      selectAll: function (e) {
        e.setSelection(Ol(e.firstLine(), 0), Ol(e.lastLine()), Ns);
      },
      singleSelection: function (e) {
        e.setSelection(e.getCursor("anchor"), e.getCursor("head"), Ns);
      },
      killLine: function (e) {
        Fn(e, function (t) {
          if (t.empty()) {
            var r = _i(e.doc, t.head.line).text.length;
            return t.head.ch == r && t.head.line < e.lastLine()
              ? { from: t.head, to: Ol(t.head.line + 1, 0) }
              : { from: t.head, to: Ol(t.head.line, r) };
          }
          return { from: t.from(), to: t.to() };
        });
      },
      deleteLine: function (e) {
        Fn(e, function (t) {
          return {
            from: Ol(t.from().line, 0),
            to: gt(e.doc, Ol(t.to().line + 1, 0)),
          };
        });
      },
      delLineLeft: function (e) {
        Fn(e, function (e) {
          return { from: Ol(e.from().line, 0), to: e.from() };
        });
      },
      delWrappedLineLeft: function (e) {
        Fn(e, function (t) {
          var r = e.charCoords(t.head, "div").top + 5,
            n = e.coordsChar({ left: 0, top: r }, "div");
          return { from: n, to: t.from() };
        });
      },
      delWrappedLineRight: function (e) {
        Fn(e, function (t) {
          var r = e.charCoords(t.head, "div").top + 5,
            n = e.coordsChar(
              { left: e.display.lineDiv.offsetWidth + 100, top: r },
              "div"
            );
          return { from: t.from(), to: n };
        });
      },
      undo: function (e) {
        e.undo();
      },
      redo: function (e) {
        e.redo();
      },
      undoSelection: function (e) {
        e.undoSelection();
      },
      redoSelection: function (e) {
        e.redoSelection();
      },
      goDocStart: function (e) {
        e.extendSelection(Ol(e.firstLine(), 0));
      },
      goDocEnd: function (e) {
        e.extendSelection(Ol(e.lastLine()));
      },
      goLineStart: function (e) {
        e.extendSelectionsBy(
          function (t) {
            return rl(e, t.head.line);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineStartSmart: function (e) {
        e.extendSelectionsBy(
          function (t) {
            return il(e, t.head);
          },
          { origin: "+move", bias: 1 }
        );
      },
      goLineEnd: function (e) {
        e.extendSelectionsBy(
          function (t) {
            return nl(e, t.head.line);
          },
          { origin: "+move", bias: -1 }
        );
      },
      goLineRight: function (e) {
        e.extendSelectionsBy(function (t) {
          var r = e.charCoords(t.head, "div").top + 5;
          return e.coordsChar(
            { left: e.display.lineDiv.offsetWidth + 100, top: r },
            "div"
          );
        }, Os);
      },
      goLineLeft: function (e) {
        e.extendSelectionsBy(function (t) {
          var r = e.charCoords(t.head, "div").top + 5;
          return e.coordsChar({ left: 0, top: r }, "div");
        }, Os);
      },
      goLineLeftSmart: function (e) {
        e.extendSelectionsBy(function (t) {
          var r = e.charCoords(t.head, "div").top + 5,
            n = e.coordsChar({ left: 0, top: r }, "div");
          return n.ch < e.getLine(n.line).search(/\S/) ? il(e, t.head) : n;
        }, Os);
      },
      goLineUp: function (e) {
        e.moveV(-1, "line");
      },
      goLineDown: function (e) {
        e.moveV(1, "line");
      },
      goPageUp: function (e) {
        e.moveV(-1, "page");
      },
      goPageDown: function (e) {
        e.moveV(1, "page");
      },
      goCharLeft: function (e) {
        e.moveH(-1, "char");
      },
      goCharRight: function (e) {
        e.moveH(1, "char");
      },
      goColumnLeft: function (e) {
        e.moveH(-1, "column");
      },
      goColumnRight: function (e) {
        e.moveH(1, "column");
      },
      goWordLeft: function (e) {
        e.moveH(-1, "word");
      },
      goGroupRight: function (e) {
        e.moveH(1, "group");
      },
      goGroupLeft: function (e) {
        e.moveH(-1, "group");
      },
      goWordRight: function (e) {
        e.moveH(1, "word");
      },
      delCharBefore: function (e) {
        e.deleteH(-1, "char");
      },
      delCharAfter: function (e) {
        e.deleteH(1, "char");
      },
      delWordBefore: function (e) {
        e.deleteH(-1, "word");
      },
      delWordAfter: function (e) {
        e.deleteH(1, "word");
      },
      delGroupBefore: function (e) {
        e.deleteH(-1, "group");
      },
      delGroupAfter: function (e) {
        e.deleteH(1, "group");
      },
      indentAuto: function (e) {
        e.indentSelection("smart");
      },
      indentMore: function (e) {
        e.indentSelection("add");
      },
      indentLess: function (e) {
        e.indentSelection("subtract");
      },
      insertTab: function (e) {
        e.replaceSelection("	");
      },
      insertSoftTab: function (e) {
        for (
          var t = [], r = e.listSelections(), n = e.options.tabSize, i = 0;
          i < r.length;
          i++
        ) {
          var o = r[i].from(),
            l = Ds(e.getLine(o.line), o.ch, n);
          t.push(new Array(n - (l % n) + 1).join(" "));
        }
        e.replaceSelections(t);
      },
      defaultTab: function (e) {
        e.somethingSelected()
          ? e.indentSelection("add")
          : e.execCommand("insertTab");
      },
      transposeChars: function (e) {
        Mr(e, function () {
          for (var t = e.listSelections(), r = [], n = 0; n < t.length; n++) {
            var i = t[n].head,
              o = _i(e.doc, i.line).text;
            if (o)
              if (
                (i.ch == o.length && (i = new Ol(i.line, i.ch - 1)), i.ch > 0)
              )
                (i = new Ol(i.line, i.ch + 1)),
                  e.replaceRange(
                    o.charAt(i.ch - 1) + o.charAt(i.ch - 2),
                    Ol(i.line, i.ch - 2),
                    i,
                    "+transpose"
                  );
              else if (i.line > e.doc.first) {
                var l = _i(e.doc, i.line - 1).text;
                l &&
                  e.replaceRange(
                    o.charAt(0) + "\n" + l.charAt(l.length - 1),
                    Ol(i.line - 1, l.length - 1),
                    Ol(i.line, 1),
                    "+transpose"
                  );
              }
            r.push(new ft(i, i));
          }
          e.setSelections(r);
        });
      },
      newlineAndIndent: function (e) {
        Mr(e, function () {
          for (var t = e.listSelections().length, r = 0; t > r; r++) {
            var n = e.listSelections()[r];
            e.replaceRange("\n", n.anchor, n.head, "+input"),
              e.indentLine(n.from().line + 1, null, !0),
              In(e);
          }
        });
      },
      toggleOverwrite: function (e) {
        e.toggleOverwrite();
      },
    }),
    is = (e.keyMap = {});
  (is.basic = {
    Left: "goCharLeft",
    Right: "goCharRight",
    Up: "goLineUp",
    Down: "goLineDown",
    End: "goLineEnd",
    Home: "goLineStartSmart",
    PageUp: "goPageUp",
    PageDown: "goPageDown",
    Delete: "delCharAfter",
    Backspace: "delCharBefore",
    "Shift-Backspace": "delCharBefore",
    Tab: "defaultTab",
    "Shift-Tab": "indentAuto",
    Enter: "newlineAndIndent",
    Insert: "toggleOverwrite",
    Esc: "singleSelection",
  }),
    (is.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Up": "goLineUp",
      "Ctrl-Down": "goLineDown",
      "Ctrl-Left": "goGroupLeft",
      "Ctrl-Right": "goGroupRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delGroupBefore",
      "Ctrl-Delete": "delGroupAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      "Ctrl-U": "undoSelection",
      "Shift-Ctrl-U": "redoSelection",
      "Alt-U": "redoSelection",
      fallthrough: "basic",
    }),
    (is.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Alt-F": "goWordRight",
      "Alt-B": "goWordLeft",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-D": "delWordAfter",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
    }),
    (is.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Home": "goDocStart",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goGroupLeft",
      "Alt-Right": "goGroupRight",
      "Cmd-Left": "goLineLeft",
      "Cmd-Right": "goLineRight",
      "Alt-Backspace": "delGroupBefore",
      "Ctrl-Alt-Backspace": "delGroupAfter",
      "Alt-Delete": "delGroupAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      "Cmd-Backspace": "delWrappedLineLeft",
      "Cmd-Delete": "delWrappedLineRight",
      "Cmd-U": "undoSelection",
      "Shift-Cmd-U": "redoSelection",
      "Ctrl-Up": "goDocStart",
      "Ctrl-Down": "goDocEnd",
      fallthrough: ["basic", "emacsy"],
    }),
    (is["default"] = Ll ? is.macDefault : is.pcDefault),
    (e.normalizeKeyMap = function (e) {
      var t = {};
      for (var r in e)
        if (e.hasOwnProperty(r)) {
          var n = e[r];
          if (/^(name|fallthrough|(de|at)tach)$/.test(r)) continue;
          if ("..." == n) {
            delete e[r];
            continue;
          }
          for (var i = Oo(r.split(" "), Un), o = 0; o < i.length; o++) {
            var l, s;
            o == i.length - 1
              ? ((s = i.join(" ")), (l = n))
              : ((s = i.slice(0, o + 1).join(" ")), (l = "..."));
            var a = t[s];
            if (a) {
              if (a != l) throw new Error("Inconsistent bindings for " + s);
            } else t[s] = l;
          }
          delete e[r];
        }
      for (var u in t) e[u] = t[u];
      return e;
    });
  var os = (e.lookupKey = function (e, t, r, n) {
      t = Vn(t);
      var i = t.call ? t.call(e, n) : t[e];
      if (i === !1) return "nothing";
      if ("..." === i) return "multi";
      if (null != i && r(i)) return "handled";
      if (t.fallthrough) {
        if ("[object Array]" != Object.prototype.toString.call(t.fallthrough))
          return os(e, t.fallthrough, r, n);
        for (var o = 0; o < t.fallthrough.length; o++) {
          var l = os(e, t.fallthrough[o], r, n);
          if (l) return l;
        }
      }
    }),
    ls = (e.isModifierKey = function (e) {
      var t = "string" == typeof e ? e : qs[e.keyCode];
      return "Ctrl" == t || "Alt" == t || "Shift" == t || "Mod" == t;
    }),
    ss = (e.keyName = function (e, t) {
      if (yl && 34 == e.keyCode && e["char"]) return !1;
      var r = qs[e.keyCode],
        n = r;
      return null == n || e.altGraphKey
        ? !1
        : (e.altKey && "Alt" != r && (n = "Alt-" + n),
          (Ml ? e.metaKey : e.ctrlKey) && "Ctrl" != r && (n = "Ctrl-" + n),
          (Ml ? e.ctrlKey : e.metaKey) && "Cmd" != r && (n = "Cmd-" + n),
          !t && e.shiftKey && "Shift" != r && (n = "Shift-" + n),
          n);
    });
  e.fromTextArea = function (t, r) {
    function n() {
      t.value = u.getValue();
    }
    if (
      ((r = r ? Io(r) : {}),
      (r.value = t.value),
      !r.tabindex && t.tabIndex && (r.tabindex = t.tabIndex),
      !r.placeholder && t.placeholder && (r.placeholder = t.placeholder),
      null == r.autofocus)
    ) {
      var i = Uo();
      r.autofocus =
        i == t || (null != t.getAttribute("autofocus") && i == document.body);
    }
    if (t.form && (Ss(t.form, "submit", n), !r.leaveSubmitMethodAlone)) {
      var o = t.form,
        l = o.submit;
      try {
        var s = (o.submit = function () {
          n(), (o.submit = l), o.submit(), (o.submit = s);
        });
      } catch (a) {}
    }
    (r.finishInit = function (e) {
      (e.save = n),
        (e.getTextArea = function () {
          return t;
        }),
        (e.toTextArea = function () {
          (e.toTextArea = isNaN),
            n(),
            t.parentNode.removeChild(e.getWrapperElement()),
            (t.style.display = ""),
            t.form &&
              (Ls(t.form, "submit", n),
              "function" == typeof t.form.submit && (t.form.submit = l));
        });
    }),
      (t.style.display = "none");
    var u = e(function (e) {
      t.parentNode.insertBefore(e, t.nextSibling);
    }, r);
    return u;
  };
  var as = (e.StringStream = function (e, t) {
    (this.pos = this.start = 0),
      (this.string = e),
      (this.tabSize = t || 8),
      (this.lastColumnPos = this.lastColumnValue = 0),
      (this.lineStart = 0);
  });
  as.prototype = {
    eol: function () {
      return this.pos >= this.string.length;
    },
    sol: function () {
      return this.pos == this.lineStart;
    },
    peek: function () {
      return this.string.charAt(this.pos) || void 0;
    },
    next: function () {
      return this.pos < this.string.length
        ? this.string.charAt(this.pos++)
        : void 0;
    },
    eat: function (e) {
      var t = this.string.charAt(this.pos);
      if ("string" == typeof e) var r = t == e;
      else var r = t && (e.test ? e.test(t) : e(t));
      return r ? (++this.pos, t) : void 0;
    },
    eatWhile: function (e) {
      for (var t = this.pos; this.eat(e); );
      return this.pos > t;
    },
    eatSpace: function () {
      for (var e = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
        ++this.pos;
      return this.pos > e;
    },
    skipToEnd: function () {
      this.pos = this.string.length;
    },
    skipTo: function (e) {
      var t = this.string.indexOf(e, this.pos);
      return t > -1 ? ((this.pos = t), !0) : void 0;
    },
    backUp: function (e) {
      this.pos -= e;
    },
    column: function () {
      return (
        this.lastColumnPos < this.start &&
          ((this.lastColumnValue = Ds(
            this.string,
            this.start,
            this.tabSize,
            this.lastColumnPos,
            this.lastColumnValue
          )),
          (this.lastColumnPos = this.start)),
        this.lastColumnValue -
          (this.lineStart ? Ds(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    indentation: function () {
      return (
        Ds(this.string, null, this.tabSize) -
        (this.lineStart ? Ds(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    match: function (e, t, r) {
      if ("string" != typeof e) {
        var n = this.string.slice(this.pos).match(e);
        return n && n.index > 0
          ? null
          : (n && t !== !1 && (this.pos += n[0].length), n);
      }
      var i = function (e) {
          return r ? e.toLowerCase() : e;
        },
        o = this.string.substr(this.pos, e.length);
      return i(o) == i(e) ? (t !== !1 && (this.pos += e.length), !0) : void 0;
    },
    current: function () {
      return this.string.slice(this.start, this.pos);
    },
    hideFirstChars: function (e, t) {
      this.lineStart += e;
      try {
        return t();
      } finally {
        this.lineStart -= e;
      }
    },
  };
  var us = 0,
    cs = (e.TextMarker = function (e, t) {
      (this.lines = []), (this.type = t), (this.doc = e), (this.id = ++us);
    });
  ko(cs),
    (cs.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        var e = this.doc.cm,
          t = e && !e.curOp;
        if ((t && yr(e), Lo(this, "clear"))) {
          var r = this.find();
          r && wo(this, "clear", r.from, r.to);
        }
        for (var n = null, i = null, o = 0; o < this.lines.length; ++o) {
          var l = this.lines[o],
            s = qn(l.markedSpans, this);
          e && !this.collapsed
            ? Ir(e, Zi(l), "text")
            : e && (null != s.to && (i = Zi(l)), null != s.from && (n = Zi(l))),
            (l.markedSpans = Zn(l.markedSpans, s)),
            null == s.from &&
              this.collapsed &&
              !yi(this.doc, l) &&
              e &&
              qi(l, vr(e.display));
        }
        if (e && this.collapsed && !e.options.lineWrapping)
          for (var o = 0; o < this.lines.length; ++o) {
            var a = pi(this.lines[o]),
              u = f(a);
            u > e.display.maxLineLength &&
              ((e.display.maxLine = a),
              (e.display.maxLineLength = u),
              (e.display.maxLineChanged = !0));
          }
        null != n && e && this.collapsed && Hr(e, n, i + 1),
          (this.lines.length = 0),
          (this.explicitlyCleared = !0),
          this.atomic &&
            this.doc.cantEdit &&
            ((this.doc.cantEdit = !1), e && Nt(e.doc)),
          e && wo(e, "markerCleared", e, this),
          t && wr(e),
          this.parent && this.parent.clear();
      }
    }),
    (cs.prototype.find = function (e, t) {
      null == e && "bookmark" == this.type && (e = 1);
      for (var r, n, i = 0; i < this.lines.length; ++i) {
        var o = this.lines[i],
          l = qn(o.markedSpans, this);
        if (null != l.from && ((r = Ol(t ? o : Zi(o), l.from)), -1 == e))
          return r;
        if (null != l.to && ((n = Ol(t ? o : Zi(o), l.to)), 1 == e)) return n;
      }
      return r && { from: r, to: n };
    }),
    (cs.prototype.changed = function () {
      var e = this.find(-1, !0),
        t = this,
        r = this.doc.cm;
      e &&
        r &&
        Mr(r, function () {
          var n = e.line,
            i = Zi(e.line),
            o = Zt(r, i);
          if (
            (o &&
              (nr(o), (r.curOp.selectionChanged = r.curOp.forceUpdate = !0)),
            (r.curOp.updateMaxLine = !0),
            !yi(t.doc, n) && null != t.height)
          ) {
            var l = t.height;
            t.height = null;
            var s = xi(t) - l;
            s && qi(n, n.height + s);
          }
        });
    }),
    (cs.prototype.attachLine = function (e) {
      if (!this.lines.length && this.doc.cm) {
        var t = this.doc.cm.curOp;
        (t.maybeHiddenMarkers && -1 != Wo(t.maybeHiddenMarkers, this)) ||
          (t.maybeUnhiddenMarkers || (t.maybeUnhiddenMarkers = [])).push(this);
      }
      this.lines.push(e);
    }),
    (cs.prototype.detachLine = function (e) {
      if (
        (this.lines.splice(Wo(this.lines, e), 1),
        !this.lines.length && this.doc.cm)
      ) {
        var t = this.doc.cm.curOp;
        (t.maybeHiddenMarkers || (t.maybeHiddenMarkers = [])).push(this);
      }
    });
  var us = 0,
    fs = (e.SharedTextMarker = function (e, t) {
      (this.markers = e), (this.primary = t);
      for (var r = 0; r < e.length; ++r) e[r].parent = this;
    });
  ko(fs),
    (fs.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        this.explicitlyCleared = !0;
        for (var e = 0; e < this.markers.length; ++e) this.markers[e].clear();
        wo(this, "clear");
      }
    }),
    (fs.prototype.find = function (e, t) {
      return this.primary.find(e, t);
    });
  var hs = (e.LineWidget = function (e, t, r) {
    if (r) for (var n in r) r.hasOwnProperty(n) && (this[n] = r[n]);
    (this.doc = e), (this.node = t);
  });
  ko(hs),
    (hs.prototype.clear = function () {
      var e = this.doc.cm,
        t = this.line.widgets,
        r = this.line,
        n = Zi(r);
      if (null != n && t) {
        for (var i = 0; i < t.length; ++i) t[i] == this && t.splice(i--, 1);
        t.length || (r.widgets = null);
        var o = xi(this);
        qi(r, Math.max(0, r.height - o)),
          e &&
            Mr(e, function () {
              wi(e, r, -o), Ir(e, n, "widget");
            });
      }
    }),
    (hs.prototype.changed = function () {
      var e = this.height,
        t = this.doc.cm,
        r = this.line;
      this.height = null;
      var n = xi(this) - e;
      n &&
        (qi(r, r.height + n),
        t &&
          Mr(t, function () {
            (t.curOp.forceUpdate = !0), wi(t, r, n);
          }));
    });
  var ds = (e.Line = function (e, t, r) {
    (this.text = e), li(this, t), (this.height = r ? r(this) : 1);
  });
  ko(ds),
    (ds.prototype.lineNo = function () {
      return Zi(this);
    });
  var ps = {},
    gs = {};
  (Vi.prototype = {
    chunkSize: function () {
      return this.lines.length;
    },
    removeInner: function (e, t) {
      for (var r = e, n = e + t; n > r; ++r) {
        var i = this.lines[r];
        (this.height -= i.height), Li(i), wo(i, "delete");
      }
      this.lines.splice(e, t);
    },
    collapse: function (e) {
      e.push.apply(e, this.lines);
    },
    insertInner: function (e, t, r) {
      (this.height += r),
        (this.lines = this.lines
          .slice(0, e)
          .concat(t)
          .concat(this.lines.slice(e)));
      for (var n = 0; n < t.length; ++n) t[n].parent = this;
    },
    iterN: function (e, t, r) {
      for (var n = e + t; n > e; ++e) if (r(this.lines[e])) return !0;
    },
  }),
    (Ki.prototype = {
      chunkSize: function () {
        return this.size;
      },
      removeInner: function (e, t) {
        this.size -= t;
        for (var r = 0; r < this.children.length; ++r) {
          var n = this.children[r],
            i = n.chunkSize();
          if (i > e) {
            var o = Math.min(t, i - e),
              l = n.height;
            if (
              (n.removeInner(e, o),
              (this.height -= l - n.height),
              i == o && (this.children.splice(r--, 1), (n.parent = null)),
              0 == (t -= o))
            )
              break;
            e = 0;
          } else e -= i;
        }
        if (
          this.size - t < 25 &&
          (this.children.length > 1 || !(this.children[0] instanceof Vi))
        ) {
          var s = [];
          this.collapse(s),
            (this.children = [new Vi(s)]),
            (this.children[0].parent = this);
        }
      },
      collapse: function (e) {
        for (var t = 0; t < this.children.length; ++t)
          this.children[t].collapse(e);
      },
      insertInner: function (e, t, r) {
        (this.size += t.length), (this.height += r);
        for (var n = 0; n < this.children.length; ++n) {
          var i = this.children[n],
            o = i.chunkSize();
          if (o >= e) {
            if ((i.insertInner(e, t, r), i.lines && i.lines.length > 50)) {
              for (; i.lines.length > 50; ) {
                var l = i.lines.splice(i.lines.length - 25, 25),
                  s = new Vi(l);
                (i.height -= s.height),
                  this.children.splice(n + 1, 0, s),
                  (s.parent = this);
              }
              this.maybeSpill();
            }
            break;
          }
          e -= o;
        }
      },
      maybeSpill: function () {
        if (!(this.children.length <= 10)) {
          var e = this;
          do {
            var t = e.children.splice(e.children.length - 5, 5),
              r = new Ki(t);
            if (e.parent) {
              (e.size -= r.size), (e.height -= r.height);
              var n = Wo(e.parent.children, e);
              e.parent.children.splice(n + 1, 0, r);
            } else {
              var i = new Ki(e.children);
              (i.parent = e), (e.children = [i, r]), (e = i);
            }
            r.parent = e.parent;
          } while (e.children.length > 10);
          e.parent.maybeSpill();
        }
      },
      iterN: function (e, t, r) {
        for (var n = 0; n < this.children.length; ++n) {
          var i = this.children[n],
            o = i.chunkSize();
          if (o > e) {
            var l = Math.min(t, o - e);
            if (i.iterN(e, l, r)) return !0;
            if (0 == (t -= l)) break;
            e = 0;
          } else e -= o;
        }
      },
    });
  var vs = 0,
    ms = (e.Doc = function (e, t, r) {
      if (!(this instanceof ms)) return new ms(e, t, r);
      null == r && (r = 0),
        Ki.call(this, [new Vi([new ds("", null)])]),
        (this.first = r),
        (this.scrollTop = this.scrollLeft = 0),
        (this.cantEdit = !1),
        (this.cleanGeneration = 1),
        (this.frontier = r);
      var n = Ol(r, 0);
      (this.sel = dt(n)),
        (this.history = new to(null)),
        (this.id = ++vs),
        (this.modeOption = t),
        "string" == typeof e && (e = Xs(e)),
        Ui(this, { from: n, to: n, text: e }),
        Tt(this, dt(n), Ns);
    });
  (ms.prototype = Ho(Ki.prototype, {
    constructor: ms,
    iter: function (e, t, r) {
      r
        ? this.iterN(e - this.first, t - e, r)
        : this.iterN(this.first, this.first + this.size, e);
    },
    insert: function (e, t) {
      for (var r = 0, n = 0; n < t.length; ++n) r += t[n].height;
      this.insertInner(e - this.first, t, r);
    },
    remove: function (e, t) {
      this.removeInner(e - this.first, t);
    },
    getValue: function (e) {
      var t = $i(this, this.first, this.first + this.size);
      return e === !1 ? t : t.join(e || "\n");
    },
    setValue: Wr(function (e) {
      var t = Ol(this.first, 0),
        r = this.first + this.size - 1;
      Cn(
        this,
        {
          from: t,
          to: Ol(r, _i(this, r).text.length),
          text: Xs(e),
          origin: "setValue",
          full: !0,
        },
        !0
      ),
        Tt(this, dt(t));
    }),
    replaceRange: function (e, t, r, n) {
      (t = gt(this, t)), (r = r ? gt(this, r) : t), An(this, e, t, r, n);
    },
    getRange: function (e, t, r) {
      var n = Yi(this, gt(this, e), gt(this, t));
      return r === !1 ? n : n.join(r || "\n");
    },
    getLine: function (e) {
      var t = this.getLineHandle(e);
      return t && t.text;
    },
    getLineHandle: function (e) {
      return mt(this, e) ? _i(this, e) : void 0;
    },
    getLineNumber: function (e) {
      return Zi(e);
    },
    getLineHandleVisualStart: function (e) {
      return "number" == typeof e && (e = _i(this, e)), pi(e);
    },
    lineCount: function () {
      return this.size;
    },
    firstLine: function () {
      return this.first;
    },
    lastLine: function () {
      return this.first + this.size - 1;
    },
    clipPos: function (e) {
      return gt(this, e);
    },
    getCursor: function (e) {
      var t,
        r = this.sel.primary();
      return (t =
        null == e || "head" == e
          ? r.head
          : "anchor" == e
          ? r.anchor
          : "end" == e || "to" == e || e === !1
          ? r.to()
          : r.from());
    },
    listSelections: function () {
      return this.sel.ranges;
    },
    somethingSelected: function () {
      return this.sel.somethingSelected();
    },
    setCursor: Wr(function (e, t, r) {
      St(this, gt(this, "number" == typeof e ? Ol(e, t || 0) : e), null, r);
    }),
    setSelection: Wr(function (e, t, r) {
      St(this, gt(this, e), gt(this, t || e), r);
    }),
    extendSelection: Wr(function (e, t, r) {
      wt(this, gt(this, e), t && gt(this, t), r);
    }),
    extendSelections: Wr(function (e, t) {
      xt(this, yt(this, e, t));
    }),
    extendSelectionsBy: Wr(function (e, t) {
      xt(this, Oo(this.sel.ranges, e), t);
    }),
    setSelections: Wr(function (e, t, r) {
      if (e.length) {
        for (var n = 0, i = []; n < e.length; n++)
          i[n] = new ft(gt(this, e[n].anchor), gt(this, e[n].head));
        null == t && (t = Math.min(e.length - 1, this.sel.primIndex)),
          Tt(this, ht(i, t), r);
      }
    }),
    addSelection: Wr(function (e, t, r) {
      var n = this.sel.ranges.slice(0);
      n.push(new ft(gt(this, e), gt(this, t || e))),
        Tt(this, ht(n, n.length - 1), r);
    }),
    getSelection: function (e) {
      for (var t, r = this.sel.ranges, n = 0; n < r.length; n++) {
        var i = Yi(this, r[n].from(), r[n].to());
        t = t ? t.concat(i) : i;
      }
      return e === !1 ? t : t.join(e || "\n");
    },
    getSelections: function (e) {
      for (var t = [], r = this.sel.ranges, n = 0; n < r.length; n++) {
        var i = Yi(this, r[n].from(), r[n].to());
        e !== !1 && (i = i.join(e || "\n")), (t[n] = i);
      }
      return t;
    },
    replaceSelection: function (e, t, r) {
      for (var n = [], i = 0; i < this.sel.ranges.length; i++) n[i] = e;
      this.replaceSelections(n, t, r || "+input");
    },
    replaceSelections: Wr(function (e, t, r) {
      for (var n = [], i = this.sel, o = 0; o < i.ranges.length; o++) {
        var l = i.ranges[o];
        n[o] = { from: l.from(), to: l.to(), text: Xs(e[o]), origin: r };
      }
      for (
        var s = t && "end" != t && wn(this, n, t), o = n.length - 1;
        o >= 0;
        o--
      )
        Cn(this, n[o]);
      s ? kt(this, s) : this.cm && In(this.cm);
    }),
    undo: Wr(function () {
      Ln(this, "undo");
    }),
    redo: Wr(function () {
      Ln(this, "redo");
    }),
    undoSelection: Wr(function () {
      Ln(this, "undo", !0);
    }),
    redoSelection: Wr(function () {
      Ln(this, "redo", !0);
    }),
    setExtending: function (e) {
      this.extend = e;
    },
    getExtending: function () {
      return this.extend;
    },
    historySize: function () {
      for (var e = this.history, t = 0, r = 0, n = 0; n < e.done.length; n++)
        e.done[n].ranges || ++t;
      for (var n = 0; n < e.undone.length; n++) e.undone[n].ranges || ++r;
      return { undo: t, redo: r };
    },
    clearHistory: function () {
      this.history = new to(this.history.maxGeneration);
    },
    markClean: function () {
      this.cleanGeneration = this.changeGeneration(!0);
    },
    changeGeneration: function (e) {
      return (
        e &&
          (this.history.lastOp =
            this.history.lastSelOp =
            this.history.lastOrigin =
              null),
        this.history.generation
      );
    },
    isClean: function (e) {
      return this.history.generation == (e || this.cleanGeneration);
    },
    getHistory: function () {
      return { done: ho(this.history.done), undone: ho(this.history.undone) };
    },
    setHistory: function (e) {
      var t = (this.history = new to(this.history.maxGeneration));
      (t.done = ho(e.done.slice(0), null, !0)),
        (t.undone = ho(e.undone.slice(0), null, !0));
    },
    addLineClass: Wr(function (e, t, r) {
      return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
        var n =
          "text" == t
            ? "textClass"
            : "background" == t
            ? "bgClass"
            : "gutter" == t
            ? "gutterClass"
            : "wrapClass";
        if (e[n]) {
          if (Vo(r).test(e[n])) return !1;
          e[n] += " " + r;
        } else e[n] = r;
        return !0;
      });
    }),
    removeLineClass: Wr(function (e, t, r) {
      return zn(this, e, "gutter" == t ? "gutter" : "class", function (e) {
        var n =
            "text" == t
              ? "textClass"
              : "background" == t
              ? "bgClass"
              : "gutter" == t
              ? "gutterClass"
              : "wrapClass",
          i = e[n];
        if (!i) return !1;
        if (null == r) e[n] = null;
        else {
          var o = i.match(Vo(r));
          if (!o) return !1;
          var l = o.index + o[0].length;
          e[n] =
            i.slice(0, o.index) +
              (o.index && l != i.length ? " " : "") +
              i.slice(l) || null;
        }
        return !0;
      });
    }),
    addLineWidget: Wr(function (e, t, r) {
      return Ci(this, e, t, r);
    }),
    removeLineWidget: function (e) {
      e.clear();
    },
    markText: function (e, t, r) {
      return Kn(this, gt(this, e), gt(this, t), r, "range");
    },
    setBookmark: function (e, t) {
      var r = {
        replacedWith: t && (null == t.nodeType ? t.widget : t),
        insertLeft: t && t.insertLeft,
        clearWhenEmpty: !1,
        shared: t && t.shared,
        handleMouseEvents: t && t.handleMouseEvents,
      };
      return (e = gt(this, e)), Kn(this, e, e, r, "bookmark");
    },
    findMarksAt: function (e) {
      e = gt(this, e);
      var t = [],
        r = _i(this, e.line).markedSpans;
      if (r)
        for (var n = 0; n < r.length; ++n) {
          var i = r[n];
          (null == i.from || i.from <= e.ch) &&
            (null == i.to || i.to >= e.ch) &&
            t.push(i.marker.parent || i.marker);
        }
      return t;
    },
    findMarks: function (e, t, r) {
      (e = gt(this, e)), (t = gt(this, t));
      var n = [],
        i = e.line;
      return (
        this.iter(e.line, t.line + 1, function (o) {
          var l = o.markedSpans;
          if (l)
            for (var s = 0; s < l.length; s++) {
              var a = l[s];
              (i == e.line && e.ch > a.to) ||
                (null == a.from && i != e.line) ||
                (i == t.line && a.from > t.ch) ||
                (r && !r(a.marker)) ||
                n.push(a.marker.parent || a.marker);
            }
          ++i;
        }),
        n
      );
    },
    getAllMarks: function () {
      var e = [];
      return (
        this.iter(function (t) {
          var r = t.markedSpans;
          if (r)
            for (var n = 0; n < r.length; ++n)
              null != r[n].from && e.push(r[n].marker);
        }),
        e
      );
    },
    posFromIndex: function (e) {
      var t,
        r = this.first;
      return (
        this.iter(function (n) {
          var i = n.text.length + 1;
          return i > e ? ((t = e), !0) : ((e -= i), void ++r);
        }),
        gt(this, Ol(r, t))
      );
    },
    indexFromPos: function (e) {
      e = gt(this, e);
      var t = e.ch;
      return e.line < this.first || e.ch < 0
        ? 0
        : (this.iter(this.first, e.line, function (e) {
            t += e.text.length + 1;
          }),
          t);
    },
    copy: function (e) {
      var t = new ms(
        $i(this, this.first, this.first + this.size),
        this.modeOption,
        this.first
      );
      return (
        (t.scrollTop = this.scrollTop),
        (t.scrollLeft = this.scrollLeft),
        (t.sel = this.sel),
        (t.extend = !1),
        e &&
          ((t.history.undoDepth = this.history.undoDepth),
          t.setHistory(this.getHistory())),
        t
      );
    },
    linkedDoc: function (e) {
      e || (e = {});
      var t = this.first,
        r = this.first + this.size;
      null != e.from && e.from > t && (t = e.from),
        null != e.to && e.to < r && (r = e.to);
      var n = new ms($i(this, t, r), e.mode || this.modeOption, t);
      return (
        e.sharedHist && (n.history = this.history),
        (this.linked || (this.linked = [])).push({
          doc: n,
          sharedHist: e.sharedHist,
        }),
        (n.linked = [{ doc: this, isParent: !0, sharedHist: e.sharedHist }]),
        _n(n, Xn(this)),
        n
      );
    },
    unlinkDoc: function (t) {
      if ((t instanceof e && (t = t.doc), this.linked))
        for (var r = 0; r < this.linked.length; ++r) {
          var n = this.linked[r];
          if (n.doc == t) {
            this.linked.splice(r, 1), t.unlinkDoc(this), Yn(Xn(this));
            break;
          }
        }
      if (t.history == this.history) {
        var i = [t.id];
        ji(
          t,
          function (e) {
            i.push(e.id);
          },
          !0
        ),
          (t.history = new to(null)),
          (t.history.done = ho(this.history.done, i)),
          (t.history.undone = ho(this.history.undone, i));
      }
    },
    iterLinkedDocs: function (e) {
      ji(this, e);
    },
    getMode: function () {
      return this.mode;
    },
    getEditor: function () {
      return this.cm;
    },
  })),
    (ms.prototype.eachLine = ms.prototype.iter);
  var ys = "iter insert remove copy getEditor".split(" ");
  for (var bs in ms.prototype)
    ms.prototype.hasOwnProperty(bs) &&
      Wo(ys, bs) < 0 &&
      (e.prototype[bs] = (function (e) {
        return function () {
          return e.apply(this.doc, arguments);
        };
      })(ms.prototype[bs]));
  ko(ms);
  var ws = (e.e_preventDefault = function (e) {
      e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    }),
    xs = (e.e_stopPropagation = function (e) {
      e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    }),
    Cs = (e.e_stop = function (e) {
      ws(e), xs(e);
    }),
    Ss = (e.on = function (e, t, r) {
      if (e.addEventListener) e.addEventListener(t, r, !1);
      else if (e.attachEvent) e.attachEvent("on" + t, r);
      else {
        var n = e._handlers || (e._handlers = {}),
          i = n[t] || (n[t] = []);
        i.push(r);
      }
    }),
    Ls = (e.off = function (e, t, r) {
      if (e.removeEventListener) e.removeEventListener(t, r, !1);
      else if (e.detachEvent) e.detachEvent("on" + t, r);
      else {
        var n = e._handlers && e._handlers[t];
        if (!n) return;
        for (var i = 0; i < n.length; ++i)
          if (n[i] == r) {
            n.splice(i, 1);
            break;
          }
      }
    }),
    ks = (e.signal = function (e, t) {
      var r = e._handlers && e._handlers[t];
      if (r)
        for (
          var n = Array.prototype.slice.call(arguments, 2), i = 0;
          i < r.length;
          ++i
        )
          r[i].apply(null, n);
    }),
    Ts = null,
    Ms = 30,
    As = (e.Pass = {
      toString: function () {
        return "CodeMirror.Pass";
      },
    }),
    Ns = { scroll: !1 },
    Ws = { origin: "*mouse" },
    Os = { origin: "+move" };
  To.prototype.set = function (e, t) {
    clearTimeout(this.id), (this.id = setTimeout(t, e));
  };
  var Ds = (e.countColumn = function (e, t, r, n, i) {
      null == t && ((t = e.search(/[^\s\u00a0]/)), -1 == t && (t = e.length));
      for (var o = n || 0, l = i || 0; ; ) {
        var s = e.indexOf("	", o);
        if (0 > s || s >= t) return l + (t - o);
        (l += s - o), (l += r - (l % r)), (o = s + 1);
      }
    }),
    Hs = [""],
    Is = function (e) {
      e.select();
    };
  Cl
    ? (Is = function (e) {
        (e.selectionStart = 0), (e.selectionEnd = e.value.length);
      })
    : dl &&
      (Is = function (e) {
        try {
          e.select();
        } catch (t) {}
      });
  var Ps,
    Es =
      /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
    zs = (e.isWordChar = function (e) {
      return (
        /\w/.test(e) ||
        (e > "" && (e.toUpperCase() != e.toLowerCase() || Es.test(e)))
      );
    }),
    Fs =
      /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  Ps = document.createRange
    ? function (e, t, r, n) {
        var i = document.createRange();
        return i.setEnd(n || e, r), i.setStart(e, t), i;
      }
    : function (e, t, r) {
        var n = document.body.createTextRange();
        try {
          n.moveToElementText(e.parentNode);
        } catch (i) {
          return n;
        }
        return (
          n.collapse(!0),
          n.moveEnd("character", r),
          n.moveStart("character", t),
          n
        );
      };
  var Rs = (e.contains = function (e, t) {
    if ((3 == t.nodeType && (t = t.parentNode), e.contains))
      return e.contains(t);
    do if ((11 == t.nodeType && (t = t.host), t == e)) return !0;
    while ((t = t.parentNode));
  });
  dl &&
    11 > pl &&
    (Uo = function () {
      try {
        return document.activeElement;
      } catch (e) {
        return document.body;
      }
    });
  var Bs,
    Gs,
    Us = (e.rmClass = function (e, t) {
      var r = e.className,
        n = Vo(t).exec(r);
      if (n) {
        var i = r.slice(n.index + n[0].length);
        e.className = r.slice(0, n.index) + (i ? n[1] + i : "");
      }
    }),
    Vs = (e.addClass = function (e, t) {
      var r = e.className;
      Vo(t).test(r) || (e.className += (r ? " " : "") + t);
    }),
    Ks = !1,
    js = (function () {
      if (dl && 9 > pl) return !1;
      var e = Ro("div");
      return "draggable" in e || "dragDrop" in e;
    })(),
    Xs = (e.splitLines =
      3 != "\n\nb".split(/\n/).length
        ? function (e) {
            for (var t = 0, r = [], n = e.length; n >= t; ) {
              var i = e.indexOf("\n", t);
              -1 == i && (i = e.length);
              var o = e.slice(t, "\r" == e.charAt(i - 1) ? i - 1 : i),
                l = o.indexOf("\r");
              -1 != l
                ? (r.push(o.slice(0, l)), (t += l + 1))
                : (r.push(o), (t = i + 1));
            }
            return r;
          }
        : function (e) {
            return e.split(/\r\n?|\n/);
          }),
    _s = window.getSelection
      ? function (e) {
          try {
            return e.selectionStart != e.selectionEnd;
          } catch (t) {
            return !1;
          }
        }
      : function (e) {
          try {
            var t = e.ownerDocument.selection.createRange();
          } catch (r) {}
          return t && t.parentElement() == e
            ? 0 != t.compareEndPoints("StartToEnd", t)
            : !1;
        },
    Ys = (function () {
      var e = Ro("div");
      return "oncopy" in e
        ? !0
        : (e.setAttribute("oncopy", "return;"), "function" == typeof e.oncopy);
    })(),
    $s = null,
    qs = {
      3: "Enter",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      107: "=",
      109: "-",
      127: "Delete",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert",
    };
  (e.keyNames = qs),
    (function () {
      for (var e = 0; 10 > e; e++) qs[e + 48] = qs[e + 96] = String(e);
      for (var e = 65; 90 >= e; e++) qs[e] = String.fromCharCode(e);
      for (var e = 1; 12 >= e; e++) qs[e + 111] = qs[e + 63235] = "F" + e;
    })();
  var Zs,
    Qs = (function () {
      function e(e) {
        return 247 >= e
          ? r.charAt(e)
          : e >= 1424 && 1524 >= e
          ? "R"
          : e >= 1536 && 1773 >= e
          ? n.charAt(e - 1536)
          : e >= 1774 && 2220 >= e
          ? "r"
          : e >= 8192 && 8203 >= e
          ? "w"
          : 8204 == e
          ? "b"
          : "L";
      }
      function t(e, t, r) {
        (this.level = e), (this.from = t), (this.to = r);
      }
      var r =
          "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
        n =
          "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
        i = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
        o = /[stwN]/,
        l = /[LRr]/,
        s = /[Lb1n]/,
        a = /[1n]/,
        u = "L";
      return function (r) {
        if (!i.test(r)) return !1;
        for (var n, c = r.length, f = [], h = 0; c > h; ++h)
          f.push((n = e(r.charCodeAt(h))));
        for (var h = 0, d = u; c > h; ++h) {
          var n = f[h];
          "m" == n ? (f[h] = d) : (d = n);
        }
        for (var h = 0, p = u; c > h; ++h) {
          var n = f[h];
          "1" == n && "r" == p
            ? (f[h] = "n")
            : l.test(n) && ((p = n), "r" == n && (f[h] = "R"));
        }
        for (var h = 1, d = f[0]; c - 1 > h; ++h) {
          var n = f[h];
          "+" == n && "1" == d && "1" == f[h + 1]
            ? (f[h] = "1")
            : "," != n || d != f[h + 1] || ("1" != d && "n" != d) || (f[h] = d),
            (d = n);
        }
        for (var h = 0; c > h; ++h) {
          var n = f[h];
          if ("," == n) f[h] = "N";
          else if ("%" == n) {
            for (var g = h + 1; c > g && "%" == f[g]; ++g);
            for (
              var v =
                  (h && "!" == f[h - 1]) || (c > g && "1" == f[g]) ? "1" : "N",
                m = h;
              g > m;
              ++m
            )
              f[m] = v;
            h = g - 1;
          }
        }
        for (var h = 0, p = u; c > h; ++h) {
          var n = f[h];
          "L" == p && "1" == n ? (f[h] = "L") : l.test(n) && (p = n);
        }
        for (var h = 0; c > h; ++h)
          if (o.test(f[h])) {
            for (var g = h + 1; c > g && o.test(f[g]); ++g);
            for (
              var y = "L" == (h ? f[h - 1] : u),
                b = "L" == (c > g ? f[g] : u),
                v = y || b ? "L" : "R",
                m = h;
              g > m;
              ++m
            )
              f[m] = v;
            h = g - 1;
          }
        for (var w, x = [], h = 0; c > h; )
          if (s.test(f[h])) {
            var C = h;
            for (++h; c > h && s.test(f[h]); ++h);
            x.push(new t(0, C, h));
          } else {
            var S = h,
              L = x.length;
            for (++h; c > h && "L" != f[h]; ++h);
            for (var m = S; h > m; )
              if (a.test(f[m])) {
                m > S && x.splice(L, 0, new t(1, S, m));
                var k = m;
                for (++m; h > m && a.test(f[m]); ++m);
                x.splice(L, 0, new t(2, k, m)), (S = m);
              } else ++m;
            h > S && x.splice(L, 0, new t(1, S, h));
          }
        return (
          1 == x[0].level &&
            (w = r.match(/^\s+/)) &&
            ((x[0].from = w[0].length), x.unshift(new t(0, 0, w[0].length))),
          1 == No(x).level &&
            (w = r.match(/\s+$/)) &&
            ((No(x).to -= w[0].length), x.push(new t(0, c - w[0].length, c))),
          2 == x[0].level && x.unshift(new t(1, x[0].to, x[0].to)),
          x[0].level != No(x).level && x.push(new t(x[0].level, c, c)),
          x
        );
      };
    })();
  return (e.version = "5.3.0"), e;
});
