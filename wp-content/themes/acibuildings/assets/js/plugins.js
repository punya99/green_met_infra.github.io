// Avoid `console` errors in browsers that lack a console.
! function() {
    function o() {}
    for (var e, n = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], r = n.length, i = window.console = window.console || {}; r--;) i[e = n[r]] || (i[e] = o)
}();

// Format phone numbers as they are typed
! function(r) {
    r.fn.phoneFormat = function(e) {
        var t = {
                errorHtml: '<div class="error">Area code cannot start with 0 or 1.</div>',
                showErrors: !0
            },
            s = function(r) {
                var e = this.val();
                if (filteredNum = e.replace(/[^\d]/g, ""), "0" == filteredNum.substr(0, 1) || "1" == filteredNum.substr(0, 1)) this.settings.showErrors && this.error.show(), filteredNum = "";
                else if (this.settings.showErrors) {
                    var t = this;
                    setTimeout(function() {
                        t.error.fadeOut()
                    }, 2e3)
                }
                var s = "";
                filteredNum.length ? (s = "(" + filteredNum.substr(0, 3), filteredNum.length >= 3 && (3 != filteredNum.length || 8 != r.which) && (s += ") "), s += filteredNum.substr(3, 3), filteredNum.length >= 6 && (6 != filteredNum.length || 8 != r.which) && (s += "-"), s += filteredNum.substr(6, 4)) : 1 == e.length && "(" == e[0] && (s = "("), this.val(s)
            };
        return this.each(function() {
            var i = r(this);
            i.settings = r.extend({}, t, e), i.settings.showErrors && (i.error = r(i.settings.errorHtml), i.error.hide(), i.after(i.error)), i.keyup(r.proxy(s, i)), i.change(r.proxy(s, i))
        })
    }
}(jQuery);

/*
 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues
 */
