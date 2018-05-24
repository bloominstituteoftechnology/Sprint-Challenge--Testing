const mongoose = require('mongoose');
const server = require('./server');

const port = 5050;
mongoose
  .connect('mongodb://localhost/games')
  .then(() => {
    console.log('connected to production database');
  })
  .catch(err => {
    console.log('error connecting to production database');
  });

server.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});
