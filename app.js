const mongoose = require('mongoose')
const server = require('./server')

const port = 5050
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/video-games', {}, err => {
  if (err) throw new Error(err)
  console.log('DB up and running')
})

server.listen(port, () => {
  console.log(`Magic happening on port ${port}`)
})
