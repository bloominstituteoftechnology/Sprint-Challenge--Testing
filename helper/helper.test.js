const games = require('./helper.js');
const db = require('../data/dbConfig.js');

describe('the helper functions', () => {
    it('should insert new game', async() => {
        const ids = await games.insert(
            {  title: 'Pacman', 
               genre: 'Arcade'}
        );

        expect(ids.length).toBe(1);

        db('games').truncate();
    })
})