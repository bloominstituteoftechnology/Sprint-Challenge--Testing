const server = require('./api/server.js');

port = 3300;
server.listen(port, () => console.log(`\nServer is running on port ${port}\n`));
