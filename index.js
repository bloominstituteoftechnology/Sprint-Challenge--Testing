const server = require('./server');
const PORT = 42;

server.listen(PORT, () => {
    console.log(`yep, im awake! listenin on port ${PORT}`);
})