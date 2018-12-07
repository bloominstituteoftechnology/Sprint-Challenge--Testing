const server = require("./server");
const port = 3300;

server.listen(port, () => console.log(`Listening to port ${port}`));
