const mongoose = require('mongoose');

const Game = require('./Game');

describe.skip('NESGames Model', () => {
  beforeAll(() => mongoose.connect('mongodb://localhost/test').then(() => console.log('\n=== connected to TEST DB ===')));

  afterAll(() => mongoose.disconnect().then(() => console.log('\n=== disconnected from TEST DB ===')));

  describe('#getGameTitle', () => {
    it('should return the proper game.title', () => {
      const game = new Game({
        title: 'California Games',
        date: 'June 1987',
        genre: 'Sports',
      });
      expect(game.getGameTitle()).toEqual('California Games');
    });
  });
});
