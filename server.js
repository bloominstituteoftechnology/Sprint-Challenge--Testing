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

	//check if title exists
	if(!req.body.title || !req.body.gengre){
		res.status(422).json({msg: 'please include both title and genre'})
	} else {

	db.insert({title, gengre, releaseYear}).into('games')
		.then(response => {
			res.status(201).json(response)
		})
		.catch(error => {
			res.status(405).json({msg: 'There was an error creating game'})
		})
	}
})

server.get('/games', (req, res) => {
	db('games')
		.then(games => {
			res.status(200).json(games)
		})
		.catch(error => {
			res.status(500).json(error)
		})
})

server.get('/games/:id', (req, res) => {
	const { id }  = req.params
	db('games')
		.where({id})
		.then(response => {
			//if no game found
			if (response.length === 0){
				return res.status(404).json(response)
			} else {
				res.status(200).json(response)
			}
		})
		.catch(error => {
			res.status(500).json({msg: 'error finding game'})
		})
})


server.delete('/games/:id', (req, res) => {
	const { id } = req.params;
	db('games')
	.where({id: id})
	.del()
	.then(response => {
		if (response === 0){
			return res.status(404).json({msg: 'no game there to delete'})
		}

		if (response === 1){
			return res.status(200).json(response)
		}
	})
	.catch(error => {
		res.status(500).json(error)
	})
})


module.exports = server;