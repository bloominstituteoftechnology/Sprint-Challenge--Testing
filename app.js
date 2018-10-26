const server = require("./server");

const port = 5050;

server.listen(port, () => {
  console.log("\nserver up on port 5050\n");
});
