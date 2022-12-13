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
  center: [25.068356194024172, 121.52481353493157],
  zoom: 15,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //OSM的圖磚資料.addTo加入到(map裡面去)
  attribution:
    //右下角資訊
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const data = [
  { name: '丸林滷肉飯', local: [25.068356194024172, 121.52481353493157] },
  {
    name: '花博公園',
    local: [25.071888123471474, 121.52218048312056],
  },
];

data.forEach((item) => {
  // 添加標記點
  L.marker(item.local, {
    title: item.name,
  })
    .addTo(map)
    .bindPopup(item.name);
});

// axios
//   .post('http://localhost:3000/posts', {
//     week: 1,
//     city: '台北市',
//     district: '中山區',
//     visitedDate: '2019.10.20',
//     writtenDate: '2022.10.18',
//     title: 'ORION BEER FEST in TAIPEI 一起狂喝一整夜吧!',
//     brief:
//       '這禮拜是Veekend計畫的第一週，聽朋友說花博有個Orion啤酒之夜。凡事起頭難，第一週就先簡單安排行程，試試水溫吧！',
//     bannerUrl: 'images/week1/cover.jpg',
//     views: 999,
//     section: [
//       {
//         id: 1,
//         style: 1,
//         content: {
//           title: '丸林滷肉飯',
//           score: '個人評分：3.9',
//           content:
//             '<li>營業電話:(02)2597-7971</li><li>營業地址:<a href="#">台北市中山區民族東路32號</a></li><li>營業時間: 10: 30-21: 00</li>',
//           imageUrl: 'images/week1/p-01.jpg',
//           imageAlt: '丸林滷肉飯',
//         },
//       },
//       {
//         id: 2,
//         style: 4,
//         content: {
//           subtitle: '據說是日本觀光客必吃的滷肉飯',
//           content:
//             '這幾年非常受陸客/日客歡迎，遊覽車總是一車一車的來。一樓大多是台灣的客人，二樓就都留給觀光客用餐了，另外還有現打新鮮果汁，用餐環境不錯。',
//           imageUrl: 'images/week1/p-03.jpg',
//           imageAlt: '今日晚餐',
//         },
//       },
//       {
//         id: 3,
//         style: 2,
//         content: {
//           title: '2019 ORION 沖繩啤酒節',
//           score: '個人評分：4.2',
//           content:
//             '<li>每年最大的沖繩ORION啤酒祭典即將在10/19舉辦，會場改到花博公園的花海廣場，大家別跑錯了！</li><li>時間：<mark>10/19、10/20</mark></li>',
//           imageUrl: 'images/week1/p-02.jpg',
//           imageAlt: 'Orion舞台',
//         },
//       },
//       {
//         id: 4,
//         style: 3,
//         content: {
//           subtitle: '新生啤酒好喝的三個理由',
//           content:
//             '<li><strong>其一</strong>：更加「新鮮清爽」的口感，通過新的過濾工序減低了麥汁的雜味成分，調節最佳的發酵溫度，讓香氣更加沁人心脾。重新調節啤酒花的添加比率，突出酒花原來具有的清爽苦味。</li><li><strong>其二</strong>：美味持久。鲜度長存！通過加料和過濾的<mark>兩道工序抑制氧化，使得鮮度更加持久，長時間保持美味。</mark></li><li><strong>其三</strong>：再有，奶油般口感持久的「泡沫」保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久。</li>',
//           imageUrl: 'images/week1/p-04.jpg',
//           imageAlt: 'Orion啤酒',
//         },
//       },
//       {
//         id: 5,
//         style: 5,
//         content: [
//           {
//             subtitle: '花博Orion啤酒',
//             content: '保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久。',
//             imageUrl: 'images/week1/p-05.jpg',
//             imageAlt: '三之一',
//           },
//           {
//             subtitle: 'Orion Beer',
//             content: '保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久。',
//             imageUrl: 'images/week1/p-05.jpg',
//             imageAlt: '三之二',
//           },
//           {
//             subtitle: 'Drinking Beer',
//             content:
//               '保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久，保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久，保留更多的來自麥芽的蛋白質，使泡沫更加柔軟持久。',
//             imageUrl: 'images/week1/p-05.jpg',
//             imageAlt: '三之三',
//           },
//         ],
//       },
//       {
//         id: 6,
//         style: 6,
//         content: {
//           subtitle: '醉不上路',
//           video:
//             '<iframe id="iFrame" src="https://www.youtube.com/embed/OSYVNSWaoCE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
//           content:
//             '一直以來我有個在草地翻滾的願望，但在理性的作用下，一直無法去實現，謝謝你 Orion Beer。',
//         },
//       },
//       {
//         id: 7,
//         style: 7,
//         content: {
//           subtitle: '本週景點地圖',
//           mapCenterLat: '25.068356194024172',
//           mapCenterLong: '121.52481353493157',
//           destinations: [
//             {
//               id: 1,
//               name: '丸林滷肉飯',
//               lat: '25.068356194024172',
//               long: '121.52481353493157',
//             },
//             {
//               id: 2,
//               name: '花博公園',
//               lat: '25.071889696490796',
//               long: '121.52218505554923',
//             },
//           ],
//           tags: ['花博公園', '中山區', '台北市', '啤酒節'],
//         },
//       },
//     ],
//   })
//   .then((response) => {});

// axios
// axios.get('http://localhost:3000/posts').then((response) => {
//   console.log(response.data);
// });
