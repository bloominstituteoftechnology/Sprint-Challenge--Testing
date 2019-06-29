require('dotenv').config();

const server = require('./Server/server');
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server Running on Port:${port}`);
});