const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
const Game = require('./models');

chai.use(chaiHttp)

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

  beforeEach(() => {
    const newGame = new Game({
      title: 'Castlevania',
      genre: 'Action'
    });
    return newGame
      .save()
      .then(savedGame => {
        gameId = savedGame._id.toString();
      });
  });
  
  afterEach(done => {
    Game.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  afterEach(done => {
    // simply remove the collections from your DB.
    Game.remove({})
      .then(done())
      .catch(err => {
        console.log(err);
        done();
      })
  });

  // test the POST here

  describe(`[POST] /api/game/create`, () => {
    it('Posts a Game', () => {
        const newGame = {
            'title': 'The Legend of Zelda',
            'genre': 'Action-adventure'
        } 

        return chai.request(server)
            .post('/api/game/create')
            .send(newGame)
            .then(function(res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.title).to.equal(newGame.title);
                expect(res.body.genre).to.equal(newGame.genre);
                                                          
            })
            .catch(function(err) {
                throw err;
            });
        });
    });

  // test the GET here

  describe(`[GET] /api/game`, () => {
    it('Returns all them games', () => {
      return chai.request(server)
        .get('/api/game/get')
        .then(function(game) {
            expect(game).to.have.status(200);
            expect(game).to.be.json;
            expect(game.body).to.have.length(1);
            expect(game.body[0]._id).to.equal(gameId);
        })
        .catch(function(err) {
            throw err;
        });
    });
    
  });

  // Test the DELETE here
  describe('[DELETE] /api/games/destroy/:id', () => {
    it('should delete the identified game from the database', () => {
      return chai.request(server)
        .delete(`/api/game/destroy/${gameId}`)
        .then(res => {
          expect(res).to.have.status(200);
        }).catch(err => {
          throw(err);
        });
    });
  });
  
  // --- Stretch Problem ---
  // test the PUT here
  describe(`[PUT] /api/game/update/:id`, () => {
    it('Updates the game', function() {
        const update = {
          id: gameId,
          title: 'Final Fantasy'
        }
        return chai.request(server)
            .put(`/api/game/update/`)
            .send(update)
            .then(function(res) {
              const updated = res.body;
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(updated.title).to.equal(update.title);
            })
            .catch(function(err) {
                throw err;
            });
        });
    });
});
