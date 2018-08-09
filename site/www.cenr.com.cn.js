const url = require('url');
var sleep = require('sleep');
var superagent = require('superagent');
var cheerio = require('cheerio')
var async = require('async')

const postHandler = require('../handler/post.js');

const siteName = '中国企业报道';

const categoryList = [
  {
    category: "企业要闻",
    url: [
      "http://www.cenr.com.cn/yaowen/qyyw/"
    ],
    // 系统目标分类
    target_category: 18,
    spider: true
  },
];

const suck = async function (siteUrl) {
  try {
    const result = await superagent.get(siteUrl);
    const text = result.text
    var $ = cheerio.load(text);
    return $
  } catch (error) {
    console.error(error);
    return error
  }
}
/**
 * 爬取列表 爬虫地址 目标分类
 */
const suckList = async function (siteUrl, targetCategory = 1) {
  const $ = await suck(siteUrl);
  const li = $('.bl_6 .red a');
  const urlList = [];
  li.map((index, x) => {
    let href = url.resolve(siteUrl, $(x).attr('href'));
    urlList.push({ href, category: targetCategory })
  })
  return urlList
}

// const asyncSuck = async function (urlArray) {
//   try {
//     async.mapLimit(urlArray, 1, function (urlItem, callback) {
//       console.log(urlItem)
//       callback(null, 'asasfasfa')
//     }, function (err, result) {
//       console.log('final:\n', result);
//     });
//   } catch (error) {
//     console.error(error);
//     return error
//   }
// }

// const suckDetail = async function (siteUrl, categoty) {
//   sleep.sleep(1);
//   const $ = await suck(siteUrl);
//   const title = $('.ntq-news2 .znn').text();
//   const description = $('.ntq-news2 .ssevg').text();
//   const content = $('.ntq-news2 #articlecon').html();
//   console.log(title);
//   // 数据存储到数据库
//   postHandler.postAdd(title, description, content, categoty.target_category, siteName, siteUrl)
// }


// categoryList.forEach(async (categoty) => {
//   if (categoty.spider === '1616') {
//     categoty.url.forEach(async (x) => {
//       // 获取详情页列表
//       const detialUrls = await suckList(x);
//       detialUrls.forEach(x => {
//         // 爬取详情页
//         suckDetail(x, categoty)
//       })
//     })
//   }
// })


// suckList('http://www.cenr.com.cn/yaowen/qyyw/')


const getUrls = async function () {
  let sites = [];
  for (category of categoryList) {
    if (category.spider) {
      for (x of category.url) {
        const detialUrls = await suckList(x, category.target_category);
        sites = sites.concat(detialUrls);
      }
    }
  }
  return sites
};


const suckDetail = async function (siteUrl, category, callback) {
  sleep.sleep(1);
  const $ = await suck(siteUrl);
  const title = $('.tit .size22').text();
  const description = $('.art_sum .pad_2').text();
  const content = $('#fontzoom').html();
  const isExisted = await postHandler.isExisted(title);
  if (isExisted) {
    callback(null, siteUrl + '   跳过')
  } else {
    // 数据存储到数据库
    postHandler.postAdd(title, description, content, category, siteName, siteUrl)
    callback(null, siteUrl + '   加入')
  }
};






const suckDetailTest = async function (siteUrl) {
  const $ = await suck(siteUrl);
  const title = $('.tit .size22').text();
  const description = $('.art_sum .pad_2').text();
  const content = $('#fontzoom').html();
  const isExisted = await postHandler.isExisted(title);
  if (isExisted) {
    console.log(title + '   跳过')
    return false
  } else {
    console.log('需要加入')
  }

  // // 数据存储到数据库
  // postHandler.postAdd(title, description, content, categoty.target_category, siteName, siteUrl)
};


// suckDetailTest('http://www.cenr.com.cn/yaowen/qyyw/jd/2018/08/06/101595.html');

(async function () {
  // 获取所有需要爬取的站点
  const sites = await getUrls();
  async.mapLimit(sites, 1, function (urlItem, callback) {
    suckDetail(urlItem.href, urlItem.category, callback)
  }, function (err, result) {
    console.log('final:\n', result);
  });

})();