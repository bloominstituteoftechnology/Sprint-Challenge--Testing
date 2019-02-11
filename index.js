const server = require('./server');
const port = 5656;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})