module.exports = (req, res, next) => {
  req.body.title && typeof req.body.title === 'string' && req.body.title.length < 256 && req.body.genre && typeof req.body.genre === 'string' && req.body.genre.length < 256
  ? next()
  : res.status(422).json({ error: 'need title and genre to add game'})
}