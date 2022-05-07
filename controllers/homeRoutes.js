const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');


// router.get('/home', async (req, res) => {
//   try {
//     console.log(reg.session)
//     res.render('home');
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })''

router.get('/logout', (req, res) => {
  
  if (req.session.user.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.render('/login');
    });
  } else {
    res.status(404).end();
  }
});

router.get('/dashboard', async(req,res)=>{
  
  const userBlogs =await Blog.findAll({
    where:{
      user_id: req.session.user.id
    }
  }).catch((err)=>{
    res.json(err)
  })
  const hbsUserBlogs = userBlogs.map((blog) => blog.get({ plain: true })); 
    const user = req.session.user
      res.render('dashboard', { hbsUserBlogs,user });
})


router.get('/dashboard/new', async(req,res)=>{
    const user = req.session.user
      res.render('dashboardNew', { user });
})


router.get('/home', async (req, res) => {
  // res.render('home')


  // if (req.session.user.logged_in) {
    // console.log("im here")
    const allBlogs = await Blog.findAll({
      include: [User]
    }).catch((err) => {
      res.json(err)
    })

    const blogs = allBlogs.map((blog) => blog.get({ plain: true }));
    // console.log(blogs)
    const user = req.session.user
    if(user){

      res.render('home', { blogs,user });
    }else{
      res.render('home', { blogs});
    }
  // }
});

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    const allBlogs = await Blog.findAll({
      include: [User]
    }).catch((err) => {
      res.json(err)
    })

    const blogs = allBlogs.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.render('home', { blogs });
  }
});

router.get("/showsessions", (req, res) => {
  res.json(req.session)
})
router.get('/login', (req, res) => {
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
