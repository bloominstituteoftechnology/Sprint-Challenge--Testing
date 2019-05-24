const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

describe('Server tests', () => {
	beforeEach(() => {
		return db('games').truncate(); //cleanup
	});

	it('should set testing env', () => {
		const env = process.env.DB_ENV;

		expect(env).toBe('testing');
	});
});

//get tests
describe('GET /games', () => {
	it('should return 200', async () => {
		const res = await request(server).get('/games');
		expect(res.status).toBe(200);
	});

	it('should return JSON', async () => {
		const res = await request(server).get('/games');
		expect(res.type).toBe('application/json');
	});

	it('should return an array even if there are no games', async () => {
		const res = await request(server).get('/games');

		expect(res.body).toEqual([]);
	});
});

// post tests
describe('POST /games', () => {
	it('should return 422 if data is missing', async () => {
		await db('games').insert({
			title: 'Pacman',
			genre: 'Arcade',
			releaseYear: 1980
		});

		const res = await request(server).post('/games');

		expect(res.status).toBe(422);
	});
	it('should return 200', async () => {
		const info = [
			{
				title: 'Pacman',
				genre: 'Arcade',
				releaseYear: 1980
			}
		];

		await db('games').insert(info);

		const res = await request(server).post('/games', info);

		expect(res.status).toBe(200);
	});
	it('should return json', async () => {
		await db('games').insert({
			title: 'Pacman',
			genre: 'Arcade',
			releaseYear: 1980
		});

		const res = await request(server).post('/games');
		expect(res.type).toBe('application/json');
	});
});
