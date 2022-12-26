import { errAlert } from './common.js';
const _aside = document.querySelector('.aside');
let _asideData = [];

function init() {
  createAside();
  getAsideData();
}
init();

function createAside() {
  _aside.innerHTML = `
          <div class="aside__photo">
            <span></span>
            <img src="images/profile.jpg" alt="Vicky" />
          </div>
          <div class="aside__info">
            <ul>
              <li>
                <a href="mailto:s6102161021@yhaoo.com.tw">
                  <img src="images/info-mail.png" alt="mail" />
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/meichenchan/vickys/">
                  <img src="images/info-pin.png" alt="pinterest" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/s6102161021/">
                  <img src="images/info-ins.png" alt="instagram" />
                </a>
              </li>
              <li>
                <a href="index.html">
                  <img src="images/info-website.png" alt="website" />
                </a>
              </li>
            </ul>
            <p>
              Hi，我是VC<br />我在2019年末<br />給自己一個生活目標<br />花了一年總共54週<br />每週探索一個地區<br />想與你分享我的小探險
            </p>
          </div>
          <div class="aside__popularPost">
            <h5>POPULAR POSTS</h5>
            <ul id="popularPost"></ul>
          </div>
          <div class="aside__hashtag">
            <h5>HASHTAGS</h5>
            <ul id="hashTags"></ul>
          </div>
          <div class="aside__ad">
            <a class="adDesktop" href="https://www.pinterest.com/meichenchan/vickys/" target="_blank"><img src="images/ad_300x450.jpg" alt="設計服務" /></a>
            <a class="adMobile" href="https://www.pinterest.com/meichenchan/vickys/" target="_blank"><img src="images/ad_768x250.jpg" alt="設計服務" /></a>
          </div>`;
}

function getAsideData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    .then(function (response) {
      _asideData = response.data.articles;
      createRandomNum();
      sortTags();
    })
    .catch(function (err) {
      errAlert('資料有誤，請聯絡管理員');
    });
}

function createRandomNum() {
  let randomNum = [];
  let articleIndex = [];
  _asideData.forEach((item, index) => {
    articleIndex.push(index);
  });

  const ranNum = 3;
  for (let i = 0; i < ranNum; i++) {
    let ran = Math.floor(Math.random() * (articleIndex.length - i));
    if (randomNum.includes(articleIndex[ran])) {
      continue;
    }
    randomNum.push(articleIndex[ran]);
    articleIndex[ran] = articleIndex[articleIndex.length - i - 1];
  }
  // console.log(
  //   `隨機文章：${randomNum[0] + 1}、${randomNum[1] + 1}、${randomNum[2] + 1}`
  // );
  createPopularPost(randomNum);
}

function createPopularPost(random) {
  const popularPost = document.getElementById('popularPost');
  let str = '';
  _asideData.forEach((item, index) => {
    if (index === random[0]) {
      str += createPopularPostStr(item);
    } else if (index === random[1]) {
      str += createPopularPostStr(item);
    } else if (index === random[2]) {
      str += createPopularPostStr(item);
    }
  });
  popularPost.innerHTML = str;
}

function createPopularPostStr(item) {
  let content = `
        <li>
          <a href="article.html?week=${item.week}">
            <img src="images/week${item.week}/cover-s.jpg" />
            <p>${item.title}</p>
          </a>
        </li>`;
  return content;
}

function sortTags() {
  let sortTags = [];
  let allTags = [];
  let countTags = '';

  // 1.將所有tag加總
  _asideData.forEach((item) => {
    allTags = allTags.concat(item.hashTags);
  });

  // 2.統計各tag的出現次數(產生object)
  countTags = allTags.reduce((object, item) => {
    if (item in object) {
      object[item]++;
    } else {
      object[item] = 1;
    }
    return object;
  }, {});

  // 3.依物件的value大>小排序，留下key值並轉成array
  sortTags = Object.fromEntries(
    Object.entries(countTags).sort((a, b) => b[1] - a[1])
  );
  // console.log(`標籤統計結果：${JSON.stringify(sortTags)}`);
  sortTags = Object.keys(sortTags);
  createHashTags(sortTags);
}

function createHashTags(array) {
  const hashTags = document.getElementById('hashTags');
  let str = '';
  for (let i = 0; i < 10; i++) {
    str += `<li><a href="result.html?tags=${array[i]}">${array[i]}</a></li>`;
  }
  hashTags.innerHTML = str;
}
