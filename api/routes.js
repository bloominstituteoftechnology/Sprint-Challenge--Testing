// GAME API ROUTES
// ==============================================
const gameRouter = require('./games/gameRoutes');

module.exports = app => {
  app.use('/api', gameRouter);
};
