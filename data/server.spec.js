const server = require('../api/server');
const request = require('supertest');




describe('server.js', () => {


    describe('Get/', () => {
        it('should return 200', () => {
        return request(server).get('/api/games')
        .expect(200)
    })
    
    it('returns something', () => {
        return request(server).get('/api/games')
        .then( response => {
            expect(Array.isArray(response.body)).toBe(true)
        })
    })

    it("should return json type", () => {
        return request(server)
        .get('/api/games')
        .expect(res.type)
        .toBe("application/json");
    })
    })
    


    describe('Post to api/games', () => {
        it('should recieve 201 if successful', () => {
             const game = { title: 'Centipede', genre: 'Arcade'};
        return request(server)
        .post('/api/games')
        .send(game)
        .expect(201)
        })
   
    it('returns a 422 when missing genre', () => {
        const game = { title: 'Centipede'}
        return request(server)
        .post('/api/games')
        .send(game)
        .expect(422)
    })

    it('return 422 if missing title', () => {
        const game = { genre: 'Arcade'}
        return request(server)
        .post('/api/games')
        .send(game)
        .expect(422)
    })
})
})

