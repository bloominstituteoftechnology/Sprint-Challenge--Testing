const request = require('supertest');
const server = require('./api/server.js');
 describe('Server', () => {
    describe('GET /', () => {
        it('returns status code 200(OK)', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
         it('returns JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });
         it('returns {message: "Server is up!"', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({message: 'Server is up!'});
        });
    });
     
});

describe('GET /games', () => {
    it('returns status code 200(OK)', async () => {
        const res = await request(server).get('/games');
        expect(res.status).toBe(200);
    });
    
    it('returns JSON', async () => {
        const res = await request(server).get('/games');
        expect(res.type).toBe('application/json');
    });
     it('returns an array of objects of games', async () => {
        const expected = [
            {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
            },
            {
                title: 'Rocket Knight Adventures', // required
                genre: 'Platformer', // required
                releaseYear: 1993 // not required
            },
            {
                title: 'Metal Slug', // required
                genre: 'Platformer', // required
                releaseYear: 1996 // not required
            },
            {
                title: 'Sonic R', // required
                genre: 'Racing', // required
                releaseYear: 1997 // not required
            }
            
        ]
        const res = await request(server).get('/games');
        expect(res.body).toBe(expected);
    });
});
}); 	
}); 