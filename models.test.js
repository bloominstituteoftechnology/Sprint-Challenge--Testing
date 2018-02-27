const sinon = require('sinon');
const Game = require('./models');
const mongoose = require('mongoose');
describe('NESGames Model', () => {
  beforeAll(()=> {
    mongoose.Promise = global.Promise;
    const conn = mongoose.connect('mongodb://localhost/test');
    const db = mongoose.connection;
    db.on('error', () => console.error.bind(console, 'connection error'));
    return conn;
  });

  afterAll(done => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

  describe('#getGameTitle', () => {
    it('should give back the proper game.title', () => {
      const game = new Game({
        title: 'California Games',
        date: 'June 1987',
        genre: 'Sports'
      });
      expect(game.getGameTitle()).toEqual('California Games');
    });
  });
  
  describe('#getAllGames()', () => {
    it('should return all the games', () => {
      sinon.stub(Game, 'find');
      Game.find.yields(null, [
        {
          title: 'California Games',
          date: 'June 1987',
          genre: 'Sports'
        }
      ]);
      Game.getGames(returnObject => {
        expect(returnObject.length).toEqual(1);
        expect(returnObject[0].title).toEqual('California Games');
        Game.find.restore();
      });
    });
  });
  
});
