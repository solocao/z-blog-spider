const model = require('../db.js');
const Post = model['zbp_post']

const postList = async () => {
  const ones = await Post.findAll();
  console.log(JSON.parse(JSON.stringify(ones)))
}

const postAdd = async (title = '', intro = '', content = '') => {
  const AddModel = {
    log_Title: title,
    log_Intro: intro,
    log_Content: content,
    log_PostTime: Date.parse(new Date()) / 1000
  }
  const add = await Post.create(AddModel).catch(function (err) {
  })
  console.log(title + '添加成功');
}

// postAdd('文章标题', '文章描述', '内容文本')
// PostList()
module.exports = { postAdd }