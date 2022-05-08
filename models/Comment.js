const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}


Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      // unique:true,
      // validate:{
      //   isEmail:true
      // }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    }, 
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
  },
  {
    
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;
