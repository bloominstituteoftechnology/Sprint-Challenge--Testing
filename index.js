// Import Server
const server = require('./api/server');

// Server Port
const port = 6000;

server.listen(port, () => console.log(`Server is listening on port ${port}!`));
