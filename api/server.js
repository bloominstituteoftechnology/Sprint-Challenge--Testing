const express = require('express');
const helmet = require('helmet');

const gamesRoutes = require('./games/gamesRoutes');

const port = 9001;

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());

// ROUTES
server.use('/games', gamesRoutes);

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
