const _hamburger = document.getElementById('hamburger');
const _nav = document.getElementById('nav');
const _newTaipeiCity = document.getElementById('newTaipeiCity');
const _taipeiCity = document.getElementById('taipeiCity');
const _otherCity = document.getElementById('otherCity');
const _popularPost = document.getElementById('popularPost');
const _hashTags = document.getElementById('hashTags');
let _articleList = [];
let _randomNum = [];
let _sortTags = [];

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
      createRandomNum();
      createPopularPost(_randomNum);
      sortAllTags();
      createHashTags(_sortTags);
    })
    .catch(function (err) {
      swal({
        title: 'Σ(ﾟдﾟ) 哇糟糕了',
        text: '資料有問題，請聯絡站長',
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

function createRandomNum() {
  let articleIndex = [];

  _articleList.forEach((item, index) => {
    articleIndex.push(index);
  });

  const ranNum = 3;
  for (let i = 0; i < ranNum; i++) {
    let ran = Math.floor(Math.random() * (articleIndex.length - i));
    if (_randomNum.includes(articleIndex[ran])) {
      continue;
    }
    _randomNum.push(articleIndex[ran]);
    articleIndex[ran] = articleIndex[articleIndex.length - i - 1];
  }
  console.log(`隨機熱門文章：${_randomNum} 數字+1為週數`);
}

function createPopularPost(random) {
  let str = '';

  _articleList.forEach((item, index) => {
    if (index === random[0]) {
      str += createListStr(item);
    } else if (index === random[1]) {
      str += createListStr(item);
    } else if (index === random[2]) {
      str += createListStr(item);
    }
  });
  _popularPost.innerHTML = str;
}

function createListStr(item) {
  let content = `
        <li>
          <a href="article.html?week=${item.week}">
            <img src="images/week${item.week}/cover-s.jpg" />
            <p>${item.title}</p>
          </a>
        </li>`;
  return content;
}

function sortAllTags() {
  let allTags = [];
  let countAllTags = '';
  let newTags = [];

  // 1.將所有tag加總
  _articleList.forEach((item) => {
    allTags = allTags.concat(item.hashTags);
  });

  // 2.統計各tag的出現次數(產生object)
  countAllTags = allTags.reduce((object, item) => {
    if (item in object) {
      object[item]++;
    } else {
      object[item] = 1;
    }
    return object;
  }, {});

  // 3.依物件的value大>小排序，留下key值並轉成array
  newTags = Object.fromEntries(
    Object.entries(countAllTags).sort((a, b) => b[1] - a[1])
  );
  console.log(`標籤統計結果：${JSON.stringify(newTags)}`);
  _sortTags = Object.keys(newTags);
}

function createHashTags(array) {
  let str = '';
  for (let i = 0; i < 10; i++) {
    let content = `<li><a href="#">${array[i]}</a></li>`;
    str += content;
  }
  _hashTags.innerHTML = str;
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

// ToTop與menu點擊事件
$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

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
