const express= require('express');
const app=express();

const queue= require("./priorityqueue");
app.use(express.static("img"));

app.get("/",(req,res)=>
{
    res.sendFile(__dirname + '/index.html');
});

app.get("/alarm",(req,res)=>
{
    res.sendFile(__dirname+'/alarm.html');
});



const server=app.listen("8000");
var io = require('socket.io')(server);

io.on('connect', function(client) 
{
     let e=null;
    client.on('timer', function(msg){
        queue.enqueue( msg,client );
      });
});
let e;
// if(!(queue.isEmpty()))
// {
  e=setInterval(() => {
    var today = new Date();
    var min= (today.getMinutes()<10)?"0"+today.getMinutes():today.getMinutes();
    var hrs=today.getHours();
    var time = hrs + ":" +min;
    if(!(queue.isEmpty()))
     {
        if(time==(queue.peek()).time)
        { 
  
          (queue.peek()).client.emit("alert" ,time);
           queue.dequeue();
        }
      }
    }, 1000);
// }
// else
//   {
//      clearInterval(e);
//   }


