const games = require("./gamesModel");
const db = require("../data/dbConfig.js");

afterEach(async () => {
    await db("games").truncate();
  });

describe("the games model", () => {

    it('Should get all games', async () => {
        const gameslist = await games.fetch()
        expect(gameslist).toEqual([])
    })

    it('Should fetch an individual game by ID', async () => {
        const game = await games.insert({
            title: 'Axis and Allies 2',
            genre: 'Board',
            releaseYear: 1999
        });
        const grabGame = await games.fetch(1)

        expect(grabGame.title).toBe('Axis and Allies 2')
    })

    it('Should insert a new game', async ()=> {
        const game = await games.insert({
            title: 'Axis and Allies 2',
            genre: 'Board',
            releaseYear: 1999
        });

        expect(game.id).toBe(1);
    });

    it('Should delete existing game by ID', async () => {
        const game = await games.insert({
            title: 'Axis and Allies 2',
            genre: 'Board',
            releaseYear: 1999
        });
        const deleteGame = await games.remove(1)
        expect(deleteGame).toBe(1)
    })
})