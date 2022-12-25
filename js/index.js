import { _blackIcon, errAlert } from './commonFunction.js';

let _map;
let _data = [];
let _mapData = [];

function init() {
  fireSwiper();
  mapInit();
  getMapData();
  articleListInit();
}
init();

// 啟動 輪播
function fireSwiper() {
  const swiper = new Swiper('.swiper', {
    speed: 1000,
    effect: 'slide',
    grabCursor: true,
    autoplay: {
      // 解決小網手動操作後停止自動輪播
      disableOnInteraction: false,
      delay: 3000,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    parallax: true,
  });

  // 滑鼠移入停止自動滑動
  $('.swiper-slide').mouseenter(function () {
    swiper.autoplay.stop();
  });
  // 滑鼠移出開始自動滑動
  $('.swiper-slide').mouseleave(function () {
    swiper.autoplay.start();
  });
}

// 初始化 map
function mapInit() {
  _map = L.map('map', {
    center: [23.97565, 120.9738819],
    zoom: 7,
    zoomControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>｜已探索景點`,
  }).addTo(_map);
}

// 初始化 文章清單
function articleListInit() {
  let counter = 0; // 計數器
  let startNum = 0; // 起始文章
  let quantity = 5; // 每次產生的文章數量
  getData(startNum, quantity);

  // 監聽load more
  $(document).on('click', '.moreBtn', function () {
    counter++;
    startNum = counter * quantity;
    getData(startNum, quantity);
  });
}

function getData(startNum, size) {
  $.ajax({
    type: 'GET',
    url: 'https://vickychan096.github.io/veekend/dataBase/db.json',
    dataType: 'json',
    success: function (res) {
      _data = res.articles;
      let articlesLength = res.articles.length;

      // 如果剩下的紀錄數不夠分頁，就讓分頁數取剩下的紀錄數
      // 例如分頁數是5，只剩2條，則只取2條
      if (articlesLength - startNum < size) {
        size = articlesLength - startNum;
      }

      createArticleList(_data, startNum, size);

      // 隱藏/顯示 more按鈕
      if (startNum + size >= articlesLength) {
        $('.moreBtn').hide();
      } else {
        $('.moreBtn').show();
      }
    },
    error: function (xhr, type) {
      errAlert('資料有誤，請通知管理員');
    },
  });
}

function getMapData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _mapData = response.data.articles;
      createMapDestination();
    });
}

// 建立 文章清單
function createArticleList(data, startNum, size) {
  let str = '';
  for (var i = startNum; i < startNum + size; i++) {
    str += ` <li>
          <div class="articleList__photo">
            <span>WEEK ${data[i].week}</span>
            <img src="${data[i].largeCoverUrl}" />
          </div>
          <div class="articleList__content">
            <div class="articleList__content__text">
              <p>${data[i].city} ${data[i].district}</p>
              <h6>${data[i].title}</h6>
              <i>by ${data[i].userName} - ${data[i].writtenDate}</i>
            </div>
            <a class="btn btnPrimary" href="article.html?week=${data[i].week}">READ MORE</a>
          </div>
        </li>`;
  }

  // 往後新增清單
  $('#articleList').append(str);
}

// 篩選 map景點
function createMapDestination() {
  let allDestinations = [];
  _mapData.forEach((item) => {
    allDestinations = allDestinations.concat(item.destinations);
  });
  const set = new Set();
  const setDestinations = allDestinations.filter((item) =>
    !set.has(item.mapUrl) ? set.add(item.mapUrl) : false
  );
  renderMapDestination(setDestinations);
}

// 建立 map景點
function renderMapDestination(data) {
  data.forEach((item) => {
    L.marker(item.local, { icon: _blackIcon })
      .addTo(_map)
      .bindPopup(
        `<div class="popupContent">
          <h4>${item.name}</h4>
          <p>不專業評價 ${item.rate}</p>
          <a href="${item.mapUrl}" target="_blank" class="btn btnPrimary">前往 <i class="fa-solid fa-angle-right"></i></a>
        </div>`
      );
  });
}
