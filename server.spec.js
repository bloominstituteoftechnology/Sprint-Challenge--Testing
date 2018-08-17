const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {

describe('server testing for GET request', () => {

it('should return status code 200 OK', async() => {
                const expected =200;

                const response = await request(server).get('/');
                expect(response.status).toEqual(expected);

});

it('should return an Array as a respnse on making a GET request', async() => {
                const expected = true;

                const response = await request(server).get('/');
		console.log( response.body);
                expect(Array.isArray(response.body)).toEqual(expected);

});
});


describe('server testing for POST request', () => {

it('should return status code 200 on making a correct post request', async()=>{

	const expected =200;
	const game ={
 		 title: 'IGI',
  		 genre: 'Arcade',
  		 releaseYear: 1990 
		};

	const response = await request(server)
			.post('/games')
			.send(game);
	expect(response.status).toEqual(expected);

});
	
it('should return status code 422 on making a  post request without all the required fields', async()=>{

        const expected =422;
        const game ={
                 title: '',
                 genre: '',
                 releaseYear: 1990
                };

        const response = await request(server)
                        .post('/games')
                        .send(game);
        expect(response.status).toEqual(expected);

});


it('should return status code 405 on making a  post request with an existing title', async()=>{

        const expected =405;
        const game ={
                 title: 'Pacman',
                 genre: 'Arcade',
                 releaseYear: 1991
                };

        const response = await request(server)
                        .post('/games')
                        .send(game);
        expect(response.status).toEqual(expected);

});	
});

	

});
