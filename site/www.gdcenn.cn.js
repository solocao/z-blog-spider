const url = require('url');
var sleep = require('sleep');
const postHandler = require('../handler/post.js');
const { suck } = require('../handler/crawler.js');
const siteName = '中国企业新闻网';
const categoryList = [
  {
    category: "时政热点",
    url: [
      "http://www.gdcenn.cn/news_list.asp?page=1&ClassID=94"
    ],
    // 系统目标分类
    target_category: 4,
    spider: true
  },
  {
    category: "专题报道",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=72"
    ],
    // 系统目标分类
    target_category: 5,
    spider: true
  },
  {
    category: "财经产经",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=8"
    ],
    target_category: 6,
    spider: true
  },
  {
    category: "热点话题",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=71"
    ],
    target_category: 7,
    spider: true
  },
  {
    category: "图片新闻",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=81"
    ],
    target_category: 8,
    spider: true
  },
  {
    category: "企业纵深",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=44"
    ],
    target_category: 1,
    spider: true
  },
  {
    category: "新闻调查",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=75"
    ],
    target_category: 9,
    spider: true
  },
  {
    category: "企业发布",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=74"
    ],
    target_category: 10,
    spider: true
  },
  {
    category: "新闻联播",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=73"
    ],
    target_category: 11,
    spider: true
  },
  {
    category: "港澳直通",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=68"
    ],
    target_category: 12,
    spider: true
  },
  {
    category: "品牌中国",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=67"
    ],
    target_category: 13,
    spider: true
  },
  {
    category: "行业资讯",
    url: [
      // "http://www.gdcenn.cn/hy/"
      "http://www.gdcenn.cn/news_list.asp?classid=155"
    ],
    target_category: 14,
    spider: '666'
  },
  {
    category: "民生焦点",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=112"
    ],
    target_category: 15,
    spider: true
  },
  {
    category: "创业就业",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=113"
    ],
    target_category: 16,
    spider: true
  },
  {
    category: "娱乐八卦",
    url: [
      "http://www.gdcenn.cn/news_list.asp?ClassID=93"
    ],
    target_category: 17,
    spider: true
  }
];

const suckList = async function (siteUrl) {

  const $ = await suck(siteUrl);
  const li = $('.news-tb .uuggg .vvv a')
  const urlList = []
  li.map((index, x) => {
    let href = url.resolve(siteUrl, $(x).attr('href'));
    urlList.push(href)
  })
  console.log(urlList);
  return urlList
}

const suckDetail = async function (siteUrl, categoty) {
  sleep.sleep(1);
  const $ = await suck(siteUrl);
  const title = $('.ntq-news2 .znn').text();
  const description = $('.ntq-news2 .ssevg').text();
  const content = $('.ntq-news2 #articlecon').html();
  console.log(title);
  // 数据存储到数据库
  postHandler.postAdd(title, description, content, categoty.target_category, siteName, siteUrl)
}


// suckList(categoryList[0].url[0]);
// suckDetail('http://www.gdcenn.cn/a/201808/350742.html');


categoryList.forEach(async (categoty) => {
  if (categoty.spider === '666') {
    categoty.url.forEach(async (x) => {
      // 获取详情页列表
      const detialUrls = await suckList(x);
      detialUrls.forEach(x => {
        // 爬取详情页
        suckDetail(x, categoty)
      })
    })
  }
})