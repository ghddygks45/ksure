$(document).ready(function () {

	if ($(window).width() > 1137) {
		// PC버전일때 draggable 실행
		$('.main-layer-popup.dragging').draggable();
	}

	$(window).scroll(function () {
		if ($(document).scrollTop() >= 1) {
			$("#wrap").removeClass('top_banner');
		} else {
			if ($(".top_banner_wrap").length <= 0) {
				$('.top_banner_wrap').each(function () {
					var banner = $(this);
					if (popupGetCookie($(this).attr("id"))) { // '오늘 하루 보지 않기 체크'를 했다면
						banner.remove();
						$("#wrap").removeClass('top_banner');
					} else {
						banner.show();
					}
				});
			} else {
				$("#wrap").addClass('top_banner');
			}
		}
	});

	// 메인 레이어팝업 (오늘 하루 보지 않기 체크된 팝업 히든 처리)
	$('.main-layer-popup').each(function () {
		var pop = $(this);
		if (popupGetCookie($(this).attr("id"))) { // '오늘 하루 보지 않기 체크'를 했다면
			pop.hide();
		} else {
			pop.show();
		}
	});

	// main_page_navi scroll
	$(".main_page_navi > li > a").on("click", function () {
		var headerHeight = $("header").outerHeight(); // 헤더 높이 구하기. outerHeight() 사용할 것
		var href = $(this).attr("href"); // 버튼의 링크 구하기
		var target = $(href == "#" || href == "" ? "body" : href); // 링크대상 DOM 구하기
		var position = target.offset().top - headerHeight; // 링크대상 DOM의 height위치 구하기

		$(".main_page_navi > li > a").removeClass("active");
		$(this).addClass("active");

		$("html, body").animate({
			// 에니메이션 효과를 넣어서 그 DOM으로 이동시키기
			scrollTop: position
		}, 600, "swing");
	});

	// 팝업존
	var popupzone = new Swiper('.popup_zone', {
		slidesPerView: 1,
		autoplay: {
			delay: 2500, // 시간 설정          
			disableOnInteraction: false, // false-스와이프 후 자동 재생        
		},
		navigation: {
			nextEl: ".popup_zone .btn_next",
			prevEl: ".popup_zone .btn_prev",
		}
	})

	setTimeout(function () {
		var total = $('.popup_zone > .swiper-wrapper > .swiper-slide').length;
		$('.num_end').html(total);
	}, 500);

	popupzone.on('activeIndexChange', function (index) {
		var total = $('.popup_zone > .swiper-wrapper > .swiper-slide').length;
		var idx = popupzone.realIndex + 1;
		$('.num_start').html(idx);
		$('.num_end').html(total);
	});

	$('.popup_zone .btn_pause').click(function () {
		$('.popup_zone .btn_pause').hide();
		$('.popup_zone .btn_play').show();
		popupzone.autoplay.stop();
	});

	$('.popup_zone .btn_play').click(function () {
		$('.popup_zone .btn_play').hide();
		$('.popup_zone .btn_pause').show();
		popupzone.autoplay.start();
	});

	// 리사이즈 했을 경우
	$(window).resize(function () {
		if (this.resizeTO) {
			clearTimeout(this.resizeTO);
		}
		this.resizeTO = setTimeout(function () {
			$(this).trigger('resizeEnd');
		}, 100);
	});


	// 리사이즈가 끝났을 경우
	$(window).on("resizeEnd", function () {
		if ($(this).width() < 1137) {
			$('.main-layer-popup.dragging').draggable('destroy');
		} else {
			$('.main-layer-popup.dragging').draggable();
		}
	});

})

// 레이어팝업 (오늘 하루 보이지 않기)
function PopupCloseDay(winName) {
	console.log('되는건가?')
	var id = $(winName).parents('.main-layer-popup').attr('id');
	var checked = $(winName).is(':checked');

	if (checked) {
		$(winName).prop('checked', true);
		mainPopupSetCookie(id, "done", 1);
	} else {
		deleteCookie(id);
	}
	// $('#' + id).hide();
}

// 레이어팝업 (일주일 보이지 않기)
function PopupCloseWeek(winName) {
	var id = $(winName).parents('.main-layer-popup').attr('id');
	var checked = $(winName).is(':checked');

	if (checked) {
		$(winName).prop('checked', true);
		mainPopupSetCookie(id, "done", 7);
	} else {
		deleteCookie(id);
	}
	// $('#' + id).hide();
}

// 메인 배너 (하루 보이지 않기)
function BannerCloseDay(winName) {
	var id = $(winName).parents('.top_banner_wrap').attr('id');
	var checked = $(winName).is(':checked');

	if (checked) {
		$(winName).prop('checked', true);
		mainPopupSetCookie(id, "done", 1);
	} else {
		deleteCookie(id);
	}
}

// 쿠키삭제
var deleteCookie = function (name) {
	document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// 레이어 팝업 닫기
function closePopup(obj) {
	$(obj).parents('.main-layer-popup').hide();
}

// 배너 닫기
function closeBanner(obj) {
	$(obj).parents('.top_banner_wrap').remove();
	$("#wrap").removeClass('top_banner');
}

// 레이어 팝업 쿠키 찾기
function popupGetCookie(name) {
	var nameOfCookie = name + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0)
			break;
	}
	return "";
}

// 레이어 팝업 쿠키 생성
function mainPopupSetCookie(name, value, expiredays) {
	var todayDate = new Date();
	todayDate = new Date(parseInt(todayDate.getTime() / 86400000) * 86400000 + 54000000);
	if (todayDate > new Date()) {
		expiredays = expiredays - 1;
	}
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}