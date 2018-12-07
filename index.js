const server = require('./api/server.js');
const videogamesRoutes = require('./videogames/videogamesroutes.js');

const port = process.env.PORT || 9002;
server.listen(port, () => console.log(`\n ** server up on port ${port} **\n`));

//Videogame Methods
server.get('/api', videogamesRoutes);
server.get('/api/games', videogamesRoutes);
server.post('/api/games', videogamesRoutes);
