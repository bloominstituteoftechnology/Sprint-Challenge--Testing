const request = require('supertest');
const server = require('./server.js');

describe('server', () => {
	it('run all the tests', () => {
			expect(true).toBeTruthy();
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
		it('should return the list of games and HTTP status code 200', async () => {

		});

		it('should always return an array, return an empty array if there are no games stored', async () => {
			
		});
	});
});