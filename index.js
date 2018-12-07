// Imports
const server = require('./server.js');

// Sets up the port for the server
const PORT = process.env.PORT || 9000;

// Sets up the server to listen on the port specified above
server.listen(PORT, () =>
  console.log(`=== The server is listening on port ${PORT} ===`)
);
