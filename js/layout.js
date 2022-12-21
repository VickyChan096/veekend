const _hamburger = document.getElementById('hamburger');
const _nav = document.getElementById('nav');
const _newTaipeiCity = document.getElementById('newTaipeiCity');
const _taipeiCity = document.getElementById('taipeiCity');
const _otherCity = document.getElementById('otherCity');
let _articleList = [];

function init() {
  // 在按鈕元素或body/html上綁定一個touchstart事件激發:active狀態。
  document.body.addEventListener('touchstart', function () {});
  getData();
}
init();

function getData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    // .get('../dataBase/db.json')
    .then(function (response) {
      _articleList = response.data.articles;
      createMenuDist();
    })
    .catch(function (err) {
      swal({
        title: 'Σ(ﾟдﾟ) 哇糟糕了',
        text: '找不到文章，帶你回首頁',
        icon: 'warning',
        button: '確定',
        className: 'swalBtn',
      }).then(function () {
        window.location.href = 'index.html';
      });
    });
}

function createMenuDist() {
  let newTaipeiCityStr = '';
  let taipeiCityStr = '';
  let otherCityStr = '';
  _articleList.forEach((item) => {
    if (item.city === '新北市') {
      newTaipeiCityStr =
        newTaipeiCityStr +
        ` <li>
            <a href="article.html?week=${item.week}">${item.district}</a>
          </li>`;
    } else if (item.city === '台北市') {
      taipeiCityStr =
        taipeiCityStr +
        ` <li>
            <a href="article.html?week=${item.week}">${item.district}</a>
          </li>`;
    } else {
      otherCityStr =
        otherCityStr +
        ` <li>
            <a href="article.html?week=${item.week}"><i>${item.city}</i>${item.district}</a>
          </li>`;
    }
    _newTaipeiCity.innerHTML =
      newTaipeiCityStr + '<li><a href="">全地區</a></li>';
    _taipeiCity.innerHTML = taipeiCityStr + '<li><a href="">全地區</a></li>';
    _otherCity.innerHTML = otherCityStr + '<li><a href="">全地區</a></li>';
  });
}

// 漢堡選單toggle
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

    // 小網地區開合 與 同級元素關閉
    $(this).find('.menu__district').toggleClass('active');
    $(this).siblings().find('.menu__district').removeClass('active');

    // 大網h3底線(偽元素)開合 與 同級元素關閉
    $(this).find('.menuUnderline').toggleClass('active');
    $(this).siblings().find('.menuUnderline').removeClass('active');

    // 大網icon換色 與 同級元素關閉
    $(this).find('i').toggleClass('active');
    $(this).siblings().find('i').removeClass('active');
  });
});
