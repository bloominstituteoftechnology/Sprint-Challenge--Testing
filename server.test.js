const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');

describe('Games', () => {
  before(done => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('we are connected');
      done();
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
      console.log('we are disconnected');
    });
  });
  let myGame = new Game({
 + name: "game",
    +    date: Date.now,
    +    genre: "RPG"
    +  });
```
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    beforeEach(() => {
      return db.clear()
        .then(function () {
          return db.save([tobi, loki, jane]);
        });
    });
    beforeEach(function () {
      banana = new Banana();
    });

  });
  afterEach(done => {
    // simply remove the collections from your DB.
  });

  // test the POST here
  server.post
  {
  title: 'California Games',
  genre: 'Sports',
  date: 'June 1987'
}
```

// test the GET here
server.get

  ```
expect(res.data[0].foo).to.equal(bar.foo);
```

// test the PUT here
server.put

  * Just like in class, send up the information you want changed on the server via the`req.body`.
* You can send up the Id and the Server will be using that to
// --- Stretch Problem ---
// Test the DELETE here
server.delete
DELETE can take an ID off of the route parameter, or off of the req.body.It's your choice.
});
