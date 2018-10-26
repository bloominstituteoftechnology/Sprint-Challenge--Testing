const server = require('./api/server.js');

const port = 7700;

server.listen = (port, () => {
    console.log(`\n=== RUNNING ON PORT ${port} ===\n`)
});