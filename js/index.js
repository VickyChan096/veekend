const _idxArticleList = document.getElementById('idxArticleList');
let _data = [];

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
let map = L.map('map', {
  center: [23.97565, 120.9738819],
  zoom: 7,
  zoomControl: false,
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>｜已探索景點`,
}).addTo(map);

function init() {
  fireSwiper();
  $(function () {
    let counter = 0;
    let listStart = 0;
    let listQuantity = 5;
    getData(listStart, listQuantity);

    // 監聽load more
    $(document).on('click', '.moreBtn', function () {
      counter++;
      listStart = counter * listQuantity;
      getData(listStart, listQuantity);
    });
  });
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

function getData(start, quantity) {
  $.ajax({
    type: 'GET',
    url: 'https://vickychan096.github.io/veekend/dataBase/db.json',
    dataType: 'json',
    success: function (res) {
      _data = res.articles;
      let total = res.articles.length;

      // 如果剩下的紀錄數不夠分頁，就讓分頁數取剩下的紀錄數
      // 例如分頁數是5，只剩2條，則只取2條
      if (total - start < quantity) {
        quantity = total - start;
      }

      createArticleList(_data, start, quantity);
      createAllDestinations();

      // 隱藏more按鈕
      if (start + quantity >= total) {
        $('.moreBtn').hide();
      } else {
        $('.moreBtn').show();
      }
    },
    error: function (xhr, type) {
      swal({
        title: 'Σ(ﾟдﾟ) 哇糟糕了',
        text: '資料有誤，請聯繫站長',
        icon: 'warning',
        button: '確定',
        className: 'swalBtn',
      }).then(function () {
        window.location.href = 'index.html';
      });
    },
  });
}

function createAllDestinations() {
  let allDest = [];
  _data.forEach((item) => {
    allDest = allDest.concat(item.destinations);
  });
  const set = new Set();
  const results = allDest.filter((item) =>
    !set.has(item.mapUrl) ? set.add(item.mapUrl) : false
  );
  renderLeaflet(results);
}

function createArticleList(data, start, quantity) {
  let listStr = '';

  for (var i = start; i < start + quantity; i++) {
    listStr += ` <li>
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
  $('#idxArticleList').append(listStr);
}

function renderLeaflet(data) {
  data.forEach((item) => {
    // 添加標記點
    L.marker(item.local, { icon: _blackIcon })
      .addTo(map)
      .bindPopup(
        `<div class="popupContent">
          <h4>${item.name}</h4>
          <p>不專業評價 ${item.rate}</p>
          <a href="${item.mapUrl}" target="_blank" class="btn btnPrimary">前往 <i class="fa-solid fa-angle-right"></i></a>
        </div>`
      );
  });
}