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

  let game = {
    title: 'California Games',
    genre: 'Sports',
    date: 'June 1987'
  }

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
      describe("[GET]" /)


      expect(res.data[0].foo).to.equal(bar.foo);


      // test the PUT here
      describe("PUT )

        * Just like in class, send up the information you want changed on the server via the`req.body`.
* You can send up the Id and the Server will be using that to
// --- Stretch Problem ---
// Test the DELETE here
server.delete
DELETE can take an ID off of the route parameter, or off of the req.body.It's your choice.
});
  describe(`[POST] /api/register`, () => {
    it('Should add a new user to the DB', (done) => {
      const user = {
        email: "test2@test2.com",
        password: "asdf",
        aboutme: "I do funny stuff to code"
      };
      chai.request(app)
        .post('/api/register')
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
  describe(`[POST] /api/login`, () => {
    it('Should login a user and return it', (done) => {
      const user = {
        email: "test2@test2.com",
        password: "asdf"
      };
      chai.request(app)
        .post('/api/login')
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