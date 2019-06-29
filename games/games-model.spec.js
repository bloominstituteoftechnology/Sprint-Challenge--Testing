const db = require('../data/dbConfig.js');
const Games = require('./games-model.js');

describe('games model', () => {

  describe('getGames()', () => {

    afterEach(async () => {
      await db('games').truncate()
    })

    it('return an empty array', async () => {
      const games = await db('games');
      expect(games).toEqual([]);
    })
  })
  describe('insert()', () => {
    afterEach(async () => {
      await db('games').truncate()
    })

    it('should add game details', async () => {
      await Games.insert({ title: 'Tekken Tag Tournament', genre: 'Arcade', releaseYear: 1999 })

      const game = await db('games');
      expect(game).toHaveLength(1);
    })
  })
})
