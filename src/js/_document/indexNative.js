/**
 * @description Document DOM ready.
 */
(function () {
	/*
	* CALLBACK :: start
	* ============================================= */
	const seeVideoToggle = () => {
		const myVideo = document.getElementById("video");

		function playPause() {
			const videoNode = document.querySelector('[see-videoNode-js]');

			if (myVideo.paused) {
				videoNode.classList.add('is-play');
				myVideo.play();
			} else {
				videoNode.classList.remove('is-play');
				myVideo.pause();
			}
		}

		if(myVideo) {
			document.querySelector('[see-play-js]').addEventListener('click', (ev) => {
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
	const initNative = () => {
		// default
		initPreventBehavior();
		// ==========================================

		// lib
		initSwiper();
		initHamburger();
		// ==========================================

		// callback
		seeVideoToggle();
		// ==========================================
	};
	initNative();
})();
