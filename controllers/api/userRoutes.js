const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const bcrypt = require("bcrypt");

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

      // console.log(req.session)
      return res.json(foundUser)
    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  }).catch(err => {
    // console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});



router.post('/dashboard/new', async (req, res) => {
  try {


    // if (!userData) {
    Blog.create({
      title: req.body.title,
      post: req.body.content,
      user_id: req.session.user.id
    }).then(newBlog => {
      res.json(req.session);
      // res.render('dashboard');

    })
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/post/comment', async (req, res) => {
  try {
console.log(req.body)
console.log(req.body.postID)
console.log(req.session.user.id)

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

router.post('/signup', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      User.create({
        email: req.body.email,
        password: req.body.password
      }).then(newUser => {
        // console.log(newUser)
        req.session.user = {
          id: newUser.id,
          email: newUser.email

        }

        // console.log("=========")
        // console.log(req.session)
        // res.json(req.session);
        // res.render('home');

      })

    }



  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
