const server = require('./server');

const port = process.env.PORT || 9000;
server.listen(port, () => {console.log(`\nServer up on port ${port}\n`)});
