const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const bcrypt = require("bcrypt");
// const today = moment(); 

router.post('/login', async (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(foundUser => {
    if (!foundUser) {
      return res.status(400).json({ msg: "wrong login credentials" })

    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {

      req.session.user = {
        id: foundUser.id,
        username: foundUser.username,
        logged_in: true
      }

   
      return res.json(foundUser)
    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  }).catch(err => {
   
    res.status(500).json({ msg: "an error occured", err });
  });
});

router.post("/signup", (req, res) => {
  User.create(req.body)
    .then(newUser => {
      req.session.user = {
        id:newUser.id,
        username:newUser.username,
        logged_in: true
      }
     
      res.json(newUser);
    })
    .catch(err => {
      
      res.status(500).json({ msg: "This username  exist.Please use another username ", err });
    });
});

router.post('/dashboard/new', async (req, res) => {
  try {
    Blog.create({
      title: req.body.title,
      post: req.body.content,
      user_id: req.session.user.id
    }).then(newBlog => {
      res.json(req.session);

    })
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/post/comment', async (req, res) => {
  try {


    Comment.create({
      comment: req.body.content,
      blog_id: req.body.postID,
      user_id : req.session.user.id
    }).then(newComment=> {
      res.json(req.session);
    })
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/dashboard/delete/:id', async (req, res) => {
  try {
  
    const dbBlog = await Blog.destroy({
      where: {
        id: req.params.id
      }
      });
   
      const userBlogs = await Blog.findAll({
        where: {
          user_id: req.session.user.id
        }
      }).catch((err) => {
        res.json(err)
      })
    res.send();

  } catch (err) {
    res.json(err)
  }
});
router.put('/dashboard/update/:id', async (req, res) => {
  try {
    
    const dbBlog = await Blog.update(
      {
        title: req.body.title,
        post: req.body.content
      },{
      where: {
        id: req.params.id
      }
      });
    
    res.send();

  } catch (err) {
    res.json(err)
  }
});



module.exports = router;
