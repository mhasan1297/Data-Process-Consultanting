
(function ($) {
    "use strict";
    var windowOn = $(window);

    /*-----------------------------------------------------------------------------------
        Template Name: Zimis - Data Science & Analytics HTML5 Template
        Author: RRDevs
        Support: https://support.rrdevs.net
        Description: Zimis - Data Science & Analytics HTML5 Template.
        Version: 1.0
        Developer: Sabbir Ahmmed (https://github.com/ahmmedsabbirbd)
    -----------------------------------------------------------------------------------

     */
   /*======================================
   Data Css js
   ========================================*/
    $("[data-background]").each(function() {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });

    $("[data-width]").each(function() {
        $(this).css("width", $(this).attr("data-width"));
    });

    // prelaoder
    let span = $('.letter'),
        tlSmell = new TimelineMax({repeat : -1});
    tlSmell
        .staggerFromTo($('svg .smell'), 3, {y: 50, autoAlpha: 0.5}, {y: -20, autoAlpha: 1}, 1);
    TweenMax.fromTo($('svg #body'), 3, {x: -1, repeat : -1, yoyo : true}, {x: 1, repeat : -1, yoyo : true});

    class GSAPAnimation {
        static Init() {
            /*title-animation*/
            $('.title-animation').length && this.sectionTitleAnimation('.title-animation'); 
        }
        
        static sectionTitleAnimation(activeClass) {
            let sectionTitleLines = gsap.utils.toArray(activeClass);

            sectionTitleLines.forEach(sectionTextLine => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionTextLine,
                        start: 'top 90%',
                        end: 'bottom 60%',
                        scrub: false,
                        markers: false,
                        toggleActions: 'play none none none'
                    }
                });

                const itemSplitted = new SplitText(sectionTextLine, { type: "chars, words" });
                gsap.set(sectionTextLine, { perspective: 100 });
                itemSplitted.split({ type: "words" })
                tl.from(itemSplitted.words, {
                    opacity: 0, 
                    autoAlpha: 0, 
                    transformOrigin: "top center -50",
                    y: "10px",
                    duration: 0.9,
                    stagger: 0.1,
                    ease: "power2.out",
                });
            });
        }
    }

    class RRDEVS {
        static LoadedAfter() {
            $('#preloader').delay(1).fadeOut(0);

            $('.odometer').waypoint(function(direction) {
                if (direction === 'down') {
                    let countNumber = $(this.element).attr("data-count");
                    $(this.element).html(countNumber);
                }
            }, {
                offset: '80%'
            });

            /*Wow Js*/
            if ($('.wow').length) {
                var wow = new WOW({
                    boxClass: 'wow',
                    animateClass: 'animated',
                    offset: 0,
                    mobile: false,
                    live: true
                });
                wow.init();
            }

            /*GSAPAnimation*/
            GSAPAnimation.Init();
        }
    }

    /*======================================
      Preloader activation
      ========================================*/
    $(window).on('load', RRDEVS.LoadedAfter);
    $(".preloader-close").on("click",  RRDEVS.LoadedAfter)

    window.addEventListener('resize', function() {
        gsap.globalTimeline.clear();
    });

    /*======================================
      Mobile Menu Js
      ========================================*/
    $("#mobile-menu").meanmenu({
        meanMenuContainer: ".mobile-menu",
        meanScreenWidth: "1199",
        meanExpand: ['<i class="fa-regular fa-angle-right"></i>'],
    });

    /*======================================
      Sidebar Toggle
      ========================================*/
    $(".offcanvas__close,.offcanvas__overlay").on("click", function () {
        $(".offcanvas__area").removeClass("info-open");
        $(".offcanvas__overlay").removeClass("overlay-open");
    });
    // Scroll to bottom then close navbar
    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".offcanvas__area").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
        }
    });
    $(".sidebar__toggle").on("click", function () {
        $(".offcanvas__area").addClass("info-open");
        $(".offcanvas__overlay").addClass("overlay-open");
    });

    /*======================================
      Body overlay Js
      ========================================*/
    $(".body-overlay").on("click", function () {
        $(".offcanvas__area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    /*======================================
      Sticky Header Js
      ========================================*/
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $("#header-sticky").addClass("rr-sticky");
        } else {
            $("#header-sticky").removeClass("rr-sticky");
        }
    });

    /*======================================
      MagnificPopup image view
      ========================================*/
    $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });

    /*======================================
      MagnificPopup video view
      ========================================*/
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /*======================================
      Page Scroll Percentage
      ========================================*/
    const scrollTopPercentage = ()=> {
        const scrollPercentage = () => {
            const scrollTopPos = document.documentElement.scrollTop;
            const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
            const scrollElementWrap = $("#scroll-percentage");

            scrollElementWrap.css("background", `conic-gradient( var(--rr-theme-primary) ${scrollValue}%, var(--rr-theme-secondary) ${scrollValue}%)`);

            if ( scrollTopPos > 100 ) {
                scrollElementWrap.addClass("active");
            } else {
                scrollElementWrap.removeClass("active");
            }

            if( scrollValue < 96 ) {
                $("#scroll-percentage-value").text(`${scrollValue}%`);
            } else {
                $("#scroll-percentage-value").html('<i class="fa-solid fa-angle-up"></i>');
            }
        }
        window.onscroll = scrollPercentage;
        window.onload = scrollPercentage;

        // Back to Top
        function scrollToTop() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        $("#scroll-percentage").on("click", scrollToTop);
    }
    scrollTopPercentage();

    /*======================================
	One Page Scroll Js
	========================================*/
    var link = $('.onepagenav #mobile-menu ul li a, .onepagenav .mean-nav ul li a');
    link.on('click', function(e) {
        var target = $($(this).attr('href'));
        $('html, body').animate({
            scrollTop: target.offset().top - 76
        }, 600);
        $(this).parent().addClass('active');
        e.preventDefault();
    });
    $(window).on('scroll', function(){
        scrNav();
    });

    function scrNav() {
        var sTop = $(window).scrollTop();
        $('section').each(function() {
            var id = $(this).attr('id'),
                offset = $(this).offset().top-1,
                height = $(this).height();
            if(sTop >= offset && sTop < offset + height) {
                link.parent().removeClass('active');
                $('.main-menu').find('[href="#' + id + '"]').parent().addClass('active');
            }
        });
    }
    scrNav();

    /*======================================
	Smoth animatio Js
	========================================*/
    $(document).on('click', '.smoth-animation', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 50
        }, 300);
    });

    /*testimonial-thumb__slider***/
    /*testimonial-thumb__slider***/
    let testimonialthumb__slider = new Swiper(".testimonial-thumb__slider", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        }
    });
    let testimonial__slider = new Swiper(".testimonial__slider", {
        spaceBetween: 30,
        thumbs: {
            swiper: testimonialthumb__slider,
        },
    });

    /*client-testimonial__slider***/
    let clienttestimonial__slider = new Swiper(".client-testimonial__slider", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        clickable: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            prevEl: ".client-testimonial__slider__arrow-prev",
            nextEl: ".client-testimonial__slider__arrow-next",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        }
    });

    /*testimonial-2__slider***/
    let testimonial2slider = new Swiper(".testimonial-2__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        clickable: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            prevEl: ".testimonial-2__slider__arrow-prev",
            nextEl: ".testimonial-2__slider__arrow-next",
        },
        pagination: {
            el: ".testimonial-2__slider__pagination",
            type: "fraction",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
        }
    });

    /*ourportfolio__slider***/
    let ourportfolio__slider = new Swiper(".our-portfolio__slider", {
        slidesPerView: 1,
        loop: true,
        clickable: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            prevEl: ".our-portfolio__slider__arrow-prev",
            nextEl: ".our-portfolio__slider__arrow-next",
        },
        pagination: {
            el: ".our-portfolio__slider-dot",
            clickable: true,
        },
    });

    $('.live-comment-widget__form-input-select select, .contact-us-message__form-input-select select').niceSelect();

    $(".search-open-btn").on("click", function () {
        $(".search__popup").addClass("search-opened");
    });
    $(".search-close-btn").on("click", function () {
        $(".search__popup").removeClass("search-opened");
    });

    /*brand__active***/
    let brand = new Swiper(".brand__active", {
        slidesPerView: 1,
        spaceBetween: 156,
        loop: true,
        roundLengths: true,
        clickable: true,
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            1401: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            576: {
                spaceBetween: 30,
                slidesPerView: 3,
            },
            481: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*blog__slider***/
    let doctor__slider = new Swiper(".blog__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        clickable: true,
        pagination: {
            el: ".blog__slider-dot",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*caseStudies__slider***/
    let caseStudies__slider = new Swiper(".case-studies__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        clickable: true,
        pagination: {
            el: ".case-studies__slider-dot",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*blog3ItemThumbSlider*/
    let blog3ItemThumbSlider = new Swiper(".blog-3__item__thumb-slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        navigation: {
            prevEl: ".blog-3__item__thumb-slider__arrow-prev",
            nextEl: ".blog-3__item__thumb-slider__arrow-next",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*team__slider***/
    let team__slider = new Swiper(".team__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        clickable: true,
        pagination: {
            el: ".team__slider-dot",
            clickable: true,
        },
        autoplay: {
            delay: 3000,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    //slider-text
    const scrollers = document.querySelectorAll(".rr-scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }
    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".rr-scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    function lastNobullet() {
        $(".last_no_bullet ul").each(function() {
            var $listItems = $(this).find("li");

            if ($listItems.length > 1) {
                $listItems.last().addClass("no_bullet");
            }
        });
    }

    lastNobullet();

    $(window).resize(function() {
        lastNobullet();
    });

    $('#contact-us-message__form').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var valid = true;

        form.find('.error-message').remove();
        form.find('.success-message').remove();

        form.find('input, textarea, select').each(function() {
            if ($(this).val().trim() === '') {
                valid = false;
                $(this).parent().after('<p class="error-message  mt-3 mb-0">This field is required.</p>');
            }
        });

        if (!valid) {
            return;
        }

        $('.loading-form').show();

        setTimeout(function() {
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            }).done(function(data) {
                $('.loading-form').hide();
                form.append('<p class="success-message mt-3 mb-0">Your message has been sent successfully.</p>');
            }).fail(function(data) {
                $('.loading-form').hide();
                form.append('<p class="error-message mt-3 mb-0">Something went wrong. Please try again later.</p>');
            });
        }, 1000);
    });

    $('.carouselTicker-nav').carouselTicker({});

    /*** pricing table2 */
    const pricingMonthlyBtn = $("#monthly-btn"),
        pricingYearlyBtn = $("#yearly-btn"),
        pricingValues = $(".pricing-2__card-price h2, .yearly p");

    if (pricingMonthlyBtn[0] && pricingYearlyBtn[0] && pricingValues.length > 0) {
        pricingMonthlyBtn[0].addEventListener("click", function () {
            updatePricingValuestop("monthly");
            pricingYearlyBtn[0].classList.remove("active");
            pricingMonthlyBtn[0].classList.add("active");
        });

        pricingYearlyBtn[0].addEventListener("click", function () {
            updatePricingValuestop("yearly");
            pricingMonthlyBtn[0].classList.remove("active");
            pricingYearlyBtn[0].classList.add("active");
        });
    }

    function updatePricingValuestop(option) {
        pricingValues.each(function () {
            const pricingValue = $(this);
            const yearlyValue = pricingValue.attr("data-yearly");
            const monthlyValue = pricingValue.attr("data-monthly");

            const newValue = option === "monthly" ? monthlyValue : yearlyValue;
            pricingValue.html(newValue);
        });
    }

    /*** pricing table 1 */
    const pricingSwitch = $("#switcher"),
        pricingValues1 = $(".pricing__card-price h2");

    if (pricingSwitch[0] && pricingValues1.length > 0) {
        pricingSwitch[0].addEventListener("change", function () {
            if (pricingSwitch[0].checked) {
                updatePricingValues("yearly");
                $("#yearly-btn").addClass("active");
                $("#monthly-btn").removeClass("active");
            } else {
                updatePricingValues("monthly");
                $("#monthly-btn").addClass("active");
                $("#yearly-btn").removeClass("active");
            }
        });
    }

    function updatePricingValues(option) {
        pricingValues1.each(function () {
            const pricingValue = $(this);
            const yearlyValue = pricingValue.attr("data-yearly");
            const monthlyValue = pricingValue.attr("data-monthly");

            const newValue = option === "monthly" ? monthlyValue : yearlyValue;
            pricingValue.html(newValue);
        });
    }

    class MagneticButton {
        constructor(options) {
            this.settings = $.extend({
                target: $('[data-magnetic]'),
                class: 'magnetizing',
                attraction: 0.45,
                distance: 100,
                onEnter: function (data) {},
                onExit: function (data) {},
                onUpdate: function (data) {},
            }, options);

            if (!this.settings.target.length) return;

            this.init();
        }

        init() {
            $(window).on('mousemove', (e) => this.magnetize(e));
        }

        distanceFromMouse($target, mouseX, mouseY) {
            let centerX = $target.offset().left + $target.outerWidth() / 2,
                centerY = $target.offset().top + $target.outerHeight() / 2,
                pointX = mouseX - centerX,
                pointY = mouseY - centerY,
                distance = Math.sqrt(Math.pow(pointX, 2) + Math.pow(pointY, 2));

            return Math.floor(distance);
        }

        magnetize(e) {
            let mouseX = e.pageX, mouseY = e.pageY;

            this.settings.target.each((index, element) => {
                let $this = $(element),
                    centerX = $this.offset().left + $this.outerWidth() / 2,
                    centerY = $this.offset().top + $this.outerHeight() / 2,
                    attraction = $this.data('magnetic-attraction') || this.settings.attraction,
                    distance = $this.data('magnetic-distance') || this.settings.distance,
                    deltaX = Math.floor(centerX - mouseX) * -1 * attraction,
                    deltaY = Math.floor(centerY - mouseY) * -1 * attraction,
                    mouseDistance = this.distanceFromMouse($this, mouseX, mouseY),
                    isEnter = $this.data('isEnter') || false,
                    data = {target: $this, y: deltaY, x: deltaX, distance: mouseDistance};

                if (mouseDistance < distance) {
                    gsap.to($this, {y: deltaY, x: deltaX});

                    if (!isEnter) {
                        $this.data('isEnter', true);
                        $this.addClass(this.settings.class);
                        this.settings.onEnter(data);
                    }

                    this.settings.onUpdate(data);
                } else {
                    gsap.to($this, {y: 0, x: 0});

                    if (isEnter) {
                        $this.data('isEnter', false);
                        $this.removeClass(this.settings.class);
                        this.settings.onExit(data);
                    }
                }
            });
        }
    }

    new MagneticButton({
        attraction: (data) => data.target[0].dataset.magneticAttraction,
        distance: (data) => data.target[0].dataset.magneticDistance,
        onEnter: function (data) {
            gsap.to(data.target, {scale: data.target[0].dataset.magneticZoom});
        },
        onExit: function (data) {
            gsap.to(data.target, {scale: 1});
        },
        onUpdate: function (data) {}
    });

})(jQuery);