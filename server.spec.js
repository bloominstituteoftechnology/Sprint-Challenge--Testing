const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
	it('run all the tests', () => {
			expect(true).toBeTruthy();
	});

	it('should return a JSON object from the index route', async () => {
		const expectedBody = { api: 'running' };
		const response = await request(server).get('/');
		expect(response.body).toEqual(expectedBody);
	});

	it('should return a JSON object from the index route', async () => {
		const response = await request(server).get('/');
		expect(response.type)
	});

	describe('POST /games', () => {
		it('should take in an object that takes a title, genre and releaseYear', async () => {

		});

		it('should validate that the required fields are included inside the body, return status code 422 if not', async () => {

		});

		it('should verify that the endpoint returns the correct HTTP status code when receiving correct or incorrect data', async () => {

		});
	});

	describe('GET /games', () => {
		it('should return HTTP status code 200', async () => {
			const response = await request(server).get('/games');
			expect(response.status).toEqual(200);
		});

		it('should return an array', async () => {
			const response = await request(server).get('/games');
			expect(Array.isArray(response.body)).toBeTruthy();
		});

		it('should return a list of games', async () => {
			const response = await request(server).get('/games');
			const expected = [
				{ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' },
			];
			expect(response.body).toEqual(expected);
		});
	});
});