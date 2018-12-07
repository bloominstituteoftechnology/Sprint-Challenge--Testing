const server = require('./api/server.js');

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`\n** we are up and running on port ${port} **\n`)); 