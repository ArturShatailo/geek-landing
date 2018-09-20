$(document).ready(function () {


	var countW = 0,
		countH = 0,
		countS = 0;
	var watchObj = [],
		headphonesObj = [],
		speakersObj = [];
	var countMoreS2 = 0,
		countMoreS3 = 0,
		countMoreS4 = 0;


	$(".moreS2").on('click', function () {
		countMoreS2 = showMore(countMoreS2, $(".discriptionS02"), $(".discrS02"), $(".moreS2"));
	});
	$(".moreS3").on('click', function () {
		countMoreS3 = showMore(countMoreS3, $(".discriptionS03"), $(".discrS03"), $(".moreS3"));
	});
	$(".moreS4").on('click', function () {
		countMoreS4 = showMore(countMoreS4, $(".discriptionS04"), $(".discrS04"), $(".moreS4"));
	});

	$('.ScrollClass').on('click', function () {
		var scrollToSection = $(this).attr('href');
		if ($(scrollToSection).length != 0) {
			$('html, body').animate({
				scrollTop: $(scrollToSection).offset().top
			}, 700);
		}
		return false;
	});

	/*Slider*/
	$.ajax({
		url: 'watch.php',
		type: 'POST',
		data: {
			watch: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				watchObj.push(data[i]);
			}
		}
	});
	$.ajax({
		url: 'headphones.php',
		type: 'POST',
		data: {
			headphones: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				headphonesObj.push(data[i]);
			}
		}
	});
	$.ajax({
		url: 'speakers.php',
		type: 'POST',
		data: {
			speakers: 1
		},
		dataType: 'html',
		success: function (data) {
			data = JSON.parse(data);
			for (var i in data) {
				speakersObj.push(data[i]);
			}
		}
	});


	sliderAlive(".watchSlider", countW, watchObj);
	sliderAlive(".headPhonesSlider", countH, headphonesObj);
	sliderAlive(".speakersSlider", countS, speakersObj);
	/*Slider*/

	$('.char').css({
		'color': 'black',
		'border-bottom': '1px solid black'
	});
	$('.navTab').on('click', function () {
		$(this).css({
			'color': 'black',
			'border-bottom': '1px solid black'
		});
		$(this).parent('li').siblings('li').children('a').css({
			'color': 'grey',
			'border-bottom': '0px solid grey'
		});
		var open = $($(this).attr('href'));
		$($(this).attr('href')).siblings("div").fadeOut();
		setTimeout(function () {
			open.fadeIn();
		}, 400);
	});

	$('.openPopUp').on('click', function () {
		if ($(this).parent().parent().attr('id') == 'headphones') {
			fillPopUp(headphonesObj[$(this).attr('data-target')])
		}
		if ($(this).parent().parent().attr('id') == 'watches') {
			fillPopUp(watchObj[$(this).attr('data-target')])
		}
		if ($(this).parent().parent().attr('id') == 'speakers') {
			fillPopUp(speakersObj[$(this).attr('data-target')])
		}
		$('.popUpBack').fadeIn();
		$('.popUpBack').css('display', 'flex');
	});
	$('.closePopUp').on('click', function () {
		$('.popUpBack').fadeOut();
	});


	var amountC = 0;
	$('.topup').on('click', function () {
		if (Number($('.amountpopup p').html()) < 10) {
			amountC++
			$('.amountpopup p').html(amountC);
		}
	});
	$('.down').on('click', function () {
		if (Number($('.amountpopup p').html()) > 0) {
			amountC--;
			$('.amountpopup p').html(amountC);
		}
	});

	$('.submitBut').on('click', function () {

		var id = {
			amount: $('.amountpopup p').html(),
			price: $('.pricepopup').html(),
			name: $('#orderId').html(),
			email: $('#email').val(),
			phone: $('#phone').val()
		};


		$.ajax({
			url: "./send.php",
			type: "POST",
			data: id,
			dataType: "html",
			beforeSend: function () {},
			success: function (data) {
				//data = JSON.parse(data);
				// $.each(data, function () {

				console.log("ok");
				$('.order').html('<p class="popmsg">Thank you. <br>We will contact you by email or by phone you sent us.<br><br><br><a href="./index.html" class="to-main">Close this message</a></p>');
				$('.order').fadeIn();


			},
			error: function (jqXHR, textStatus, error) {
				console.log(jqXHR, textStatus, error);
			}
		});

	});
});


