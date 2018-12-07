const server = require('./api/server.js');

const port = 3750;
server.listen(port, console.log(`\nwe are listening on port ${port}\n`));