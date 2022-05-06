const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
   
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

   
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email=userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      // res.render('/home');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/signup', async (req, res) => {
  try {
  
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      User.create({
        email : req.body.email,
        password: req.body.password
      }).then(newUser => {
        // console.log(newUser)
        req.session.user = {
          id:newUser.id,
          email:newUser.email
          
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

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      res.render('login');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
