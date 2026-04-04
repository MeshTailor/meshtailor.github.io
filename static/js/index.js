window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "https://homes.cs.washington.edu/~kpar/nerfies/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var wrapper = document.querySelector('#interpolation-image-wrapper');
  if (!wrapper) return;
  var image = interp_images[i];
  if (!image) return;
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $(wrapper).empty().append(image);
}

$(document).ready(function() {
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  var carouselEls = document.querySelectorAll('.carousel');
  if (carouselEls.length > 0) {
    var options = {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    };
    var carousels = bulmaCarousel.attach('.carousel', options);
    for (var i = 0; i < carousels.length; i++) {
      carousels[i].on('before:show', function(state) {
        if (typeof console !== 'undefined' && console.debug) console.debug(state);
      });
    }
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
      element.bulmaCarousel.on('before-show', function(state) {
        if (typeof console !== 'undefined' && console.debug) console.debug(state);
      });
    }
  }

  var interpSlider = document.querySelector('#interpolation-slider');
  var interpWrapper = document.querySelector('#interpolation-image-wrapper');
  if (interpSlider && interpWrapper) {
    preloadInterpolationImages();
    $('#interpolation-slider').on('input', function() {
      setInterpolationImage(parseInt(this.value, 10));
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);
  }

  if (document.querySelector('.slider')) {
    bulmaSlider.attach();
  }
});
