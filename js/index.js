const _idxArticleList = document.getElementById('idxArticleList');
let _listData = [];

function init() {
  fireSwiper();
}
init();

// axios
//   .get('https://vickychan096.github.io/veekend/dataBase/db.json')
//   .then(function (response) {
//     _listData = response.data.articles;
//     createArticleList();
//   })
//   .catch(function (err) {
//     alert(err);
//   });

function createArticleList() {
  let listStr = '';
  _listData.forEach((item) => {
    listStr =
      listStr +
      ` <li>
          <div class="articleList__photo">
            <span>WEEK ${item.week}</span>
            <img src="${item.largeCoverUrl}" />
          </div>
          <div class="articleList__content">
            <div class="articleList__content__text">
              <p>${item.city} ${item.district}</p>
              <h6>${item.title}</h6>
              <i>by ${item.userName} - ${item.writtenDate}</i>
            </div>
            <a class="btn btnPrimary" href="article.html?week=${item.week}">READ MORE</a>
          </div>
        </li>`;
  });
  _idxArticleList.innerHTML = listStr;
}

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

$(function () {
  /*初始化*/
  var counter = 0; /*计数器*/
  var pageStart = 0; /*offset*/
  var pageSize = 4; /*size*/

  /*首次加载*/
  getData(pageStart, pageSize);

  /*监听加载更多*/
  $(document).on('click', '.moreBtn', function () {
    counter++;
    pageStart = counter * pageSize;

    getData(pageStart, pageSize);
  });
});

function getData(offset, size) {
  $.ajax({
    type: 'GET',
    url: 'https://vickychan096.github.io/veekend/dataBase/db.json',
    dataType: 'json',
    success: function (res) {
      var data = res.articles;
      var sum = res.articles.length;
      var listStr = '';
      if (sum - offset < size) {
        size = sum - offset;
      }

      for (var i = offset; i < offset + size; i++) {
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

      /*******************************************/

      /*隐藏more按钮*/
      if (offset + size >= sum) {
        $('.moreBtn').hide();
      } else {
        $('.moreBtn').show();
      }
    },
    error: function (xhr, type) {
      alert('Ajax error!');
    },
  });
}