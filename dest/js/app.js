"use strict";

/**
 * @name initHamburger
 *
 * @description Init hamburger logic with animated
 */
var initHamburger = function initHamburger() {

	var btn = document.querySelector("[hamburger-js]"),
	    hideScrollContainer = document.querySelectorAll("html, body"),
	    mobileContainer = document.querySelector("[mobile-block-js]");

	/**
   * @description
  */
	if (btn) {
		btn.addEventListener("click", function (ev) {
			var elem = ev.currentTarget;

			elem.classList.toggle("is-active");
			mobileContainer.classList.toggle("is-open");

			hideScrollContainer.forEach(function (val, idx) {
				val.classList.toggle("is-hideScroll");
			});
		});
	}
};

/**
 * @name initPopups
 *
 * @description
 */
var initPopups = function initPopups() {
	var myVideo = document.getElementById("video");

	function playPause() {
		var videoNode = document.querySelector('[see-videoNode-js]');

		if (myVideo.paused) {
			myVideo.play();
		} else {
			myVideo.pause();
			myVideo.currentTime = 0;
		}
	}

	$('[popup-js]').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'is-show',
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');

				if (myVideo) {
					playPause(myVideo);
				}
			},
			close: function close() {
				if (myVideo) {
					playPause(myVideo);
				}
			}
		}
	});
};

/**
 * @name initPreventBehavior
 *
 * @description
 */
var initPreventBehavior = function initPreventBehavior() {

	var link = document.querySelectorAll("a");

	link.forEach(function (val, idx) {

		val.addEventListener("click", function (e) {
			if (val.getAttribute("href") === "#") {
				e.preventDefault();
			}
		});
	});
};

/**
 * @name initSwiper
 *
 * @description initialize Swiper
 */
var initSwiper = function initSwiper() {

	var mySwiper = new Swiper('', {
		// Optional parameters
		wrapperClass: "swiper-wrapper",
		slideClass: "swiper-slide",
		direction: 'horizontal', // 'horizontal' or 'vertical'
		loop: true,
		watchOverflow: true,
		normalizeSlideIndex: true,
		grabCursor: true,
		freeMode: false,
		effect: 'slide', // "slide", "fade", "cube", "coverflow" or "flip"
		// autoplay: {
		//   delay: 5000,
		// },
		// Disable preloading of all images
		// preloadImages: false,
		// Enable lazy loading
		// lazy: {
		//   loadPrevNext: true,
		// },

		// off touch for destop
		// touchMoveStopPropagation:false,
		// simulateTouch : false,
		// allowSwipeToNext: true,
		// allowSwipeToPrev: true,
		// allowPageScroll: "auto ",

		slidesPerView: 1,
		spaceBetween: 0,
		breakpoints: {
			// when window width is <= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 10
			},
			// when window width is <= 480px
			480: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is <= 640px
			640: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		},

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			clickable: true
			// renderBullet: function (index, className) {
			//   return `
			//     <div class="${className}">
			//       ${index}
			//     </div>
			//   `;
			// }
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},

		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar'
		},

		on: {
			"slideChange": function slideChange() {
				console.log("slideChange");
			}
		}
	});

	var mainSlider = new Swiper('.mainSlider', {
		loop: false,
		grabCursor: false,
		freeMode: false,
		effect: 'fade', // "slide", "fade", "cube", "coverflow" or "flip"
		fadeEffect: {
			crossFade: true
		},
		speed: 800,
		slidesPerView: 1,
		spaceBetween: 0,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
			// renderBullet: function (index, className) {
			//   return `
			//     <div class="${className}">
			//       ${index}
			//     </div>
			//   `;
			// }
		}
	});
};

/**
 * @name initValidation
 *
 * @description
 */
var initValidation = function initValidation() {
	(function ($) {
		$.fn.inputFilter = function (inputFilter) {
			return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function () {
				if (inputFilter(this.value)) {
					this.oldValue = this.value;
					this.oldSelectionStart = this.selectionStart;
					this.oldSelectionEnd = this.selectionEnd;
				} else if (this.hasOwnProperty("oldValue")) {
					this.value = this.oldValue;
					this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
				} else {
					this.value = "";
				}
			});
		};
	})(jQuery);

	/**
  * Integer >= 0 (use + and - separator)
  */
	var uintTextPhoneBox = function uintTextPhoneBox() {
		$("[uintTextPhoneBox-js]").inputFilter(function (value) {
			return (/^\+?[0-9\s\-]*$/.test(value)
			);
		});
	};

	uintTextPhoneBox();

	/**
  *
  * @param form
  */
	var validationSubmitHandler = function validationSubmitHandler(form) {
		$('.try__form-loader').addClass('is-show');

		$.ajax({
			type: "POST",
			url: $(form).attr('action'),
			data: $(form).serialize(),
			success: function success(response) {
				var data = $.parseJSON(response);

				if (data.success) {
					$('.try__form-loader').removeClass('is-show');

					$('.try__form-message').addClass('is-show');
					setTimeout(function (ev) {
						$('.try__form-message').removeClass('is-show');
					}, 3000);

					$(form).find('input, textarea').val('');
				} else {
					// do something
				}
			},
			error: function error(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + ' : ' + errorThrown);
			}
		});
	};

	/**
  *
  * @param error
  * @param element
  */
	var validationErrorPlacement = function validationErrorPlacement(error, element) {
		error.appendTo(element.closest('.try__form-field'));
	};

	/**
  *
  * @param element
  */
	var validationHighlight = function validationHighlight(element) {
		$(element).closest('.try__form-field').addClass('is-error');
	};

	/**
  *
  * @param element
  */
	var validationUnhighlight = function validationUnhighlight(element) {
		$(element).closest('.try__form-field').removeClass('is-error');
	};

	/**
  * @description
  */
	$("#contactForm").validate({
		submitHandler: validationSubmitHandler,
		errorPlacement: validationErrorPlacement,
		highlight: validationHighlight,
		unhighlight: validationUnhighlight,
		onkeyup: function onkeyup(element) {
			$(element).valid();
		},
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true
			},
			phone: 'required',
			message: 'required'
		},
		messages: {
			name: {
				required: "Please specify the Name"
			},
			email: {
				required: "Please specify the Email",
				email: "Must format - name@domain.com"
			},
			phone: {
				required: "Please specify the Phone"
			},
			message: {
				required: "Please specify the Message"
			}
		}
	});
};

/**
 * @description Document DOM ready.
 */
(function () {
	/*
 * CALLBACK :: start
 * ============================================= */
	var seeVideoToggle = function seeVideoToggle() {
		var myVideo = document.getElementById("video");

		function playPause() {
			var videoNode = document.querySelector('[see-videoNode-js]');

			if (myVideo.paused) {
				videoNode.classList.add('is-play');
				myVideo.play();
			} else {
				videoNode.classList.remove('is-play');
				myVideo.pause();
			}
		}

		if (myVideo) {
			document.querySelector('[see-play-js]').addEventListener('click', function (ev) {
				playPause(myVideo);
			}, false);
		}
	};
	/*
 * CALLBACK :: end
 * ============================================= */

	/**
  * @name initNative
  * @description Init all method
  */
	var initNative = function initNative() {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		initHamburger();
		initPopups();
		initValidation();
		// ==========================================

		// callback
		// seeVideoToggle();
		// ==========================================
	};
	initNative();
})();