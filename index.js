const { server, port } = require('./api/server');

server.listen(port, () => console.log(`This port is over ${port}!!`));
