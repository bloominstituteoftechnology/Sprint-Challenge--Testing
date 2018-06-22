const mongoose = require('mongoose')

const Game = require('./Game')

describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?')
      })
  })

  afterEach(() => {
    return Game.remove()
  })

  afterAll(() => {
    return mongoose
      .disconnect()
      .then(() => console.log('\n=== disconnected from TEST DB ==='))
  })

  it('model should validate the input?', async () => {
    const game = {
      title: 'California Games',
      genre: 'Sports',
      releaseDate: 'June 1987'
    }
    const savedGame = await Game.create(game)
    expect(savedGame.title).toEqual(game.title)
    expect(savedGame.genre).toEqual(game.genre)
    expect(savedGame.releaseDate).toBe(game.releaseDate)
  })

  // test away!
})
