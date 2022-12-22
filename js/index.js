const _idxArticleList = document.getElementById('idxArticleList');

function init() {
  fireSwiper();
  $(function () {
    let counter = 0;
    let listStart = 0;
    let listQuantity = 4;
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
      let data = res.articles;
      let total = res.articles.length;
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

      if (total - start < quantity) {
        quantity = total - start;
      }

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
