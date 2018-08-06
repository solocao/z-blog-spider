const model = require('../db.js');
const Post = model['zbp_post']

const postList = async () => {
  const ones = await Post.findAll();
  console.log(JSON.parse(JSON.stringify(ones)))
}

const isExisted = async (title) => {
  const one = await Post.findOne({
    where: {
      log_Title: title
    }
  })
  // if (title === '余额宝红包开始升级加磅 支付宝红包城市周今日开启') {
  //   console.log('hhahah')
  //   console.log(one)
  //   return ''
  // }
  // console.log(JSON.parse(JSON.stringify(one)))
  console.log('----------------------------------------------------')
  if (one === null) {
    return false
  } else {
    return true
  }
}

const postAdd = async (title = '', intro = '', content = '', category = 2, source = '', sourceLink = '') => {
  const AddModel = {
    log_Title: title,
    log_Intro: intro,
    log_Content: content,
    log_CateID: category,
    log_Source: source,
    log_SourceLink: sourceLink,
    log_PostTime: Date.parse(new Date()) / 1000
  }
  const add = await Post.create(AddModel).catch(function (err) {
  })
  console.log(title + '添加成功');
}

// postAdd('文章标题', '文章描述', '内容文本')
// PostList()
module.exports = { postAdd, isExisted }