function fillPopUp(elemObj) {
	$('#orderId').html(elemObj.name);
	$('#characteristics p').html(elemObj.char);
	$('.imageofGoods').attr('src', elemObj.imageF);
	$('.pricepopup').html(elemObj.price + ' грн');
}


function sliderAlive(sliderBlock, countSl, Obj) {
	$(sliderBlock + ' .controlsSlider .nextSW').on('click', function () {
		countSl = sliderNext($(sliderBlock + ' .imagesSW img'), countSl, Obj, $(sliderBlock + ' .priceBlock .priceSWitem'));
		$(sliderBlock + ' .controlsSlider .prevItemSW p').html("0" + (countSl));
		$(sliderBlock + ' .controlsSlider .currentItemSW p').html("0" + (countSl + 1));
		$(sliderBlock + ' .controlsSlider .nextItemSW p').html("0" + (countSl + 2));
		$(sliderBlock + ' .priceBlock p').attr('data-target', countSl);
	});
	$(sliderBlock + ' .controlsSlider .prevSW').on('click', function () {
		countSl = sliderPrev($(sliderBlock + ' .imagesSW img'), countSl, Obj, $(sliderBlock + ' .priceBlock .priceSWitem'));
		$(sliderBlock + ' .controlsSlider .prevItemSW p').html("0" + (countSl));
		$(sliderBlock + ' .controlsSlider .currentItemSW p').html("0" + (countSl + 1));
		$(sliderBlock + ' .controlsSlider .nextItemSW p').html("0" + (countSl + 2));
		$(sliderBlock + ' .priceBlock p').attr('data-target', countSl);
	});
}




function showMore(countMore, textBlock, textCont, arrowMore) {
	if (countMore < 1) {
		textCont.animate({
			height: 300
		}, 1000);
		textBlock.animate({
			top: 12 + '%'
		}, 1000);
		arrowMore.css("transform", "rotateX(180deg)")
		countMore++;
	} else {
		textCont.animate({
			height: 180
		}, 1000);
		textBlock.animate({
			top: 25 + '%'
		}, 1000);
		arrowMore.css("transform", "rotateX(0deg)")
		countMore--;
	}
	return countMore
}

function sliderNext(slide, countSl, Obj, price) {
	slide.animate({
		top: -150,
		opacity: 0,
	}, 400);
	countSl++;
	if (countSl < Obj.length) {
		slide.animate({
			top: 100,
		}, 100);
		setTimeout(function () {
			slidefill(Obj[countSl], slide, price);
			slide.animate({
				top: 0,
				opacity: 1,
			}, 400);
		}, 200);
	} else {
		countSl = Obj.length - 1;
		slidefill(Obj[countSl], slide, price);
		slide.animate({
			top: -100,
		}, 100);
		setTimeout(function () {
			slidefill(Obj[countSl], slide, price);
			slide.animate({
				top: 0,
				opacity: 1,
			}, 400);
		}, 200);
	}
	return countSl
}

function sliderPrev(slide, countSl, Obj, price) {
	slide.animate({
		top: -150,
		opacity: 0,
	}, 400);
	countSl--;
	if (countSl >= 0) {

		slide.animate({
			top: 100,
		}, 100);
		setTimeout(function () {
			slidefill(Obj[countSl], slide, price);
			slide.animate({
				top: 0,
				opacity: 1,
			}, 400);
		}, 200);
	} else {
		countSl = 0;
		slidefill(Obj[countSl], slide, price);
		slide.animate({
			top: -100,
		}, 100);
		setTimeout(function () {
			slidefill(Obj[countSl], slide, price);
			slide.animate({
				top: 0,
				opacity: 1,
			}, 400);
		}, 200);
	}
	return countSl
}


function slidefill(elem, slide, price) {
	slide.eq(0).attr("src", elem.imageL);
	slide.eq(2).attr("src", elem.imageR);
	slide.eq(1).attr("src", elem.imageF);
	price.html(elem.price + ' грн');
}