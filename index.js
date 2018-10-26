const server = require('./server.js');
 const port = 9000
server.listen(port, () => console.log(`\nListening on port ${port}\n`));