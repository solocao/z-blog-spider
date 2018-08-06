const url = require('url')
const postHandler = require('../handler/post.js')


const categoryList = [
  {
    category: "企业事件",
    url: [
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=1",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=2",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=3"
    ],
    spider: false
  },
  {
    category: "企业公司",
    url: [
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=8&page=1",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=8&page=2",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=8&page=3"
    ],
    spider: false
  },
  {
    category: "企业事件",
    url: [
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=4",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=5",
      "http://www.qiye.gov.cn/e/extend/rolling/list.php?classid=7&page=6"
    ],
    spider: true
  }
];

const listRule = function ($, siteUrl) {
  const li = $('li h3 a')
  const urlList = []
  li.map((index, x) => {
    let href = url.resolve(siteUrl, $(x).attr('href'));
    urlList.push(href)
  })
  return urlList
}

const detailRule = async function ($, siteUrl) {
  const title = $(".inner .listltitle h1").text();
  const description = $(".inner .say p").text();
  let content = $(".inner .article-content").html();

  // 将相对路径的图片修改为绝对路径
  const img = $(".inner .article-content img")
  const imgList = []
  img.each(function (i, el) {
    const imgUrl = $(el).attr('src');
    imgList.push({
      url0: imgUrl,
      url1: url.resolve(siteUrl, imgUrl)
    })
  });
  imgList.forEach(x => {
    content = content.replace(x.url0, x.url1)
  })
  const isExisted = await postHandler.isExisted(title);
  if (isExisted) {
    console.log(title + '   跳过')
    return false
  }
  // 数据存储到数据库
  postHandler.postAdd(title, description, content)
  console.log(title + '   添加成功')
  return true
}

module.exports = { spider: true, categoryList, listRule, detailRule }