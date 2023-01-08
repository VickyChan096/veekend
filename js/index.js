import { errAlert } from './common.js';
let _articleListData = [];
let _mapData = [];
let _map;

function init() {
  fireSwiper();
  initArticleList();
  getMapData();
}
init();

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

function initArticleList() {
  let counter = 0; // 計數器
  let startNum = 0; // 起始文章
  let quantity = 5; // 每次產生的文章數量
  getArticleListData(startNum, quantity);

  // 監聽load more
  $(document).on('click', '.moreBtn', function () {
    counter++;
    startNum = counter * quantity;
    getArticleListData(startNum, quantity);
  });
}

function getArticleListData(startNum, quantity) {
  $.ajax({
    type: 'GET',
    url: 'https://vickychan096.github.io/veekend/dataBase/db.json',
    dataType: 'json',
    success: function (res) {
      _articleListData = res.articles;
      let articlesLength = res.articles.length;

      // 如果剩下的紀錄數不夠分頁，就讓分頁數取剩下的紀錄數
      // 例如分頁數是5，只剩2條，則只取2條
      if (articlesLength - startNum < quantity) {
        quantity = articlesLength - startNum;
      }

      createArticleList(_articleListData, startNum, quantity);

      // 隱藏/顯示 more按鈕
      if (startNum + quantity >= articlesLength) {
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

function createArticleList(data, startNum, quantity) {
  let str = '';
  for (var i = startNum; i < startNum + quantity; i++) {
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

function getMapData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _mapData = response.data.articles;
      initMap();
      createMapDestination();
    });
}

const _blackIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function initMap() {
  _map = L.map('map', {
    center: [23.97565, 120.9738819],
    zoom: 7,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>｜已探索景點`,
  }).addTo(_map);
}

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
