const server = require('./api/server')
const port = process.env.PORT || 3000

server.listen(port, () => {
	console.log(`It's alive and kickin\` on port ${port}`)
})
