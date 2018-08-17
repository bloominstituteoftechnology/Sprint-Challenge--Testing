// error handling middleware
function errors(err, req, res, next) {
  switch (err.code) {
    case 400:
      res.status(400).json({
        error: err.error,
      });
      return;

    case 422:
      res.status(422).json({
        error: err.error,
      });
      return;

    case 500:
      res.status(500).json({
        error: err.error,
      });
      return;

    default:
      res.status(400).json({
        error: 'Something weird has happened!',
      });
      return;
  }
}

module.exports = errors;
