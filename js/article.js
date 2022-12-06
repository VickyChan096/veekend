$(function () {
  $('.article__top__catalog').click(function (event) {
    $(this).find('i').toggleClass('active');
    $(this).find('ul').toggleClass('close');
  });
});
