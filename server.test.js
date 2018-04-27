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
  let gameId;
  // hint - these wont be constants because you'll need to override them.
  beforeEach(done => {
    const newGame = new Game({
      title: 'Zelda',
      genre: 'adventure',
      releaseDate: 'February 21, 1986'
    });

    newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      })
      .catch(err => {
        console.log({error: 'error saving the game homeboy'},err)
      });
      done();
    // write a beforeEach hook that will populate your test DB with data
    // each time this hook runs, you should save a document to your db
    // by saving the document you'll be able to use it in each of your `it` blocks
  });
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log({error: 'something just aint right...'},err)
      return done();
    });
    // simply remove the collections from your DB.
  });

  // test the POST here
  describe(`[POST] /api/game/update`, () => {
    it('should save a document to the db', done => {
      chai
        .request(server)
        .post('/api/game/create')
        .send({ name: 'Megaman', genre: 'Action', releaseDate: 'December 17, 1987' })
        .then(response => {
          
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    it(`Should fail if name or genre aren't provided`, () => {
      return chai
        .request(server)
        .post('/api/game/create')
        .send({ bad: 'data' })
        .then(res => {
          const genreMessage = res.body.errors.genre.message;
          const nameMessage = res.body.errors.name.message;
          const releaseMessage = res.body.errors.releaseDate.message;
          expect(res.status).to.equal(422);
          expect(genreMessage).to.equal('Path `genre` is required.');
          expect(nameMessage).to.equal('Path `name` is required.');
          expect(releaseMessage).to.equal('Path `releaseDate` is required.');
        });
    });
  });
  // test the GET here
  describe(`[GET] /api/game/get`, () => {
    it('should get a list of all the games in db', done => {
      chai
        .request(server)
        .get('/api/game/get')
        .then(response => {
          // console.log(response.body);
          const { _id, name, genre, releaseDate } = response.body[0];
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
          expect(_id).to.equal(gameId);
          expect(name).to.equal('Zelda');
          done();
        })
        .catch(err => {
          throw err;
        });
    });
    
  });
  // Test the DELETE here
  
  // --- Stretch Problem ---
  // test the PUT here
  server.put('/api/game/update', (req, res) => {
    const { title } = req.params;
    const { genre, releaseDate } = req.body;
  
    Char
      .findOneAndUpdate({ title: title }, { genre: race, releaseDate: releaseDate }, { new: true })
      .then(updatedGame => {
        if (!updatedGame) {
          res.status(500).json(err);
          return;
        }
        res.status(200).json(updatedGame);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  
  
  });

});
