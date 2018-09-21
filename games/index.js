const router = require('express').Router();
const g = require('./games');

router.route('/')
  .get(g.GET)
  .post(g.POST);

module.exports = router;
