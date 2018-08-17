const request = require('supertest');
const server = require('./server.js');


describe('server.js', ()=> {
	describe('GET endpoint(/)', ()=> {
			it('should return status code 200 Ok', async ()=> {
				const expected = 200;
				const response = await request(server).get('/');
					expect(response.status).toEqual(expected);
				});
			});

	describe('GET endpoint(/games)', ()=> {
			it('should return status code 200 Ok', async ()=> {
				const expected = 200;
				const response = await request(server).get('/games');
					expect(response.status).toEqual(expected);
				});
			it('should return an array of games', async ()=> {
				const expected = [];
				const response = await request(server).get('/games');
					expect(response.body).toEqual(expected);
				});
			});

	describe('POST (/games)', ()=> {
			it('should return status code 200 Ok', async ()=> {
				const expected = 200;
				const response = await request(server).post('/games');
					expect(response.status).toEqual(expected);
				});
		  it('should add new game to list', async () => {
        const expected = { title: 'Pacman', genre: 'Arcade', releaseYear: '1980' };
        const response = await request(server).post('/games').send({ title: 'Pacman', genre: 'Arcade', releaseYear: '1980' });
           expect(response.body).toEqual(expected);
        });
		  it('should return status code 422 - missing info', async () => {
            const expected = 422;
            const response = await request(server).post('/games');
            expect(response.status).toEqual(expected);
        });
		});


	});
