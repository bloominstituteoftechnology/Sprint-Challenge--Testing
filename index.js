const server = require('./api/server.js');

server.listen(port, () => {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
})