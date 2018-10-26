const request = require('supertest');

const server = require('./api/server.js');

describe('server', () => {
    describe('GET /', () => {
        
        it('return status code 200(OK)', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
        });
    
    })
  
    it('should return {message: "the line is hot"}', async () => {
        const response = await request(server).get('/');

        expect (response.body).toEqual('the line is hot');
    });
});


describe('GET /api/games', () => {

	it('return status 204 when no games are present', async () => {
        const response = await request(server)
            .get('/api/games');
            
        expect(response.status).toBe(204);
        });

    it('expected to return an array', async () => {
        const response = await request(server)
            .get('/api/games');
        expect(response.body).toEqual({});
    })

    it('expected to return JSON', async () => {
        const expectedBody = { };
        const response = await request(server)
            .get('/api/games');
            expect(response.body).toEqual(expectedBody);
    } )

    it('should return a JSON object fron the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
      });
    
    });
    
describe('POST /api/games', () => {
    
    ///correct data received
	it('return status 201 (created) when POST is made', async () => {
		const response = await request(server)
			.post('/api/games')
			.send({ title: 'Galaga', genre: 'Space Adventure', releaseYear: '1980' });
		expect(response.status).toBe(201);
        });
    
    
        ///incorrect data received

    it('should contain an entry in every field', async () => {  
        const response = await request(server)
            .post('/api/games')
            .send();     
        expect(response.status).toBe(422)
    })

  
    it('should return a JSON object fron the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
      });
    
    });
    
