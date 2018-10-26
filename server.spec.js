const request = require('supertest');
const server = require('./server.js');
const knex = require('knex')

describe('test setup is working', function(){
	it('returns a 200 (ok) status code', function(done){
		request(server)
			.get('/')
			.expect(200)
			.end(function(){
				done()
			})
	})
})

describe('Get /games setup check', function(){
	it('should return empty array object if no game in database', function(done){
		request(server)
			.get('/games')
			.set('Accept', 'application/json')
			.end(function(err, res){
				//console.log(res.body)
				if (err) return done(err)
					expect(typeof res.body).toEqual('object')
					expect(res.body.length).toEqual(0);
					done()
			})
	})
});

describe('Post /games', function() {
	it('responds with json', function(done){
		request(server)
			.post('/games')
			.send({title: 'Pacman', gengre: 'Arcade', 'releaseYear': 1980})
			.set('Accept', 'application/json')
			.expect(201)
			.end(function(err, res){
				if (err) return done(err)
					done();
			});
	});

	it('responds with error 422 if no title is given', function(done){
		request(server)
			.post('/games')
			.send({title: '', gengre: 'console', 'releaseYear': 1985})
			.set('Accept', 'application/json')
			.expect(422)
			.end(function(err, res){
				if (err) return done(err)
					done();
			});
	});
	it('responds with a 422 if no gengre is given', function(done){
		request(server)
			.post('/games')
			.send({title: 'dummy game', 'gengre': '', 'releaseYear': 2000})
			.expect(422)
			.end(function(err, res){
				if (err) return done(err)
					done();
			})
	})
	it('should return 405 error if title is already taken', function(done){
		request(server)
			.post('/games')
			.send({title: 'Pacman', gengre: 'Arcade', 'releaseYear': 1980})
			.set('Accept', 'application/json')
			.expect(405)
			.end(function(err, res){
				if (err) return done(err)
					done();
			});
	})
});

describe('Get /games', function() {
	it('should return array object', function(done){
		request(server)
			.get('/games')
			.set('Accept', 'application/json')
			.end(function(err, res){
				//console.log(res.body)
				if (err) return done(err)
					expect(typeof res.body).toEqual('object')
					done()
			})
	})

	it('should return status code 200', function(done){
		request(server)
			.get('/games')
			.set('Accept', 'application/json')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err)
					done()
			})
	})
})

describe('Get /games/:id', function() {
	it('should return 200 with only selected game', function(done){
		request(server)
			.post('/games')
			.send({title: 'Mario Brothers', gengre: 'console', 'releaseYear': 1983})
			.set('Accept', 'application/json')
			.end(function(){
				request(server)
				.get('/games/2')
				.expect(200)
				.end(function(err, res){
					if (err) return done(err)
						expect(res.body.length).toEqual(1)
						done();
				})
			})
	})
	it('should return 404 not found if game not found', function(done){
		request(server)
			.get('/games/200')
			.expect(404)
			.end(function(err, res){
				if (err) return done(err)
					expect(res.body.length).toEqual(0)
					done();
			})
	})
})

describe('Delete /game/:id', function() {
	it('deletes a user', function(done) {
		request(server)
			.del('/games/1')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done()
			})
	})
	it('response with 404 no user found to delete', function(done){
		request(server)
			.del('/games/400')
			.expect(404)
			.end(function(err, res){
				if(err) return done(err);
				done()
			});
	})
})