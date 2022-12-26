import { errAlert } from './common.js';
const _header = document.getElementById('header');
const _footer = document.querySelector('.footer');
let _menuData = [];

function init() {
  createHeader();
  createFooter();
  getMenuData();
}
init();

function createHeader() {
  _header.innerHTML = `
      <div class="wrap header">
        <div class="header__content">
          <a class="header__content__logo" href="index.html">
            <h1>Veekend</h1>
            <img src="images/logo-veekend.svg" alt="Veekend" />
          </a>
          <div class="header__content__hamburger">
            <input type="checkbox" id="hamburger" />
            <label for="hamburger">
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </label>
          </div>
        </div>
        <nav id="nav" class="header__nav">
          <div class="header__nav__search">
            <input id="searchText" type="text" placeholder="搜尋" />
            <button id="searchButton"></button>
          </div>
          <div class="header__nav__menu">
            <div class="menu">
              <h3 class="menuUnderline"><span></span>新北市</h3>
              <div class="menu__district">
                <ul id="newTaipeiCity"></ul>
              </div>
              <i class="fa-solid fa-circle-chevron-down"></i>
            </div>
            <div class="menu">
              <h3 class="menuUnderline"><span></span>台北市</h3>
              <div class="menu__district">
                <ul id="taipeiCity"></ul>
              </div>
              <i class="fa-solid fa-circle-chevron-down"></i>
            </div>
            <div class="menu">
              <h3 class="menuUnderline"><span></span>其他</h3>
              <div class="menu__district lastDistrict">
                <ul id="otherCity"></ul>
              </div>
              <i class="fa-solid fa-circle-chevron-down"></i>
            </div>
            <div class="menu">
              <h3><a href="about.html">關於</a></h3>
              <i class="fa-solid fa-circle-info"></i>
            </div>
            <div class="menu">
              <h3><a href="login.html">登入</a></h3>
              <i class="fa-solid fa-circle-right"></i>
            </div>
          </div>
        </nav>
      </div>`;
  window.document.documentElement.scrollTop = 0;
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // 點擊 漢堡選單
  hamburger.addEventListener('click', function () {
    if (nav.style.display === 'block') {
      nav.style = 'display: none';
    } else {
      nav.style = 'display: block';
    }
  });

  // 視窗縮放 漢堡選單重置
  window.onresize = function () {
    let screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      nav.style = 'display: flex';
    } else if (screenWidth <= 768) {
      // 手機版會reset狀態
      hamburger.checked = false;
      nav.style = 'display: none';
    }
  };

  // 點擊 menu小動畫
  $(function () {
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

  // Go toTop
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  // 新增 搜尋事件
  addSearchEvent();
}

function createFooter() {
  _footer.innerHTML = `
      <div class="footer__photo"></div>
      <ul class="wrap footer__info">
        <li>
          <a href="mailto:s6102161021@yhaoo.com.tw">
            <img src="images/info-mail-y.png" alt="EMAIL" />
          </a>
          <a href="mailto:s6102161021@yhaoo.com.tw">
            <span>EMAIL</span>
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/meichenchan/vickys/">
            <img src="images/info-pin-y.png" alt="PINTEREST" />
          </a>
          <a href="https://www.pinterest.com/meichenchan/vickys/">
            <span>PINTEREST</span>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/s6102161021/">
            <img src="images/info-ins-y.png" alt="INSTAGRAM" />
          </a>
          <a href="https://www.instagram.com/s6102161021/">
            <span>INSTAGRAM</span>
          </a>
        </li>
        <li>
          <a href="index.html">
            <img src="images/info-website-y.png" alt="WEBSITE" />
          </a>
          <a href="index.html"><span>WEBSITE</span></a>
        </li>
      </ul>
      <p>Copyright 2022 © Vicky Chan</p>`;
}

function addSearchEvent() {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    const searchText = document.getElementById('searchText').value;
    if(searchText === ''){
      errAlert('請輸入欲搜尋的關鍵字喔！');
      return;
    }
    window.location.href = 'result.html?search=' + searchText;
  });
}

function getMenuData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _menuData = response.data.articles;
      createMenuDistrict();
    })
    .catch(function (err) {
      errAlert('資料有誤，請聯繫管理員～');
    });
}

function createMenuDistrict() {
  const newTaipeiCity = document.getElementById('newTaipeiCity');
  const taipeiCity = document.getElementById('taipeiCity');
  const otherCity = document.getElementById('otherCity');
  let newTaipeiCityStr = '';
  let taipeiCityStr = '';
  let otherCityStr = '';

  _menuData.forEach((item) => {
    if (item.city === '新北市') {
      newTaipeiCityStr += ` <li>
            <a href="article.html?week=${item.week}">${item.district}</a>
          </li>`;
    } else if (item.city === '台北市') {
      taipeiCityStr += ` <li>
            <a href="article.html?week=${item.week}">${item.district}</a>
          </li>`;
    } else {
      otherCityStr += ` <li>
            <a href="article.html?week=${item.week}"><i>${item.city}</i>${item.district}</a>
          </li>`;
    }
    newTaipeiCity.innerHTML =
      newTaipeiCityStr + '<li><a href="result.html?all=新北市">全地區</a></li>';
    taipeiCity.innerHTML =
      taipeiCityStr + '<li><a href="result.html?all=台北市">全地區</a></li>';
    otherCity.innerHTML =
      otherCityStr + '<li><a href="result.html?all=其他">全地區</a></li>';
  });
}
