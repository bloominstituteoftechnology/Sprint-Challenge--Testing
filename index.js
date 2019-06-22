const server = require('./api/server.js')

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`*** Server Running on port ${port} ***`)
});