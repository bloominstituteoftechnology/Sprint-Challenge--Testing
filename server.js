const express=require('express');
const server=express();
server.use(express.json());

let id=1;
const games=[];

server.get('/games',(req,res)=>{
    res.status(200).json({games:games});
})
module.exports=server;