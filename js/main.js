const swiper = new Swiper('.swiper', {
  speed: 1000,
  effect: 'slide',
  grabCursor: true,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  parallax: true,
});

//鼠标移入停止自动滚动
$('.swiper-slide').mouseenter(function () {
  swiper.autoplay.stop();
});
//鼠标移出开始自动滚动
$('.swiper-slide').mouseleave(function () {
  swiper.autoplay.start();
});