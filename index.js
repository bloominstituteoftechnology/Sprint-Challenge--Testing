const server = require('./api/server.js');

const PORT = 8888;
server.listen(PORT, () => console.log(`\n** server up on port ${PORT} **\n`));