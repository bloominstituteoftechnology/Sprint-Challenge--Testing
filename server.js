const express = require('express')

const server = express()

server.use(express.json())


let games = [
  {id:0, title:'Pacman', genre:'Arcade', releaseYear:'1980'},
  {id:1, title:'Street Fighter', genre:'Arcade', releaseYear:'1992'},
  {id:2, title:'Mortal Kombat', genre:'Arcade', releaseYear:'1990'},
  {id:3, title:'Super Mario', genre:'NES', releaseYear:'1986'},
  {id:4, title:'Legend of Zelda', genre:'NES', releaseYear:'1980'},
]
server.get('/', (req, res) => {
  res.status(200).send('up and running')
})

server.get('/games', (req, res) => {
  res.status(200).json(games)
})

server.post('/games', (req, res) => {
  const {body} = req

  //Check if both the body and title sent
  if (!body.title || !body.genre)
    res.status(422).json({msg: 'required fields missing'})

  //Check for titles that already exist:
  else if (games.map(cv => cv.title).includes(body.title)){    
    res.status(405).json({msg: 'Game already exists'})
  }

  else {
    //Get the current Max id
    let maxID = Math.max(...[...games.map(cv => cv.id)])
    
    //Push the new content into games array
    games.push({ 
      id:maxID+1,
      title: body.title,
      genre: body.genre
    })

    //Send back the updated array
    res.status(200).json(games)
  }
})
module.exports = server