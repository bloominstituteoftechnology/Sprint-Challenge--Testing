const server = require('./api/server.js');

const port = process.env.PORT || 9333;

server.listen(port, () =>
    console.log(`\nserver is up on port ${port}\n`));