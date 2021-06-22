const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// displays posts made by the user
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      include: [User,
        {
          model: Comment,
          include: [User],
        }
      ],
      where: {
          user_id: req.session.user_id,
      }
    })
    .then((postData) => {
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', {posts, loggedIn: true});
    })
  .catch ((err) => {res.status(500).json(err)})
});

// makes new post
router.get('/create', withAuth, (req, res) => {
  Post.findAll({
    include: [User,
      {
        model: Comment,
        include: [User],
      },
    ],
  })
  .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));

      res.render('new-post', {posts, loggedIn: true});
  })
.catch ((err) => {res.status(500).json(err)})
});



// edits post
router.get('/edit-post/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id,{})
  .then((postData) => {
    if (!postData) {
      res.status(404).json({ message: 'No post found with that id' });
      return;
    }
      const post = postData.get({ plain: true });

      res.render('edit-post', {post, loggedIn: true});
  })
.catch ((err) => {res.status(500).json(err)})
});

module.exports = router;