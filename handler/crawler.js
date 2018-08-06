var charset = require('superagent-charset');
var superagent = charset(require('superagent'));
var cheerio = require('cheerio')
var async = require('async')
var url = require('url')

const fs = require('fs');
const path = require('path');

const suck = async function (siteUrl) {
  try {
    const result = await superagent.get(siteUrl).charset('gbk');
    const text = result.text
    var $ = cheerio.load(text);
    return $
  } catch (error) {
    console.error(error);
    return error
  }
}

module.exports = { suck }
