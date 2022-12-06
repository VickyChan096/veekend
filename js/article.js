$(function () {
  $('.catalogBtn').click(function (event) {
    $(this).find('i').toggleClass('active');
    $(this).parent().find('ul').slideToggle('slow');
  });
});
