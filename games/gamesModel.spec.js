const games = require('./gamesModel.js');
const db = require('../data/dbConfig');

describe('Games Model', async () => {
   
     afterEach( async () => {
         await db('games').truncate();
     })
       
     test('It should insert the game in database', async () => {
            const ids = games.insert({title: 'ball', genre:'drama', releaseYear: '1500'});
             expect(ids).toBeDefined();
     })
});