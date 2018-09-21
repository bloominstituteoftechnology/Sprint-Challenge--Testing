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
		it('should return games when added', async () => {
			const response = await request(server).post('/games')
			.send(
				{ title: 'Zelda Ocarina of Time', genre: 'Adventure', releaseYear: 1999 }
			);
			expect(response.status).toEqual(201);
		});

		it('should validate that the required fields are included inside the body, return status code 422 if not', async () => {
			const response = await request(server).post('/games')
			.send(
				{ title: null, genre: null, releaseYear: 1999 }
			);
			expect(response.status).toEqual(422);
		});

		it('should verify that the endpoint returns the correct HTTP status code when receiving correct or incorrect data', async () => {
			const response = await request(server).post('/games')
			.send(
				{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 }
			);
			expect(response.body).toEqual({  message: "Game added." });
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
				{ title: 'Zelda Ocarina of Time', genre: 'Adventure', releaseYear: 1999 },
				{ title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
			];
			expect(response.body).toEqual(expected);
		});
	});
});