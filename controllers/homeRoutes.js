const router = require('express').Router();
const { User,Blog } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/home', async (req, res) => {
//   try {
//     console.log(reg.session)
//     res.render('home');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })
router.get('/home',async (req, res) => {
  if (req.session.logged_in) {
    const allBlogs=await Blog.findAll({
      include:[User]
      // include:[{
      //   model : User,
      //   attributes :['username','created_at']

      // }]
    }).catch((err)=>{
      res.json(err)
    })
    
    const blogs = allBlogs.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.render('home',{blogs});
  } 
});


router.get("/showsessions", (req, res) => {
  res.json(req.session)
})
router.get('/login', (req, res) => {
  // if (req.session.logged_in) {
  //   // res.redirect('/home');
  //   return;
  // }

  res.render('login');
});


router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    // res.redirect('/home');
    return;
  }

  res.render('signup');
});

module.exports = router;
