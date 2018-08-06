const Sequelize = require('sequelize');
module.exports.db_config = {
  database: 'qy',
  username: 'root',
  password: 'root',
  config: {
    host: '127.0.0.1',   // 数据库地址
    dialect: 'mysql',    // 指定连接的数据库类型
    operatorsAliases: Sequelize.Op,
    pool: {
      max: 5,          // 连接池中最大连接数量
      min: 0,          // 连接池中最小连接数量
      idle: 10000      // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
    }
  }
}
