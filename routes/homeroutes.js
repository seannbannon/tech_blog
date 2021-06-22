const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// homepage, no login, shows all posts by everyone
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      include: [User],
    })
    .then((postData) => {
        console.log(postData);

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
          posts,
          loggedIn: true});
    })
  .catch ((err) => {res.status(500).json(err)})
});


// displays post and its comments
router.get('/post/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
      include: [User, {
          model: Comment,
          include: [User],
      }],
    })
    .then((postData) => {
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        }
        const posts = postData.get({ plain: true });

        res.render('post', {
          posts,
          loggedIn: true
        });
    })
    .catch((err) => {res.status(500).json(err)});
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

module.exports = router;