(function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		
	//Animation
	
	$(document).ready(function() {
		$('body.hero-anime').removeClass('hero-anime');
	});

	//Menu On Hover
		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	
	//Switch light/dark
	
	
  })(jQuery);

	
  $('body')
  .on('click', 'div.three button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.three input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
  .on('click', 'div.four button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.four input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
  .on('click', 'div.five button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.five input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
  .on('click', 'div.six button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.six input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
  .on('click', 'div.thirteen button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.thirteen input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
  .on('click', 'div.fourteen button.btn-search', function(event) {
    event.preventDefault();
    var $input = $('div.fourteen input');
    $input.focus();
    if ($input.val().length() > 0) {
      // submit form
    }
  })
;