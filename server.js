const express=require('express');
const server=express();
server.use(express.json());

let id=1;
const games=[];

function validateTitle(req,res,next){
    let newGame=req.body;
    let counter=0;
        for (let i=0; i<games.length; i++) {
            if (games[i].title===newGame.title){
                counter+=1;
                break;
            }
        }
        if (counter===0){
            next();
        } else {
            res.status(405).json({err:'No duplicate titles.'});
        }
    
}
server.get('/games',(req,res)=>{
    res.status(200).json({games:games});
})
server.post('/games',(req,res)=>{
    const newGame=req.body;
    if (!newGame.title||!newGame.genre||!newGame.releaseYear){
        res.status(422).json({error:'missing field(s)'});
    }
    res.status(201).json({id:id});
    id++;
})
server.get('/games/:id',(req,res)=>{
    const id=req.params.id;
    for (let i=0; i<games.length; i++) {
        if (games[i].id===id) {
            return res.status(200).json(games[i]);
        }
    }
    return res.status(404).json({err:'Could not find game'});
})
server.delete('/games/:id',(req,res)=>{
    const id=req.params.id;
    for (let i=0; i<games.length; i++) {
        if (games[i].id===id){
            games.splice(i,1);
            return res.status(200).send(1);
        }
    }
    return res.status(404).json({err:'Could not find game.'});
})
module.exports=server;