const server = require('./api/server.js');

const port = 5000;

server.listen(port, () => { console.log(`\n=== Server listening on port ${ port } ===`) });
