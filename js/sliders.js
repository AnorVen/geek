$("#slider").rangeSlider({
  bounds: {min: 52, max: 400},
  defaultValues: {min: 80, max: 200}
});



let sliderTimer;
let slideTime = 2000;
let slider__img = $('.slider__img');
let slideWidth = slider__img.width;
let a_slider = slider__img.children().length;


$(function () {
  slider__img.width(a_slider * slideWidth);
  sliderTimer = setInterval(function() {
    // console.log('11');

    let currentSlide = 1;
    currentSlide++;
    if (currentSlide >= a_slider) {
      slider__img.css('left', -(currentSlide - 2) * slideWidth);
      slider__img.append(slider__img.children().first().clone());
      slider__img.children().first().remove();
      currentSlide--;
    }
    slider__img.animate({left: -currentSlide * slideWidth}, 300).data('current', currentSlide);


  }, slideTime);

});


$('.slider__single').owlCarousel({
  nav: false,
  loop: true,
  items: 3,
  dots: false
});
$('.also__prod').owlCarousel({
  loop:true,
  items: 4,
  autoplay: true,
  margin: 30
});