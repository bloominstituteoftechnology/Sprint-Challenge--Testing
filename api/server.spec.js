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
			expect(response.body).toEqual({ message: 'Server is running.' });
		});
	});
});
