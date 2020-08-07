

/**
 * @name initPopups
 *
 * @description
 */
const initPopups = () => {
	const myVideo = document.getElementById("video");

	function playPause() {
		const videoNode = document.querySelector('[see-videoNode-js]');

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
      beforeOpen: function() {
        this.st.mainClass = this.st.el.attr('data-effect');

        if(myVideo) {
					playPause(myVideo);
				}
      },
      close: function() {
				if(myVideo) {
					playPause(myVideo);
				}
			}
    }
  });

};
