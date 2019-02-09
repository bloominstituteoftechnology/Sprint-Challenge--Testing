const server = require('./api/server.js');
const port = 3800;

server.listen(port, () => console.log(`\n** server up on port ${port} **\n`));