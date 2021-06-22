const router = require('express').Router();
const { User } = require('../../models');

router.post('/', (req, res) => {
  User.create(req.body)
  .then((user) => {
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.logged_in = true;
    
        res.status(200).json(user)
    })
})
  .catch ((err) => res.status(500).json(err))
});

router.post('/login', (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
        if (!user) {
            res.status(400).json({ message: 'Incorrect username, please try again' });
            return;
        }
        
        const validPassword = user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        
        res.json({ user: user, message: 'You are now logged in!' });
     })
    })
    .catch ((err) => res.status(400).json(err))
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((user) => {
    if (!user[0]) {
      res.status(404).json({ message: 'No user found with that id' });
      return;
    }
    res.json(user);
  })
  .catch((err) => {res.status(500).json(err)});
});


// deletes user
router.delete('/:id', (req, res) => {
  User.destroy({where: {id: req.params.id}})
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'No user found with that id' });
        return;
      }
      res.json(user);
    })
    .catch(err => {res.status(500).json(err)});
});

module.exports = router;