import { errAlert } from './common.js';
const _articleList = document.getElementById('articleList');
const _searchResult = document.getElementById('searchResult');
let _data = [];
let _keyWords = '';

function init() {
  getResultData();
}
init();

function getResultData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _data = response.data.articles;
      let type = getUrlType();
      let result = [];

      if (type === 'tags') {
        _keyWords = getUrlParameter('tags');
        result = _data.filter((item) => {
          let findHashTags = item.hashTags.find((hashTag) => {
            return hashTag === _keyWords;
          });
          return findHashTags !== undefined;
        });
      } else if (type === 'all') {
        _keyWords = getUrlParameter('all');
        result = _data.filter((item) => {
          if (_keyWords === item.city) {
            return item.city === _keyWords;
          } else if (_keyWords === '其他') {
            return item.city !== '台北市' && item.city !== '新北市';
          }
        });
      } else if (type === 'search') {
        _keyWords = getUrlParameter('search');
        result = _data.filter((item) => {
          if (item.city.indexOf(_keyWords) !== -1) {
            // 查詢縣市
            return true;
          }
          if (item.district.indexOf(_keyWords) !== -1) {
            // 查詢區域
            return true;
          }
          if (item.district.indexOf(_keyWords) !== -1) {
            // 查詢區域
            return true;
          }
          if (item.title.indexOf(_keyWords) !== -1) {
            // 查詢title
            return true;
          }
          if (item.briefing.indexOf(_keyWords) !== -1) {
            // 查詢briefing
            return true;
          }
          if (item.content.indexOf(_keyWords) !== -1) {
            // 查詢content
            return true;
          }
          // 查詢hashTags 跑回圈 (關鍵字即可)
          let findHashTag = item.hashTags.filter((hashtag) => {
            return hashtag.indexOf(_keyWords) !== -1 ? true : false;
          });
          if (findHashTag.length > 0) {
            return true;
          }

          return false; // 都沒有找到就false
        });
      }

      createResultTitle(result);
      createArticleList(result);
    })
    .catch(function (error) {
      errAlert('資料有誤，請聯絡管理員')
    });
}

function getUrlType() {
  const getUrl = window.location.search.substring(1);
  const typeStr = getUrl.split('=');
  return typeStr[0];
}

function getUrlParameter(parameter) {
  const getUrlString = location.href;
  const url = new URL(getUrlString);
  return url.searchParams.get(parameter);
}

function createResultTitle(data) {
  _searchResult.innerHTML = `
    <h2>${_keyWords}</h2>
    <p>Search Results 共<span> ${data.length} </span>篇符合</p>`;
}

function createArticleList(data) {
  let str = '';
  data.forEach((item) => {
    str += `
        <li>
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
