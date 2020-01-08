$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 


function uniqueElements(arr) {
  let result = [];
  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
}


function showSuccessPopup () {
	$.magnificPopup.open({
		items: { src: 'popup-success.html' },
		type: 'ajax',    
		overflowY: 'scroll',
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in',
		ajax: {
			tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
		},
		callbacks: {
			open: function () {
				setTimeout(function(){
					$('.mfp-wrap').addClass('not_delay');
					$('.white-popup').addClass('not_delay');
				},700);
			}
	  }
	});
}


function zoomPrImg(el){
	$(document).on('mouseenter',el,function(){
		var $this = $(this);
		var $img = $(this).find('img');
		var $zoom = $img.attr('data-zoom') || 0;
		if ($zoom !== 0 && !$this.find('.zoom-img').length) {
			var image = new Image();
			image.src = $zoom;
			image.onload = function() {
				$this.append('<div class="zoom-img"></div>');
				$this.find('.zoom-img').append(image);
			}
		}
	});
}



jQuery(document).ready(function($){

	zoomPrImg('.pr-item-product-img');

	if(document.querySelector('.home-screen')) {
		/*$('.catalog-menu-toggler').addClass('opened');
		$('.catalog-menu').addClass('opened home-opened');*/
		$('.catalog-menu-wrap').addClass('disabled');
		$('.header-logo img').unwrap();
	}

	$(document).on('click','.catalog-menu-toggler.mobile',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$('.catalog-menu').toggleClass('opened');
	})

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}

	if ( $('.home-slick-slide').length > 1) {
		$('.home-slick').slick({
			dots: true,
			arrows: false,
			lazyLoad: 'ondemand',
			autoplay: true,
			autoplayTimeout: 4000
		})
	}


	backgrounded('.cat-grid');


	$('.slick-goods').slick({
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1230,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 850,
				settings: {
					slidesToShow: 1
				}
			}
		]
	})


	$('.slick-manufacters').slick({
		slidesToShow:6,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 570,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 2
				}
			}
		]
	})


	$('.slick-fabricators').slick({
		slidesToShow:6,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 570,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 2
				}
			}
		]
	})


	$(document).on('click','.filters-group-title',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
	})
	
	
	$('.catalog-menu > ul > li').each(function(key,item){
		if($(item).find('.catalog-menu-drop').length) {
			$(item).addClass('drop-in');
		}
	});


	$(document).on('click','.catalog-menu .drop-in > a', function(e){
		e.preventDefault();
		$('.catalog-menu .drop-in > a').not($(this)).removeClass('drop-opened');
		$('.catalog-menu .drop-in > a').not($(this)).next('.catalog-menu-drop').removeClass('opened');
		$(this).toggleClass('drop-opened');
		$(this).next('.catalog-menu-drop').toggleClass('opened');
	});
	$(document).on('mouseup',function(e){
    if ($('.catalog-menu .drop-in').has(e.target).length === 0) {
      $('.catalog-menu-drop').removeClass('opened');
      $('.catalog-menu .drop-in > a').removeClass('drop-opened');
    }
  });


	//смена активности кнопок в карточках товаров
  $(document).on('click','.pr-item-btn, .product-to-compare, .product-to-favorite',function(e){
  	e.preventDefault();
  	$(this).toggleClass('added');
  })



  $('.pr-list-gear').on('click',function(e){
  	e.preventDefault();
  	$('.drop-filters-toggler').click();
  })


  $(document).on('mouseup',function(e){
    if ($('.header-search').has(e.target).length === 0) {
      $('.search-autocomplete').removeClass('opened');
    }
  });



	$('.ui-range').ionRangeSlider();
	var rangeData = $('.ui-range').data('ionRangeSlider');
	$(document).on('change','#range_price_min',function(){
		$val = parseInt(this.value,10);
		if ($val !== NaN) {
			rangeData.update({
				from: $val
			})
		}
	});
	$(document).on('change','#range_price_max',function(){
		$val = parseInt(this.value,10);
		if ($val !== NaN) {
			rangeData.update({
				to: $val
			})
		}
	});


	$(document).on('click','.drop-filters-toggler',function(e){
		e.preventDefault();
		$(this).parent('.drop-filters').toggleClass('opened');
	})
	$(document).on('mouseup',function(e){
		if ($('.pr-list-settings').has(e.target).length === 0) {
      $('.drop-filters').removeClass('opened');
    }
  });


	var slickProduct = $('.slick-product'),
			slickPreviews;
  if ($('.slick-product-slide').length > 1) {
  	$('.slick-product-slide a').each(function(key,item){
  		$(item).attr('data-index',key);
  	});

  	slickPreviews = $('.slick-product-slide a').clone().attr('href','javascript:void(0)').removeClass('lightgallery').addClass('slick-product-preview');

		slickProduct.slick({
			arrows: false,
			infinite: false
		});

		$('.slick-product').after('<div class="slick-product-previews"></div>');
		$('.slick-product-previews').append(slickPreviews);
		$('.slick-product-preview:first').addClass('active');

		$('.slick-product-previews').slick({
			slidesToShow: 3,
			infinite: false
		});

		slickProduct.on('afterChange',function(slick,currentSlide){
			$('.slick-product-preview').removeClass('active');
			$('.slick-product-preview').eq(currentSlide.currentSlide).addClass('active');
		});

		$(document).on('click','.slick-product-preview',function(e){
			e.preventDefault();
			slickProduct.slick('slickGoTo',parseInt($(this).attr('data-index'),10));
			$('.slick-product-preview').removeClass('active');
			$(this).addClass('active');
		});
  }
	

	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	$(document).on('change','[name=f_delivery]',function(){
		var $price = this.dataset.price || '';
		var $title = this.dataset.title || '';
		var $hint = this.dataset.hint || '';
		var $icon = $(this).closest('label').find('.label-delivery-icon').html();
		var $txt = $(this).closest('label').find('.label-delivery-txt').html();
		var $template = `
		<div class="delivery-total-title">${$title}</div>
		<div class="delivery-total-card flex valign-center">${$icon} ${$title}</div>
		<div class="delivery-total-hint">${$hint}</div>
		<div class="delivery-total-prices">
			<div class="delivery-total-price-label">Стоимость</div>
			<div class="delivery-total-price">${$price}</div>
		</div>
		`
		$('.delivery-total').html($template);
	});


	//сравнение товаров
	var $difIndexes = [];
	for (var $iv = 0; $iv < $('.compare-table-characters').length; $iv++) {
		var $product = document.querySelectorAll('.compare-table-characters')[$iv];
		var $character = $product.querySelectorAll('.compare-table-character');

		for (var $in = 0; $in < $character.length; $in++) {
			var $firstValue = document.querySelectorAll('.compare-table-characters')[0].querySelectorAll('.compare-table-character')[$in].textContent;

			var $iterValue = document.querySelectorAll('.compare-table-characters')[$iv].querySelectorAll('.compare-table-character')[$in].textContent;

			if ($firstValue !== $iterValue) {

				$difIndexes.push($in);
			}
		}
	}
	var $uniqueIndexes = uniqueElements($difIndexes);
	$('.compare-table-characters, .compare-table-labels').each(function(key,item){
		$uniqueIndexes.forEach(function(el){
			$(item).find('.compare-table-character').eq(el).addClass('differents');
			$(item).find('.compare-table-label').eq(el).addClass('differents');
		})
	});

	$(document).on('click','.compare-link-diff',function(e){
		e.preventDefault();
		$('.compare-table-character, .compare-table-label').not('.differents').hide();
		$('.compare-table-menu-link').removeClass('active');
		$(this).addClass('active');
	})
	$(document).on('click','.compare-link-all',function(e){
		e.preventDefault();
		$('.compare-table-character, .compare-table-label').show();
		$('.compare-table-menu-link').removeClass('active');
		$(this).addClass('active');
	})



	$('.pr-list-headers').each(function(key,item){
		if($(item).find('.clickable').length) {
			$(item).wrap('<div class="pr-headers-wrap"></div>');
			$(item).before('<div class="pr-headers-sorting">Сортировать по: </div>');
		}
	});


	$(document).on('click','.pr-headers-sorting',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next().toggleClass('opened');
	});


	$('.review-item-toggler').on('click',function(e){
		e.preventDefault();
		if ($(this).text() == 'Подробнее') {
			$(this).addClass('opened');
			$(this).prev().addClass('opened');
			$(this).text('Свернуть');
		} else {
			$(this).removeClass('opened');
			$(this).prev().removeClass('opened');
			$(this).text('Подробнее');
		}
		
	});


	var $fixedLinkTarget = '';
	$(document).on('click','.fixed-link',function(e){
		e.preventDefault();
		var $target = this.dataset.target;
		var $targetEl = $('.'+$target);
		if (!$(this).hasClass('opened')) {
			$('.quick-popup').removeClass('opened');
			$targetEl.addClass('opened');
			$('.fixed-links').addClass('opened');
		} else {
			$('.fixed-links').removeClass('opened');
			$targetEl.removeClass('opened');
		}
		$('.fixed-link').not($(this)).removeClass('opened');
		$(this).toggleClass('opened')
		$fixedLinkTarget = $target;
	});
	$(document).on('mouseup',function(e){
    if ($('.fixed-links').has(e.target).length === 0) {
      $('.fixed-links, .fixed-link, .quick-popup').removeClass('opened');
    }
  });


  $(document).on('click','.ui-amount-plus',function(e){
  	e.preventDefault();
  	var $input = $(this).prev('input.ui-amount-input'),
  			$val = parseInt($input.val(),10);
  	$val = (isNaN($val)) ? 1 : $val;
  	$val++;
  	$input.val($val + ' шт.');
  });
  $(document).on('click','.ui-amount-minus',function(e){
  	e.preventDefault();
  	var $input = $(this).next('input.ui-amount-input'),
  			$val = parseInt($input.val(),10);
  	$val = (isNaN($val)) ? 1 : $val;
  	$val--;
  	if ($val >= 0) {
  		$input.val($val + ' шт.');
  	}
  });


	$('.slick-related').slick({
		slidesToShow: 3,
		infinite: false,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});


	//функция для навешивания изображений фоном
	function backgrounded (selector) {
		$(selector).each(function(){
			var $this = $(this),
			$src = $this.find('.bg').attr('src');
			if($this.find('.bg').length) {
				$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
			}
		});
	}


	$('.middle table').wrap('<div class="responsive-table"></div>');


	//галлерея для фотографий
  $('body').lightGallery({
  	selector: '.lightgallery',
  	download: false
	}); 


  if(matchMedia) {
		var screen992 = window.matchMedia('(max-width:992px)');
		screen992.addListener(changes);
		changes(screen992);
	}
	function changes(screen992) {
		if(screen992.matches) {
			$('.catalog-menu-toggler').addClass('mobile');
		} else {
			$('.catalog-menu-toggler').removeClass('mobile');
		}
	}

	$(document).on('click','.ordering-block-nav-prev',function(e){
		e.preventDefault();
		var $block = $(this).closest('.ordering-block'),
				$prev = $block.prev('.ordering-block');
		if ($prev.length) {
			var $offset = $prev.offset().top;
			$('html,body').animate({
				scrollTop:$offset-25
			},200);
		}
	});
	$(document).on('click','.ordering-block-nav-next',function(e){
		e.preventDefault();
		var $block = $(this).closest('.ordering-block'),
				$next = $block.next('.ordering-block');
		if ($next.length) {
			var $offset = $next.offset().top;
			$('html,body').animate({
				scrollTop:$offset-25
			},200);
		}
	});


	$(document).on('change','input[data-entity]',function(e){
		e.preventDefault();
		var $entity = $(this).attr('data-entity');
		$('.ordering-data-entity').hide();
		$('.ordering-data-entity[data-entity="'+$entity+'"]').show();
	})


	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   
	
	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});


	//стилизация элементов форм
	$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
		singleSelectzIndex: '1',
	});


	$(function() {
    $.fn.scrollToTop = function() {
	    $(this).hide().removeAttr("href");
	    if ($(window).scrollTop() >= "350") $(this).addClass('active')
	    var scrollDiv = $(this);
	    $(window).scroll(function() {
	     if ($(window).scrollTop() <= "350") $(scrollDiv).hide()
	     else $(scrollDiv).show()
	    });
	    $(this).click(function() {
	     $("html, body").animate({scrollTop: 0}, "slow")
	    })
    }
  });
	$(function() {
	 $(".scroll-top").scrollToTop();
	});


	$('.product-tabs a').tabs();

	$('.product-tabs a').bind('click',function(e){
		var $hash = $(this).attr('href');
		if ($($hash).find('.slick-slider').length) {
			$($hash).find('.slick-slider').slick('refresh');
		}
	});


	$(document).on('click','.drop-filter-toggler',function(e){
		e.preventDefault();
		$('.drop-filter-toggler').not($(this)).parent().removeClass('opened');
		$(this).parent('.drop-filter').toggleClass('opened');
	});


	$('.mask-phone').mask("+7 (999)-999-99-99");


	//удалить. Только для теста
  $('.header-search-input').on('input',function(){
  	if (this.value.length >= 2) {
  		$('.search-autocomplete').addClass('opened');
  	} else {
  		$('.search-autocomplete').removeClass('opened');
  	}
  });

  let $turnicateHeightEls = document.querySelectorAll('.news-item-desc');
  $turnicateHeightEls.forEach(function(el){
  	new Dotdotdot(el,{
	  	height: 150
	  });
  });

  $(document).on('click','.to-first-ordering-block',function(e){
  	e.preventDefault()
  	if ($('.ordering-block').length) {
  		let $offset = $('.ordering-block:first').offset().top;
  		$('html,body').animate({
				scrollTop:$offset-25
			},200);
  	}

	})
	

	function sameFunction(
		// alert('alert');
	)


});//ready close





$(window).on('load',function(){
	
	$('.isotope').addClass('loaded');
	$('.isotope').masonry({
	  itemSelector: '[class^="flx-"]'
	});

});