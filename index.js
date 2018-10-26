const server = require('./server');

const port = 8080;
server.listen(port, () => console.log(`\n~~~ server listening on port ${port} ~~~\n`));
