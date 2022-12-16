const _heroSection = document.querySelector('.heroSection');
const _artTop = document.querySelector('.article__top');
const _artMid = document.querySelector('.article__middle');
const _artMap = document.querySelector('.article__mapAndTags');
let _data = [];
let _week = '';
let _article = '';

function init() {
  getData();
}
init();

function getData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _data = response.data;
      _week = getUrlParameter('week');
      _article = _data.articles[_week - 1];
      renderHtml();
    })
    .catch(function (err) {
      // swal({
      //   title: 'Σ(ﾟдﾟ) 哇糟糕了',
      //   text: '找不到文章，帶你回首頁',
      //   icon: 'warning',
      //   button: '確定',
      //   className: 'swalBtn',
      // }).then(function () {
      //   window.location.href = 'index.html';
      // });
    });
}

function renderHtml() {
  changeHeadContent(_article);
  _heroSection.innerHTML = createHeroSection(_article);
  _artTop.innerHTML = createArtTop(_article);
  createArtMid(_article);
  createArtMap();
}

function getUrlParameter(parameter) {
  const getUrlString = location.href;
  const url = new URL(getUrlString);
  return url.searchParams.get(parameter);
}

function changeHeadContent(data) {
  document.title = `Week ${data.week} - ${data.city + data.district} | Veekend`;

  // 修改 meta 的 content，但貌似 Line/fb 抓不到資訊
  $("meta[property='og:url']").attr(
    'content',
    `https://vickychan096.github.io/veekend/?week=${data.week}`
  );
  $("meta[property='og:title']").attr(
    'content',
    `Week ${data.week} - ${data.city + data.district} | Veekend`
  );
  $("meta[property='og:description']").attr('content', data.briefing);
  $("meta[property='og:image']").attr('content', data.largeCoverUrl);
}

function createHeroSection(data) {
  let content = `<div class="heroSection__content">
          <p>Week ${data.week} | ${data.visitedDate}</p>
          <h3>${data.city} ${data.district}</h3>
        </div>
        <img src="${data.largeCoverUrl}" alt="week ${data.week}" />`;
  return content;
}

function createArtTop(data) {
  let content = `
            <h2>${data.title}</h2>
            <p class="article__top__date">written by ${data.userName} ｜ ${data.writtenDate}</p>
            <p class="article__top__brief">${data.briefing}</p>`;
  return content;
}

function createArtMid(data) {
  _artMid.innerHTML = _article.content;

  $('.catalogBtn').click(function (event) {
    $(this).find('i').toggleClass('active');
    $(this).parent().find('.catalogDest').slideToggle('slow');
  });
}

function createArtMap() {
  let data = _article.hashTags;
  let hashTags = '';
  data.forEach(function (item) {
    let content = `<li>#${item}</li>`;
    hashTags += content;
  });

  _artMap.innerHTML = `<h5>本週景點地圖</h5>
            <div id="map"></div>
            <ul>${hashTags}</ul>`;
  renderLeaflet(_article);
}

function renderLeaflet(data) {
  const destinations = data.destinations;
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
    center: [destinations[0].local[0], destinations[0].local[1]],
    zoom: 14,
    zoomControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | ${
      data.city + data.district
    } `,
  }).addTo(map);

  destinations.forEach((item) => {
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
