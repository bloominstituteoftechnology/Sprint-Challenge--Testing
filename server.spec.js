const request = require('supertest');
const server = require('./server.js'); 

describe('BASIC TEST IS RUNNING TEST', () => {
    it('runs the tests', () => {
        expect(true).toBeTruthy();
    })

})

describe('GET', () => {
    it.skip('should return a status code of 200 after getting games', async () => {
        const response = await request(server).get('/games');
            
        expect(response.status).toEqual(200); 
    })

    it.skip('should return a blank array, if there are no games stored', async () => {
        const response = await request(server).get('/games');
            
        expect(response.body).toEqual([]); 
    })

    it.skip('should return a status code of 403 if date of the month is even', async () => {
        const response = await request(server).get('/games');
            
        expect(response.status).toEqual(403); 
    })

    it('should return a status code of 404 if id is invalid', async () => {
        const response = await request(server)
            .get('/games/200');
            
        expect(response.status).toEqual(404); 
    })
})

describe('POST', () => {
    it.skip('should return a status code of 200 after posting a game', async () => {
        const response = await request(server)
            .post('/games')
            .send({
                title: "Duck Season",
                genre: "VR",
                releaseYear: 2018, 
            })
            
        expect(response.status).toEqual(200); 
    })

    it('should return a status code of 422 if posting game without required three properties', async () => {
        const response = await request(server)
            .post('/games')
            .send({
                name: "Tilt",
                genre: "VR",
                releaseYear: 2016, 
            })
            
        expect(response.status).toEqual(422); 
    })

    it.skip('should return a status code of 500 if server fails to fullfil request', async () => {
        const response = await request(server)
            .post('/games')
            .send({
                title: "Mouse",
                genre: "action/MMO",
                releaseYear: 2013, 
                newField: "test",
            })
            
        expect(response.status).toEqual(500); 
    })

    it.skip('should return a status code of 405 after posting a duplicate game', async () => {
        const response = await request(server)
            .post('/games')
            .send({
                title: "GTAV",
                genre: "action/MMO",
                releaseYear: 2013, 
            })
            
        expect(response.status).toEqual(405); 
    })

})




