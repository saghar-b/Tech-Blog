const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
User.hasMany(Blog,{
    foreignKey: 'user_id',
  });
Blog.belongsTo(User)


Blog.hasMany(Comment,{
  foreignKey: 'blog_id',
})
Comment.belongsTo(Blog)

User.hasMany(Comment,{
  foreignKey: 'user_id',
}
)
Comment.belongsTo(User)

module.exports = { User , Blog, Comment};