! function(i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function(a) {
    "use strict";
    var o, r = window.Slick || {};
    o = 0, (r = function(i, e) {
        var t = this;
        t.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: a(i),
            appendDots: a(i),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(i, e) {
                return a('<button type="button" />').text(e + 1)
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, t.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, a.extend(t, t.initials), t.activeBreakpoint = null, t.animType = null, t.animProp = null, t.breakpoints = [], t.breakpointSettings = [], t.cssTransitions = !1, t.focussed = !1, t.interrupted = !1, t.hidden = "hidden", t.paused = !0, t.positionProp = null, t.respondTo = null, t.rowCount = 1, t.shouldClick = !0, t.$slider = a(i), t.$slidesCache = null, t.transformType = null, t.transitionType = null, t.visibilityChange = "visibilitychange", t.windowWidth = 0, t.windowTimer = null, i = a(i).data("slick") || {}, t.options = a.extend({}, t.defaults, e, i), t.currentSlide = t.options.initialSlide, t.originalSettings = t.options, void 0 !== document.mozHidden ? (t.hidden = "mozHidden", t.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (t.hidden = "webkitHidden", t.visibilityChange = "webkitvisibilitychange"), t.autoPlay = a.proxy(t.autoPlay, t), t.autoPlayClear = a.proxy(t.autoPlayClear, t), t.autoPlayIterator = a.proxy(t.autoPlayIterator, t), t.changeSlide = a.proxy(t.changeSlide, t), t.clickHandler = a.proxy(t.clickHandler, t), t.selectHandler = a.proxy(t.selectHandler, t), t.setPosition = a.proxy(t.setPosition, t), t.swipeHandler = a.proxy(t.swipeHandler, t), t.dragHandler = a.proxy(t.dragHandler, t), t.keyHandler = a.proxy(t.keyHandler, t), t.instanceUid = o++, t.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, t.registerBreakpoints(), t.init(!0)
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, r.prototype.addSlide = r.prototype.slickAdd = function(i, e, t) {
        var o = this;
        if ("boolean" == typeof e) t = e, e = null;
        else if (e < 0 || e >= o.slideCount) return !1;
        o.unload(), "number" == typeof e ? 0 === e && 0 === o.$slides.length ? a(i).appendTo(o.$slideTrack) : t ? a(i).insertBefore(o.$slides.eq(e)) : a(i).insertAfter(o.$slides.eq(e)) : !0 === t ? a(i).prependTo(o.$slideTrack) : a(i).appendTo(o.$slideTrack), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slides.each(function(i, e) {
            a(e).attr("data-slick-index", i)
        }), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.animateHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0), e.$list.animate({
            height: i
        }, e.options.speed))
    }, r.prototype.animateSlide = function(i, e) {
        var t = {},
            o = this;
        o.animateHeight(), !0 === o.options.rtl && !1 === o.options.vertical && (i = -i), !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
            left: i
        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
            top: i
        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), a({
            animStart: o.currentLeft
        }).animate({
            animStart: i
        }, {
            duration: o.options.speed,
            easing: o.options.easing,
            step: function(i) {
                i = Math.ceil(i), !1 === o.options.vertical ? t[o.animType] = "translate(" + i + "px, 0px)" : t[o.animType] = "translate(0px," + i + "px)", o.$slideTrack.css(t)
            },
            complete: function() {
                e && e.call()
            }
        })) : (o.applyTransition(), i = Math.ceil(i), !1 === o.options.vertical ? t[o.animType] = "translate3d(" + i + "px, 0px, 0px)" : t[o.animType] = "translate3d(0px," + i + "px, 0px)", o.$slideTrack.css(t), e && setTimeout(function() {
            o.disableTransition(), e.call()
        }, o.options.speed))
    }, r.prototype.getNavTarget = function() {
        var i = this.options.asNavFor;
        return i && null !== i && (i = a(i).not(this.$slider)), i
    }, r.prototype.asNavFor = function(e) {
        var i = this.getNavTarget();
        null !== i && "object" == typeof i && i.each(function() {
            var i = a(this).slick("getSlick");
            i.unslicked || i.slideHandler(e, !0)
        })
    }, r.prototype.applyTransition = function(i) {
        var e = this,
            t = {};
        !1 === e.options.fade ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(i)).css(t)
    }, r.prototype.autoPlay = function() {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, r.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer)
    }, r.prototype.autoPlayIterator = function() {
        var i = this,
            e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (!1 === i.options.infinite && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 == 0 && (i.direction = 1))), i.slideHandler(e))
    }, r.prototype.buildArrows = function() {
        var i = this;
        !0 === i.options.arrows && (i.$prevArrow = a(i.options.prevArrow).addClass("slick-arrow"), i.$nextArrow = a(i.options.nextArrow).addClass("slick-arrow"), i.slideCount > i.options.slidesToShow ? (i.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.prependTo(i.options.appendArrows), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.appendTo(i.options.appendArrows), !0 !== i.options.infinite && i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : i.$prevArrow.add(i.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, r.prototype.buildDots = function() {
        var i, e, t = this;
        if (!0 === t.options.dots && t.slideCount > t.options.slidesToShow) {
            for (t.$slider.addClass("slick-dotted"), e = a("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1) e.append(a("<li />").append(t.options.customPaging.call(this, t, i)));
            t.$dots = e.appendTo(t.options.appendDots), t.$dots.find("li").first().addClass("slick-active")
        }
    }, r.prototype.buildOut = function() {
        var i = this;
        i.$slides = i.$slider.children(i.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), i.slideCount = i.$slides.length, i.$slides.each(function(i, e) {
            a(e).attr("data-slick-index", i).data("originalStyling", a(e).attr("style") || "")
        }), i.$slider.addClass("slick-slider"), i.$slideTrack = 0 === i.slideCount ? a('<div class="slick-track"/>').appendTo(i.$slider) : i.$slides.wrapAll('<div class="slick-track"/>').parent(), i.$list = i.$slideTrack.wrap('<div class="slick-list"/>').parent(), i.$slideTrack.css("opacity", 0), !0 !== i.options.centerMode && !0 !== i.options.swipeToSlide || (i.options.slidesToScroll = 1), a("img[data-lazy]", i.$slider).not("[src]").addClass("slick-loading"), i.setupInfinite(), i.buildArrows(), i.buildDots(), i.updateDots(), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), !0 === i.options.draggable && i.$list.addClass("draggable")
    }, r.prototype.buildRows = function() {
        var i, e, t, o = this,
            s = document.createDocumentFragment(),
            n = o.$slider.children();
        if (0 < o.options.rows) {
            for (t = o.options.slidesPerRow * o.options.rows, e = Math.ceil(n.length / t), i = 0; i < e; i++) {
                for (var r = document.createElement("div"), l = 0; l < o.options.rows; l++) {
                    for (var d = document.createElement("div"), a = 0; a < o.options.slidesPerRow; a++) {
                        var c = i * t + (l * o.options.slidesPerRow + a);
                        n.get(c) && d.appendChild(n.get(c))
                    }
                    r.appendChild(d)
                }
                s.appendChild(r)
            }
            o.$slider.empty().append(s), o.$slider.children().children().children().css({
                width: 100 / o.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, r.prototype.checkResponsive = function(i, e) {
        var t, o, s, n = this,
            r = !1,
            l = n.$slider.width(),
            d = window.innerWidth || a(window).width();
        if ("window" === n.respondTo ? s = d : "slider" === n.respondTo ? s = l : "min" === n.respondTo && (s = Math.min(d, l)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
            for (t in o = null, n.breakpoints) n.breakpoints.hasOwnProperty(t) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[t] && (o = n.breakpoints[t]) : s > n.breakpoints[t] && (o = n.breakpoints[t]));
            null !== o ? null !== n.activeBreakpoint && o === n.activeBreakpoint && !e || (n.activeBreakpoint = o, "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = a.extend({}, n.originalSettings, n.breakpointSettings[o]), !0 === i && (n.currentSlide = n.options.initialSlide), n.refresh(i)), r = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, n.options = n.originalSettings, !0 === i && (n.currentSlide = n.options.initialSlide), n.refresh(i), r = o), i || !1 === r || n.$slider.trigger("breakpoint", [n, r])
        }
    }, r.prototype.changeSlide = function(i, e) {
        var t, o = this,
            s = a(i.currentTarget);
        switch (s.is("a") && i.preventDefault(), s.is("li") || (s = s.closest("li")), t = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, i.data.message) {
            case "previous":
                n = 0 == t ? o.options.slidesToScroll : o.options.slidesToShow - t, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - n, !1, e);
                break;
            case "next":
                n = 0 == t ? o.options.slidesToScroll : t, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + n, !1, e);
                break;
            case "index":
                var n = 0 === i.data.index ? 0 : i.data.index || s.index() * o.options.slidesToScroll;
                o.slideHandler(o.checkNavigable(n), !1, e), s.children().trigger("focus");
                break;
            default:
                return
        }
    }, r.prototype.checkNavigable = function(i) {
        var e = this.getNavigableIndexes(),
            t = 0;
        if (i > e[e.length - 1]) i = e[e.length - 1];
        else
            for (var o in e) {
                if (i < e[o]) {
                    i = t;
                    break
                }
                t = e[o]
            }
        return i
    }, r.prototype.cleanUpEvents = function() {
        var i = this;
        i.options.dots && null !== i.$dots && (a("li", i.$dots).off("click.slick", i.changeSlide).off("mouseenter.slick", a.proxy(i.interrupt, i, !0)).off("mouseleave.slick", a.proxy(i.interrupt, i, !1)), !0 === i.options.accessibility && i.$dots.off("keydown.slick", i.keyHandler)), i.$slider.off("focus.slick blur.slick"), !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow && i.$prevArrow.off("click.slick", i.changeSlide), i.$nextArrow && i.$nextArrow.off("click.slick", i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow && i.$prevArrow.off("keydown.slick", i.keyHandler), i.$nextArrow && i.$nextArrow.off("keydown.slick", i.keyHandler))), i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler), i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler), i.$list.off("touchend.slick mouseup.slick", i.swipeHandler), i.$list.off("touchcancel.slick mouseleave.slick", i.swipeHandler), i.$list.off("click.slick", i.clickHandler), a(document).off(i.visibilityChange, i.visibility), i.cleanUpSlideEvents(), !0 === i.options.accessibility && i.$list.off("keydown.slick", i.keyHandler), !0 === i.options.focusOnSelect && a(i.$slideTrack).children().off("click.slick", i.selectHandler), a(window).off("orientationchange.slick.slick-" + i.instanceUid, i.orientationChange), a(window).off("resize.slick.slick-" + i.instanceUid, i.resize), a("[draggable!=true]", i.$slideTrack).off("dragstart", i.preventDefault), a(window).off("load.slick.slick-" + i.instanceUid, i.setPosition)
    }, r.prototype.cleanUpSlideEvents = function() {
        var i = this;
        i.$list.off("mouseenter.slick", a.proxy(i.interrupt, i, !0)), i.$list.off("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }, r.prototype.cleanUpRows = function() {
        var i;
        0 < this.options.rows && ((i = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(i))
    }, r.prototype.clickHandler = function(i) {
        !1 === this.shouldClick && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, r.prototype.destroy = function(i) {
        var e = this;
        e.autoPlayClear(), e.touchObject = {}, e.cleanUpEvents(), a(".slick-cloned", e.$slider).detach(), e.$dots && e.$dots.remove(), e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()), e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()), e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            a(this).attr("style", a(this).data("originalStyling"))
        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)), e.cleanUpRows(), e.$slider.removeClass("slick-slider"), e.$slider.removeClass("slick-initialized"), e.$slider.removeClass("slick-dotted"), e.unslicked = !0, i || e.$slider.trigger("destroy", [e])
    }, r.prototype.disableTransition = function(i) {
        var e = {};
        e[this.transitionType] = "", (!1 === this.options.fade ? this.$slideTrack : this.$slides.eq(i)).css(e)
    }, r.prototype.fadeSlide = function(i, e) {
        var t = this;
        !1 === t.cssTransitions ? (t.$slides.eq(i).css({
            zIndex: t.options.zIndex
        }), t.$slides.eq(i).animate({
            opacity: 1
        }, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function() {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, r.prototype.fadeSlideOut = function(i) {
        var e = this;
        !1 === e.cssTransitions ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, r.prototype.filterSlides = r.prototype.slickFilter = function(i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, r.prototype.focusHandler = function() {
        var t = this;
        t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function(i) {
            i.stopImmediatePropagation();
            var e = a(this);
            setTimeout(function() {
                t.options.pauseOnFocus && (t.focussed = e.is(":focus"), t.autoPlay())
            }, 0)
        })
    }, r.prototype.getCurrent = r.prototype.slickCurrentSlide = function() {
        return this.currentSlide
    }, r.prototype.getDotCount = function() {
        var i = this,
            e = 0,
            t = 0,
            o = 0;
        if (!0 === i.options.infinite)
            if (i.slideCount <= i.options.slidesToShow) ++o;
            else
                for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
            for (; e < i.slideCount;) ++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, r.prototype.getLeft = function(i) {
        var e, t, o = this,
            s = 0;
        return o.slideOffset = 0, e = o.$slides.first().outerHeight(!0), !0 === o.options.infinite ? (o.slideCount > o.options.slidesToShow && (o.slideOffset = o.slideWidth * o.options.slidesToShow * -1, t = -1, !0 === o.options.vertical && !0 === o.options.centerMode && (2 === o.options.slidesToShow ? t = -1.5 : 1 === o.options.slidesToShow && (t = -2)), s = e * o.options.slidesToShow * t), o.slideCount % o.options.slidesToScroll != 0 && i + o.options.slidesToScroll > o.slideCount && o.slideCount > o.options.slidesToShow && (s = i > o.slideCount ? (o.slideOffset = (o.options.slidesToShow - (i - o.slideCount)) * o.slideWidth * -1, (o.options.slidesToShow - (i - o.slideCount)) * e * -1) : (o.slideOffset = o.slideCount % o.options.slidesToScroll * o.slideWidth * -1, o.slideCount % o.options.slidesToScroll * e * -1))) : i + o.options.slidesToShow > o.slideCount && (o.slideOffset = (i + o.options.slidesToShow - o.slideCount) * o.slideWidth, s = (i + o.options.slidesToShow - o.slideCount) * e), o.slideCount <= o.options.slidesToShow && (s = o.slideOffset = 0), !0 === o.options.centerMode && o.slideCount <= o.options.slidesToShow ? o.slideOffset = o.slideWidth * Math.floor(o.options.slidesToShow) / 2 - o.slideWidth * o.slideCount / 2 : !0 === o.options.centerMode && !0 === o.options.infinite ? o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2) - o.slideWidth : !0 === o.options.centerMode && (o.slideOffset = 0, o.slideOffset += o.slideWidth * Math.floor(o.options.slidesToShow / 2)), e = !1 === o.options.vertical ? i * o.slideWidth * -1 + o.slideOffset : i * e * -1 + s, !0 === o.options.variableWidth && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(i) : o.$slideTrack.children(".slick-slide").eq(i + o.options.slidesToShow), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, !0 === o.options.centerMode && (s = o.slideCount <= o.options.slidesToShow || !1 === o.options.infinite ? o.$slideTrack.children(".slick-slide").eq(i) : o.$slideTrack.children(".slick-slide").eq(i + o.options.slidesToShow + 1), e = !0 === o.options.rtl ? s[0] ? -1 * (o.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0 : s[0] ? -1 * s[0].offsetLeft : 0, e += (o.$list.width() - s.outerWidth()) / 2)), e
    }, r.prototype.getOption = r.prototype.slickGetOption = function(i) {
        return this.options[i]
    }, r.prototype.getNavigableIndexes = function() {
        for (var i = this, e = 0, t = 0, o = [], s = !1 === i.options.infinite ? i.slideCount : (e = -1 * i.options.slidesToScroll, t = -1 * i.options.slidesToScroll, 2 * i.slideCount); e < s;) o.push(e), e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow;
        return o
    }, r.prototype.getSlick = function() {
        return this
    }, r.prototype.getSlideCount = function() {
        var t, o = this,
            s = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0;
        return !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function(i, e) {
            if (e.offsetLeft - s + a(e).outerWidth() / 2 > -1 * o.swipeLeft) return t = e, !1
        }), Math.abs(a(t).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
    }, r.prototype.goTo = r.prototype.slickGoTo = function(i, e) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(i)
            }
        }, e)
    }, r.prototype.init = function(i) {
        var e = this;
        a(e.$slider).hasClass("slick-initialized") || (a(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()), i && e.$slider.trigger("init", [e]), !0 === e.options.accessibility && e.initADA(), e.options.autoplay && (e.paused = !1, e.autoPlay())
    }, r.prototype.initADA = function() {
        var t = this,
            o = Math.ceil(t.slideCount / t.options.slidesToShow),
            s = t.getNavigableIndexes().filter(function(i) {
                return 0 <= i && i < t.slideCount
            });
        t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== t.$dots && (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function(i) {
            var e = s.indexOf(i);
            a(this).attr({
                role: "tabpanel",
                id: "slick-slide" + t.instanceUid + i,
                tabindex: -1
            }), -1 !== e && (e = "slick-slide-control" + t.instanceUid + e, a("#" + e).length && a(this).attr({
                "aria-describedby": e
            }))
        }), t.$dots.attr("role", "tablist").find("li").each(function(i) {
            var e = s[i];
            a(this).attr({
                role: "presentation"
            }), a(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + t.instanceUid + i,
                "aria-controls": "slick-slide" + t.instanceUid + e,
                "aria-label": i + 1 + " of " + o,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(t.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var i = t.currentSlide, e = i + t.options.slidesToShow; i < e; i++) t.options.focusOnChange ? t.$slides.eq(i).attr({
            tabindex: "0"
        }) : t.$slides.eq(i).removeAttr("tabindex");
        t.activateADA()
    }, r.prototype.initArrowEvents = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, i.changeSlide), !0 === i.options.accessibility && (i.$prevArrow.on("keydown.slick", i.keyHandler), i.$nextArrow.on("keydown.slick", i.keyHandler)))
    }, r.prototype.initDotEvents = function() {
        var i = this;
        !0 === i.options.dots && i.slideCount > i.options.slidesToShow && (a("li", i.$dots).on("click.slick", {
            message: "index"
        }, i.changeSlide), !0 === i.options.accessibility && i.$dots.on("keydown.slick", i.keyHandler)), !0 === i.options.dots && !0 === i.options.pauseOnDotsHover && i.slideCount > i.options.slidesToShow && a("li", i.$dots).on("mouseenter.slick", a.proxy(i.interrupt, i, !0)).on("mouseleave.slick", a.proxy(i.interrupt, i, !1))
    }, r.prototype.initSlideEvents = function() {
        var i = this;
        i.options.pauseOnHover && (i.$list.on("mouseenter.slick", a.proxy(i.interrupt, i, !0)), i.$list.on("mouseleave.slick", a.proxy(i.interrupt, i, !1)))
    }, r.prototype.initializeEvents = function() {
        var i = this;
        i.initArrowEvents(), i.initDotEvents(), i.initSlideEvents(), i.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, i.swipeHandler), i.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, i.swipeHandler), i.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, i.swipeHandler), i.$list.on("click.slick", i.clickHandler), a(document).on(i.visibilityChange, a.proxy(i.visibility, i)), !0 === i.options.accessibility && i.$list.on("keydown.slick", i.keyHandler), !0 === i.options.focusOnSelect && a(i.$slideTrack).children().on("click.slick", i.selectHandler), a(window).on("orientationchange.slick.slick-" + i.instanceUid, a.proxy(i.orientationChange, i)), a(window).on("resize.slick.slick-" + i.instanceUid, a.proxy(i.resize, i)), a("[draggable!=true]", i.$slideTrack).on("dragstart", i.preventDefault), a(window).on("load.slick.slick-" + i.instanceUid, i.setPosition), a(i.setPosition)
    }, r.prototype.initUI = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, r.prototype.keyHandler = function(i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && !0 === e.options.accessibility ? e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "next" : "previous"
            }
        }) : 39 === i.keyCode && !0 === e.options.accessibility && e.changeSlide({
            data: {
                message: !0 === e.options.rtl ? "previous" : "next"
            }
        }))
    }, r.prototype.lazyLoad = function() {
        var i, e, t, n = this;

        function o(i) {
            a("img[data-lazy]", i).each(function() {
                var i = a(this),
                    e = a(this).attr("data-lazy"),
                    t = a(this).attr("data-srcset"),
                    o = a(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                    s = document.createElement("img");
                s.onload = function() {
                    i.animate({
                        opacity: 0
                    }, 100, function() {
                        t && (i.attr("srcset", t), o && i.attr("sizes", o)), i.attr("src", e).animate({
                            opacity: 1
                        }, 200, function() {
                            i.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), n.$slider.trigger("lazyLoaded", [n, i, e])
                    })
                }, s.onerror = function() {
                    i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, i, e])
                }, s.src = e
            })
        }
        if (!0 === n.options.centerMode ? t = !0 === n.options.infinite ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, t = Math.ceil(e + n.options.slidesToShow), !0 === n.options.fade && (0 < e && e--, t <= n.slideCount && t++)), i = n.$slider.find(".slick-slide").slice(e, t), "anticipated" === n.options.lazyLoad)
            for (var s = e - 1, r = t, l = n.$slider.find(".slick-slide"), d = 0; d < n.options.slidesToScroll; d++) s < 0 && (s = n.slideCount - 1), i = (i = i.add(l.eq(s))).add(l.eq(r)), s--, r++;
        o(i), n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
    }, r.prototype.loadSlider = function() {
        var i = this;
        i.setPosition(), i.$slideTrack.css({
            opacity: 1
        }), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, r.prototype.next = r.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, r.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition()
    }, r.prototype.pause = r.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0
    }, r.prototype.play = r.prototype.slickPlay = function() {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, r.prototype.postSlide = function(i) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, i]), e.animating = !1, e.slideCount > e.options.slidesToShow && e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && (e.initADA(), e.options.focusOnChange && a(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()))
    }, r.prototype.prev = r.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, r.prototype.preventDefault = function(i) {
        i.preventDefault()
    }, r.prototype.progressiveLazyLoad = function(i) {
        i = i || 1;
        var e, t, o, s, n = this,
            r = a("img[data-lazy]", n.$slider);
        r.length ? (e = r.first(), t = e.attr("data-lazy"), o = e.attr("data-srcset"), s = e.attr("data-sizes") || n.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function() {
            o && (e.attr("srcset", o), s && e.attr("sizes", s)), e.attr("src", t).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === n.options.adaptiveHeight && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, e, t]), n.progressiveLazyLoad()
        }, r.onerror = function() {
            i < 3 ? setTimeout(function() {
                n.progressiveLazyLoad(i + 1)
            }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, e, t]), n.progressiveLazyLoad())
        }, r.src = t) : n.$slider.trigger("allImagesLoaded", [n])
    }, r.prototype.refresh = function(i) {
        var e = this,
            t = e.slideCount - e.options.slidesToShow;
        !e.options.infinite && e.currentSlide > t && (e.currentSlide = t), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), t = e.currentSlide, e.destroy(!0), a.extend(e, e.initials, {
            currentSlide: t
        }), e.init(), i || e.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, r.prototype.registerBreakpoints = function() {
        var i, e, t, o = this,
            s = o.options.responsive || null;
        if (Array.isArray(s) && s.length) {
            for (i in o.respondTo = o.options.respondTo || "window", s)
                if (t = o.breakpoints.length - 1, s.hasOwnProperty(i)) {
                    for (e = s[i].breakpoint; 0 <= t;) o.breakpoints[t] && o.breakpoints[t] === e && o.breakpoints.splice(t, 1), t--;
                    o.breakpoints.push(e), o.breakpointSettings[e] = s[i].settings
                }
            o.breakpoints.sort(function(i, e) {
                return o.options.mobileFirst ? i - e : e - i
            })
        }
    }, r.prototype.reinit = function() {
        var i = this;
        i.$slides = i.$slideTrack.children(i.options.slide).addClass("slick-slide"), i.slideCount = i.$slides.length, i.currentSlide >= i.slideCount && 0 !== i.currentSlide && (i.currentSlide = i.currentSlide - i.options.slidesToScroll), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), i.registerBreakpoints(), i.setProps(), i.setupInfinite(), i.buildArrows(), i.updateArrows(), i.initArrowEvents(), i.buildDots(), i.updateDots(), i.initDotEvents(), i.cleanUpSlideEvents(), i.initSlideEvents(), i.checkResponsive(!1, !0), !0 === i.options.focusOnSelect && a(i.$slideTrack).children().on("click.slick", i.selectHandler), i.setSlideClasses("number" == typeof i.currentSlide ? i.currentSlide : 0), i.setPosition(), i.focusHandler(), i.paused = !i.options.autoplay, i.autoPlay(), i.$slider.trigger("reInit", [i])
    }, r.prototype.resize = function() {
        var i = this;
        a(window).width() !== i.windowWidth && (clearTimeout(i.windowDelay), i.windowDelay = window.setTimeout(function() {
            i.windowWidth = a(window).width(), i.checkResponsive(), i.unslicked || i.setPosition()
        }, 50))
    }, r.prototype.removeSlide = r.prototype.slickRemove = function(i, e, t) {
        var o = this;
        if (i = "boolean" == typeof i ? !0 === (e = i) ? 0 : o.slideCount - 1 : !0 === e ? --i : i, o.slideCount < 1 || i < 0 || i > o.slideCount - 1) return !1;
        o.unload(), (!0 === t ? o.$slideTrack.children() : o.$slideTrack.children(this.options.slide).eq(i)).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, o.reinit()
    }, r.prototype.setCSS = function(i) {
        var e, t, o = this,
            s = {};
        !0 === o.options.rtl && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + t + ")" : s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"), o.$slideTrack.css(s)
    }, r.prototype.setDimensions = function() {
        var i = this;
        !1 === i.options.vertical ? !0 === i.options.centerMode && i.$list.css({
            padding: "0px " + i.options.centerPadding
        }) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), !0 === i.options.centerMode && i.$list.css({
            padding: i.options.centerPadding + " 0px"
        })), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), !1 === i.options.vertical && !1 === i.options.variableWidth ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : !0 === i.options.variableWidth ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, r.prototype.setFade = function() {
        var t, o = this;
        o.$slides.each(function(i, e) {
            t = o.slideWidth * i * -1, !0 === o.options.rtl ? a(e).css({
                position: "relative",
                right: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: t,
                top: 0,
                zIndex: o.options.zIndex - 2,
                opacity: 0
            })
        }), o.$slides.eq(o.currentSlide).css({
            zIndex: o.options.zIndex - 1,
            opacity: 1
        })
    }, r.prototype.setHeight = function() {
        var i, e = this;
        1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical && (i = e.$slides.eq(e.currentSlide).outerHeight(!0), e.$list.css("height", i))
    }, r.prototype.setOption = r.prototype.slickSetOption = function() {
        var i, e, t, o, s, n = this,
            r = !1;
        if ("object" == typeof arguments[0] ? (t = arguments[0], r = arguments[1], s = "multiple") : "string" == typeof arguments[0] && (t = arguments[0], o = arguments[1], r = arguments[2], "responsive" === arguments[0] && "array" == typeof arguments[1] ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) n.options[t] = o;
        else if ("multiple" === s) a.each(t, function(i, e) {
            n.options[i] = e
        });
        else if ("responsive" === s)
            for (e in o)
                if (Array.isArray(n.options.responsive)) {
                    for (i = n.options.responsive.length - 1; 0 <= i;) n.options.responsive[i].breakpoint === o[e].breakpoint && n.options.responsive.splice(i, 1), i--;
                    n.options.responsive.push(o[e])
                } else n.options.responsive = [o[e]];
        r && (n.unload(), n.reinit())
    }, r.prototype.setPosition = function() {
        var i = this;
        i.setDimensions(), i.setHeight(), !1 === i.options.fade ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, r.prototype.setProps = function() {
        var i = this,
            e = document.body.style;
        i.positionProp = !0 === i.options.vertical ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === i.options.useCSS && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && !1 !== i.animType && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && !1 !== i.animType
    }, r.prototype.setSlideClasses = function(i) {
        var e, t, o, s = this,
            n = s.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
        s.$slides.eq(i).addClass("slick-current"), !0 === s.options.centerMode ? (t = s.options.slidesToShow % 2 == 0 ? 1 : 0, o = Math.floor(s.options.slidesToShow / 2), !0 === s.options.infinite && (o <= i && i <= s.slideCount - 1 - o ? s.$slides.slice(i - o + t, i + o + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = s.options.slidesToShow + i, n.slice(e - o + 1 + t, e + o + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? n.eq(n.length - 1 - s.options.slidesToShow).addClass("slick-center") : i === s.slideCount - 1 && n.eq(s.options.slidesToShow).addClass("slick-center")), s.$slides.eq(i).addClass("slick-center")) : 0 <= i && i <= s.slideCount - s.options.slidesToShow ? s.$slides.slice(i, i + s.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= s.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = s.slideCount % s.options.slidesToShow, e = !0 === s.options.infinite ? s.options.slidesToShow + i : i, (s.options.slidesToShow == s.options.slidesToScroll && s.slideCount - i < s.options.slidesToShow ? n.slice(e - (s.options.slidesToShow - o), e + o) : n.slice(e, e + s.options.slidesToShow)).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" !== s.options.lazyLoad && "anticipated" !== s.options.lazyLoad || s.lazyLoad()
    }, r.prototype.setupInfinite = function() {
        var i, e, t, o = this;
        if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (e = null, o.slideCount > o.options.slidesToShow)) {
            for (t = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, i = o.slideCount; i > o.slideCount - t; --i) e = i - 1, a(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < t + o.slideCount; i += 1) e = i, a(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
            o.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                a(this).attr("id", "")
            })
        }
    }, r.prototype.interrupt = function(i) {
        i || this.autoPlay(), this.interrupted = i
    }, r.prototype.selectHandler = function(i) {
        i = a(i.target).is(".slick-slide") ? a(i.target) : a(i.target).parents(".slick-slide"), i = (i = parseInt(i.attr("data-slick-index"))) || 0;
        this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
    }, r.prototype.slideHandler = function(i, e, t) {
        var o, s, n, r, l = this;
        if (e = e || !1, !(!0 === l.animating && !0 === l.options.waitForAnimate || !0 === l.options.fade && l.currentSlide === i))
            if (!1 === e && l.asNavFor(i), o = i, n = l.getLeft(o), e = l.getLeft(l.currentSlide), l.currentLeft = null === l.swipeLeft ? e : l.swipeLeft, !1 === l.options.infinite && !1 === l.options.centerMode && (i < 0 || i > l.getDotCount() * l.options.slidesToScroll)) !1 === l.options.fade && (o = l.currentSlide, !0 !== t && l.slideCount > l.options.slidesToShow ? l.animateSlide(e, function() {
                l.postSlide(o)
            }) : l.postSlide(o));
            else if (!1 === l.options.infinite && !0 === l.options.centerMode && (i < 0 || i > l.slideCount - l.options.slidesToScroll)) !1 === l.options.fade && (o = l.currentSlide, !0 !== t && l.slideCount > l.options.slidesToShow ? l.animateSlide(e, function() {
            l.postSlide(o)
        }) : l.postSlide(o));
        else {
            if (l.options.autoplay && clearInterval(l.autoPlayTimer), s = o < 0 ? l.slideCount % l.options.slidesToScroll != 0 ? l.slideCount - l.slideCount % l.options.slidesToScroll : l.slideCount + o : o >= l.slideCount ? l.slideCount % l.options.slidesToScroll != 0 ? 0 : o - l.slideCount : o, l.animating = !0, l.$slider.trigger("beforeChange", [l, l.currentSlide, s]), e = l.currentSlide, l.currentSlide = s, l.setSlideClasses(l.currentSlide), l.options.asNavFor && (r = (r = l.getNavTarget()).slick("getSlick")).slideCount <= r.options.slidesToShow && r.setSlideClasses(l.currentSlide), l.updateDots(), l.updateArrows(), !0 === l.options.fade) return !0 !== t ? (l.fadeSlideOut(e), l.fadeSlide(s, function() {
                l.postSlide(s)
            })) : l.postSlide(s), void l.animateHeight();
            !0 !== t && l.slideCount > l.options.slidesToShow ? l.animateSlide(n, function() {
                l.postSlide(s)
            }) : l.postSlide(s)
        }
    }, r.prototype.startLoad = function() {
        var i = this;
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), !0 === i.options.dots && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, r.prototype.swipeDirection = function() {
        var i = this,
            e = i.touchObject.startX - i.touchObject.curX,
            t = i.touchObject.startY - i.touchObject.curY,
            e = Math.atan2(t, e),
            e = Math.round(180 * e / Math.PI);
        return e < 0 && (e = 360 - Math.abs(e)), e <= 45 && 0 <= e || e <= 360 && 315 <= e ? !1 === i.options.rtl ? "left" : "right" : 135 <= e && e <= 225 ? !1 === i.options.rtl ? "right" : "left" : !0 === i.options.verticalSwiping ? 35 <= e && e <= 135 ? "down" : "up" : "vertical"
    }, r.prototype.swipeEnd = function(i) {
        var e, t, o = this;
        if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1;
        if (o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
        if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case "left":
                case "down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, r.prototype.swipeHandler = function(i) {
        var e = this;
        if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case "start":
                e.swipeStart(i);
                break;
            case "move":
                e.swipeMove(i);
                break;
            case "end":
                e.swipeEnd(i)
        }
    }, r.prototype.swipeMove = function(i) {
        var e, t, o = this,
            s = void 0 !== i.originalEvent ? i.originalEvent.touches : null;
        return !(!o.dragging || o.scrolling || s && 1 !== s.length) && (e = o.getLeft(o.currentSlide), o.touchObject.curX = void 0 !== s ? s[0].pageX : i.clientX, o.touchObject.curY = void 0 !== s ? s[0].pageY : i.clientY, o.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(o.touchObject.curX - o.touchObject.startX, 2))), t = Math.round(Math.sqrt(Math.pow(o.touchObject.curY - o.touchObject.startY, 2))), !o.options.verticalSwiping && !o.swiping && 4 < t ? !(o.scrolling = !0) : (!0 === o.options.verticalSwiping && (o.touchObject.swipeLength = t), s = o.swipeDirection(), void 0 !== i.originalEvent && 4 < o.touchObject.swipeLength && (o.swiping = !0, i.preventDefault()), t = (!1 === o.options.rtl ? 1 : -1) * (o.touchObject.curX > o.touchObject.startX ? 1 : -1), !0 === o.options.verticalSwiping && (t = o.touchObject.curY > o.touchObject.startY ? 1 : -1), i = o.touchObject.swipeLength, (o.touchObject.edgeHit = !1) === o.options.infinite && (0 === o.currentSlide && "right" === s || o.currentSlide >= o.getDotCount() && "left" === s) && (i = o.touchObject.swipeLength * o.options.edgeFriction, o.touchObject.edgeHit = !0), !1 === o.options.vertical ? o.swipeLeft = e + i * t : o.swipeLeft = e + i * (o.$list.height() / o.listWidth) * t, !0 === o.options.verticalSwiping && (o.swipeLeft = e + i * t), !0 !== o.options.fade && !1 !== o.options.touchMove && (!0 === o.animating ? (o.swipeLeft = null, !1) : void o.setCSS(o.swipeLeft))))
    }, r.prototype.swipeStart = function(i) {
        var e, t = this;
        if (t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow) return !(t.touchObject = {});
        void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, t.dragging = !0
    }, r.prototype.unfilterSlides = r.prototype.slickUnfilter = function() {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, r.prototype.unload = function() {
        var i = this;
        a(".slick-cloned", i.$slider).remove(), i.$dots && i.$dots.remove(), i.$prevArrow && i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove(), i.$nextArrow && i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove(), i.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, r.prototype.unslick = function(i) {
        this.$slider.trigger("unslick", [this, i]), this.destroy()
    }, r.prototype.updateArrows = function() {
        var i = this;
        Math.floor(i.options.slidesToShow / 2);
        !0 === i.options.arrows && i.slideCount > i.options.slidesToShow && !i.options.infinite && (i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === i.currentSlide ? (i.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (i.currentSlide >= i.slideCount - i.options.slidesToShow && !1 === i.options.centerMode || i.currentSlide >= i.slideCount - 1 && !0 === i.options.centerMode) && (i.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, r.prototype.updateDots = function() {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").end(), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active"))
    }, r.prototype.visibility = function() {
        this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
    }, a.fn.slick = function() {
        for (var i, e = this, t = arguments[0], o = Array.prototype.slice.call(arguments, 1), s = e.length, n = 0; n < s; n++)
            if ("object" == typeof t || void 0 === t ? e[n].slick = new r(e[n], t) : i = e[n].slick[t].apply(e[n].slick, o), void 0 !== i) return i;
        return e
    }
});

/*! choices.js v9.0.1 | © 2019 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
window.Choices = function(e) {
    var t = {};

    function i(n) {
        if (t[n]) return t[n].exports;
        var r = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
    }
    return i.m = e, i.c = t, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) i.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "/public/assets/scripts/", i(i.s = 7)
}([function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(1);
    t.DEFAULT_CLASSNAMES = {
        containerOuter: "choices",
        containerInner: "choices__inner",
        input: "choices__input",
        inputCloned: "choices__input--cloned",
        list: "choices__list",
        listItems: "choices__list--multiple",
        listSingle: "choices__list--single",
        listDropdown: "choices__list--dropdown",
        item: "choices__item",
        itemSelectable: "choices__item--selectable",
        itemDisabled: "choices__item--disabled",
        itemChoice: "choices__item--choice",
        placeholder: "choices__placeholder",
        group: "choices__group",
        groupHeading: "choices__heading",
        button: "choices__button",
        activeState: "is-active",
        focusState: "is-focused",
        openState: "is-open",
        disabledState: "is-disabled",
        highlightedState: "is-highlighted",
        selectedState: "is-selected",
        flippedState: "is-flipped",
        loadingState: "is-loading",
        noResults: "has-no-results",
        noChoices: "has-no-choices"
    }, t.DEFAULT_CONFIG = {
        items: [],
        choices: [],
        silent: !1,
        renderChoiceLimit: -1,
        maxItemCount: -1,
        addItems: !0,
        addItemFilter: null,
        removeItems: !0,
        removeItemButton: !1,
        editItems: !1,
        duplicateItemsAllowed: !0,
        delimiter: ",",
        paste: !0,
        searchEnabled: !0,
        searchChoices: !0,
        searchFloor: 1,
        searchResultLimit: 4,
        searchFields: ["label", "value"],
        position: "auto",
        resetScrollPosition: !0,
        shouldSort: !0,
        shouldSortItems: !1,
        sorter: n.sortByAlpha,
        placeholder: !0,
        placeholderValue: null,
        searchPlaceholderValue: null,
        prependValue: null,
        appendValue: null,
        renderSelectedChoices: "auto",
        loadingText: "Loading...",
        noResultsText: "No results found",
        noChoicesText: "No choices to choose from",
        itemSelectText: "Press to select",
        uniqueItemText: "Only unique values can be added",
        customAddItemText: "Only values matching specific conditions can be added",
        addItemText: function(e) {
            return 'Press Enter to add <b>"' + n.sanitise(e) + '"</b>'
        },
        maxItemText: function(e) {
            return "Only " + e + " values can be added"
        },
        valueComparer: function(e, t) {
            return e === t
        },
        fuseOptions: {
            includeScore: !0
        },
        callbackOnInit: null,
        callbackOnCreateTemplates: null,
        classNames: t.DEFAULT_CLASSNAMES
    }, t.EVENTS = {
        showDropdown: "showDropdown",
        hideDropdown: "hideDropdown",
        change: "change",
        choice: "choice",
        search: "search",
        addItem: "addItem",
        removeItem: "removeItem",
        highlightItem: "highlightItem",
        highlightChoice: "highlightChoice",
        unhighlightItem: "unhighlightItem"
    }, t.ACTION_TYPES = {
        ADD_CHOICE: "ADD_CHOICE",
        FILTER_CHOICES: "FILTER_CHOICES",
        ACTIVATE_CHOICES: "ACTIVATE_CHOICES",
        CLEAR_CHOICES: "CLEAR_CHOICES",
        ADD_GROUP: "ADD_GROUP",
        ADD_ITEM: "ADD_ITEM",
        REMOVE_ITEM: "REMOVE_ITEM",
        HIGHLIGHT_ITEM: "HIGHLIGHT_ITEM",
        CLEAR_ALL: "CLEAR_ALL",
        RESET_TO: "RESET_TO",
        SET_IS_LOADING: "SET_IS_LOADING"
    }, t.KEY_CODES = {
        BACK_KEY: 46,
        DELETE_KEY: 8,
        ENTER_KEY: 13,
        A_KEY: 65,
        ESC_KEY: 27,
        UP_KEY: 38,
        DOWN_KEY: 40,
        PAGE_UP_KEY: 33,
        PAGE_DOWN_KEY: 34
    }, t.TEXT_TYPE = "text", t.SELECT_ONE_TYPE = "select-one", t.SELECT_MULTIPLE_TYPE = "select-multiple", t.SCROLLING_SPEED = 4
}, function(e, t, i) {
    "use strict";
    var n;
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getRandomNumber = function(e, t) {
        return Math.floor(Math.random() * (t - e) + e)
    }, t.generateChars = function(e) {
        return Array.from({
            length: e
        }, (function() {
            return t.getRandomNumber(0, 36).toString(36)
        })).join("")
    }, t.generateId = function(e, i) {
        var n = e.id || e.name && e.name + "-" + t.generateChars(2) || t.generateChars(4);
        return n = i + "-" + (n = n.replace(/(:|\.|\[|\]|,)/g, ""))
    }, t.getType = function(e) {
        return Object.prototype.toString.call(e).slice(8, -1)
    }, t.isType = function(e, i) {
        return null != i && t.getType(i) === e
    }, t.wrap = function(e, t) {
        return void 0 === t && (t = document.createElement("div")), e.nextSibling ? e.parentNode && e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode && e.parentNode.appendChild(t), t.appendChild(e)
    }, t.getAdjacentEl = function(e, t, i) {
        void 0 === i && (i = 1);
        for (var n = (i > 0 ? "next" : "previous") + "ElementSibling", r = e[n]; r;) {
            if (r.matches(t)) return r;
            r = r[n]
        }
        return r
    }, t.isScrolledIntoView = function(e, t, i) {
        return void 0 === i && (i = 1), !!e && (i > 0 ? t.scrollTop + t.offsetHeight >= e.offsetTop + e.offsetHeight : e.offsetTop >= t.scrollTop)
    }, t.sanitise = function(e) {
        return "string" != typeof e ? e : e.replace(/&/g, "&amp;").replace(/>/g, "&rt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
    }, t.strToEl = (n = document.createElement("div"), function(e) {
        var t = e.trim();
        n.innerHTML = t;
        for (var i = n.children[0]; n.firstChild;) n.removeChild(n.firstChild);
        return i
    }), t.sortByAlpha = function(e, t) {
        var i = e.value,
            n = e.label,
            r = void 0 === n ? i : n,
            o = t.value,
            s = t.label,
            a = void 0 === s ? o : s;
        return r.localeCompare(a, [], {
            sensitivity: "base",
            ignorePunctuation: !0,
            numeric: !0
        })
    }, t.sortByScore = function(e, t) {
        var i = e.score,
            n = void 0 === i ? 0 : i,
            r = t.score;
        return n - (void 0 === r ? 0 : r)
    }, t.dispatchEvent = function(e, t, i) {
        void 0 === i && (i = null);
        var n = new CustomEvent(t, {
            detail: i,
            bubbles: !0,
            cancelable: !0
        });
        return e.dispatchEvent(n)
    }, t.existsInArray = function(e, t, i) {
        return void 0 === i && (i = "value"), e.some((function(e) {
            return "string" == typeof t ? e[i] === t.trim() : e[i] === t
        }))
    }, t.cloneObject = function(e) {
        return JSON.parse(JSON.stringify(e))
    }, t.diff = function(e, t) {
        var i = Object.keys(e).sort(),
            n = Object.keys(t).sort();
        return i.filter((function(e) {
            return n.indexOf(e) < 0
        }))
    }
}, function(e, t, i) {
    "use strict";
    (function(e, n) {
        var r, o = i(6);
        r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : n;
        var s = Object(o.a)(r);
        t.a = s
    }).call(this, i(12), i(13)(e))
}, function(e, t, i) {
    "use strict";
    i.r(t), i.d(t, "__DO_NOT_USE__ActionTypes", (function() {
        return o
    })), i.d(t, "applyMiddleware", (function() {
        return v
    })), i.d(t, "bindActionCreators", (function() {
        return h
    })), i.d(t, "combineReducers", (function() {
        return l
    })), i.d(t, "compose", (function() {
        return m
    })), i.d(t, "createStore", (function() {
        return a
    }));
    var n = i(2),
        r = function() {
            return Math.random().toString(36).substring(7).split("").join(".")
        },
        o = {
            INIT: "@@redux/INIT" + r(),
            REPLACE: "@@redux/REPLACE" + r(),
            PROBE_UNKNOWN_ACTION: function() {
                return "@@redux/PROBE_UNKNOWN_ACTION" + r()
            }
        };

    function s(e) {
        if ("object" != typeof e || null === e) return !1;
        for (var t = e; null !== Object.getPrototypeOf(t);) t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t
    }

    function a(e, t, i) {
        var r;
        if ("function" == typeof t && "function" == typeof i || "function" == typeof i && "function" == typeof arguments[3]) throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");
        if ("function" == typeof t && void 0 === i && (i = t, t = void 0), void 0 !== i) {
            if ("function" != typeof i) throw new Error("Expected the enhancer to be a function.");
            return i(a)(e, t)
        }
        if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
        var c = e,
            l = t,
            u = [],
            h = u,
            d = !1;

        function p() {
            h === u && (h = u.slice())
        }

        function f() {
            if (d) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
            return l
        }

        function m(e) {
            if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
            if (d) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            var t = !0;
            return p(), h.push(e),
                function() {
                    if (t) {
                        if (d) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
                        t = !1, p();
                        var i = h.indexOf(e);
                        h.splice(i, 1)
                    }
                }
        }

        function v(e) {
            if (!s(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
            if (void 0 === e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
            if (d) throw new Error("Reducers may not dispatch actions.");
            try {
                d = !0, l = c(l, e)
            } finally {
                d = !1
            }
            for (var t = u = h, i = 0; i < t.length; i++) {
                (0, t[i])()
            }
            return e
        }
        return v({
            type: o.INIT
        }), (r = {
            dispatch: v,
            subscribe: m,
            getState: f,
            replaceReducer: function(e) {
                if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
                c = e, v({
                    type: o.REPLACE
                })
            }
        })[n.a] = function() {
            var e, t = m;
            return (e = {
                subscribe: function(e) {
                    if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");

                    function i() {
                        e.next && e.next(f())
                    }
                    return i(), {
                        unsubscribe: t(i)
                    }
                }
            })[n.a] = function() {
                return this
            }, e
        }, r
    }

    function c(e, t) {
        var i = t && t.type;
        return "Given " + (i && 'action "' + String(i) + '"' || "an action") + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
    }

    function l(e) {
        for (var t = Object.keys(e), i = {}, n = 0; n < t.length; n++) {
            var r = t[n];
            0, "function" == typeof e[r] && (i[r] = e[r])
        }
        var s, a = Object.keys(i);
        try {
            ! function(e) {
                Object.keys(e).forEach((function(t) {
                    var i = e[t];
                    if (void 0 === i(void 0, {
                            type: o.INIT
                        })) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
                    if (void 0 === i(void 0, {
                            type: o.PROBE_UNKNOWN_ACTION()
                        })) throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + o.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')
                }))
            }(i)
        } catch (e) {
            s = e
        }
        return function(e, t) {
            if (void 0 === e && (e = {}), s) throw s;
            for (var n = !1, r = {}, o = 0; o < a.length; o++) {
                var l = a[o],
                    u = i[l],
                    h = e[l],
                    d = u(h, t);
                if (void 0 === d) {
                    var p = c(l, t);
                    throw new Error(p)
                }
                r[l] = d, n = n || d !== h
            }
            return n ? r : e
        }
    }

    function u(e, t) {
        return function() {
            return t(e.apply(this, arguments))
        }
    }

    function h(e, t) {
        if ("function" == typeof e) return u(e, t);
        if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
        var i = {};
        for (var n in e) {
            var r = e[n];
            "function" == typeof r && (i[n] = u(r, t))
        }
        return i
    }

    function d(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function p(e, t) {
        var i = Object.keys(e);
        return Object.getOwnPropertySymbols && i.push.apply(i, Object.getOwnPropertySymbols(e)), t && (i = i.filter((function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
        }))), i
    }

    function f(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {};
            t % 2 ? p(i, !0).forEach((function(t) {
                d(e, t, i[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : p(i).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
            }))
        }
        return e
    }

    function m() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
        return 0 === t.length ? function(e) {
            return e
        } : 1 === t.length ? t[0] : t.reduce((function(e, t) {
            return function() {
                return e(t.apply(void 0, arguments))
            }
        }))
    }

    function v() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
        return function(e) {
            return function() {
                var i = e.apply(void 0, arguments),
                    n = function() {
                        throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")
                    },
                    r = {
                        getState: i.getState,
                        dispatch: function() {
                            return n.apply(void 0, arguments)
                        }
                    },
                    o = t.map((function(e) {
                        return e(r)
                    }));
                return f({}, i, {
                    dispatch: n = m.apply(void 0, o)(i.dispatch)
                })
            }
        }
    }
}, function(e, t, i) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = i(3),
        o = n(i(14)),
        s = n(i(15)),
        a = n(i(16)),
        c = n(i(17)),
        l = i(1);
    t.defaultState = {
        groups: [],
        items: [],
        choices: [],
        loading: !1
    };
    var u = r.combineReducers({
        items: o.default,
        groups: s.default,
        choices: a.default,
        loading: c.default
    });
    t.default = function(e, i) {
        var n = e;
        if ("CLEAR_ALL" === i.type) n = t.defaultState;
        else if ("RESET_TO" === i.type) return l.cloneObject(i.state);
        return u(n, i)
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(1),
        r = function() {
            function e(e) {
                var t = e.element,
                    i = e.classNames;
                if (this.element = t, this.classNames = i, !(t instanceof HTMLInputElement || t instanceof HTMLSelectElement)) throw new TypeError("Invalid element passed");
                this.isDisabled = !1
            }
            return Object.defineProperty(e.prototype, "isActive", {
                get: function() {
                    return "active" === this.element.dataset.choice
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "dir", {
                get: function() {
                    return this.element.dir
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return this.element.value
                },
                set: function(e) {
                    this.element.value = e
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.conceal = function() {
                this.element.classList.add(this.classNames.input), this.element.hidden = !0, this.element.tabIndex = -1;
                var e = this.element.getAttribute("style");
                e && this.element.setAttribute("data-choice-orig-style", e), this.element.setAttribute("data-choice", "active")
            }, e.prototype.reveal = function() {
                this.element.classList.remove(this.classNames.input), this.element.hidden = !1, this.element.removeAttribute("tabindex");
                var e = this.element.getAttribute("data-choice-orig-style");
                e ? (this.element.removeAttribute("data-choice-orig-style"), this.element.setAttribute("style", e)) : this.element.removeAttribute("style"), this.element.removeAttribute("data-choice"), this.element.value = this.element.value
            }, e.prototype.enable = function() {
                this.element.removeAttribute("disabled"), this.element.disabled = !1, this.isDisabled = !1
            }, e.prototype.disable = function() {
                this.element.setAttribute("disabled", ""), this.element.disabled = !0, this.isDisabled = !0
            }, e.prototype.triggerEvent = function(e, t) {
                n.dispatchEvent(this.element, e, t)
            }, e
        }();
    t.default = r
}, function(e, t, i) {
    "use strict";

    function n(e) {
        var t, i = e.Symbol;
        return "function" == typeof i ? i.observable ? t = i.observable : (t = i("observable"), i.observable = t) : t = "@@observable", t
    }
    i.d(t, "a", (function() {
        return n
    }))
}, function(e, t, i) {
    e.exports = i(8)
}, function(e, t, i) {
    "use strict";
    var n = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
            var n = Array(e),
                r = 0;
            for (t = 0; t < i; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) n[r] = o[s];
            return n
        },
        r = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = r(i(9)),
        s = r(i(10)),
        a = r(i(11)),
        c = i(18),
        l = i(0),
        u = r(i(25)),
        h = i(26),
        d = i(27),
        p = i(28),
        f = i(29),
        m = i(1),
        v = i(4),
        _ = "-ms-scroll-limit" in document.documentElement.style && "-ms-ime-align" in document.documentElement.style,
        g = {},
        y = function() {
            function e(t, i) {
                var r = this;
                void 0 === t && (t = "[data-choice]"), void 0 === i && (i = {}), this.config = s.default.all([l.DEFAULT_CONFIG, e.defaults.options, i], {
                    arrayMerge: function(e, t) {
                        return n(t)
                    }
                });
                var o = m.diff(this.config, l.DEFAULT_CONFIG);
                o.length && console.warn("Unknown config option(s) passed", o.join(", "));
                var u = "string" == typeof t ? document.querySelector(t) : t;
                if (!(u instanceof HTMLInputElement || u instanceof HTMLSelectElement)) throw TypeError("Expected one of the following types text|select-one|select-multiple");
                if (this._isTextElement = u.type === l.TEXT_TYPE, this._isSelectOneElement = u.type === l.SELECT_ONE_TYPE, this._isSelectMultipleElement = u.type === l.SELECT_MULTIPLE_TYPE, this._isSelectElement = this._isSelectOneElement || this._isSelectMultipleElement, this.config.searchEnabled = this._isSelectMultipleElement || this.config.searchEnabled, ["auto", "always"].includes("" + this.config.renderSelectedChoices) || (this.config.renderSelectedChoices = "auto"), i.addItemFilter && "function" != typeof i.addItemFilter) {
                    var h = i.addItemFilter instanceof RegExp ? i.addItemFilter : new RegExp(i.addItemFilter);
                    this.config.addItemFilter = h.test.bind(h)
                }
                if (this._isTextElement ? this.passedElement = new c.WrappedInput({
                        element: u,
                        classNames: this.config.classNames,
                        delimiter: this.config.delimiter
                    }) : this.passedElement = new c.WrappedSelect({
                        element: u,
                        classNames: this.config.classNames,
                        template: function(e) {
                            return r._templates.option(e)
                        }
                    }), this.initialised = !1, this._store = new a.default, this._initialState = v.defaultState, this._currentState = v.defaultState, this._prevState = v.defaultState, this._currentValue = "", this._canSearch = !!this.config.searchEnabled, this._isScrollingOnIe = !1, this._highlightPosition = 0, this._wasTap = !0, this._placeholderValue = this._generatePlaceholderValue(), this._baseId = m.generateId(this.passedElement.element, "choices-"), this._direction = this.passedElement.dir, !this._direction) {
                    var d = window.getComputedStyle(this.passedElement.element).direction;
                    d !== window.getComputedStyle(document.documentElement).direction && (this._direction = d)
                }
                if (this._idNames = {
                        itemChoice: "item-choice"
                    }, this._isSelectElement && (this._presetGroups = this.passedElement.optionGroups, this._presetOptions = this.passedElement.options), this._presetChoices = this.config.choices, this._presetItems = this.config.items, this.passedElement.value && this._isTextElement) {
                    var p = this.passedElement.value.split(this.config.delimiter);
                    this._presetItems = this._presetItems.concat(p)
                }
                if (this.passedElement.options && this.passedElement.options.forEach((function(e) {
                        r._presetChoices.push({
                            value: e.value,
                            label: e.innerHTML,
                            selected: !!e.selected,
                            disabled: e.disabled || e.parentNode.disabled,
                            placeholder: "" === e.value || e.hasAttribute("placeholder"),
                            customProperties: e.dataset["custom-properties"]
                        })
                    })), this._render = this._render.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this._onKeyDown = this._onKeyDown.bind(this), this._onClick = this._onClick.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._onMouseDown = this._onMouseDown.bind(this), this._onMouseOver = this._onMouseOver.bind(this), this._onFormReset = this._onFormReset.bind(this), this._onSelectKey = this._onSelectKey.bind(this), this._onEnterKey = this._onEnterKey.bind(this), this._onEscapeKey = this._onEscapeKey.bind(this), this._onDirectionKey = this._onDirectionKey.bind(this), this._onDeleteKey = this._onDeleteKey.bind(this), this.passedElement.isActive) return this.config.silent || console.warn("Trying to initialise Choices on element already initialised", {
                    element: t
                }), void(this.initialised = !0);
                this.init()
            }
            return Object.defineProperty(e, "defaults", {
                get: function() {
                    return Object.preventExtensions({
                        get options() {
                            return g
                        },
                        get templates() {
                            return u.default
                        }
                    })
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.init = function() {
                if (!this.initialised) {
                    this._createTemplates(), this._createElements(), this._createStructure(), this._store.subscribe(this._render), this._render(), this._addEventListeners(), (!this.config.addItems || this.passedElement.element.hasAttribute("disabled")) && this.disable(), this.initialised = !0;
                    var e = this.config.callbackOnInit;
                    e && "function" == typeof e && e.call(this)
                }
            }, e.prototype.destroy = function() {
                this.initialised && (this._removeEventListeners(), this.passedElement.reveal(), this.containerOuter.unwrap(this.passedElement.element), this.clearStore(), this._isSelectElement && (this.passedElement.options = this._presetOptions), this._templates = u.default, this.initialised = !1)
            }, e.prototype.enable = function() {
                return this.passedElement.isDisabled && this.passedElement.enable(), this.containerOuter.isDisabled && (this._addEventListeners(), this.input.enable(), this.containerOuter.enable()), this
            }, e.prototype.disable = function() {
                return this.passedElement.isDisabled || this.passedElement.disable(), this.containerOuter.isDisabled || (this._removeEventListeners(), this.input.disable(), this.containerOuter.disable()), this
            }, e.prototype.highlightItem = function(e, t) {
                if (void 0 === t && (t = !0), !e || !e.id) return this;
                var i = e.id,
                    n = e.groupId,
                    r = void 0 === n ? -1 : n,
                    o = e.value,
                    s = void 0 === o ? "" : o,
                    a = e.label,
                    c = void 0 === a ? "" : a,
                    u = r >= 0 ? this._store.getGroupById(r) : null;
                return this._store.dispatch(d.highlightItem(i, !0)), t && this.passedElement.triggerEvent(l.EVENTS.highlightItem, {
                    id: i,
                    value: s,
                    label: c,
                    groupValue: u && u.value ? u.value : null
                }), this
            }, e.prototype.unhighlightItem = function(e) {
                if (!e || !e.id) return this;
                var t = e.id,
                    i = e.groupId,
                    n = void 0 === i ? -1 : i,
                    r = e.value,
                    o = void 0 === r ? "" : r,
                    s = e.label,
                    a = void 0 === s ? "" : s,
                    c = n >= 0 ? this._store.getGroupById(n) : null;
                return this._store.dispatch(d.highlightItem(t, !1)), this.passedElement.triggerEvent(l.EVENTS.highlightItem, {
                    id: t,
                    value: o,
                    label: a,
                    groupValue: c && c.value ? c.value : null
                }), this
            }, e.prototype.highlightAll = function() {
                var e = this;
                return this._store.items.forEach((function(t) {
                    return e.highlightItem(t)
                })), this
            }, e.prototype.unhighlightAll = function() {
                var e = this;
                return this._store.items.forEach((function(t) {
                    return e.unhighlightItem(t)
                })), this
            }, e.prototype.removeActiveItemsByValue = function(e) {
                var t = this;
                return this._store.activeItems.filter((function(t) {
                    return t.value === e
                })).forEach((function(e) {
                    return t._removeItem(e)
                })), this
            }, e.prototype.removeActiveItems = function(e) {
                var t = this;
                return this._store.activeItems.filter((function(t) {
                    return t.id !== e
                })).forEach((function(e) {
                    return t._removeItem(e)
                })), this
            }, e.prototype.removeHighlightedItems = function(e) {
                var t = this;
                return void 0 === e && (e = !1), this._store.highlightedActiveItems.forEach((function(i) {
                    t._removeItem(i), e && t._triggerChange(i.value)
                })), this
            }, e.prototype.showDropdown = function(e) {
                var t = this;
                return this.dropdown.isActive ? this : (requestAnimationFrame((function() {
                    t.dropdown.show(), t.containerOuter.open(t.dropdown.distanceFromTopWindow), !e && t._canSearch && t.input.focus(), t.passedElement.triggerEvent(l.EVENTS.showDropdown, {})
                })), this)
            }, e.prototype.hideDropdown = function(e) {
                var t = this;
                return this.dropdown.isActive ? (requestAnimationFrame((function() {
                    t.dropdown.hide(), t.containerOuter.close(), !e && t._canSearch && (t.input.removeActiveDescendant(), t.input.blur()), t.passedElement.triggerEvent(l.EVENTS.hideDropdown, {})
                })), this) : this
            }, e.prototype.getValue = function(e) {
                void 0 === e && (e = !1);
                var t = this._store.activeItems.reduce((function(t, i) {
                    var n = e ? i.value : i;
                    return t.push(n), t
                }), []);
                return this._isSelectOneElement ? t[0] : t
            }, e.prototype.setValue = function(e) {
                var t = this;
                return this.initialised ? (e.forEach((function(e) {
                    return t._setChoiceOrItem(e)
                })), this) : this
            }, e.prototype.setChoiceByValue = function(e) {
                var t = this;
                return !this.initialised || this._isTextElement ? this : ((Array.isArray(e) ? e : [e]).forEach((function(e) {
                    return t._findAndSelectChoiceByValue(e)
                })), this)
            }, e.prototype.setChoices = function(e, t, i, n) {
                var r = this;
                if (void 0 === e && (e = []), void 0 === t && (t = "value"), void 0 === i && (i = "label"), void 0 === n && (n = !1), !this.initialised) throw new ReferenceError("setChoices was called on a non-initialized instance of Choices");
                if (!this._isSelectElement) throw new TypeError("setChoices can't be used with INPUT based Choices");
                if ("string" != typeof t || !t) throw new TypeError("value parameter must be a name of 'value' field in passed objects");
                if (n && this.clearChoices(), "function" == typeof e) {
                    var o = e(this);
                    if ("function" == typeof Promise && o instanceof Promise) return new Promise((function(e) {
                        return requestAnimationFrame(e)
                    })).then((function() {
                        return r._handleLoadingState(!0)
                    })).then((function() {
                        return o
                    })).then((function(e) {
                        return r.setChoices(e, t, i, n)
                    })).catch((function(e) {
                        r.config.silent || console.error(e)
                    })).then((function() {
                        return r._handleLoadingState(!1)
                    })).then((function() {
                        return r
                    }));
                    if (!Array.isArray(o)) throw new TypeError(".setChoices first argument function must return either array of choices or Promise, got: " + typeof o);
                    return this.setChoices(o, t, i, !1)
                }
                if (!Array.isArray(e)) throw new TypeError(".setChoices must be called either with array of choices with a function resulting into Promise of array of choices");
                return this.containerOuter.removeLoadingState(), this._startLoading(), e.forEach((function(e) {
                    if (e.choices) r._addGroup({
                        id: e.id ? parseInt("" + e.id, 10) : null,
                        group: e,
                        valueKey: t,
                        labelKey: i
                    });
                    else {
                        var n = e;
                        r._addChoice({
                            value: n[t],
                            label: n[i],
                            isSelected: !!n.selected,
                            isDisabled: !!n.disabled,
                            placeholder: !!n.placeholder,
                            customProperties: n.customProperties
                        })
                    }
                })), this._stopLoading(), this
            }, e.prototype.clearChoices = function() {
                return this._store.dispatch(h.clearChoices()), this
            }, e.prototype.clearStore = function() {
                return this._store.dispatch(f.clearAll()), this
            }, e.prototype.clearInput = function() {
                var e = !this._isSelectOneElement;
                return this.input.clear(e), !this._isTextElement && this._canSearch && (this._isSearching = !1, this._store.dispatch(h.activateChoices(!0))), this
            }, e.prototype._render = function() {
                if (!this._store.isLoading()) {
                    this._currentState = this._store.state;
                    var e = this._currentState.choices !== this._prevState.choices || this._currentState.groups !== this._prevState.groups || this._currentState.items !== this._prevState.items,
                        t = this._isSelectElement,
                        i = this._currentState.items !== this._prevState.items;
                    e && (t && this._renderChoices(), i && this._renderItems(), this._prevState = this._currentState)
                }
            }, e.prototype._renderChoices = function() {
                var e = this,
                    t = this._store,
                    i = t.activeGroups,
                    n = t.activeChoices,
                    r = document.createDocumentFragment();
                if (this.choiceList.clear(), this.config.resetScrollPosition && requestAnimationFrame((function() {
                        return e.choiceList.scrollToTop()
                    })), i.length >= 1 && !this._isSearching) {
                    var o = n.filter((function(e) {
                        return !0 === e.placeholder && -1 === e.groupId
                    }));
                    o.length >= 1 && (r = this._createChoicesFragment(o, r)), r = this._createGroupsFragment(i, n, r)
                } else n.length >= 1 && (r = this._createChoicesFragment(n, r));
                if (r.childNodes && r.childNodes.length > 0) {
                    var s = this._store.activeItems,
                        a = this._canAddItem(s, this.input.value);
                    if (a.response) this.choiceList.append(r), this._highlightChoice();
                    else {
                        var c = this._getTemplate("notice", a.notice);
                        this.choiceList.append(c)
                    }
                } else {
                    var l = void 0;
                    c = void 0;
                    this._isSearching ? (c = "function" == typeof this.config.noResultsText ? this.config.noResultsText() : this.config.noResultsText, l = this._getTemplate("notice", c, "no-results")) : (c = "function" == typeof this.config.noChoicesText ? this.config.noChoicesText() : this.config.noChoicesText, l = this._getTemplate("notice", c, "no-choices")), this.choiceList.append(l)
                }
            }, e.prototype._renderItems = function() {
                var e = this._store.activeItems || [];
                this.itemList.clear();
                var t = this._createItemsFragment(e);
                t.childNodes && this.itemList.append(t)
            }, e.prototype._createGroupsFragment = function(e, t, i) {
                var n = this;
                void 0 === i && (i = document.createDocumentFragment());
                return this.config.shouldSort && e.sort(this.config.sorter), e.forEach((function(e) {
                    var r = function(e) {
                        return t.filter((function(t) {
                            return n._isSelectOneElement ? t.groupId === e.id : t.groupId === e.id && ("always" === n.config.renderSelectedChoices || !t.selected)
                        }))
                    }(e);
                    if (r.length >= 1) {
                        var o = n._getTemplate("choiceGroup", e);
                        i.appendChild(o), n._createChoicesFragment(r, i, !0)
                    }
                })), i
            }, e.prototype._createChoicesFragment = function(e, t, i) {
                var r = this;
                void 0 === t && (t = document.createDocumentFragment()), void 0 === i && (i = !1);
                var o = this.config,
                    s = o.renderSelectedChoices,
                    a = o.searchResultLimit,
                    c = o.renderChoiceLimit,
                    l = this._isSearching ? m.sortByScore : this.config.sorter,
                    u = function(e) {
                        if ("auto" !== s || (r._isSelectOneElement || !e.selected)) {
                            var i = r._getTemplate("choice", e, r.config.itemSelectText);
                            t.appendChild(i)
                        }
                    },
                    h = e;
                "auto" !== s || this._isSelectOneElement || (h = e.filter((function(e) {
                    return !e.selected
                })));
                var d = h.reduce((function(e, t) {
                        return t.placeholder ? e.placeholderChoices.push(t) : e.normalChoices.push(t), e
                    }), {
                        placeholderChoices: [],
                        normalChoices: []
                    }),
                    p = d.placeholderChoices,
                    f = d.normalChoices;
                (this.config.shouldSort || this._isSearching) && f.sort(l);
                var v = h.length,
                    _ = this._isSelectOneElement ? n(p, f) : f;
                this._isSearching ? v = a : c && c > 0 && !i && (v = c);
                for (var g = 0; g < v; g += 1) _[g] && u(_[g]);
                return t
            }, e.prototype._createItemsFragment = function(e, t) {
                var i = this;
                void 0 === t && (t = document.createDocumentFragment());
                var n = this.config,
                    r = n.shouldSortItems,
                    o = n.sorter,
                    s = n.removeItemButton;
                r && !this._isSelectOneElement && e.sort(o), this._isTextElement ? this.passedElement.value = e.map((function(e) {
                    return e.value
                })).join(this.config.delimiter) : this.passedElement.options = e;
                return e.forEach((function(e) {
                    var n = i._getTemplate("item", e, s);
                    t.appendChild(n)
                })), t
            }, e.prototype._triggerChange = function(e) {
                null != e && this.passedElement.triggerEvent(l.EVENTS.change, {
                    value: e
                })
            }, e.prototype._selectPlaceholderChoice = function(e) {
                this._addItem({
                    value: e.value,
                    label: e.label,
                    choiceId: e.id,
                    groupId: e.groupId,
                    placeholder: e.placeholder
                }), this._triggerChange(e.value)
            }, e.prototype._handleButtonAction = function(e, t) {
                if (e && t && this.config.removeItems && this.config.removeItemButton) {
                    var i = t.parentNode && t.parentNode.dataset.id,
                        n = i && e.find((function(e) {
                            return e.id === parseInt(i, 10)
                        }));
                    n && (this._removeItem(n), this._triggerChange(n.value), this._isSelectOneElement && this._store.placeholderChoice && this._selectPlaceholderChoice(this._store.placeholderChoice))
                }
            }, e.prototype._handleItemAction = function(e, t, i) {
                var n = this;
                if (void 0 === i && (i = !1), e && t && this.config.removeItems && !this._isSelectOneElement) {
                    var r = t.dataset.id;
                    e.forEach((function(e) {
                        e.id !== parseInt("" + r, 10) || e.highlighted ? !i && e.highlighted && n.unhighlightItem(e) : n.highlightItem(e)
                    })), this.input.focus()
                }
            }, e.prototype._handleChoiceAction = function(e, t) {
                if (e && t) {
                    var i = t.dataset.id,
                        n = i && this._store.getChoiceById(i);
                    if (n) {
                        var r = e[0] && e[0].keyCode ? e[0].keyCode : void 0,
                            o = this.dropdown.isActive;
                        if (n.keyCode = r, this.passedElement.triggerEvent(l.EVENTS.choice, {
                                choice: n
                            }), !n.selected && !n.disabled) this._canAddItem(e, n.value).response && (this._addItem({
                            value: n.value,
                            label: n.label,
                            choiceId: n.id,
                            groupId: n.groupId,
                            customProperties: n.customProperties,
                            placeholder: n.placeholder,
                            keyCode: n.keyCode
                        }), this._triggerChange(n.value));
                        this.clearInput(), o && this._isSelectOneElement && (this.hideDropdown(!0), this.containerOuter.focus())
                    }
                }
            }, e.prototype._handleBackspace = function(e) {
                if (this.config.removeItems && e) {
                    var t = e[e.length - 1],
                        i = e.some((function(e) {
                            return e.highlighted
                        }));
                    this.config.editItems && !i && t ? (this.input.value = t.value, this.input.setWidth(), this._removeItem(t), this._triggerChange(t.value)) : (i || this.highlightItem(t, !1), this.removeHighlightedItems(!0))
                }
            }, e.prototype._startLoading = function() {
                this._store.dispatch(f.setIsLoading(!0))
            }, e.prototype._stopLoading = function() {
                this._store.dispatch(f.setIsLoading(!1))
            }, e.prototype._handleLoadingState = function(e) {
                void 0 === e && (e = !0);
                var t = this.itemList.getChild("." + this.config.classNames.placeholder);
                e ? (this.disable(), this.containerOuter.addLoadingState(), this._isSelectOneElement ? t ? t.innerHTML = this.config.loadingText : (t = this._getTemplate("placeholder", this.config.loadingText)) && this.itemList.append(t) : this.input.placeholder = this.config.loadingText) : (this.enable(), this.containerOuter.removeLoadingState(), this._isSelectOneElement ? t && (t.innerHTML = this._placeholderValue || "") : this.input.placeholder = this._placeholderValue || "")
            }, e.prototype._handleSearch = function(e) {
                if (e && this.input.isFocussed) {
                    var t = this._store.choices,
                        i = this.config,
                        n = i.searchFloor,
                        r = i.searchChoices,
                        o = t.some((function(e) {
                            return !e.active
                        }));
                    if (e && e.length >= n) {
                        var s = r ? this._searchChoices(e) : 0;
                        this.passedElement.triggerEvent(l.EVENTS.search, {
                            value: e,
                            resultCount: s
                        })
                    } else o && (this._isSearching = !1, this._store.dispatch(h.activateChoices(!0)))
                }
            }, e.prototype._canAddItem = function(e, t) {
                var i = !0,
                    n = "function" == typeof this.config.addItemText ? this.config.addItemText(t) : this.config.addItemText;
                if (!this._isSelectOneElement) {
                    var r = m.existsInArray(e, t);
                    this.config.maxItemCount > 0 && this.config.maxItemCount <= e.length && (i = !1, n = "function" == typeof this.config.maxItemText ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText), !this.config.duplicateItemsAllowed && r && i && (i = !1, n = "function" == typeof this.config.uniqueItemText ? this.config.uniqueItemText(t) : this.config.uniqueItemText), this._isTextElement && this.config.addItems && i && "function" == typeof this.config.addItemFilter && !this.config.addItemFilter(t) && (i = !1, n = "function" == typeof this.config.customAddItemText ? this.config.customAddItemText(t) : this.config.customAddItemText)
                }
                return {
                    response: i,
                    notice: n
                }
            }, e.prototype._searchChoices = function(e) {
                var t = "string" == typeof e ? e.trim() : e,
                    i = "string" == typeof this._currentValue ? this._currentValue.trim() : this._currentValue;
                if (t.length < 1 && t === i + " ") return 0;
                var r = this._store.searchableChoices,
                    s = t,
                    a = n(this.config.searchFields),
                    c = Object.assign(this.config.fuseOptions, {
                        keys: a,
                        includeMatches: !0
                    }),
                    l = new o.default(r, c).search(s);
                return this._currentValue = t, this._highlightPosition = 0, this._isSearching = !0, this._store.dispatch(h.filterChoices(l)), l.length
            }, e.prototype._addEventListeners = function() {
                var e = document.documentElement;
                e.addEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.addEventListener("keydown", this._onKeyDown, !0), this.containerOuter.element.addEventListener("mousedown", this._onMouseDown, !0), e.addEventListener("click", this._onClick, {
                    passive: !0
                }), e.addEventListener("touchmove", this._onTouchMove, {
                    passive: !0
                }), this.dropdown.element.addEventListener("mouseover", this._onMouseOver, {
                    passive: !0
                }), this._isSelectOneElement && (this.containerOuter.element.addEventListener("focus", this._onFocus, {
                    passive: !0
                }), this.containerOuter.element.addEventListener("blur", this._onBlur, {
                    passive: !0
                })), this.input.element.addEventListener("keyup", this._onKeyUp, {
                    passive: !0
                }), this.input.element.addEventListener("focus", this._onFocus, {
                    passive: !0
                }), this.input.element.addEventListener("blur", this._onBlur, {
                    passive: !0
                }), this.input.element.form && this.input.element.form.addEventListener("reset", this._onFormReset, {
                    passive: !0
                }), this.input.addEventListeners()
            }, e.prototype._removeEventListeners = function() {
                var e = document.documentElement;
                e.removeEventListener("touchend", this._onTouchEnd, !0), this.containerOuter.element.removeEventListener("keydown", this._onKeyDown, !0), this.containerOuter.element.removeEventListener("mousedown", this._onMouseDown, !0), e.removeEventListener("click", this._onClick), e.removeEventListener("touchmove", this._onTouchMove), this.dropdown.element.removeEventListener("mouseover", this._onMouseOver), this._isSelectOneElement && (this.containerOuter.element.removeEventListener("focus", this._onFocus), this.containerOuter.element.removeEventListener("blur", this._onBlur)), this.input.element.removeEventListener("keyup", this._onKeyUp), this.input.element.removeEventListener("focus", this._onFocus), this.input.element.removeEventListener("blur", this._onBlur), this.input.element.form && this.input.element.form.removeEventListener("reset", this._onFormReset), this.input.removeEventListeners()
            }, e.prototype._onKeyDown = function(e) {
                var t = e.keyCode,
                    i = this._store.activeItems,
                    n = this.input.isFocussed,
                    r = this.dropdown.isActive,
                    o = this.itemList.hasChildren(),
                    s = String.fromCharCode(t),
                    a = /[a-zA-Z0-9-_ ]/.test(s),
                    c = l.KEY_CODES.BACK_KEY,
                    u = l.KEY_CODES.DELETE_KEY,
                    h = l.KEY_CODES.ENTER_KEY,
                    d = l.KEY_CODES.A_KEY,
                    p = l.KEY_CODES.ESC_KEY,
                    f = l.KEY_CODES.UP_KEY,
                    m = l.KEY_CODES.DOWN_KEY,
                    v = l.KEY_CODES.PAGE_UP_KEY,
                    _ = l.KEY_CODES.PAGE_DOWN_KEY;
                switch (this._isTextElement || r || !a || (this.showDropdown(), this.input.isFocussed || (this.input.value += s.toLowerCase())), t) {
                    case d:
                        return this._onSelectKey(e, o);
                    case h:
                        return this._onEnterKey(e, i, r);
                    case p:
                        return this._onEscapeKey(r);
                    case f:
                    case v:
                    case m:
                    case _:
                        return this._onDirectionKey(e, r);
                    case u:
                    case c:
                        return this._onDeleteKey(e, i, n)
                }
            }, e.prototype._onKeyUp = function(e) {
                var t = e.target,
                    i = e.keyCode,
                    n = this.input.value,
                    r = this._store.activeItems,
                    o = this._canAddItem(r, n),
                    s = l.KEY_CODES.BACK_KEY,
                    a = l.KEY_CODES.DELETE_KEY;
                if (this._isTextElement) {
                    if (o.notice && n) {
                        var c = this._getTemplate("notice", o.notice);
                        this.dropdown.element.innerHTML = c.outerHTML, this.showDropdown(!0)
                    } else this.hideDropdown(!0)
                } else {
                    var u = (i === s || i === a) && t && !t.value,
                        d = !this._isTextElement && this._isSearching,
                        p = this._canSearch && o.response;
                    u && d ? (this._isSearching = !1, this._store.dispatch(h.activateChoices(!0))) : p && this._handleSearch(this.input.value)
                }
                this._canSearch = this.config.searchEnabled
            }, e.prototype._onSelectKey = function(e, t) {
                var i = e.ctrlKey,
                    n = e.metaKey;
                (i || n) && t && (this._canSearch = !1, this.config.removeItems && !this.input.value && this.input.element === document.activeElement && this.highlightAll())
            }, e.prototype._onEnterKey = function(e, t, i) {
                var n = e.target,
                    r = l.KEY_CODES.ENTER_KEY,
                    o = n && n.hasAttribute("data-button");
                if (this._isTextElement && n && n.value) {
                    var s = this.input.value;
                    this._canAddItem(t, s).response && (this.hideDropdown(!0), this._addItem({
                        value: s
                    }), this._triggerChange(s), this.clearInput())
                }
                if (o && (this._handleButtonAction(t, n), e.preventDefault()), i) {
                    var a = this.dropdown.getChild("." + this.config.classNames.highlightedState);
                    a && (t[0] && (t[0].keyCode = r), this._handleChoiceAction(t, a)), e.preventDefault()
                } else this._isSelectOneElement && (this.showDropdown(), e.preventDefault())
            }, e.prototype._onEscapeKey = function(e) {
                e && (this.hideDropdown(!0), this.containerOuter.focus())
            }, e.prototype._onDirectionKey = function(e, t) {
                var i = e.keyCode,
                    n = e.metaKey,
                    r = l.KEY_CODES.DOWN_KEY,
                    o = l.KEY_CODES.PAGE_UP_KEY,
                    s = l.KEY_CODES.PAGE_DOWN_KEY;
                if (t || this._isSelectOneElement) {
                    this.showDropdown(), this._canSearch = !1;
                    var a = i === r || i === s ? 1 : -1,
                        c = void 0;
                    if (n || i === s || i === o) c = a > 0 ? this.dropdown.element.querySelector("[data-choice-selectable]:last-of-type") : this.dropdown.element.querySelector("[data-choice-selectable]");
                    else {
                        var u = this.dropdown.element.querySelector("." + this.config.classNames.highlightedState);
                        c = u ? m.getAdjacentEl(u, "[data-choice-selectable]", a) : this.dropdown.element.querySelector("[data-choice-selectable]")
                    }
                    c && (m.isScrolledIntoView(c, this.choiceList.element, a) || this.choiceList.scrollToChildElement(c, a), this._highlightChoice(c)), e.preventDefault()
                }
            }, e.prototype._onDeleteKey = function(e, t, i) {
                var n = e.target;
                this._isSelectOneElement || n.value || !i || (this._handleBackspace(t), e.preventDefault())
            }, e.prototype._onTouchMove = function() {
                this._wasTap && (this._wasTap = !1)
            }, e.prototype._onTouchEnd = function(e) {
                var t = (e || e.touches[0]).target;
                this._wasTap && this.containerOuter.element.contains(t) && ((t === this.containerOuter.element || t === this.containerInner.element) && (this._isTextElement ? this.input.focus() : this._isSelectMultipleElement && this.showDropdown()), e.stopPropagation());
                this._wasTap = !0
            }, e.prototype._onMouseDown = function(e) {
                var t = e.target;
                if (t instanceof HTMLElement) {
                    if (_ && this.choiceList.element.contains(t)) {
                        var i = this.choiceList.element.firstElementChild,
                            n = "ltr" === this._direction ? e.offsetX >= i.offsetWidth : e.offsetX < i.offsetLeft;
                        this._isScrollingOnIe = n
                    }
                    if (t !== this.input.element) {
                        var r = t.closest("[data-button],[data-item],[data-choice]");
                        if (r instanceof HTMLElement) {
                            var o = e.shiftKey,
                                s = this._store.activeItems,
                                a = r.dataset;
                            "button" in a ? this._handleButtonAction(s, r) : "item" in a ? this._handleItemAction(s, r, o) : "choice" in a && this._handleChoiceAction(s, r)
                        }
                        e.preventDefault()
                    }
                }
            }, e.prototype._onMouseOver = function(e) {
                var t = e.target;
                t instanceof HTMLElement && "choice" in t.dataset && this._highlightChoice(t)
            }, e.prototype._onClick = function(e) {
                var t = e.target;
                this.containerOuter.element.contains(t) ? this.dropdown.isActive || this.containerOuter.isDisabled ? this._isSelectOneElement && t !== this.input.element && !this.dropdown.element.contains(t) && this.hideDropdown() : this._isTextElement ? document.activeElement !== this.input.element && this.input.focus() : (this.showDropdown(), this.containerOuter.focus()) : (this._store.highlightedActiveItems.length > 0 && this.unhighlightAll(), this.containerOuter.removeFocusState(), this.hideDropdown(!0))
            }, e.prototype._onFocus = function(e) {
                var t, i = this,
                    n = e.target;
                n && this.containerOuter.element.contains(n) && ((t = {})[l.TEXT_TYPE] = function() {
                    n === i.input.element && i.containerOuter.addFocusState()
                }, t[l.SELECT_ONE_TYPE] = function() {
                    i.containerOuter.addFocusState(), n === i.input.element && i.showDropdown(!0)
                }, t[l.SELECT_MULTIPLE_TYPE] = function() {
                    n === i.input.element && (i.showDropdown(!0), i.containerOuter.addFocusState())
                }, t)[this.passedElement.element.type]()
            }, e.prototype._onBlur = function(e) {
                var t, i = this,
                    n = e.target;
                if (n && this.containerOuter.element.contains(n) && !this._isScrollingOnIe) {
                    var r = this._store.activeItems.some((function(e) {
                        return e.highlighted
                    }));
                    ((t = {})[l.TEXT_TYPE] = function() {
                        n === i.input.element && (i.containerOuter.removeFocusState(), r && i.unhighlightAll(), i.hideDropdown(!0))
                    }, t[l.SELECT_ONE_TYPE] = function() {
                        i.containerOuter.removeFocusState(), (n === i.input.element || n === i.containerOuter.element && !i._canSearch) && i.hideDropdown(!0)
                    }, t[l.SELECT_MULTIPLE_TYPE] = function() {
                        n === i.input.element && (i.containerOuter.removeFocusState(), i.hideDropdown(!0), r && i.unhighlightAll())
                    }, t)[this.passedElement.element.type]()
                } else this._isScrollingOnIe = !1, this.input.element.focus()
            }, e.prototype._onFormReset = function() {
                this._store.dispatch(f.resetTo(this._initialState))
            }, e.prototype._highlightChoice = function(e) {
                var t = this;
                void 0 === e && (e = null);
                var i = Array.from(this.dropdown.element.querySelectorAll("[data-choice-selectable]"));
                if (i.length) {
                    var n = e;
                    Array.from(this.dropdown.element.querySelectorAll("." + this.config.classNames.highlightedState)).forEach((function(e) {
                        e.classList.remove(t.config.classNames.highlightedState), e.setAttribute("aria-selected", "false")
                    })), n ? this._highlightPosition = i.indexOf(n) : (n = i.length > this._highlightPosition ? i[this._highlightPosition] : i[i.length - 1]) || (n = i[0]), n.classList.add(this.config.classNames.highlightedState), n.setAttribute("aria-selected", "true"), this.passedElement.triggerEvent(l.EVENTS.highlightChoice, {
                        el: n
                    }), this.dropdown.isActive && (this.input.setActiveDescendant(n.id), this.containerOuter.setActiveDescendant(n.id))
                }
            }, e.prototype._addItem = function(e) {
                var t = e.value,
                    i = e.label,
                    n = void 0 === i ? null : i,
                    r = e.choiceId,
                    o = void 0 === r ? -1 : r,
                    s = e.groupId,
                    a = void 0 === s ? -1 : s,
                    c = e.customProperties,
                    u = void 0 === c ? {} : c,
                    h = e.placeholder,
                    p = void 0 !== h && h,
                    f = e.keyCode,
                    m = void 0 === f ? -1 : f,
                    v = "string" == typeof t ? t.trim() : t,
                    _ = this._store.items,
                    g = n || v,
                    y = o || -1,
                    b = a >= 0 ? this._store.getGroupById(a) : null,
                    E = _ ? _.length + 1 : 1;
                this.config.prependValue && (v = this.config.prependValue + v.toString()), this.config.appendValue && (v += this.config.appendValue.toString()), this._store.dispatch(d.addItem({
                    value: v,
                    label: g,
                    id: E,
                    choiceId: y,
                    groupId: a,
                    customProperties: u,
                    placeholder: p,
                    keyCode: m
                })), this._isSelectOneElement && this.removeActiveItems(E), this.passedElement.triggerEvent(l.EVENTS.addItem, {
                    id: E,
                    value: v,
                    label: g,
                    customProperties: u,
                    groupValue: b && b.value ? b.value : null,
                    keyCode: m
                })
            }, e.prototype._removeItem = function(e) {
                var t = e.id,
                    i = e.value,
                    n = e.label,
                    r = e.customProperties,
                    o = e.choiceId,
                    s = e.groupId,
                    a = s && s >= 0 ? this._store.getGroupById(s) : null;
                t && o && (this._store.dispatch(d.removeItem(t, o)), this.passedElement.triggerEvent(l.EVENTS.removeItem, {
                    id: t,
                    value: i,
                    label: n,
                    customProperties: r,
                    groupValue: a && a.value ? a.value : null
                }))
            }, e.prototype._addChoice = function(e) {
                var t = e.value,
                    i = e.label,
                    n = void 0 === i ? null : i,
                    r = e.isSelected,
                    o = void 0 !== r && r,
                    s = e.isDisabled,
                    a = void 0 !== s && s,
                    c = e.groupId,
                    l = void 0 === c ? -1 : c,
                    u = e.customProperties,
                    d = void 0 === u ? {} : u,
                    p = e.placeholder,
                    f = void 0 !== p && p,
                    m = e.keyCode,
                    v = void 0 === m ? -1 : m;
                if (null != t) {
                    var _ = this._store.choices,
                        g = n || t,
                        y = _ ? _.length + 1 : 1,
                        b = this._baseId + "-" + this._idNames.itemChoice + "-" + y;
                    this._store.dispatch(h.addChoice({
                        id: y,
                        groupId: l,
                        elementId: b,
                        value: t,
                        label: g,
                        disabled: a,
                        customProperties: d,
                        placeholder: f,
                        keyCode: v
                    })), o && this._addItem({
                        value: t,
                        label: g,
                        choiceId: y,
                        customProperties: d,
                        placeholder: f,
                        keyCode: v
                    })
                }
            }, e.prototype._addGroup = function(e) {
                var t = this,
                    i = e.group,
                    n = e.id,
                    r = e.valueKey,
                    o = void 0 === r ? "value" : r,
                    s = e.labelKey,
                    a = void 0 === s ? "label" : s,
                    c = m.isType("Object", i) ? i.choices : Array.from(i.getElementsByTagName("OPTION")),
                    l = n || Math.floor((new Date).valueOf() * Math.random()),
                    u = !!i.disabled && i.disabled;
                if (c) {
                    this._store.dispatch(p.addGroup({
                        value: i.label,
                        id: l,
                        active: !0,
                        disabled: u
                    }));
                    c.forEach((function(e) {
                        var i = e.disabled || e.parentNode && e.parentNode.disabled;
                        t._addChoice({
                            value: e[o],
                            label: m.isType("Object", e) ? e[a] : e.innerHTML,
                            isSelected: e.selected,
                            isDisabled: i,
                            groupId: l,
                            customProperties: e.customProperties,
                            placeholder: e.placeholder
                        })
                    }))
                } else this._store.dispatch(p.addGroup({
                    value: i.label,
                    id: i.id,
                    active: !1,
                    disabled: i.disabled
                }))
            }, e.prototype._getTemplate = function(e) {
                for (var t, i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
                var o = this.config.classNames;
                return (t = this._templates[e]).call.apply(t, n([this, o], i))
            }, e.prototype._createTemplates = function() {
                var e = this.config.callbackOnCreateTemplates,
                    t = {};
                e && "function" == typeof e && (t = e.call(this, m.strToEl)), this._templates = s.default(u.default, t)
            }, e.prototype._createElements = function() {
                this.containerOuter = new c.Container({
                    element: this._getTemplate("containerOuter", this._direction, this._isSelectElement, this._isSelectOneElement, this.config.searchEnabled, this.passedElement.element.type),
                    classNames: this.config.classNames,
                    type: this.passedElement.element.type,
                    position: this.config.position
                }), this.containerInner = new c.Container({
                    element: this._getTemplate("containerInner"),
                    classNames: this.config.classNames,
                    type: this.passedElement.element.type,
                    position: this.config.position
                }), this.input = new c.Input({
                    element: this._getTemplate("input", this._placeholderValue),
                    classNames: this.config.classNames,
                    type: this.passedElement.element.type,
                    preventPaste: !this.config.paste
                }), this.choiceList = new c.List({
                    element: this._getTemplate("choiceList", this._isSelectOneElement)
                }), this.itemList = new c.List({
                    element: this._getTemplate("itemList", this._isSelectOneElement)
                }), this.dropdown = new c.Dropdown({
                    element: this._getTemplate("dropdown"),
                    classNames: this.config.classNames,
                    type: this.passedElement.element.type
                })
            }, e.prototype._createStructure = function() {
                this.passedElement.conceal(), this.containerInner.wrap(this.passedElement.element), this.containerOuter.wrap(this.containerInner.element), this._isSelectOneElement ? this.input.placeholder = this.config.searchPlaceholderValue || "" : this._placeholderValue && (this.input.placeholder = this._placeholderValue, this.input.setWidth()), this.containerOuter.element.appendChild(this.containerInner.element), this.containerOuter.element.appendChild(this.dropdown.element), this.containerInner.element.appendChild(this.itemList.element), this._isTextElement || this.dropdown.element.appendChild(this.choiceList.element), this._isSelectOneElement ? this.config.searchEnabled && this.dropdown.element.insertBefore(this.input.element, this.dropdown.element.firstChild) : this.containerInner.element.appendChild(this.input.element), this._isSelectElement && (this._highlightPosition = 0, this._isSearching = !1, this._startLoading(), this._presetGroups.length ? this._addPredefinedGroups(this._presetGroups) : this._addPredefinedChoices(this._presetChoices), this._stopLoading()), this._isTextElement && this._addPredefinedItems(this._presetItems)
            }, e.prototype._addPredefinedGroups = function(e) {
                var t = this,
                    i = this.passedElement.placeholderOption;
                i && i.parentNode && "SELECT" === i.parentNode.tagName && this._addChoice({
                    value: i.value,
                    label: i.innerHTML,
                    isSelected: i.selected,
                    isDisabled: i.disabled,
                    placeholder: !0
                }), e.forEach((function(e) {
                    return t._addGroup({
                        group: e,
                        id: e.id || null
                    })
                }))
            }, e.prototype._addPredefinedChoices = function(e) {
                var t = this;
                this.config.shouldSort && e.sort(this.config.sorter);
                var i = e.some((function(e) {
                        return e.selected
                    })),
                    n = e.findIndex((function(e) {
                        return void 0 === e.disabled || !e.disabled
                    }));
                e.forEach((function(e, r) {
                    var o = e.value,
                        s = void 0 === o ? "" : o,
                        a = e.label,
                        c = e.customProperties,
                        l = e.placeholder;
                    if (t._isSelectElement)
                        if (e.choices) t._addGroup({
                            group: e,
                            id: e.id || null
                        });
                        else {
                            var u = !!(t._isSelectOneElement && !i && r === n) || e.selected,
                                h = e.disabled;
                            t._addChoice({
                                value: s,
                                label: a,
                                isSelected: !!u,
                                isDisabled: !!h,
                                placeholder: !!l,
                                customProperties: c
                            })
                        }
                    else t._addChoice({
                        value: s,
                        label: a,
                        isSelected: !!e.selected,
                        isDisabled: !!e.disabled,
                        placeholder: !!e.placeholder,
                        customProperties: c
                    })
                }))
            }, e.prototype._addPredefinedItems = function(e) {
                var t = this;
                e.forEach((function(e) {
                    "object" == typeof e && e.value && t._addItem({
                        value: e.value,
                        label: e.label,
                        choiceId: e.id,
                        customProperties: e.customProperties,
                        placeholder: e.placeholder
                    }), "string" == typeof e && t._addItem({
                        value: e
                    })
                }))
            }, e.prototype._setChoiceOrItem = function(e) {
                var t = this;
                ({
                    object: function() {
                        e.value && (t._isTextElement ? t._addItem({
                            value: e.value,
                            label: e.label,
                            choiceId: e.id,
                            customProperties: e.customProperties,
                            placeholder: e.placeholder
                        }) : t._addChoice({
                            value: e.value,
                            label: e.label,
                            isSelected: !0,
                            isDisabled: !1,
                            customProperties: e.customProperties,
                            placeholder: e.placeholder
                        }))
                    },
                    string: function() {
                        t._isTextElement ? t._addItem({
                            value: e
                        }) : t._addChoice({
                            value: e,
                            label: e,
                            isSelected: !0,
                            isDisabled: !1
                        })
                    }
                })[m.getType(e).toLowerCase()]()
            }, e.prototype._findAndSelectChoiceByValue = function(e) {
                var t = this,
                    i = this._store.choices.find((function(i) {
                        return t.config.valueComparer(i.value, e)
                    }));
                i && !i.selected && this._addItem({
                    value: i.value,
                    label: i.label,
                    choiceId: i.id,
                    groupId: i.groupId,
                    customProperties: i.customProperties,
                    placeholder: i.placeholder,
                    keyCode: i.keyCode
                })
            }, e.prototype._generatePlaceholderValue = function() {
                if (this._isSelectElement) {
                    var e = this.passedElement.placeholderOption;
                    return e ? e.text : null
                }
                var t = this.config,
                    i = t.placeholder,
                    n = t.placeholderValue,
                    r = this.passedElement.element.dataset;
                if (i) {
                    if (n) return n;
                    if (r.placeholder) return r.placeholder
                }
                return null
            }, e
        }();
    t.default = y
}, function(e, t, i) {

    /** Fuse.js is required by Choices - don't remove it! **/
    /*!
     * Fuse.js v3.4.6 - Lightweight fuzzy-search (http://fusejs.io)
     * 
     * Copyright (c) 2012-2017 Kirollos Risk (http://kiro.me)
     * All Rights Reserved. Apache Software License 2.0
     * 
     * http://www.apache.org/licenses/LICENSE-2.0
     */
    e.exports = function(e) {
        var t = {};

        function i(n) {
            if (t[n]) return t[n].exports;
            var r = t[n] = {
                i: n,
                l: !1,
                exports: {}
            };
            return e[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
        }
        return i.m = e, i.c = t, i.d = function(e, t, n) {
            i.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: n
            })
        }, i.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(e, "__esModule", {
                value: !0
            })
        }, i.t = function(e, t) {
            if (1 & t && (e = i(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (i.r(n), Object.defineProperty(n, "default", {
                    enumerable: !0,
                    value: e
                }), 2 & t && "string" != typeof e)
                for (var r in e) i.d(n, r, function(t) {
                    return e[t]
                }.bind(null, r));
            return n
        }, i.n = function(e) {
            var t = e && e.__esModule ? function() {
                return e.default
            } : function() {
                return e
            };
            return i.d(t, "a", t), t
        }, i.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, i.p = "", i(i.s = 1)
    }([function(e, t) {
        e.exports = function(e) {
            return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
        }
    }, function(e, t, i) {
        function n(e) {
            return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            })(e)
        }

        function r(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var o = i(2),
            s = i(8),
            a = i(0),
            c = function() {
                function e(t, i) {
                    var n = i.location,
                        r = void 0 === n ? 0 : n,
                        o = i.distance,
                        a = void 0 === o ? 100 : o,
                        c = i.threshold,
                        l = void 0 === c ? .6 : c,
                        u = i.maxPatternLength,
                        h = void 0 === u ? 32 : u,
                        d = i.caseSensitive,
                        p = void 0 !== d && d,
                        f = i.tokenSeparator,
                        m = void 0 === f ? / +/g : f,
                        v = i.findAllMatches,
                        _ = void 0 !== v && v,
                        g = i.minMatchCharLength,
                        y = void 0 === g ? 1 : g,
                        b = i.id,
                        E = void 0 === b ? null : b,
                        S = i.keys,
                        I = void 0 === S ? [] : S,
                        O = i.shouldSort,
                        C = void 0 === O || O,
                        T = i.getFn,
                        w = void 0 === T ? s : T,
                        A = i.sortFn,
                        L = void 0 === A ? function(e, t) {
                            return e.score - t.score
                        } : A,
                        P = i.tokenize,
                        D = void 0 !== P && P,
                        x = i.matchAllTokens,
                        N = void 0 !== x && x,
                        M = i.includeMatches,
                        j = void 0 !== M && M,
                        k = i.includeScore,
                        F = void 0 !== k && k,
                        K = i.verbose,
                        R = void 0 !== K && K;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.options = {
                        location: r,
                        distance: a,
                        threshold: l,
                        maxPatternLength: h,
                        isCaseSensitive: p,
                        tokenSeparator: m,
                        findAllMatches: _,
                        minMatchCharLength: y,
                        id: E,
                        keys: I,
                        includeMatches: j,
                        includeScore: F,
                        shouldSort: C,
                        getFn: w,
                        sortFn: L,
                        verbose: R,
                        tokenize: D,
                        matchAllTokens: N
                    }, this.setCollection(t)
                }
                var t, i;
                return t = e, (i = [{
                    key: "setCollection",
                    value: function(e) {
                        return this.list = e, e
                    }
                }, {
                    key: "search",
                    value: function(e) {
                        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            limit: !1
                        };
                        this._log('---------\nSearch pattern: "'.concat(e, '"'));
                        var i = this._prepareSearchers(e),
                            n = i.tokenSearchers,
                            r = i.fullSearcher,
                            o = this._search(n, r),
                            s = o.weights,
                            a = o.results;
                        return this._computeScore(s, a), this.options.shouldSort && this._sort(a), t.limit && "number" == typeof t.limit && (a = a.slice(0, t.limit)), this._format(a)
                    }
                }, {
                    key: "_prepareSearchers",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                            t = [];
                        if (this.options.tokenize)
                            for (var i = e.split(this.options.tokenSeparator), n = 0, r = i.length; n < r; n += 1) t.push(new o(i[n], this.options));
                        return {
                            tokenSearchers: t,
                            fullSearcher: new o(e, this.options)
                        }
                    }
                }, {
                    key: "_search",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                            t = arguments.length > 1 ? arguments[1] : void 0,
                            i = this.list,
                            n = {},
                            r = [];
                        if ("string" == typeof i[0]) {
                            for (var o = 0, s = i.length; o < s; o += 1) this._analyze({
                                key: "",
                                value: i[o],
                                record: o,
                                index: o
                            }, {
                                resultMap: n,
                                results: r,
                                tokenSearchers: e,
                                fullSearcher: t
                            });
                            return {
                                weights: null,
                                results: r
                            }
                        }
                        for (var a = {}, c = 0, l = i.length; c < l; c += 1)
                            for (var u = i[c], h = 0, d = this.options.keys.length; h < d; h += 1) {
                                var p = this.options.keys[h];
                                if ("string" != typeof p) {
                                    if (a[p.name] = {
                                            weight: 1 - p.weight || 1
                                        }, p.weight <= 0 || p.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
                                    p = p.name
                                } else a[p] = {
                                    weight: 1
                                };
                                this._analyze({
                                    key: p,
                                    value: this.options.getFn(u, p),
                                    record: u,
                                    index: c
                                }, {
                                    resultMap: n,
                                    results: r,
                                    tokenSearchers: e,
                                    fullSearcher: t
                                })
                            }
                        return {
                            weights: a,
                            results: r
                        }
                    }
                }, {
                    key: "_analyze",
                    value: function(e, t) {
                        var i = e.key,
                            n = e.arrayIndex,
                            r = void 0 === n ? -1 : n,
                            o = e.value,
                            s = e.record,
                            c = e.index,
                            l = t.tokenSearchers,
                            u = void 0 === l ? [] : l,
                            h = t.fullSearcher,
                            d = void 0 === h ? [] : h,
                            p = t.resultMap,
                            f = void 0 === p ? {} : p,
                            m = t.results,
                            v = void 0 === m ? [] : m;
                        if (null != o) {
                            var _ = !1,
                                g = -1,
                                y = 0;
                            if ("string" == typeof o) {
                                this._log("\nKey: ".concat("" === i ? "-" : i));
                                var b = d.search(o);
                                if (this._log('Full text: "'.concat(o, '", score: ').concat(b.score)), this.options.tokenize) {
                                    for (var E = o.split(this.options.tokenSeparator), S = [], I = 0; I < u.length; I += 1) {
                                        var O = u[I];
                                        this._log('\nPattern: "'.concat(O.pattern, '"'));
                                        for (var C = !1, T = 0; T < E.length; T += 1) {
                                            var w = E[T],
                                                A = O.search(w),
                                                L = {};
                                            A.isMatch ? (L[w] = A.score, _ = !0, C = !0, S.push(A.score)) : (L[w] = 1, this.options.matchAllTokens || S.push(1)), this._log('Token: "'.concat(w, '", score: ').concat(L[w]))
                                        }
                                        C && (y += 1)
                                    }
                                    g = S[0];
                                    for (var P = S.length, D = 1; D < P; D += 1) g += S[D];
                                    g /= P, this._log("Token score average:", g)
                                }
                                var x = b.score;
                                g > -1 && (x = (x + g) / 2), this._log("Score average:", x);
                                var N = !this.options.tokenize || !this.options.matchAllTokens || y >= u.length;
                                if (this._log("\nCheck Matches: ".concat(N)), (_ || b.isMatch) && N) {
                                    var M = f[c];
                                    M ? M.output.push({
                                        key: i,
                                        arrayIndex: r,
                                        value: o,
                                        score: x,
                                        matchedIndices: b.matchedIndices
                                    }) : (f[c] = {
                                        item: s,
                                        output: [{
                                            key: i,
                                            arrayIndex: r,
                                            value: o,
                                            score: x,
                                            matchedIndices: b.matchedIndices
                                        }]
                                    }, v.push(f[c]))
                                }
                            } else if (a(o))
                                for (var j = 0, k = o.length; j < k; j += 1) this._analyze({
                                    key: i,
                                    arrayIndex: j,
                                    value: o[j],
                                    record: s,
                                    index: c
                                }, {
                                    resultMap: f,
                                    results: v,
                                    tokenSearchers: u,
                                    fullSearcher: d
                                })
                        }
                    }
                }, {
                    key: "_computeScore",
                    value: function(e, t) {
                        this._log("\n\nComputing score:\n");
                        for (var i = 0, n = t.length; i < n; i += 1) {
                            for (var r = t[i].output, o = r.length, s = 1, a = 1, c = 0; c < o; c += 1) {
                                var l = e ? e[r[c].key].weight : 1,
                                    u = (1 === l ? r[c].score : r[c].score || .001) * l;
                                1 !== l ? a = Math.min(a, u) : (r[c].nScore = u, s *= u)
                            }
                            t[i].score = 1 === a ? s : a, this._log(t[i])
                        }
                    }
                }, {
                    key: "_sort",
                    value: function(e) {
                        this._log("\n\nSorting...."), e.sort(this.options.sortFn)
                    }
                }, {
                    key: "_format",
                    value: function(e) {
                        var t = [];
                        if (this.options.verbose) {
                            var i = [];
                            this._log("\n\nOutput:\n\n", JSON.stringify(e, (function(e, t) {
                                if ("object" === n(t) && null !== t) {
                                    if (-1 !== i.indexOf(t)) return;
                                    i.push(t)
                                }
                                return t
                            }))), i = null
                        }
                        var r = [];
                        this.options.includeMatches && r.push((function(e, t) {
                            var i = e.output;
                            t.matches = [];
                            for (var n = 0, r = i.length; n < r; n += 1) {
                                var o = i[n];
                                if (0 !== o.matchedIndices.length) {
                                    var s = {
                                        indices: o.matchedIndices,
                                        value: o.value
                                    };
                                    o.key && (s.key = o.key), o.hasOwnProperty("arrayIndex") && o.arrayIndex > -1 && (s.arrayIndex = o.arrayIndex), t.matches.push(s)
                                }
                            }
                        })), this.options.includeScore && r.push((function(e, t) {
                            t.score = e.score
                        }));
                        for (var o = 0, s = e.length; o < s; o += 1) {
                            var a = e[o];
                            if (this.options.id && (a.item = this.options.getFn(a.item, this.options.id)[0]), r.length) {
                                for (var c = {
                                        item: a.item
                                    }, l = 0, u = r.length; l < u; l += 1) r[l](a, c);
                                t.push(c)
                            } else t.push(a.item)
                        }
                        return t
                    }
                }, {
                    key: "_log",
                    value: function() {
                        var e;
                        this.options.verbose && (e = console).log.apply(e, arguments)
                    }
                }]) && r(t.prototype, i), e
            }();
        e.exports = c
    }, function(e, t, i) {
        function n(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }
        var r = i(3),
            o = i(4),
            s = i(7),
            a = function() {
                function e(t, i) {
                    var n = i.location,
                        r = void 0 === n ? 0 : n,
                        o = i.distance,
                        a = void 0 === o ? 100 : o,
                        c = i.threshold,
                        l = void 0 === c ? .6 : c,
                        u = i.maxPatternLength,
                        h = void 0 === u ? 32 : u,
                        d = i.isCaseSensitive,
                        p = void 0 !== d && d,
                        f = i.tokenSeparator,
                        m = void 0 === f ? / +/g : f,
                        v = i.findAllMatches,
                        _ = void 0 !== v && v,
                        g = i.minMatchCharLength,
                        y = void 0 === g ? 1 : g;
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.options = {
                        location: r,
                        distance: a,
                        threshold: l,
                        maxPatternLength: h,
                        isCaseSensitive: p,
                        tokenSeparator: m,
                        findAllMatches: _,
                        minMatchCharLength: y
                    }, this.pattern = this.options.isCaseSensitive ? t : t.toLowerCase(), this.pattern.length <= h && (this.patternAlphabet = s(this.pattern))
                }
                var t, i;
                return t = e, (i = [{
                    key: "search",
                    value: function(e) {
                        if (this.options.isCaseSensitive || (e = e.toLowerCase()), this.pattern === e) return {
                            isMatch: !0,
                            score: 0,
                            matchedIndices: [
                                [0, e.length - 1]
                            ]
                        };
                        var t = this.options,
                            i = t.maxPatternLength,
                            n = t.tokenSeparator;
                        if (this.pattern.length > i) return r(e, this.pattern, n);
                        var s = this.options,
                            a = s.location,
                            c = s.distance,
                            l = s.threshold,
                            u = s.findAllMatches,
                            h = s.minMatchCharLength;
                        return o(e, this.pattern, this.patternAlphabet, {
                            location: a,
                            distance: c,
                            threshold: l,
                            findAllMatches: u,
                            minMatchCharLength: h
                        })
                    }
                }]) && n(t.prototype, i), e
            }();
        e.exports = a
    }, function(e, t) {
        var i = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
        e.exports = function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : / +/g,
                r = new RegExp(t.replace(i, "\\$&").replace(n, "|")),
                o = e.match(r),
                s = !!o,
                a = [];
            if (s)
                for (var c = 0, l = o.length; c < l; c += 1) {
                    var u = o[c];
                    a.push([e.indexOf(u), u.length - 1])
                }
            return {
                score: s ? .5 : 1,
                isMatch: s,
                matchedIndices: a
            }
        }
    }, function(e, t, i) {
        var n = i(5),
            r = i(6);
        e.exports = function(e, t, i, o) {
            for (var s = o.location, a = void 0 === s ? 0 : s, c = o.distance, l = void 0 === c ? 100 : c, u = o.threshold, h = void 0 === u ? .6 : u, d = o.findAllMatches, p = void 0 !== d && d, f = o.minMatchCharLength, m = void 0 === f ? 1 : f, v = a, _ = e.length, g = h, y = e.indexOf(t, v), b = t.length, E = [], S = 0; S < _; S += 1) E[S] = 0;
            if (-1 !== y) {
                var I = n(t, {
                    errors: 0,
                    currentLocation: y,
                    expectedLocation: v,
                    distance: l
                });
                if (g = Math.min(I, g), -1 !== (y = e.lastIndexOf(t, v + b))) {
                    var O = n(t, {
                        errors: 0,
                        currentLocation: y,
                        expectedLocation: v,
                        distance: l
                    });
                    g = Math.min(O, g)
                }
            }
            y = -1;
            for (var C = [], T = 1, w = b + _, A = 1 << (b <= 31 ? b - 1 : 30), L = 0; L < b; L += 1) {
                for (var P = 0, D = w; P < D;) n(t, {
                    errors: L,
                    currentLocation: v + D,
                    expectedLocation: v,
                    distance: l
                }) <= g ? P = D : w = D, D = Math.floor((w - P) / 2 + P);
                w = D;
                var x = Math.max(1, v - D + 1),
                    N = p ? _ : Math.min(v + D, _) + b,
                    M = Array(N + 2);
                M[N + 1] = (1 << L) - 1;
                for (var j = N; j >= x; j -= 1) {
                    var k = j - 1,
                        F = i[e.charAt(k)];
                    if (F && (E[k] = 1), M[j] = (M[j + 1] << 1 | 1) & F, 0 !== L && (M[j] |= (C[j + 1] | C[j]) << 1 | 1 | C[j + 1]), M[j] & A && (T = n(t, {
                            errors: L,
                            currentLocation: k,
                            expectedLocation: v,
                            distance: l
                        })) <= g) {
                        if (g = T, (y = k) <= v) break;
                        x = Math.max(1, 2 * v - y)
                    }
                }
                if (n(t, {
                        errors: L + 1,
                        currentLocation: v,
                        expectedLocation: v,
                        distance: l
                    }) > g) break;
                C = M
            }
            return {
                isMatch: y >= 0,
                score: 0 === T ? .001 : T,
                matchedIndices: r(E, m)
            }
        }
    }, function(e, t) {
        e.exports = function(e, t) {
            var i = t.errors,
                n = void 0 === i ? 0 : i,
                r = t.currentLocation,
                o = void 0 === r ? 0 : r,
                s = t.expectedLocation,
                a = void 0 === s ? 0 : s,
                c = t.distance,
                l = void 0 === c ? 100 : c,
                u = n / e.length,
                h = Math.abs(a - o);
            return l ? u + h / l : h ? 1 : u
        }
    }, function(e, t) {
        e.exports = function() {
            for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, i = [], n = -1, r = -1, o = 0, s = e.length; o < s; o += 1) {
                var a = e[o];
                a && -1 === n ? n = o : a || -1 === n || ((r = o - 1) - n + 1 >= t && i.push([n, r]), n = -1)
            }
            return e[o - 1] && o - n >= t && i.push([n, o - 1]), i
        }
    }, function(e, t) {
        e.exports = function(e) {
            for (var t = {}, i = e.length, n = 0; n < i; n += 1) t[e.charAt(n)] = 0;
            for (var r = 0; r < i; r += 1) t[e.charAt(r)] |= 1 << i - r - 1;
            return t
        }
    }, function(e, t, i) {
        var n = i(0);
        e.exports = function(e, t) {
            return function e(t, i, r) {
                if (i) {
                    var o = i.indexOf("."),
                        s = i,
                        a = null; - 1 !== o && (s = i.slice(0, o), a = i.slice(o + 1));
                    var c = t[s];
                    if (null != c)
                        if (a || "string" != typeof c && "number" != typeof c)
                            if (n(c))
                                for (var l = 0, u = c.length; l < u; l += 1) e(c[l], a, r);
                            else a && e(c, a, r);
                    else r.push(c.toString())
                } else r.push(t);
                return r
            }(e, t, [])
        }
    }])
}, function(e, t, i) {
    "use strict";
    var n = function(e) {
        return function(e) {
            return !!e && "object" == typeof e
        }(e) && ! function(e) {
            var t = Object.prototype.toString.call(e);
            return "[object RegExp]" === t || "[object Date]" === t || function(e) {
                return e.$$typeof === r
            }(e)
        }(e)
    };
    var r = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

    function o(e, t) {
        return !1 !== t.clone && t.isMergeableObject(e) ? l((i = e, Array.isArray(i) ? [] : {}), e, t) : e;
        var i
    }

    function s(e, t, i) {
        return e.concat(t).map((function(e) {
            return o(e, i)
        }))
    }

    function a(e) {
        return Object.keys(e).concat(function(e) {
            return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter((function(t) {
                return e.propertyIsEnumerable(t)
            })) : []
        }(e))
    }

    function c(e, t, i) {
        var n = {};
        return i.isMergeableObject(e) && a(e).forEach((function(t) {
            n[t] = o(e[t], i)
        })), a(t).forEach((function(r) {
            (function(e, t) {
                try {
                    return t in e && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t))
                } catch (e) {
                    return !1
                }
            })(e, r) || (i.isMergeableObject(t[r]) && e[r] ? n[r] = function(e, t) {
                if (!t.customMerge) return l;
                var i = t.customMerge(e);
                return "function" == typeof i ? i : l
            }(r, i)(e[r], t[r], i) : n[r] = o(t[r], i))
        })), n
    }

    function l(e, t, i) {
        (i = i || {}).arrayMerge = i.arrayMerge || s, i.isMergeableObject = i.isMergeableObject || n, i.cloneUnlessOtherwiseSpecified = o;
        var r = Array.isArray(t);
        return r === Array.isArray(e) ? r ? i.arrayMerge(e, t, i) : c(e, t, i) : o(t, i)
    }
    l.all = function(e, t) {
        if (!Array.isArray(e)) throw new Error("first argument should be an array");
        return e.reduce((function(e, i) {
            return l(e, i, t)
        }), {})
    };
    var u = l;
    e.exports = u
}, function(e, t, i) {
    "use strict";
    var n = this && this.__spreadArrays || function() {
            for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
            var n = Array(e),
                r = 0;
            for (t = 0; t < i; t++)
                for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) n[r] = o[s];
            return n
        },
        r = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = i(3),
        s = r(i(4)),
        a = function() {
            function e() {
                this._store = o.createStore(s.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
            }
            return e.prototype.subscribe = function(e) {
                this._store.subscribe(e)
            }, e.prototype.dispatch = function(e) {
                this._store.dispatch(e)
            }, Object.defineProperty(e.prototype, "state", {
                get: function() {
                    return this._store.getState()
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "items", {
                get: function() {
                    return this.state.items
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "activeItems", {
                get: function() {
                    return this.items.filter((function(e) {
                        return !0 === e.active
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "highlightedActiveItems", {
                get: function() {
                    return this.items.filter((function(e) {
                        return e.active && e.highlighted
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "choices", {
                get: function() {
                    return this.state.choices
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "activeChoices", {
                get: function() {
                    return this.choices.filter((function(e) {
                        return !0 === e.active
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "selectableChoices", {
                get: function() {
                    return this.choices.filter((function(e) {
                        return !0 !== e.disabled
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "searchableChoices", {
                get: function() {
                    return this.selectableChoices.filter((function(e) {
                        return !0 !== e.placeholder
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "placeholderChoice", {
                get: function() {
                    return n(this.choices).reverse().find((function(e) {
                        return !0 === e.placeholder
                    }))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "groups", {
                get: function() {
                    return this.state.groups
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "activeGroups", {
                get: function() {
                    var e = this.groups,
                        t = this.choices;
                    return e.filter((function(e) {
                        var i = !0 === e.active && !1 === e.disabled,
                            n = t.some((function(e) {
                                return !0 === e.active && !1 === e.disabled
                            }));
                        return i && n
                    }), [])
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.isLoading = function() {
                return this.state.loading
            }, e.prototype.getChoiceById = function(e) {
                return this.activeChoices.find((function(t) {
                    return t.id === parseInt(e, 10)
                }))
            }, e.prototype.getGroupById = function(e) {
                return this.groups.find((function(t) {
                    return t.id === e
                }))
            }, e
        }();
    t.default = a
}, function(e, t) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || new Function("return this")()
    } catch (e) {
        "object" == typeof window && (i = window)
    }
    e.exports = i
}, function(e, t) {
    e.exports = function(e) {
        if (!e.webpackPolyfill) {
            var t = Object.create(e);
            t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function() {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function() {
                    return t.i
                }
            }), Object.defineProperty(t, "exports", {
                enumerable: !0
            }), t.webpackPolyfill = 1
        }
        return t
    }
}, function(e, t, i) {
    "use strict";
    var n = this && this.__spreadArrays || function() {
        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
        var n = Array(e),
            r = 0;
        for (t = 0; t < i; t++)
            for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) n[r] = o[s];
        return n
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.defaultState = [], t.default = function(e, i) {
        switch (void 0 === e && (e = t.defaultState), i.type) {
            case "ADD_ITEM":
                var r = i;
                return n(e, [{
                    id: r.id,
                    choiceId: r.choiceId,
                    groupId: r.groupId,
                    value: r.value,
                    label: r.label,
                    active: !0,
                    highlighted: !1,
                    customProperties: r.customProperties,
                    placeholder: r.placeholder || !1,
                    keyCode: null
                }]).map((function(e) {
                    var t = e;
                    return t.highlighted = !1, t
                }));
            case "REMOVE_ITEM":
                return e.map((function(e) {
                    var t = e;
                    return t.id === i.id && (t.active = !1), t
                }));
            case "HIGHLIGHT_ITEM":
                var o = i;
                return e.map((function(e) {
                    var t = e;
                    return t.id === o.id && (t.highlighted = o.highlighted), t
                }));
            default:
                return e
        }
    }
}, function(e, t, i) {
    "use strict";
    var n = this && this.__spreadArrays || function() {
        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
        var n = Array(e),
            r = 0;
        for (t = 0; t < i; t++)
            for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) n[r] = o[s];
        return n
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.defaultState = [], t.default = function(e, i) {
        switch (void 0 === e && (e = t.defaultState), i.type) {
            case "ADD_GROUP":
                var r = i;
                return n(e, [{
                    id: r.id,
                    value: r.value,
                    active: r.active,
                    disabled: r.disabled
                }]);
            case "CLEAR_CHOICES":
                return [];
            default:
                return e
        }
    }
}, function(e, t, i) {
    "use strict";
    var n = this && this.__spreadArrays || function() {
        for (var e = 0, t = 0, i = arguments.length; t < i; t++) e += arguments[t].length;
        var n = Array(e),
            r = 0;
        for (t = 0; t < i; t++)
            for (var o = arguments[t], s = 0, a = o.length; s < a; s++, r++) n[r] = o[s];
        return n
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.defaultState = [], t.default = function(e, i) {
        switch (void 0 === e && (e = t.defaultState), i.type) {
            case "ADD_CHOICE":
                var r = i,
                    o = {
                        id: r.id,
                        elementId: r.elementId,
                        groupId: r.groupId,
                        value: r.value,
                        label: r.label || r.value,
                        disabled: r.disabled || !1,
                        selected: !1,
                        active: !0,
                        score: 9999,
                        customProperties: r.customProperties,
                        placeholder: r.placeholder || !1
                    };
                return n(e, [o]);
            case "ADD_ITEM":
                var s = i;
                return s.choiceId > -1 ? e.map((function(e) {
                    var t = e;
                    return t.id === parseInt("" + s.choiceId, 10) && (t.selected = !0), t
                })) : e;
            case "REMOVE_ITEM":
                var a = i;
                return a.choiceId && a.choiceId > -1 ? e.map((function(e) {
                    var t = e;
                    return t.id === parseInt("" + a.choiceId, 10) && (t.selected = !1), t
                })) : e;
            case "FILTER_CHOICES":
                var c = i;
                return e.map((function(e) {
                    var t = e;
                    return t.active = c.results.some((function(e) {
                        var i = e.item,
                            n = e.score;
                        return i.id === t.id && (t.score = n, !0)
                    })), t
                }));
            case "ACTIVATE_CHOICES":
                var l = i;
                return e.map((function(e) {
                    var t = e;
                    return t.active = l.active, t
                }));
            case "CLEAR_CHOICES":
                return t.defaultState;
            default:
                return e
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.defaultState = !1;
    t.default = function(e, i) {
        switch (void 0 === e && (e = t.defaultState), i.type) {
            case "SET_IS_LOADING":
                return i.isLoading;
            default:
                return e
        }
    }
}, function(e, t, i) {
    "use strict";
    var n = this && this.__importDefault || function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = n(i(19));
    t.Dropdown = r.default;
    var o = n(i(20));
    t.Container = o.default;
    var s = n(i(21));
    t.Input = s.default;
    var a = n(i(22));
    t.List = a.default;
    var c = n(i(23));
    t.WrappedInput = c.default;
    var l = n(i(24));
    t.WrappedSelect = l.default
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function() {
        function e(e) {
            var t = e.element,
                i = e.type,
                n = e.classNames;
            this.element = t, this.classNames = n, this.type = i, this.isActive = !1
        }
        return Object.defineProperty(e.prototype, "distanceFromTopWindow", {
            get: function() {
                return this.element.getBoundingClientRect().bottom
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.getChild = function(e) {
            return this.element.querySelector(e)
        }, e.prototype.show = function() {
            return this.element.classList.add(this.classNames.activeState), this.element.setAttribute("aria-expanded", "true"), this.isActive = !0, this
        }, e.prototype.hide = function() {
            return this.element.classList.remove(this.classNames.activeState), this.element.setAttribute("aria-expanded", "false"), this.isActive = !1, this
        }, e
    }();
    t.default = n
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(1),
        r = i(0),
        o = function() {
            function e(e) {
                var t = e.element,
                    i = e.type,
                    n = e.classNames,
                    r = e.position;
                this.element = t, this.classNames = n, this.type = i, this.position = r, this.isOpen = !1, this.isFlipped = !1, this.isFocussed = !1, this.isDisabled = !1, this.isLoading = !1, this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this)
            }
            return e.prototype.addEventListeners = function() {
                this.element.addEventListener("focus", this._onFocus), this.element.addEventListener("blur", this._onBlur)
            }, e.prototype.removeEventListeners = function() {
                this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur)
            }, e.prototype.shouldFlip = function(e) {
                if ("number" != typeof e) return !1;
                var t = !1;
                return "auto" === this.position ? t = !window.matchMedia("(min-height: " + (e + 1) + "px)").matches : "top" === this.position && (t = !0), t
            }, e.prototype.setActiveDescendant = function(e) {
                this.element.setAttribute("aria-activedescendant", e)
            }, e.prototype.removeActiveDescendant = function() {
                this.element.removeAttribute("aria-activedescendant")
            }, e.prototype.open = function(e) {
                this.element.classList.add(this.classNames.openState), this.element.setAttribute("aria-expanded", "true"), this.isOpen = !0, this.shouldFlip(e) && (this.element.classList.add(this.classNames.flippedState), this.isFlipped = !0)
            }, e.prototype.close = function() {
                this.element.classList.remove(this.classNames.openState), this.element.setAttribute("aria-expanded", "false"), this.removeActiveDescendant(), this.isOpen = !1, this.isFlipped && (this.element.classList.remove(this.classNames.flippedState), this.isFlipped = !1)
            }, e.prototype.focus = function() {
                this.isFocussed || this.element.focus()
            }, e.prototype.addFocusState = function() {
                this.element.classList.add(this.classNames.focusState)
            }, e.prototype.removeFocusState = function() {
                this.element.classList.remove(this.classNames.focusState)
            }, e.prototype.enable = function() {
                this.element.classList.remove(this.classNames.disabledState), this.element.removeAttribute("aria-disabled"), this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "0"), this.isDisabled = !1
            }, e.prototype.disable = function() {
                this.element.classList.add(this.classNames.disabledState), this.element.setAttribute("aria-disabled", "true"), this.type === r.SELECT_ONE_TYPE && this.element.setAttribute("tabindex", "-1"), this.isDisabled = !0
            }, e.prototype.wrap = function(e) {
                n.wrap(e, this.element)
            }, e.prototype.unwrap = function(e) {
                this.element.parentNode && (this.element.parentNode.insertBefore(e, this.element), this.element.parentNode.removeChild(this.element))
            }, e.prototype.addLoadingState = function() {
                this.element.classList.add(this.classNames.loadingState), this.element.setAttribute("aria-busy", "true"), this.isLoading = !0
            }, e.prototype.removeLoadingState = function() {
                this.element.classList.remove(this.classNames.loadingState), this.element.removeAttribute("aria-busy"), this.isLoading = !1
            }, e.prototype._onFocus = function() {
                this.isFocussed = !0
            }, e.prototype._onBlur = function() {
                this.isFocussed = !1
            }, e
        }();
    t.default = o
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(1),
        r = i(0),
        o = function() {
            function e(e) {
                var t = e.element,
                    i = e.type,
                    n = e.classNames,
                    r = e.preventPaste;
                this.element = t, this.type = i, this.classNames = n, this.preventPaste = r, this.isFocussed = this.element.isEqualNode(document.activeElement), this.isDisabled = t.disabled, this._onPaste = this._onPaste.bind(this), this._onInput = this._onInput.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this)
            }
            return Object.defineProperty(e.prototype, "placeholder", {
                set: function(e) {
                    this.element.placeholder = e
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "value", {
                get: function() {
                    return n.sanitise(this.element.value)
                },
                set: function(e) {
                    this.element.value = e
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.addEventListeners = function() {
                this.element.addEventListener("paste", this._onPaste), this.element.addEventListener("input", this._onInput, {
                    passive: !0
                }), this.element.addEventListener("focus", this._onFocus, {
                    passive: !0
                }), this.element.addEventListener("blur", this._onBlur, {
                    passive: !0
                })
            }, e.prototype.removeEventListeners = function() {
                this.element.removeEventListener("input", this._onInput), this.element.removeEventListener("paste", this._onPaste), this.element.removeEventListener("focus", this._onFocus), this.element.removeEventListener("blur", this._onBlur)
            }, e.prototype.enable = function() {
                this.element.removeAttribute("disabled"), this.isDisabled = !1
            }, e.prototype.disable = function() {
                this.element.setAttribute("disabled", ""), this.isDisabled = !0
            }, e.prototype.focus = function() {
                this.isFocussed || this.element.focus()
            }, e.prototype.blur = function() {
                this.isFocussed && this.element.blur()
            }, e.prototype.clear = function(e) {
                return void 0 === e && (e = !0), this.element.value && (this.element.value = ""), e && this.setWidth(), this
            }, e.prototype.setWidth = function() {
                var e = this.element,
                    t = e.style,
                    i = e.value,
                    n = e.placeholder;
                t.minWidth = n.length + 1 + "ch", t.width = i.length + 1 + "ch"
            }, e.prototype.setActiveDescendant = function(e) {
                this.element.setAttribute("aria-activedescendant", e)
            }, e.prototype.removeActiveDescendant = function() {
                this.element.removeAttribute("aria-activedescendant")
            }, e.prototype._onInput = function() {
                this.type !== r.SELECT_ONE_TYPE && this.setWidth()
            }, e.prototype._onPaste = function(e) {
                this.preventPaste && e.preventDefault()
            }, e.prototype._onFocus = function() {
                this.isFocussed = !0
            }, e.prototype._onBlur = function() {
                this.isFocussed = !1
            }, e
        }();
    t.default = o
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(0),
        r = function() {
            function e(e) {
                var t = e.element;
                this.element = t, this.scrollPos = this.element.scrollTop, this.height = this.element.offsetHeight
            }
            return e.prototype.clear = function() {
                this.element.innerHTML = ""
            }, e.prototype.append = function(e) {
                this.element.appendChild(e)
            }, e.prototype.getChild = function(e) {
                return this.element.querySelector(e)
            }, e.prototype.hasChildren = function() {
                return this.element.hasChildNodes()
            }, e.prototype.scrollToTop = function() {
                this.element.scrollTop = 0
            }, e.prototype.scrollToChildElement = function(e, t) {
                var i = this;
                if (e) {
                    var n = this.element.offsetHeight,
                        r = this.element.scrollTop + n,
                        o = e.offsetHeight,
                        s = e.offsetTop + o,
                        a = t > 0 ? this.element.scrollTop + s - r : e.offsetTop;
                    requestAnimationFrame((function() {
                        i._animateScroll(a, t)
                    }))
                }
            }, e.prototype._scrollDown = function(e, t, i) {
                var n = (i - e) / t,
                    r = n > 1 ? n : 1;
                this.element.scrollTop = e + r
            }, e.prototype._scrollUp = function(e, t, i) {
                var n = (e - i) / t,
                    r = n > 1 ? n : 1;
                this.element.scrollTop = e - r
            }, e.prototype._animateScroll = function(e, t) {
                var i = this,
                    r = n.SCROLLING_SPEED,
                    o = this.element.scrollTop,
                    s = !1;
                t > 0 ? (this._scrollDown(o, r, e), o < e && (s = !0)) : (this._scrollUp(o, r, e), o > e && (s = !0)), s && requestAnimationFrame((function() {
                    i._animateScroll(e, t)
                }))
            }, e
        }();
    t.default = r
}, function(e, t, i) {
    "use strict";
    var n, r = this && this.__extends || (n = function(e, t) {
            return (n = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
                })(e, t)
        }, function(e, t) {
            function i() {
                this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
        }),
        o = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(e) {
        function t(t) {
            var i = t.element,
                n = t.classNames,
                r = t.delimiter,
                o = e.call(this, {
                    element: i,
                    classNames: n
                }) || this;
            return o.delimiter = r, o
        }
        return r(t, e), Object.defineProperty(t.prototype, "value", {
            get: function() {
                return this.element.value
            },
            set: function(e) {
                this.element.setAttribute("value", e), this.element.value = e
            },
            enumerable: !0,
            configurable: !0
        }), t
    }(o(i(5)).default);
    t.default = s
}, function(e, t, i) {
    "use strict";
    var n, r = this && this.__extends || (n = function(e, t) {
            return (n = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i])
                })(e, t)
        }, function(e, t) {
            function i() {
                this.constructor = e
            }
            n(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i)
        }),
        o = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function(e) {
        function t(t) {
            var i = t.element,
                n = t.classNames,
                r = t.template,
                o = e.call(this, {
                    element: i,
                    classNames: n
                }) || this;
            return o.template = r, o
        }
        return r(t, e), Object.defineProperty(t.prototype, "placeholderOption", {
            get: function() {
                return this.element.querySelector('option[value=""]') || this.element.querySelector("option[placeholder]")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "optionGroups", {
            get: function() {
                return Array.from(this.element.getElementsByTagName("OPTGROUP"))
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "options", {
            get: function() {
                return Array.from(this.element.options)
            },
            set: function(e) {
                var t = this,
                    i = document.createDocumentFragment();
                e.forEach((function(e) {
                    return n = e, r = t.template(n), void i.appendChild(r);
                    var n, r
                })), this.appendDocFragment(i)
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.appendDocFragment = function(e) {
            this.element.innerHTML = "", this.element.appendChild(e)
        }, t
    }(o(i(5)).default);
    t.default = s
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = {
        containerOuter: function(e, t, i, n, r, o) {
            var s = e.containerOuter,
                a = Object.assign(document.createElement("div"), {
                    className: s
                });
            return a.dataset.type = o, t && (a.dir = t), n && (a.tabIndex = 0), i && (a.setAttribute("role", r ? "combobox" : "listbox"), r && a.setAttribute("aria-autocomplete", "list")), a.setAttribute("aria-haspopup", "true"), a.setAttribute("aria-expanded", "false"), a
        },
        containerInner: function(e) {
            var t = e.containerInner;
            return Object.assign(document.createElement("div"), {
                className: t
            })
        },
        itemList: function(e, t) {
            var i = e.list,
                n = e.listSingle,
                r = e.listItems;
            return Object.assign(document.createElement("div"), {
                className: i + " " + (t ? n : r)
            })
        },
        placeholder: function(e, t) {
            var i = e.placeholder;
            return Object.assign(document.createElement("div"), {
                className: i,
                innerHTML: t
            })
        },
        item: function(e, t, i) {
            var n = e.item,
                r = e.button,
                o = e.highlightedState,
                s = e.itemSelectable,
                a = e.placeholder,
                c = t.id,
                l = t.value,
                u = t.label,
                h = t.customProperties,
                d = t.active,
                p = t.disabled,
                f = t.highlighted,
                m = t.placeholder,
                v = Object.assign(document.createElement("div"), {
                    className: n,
                    innerHTML: u
                });
            if (Object.assign(v.dataset, {
                    item: "",
                    id: c,
                    value: l,
                    customProperties: h
                }), d && v.setAttribute("aria-selected", "true"), p && v.setAttribute("aria-disabled", "true"), m && v.classList.add(a), v.classList.add(f ? o : s), i) {
                p && v.classList.remove(s), v.dataset.deletable = "";
                var _ = Object.assign(document.createElement("button"), {
                    type: "button",
                    className: r,
                    innerHTML: "Remove item"
                });
                _.setAttribute("aria-label", "Remove item: '" + l + "'"), _.dataset.button = "", v.appendChild(_)
            }
            return v
        },
        choiceList: function(e, t) {
            var i = e.list,
                n = Object.assign(document.createElement("div"), {
                    className: i
                });
            return t || n.setAttribute("aria-multiselectable", "true"), n.setAttribute("role", "listbox"), n
        },
        choiceGroup: function(e, t) {
            var i = e.group,
                n = e.groupHeading,
                r = e.itemDisabled,
                o = t.id,
                s = t.value,
                a = t.disabled,
                c = Object.assign(document.createElement("div"), {
                    className: i + " " + (a ? r : "")
                });
            return c.setAttribute("role", "group"), Object.assign(c.dataset, {
                group: "",
                id: o,
                value: s
            }), a && c.setAttribute("aria-disabled", "true"), c.appendChild(Object.assign(document.createElement("div"), {
                className: n,
                innerHTML: s
            })), c
        },
        choice: function(e, t, i) {
            var n = e.item,
                r = e.itemChoice,
                o = e.itemSelectable,
                s = e.selectedState,
                a = e.itemDisabled,
                c = e.placeholder,
                l = t.id,
                u = t.value,
                h = t.label,
                d = t.groupId,
                p = t.elementId,
                f = t.disabled,
                m = t.selected,
                v = t.placeholder,
                _ = Object.assign(document.createElement("div"), {
                    id: p,
                    innerHTML: h,
                    className: n + " " + r
                });
            return m && _.classList.add(s), v && _.classList.add(c), _.setAttribute("role", d && d > 0 ? "treeitem" : "option"), Object.assign(_.dataset, {
                choice: "",
                id: l,
                value: u,
                selectText: i
            }), f ? (_.classList.add(a), _.dataset.choiceDisabled = "", _.setAttribute("aria-disabled", "true")) : (_.classList.add(o), _.dataset.choiceSelectable = ""), _
        },
        input: function(e, t) {
            var i = e.input,
                n = e.inputCloned,
                r = Object.assign(document.createElement("input"), {
                    type: "text",
                    className: i + " " + n,
                    autocomplete: "off",
                    autocapitalize: "off",
                    spellcheck: !1
                });
            return r.setAttribute("role", "textbox"), r.setAttribute("aria-autocomplete", "list"), r.setAttribute("aria-label", t), r
        },
        dropdown: function(e) {
            var t = e.list,
                i = e.listDropdown,
                n = document.createElement("div");
            return n.classList.add(t, i), n.setAttribute("aria-expanded", "false"), n
        },
        notice: function(e, t, i) {
            var n = e.item,
                r = e.itemChoice,
                o = e.noResults,
                s = e.noChoices;
            void 0 === i && (i = "");
            var a = [n, r];
            return "no-choices" === i ? a.push(s) : "no-results" === i && a.push(o), Object.assign(document.createElement("div"), {
                innerHTML: t,
                className: a.join(" ")
            })
        },
        option: function(e) {
            var t = e.label,
                i = e.value,
                n = e.customProperties,
                r = e.active,
                o = e.disabled,
                s = new Option(t, i, !1, r);
            return n && (s.dataset.customProperties = "" + n), s.disabled = !!o, s
        }
    };
    t.default = n
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(0);
    t.addChoice = function(e) {
        var t = e.value,
            i = e.label,
            r = e.id,
            o = e.groupId,
            s = e.disabled,
            a = e.elementId,
            c = e.customProperties,
            l = e.placeholder,
            u = e.keyCode;
        return {
            type: n.ACTION_TYPES.ADD_CHOICE,
            value: t,
            label: i,
            id: r,
            groupId: o,
            disabled: s,
            elementId: a,
            customProperties: c,
            placeholder: l,
            keyCode: u
        }
    }, t.filterChoices = function(e) {
        return {
            type: n.ACTION_TYPES.FILTER_CHOICES,
            results: e
        }
    }, t.activateChoices = function(e) {
        return void 0 === e && (e = !0), {
            type: n.ACTION_TYPES.ACTIVATE_CHOICES,
            active: e
        }
    }, t.clearChoices = function() {
        return {
            type: n.ACTION_TYPES.CLEAR_CHOICES
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(0);
    t.addItem = function(e) {
        var t = e.value,
            i = e.label,
            r = e.id,
            o = e.choiceId,
            s = e.groupId,
            a = e.customProperties,
            c = e.placeholder,
            l = e.keyCode;
        return {
            type: n.ACTION_TYPES.ADD_ITEM,
            value: t,
            label: i,
            id: r,
            choiceId: o,
            groupId: s,
            customProperties: a,
            placeholder: c,
            keyCode: l
        }
    }, t.removeItem = function(e, t) {
        return {
            type: n.ACTION_TYPES.REMOVE_ITEM,
            id: e,
            choiceId: t
        }
    }, t.highlightItem = function(e, t) {
        return {
            type: n.ACTION_TYPES.HIGHLIGHT_ITEM,
            id: e,
            highlighted: t
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(0);
    t.addGroup = function(e) {
        var t = e.value,
            i = e.id,
            r = e.active,
            o = e.disabled;
        return {
            type: n.ACTION_TYPES.ADD_GROUP,
            value: t,
            id: i,
            active: r,
            disabled: o
        }
    }
}, function(e, t, i) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = i(0);
    t.clearAll = function() {
        return {
            type: n.ACTION_TYPES.CLEAR_ALL
        }
    }, t.resetTo = function(e) {
        return {
            type: n.ACTION_TYPES.RESET_TO,
            state: e
        }
    }, t.setIsLoading = function(e) {
        return {
            type: n.ACTION_TYPES.SET_IS_LOADING,
            isLoading: e
        }
    }
}]).default;

/** Fuse.js is required by Choices - don't remove it! **/
/*!
 * Stickyfill – `position: sticky` polyfill
 * v. 2.1.0 | https://github.com/wilddeer/stickyfill
 * MIT License
 */
! function(a, b) {
    "use strict";

    function c(a, b) {
        if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function")
    }

    function d(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }

    function e(a) {
        return parseFloat(a) || 0
    }

    function f(a) {
        for (var b = 0; a;) b += a.offsetTop, a = a.offsetParent;
        return b
    }

    function g() {
        function c() {
            a.pageXOffset != m.left ? (m.top = a.pageYOffset, m.left = a.pageXOffset, p.refreshAll()) : a.pageYOffset != m.top && (m.top = a.pageYOffset, m.left = a.pageXOffset, n.forEach(function(a) {
                return a._recalcPosition()
            }))
        }

        function d() {
            f = setInterval(function() {
                n.forEach(function(a) {
                    return a._fastCheck()
                })
            }, 500)
        }

        function e() {
            clearInterval(f)
        }
        if (!k) {
            k = !0, c(), a.addEventListener("scroll", c), a.addEventListener("resize", p.refreshAll), a.addEventListener("orientationchange", p.refreshAll);
            var f = void 0,
                g = void 0,
                h = void 0;
            "hidden" in b ? (g = "hidden", h = "visibilitychange") : "webkitHidden" in b && (g = "webkitHidden", h = "webkitvisibilitychange"), h ? (b[g] || d(), b.addEventListener(h, function() {
                b[g] ? e() : d()
            })) : d()
        }
    }
    var h = function() {
            function a(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var d = b[c];
                    d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
                }
            }
            return function(b, c, d) {
                return c && a(b.prototype, c), d && a(b, d), b
            }
        }(),
        i = !1,
        j = "undefined" != typeof a;
    j && a.getComputedStyle ? ! function() {
        var a = b.createElement("div");
        ["", "-webkit-", "-moz-", "-ms-"].some(function(b) {
            try {
                a.style.position = b + "sticky"
            } catch (a) {}
            return "" != a.style.position
        }) && (i = !0)
    }() : i = !0;
    var k = !1,
        l = "undefined" != typeof ShadowRoot,
        m = {
            top: null,
            left: null
        },
        n = [],
        o = function() {
            function g(a) {
                if (c(this, g), !(a instanceof HTMLElement)) throw new Error("First argument must be HTMLElement");
                if (n.some(function(b) {
                        return b._node === a
                    })) throw new Error("Stickyfill is already applied to this node");
                this._node = a, this._stickyMode = null, this._active = !1, n.push(this), this.refresh()
            }
            return h(g, [{
                key: "refresh",
                value: function() {
                    if (!i && !this._removed) {
                        this._active && this._deactivate();
                        var c = this._node,
                            g = getComputedStyle(c),
                            h = {
                                position: g.position,
                                top: g.top,
                                display: g.display,
                                marginTop: g.marginTop,
                                marginBottom: g.marginBottom,
                                marginLeft: g.marginLeft,
                                marginRight: g.marginRight,
                                cssFloat: g.cssFloat
                            };
                        if (!isNaN(parseFloat(h.top)) && "table-cell" != h.display && "none" != h.display) {
                            this._active = !0;
                            var j = c.style.position;
                            "sticky" != g.position && "-webkit-sticky" != g.position || (c.style.position = "static");
                            var k = c.parentNode,
                                m = l && k instanceof ShadowRoot ? k.host : k,
                                n = c.getBoundingClientRect(),
                                o = m.getBoundingClientRect(),
                                p = getComputedStyle(m);
                            this._parent = {
                                node: m,
                                styles: {
                                    position: m.style.position
                                },
                                offsetHeight: m.offsetHeight
                            }, this._offsetToWindow = {
                                left: n.left,
                                right: b.documentElement.clientWidth - n.right
                            }, this._offsetToParent = {
                                top: n.top - o.top - e(p.borderTopWidth),
                                left: n.left - o.left - e(p.borderLeftWidth),
                                right: -n.right + o.right - e(p.borderRightWidth)
                            }, this._styles = {
                                position: j,
                                top: c.style.top,
                                bottom: c.style.bottom,
                                left: c.style.left,
                                right: c.style.right,
                                width: c.style.width,
                                marginTop: c.style.marginTop,
                                marginLeft: c.style.marginLeft,
                                marginRight: c.style.marginRight
                            };
                            var q = e(h.top);
                            this._limits = {
                                start: n.top + a.pageYOffset - q,
                                end: o.top + a.pageYOffset + m.offsetHeight - e(p.borderBottomWidth) - c.offsetHeight - q - e(h.marginBottom)
                            };
                            var r = p.position;
                            "absolute" != r && "relative" != r && (m.style.position = "relative"), this._recalcPosition();
                            var s = this._clone = {};
                            s.node = b.createElement("div"), d(s.node.style, {
                                width: n.right - n.left + "px",
                                height: n.bottom - n.top + "px",
                                marginTop: h.marginTop,
                                marginBottom: h.marginBottom,
                                marginLeft: h.marginLeft,
                                marginRight: h.marginRight,
                                cssFloat: h.cssFloat,
                                padding: 0,
                                border: 0,
                                borderSpacing: 0,
                                fontSize: "1em",
                                position: "static"
                            }), k.insertBefore(s.node, c), s.docOffsetTop = f(s.node)
                        }
                    }
                }
            }, {
                key: "_recalcPosition",
                value: function() {
                    if (this._active && !this._removed) {
                        var a = m.top <= this._limits.start ? "start" : m.top >= this._limits.end ? "end" : "middle";
                        if (this._stickyMode != a) {
                            switch (a) {
                                case "start":
                                    d(this._node.style, {
                                        position: "absolute",
                                        left: this._offsetToParent.left + "px",
                                        right: this._offsetToParent.right + "px",
                                        top: this._offsetToParent.top + "px",
                                        bottom: "auto",
                                        width: "auto",
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginTop: 0
                                    });
                                    break;
                                case "middle":
                                    d(this._node.style, {
                                        position: "fixed",
                                        left: this._offsetToWindow.left + "px",
                                        right: this._offsetToWindow.right + "px",
                                        top: this._styles.top,
                                        bottom: "auto",
                                        width: "auto",
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginTop: 0
                                    });
                                    break;
                                case "end":
                                    d(this._node.style, {
                                        position: "absolute",
                                        left: this._offsetToParent.left + "px",
                                        right: this._offsetToParent.right + "px",
                                        top: "auto",
                                        bottom: 0,
                                        width: "auto",
                                        marginLeft: 0,
                                        marginRight: 0
                                    })
                            }
                            this._stickyMode = a
                        }
                    }
                }
            }, {
                key: "_fastCheck",
                value: function() {
                    this._active && !this._removed && (Math.abs(f(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) && this.refresh()
                }
            }, {
                key: "_deactivate",
                value: function() {
                    var a = this;
                    this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, d(this._node.style, this._styles), delete this._styles, n.some(function(b) {
                        return b !== a && b._parent && b._parent.node === a._parent.node
                    }) || d(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits)
                }
            }, {
                key: "remove",
                value: function() {
                    var a = this;
                    this._deactivate(), n.some(function(b, c) {
                        if (b._node === a._node) return n.splice(c, 1), !0
                    }), this._removed = !0
                }
            }]), g
        }(),
        p = {
            stickies: n,
            Sticky: o,
            forceSticky: function() {
                i = !1, g(), this.refreshAll()
            },
            addOne: function(a) {
                if (!(a instanceof HTMLElement)) {
                    if (!a.length || !a[0]) return;
                    a = a[0]
                }
                for (var b = 0; b < n.length; b++)
                    if (n[b]._node === a) return n[b];
                return new o(a)
            },
            add: function(a) {
                if (a instanceof HTMLElement && (a = [a]), a.length) {
                    for (var b = [], c = function(c) {
                            var d = a[c];
                            return d instanceof HTMLElement ? n.some(function(a) {
                                if (a._node === d) return b.push(a), !0
                            }) ? "continue" : void b.push(new o(d)) : (b.push(void 0), "continue")
                        }, d = 0; d < a.length; d++) {
                        c(d)
                    }
                    return b
                }
            },
            refreshAll: function() {
                n.forEach(function(a) {
                    return a.refresh()
                })
            },
            removeOne: function(a) {
                if (!(a instanceof HTMLElement)) {
                    if (!a.length || !a[0]) return;
                    a = a[0]
                }
                n.some(function(b) {
                    if (b._node === a) return b.remove(), !0
                })
            },
            remove: function(a) {
                if (a instanceof HTMLElement && (a = [a]), a.length)
                    for (var b = function(b) {
                            var c = a[b];
                            n.some(function(a) {
                                if (a._node === c) return a.remove(), !0
                            })
                        }, c = 0; c < a.length; c++) b(c)
            },
            removeAll: function() {
                for (; n.length;) n[0].remove()
            }
        };
    i || g(), "undefined" != typeof module && module.exports ? module.exports = p : j && (a.Stickyfill = p)
}(window, document);


/*jshint browser:true */
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */
! function(o) {
    "use strict";
    o.fn.fitVids = function(t) {
        var e, i, d = {
            customSelector: null,
            ignore: null
        };
        return document.getElementById("fit-vids-style") || (e = document.head || document.getElementsByTagName("head")[0], (i = document.createElement("div")).innerHTML = '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>', e.appendChild(i.childNodes[1])), t && o.extend(d, t), this.each(function() {
            var t = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            d.customSelector && t.push(d.customSelector);
            var r = ".fitvidsignore";
            d.ignore && (r = r + ", " + d.ignore);
            t = o(this).find(t.join(","));
            (t = (t = t.not("object object")).not(r)).each(function() {
                var t, e, i = o(this);
                0 < i.parents(r).length || "embed" === this.tagName.toLowerCase() && i.parent("object").length || i.parent(".fluid-width-video-wrapper").length || (i.css("height") || i.css("width") || !isNaN(i.attr("height")) && !isNaN(i.attr("width")) || (i.attr("height", 9), i.attr("width", 16)), t = ("object" === this.tagName.toLowerCase() || i.attr("height") && !isNaN(parseInt(i.attr("height"), 10)) ? parseInt(i.attr("height"), 10) : i.height()) / (isNaN(parseInt(i.attr("width"), 10)) ? i.width() : parseInt(i.attr("width"), 10)), i.attr("name") || (e = "fitvid" + o.fn.fitVids._count, i.attr("name", e), o.fn.fitVids._count++), i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * t + "%"), i.removeAttr("height").removeAttr("width"))
            })
        })
    }, o.fn.fitVids._count = 0
}(window.jQuery || window.Zepto);


// ==================================================
// fancyBox v3.5.7
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2019 fancyApps
//
// ==================================================
! function(t, e, n, o) {
    "use strict";

    function i(t, e) {
        var o, i, a, s = [],
            r = 0;
        t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = h(t.data.options, e)), o = e.$target || n(t.currentTarget).trigger("blur"), (a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o) || (e.selector ? s = n(e.selector) : (i = o.attr("data-fancybox") || "", i ? (s = t.data ? t.data.items : [], s = s.length ? s.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' + i + '"]')) : s = [o]), r = n(s).index(o), r < 0 && (r = 0), a = n.fancybox.open(s, e, r), a.$trigger = o))
    }
    if (t.console = t.console || {
            info: function(t) {}
        }, n) {
        if (n.fn.fancybox) return void console.info("fancyBox already initialized");
        var a = {
                closeExisting: !1,
                loop: !1,
                gutter: 50,
                keyboard: !0,
                preventCaptionOverlap: !0,
                arrows: !0,
                infobar: !0,
                smallBtn: "auto",
                toolbar: "auto",
                buttons: ["zoom", "slideShow", "thumbs", "close"],
                idleTime: 3,
                protect: !1,
                modal: !1,
                image: {
                    preload: !1
                },
                ajax: {
                    settings: {
                        data: {
                            fancybox: !0
                        }
                    }
                },
                iframe: {
                    tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                    preload: !0,
                    css: {},
                    attr: {
                        scrolling: "auto"
                    }
                },
                video: {
                    tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                    format: "",
                    autoStart: !0
                },
                defaultType: "image",
                animationEffect: "zoom",
                animationDuration: 366,
                zoomOpacity: "auto",
                transitionEffect: "fade",
                transitionDuration: 366,
                slideClass: "",
                baseClass: "",
                baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                spinnerTpl: '<div class="fancybox-loading"></div>',
                errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                btnTpl: {
                    download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                    zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                    close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                    arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                    arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                    smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                },
                parentEl: "body",
                hideScrollbar: !0,
                autoFocus: !0,
                backFocus: !0,
                trapFocus: !0,
                fullScreen: {
                    autoStart: !1
                },
                touch: {
                    vertical: !0,
                    momentum: !0
                },
                hash: null,
                media: {},
                slideShow: {
                    autoStart: !1,
                    speed: 3e3
                },
                thumbs: {
                    autoStart: !1,
                    hideOnClose: !0,
                    parentEl: ".fancybox-container",
                    axis: "y"
                },
                wheel: "auto",
                onInit: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop,
                onActivate: n.noop,
                onDeactivate: n.noop,
                clickContent: function(t, e) {
                    return "image" === t.type && "zoom"
                },
                clickSlide: "close",
                clickOutside: "close",
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
                mobile: {
                    preventCaptionOverlap: !1,
                    idleTime: !1,
                    clickContent: function(t, e) {
                        return "image" === t.type && "toggleControls"
                    },
                    clickSlide: function(t, e) {
                        return "image" === t.type ? "toggleControls" : "close"
                    },
                    dblclickContent: function(t, e) {
                        return "image" === t.type && "zoom"
                    },
                    dblclickSlide: function(t, e) {
                        return "image" === t.type && "zoom"
                    }
                },
                lang: "en",
                i18n: {
                    en: {
                        CLOSE: "Close",
                        NEXT: "Next",
                        PREV: "Previous",
                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                        PLAY_START: "Start slideshow",
                        PLAY_STOP: "Pause slideshow",
                        FULL_SCREEN: "Full screen",
                        THUMBS: "Thumbnails",
                        DOWNLOAD: "Download",
                        SHARE: "Share",
                        ZOOM: "Zoom"
                    },
                    de: {
                        CLOSE: "Schlie&szlig;en",
                        NEXT: "Weiter",
                        PREV: "Zur&uuml;ck",
                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                        PLAY_START: "Diaschau starten",
                        PLAY_STOP: "Diaschau beenden",
                        FULL_SCREEN: "Vollbild",
                        THUMBS: "Vorschaubilder",
                        DOWNLOAD: "Herunterladen",
                        SHARE: "Teilen",
                        ZOOM: "Vergr&ouml;&szlig;ern"
                    }
                }
            },
            s = n(t),
            r = n(e),
            c = 0,
            l = function(t) {
                return t && t.hasOwnProperty && t instanceof n
            },
            d = function() {
                return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                    return t.setTimeout(e, 1e3 / 60)
                }
            }(),
            u = function() {
                return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                    t.clearTimeout(e)
                }
            }(),
            f = function() {
                var t, n = e.createElement("fakeelement"),
                    o = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (t in o)
                    if (void 0 !== n.style[t]) return o[t];
                return "transitionend"
            }(),
            p = function(t) {
                return t && t.length && t[0].offsetHeight
            },
            h = function(t, e) {
                var o = n.extend(!0, {}, t, e);
                return n.each(e, function(t, e) {
                    n.isArray(e) && (o[t] = e)
                }), o
            },
            g = function(t) {
                var o, i;
                return !(!t || t.ownerDocument !== e) && (n(".fancybox-container").css("pointer-events", "none"), o = {
                    x: t.getBoundingClientRect().left + t.offsetWidth / 2,
                    y: t.getBoundingClientRect().top + t.offsetHeight / 2
                }, i = e.elementFromPoint(o.x, o.y) === t, n(".fancybox-container").css("pointer-events", ""), i)
            },
            b = function(t, e, o) {
                var i = this;
                i.opts = h({
                    index: o
                }, n.fancybox.defaults), n.isPlainObject(e) && (i.opts = h(i.opts, e)), n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)), i.id = i.opts.id || ++c, i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, i.prevPos = null, i.currPos = 0, i.firstRun = !0, i.group = [], i.slides = {}, i.addContent(t), i.group.length && i.init()
            };
        n.extend(b.prototype, {
                init: function() {
                    var o, i, a = this,
                        s = a.group[a.currIndex],
                        r = s.opts;
                    r.closeExisting && n.fancybox.close(!0), n("body").addClass("fancybox-active"), !n.fancybox.getInstance() && !1 !== r.hideScrollbar && !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (t.innerWidth - e.documentElement.clientWidth) + "px;}</style>"), n("body").addClass("compensate-for-scrollbar")), i = "", n.each(r.buttons, function(t, e) {
                        i += r.btnTpl[e] || ""
                    }), o = n(a.translate(a, r.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight))).attr("id", "fancybox-container-" + a.id).addClass(r.baseClass).data("FancyBox", a).appendTo(r.parentEl), a.$refs = {
                        container: o
                    }, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function(t) {
                        a.$refs[t] = o.find(".fancybox-" + t)
                    }), a.trigger("onInit"), a.activate(), a.jumpTo(a.currIndex)
                },
                translate: function(t, e) {
                    var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
                    return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                        return void 0 === n[e] ? t : n[e]
                    })
                },
                addContent: function(t) {
                    var e, o = this,
                        i = n.makeArray(t);
                    n.each(i, function(t, e) {
                        var i, a, s, r, c, l = {},
                            d = {};
                        n.isPlainObject(e) ? (l = e, d = e.opts || e) : "object" === n.type(e) && n(e).length ? (i = n(e), d = i.data() || {}, d = n.extend(!0, {}, d, d.options), d.$orig = i, l.src = o.opts.src || d.src || i.attr("href"), l.type || l.src || (l.type = "inline", l.src = e)) : l = {
                            type: "html",
                            src: e + ""
                        }, l.opts = n.extend(!0, {}, o.opts, d), n.isArray(d.buttons) && (l.opts.buttons = d.buttons), n.fancybox.isMobile && l.opts.mobile && (l.opts = h(l.opts, l.opts.mobile)), a = l.type || l.opts.type, r = l.src || "", !a && r && ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (a = "video", l.opts.video.format || (l.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? a = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? (a = "iframe", l = n.extend(!0, l, {
                            contentType: "pdf",
                            opts: {
                                iframe: {
                                    preload: !1
                                }
                            }
                        })) : "#" === r.charAt(0) && (a = "inline")), a ? l.type = a : o.trigger("objectNeedsType", l), l.contentType || (l.contentType = n.inArray(l.type, ["html", "inline", "ajax"]) > -1 ? "html" : l.type), l.index = o.group.length, "auto" == l.opts.smallBtn && (l.opts.smallBtn = n.inArray(l.type, ["html", "inline", "ajax"]) > -1), "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn), l.$thumb = l.opts.$thumb || null, l.opts.$trigger && l.index === o.opts.index && (l.$thumb = l.opts.$trigger.find("img:first"), l.$thumb.length && (l.opts.$orig = l.opts.$trigger)), l.$thumb && l.$thumb.length || !l.opts.$orig || (l.$thumb = l.opts.$orig.find("img:first")), l.$thumb && !l.$thumb.length && (l.$thumb = null), l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null), "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(e, [o, l])), "function" === n.type(o.opts.caption) && (l.opts.caption = o.opts.caption.apply(e, [o, l])), l.opts.caption instanceof n || (l.opts.caption = void 0 === l.opts.caption ? "" : l.opts.caption + ""), "ajax" === l.type && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                            trapFocus: !0,
                            infobar: 0,
                            toolbar: 0,
                            smallBtn: 0,
                            keyboard: 0,
                            slideShow: 0,
                            fullScreen: 0,
                            thumbs: 0,
                            touch: 0,
                            clickContent: !1,
                            clickSlide: !1,
                            clickOutside: !1,
                            dblclickContent: !1,
                            dblclickSlide: !1,
                            dblclickOutside: !1
                        })), o.group.push(l)
                    }), Object.keys(o.slides).length && (o.updateControls(), (e = o.Thumbs) && e.isActive && (e.create(), e.focus()))
                },
                addEvents: function() {
                    var e = this;
                    e.removeEvents(), e.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.close(t)
                    }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.previous()
                    }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
                        t.stopPropagation(), t.preventDefault(), e.next()
                    }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                        e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                    }), s.on("orientationchange.fb resize.fb", function(t) {
                        t && t.originalEvent && "resize" === t.originalEvent.type ? (e.requestId && u(e.requestId), e.requestId = d(function() {
                            e.update(t)
                        })) : (e.current && "iframe" === e.current.type && e.$refs.stage.hide(), setTimeout(function() {
                            e.$refs.stage.show(), e.update(t)
                        }, n.fancybox.isMobile ? 600 : 250))
                    }), r.on("keydown.fb", function(t) {
                        var o = n.fancybox ? n.fancybox.getInstance() : null,
                            i = o.current,
                            a = t.keyCode || t.which;
                        if (9 == a) return void(i.opts.trapFocus && e.focus(t));
                        if (!(!i.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || n(t.target).is("input,textarea,video,audio,select"))) return 8 === a || 27 === a ? (t.preventDefault(), void e.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void e.previous()) : 39 === a || 40 === a ? (t.preventDefault(), void e.next()) : void e.trigger("afterKeydown", t, a)
                    }), e.group[e.currIndex].opts.idleTime && (e.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                        e.idleSecondsCounter = 0, e.isIdle && e.showControls(), e.isIdle = !1
                    }), e.idleInterval = t.setInterval(function() {
                        ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime && !e.isDragging && (e.isIdle = !0, e.idleSecondsCounter = 0, e.hideControls())
                    }, 1e3))
                },
                removeEvents: function() {
                    var e = this;
                    s.off("orientationchange.fb resize.fb"), r.off("keydown.fb .fb-idle"), this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), e.idleInterval = null)
                },
                previous: function(t) {
                    return this.jumpTo(this.currPos - 1, t)
                },
                next: function(t) {
                    return this.jumpTo(this.currPos + 1, t)
                },
                jumpTo: function(t, e) {
                    var o, i, a, s, r, c, l, d, u, f = this,
                        h = f.group.length;
                    if (!(f.isDragging || f.isClosing || f.isAnimating && f.firstRun)) {
                        if (t = parseInt(t, 10), !(a = f.current ? f.current.opts.loop : f.opts.loop) && (t < 0 || t >= h)) return !1;
                        if (o = f.firstRun = !Object.keys(f.slides).length, r = f.current, f.prevIndex = f.currIndex, f.prevPos = f.currPos, s = f.createSlide(t), h > 1 && ((a || s.index < h - 1) && f.createSlide(t + 1), (a || s.index > 0) && f.createSlide(t - 1)), f.current = s, f.currIndex = s.index, f.currPos = s.pos, f.trigger("beforeShow", o), f.updateControls(), s.forcedDuration = void 0, n.isNumeric(e) ? s.forcedDuration = e : e = s.opts[o ? "animationDuration" : "transitionDuration"], e = parseInt(e, 10), i = f.isMoved(s), s.$slide.addClass("fancybox-slide--current"), o) return s.opts.animationEffect && e && f.$refs.container.css("transition-duration", e + "ms"), f.$refs.container.addClass("fancybox-is-open").trigger("focus"), f.loadSlide(s), void f.preload("image");
                        c = n.fancybox.getTranslate(r.$slide), l = n.fancybox.getTranslate(f.$refs.stage), n.each(f.slides, function(t, e) {
                            n.fancybox.stop(e.$slide, !0)
                        }), r.pos !== s.pos && (r.isComplete = !1), r.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"), i ? (u = c.left - (r.pos * c.width + r.pos * r.opts.gutter), n.each(f.slides, function(t, o) {
                            o.$slide.removeClass("fancybox-animated").removeClass(function(t, e) {
                                return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                            });
                            var i = o.pos * c.width + o.pos * o.opts.gutter;
                            n.fancybox.setTranslate(o.$slide, {
                                top: 0,
                                left: i - l.left + u
                            }), o.pos !== s.pos && o.$slide.addClass("fancybox-slide--" + (o.pos > s.pos ? "next" : "previous")), p(o.$slide), n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: (o.pos - s.pos) * c.width + (o.pos - s.pos) * o.opts.gutter
                            }, e, function() {
                                o.$slide.css({
                                    transform: "",
                                    opacity: ""
                                }).removeClass("fancybox-slide--next fancybox-slide--previous"), o.pos === f.currPos && f.complete()
                            })
                        })) : e && s.opts.transitionEffect && (d = "fancybox-animated fancybox-fx-" + s.opts.transitionEffect, r.$slide.addClass("fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")), n.fancybox.animate(r.$slide, d, e, function() {
                            r.$slide.removeClass(d).removeClass("fancybox-slide--next fancybox-slide--previous")
                        }, !1)), s.isLoaded ? f.revealContent(s) : f.loadSlide(s), f.preload("image")
                    }
                },
                createSlide: function(t) {
                    var e, o, i = this;
                    return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i.slides[t] = n.extend(!0, {}, i.group[o], {
                        pos: t,
                        $slide: e,
                        isLoaded: !1
                    }), i.updateSlide(i.slides[t])), i.slides[t]
                },
                scaleToActual: function(t, e, o) {
                    var i, a, s, r, c, l = this,
                        d = l.current,
                        u = d.$content,
                        f = n.fancybox.getTranslate(d.$slide).width,
                        p = n.fancybox.getTranslate(d.$slide).height,
                        h = d.width,
                        g = d.height;
                    l.isAnimating || l.isMoved() || !u || "image" != d.type || !d.isLoaded || d.hasError || (l.isAnimating = !0, n.fancybox.stop(u), t = void 0 === t ? .5 * f : t, e = void 0 === e ? .5 * p : e, i = n.fancybox.getTranslate(u), i.top -= n.fancybox.getTranslate(d.$slide).top, i.left -= n.fancybox.getTranslate(d.$slide).left, r = h / i.width, c = g / i.height, a = .5 * f - .5 * h, s = .5 * p - .5 * g, h > f && (a = i.left * r - (t * r - t), a > 0 && (a = 0), a < f - h && (a = f - h)), g > p && (s = i.top * c - (e * c - e), s > 0 && (s = 0), s < p - g && (s = p - g)), l.updateCursor(h, g), n.fancybox.animate(u, {
                        top: s,
                        left: a,
                        scaleX: r,
                        scaleY: c
                    }, o || 366, function() {
                        l.isAnimating = !1
                    }), l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
                },
                scaleToFit: function(t) {
                    var e, o = this,
                        i = o.current,
                        a = i.$content;
                    o.isAnimating || o.isMoved() || !a || "image" != i.type || !i.isLoaded || i.hasError || (o.isAnimating = !0, n.fancybox.stop(a), e = o.getFitPos(i), o.updateCursor(e.width, e.height), n.fancybox.animate(a, {
                        top: e.top,
                        left: e.left,
                        scaleX: e.width / a.width(),
                        scaleY: e.height / a.height()
                    }, t || 366, function() {
                        o.isAnimating = !1
                    }))
                },
                getFitPos: function(t) {
                    var e, o, i, a, s = this,
                        r = t.$content,
                        c = t.$slide,
                        l = t.width || t.opts.width,
                        d = t.height || t.opts.height,
                        u = {};
                    return !!(t.isLoaded && r && r.length) && (e = n.fancybox.getTranslate(s.$refs.stage).width, o = n.fancybox.getTranslate(s.$refs.stage).height, e -= parseFloat(c.css("paddingLeft")) + parseFloat(c.css("paddingRight")) + parseFloat(r.css("marginLeft")) + parseFloat(r.css("marginRight")), o -= parseFloat(c.css("paddingTop")) + parseFloat(c.css("paddingBottom")) + parseFloat(r.css("marginTop")) + parseFloat(r.css("marginBottom")), l && d || (l = e, d = o), i = Math.min(1, e / l, o / d), l *= i, d *= i, l > e - .5 && (l = e), d > o - .5 && (d = o), "image" === t.type ? (u.top = Math.floor(.5 * (o - d)) + parseFloat(c.css("paddingTop")), u.left = Math.floor(.5 * (e - l)) + parseFloat(c.css("paddingLeft"))) : "video" === t.contentType && (a = t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9, d > l / a ? d = l / a : l > d * a && (l = d * a)), u.width = l, u.height = d, u)
                },
                update: function(t) {
                    var e = this;
                    n.each(e.slides, function(n, o) {
                        e.updateSlide(o, t)
                    })
                },
                updateSlide: function(t, e) {
                    var o = this,
                        i = t && t.$content,
                        a = t.width || t.opts.width,
                        s = t.height || t.opts.height,
                        r = t.$slide;
                    o.adjustCaption(t), i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o.updateCursor())), o.adjustLayout(t), r.length && (r.trigger("refresh"), t.pos === o.currPos && o.$refs.toolbar.add(o.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", r.get(0).scrollHeight > r.get(0).clientHeight)), o.trigger("onUpdate", t, e)
                },
                centerSlide: function(t) {
                    var e = this,
                        o = e.current,
                        i = o.$slide;
                    !e.isClosing && o && (i.siblings().css({
                        transform: "",
                        opacity: ""
                    }), i.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), n.fancybox.animate(i, {
                        top: 0,
                        left: 0,
                        opacity: 1
                    }, void 0 === t ? 0 : t, function() {
                        i.css({
                            transform: "",
                            opacity: ""
                        }), o.isComplete || e.complete()
                    }, !1))
                },
                isMoved: function(t) {
                    var e, o, i = t || this.current;
                    return !!i && (o = n.fancybox.getTranslate(this.$refs.stage), e = n.fancybox.getTranslate(i.$slide), !i.$slide.hasClass("fancybox-animated") && (Math.abs(e.top - o.top) > .5 || Math.abs(e.left - o.left) > .5))
                },
                updateCursor: function(t, e) {
                    var o, i, a = this,
                        s = a.current,
                        r = a.$refs.container;
                    s && !a.isClosing && a.Guestures && (r.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = a.canPan(t, e), i = !!o || a.isZoomable(), r.toggleClass("fancybox-is-zoomable", i), n("[data-fancybox-zoom]").prop("disabled", !i), o ? r.addClass("fancybox-can-pan") : i && ("zoom" === s.opts.clickContent || n.isFunction(s.opts.clickContent) && "zoom" == s.opts.clickContent(s)) ? r.addClass("fancybox-can-zoomIn") : s.opts.touch && (s.opts.touch.vertical || a.group.length > 1) && "video" !== s.contentType && r.addClass("fancybox-can-swipe"))
                },
                isZoomable: function() {
                    var t, e = this,
                        n = e.current;
                    if (n && !e.isClosing && "image" === n.type && !n.hasError) {
                        if (!n.isLoaded) return !0;
                        if ((t = e.getFitPos(n)) && (n.width > t.width || n.height > t.height)) return !0
                    }
                    return !1
                },
                isScaledDown: function(t, e) {
                    var o = this,
                        i = !1,
                        a = o.current,
                        s = a.$content;
                    return void 0 !== t && void 0 !== e ? i = t < a.width && e < a.height : s && (i = n.fancybox.getTranslate(s), i = i.width < a.width && i.height < a.height), i
                },
                canPan: function(t, e) {
                    var o = this,
                        i = o.current,
                        a = null,
                        s = !1;
                    return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = o.getFitPos(i), void 0 !== t && void 0 !== e ? a = {
                        width: t,
                        height: e
                    } : i.isComplete && (a = n.fancybox.getTranslate(i.$content)), a && s && (s = Math.abs(a.width - s.width) > 1.5 || Math.abs(a.height - s.height) > 1.5)), s
                },
                loadSlide: function(t) {
                    var e, o, i, a = this;
                    if (!t.isLoading && !t.isLoaded) {
                        if (t.isLoading = !0, !1 === a.trigger("beforeLoad", t)) return t.isLoading = !1, !1;
                        switch (e = t.type, o = t.$slide, o.off("refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
                            case "image":
                                a.setImage(t);
                                break;
                            case "iframe":
                                a.setIframe(t);
                                break;
                            case "html":
                                a.setContent(t, t.src || t.content);
                                break;
                            case "video":
                                a.setContent(t, t.opts.video.tpl.replace(/\{\{src\}\}/gi, t.src).replace("{{format}}", t.opts.videoFormat || t.opts.video.format || "").replace("{{poster}}", t.thumb || ""));
                                break;
                            case "inline":
                                n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
                                break;
                            case "ajax":
                                a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
                                    url: t.src,
                                    success: function(e, n) {
                                        "success" === n && a.setContent(t, e)
                                    },
                                    error: function(e, n) {
                                        e && "abort" !== n && a.setError(t)
                                    }
                                })), o.one("onReset", function() {
                                    i.abort()
                                });
                                break;
                            default:
                                a.setError(t)
                        }
                        return !0
                    }
                },
                setImage: function(t) {
                    var o, i = this;
                    setTimeout(function() {
                        var e = t.$image;
                        i.isClosing || !t.isLoading || e && e.length && e[0].complete || t.hasError || i.showLoading(t)
                    }, 50), i.checkSrcset(t), t.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(t.$slide.addClass("fancybox-slide--image")), !1 !== t.opts.preload && t.opts.width && t.opts.height && t.thumb && (t.width = t.opts.width, t.height = t.opts.height, o = e.createElement("img"), o.onerror = function() {
                        n(this).remove(), t.$ghost = null
                    }, o.onload = function() {
                        i.afterLoad(t)
                    }, t.$ghost = n(o).addClass("fancybox-image").appendTo(t.$content).attr("src", t.thumb)), i.setBigImage(t)
                },
                checkSrcset: function(e) {
                    var n, o, i, a, s = e.opts.srcset || e.opts.image.srcset;
                    if (s) {
                        i = t.devicePixelRatio || 1, a = t.innerWidth * i, o = s.split(",").map(function(t) {
                            var e = {};
                            return t.trim().split(/\s+/).forEach(function(t, n) {
                                var o = parseInt(t.substring(0, t.length - 1), 10);
                                if (0 === n) return e.url = t;
                                o && (e.value = o, e.postfix = t[t.length - 1])
                            }), e
                        }), o.sort(function(t, e) {
                            return t.value - e.value
                        });
                        for (var r = 0; r < o.length; r++) {
                            var c = o[r];
                            if ("w" === c.postfix && c.value >= a || "x" === c.postfix && c.value >= i) {
                                n = c;
                                break
                            }
                        }!n && o.length && (n = o[o.length - 1]), n && (e.src = n.url, e.width && e.height && "w" == n.postfix && (e.height = e.width / e.height * n.value, e.width = n.value), e.opts.srcset = s)
                    }
                },
                setBigImage: function(t) {
                    var o = this,
                        i = e.createElement("img"),
                        a = n(i);
                    t.$image = a.one("error", function() {
                        o.setError(t)
                    }).one("load", function() {
                        var e;
                        t.$ghost || (o.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight), o.afterLoad(t)), o.isClosing || (t.opts.srcset && (e = t.opts.sizes, e && "auto" !== e || (e = (t.width / t.height > 1 && s.width() / s.height() > 1 ? "100" : Math.round(t.width / t.height * 100)) + "vw"), a.attr("sizes", e).attr("srcset", t.opts.srcset)), t.$ghost && setTimeout(function() {
                            t.$ghost && !o.isClosing && t.$ghost.hide()
                        }, Math.min(300, Math.max(1e3, t.height / 1600))), o.hideLoading(t))
                    }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (i.complete || "complete" == i.readyState) && a.naturalWidth && a.naturalHeight ? a.trigger("load") : i.error && a.trigger("error")
                },
                resolveImageSlideSize: function(t, e, n) {
                    var o = parseInt(t.opts.width, 10),
                        i = parseInt(t.opts.height, 10);
                    t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i > 0 && (t.width = Math.floor(i * e / n), t.height = i)
                },
                setIframe: function(t) {
                    var e, o = this,
                        i = t.opts.iframe,
                        a = t.$slide;
                    t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(a), a.addClass("fancybox-slide--" + t.contentType), t.$iframe = e = n(i.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(i.attr).appendTo(t.$content), i.preload ? (o.showLoading(t), e.on("load.fb error.fb", function(e) {
                        this.isReady = 1, t.$slide.trigger("refresh"), o.afterLoad(t)
                    }), a.on("refresh.fb", function() {
                        var n, o, s = t.$content,
                            r = i.css.width,
                            c = i.css.height;
                        if (1 === e[0].isReady) {
                            try {
                                n = e.contents(), o = n.find("body")
                            } catch (t) {}
                            o && o.length && o.children().length && (a.css("overflow", "visible"), s.css({
                                width: "100%",
                                "max-width": "100%",
                                height: "9999px"
                            }), void 0 === r && (r = Math.ceil(Math.max(o[0].clientWidth, o.outerWidth(!0)))), s.css("width", r || "").css("max-width", ""), void 0 === c && (c = Math.ceil(Math.max(o[0].clientHeight, o.outerHeight(!0)))), s.css("height", c || ""), a.css("overflow", "auto")), s.removeClass("fancybox-is-hidden")
                        }
                    })) : o.afterLoad(t), e.attr("src", t.src), a.one("onReset", function() {
                        try {
                            n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                        } catch (t) {}
                        n(this).off("refresh.fb").empty(), t.isLoaded = !1, t.isRevealed = !1
                    })
                },
                setContent: function(t, e) {
                    var o = this;
                    o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide.empty(), l(e) && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents()), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function() {
                        n(this).find("video,audio").trigger("pause"), t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null), t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
                    }), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass("fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), o.afterLoad(t))
                },
                setError: function(t) {
                    t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
                },
                showLoading: function(t) {
                    var e = this;
                    (t = t || e.current) && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
                },
                hideLoading: function(t) {
                    var e = this;
                    (t = t || e.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
                },
                afterLoad: function(t) {
                    var e = this;
                    e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                        return 2 == t.button && t.preventDefault(), !0
                    }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
                },
                adjustCaption: function(t) {
                    var e, n = this,
                        o = t || n.current,
                        i = o.opts.caption,
                        a = o.opts.preventCaptionOverlap,
                        s = n.$refs.caption,
                        r = !1;
                    s.toggleClass("fancybox-caption--separate", a), a && i && i.length && (o.pos !== n.currPos ? (e = s.clone().appendTo(s.parent()), e.children().eq(0).empty().html(i), r = e.outerHeight(!0), e.empty().remove()) : n.$caption && (r = n.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
                },
                adjustLayout: function(t) {
                    var e, n, o, i, a = this,
                        s = t || a.current;
                    s.isLoaded && !0 !== s.opts.disableLayoutFix && (s.$content.css("margin-bottom", ""), s.$content.outerHeight() > s.$slide.height() + .5 && (o = s.$slide[0].style["padding-bottom"], i = s.$slide.css("padding-bottom"), parseFloat(i) > 0 && (e = s.$slide[0].scrollHeight, s.$slide.css("padding-bottom", 0), Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i), s.$slide.css("padding-bottom", o))), s.$content.css("margin-bottom", n))
                },
                revealContent: function(t) {
                    var e, o, i, a, s = this,
                        r = t.$slide,
                        c = !1,
                        l = !1,
                        d = s.isMoved(t),
                        u = t.isRevealed;
                    return t.isRevealed = !0, e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"], i = parseInt(void 0 === t.forcedDuration ? i : t.forcedDuration, 10), !d && t.pos === s.currPos && i || (e = !1), "zoom" === e && (t.pos === s.currPos && i && "image" === t.type && !t.hasError && (l = s.getThumbPos(t)) ? c = s.getFitPos(t) : e = "fade"), "zoom" === e ? (s.isAnimating = !0, c.scaleX = c.width / l.width, c.scaleY = c.height / l.height, a = t.opts.zoomOpacity, "auto" == a && (a = Math.abs(t.width / t.height - l.width / l.height) > .1), a && (l.opacity = .1, c.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l), p(t.$content), void n.fancybox.animate(t.$content, c, i, function() {
                        s.isAnimating = !1, s.complete()
                    })) : (s.updateSlide(t), e ? (n.fancybox.stop(r), o = "fancybox-slide--" + (t.pos >= s.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, r.addClass(o).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), p(r), "image" !== t.type && t.$content.hide().show(0), void n.fancybox.animate(r, "fancybox-slide--current", i, function() {
                        r.removeClass(o).css({
                            transform: "",
                            opacity: ""
                        }), t.pos === s.currPos && s.complete()
                    }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), u || !d || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void(t.pos === s.currPos && s.complete())))
                },
                getThumbPos: function(t) {
                    var e, o, i, a, s, r = !1,
                        c = t.$thumb;
                    return !(!c || !g(c[0])) && (e = n.fancybox.getTranslate(c), o = parseFloat(c.css("border-top-width") || 0), i = parseFloat(c.css("border-right-width") || 0), a = parseFloat(c.css("border-bottom-width") || 0), s = parseFloat(c.css("border-left-width") || 0), r = {
                        top: e.top + o,
                        left: e.left + s,
                        width: e.width - i - s,
                        height: e.height - o - a,
                        scaleX: 1,
                        scaleY: 1
                    }, e.width > 0 && e.height > 0 && r)
                },
                complete: function() {
                    var t, e = this,
                        o = e.current,
                        i = {};
                    !e.isMoved() && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), e.preload("inline"), p(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(e.slides, function(t, o) {
                        o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1 ? i[o.pos] = o : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove())
                    }), e.slides = i), e.isAnimating = !1, e.updateCursor(), e.trigger("afterShow"), o.opts.video.autoStart && o.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function() {
                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(), e.next()
                    }), o.opts.autoFocus && "html" === o.contentType && (t = o.$content.find("input[autofocus]:enabled:visible:first"), t.length ? t.trigger("focus") : e.focus(null, !0)), o.$slide.scrollTop(0).scrollLeft(0))
                },
                preload: function(t) {
                    var e, n, o = this;
                    o.group.length < 2 || (n = o.slides[o.currPos + 1], e = o.slides[o.currPos - 1], e && e.type === t && o.loadSlide(e), n && n.type === t && o.loadSlide(n))
                },
                focus: function(t, o) {
                    var i, a, s = this,
                        r = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                    s.isClosing || (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (o ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible"), i = i.filter(r).filter(function() {
                        return "hidden" !== n(this).css("visibility") && !n(this).hasClass("disabled")
                    }), i.length ? (a = i.index(e.activeElement), t && t.shiftKey ? (a < 0 || 0 == a) && (t.preventDefault(), i.eq(i.length - 1).trigger("focus")) : (a < 0 || a == i.length - 1) && (t && t.preventDefault(), i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
                },
                activate: function() {
                    var t = this;
                    n(".fancybox-container").each(function() {
                        var e = n(this).data("FancyBox");
                        e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), e.isVisible = !1)
                    }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t.trigger("onActivate"), t.addEvents()
                },
                close: function(t, e) {
                    var o, i, a, s, r, c, l, u = this,
                        f = u.current,
                        h = function() {
                            u.cleanUp(t)
                        };
                    return !u.isClosing && (u.isClosing = !0, !1 === u.trigger("beforeClose", t) ? (u.isClosing = !1, d(function() {
                        u.update()
                    }), !1) : (u.removeEvents(), a = f.$content, o = f.opts.animationEffect, i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0, f.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? n.fancybox.stop(f.$slide) : o = !1, f.$slide.siblings().trigger("onReset").remove(), i && u.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", i + "ms"), u.hideLoading(f), u.hideControls(!0), u.updateCursor(), "zoom" !== o || a && i && "image" === f.type && !u.isMoved() && !f.hasError && (l = u.getThumbPos(f)) || (o = "fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a), c = {
                            top: s.top,
                            left: s.left,
                            scaleX: s.width / l.width,
                            scaleY: s.height / l.height,
                            width: l.width,
                            height: l.height
                        }, r = f.opts.zoomOpacity,
                        "auto" == r && (r = Math.abs(f.width / f.height - l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox.setTranslate(a, c), p(a), n.fancybox.animate(a, l, i, h), !0) : (o && i ? n.fancybox.animate(f.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, i, h) : !0 === t ? setTimeout(h, i) : h(), !0)))
                },
                cleanUp: function(e) {
                    var o, i, a, s = this,
                        r = s.current.opts.$orig;
                    s.current.$slide.trigger("onReset"), s.$refs.container.empty().remove(), s.trigger("afterClose", e), s.current.opts.backFocus && (r && r.length && r.is(":visible") || (r = s.$trigger), r && r.length && (i = t.scrollX, a = t.scrollY, r.trigger("focus"), n("html, body").scrollTop(a).scrollLeft(i))), s.current = null, o = n.fancybox.getInstance(), o ? o.activate() : (n("body").removeClass("fancybox-active compensate-for-scrollbar"), n("#fancybox-style-noscroll").remove())
                },
                trigger: function(t, e) {
                    var o, i = Array.prototype.slice.call(arguments, 1),
                        a = this,
                        s = e && e.opts ? e : a.current;
                    if (s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)), !1 === o) return o;
                    "afterClose" !== t && a.$refs ? a.$refs.container.trigger(t + ".fb", i) : r.trigger(t + ".fb", i)
                },
                updateControls: function() {
                    var t = this,
                        o = t.current,
                        i = o.index,
                        a = t.$refs.container,
                        s = t.$refs.caption,
                        r = o.opts.caption;
                    o.$slide.trigger("refresh"), r && r.length ? (t.$caption = s, s.children().eq(0).html(r)) : t.$caption = null, t.hasHiddenControls || t.isIdle || t.showControls(), a.find("[data-fancybox-count]").html(t.group.length), a.find("[data-fancybox-index]").html(i + 1), a.find("[data-fancybox-prev]").prop("disabled", !o.opts.loop && i <= 0), a.find("[data-fancybox-next]").prop("disabled", !o.opts.loop && i >= t.group.length - 1), "image" === o.type ? a.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", o.opts.image.src || o.src).show() : o.opts.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(), n(e.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
                },
                hideControls: function(t) {
                    var e = this,
                        n = ["infobar", "toolbar", "nav"];
                    !t && e.current.opts.preventCaptionOverlap || n.push("caption"), this.$refs.container.removeClass(n.map(function(t) {
                        return "fancybox-show-" + t
                    }).join(" ")), this.hasHiddenControls = !0
                },
                showControls: function() {
                    var t = this,
                        e = t.current ? t.current.opts : t.opts,
                        n = t.$refs.container;
                    t.hasHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal)
                },
                toggleControls: function() {
                    this.hasHiddenControls ? this.showControls() : this.hideControls()
                }
            }), n.fancybox = {
                version: "3.5.7",
                defaults: a,
                getInstance: function(t) {
                    var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                        o = Array.prototype.slice.call(arguments, 1);
                    return e instanceof b && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), e)
                },
                open: function(t, e, n) {
                    return new b(t, e, n)
                },
                close: function(t) {
                    var e = this.getInstance();
                    e && (e.close(), !0 === t && this.close(t))
                },
                destroy: function() {
                    this.close(!0), r.add("body").off("click.fb-start", "**")
                },
                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                use3d: function() {
                    var n = e.createElement("div");
                    return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11)
                }(),
                getTranslate: function(t) {
                    var e;
                    return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
                        top: e.top || 0,
                        left: e.left || 0,
                        width: e.width,
                        height: e.height,
                        opacity: parseFloat(t.css("opacity"))
                    })
                },
                setTranslate: function(t, e) {
                    var n = "",
                        o = {};
                    if (t && e) return void 0 === e.left && void 0 === e.top || (n = (void 0 === e.left ? t.position().left : e.left) + "px, " + (void 0 === e.top ? t.position().top : e.top) + "px", n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), void 0 !== e.scaleX && void 0 !== e.scaleY ? n += " scale(" + e.scaleX + ", " + e.scaleY + ")" : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"), n.length && (o.transform = n), void 0 !== e.opacity && (o.opacity = e.opacity), void 0 !== e.width && (o.width = e.width), void 0 !== e.height && (o.height = e.height), t.css(o)
                },
                animate: function(t, e, o, i, a) {
                    var s, r = this;
                    n.isFunction(o) && (i = o, o = null), r.stop(t), s = r.getTranslate(t), t.on(f, function(c) {
                        (!c || !c.originalEvent || t.is(c.originalEvent.target) && "z-index" != c.originalEvent.propertyName) && (r.stop(t), n.isNumeric(o) && t.css("transition-duration", ""), n.isPlainObject(e) ? void 0 !== e.scaleX && void 0 !== e.scaleY && r.setTranslate(t, {
                            top: e.top,
                            left: e.left,
                            width: s.width * e.scaleX,
                            height: s.height * e.scaleY,
                            scaleX: 1,
                            scaleY: 1
                        }) : !0 !== a && t.removeClass(e), n.isFunction(i) && i(c))
                    }), n.isNumeric(o) && t.css("transition-duration", o + "ms"), n.isPlainObject(e) ? (void 0 !== e.scaleX && void 0 !== e.scaleY && (delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") && t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t.addClass(e), t.data("timer", setTimeout(function() {
                        t.trigger(f)
                    }, o + 33))
                },
                stop: function(t, e) {
                    t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(f), t.off(f).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
                }
            }, n.fn.fancybox = function(t) {
                var e;
                return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                    options: t
                }, i) : this.off("click.fb-start").on("click.fb-start", {
                    items: this,
                    options: t
                }, i), this
            }, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-fancybox-trigger]", function(t) {
                n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]').eq(n(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                    $trigger: n(this)
                })
            }),
            function() {
                var t = null;
                r.on("mousedown mouseup focus blur", ".fancybox-button", function(e) {
                    switch (e.type) {
                        case "mousedown":
                            t = n(this);
                            break;
                        case "mouseup":
                            t = null;
                            break;
                        case "focusin":
                            n(".fancybox-button").removeClass("fancybox-focus"), n(this).is(t) || n(this).is("[disabled]") || n(this).addClass("fancybox-focus");
                            break;
                        case "focusout":
                            n(".fancybox-button").removeClass("fancybox-focus")
                    }
                })
            }()
    }
}(window, document, jQuery),
function(t) {
    "use strict";
    var e = {
            youtube: {
                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: "transparent",
                    enablejsapi: 1,
                    html5: 1
                },
                paramPlace: 8,
                type: "iframe",
                url: "https://www.youtube-nocookie.com/embed/$4",
                thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
            },
            vimeo: {
                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                paramPlace: 3,
                type: "iframe",
                url: "//player.vimeo.com/video/$2"
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: "image",
                url: "//$1/p/$2/media/?size=l"
            },
            gmap_place: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
                }
            },
            gmap_search: {
                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                type: "iframe",
                url: function(t) {
                    return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                }
            }
        },
        n = function(e, n, o) {
            if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
                e = e.replace("$" + t, n || "")
            }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
        };
    t(document).on("objectNeedsType.fb", function(o, i, a) {
        var s, r, c, l, d, u, f, p = a.src || "",
            h = !1;
        s = t.extend(!0, {}, e, a.opts.media), t.each(s, function(e, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, f = e, u = {}, o.paramPlace && c[o.paramPlace]) {
                    d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
                    for (var i = 0; i < d.length; ++i) {
                        var s = d[i].split("=", 2);
                        2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
                    }
                }
                return l = t.extend(!0, {}, o.params, a.opts[e], u), p = "function" === t.type(o.url) ? o.url.call(this, c, l, a) : n(o.url, c, l), r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, a) : n(o.thumb, c), "youtube" === e ? p = p.replace(/&t=((\d+)m)?(\d+)s/, function(t, e, n, o) {
                    return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                }) : "vimeo" === e && (p = p.replace("&%23", "#")), !1
            }
        }), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" === h && (a.opts = t.extend(!0, a.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        })), t.extend(a, {
            type: h,
            src: p,
            origSrc: a.src,
            contentSource: f,
            contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" : "video"
        })) : p && (a.type = a.opts.defaultType)
    });
    var o = {
        youtube: {
            src: "https://www.youtube.com/iframe_api",
            class: "YT",
            loading: !1,
            loaded: !1
        },
        vimeo: {
            src: "https://player.vimeo.com/api/player.js",
            class: "Vimeo",
            loading: !1,
            loaded: !1
        },
        load: function(t) {
            var e, n = this;
            if (this[t].loaded) return void setTimeout(function() {
                n.done(t)
            });
            this[t].loading || (this[t].loading = !0, e = document.createElement("script"), e.type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function() {
                n[t].loaded = !0, n.done(t)
            } : e.onload = function() {
                n[t].loaded = !0, n.done(t)
            }, document.body.appendChild(e))
        },
        done: function(e) {
            var n, o, i;
            "youtube" === e && delete window.onYouTubeIframeAPIReady, (n = t.fancybox.getInstance()) && (o = n.current.$content.find("iframe"), "youtube" === e && void 0 !== YT && YT ? i = new YT.Player(o.attr("id"), {
                events: {
                    onStateChange: function(t) {
                        0 == t.data && n.next()
                    }
                }
            }) : "vimeo" === e && void 0 !== Vimeo && Vimeo && (i = new Vimeo.Player(o), i.on("ended", function() {
                n.next()
            })))
        }
    };
    t(document).on({
        "afterShow.fb": function(t, e, n) {
            e.group.length > 1 && ("youtube" === n.contentSource || "vimeo" === n.contentSource) && o.load(n.contentSource)
        }
    })
}(jQuery),
function(t, e, n) {
    "use strict";
    var o = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60)
            }
        }(),
        i = function() {
            return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
                t.clearTimeout(e)
            }
        }(),
        a = function(e) {
            var n = [];
            e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];
            for (var o in e) e[o].pageX ? n.push({
                x: e[o].pageX,
                y: e[o].pageY
            }) : e[o].clientX && n.push({
                x: e[o].clientX,
                y: e[o].clientY
            });
            return n
        },
        s = function(t, e, n) {
            return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
        },
        r = function(t) {
            if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
            for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
                if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
            return !1
        },
        c = function(e) {
            var n = t.getComputedStyle(e)["overflow-y"],
                o = t.getComputedStyle(e)["overflow-x"],
                i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
                a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
            return i || a
        },
        l = function(t) {
            for (var e = !1;;) {
                if (e = c(t.get(0))) break;
                if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
            }
            return e
        },
        d = function(t) {
            var e = this;
            e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
        };
    d.prototype.destroy = function() {
        var t = this;
        t.$container.off(".fb.touch"), n(e).off(".fb.touch"), t.requestId && (i(t.requestId), t.requestId = null), t.tapped && (clearTimeout(t.tapped), t.tapped = null)
    }, d.prototype.ontouchstart = function(o) {
        var i = this,
            c = n(o.target),
            d = i.instance,
            u = d.current,
            f = u.$slide,
            p = u.$content,
            h = "touchstart" == o.type;
        if (h && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && f.length && c.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left))) {
            if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated")) return o.stopPropagation(), void o.preventDefault();
            i.realPoints = i.startPoints = a(o), i.startPoints.length && (u.touch && o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = p, i.opts = u.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i.canPan = d.canPan(), i.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth = Math.round(f[0].clientWidth), i.canvasHeight = Math.round(f[0].clientHeight), i.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0
            }, i.sliderStartPos = n.fancybox.getTranslate(f), i.stagePos = n.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i.stagePos.left, n(e).off(".fb.touch").on(h ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(h ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox.isMobile && e.addEventListener("scroll", i.onscroll, !0), ((i.opts || i.canPan) && (c.is(i.$stage) || i.$stage.find(c).length) || (c.is(".fancybox-image") && o.preventDefault(), n.fancybox.isMobile && c.parents(".fancybox-caption").length)) && (i.isScrollable = l(c) || l(c.parent()), n.fancybox.isMobile && i.isScrollable || o.preventDefault(), (1 === i.startPoints.length || u.hasError) && (i.canPan ? (n.fancybox.stop(i.$content), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass("fancybox-is-grabbing")), 2 === i.startPoints.length && "image" === u.type && (u.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i.isZooming = !0, n.fancybox.stop(i.$content), i.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i.startPoints[0], i.startPoints[1]))))
        }
    }, d.prototype.onscroll = function(t) {
        var n = this;
        n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
    }, d.prototype.ontouchmove = function(t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e.isScrolling ? void(e.canTap = !1) : (e.newPoints = a(t), void((e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
    }, d.prototype.onSwipe = function(e) {
        var a, s = this,
            r = s.instance,
            c = s.isSwiping,
            l = s.sliderStartPos.left || 0;
        if (!0 !== c) "x" == c && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? l += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? l -= Math.pow(-s.distanceX, .8) : l += s.distanceX), s.sliderLastPos = {
            top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
            left: l
        }, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
            s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
                var o = e.pos - s.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
                })
            }), s.$container.addClass("fancybox-is-sliding"))
        });
        else if (Math.abs(s.distance) > 10) {
            if (s.canTap = !1, r.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : r.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && n(t).width() > 800 ? s.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = a > 45 && a < 135 ? "y" : "x"), "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable) return void(s.isScrolling = !0);
            r.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(r.slides, function(t, e) {
                var o, i;
                n.fancybox.stop(e.$slide), o = n.fancybox.getTranslate(e.$slide), i = n.fancybox.getTranslate(r.$refs.stage), e.$slide.css({
                    transform: "",
                    opacity: "",
                    "transition-duration": ""
                }).removeClass("fancybox-animated").removeClass(function(t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                }), e.pos === r.current.pos && (s.sliderStartPos.top = o.top - i.top, s.sliderStartPos.left = o.left - i.left), n.fancybox.setTranslate(e.$slide, {
                    top: o.top - i.top,
                    left: o.left - i.left
                })
            }), r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop()
        }
    }, d.prototype.onPan = function() {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5)) return void(t.startPoints = t.newPoints);
        t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && i(t.requestId), t.requestId = o(function() {
            n.fancybox.setTranslate(t.$content, t.contentLastPos)
        })
    }, d.prototype.limitMovement = function() {
        var t, e, n, o, i, a, s = this,
            r = s.canvasWidth,
            c = s.canvasHeight,
            l = s.distanceX,
            d = s.distanceY,
            u = s.contentStartPos,
            f = u.left,
            p = u.top,
            h = u.width,
            g = u.height;
        return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g), n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0), d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, .8) || 0), {
            top: a,
            left: i
        }
    }, d.prototype.limitPosition = function(t, e, n, o) {
        var i = this,
            a = i.canvasWidth,
            s = i.canvasHeight;
        return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
            top: e,
            left: t
        }
    }, d.prototype.onZoom = function() {
        var e = this,
            a = e.contentStartPos,
            r = a.width,
            c = a.height,
            l = a.left,
            d = a.top,
            u = s(e.newPoints[0], e.newPoints[1]),
            f = u / e.startDistanceBetweenFingers,
            p = Math.floor(r * f),
            h = Math.floor(c * f),
            g = (r - p) * e.percentageOfImageAtPinchPointX,
            b = (c - h) * e.percentageOfImageAtPinchPointY,
            m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
            v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
            y = m - e.centerPointStartX,
            x = v - e.centerPointStartY,
            w = l + (g + y),
            $ = d + (b + x),
            S = {
                top: $,
                left: w,
                scaleX: f,
                scaleY: f
            };
        e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && i(e.requestId), e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos)
        })
    }, d.prototype.ontouchend = function(t) {
        var o = this,
            s = o.isSwiping,
            r = o.isPanning,
            c = o.isZooming,
            l = o.isScrolling;
        if (o.endPoints = a(t), o.dMs = Math.max((new Date).getTime() - o.startTime, 1), o.$container.removeClass("fancybox-is-grabbing"), n(e).off(".fb.touch"), e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o.canTap) return o.onTap(t);
        o.speed = 100, o.velocityX = o.distanceX / o.dMs * .5, o.velocityY = o.distanceY / o.dMs * .5, r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l)
    }, d.prototype.endSwiping = function(t, e) {
        var o = this,
            i = !1,
            a = o.instance.group.length,
            s = Math.abs(o.distanceX),
            r = "x" == t && a > 1 && (o.dMs > 130 && s > 10 || s > 50);
        o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance.current.$slide, {
            top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
            opacity: 0
        }, 200), i = o.instance.close(!0, 250)) : r && o.distanceX > 0 ? i = o.instance.previous(300) : r && o.distanceX < 0 && (i = o.instance.next(300)), !1 !== i || "x" != t && "y" != t || o.instance.centerSlide(200), o.$container.removeClass("fancybox-is-sliding")
    }, d.prototype.endPanning = function() {
        var t, e, o, i = this;
        i.contentLastPos && (!1 === i.opts.momentum || i.dMs > 350 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i.contentLastPos.left + 500 * i.velocityX, e = i.contentLastPos.top + 500 * i.velocityY), o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 366))
    }, d.prototype.endZooming = function() {
        var t, e, o, i, a = this,
            s = a.instance.current,
            r = a.newWidth,
            c = a.newHeight;
        a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.animate(a.$content, o, 150)))
    }, d.prototype.onTap = function(e) {
        var o, i = this,
            s = n(e.target),
            r = i.instance,
            c = r.current,
            l = e && a(e) || i.startPoints,
            d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
            u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
            f = function(t) {
                var o = c.opts[t];
                if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
                    case "close":
                        r.close(i.startEvent);
                        break;
                    case "toggleControls":
                        r.toggleControls();
                        break;
                    case "next":
                        r.next();
                        break;
                    case "nextOrClose":
                        r.group.length > 1 ? r.next() : r.close(i.startEvent);
                        break;
                    case "zoom":
                        "image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i.startEvent))
                }
            };
        if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset().left))) {
            if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
            else if (s.is(".fancybox-slide")) o = "Slide";
            else {
                if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
                o = "Content"
            }
            if (i.tapped) {
                if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50) return this;
                f("dblclick" + o)
            } else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" + o] ? i.tapped = setTimeout(function() {
                i.tapped = null, r.isAnimating || f("click" + o)
            }, 500) : f("click" + o);
            return this
        }
    }, n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new d(e))
    }).on("beforeClose.fb", function(t, e) {
        e && e.Guestures && e.Guestures.destroy()
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3,
            progress: !0
        }
    });
    var n = function(t) {
        this.instance = t, this.init()
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this,
                n = t.instance,
                o = n.group[n.currIndex].opts.slideShow;
            t.$button = n.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle()
            }), n.group.length < 2 || !o ? t.$button.hide() : o.progress && (t.$progress = e('<div class="fancybox-progress"></div>').appendTo(n.$refs.inner))
        },
        set: function(t) {
            var n = this,
                o = n.instance,
                i = o.current;
            i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1) ? n.isActive && "video" !== i.contentType && (n.$progress && e.fancybox.animate(n.$progress.show(), {
                scaleX: 1
            }, i.opts.slideShow.speed), n.timer = setTimeout(function() {
                o.current.opts.loop || o.current.index != o.group.length - 1 ? o.next() : o.jumpTo(0)
            }, i.opts.slideShow.speed)) : (n.stop(), o.idleSecondsCounter = 0, o.showControls())
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer), t.timer = null, t.$progress && t.$progress.removeAttr("style").hide()
        },
        start: function() {
            var t = this,
                e = t.instance.current;
            e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
        },
        stop: function() {
            var t = this,
                e = t.instance.current;
            t.clear(), t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1, t.instance.trigger("onSlideShowChange", !1), t.$progress && t.$progress.removeAttr("style").hide()
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e))
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.SlideShow;
            o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set()
        },
        "afterKeydown.fb": function(n, o, i, a, s) {
            var r = o && o.SlideShow;
            !r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a.preventDefault(), r.toggle())
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop()
        }
    }), e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance(),
            o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set())
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = function() {
        for (var e = [
                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
            ], n = {}, o = 0; o < e.length; o++) {
            var i = e[o];
            if (i && i[1] in t) {
                for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
                return n
            }
        }
        return !1
    }();
    if (n) {
        var o = {
            request: function(e) {
                e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                t[n.exitFullscreen]()
            },
            toggle: function(e) {
                e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
            },
            isFullscreen: function() {
                return Boolean(t[n.fullscreenElement])
            },
            enabled: function() {
                return Boolean(t[n.fullscreenEnabled])
            }
        };
        e.extend(!0, e.fancybox.defaults, {
            btnTpl: {
                fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
            },
            fullScreen: {
                autoStart: !1
            }
        }), e(t).on(n.fullscreenchange, function() {
            var t = o.isFullscreen(),
                n = e.fancybox.getInstance();
            n && (n.current && "image" === n.current.type && n.isAnimating && (n.isAnimating = !1, n.update(!0, !0, 0), n.isComplete || n.complete()), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t), n.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
        })
    }
    e(t).on({
        "onInit.fb": function(t, e) {
            var i;
            if (!n) return void e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
            e && e.group[e.currIndex].opts.fullScreen ? (i = e.$refs.container, i.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(), t.preventDefault(), o.toggle()
            }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && o.request(), e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
        },
        "beforeClose.fb": function(t, e) {
            e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var o = function(t) {
        this.init(t)
    };
    e.extend(o.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e = this,
                n = t.group,
                o = 0;
            e.instance = t, e.opts = n[t.currIndex].opts.thumbs, t.Thumbs = e, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
            for (var i = 0, a = n.length; i < a && (n[i].thumb && o++, !(o > 1)); i++);
            o > 1 && e.opts ? (e.$button.removeAttr("style").on("click", function() {
                e.toggle()
            }), e.isActive = !0) : e.$button.hide()
        },
        create: function() {
            var t, o = this,
                i = o.instance,
                a = o.opts.parentEl,
                s = [];
            o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)), o.$grid.on("click", "a", function() {
                i.jumpTo(e(this).attr("data-index"))
            })), o.$list || (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)), e.each(i.group, function(e, n) {
                t = n.thumb, t || "image" !== n.type || (t = n.src), s.push('<a href="javascript:;" tabindex="0" data-index="' + e + '"' + (t && t.length ? ' style="background-image:url(' + t + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
            }), o.$list[0].innerHTML = s.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right"), 10) + i.group.length * o.$list.children().eq(0).outerWidth(!0))
        },
        focus: function(t) {
            var e, n, o = this,
                i = o.$list,
                a = o.$grid;
            o.instance.current && (e = i.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > i.height() - e.outerHeight()) ? i.stop().animate({
                scrollTop: i.scrollTop() + n.top
            }, t) : "x" === o.opts.axis && (n.left < a.scrollLeft() || n.left > a.scrollLeft() + (a.width() - e.outerWidth())) && i.parent().stop().animate({
                scrollLeft: n.left
            }, t))
        },
        update: function() {
            var t = this;
            t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"), t.instance.update()
        },
        hide: function() {
            this.isVisible = !1, this.update()
        },
        show: function() {
            this.isVisible = !0, this.update()
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update()
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && !e.Thumbs && (n = new o(e), n.isActive && !0 === n.opts.autoStart && n.show())
        },
        "beforeShow.fb": function(t, e, n, o) {
            var i = e && e.Thumbs;
            i && i.isVisible && i.focus(o ? 0 : 250)
        },
        "afterKeydown.fb": function(t, e, n, o, i) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide()
        }
    })
}(document, jQuery),
function(t, e) {
    "use strict";

    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t]
        })
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
        },
        share: {
            url: function(t, e) {
                return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
            },
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function() {
        var t, o, i = e.fancybox.getInstance(),
            a = i.current || null;
        a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function(t, e) {
                    i.$refs.container.one("beforeClose.fb", function() {
                        t.close(null, 0)
                    }), e.$content.find(".fancybox-share__button").click(function() {
                        return window.open(this.href, "Share", "width=550, height=450"), !1
                    })
                },
                mobile: {
                    autoFocus: !1
                }
            }
        }))
    })
}(document, jQuery),
function(t, e, n) {
    "use strict";

    function o() {
        var e = t.location.hash.substr(1),
            n = e.split("-"),
            o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
            i = n.join("-");
        return {
            hash: e,
            index: o < 1 ? 1 : o,
            gallery: i
        }
    }

    function i(t) {
        "" !== t.gallery && n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
    }

    function a(t) {
        var e, n;
        return !!t && (e = t.current ? t.current.opts : t.opts, "" !== (n = e.hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && n)
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
        })
    }), n(function() {
        !1 !== n.fancybox.defaults.hash && (n(e).on({
            "onInit.fb": function(t, e) {
                var n, i;
                !1 !== e.group[e.currIndex].opts.hash && (n = o(), (i = a(e)) && n.gallery && i == n.gallery && (e.currIndex = n.index - 1))
            },
            "beforeShow.fb": function(n, o, i, s) {
                var r;
                i && !1 !== i.opts.hash && (r = a(o)) && (o.currentHash = r + (o.group.length > 1 ? "-" + (i.index + 1) : ""), t.location.hash !== "#" + o.currentHash && (s && !o.origHash && (o.origHash = t.location.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer = setTimeout(function() {
                    "replaceState" in t.history ? (t.history[s ? "pushState" : "replaceState"]({}, e.title, t.location.pathname + t.location.search + "#" + o.currentHash), s && (o.hasCreatedHistory = !0)) : t.location.hash = o.currentHash, o.hashTimer = null
                }, 300)))
            },
            "beforeClose.fb": function(n, o, i) {
                i && !1 !== i.opts.hash && (clearTimeout(o.hashTimer), o.currentHash && o.hasCreatedHistory ? t.history.back() : o.currentHash && ("replaceState" in t.history ? t.history.replaceState({}, e.title, t.location.pathname + t.location.search + (o.origHash || "")) : t.location.hash = o.origHash), o.currentHash = null)
            }
        }), n(t).on("hashchange.fb", function() {
            var t = o(),
                e = null;
            n.each(n(".fancybox-container").get().reverse(), function(t, o) {
                var i = n(o).data("FancyBox");
                if (i && i.currentHash) return e = i, !1
            }), e ? e.currentHash === t.gallery + "-" + t.index || 1 === t.index && e.currentHash == t.gallery || (e.currentHash = null, e.close()) : "" !== t.gallery && i(t)
        }), setTimeout(function() {
            n.fancybox.getInstance() || i(o())
        }, 50))
    })
}(window, document, jQuery),
function(t, e) {
    "use strict";
    var n = (new Date).getTime();
    e(t).on({
        "onInit.fb": function(t, e, o) {
            e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
                var o = e.current,
                    i = (new Date).getTime();
                e.group.length < 2 || !1 === o.opts.wheel || "auto" === o.opts.wheel && "image" !== o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n = i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
            })
        }
    })
}(document, jQuery);

