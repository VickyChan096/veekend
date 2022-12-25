const _articleList = document.getElementById('articleList');
const _searchResult = document.getElementById('searchResult');

let _data = [];
let _type = '';
let _res = ''; // type: menu全地區
let _tags = ''; // type: aside標籤
let _key = ''; // type: input關鍵字

axios
  .get('https://vickychan096.github.io/veekend/dataBase/db.json')
  .then(function (response) {
    _data = response.data.articles;
    _type = getUrlType();

    let result = [];
    if (_type === 'tags') {
      // 以tags渲染
      _res = getUrlParameter('tags');
      result = _data.filter((item) => {
        let findHasTags = item.hashTags.find((hashTag) => {
          return hashTag === _res;
        });
        return findHasTags !== undefined;
      });
    } else if (_type === 'res') {
      //menu
      _res = getUrlParameter('res');
      result = _data.filter((item) => {
        if (_res === item.city) {
          return item.city === _res;
        } else if (_res === '其他') {
          return item.city !== '台北市' && item.city !== '新北市';
        }
      });
    } else if (_type === 'key') {
      //關鍵字
      _res = getUrlParameter('key');
      result = _data.filter((item) => {
        if (item.city.indexOf(_res) !== -1) {
          //查詢縣市
          return true;
        }
        if (item.district.indexOf(_res) !== -1) {
          //查詢區域
          return true;
        }
        if (item.district.indexOf(_res) !== -1) {
          //查詢區域
          return true;
        }
        if (item.title.indexOf(_res) !== -1) {
          //查詢title
          return true;
        }
        if (item.briefing.indexOf(_res) !== -1) {
          //查詢briefing
          return true;
        }
        if (item.content.indexOf(_res) !== -1) {
          //查詢content
          return true;
        }
        //查詢hashTags 跑回圈 (關鍵字即可)
        let findHashTag = item.hashTags.filter((hastag) => {
          return hastag.indexOf(_res) !== -1 ? true : false;
        });
        if (findHashTag.length > 0) {
          return true;
        }

        return false; //都沒有找到就false
      });
    }

    createResultTitle(result);
    createArticleList(result);
  })
  .catch(function (error) {
    swal({
      title: 'Σ(ﾟдﾟ) 哇糟糕了',
      text: '資料有誤，請聯繫管理員',
      icon: 'warning',
      button: '確定',
      className: 'swalBtn',
    }).then(function () {
      window.location.href = 'index.html';
    });
  });

// 取得 網址類型
function getUrlType() {
  const getUrl = window.location.search.substring(1);
  const typeStr = getUrl.split('=');
  return typeStr[0];
}

// 取得 網址參數
function getUrlParameter(parameter) {
  const getUrlString = location.href;
  const url = new URL(getUrlString);
  return url.searchParams.get(parameter);
}

// 建立 結果主標
function createResultTitle(data) {
  _searchResult.innerHTML = `<h2>${_res}</h2>
            <p>Search Results 共<span> ${data.length} </span>篇符合</p>`;
}

// 建立 結果清單
function createArticleList(data) {
  let str = '';
  data.forEach((item) => {
    str += ` <li>
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
  _articleList.innerHTML = str;
}
