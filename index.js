const server = require('./api/server.js'); // import api endpoints

server.listen(serverPort, () => console.log(`## ${serverName} running on port ${serverPort} ##`));