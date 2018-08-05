const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { db_config } = require('./config');

const sequelize = new Sequelize(db_config.database, db_config.username, db_config.password, db_config.config);

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.error('连接数据库出错', err);
  });
const db = {};

fs
  .readdirSync(path.join(__dirname, './model'))
  .forEach(function (file) {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if ('classMethods' in db[modelName].options) {
    if ('associate' in db[modelName].options['classMethods']) {
      db[modelName].options.classMethods.associate(db);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;