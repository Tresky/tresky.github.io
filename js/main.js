function setupEmailRecaptcha() {
  var contactFormHost = 'https://oviedo-code-camp.herokuapp.com/',
      form = $('#contact-form'),
      notice = form.find('#notice');

	if (form.length) {
    form.submit(function(ev){
			var data = form.serialize();
      ev.preventDefault();

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
    });
  }
}

function setupRegisterForm() {
  var host = 'https://oviedo-code-camp.herokuapp.com/',
      form = $('#registerForm'),
      notice = form.find('#notice');

  var handler = StripeCheckout.configure({
    key: 'pk_test_GcdOiiCVGjbgaFj5UeVZHKkC',
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    zipCode: true,
    allowRememberMe: false,
    token: function(token) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.

      var data = form.serialize();
      data += '&stripeToken=' + token.id + '&stripeEmail=' + token.email;

      $.ajax({
        type: 'POST',
        url: host + 'register',
        data: data,
        dataType:'json',
        success: function(response) {
          notice.fadeOut();
          switch (response.message) {
            case 'success':
              form.fadeOut(function() {
                form.html('<h2 style="text-align:center;">Thank you for registering for camp!</h2><br /><h4 style="text-align:center;">Please check your inbox for a confirmation and receipt of your payment.We will contact you again as the camp approaches.<br /><br />We are really excited to meet you and look forward to the summer!</h4>').fadeIn();
              });
              break;

            case 'failure_creatingcustomer':
              notice.text('We encountered an error with Stripe. Please refresh the page and try again.').fadeIn();
              break;
            case 'failure_classfull':
              notice.text('The class you are registering for is already full. Please select a different one.').fadeIn();
              break;
            case 'failure_wrongage':
              notice.text('Your child does not meet the age requirements for this class.').fadeIn();
              break;
            case 'failure_creatingcharge':
              notice.text('We encountered an error with Stripe. Please refresh the page and try again.').fadeIn();
              break;
            case 'failure_missingparams':
              notice.text('You are missing some fields that are required. Please review your form.').fadeIn();
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          notice.text('We encountered an error with our servers. We apologize for the inconvenience. You have not been charged.').fadeIn();
        }
      })
    }
  });

  var submit = $('#submit');
  if (submit.length) {
    submit.click(function(ev) {
      ev.preventDefault();
      handler.open({
        name: 'Oviedo Code Camp',
        description: 'Preparing your child for the future.',
        amount: 35000,
	    email: $('#email').val()
      });
    });
  }

  window.addEventListener('popstate', function() {
    handler.close();
  });
}

function loadClassData() {
  var host = 'https://oviedo-code-camp.herokuapp.com/';

  $.ajax({
    type: 'GET',
    url: host + 'classes',
    dataType:'json',
    success: function(classes) {
      if ($('#about').length > 0) {
        var elem = $('.elem.options-container');
        var middle = $('.middle.options-container');

        classes.forEach(function(camp) {
          var dates = '';
          var which = '';
          if (camp.name == 'foundations-elem-1') {
            dates = 'June 12-16';
            which = 'elem';
          } else if (camp.name == 'foundations-elem-2') {
            dates = 'June 19-23';
            which = 'elem';
          } else if (camp.name == 'foundations-middle-1') {
            dates = 'June 26-30';
            which = 'middle';
          } else if (camp.name == 'foundations-middle-2') {
            dates = 'July 10-14';
            which = 'middle';
          }

          var availability = 'Available';
          if (camp.num_registered >= 9) {
            availability = 'Almost Full';
          }
          if (camp.num_registered == 11) {
            availability = 'Last Slot';
          }
          if (camp.num_registered >= 12) {
            availability = 'Full';
          }

          var html = '<div class="class-option' + ((availability == 'Full') ? 'full' : '') + '">';
          html += '<span class="date">' + dates + '</span>';
          html += '<span class="availability">' + availability + '</span>';
          html += '</div>';

          if (which == 'elem') {
            elem.append(html);
          } else if (which == 'middle') {
            middle.append(html);
          }
        });
      }

      if ($('#register').length > 0) {
        var container = $('#camp-selection');
        classes.forEach(function(camp) {
          if (camp.num_registered >= 12) {
            return;
          }

          var title = '';
          if (camp.name == 'foundations-elem-1') {
            title = 'Elementary (June 12-16)';
          } else if (camp.name == 'foundations-elem-2') {
            title = 'Elementary (June 19-23)';
          } else if (camp.name == 'foundations-middle-1') {
            title = 'Middle (June 26-30)';
          } else if (camp.name == 'foundations-middle-2') {
            title = 'Middle (July 10-14)';
          } else {
            return;
          }

          container.append('<option value="' + camp.name + '">' + title + '</option>');
        });
      }
    }
  });
}

setupEmailRecaptcha();
setupRegisterForm();
loadClassData();

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
