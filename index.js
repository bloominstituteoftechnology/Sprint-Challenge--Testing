//import server
const server = require('./api/server.js');

//create listener for server
const PORT = 4000;
server.listen(PORT, ()=>{
  console.log(`Server up and running at port ${PORT}`);
})