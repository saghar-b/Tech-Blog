const User = require('./User');
const Blog = require('./Blog');
User.hasMany(Blog,{
    foreignKey: 'user_id',
  });
Blog.belongsTo(User)
module.exports = { User , Blog};
