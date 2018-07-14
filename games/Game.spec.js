const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  });

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='));
  });

  describe('Game model testing', () => {
    it('model should have defined properties', async () => {
      const gameData = {
        title: 'BlehBleh',
        genre: 'Blarg',
        releaseDate: 'Blerg1995'
      }

        const response = await Game.create(gameData)
  
        expect(response.title).not.toBeUndefined()
        expect(response.genre).not.toBeUndefined()
        expect(response.releaseDate).not.toBeUndefined()
        expect(response._id).not.toBeUndefined()
    });

    it('should return the correct getGameTitle', async () => {
      const gameData = {
        title: 'BlehBleh2',
        genre: 'Blarg',
        releaseDate: 'Blerg2001'
      }

      const response = await Game.create(gameData)

      expect(response.getGameTitle()).toBe('BlehBleh2')
    });
  })

});
