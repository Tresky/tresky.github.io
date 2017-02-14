function sendEmail(token) {
	// var contactFormHost = 'http://oviedo-code-camp.herokuapp.com/',
  var contactFormHost = 'https://oviedo-code-camp.herokuapp.com/',
      form = $('#contact-form'),
      notice = form.find('#notice');

	if (form.length) {
    // showRecaptcha('recaptcha_widget');
    var data = form.serialize();
		data['g-recaptcha-response'] = token;
		console.log('Submitting', form)
    // form[0].submit(function(ev){
			console.log('Submitted Form')
      // ev.preventDefault();

      $.ajax({
        type: 'POST',
        url: contactFormHost + 'send_email',
        data: data,
        dataType: 'json',
        success: function(response) {
          switch (response.message) {
            case 'success':
              form.fadeOut(function() {
                form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
              });
              break;

            case 'failure_captcha':
              // showRecaptcha('recaptcha_widget');
              notice.text(notice.data('captcha-failed')).fadeIn();
              break;

            case 'failure_email':
              notice.text(notice.data('error')).fadeIn();
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          notice.text(notice.data('error')).fadeIn();
        }
      });
    // });
  }
}

// function showRecaptcha(element) {
//   Recaptcha.create('6LdZXBUUAAAAAAcwiwus50XnDLbLx-yI16XYL8Ov', element, {
//     theme: 'custom', // you can pick another at https://developers.google.com/recaptcha/docs/customization
//     custom_theme_widget: 'recaptcha_widget'
//   });
// }
//
// function setupRecaptcha() {
//   // var contactFormHost = 'http://oviedo-code-camp.herokuapp.com/',
//   var contactFormHost = 'http://localhost:9292/',
//       form = $('#contact-form'),
//       notice = form.find('#notice');
//
//   if (form.length) {
//     // showRecaptcha('recaptcha_widget');
//
//     form.submit(function(ev){
//       ev.preventDefault();
//
//       $.ajax({
//         type: 'POST',
//         url: contactFormHost + 'send_email',
//         data: form.serialize(),
//         dataType: 'json',
//         success: function(response) {
//           switch (response.message) {
//             case 'success':
//               form.fadeOut(function() {
//                 form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
//               });
//               break;
//
//             case 'failure_captcha':
//               // showRecaptcha('recaptcha_widget');
//               notice.text(notice.data('captcha-failed')).fadeIn();
//               break;
//
//             case 'failure_email':
//               notice.text(notice.data('error')).fadeIn();
//           }
//         },
//         error: function(xhr, ajaxOptions, thrownError) {
//           notice.text(notice.data('error')).fadeIn();
//         }
//       });
//     });
//   }
// }
//
// setupRecaptcha();



/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel
		.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#page-wrapper'),
			$banner = $('#banner'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Mobile?
			if (skel.vars.mobile)
				$body.addClass('is-mobile');
			else
				skel
					.on('-medium !medium', function() {
						$body.removeClass('is-mobile');
					})
					.on('+medium', function() {
						$body.addClass('is-mobile');
					});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly.
			$('.scrolly')
				.scrolly({
					speed: 1500,
					offset: $header.outerHeight()
				});

		// Menu.
			$('#menu')
				.append('<a href="#menu" class="close"></a>')
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'is-menu-visible'
				});

		// Header.
			if (skel.vars.IEVersion < 9)
				$header.removeClass('alt');

			if ($banner.length > 0
			&&	$header.hasClass('alt')) {

				$window.on('resize', function() { $window.trigger('scroll'); });

				$banner.scrollex({
					bottom:		$header.outerHeight() + 1,
					terminate:	function() { $header.removeClass('alt'); },
					enter:		function() { $header.addClass('alt'); },
					leave:		function() { $header.removeClass('alt'); }
				});

			}

	});

})(jQuery);
