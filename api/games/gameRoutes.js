/*== GAME API ============================================

GET -> /api/games
	Get a list of games.

POST -> /api/games
	Adds a game to the games database using the information 
	sent inside the body of the request.

*/

// EXPRESS ROUTER, DEPENDENCIES
// ==============================================
const router = require('express').Router();

const gameDb = require('./gameHelper');

// GAME ROUTES
// ==============================================
router.get('/games', getGames);
router.post('/games', addGame);

// CALLBACK FUNCTIONS
// ==============================================
async function getGames(_, res) {
  try {
    const games = await gameDb.get();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addGame(req, res) {
  if (req.body.title && req.body.genre && req.body.releaseYear) {
    try {
      const game = req.body;
      const title = await gameDb.checkTitle(game.title);
      if (title) {
        res.status(404).json({ message: 'Game is already in database.' });
      } else {
        await gameDb.addGame(game);
        res.status(201).json({ message: 'Sucessfully added game.' });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(400).json({ error: 'Please provide all the information.' });
  }
}

module.exports = router;
