/*== GAME API ============================================

GET -> /api/games
	Get a list of games.

*/

// EXPRESS ROUTER, DEPENDENCIES
// ==============================================
const router = require('express').Router();

const gameDb = require('./gameHelper');

// GAME ROUTES
// ==============================================
router.get('/games', getGames);

// CALLBACK FUNCTIONS
// ==============================================
async function getGames(req, res) {
  try {
    const games = await gameDb.get();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = router;
