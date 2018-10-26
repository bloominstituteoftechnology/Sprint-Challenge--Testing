const request = require('supertest');

const server = require('./server.js');

describe('\'\\games\' endpoint, ', () => {
	describe('\'GET\' requests', () => {
		it('should return status 200', async()=> {
		const response = await request(server).get('/games');
		expect(response.status).toBe(200);
		});
		it('should return an array of games', async()=> {
		const response = await request(server).get('/games');
		expect(response.body.games).toBeTruthy();
		});
		it('should always return default greeting message', async() => {
		const response = await request(server).get('/games');
		expect(response.body.greeting).toEqual('Hello!');
		})
	});
	describe('\'POST\' requests', () => {
		it('should return status 422 given no title', async()=> {
		const response = await request(server).post('/games').send({genre:'test'});
		expect(response.status).toBe(422);
		});
		it('should return status 422 given no genre', async()=> {
		const response = await request(server).post('/games').send({title:'test'});
		expect(response.status).toBe(422);
		});
		it('should return status 200 given a title and genre', async()=> {
		const response = await request(server).post('/games').send({genre:'test',title:'test'});
		expect(response.status).toBe(200);
		});
		it('should return a message given valid data', async()=> {
		const response = await request(server).post('/games').send({genre:'test',title:'test'});
		expect(response.body.message).toBeTruthy();
		});
		it('should return a message given invalid data', async()=> {
		const response = await request(server).post('/games').send({genre:'test'});
		expect(response.body.message).toBeTruthy();
		});
		it('should return a message given no data', async()=> {
		const response = await request(server).post('/games');
		expect(response.body.message).toBeTruthy();
		});
		it('should return \'not given\' given a title and genre, but no release year.', async()=> {
		const response = await request(server).post('/games').send({genre:'test',title:'test'});
		expect(response.body.releaseYear).toEqual("not given");
		});
		it('should return a title given valid data', async()=> {
		const response = await request(server).post('/games').send({genre:'genre',title:'title'});
		expect(response.body.title).toEqual('title');
		});
		it('should return a genre given valid data', async()=> {
		const response = await request(server).post('/games').send({genre:'genre',title:'title'});
		expect(response.body.genre).toEqual('genre');
		});
		it('should return a release year given valid data, and a release year', async()=> {
		const response = await request(server).post('/games').send({genre:'genre',title:'title',releaseYear:2000});
		expect(response.body.releaseYear).toEqual(2000);
		});
	});
});