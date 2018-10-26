const server = require("./app/server");
const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`\n*** API running port: ${port}\n`));
