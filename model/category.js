module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("zbp_category", {
    cate_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cate_Name: DataTypes.STRING(255),
    cate_Order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false
    });
  return Category;
};