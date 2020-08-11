

/**
 * @name initValidation
 *
 * @description
 */
const initValidation = () => {
	(function($) {
		$.fn.inputFilter = function(inputFilter) {
			return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
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
	}(jQuery));


	/**
	 * Integer >= 0 (use + and - separator)
	 */
	const uintTextPhoneBox = () => {
		$("[uintTextPhoneBox-js]").inputFilter(function(value) { return /^\+?[0-9\s\-]*$/.test(value); });
	};

	uintTextPhoneBox();

	/**
	 *
	 * @param form
	 */
	const validationSubmitHandler = (form) => {
		$('.try__form-loader').addClass('is-show');

		$.ajax({
			type: "POST",
			url: $(form).attr('action'),
			data: $(form).serialize(),
			success: (response) => {
				const data = $.parseJSON(response);

				if (data.success) {
					$('.try__form-loader').removeClass('is-show');

					$('.try__form-message').addClass('is-show');
					setTimeout((ev) => {
						$('.try__form-message').removeClass('is-show');
					}, 3000);

					$(form).find('input, textarea').val('');
				} else {
					// do something
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(textStatus + ' : ' + errorThrown);
			}
		});
	};

	/**
	 *
	 * @param error
	 * @param element
	 */
	const validationErrorPlacement = function(error, element) {
		error.appendTo(element.closest('.try__form-field'));
	};

	/**
	 *
	 * @param element
	 */
	const validationHighlight = (element) => {
		$(element).closest('.try__form-field').addClass('is-error');
	};

	/**
	 *
	 * @param element
	 */
	const validationUnhighlight = (element) => {
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
		onkeyup: function(element) {
			$(element).valid();
		},
		rules: {
			name: 'required',
			email: {
				required: true,
				email: true
			},
			phone: 'required',
			message: 'required',
		},
		messages: {
			name:  {
				required: "Please specify the Name",
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
