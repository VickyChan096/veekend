const _popularPost = document.getElementById('popularPost');
const _hashTags = document.getElementById('hashTags');
let _randomNum = [];
let _sortTags = [];
let allData = [];

function init() {
  getData();
}
init();

function getData() {
  axios
    .get('https://vickychan096.github.io/veekend/dataBase/db.json')
    // .get('../dataBase/db.json')
    .then(function (response) {
      allData = response.data.articles;
      createRandomNum();
      createPopularPost(_randomNum);
      sortAllTags();
      createHashTags(_sortTags);
    })
    .catch(function (err) {
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
}

// 建立 隨機數字
function createRandomNum() {
  let articleIndex = [];
  allData.forEach((item, index) => {
    articleIndex.push(index);
  });

  const ranNum = 3;
  for (let i = 0; i < ranNum; i++) {
    let ran = Math.floor(Math.random() * (articleIndex.length - i));
    if (_randomNum.includes(articleIndex[ran])) {
      continue;
    }
    _randomNum.push(articleIndex[ran]);
    articleIndex[ran] = articleIndex[articleIndex.length - i - 1];
  }
  // console.log(
  //   `隨機文章：${_randomNum[0] + 1}、${_randomNum[1] + 1}、${_randomNum[2] + 1}`
  // );
}

// 建立 隨機文章
function createPopularPost(random) {
  let str = '';
  allData.forEach((item, index) => {
    if (index === random[0]) {
      str += createPopularStr(item);
    } else if (index === random[1]) {
      str += createPopularStr(item);
    } else if (index === random[2]) {
      str += createPopularStr(item);
    }
  });
  _popularPost.innerHTML = str;
}

function createPopularStr(item) {
  let content = `
        <li>
          <a href="article.html?week=${item.week}">
            <img src="images/week${item.week}/cover-s.jpg" />
            <p>${item.title}</p>
          </a>
        </li>`;
  return content;
}

// 統計 標籤
function sortAllTags() {
  let allTags = [];
  let countTags = '';

  // 1.將所有tag加總
  allData.forEach((item) => {
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
  _sortTags = Object.fromEntries(
    Object.entries(countTags).sort((a, b) => b[1] - a[1])
  );
  // console.log(`標籤統計結果：${JSON.stringify(_sortTags)}`);

  _sortTags = Object.keys(_sortTags);
}

// 建立 熱門標籤
function createHashTags(array) {
  let str = '';
  for (let i = 0; i < 10; i++) {
    str += `<li><a href="result.html?tags=${array[i]}">${array[i]}</a></li>`;
  }
  _hashTags.innerHTML = str;
}