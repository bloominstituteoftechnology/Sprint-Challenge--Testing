const server = require('./api/server');

const port = 9001 || process.env.PORT;
server.listen(port, () => console.log(`\nServer up on PORT: ${port}\n`) )
