const games = require('./gamesModel.js');
const db = require('../data/dbConfig');

describe('Games Model', async () => {
   
     afterEach( async () => {
         await db('games').truncate();
     })
       
     test.skip('It should insert the game in database', async () => {
            const ids = games.insert({title: 'cricket', genre:'kind of drama', releaseYear: '1500'});
            expect(ids.length).toBe(1);
            expect(ids[0]).toBe(1);
     })
});