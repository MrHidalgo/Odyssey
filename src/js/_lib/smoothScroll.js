

/**
 * @name initSmoothScroll
 *
 * @description Smooth transition to anchors to the block.
 */
const initSmoothScroll = (
  btnName = "[anchor-js]",
  animateSpeed = 850
) => {

  $(btnName).on("click", (e) => {

    let linkHref = $(e.currentTarget).attr('href'),
      headerHeight = $(".header").outerHeight() || 0,
      topHeightOffset = $(linkHref).offset().top - headerHeight;

    $('body, html').animate({
      scrollTop: topHeightOffset
    }, animateSpeed);

  });

  window.addEventListener('load', (ev) => {
		if (location.hash) {
			let target = location.hash,
				headerHeight = $(".header").outerHeight() || 0,
				topHeightOffset = $(target).offset().top - headerHeight;

			console.log(target);

			$('body, html').animate({
				scrollTop: topHeightOffset
			}, 850);
		}
	}, false);

};
