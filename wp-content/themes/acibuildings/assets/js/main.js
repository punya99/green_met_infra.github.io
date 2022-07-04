"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

/* ---------------------------------------------------------------------
Global Js
Target Browsers: All
------------------------------------------------------------------------ */
var FX = function(FX, $) {
    /**
     * Doc Ready
     */
    $(function() {
        FX.General.init(); // For super general or super short scripts

        FX.ImAHuman.init(); // Enable by default

        FX.ExternalLinks.init(); // Enable by default

        FX.Tabs.init(); // Enable by default for site search page

        FX.Social.init(); // Open social share in new windows. Used in single.php by default

        FX.MobileMenu.init();
        FX.SlickSlider.init();
        FX.BackToTop.init();
        FX.EqualHeight.init();
        FX.Parallax.init();
        FX.PhotoGallery.init();
    });
    $(window).on('load', function() {
        FX.SmoothAnchors.init();
        FX.EqualHeight.init();
        var $ww = $(window).width();

        if ($ww > 767) {
            $('.page-content.intro-section').each(function() {
                var $this = $(this);
                var $h = $this.children().children().children('.intro-section--text').height();
                $this.children().children().children('.intro-section--img').height($h);
            });
        }
    });
    $(window).on('resize', function() {
        FX.SlickSlider.init();
        FX.EqualHeight.init();
        var $ww = $(window).width();

        if ($ww > 767) {
            $('.page-content.intro-section').each(function() {
                var $this = $(this);
                var $h = $this.children().children().children('.intro-section--text').height();
                $this.children().children().children('.intro-section--img').height($h);
            });
        }
    });
    /**
     * General functionality — ideal for one-liners or super-duper short code blocks
     */

    FX.General = {
        init: function init() {
            this.bind();
        },
        bind: function bind() {
            // Makes all PDF to open in new tabs
            $('a[href*=".pdf"]').each(function(e) {
                $(this).attr('target', '_blank');
            }); // Choices (select field styling) - additional options here https://github.com/jshjohnson/Choices

            var elSelects = document.querySelectorAll('select');
            elSelects.forEach(function(el) {
                FX.General.setUpChoice(el);
            }); // pretty-format phone inputs
            //$('[type="tel"]').phoneFormat();
            // add span when .wpcf7-not-valid is present

            if ($('.wpcf7-not-valid').length) {
                $(this).append('<span class="wpcf7-not-valid--icon"></span>');
            } // position: sticky support through polyfill


            var $stickyEls = $('.js-sticky');
            if ($stickyEls.length && (typeof Stickyfill === "undefined" ? "undefined" : _typeof(Stickyfill)) === 'object') Stickyfill.add($stickyEls); // FitVids - responsive videos
            //$('body').fitVids();
            // Input on focus remove placeholder

            $('input,textarea').focus(function() {
                $(this).removeAttr('placeholder');
            }); // Input on focus remove placeholder

            $('.search-btn').click(function() {
                $(this).toggleClass("close");
                $('.search-dropdown').slideToggle();
            });
            $('.mobile-menu').click(function() {
                $(this).toggleClass("close");
                $('.nav-primary').slideToggle();
            });
            $('.menu-item-has-children').click(function() {
                $(this).toggleClass("current-menu-item");
            }); // Fancybox/Lightbox Popup
            //$('.fancybox').fancybox({
            //thumbs : {
            //autoStart : true
            //},
            //preventCaptionOverlap: false,
            //});

            $(".toTop").click(function() {
                //1 second of animation time
                //html works for FFX but not Chrome
                //body works for Chrome but not FFX
                //This strange selector seems to work universally
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            });
        },
        setUpChoice: function setUpChoice(elSelect) {
            var choice = new Choices(elSelect);
            var form = elSelect.closest('form');
            form.addEventListener('reset', function() {
                choice.destroy(); // destroy old choices instance

                FX.General.setUpChoice(elSelect); // rebuild new choices instance
            }, {
                once: true
            });

            if ('cat' === elSelect.id) {
                elSelect.onchange = null;
                choice.passedElement.element.addEventListener('change', function(e) {
                    e.target.closest('form').submit();
                });
            }
        }
    };
    FX.PhotoGallery = {
        init: function init() {
            this.bind();
        },
        bind: function bind() {
            $('.load-more-btn').click(function() {
                //pagination	
                if ($('.getcurrentval').val() >= parseInt($('.getallval').val())) {
                    $('.display-current').html(parseInt($('.getallval').val()));
                    $('.getcurrentval').val(parseInt($('.getallval').val()));
                } else {
                    if (parseInt($('.getcurrentval').val()) + parseInt(9) >= $('.getallval').val()) {
                        $('.display-current').html($('.getallval').val());
                    } else {
                        $('.display-current').html(parseInt($('.getcurrentval').val()) + parseInt(9));
                    }

                    $('.getcurrentval').val(parseInt($('.getcurrentval').val()) + parseInt(9));
                    $('.gallery-container').hide();
                }

                $linewidth = parseInt($('.getcurrentval').val()) / parseInt($('.getallval').val()) * 100; //alert($linewidth);

                $('.line-over').css("width", $linewidth + "%"); //Show Image

                var i;

                for (i = 0; i < $('.getcurrentval').val(); i++) {
                    $('.imagecount-' + i).removeClass('hidden');
                }

                $('.gallery-container').fadeIn();
            });
            $('ul.gallery_menu .placeholder a').click(function() {
                $(this).toggleClass('js-toggled').parent().siblings().slideToggle();
            });
            $placeholder_text = $('ul.gallery_menu li').find('.selected').text();
            $('ul.gallery_menu .placeholder a').html($placeholder_text);
        }
    };
    FX.EqualHeight = {
        init: function init() {
            this.bind();
        },
        bind: function bind() { //$('.featured-testimonial--testimonial').matchHeight();
            //$('.masthead--slideshow .slide-content').matchHeight();
        }
    };
    /**
     * Slider/Carousel
     * @type {Object}
     */

    FX.SlickSlider = {
        init: function init() {
            // Fix flashing issue (first slide initially shown)
            $('.slick-slider').on('init', function(e, slick) {
                $('.slideshow .slide').show();
            });
            /* Preloader */

            $('.js-slider-has-preloader').on('init', function(e, slick) {
                $('.js-slider-has-preloader').addClass('js-slider-has-preloader-init');
            });

            if ($('.slick-slider').length > 0) {
                $('.slick-slider')[0].slick.refresh();
            }

            $('.masthead--slideshow').slick({
                // Change class based on carousel name
                infinite: true,
                rows: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                centerMode: true,
                centerPadding: '0',
                variableWidth: true,
                variableHeight: true,
                dots: false,
                arrows: true,
                prevArrow: $('.slick-prev'),
                nextArrow: $('.slick-next'),
                responsive: [{
                    breakpoint: 1400,
                    settings: {
                        centerMode: false,
                        centerPadding: '0'
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        variableWidth: false,
                        variableHeight: false
                    }
                }]
            });
            $('.image-button-slider').slick({
                infinite: true,
                rows: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                dots: false,
                arrows: true,
                variableWidth: true
            });
            $('.gallery-slide').slick({
                mobileFirst: true,
                infinite: true,
                rows: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 1500,
                centerMode: true,
                centerPadding: '45px',
                dots: false,
                arrows: true,
                responsive: [{
                    breakpoint: 767,
                    settings: {
                        centerMode: true,
                        centerPadding: '120px'
                    }
                }]
            });
            $('.featured-testimonials-slider, .js-slick-gallery').slick({
                infinite: true,
                rows: 0,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 1500,
                dots: false,
                arrows: true,
                adaptiveHeight: true
            });
        }
    };
    /**
     * Display scroll-to-top after a certain amount of pixels
     * @type {Object}
     */

    FX.BackToTop = {
        $btn: null,
        init: function init() {
            this.$btn = $('#back-to-top'); //if( this.$btn.length )

            this.bind();
        },
        bind: function bind() {
            //$(window).on( 'scroll load', this.maybeShowButton.bind( this ) );
            this.$btn.on('click', this.scrollToTop);
        },
        scrollToTop: function scrollToTop() {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
        }
    };
    /**
     * Mobile menu script for opening/closing menu and sub menus
     * @type {Object}
     */

    FX.MobileMenu = {
        init: function init() {
            $('.nav-primary li.menu-item-has-children > a').after('<span class="sub-menu-toggle icon-dropdown-collapsed"></span>');
            $('.sub-menu-toggle').click(function() {
                var $this = $(this),
                    $parent = $this.closest('li'),
                    $wrap = $parent.find('> .sub-menu'); //$wrap.toggleClass( 'js-toggled' );

                $wrap.slideToggle();
                $this.toggleClass('js-toggled');
            });
        }
    };
    /**
     * Force External Links to open in new window.
     * @type {Object}
     */

    FX.ExternalLinks = {
        init: function init() {
            var siteUrlBase = FX.siteurl.replace(/^https?:\/\/((w){3})?/, '');
            $('a[href*="//"]:not([href*="' + siteUrlBase + '"])').not('.ignore-external') // ignore class for excluding
                .addClass('external').attr('target', '_blank').attr('rel', 'noopener');
        }
    };
    /**
     * Custom Social Share icons open windows
     * Generate URLs, place in a tag and use class - example: https://github.com/bradvin/social-share-urls
     * @type {Object}
     */

    FX.Social = {
        init: function init() {
            $('.js-social-share').on('click', this.open);
        },
        open: function open(e) {
            e.preventDefault();
            FX.Social.windowPopup($(this).attr('href'), 500, 300);
        },
        windowPopup: function windowPopup(url, width, height) {
            var left = screen.width / 2 - width / 2,
                top = screen.height / 2 - height / 2;
            window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
        }
    };
    /**
     * ImAHuman
     * Hidden Captchas for forms
     * @type {Object}
     */

    FX.ImAHuman = {
        init: function init() {
            this.bind();
        },
        bind: function bind() {
            var self = this,
                $forms = $('form');
            $forms.each(function() {
                $(this).on('focus click', self.markAsHuman);
            });
        },
        markAsHuman: function markAsHuman() {
            $(this).find('.imahuman, [name="imahuman"]').attr('value', parseInt('0xFF9481', 16));
        }
    };
    /**
     * FX.Parallax
     * Parallax effect for images
     * @type {Object}
     */

    FX.Parallax = {
        init: function init() {
            this.bind();
        },
        bind: function bind() {
            //$( window ).scroll( this.scroll );
            $('.js-parallax').each(function() {
                var img = $(this),
                    imgParent = $(this).parent();

                function parallaxImg() {
                    speed = img.data('speed'), imgY = imgParent.offset().top, winY = $(this).scrollTop(), winH = $(this).height(), parentH = imgParent.innerHeight(); // The next pixel to show on screen      

                    var winBottom = winY + winH; // If block is shown on screen

                    if (winBottom > imgY && winY < imgY + parentH) {
                        // Number of pixels shown after block appear
                        var imgBottom = (winBottom - imgY) * speed; // Max number of pixels until block disappear

                        var imgTop = winH + parentH; // Percentage between start showing until disappearing

                        var imgPercent = imgBottom / imgTop * 100 + (50 - speed * 50);
                    }

                    img.css({
                        top: imgPercent + '%',
                        transform: 'translate(-50%, -' + imgPercent + '%)'
                    });
                }

                $(document).on({
                    scroll: function scroll() {
                        parallaxImg();
                    },
                    ready: function ready() {
                        parallaxImg();
                    }
                });
            });
        } // scroll: function( e ) {
        // 	$( '.js-parallax' ).each( function() {
        // 		var $this   = $( this ),
        // 			speed   = $this.data( 'speed' ) || 6,
        // 			yPos    = -( $( window ).scrollTop() / speed ),
        // 			coords  = 'center  '+ yPos + 'px';
        // 		$this.css( { objectPosition: coords } ); /* based on parallax using an object-fit <img> */
        // 	});
        // }

    };
    /**
     * FX.SmoothAnchors
     * Smoothly Scroll to Anchor ID
     * @type {Object}
     */

    FX.SmoothAnchors = {
        init: function init() {
            this.hash = window.location.hash;

            if (this.hash != '') {
                this.scrollToSmooth(this.hash);
            }

            this.bind();
        },
        bind: function bind() {
            $('a[href^="#"]').on('click', $.proxy(this.onClick, this));
        },
        onClick: function onClick(e) {
            e.preventDefault();
            var target = $(e.currentTarget).attr('href');
            this.scrollToSmooth(target);
        },
        scrollToSmooth: function scrollToSmooth(target) {
            var $target = $(target);
            $target = $target.length ? $target : $(this.hash);
            var headerHeight = 0; // TODO: if using sticky header change 0 to
            // $('#page-header').outerHeight(true)

            if ($target.length) {
                var targetOffset = $target.offset().top - headerHeight;
                $('html, body').animate({
                    scrollTop: targetOffset
                }, 600);
                return false;
            }
        }
    };
    /**
     * Tab/Accordion Content
     * @type {Object}
     */

    FX.Tabs = {
        init: function init() {
            var self = this;
            self.maybeAdjustHeight(); // run on load

            this.bind();
        },
        bind: function bind() {
            $('.js-tabs').on('click touchstart', 'a', this.switchTab.bind(this));
            $(window).resize(this.maybeAdjustHeight.bind(this));
        },
        switchTab: function switchTab(e) {
            e.preventDefault();
            var $this = $(e.currentTarget),
                $tab = $($this.attr('href')),
                self = FX.Tabs;
            $this.parent().addClass('tab-active show').siblings('.js-tabs').removeClass('tab-active show');
            $tab.addClass('tab-active show').siblings('.tab-content').removeClass('tab-active show');
            self.maybeAdjustHeight($this.parent(), $tab);
        },

        /* Used to convert to accordions on mobile */
        maybeAdjustHeight: function maybeAdjustHeight($active_tab, $tab_content) {
            if (typeof $active_tab == 'undefined') $active_tab = $('.js-tabs.tab-active');
            if (typeof $tab_content == 'undefined') $tab_content = $('.tab-content.tab-active'); // TODO update according to appropriate screen size for accordion. By default set up for accordions on mobile and tablet.

            var max_accordion_width = 1024;

            if (window.innerWidth > max_accordion_width) {
                var height = $active_tab.outerHeight() + $tab_content.outerHeight();
                $('.accordion-tabs').css('height', height + 'px');
            } else {
                $('.accordion-tabs').css('height', '');
            }
        }
    };
    return FX;
}(FX || {}, jQuery);