const express = require('express');
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

server.get('/', (req, res) => {
	res.status(200).send('its working')
})

server.post('/games', (req, res) => {
	const {title, gengre, releaseYear} = req.body;

	if(!req.body.title || !req.body.gengre){
		res.status(422).json({msg: 'please include both title and genre'})
	} else {

	db.insert({title, gengre, releaseYear}).into('games')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json({msg: 'There was an error creating game'})
		})
	}
})

server.get('/games', (req, res) => {
	db('games')
		.then(games => {
			res.status(200).json(games)
		})
		.catch(error => {
			console.log(error)
			res.status(500).json(error)
		})
})

module.exports = server;