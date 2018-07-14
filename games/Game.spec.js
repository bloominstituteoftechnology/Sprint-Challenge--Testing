const mongoose = require('mongoose');

const Game = require('./Game');

describe('The Game Model', () => {
  let gameId
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

  it('should create data in database', async () => {
    await Game.create({
      title: 'Canada Games',
      genre: 'Sports',
      releaseDate: 'June 1986'
    })
    .then(game => {
      gameId = game._id
    })
  });

  it('should get data from database', async () => {
    await Game.find({})
      .then(game => {
        expect(game[0].title).toBe('Canada Games')
        expect(game[0].genre).toBe('Sports')
        expect(game[0].releaseDate).toBe('June 1986')
      })
  });

  it('should remove data from database', async () => {
    await Game.findByIdAndRemove(gameId)
  })
});
