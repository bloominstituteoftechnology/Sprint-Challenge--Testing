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


    it('expected return an array is true', async () => {
        const response = await request(server)
            .get('/api/games');
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('should return a JSON object fron the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
      });

    it('should a successful status code', async () => {
        const response = await request(server).get('/');
  
        expect(response.status).toEqual(200);
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

    it('should return the correct status', async () => {  
        const response = await request(server)
            .post('/api/games')
            .send();     
        expect(response.status).toBe(422)
    })

    it('should return a JSON object from the index route', async () => {
        const response = await request(server).get('/');
  
        expect(response.type).toEqual('application/json');
     });

    it('should return a new ID', async () => {
        const response = await request(server).post('/');
  
        expect(response.body).toEqual({});
    });

    });