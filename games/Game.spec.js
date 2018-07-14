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

  it('runs the tests', () => {});

  describe('model tests', () => {
    const testingGame = {
      title: 'Revenge of the Sith',
      genre: 'science fiction',
      releaseDate: 'A long time ago..',
    }
    it('Saves information to database', async () => {
      await Game.create(testingGame);
    })

    it('creates model correctly', async () => {
      expect(testingGame.title).toBe('Revenge of the Sith')
      expect(testingGame.genre).toBe('science fiction')
      expect(testingGame.releaseDate).toBe('A long time ago..')
    })

  })

});
