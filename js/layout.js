const _hamburger = document.getElementById('hamburger');
const _nav = document.getElementById('nav');
const _newTaipeiCity = document.getElementById('newTaipeiCity');
const _taipeiCity = document.getElementById('taipeiCity');
const _otherCity = document.getElementById('otherCity');
let _articlesData = [];

function init() {
  // 點擊 小網效果
  document.body.addEventListener('touchstart', function () {});
}
init();

axios
  .get('https://vickychan096.github.io/veekend/dataBase/db.json')
  .then(function (response) {
    _articlesData = response.data.articles;
    console.log(_articlesData);

    let newTaipeiCityStr = '';
    let taipeiCityStr = '';
    let otherCityStr = '';
    _articlesData.forEach(function (item) {
      if (item.city === '新北市') {
        let content = `<li>
          <a href="article.html?week=${item.week}">${item.district}</a>
        </li>`;
        newTaipeiCityStr += content;
      } else if (item.city === '台北市') {
        let content = `<li>
          <a href="article.html?week=${item.week}">${item.district}</a>
        </li>`;
        taipeiCityStr += content;
      } else {
        let content = `<li>
          <a href="article.html?week=${item.week}"><i>${item.city}</i>${item.district}</a>
        </li>`;
        otherCityStr += content;
      }
      _newTaipeiCity.innerHTML = newTaipeiCityStr + '<li>全地區</li>';
      _taipeiCity.innerHTML = taipeiCityStr + '<li>全地區</li>';
      _otherCity.innerHTML = otherCityStr + '<li>全地區</li>';
    });
  })
  .catch(function (err) {
    alert(err);
  });

// 漢堡選單toggle TODO:加過場動畫
_hamburger.addEventListener('click', function () {
  if (_nav.style.display === 'block') {
    _nav.style = 'display: none';
  } else {
    _nav.style = 'display: block';
  }
});

// 視窗縮放>漢堡選單reset
window.onresize = function () {
  let screenWidth = window.innerWidth;
  if (screenWidth > 768) {
    _nav.style = 'display: flex';
  } else if (screenWidth <= 768) {
    // 手機版會reset狀態
    _hamburger.checked = false;
    _nav.style = 'display: none';
  }
};

$(function () {
  // toTop按鈕淡入淡出
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  // menu點擊事件
  $('.menu').click(function (event) {
    // 小網箭頭轉向 與 同級元素關閉
    $(this).find('span').toggleClass('active');
    $(this).siblings().find('span').removeClass('active');

    // 小網地區開合 與 同級元素關閉 TODO:加過場動畫
    $(this).find('.menu__district').toggleClass('active');
    $(this).siblings().find('.menu__district').removeClass('active');

    // 大網h3底線(偽元素)開合 與 同級元素關閉
    $(this).find('.menuUnderline').toggleClass('active');
    $(this).siblings().find('.menuUnderline').removeClass('active');

    // 大網icon換色 與 同級元素關閉
    $(this).find('i').toggleClass('active');
    $(this).siblings().find('i').removeClass('active');
  });

  // 地區li點擊事件
  $('.menu__district li').click(function (event) {
    // li底色換色 與 同級元素關閉 與 遍歷同元素關閉
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
    $(this).closest('.menu').siblings().find('li').removeClass('active');
  });
});
