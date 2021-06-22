const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require("../../utils/auth");

// new comment
router.post('/', withAuth, (req, res) => {
  console.log(req.body.post_id);
  Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    })
    .then((newComment) => res.json(newComment))
    .catch ((err) => res.status(400).json(err))
});

module.exports = router;