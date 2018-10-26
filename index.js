const server = require('./api/server.js');

port = 8000;
server.listen(port, () => console.log(`\n== SERVER RUNNING ON PORT ${port} ==\n`));
