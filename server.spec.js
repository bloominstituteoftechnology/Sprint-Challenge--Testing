const request = require('supertest')
const server = require('./server.js');
describe('server.js', ()=> {

    it('GET /games returns 200 status code', async ()=> {
        const response = await request(server).get("/games");
        expect(response.status).toEqual(200)
    });

    it('GET /games returns an array', async ()=> {
        const response = await request(server).get('/games')
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('POST /games returns 422 status code when incorrect', async ()=> {
        const title = "game";
        const response = await request(server).post(`/games`)
        .send({title: `${title}`})
        expect(response.status).toBe(422);
    });

    it('POST /games returns 200 status code when correct', async ()=> {
        const title = "game";
        const genre = "cool";
        const response = await request(server).post(`/games`)
        .send({title: `${title}`, genre: `${genre}`})
        expect(response.status).toBe(200);
    });

    
})