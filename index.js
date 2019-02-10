require('dotenv').config();

const server = require('./api/server');
const PORT = process.env.PORT || 3500;

server.listen(PORT, () => {console.log(`server is running on ${PORT}`) });