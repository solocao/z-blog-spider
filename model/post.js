module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define("zbp_post", {
    log_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    log_CateID: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_AuthorID: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    log_Status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_Type: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_IsTop: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_IsLock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_Title: {
      type: DataTypes.STRING(255)
    },
    log_Intro: {
      type: DataTypes.TEXT,
    },
    log_Content: {
      type: DataTypes.TEXT('long'),
    },
    log_PostTime: {
      type: DataTypes.INTEGER,
    },
    log_CommNums: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_ViewNums: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    log_Meta: {
      type: DataTypes.TEXT('long'),
      defaultValue: ''
    }
  }, {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false
    });
  return Post;
};