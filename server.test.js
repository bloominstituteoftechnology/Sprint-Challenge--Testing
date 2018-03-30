const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');

const server = require('./server');
chai.use(chaihttp);

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

  let gameId;

  beforeEach(async function() {
    let newGame = await Promise.resolve(
      new Game({
        title: 'Mega Man',
        releaseDate: 'December 17, 1987',
        genre: 'Action Platformer'
    }).save()).catch(err => {
      return console.error(err);
    });
      return gameId = newGame.id;
  });

  afterEach(async function() {
    await Game.remove({}, (err) => {
      if (err) {
        return console.log(err);
      };
      return mongoose.connection.db.dropDatabase();
    });
  });

  describe('[POST] /api/game/create', () => {
    it('should add a new game', async function() {
      const game = {
        title: 'Contra',
        releaseDate: 'February 20, 1987',
        genre: 'Run and gun'
      };

      const res = await Promise.resolve(chai.request(server).post('/api/game/create').send(game)).catch(err => console.error(err));
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Contra');
    });

    it('should return HTTP status 422 when failing to save to the database', async function() {
      const game = {
        title: 'Contra',
        releaseDate: 'February 20, 1987',
      };

      const res = await Promise.resolve(chai.request(server).post('/api/game/create').send(game)).catch(err => {
        return expect(err.status).to.equal(422);
      }); 
    });
  });

  describe('[GET] /api/game/get', () => {
    it('should return all games in the database', async function() {
      const res = await Promise.resolve(chai.request(server).get('/api/game/get')).catch(err => console.error(err));
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(1);
    });

    it('should return an array', async function() {
      const res = await Promise.resolve(chai.request(server).get('/api/game/get')).catch(err => console.error(err));
      expect(Array.isArray(res.body)).to.equal(true);
    });
  });

  describe('[PUT] /api/game/update', () => {
    it('should update a game document in the database', async function() {
      const update = {
        id: gameId,
        title: 'Castlevania'
      };

      const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(update)).catch(err => console.error(err));
      expect(res.body.title).to.equal('Castlevania');
    });

    it('should return HTTP status 422 when no title is provided', async function() {
      const update = {
        id: gameId,
      };

      const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(update)).catch(err => {
        return expect(err.status).to.equal(422);
      }); 
    });

    it('should return HTTP status 422 when no title is provided', async function() {
      const update = {
        id: 1234567890,
        title: 'Castlevania'
      };

      const res = await Promise.resolve(chai.request(server).put('/api/game/update').send(update)).catch(err => {
        return expect(err.status).to.equal(422);
      }); 
    });
  });

  // --- Stretch Problem ---
  describe('[DELETE] /api/game/destroy/:id', () => {
    it('should remove the specified game from the database', async function() {
      const res = await Promise.resolve(chai.request(server).delete(`/api/game/destroy/${gameId}`)).catch(err => console.error(err));

      expect(res.text).to.equal('{"success":"Mega Man was removed from the DB"}');
      const deletedGame = await Promise.resolve(Game.findById(gameId)).catch(err => console.error(err));
      expect(deletedGame).to.equal(null);
    });

    it('should return HTTP status 422 when an invalid ID is provided', async function() {
      const res = await Promise.resolve(chai.request(server).delete(`/api/game/destroy/I_am_an_invalid_ID`)).catch(err => {
        return expect(err.status).to.equal(422)
      });
    });
  });
});
