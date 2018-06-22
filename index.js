const mongoose = require('mongoose');
const server = require('./api/server');
const config = require('./config.js');
const { dbuser, dbpassword, dbname } = config.secret

const port = 5050;
mongoose
  .connect(`mongodb://${dbuser}:${encodeURIComponent(dbpassword)}@ds016718.mlab.com:16718/${dbname}`)
  .then(() => {
    console.log('connected to production database');
    server.listen(port, () => {
      console.log(`Magic happening on port ${port}`);
    });
  })
  .catch(err => {
    console.log('error connecting to production database, is MongoDB running?');
  });
