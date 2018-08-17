// middleware for project constraints
function gameConstraints(req, res, next) {
  const { game } = req.body;

  if (game == undefined) {
    return next({
      code: 422,
      error: `Please provide a 'game' object for the game.`,
    });
  }

  const { title, genre, releaseYear } = game;

  if (!game.title || game.title.length < 1) {
    return next({
      code: 422,
      error: `Please provide a 'title' for the game.`,
    });
  }

  if (!genre || genre.length < 1) {
    return next({
      code: 422,
      error: `Please provide a 'genre' for the game.`,
    });
  }

  req.title = title;
  req.genre = genre;
  req.releaseYear = releaseYear;

  next();
}

module.exports.gameConstraints = gameConstraints;
