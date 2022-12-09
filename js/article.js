// 頁面點擊
document.body.addEventListener('touchstart', function () {});

$(function () {
  // 本週景點
  $('.catalogBtn').click(function (event) {
    $(this).find('i').toggleClass('active');
    $(this).parent().find('.catalogDest').slideToggle('slow');
  });
});

// 地圖
let map = L.map('map', {
  //L是Leaflet框架的名字，有可能會與其他框架衝突
  //map函式('設定在#map',{先定位在center這個座標,zoom定位在16})
  center: [22.595153, 120.306923],
  zoom: 11,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //OSM的圖磚資料.addTo加入到(map裡面去)
  attribution:
    //右下角資訊
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const data = [
  { name: '夢時代購物中心', local: [22.595153, 120.306923] },
  { name: '漢神百貨', local: [22.61942, 120.296386] },
  { name: '漢神巨蛋', local: [22.669603, 120.302288] },
  { name: '大統百貨', local: [22.630748, 120.318033] },
];

data.forEach((item) => {
  // 添加標記點
  L.marker(item.local, {
    title: item.name,
  })
    .addTo(map)
    .bindPopup(item.name);
});
