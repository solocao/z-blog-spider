const model = require('../db.js');
const Post = model['zbp_post']

const PostList = async () => {
  const ones = await Post.findAll();
  console.log(JSON.parse(JSON.stringify(ones)))
}

const PostAdd = async (title = '', intro = '', content = '') => {
  const AddModel = {
    log_Title: title,
    log_Intro: intro,
    log_Content: content
  }
  const add = await Post.create(AddModel).catch(function (err) {
  })
  console.log(add)
}

PostAdd('文章标题', '文章描述', '内容文本')
// PostList()