/*
 * jquery-match-height 0.7.2 by @liabru
 * http://brm.io/jquery-match-height/
 * License MIT
 */
! function(t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof module && module.exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function(t) {
    var e = -1,
        o = -1,
        n = function(t) {
            return parseFloat(t) || 0
        },
        a = function(e) {
            var o = 1,
                a = t(e),
                i = null,
                r = [];
            return a.each(function() {
                var e = t(this),
                    a = e.offset().top - n(e.css("margin-top")),
                    s = r.length > 0 ? r[r.length - 1] : null;
                null === s ? r.push(e) : Math.floor(Math.abs(i - a)) <= o ? r[r.length - 1] = s.add(e) : r.push(e), i = a
            }), r
        },
        i = function(e) {
            var o = {
                byRow: !0,
                property: "height",
                target: null,
                remove: !1
            };
            return "object" == typeof e ? t.extend(o, e) : ("boolean" == typeof e ? o.byRow = e : "remove" === e && (o.remove = !0), o)
        },
        r = t.fn.matchHeight = function(e) {
            var o = i(e);
            if (o.remove) {
                var n = this;
                return this.css(o.property, ""), t.each(r._groups, function(t, e) {
                    e.elements = e.elements.not(n)
                }), this
            }
            return this.length <= 1 && !o.target ? this : (r._groups.push({
                elements: this,
                options: o
            }), r._apply(this, o), this)
        };
    r.version = "0.7.2", r._groups = [], r._throttle = 80, r._maintainScroll = !1, r._beforeUpdate = null,
        r._afterUpdate = null, r._rows = a, r._parse = n, r._parseOptions = i, r._apply = function(e, o) {
            var s = i(o),
                h = t(e),
                l = [h],
                c = t(window).scrollTop(),
                p = t("html").outerHeight(!0),
                u = h.parents().filter(":hidden");
            return u.each(function() {
                    var e = t(this);
                    e.data("style-cache", e.attr("style"))
                }), u.css("display", "block"), s.byRow && !s.target && (h.each(function() {
                    var e = t(this),
                        o = e.css("display");
                    "inline-block" !== o && "flex" !== o && "inline-flex" !== o && (o = "block"), e.data("style-cache", e.attr("style")), e.css({
                        display: o,
                        "padding-top": "0",
                        "padding-bottom": "0",
                        "margin-top": "0",
                        "margin-bottom": "0",
                        "border-top-width": "0",
                        "border-bottom-width": "0",
                        height: "100px",
                        overflow: "hidden"
                    })
                }), l = a(h), h.each(function() {
                    var e = t(this);
                    e.attr("style", e.data("style-cache") || "")
                })), t.each(l, function(e, o) {
                    var a = t(o),
                        i = 0;
                    if (s.target) i = s.target.outerHeight(!1);
                    else {
                        if (s.byRow && a.length <= 1) return void a.css(s.property, "");
                        a.each(function() {
                            var e = t(this),
                                o = e.attr("style"),
                                n = e.css("display");
                            "inline-block" !== n && "flex" !== n && "inline-flex" !== n && (n = "block");
                            var a = {
                                display: n
                            };
                            a[s.property] = "", e.css(a), e.outerHeight(!1) > i && (i = e.outerHeight(!1)), o ? e.attr("style", o) : e.css("display", "")
                        })
                    }
                    a.each(function() {
                        var e = t(this),
                            o = 0;
                        s.target && e.is(s.target) || ("border-box" !== e.css("box-sizing") && (o += n(e.css("border-top-width")) + n(e.css("border-bottom-width")), o += n(e.css("padding-top")) + n(e.css("padding-bottom"))), e.css(s.property, i - o + "px"))
                    })
                }), u.each(function() {
                    var e = t(this);
                    e.attr("style", e.data("style-cache") || null)
                }), r._maintainScroll && t(window).scrollTop(c / p * t("html").outerHeight(!0)),
                this
        }, r._applyDataApi = function() {
            var e = {};
            t("[data-match-height], [data-mh]").each(function() {
                var o = t(this),
                    n = o.attr("data-mh") || o.attr("data-match-height");
                n in e ? e[n] = e[n].add(o) : e[n] = o
            }), t.each(e, function() {
                this.matchHeight(!0)
            })
        };
    var s = function(e) {
        r._beforeUpdate && r._beforeUpdate(e, r._groups), t.each(r._groups, function() {
            r._apply(this.elements, this.options)
        }), r._afterUpdate && r._afterUpdate(e, r._groups)
    };
    r._update = function(n, a) {
        if (a && "resize" === a.type) {
            var i = t(window).width();
            if (i === e) return;
            e = i;
        }
        n ? o === -1 && (o = setTimeout(function() {
            s(a), o = -1
        }, r._throttle)) : s(a)
    }, t(r._applyDataApi);
    var h = t.fn.on ? "on" : "bind";
    t(window)[h]("load", function(t) {
        r._update(!1, t)
    }), t(window)[h]("resize orientationchange", function(t) {
        r._update(!0, t)
    })
});