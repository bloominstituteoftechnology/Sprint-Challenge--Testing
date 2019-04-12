const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
const server = require('./api/server.js');


server.listen(3000, () => {
  console.log(`\n=== Server listening on port 3000\n`);
});
