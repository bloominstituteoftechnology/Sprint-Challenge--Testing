const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');

const Game = require('./models');

describe('Games', () => {
  before(done => {
    let gameId = null;
    let testGame = null;
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

  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.

  beforeEach(done => {
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    const myGame = new Game({
      title: 'myGame',
      date: '1998',
      genre: 'classic'
    });
    myGame.save()
      .then(game => {
        testGame = game;
        gameId = game._id;
        done();
      })
      .catch(game => {
        testGame = game;
        gameId = game._id;
        done();
      });
  });

});
  afterEach(done => {
  // simply remove the collections from your DB.
  game = remove Game();
});

// test the POST here
describe("[POST] /api/game/create", () => {
  it("should create new game") => {
    const user = {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
    chai.request(app)
      .post('/api/game/create')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(typeof res.body.id).to.equal('number');
        return done();
      });
  });
});


// test the GET here
describe("[GET] /api/game/create", () => {
  it("should create new game") => {
    const user = {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
    chai.request(app)
      .post('/api/game/create')
      .send(gameCreate)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(typeof res.body.id).to.equal('number');
        return done();
      });
  });
      });

expect(res.data[0].foo).to.equal(bar.foo);


// test the PUT here
describe(`[PUT] /api/game/update`, () => {
  it('Should login a user and return it', (done) => {
    const user = {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
    chai.request(app)
      .post('/api/game/update')
      .send(gameUpdate)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(typeof res.body.aboutme).to.equal('string');
        return done();
      });
  });
});


// --- Stretch Problem ---
// Test the DELETE here
describe(`[DELETE] /api/game/delete`, () => {
  it('Should login a user and return it', (done) => {
    const user = {
      title: 'California Games',
      genre: 'Sports',
      date: 'June 1987'
    };
    chai.request(app)
      .post('/api/game/delete')
      .send(user)
      .end((err, res) => {
        if (err) {
          console.log(err);
          done();
        }
        expect(res.status).to.equal(200);
        expect(typeof res.body.aboutme).to.equal('string');
        return done();
      });
  });
});
});
