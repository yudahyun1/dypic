(function (exports, $, win) {
  var exports = exports;
  var $win = $(window);
  var $html = $('html');
  var $body = $('body');
  var $header = $('#header');

  $(function () {
    $html = $('html');
    $body = $('body');
    $header = $('#header');

    $('body').on('click', '.mobile_image_sensor_solution_static__sns__btn-link', function (event) {
      PD06_urlCopy(location.href);
    });

    //video play popup
    $('body').on('click', '.btnPlayVideoOpen', mobile_image_sensor_videoPopOpen);
    $('body').on('click', '.btnPlayVideoClose', mobile_image_sensor_videoPopClose);

    // sns
    mobile_image_sensor_sns.clickEvent('.mobile_image_sensor_solution_static__sns__btn-facebook', 0);
    mobile_image_sensor_sns.clickEvent('.mobile_image_sensor_solution_static__sns__btn-twitter', 1);
    mobile_image_sensor_sns.clickEvent('.mobile_image_sensor_solution_static__sns__btn-in', 2);

    mobile_image_sensor_pictureIEFallback();

    $(window).resize(function () {
      mobile_image_sensor_pictureIEFallback();
    });
  });

  function PD06_urlCopy(url, msg) {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.setAttribute('aria-hidden', 'true');
    textarea.style.position = 'fixed';
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    PD06_toastMsg();
  }

  function PD06_toastMsg(msg, time) {
    if (msg) {
      msg = msg;
    } else {
      msg = 'Link copied to clipboard';
    }

    if (time) {
      time = time;
    } else {
      time = 3000;
    }
    $('.alert-toast-msg').remove();

    $('body').append("<div class='alert-toast-msg' role='alert' aria-live='polite'>" + msg + '</div>');

    setTimeout(function () {
      $('.alert-toast-msg').addClass('hide');
    }, time);
  }

  // sns
  const mobile_image_sensor_sns = {
    $snsBtn: $('.mobile_image_sensor_solution_static__sns'),
    currentUrl: document.location.href,
    sharArray: ['http://www.facebook.com/sharer.php?s=100&u=', 'https://twitter.com/intent/tweet?url=', 'http://www.linkedin.com/shareArticle?mini=true&source=samsung.com&url='],
    init: function () {
      //
    },
    clickEvent: function (snsName, arraycode) {
      mobile_image_sensor_sns.$snsBtn.find(snsName).on('click', function (event) {
        if ($(this).attr('href') == '#none') {
          event.preventDefault();
        }
        window.open(mobile_image_sensor_sns.sharArray[arraycode] + mobile_image_sensor_sns.currentUrl);
      });
    },
  };

  function mobile_image_sensor_videoPopOpen(event) {
    const $isGnb = $('.CO04_gnb');
    $('.mobile_image_sensor_solution_static__popup').attr('aria-hidden', 'false');
    $('html').css({ height: window.innerHeight });
    $('html').css({
      overflowY: 'hidden',
      touchAction: 'none',
    });

    if ($isGnb.length > 0) {
      $('.btnPlayVideoClose').css('top', 24 + $isGnb.innerHeight() + 'px');
    }

    event.preventDefault();
  }
  function mobile_image_sensor_videoPopClose() {
    if ($('video').length > 0) {
      var playVideo = $('video')[0];
      playVideo.pause();
      playVideo.currentTime = 0;
    } else if ($('iframe').length > 0) {
      $('iframe').attr('src', $('iframe').attr('src'));
    }
    $('.mobile_image_sensor_solution_static__popup').attr('aria-hidden', 'true');
    $('html').css({ height: '' });
    $('html').css({ overflowY: '', touchAction: '' });
  }

  function mobile_image_sensor_pictureIEFallback() {
    let isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
    let isMobile = window.innerWidth > 0 && window.innerWidth <= 767;
    const isIE = navigator.userAgent.indexOf('Trident') > -1 || navigator.userAgent.indexOf('MSIE') > -1;
    const target = $('picture > img');

    if (!isIE) {
      return;
    } else {
      target.each(function () {
        if (isTablet) {
          if ($(this).attr('src') !== $(this).attr('data-tablet-src')) {
            $(this).attr({
              src: $(this).attr('data-tablet-src'),
              width: $(this).attr('data-tablet-width'),
              height: $(this).attr('data-tablet-height'),
            });
          }
        } else if (isMobile) {
          if ($(this).attr('src') !== $(this).attr('data-mobile-src')) {
            $(this).attr({
              src: $(this).attr('data-mobile-src'),
              width: $(this).attr('data-mobile-width'),
              height: $(this).attr('data-mobile-height'),
            });
          }
        } else if (!isTablet && !isMobile) {
          if ($(this).attr('src') !== $(this).attr('data-pc-src')) {
            $(this).attr({
              src: $(this).attr('data-pc-src'),
              width: $(this).attr('data-pc-width'),
              height: $(this).attr('data-pc-height'),
            });
          }
        }
      });
    }
  }

  //exports.popupBase = popupBase;
})(this, this.jQuery, window);
