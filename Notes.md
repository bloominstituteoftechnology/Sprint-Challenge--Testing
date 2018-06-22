gist:
https://gist.github.com/luishrd/ea25b1e1c25a9e076c49aba924bcbf1c

You're going to be writing the tests for a CRUD API.
The API itself is really simple. Your task is to peek at the endpoints found in the ./api/server.js file and write tests for them.

NOTICE that the definition of the server (inside ./api/server.js) is separate from the code executes the server (inside ./index.js), this makes it easier to test the server code in isolation. It is a common pattern used to avoid starting an instace of the server and a connection to the production database that will result on Address already in use errors.