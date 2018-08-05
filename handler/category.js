const model = require('../db.js');
const Category = model['zbp_category']

const categoryList = async () => {
  const ones = await Category.findAll();
  console.log(JSON.parse(JSON.stringify(ones)))
}

categoryList()
