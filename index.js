require('dotenv').config();

const server = require('./routes');

const port = process.env.port || 5000;

server.listen(port,() => console.log(`sever is listening on port ${port}`))
