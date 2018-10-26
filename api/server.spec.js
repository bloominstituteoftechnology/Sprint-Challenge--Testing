const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('server.js', () => {
	describe('GET /games/', () => {
		it('should return status 200(OK)', async () => {
			const response = await request(server).get('/games/');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/games/');
			expect(response.type).toBe('application/json');
		});

		it('should return the message "Server is running."', async () => {
			const response = await request(server).get('/games/');
			expect(typeof(response.body)).toBe('object');
			expect(response.body).toEqual({ message: 'Server is running.' });
		});
	});

	describe('GET /games/all', () => {
		it('should return status 200(OK)', async () => {
			const response = await request(server).get('/games/all');
			expect(response.status).toBe(200);
		});

		it('should return JSON', async () => {
			const response = await request(server).get('/games/all');
			expect(response.type).toBe('application/json');
		});

		it('should return list of all the games', async () => {
			const response = await request(server).get('/games/all');
			const expected = [
				{ 'id': 1, 'title': 'Pacman', 'genre': 'Arcade', 'releaseYear': 1980, },
				{ 'id': 2, 'title': 'Tetris', 'genre': 'Arcade', 'releaseYear': null, },
				{ 'id': 3, 'title': 'Dragon Quest', 'genre': 'RPG', 'releaseYear': null, },
			];
			expect(Array.isArray(response.body)).toBe(true);
			expect(response.body.length).toEqual(3);
			expect(response.body).toEqual(expected);
		});
	});
});
