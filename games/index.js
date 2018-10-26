const router = require("express").Router();
const g = require('./games');

router.route('/')
    .get(g.GET)
    .post(g.POST)

router.route('/:id')
    .get(g.GET)
    .put(g.PUT)
    .delete(g.DELETE);

module.exports = router;
