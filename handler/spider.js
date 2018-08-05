
var superagent = require('superagent')
var cheerio = require('cheerio')
var async = require('async')
var url = require('url')

const fs = require('fs');
const path = require('path');

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

// 获取列表页中的url列表
const suckSite = async function (siteUrl, siteRule) {
  const $ = await suck(siteUrl);
  const result = siteRule($, siteUrl);
  return result
}

fs
  .readdirSync(path.join(__dirname, '../site'))
  .forEach(function (file) {
    const site = require(path.join(__dirname, `../site/${file}`));
    if (site.spider) {
      site.categoryList.forEach(async (categoty) => {
        categoty.url.forEach(async (x) => {
          // 获取具体页列表
          const siteUrls = await suckSite(x, site.listRule)
          siteUrls.forEach(x => {
            suckSite(x, site.detailRule)
          })
          // suckSite(siteUrls[0], site.detailRule)
          // suckSite('http://www.qiye.gov.cn/news/qiye/shij/24403.html', site.detailRule)
        })
      })
    }
  });