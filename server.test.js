const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('./server');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

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
  // declare some global variables for use of testing
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const testObject = { title: 'California Games', genre: 'Sports', date: 'June 1987' };
    const { title, genre, date } = testObject;
    const myGame = new Game({ title, date, genre });
    myGame
      .save()
      .catch(err => {
        console.log('Error Saving Before Object to DB');
      });
    done();
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    mongoose.connection.db.dropCollection('games', function (err, result) {
      if (err) { console.log('Error Dropping Collection from MongoDB, is there a MongoDB instance Running?'); done(); }
      if (result) done();
    });
  });

  // test the POST here
  describe('[POST] /api/game/create', () => {
    it(`should create a new Game document on MongoDB`, done => {
      const testObject = { title: 'Super Mario Brothers', genre: 'Adventure', date: '1981' };
      chai.request(server)
        .post('/api/game/create')
        .send(testObject)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal('Super Mario Brothers');
          expect(res.body).to.have.property('_id');
          return done();
        });
    });
  });
  // test the GET here
  describe('[GET] /api/game/get', () => {
    it(`should retrieve a list of Games from MongoDB`, done => {
      const testObject = { title: 'Super Mario Brothers', genre: 'Adventure', date: '1981' };
      chai.request(server)
        .get('/api/game/get')
        // .send(testObject)
        .end((err, res) => {
          if (err) {
            console.log(err);
            done();
          }
          expect(res.status).to.equal(200);
          expect(res.body[0]).to.have.property('_id');
          expect(res.body[0].title).to.equal('California Games');
          return done();
        });
    });
  });

  // test the PUT here

  describe('[PUT] /api/game/update', () => {
    it(`should retrieve a list of Games from MongoDB`, done => {
      let foundGame = {};
      const testObject = { title: 'California Games Updated', genre: 'Super Sports', date: 'June 1990' };
      // console.log(testObject2);
      // console.log(putObject);
      // done();      
      Game.find({}, (err, foundGames) => {
        if (err) return;
        let foundGame = foundGames[0];
        const putObject = { id: foundGame._id, title: testObject.title, genre: testObject.genre, date: testObject.date };
        chai.request(server)
          .put('/api/game/update')
          .send(putObject)
          .end((err, res) => {
            if (err) {
              console.log(err.response.text);
              done();
            }
            // console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body._id).to.equal(String(foundGame._id));
            expect(res.body.title).to.equal('California Games Updated');
            return done();
          });
      });
    });
  });
  // --- Stretch Problem ---
  // Test the DELETE here

});
