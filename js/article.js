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

function init() {
  getData();
  renderLeaflet();
}
init();

function getData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _data = response.data;
      // console.log(_data);

      // 取得url的week=xx
      let getUrlString = location.href;
      let url = new URL(getUrlString);
      let weekNumber = url.searchParams.get('week');

      const article = _data.articles[weekNumber - 1];
      console.log(article);
      document.title = `Week ${article.week} - ${article.city + article.district} | Veekend`;

      // 修改meta標籤的content內容
      $("meta[property='og:url']").attr(
        'content',
        `https://vickychan096.github.io/veekend/?week=${article.week}`
      );
      $("meta[property='og:title']").attr(
        'content',
        `Week ${article.week} - ${article.city + article.district} | Veekend`
      );
      $("meta[property='og:description']").attr('content', article.briefing);
      $("meta[property='og:image']").attr('content', article.largeCoverUrl);
    })
    .catch(function (err) {
      swal({
        title: 'Σ(ﾟдﾟ) 哇糟糕了',
        text: '連線異常，請重整試試',
        icon: 'warning',
        button: '確定',
      });
    });
}

$(function () {
  // 點擊 本週景點動畫
  $('.catalogBtn').click(function (event) {
    $(this).find('i').toggleClass('active');
    $(this).parent().find('.catalogDest').slideToggle('slow');
  });
});

function renderLeaflet() {
  let map = L.map('map', {
    center: [25.068356194024172, 121.52481353493157],
    zoom: 14,
    zoomControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // OSM的圖磚資料.addTo加入到(map裡面去)
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | 台北市中山區 ',
  }).addTo(map);

  const data = [
    {
      name: '丸林滷肉飯',
      rate: 3.9,
      mapUrl: 'https://goo.gl/maps/hbX1HYq1oJ4qDMbL6',
      local: [25.068780763626144, 121.52490147444489],
    },
    {
      name: 'Orion 沖繩啤酒節',
      rate: 4.2,
      mapUrl: 'https://goo.gl/maps/7LZvGnEm3UBKjj6p6',
      local: [25.07189941449988, 121.5222065131828],
    },
  ];

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
