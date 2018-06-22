const mongoose = require('mongoose')
const server = require('./api/server')

const port = 5050
mongoose
  .connect('mongodb://localhost/games')
  .then(() => {
    console.log('connected to production database')
    server.listen(port, () => {
      console.log(`Magic happening on port ${port}`)
    })
  })
  .catch(err => {
    console.log('error connecting to production database, is MongoDB running?')
  })
