const mongoose = require('mongoose');
const chai = require('chai');
const { expect } = chai;
const chaiHTTP = require('chai-http');
const sinon = require('sinon');

chai.use(chaiHTTP);

const Game = require('./models');
const server = require('./server');

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
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
    let tempTitle = null;
    let tempId = null;
    let testGame = new Game ({
      title: 'Five Nights at Freddys',
      genre: 'Horror', 
      releaseDate: 'yesterday'
    });
    testGame
      .save()
      .then(savedGame => {
        tempTitle = savedGame._title;
        tempId = savedGame._id;
        done();
      })
      .catch(error => {
        console.error(error);
        done();
      });
  });
  afterEach(done => {
    // simply remove the collections from your DB.
    tempTitle = null;
    tempId = null;
    Game
      .remove({}, error => {
        if (error) console.error(error);
        done();
      });
  });

  // test the POST here
  describe('POST /api/games/create', () => {
    it('should return a code 200 and message if data is added to db', () => {
      const newGame = {
        title: 'cheese',
        genre: 'food',
        releaseDate: 'tomorrow'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((error, res) => {
          if (error) return console.log(error);
          expect(res.status).to.equal(200);
        });
    });
    it('should return an error code 422 if data is invalid', () => {
      const newGame = {
        breakfast: 'french toast',
        mapleSyrup: 'hell yeah'
      };
      chai.request(server)
        .post('/api/game/create')
        .send(newGame)
        .end((error, res) => {
          if (error) {
            expect(error.status).to.equal(422);
            //expect(res.body.error).to.equal('error message something');
          }
        });
    });
  });

  // test the GET here
  describe('GET /api/games/get', () => {
    it('should return all items in DB', () => {
      chai
        .request(server)
        .get('/api/game/get')
        .end((error, res) => {
          //if (error) return console.error(error);
          // expect(res.body.length).to.equal(2);
        });
    });
  });

  // test the PUT here
  describe('PUT /api/games/update', () => {
    it('should return an error code 422 and message if no item is found that matches', () => {
      const gameUpdate = {
        title: 'Updated Name'
      }
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((error, res) => {
          if (error) {
            expect(error.status).to.equal(422);
            expect(res.body.error).to.equal('Must Provide a title && Id');
          }
        });
    });
    it('should correctly update an item in the db', () => {
      const gameUpdate = {
        id: tempId,
        title: 'Updated Name'
      }
      chai
        .request(server)
        .put('/api/game/update')
        .send(gameUpdate)
        .end((error, res) => {
          expect(res.status).to.equal(200);
        });
    });
  });

  // --- Stretch Problem ---
  // Test the DELETE here
  describe('DELETE /api/games/destroy/:id', () => {});
});
