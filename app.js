const server = require("./server");

const port = 5050;

server.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});
