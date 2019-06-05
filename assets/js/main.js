$(function () {

  // Carousel for features
  $(".features").slick({
    infinite: true,
    arrows: false,
    draggable: false,
    slidesToScroll: 1,
    slidesToShow: 2,
    mobileFirst: true,
    focusOnSelect: true,
    swipe: false,
    asNavFor: '.ghost',

    responsive: [{
      breakpoint: 1248,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 812,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      }
    }, {
      breakpoint: 576,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    }]
  }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(".feature-description").removeAttr('data-scroll').fadeOut(function() {
      $(this).empty().html($('[data-slick-index="' + nextSlide + '"]').find("[data-description]").attr('data-description'));
    });
  }).on('afterChange', function (event, slick, currentSlide) {
    $(".feature-description").fadeIn();
  });

  $(".ghost").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });

  // Carousel for story
  $(".story").slick({
    autoplay: false,
    autoplaySpeed: 5000,
    infinite: true,
    arrows: false,
    dots: true,
    appendDots: '.story-dots',
    pauseOnDotsHover: true,
    draggable: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    fade: true,
    speed: 500,
    waitForAnimate: false,
    mobileFirst: true
  });

  // Full page scrollsnapping
  $.scrollify({
    section: "section",
    sectionName: 'section-name',
    interstitialSection: ".nosnap",
    easing: "easeOutExpo",
    updateHash: false,
    scrollSpeed: 1100,
    before: function(i, sections) {
      var ref = sections[i].attr("data-section-name");
      $(".pagination .active").removeClass("active");
      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterResize: function () {
      if ($(window).width() <= 992) {
        $.scrollify.disable();
      } else {
        $.scrollify.enable();
      }
    },
    afterRender: function () {
      // Pagination
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $("[data-section-name]").each(function (i) {
        if (i === 0) {
          pagination += "<li><a class=\"active\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">Home</span></a></li>";
        } else {
          pagination += "<li><a href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).find('h2').html() + "</span></a></li>";
        }
      });
      pagination += "</ul>";
      $("body").append(pagination);
      $(".pagination a").on("click", function(e) {
        e.preventDefault();
        $.scrollify.move($(this).attr("href"));
      });

      // Disable on mobile
      if ($(window).width() <= 992) {
        $.scrollify.disable();
      } else {
        $.scrollify.enable();
      }
    }
  });

  // Contact form
  $('.cta a').click(function(e) {
    e.preventDefault();
    $.scrollify.move($(this).attr("href"));
  });

  $('#contact-form').submit(function (event) {
    event.preventDefault();

    var formEl = $(this);
    var submitButton = $('button[type=submit]', formEl);
    var currentButtonLabel = submitButton.html();

    $.ajax({
      type: 'POST',
      url: formEl.prop('action'),
      accept: {
        javascript: 'application/javascript'
      },
      data: formEl.serialize(),
      beforeSend: function () {
        submitButton.html('Sending…');
        submitButton.prop('disabled', 'disabled');
      }
    }).done(function (data) {
      setTimeout(function () {
        submitButton.html('Sent!');
        setTimeout(function () {
          submitButton.html(currentButtonLabel);
          submitButton.prop('disabled', false);
        }, 1000);
      }, 1000);
    });
  });

});

document.addEventListener('DOMContentLoaded', function () {
  var scope = {};
  var trigger = new ScrollTrigger({
    toggle: {
      visible: 'scroll-visible',
      hidden: 'scroll-hidden'
    },
    once: false,
  }, document.body, window);

  trigger.callScope = scope;

  scope.updateArt = function (artPerc) {
    $(this).closest('.hero').find('.latest').delay(500).fadeIn('slow');

    $('.scroll-detector').removeClass('latest-scroll-detected');
    $(this).addClass('latest-scroll-detected');
    $('.swarm').fadeIn();
    var artPerc = artPerc.replace(/\s/g, '').split(',');
    updateArt(artPerc[0], artPerc[1]);
  };

  scope.hideArt = function (value) {
    $('.swarm').fadeOut();
  };

  scope.hideLatest = function() {
    $('.latest').fadeOut();
  }

  scope.startStory = function () {
    $(".story").slick('slickPlay');
  }
});