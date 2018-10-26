const express = require('express');

const server = express();

server.use(express.json());

server.get('/games', (req,res) => {
	
//for testing purposes, the .get endpoint will temporarily simply return an empty array.

res.status(200).json({games:[],greeting:'Hello!'});
})

server.post('/games', (req,res) => {
const { title,genre } = req.body;
if(req.body.releaseYear){ releaseYear  = req.body.releaseYear;}
else{releaseYear = "not given";}
if(title && genre){
res.status(200).json({message:`${title} posted in the ${genre} genre, release year: ${releaseYear}`
,title,genre,releaseYear});
}
else{res.status(422).json({message:'please fill in a title and genre'});}
})

const port = 3333;

server.listen(port, () => console.log(`\n server listening on poet ${port} \n`));

module.exports = server;