const express=require('express');
const server=express();
server.use(express.json());

let id=1;
const games=[];

server.get('/games',(req,res)=>{
    res.status(200).json({games:games});
})
server.post('/games',(req,res)=>{
    const newGame=req.body;
    if (!newGame.title||!newGame.genre||!newGame.releaseYear){
        res.status(422).json({error:'missing field(s)'});
    }
    else {
        res.status(201).json({id:id});
        id++;
    }
})
module.exports=server;