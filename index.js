const server = require('./server.js');
var port = 4444;

server.listen(port, () => {
    console.log(`Server at Port ${port} is up an running!`)
});