const request = require('supertest');
const server = require('./server');

describe('POST /games', ()=>{
    it('should include proper fields; returns 422 if incomplete', async ()=>{

        let gameBody = {
            title: 'Pacman',
            genre: '',
            releaseYear: 1980 
        }
        let response = await request(server).post('/games').send(gameBody)

        expect(response.status).toBe(422)
    })

    it('should return 200 if complete', async ()=>{
        let gameBody = {
            title: 'Pacman', 
            genre: 'Arcade', 
            releaseYear: 1980 
        }
        let response = await request(server).post('/games').send(gameBody);

        expect(response.status).toBe(200)
        

    })

})

describe('GET /games', ()=>{
    it('should return list of games w/ proper status code', ()=>{
        let response = await request(server).get('/games');

    }) 
})
